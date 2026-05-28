export type MassUnit     = "kg" | "g" | "lb" | "t";
export type VelocityUnit = "m/s" | "km/h" | "mph" | "ft/s";
export type Precision    = 0 | 2 | 4;

export interface KEInputs {
  mass:         string;
  massUnit:     MassUnit;
  velocity:     string;
  velocityUnit: VelocityUnit;
  precision:    Precision;
}

export interface KEResult {
  keJ:      number;   // Joules
  keKJ:     number;   // Kilojoules
  keMJ:     number;   // Megajoules
  keCalorie: number;  // Calories
  keKWh:    number;   // Kilowatt-hours
  massKg:   number;
  velMs:    number;
  formula:  string;
}

export interface HistoryEntry {
  id:        string;
  timestamp: number;
  inputs:    KEInputs;
  result:    KEResult;
}
