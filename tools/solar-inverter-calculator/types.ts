export type SystemVoltage = 12 | 24 | 48;
export type SafetyFactor = 1.2 | 1.5 | 2.0;
export type InverterType = 'pure-sine' | 'modified-sine' | 'square-wave';

export interface SolarInverterInputs {
  totalLoad: number; // Watts
  systemVoltage: SystemVoltage;
  efficiency: number; // 0.80 to 0.98
  safetyFactor: SafetyFactor;
  inverterType?: InverterType;
  peakLoad?: number; // Optional peak load in Watts
}

export interface SolarInverterResult {
  adjustedLoad: number;
  inverterSizeVA: number;
  inverterSizeKW: number;
  recommendedStandardSize: number;
  current: number;
  utilizationPercent: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SolarInverterInputs;
  result: SolarInverterResult;
}

export interface InverterPreset {
  name: string;
  totalLoad: number;
  systemVoltage: SystemVoltage;
  description: string;
}
