export interface GoldenRatioResult {
  total: number;
  largePart: number;
  smallPart: number;
  largePercentage: number;
  smallPercentage: number;
  phi: number;
}

export interface TypographyScale {
  baseSize: number;
  sizes: number[];
  unit: string;
}

export interface SpacingScale {
  baseSpacing: number;
  values: number[];
  unit: string;
}

export interface LayoutSplit {
  totalWidth: number;
  mainWidth: number;
  sidebarWidth: number;
  mainPercentage: number;
  sidebarPercentage: number;
}

export interface CSSOutput {
  grid: string;
  flexbox: string;
  percentage: string;
  pixels: string;
}

export type CalculationMode = 'forward' | 'reverse-small' | 'reverse-large';

export interface SpiralPoint {
  x: number;
  y: number;
}
