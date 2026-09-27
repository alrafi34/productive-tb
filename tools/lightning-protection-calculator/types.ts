export type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';
export type StructureType = 'residential' | 'commercial' | 'industrial' | 'critical' | 'open-field';
export type ProtectionLevel = 'minimal' | 'basic' | 'moderate' | 'high' | 'advanced';

export interface LightningProtectionInputs {
  height: number;
  area: number;
  riskLevel: RiskLevel;
  structureType: StructureType;
  groundResistance?: number;
  precision?: number;
}

export interface LightningProtectionResult {
  riskScore: number; // Nd / Nc
  protectionLevel: ProtectionLevel;
  protectionLevelText: string;
  recommendation: string;
  systemType: string;
  safetyWarning: string;
  collectionArea: number;   // Ad, m²
  flashDensity: number;     // Ng, flashes/km²/year
  expectedStrikes: number;  // Nd, per year
  tolerableStrikes: number; // Nc, per year
  efficiency: number;       // required LPS efficiency E (0 when not required)
  groundingRequired: boolean;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LightningProtectionInputs;
  result: LightningProtectionResult;
}
