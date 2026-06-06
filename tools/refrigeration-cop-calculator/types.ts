export type CalcMethod = "basic" | "carnot";

export type CoolingUnit = "W" | "kW" | "BTU_hr" | "TR";
export type PowerUnit = "W" | "kW" | "HP";
export type TempUnit = "C" | "F" | "K";

export interface BasicInputs {
  coolingEffect: string;
  coolingUnit: CoolingUnit;
  powerInput: string;
  powerUnit: PowerUnit;
}

export interface CarnotInputs {
  coldTemp: string;
  coldTempUnit: TempUnit;
  hotTemp: string;
  hotTempUnit: TempUnit;
}

export interface RefrigerationCOPInputs {
  method: CalcMethod;
  basic: BasicInputs;
  carnot: CarnotInputs;
}

export interface COPResult {
  cop: number;
  method: CalcMethod;
  // basic extras
  coolingEffectW?: number;
  powerInputW?: number;
  // carnot extras
  tcK?: number;
  thK?: number;
  // display
  rating: "low" | "average" | "high";
  steps: string[];
  formulaDisplay: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: RefrigerationCOPInputs;
  result: COPResult;
}
