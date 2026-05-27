export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";
export type TenureMode = "years" | "months";

export interface CalculatorInputs {
  loanAmount: string;
  interestRate: string;
  tenure: string;
  tenureMode: TenureMode;
  downPayment: string;
  currency: Currency;
}

export interface AmortizationRow {
  month: number;
  year: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface YearlySummary {
  year: number;
  totalEMI: number;
  totalPrincipal: number;
  totalInterest: number;
  endBalance: number;
}

export interface CalculationResult {
  principal: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  totalMonths: number;
  payoffDate: string;
  schedule: AmortizationRow[];
  yearlySchedule: YearlySummary[];
  currency: Currency;
  // scenario B (for comparison)
  scenarioB?: ScenarioResult;
}

export interface ScenarioResult {
  label: string;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  totalMonths: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
