export type GridSize = 16 | 32;

export type PixelGrid = (string | null)[][];

export interface PixelArtState {
  grid: PixelGrid;
  gridSize: GridSize;
  selectedColor: string;
  tool: 'brush' | 'eraser' | 'fill';
  isDrawing: boolean;
  history: PixelGrid[];
  historyIndex: number;
}

export interface ExportOptions {
  format: 'png' | 'css' | 'json';
  pixelSize?: number;
}