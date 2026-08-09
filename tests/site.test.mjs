import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
const read=(path)=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('landing page presents Nullframe and Demian entry point',()=>{assert.equal(existsSync(new URL('../site/index.html',import.meta.url)),true);const html=read('site/index.html');assert.match(html,/NULLFRAME LAB/);assert.match(html,/independent systems lab/i);assert.match(html,/projects\/demian\//);assert.match(html,/Demian Substrate/i);});
test('compact grin mark exists without upper arms',()=>{const svg=read('site/assets/grin-mark.svg');assert.match(svg,/data-grin-mark/);assert.doesNotMatch(svg,/data-upper-arm/);assert.match(svg,/data-tooth/);});
test('global stylesheet defines focus and reduced-motion foundations',()=>{const css=read('site/assets/css/global.css');assert.match(css,/:focus-visible/);assert.match(css,/prefers-reduced-motion:reduce/);});
test('landing hero contains eye-sphere structure and module',()=>{const html=read('site/index.html');assert.match(html,/data-eye-sphere/);assert.match(html,/data-eye/);assert.match(html,/data-pupil/);assert.match(html,/data-radar-ring/);assert.match(html,/assets\/js\/eye-sphere\.mjs/);});
test('eye-sphere module constrains tracking and respects reduced motion',()=>{const js=read('site/assets/js/eye-sphere.mjs');assert.match(js,/matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);assert.match(js,/requestAnimationFrame/);assert.match(js,/Math\.max\(-1, Math\.min\(1,/);});
test('Demian page exposes constellation, claim boundary, and six-channel anatomy',()=>{const html=read('site/projects/demian/index.html');assert.match(html,/data-constellation/);assert.match(html,/data-node-layer/);assert.match(html,/data-edge-layer/);assert.match(html,/data-constellation-detail/);assert.match(html,/data-node-type-filter="concept"/);assert.match(html,/fast.*slow.*control.*message.*carrier.*gate/is);assert.match(html,/does not establish self-awareness, agency, identity, consciousness/i);assert.match(html,/assets\/js\/constellation\.mjs/);});
test('constellation module renders selectable nodes, edges, filters, and explanations',()=>{const js=read('site/assets/js/constellation.mjs');assert.match(js,/createElementNS/);assert.match(js,/data-node-id/);assert.match(js,/data-edge-id/);assert.match(js,/aria-pressed/);assert.match(js,/connection\.explanation/);assert.match(js,/event\.key === 'Enter'/);});
test('public pages provide skip links and main landmarks',()=>{for(const path of ['site/index.html','site/projects/demian/index.html']){const html=read(path);assert.match(html,/class="skip-link"/);assert.match(html,/href="#main-content"/);assert.match(html,/<main[^>]*id="main-content"[^>]*>/);}});

test('homepage exposes the canonical project cockpit sections',()=>{
  const html=read('site/index.html');
  const text=html.replaceAll('&amp;','&');
  for(const label of ['Start Here','Featured Work','Methods & Evidence','Research Lineages','Negative Results & Nulls','Reproducibility & Provenance']) assert.match(text,new RegExp(label,'i'));
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

test('cockpit stylesheet defines dense responsive grids and varied accents',()=>{
  assert.equal(existsSync(new URL('../site/assets/css/home.css',import.meta.url)),true);
  const css=read('site/assets/css/home.css');
  for(const token of ['.cockpit-hero','.entry-grid','.category-strip','.featured-project-grid','.ethos-grid']) assert.match(css,new RegExp(token.replace('.','\\.')));
  assert.match(css,/--accent-purple/);
  assert.match(css,/--accent-orange/);
  assert.match(css,/--accent-cyan/);
  assert.match(css,/@media\s*\(max-width:\s*720px\)/);
});

test('homepage loads the Figma-approved typography stack',()=>{
  const html=read('site/index.html');
  const css=read('site/assets/css/home.css');
  assert.match(html,/fonts\.googleapis\.com/);
  assert.match(html,/Barlow\+Condensed/);
  assert.match(html,/IBM\+Plex\+Sans/);
  assert.match(html,/IBM\+Plex\+Mono/);
  assert.match(css,/--home-display:\s*"Barlow Condensed"/);
  assert.match(css,/--home-body:\s*"IBM Plex Sans"/);
  assert.match(css,/--home-mono:\s*"IBM Plex Mono"/);
});

test('homepage uses the Figma observer mark instead of the generic CSS sphere',()=>{
  const html=read('site/index.html');
  assert.match(html,/data-observer-mark/);
  assert.match(html,/observer-mark\.svg/);
  assert.match(html,/data-eye-sphere/);
});

test('homepage comfortable reading sizes are encoded in the visual stylesheet',()=>{
  const css=read('site/assets/css/home.css');
  assert.match(css,/\.cockpit-lead\s*\{[^}]*font-size:\s*1\.125rem/s);
  assert.match(css,/\.entry-card p\s*\{[^}]*font-size:\s*\.84rem/s);
  assert.match(css,/\.entry-card h3\s*\{[^}]*font-size:\s*1rem/s);
  assert.match(css,/\.project-tile h3\s*\{[^}]*font-size:\s*\.84rem/s);
  assert.match(css,/@media\s*\(max-width:\s*720px\)[\s\S]*\.entry-card p\s*\{[^}]*font-size:\s*\.78rem/s);
});
