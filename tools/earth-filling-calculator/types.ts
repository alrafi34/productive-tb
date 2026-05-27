export type ShapeType = "rectangle" | "square" | "triangle" | "circular" | "custom";
export type InputUnit = "ft" | "m" | "yd";
export type OutputUnit = "ft3" | "m3" | "yd3";
export type CompactionFactor = "loose" | "moderate" | "heavy";
export type SoilType = "sand" | "clay" | "topsoil" | "gravel" | "mixed";

export interface CalculatorInputs {
  shape: ShapeType;
  unit: InputUnit;
  outputUnit: OutputUnit;
  length: string;
  width: string;
  depth: string;
  // for circular
  diameter: string;
  // for custom
  customArea: string;
  compaction: CompactionFactor;
  soilType: SoilType;
  truckCapacity: string;   // in output unit
  costPerUnit: string;     // cost per output unit
}

export interface CalculationResult {
  rawVolumeM3: number;
  adjustedVolumeM3: number;
  volumeInUnit: number;
  outputUnit: OutputUnit;
  inputUnit: InputUnit;
  shape: ShapeType;
  compactionFactor: number;
  formula: string;
  steps: string[];
  // conversions
  ft3: number;
  m3: number;
  yd3: number;
  // extras
  truckloads?: number;
  truckCapacity: number;
  estimatedCost?: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
