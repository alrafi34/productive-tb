export type ExcavationType = "rectangular" | "circular" | "trench" | "triangular" | "custom";
export type InputUnit = "m" | "ft" | "yd";
export type OutputUnit = "m3" | "ft3" | "yd3";

export interface RectangularInputs { length: string; width: string; depth: string; }
export interface CircularInputs    { diameter: string; depth: string; }
export interface TrenchInputs      { length: string; width: string; depth: string; }
export interface TriangularInputs  { base: string; triHeight: string; depth: string; }
export interface CustomInputs      { area: string; depth: string; }

export interface CalculatorInputs {
  type: ExcavationType;
  unit: InputUnit;
  outputUnit: OutputUnit;
  rectangular: RectangularInputs;
  circular: CircularInputs;
  trench: TrenchInputs;
  triangular: TriangularInputs;
  custom: CustomInputs;
  // optional
  soilDensity: string;       // kg/m³
  costPerUnit: string;       // cost per output unit
  mode: "excavation" | "fill";
}

export interface CalculationResult {
  volumeM3: number;
  volumeInUnit: number;
  outputUnit: OutputUnit;
  inputUnit: InputUnit;
  type: ExcavationType;
  formula: string;
  steps: string[];
  // conversions
  m3: number;
  ft3: number;
  yd3: number;
  // optional
  weightKg?: number;
  weightTons?: number;
  estimatedCost?: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
