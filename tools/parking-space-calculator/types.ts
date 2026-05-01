export type InputMode = "total-area" | "dimensions";
export type LayoutType = "perpendicular" | "angled-60" | "angled-45" | "parallel";
export type Unit = "feet" | "meters";

export interface ParkingSpaceInputs {
  inputMode: InputMode;
  totalArea?: number;
  width?: number;
  length?: number;
  unit: Unit;
  layoutType: LayoutType;
  spaceWidth: number;
  spaceLength: number;
  aisleWidth: number;
}

export interface ParkingSpaceCalculation {
  inputMode: InputMode;
  totalArea: number;
  unit: Unit;
  layoutType: LayoutType;
  spaceWidth: number;
  spaceLength: number;
  aisleWidth: number;
  
  // Calculated values
  estimatedCapacity: number;
  areaPerSpace: number;
  usedArea: number;
  unusedArea: number;
  efficiencyPercentage: number;
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface LayoutPreset {
  name: string;
  description: string;
  layoutType: LayoutType;
  spaceWidth: number;
  spaceLength: number;
  aisleWidth: number;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: ParkingSpaceCalculation;
}
