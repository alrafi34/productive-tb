export interface ClampConfig {
  minValue: number;
  maxValue: number;
  minViewport: number;
  maxViewport: number;
  unit: 'px' | 'rem' | 'em';
  property: string;
  rootFontSize: number;
}

export interface ClampResult {
  css: string;
  minFormatted: string;
  maxFormatted: string;
  preferredValue: string;
  slope: number;
  intercept: number;
}

export interface TypographyScale {
  h1: ClampResult;
  h2: ClampResult;
  h3: ClampResult;
  h4: ClampResult;
  h5: ClampResult;
  h6: ClampResult;
  body: ClampResult;
  small: ClampResult;
}

export interface BreakpointPreset {
  name: string;
  minViewport: number;
  maxViewport: number;
  description: string;
}

export interface PropertyPreset {
  name: string;
  property: string;
  defaultMin: number;
  defaultMax: number;
  unit: 'px' | 'rem' | 'em';
  description: string;
}

export interface ParsedClamp {
  minValue: number;
  preferredValue: string;
  maxValue: number;
  unit: string;
  isValid: boolean;
}

export interface ClampGeneratorState {
  config: ClampConfig;
  result: ClampResult;
  currentViewport: number;
  showGraph: boolean;
  activeTab: 'generator' | 'scale' | 'parser';
  copiedCode: string | null;
  savedConfigs: ClampConfig[];
}