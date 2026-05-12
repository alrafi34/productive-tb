export type CalculationMode = 'watts' | 'dbm' | 'dbw' | 'voltage';
export type PowerUnit = 'w' | 'mw' | 'kw';

export interface RFPowerInputs {
  mode: CalculationMode;
  watts?: number;
  dbm?: number;
  dbw?: number;
  voltage?: number;
  resistance?: number;
  precision?: number;
}

export interface RFPowerResult {
  mode: CalculationMode;
  watts: number;
  dbm: number;
  dbw: number;
  milliwatts: number;
  voltage?: number;
  resistance?: number;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: RFPowerInputs;
  result: RFPowerResult;
}
