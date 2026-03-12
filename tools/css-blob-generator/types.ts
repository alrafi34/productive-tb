export interface BlobValues {
  topLeftH: number;
  topRightH: number;
  bottomRightH: number;
  bottomLeftH: number;
  topLeftV: number;
  topRightV: number;
  bottomRightV: number;
  bottomLeftV: number;
}

export interface BlobPreset {
  id: string;
  name: string;
  description: string;
  values: BlobValues;
  icon: string;
}

export interface AnimationKeyframe {
  percentage: number;
  borderRadius: string;
}

export interface BlobAnimation {
  name: string;
  duration: string;
  keyframes: AnimationKeyframe[];
  css: string;
}

export interface BlobStyle {
  width: string;
  height: string;
  background: string;
  borderRadius: string;
}

export type BackgroundType = 'solid' | 'gradient' | 'transparent';
