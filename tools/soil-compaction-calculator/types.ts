export type Unit = "g/cm3" | "kN/m3";
export type CompactionStandard = 90 | 95 | 98 | 100;

export interface CompactionInputs {
  fieldDryDensity: number;
  maxDryDensity: number;
  requiredCompaction: CompactionStandard;
  unit: Unit;
}

export interface CompactionCalculation {
  id: string;
  fieldDryDensity: number;
  maxDryDensity: number;
  requiredCompaction: CompactionStandard;
  unit: Unit;
  compactionPercentage: number;
  status: "pass" | "fail" | "warning";
  difference: number;
  notes: string[];
}

export interface SoilPreset {
  name: string;
  description: string;
  typicalFieldDensity: number;
  typicalMaxDensity: number;
  unit: Unit;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: CompactionCalculation;
}
