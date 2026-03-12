export interface ScrollbarStyles {
  width: number;
  trackBackground: string;
  trackBorderRadius: number;
  thumbBackground: string;
  thumbHoverBackground: string;
  thumbBorderRadius: number;
  thumbBorder: number;
  thumbShadow: boolean;
  thumbGradient: boolean;
  thumbInsetBorder: boolean;
  gradientStart: string;
  gradientEnd: string;
}

export interface ScrollbarPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  styles: ScrollbarStyles;
}

export type PreviewMode = 'light' | 'dark';
export type ExportFormat = 'webkit' | 'firefox' | 'both' | 'variables';
