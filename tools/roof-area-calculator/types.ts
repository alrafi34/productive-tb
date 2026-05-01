export type RoofType = 'flat' | 'gable' | 'hip' | 'shed';
export type Unit = 'metric' | 'imperial';

export interface RoofCalculation {
  id: string;
  roofType: RoofType;
  length: number;
  width: number;
  pitch?: number;
  unit: Unit;
  area: number;
  areaImperial?: number;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: RoofCalculation;
}

export interface RoofTypeInfo {
  type: RoofType;
  name: string;
  description: string;
  requiresPitch: boolean;
  formula: string;
}
