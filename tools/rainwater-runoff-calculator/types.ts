export type RainfallUnit = "mm" | "cm" | "in";
export type AreaUnit = "sqm" | "sqft" | "acre" | "hectare";
export type SurfaceType =
  | "concrete"
  | "roof"
  | "grass"
  | "gravel"
  | "bare_soil"
  | "clay_soil"
  | "sandy_soil"
  | "asphalt"
  | "custom";

export interface CalculatorInputs {
  rainfall: string;
  rainfallUnit: RainfallUnit;
  area: string;
  areaUnit: AreaUnit;
  surfaceType: SurfaceType;
  customCoefficient: string;
}

export interface CalculationResult {
  rainfallMm: number;
  areaSqm: number;
  coefficient: number;
  surfaceType: SurfaceType;
  runoffLiters: number;
  runoffCubicMeters: number;
  runoffGallons: number;
  runoffBarrels: number;
  harvestPotential: "High" | "Moderate" | "Low" | "Very Low";
  harvestNote: string;
  recommendations: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
