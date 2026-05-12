export interface ApparentPowerInputs {
  voltage: number;
  current: number;
}

export interface ApparentPowerResult {
  apparentPower: number;
  voltage: number;
  current: number;
  formula: string;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: ApparentPowerInputs;
  result: ApparentPowerResult;
}

export interface Preset {
  name: string;
  description: string;
  voltage: number;
  current: number;
}
