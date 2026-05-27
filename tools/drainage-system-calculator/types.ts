export type CalcMode = "runoff" | "pipe" | "channel" | "drainage-area" | "stormwater";
export type AreaUnit = "m2" | "hectare" | "acre";
export type PipeMaterial = "pvc" | "concrete" | "steel" | "clay" | "hdpe" | "cast-iron";
export type SurfaceType = "concrete" | "asphalt" | "grass" | "clay-soil" | "sandy-soil" | "gravel" | "residential" | "commercial" | "forest";

export interface DrainageInputs {
  mode: CalcMode;
  // Runoff / Area
  area: string;
  areaUnit: AreaUnit;
  rainfallIntensity: string; // mm/hr
  runoffCoefficient: number;
  // Pipe
  pipeDiameter: string; // mm
  pipeMaterial: PipeMaterial;
  slope: string; // %
  drainLength: string; // m
  // Channel
  channelWidth: string; // m
  channelDepth: string; // m
}

export interface DrainageResult {
  mode: CalcMode;
  // Runoff
  runoffFlowRate?: number;       // m³/s
  runoffFlowRateLps?: number;    // L/s
  runoffFlowRateCfs?: number;    // ft³/s
  // Pipe capacity
  pipeFlowRate?: number;         // m³/s
  pipeFlowRateLps?: number;
  pipeVelocity?: number;         // m/s
  pipeFillPct?: number;          // %
  // Channel
  channelFlowRate?: number;
  channelVelocity?: number;
  // Recommendations
  recommendedPipeDiameter?: number; // mm
  recommendedSlope?: number;         // %
  overflowRisk: "low" | "moderate" | "high" | "critical";
  recommendations: string[];
  warnings: string[];
  // Meta
  manningsN: number;
  areaM2: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DrainageInputs;
  result: DrainageResult;
}

export interface LandPreset {
  label: string;
  description: string;
  inputs: Partial<DrainageInputs>;
}
