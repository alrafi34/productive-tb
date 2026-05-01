export type BuildingType = 
  | 'residential'
  | 'office'
  | 'commercial'
  | 'assembly'
  | 'corridor'
  | 'stairs'
  | 'library'
  | 'storage'
  | 'parking'
  | 'roof'
  | 'balcony'
  | 'classroom';

export type Unit = 'metric' | 'imperial';

export interface LiveLoadCalculation {
  id: string;
  buildingType: BuildingType;
  area: number;
  unit: Unit;
  loadPerUnit: number;
  totalLoad: number;
  loadPerUnitImperial?: number;
  totalLoadImperial?: number;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: LiveLoadCalculation;
}

export interface LoadPreset {
  type: BuildingType;
  name: string;
  description: string;
  loadMetric: number; // kN/m²
  loadImperial: number; // psf
  codeReference: string;
}
