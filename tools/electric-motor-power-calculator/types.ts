export type CalculationMode = 'mechanical' | 'electrical' | 'horsepower';

export interface MechanicalInputs {
  torque: number; // Nm
  speed: number; // RPM
}

export type Supply = 'dc' | 'single' | 'three';

export interface ElectricalInputs {
  voltage: number; // V (line-to-line for three-phase)
  current: number; // A
  efficiency: number; // 0 to 1
  supply?: Supply; // defaults to single-phase AC
  powerFactor?: number; // 0 to 1, AC only; defaults to 0.85
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
