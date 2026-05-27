export type Currency = "USD" | "EUR" | "GBP" | "INR" | "CAD" | "AUD";
export type AreaUnit = "acre" | "hectare" | "sqft" | "sqm";
export type CropType = "rice" | "wheat" | "corn" | "tomato" | "potato" | "vegetables" | "custom";
export type FertilizerType = "urea" | "dap" | "mop" | "npk-10-10-10" | "npk-20-20-20" | "organic" | "custom";

export interface FertilizerComposition {
  nitrogen: number;    // % N
  phosphorus: number;  // % P
  potassium: number;   // % K
}

export interface NutrientRequirement {
  nitrogen: number;    // kg per acre
  phosphorus: number;  // kg per acre
  potassium: number;   // kg per acre
}

export interface CalculatorInputs {
  landArea: string;
  areaUnit: AreaUnit;
  cropType: CropType;
  fertilizerType: FertilizerType;
  nutrientRequirement: NutrientRequirement;
  fertilizerComposition: FertilizerComposition;
  currency: Currency;
  fertilizerPrice: string; // price per kg
}

export interface FertilizerCalculation {
  nutrient: "nitrogen" | "phosphorus" | "potassium";
  required: number;        // kg needed
  fertilizerNeeded: number; // kg of fertilizer
}

export interface CalculationResult {
  landArea: number;
  areaUnit: AreaUnit;
  landAreaInAcres: number;
  cropType: CropType;
  fertilizerType: FertilizerType;
  calculations: FertilizerCalculation[];
  totalFertilizerNeeded: number; // kg
  totalCost: number | null;
  currency: Currency;
  recommendations: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}