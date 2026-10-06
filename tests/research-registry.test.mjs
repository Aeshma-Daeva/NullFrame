import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  buildHypothesisCards,
  validateResearchRegistry,
} from '../site/assets/js/research-registry.mjs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const registry = JSON.parse(read('site/assets/data/demian-research-registry.json'));

test('checked snapshot is linked and manually reviewed', () => {
  assert.deepEqual(validateResearchRegistry(registry), { ok: true, errors: [] });
  assert.equal(registry.metadata.authority, 'Demian');
  assert.equal(registry.metadata.status_policy, 'manual_review_only');
});

test('validator rejects invalid evidence statuses and dangling references', () => {
  const invalidStatus = structuredClone(registry);
  invalidStatus.hypotheses[0].evidence_status = 'null';
  assert.match(validateResearchRegistry(invalidStatus).errors.join('\n'), /evidence status/i);

  const dangling = structuredClone(registry);
  dangling.results[0].control_ids.push('C-MISSING-999');
  assert.match(validateResearchRegistry(dangling).errors.join('\n'), /unknown control/i);
});

test('unevaluable AFP result remains distinct from a null outcome', () => {
  const result = registry.results.find((item) => item.id === 'R-AFP-BASIN-001');
  assert.equal(result.evaluable, false);
  assert.equal(result.outcome, 'unevaluable');
  assert.deepEqual(result.missing_evaluation_conditions, ['operational_surface_convergence']);
});

test('review cards preserve manual hypothesis status regardless of effect values', () => {
  const altered = structuredClone(registry);
  altered.results[0].effect_summary = { candidate_count: 9999 };
  const cards = buildHypothesisCards(altered);
  const afp = cards.find((item) => item.id === 'H-AFP-002');
  assert.equal(afp.evidenceStatus, 'inconclusive');
  assert.equal(afp.results[0].outcome, 'unevaluable');
  assert.match(afp.observation, /no checkpoint met/i);
  assert.match(afp.interpretation, /did not evaluate AFP/i);
  assert.deepEqual(afp.blockers, ['operational_surface_convergence']);
  assert.match(afp.scopeSummary, /2 parameter seeds/i);
  assert.match(afp.scopeSummary, /78 trajectories/i);
  assert.equal(afp.results[0].experiment.protocol_version, 'demian-basin-horizon-afpv2-pilot-v1');
  assert.deepEqual(afp.results[0].experiment.replication_scope.dependent_observations, [
    'checkpoints_within_trajectory',
    'radii_share_direction',
    'gate_modes_share_parameter_seed',
  ]);
  const continuation = cards.find((item) => item.id === 'H-CONT-001');
  assert.match(continuation.scopeSummary, /2 parameter seeds/i);
  assert.match(continuation.scopeSummary, /6 reference controls/i);
  assert.doesNotMatch(continuation.scopeSummary, /78 trajectories/i);
});

test('research page states its claim boundary and includes a static fallback', () => {
  const html = read('site/projects/demian/research/index.html');
  assert.match(html, /Evidence status is manually reviewed/i);
  assert.match(html, /does not infer conclusions/i);
  assert.match(html, /data-research-registry/);
  assert.match(html, /data-registry-fallback/);
  assert.match(html, /research-registry\.mjs/);
});

test('technical metrics are progressive detail rather than the primary view', () => {
  const module = read('site/assets/js/research-registry.mjs');
  assert.match(module, /element\('details'/);
  assert.match(module, /Technical record/);
  assert.match(module, /Observed/);
  assert.match(module, /Current interpretation/);
  assert.match(module, /What blocks a stronger claim/);
  assert.match(module, /Replication and protocol/);
  assert.match(module, /Parent experiment context/);
});
