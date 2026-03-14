import { MortgageInputs, MortgageResult, AmortizationEntry, ComparisonResult, CalculationHistory } from './types';

export type { MortgageInputs, MortgageResult, AmortizationEntry, ComparisonResult, CalculationHistory };

const HISTORY_KEY = 'mortgage-calculator-history';
const MAX_HISTORY = 20;

// Calculate monthly mortgage payment using standard formula
export function calculateMortgagePayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0 || years <= 0) return 0;
  if (annualRate === 0) return principal / (years * 12);

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                  (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  return payment;
}

// Calculate full mortgage details
export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const { loanAmount, interestRate, loanTermYears, downPayment, extraPayment } = inputs;
  
  const principalAmount = Math.max(0, loanAmount - downPayment);
  const monthlyPayment = calculateMortgagePayment(principalAmount, interestRate, loanTermYears);
  const totalMonths = loanTermYears * 12;
  
  // Calculate with extra payments
  let balance = principalAmount;
  let totalInterest = 0;
  let actualMonths = 0;
  const monthlyRate = interestRate / 100 / 12;
  
  for (let month = 1; month <= totalMonths && balance > 0; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment + extraPayment;
    
    totalInterest += interestPayment;
    balance = Math.max(0, balance - principalPayment);
    actualMonths = month;
    
    if (balance === 0) break;
  }
  
  const totalPayment = (monthlyPayment + extraPayment) * actualMonths;
  
  return {
    monthlyPayment: monthlyPayment + extraPayment,
    totalPayment,
    totalInterest,
    totalMonths: actualMonths,
    principalAmount
  };
}

// Generate amortization schedule
export function generateAmortizationSchedule(
  inputs: MortgageInputs,
  maxEntries: number = 360
): AmortizationEntry[] {
  const { loanAmount, interestRate, loanTermYears, downPayment, extraPayment } = inputs;
  
  const principalAmount = Math.max(0, loanAmount - downPayment);
  const monthlyPayment = calculateMortgagePayment(principalAmount, interestRate, loanTermYears);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  
  const schedule: AmortizationEntry[] = [];
  let balance = principalAmount;
  
  for (let month = 1; month <= Math.min(totalMonths, maxEntries) && balance > 0; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment + extraPayment, balance + interestPayment);
    const totalPayment = interestPayment + (principalPayment - extraPayment);
    
    balance = Math.max(0, balance - (principalPayment - interestPayment));
    
    schedule.push({
      month,
      payment: totalPayment + extraPayment,
      principal: principalPayment - interestPayment,
      interest: interestPayment,
      balance
    });
    
    if (balance === 0) break;
  }
  
  return schedule;
}

// Compare different loan terms
export function compareLoanTerms(
  loanAmount: number,
  downPayment: number,
  interestRate: number,
  terms: number[]
): ComparisonResult[] {
  const principalAmount = Math.max(0, loanAmount - downPayment);
  
  return terms.map(term => {
    const monthlyPayment = calculateMortgagePayment(principalAmount, interestRate, term);
    const totalPayment = monthlyPayment * term * 12;
    const totalInterest = totalPayment - principalAmount;
    
    return {
      term,
      monthlyPayment,
      totalInterest,
      totalPayment
    };
  });
}

// Calculate affordability (max loan based on monthly payment)
export function calculateAffordability(
  monthlyPayment: number,
  annualRate: number,
  years: number
): number {
  if (monthlyPayment <= 0 || years <= 0) return 0;
  if (annualRate === 0) return monthlyPayment * years * 12;
  
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  const principal = monthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1) / 
                   (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
  
  return principal;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Format currency with decimals
export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Export amortization schedule to CSV
export function exportScheduleToCSV(schedule: AmortizationEntry[]): void {
  let csv = "Month,Payment,Principal,Interest,Remaining Balance\n";
  
  schedule.forEach(entry => {
    csv += `${entry.month},${entry.payment.toFixed(2)},${entry.principal.toFixed(2)},${entry.interest.toFixed(2)},${entry.balance.toFixed(2)}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mortgage_amortization_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// History management
export function saveToHistory(inputs: MortgageInputs, result: MortgageResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const item: CalculationHistory = {
    id: crypto.randomUUID(),
    inputs,
    result,
    timestamp: Date.now()
  };
  
  history.unshift(item);
  const trimmed = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): CalculationHistory[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Validate inputs
export function validateInputs(inputs: MortgageInputs): string | null {
  if (inputs.loanAmount <= 0) return "Loan amount must be greater than 0";
  if (inputs.interestRate < 0 || inputs.interestRate > 30) return "Interest rate must be between 0% and 30%";
  if (inputs.loanTermYears <= 0 || inputs.loanTermYears > 50) return "Loan term must be between 1 and 50 years";
  if (inputs.downPayment < 0) return "Down payment cannot be negative";
  if (inputs.downPayment >= inputs.loanAmount) return "Down payment must be less than loan amount";
  if (inputs.extraPayment < 0) return "Extra payment cannot be negative";
  
  return null;
}
