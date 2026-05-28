export interface GearInputs {
  driverTeeth: string;
  drivenTeeth: string;
  inputRPM: string;
  inputTorque: string;
  torqueUnit: "Nm" | "lb-ft" | "lb-in";
  rpmUnit: "rpm" | "rad/s";
}

export interface GearResult {
  gearRatio: number;
  simplifiedRatio: string;
  decimalRatio: number;
  outputRPM: number | null;
  outputRadS: number | null;
  torqueMultiplier: number;
  outputTorque: number | null;
  mode: "torque-increase" | "speed-increase" | "1:1";
  explanation: string;
}

export interface CompareEntry {
  label: string;
  driverTeeth: string;
  drivenTeeth: string;
  inputRPM: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: GearInputs;
  result: GearResult;
}

export type PresetKey = "bicycle" | "automotive" | "robotics" | "industrial" | "overdrive";
