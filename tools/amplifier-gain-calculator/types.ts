export type CalculationMode = 'voltage' | 'current' | 'power' | 'db';

export interface AmplifierInputs {
  mode: CalculationMode;
  // Voltage mode
  vin?: number;
  vout?: number;
  // Current mode
  iin?: number;
  iout?: number;
  // Power mode
  pin?: number;
  pout?: number;
  // dB mode
  gain?: number;
}

export interface AmplifierResult {
  mode: CalculationMode;
  voltageGain?: number;
  currentGain?: number;
  powerGain?: number;
  gainDb?: number;
  steps: string[];
  formula: string;
}
