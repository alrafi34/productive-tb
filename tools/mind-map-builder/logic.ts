export interface MindMapNode {
  id: string;
  title: string;
  description?: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

export interface MindMapConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
}

export interface MindMapState {
  nodes: MindMapNode[];
  connections: MindMapConnection[];
}

export function generateNodeId(): string {
  return `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateConnectionId(): string {
  return `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createNode(title: string, x: number, y: number, color: string = "#3B82F6"): MindMapNode {
  return {
    id: generateNodeId(),
    title,
    x,
    y,
    color,
    size: 40
  };
}

export function createConnection(fromNodeId: string, toNodeId: string): MindMapConnection {
  return {
    id: generateConnectionId(),
    fromNodeId,
    toNodeId
  };
}

export function deleteNode(state: MindMapState, nodeId: string): MindMapState {
  return {
    nodes: state.nodes.filter(n => n.id !== nodeId),
    connections: state.connections.filter(c => c.fromNodeId !== nodeId && c.toNodeId !== nodeId)
  };
}

export function deleteConnection(state: MindMapState, connectionId: string): MindMapState {
  return {
    nodes: state.nodes,
    connections: state.connections.filter(c => c.id !== connectionId)
  };
}

export function updateNodePosition(state: MindMapState, nodeId: string, x: number, y: number): MindMapState {
  return {
    nodes: state.nodes.map(n => n.id === nodeId ? { ...n, x, y } : n),
    connections: state.connections
  };
}

export function updateNodeColor(state: MindMapState, nodeId: string, color: string): MindMapState {
  return {
    nodes: state.nodes.map(n => n.id === nodeId ? { ...n, color } : n),
    connections: state.connections
  };
}

export function updateNodeTitle(state: MindMapState, nodeId: string, title: string): MindMapState {
  return {
    nodes: state.nodes.map(n => n.id === nodeId ? { ...n, title } : n),
    connections: state.connections
  };
}

export function getNodeById(state: MindMapState, nodeId: string): MindMapNode | undefined {
  return state.nodes.find(n => n.id === nodeId);
}

export function getConnectionById(state: MindMapState, connectionId: string): MindMapConnection | undefined {
  return state.connections.find(c => c.id === connectionId);
}

export function isNodeAtPosition(nodes: MindMapNode[], x: number, y: number, radius: number = 50): MindMapNode | null {
  for (const node of nodes) {
    const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
    if (distance <= radius) return node;
  }
  return null;
}

export function exportToJSON(state: MindMapState): string {
  return JSON.stringify(state, null, 2);
}

export function importFromJSON(json: string): MindMapState | null {
  try {
    const parsed = JSON.parse(json);
    if (parsed.nodes && parsed.connections) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function snapToGrid(value: number, gridSize: number = 20): number {
  return Math.round(value / gridSize) * gridSize;
}

export const COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#F97316", // Orange
];
