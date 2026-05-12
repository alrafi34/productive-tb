export type BiasType = 'voltage-divider' | 'fixed' | 'emitter';
export type OperatingRegion = 'cutoff' | 'active' | 'saturation';

export interface TransistorBiasInputs {
  biasType: BiasType;
  vcc: number;
  r1?: number;
  r2?: number;
  rc: number;
  re: number;
  rb?: number;
  beta: number;
  vbe: number;
}

export interface TransistorBiasResult {
  vb: number;
  ve: number;
  vc: number;
  vce: number;
  ib: number;
  ic: number;
  ie: number;
  operatingRegion: OperatingRegion;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: TransistorBiasInputs;
  result: TransistorBiasResult;
}

export interface BiasPreset {
  name: string;
  description: string;
  biasType: BiasType;
  vcc: number;
  r1?: number;
  r2?: number;
  rc: number;
  re: number;
  rb?: number;
  beta: number;
}
