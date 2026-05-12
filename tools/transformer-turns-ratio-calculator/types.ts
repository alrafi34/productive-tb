export type CalculationMode = 'voltage' | 'turns' | 'mixed';

export interface TransformerInputs {
  primaryVoltage: number;
  secondaryVoltage: number;
  primaryTurns: number;
  secondaryTurns: number;
}

export interface TransformerResult {
  turnsRatio: number;
  turnsRatioDisplay: string;
  voltageRatio: number;
  voltageRatioDisplay: string;
  currentRatio: number;
  currentRatioDisplay: string;
  calculatedPrimaryVoltage?: number;
  calculatedSecondaryVoltage?: number;
  calculatedPrimaryTurns?: number;
  calculatedSecondaryTurns?: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: TransformerInputs;
  result: TransformerResult;
}

export interface Preset {
  name: string;
  description: string;
  primaryVoltage: number;
  secondaryVoltage: number;
  primaryTurns?: number;
  secondaryTurns?: number;
}
