export interface NeumorphismConfig {
  backgroundColor: string;
  shadowDistance: number;
  blurRadius: number;
  shadowIntensity: number;
  borderRadius: number;
  isPressed: boolean;
  lightDirection: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  width: number;
  height: number;
  isDarkMode: boolean;
}

export interface NeumorphismPreset {
  name: string;
  config: Partial<NeumorphismConfig>;
  description: string;
}