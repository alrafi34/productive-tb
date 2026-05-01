export type CalculationMode = "simple" | "detailed";
export type TemperatureUnit = "celsius" | "fahrenheit";

export interface HeatLossCalculation {
  // Inputs
  mode: CalculationMode;
  temperatureUnit: TemperatureUnit;
  insideTemp: number;
  outsideTemp: number;
  
  // Simple mode
  totalArea?: number;
  averageUValue?: number;
  
  // Detailed mode
  wallArea?: number;
  wallUValue?: number;
  windowArea?: number;
  windowUValue?: number;
  roofArea?: number;
  roofUValue?: number;
  floorArea?: number;
  floorUValue?: number;
  
  // Calculated values
  temperatureDifference: number;
  wallHeatLoss: number;
  windowHeatLoss: number;
  roofHeatLoss: number;
  floorHeatLoss: number;
  totalHeatLoss: number;
  totalHeatLossBTU: number;
  
  // Metadata
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  calculation: HeatLossCalculation;
  timestamp: number;
}

export interface MaterialPreset {
  name: string;
  category: string;
  uValue: number;
  description: string;
}

export interface BuildingPreset {
  name: string;
  description: string;
  wallArea: number;
  windowArea: number;
  roofArea: number;
  floorArea: number;
  wallUValue: number;
  windowUValue: number;
  roofUValue: number;
  floorUValue: number;
}