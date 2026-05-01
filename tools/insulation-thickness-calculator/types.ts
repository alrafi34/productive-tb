export type CalculationMode = "surface" | "heatloss" | "uvalue";
export type ThicknessUnit = "mm" | "inches";

export interface InsulationCalculation {
  // Inputs
  mode: CalculationMode;
  thicknessUnit: ThicknessUnit;
  ambientTemp: number;
  thermalConductivity: number;
  
  // Surface temperature mode
  fluidTemp?: number;
  targetSurfaceTemp?: number;
  pipeDiameter?: number;
  
  // Heat loss mode
  maxHeatLoss?: number;
  
  // U-value mode
  targetUValue?: number;
  
  // Calculated values
  requiredThickness: number;
  requiredThicknessInches: number;
  estimatedHeatLoss?: number;
  
  // Metadata
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  calculation: InsulationCalculation;
  timestamp: number;
}

export interface MaterialPreset {
  name: string;
  category: string;
  conductivity: number;
  description: string;
}

export interface ApplicationPreset {
  name: string;
  description: string;
  mode: CalculationMode;
  ambientTemp: number;
  thermalConductivity: number;
  fluidTemp?: number;
  targetSurfaceTemp?: number;
  pipeDiameter?: number;
  maxHeatLoss?: number;
  targetUValue?: number;
}