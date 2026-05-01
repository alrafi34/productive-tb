export type Unit = 'ft' | 'm';
export type SoilType = 'clay' | 'sand' | 'silt' | 'gravel' | 'rock';
export type WaterLevel = 'low' | 'medium' | 'high';
export type SafetyFactor = 1.5 | 2.0 | 2.5;
export type FoundationType = 'shallow' | 'strip' | 'raft' | 'pile';

export interface FoundationInputs {
  soilType: SoilType;
  load: string;
  frostDepth: string;
  waterLevel: WaterLevel;
  safetyFactor: SafetyFactor;
  foundationType: FoundationType;
  customBearingCapacity?: string;
}

export interface FoundationCalculation {
  id: string;
  soilType: SoilType;
  load: number;
  frostDepth: number;
  waterLevel: WaterLevel;
  safetyFactor: SafetyFactor;
  foundationType: FoundationType;
  bearingCapacity: number;
  requiredDepth: number;
  requiredDepthFt: number;
  baseDepth: number;
  adjustment: number;
  status: 'safe' | 'risky' | 'critical';
  notes: string[];
  unit: Unit;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: FoundationCalculation;
}

export interface SoilPreset {
  type: SoilType;
  name: string;
  bearingCapacity: number;
  description: string;
}
