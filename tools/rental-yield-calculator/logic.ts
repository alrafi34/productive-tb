import {
  CalculationResult,
  CalculatorInputs,
  Currency,
  ExpenseItem,
  HistoryEntry,
} from "./types";

// ── Labels ────────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", BDT: "৳",
};
export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)", INR: "INR (₹)", BDT: "BDT (৳)",
};
export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "BDT"];

// ── Mortgage helper ───────────────────────────────────────────────────────────

function monthlyMortgage(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

// ── Rating ────────────────────────────────────────────────────────────────────

function getRating(netYield: number): CalculationResult["rating"] {
  if (netYield >= 9)  return "Excellent";
  if (netYield >= 7)  return "Strong";
  if (netYield >= 5)  return "Average";
  if (netYield >= 3)  return "Below Average";
  return "Poor";
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const price       = parseFloat(inputs.propertyPrice);
  const rent        = parseFloat(inputs.monthlyRent);
  const down        = parseFloat(inputs.downPayment)   || 0;
  const mRate       = parseFloat(inputs.mortgageRate)  || 0;
  const mTerm       = parseFloat(inputs.mortgageTerm)  || 30;
  const tax         = parseFloat(inputs.propertyTax)   || 0;
  const insurance   = parseFloat(inputs.insurance)     || 0;
  const maintenance = parseFloat(inputs.maintenance)   || 0;
  const management  = parseFloat(inputs.management)    || 0;
  const hoa         = parseFloat(inputs.hoa)           || 0;
  const vacancy     = inputs.vacancyRate / 100;

  if (!price || price <= 0) return null;
  if (!rent  || rent  <= 0) return null;

  const annualRent              = rent * 12;
  const vacancyAdjustedRent     = annualRent * (1 - vacancy);
  const annualExpenses          = tax + insurance + maintenance + management + hoa;
  const monthlyExpenses         = annualExpenses / 12;

  const grossYield              = (annualRent / price) * 100;
  const netYield                = ((annualRent - annualExpenses) / price) * 100;
  const vacancyAdjustedGrossYield = (vacancyAdjustedRent / price) * 100;
  const vacancyAdjustedNetYield   = ((vacancyAdjustedRent - annualExpenses) / price) * 100;

  const loanPrincipal   = Math.max(0, price - down);
  const mortgagePayment = mRate > 0 ? monthlyMortgage(loanPrincipal, mRate, mTerm) : 0;
  const monthlyCashFlow = rent - monthlyExpenses - mortgagePayment;
  const annualCashFlow  = monthlyCashFlow * 12;
  const annualProfit    = vacancyAdjustedRent - annualExpenses - mortgagePayment * 12;

  const invested        = down > 0 ? down : price;
  const cashOnCashReturn = (annualCashFlow / invested) * 100;

  const expenseBreakdown: ExpenseItem[] = [
    { label: "Property Tax",    annual: tax,         monthly: tax / 12 },
    { label: "Insurance",       annual: insurance,   monthly: insurance / 12 },
    { label: "Maintenance",     annual: maintenance, monthly: maintenance / 12 },
    { label: "Management Fees", annual: management,  monthly: management / 12 },
    { label: "HOA Fees",        annual: hoa,         monthly: hoa / 12 },
  ].filter((e) => e.annual > 0);

  return {
    propertyPrice: price,
    monthlyRent: rent,
    annualRent,
    vacancyAdjustedRent,
    annualExpenses,
    grossYield,
    netYield,
    vacancyAdjustedGrossYield,
    vacancyAdjustedNetYield,
    monthlyExpenses,
    mortgagePayment,
    monthlyCashFlow,
    annualCashFlow,
    annualProfit,
    cashOnCashReturn,
    expenseBreakdown,
    rating: getRating(netYield),
    currency: inputs.currency,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(value: number, currency: Currency, decimals = 0): string {
  return `${CURRENCY_SYMBOLS[currency]}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function fmtPct(value: number): string {
  return `${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}

export function fmtCashFlow(value: number, currency: Currency): string {
  const sym = CURRENCY_SYMBOLS[currency];
  const abs = Math.abs(value);
  const sign = value >= 0 ? "+" : "−";
  return `${sign}${sym}${abs.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const HISTORY_KEY = "rental-yield-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const h = getHistory();
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (h.length > MAX_HISTORY) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[result.currency];
  return [
    "Rental Yield Calculator – Summary",
    "=".repeat(45),
    "",
    `Property Price       : ${sym}${result.propertyPrice.toLocaleString("en-US")}`,
    `Monthly Rent         : ${sym}${result.monthlyRent.toLocaleString("en-US")}`,
    `Annual Rent          : ${sym}${result.annualRent.toLocaleString("en-US")}`,
    `Vacancy Rate         : ${inputs.vacancyRate}%`,
    `Vacancy-Adj. Rent    : ${sym}${result.vacancyAdjustedRent.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    "",
    "── Yield Results ──",
    `Gross Rental Yield   : ${fmtPct(result.grossYield)}`,
    `Net Rental Yield     : ${fmtPct(result.netYield)}`,
    `Adj. Gross Yield     : ${fmtPct(result.vacancyAdjustedGrossYield)}`,
    `Adj. Net Yield       : ${fmtPct(result.vacancyAdjustedNetYield)}`,
    "",
    "── Cash Flow ──",
    `Annual Expenses      : ${sym}${result.annualExpenses.toLocaleString("en-US")}`,
    result.mortgagePayment > 0 ? `Monthly Mortgage     : ${sym}${result.mortgagePayment.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : "",
    `Monthly Cash Flow    : ${fmtCashFlow(result.monthlyCashFlow, result.currency)}`,
    `Annual Cash Flow     : ${fmtCashFlow(result.annualCashFlow, result.currency)}`,
    `Cash-on-Cash Return  : ${fmtPct(result.cashOnCashReturn)}`,
    `Rating               : ${result.rating}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter(Boolean).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
