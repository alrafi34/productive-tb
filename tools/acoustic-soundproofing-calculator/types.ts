export type WallType = "basic" | "drywall" | "concrete" | "glass";
export type InsulationMaterial = "none" | "foam" | "mineralwool" | "fiberglass" | "mlv";
export type RoomPresetType = "studio" | "bedroom" | "office" | "home-theater" | "podcast-room" | "custom";

export interface AcousticCalculation {
  // Inputs
  length: number;
  width: number;
  height: number;
  noiseSourceLevel: number;
  desiredNoiseLevel: number;
  wallType: WallType;
  insulationMaterial: InsulationMaterial;
  
  // Calculated values
  roomVolume: number;
  roomSurfaceArea: number;
  requiredReduction: number;
  baseWallTransmissionLoss: number;
  additionalReductionNeeded: number;
  materialBonus: number;
  totalReduction: number;
  achievedNoiseLevel: number;
  difficultyLevel: string;
  difficultyColor: string;
  recommendation: string;
  
  // Metadata
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  calculation: AcousticCalculation;
  timestamp: number;
}

export interface RoomPreset {
  name: string;
  description: string;
  length: number;
  width: number;
  height: number;
  noiseSourceLevel: number;
  desiredNoiseLevel: number;
}

export interface NoiseSourcePreset {
  name: string;
  level: number;
  description: string;
}

export interface DesiredLevelPreset {
  name: string;
  level: number;
  description: string;
}