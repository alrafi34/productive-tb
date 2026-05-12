export type RegulationStatus = 'stable' | 'unstable' | 'warning';

export interface ZenerDiodeInputs {
  inputVoltage: number;
  zenerVoltage: number;
  seriesResistor: number;
  loadResistance?: number;
  loadCurrent?: number;
  zenerMinCurrent?: number;
  zenerMaxPower?: number;
}

export interface ZenerDiodeResult {
  totalCurrent: number;
  loadCurrent: number;
  zenerCurrent: number;
  zenerPower: number;
  resistorPower: number;
  outputVoltage: number;
  regulationStatus: RegulationStatus;
  warnings: string[];
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ZenerDiodeInputs;
  result: ZenerDiodeResult;
}

export interface ZenerPreset {
  name: string;
  description: string;
  inputVoltage: number;
  zenerVoltage: number;
  seriesResistor: number;
  loadResistance: number;
}
