export interface BinaryToDecimalInputs {
  binaryInput: string;
  showSteps: boolean;
}

export interface BinaryToDecimalResult {
  decimal: number;
  binaryClean: string;
  steps: string[];
  bitBreakdown: BitBreakdown[];
}

export interface BitBreakdown {
  position: number;
  bit: string;
  power: number;
  value: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  binary: string;
  decimal: number;
}
