export interface ConverterInputs {
  value: string;
  precision: number;
}

export interface ConverterResult {
  hectares: number;
  acres: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ConverterInputs;
  result: ConverterResult;
}
