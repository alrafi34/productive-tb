export type SystemVoltage = 12 | 24 | 48;
export type BatteryType = 'lead-acid' | 'lithium' | 'agm' | 'gel';

export interface SolarBatteryInputs {
  dailyLoad: number; // kWh
  backupDays: number;
  systemVoltage: SystemVoltage;
  batteryEfficiency: number; // 0.70 to 0.95
  depthOfDischarge: number; // 0.50 to 0.90
  batteryType?: BatteryType;
}

export interface SolarBatteryResult {
  totalEnergyWh: number;
  adjustedEnergyWh: number;
  usableEnergyWh: number;
  batteryCapacityAh: number;
  totalStoredEnergykWh: number;
  batteryBankConfig: string[];
  recommendedBatteries: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SolarBatteryInputs;
  result: SolarBatteryResult;
}

export interface BatteryPreset {
  name: string;
  dailyLoad: number;
  backupDays: number;
  systemVoltage: SystemVoltage;
  description: string;
}
