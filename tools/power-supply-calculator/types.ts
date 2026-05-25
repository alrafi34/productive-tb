export interface PowerSupplyInputs {
  cpu: string;
  gpu: string;
  ram: number;
  storage: StorageDevice[];
  cooling: CoolingType;
  peripherals: PeripheralDevice[];
  overclocking: boolean;
  safetyMargin: number;
}

export interface StorageDevice {
  type: 'ssd' | 'hdd' | 'nvme';
  count: number;
}

export interface PeripheralDevice {
  type: 'keyboard-mouse' | 'rgb-basic' | 'rgb-advanced' | 'monitor' | 'speakers';
  count: number;
}

export type CoolingType = 'stock' | 'air' | 'liquid-aio' | 'custom-loop';

export interface PowerSupplyResult {
  totalLoad: number;
  recommendedPSU: number;
  efficiency: string;
  loadPercentage: number;
  breakdown: ComponentBreakdown;
  warnings: string[];
  steps: string[];
}

export interface ComponentBreakdown {
  cpu: number;
  gpu: number;
  ram: number;
  storage: number;
  cooling: number;
  peripherals: number;
  motherboard: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PowerSupplyInputs;
  result: PowerSupplyResult;
}