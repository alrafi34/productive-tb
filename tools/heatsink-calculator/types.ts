export type CalculationMode = 'thermal-resistance' | 'temperature-check';

export interface HeatsinkInputs {
  mode: CalculationMode;
  powerDissipation: number;
  ambientTemp: number;
  maxJunctionTemp: number;
  thermalResistance?: number;
  precision: number;
}

export interface HeatsinkResult {
  mode: CalculationMode;
  requiredThermalResistance?: number;
  actualJunctionTemp?: number;
  powerDissipation: number;
  ambientTemp: number;
  maxJunctionTemp: number;
  thermalResistance?: number;
  temperatureDifference: number;
  safetyStatus: 'safe' | 'warning' | 'critical';
  heatsinkRecommendation: string;
  coolingType: 'passive' | 'active' | 'liquid';
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: HeatsinkInputs;
  result: HeatsinkResult;
}