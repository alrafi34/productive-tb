export interface RealPowerInputs {
  voltage: number;
  current: number;
  powerFactor: number;
}

export interface RealPowerResult {
  realPower: number;
  voltage: number;
  current: number;
  powerFactor: number;
  apparentPower: number;
  reactivePower: number;
  efficiency: string;
  steps: string[];
  formula: string;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: RealPowerInputs;
  result: RealPowerResult;
}

export interface Preset {
  name: string;
  description: string;
  voltage: number;
  current: number;
  powerFactor: number;
}
