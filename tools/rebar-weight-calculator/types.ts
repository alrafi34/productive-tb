export type Unit = 'metric' | 'imperial';
export type LengthUnit = 'm' | 'ft';
export type WeightUnit = 'kg' | 'lb';

export interface RebarInput {
  diameter: string;
  length: string;
  quantity: string;
}

export interface RebarCalculation {
  id: string;
  diameter: number;
  length: number;
  quantity: number;
  weightPerMeter: number;
  weightPerFoot: number;
  totalWeight: number;
  totalWeightLb: number;
  unit: Unit;
  timestamp: number;
}

export interface BatchEntry extends RebarCalculation {
  batchId: string;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: RebarCalculation;
}

export interface DiameterPreset {
  value: number;
  label: string;
  common: boolean;
}
