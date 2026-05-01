export type Unit = "cm" | "inches";
export type CalculationMode = "auto" | "fix-rise" | "fix-run";

export interface StepCalculation {
  totalHeight: number;
  totalRun?: number;
  desiredRise?: number;
  desiredRun?: number;
  maxRise?: number;
  unit: Unit;
  mode: CalculationMode;
  
  // Calculated values
  numberOfSteps: number;
  actualRise: number;
  actualRun: number;
  calculatedTotalRun: number;
  stairAngle: number;
  comfortFormula: number;
  isComfortable: boolean;
  
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: StepCalculation;
  timestamp: number;
}

export interface StepPreset {
  name: string;
  description: string;
  totalHeight: number;
  desiredRise: number;
  unit: Unit;
}
