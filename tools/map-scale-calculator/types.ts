export type ConversionMode = "mapToReal" | "realToMap";

export type DistanceUnit = "mm" | "cm" | "m" | "km" | "in" | "ft" | "mi";

export type OutputUnit = "auto" | "mm" | "cm" | "m" | "km" | "in" | "ft" | "mi";

export interface CalculatorInputs {
  mode: ConversionMode;
  scaleInput: string;
  distance: string;
  distanceUnit: DistanceUnit;
  outputUnit: OutputUnit;
  precision: number;
}

export interface CalculationResult {
  scaleDenominator: number;
  inputDistance: number;
  inputUnit: DistanceUnit;
  outputDistance: number;
  outputUnit: DistanceUnit;
  outputDistanceFormatted: string;
  formulaText: string;
  allUnits: Record<DistanceUnit, number>;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
