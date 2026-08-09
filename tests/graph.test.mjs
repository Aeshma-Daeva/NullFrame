import test from 'node:test';
import assert from 'node:assert/strict';
import * as graph from '../site/assets/js/graph.mjs';

const validGraph = {
  nodes: [
    { id: 'demian', type: 'project', title: 'Demian', summary: 'center' },
    { id: 'recurrence', type: 'concept', title: 'Recurrence', summary: 'history matters' },
    { id: 'source-readme', type: 'source', title: 'README', summary: 'public source', url: 'https://example.com/readme' },
  ],
  edges: [
    { id: 'demian-recurrence', from: 'demian', to: 'recurrence', type: 'application', label: 'uses', explanation: 'Demian uses recurrent state.', strength: 'established' },
    { id: 'demian-source', from: 'demian', to: 'source-readme', type: 'evidence', label: 'documented by', explanation: 'The public source documents the runtime.', strength: 'established' },
  ],
};

test('validateGraph accepts a valid graph', () => assert.deepEqual(graph.validateGraph(validGraph), { ok: true, errors: [] }));
test('validateGraph rejects duplicate node ids', () => { const input=structuredClone(validGraph); input.nodes.push({...input.nodes[0]}); const result=graph.validateGraph(input); assert.equal(result.ok,false); assert.match(result.errors.join('\n'),/duplicate node id: demian/i); });
test('validateGraph rejects dangling edge endpoints', () => { const input=structuredClone(validGraph); input.edges[0].to='missing'; const result=graph.validateGraph(input); assert.equal(result.ok,false); assert.match(result.errors.join('\n'),/unknown node: missing/i); });
test('validateGraph rejects duplicate edge ids', () => { const input=structuredClone(validGraph); input.edges.push({...input.edges[0]}); const result=graph.validateGraph(input); assert.equal(result.ok,false); assert.match(result.errors.join('\n'),/duplicate edge id: demian-recurrence/i); });
test('validateGraph requires https urls on source nodes', () => { const input=structuredClone(validGraph); input.nodes.find(n=>n.type==='source').url='http://example.com/readme'; const result=graph.validateGraph(input); assert.equal(result.ok,false); assert.match(result.errors.join('\n'),/source node source-readme requires an https url/i); });
test('getNeighborhood returns center and direct neighbors deterministically', () => { const result=graph.getNeighborhood(validGraph,'demian'); assert.deepEqual(result.nodes.map(n=>n.id),['demian','recurrence','source-readme']); assert.deepEqual(result.edges.map(e=>e.id),['demian-recurrence','demian-source']); });
test('filterGraph never hides the center project', () => { const result=graph.filterGraph(validGraph,new Set(['concept']),'demian'); assert.deepEqual(result.nodes.map(n=>n.id),['demian','recurrence']); assert.deepEqual(result.edges.map(e=>e.id),['demian-recurrence']); });
test('Demian vertical slice is valid and contains the planned neighborhood', async () => { const {demianGraph}=await import('../site/assets/js/data/demian-graph.mjs'); const result=graph.validateGraph(demianGraph); assert.equal(result.ok,true,result.errors.join('\n')); const ids=new Set(demianGraph.nodes.map(n=>n.id)); for(const required of ['demian','recurrent-neural-network','hidden-state','recurrence','dynamical-system','state','attractor','basin-of-attraction','memory','continuity','agency','adversarial-testing','full-state-capsule-restore','surface-only-restore-control','gate-state-propagation']) assert.ok(ids.has(required),`missing planned node ${required}`); assert.ok(demianGraph.nodes.filter(n=>['concept','method'].includes(n.type)).length>=10); assert.ok(demianGraph.nodes.filter(n=>n.type==='source').length>=4); });
test('Demian source nodes are public HTTPS references', async () => { const {demianGraph}=await import('../site/assets/js/data/demian-graph.mjs'); for(const source of demianGraph.nodes.filter(n=>n.type==='source')) assert.match(source.url,/^https:\/\//); });
