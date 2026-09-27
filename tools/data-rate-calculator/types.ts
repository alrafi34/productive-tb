export type CalculationMode = 'data-time-to-rate' | 'rate-time-to-data' | 'rate-data-to-time';

export type DataUnit = 'bytes' | 'kb' | 'mb' | 'gb' | 'tb';
export type TimeUnit = 's' | 'min' | 'h';
// kbps/mbps/gbps are bytes per second (KB/s …); kbit/mbit/gbit are network bits per second (decimal)
export type RateUnit = 'bps' | 'kbps' | 'mbps' | 'gbps' | 'kbit' | 'mbit' | 'gbit';

export interface DataRateInputs {
  mode: CalculationMode;
  dataSize?: number;
  dataUnit?: DataUnit;
  time?: number;
  timeUnit?: TimeUnit;
  dataRate?: number;
  rateUnit?: RateUnit;
  precision?: number;
}

export interface DataRateResult {
  mode: CalculationMode;
  dataSize: number;
  dataSizeBytes: number;
  time: number;
  timeSeconds: number;
  dataRate: number;
  dataRateBps: number;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DataRateInputs;
  result: DataRateResult;
}
