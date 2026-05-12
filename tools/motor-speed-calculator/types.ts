export interface MotorSpeedInputs {
  frequency: number; // Hz
  poles: number;
  slip: number; // percentage (0-100)
}

export interface MotorSpeedResult {
  synchronousSpeed: number; // RPM
  actualSpeed: number; // RPM
  synchronousSpeedRadS: number; // rad/s
  actualSpeedRadS: number; // rad/s
  slip: number; // percentage
  steps: string[];
}

export interface MotorPreset {
  name: string;
  description: string;
  frequency: number;
  poles: number;
  slip: number;
}
