export interface PowerDensityInputs {
  power: number;
  area: number;
  powerUnit: PowerUnit;
  areaUnit: AreaUnit;
  precision: number;
}

export interface PowerDensityResult {
  powerDensity: number;
  power: number;
  area: number;
  powerUnit: PowerUnit;
  areaUnit: AreaUnit;
  formattedResult: string;
  densityLevel: DensityLevel;
  warning?: string;
  steps: string[];
  formula: string;
}

export type PowerUnit = 'W' | 'kW' | 'MW';
export type AreaUnit = 'm²' | 'cm²' | 'mm²';
export type DensityLevel = 'low' | 'moderate' | 'high' | 'very-high';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PowerDensityInputs;
  result: PowerDensityResult;
}

export interface Preset {
  name: string;
  description: string;
  power: number;
  area: number;
  powerUnit: PowerUnit;
  areaUnit: AreaUnit;
}