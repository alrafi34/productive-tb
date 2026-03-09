export interface ZalgoOptions {
  intensity: 'low' | 'medium' | 'high' | 'extreme';
  addAbove: boolean;
  addBelow: boolean;
  addMiddle: boolean;
  maxCharsPerLetter: number;
}

export type PresetType = 'creepy' | 'mild' | 'broken' | 'custom';
