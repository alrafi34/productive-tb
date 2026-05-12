export type CalculationMode = 
  | 'power_to_db' 
  | 'voltage_to_db' 
  | 'db_to_power' 
  | 'db_to_voltage';

export interface DecibelInputs {
  mode: CalculationMode;
  value: number;
}

export interface DecibelResult {
  mode: CalculationMode;
  inputValue: number;
  outputValue: number;
  formula: string;
  steps: string[];
}
