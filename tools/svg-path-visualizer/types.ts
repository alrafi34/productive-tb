export interface PathConfig {
  path: string;
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
  viewBoxX: number;
  viewBoxY: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  showGrid: boolean;
  gridSize: number;
}

export interface SamplePath {
  name: string;
  path: string;
  description: string;
}