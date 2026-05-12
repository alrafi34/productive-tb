export type VoltageType = 110 | 120 | 220 | 230 | 240 | 380 | 400 | 415;
export type MaterialType = 'copper' | 'aluminum';
export type PhaseType = 'single' | 'three';
export type VoltageDropLimit = 1 | 2 | 3 | 5;
export type WireUnit = 'mm²' | 'AWG';

export interface WireData {
  sizeMetric: string; // mm²
  sizeAWG: string;
  ampacityCopper: number;
  ampacityAluminum: number;
  resistanceCopper: number; // Ohms per km
  resistanceAluminum: number; // Ohms per km
}

export interface WireSizeInputs {
  current: number;
  voltage: VoltageType;
  distance: number;
  material: MaterialType;
  phaseType: PhaseType;
  voltageDropLimit: VoltageDropLimit;
  wireUnit: WireUnit;
}

export interface WireSizeResult {
  recommendedWire: WireData;
  actualVoltageDrop: number;
  voltageDropPercentage: number;
  voltageAtLoad: number;
  powerLoss: number;
  isSafe: boolean;
  alternativeWires: WireData[];
  warnings: string[];
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: WireSizeInputs;
  result: WireSizeResult;
}

export interface Preset {
  name: string;
  description: string;
  current: number;
  voltage: VoltageType;
  distance: number;
  material: MaterialType;
  phaseType: PhaseType;
  voltageDropLimit: VoltageDropLimit;
}
