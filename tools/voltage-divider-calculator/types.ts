export type ResistanceUnit = 'ohm' | 'kohm' | 'mohm';

export interface VoltageInputs {
  vin: number;
  r1: number;
  r2: number;
  r1Unit: ResistanceUnit;
  r2Unit: ResistanceUnit;
}

export interface VoltageResult {
  vout: number;
  vin: number;
  r1Ohms: number;
  r2Ohms: number;
  r1Display: string;
  r2Display: string;
  ratio: number;
  current: number;
  powerR1: number;
  powerR2: number;
  totalPower: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: VoltageResult;
}

export interface Preset {
  name: string;
  description: string;
  vin: number;
  r1: number;
  r2: number;
  r1Unit: ResistanceUnit;
  r2Unit: ResistanceUnit;
}
