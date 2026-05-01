export type CalculationMode = "flow-rate" | "velocity" | "diameter";
export type FlowRateUnit = "cubic-meters-per-second" | "liters-per-minute" | "gallons-per-minute";
export type VelocityUnit = "meters-per-second" | "feet-per-second";
export type DiameterUnit = "millimeters" | "inches";

export interface WaterFlowInputs {
  mode: CalculationMode;
  diameter?: number; // in mm
  velocity?: number; // in m/s
  flowRate?: number; // in L/min
  diameterUnit: DiameterUnit;
  velocityUnit: VelocityUnit;
  flowRateUnit: FlowRateUnit;
}

export interface WaterFlowCalculation {
  mode: CalculationMode;
  
  // Calculated values (in SI units)
  flowRate: number; // m³/s
  velocity: number; // m/s
  diameter: number; // mm
  
  // Cross-sectional area
  crossSectionalArea: number; // m²
  
  // Conversions
  flowRateInCubicMetersPerSecond: number;
  flowRateInLitersPerMinute: number;
  flowRateInGallonsPerMinute: number;
  velocityInMetersPerSecond: number;
  velocityInFeetPerSecond: number;
  diameterInMillimeters: number;
  diameterInInches: number;
  
  // Original units
  diameterUnit: DiameterUnit;
  velocityUnit: VelocityUnit;
  flowRateUnit: FlowRateUnit;
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface WaterFlowPreset {
  name: string;
  description: string;
  diameter: number; // mm
  velocity: number; // m/s
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: WaterFlowCalculation;
}
