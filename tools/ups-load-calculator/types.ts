export interface Device {
  id: string;
  name: string;
  watts: number;
  quantity: number;
}

export interface UPSInputs {
  devices: Device[];
  safetyMargin: number;
  powerFactor: number;
  batteryEfficiency: number;
}

export interface UPSResult {
  totalLoad: number;
  adjustedLoad: number;
  requiredVA: number;
  recommendedUPS: number;
  powerFactor: number;
  safetyMargin: number;
  deviceCount: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: UPSInputs;
  result: UPSResult;
}
