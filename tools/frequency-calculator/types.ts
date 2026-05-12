export type FrequencyUnit = 'hz' | 'khz' | 'mhz';
export type TimeUnit = 's' | 'ms' | 'us';
export type CalculationMode = 'frequency-to-period' | 'period-to-frequency';

export interface FrequencyInputs {
  mode: CalculationMode;
  frequency?: number;
  frequencyUnit?: FrequencyUnit;
  timePeriod?: number;
  timeUnit?: TimeUnit;
  precision?: number;
}

export interface FrequencyResult {
  frequency: number;
  frequencyHz: number;
  timePeriod: number;
  timePeriodSeconds: number;
  formula: string;
  steps: string[];
  mode: CalculationMode;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FrequencyInputs;
  result: FrequencyResult;
}
