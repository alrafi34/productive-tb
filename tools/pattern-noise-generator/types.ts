export interface NoiseSettings {
  intensity: number;
  grainSize: number;
  opacity: number;
  contrast: number;
  resolution: number;
  patternType: PatternType;
  colorMode: ColorMode;
  customColor: string;
  seamless: boolean;
  animated: boolean;
  animationSpeed: number;
}

export interface PreviewSettings {
  zoom: number;
  backgroundColor: string;
  overlayMode: boolean;
  backgroundType: BackgroundType;
}

export interface ExportSettings {
  format: ExportFormat;
  includeCSS: boolean;
  cssOpacity: number;
  backgroundSize: number;
}

export type PatternType = 'static-grain' | 'film-grain' | 'speckle' | 'dust' | 'perlin';

export type ColorMode = 'white' | 'black' | 'custom' | 'multi-color';

export type BackgroundType = 'light' | 'dark' | 'gradient' | 'image';

export type ExportFormat = 'png' | 'webp' | 'svg' | 'base64';

export interface NoisePreset {
  name: string;
  settings: Partial<NoiseSettings>;
  description: string;
}

export interface GeneratedTexture {
  canvas: HTMLCanvasElement;
  dataUrl: string;
  base64: string;
  css: string;
}

export interface NoiseHistory {
  id: string;
  name: string;
  settings: NoiseSettings;
  timestamp: number;
  thumbnail: string;
}