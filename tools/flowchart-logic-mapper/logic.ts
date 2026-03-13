export interface Box {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  shape: "rectangle" | "rounded" | "diamond";
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  label: string;
  style: "solid" | "dashed" | "curved";
}

export interface FlowchartState {
  boxes: Box[];
  connections: Connection[];
  selectedBoxIds: Set<string>;
  history: FlowchartState[];
  historyIndex: number;
}

export const createBox = (title: string, x: number, y: number): Box => ({
  id: `box-${Date.now()}-${Math.random()}`,
  title,
  x,
  y,
  width: 120,
  height: 60,
  color: "#3b82f6",
  shape: "rounded"
});

export const createConnection = (fromId: string, toId: string): Connection => ({
  id: `conn-${Date.now()}-${Math.random()}`,
  fromId,
  toId,
  label: "",
  style: "solid"
});

export const getBoxCenter = (box: Box) => ({
  x: box.x + box.width / 2,
  y: box.y + box.height / 2
});

export const isPointInBox = (px: number, py: number, box: Box): boolean => {
  return px >= box.x && px <= box.x + box.width && py >= box.y && py <= box.y + box.height;
};

export const exportAsJSON = (state: FlowchartState): string => {
  return JSON.stringify({
    boxes: state.boxes,
    connections: state.connections
  }, null, 2);
};

export const importFromJSON = (json: string): { boxes: Box[]; connections: Connection[] } | null => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};
