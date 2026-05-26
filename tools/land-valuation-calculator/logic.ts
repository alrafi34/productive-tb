import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, Unit } from "./types";

export const UNIT_TO_SQFT: Record<Unit, number> = {
  sqft:    1,
  sqm:     10.7639,
  decimal: 435.6,
  acre:    43560,
  katha:   720,
  bigha:   14400,
  hectare: 107639,
  marla:   272.25,
  kanal:   5445,
};

export const UNIT_LABELS: Record<Unit, string> = {
  sqft:    "Square Feet (sq ft)",
  sqm:     "Square Meter (sq m)",
  acre:    "Acre",
  hectare: "Hectare",
  decimal: "Decimal",
  katha:   "Katha",
  bigha:   "Bigha",
  marla:   "Marla",
  kanal:   "Kanal",
};

export const UNIT_SHORT: Record<Unit, string> = {
  sqft:    "sq ft",
  sqm:     "sq m",
  acre:    "Acre",
  hectare: "ha",
  decimal: "Decimal",
  katha:   "Katha",
  bigha:   "Bigha",
  marla:   "Marla",
  kanal:   "Kanal",
};

export const UNIT_NOTES: Partial<Record<Unit, string>> = {
  katha:   "1 Katha = 720 sq ft (Bangladesh/West Bengal standard)",
  bigha:   "1 Bigha = 14,400 sq ft (Bangladesh standard)",
  marla:   "1 Marla = 272.25 sq ft (Pakistan/India standard)",
  kanal:   "1 Kanal = 5,445 sq ft (Pakistan/India standard)",
  decimal: "1 Decimal = 435.6 sq ft",
  acre:    "1 Acre = 43,560 sq ft",
  hectare: "1 Hectare = 107,639 sq ft",
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BDT: "৳",
  INR: "₹",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)",
  EUR: "EUR (€)",
  GBP: "GBP (£)",
  BDT: "BDT (৳)",
  INR: "INR (₹)",
};

export const ALL_UNITS: Unit[] = [
  "sqft", "sqm", "acre", "hectare", "decimal", "katha", "bigha", "marla", "kanal",
];
export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "BDT", "INR"];

export function validateArea(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid land area.";
  const n = parseFloat(value);
  if (isNaN(n) || n <= 0) return "Land area must be greater than zero.";
  return null;
}

export function validatePrice(value: string): string | null {
  if (!value || value.trim() === "") return "Price per unit cannot be empty.";
  const n = parseFloat(value);
  if (isNaN(n) || n <= 0) return "Price per unit must be greater than zero.";
  return null;
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  if (validateArea(inputs.area) || validatePrice(inputs.pricePerUnit)) return null;
  const area = parseFloat(inputs.area);
  const price = parseFloat(inputs.pricePerUnit);
  const extra = parseFloat(inputs.extraCost) || 0;
  const landValue = area * price;
  return {
    landValue,
    extraCost: extra,
    totalValue: landValue + extra,
    area,
    pricePerUnit: price,
    unit: inputs.unit,
    currency: inputs.currency,
  };
}

export function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(value: number, currency: Currency, decimals: number): string {
  return `${CURRENCY_SYMBOLS[currency]}${formatNumber(value, decimals)}`;
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "land-valuation-calculator-history";
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

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const p = inputs.precision;
  return [
    "Land Valuation Calculator – Report",
    "=".repeat(45),
    "",
    `Land Area      : ${formatNumber(result.area, p)} ${UNIT_SHORT[result.unit]}`,
    `Price Per Unit : ${sym}${formatNumber(result.pricePerUnit, p)}`,
    `Land Value     : ${sym}${formatNumber(result.landValue, p)}`,
    result.extraCost > 0
      ? `Extra Costs    : ${sym}${formatNumber(result.extraCost, p)}`
      : "",
    "",
    `Total Value    : ${sym}${formatNumber(result.totalValue, p)}`,
    "",
    `Formula: (${formatNumber(result.area, p)} × ${sym}${formatNumber(result.pricePerUnit, p)}) + ${sym}${formatNumber(result.extraCost, p)} = ${sym}${formatNumber(result.totalValue, p)}`,
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
