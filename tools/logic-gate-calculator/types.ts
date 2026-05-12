export type LogicGate = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

export interface LogicGateInputs {
  gate: LogicGate;
  inputs: number[]; // Array of input values (0 or 1)
}

export interface LogicGateResult {
  output: number;
  truthTable: TruthTableRow[];
  explanation: string;
}

export interface TruthTableRow {
  inputs: number[];
  output: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LogicGateInputs;
  result: LogicGateResult;
}
