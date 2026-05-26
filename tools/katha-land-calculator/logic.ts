import { CalculatorInputs, ConversionResult, HistoryEntry, Region, Unit } from "./types";

// All values in Square Feet per unit
export const REGION_TABLES: Record<Region, Record<Unit, number>> = {
  bangladesh: {
    katha:   720,
    decimal: 435.6,
    bigha:   14400,
    acre:    43560,
    sqft:    1,
    sqm:     10.7639,
    hectare: 107639,
  },
  westbengal: {
    katha:   720,
    decimal: 435.6,
    bigha:   14400,
    acre:    43560,
    sqft:    1,
    sqm:     10.7639,
    hectare: 107639,
  },
  bihar: {
    katha:   1361.25,
    decimal: 435.6,
    bigha:   27225,
    acre:    43560,
    sqft:    1,
    sqm:     10.7639,
    hectare: 107639,
  },
  nepal: {
    katha:   3645,
    decimal: 435.6,
    bigha:   72900,
    acre:    43560,
    sqft:    1,
    sqm:     10.7639,
    hectare: 107639,
  },
};

export const REGION_LABELS: Record<Region, string> = {
  bangladesh: "Bangladesh",
  westbengal: "West Bengal",
  bihar:      "Bihar",
  nepal:      "Nepal",
};

export const UNIT_LABELS: Record<Unit, string> = {
  katha:   "Katha",
  decimal: "Decimal",
  bigha:   "Bigha",
  acre:    "Acre",
  sqft:    "Square Feet",
  sqm:     "Square Meter",
  hectare: "Hectare",
};

export const UNIT_SHORT: Record<Unit, string> = {
  katha:   "Katha",
  decimal: "Decimal",
  bigha:   "Bigha",
  acre:    "Acre",
  sqft:    "sq ft",
  sqm:     "sq m",
  hectare: "ha",
};

export function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function validateInput(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid land amount.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num < 0) return "Value must not be negative.";
  return null;
}

export function calculate(inputs: CalculatorInputs): ConversionResult | null {
  if (validateInput(inputs.value)) return null;
  const val = parseFloat(inputs.value);
  const table = REGION_TABLES[inputs.region];
  const sqft = val * table[inputs.fromUnit];

  return {
    squareFeet: sqft,
    katha:   sqft / table.katha,
    decimal: sqft / table.decimal,
    bigha:   sqft / table.bigha,
    acre:    sqft / table.acre,
    sqft:    sqft / table.sqft,
    sqm:     sqft / table.sqm,
    hectare: sqft / table.hectare,
  };
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "katha-land-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: ConversionResult): void {
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

export function exportToText(inputs: CalculatorInputs, result: ConversionResult): string {
  const region = REGION_LABELS[inputs.region];
  const fromLabel = UNIT_LABELS[inputs.fromUnit];
  const p = inputs.precision;
  return [
    "Katha Land Calculator – Result",
    "=".repeat(45),
    "",
    `Input   : ${formatNumber(parseFloat(inputs.value), p)} ${fromLabel}`,
    `Region  : ${region}`,
    "",
    "Converted Values:",
    `  Katha        : ${formatNumber(result.katha, p)}`,
    `  Decimal      : ${formatNumber(result.decimal, p)}`,
    `  Bigha        : ${formatNumber(result.bigha, p)}`,
    `  Acre         : ${formatNumber(result.acre, p)}`,
    `  Square Feet  : ${formatNumber(result.sqft, p)}`,
    `  Square Meter : ${formatNumber(result.sqm, p)}`,
    `  Hectare      : ${formatNumber(result.hectare, p)}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
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
