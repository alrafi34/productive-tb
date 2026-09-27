export interface ArcFlashInputs {
  voltage: number;
  faultCurrent: number;
  workingDistance: number;
  exposureTime?: number;
  equipmentType?: 'panel' | 'switchgear' | 'mcc' | 'open';
  grounding?: 'grounded' | 'ungrounded';
  advancedMode: boolean;
  precision: number;
}

export interface ArcFlashResult {
  incidentEnergy: number;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  ppeCategory: string;
  safetyDistance: number; // arc flash boundary, inches
  arcingCurrent: number;  // kA
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ArcFlashInputs;
  result: ArcFlashResult;
}