export interface ContrastConfig {
  foregroundColor: string;
  backgroundColor: string;
  fontSize: number;
}

export interface ContrastResult {
  ratio: number;
  normalAA: boolean;
  normalAAA: boolean;
  largeAA: boolean;
  largeAAA: boolean;
}

export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
}

export interface ColorPreset {
  name: string;
  foreground: string;
  background: string;
  description: string;
}