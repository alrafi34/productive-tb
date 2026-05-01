export type ExcavationShape = "rectangular" | "trench" | "circular";

export type Unit = "meters" | "feet";

export interface ExcavationCalculation {
  id: string;
  timestamp: number;
  
  // Inputs
  shape: ExcavationShape;
  unit: Unit;
  
  // Dimensions (all stored in selected unit)
  length?: number;
  width?: number;
  depth: number;
  radius?: number;
  
  // Calculated values
  volume: number; // in cubic units
  volumeInCubicMeters: number;
  volumeInCubicFeet: number;
  volumeInCubicYards: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: ExcavationCalculation;
}

export interface ExcavationPreset {
  name: string;
  description: string;
  shape: ExcavationShape;
  length?: number;
  width?: number;
  depth: number;
  radius?: number;
  unit: Unit;
  category: string;
}