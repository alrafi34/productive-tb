export type VelocityUnit = "m/s" | "ft/s" | "cm/s";
export type DiameterUnit = "m" | "cm" | "mm" | "in" | "ft";
export type DensityUnit = "kg/m3" | "g/cm3" | "lb/ft3";
export type ViscosityUnit = "Pa·s" | "cP";
export type FlowContext = "pipe" | "external" | "general";
export type Precision = 2 | 4 | 6;

export type FlowRegime = "laminar" | "transitional" | "turbulent";

export interface ReynoldsInputs {
  velocity: string;
  velocityUnit: VelocityUnit;
  diameter: string;
  diameterUnit: DiameterUnit;
  density: string;
  densityUnit: DensityUnit;
  viscosity: string;
  viscosityUnit: ViscosityUnit;
  flowContext: FlowContext;
  precision: Precision;
}

export interface ReynoldsResult {
  re: number;
  regime: FlowRegime;
  velocitySI: number;
  diameterSI: number;
  densitySI: number;
  viscositySI: number;
  formulaSubstituted: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ReynoldsInputs;
  result: ReynoldsResult;
}

export interface FluidPreset {
  label: string;
  density: string;
  densityUnit: DensityUnit;
  viscosity: string;
  viscosityUnit: ViscosityUnit;
  hint: string;
}
