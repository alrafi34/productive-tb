export interface CurrentDividerInputs {
  totalCurrent: number;
  resistors: ResistorInput[];
  precision: number;
}

export interface ResistorInput {
  id: string;
  value: number;
  unit: ResistanceUnit;
}

export interface CurrentDividerResult {
  branchCurrents: BranchCurrent[];
  totalCurrent: number;
  totalResistance: number;
  totalPower: number;
  steps: string[];
  formula: string;
  validation: {
    isValid: boolean;
    currentSum: number;
    percentageError: number;
  };
}

export interface BranchCurrent {
  resistorId: string;
  resistance: number;
  resistanceDisplay: string;
  current: number;
  percentage: number;
  power: number;
}

export type ResistanceUnit = 'Ω' | 'kΩ' | 'MΩ';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CurrentDividerInputs;
  result: CurrentDividerResult;
}

export interface Preset {
  name: string;
  description: string;
  totalCurrent: number;
  resistors: Array<{
    value: number;
    unit: ResistanceUnit;
  }>;
}