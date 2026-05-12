export interface PowerFactorInputs {
  realPower: number; // kW
  apparentPower: number; // kVA
}

export interface PowerFactorResult {
  powerFactor: number; // 0 to 1
  powerFactorPercentage: number; // 0 to 100
  reactivePower: number; // kVAR
  phaseAngle: number; // degrees
  efficiency: "Excellent" | "Good" | "Fair" | "Poor";
  steps: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PowerFactorInputs;
  result: PowerFactorResult;
}

export interface Preset {
  name: string;
  description: string;
  realPower: number;
  apparentPower: number;
}
