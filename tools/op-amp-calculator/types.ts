export type CircuitType = 'inverting' | 'non-inverting' | 'voltage-follower' | 'summing';

export type ResistanceUnit = 'ohm' | 'kohm' | 'mohm';

export interface OpAmpInputs {
  circuitType: CircuitType;
  vin?: number;
  r1?: number;
  r2?: number;
  r1Unit?: ResistanceUnit;
  r2Unit?: ResistanceUnit;
  // For summing amplifier
  vin1?: number;
  vin2?: number;
  vin3?: number;
  rf?: number;
  rfUnit?: ResistanceUnit;
  ri1?: number;
  ri2?: number;
  ri3?: number;
  ri1Unit?: ResistanceUnit;
  ri2Unit?: ResistanceUnit;
  ri3Unit?: ResistanceUnit;
}

export interface OpAmpResult {
  gain: number;
  vout: number;
  formula: string;
  steps: string[];
  circuitType: CircuitType;
  r1Ohms?: number;
  r2Ohms?: number;
  rfOhms?: number;
}
