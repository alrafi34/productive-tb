export type Unit = "ft" | "m" | "yd" | "km";
export type PlotMode = "rectangle" | "triangle" | "polygon";
export type OutputUnit =
  | "sqft"
  | "sqm"
  | "acres"
  | "hectares"
  | "sqyd"
  | "decimal"
  | "bigha"
  | "katha";

export interface RectangleInputs {
  length: string;
  width: string;
}

export interface TriangleInputs {
  sideA: string;
  sideB: string;
  sideC: string;
}

export interface PolygonPoint {
  x: string;
  y: string;
}

export interface CalculatorInputs {
  mode: PlotMode;
  unit: Unit;
  outputUnit: OutputUnit;
  rectangle: RectangleInputs;
  triangle: TriangleInputs;
  polygonCoords: string; // raw textarea input
  precision: number;
}

export interface CalculationResult {
  areaSqFt: number;
  areaInUnit: number;
  outputUnit: OutputUnit;
  formula: string;
  inputUnit: Unit;
  mode: PlotMode;
  // conversions
  sqft: number;
  sqm: number;
  acres: number;
  hectares: number;
  sqyd: number;
  decimal: number;
  bigha: number;
  katha: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
