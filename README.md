# NullFrame

NullFrame is a project atlas that connects research concepts to the code, experiments and controls that support them. The public site currently contains one complete project slice, Demian, with authored connections to recurrent state, memory, ablations and checkpoint continuity.

It is an orientation layer: it helps a reviewer follow a claim to the relevant source and control. It does not infer scientific conclusions from graph proximity, node names, or visual relationships.

## What you can inspect

- A static HTML, CSS, and ES-module site with no npm package dependencies on this public surface.
- An authored Demian graph in [`site/assets/js/data/demian-graph.mjs`](site/assets/js/data/demian-graph.mjs), including connection explanations and evidence/source nodes.
- Source and executable-evidence links for the Demian runtime, its checkpoint/restore controls, and gate-state tests.

The graph is authored documentation. Its connections express reviewed relationships and their stated evidence status; they are not generated from source analysis and do not automatically establish causality, scientific validity, or system capability.

## A practical review path

Start at **capsule continuity**, inspect the **full-state** versus **surface-only** restore control, then follow the graph's source link to the actual runtime test. This demonstrates navigation and provenance: it does not automate scientific inference.

The public Demian runtime supports claims about implementation, state continuity, serialization/restore behavior, ablations, and measurable route modulation. It does not establish self-awareness, agency, identity, consciousness, self-preservation, homeostasis, or general autonomy.

## Evidence map

| Question | Inspectable evidence | Scope |
| --- | --- | --- |
| What does the atlas contain? | [`demian-graph.mjs`](site/assets/js/data/demian-graph.mjs) | Authored nodes, links, explanations, and source references. |
| What is the Demian runtime? | [Demian Substrate](https://github.com/Aeshma-Daeva/Demian-Substrate) | Canonical public runtime authority. |
| How is restore behavior checked? | [Public API restore tests](https://github.com/Aeshma-Daeva/Demian-Substrate/blob/main/tests/test_demian_v1_public_api.py) | Executable checkpoint/restore and surface-only controls. |
| How is gate-state behavior checked? | [Gate-state tests](https://github.com/Aeshma-Daeva/Demian-Substrate/blob/main/tests/test_demian_v1_gate_state.py) | Executable gate-state and ablation controls. |
| How is the substrate applied to EEG-like sequences? | [Demian EEG](https://github.com/Aeshma-Daeva/Demian-EEG) | Synthetic adapter, order comparison, and restore controls. |
| How is it applied to ordered well logs? | [Demian Geo](https://github.com/Aeshma-Daeva/Demian-Geo) | Synthetic per-well adapter and group-aware evaluation boundary. |
| How does evidence standing constrain action? | [Zenith Epistemic Runtime](https://github.com/Aeshma-Daeva/Zenith-Epistemic-Runtime) | Typed justification, contradiction, refresh, and authority transitions. |
| Where is research published? | [Demian Lab](https://aeshma-daeva.github.io/Demian-Lab/) | Research publication and case explanations. |

## Run the public site

This branch is a dependency-free static site. A current Python 3 and Node.js installation are sufficient.

```bash
npm test
npm run build
npm run dev
```

`npm test` validates the authored graph and required static files. `npm run build` validates the graph again and writes the deployable site to `dist/`. `npm run dev` serves `site/` locally at `http://localhost:4321`.

## Project boundaries

NullFrame does not replace the projects it references. Their responsibilities are explicit:

- **[Demian Substrate](https://github.com/Aeshma-Daeva/Demian-Substrate)** is the runtime authority for implementation and executable runtime controls.
- **[Demian Lab](https://aeshma-daeva.github.io/Demian-Lab/)** is the research-publication surface for methods, reports, and case explanations.
- **[Demian EEG](https://github.com/Aeshma-Daeva/Demian-EEG)** and **[Demian Geo](https://github.com/Aeshma-Daeva/Demian-Geo)** are bounded public adapters, not domain-validity claims.
- **[Zenith Epistemic Runtime](https://github.com/Aeshma-Daeva/Zenith-Epistemic-Runtime)** is the explicit evidence-to-authority state machine, not a complete autonomous agent.
- **[Abraxas](https://github.com/Aeshma-Daeva/Abraxas)** is a separate security-research application.
- **[Circumpunct Commons](https://github.com/Aeshma-Daeva/circumpunct-commons)** is a separate experiment in cross-run context continuity.

See [Project boundaries](docs/PROJECT_BOUNDARIES.md) for the authority and publication limits of each project.

### Local development, not included in this public branch

The broader NullFrame working environment also has local operational work, including registry, ledger, and inference-related layers. Those files and their runtime behavior are not included in this public branch. This README therefore provides no setup instructions or runtime links for them, and does not present them as a published NullFrame feature.

## Site architecture

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

The site can be hosted on any static host. The included GitHub Pages workflow runs the public tests, builds `dist/`, and deploys the resulting static artifact.

## Design rule

Do not fill NullFrame with generic encyclopedia pages. Add a concept when a project needs it, deepen it when more than one project depends on it, and make each connection explain why the fields touch.
