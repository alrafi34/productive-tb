export type DACMode = 'unipolar' | 'bipolar';

export interface DACInputs {
  digitalValue: number;
  bits: number;
  referenceVoltage: number;
  mode: DACMode;
}

export interface DACResult {
  outputVoltage: number;
  percentage: number;
  maxValue: number;
  stepSize: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DACInputs;
  result: DACResult;
}
