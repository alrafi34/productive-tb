export type SystemType = 'single' | 'three' | 'dc';
export type WireMaterial = 'copper' | 'aluminum';
export type WireSize = 1.5 | 2.5 | 4 | 6 | 10 | 16 | 25 | 35 | 50 | 70 | 95 | 120;

export interface VoltageDropInputs {
  systemType: SystemType;
  voltage: number;
  current: number;
  length: number;
  wireSize: WireSize;
  material: WireMaterial;
  temperature: number;
}

export interface VoltageDropResult {
  voltageDrop: number;
  voltageDropPercentage: number;
  finalVoltage: number;
  powerLoss: number;
  resistance: number;
  status: 'good' | 'acceptable' | 'poor';
  statusMessage: string;
  suggestion?: string;
  formula: string;
  steps: string[];
}
