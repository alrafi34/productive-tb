export type Unit = "m" | "ft" | "km" | "cm" | "in";

export type ShapeMode = "manual" | "rectangle" | "square" | "triangle";

export interface Side {
  id: string;
  value: string;
}

export interface CalculatorInputs {
  sides: Side[];
  unit: Unit;
  shapeMode: ShapeMode;
  rectangleLength: string;
  rectangleWidth: string;
  squareSide: string;
  triangleSide1: string;
  triangleSide2: string;
  triangleSide3: string;
  precision: number;
}

export interface CalculationResult {
  totalBoundary: number;
  unit: Unit;
  sidesCount: number;
  breakdown: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
