export type LEDColor = 'red' | 'green' | 'yellow' | 'blue' | 'white' | 'custom';

export interface LEDResistorInputs {
  supplyVoltage: number;
  ledForwardVoltage: number;
  ledCurrent: number;
  numberOfLEDs: number;
  ledColor?: LEDColor;
}

export interface LEDResistorResult {
  resistance: number;
  standardResistance: number;
  power: number;
  recommendedWattage: number;
  voltageDrop: number;
  actualCurrent: number;
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LEDResistorInputs;
  result: LEDResistorResult;
}

export interface LEDPreset {
  name: string;
  color: LEDColor;
  forwardVoltage: number;
  typicalCurrent: number;
  description: string;
}
