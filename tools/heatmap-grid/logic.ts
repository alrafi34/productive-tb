export interface HeatmapState {
  grid: number[][];
  rows: number;
  cols: number;
  colorGradient: "blue-red" | "green-yellow" | "purple-orange" | "custom";
  startColor: string;
  endColor: string;
  history: number[][][];
  historyIndex: number;
}

export const createGrid = (rows: number, cols: number): number[][] => {
  return Array(rows).fill(null).map(() => Array(cols).fill(0));
};

export const interpolateColor = (color1: string, color2: string, ratio: number): string => {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  
  if (!c1 || !c2) return color1;
  
  const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
  const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
  const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
  
  return `rgb(${r}, ${g}, ${b})`;
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const getGradientColors = (gradient: string): { start: string; end: string } => {
  const gradients: { [key: string]: { start: string; end: string } } = {
    "blue-red": { start: "#3b82f6", end: "#ef4444" },
    "green-yellow": { start: "#10b981", end: "#fbbf24" },
    "purple-orange": { start: "#8b5cf6", end: "#f97316" }
  };
  return gradients[gradient] || { start: "#3b82f6", end: "#ef4444" };
};

export const getCellColor = (value: number, maxValue: number, startColor: string, endColor: string): string => {
  if (maxValue === 0) return startColor;
  const ratio = Math.min(value / maxValue, 1);
  return interpolateColor(startColor, endColor, ratio);
};

export const getGridStats = (grid: number[][]): { total: number; max: number; average: number } => {
  let total = 0;
  let max = 0;
  
  grid.forEach(row => {
    row.forEach(cell => {
      total += cell;
      max = Math.max(max, cell);
    });
  });
  
  const cellCount = grid.length * grid[0].length;
  const average = cellCount > 0 ? total / cellCount : 0;
  
  return { total, max, average };
};

export const exportAsJSON = (state: HeatmapState): string => {
  return JSON.stringify({
    grid: state.grid,
    rows: state.rows,
    cols: state.cols,
    colorGradient: state.colorGradient,
    startColor: state.startColor,
    endColor: state.endColor
  }, null, 2);
};

export const importFromJSON = (json: string): Partial<HeatmapState> | null => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const randomizeGrid = (grid: number[][]): number[][] => {
  return grid.map(row => 
    row.map(() => Math.floor(Math.random() * 11))
  );
};
