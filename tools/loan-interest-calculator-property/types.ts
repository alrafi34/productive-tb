export type InterestType = "emi" | "simple" | "compound";
export type DurationUnit = "years" | "months";
export type PaymentFrequency = "monthly" | "quarterly" | "yearly";
export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";

export interface CalculatorInputs {
  loanAmount: string;
  interestRate: string;
  duration: string;
  durationUnit: DurationUnit;
  interestType: InterestType;
  frequency: PaymentFrequency;
  downPayment: string;
  currency: Currency;
}

export interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface YearlySummary {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  endBalance: number;
}

export interface CalculationResult {
  principal: number;
  interestType: InterestType;
  frequency: PaymentFrequency;
  periodicPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalPeriods: number;
  payoffDate: string;
  schedule: AmortizationRow[];
  yearlySchedule: YearlySummary[];
  currency: Currency;
  // for compound
  finalAmount?: number;
}

export interface ScenarioResult {
  rate: number;
  periodicPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
