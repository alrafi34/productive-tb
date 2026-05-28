export type ForceUnit = "N" | "kN" | "lbf" | "kgf";
export type AreaUnit = "m2" | "cm2" | "mm2" | "in2" | "ft2";
export type StressUnit = "Pa" | "kPa" | "MPa" | "GPa" | "psi" | "ksi";
export type Precision = 2 | 4 | 6;

export interface StressInputs {
  force: string;
  forceUnit: ForceUnit;
  area: string;
  areaUnit: AreaUnit;
  outputUnit: StressUnit;
  precision: Precision;
}

export interface StressResult {
  stressPa: number;
  stressInOutputUnit: number;
  stressPaDisplay: number;
  stressKPa: number;
  stressMPa: number;
  stressGPa: number;
  stressPsi: number;
  stressKsi: number;
  forceN: number;
  areaM2: number;
  interpretation: string;
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: StressInputs;
  result: StressResult;
}
