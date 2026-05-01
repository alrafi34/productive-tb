export type Unit = "mm" | "cm" | "inches";

export interface StaircaseCalculation {
  totalHeight: number;
  maxRiserHeight: number;
  desiredTreadDepth: number;
  stairWidth?: number;
  unit: Unit;
  
  // Calculated values
  numberOfRisers: number;
  actualRiserHeight: number;
  numberOfTreads: number;
  totalRun: number;
  stairAngle: number;
  comfortFormula: number;
  isComfortable: boolean;
  
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: StaircaseCalculation;
  timestamp: number;
}

export interface StaircasePreset {
  name: string;
  description: string;
  totalHeight: number;
  maxRiserHeight: number;
  desiredTreadDepth: number;
  unit: Unit;
}
