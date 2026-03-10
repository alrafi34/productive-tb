export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export interface GradientSettings {
  type: 'linear' | 'radial' | 'conic';
  angle: number;
  colorStops: ColorStop[];
  radialShape: 'circle' | 'ellipse';
  radialSize: string;
  radialPosition: string;
  conicAngle: number;
  conicPosition: string;
}

export interface TextSettings {
  content: string;
  fontSize: number;
  fontWeight: string;
  letterSpacing: number;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
}

export interface GradientPreset {
  name: string;
  gradient: Partial<GradientSettings>;
  description: string;
}

export interface GradientTextState {
  gradient: GradientSettings;
  text: TextSettings;
  background: string;
  exportFormat: 'css' | 'tailwind' | 'scss' | 'html';
}