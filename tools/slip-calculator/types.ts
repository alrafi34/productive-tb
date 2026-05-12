export interface SlipInputs {
  synchronousSpeed: number; // RPM
  rotorSpeed: number; // RPM
}

export interface SlipResult {
  slip: number; // decimal (0-1)
  slipPercentage: number; // percentage (0-100)
  speedDifference: number; // RPM
  steps: string[];
}

export interface SlipPreset {
  name: string;
  description: string;
  synchronousSpeed: number;
  rotorSpeed: number;
}

export interface AutoCalculateInputs {
  frequency: number; // Hz
  poles: number;
}
