# Homepage Cockpit Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the concept-first Nullframe landing page with the approved compact project cockpit while preserving the existing Demian deep page and zero-dependency architecture.

**Architecture:** Keep the site as static HTML/CSS/ES modules. The homepage becomes a dense responsive cockpit composed of a compact branded hero, six entry-path cards, a six-item category strip, seven featured-project tiles with custom inline SVG emblems, and three ethos cards. Existing Demian graph code remains unchanged; shared CSS is extended carefully so project-page behavior is preserved.

**Tech Stack:** HTML5, CSS3, inline SVG, ES modules, Node 22 built-in test runner, existing static build script.

## Global Constraints

- Zero runtime/build dependencies.
- Projects, not the knowledge graph, are the homepage center of gravity.
- Preserve keyboard focus states, skip link, semantic landmarks, and reduced-motion behavior.
- Preserve the existing Demian project/constellation page unless compatibility requires a minimal shared-style adjustment.
- Mobile is first-class; desktop must preserve density instead of expanding into large empty space.
- Use restrained varied accents rather than a green-only visual system.
- Interface copy stays precise and non-mystical.

---

### Task 1: Lock homepage information architecture with failing tests

**Files:**
- Modify: `tests/site.test.mjs`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: the static `site/index.html` document.
- Produces: regression requirements for canonical entry cards, category strip, project tiles, ethos cards, compact hero, and project-specific emblems.

- [ ] **Step 1: Add failing homepage cockpit tests**

Add tests equivalent to:

```js
test('homepage exposes the canonical project cockpit sections',()=>{
  const html=read('site/index.html');
  for(const label of ['Start Here','Featured Work','Methods & Evidence','Research Lineages','Negative Results & Nulls','Reproducibility & Provenance']) assert.match(html,new RegExp(label,'i'));
  for(const label of ['Projects','Research','Experiments','Software','Builds','Changelog']) assert.match(html,new RegExp(`data-category-label="${label}"`,'i'));
  for(const project of ['Demian Lab','Demian EEG','Demian Geo','Anima Mundi','Shadow King','Projector Pan/Tilt','Demian Substrate']) assert.match(html,new RegExp(project.replace('/','\\/'),'i'));
  for(const ethos of ['Evidence policy','Privacy boundaries','Negative results']) assert.match(html,new RegExp(ethos,'i'));
});

test('featured projects expose distinct visual emblems',()=>{
  const html=read('site/index.html');
  for(const id of ['demian-lab','demian-eeg','demian-geo','anima-mundi','shadow-king','projector-pan-tilt','demian-substrate']) assert.match(html,new RegExp(`data-project-emblem="${id}"`));
  assert.match(html,/data-project-emblem="anima-mundi"[\s\S]*data-tree-branch/i);
});

test('homepage hero is cockpit-sized rather than full viewport',()=>{
  const html=read('site/index.html');
  assert.match(html,/class="[^"]*cockpit-hero/);
  assert.doesNotMatch(html,/current vertical slice/i);
});
```

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: new homepage tests fail because the current landing page has the old full-viewport hero and only Demian-focused sections.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/site.test.mjs
git commit -m "test: define homepage cockpit structure"
```

---

### Task 2: Replace landing markup with the compact project cockpit

**Files:**
- Modify: `site/index.html`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: existing grin asset and `eye-sphere.mjs` behavior.
- Produces: semantic static homepage sections and `data-project-emblem` / `data-category-label` hooks used by tests and styling.

- [ ] **Step 1: Replace the old homepage body structure**

Implement this hierarchy:

```text
header
main
  compact cockpit hero
  recommended-entry-path section (6 cards)
  category strip (6 items)
  featured-projects section (7 tiles)
  ethos section (3 cards)
footer
```

Keep `data-eye-sphere`, `data-eye`, and `data-pupil` in the compact branded organism so the existing pointer interaction remains functional.

- [ ] **Step 2: Add custom inline SVG emblems**

Each featured project receives a unique SVG. In particular, the Anima Mundi emblem must contain explicit branching paths marked with `data-tree-branch` so the tree/ecology identity is stable and testable.

- [ ] **Step 3: Keep links honest**

Use working project links where public destinations already exist (Demian project, Demian Lab, Demian Substrate). For projects without a dedicated public route yet, link to the relevant homepage section with a clear `aria-label`/status rather than inventing nonexistent project pages.

- [ ] **Step 4: Run `npm test`**

Expected: cockpit structure and emblem tests pass; CSS-specific visual requirements may still be pending.

- [ ] **Step 5: Commit markup**

```bash
git add site/index.html
git commit -m "feat: rebuild homepage as project cockpit"
```

---

### Task 3: Restore dense multi-accent visual identity responsively

**Files:**
- Modify: `site/assets/css/global.css`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: homepage class/data hooks from Task 2 and existing project-page classes.
- Produces: compact desktop/mobile layout, project accent system, hover/focus states, HUD texture, and compact observer sizing.

- [ ] **Step 1: Add CSS regression checks**

Extend `tests/site.test.mjs` with assertions for homepage-specific classes and responsive rules:

```js
test('cockpit stylesheet defines dense responsive grids and varied accents',()=>{
  const css=read('site/assets/css/global.css');
  for(const token of ['.cockpit-hero','.entry-grid','.category-strip','.featured-project-grid','.ethos-grid']) assert.match(css,new RegExp(token.replace('.','\\.')));
  assert.match(css,/--accent-purple/);
  assert.match(css,/--accent-orange/);
  assert.match(css,/--accent-cyan/);
  assert.match(css,/@media\s*\(max-width:\s*720px\)/);
});
```

- [ ] **Step 2: Run `npm test` and verify RED for CSS additions**

Expected: CSS regression test fails until the cockpit styles exist.

- [ ] **Step 3: Implement visual system**

CSS requirements:
- hero height governed by content, not `100vh`;
- dark layered panel/grid backdrop;
- small observer/eye-grin unit on desktop and mobile;
- 3-column entry grid on desktop, 2-column on medium/mobile, 1-column only when necessary;
- six-item category strip that remains scannable;
- seven featured tiles with project-specific accent variables;
- project icons large enough to identify visually;
- subtle scanline/radar details without reducing text legibility;
- hover/focus lift/glow kept restrained;
- ethos cards compact;
- existing `.project-page`, `.constellation`, channel and graph styles preserved.

- [ ] **Step 4: Run `npm test`**

Expected: all site and graph tests pass.

- [ ] **Step 5: Run `npm run build`**

Expected: `dist/` builds successfully and Demian graph validation remains green.

- [ ] **Step 6: Commit styles/tests**

```bash
git add site/assets/css/global.css tests/site.test.mjs
git commit -m "style: restore dense Nullframe cockpit identity"
```

---

### Task 4: Final integration verification

**Files:**
- Verify: `site/index.html`
- Verify: `site/projects/demian/index.html`
- Verify: `site/assets/css/global.css`
- Verify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: completed redesign.
- Produces: verified branch ready for PR/deployment.

- [ ] **Step 1: Run full tests**

```bash
npm test
```

Expected: 0 failures.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: successful copy to `dist/` and valid Demian graph.

- [ ] **Step 3: Check repository diff**

Confirm only the approved homepage/spec/plan/tests/shared-style files changed; no Demian claim boundary or graph semantics were weakened.

- [ ] **Step 4: Push branch and open PR**

PR title:

```text
feat: restore Nullframe project cockpit homepage
```

PR body should explicitly state that the redesign restores the supplied compact project-index reference as the homepage hierarchy and keeps deep knowledge/constellation work project-local.
