export type Unit = "metric" | "imperial";

export interface SlopeStabilityInputs {
  slopeAngle: number;
  slopeHeight: number;
  cohesion: number;
  frictionAngle: number;
  unitWeight: number;
  poreWaterPressureRatio: number;
  unit: Unit;
}

export interface SlopeStabilityCalculation {
  id: string;
  slopeAngle: number;
  slopeHeight: number;
  cohesion: number;
  frictionAngle: number;
  unitWeight: number;
  poreWaterPressureRatio: number;
  unit: Unit;
  factorOfSafety: number;
  status: "stable" | "marginal" | "unstable";
  failureDepth: number;
  notes: string[];
}

export interface SoilPreset {
  name: string;
  description: string;
  cohesion: number;
  frictionAngle: number;
  unitWeight: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: SlopeStabilityCalculation;
}
