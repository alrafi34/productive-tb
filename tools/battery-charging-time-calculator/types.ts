export type CapacityUnit = 'mAh' | 'Ah';

export interface BatteryChargingInputs {
  capacity: number;
  capacityUnit: CapacityUnit;
  chargingCurrent: number;
  efficiency: number;
  startPercentage: number;
  endPercentage: number;
  voltage?: number;
}

export interface BatteryChargingResult {
  chargingTimeHours: number;
  chargingTimeFormatted: string;
  effectiveCapacityAh: number;
  energyWh: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BatteryChargingInputs;
  result: BatteryChargingResult;
}

export interface ChargingPreset {
  name: string;
  description: string;
  capacity: number;
  capacityUnit: CapacityUnit;
  chargingCurrent: number;
  efficiency: number;
}
