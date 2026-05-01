export type TankShape = "rectangular" | "cylindrical-vertical" | "cylindrical-horizontal";
export type Unit = "meters" | "centimeters" | "feet" | "inches";

export interface WaterTankInputs {
  shape: TankShape;
  unit: Unit;
  
  // Rectangular dimensions
  length?: number;
  width?: number;
  height?: number;
  
  // Cylindrical dimensions
  radius?: number;
  cylinderHeight?: number;
}

export interface WaterTankCalculation {
  shape: TankShape;
  unit: Unit;
  
  // Input dimensions
  length?: number;
  width?: number;
  height?: number;
  radius?: number;
  cylinderHeight?: number;
  
  // Calculated values
  volumeInCubicMeters: number;
  volumeInCubicFeet: number;
  capacityInLiters: number;
  capacityInGallons: number;
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface WaterTankPreset {
  name: string;
  description: string;
  shape: TankShape;
  unit: Unit;
  length?: number;
  width?: number;
  height?: number;
  radius?: number;
  cylinderHeight?: number;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: WaterTankCalculation;
}
