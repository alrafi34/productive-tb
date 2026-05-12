export type PhaseType = 'single' | 'three';
export type SafetyMargin = 0.10 | 0.20 | 0.30 | 0.50;

export interface Appliance {
  id: string;
  name: string;
  power: number; // Watts
  quantity: number;
  totalPower: number;
}

export interface GeneratorInputs {
  appliances: Appliance[];
  safetyMargin: SafetyMargin;
  powerFactor: number; // 0.6 to 1.0
  phaseType: PhaseType;
}

export interface GeneratorResult {
  totalLoad: number;
  adjustedLoad: number;
  requiredKVA: number;
  recommendedSize: number;
  recommendedRange: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: GeneratorInputs;
  result: GeneratorResult;
}

export interface AppliancePreset {
  name: string;
  power: number;
  category: string;
}

export interface SystemPreset {
  name: string;
  description: string;
  appliances: { name: string; power: number; quantity: number }[];
}
