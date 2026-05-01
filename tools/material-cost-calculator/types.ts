export type UnitType = "kg" | "tons" | "bags" | "pcs" | "liters" | "m" | "m2" | "m3" | "ft" | "ft2" | "ft3";
export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  unitType: UnitType;
  wastage: number; // percentage (0-100)
  cost: number;
  adjustedCost: number;
}

export interface MaterialCalculation {
  materials: Material[];
  overhead: number;
  currency: Currency;
  subtotal: number;
  totalWastage: number;
  totalCost: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  calculation: MaterialCalculation;
  timestamp: number;
}
