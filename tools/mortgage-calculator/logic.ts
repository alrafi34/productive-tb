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
  const homePrice = loanAmount;
  
  const principalAmount = Math.max(0, homePrice - downPayment);
  const principalAndInterest = calculateMortgagePayment(principalAmount, interestRate, loanTermYears);
  const totalMonths = Math.round(loanTermYears * 12);

  const monthlyTax = (homePrice * (inputs.propertyTaxRate ?? 0)) / 100 / 12;
  const monthlyInsurance = (inputs.homeInsurance ?? 0) / 12;
  const monthlyHoa = inputs.hoa ?? 0;
  // PMI runs until the balance falls to 80% of the price (none with 20% down)
  const pmiPerMonth = (principalAmount * (inputs.pmiRate ?? 0)) / 100 / 12;
  const pmiLimit = homePrice * 0.8;
  
  // Calculate with extra payments
  let balance = principalAmount;
  let totalInterest = 0;
  let totalPayment = 0;
  let actualMonths = 0;
  let pmiMonths = 0;
  const monthlyRate = interestRate / 100 / 12;
  
  for (let month = 1; month <= totalMonths && balance > 0; month++) {
    if (pmiPerMonth > 0 && balance > pmiLimit) pmiMonths++;
    const interestPayment = balance * monthlyRate;
    // The last payment only covers what is left
    const principalPayment = Math.min(principalAndInterest - interestPayment + extraPayment, balance);
    
    totalInterest += interestPayment;
    totalPayment += interestPayment + principalPayment;
    balance = Math.max(0, balance - principalPayment);
    actualMonths = month;
    
    if (balance < 0.005) break;
  }

  const monthlyPmi = pmiMonths > 0 ? pmiPerMonth : 0;
  
  return {
    monthlyPayment: principalAndInterest + extraPayment,
    principalAndInterest,
    monthlyTax,
    monthlyInsurance,
    monthlyPmi,
    monthlyHoa,
    totalMonthly: principalAndInterest + extraPayment + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa,
    pmiMonths,
    totalPayment,
    totalInterest,
    totalMonths: actualMonths,
    principalAmount
  };
}

// Generate amortization schedule
export function generateAmortizationSchedule(
  inputs: MortgageInputs,
  maxEntries: number = 600
): AmortizationEntry[] {
  const { loanAmount, interestRate, loanTermYears, downPayment, extraPayment } = inputs;
  
  const principalAmount = Math.max(0, loanAmount - downPayment);
  const monthlyPayment = calculateMortgagePayment(principalAmount, interestRate, loanTermYears);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = Math.round(loanTermYears * 12);
  
  const schedule: AmortizationEntry[] = [];
  let balance = principalAmount;
  
  for (let month = 1; month <= Math.min(totalMonths, maxEntries) && balance > 0.005; month++) {
    const interestPayment = balance * monthlyRate;
    // Scheduled principal plus any extra, never more than what is owed
    const principalPayment = Math.min(monthlyPayment - interestPayment + extraPayment, balance);
    balance = Math.max(0, balance - principalPayment);
    
    schedule.push({
      month,
      payment: interestPayment + principalPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance
    });
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

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'CHF' | 'INR';

export const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: 'USD', label: 'USD ($)' },
  { code: 'EUR', label: 'EUR (€)' },
  { code: 'GBP', label: 'GBP (£)' },
  { code: 'CAD', label: 'CAD (CA$)' },
  { code: 'AUD', label: 'AUD (A$)' },
  { code: 'CHF', label: 'CHF' },
  { code: 'INR', label: 'INR (₹)' },
];

/* The visitor's likely currency, from the timezone first (browsers are often
   set to en-US anywhere), then the browser language's region; USD otherwise. */
export function guessCurrency(timeZone?: string, language?: string): CurrencyCode {
  try {
    const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    const lang = language ?? (typeof navigator !== 'undefined' ? navigator.language : '');
    if (zone === 'Europe/London') return 'GBP';
    if (zone === 'Europe/Zurich') return 'CHF';
    if (zone === 'Asia/Kolkata' || zone === 'Asia/Calcutta') return 'INR';
    if (zone.startsWith('Australia/')) return 'AUD';
    if (/^America\/(Toronto|Vancouver|Montreal|Edmonton|Winnipeg|Halifax|Regina|St_Johns)$/.test(zone)) return 'CAD';
    if (zone.startsWith('Europe/')) return 'EUR';
    const region = /[-_]([A-Za-z]{2})\b/.exec(lang || '')?.[1]?.toUpperCase();
    const byRegion: Record<string, CurrencyCode> = { GB: 'GBP', CA: 'CAD', AU: 'AUD', CH: 'CHF', IN: 'INR', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', IE: 'EUR' };
    if (region && byRegion[region]) return byRegion[region];
  } catch {
    // fall through
  }
  return 'USD';
}

const formatters = new Map<string, Intl.NumberFormat>();

function formatter(currency: CurrencyCode, decimals: number): Intl.NumberFormat {
  const key = `${currency}-${decimals}`;
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: currency === 'CAD' || currency === 'AUD' ? 'symbol' : 'narrowSymbol',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    formatters.set(key, f);
  }
  return f;
}

// Format currency
export function formatCurrency(amount: number, currency: CurrencyCode = 'USD'): string {
  return formatter(currency, 0).format(amount);
}

// Format currency with decimals
export function formatCurrencyDetailed(amount: number, currency: CurrencyCode = 'USD'): string {
  return formatter(currency, 2).format(amount);
}

/* The symbol alone ("$", "€", "CA$", "CHF") for input prefixes. */
export function currencySymbol(currency: CurrencyCode): string {
  return formatter(currency, 0).formatToParts(0).find(p => p.type === 'currency')?.value ?? currency;
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
  if ((inputs.propertyTaxRate ?? 0) < 0 || (inputs.propertyTaxRate ?? 0) > 10) return "Property tax rate must be between 0% and 10% a year";
  if ((inputs.homeInsurance ?? 0) < 0) return "Home insurance cannot be negative";
  if ((inputs.pmiRate ?? 0) < 0 || (inputs.pmiRate ?? 0) > 5) return "PMI rate must be between 0% and 5% a year";
  if ((inputs.hoa ?? 0) < 0) return "HOA fees cannot be negative";
  
  return null;
}
