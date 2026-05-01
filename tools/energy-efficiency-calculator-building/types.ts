export type Unit = "sqft" | "sqm";
export type BuildingType = "residential" | "commercial" | "industrial";
export type ClimateZone = "cold" | "moderate" | "hot";

export interface EnergyCalculation {
  buildingArea: number;
  annualEnergy: number;
  occupancy: number;
  buildingType: BuildingType;
  climateZone: ClimateZone;
  unit: Unit;
  eui: number;
  euiPerPerson: number;
  efficiencyRating: string;
  suggestions: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: EnergyCalculation;
}

export interface BuildingPreset {
  name: string;
  area: number;
  energy: number;
  occupancy: number;
  type: BuildingType;
}
