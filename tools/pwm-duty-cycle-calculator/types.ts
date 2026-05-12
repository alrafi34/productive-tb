export type CalculationMode = 'dutyCycle' | 'onOffTime' | 'frequency';
export type TimeUnit = 'us' | 'ms' | 's';

export interface PWMInputs {
  mode: CalculationMode;
  onTime: number;
  offTime: number;
  dutyCycle: number;
  frequency: number;
  period: number;
  unit: TimeUnit;
}

export interface PWMResult {
  dutyCycle: number;
  onTime: number;
  offTime: number;
  frequency: number;
  period: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PWMInputs;
  result: PWMResult;
}
