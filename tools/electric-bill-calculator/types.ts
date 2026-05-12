export type BillingType = "flat" | "tiered";
export type Currency = "BDT" | "USD" | "EUR" | "GBP" | "INR";

export interface Slab {
  id: string;
  min: number;
  max: number;
  rate: number;
}

export interface BillCalculation {
  units: number;
  billingType: BillingType;
  currency: Currency;
  flatRate?: number;
  slabs?: Slab[];
  serviceCharge: number;
  meterCharge: number;
  taxPercent: number;
  subtotal: number;
  totalTax: number;
  totalBill: number;
  breakdown: SlabBreakdown[];
  timestamp: number;
}

export interface SlabBreakdown {
  range: string;
  units: number;
  rate: number;
  cost: number;
}

export interface HistoryEntry {
  id: string;
  calculation: BillCalculation;
  timestamp: number;
}

export interface Preset {
  name: string;
  description: string;
  billingType: BillingType;
  slabs?: Slab[];
  flatRate?: number;
  currency: Currency;
}
