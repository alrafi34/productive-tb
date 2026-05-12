export type InputMode = 'power_voltage' | 'current';
export type FuseType = 'fast' | 'slow';

export interface FuseInputs {
  mode: InputMode;
  power?: number;
  voltage?: number;
  current?: number;
  safetyFactor: number;
  fuseType: FuseType;
}

export interface FuseResult {
  calculatedCurrent: number;
  adjustedCurrent: number;
  recommendedFuse: number;
  nextHigherFuse?: number;
  safetyMargin: number;
  formula: string;
  steps: string[];
  warning?: string;
}
