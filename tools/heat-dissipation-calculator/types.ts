export type CalculationMode = 'voltage-current' | 'voltage-resistance' | 'current-resistance' | 'power-direct';

export interface HeatInputs {
  mode: CalculationMode;
  voltage?: number;
  current?: number;
  resistance?: number;
  power?: number;
  precision: number;
}

export interface HeatResult {
  mode: CalculationMode;
  heatDissipation: number;
  voltage?: number;
  current?: number;
  resistance?: number;
  power?: number;
  formula: string;
  heatLevel: 'low' | 'medium' | 'high' | 'critical';
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: HeatInputs;
  result: HeatResult;
}