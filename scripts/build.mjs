import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { demianGraph } from '../site/assets/js/data/demian-graph.mjs';
import { validateGraph } from '../site/assets/js/graph.mjs';

const required = [
  'site/index.html',
  'site/projects/demian/index.html',
  'site/assets/css/global.css',
  'site/assets/js/constellation.mjs',
  'site/assets/js/eye-sphere.mjs',
  'site/assets/grin-mark.svg',
];

for (const path of required) {
  const info = await stat(path).catch(() => null);
  if (!info?.isFile()) throw new Error(`Required static file missing: ${path}`);
}

const validation = validateGraph(demianGraph);
if (!validation.ok) {
  throw new Error(`Knowledge graph validation failed:\n${validation.errors.join('\n')}`);
}

const invalidSource = demianGraph.nodes.find(
  (node) => node.type === 'source' && (!node.url || !node.url.startsWith('https://')),
);
if (invalidSource) throw new Error(`Invalid public source URL: ${invalidSource.id}`);

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('site', 'dist', { recursive: true });

console.log(`Nullframe v0.1 built: ${demianGraph.nodes.length} nodes, ${demianGraph.edges.length} connections -> dist/`);
