export type CalculationMode = 'frequency-to-period' | 'period-to-frequency' | 'cycles-time' | 'time-cycles';

export type FrequencyUnit = 'hz' | 'khz' | 'mhz' | 'ghz';
export type TimeUnit = 's' | 'ms' | 'us' | 'ns';

export interface ClockFrequencyInputs {
  mode: CalculationMode;
  frequency?: number;
  frequencyUnit?: FrequencyUnit;
  period?: number;
  periodUnit?: TimeUnit;
  cycles?: number;
  executionTime?: number;
  executionTimeUnit?: TimeUnit;
  precision?: number;
}

export interface ClockFrequencyResult {
  mode: CalculationMode;
  frequency: number;
  frequencyHz: number;
  period: number;
  periodSeconds: number;
  cycles?: number;
  executionTime?: number;
  executionTimeSeconds?: number;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ClockFrequencyInputs;
  result: ClockFrequencyResult;
}
