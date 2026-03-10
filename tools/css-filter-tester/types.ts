export interface FilterValues {
  grayscale: number;
  sepia: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturate: number;
  invert: number;
  hueRotate: number;
  opacity: number;
}

export interface FilterPreset {
  name: string;
  values: FilterValues;
}

export interface FilterTesterState {
  filters: FilterValues;
  imageUrl: string;
  showComparison: boolean;
  selectedPreset: string | null;
}