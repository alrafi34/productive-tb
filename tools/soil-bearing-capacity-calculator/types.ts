export type SoilType = "clay" | "sand" | "silt" | "gravel" | "rock";
export type WaterTablePosition = "low" | "medium" | "high";
export type Unit = "m" | "ft";

export interface BearingCapacityInputs {
  soilType: SoilType;
  foundationWidth: number;
  foundationDepth: number;
  unitWeight: number;
  cohesion: number;
  frictionAngle: number;
  factorOfSafety: number;
  waterTablePosition: WaterTablePosition;
  unit: Unit;
}

export interface BearingCapacityFactors {
  Nc: number;
  Nq: number;
  Ngamma: number;
}

export interface BearingCapacityCalculation {
  id: string;
  soilType: SoilType;
  foundationWidth: number;
  foundationDepth: number;
  unitWeight: number;
  cohesion: number;
  frictionAngle: number;
  factorOfSafety: number;
  waterTablePosition: WaterTablePosition;
  unit: Unit;
  bearingCapacityFactors: BearingCapacityFactors;
  ultimateBearingCapacity: number;
  safeBearingCapacity: number;
  waterTableAdjustment: number;
  status: "safe" | "moderate" | "unsafe";
  notes: string[];
}

export interface SoilPreset {
  name: string;
  type: SoilType;
  description: string;
  typicalCohesion: number;
  typicalFrictionAngle: number;
  typicalUnitWeight: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: BearingCapacityCalculation;
}
