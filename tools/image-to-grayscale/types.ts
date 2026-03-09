export interface GrayscaleOptions {
  intensity: number; // 0-100
  invert: boolean;
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  maxWidth?: number;
  maxHeight?: number;
}

export interface ProcessedImage {
  id: string;
  name: string;
  originalUrl: string;
  grayscaleUrl: string;
  width: number;
  height: number;
  size: number;
}
