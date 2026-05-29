export type SystemType = "spring-mass" | "pendulum" | "beam" | "torsional";

// Spring-Mass
export type MassUnit = "kg" | "g" | "lb";
export type SpringKUnit = "N/m" | "kN/m" | "lb/in";

// Pendulum
export type LengthUnit = "m" | "cm" | "ft" | "in";

// Beam
export type BeamLengthUnit = "m" | "cm" | "ft" | "in";
export type YoungModulusUnit = "GPa" | "MPa" | "psi";
export type MomentUnit = "m4" | "cm4" | "in4";
export type DensityUnit = "kg/m3" | "lb/ft3";

// Torsional
export type TorsionalKUnit = "N·m/rad" | "lb·in/rad";
export type MomentOfInertiaUnit = "kg·m2" | "lb·in2";

export type Precision = 2 | 4 | 6 | 8;

export interface SpringMassInputs {
  mass: string;
  massUnit: MassUnit;
  springConstant: string;
  springKUnit: SpringKUnit;
}

export interface PendulumInputs {
  length: string;
  lengthUnit: LengthUnit;
}

export interface BeamInputs {
  beamLength: string;
  beamLengthUnit: BeamLengthUnit;
  youngModulus: string;
  youngModulusUnit: YoungModulusUnit;
  momentOfInertia: string;
  momentUnit: MomentUnit;
  density: string;
  densityUnit: DensityUnit;
  crossSectionArea: string; // m²
}

export interface TorsionalInputs {
  torsionalStiffness: string;
  torsionalKUnit: TorsionalKUnit;
  momentOfInertia: string;
  momentOfInertiaUnit: MomentOfInertiaUnit;
}

export interface NaturalFrequencyInputs {
  system: SystemType;
  springMass: SpringMassInputs;
  pendulum: PendulumInputs;
  beam: BeamInputs;
  torsional: TorsionalInputs;
  precision: Precision;
}

export interface NaturalFrequencyResult {
  frequencyHz: number;
  angularFrequencyRad: number;
  periodSeconds: number;
  formula: string;
  stepByStep: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: NaturalFrequencyInputs;
  result: NaturalFrequencyResult;
  systemLabel: string;
}
