export interface Keyframe {
  id: string;
  percent: number;
  properties: KeyframeProperties;
}

export interface KeyframeProperties {
  translateX?: number;
  translateY?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  backgroundColor?: string;
  borderRadius?: number;
  width?: number;
  height?: number;
}

export interface Animation {
  name: string;
  keyframes: Keyframe[];
  duration: number;
  delay: number;
  iterationCount: number | 'infinite';
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode: 'none' | 'forwards' | 'backwards' | 'both';
  timingFunction: string;
}

export interface AnimationPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  keyframes: Keyframe[];
}

export type PreviewElement = 'box' | 'circle' | 'text' | 'image';
export type ViewportSize = 'mobile' | 'tablet' | 'desktop';
export type EasingPreset = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'custom';
