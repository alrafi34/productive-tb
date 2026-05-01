export type Unit = 'm' | 'ft' | 'yd';

export type ShapeType = 'rectangle' | 'square' | 'triangle' | 'trapezoid';

export interface PlotDimensions {
  shape: ShapeType;
  unit: Unit;
  // Rectangle
  length?: string;
  width?: string;
  // Square
  side?: string;
  // Triangle
  base?: string;
  height?: string;
  // Trapezoid
  topLength?: string;
  bottomLength?: string;
  trapezoidHeight?: string;
}

export interface CalculationResult {
  area: number;
  unit: Unit;
  shape: ShapeType;
  dimensions: PlotDimensions;
  formula: string;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  result: CalculationResult;
}
