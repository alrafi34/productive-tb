export type DimensionUnit = "m" | "ft";

export type MaterialType = 
  | "concrete"
  | "wood"
  | "carpet"
  | "glass"
  | "acoustic-panel"
  | "curtains"
  | "plaster"
  | "brick";

export interface RoomAcousticsCalculation {
  // Inputs
  length: number;
  width: number;
  height: number;
  dimensionUnit: DimensionUnit;
  wallMaterial: MaterialType;
  floorMaterial: MaterialType;
  ceilingMaterial: MaterialType;
  temperature: number;
  humidity: number;
  
  // Calculated values
  volume: number;
  surfaceArea: number;
  totalAbsorption: number;
  rt60: number;
  acousticQuality: string;
  acousticRating: string;
  roomModes: RoomMode[];
  
  // Timestamp
  timestamp: number;
}

export interface RoomMode {
  mode: string;
  frequency: number;
  type: string;
}

export interface HistoryEntry {
  id: string;
  calculation: RoomAcousticsCalculation;
  timestamp: number;
}
