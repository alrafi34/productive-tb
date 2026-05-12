export type BatteryPresetType = 'small-ups' | 'home-inverter' | 'solar-system' | 'rv-battery' | 'large-backup' | 'custom';

export interface BatteryBackupInputs {
  voltage: number;
  capacity: number;
  loadPower: number;
  efficiency: number;
  depthOfDischarge?: number;
}

export interface BatteryBackupResult {
  backupTimeHours: number;
  backupTimeFormatted: string;
  energyWh: number;
  effectiveEnergyWh: number;
  currentDraw: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BatteryBackupInputs;
  result: BatteryBackupResult;
}

export interface BatteryPreset {
  name: string;
  description: string;
  voltage: number;
  capacity: number;
  loadPower: number;
  efficiency: number;
}

export interface LoadPreset {
  name: string;
  power: number;
  description: string;
}
