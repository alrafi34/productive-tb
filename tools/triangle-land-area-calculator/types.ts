export type CalcMethod = "base-height" | "three-sides" | "coordinates";
export type InputUnit = "ft" | "m" | "yd" | "in" | "cm";
export type OutputUnit = "sqft" | "sqm" | "acres" | "hectares" | "sqyd" | "sqin" | "sqcm";

export interface BaseHeightInputs {
  base: string;
  height: string;
}

export interface ThreeSidesInputs {
  sideA: string;
  sideB: string;
  sideC: string;
}

export interface CoordInputs {
  x1: string; y1: string;
  x2: string; y2: string;
  x3: string; y3: string;
}

export interface CalculatorInputs {
  method: CalcMethod;
  unit: InputUnit;
  outputUnit: OutputUnit;
  baseHeight: BaseHeightInputs;
  threeSides: ThreeSidesInputs;
  coords: CoordInputs;
  precision: number;
}

export interface CalculationResult {
  areaSqFt: number;
  areaInUnit: number;
  outputUnit: OutputUnit;
  formula: string;
  steps: string[];
  method: CalcMethod;
  inputUnit: InputUnit;
  // all conversions
  sqft: number;
  sqm: number;
  acres: number;
  hectares: number;
  sqyd: number;
  sqin: number;
  sqcm: number;
  // extras
  perimeter?: number; // for three-sides
  semiPerimeter?: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
