export type CalculationMode = 'power' | 'voltage-current' | 'output-losses';

export interface TransformerEfficiencyInputs {
  mode: CalculationMode;
  inputPower: number;
  outputPower: number;
  losses: number;
  voltage: number;
  current: number;
  powerFactor: number;
}

export interface TransformerEfficiencyResult {
  efficiency: number;
  inputPower: number;
  outputPower: number;
  losses: number;
  efficiencyRating: string;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: TransformerEfficiencyInputs;
  result: TransformerEfficiencyResult;
}

export interface Preset {
  name: string;
  description: string;
  inputPower: number;
  outputPower: number;
  losses?: number;
}
