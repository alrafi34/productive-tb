export type Unit = 'm' | 'ft';
export type OpeningType = 'door' | 'window';

export interface Wall {
  id: string;
  name: string;
  width: string;
  height: string;
  unit: Unit;
}

export interface Opening {
  id: string;
  type: OpeningType;
  width: string;
  height: string;
  unit: Unit;
}

export interface CalculatedWall extends Wall {
  area: number;
}

export interface CalculatedOpening extends Opening {
  area: number;
}

export interface CalculationSummary {
  totalWallArea: number;
  totalOpeningArea: number;
  netArea: number;
  unit: Unit;
}
