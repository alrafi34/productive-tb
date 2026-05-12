export type BandCount = 4 | 5 | 6;

export type ColorBand = 
  | 'black' | 'brown' | 'red' | 'orange' | 'yellow' 
  | 'green' | 'blue' | 'violet' | 'gray' | 'white' 
  | 'gold' | 'silver' | 'none';

export interface ResistorBands {
  bandCount: BandCount;
  band1: ColorBand;
  band2: ColorBand;
  band3: ColorBand;
  multiplier: ColorBand;
  tolerance: ColorBand;
  tempCoeff?: ColorBand;
}

export interface ResistorResult {
  resistance: number;
  resistanceFormatted: string;
  tolerance: string;
  toleranceValue: number;
  tempCoeff?: string;
  minValue: string;
  maxValue: string;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  bands: ResistorBands;
  result: ResistorResult;
}

export interface ColorInfo {
  name: string;
  hex: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
  tempCoeff?: number;
}
