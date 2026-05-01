export type Unit = 'metric' | 'imperial';
export type FootingType = 'square' | 'rectangular';

export interface FootingInputs {
  load: string;
  bearingCapacity: string;
  factorOfSafety: string;
  footingType: FootingType;
  lengthWidthRatio: string;
}

export interface FootingCalculation {
  id: string;
  load: number;
  bearingCapacity: number;
  factorOfSafety: number;
  footingType: FootingType;
  lengthWidthRatio: number;
  requiredArea: number;
  length: number;
  width: number;
  unit: Unit;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: FootingCalculation;
}

export interface FootingPreset {
  name: string;
  load: number;
  bearingCapacity: number;
  description: string;
}
