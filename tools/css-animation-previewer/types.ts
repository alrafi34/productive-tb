export interface AnimationSettings {
  timingFunction: string;
  duration: number;
  delay: number;
  iterationCount: string;
  direction: string;
  animationType: string;
}

export interface CubicBezierPoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface AnimationPreset {
  name: string;
  timingFunction: string;
  description: string;
}

export interface AnimationPreviewerState {
  settings: AnimationSettings;
  cubicBezier: CubicBezierPoints;
  isPlaying: boolean;
  selectedPreset: string | null;
}