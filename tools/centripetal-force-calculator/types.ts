export type MassUnit = "kg" | "g" | "lb" | "t";
export type VelocityUnit = "m/s" | "km/h" | "mph";
export type RadiusUnit = "m" | "cm" | "ft";
export type OmegaUnit = "rad/s";
export type CalcMode = "velocity" | "angular";
export type Precision = 2 | 4 | 6;

export interface CentripetalInputs {
  mode: CalcMode;
  mass: string;
  massUnit: MassUnit;
  velocity: string;
  velocityUnit: VelocityUnit;
  radius: string;
  radiusUnit: RadiusUnit;
  omega: string;
  omegaUnit: OmegaUnit;
  precision: Precision;
}

export interface CentripetalResult {
  forceN: number;
  forceKN: number;
  forceLbf: number;
  massKg: number;
  velocityMs: number;
  radiusM: number;
  omegaRads: number;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CentripetalInputs;
  result: CentripetalResult;
}
