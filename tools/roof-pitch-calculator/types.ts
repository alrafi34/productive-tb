export type InputMode = 'rise-run' | 'pitch-ratio' | 'angle';
export type Unit = 'inches' | 'feet' | 'meters';

export interface RoofPitchCalculation {
  id: string;
  inputMode: InputMode;
  
  // Inputs
  rise?: number;
  run?: number;
  pitchRise?: number;
  pitchRun?: number;
  angle?: number;
  unit: Unit;
  
  // Results
  calculatedAngle: number;
  calculatedPitch: string;
  slopePercentage: number;
  normalizedPitch: number; // Rise for 12 run
  
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: RoofPitchCalculation;
}

export interface PitchPreset {
  name: string;
  description: string;
  rise: number;
  run: number;
  angle: number;
  commonUse: string;
}
