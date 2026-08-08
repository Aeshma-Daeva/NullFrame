/**
 * @typedef {'project'|'concept'|'hypothesis'|'experiment'|'method'|'source'} NodeType
 * @typedef {'prerequisite'|'formal'|'mechanistic'|'method'|'application'|'evidence'|'analogy'|'historical'} RelationType
 * @typedef {'established'|'supported'|'exploratory'} RelationStrength
 *
 * @typedef {Object} KnowledgeNode
 * @property {string} id
 * @property {NodeType} type
 * @property {string} title
 * @property {string} summary
 * @property {string=} quick
 * @property {string=} deeper
 * @property {string=} formal
 * @property {string=} status
 * @property {string=} url
 * @property {{x:number,y:number}=} position
 * @property {string[]=} sourceIds
 *
 * @typedef {Object} KnowledgeEdge
 * @property {string} id
 * @property {string} from
 * @property {string} to
 * @property {RelationType} type
 * @property {string} label
 * @property {string} explanation
 * @property {RelationStrength=} strength
 *
 * @typedef {Object} KnowledgeGraph
 * @property {KnowledgeNode[]} nodes
 * @property {KnowledgeEdge[]} edges
 */

/** @param {KnowledgeGraph} graph */
export function validateGraph(graph) {
  const errors = [];
  const nodeIds = new Set();
  const edgeIds = new Set();

  for (const node of graph.nodes ?? []) {
    if (nodeIds.has(node.id)) errors.push(`Duplicate node id: ${node.id}`);
    nodeIds.add(node.id);
    if (node.type === 'source' && (!node.url || !node.url.startsWith('https://'))) {
      errors.push(`Source node ${node.id} requires an https URL`);
    }
  }

  for (const edge of graph.edges ?? []) {
    if (edgeIds.has(edge.id)) errors.push(`Duplicate edge id: ${edge.id}`);
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.from)) errors.push(`Edge ${edge.id} references unknown node: ${edge.from}`);
    if (!nodeIds.has(edge.to)) errors.push(`Edge ${edge.id} references unknown node: ${edge.to}`);
  }

  return { ok: errors.length === 0, errors };
}

/** @param {KnowledgeGraph} graph @param {string} id */
export function getNode(graph, id) {
  return graph.nodes.find((node) => node.id === id) ?? null;
}

/** @param {KnowledgeGraph} graph @param {string} centerId */
export function getNeighborhood(graph, centerId) {
  const center = getNode(graph, centerId);
  if (!center) return { nodes: [], edges: [] };

  const neighborIds = new Set([centerId]);
  const edges = graph.edges.filter((edge) => {
    const touchesCenter = edge.from === centerId || edge.to === centerId;
    if (touchesCenter) {
      neighborIds.add(edge.from);
      neighborIds.add(edge.to);
    }
    return touchesCenter;
  });

  const nodes = graph.nodes.filter((node) => neighborIds.has(node.id));
  return { nodes, edges };
}

/**
 * @param {KnowledgeGraph} graph
 * @param {Set<NodeType>} nodeTypes
 * @param {string} centerId
 */
export function filterGraph(graph, nodeTypes, centerId) {
  const allowedIds = new Set(
    graph.nodes
      .filter((node) => node.id === centerId || nodeTypes.has(node.type))
      .map((node) => node.id),
  );

  return {
    nodes: graph.nodes.filter((node) => allowedIds.has(node.id)),
    edges: graph.edges.filter((edge) => allowedIds.has(edge.from) && allowedIds.has(edge.to)),
  };
}
