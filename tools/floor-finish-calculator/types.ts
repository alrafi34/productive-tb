export type Unit = "feet" | "meters";
export type MaterialType = "tile" | "wood" | "laminate" | "marble" | "custom";

export interface FloorFinishCalculation {
  roomLength: number;
  roomWidth: number;
  materialLength: number;
  materialWidth: number;
  wastagePercentage: number;
  unit: Unit;
  materialType: MaterialType;
  totalArea: number;
  materialArea: number;
  unitsRequired: number;
  wastageAmount: number;
  finalUnits: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: FloorFinishCalculation;
}

export interface PresetTemplate {
  name: string;
  description: string;
  materialLength: number;
  materialWidth: number;
  materialType: MaterialType;
  category: string;
}
