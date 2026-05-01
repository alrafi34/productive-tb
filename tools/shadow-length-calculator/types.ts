export type Unit = "meters" | "feet";

export interface ShadowInputs {
  objectHeight: number;
  sunAngle: number; // degrees (1-89)
  unit: Unit;
}

export interface ShadowCalculation {
  objectHeight: number;
  sunAngle: number;
  unit: Unit;
  shadowLength: number;
  shadowLengthConverted?: number; // In opposite unit
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: ShadowCalculation;
}
