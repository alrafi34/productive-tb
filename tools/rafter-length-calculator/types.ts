export type InputMode = 'run-rise' | 'run-pitch';
export type Unit = 'feet' | 'meters';

export interface RafterCalculation {
  id: string;
  inputMode: InputMode;
  run: number;
  rise?: number;
  pitchRise?: number;
  pitchRun?: number;
  unit: Unit;
  rafterLength: number;
  calculatedRise?: number;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: RafterCalculation;
}

export interface PitchPreset {
  name: string;
  rise: number;
  run: number;
  description: string;
}
