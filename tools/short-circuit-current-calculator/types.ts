export interface ShortCircuitInputs {
  voltage: number;
  impedance: number;
  systemType: SystemType;
  calculationMode: CalculationMode;
  precision: number;
}

export interface ShortCircuitResult {
  shortCircuitCurrent: number;
  formattedCurrent: string;
  currentUnit: string;
  faultLevel: FaultLevel;
  warning?: string;
  steps: string[];
  formula: string;
  systemType: SystemType;
  calculationMode: CalculationMode;
}

export type SystemType = 'single-phase' | 'three-phase';
export type CalculationMode = 'basic' | 'advanced';
export type FaultLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ShortCircuitInputs;
  result: ShortCircuitResult;
}

export interface Preset {
  name: string;
  description: string;
  voltage: number;
  impedance: number;
  systemType: SystemType;
}