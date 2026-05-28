export type SolveFor = "P1" | "P2" | "V1" | "V2" | "h1" | "h2";

export type PressureUnit = "Pa" | "kPa" | "bar" | "psi";
export type VelocityUnit = "m/s" | "ft/s";
export type HeightUnit = "m" | "ft";
export type DensityUnit = "kg/m3" | "lb/ft3";
export type Precision = 2 | 4 | 6;

export interface BernoulliInputs {
  solveFor: SolveFor;
  P1: string;
  P1Unit: PressureUnit;
  P2: string;
  P2Unit: PressureUnit;
  V1: string;
  V1Unit: VelocityUnit;
  V2: string;
  V2Unit: VelocityUnit;
  h1: string;
  h1Unit: HeightUnit;
  h2: string;
  h2Unit: HeightUnit;
  density: string;
  densityUnit: DensityUnit;
  gravity: string;
  precision: Precision;
}

export interface BernoulliResult {
  value: number;
  unit: string;
  label: string;
  // SI intermediates
  P1_si: number;
  P2_si: number;
  V1_si: number;
  V2_si: number;
  h1_si: number;
  h2_si: number;
  density_si: number;
  gravity_si: number;
  // step-by-step
  formulaGeneral: string;
  formulaRearranged: string;
  formulaSubstituted: string;
  formulaResult: string;
  // energy terms (Pa)
  kineticEnergy1: number;
  kineticEnergy2: number;
  potentialEnergy1: number;
  potentialEnergy2: number;
  totalEnergy1: number;
  totalEnergy2: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BernoulliInputs;
  result: BernoulliResult;
}

export interface FluidPreset {
  label: string;
  density: string;
  densityUnit: DensityUnit;
}
