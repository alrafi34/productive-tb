export type CalculationMode = 'mechanical' | 'electrical' | 'horsepower';

export interface MechanicalInputs {
  torque: number; // Nm
  speed: number; // RPM
}

export interface ElectricalInputs {
  voltage: number; // V
  current: number; // A
  efficiency: number; // 0 to 1
}

export interface HorsepowerInputs {
  horsepower: number; // HP
}

export interface MotorPowerInputs {
  mode: CalculationMode;
  mechanical?: MechanicalInputs;
  electrical?: ElectricalInputs;
  horsepower?: HorsepowerInputs;
}

export interface MotorPowerResult {
  powerWatts: number;
  powerKW: number;
  powerHP: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: MotorPowerInputs;
  result: MotorPowerResult;
}

export interface MotorPreset {
  name: string;
  description: string;
  mode: CalculationMode;
  values: MechanicalInputs | ElectricalInputs | HorsepowerInputs;
}
