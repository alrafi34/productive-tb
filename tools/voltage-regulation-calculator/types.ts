export type SystemType = 'transformer' | 'transmission-line' | 'general';
export type VoltageUnit = 'V' | 'kV';

export interface VoltageRegulationInputs {
  noLoadVoltage: number;
  fullLoadVoltage: number;
  systemType: SystemType;
  voltageUnit: VoltageUnit;
  precision: number;
}

export interface VoltageRegulationResult {
  regulation: number;
  regulationLevel: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';
  noLoadVoltage: number;
  fullLoadVoltage: number;
  voltageDrop: number;
  systemType: SystemType;
  voltageUnit: VoltageUnit;
  formula: string;
  interpretation: string;
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: VoltageRegulationInputs;
  result: VoltageRegulationResult;
}