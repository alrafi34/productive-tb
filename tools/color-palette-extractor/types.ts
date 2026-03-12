export interface ExtractedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  percentage: number;
}

export interface ColorPalette {
  colors: ExtractedColor[];
  timestamp: number;
}

export interface PaletteVariation {
  name: string;
  colors: string[];
}

export interface GradientStyle {
  css: string;
  angle: number;
  colors: string[];
}

export interface ContrastCheck {
  color1: string;
  color2: string;
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
}

export type ExportFormat = 'css' | 'scss' | 'json' | 'tailwind';
export type PaletteType = 'original' | 'light' | 'dark' | 'saturated' | 'muted';
