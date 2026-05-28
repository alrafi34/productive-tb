export type UnitSystem = "metric" | "imperial";
export type FluidType = "water" | "air" | "oil" | "steam" | "custom";
export type FlowInputMethod = "flowRate" | "velocity";
export type PipeMaterial =
  | "pvc"
  | "steel"
  | "copper"
  | "concrete"
  | "cast_iron"
  | "hdpe"
  | "custom";
export type FlowRateUnit = "L/s" | "m3/h" | "GPM";
export type LengthUnit = "m" | "ft";
export type DiameterUnit = "mm" | "in";
export type PressureUnit = "Pa" | "kPa" | "bar" | "psi";

export interface PressureDropInputs {
  unitSystem: UnitSystem;
  fluidType: FluidType;
  customDensity: string;
  customViscosity: string;
  pipeLength: string;
  pipeDiameter: string;
  flowInputMethod: FlowInputMethod;
  flowRate: string;
  flowRateUnit: FlowRateUnit;
  velocity: string;
  pipeMaterial: PipeMaterial;
  roughness: string;
  temperature: string;
}

export interface PressureDropResult {
  pressureDropPa: number;
  pressureDropKPa: number;
  pressureDropBar: number;
  pressureDropPsi: number;
  pressureDropPerMeter: number; // Pa/m
  velocity: number; // m/s
  reynoldsNumber: number;
  frictionFactor: number;
  flowRegime: "laminar" | "transitional" | "turbulent";
  density: number; // kg/m³
  viscosity: number; // Pa·s
  diameterM: number; // m
  lengthM: number; // m
  formulaSubstituted: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PressureDropInputs;
  result: PressureDropResult;
}
