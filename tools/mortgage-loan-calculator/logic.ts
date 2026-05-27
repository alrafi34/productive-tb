import {
  AmortizationRow,
  CalculationResult,
  CalculatorInputs,
  ComparisonResult,
  Currency,
  HistoryEntry,
  LoanTerm,
  YearlySummary,
} from "./types";

// ── Currency ──────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", BDT: "৳", INR: "₹",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)", BDT: "BDT (৳)", INR: "INR (₹)",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "BDT", "INR"];

export const LOAN_TERMS: LoanTerm[] = [10, 15, 20, 25, 30];

// ── Core mortgage formula ─────────────────────────────────────────────────────

function monthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// ── Amortization schedule ─────────────────────────────────────────────────────

function buildSchedule(
  principal: number,
  annualRate: number,
  years: number,
  extraMonthly: number
): AmortizationRow[] {
  const r = annualRate / 100 / 12;
  const basePayment = monthlyPayment(principal, annualRate, years);
  const totalMonths = years * 12;
  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let cumInterest = 0;

  for (let m = 1; m <= totalMonths && balance > 0.005; m++) {
    const interestPart = balance * r;
    const principalPart = Math.min(basePayment - interestPart + extraMonthly, balance);
    const payment = interestPart + principalPart;
    balance = Math.max(0, balance - principalPart);
    cumInterest += interestPart;

    schedule.push({
      month: m,
      year: Math.ceil(m / 12),
      payment,
      principal: principalPart,
      interest: interestPart,
      balance,
      cumulativeInterest: cumInterest,
    });

    if (balance < 0.005) break;
  }
  return schedule;
}

function buildYearlySummary(schedule: AmortizationRow[]): YearlySummary[] {
  const map = new Map<number, YearlySummary>();
  for (const row of schedule) {
    const y = row.year;
    if (!map.has(y)) {
      map.set(y, { year: y, totalPayment: 0, totalPrincipal: 0, totalInterest: 0, endBalance: 0 });
    }
    const s = map.get(y)!;
    s.totalPayment   += row.payment;
    s.totalPrincipal += row.principal;
    s.totalInterest  += row.interest;
    s.endBalance      = row.balance;
  }
  return Array.from(map.values());
}

function payoffDate(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const loanAmt  = parseFloat(inputs.loanAmount);
  const rate     = parseFloat(inputs.interestRate);
  const down     = parseFloat(inputs.downPayment)    || 0;
  const tax      = parseFloat(inputs.propertyTax)    || 0;
  const ins      = parseFloat(inputs.homeInsurance)  || 0;
  const extra    = parseFloat(inputs.extraPayment)   || 0;
  const years    = inputs.loanTermYears;

  if (!loanAmt || loanAmt <= 0) return null;
  if (isNaN(rate) || rate < 0 || rate > 30) return null;
  if (down >= loanAmt) return null;

  const principal = loanAmt - down;
  const basePayment = monthlyPayment(principal, rate, years);
  const monthlyTax = tax / 12;
  const monthlyIns = ins / 12;
  const totalMonthly = basePayment + monthlyTax + monthlyIns;

  // Base schedule (no extra)
  const schedule = buildSchedule(principal, rate, years, 0);
  const totalMonths = schedule.length;
  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
  const totalPayment = schedule.reduce((s, r) => s + r.payment, 0);
  const yearlySchedule = buildYearlySummary(schedule);

  // Extra payment schedule
  let extraTotalMonths = totalMonths;
  let extraTotalInterest = totalInterest;
  if (extra > 0) {
    const extraSched = buildSchedule(principal, rate, years, extra);
    extraTotalMonths = extraSched.length;
    extraTotalInterest = extraSched.reduce((s, r) => s + r.interest, 0);
  }

  return {
    principal,
    monthlyPayment: basePayment,
    monthlyTax,
    monthlyInsurance: monthlyIns,
    totalMonthly,
    totalPayment,
    totalInterest,
    totalMonths,
    payoffDate: payoffDate(totalMonths),
    extraMonthlyPayment: extra,
    extraTotalMonths,
    extraTotalInterest,
    extraPayoffDate: payoffDate(extraTotalMonths),
    interestSaved: totalInterest - extraTotalInterest,
    monthsSaved: totalMonths - extraTotalMonths,
    schedule,
    yearlySchedule,
    currency: inputs.currency,
  };
}

// ── Comparison ────────────────────────────────────────────────────────────────

export function compareTerms(
  loanAmount: number,
  downPayment: number,
  rate: number
): ComparisonResult[] {
  const principal = Math.max(0, loanAmount - downPayment);
  return LOAN_TERMS.map((term) => {
    const mp = monthlyPayment(principal, rate, term);
    const total = mp * term * 12;
    return {
      term,
      monthlyPayment: mp,
      totalInterest: total - principal,
      totalPayment: total,
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

export function fmtNum(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
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

const HISTORY_KEY = "mortgage-loan-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const h = getHistory();
    // Don't store full schedule in history — too large
    const slim = { ...result, schedule: [], yearlySchedule: [] };
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result: slim as CalculationResult });
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

// ── CSV Export ────────────────────────────────────────────────────────────────

export function exportScheduleCSV(schedule: AmortizationRow[], currency: Currency): void {
  const sym = CURRENCY_SYMBOLS[currency];
  const header = "Month,Year,Payment,Principal,Interest,Balance,Cumulative Interest\n";
  const rows = schedule.map((r) =>
    `${r.month},${r.year},${r.payment.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)},${r.cumulativeInterest.toFixed(2)}`
  ).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "mortgage_amortization.csv";
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  void sym; // suppress unused warning
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[result.currency];
  return [
    "Mortgage Loan Calculator – Summary",
    "=".repeat(45),
    "",
    `Loan Amount      : ${sym}${fmtNum(parseFloat(inputs.loanAmount) || 0, 0)}`,
    `Down Payment     : ${sym}${fmtNum(parseFloat(inputs.downPayment) || 0, 0)}`,
    `Principal        : ${sym}${fmtNum(result.principal, 0)}`,
    `Interest Rate    : ${inputs.interestRate}%`,
    `Loan Term        : ${inputs.loanTermYears} years`,
    "",
    "── Monthly Breakdown ──",
    `P&I Payment      : ${sym}${fmtNum(result.monthlyPayment, 2)}`,
    result.monthlyTax > 0     ? `Property Tax     : ${sym}${fmtNum(result.monthlyTax, 2)}/mo` : "",
    result.monthlyInsurance > 0 ? `Insurance        : ${sym}${fmtNum(result.monthlyInsurance, 2)}/mo` : "",
    `Total Monthly    : ${sym}${fmtNum(result.totalMonthly, 2)}`,
    "",
    "── Loan Summary ──",
    `Total Payment    : ${sym}${fmtNum(result.totalPayment, 0)}`,
    `Total Interest   : ${sym}${fmtNum(result.totalInterest, 0)}`,
    `Payoff Date      : ${result.payoffDate}`,
    result.extraMonthlyPayment > 0 ? `\n── With Extra ${sym}${fmtNum(result.extraMonthlyPayment, 0)}/mo ──` : "",
    result.extraMonthlyPayment > 0 ? `Interest Saved   : ${sym}${fmtNum(result.interestSaved, 0)}` : "",
    result.extraMonthlyPayment > 0 ? `Months Saved     : ${result.monthsSaved}` : "",
    result.extraMonthlyPayment > 0 ? `New Payoff Date  : ${result.extraPayoffDate}` : "",
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
