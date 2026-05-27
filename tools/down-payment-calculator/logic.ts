import {
  CalculationResult,
  CalculatorInputs,
  Currency,
  HistoryEntry,
  LoanTerm,
  ScenarioResult,
} from "./types";

// ── Labels ────────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", BDT: "৳", SGD: "S$",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)",
  INR: "INR (₹)", BDT: "BDT (৳)", SGD: "SGD (S$)",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "BDT", "SGD"];

export const LOAN_TERMS: LoanTerm[] = [5, 10, 15, 20, 25, 30];

export const QUICK_PRESETS = [5, 10, 15, 20, 25, 30];

// ── Monthly payment formula ───────────────────────────────────────────────────

function monthlyPayment(principal: number, annualRate: number, years: number): number | null {
  if (principal <= 0 || years <= 0) return null;
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 12 / 100;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const price = parseFloat(inputs.purchasePrice);
  const dpVal = parseFloat(inputs.downPaymentValue);
  const rate  = parseFloat(inputs.interestRate) || 0;

  if (!price || price <= 0) return null;
  if (isNaN(dpVal) || dpVal < 0) return null;

  let downAmt: number;
  let downPct: number;

  if (inputs.downPaymentMode === "percentage") {
    if (dpVal > 100) return null;
    downAmt = price * (dpVal / 100);
    downPct = dpVal;
  } else {
    if (dpVal > price) return null;
    downAmt = dpVal;
    downPct = (dpVal / price) * 100;
  }

  const remaining = price - downAmt;
  const mp = rate > 0 ? monthlyPayment(remaining, rate, inputs.loanTerm) : null;
  const totalPay = mp !== null ? mp * inputs.loanTerm * 12 : null;
  const totalInt = totalPay !== null ? totalPay - remaining : null;

  return {
    purchasePrice: price,
    downPaymentAmount: downAmt,
    downPaymentPercent: downPct,
    remainingLoan: remaining,
    monthlyPayment: mp,
    totalPayment: totalPay,
    totalInterest: totalInt,
    currency: inputs.currency,
  };
}

// ── Scenario comparison ───────────────────────────────────────────────────────

export function buildScenarios(
  price: number,
  rate: number,
  term: LoanTerm,
  percentages: number[]
): ScenarioResult[] {
  return percentages.map((pct) => {
    const downAmt   = price * (pct / 100);
    const remaining = price - downAmt;
    const mp = rate > 0 ? monthlyPayment(remaining, rate, term) : null;
    return {
      label: `${pct}%`,
      downPaymentPercent: pct,
      downPaymentAmount: downAmt,
      remainingLoan: remaining,
      monthlyPayment: mp,
    };
  });
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(value: number, currency: Currency, decimals = 0): string {
  return `${CURRENCY_SYMBOLS[currency]}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function fmtPct(value: number): string {
  return `${value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`;
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const HISTORY_KEY = "down-payment-calculator-history";
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
    "Down Payment Calculator – Summary",
    "=".repeat(45),
    "",
    `Purchase Price       : ${sym}${result.purchasePrice.toLocaleString("en-US")}`,
    `Down Payment         : ${sym}${result.downPaymentAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })} (${fmtPct(result.downPaymentPercent)})`,
    `Remaining Financing  : ${sym}${result.remainingLoan.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
    result.monthlyPayment !== null ? `Interest Rate        : ${inputs.interestRate}% p.a.` : "",
    result.monthlyPayment !== null ? `Loan Term            : ${inputs.loanTerm} years` : "",
    result.monthlyPayment !== null ? `Monthly Payment      : ${sym}${result.monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : "",
    result.totalInterest !== null  ? `Total Interest       : ${sym}${result.totalInterest.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "",
    result.totalPayment !== null   ? `Total Payment        : ${sym}${result.totalPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "",
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
