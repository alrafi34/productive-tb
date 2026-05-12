export type CalculationMode = "power" | "voltage" | "current";
export type VoltageUnit = "V" | "mV" | "kV";
export type CurrentUnit = "A" | "mA";
export type PowerUnit = "W" | "mW" | "kW";

export interface PowerCalculation {
  voltage: number;
  current: number;
  power: number;
  voltageUnit: VoltageUnit;
  currentUnit: CurrentUnit;
  powerUnit: PowerUnit;
  mode: CalculationMode;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: PowerCalculation;
}

export interface Preset {
  name: string;
  voltage: number;
  voltageUnit: VoltageUnit;
  description: string;
}
