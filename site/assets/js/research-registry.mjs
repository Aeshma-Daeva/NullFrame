const EVIDENCE_STATUSES = new Set([
  'untested', 'inconclusive', 'preliminary_support', 'supported', 'conflicting', 'contradicted',
]);
const RESULT_OUTCOMES = new Set(['observed', 'null', 'mixed', 'unevaluable']);

export function validateResearchRegistry(registry) {
  const errors = [];
  if (!registry || typeof registry !== 'object') return { ok: false, errors: ['Registry must be an object.'] };
  if (registry.metadata?.authority !== 'Demian') errors.push('Registry authority must be Demian.');
  if (registry.metadata?.status_policy !== 'manual_review_only') errors.push('Status policy must be manual_review_only.');

  const groups = ['hypotheses', 'experiments', 'controls', 'results', 'artifacts'];
  const ids = Object.fromEntries(groups.map((group) => [group, new Set()]));
  for (const group of groups) {
    if (!Array.isArray(registry[group])) {
      errors.push(`${group} must be an array.`);
      continue;
    }
    for (const item of registry[group]) {
      if (!item?.id) errors.push(`${group} entry requires an id.`);
      else if (ids[group].has(item.id)) errors.push(`Duplicate ${group} id: ${item.id}.`);
      else ids[group].add(item.id);
    }
  }

  for (const hypothesis of registry.hypotheses ?? []) {
    if (!EVIDENCE_STATUSES.has(hypothesis.evidence_status)) errors.push(`Invalid evidence status: ${hypothesis.evidence_status}.`);
    if (hypothesis.status_basis?.method !== 'manual_review') errors.push(`${hypothesis.id} requires manual review.`);
    for (const id of hypothesis.result_ids ?? []) if (!ids.results.has(id)) errors.push(`${hypothesis.id} references unknown result: ${id}.`);
  }
  for (const result of registry.results ?? []) {
    if (!RESULT_OUTCOMES.has(result.outcome)) errors.push(`Invalid result outcome: ${result.outcome}.`);
    if (!result.observation?.trim()) errors.push(`${result.id} requires an observation.`);
    if (!result.interpretation?.trim()) errors.push(`${result.id} requires an interpretation.`);
    if (!result.evaluable && (result.outcome !== 'unevaluable' || !result.missing_evaluation_conditions?.length)) {
      errors.push(`${result.id} unevaluable result requires missing conditions.`);
    }
    if (result.evaluable && result.outcome === 'unevaluable') errors.push(`${result.id} evaluable result cannot be unevaluable.`);
    for (const id of result.hypothesis_ids ?? []) if (!ids.hypotheses.has(id)) errors.push(`${result.id} references unknown hypothesis: ${id}.`);
    if (!ids.experiments.has(result.experiment_id)) errors.push(`${result.id} references unknown experiment: ${result.experiment_id}.`);
    for (const id of result.control_ids ?? []) if (!ids.controls.has(id)) errors.push(`${result.id} references unknown control: ${id}.`);
    for (const id of result.artifact_ids ?? []) if (!ids.artifacts.has(id)) errors.push(`${result.id} references unknown artifact: ${id}.`);
  }
  return { ok: errors.length === 0, errors };
}

export function buildHypothesisCards(registry) {
  const resultById = new Map(registry.results.map((item) => [item.id, item]));
  const experimentById = new Map(registry.experiments.map((item) => [item.id, item]));
  const controlById = new Map(registry.controls.map((item) => [item.id, item]));
  const artifactById = new Map(registry.artifacts.map((item) => [item.id, item]));
  return registry.hypotheses.map((hypothesis) => {
    const results = hypothesis.result_ids.map((id) => resultById.get(id)).filter(Boolean).map((result) => ({
      ...result,
      experiment: experimentById.get(result.experiment_id),
      controls: result.control_ids.map((id) => controlById.get(id)).filter(Boolean),
      artifacts: result.artifact_ids.map((id) => artifactById.get(id)).filter(Boolean),
    }));
    const missing = results.flatMap((result) => result.missing_evaluation_conditions);
    const blockers = missing.length ? missing : results.flatMap((result) => result.uncertainty);
    return {
      id: hypothesis.id,
      statement: hypothesis.statement,
      prediction: hypothesis.operational_prediction,
      evaluationConditions: hypothesis.evaluation_conditions,
      evidenceStatus: hypothesis.evidence_status,
      basis: hypothesis.status_basis.rule,
      alternatives: hypothesis.alternative_explanations,
      falsifiers: hypothesis.falsifiers,
      nextTest: hypothesis.next_test,
      observation: results.map((result) => result.observation).join(' '),
      interpretation: results.map((result) => result.interpretation).join(' '),
      blockers: [...new Set(blockers)],
      scopeSummary: [...new Set(results.map((result) => {
        const scope = result.analysis_scope;
        const unit = `${label(scope.independent_unit)}${scope.independent_unit_count === 1 ? '' : 's'}`;
        return `${scope.independent_unit_count} ${unit} · ${scope.comparison_count} ${scope.comparison_unit} · dependency structure recorded`;
      }))].join(' · '),
      results,
    };
  });
}

