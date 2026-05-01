export type Unit = 'ft' | 'm';
export type BagSize = 40 | 50;

export interface MixRatio {
  cement: number;
  sand: number;
  aggregate: number;
}

export interface MixRatioPreset {
  name: string;
  ratio: MixRatio;
  description: string;
  grade?: string;
}

export interface ConcreteCalculation {
  volume: number;
  volumeM3: number;
  dryVolume: number;
  cementVolume: number;
  sandVolume: number;
  aggregateVolume: number;
  cementWeight: number;
  cementBags: number;
  mixRatio: MixRatio;
  unit: Unit;
  bagSize: BagSize;
  dryVolumeFactor: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: ConcreteCalculation;
}
