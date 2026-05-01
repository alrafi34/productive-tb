export type DimensionUnit = "ft" | "m";
export type SunExposure = "low" | "medium" | "high";
export type InsulationQuality = "poor" | "average" | "good";
export type EquipmentLoad = "none" | "low" | "medium" | "high";

export interface CoolingLoadCalculation {
  // Inputs
  length: number;
  width: number;
  height: number;
  dimensionUnit: DimensionUnit;
  occupants: number;
  sunExposure: SunExposure;
  insulation: InsulationQuality;
  equipment: EquipmentLoad;
  windows: number;
  
  // Calculated values
  area: number;
  baseBTU: number;
  occupancyLoad: number;
  equipmentLoadValue: number;
  windowLoad: number;
  sunlightFactor: number;
  insulationFactor: number;
  totalBTU: number;
  recommendedTons: number;
  
  // Metadata
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  calculation: CoolingLoadCalculation;
  timestamp: number;
}

export interface RoomPreset {
  name: string;
  description: string;
  length: number;
  width: number;
  height: number;
  occupants: number;
}
