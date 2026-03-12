export interface GlassLayer {
  id: string;
  name: string;
  blur: number;
  opacity: number;
  tintColor: string;
  borderWidth: number;
  borderColor: string;
  borderOpacity: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  borderRadius: number;
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex: number;
}

export interface BackgroundScene {
  id: string;
  name: string;
  type: 'gradient' | 'pattern' | 'image' | 'noise';
  value: string;
}

export interface NoiseSettings {
  enabled: boolean;
  intensity: number;
  opacity: number;
}

export interface GlassPreset {
  name: string;
  description: string;
  settings: Partial<GlassLayer>;
}

export interface ComponentPreview {
  type: 'card' | 'navbar' | 'modal' | 'input';
  name: string;
}

export type DeviceSize = 'mobile' | 'tablet' | 'desktop';

export type ExportFormat = 'css' | 'tailwind' | 'scss' | 'json';

export interface ExportSettings {
  format: ExportFormat;
  includeVendorPrefixes: boolean;
  minified: boolean;
}
