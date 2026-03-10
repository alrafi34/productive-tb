export interface GradientPoint {
  id: string;
  color: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number; // pixels
  blur: number; // pixels
  opacity: number; // 0-1
}

export interface MeshGradientConfig {
  points: GradientPoint[];
  backgroundColor: string;
  noiseIntensity: number;
  canvasWidth: number;
  canvasHeight: number;
}

export interface MeshPreset {
  name: string;
  description: string;
  config: Omit<MeshGradientConfig, 'canvasWidth' | 'canvasHeight'>;
}

export interface ExportOptions {
  format: 'css' | 'scss' | 'svg' | 'png';
  includeNoise: boolean;
  minified: boolean;
}