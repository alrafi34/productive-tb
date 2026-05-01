export type Unit = 'metric' | 'imperial';

export interface SlabCalculation {
  id: string;
  length: number;
  width: number;
  thickness: number;
  density: number;
  liveLoad: number;
  additionalLoad: number;
  unit: Unit;
  
  // Results
  area: number;
  deadLoad: number;
  totalLoadPerSqm: number;
  totalLoad: number;
  
  // Imperial conversions
  areaFt?: number;
  deadLoadPsf?: number;
  totalLoadPerSqft?: number;
  totalLoadLb?: number;
  
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: SlabCalculation;
}

export interface SlabPreset {
  name: string;
  description: string;
  thickness: number;
  liveLoad: number;
  additionalLoad: number;
}
