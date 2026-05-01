export type Unit = "mm" | "cm" | "inch";

export type FrameType = "frameless" | "aluminum" | "sliding";

export interface Clearances {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface GlassCalculation {
  openingWidth: number;
  openingHeight: number;
  clearances: Clearances;
  panelCount: number;
  gapBetweenPanels: number;
  unit: Unit;
  frameType: FrameType;
  panelWidth: number;
  glassHeight: number;
  totalGlassArea: number;
  availableWidth: number;
  totalGapWidth: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: GlassCalculation;
}

export interface FramePreset {
  name: string;
  type: FrameType;
  description: string;
  clearances: Clearances;
}
