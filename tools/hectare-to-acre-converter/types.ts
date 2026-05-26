export interface ConverterInputs {
  value: string;
  precision: number;
}

export interface ConverterResult {
  acres: number;
  hectares: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ConverterInputs;
  result: ConverterResult;
}
