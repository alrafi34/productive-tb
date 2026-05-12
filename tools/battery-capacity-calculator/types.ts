export type BatteryType = 'lead-acid' | 'lithium-ion' | 'lifepo4';

export interface BatteryCapacityInputs {
  power: number;
  voltage: number;
  runtime: number;
  efficiency: number;
  batteryType: BatteryType;
}

export interface BatteryCapacityResult {
  capacityAh: number;
  capacityWhActual: number;
  capacityAhAdjusted: number;
  current: number;
  batteryType: BatteryType;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BatteryCapacityInputs;
  result: BatteryCapacityResult;
}

export interface Preset {
  name: string;
  description: string;
  power: number;
  voltage: number;
  runtime: number;
  batteryType: BatteryType;
}
