export type Unit = "ft" | "m" | "cm" | "inches";

/* How the frame thickness is added:
   "all-sides" — a margin on all four sides (height and width each + 2 × thickness)
   "door-frame" — jambs on both sides and a head on top, none at the floor
                  (width + 2 × thickness, height + thickness) */
export type FrameStyle = "all-sides" | "door-frame";

export interface DoorCalculation {
  height: number;
  width: number;
  unit: Unit;
  area: number;
  includeFrame: boolean;
  frameThickness?: number;
  frameStyle?: FrameStyle;
  /* the door's own size, before the frame is added */
  doorHeight?: number;
  doorWidth?: number;
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: DoorCalculation;
  timestamp: number;
}

export interface DoorPreset {
  name: string;
  description: string;
  height: number;
  width: number;
  unit: Unit;
}
