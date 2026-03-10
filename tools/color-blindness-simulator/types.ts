export interface ColorBlindnessType {
  id: string;
  name: string;
  description: string;
  prevalence: string;
  matrix: number[];
}

export interface SimulatorState {
  selectedType: string;
  imageUrl: string | null;
  viewMode: 'single' | 'comparison' | 'slider';
  intensity: number;
  showUIComponents: boolean;
}

export interface AccessibilityTip {
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
}