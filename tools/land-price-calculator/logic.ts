import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, Unit } from "./types";

// Square feet per unit. Decimal, Katha and Bigha use the Bangladesh / West Bengal values
export const UNIT_TO_SQFT: Record<Unit, number> = {
  sqft:    1,
  sqm:     10.7639,
  decimal: 435.6,
  katha:   720,
  bigha:   14400,
  acre:    43560,
  hectare: 107639,
};

export const UNIT_LABELS: Record<Unit, string> = {
  decimal: "Decimal",
  acre:    "Acre",
  katha:   "Katha",
  bigha:   "Bigha",
  sqft:    "Square Feet",
  sqm:     "Square Meter",
  hectare: "Hectare",
};

export const UNIT_SHORT: Record<Unit, string> = {
  decimal: "Decimal",
  acre:    "Acre",
  katha:   "Katha",
  bigha:   "Bigha",
  sqft:    "sq ft",
  sqm:     "sq m",
  hectare: "ha",
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)",
  EUR: "EUR (€)",
  GBP: "GBP (£)",
  CAD: "CAD (CA$)",
  AUD: "AUD (A$)",
};

export const ALL_UNITS: Unit[] = ["acre", "sqft", "sqm", "hectare", "decimal", "katha", "bigha"];
export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "CAD", "AUD"];

export function convertArea(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  const sqft = value * UNIT_TO_SQFT[fromUnit];
  return sqft / UNIT_TO_SQFT[toUnit];
}

export function validateArea(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid land size.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Land size must be greater than zero.";
  return null;
}

export function validateRate(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a price rate.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric rate.";
  if (num <= 0) return "Price rate must be greater than zero.";
  return null;
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  if (validateArea(inputs.area) || validateRate(inputs.rate)) return null;
  const area = parseFloat(inputs.area);
  const rate = parseFloat(inputs.rate);
  const areaInRateUnit = convertArea(area, inputs.areaUnit, inputs.rateUnit);
  const totalPrice = areaInRateUnit * rate;
  return {
    totalPrice,
    convertedArea: areaInRateUnit,
    areaInRateUnit,
    rateApplied: rate,
    currency: inputs.currency,
  };
}

export function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(value: number, currency: Currency, decimals: number = 2): string {
  const sym = (CURRENCY_SYMBOLS[currency] ?? "$");
  return `${sym}${formatNumber(value, decimals)}`;
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "land-price-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = (CURRENCY_SYMBOLS[inputs.currency] ?? "$");
  const p = inputs.precision;
  const sameUnit = inputs.areaUnit === inputs.rateUnit;
  return [
    "Land Price Calculator – Result",
    "=".repeat(45),
    "",
    `Land Area    : ${formatNumber(parseFloat(inputs.area), p)} ${(UNIT_LABELS[inputs.areaUnit] ?? inputs.areaUnit)}`,
    `Rate Per Unit: ${sym}${formatNumber(result.rateApplied, p)} per ${(UNIT_LABELS[inputs.rateUnit] ?? inputs.rateUnit)}`,
    !sameUnit
      ? `Converted    : ${formatNumber(result.areaInRateUnit, p)} ${(UNIT_LABELS[inputs.rateUnit] ?? inputs.rateUnit)}`
      : "",
    "",
    `Total Price  : ${sym}${formatNumber(result.totalPrice, p)}`,
    "",
    `Formula: ${formatNumber(result.areaInRateUnit, p)} ${(UNIT_LABELS[inputs.rateUnit] ?? inputs.rateUnit)} × ${sym}${formatNumber(result.rateApplied, p)} = ${sym}${formatNumber(result.totalPrice, p)}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter(Boolean).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
