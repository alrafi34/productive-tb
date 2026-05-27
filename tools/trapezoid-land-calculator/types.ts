export type InputUnit = "ft" | "m" | "yd" | "in";
export type OutputUnit = "sqft" | "sqm" | "acres" | "hectares" | "sqyd";

export interface CalculatorInputs {
  topBase: string;
  bottomBase: string;
  height: string;
  unit: InputUnit;
  outputUnit: OutputUnit;
  precision: number;
}

export interface CalculationResult {
  topBase: number;
  bottomBase: number;
  height: number;
  rawArea: number;       // area in input unit²
  areaSqFt: number;
  areaInUnit: number;
  outputUnit: OutputUnit;
  inputUnit: InputUnit;
  formula: string;
  steps: string[];
  // all conversions
  sqft: number;
  sqm: number;
  acres: number;
  hectares: number;
  sqyd: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
