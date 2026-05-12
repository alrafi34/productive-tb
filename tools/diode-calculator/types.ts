export type DiodeType = 'silicon' | 'germanium' | 'schottky' | 'led' | 'custom';
export type CalculationMode = 'current' | 'resistor' | 'voltage-drop';

export interface DiodeCalculatorInputs {
  mode: CalculationMode;
  supplyVoltage: number;
  forwardVoltage: number;
  resistance?: number;
  desiredCurrent?: number;
  diodeType?: DiodeType;
}

export interface DiodeCalculatorResult {
  current?: number;
  resistance?: number;
  standardResistance?: number;
  voltageDrop: number;
  voltageAcrossResistor?: number;
  power?: number;
  recommendedWattage?: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DiodeCalculatorInputs;
  result: DiodeCalculatorResult;
}

export interface DiodePreset {
  name: string;
  type: DiodeType;
  forwardVoltage: number;
  description: string;
}
