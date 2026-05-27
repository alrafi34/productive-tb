export type DownPaymentMode = "percentage" | "fixed";
export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT" | "SGD";
export type LoanTerm = 5 | 10 | 15 | 20 | 25 | 30;

export interface CalculatorInputs {
  purchasePrice: string;
  downPaymentMode: DownPaymentMode;
  downPaymentValue: string;   // % or fixed amount
  interestRate: string;       // optional
  loanTerm: LoanTerm;
  currency: Currency;
}

export interface CalculationResult {
  purchasePrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  remainingLoan: number;
  monthlyPayment: number | null;
  totalPayment: number | null;
  totalInterest: number | null;
  currency: Currency;
}

export interface ScenarioResult {
  label: string;
  downPaymentPercent: number;
  downPaymentAmount: number;
  remainingLoan: number;
  monthlyPayment: number | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
