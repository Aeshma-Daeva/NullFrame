import { demianGraph } from './data/demian-graph.mjs';
import { getNode, validateGraph } from './graph.mjs';

const root = document.querySelector('[data-constellation]');

if (root) {
  const validation = validateGraph(demianGraph);
  if (!validation.ok) {
    throw new Error(`Invalid Demian graph:\n${validation.errors.join('\n')}`);
  }

  const edgeLayer = root.querySelector('[data-edge-layer]');
  const nodeLayer = root.querySelector('[data-node-layer]');
  const detail = root.querySelector('[data-constellation-detail]');
  const filters = [...root.querySelectorAll('[data-node-type-filter]')];

  const detailKind = detail.querySelector('[data-detail-kind]');
  const detailTitle = detail.querySelector('[data-detail-title]');
  const detailSummary = detail.querySelector('[data-detail-summary]');
  const detailQuick = detail.querySelector('[data-detail-quick]');
  const detailDeeper = detail.querySelector('[data-detail-deeper]');
  const detailStatus = detail.querySelector('[data-detail-status]');
  const detailLinks = detail.querySelector('[data-detail-links]');
  const detailConnections = detail.querySelector('[data-detail-connections]');

  let selectedNodeId = 'demian';
  let selectedEdgeId = null;

  const visibleTypes = () => new Set(
    filters
      .filter((button) => button.getAttribute('aria-pressed') === 'true')
      .map((button) => button.dataset.nodeTypeFilter),
  );

  const isVisible = (node) => node.id === 'demian' || visibleTypes().has(node.type);

  const edgeTouches = (edge, nodeId) => edge.from === nodeId || edge.to === nodeId;

  const connectionLabel = (edge) => {
    const from = getNode(demianGraph, edge.from)?.title ?? edge.from;
    const to = getNode(demianGraph, edge.to)?.title ?? edge.to;
    return `${from} — ${edge.label} — ${to}`;
  };

  const clearDetail = () => {
    detailQuick.hidden = true;
    detailDeeper.hidden = true;
    detailStatus.hidden = true;
    detailLinks.replaceChildren();
    detailConnections.replaceChildren();
  };

  const appendLink = (label, href) => {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    anchor.textContent = label;
    detailLinks.append(anchor);
  };

  const selectConnection = (connection) => {
    selectedEdgeId = connection.id;
    selectedNodeId = null;
    clearDetail();

    const from = getNode(demianGraph, connection.from);
    const to = getNode(demianGraph, connection.to);
    detailKind.textContent = `${connection.type} connection · ${connection.strength ?? 'unrated'}`;
    detailTitle.textContent = `${from?.title ?? connection.from} ↔ ${to?.title ?? connection.to}`;
    detailSummary.textContent = connection.explanation;
    detailQuick.hidden = false;
    detailQuick.textContent = `Relation: ${connection.label}.`;
    detailDeeper.hidden = false;
    detailDeeper.textContent = 'This edge is authored explicitly. Its position in the graph is navigation; the text above is the actual claim about how the nodes relate.';

    [...root.querySelectorAll('[data-edge-id]')].forEach((element) => {
      element.classList.toggle('is-selected', element.dataset.edgeId === connection.id);
    });
    [...root.querySelectorAll('[data-node-id]')].forEach((element) => element.classList.remove('is-selected'));
  };

  const selectNode = (node) => {
    selectedNodeId = node.id;
    selectedEdgeId = null;
    clearDetail();

    detailKind.textContent = node.type;
    detailTitle.textContent = node.title;
    detailSummary.textContent = node.summary;

    if (node.quick) {
      detailQuick.hidden = false;
      detailQuick.textContent = node.quick;
    }
    if (node.deeper) {
      detailDeeper.hidden = false;
      detailDeeper.textContent = node.deeper;
    }
    if (node.status) {
      detailStatus.hidden = false;
      detailStatus.textContent = node.status;
    }
    if (node.url) appendLink('Open public source ↗', node.url);
    for (const sourceId of node.sourceIds ?? []) {
      const source = getNode(demianGraph, sourceId);
      if (source?.url) appendLink(source.title, source.url);
    }

    const connections = demianGraph.edges.filter((edge) => {
      if (!edgeTouches(edge, node.id)) return false;
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const other = getNode(demianGraph, otherId);
      return other && isVisible(other);
    });

    for (const connection of connections) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `connection-row relation-${connection.type}`;
      button.innerHTML = `<span>${connection.type}</span><strong>${connectionLabel(connection)}</strong>`;
      button.addEventListener('click', () => selectConnection(connection));
      detailConnections.append(button);
    }

    [...root.querySelectorAll('[data-node-id]')].forEach((element) => {
      element.classList.toggle('is-selected', element.dataset.nodeId === node.id);
    });
    [...root.querySelectorAll('[data-edge-id]')].forEach((element) => {
      const graphEdge = demianGraph.edges.find((edge) => edge.id === element.dataset.edgeId);
      element.classList.toggle('is-related', Boolean(graphEdge && edgeTouches(graphEdge, node.id)));
      element.classList.remove('is-selected');
    });
  };

  const highlightNode = (nodeId, active) => {
    const relatedEdges = demianGraph.edges.filter((edge) => edgeTouches(edge, nodeId)).map((edge) => edge.id);
    root.classList.toggle('has-hover', active);
    for (const nodeButton of root.querySelectorAll('[data-node-id]')) {
      const node = getNode(demianGraph, nodeButton.dataset.nodeId);
      const connected = node?.id === nodeId || demianGraph.edges.some((edge) => edgeTouches(edge, nodeId) && edgeTouches(edge, node?.id));
      nodeButton.classList.toggle('is-neighbor', active && connected);
    }
    for (const edgeElement of root.querySelectorAll('[data-edge-id]')) {
      edgeElement.classList.toggle('is-hover-related', active && relatedEdges.includes(edgeElement.dataset.edgeId));
    }
  };

  const render = () => {
    edgeLayer.replaceChildren();
    nodeLayer.replaceChildren();

    const nodes = demianGraph.nodes.filter(isVisible);
    const visibleIds = new Set(nodes.map((node) => node.id));
    const edges = demianGraph.edges.filter((edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to));

    for (const connection of edges) {
      const from = getNode(demianGraph, connection.from);
      const to = getNode(demianGraph, connection.to);
      if (!from?.position || !to?.position) continue;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', from.position.x);
      line.setAttribute('y1', from.position.y);
      line.setAttribute('x2', to.position.x);
      line.setAttribute('y2', to.position.y);
      line.setAttribute('class', `graph-edge relation-${connection.type}`);
      line.setAttribute('data-edge-id', connection.id);
      line.setAttribute('tabindex', '0');
      line.setAttribute('role', 'button');
      line.setAttribute('aria-label', connectionLabel(connection));
      line.addEventListener('click', () => selectConnection(connection));
      line.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectConnection(connection);
        }
      });
      edgeLayer.append(line);
    }

    for (const node of nodes) {
      if (!node.position) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `graph-node node-${node.type}${node.id === 'demian' ? ' graph-node-center' : ''}`;
      button.setAttribute('data-node-id', node.id);
      button.style.left = `${node.position.x}%`;
      button.style.top = `${node.position.y}%`;
      button.innerHTML = `<span class="graph-node-type">${node.type}</span><strong>${node.title}</strong>`;
      button.addEventListener('click', () => selectNode(node));
      button.addEventListener('pointerenter', () => highlightNode(node.id, true));
      button.addEventListener('pointerleave', () => highlightNode(node.id, false));
      button.addEventListener('focus', () => highlightNode(node.id, true));
      button.addEventListener('blur', () => highlightNode(node.id, false));
      nodeLayer.append(button);
    }

    if (selectedNodeId) {
      const node = getNode(demianGraph, selectedNodeId);
      if (node && isVisible(node)) selectNode(node);
      else selectNode(getNode(demianGraph, 'demian'));
    } else if (selectedEdgeId) {
      const connection = demianGraph.edges.find((edge) => edge.id === selectedEdgeId);
      if (connection && visibleIds.has(connection.from) && visibleIds.has(connection.to)) selectConnection(connection);
      else selectNode(getNode(demianGraph, 'demian'));
    }
  };

  for (const filter of filters) {
    filter.addEventListener('click', () => {
      const pressed = filter.getAttribute('aria-pressed') === 'true';
      filter.setAttribute('aria-pressed', String(!pressed));
      render();
    });
  }

  render();
}
