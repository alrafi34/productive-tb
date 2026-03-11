export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HSLAColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

export interface ColorShade {
  label: string;
  rgba: RGBAColor;
  hex: string;
}

export interface OpacityStep {
  alpha: number;
  rgba: string;
}
