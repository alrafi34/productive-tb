export type PowerUnit = 'watts' | 'kilowatts';

export interface MotorEfficiencyInputs {
  inputPower: number;
  outputPower: number;
  unit: PowerUnit;
}

export interface MotorEfficiencyResult {
  efficiency: number;
  losses: number;
  lossesPercentage: number;
  efficiencyRating: 'excellent' | 'good' | 'fair' | 'poor';
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: MotorEfficiencyInputs;
  result: MotorEfficiencyResult;
}
