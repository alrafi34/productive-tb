export type TransferMode = "conduction" | "convection" | "radiation";
export type AreaUnit = "m2" | "cm2" | "ft2" | "in2";
export type ThicknessUnit = "m" | "cm" | "mm" | "in" | "ft";
export type ConductivityUnit = "W/mK" | "BTU/hrftF";
export type HeatCoeffUnit = "W/m2K" | "BTU/hrft2F";
export type TemperatureUnit = "C" | "F" | "K";
export type Precision = 2 | 4 | 6;

export interface ConductionInputs {
  k: string;
  kUnit: ConductivityUnit;
  area: string;
  areaUnit: AreaUnit;
  deltaT: string;
  tempUnit: TemperatureUnit;
  thickness: string;
  thicknessUnit: ThicknessUnit;
}

export interface ConvectionInputs {
  h: string;
  hUnit: HeatCoeffUnit;
  area: string;
  areaUnit: AreaUnit;
  deltaT: string;
  tempUnit: TemperatureUnit;
}

export interface RadiationInputs {
  emissivity: string;
  area: string;
  areaUnit: AreaUnit;
  T1: string;
  T2: string;
  tempUnit: TemperatureUnit;
}

export interface HeatTransferInputs {
  mode: TransferMode;
  conduction: ConductionInputs;
  convection: ConvectionInputs;
  radiation: RadiationInputs;
  precision: Precision;
}

export interface HeatTransferResult {
  Q_W: number;       // Watts
  Q_kW: number;      // Kilowatts
  Q_BTU: number;     // BTU/hr
  Q_kcal: number;    // kcal/hr
  formula: string;
  breakdown: string;
  interpretation: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: HeatTransferInputs;
  result: HeatTransferResult;
}
