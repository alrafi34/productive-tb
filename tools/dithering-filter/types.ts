export interface DitheringOptions {
  algorithm: 'floyd-steinberg' | 'atkinson' | 'jarvis';
  threshold: number;
  pixelSize: number;
  invert: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

export interface ProcessedImage {
  id: string;
  name: string;
  originalUrl: string;
  ditheredUrl: string;
  width: number;
  height: number;
  size: number;
}

export type DitheringAlgorithm = 'floyd-steinberg' | 'atkinson' | 'jarvis';
