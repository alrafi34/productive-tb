export type AreaUnit = "acre" | "hectare" | "sqm" | "sqft" | "decimal";
export type CropType = "rice" | "wheat" | "corn" | "vegetables" | "potato" | "tomato" | "sugarcane" | "cotton" | "banana" | "custom";
export type SoilType = "clay" | "loam" | "sandy" | "silty";
export type ClimateType = "cold" | "moderate" | "hot" | "very_hot";
export type IrrigationMethod = "surface" | "sprinkler" | "drip" | "flood";
export type GrowthStage = "initial" | "development" | "mid_season" | "late_season";

export interface CalculatorInputs {
  landArea: string;
  areaUnit: AreaUnit;
  cropType: CropType;
  soilType: SoilType;
  climate: ClimateType;
  irrigationMethod: IrrigationMethod;
  growthStage: GrowthStage;
  rainfall: string; // mm
}

export interface CalculationResult {
  landArea: number;
  areaUnit: AreaUnit;
  landAreaInSqm: number;
  cropType: CropType;
  soilType: SoilType;
  climate: ClimateType;
  irrigationMethod: IrrigationMethod;
  growthStage: GrowthStage;
  rainfall: number;

  // Core outputs
  dailyWaterLiters: number;       // liters/day
  dailyWaterDepthMm: number;      // mm/day
  weeklyWaterLiters: number;      // liters/week
  monthlyWaterLiters: number;     // liters/month

  // Breakdown factors
  etRate: number;                 // mm/day
  cropCoefficient: number;        // Kc
  soilFactor: number;
  irrigationEfficiency: number;
  growthStageFactor: number;
  rainfallReductionLiters: number;

  // Recommendations
  recommendations: string[];
  efficiencyTip: string;
  rainfallNote: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
