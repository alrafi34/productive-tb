export type MaterialType = "standard" | "recycled" | "eco-certified";
export type SiteType = "urban" | "suburban" | "rural";
export type WasteManagement = "none" | "basic" | "advanced";

export interface ScoreInputs {
  energyEfficiency: number; // 0-100
  waterEfficiency: number; // 0-100
  materialSustainability: MaterialType;
  indoorQuality: number; // 0-100
  siteSustainability: SiteType;
  renewableEnergy: number; // 0-100
  wasteManagement: WasteManagement;
}

export interface ScoreBreakdown {
  energy: number;
  water: number;
  materials: number;
  indoor: number;
  site: number;
  renewable: number;
  waste: number;
}

export interface GreenBuildingScore {
  totalScore: number;
  rating: string;
  breakdown: ScoreBreakdown;
  inputs: ScoreInputs;
  suggestions: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: GreenBuildingScore;
}

export interface PresetTemplate {
  name: string;
  description: string;
  inputs: ScoreInputs;
  category: string;
}
