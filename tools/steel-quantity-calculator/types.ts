export type CalculationType = 'slab' | 'beam' | 'column' | 'footing';
export type Unit = 'metric' | 'imperial';

export interface SlabInputs {
  area: string;
  steelFactor: string;
}

export interface BeamInputs {
  length: string;
  steelPerLength: string;
}

export interface ColumnInputs {
  numberOfColumns: string;
  steelPerColumn: string;
}

export interface FootingInputs {
  numberOfFootings: string;
  steelPerFooting: string;
}

export interface SteelCalculation {
  id: string;
  type: CalculationType;
  totalSteel: number;
  totalSteelTons: number;
  unit: Unit;
  inputs: any;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: SteelCalculation;
}

export interface SteelFactorPreset {
  type: CalculationType;
  name: string;
  value: number;
  description: string;
}
