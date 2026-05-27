export type LoanTerm = 10 | 15 | 20 | 25 | 30;
export type Currency = "USD" | "EUR" | "GBP" | "BDT" | "INR";

export interface CalculatorInputs {
  loanAmount: string;
  interestRate: string;
  loanTermYears: LoanTerm;
  downPayment: string;
  propertyTax: string;       // annual
  homeInsurance: string;     // annual
  extraPayment: string;      // monthly
  currency: Currency;
}

export interface AmortizationRow {
  month: number;
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export interface CalculationResult {
  principal: number;
  monthlyPayment: number;
  monthlyTax: number;
  monthlyInsurance: number;
  totalMonthly: number;
  totalPayment: number;
  totalInterest: number;
  totalMonths: number;
  payoffDate: string;
  // with extra payment
  extraMonthlyPayment: number;
  extraTotalMonths: number;
  extraTotalInterest: number;
  extraPayoffDate: string;
  interestSaved: number;
  monthsSaved: number;
  // amortization
  schedule: AmortizationRow[];
  // yearly summary
  yearlySchedule: YearlySummary[];
  currency: Currency;
}

export interface YearlySummary {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  endBalance: number;
}

export interface ComparisonResult {
  term: LoanTerm;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
