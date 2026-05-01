export type Unit = 'ft' | 'm';
export type SlabShape = 'rectangular' | 'circular' | 'triangular' | 'lshaped';

export interface RectangularDimensions {
  length: string;
  width: string;
  thickness: string;
}

export interface CircularDimensions {
  radius: string;
  thickness: string;
}

export interface TriangularDimensions {
  base: string;
  height: string;
  thickness: string;
}

export interface LShapedDimensions {
  length1: string;
  width1: string;
  length2: string;
  width2: string;
  thickness: string;
}

export interface SlabCalculation {
  id: string;
  shape: SlabShape;
  dimensions: string;
  volumeM3: number;
  volumeFt3: number;
  volumeYd3: number;
  area: number;
  unit: Unit;
  costPerUnit?: number;
  totalCost?: number;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: SlabCalculation;
}

export interface ThicknessPreset {
  name: string;
  value: number;
  unit: string;
  description: string;
}
