export type InputUnit = 'ft' | 'm' | 'yd';

export interface LandDimensions {
  length: string;
  width: string;
  unit: InputUnit;
}

export interface LandAreaResult {
  sqft: number;
  sqm: number;
  sqyd: number;
  acres: number;
  length: number;
  width: number;
  unit: InputUnit;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  dimensions: LandDimensions;
  result: LandAreaResult;
}
