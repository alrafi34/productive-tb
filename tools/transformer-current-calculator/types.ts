export type PhaseType = 'single' | 'three';

export interface TransformerCurrentInputs {
  power: number;
  voltage: number;
  /* Voltage of the other winding; without it only the primary side is known */
  secondaryVoltage?: number;
  phase: PhaseType;
  powerFactor: number;
}

export interface TransformerCurrentResult {
  primaryCurrent: number;
  /* Undefined until a secondary voltage is entered */
  secondaryCurrent?: number;
  lineCurrent?: number;
  phase: PhaseType;
  apparentPower: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: TransformerCurrentInputs;
  result: TransformerCurrentResult;
}

export interface Preset {
  name: string;
  description: string;
  power: number;
  voltage: number;
  phase: PhaseType;
  powerFactor: number;
}
