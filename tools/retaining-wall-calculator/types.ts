export type Unit = "metric" | "imperial";

export interface RetainingWallInputs {
  wallHeight: number;
  wallLength: number;
  wallThickness: number;
  soilDensity: number;
  frictionAngle: number;
  backfillSlope: number;
  safetyFactor: number;
  unit: Unit;
}

export interface RetainingWallCalculation {
  id: string;
  wallHeight: number;
  wallLength: number;
  wallThickness: number;
  soilDensity: number;
  frictionAngle: number;
  backfillSlope: number;
  safetyFactor: number;
  unit: Unit;
  earthPressureCoefficient: number;
  lateralForce: number;
  lateralPressure: number;
  recommendedBaseWidth: number;
  concreteVolume: number;
  backfillVolume: number;
  status: "safe" | "caution" | "unsafe";
  notes: string[];
}

export interface WallPreset {
  name: string;
  description: string;
  wallHeight: number;
  wallLength: number;
  wallThickness: number;
  soilDensity: number;
  frictionAngle: number;
  backfillSlope: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: RetainingWallCalculation;
}
