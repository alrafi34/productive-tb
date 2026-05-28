export type DisplacementUnit = "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd" | "mi";
export type TimeUnit = "ms" | "s" | "min" | "h";
export type Precision = 2 | 4 | 6;

export interface VelocityInputs {
  displacement: string;
  displacementUnit: DisplacementUnit;
  time: string;
  timeUnit: TimeUnit;
  precision: Precision;
}

export interface VelocityResult {
  // m/s base
  velocityMs: number;
  // conversions
  velocityKmh: number;
  velocityMph: number;
  velocityFts: number;
  velocityKnots: number;
  // inputs in SI
  displacementM: number;
  timeS: number;
  // formula string
  formula: string;
  // step-by-step
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: VelocityInputs;
  result: VelocityResult;
}
