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
  riskScore: number;
  protectionLevel: ProtectionLevel;
  protectionLevelText: string;
  recommendation: string;
  systemType: string;
  safetyWarning: string;
  heightFactor: number;
  areaFactor: number;
  riskFactor: number;
  structureFactor: number;
  groundingRequired: boolean;
  estimatedCost: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LightningProtectionInputs;
  result: LightningProtectionResult;
}
