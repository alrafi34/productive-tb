export interface SMPSInputs {
  outputVoltage: number;
  outputCurrent: number;
  efficiency: number;
  inputVoltage?: number;
  loadType: LoadType;
}

export type LoadType = 'resistive' | 'inductive' | 'mixed';

export interface SMPSResult {
  outputPower: number;
  inputPower: number;
  inputCurrent?: number;
  powerLoss: number;
  lossPercentage: number;
  efficiencyRating: string;
  warnings: string[];
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SMPSInputs;
  result: SMPSResult;
}