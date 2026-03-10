export interface HSLColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface ColorFormats {
  hsl: string;
  hex: string;
  rgb: string;
}

export interface ColorPalette {
  name: string;
  colors: HSLColor[];
}

export interface HSLSliderState {
  currentColor: HSLColor;
  colorHistory: HSLColor[];
  selectedPalette: ColorPalette | null;
}

export type PaletteType = 'analogous' | 'triadic' | 'tetradic' | 'monochromatic' | 'complementary';