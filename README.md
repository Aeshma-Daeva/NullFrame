# NULLFRAME LAB

Nullframe is a project-centered research atlas. Projects remain the center; the surrounding concepts, experiments, sources, controls, and typed connections exist to explain why the projects are shaped the way they are and what their evidence actually supports.

v0.1 contains one complete vertical slice: **Demian**.

## What is here

- a real Nullframe landing page with the grin brand mark and interactive eye-sphere observer;
- a Demian project page with the current six-channel public runtime anatomy;
- an interactive local constellation connecting recurrence, hidden state, dynamical systems, attractors, memory, continuity, ablation, restore controls, and gate-state propagation;
- authored connection explanations instead of proximity-as-proof;
- source nodes that point back to public Demian repositories/tests.

## Source boundary

Nullframe is an orientation and presentation layer. It is **not** the canonical source for Demian implementation claims.

Canonical public sources currently include:

- [Demian Substrate](https://github.com/Aeshma-Daeva/Demian-Substrate)
- [Demian Substrate README](https://github.com/Aeshma-Daeva/Demian-Substrate/blob/main/README.md)
- [Substrate Anatomy](https://github.com/Aeshma-Daeva/Demian-Substrate/blob/main/docs/SUBSTRATE_ANATOMY.md)
- [Public API restore tests](https://github.com/Aeshma-Daeva/Demian-Substrate/blob/main/tests/test_demian_v1_public_api.py)
- [Gate-state tests](https://github.com/Aeshma-Daeva/Demian-Substrate/blob/main/tests/test_demian_v1_gate_state.py)
- [Demian Lab](https://aeshma-daeva.github.io/Demian-Lab/)

The current public Demian runtime supports claims about implementation, state continuity, serialization/restore behavior, ablations, and measurable route modulation. It does not establish self-awareness, agency, identity, consciousness, self-preservation, homeostasis, or general autonomy.

## Architecture

v0.1 deliberately has **zero runtime or build dependencies**. The site is ordinary HTML/CSS/ES modules and the knowledge graph is an authored JavaScript data module.

```text
site/
  index.html
  projects/demian/index.html
  assets/
    css/global.css
    grin-mark.svg
    js/
      graph.mjs
      eye-sphere.mjs
      constellation.mjs
      data/demian-graph.mjs
```

## Local development

```bash
npm test
npm run dev
```

Then open `http://localhost:4321`.

## Build

```bash
npm run build
```

The build validates the Demian graph, verifies required static files, and copies the deployable site to `dist/`.

## Cloudflare Pages

Recommended production target:

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 22 or another maintained Node release

No Cloudflare-specific application code is used, so the host remains replaceable.

## GitHub Pages

`.github/workflows/pages.yml` provides a second static-host path. It runs tests, builds `dist/`, uploads the Pages artifact, and deploys it.

## Design rule

Do not fill Nullframe with generic encyclopedia pages. Add a concept when a project needs it, deepen it when more than one project depends on it, and make the connection explain why the fields touch.
