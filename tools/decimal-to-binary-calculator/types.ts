export interface DecimalToBinaryInputs {
  decimalInput: string;
  showSteps: boolean;
}

export interface DecimalToBinaryResult {
  binary: string;
  decimal: number;
  steps: string[];
  conversionSteps: ConversionStep[];
}

export interface ConversionStep {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  decimal: number;
  binary: string;
}
