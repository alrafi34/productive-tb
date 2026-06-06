export type CalcMode = "metric" | "imperial" | "measurement" | "lead";
export type MeasurementUnit = "mm" | "inch";
export type ThreadStarts = 1 | 2 | 3 | 4;
export type Precision = 2 | 4 | 6;

export interface ThreadInputs {
  mode: CalcMode;
  // Mode 1: Metric
  metricDiameter: string;
  metricPitch: string;
  // Mode 2: Imperial
  threadsCount: string;
  measuredLength: string;
  customLength: string;
  // Mode 3: Measurement
  measuredDistance: string;
  measurementUnit: MeasurementUnit;
  // Mode 4: Lead
  leadPitch: string;
  leadPitchUnit: MeasurementUnit;
  threadStarts: ThreadStarts;
  // Common
  precision: Precision;
}

export interface ThreadResult {
  mode: CalcMode;
  // Metric
  pitchMm?: number;
  tpi?: number;
  pitchInch?: number;
  threadDesignation?: string;
  closestStandard?: string;
  // Imperial
  calculatedTPI?: number;
  pitchFromTPI?: number;
  pitchFromTPImm?: number;
  // Measurement
  measuredPitchMm?: number;
  measuredPitchInch?: number;
  measuredTPI?: number;
  threadClassification?: string;
  // Lead
  leadMm?: number;
  leadInch?: number;
  // Shared
  formula?: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ThreadInputs;
  result: ThreadResult;
}
