export type CalculationMode = 'power' | 'voltage' | 'distance';

export type PowerUnit = 'W' | 'mW' | 'dBm';
export type VoltageUnit = 'V' | 'mV';
export type DistanceUnit = 'm' | 'km' | 'ft';

export interface PowerInputs {
  inputPower: number;
  outputPower: number;
  inputUnit: PowerUnit;
  outputUnit: PowerUnit;
}

export interface VoltageInputs {
  inputVoltage: number;
  outputVoltage: number;
  inputUnit: VoltageUnit;
  outputUnit: VoltageUnit;
}

export interface DistanceInputs {
  lossPerUnit: number;
  distance: number;
  distanceUnit: DistanceUnit;
}

export interface AttenuationResult {
  attenuation: number;
  isGain: boolean;
  signalLossPercentage: number;
  formula: string;
  steps: string[];
  mode: CalculationMode;
  inputDisplay: string;
  outputDisplay: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: CalculationMode;
  result: AttenuationResult;
  inputs: PowerInputs | VoltageInputs | DistanceInputs;
}
