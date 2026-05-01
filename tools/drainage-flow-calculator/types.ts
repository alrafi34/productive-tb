export type DrainageMode = "pipe" | "channel";
export type Unit = "metric" | "imperial";
export type RoughnessType = "concrete" | "pvc" | "earth" | "custom";

export interface DrainageFlowInputs {
  mode: DrainageMode;
  unit: Unit;
  
  // Pipe inputs
  pipeDiameter?: number;
  
  // Channel inputs
  channelWidth?: number;
  waterDepth?: number;
  
  // Common inputs
  slope: number;
  roughnessType: RoughnessType;
  roughnessCoefficient: number;
}

export interface DrainageFlowCalculation {
  mode: DrainageMode;
  unit: Unit;
  
  // Inputs
  pipeDiameter?: number;
  channelWidth?: number;
  waterDepth?: number;
  slope: number;
  roughnessCoefficient: number;
  roughnessType: RoughnessType;
  
  // Calculated values
  crossSectionalArea: number;
  wettedPerimeter: number;
  hydraulicRadius: number;
  flowRate: number; // m³/s
  flowRateLitersPerSecond: number;
  flowRateGallonsPerMinute: number;
  velocity: number; // m/s
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface DrainagePreset {
  name: string;
  description: string;
  mode: DrainageMode;
  unit: Unit;
  pipeDiameter?: number;
  channelWidth?: number;
  waterDepth?: number;
  slope: number;
  roughnessType: RoughnessType;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: DrainageFlowCalculation;
}
