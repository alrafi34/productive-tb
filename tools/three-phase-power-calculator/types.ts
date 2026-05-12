export type CalculationMode = 'power' | 'current' | 'voltage';

export interface ThreePhasePowerInputs {
  mode: CalculationMode;
  voltage: number; // Line voltage in V
  current: number; // Current in A
  powerFactor: number; // 0 to 1
  frequency: number; // Hz (default 50)
  // For reverse calculations
  power?: number; // kW
}

export interface ThreePhasePowerResult {
  realPower: number; // kW
  apparentPower: number; // kVA
  reactivePower: number; // kVAR
  current: number; // A
  voltage: number; // V
  powerFactor: number;
  frequency: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ThreePhasePowerInputs;
  result: ThreePhasePowerResult;
}

export interface Preset {
  name: string;
  description: string;
  voltage: number;
  current: number;
  powerFactor: number;
  frequency: number;
}
