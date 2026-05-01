export type Unit = 'ft' | 'm';
export type CalculationType = 'concrete' | 'plaster' | 'mortar';

export interface ConcreteDimensions {
  length: string;
  width: string;
  thickness: string;
}

export interface PlasterDimensions {
  area: string;
  thickness: string;
}

export interface MixRatio {
  cement: number;
  sand: number;
  aggregate: number;
}

export interface MixRatioPreset {
  name: string;
  ratio: MixRatio;
  description: string;
}

export interface CementCalculation {
  volume: number;
  volumeM3: number;
  dryVolume: number;
  cementVolume: number;
  cementBags: number;
  sandVolume?: number;
  aggregateVolume?: number;
  mixRatio: MixRatio;
  unit: Unit;
  type: CalculationType;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: CementCalculation;
}