const label = (value) => value.replaceAll('_', ' ');
const compactValue = (value) => {
  if (Array.isArray(value)) return value.join(' – ');
  if (value && typeof value === 'object') return Object.entries(value).map(([key, item]) => `${label(key)}: ${item}`).join(' · ');
  return String(value);
};
const element = (name, className, text) => {
  const node = document.createElement(name);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const list = (title, items) => {
  const section = element('section', 'registry-list');
  section.append(element('h4', '', title));
  const ul = element('ul');
  for (const item of items) ul.append(element('li', '', item));
  section.append(ul);
  return section;
};
const fact = (title, text) => {
  const section = element('section', 'decision-fact');
  section.append(element('h3', '', title), element('p', '', text));
  return section;
};

export function renderResearchRegistry(root, registry) {
  const validation = validateResearchRegistry(registry);
  if (!validation.ok) throw new Error(validation.errors.join('\n'));
  root.replaceChildren();
  for (const card of buildHypothesisCards(registry)) {
    const article = element('article', 'hypothesis-card');
    const head = element('header', 'hypothesis-head');
    head.append(element('span', 'hypothesis-id', card.id));
    head.append(element('span', `evidence-status status-${card.evidenceStatus}`, label(card.evidenceStatus)));
    article.append(head, element('h2', '', card.statement), element('p', 'scope-summary', card.scopeSummary));
    const decision = element('div', 'decision-grid');
    decision.append(
      fact('Observed', card.observation),
      fact('Current interpretation', card.interpretation),
      list('What blocks a stronger claim', card.blockers.map(label)),
    );
    const next = element('p', 'next-test');
    next.append(element('strong', '', 'Next test: '), document.createTextNode(card.nextTest));
    article.append(decision, next);

    const technical = element('details', 'technical-record');
    technical.append(element('summary', '', 'Technical record'));
    technical.append(fact('Operational prediction', card.prediction));
    technical.append(list('Evaluation conditions', card.evaluationConditions.map(label)));
    for (const result of card.results) {
      const panel = element('section', 'result-panel');
      const resultHead = element('div', 'result-head');
      resultHead.append(element('strong', '', result.id), element('span', '', result.evaluable ? label(result.outcome) : 'unevaluable'));
      panel.append(resultHead);
      const analysisScope = result.analysis_scope;
      panel.append(list('Replication and protocol', [
        analysisScope.scope_note,
        `independent unit: ${label(analysisScope.independent_unit)} (${analysisScope.independent_unit_count})`,
        `analyzed scope: ${analysisScope.comparison_count} ${analysisScope.comparison_unit}`,
        `dependencies: ${analysisScope.dependent_observations.map(label).join(', ')}`,
      ]));
      const experimentScope = result.experiment.replication_scope;
      panel.append(list('Parent experiment context', [
        `${result.experiment.name} · ${result.experiment.protocol_version}`,
        `independent unit: ${label(experimentScope.independent_unit)}`,
        `${experimentScope.parameter_seed_count} parameter seeds · ${experimentScope.initial_state_count} initial states · ${experimentScope.history_condition_count} history conditions · ${experimentScope.trajectory_count} trajectories`,
        `${experimentScope.checkpoint_row_count} checkpoint rows; dependencies: ${experimentScope.dependent_observations.map(label).join(', ')}`,
      ]));
      const effects = element('dl', 'effect-grid');
      for (const [key, value] of Object.entries(result.effect_summary)) {
        effects.append(element('dt', '', label(key)), element('dd', '', compactValue(value)));
      }
      panel.append(effects);
      if (result.missing_evaluation_conditions.length) panel.append(list('Missing conditions', result.missing_evaluation_conditions.map(label)));
      panel.append(list('Uncertainty', result.uncertainty), list('Excluded claims', result.exclusions));
      const controls = result.controls.map((control) => `${control.name}: ${control.semantics}`);
      panel.append(list('Controls', controls));
      const sources = element('div', 'artifact-links');
      for (const artifact of result.artifacts) {
        const link = element('a', '', artifact.path);
        link.href = artifact.url;
        link.rel = 'noreferrer';
        sources.append(link);
      }
      panel.append(sources);
      technical.append(panel);
    }
    technical.append(list('Untested alternatives', card.alternatives), list('Falsifiers', card.falsifiers));
    technical.append(element('p', 'status-basis', `Status basis: ${card.basis}`));
    article.append(technical);
    root.append(article);
  }
}

async function bootstrap() {
  const root = document.querySelector('[data-research-registry]');
  if (!root) return;
  try {
    const response = await fetch('../../../assets/data/demian-research-registry.json');
    if (!response.ok) throw new Error(`Registry request failed: ${response.status}`);
    renderResearchRegistry(root, await response.json());
  } catch (error) {
    const fallback = root.querySelector('[data-registry-fallback]');
    if (fallback) fallback.textContent = `Registry unavailable: ${error.message}`;
  }
}

if (typeof document !== 'undefined') bootstrap();
