# Nullframe Homepage Cockpit Redesign

## Goal

Restore the homepage as a compact, visually coherent project cockpit rather than a concept-first research manifesto. Nullframe should feel useful and fun to open: project diversity is visible immediately, each project has a recognizable symbolic identity, and deeper knowledge/epistemology is entered through projects instead of dominating the front door.

## Canonical information architecture

The homepage order is fixed for this pass:

1. Compact hero
2. Recommended Entry Path
3. Category strip
4. Featured Projects
5. Our Ethos
6. Compact status/footer

The second provided mobile reference is the canonical density/hierarchy target. It should be adapted responsively rather than copied literally.

## Hero

The hero is compact and should not consume a full viewport.

Required elements:
- NULLFRAME LAB title
- `[ independent systems lab ]`
- short one-sentence description of the lab
- eye/grin organism as a branded visual accent, not a dominant 50%-width interface object
- subtle technical decoration such as grid/radar/signal traces

Avoid:
- long manifesto copy
- large empty negative space
- making the knowledge graph itself the brand
- monochrome green-only treatment

## Recommended Entry Path

Render six compact cards with custom line icons and distinct but restrained accent colors:

1. Start Here — orientation for a first visit
2. Featured Work — curated active/representative projects
3. Methods & Evidence — controls, evidence policy, claim boundaries
4. Research Lineages — how projects/concepts evolved and branched
5. Negative Results & Nulls — failed tests and non-results remain visible
6. Reproducibility & Provenance — code, artifacts, continuity, source trail

Cards should read quickly at a glance and feel like navigable instruments, not article teasers.

## Category strip

A compact visual navigation row directly below the entry cards:

- Projects
- Research
- Experiments
- Software
- Builds
- Changelog

Each category receives a simple line icon. The row should collapse cleanly on narrow screens without becoming a generic hamburger-only navigation.

## Featured Projects

The homepage must expose the actual ecosystem immediately.

Initial featured set:
- Demian Lab
- Demian EEG
- Demian Geo
- Anima Mundi
- Shadow King
- Projector Pan/Tilt
- Demian Substrate

Each project gets:
- unique symbolic line-art emblem
- project name
- one short status/domain label
- restrained project-specific accent
- clear hover/focus state

Visual identity targets:
- Demian Lab: radar / attractor geometry
- Demian EEG: waveform / biosignal geometry
- Demian Geo: orbital / geographic geometry
- Anima Mundi: branching tree / ecology structure
- Shadow King: crystalline / architectural form
- Projector Pan/Tilt: robotic arm / kinematic form
- Demian Substrate: nested cube / recurrent core

The Anima Mundi tree-like emblem is specifically important because it communicates the project intuitively and was positively identified in the reference.

## Our Ethos

Three compact cards:
- Evidence policy
- Privacy boundaries
- Negative results

These should state policy briefly and link deeper. They are not the homepage's conceptual centerpiece.

## Project-local depth

No deep knowledge work is discarded.

The homepage is only the cockpit. Deep material lives inside project surfaces.

A project page may contain:
- project question / hypothesis
- architecture
- experiments
- sources
- negative results
- conceptual field / project-local knowledge graph
- authored explanations of why fields or ideas connect
- research lineage / how the idea changed

The graph is therefore a visualization tool used where spatial relationships improve understanding. It is not synonymous with Nullframe.

## Tone and visual language

Target:
- dense but legible
- dark HUD / cybernetic lab
- playful enough to enjoy opening
- varied neon accents rather than one flat green system
- precise, compact copy
- attractive custom icons
- subtle texture/grid/radar details
- responsive/mobile-first coherence

Avoid:
- corporate dashboard aesthetic
- generic SaaS cards
- giant empty hero layouts
- occult/mystical prose in interface copy
- epic language
- unnecessary conceptual exposition on the homepage

The branded eye/grin organism may remain uncanny and distinctive, but it should function as identity rather than as an interface gimmick.

## Responsive behavior

Mobile is a first-class target, not a collapsed desktop version.

At narrow widths:
- hero remains compact
- six entry cards form a legible 2-column or single-column flow depending on width
- category strip remains scannable
- featured project tiles remain visually distinct
- project emblems retain enough size to read
- no horizontal overflow

Desktop should preserve the same density and hierarchy instead of dramatically inflating whitespace.

## Data and implementation boundary

This pass should remain within the current zero-dependency static architecture unless a concrete limitation forces a framework change.

Homepage project/card data should be centralized rather than duplicated through markup where practical, so later additions are straightforward.

Existing Demian deep-page/constellation work can remain in place unless a minimal compatibility adjustment is required by shared styling.

## Accessibility

Preserve or improve:
- semantic landmarks
- keyboard focus states
- reduced-motion handling
- sufficient contrast
- descriptive link labels
- decorative SVGs hidden from assistive technology when appropriate

## Testing

Tests should assert the redesigned homepage contains:
- compact hero identity
- six canonical Recommended Entry Path cards
- six category-strip entries
- seven featured projects
- the three ethos cards
- project emblems/identifiers
- absence of the old full-viewport concept-first homepage structure where relevant

Build and existing graph tests must remain green.

## Success criteria

The redesign succeeds when:
- the homepage communicates the breadth of Nullframe within the first screen/scroll region
- the page feels closer to the supplied mobile reference in density, organization, visual identity, and usefulness
- projects regain primacy over the knowledge graph
- each featured project is visually recognizable before reading long copy
- the deep research architecture remains accessible through project pages
- desktop does not become emptier and more generic than mobile
