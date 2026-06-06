import {
  AmortizationRow,
  CalculationResult,
  CalculatorInputs,
  Currency,
  HistoryEntry,
  ScenarioResult,
  YearlySummary,
} from "./types";

// ── Currency ──────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", BDT: "৳",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)", INR: "INR (₹)", BDT: "BDT (৳)",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "BDT"];

// ── Core EMI formula ──────────────────────────────────────────────────────────

export function calcEMI(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 12 / 100;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

// ── Amortization schedule ─────────────────────────────────────────────────────

function buildSchedule(principal: number, annualRate: number, months: number): AmortizationRow[] {
  const r = annualRate / 12 / 100;
  const emi = calcEMI(principal, annualRate, months);
  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let m = 1; m <= months && balance > 0.005; m++) {
    const interestPart  = balance * r;
    const principalPart = Math.min(emi - interestPart, balance);
    balance = Math.max(0, balance - principalPart);
    schedule.push({
      month: m,
      year: Math.ceil(m / 12),
      emi: interestPart + principalPart,
      principal: principalPart,
      interest: interestPart,
      balance,
    });
    if (balance < 0.005) break;
  }
  return schedule;
}

function buildYearly(schedule: AmortizationRow[]): YearlySummary[] {
  const map = new Map<number, YearlySummary>();
  for (const r of schedule) {
    if (!map.has(r.year)) map.set(r.year, { year: r.year, totalEMI: 0, totalPrincipal: 0, totalInterest: 0, endBalance: 0 });
    const s = map.get(r.year)!;
    s.totalEMI       += r.emi;
    s.totalPrincipal += r.principal;
    s.totalInterest  += r.interest;
    s.endBalance      = r.balance;
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
  const loanAmt = parseFloat(inputs.loanAmount);
  const rate    = parseFloat(inputs.interestRate);
  const down    = parseFloat(inputs.downPayment) || 0;
  const rawTenure = parseFloat(inputs.tenure);

  if (!loanAmt || loanAmt <= 0) return null;
  if (isNaN(rate) || rate < 0 || rate > 30) return null;
  if (!rawTenure || rawTenure <= 0) return null;
  if (down >= loanAmt) return null;

  const principal = loanAmt - down;
  const months = inputs.tenureMode === "years" ? Math.round(rawTenure * 12) : Math.round(rawTenure);
  if (months <= 0) return null;

  const emi = calcEMI(principal, rate, months);
  const schedule = buildSchedule(principal, rate, months);
  const totalPayment  = schedule.reduce((s, r) => s + r.emi, 0);
  const totalInterest = totalPayment - principal;
  const yearlySchedule = buildYearly(schedule);

  return {
    principal,
    emi,
    totalPayment,
    totalInterest,
    totalMonths: schedule.length,
    payoffDate: payoffDate(schedule.length),
    schedule,
    yearlySchedule,
    currency: inputs.currency,
  };
}

// ── Scenario comparison ───────────────────────────────────────────────────────

export function calcScenario(
  principal: number,
  rate: number,
  months: number,
  label: string
): ScenarioResult {
  const emi = calcEMI(principal, rate, months);
  const totalPayment  = emi * months;
  const totalInterest = totalPayment - principal;
  return { label, emi, totalPayment, totalInterest, totalMonths: months };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(value: number, currency: Currency, decimals = 0): string {
  return `${CURRENCY_SYMBOLS[currency]}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function fmtNum(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
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

const HISTORY_KEY = "home-loan-emi-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const h = getHistory();
    const slim = { ...result, schedule: [], yearlySchedule: [] };
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result: slim as CalculationResult });
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

// ── CSV Export ────────────────────────────────────────────────────────────────

export function exportScheduleCSV(schedule: AmortizationRow[], currency: Currency): void {
  const sym = CURRENCY_SYMBOLS[currency];
  const header = "Month,Year,EMI,Principal,Interest,Balance\n";
  const rows = schedule.map((r) =>
    `${r.month},${r.year},${r.emi.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}`
  ).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "home_loan_emi_schedule.csv";
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  void sym;
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[result.currency];
  return [
    "Home Loan EMI Calculator – Summary",
    "=".repeat(45),
    "",
    `Loan Amount      : ${sym}${fmtNum(parseFloat(inputs.loanAmount) || 0, 0)}`,
    inputs.downPayment ? `Down Payment     : ${sym}${fmtNum(parseFloat(inputs.downPayment) || 0, 0)}` : "",
    `Principal        : ${sym}${fmtNum(result.principal, 0)}`,
    `Interest Rate    : ${inputs.interestRate}% p.a.`,
    `Tenure           : ${inputs.tenure} ${inputs.tenureMode}`,
    "",
    `Monthly EMI      : ${sym}${fmtNum(result.emi, 2)}`,
    `Total Interest   : ${sym}${fmtNum(result.totalInterest, 0)}`,
    `Total Payment    : ${sym}${fmtNum(result.totalPayment, 0)}`,
    `Payoff Date      : ${result.payoffDate}`,
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
