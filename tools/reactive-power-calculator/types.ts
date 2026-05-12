export interface ReactivePowerInputs {
  voltage: number;
  current: number;
  phaseAngle: number;
}

export interface ReactivePowerResult {
  reactivePower: number;
  reactivePowerKVAR: number;
  voltage: number;
  current: number;
  phaseAngle: number;
  phaseAngleRadians: number;
  apparentPower: number;
  realPower: number;
  powerFactor: number;
  efficiency: string;
  steps: string[];
  formula: string;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: ReactivePowerInputs;
  result: ReactivePowerResult;
}

export interface Preset {
  name: string;
  description: string;
  voltage: number;
  current: number;
  phaseAngle: number;
}
