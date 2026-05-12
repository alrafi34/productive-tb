export type CalculationMode = 'power' | 'impedance' | 'powerFactor';

export interface PhaseAngleInputs {
  mode: CalculationMode;
  // Power mode
  realPower?: number;
  apparentPower?: number;
  // Impedance mode
  resistance?: number;
  reactance?: number;
  // Power factor mode
  powerFactor?: number;
}

export interface PhaseAngleResult {
  angleDegrees: number;
  angleRadians: number;
  powerFactor: number;
  mode: CalculationMode;
  formula: string;
  steps: string[];
  timestamp: number;
  // Additional info based on mode
  realPower?: number;
  apparentPower?: number;
  resistance?: number;
  reactance?: number;
  impedance?: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: PhaseAngleInputs;
  result: PhaseAngleResult;
}

export interface Preset {
  name: string;
  description: string;
  mode: CalculationMode;
  values: Partial<PhaseAngleInputs>;
}
