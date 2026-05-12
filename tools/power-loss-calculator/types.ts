export type CalculationMode = 'i-r' | 'v-i' | 'mixed';

export interface PowerLossInputs {
  mode: CalculationMode;
  voltage?: number;
  current?: number;
  resistance?: number;
  powerFactor?: number;
  showEfficiency: boolean;
  inputPower?: number;
  precision?: number;
}

export interface PowerLossResult {
  mode: CalculationMode;
  powerLoss: number;
  inputPower?: number;
  efficiency?: number;
  voltage?: number;
  current?: number;
  resistance?: number;
  powerFactor?: number;
  formula: string;
  lossLevel: 'low' | 'moderate' | 'high' | 'critical';
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PowerLossInputs;
  result: PowerLossResult;
}
