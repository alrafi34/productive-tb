export type CapacityMode = 'va' | 'wh' | 'battery';

export interface UPSBackupInputs {
  loadPower: number;
  capacityMode: CapacityMode;
  vaRating?: number;
  wattHour?: number;
  voltage?: number;
  ampereHour?: number;
  efficiency: number;
  powerFactor: number;
  safetyBuffer: number;
}

export interface UPSBackupResult {
  backupTimeHours: number;
  backupTimeMinutes: number;
  backupTimeFormatted: string;
  totalEnergyWh: number;
  usableEnergyWh: number;
  efficiencyLoss: number;
  safetyBufferLoss: number;
  isOverload: boolean;
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: UPSBackupInputs;
  result: UPSBackupResult;
}

export interface Scenario {
  id: string;
  name: string;
  inputs: UPSBackupInputs;
}
