export interface RelayCalculatorInputs {
  supplyVoltage: number;
  coilResistance: number;
  mcuVoltage: number;
  transistorGain: number;
  baseEmitterVoltage: number;
  loadVoltage: number;
  loadCurrent: number;
  relayRatedVoltage: number;
  relayRatedCurrent: number;
}

export interface RelayCalculatorResult {
  coilCurrent: number; // in mA
  coilPower: number; // in W
  baseResistor: number; // in Ω
  standardBaseResistor: number; // nearest standard value
  baseCurrent: number; // in mA
  needsTransistor: boolean;
  loadSafe: boolean;
  voltageSafe: boolean;
  currentSafe: boolean;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: RelayCalculatorInputs;
  result: RelayCalculatorResult;
}
