export interface ArcFlashInputs {
  voltage: number;
  faultCurrent: number;
  workingDistance: number;
  exposureTime?: number;
  equipmentType?: 'panel' | 'switchgear' | 'mcc' | 'transformer';
  advancedMode: boolean;
  precision: number;
}

export interface ArcFlashResult {
  incidentEnergy: number;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  ppeCategory: string;
  safetyDistance: number;
  warning?: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ArcFlashInputs;
  result: ArcFlashResult;
}