export type MassUnit     = "kg" | "g" | "mg" | "lb";
export type VelocityUnit = "m/s" | "km/h" | "mph" | "ft/s";
export type Precision    = 0 | 2 | 4;

export interface MomentumInputs {
  mass:         string;
  massUnit:     MassUnit;
  velocity:     string;
  velocityUnit: VelocityUnit;
  precision:    Precision;
}

export interface MomentumResult {
  momentumKgMs:  number;   // kg·m/s  (SI — primary)
  momentumGMs:   number;   // g·m/s
  momentumLbFts: number;   // lb·ft/s
  massKg:        number;   // converted mass in kg
  velMs:         number;   // converted velocity in m/s
  formula:       string;
}

export interface HistoryEntry {
  id:        string;
  timestamp: number;
  inputs:    MomentumInputs;
  result:    MomentumResult;
}
