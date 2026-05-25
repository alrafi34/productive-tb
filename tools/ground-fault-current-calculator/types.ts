export type CalculationMode = 'basic' | 'advanced';

export interface FaultCurrentInputs {
  mode: CalculationMode;
  systemVoltage: number;
  totalImpedance?: number;
  sourceImpedance?: number;
  cableImpedance?: number;
  transformerImpedance?: number;
  transformerRating?: number;
  precision: number;
}

export interface FaultCurrentResult {
  mode: CalculationMode;
  faultCurrent: number;
  systemVoltage: number;
  totalImpedance: number;
  sourceImpedance?: number;
  cableImpedance?: number;
  transformerImpedance?: number;
  faultLevel: 'low' | 'medium' | 'high' | 'critical';
  systemType: string;
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FaultCurrentInputs;
  result: FaultCurrentResult;
}