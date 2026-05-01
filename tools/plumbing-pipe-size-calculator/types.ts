export type FlowRateUnit = "liters-per-second" | "cubic-meters-per-hour" | "gallons-per-minute" | "cubic-feet-per-second";
export type VelocityUnit = "meters-per-second" | "feet-per-second";
export type PipeMaterial = "pvc" | "copper" | "steel" | "cast-iron";
export type CalculationMode = "diameter" | "velocity" | "flow-rate";

export interface PlumbingPipeInputs {
  mode: CalculationMode;
  flowRate?: number;
  flowRateUnit: FlowRateUnit;
  velocity?: number;
  velocityUnit: VelocityUnit;
  diameter?: number; // in mm
  pipeMaterial: PipeMaterial;
}

export interface PlumbingPipeCalculation {
  mode: CalculationMode;
  
  // Input values (in SI units)
  flowRate: number; // m³/s
  velocity: number; // m/s
  diameter: number; // mm
  
  // Original units
  flowRateUnit: FlowRateUnit;
  velocityUnit: VelocityUnit;
  pipeMaterial: PipeMaterial;
  
  // Calculated values
  diameterInMm: number;
  diameterInInches: number;
  crossSectionalArea: number; // m²
  
  // Conversions
  flowRateInLitersPerSecond: number;
  flowRateInGPM: number;
  velocityInMetersPerSecond: number;
  velocityInFeetPerSecond: number;
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface PlumbingPipePreset {
  name: string;
  description: string;
  flowRate: number;
  flowRateUnit: FlowRateUnit;
  velocity: number;
  velocityUnit: VelocityUnit;
  pipeMaterial: PipeMaterial;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: PlumbingPipeCalculation;
}
