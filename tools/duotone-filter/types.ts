export interface DuotoneOptions {
  darkColor: string;
  lightColor: string;
  intensity: number;
  invert: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

export interface ProcessedImage {
  url: string;
  name: string;
  width: number;
  height: number;
}

export interface DuotonePreset {
  name: string;
  darkColor: string;
  lightColor: string;
}
