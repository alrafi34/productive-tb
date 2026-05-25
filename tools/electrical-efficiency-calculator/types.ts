export interface EfficiencyInputs {
  inputPower: number;
  outputPower: number;
  powerUnit: PowerUnit;
  precision: number;
}

export interface EfficiencyResult {
  efficiency: number;
  inputPower: number;
  outputPower: number;
  powerLoss: number;
  powerLossPercentage: number;
  efficiencyLevel: EfficiencyLevel;
  warning?: string;
  steps: string[];
  formula: string;
  powerUnit: PowerUnit;
}

export type PowerUnit = 'W' | 'kW' | 'MW';
export type EfficiencyLevel = 'excellent' | 'good' | 'fair' | 'poor';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: EfficiencyInputs;
  result: EfficiencyResult;
}

export interface Preset {
  name: string;
  description: string;
  inputPower: number;
  outputPower: number;
  powerUnit: PowerUnit;
}