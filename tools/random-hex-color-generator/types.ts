export interface ColorData {
  id: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  locked: boolean;
}

export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
}

export interface GeneratorState {
  colors: ColorData[];
  paletteSize: 1 | 3 | 5;
  gradientMode: boolean;
  history: string[];
  copiedColor: string | null;
}

export interface GradientData {
  id: string;
  css: string;
  colors: string[];
  direction: number;
}