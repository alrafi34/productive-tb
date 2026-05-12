export interface ADCInputs {
  referenceVoltage: number;
  bits: number;
  inputVoltage: number;
}

export interface ADCResult {
  levels: number;
  stepSizeVolts: number;
  stepSizeMillivolts: number;
  digitalValue: number | null;
  maxVoltage: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ADCInputs;
  result: ADCResult;
}
