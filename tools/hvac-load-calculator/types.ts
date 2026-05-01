export type DimensionUnit = "ft" | "m";
export type InsulationQuality = "poor" | "average" | "good";
export type WindowCount = "none" | "few" | "many";
export type SunExposure = "low" | "medium" | "high";
export type EquipmentLoad = "none" | "moderate" | "high";
export type ClimateZone = "cool" | "moderate" | "hot";

export interface HVACCalculation {
  // Inputs
  length: number;
  width: number;
  height: number;
  dimensionUnit: DimensionUnit;
  insulation: InsulationQuality;
  occupants: number;
  windows: WindowCount;
  sunExposure: SunExposure;
  equipment: EquipmentLoad;
  climate: ClimateZone;
  
  // Intermediate values
  area: number; // in sq ft
  baseLoad: number;
  occupantLoad: number;
  windowLoad: number;
  equipmentLoadValue: number;
  sunExposureLoad: number;
  
  // Results
  totalBTU: number;
  totalKW: number;
  recommendedTons: number;
  
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: HVACCalculation;
  timestamp: number;
}

export interface RoomPreset {
  name: string;
  length: number;
  width: number;
  height: number;
  occupants: number;
  description: string;
}
