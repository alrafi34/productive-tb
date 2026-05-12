export type VoltageType = 120 | 230 | 240 | 400 | 415;
export type PhaseType = 'single' | 'three';
export type LoadType = 'continuous' | 'non-continuous';
export type PowerUnit = 'W' | 'kW';

export interface CircuitBreakerInputs {
  load: number;
  loadUnit: PowerUnit;
  voltage: VoltageType;
  phaseType: PhaseType;
  loadType: LoadType;
  powerFactor: number;
}

export interface CircuitBreakerResult {
  loadWatts: number;
  current: number;
  adjustedCurrent: number;
  recommendedBreaker: number;
  safetyMargin: number;
  isSafe: boolean;
  formula: string;
  steps: string[];
  warnings: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CircuitBreakerInputs;
  result: CircuitBreakerResult;
}

export interface Preset {
  name: string;
  description: string;
  load: number;
  loadUnit: PowerUnit;
  voltage: VoltageType;
  phaseType: PhaseType;
  loadType: LoadType;
  powerFactor: number;
}
