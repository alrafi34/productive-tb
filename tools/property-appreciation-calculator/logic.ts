import {
  CalculationResult,
  CalculatorInputs,
  Currency,
  HistoryEntry,
  YearlyBreakdown,
} from "./types";

// ── Constants ─────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  CAD: "CA$",
  AUD: "A$",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD – US Dollar",
  EUR: "EUR – Euro",
  GBP: "GBP – British Pound",
  INR: "INR – Indian Rupee",
  CAD: "CAD – Canadian Dollar",
  AUD: "AUD – Australian Dollar",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];

export const COMPOUND_FREQUENCY_LABELS: Record<string, string> = {
  yearly: "Yearly",
  quarterly: "Quarterly",
  monthly: "Monthly",
};

export const COMPOUND_FREQUENCY_N: Record<string, number> = {
  yearly: 1,
  quarterly: 4,
  monthly: 12,
};

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(value: number, currency: Currency, decimals = 0): string {
  const sym = CURRENCY_SYMBOLS[currency];
  return `${sym}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function fmtPct(value: number, decimals = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

// ── Core Calculation ──────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const initial = parseFloat(inputs.initialValue);
  if (!initial || initial <= 0) return null;

  const rate = inputs.appreciationRate / 100;
  const years = inputs.years;
  const n = COMPOUND_FREQUENCY_N[inputs.compoundFrequency];
  const additionalAnnual = parseFloat(inputs.additionalAnnualInvestment) || 0;
  const inflationRate = parseFloat(inputs.inflationRate);
  const hasInflation = !isNaN(inflationRate) && inflationRate >= 0;

  // FV = P × (1 + r/n)^(n×t)
  const futureValue = initial * Math.pow(1 + rate / n, n * years) +
    (additionalAnnual > 0
      ? additionalAnnual * ((Math.pow(1 + rate / n, n * years) - 1) / (rate / n))
      : 0);

  const totalGain = futureValue - initial;
  const growthPercent = (totalGain / initial) * 100;

  // Inflation-adjusted future value
  let inflationAdjustedValue: number | null = null;
  let realGainPercent: number | null = null;
  if (hasInflation) {
    const inflRate = inflationRate / 100;
    inflationAdjustedValue = futureValue / Math.pow(1 + inflRate, years);
    realGainPercent = ((inflationAdjustedValue - initial) / initial) * 100;
  }

  // Annualized return (CAGR)
  const annualizedReturn = (Math.pow(futureValue / initial, 1 / years) - 1) * 100;

  // Year-by-year breakdown
  const yearlyBreakdown: YearlyBreakdown[] = [];
  let runningValue = initial;

  for (let y = 1; y <= years; y++) {
    const yearValue = initial * Math.pow(1 + rate / n, n * y) +
      (additionalAnnual > 0
        ? additionalAnnual * ((Math.pow(1 + rate / n, n * y) - 1) / (rate / n))
        : 0);

    const yearGain = yearValue - runningValue;
    const cumulativeGain = yearValue - initial;

    let inflAdjYear: number | null = null;
    if (hasInflation) {
      const inflRate = inflationRate / 100;
      inflAdjYear = yearValue / Math.pow(1 + inflRate, y);
    }

    yearlyBreakdown.push({
      year: y,
      propertyValue: yearValue,
      appreciationGain: yearGain,
      cumulativeGain,
      inflationAdjustedValue: inflAdjYear,
    });

    runningValue = yearValue;
  }

  return {
    initialValue: initial,
    futureValue,
    totalGain,
    growthPercent,
    inflationAdjustedValue,
    realGainPercent,
    yearlyBreakdown,
    currency: inputs.currency,
    annualizedReturn,
  };
}

// ── LocalStorage History ──────────────────────────────────────────────────────

const HISTORY_KEY = "property_appreciation_history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {}
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}

// ── CSV Export ────────────────────────────────────────────────────────────────

export function generateCSV(breakdown: YearlyBreakdown[], currency: Currency, hasInflation: boolean): string {
  const sym = CURRENCY_SYMBOLS[currency];
  const headers = hasInflation
    ? ["Year", `Property Value (${sym})`, `Annual Gain (${sym})`, `Cumulative Gain (${sym})`, `Inflation-Adjusted Value (${sym})`]
    : ["Year", `Property Value (${sym})`, `Annual Gain (${sym})`, `Cumulative Gain (${sym})`];

  const rows = breakdown.map((row) => {
    const base = [
      row.year,
      row.propertyValue.toFixed(2),
      row.appreciationGain.toFixed(2),
      row.cumulativeGain.toFixed(2),
    ];
    if (hasInflation) base.push((row.inflationAdjustedValue ?? 0).toFixed(2));
    return base.join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[result.currency];
  return [
    "Property Appreciation Calculator – Results",
    "=".repeat(45),
    `Initial Property Value: ${sym}${result.initialValue.toLocaleString("en-US")}`,
    `Annual Appreciation Rate: ${inputs.appreciationRate}%`,
    `Investment Duration: ${inputs.years} years`,
    `Compound Frequency: ${COMPOUND_FREQUENCY_LABELS[inputs.compoundFrequency]}`,
    "",
    `Future Estimated Value: ${sym}${result.futureValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    `Total Appreciation Gain: ${sym}${result.totalGain.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    `Growth Percentage: ${fmtPct(result.growthPercent)}`,
    `Annualized Return (CAGR): ${result.annualizedReturn.toFixed(2)}%`,
    result.inflationAdjustedValue !== null
      ? `Inflation-Adjusted Value: ${sym}${result.inflationAdjustedValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// ── URL Params ────────────────────────────────────────────────────────────────

export function buildShareURL(inputs: CalculatorInputs): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams({
    price: inputs.initialValue,
    rate: String(inputs.appreciationRate),
    years: String(inputs.years),
    freq: inputs.compoundFrequency,
    currency: inputs.currency,
    ...(inputs.additionalAnnualInvestment ? { add: inputs.additionalAnnualInvestment } : {}),
    ...(inputs.inflationRate ? { inflation: inputs.inflationRate } : {}),
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parseURLParams(): Partial<CalculatorInputs> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result: Partial<CalculatorInputs> = {};
  if (params.get("price")) result.initialValue = params.get("price")!;
  if (params.get("rate")) result.appreciationRate = parseFloat(params.get("rate")!);
  if (params.get("years")) result.years = parseInt(params.get("years")!);
  if (params.get("freq")) result.compoundFrequency = params.get("freq") as CalculatorInputs["compoundFrequency"];
  if (params.get("currency")) result.currency = params.get("currency") as Currency;
  if (params.get("add")) result.additionalAnnualInvestment = params.get("add")!;
  if (params.get("inflation")) result.inflationRate = params.get("inflation")!;
  return result;
}
