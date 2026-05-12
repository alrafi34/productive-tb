export type ElectrodeType = 'single_rod' | 'multiple_rods' | 'plate';

export interface EarthingInputs {
  soilResistivity: number;
  rodLength: number;
  rodDiameter: number;
  numberOfRods: number;
  spacing: number;
  electrodeType: ElectrodeType;
}

export interface EarthingResult {
  resistance: number;
  singleRodResistance?: number;
  efficiencyFactor?: number;
  status: 'excellent' | 'good' | 'acceptable' | 'poor';
  statusMessage: string;
  recommendation?: string;
  formula: string;
  steps: string[];
}
