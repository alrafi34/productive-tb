import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, Unit } from "./types";

export const UNIT_TO_SQFT: Record<Unit, number> = {
  sqft:    1,
  sqm:     10.7639,
  decimal: 435.6,
  acre:    43560,
  katha:   720,
  bigha:   14400,
  hectare: 107639,
};

export const UNIT_LABELS: Record<Unit, string> = {
  sqft:    "Square Feet (sq ft)",
  sqm:     "Square Meter (sq m)",
  decimal: "Decimal",
  acre:    "Acre",
  katha:   "Katha",
  bigha:   "Bigha",
  hectare: "Hectare",
};

export const UNIT_SHORT: Record<Unit, string> = {
  sqft:    "sq ft",
  sqm:     "sq m",
  decimal: "Decimal",
  acre:    "Acre",
  katha:   "Katha",
  bigha:   "Bigha",
  hectare: "ha",
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  BDT: "৳",
  USD: "$",
  INR: "₹",
  EUR: "€",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  BDT: "BDT (৳)",
  USD: "USD ($)",
  INR: "INR (₹)",
  EUR: "EUR (€)",
};

export const ALL_UNITS: Unit[] = ["sqft", "sqm", "decimal", "acre", "katha", "bigha", "hectare"];
export const ALL_CURRENCIES: Currency[] = ["USD", "BDT", "INR", "EUR"];

export function validatePrice(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid land price.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric price.";
  if (num <= 0) return "Price must be greater than zero.";
  return null;
}

export function validateArea(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid land area.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric area.";
  if (num <= 0) return "Area must be greater than zero.";
  return null;
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  if (validatePrice(inputs.totalPrice) || validateArea(inputs.area)) return null;
  const price = parseFloat(inputs.totalPrice);
  const area = parseFloat(inputs.area);
  const totalAreaSqFt = area * UNIT_TO_SQFT[inputs.areaUnit];
  const pricePerSqFt = price / totalAreaSqFt;
  return {
    pricePerSqFt,
    totalAreaSqFt,
    totalPrice: price,
    currency: inputs.currency,
    areaUnit: inputs.areaUnit,
  };
}

export function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "price-per-sqft-calculator-history";
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
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const p = inputs.precision;
  return [
    "Price per Square Feet Calculator – Result",
    "=".repeat(45),
    "",
    `Total Price  : ${sym}${formatNumber(result.totalPrice, p)}`,
    `Land Area    : ${formatNumber(parseFloat(inputs.area), p)} ${UNIT_SHORT[inputs.areaUnit]}`,
    inputs.areaUnit !== "sqft"
      ? `Converted    : ${formatNumber(result.totalAreaSqFt, p)} sq ft`
      : "",
    "",
    `Price/sq ft  : ${sym}${formatNumber(result.pricePerSqFt, p)}`,
    "",
    `Formula: ${sym}${formatNumber(result.totalPrice, p)} ÷ ${formatNumber(result.totalAreaSqFt, p)} sq ft = ${sym}${formatNumber(result.pricePerSqFt, p)}/sq ft`,
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
