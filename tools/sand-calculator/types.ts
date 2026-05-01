export type Unit = 'ft' | 'm';
export type CalculationType = 'area' | 'concrete' | 'plaster';

export interface AreaDimensions {
  length: string;
  width: string;
  depth: string;
}

export interface ConcreteMix {
  volume: string;
  cement: number;
  sand: number;
  aggregate: number;
}

export interface PlasterDimensions {
  area: string;
  thickness: string;
}

export interface MixRatioPreset {
  name: string;
  cement: number;
  sand: number;
  aggregate: number;
  description: string;
}

export interface SandCalculation {
  sandRequired: number;
  sandRequiredM3: number;
  calculationType: CalculationType;
  unit: Unit;
  volumeDetails?: {
    wetVolume: number;
    dryVolume: number;
  };
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: SandCalculation;
}
