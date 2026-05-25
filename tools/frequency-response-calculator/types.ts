export type DisplayMode = 'magnitude' | 'phase' | 'both';
export type SamplingPoints = 100 | 500 | 1000 | 2000;

export interface FrequencyResponseInputs {
  transferFunction: string;
  startFrequency: number;
  endFrequency: number;
  samplingPoints: SamplingPoints;
  displayMode: DisplayMode;
}

export interface FrequencyPoint {
  frequency: number;
  magnitude: number;
  magnitudeDb: number;
  phase: number;
  real: number;
  imaginary: number;
}

export interface FrequencyResponseResult {
  points: FrequencyPoint[];
  transferFunction: string;
  frequencyRange: [number, number];
  samplingPoints: number;
  systemType: string;
  characteristics: {
    dcGain: number;
    cutoffFrequency?: number;
    bandwidth?: number;
    peakGain?: number;
    peakFrequency?: number;
  };
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FrequencyResponseInputs;
  result: FrequencyResponseResult;
}