export type Unit = "metric" | "imperial";
export type TimePeriod = "monthly" | "yearly";

export interface RainwaterHarvestingInputs {
  roofArea: number;
  rainfall: number;
  runoffCoefficient: number;
  timePeriod: TimePeriod;
  unit: Unit;
}

export interface RainwaterHarvestingCalculation {
  roofArea: number;
  rainfall: number;
  runoffCoefficient: number;
  timePeriod: TimePeriod;
  unit: Unit;
  
  // Calculated values
  totalWaterCollected: number; // in liters or gallons
  monthlyWaterCollected: number;
  yearlyWaterCollected: number;
  suggestedTankSizeMin: number;
  suggestedTankSizeMax: number;
  dailyAverage: number;
  
  // Comparisons
  householdMonthsSupply: number; // Based on average household consumption
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface RainwaterPreset {
  name: string;
  description: string;
  roofArea: number;
  rainfall: number;
  runoffCoefficient: number;
  unit: Unit;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: RainwaterHarvestingCalculation;
}
