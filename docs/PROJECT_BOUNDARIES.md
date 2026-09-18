# Project boundaries

NullFrame is a public atlas, not the authority for every project it references. The site presents authored paths between concepts, controls, source code, and published evidence. A path helps a reviewer locate material; it does not automatically infer a result or transfer authority between repositories.

| Project | Public role | Canonical authority | Not claimed by NullFrame |
| --- | --- | --- | --- |
| [Demian Substrate](https://github.com/Aeshma-Daeva/Demian-Substrate) | Recurrent-state runtime and executable controls. | Its source, tests, and repository documentation. | That an atlas node proves a runtime claim. |
| [Demian Lab](https://aeshma-daeva.github.io/Demian-Lab/) | Research publication for methods, reports, and case explanations. | Its published research materials and stated evidence status. | That a published case is a runtime feature or independently replicated result. |
| [Demian EEG](https://github.com/Aeshma-Daeva/Demian-EEG) | Synthetic EEG-like observer adapter. | Its source, tests, fixture, and claim boundary. | Clinical validity, brain-state decoding, or independent replication. |
| [Demian Geo](https://github.com/Aeshma-Daeva/Demian-Geo) | Synthetic well-log sequence adapter. | Its source, tests, fixture, and claim boundary. | Predictive lift, leaderboard standing, or geological causal meaning. |
| [Zenith Epistemic Runtime](https://github.com/Aeshma-Daeva/Zenith-Epistemic-Runtime) | Typed evidence, justification, and action-authority state machine. | Its contracts, transition tests, and claim boundary. | Truth discovery, complete agency, or production safety. |
| [Abraxas](https://github.com/Aeshma-Daeva/Abraxas) | Separate security-research application. | Its own public branch, documentation, and scoped validation evidence. | That it is implemented, operated, or authorized through NullFrame. |
| [Circumpunct Commons](https://github.com/Aeshma-Daeva/circumpunct-commons) | Separate experiment in cross-run context continuity. | Its runner, records, and experiment protocol. | That cross-run continuity is an installed NullFrame capability. |

## Atlas responsibilities

The public atlas records authored relationships for navigation and review. In the current Demian slice, these include recurrent state, memory, ablations, full-state checkpoint restore, and the surface-only restore control. Each graph link carries an explanation and an evidence status; readers should inspect its source links before relying on a claim.

The atlas does not generate the graph from repository contents, infer causality from co-occurrence, execute controls, or certify research findings. A source link remains responsible for the behavior, method, or result it documents.

## Public-branch limit

This `main` branch contains the static atlas site and its tests/build scripts. It does not include the local NullFrame operational runtime, registry, ledger, or inference layers. They are local development work, not public-branch features, and have no supported setup path in this repository.

Keeping that distinction visible prevents a documentation route from being mistaken for a published runtime interface. Public claims about the atlas should therefore be checked against this branch; claims about a referenced project should be checked against that project's own source and evidence.
