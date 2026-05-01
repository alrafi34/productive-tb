export type CalculationType = 'area' | 'beam';
export type Unit = 'metric' | 'imperial';

export interface StructuralCalculation {
  id: string;
  calculationType: CalculationType;
  unit: Unit;
  
  // Area load inputs
  area?: number;
  deadLoad?: number;
  liveLoad?: number;
  additionalLoad?: number;
  
  // Beam load inputs
  length?: number;
  uniformLoad?: number;
  
  // Results
  totalLoad: number;
  deadLoadContribution?: number;
  liveLoadContribution?: number;
  additionalLoadContribution?: number;
  
  // Unit conversions
  totalLoadImperial?: number;
  
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: StructuralCalculation;
}

export interface LoadPreset {
  name: string;
  description: string;
  deadLoad: number;
  liveLoad: number;
  additionalLoad: number;
}
