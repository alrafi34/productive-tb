export type OccupancyType = "residential" | "commercial" | "industrial" | "warehouse" | "office";
export type RiskLevel = "low" | "medium" | "high" | "very-high";

export interface Material {
  id: string;
  name: string;
  mass: number; // kg
  calorificValue: number; // MJ/kg
}

export interface MaterialPreset {
  name: string;
  calorificValue: number; // MJ/kg
  category: string;
}

export interface FireLoadInputs {
  floorArea: number; // m²
  materials: Material[];
  occupancyType: OccupancyType;
}

export interface FireLoadCalculation {
  floorArea: number;
  materials: Material[];
  occupancyType: OccupancyType;
  
  // Calculated values
  totalHeatEnergy: number; // MJ
  fireLoadDensity: number; // MJ/m²
  riskLevel: RiskLevel;
  
  // Breakdown
  materialBreakdown: {
    name: string;
    mass: number;
    calorificValue: number;
    energy: number;
  }[];
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: FireLoadCalculation;
}
