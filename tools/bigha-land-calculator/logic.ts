import { CalculatorInputs, ConversionResult, HistoryEntry, Region, Unit } from "./types";

// Square feet per unit for each region
// Universal constants (same across all regions)
const DECIMAL_SQFT = 435.6;
const ACRE_SQFT    = 43560;
const SQM_SQFT     = 10.7639;
const HECTARE_SQFT = 107639;

export const REGION_BIGHA_SQFT: Record<Exclude<Region, "custom">, number> = {
  bangladesh: 14400,
  westbengal: 14400,
  assam:      14400,
  nepal:      72900,
};

export const REGION_KATHA_SQFT: Record<Exclude<Region, "custom">, number> = {
  bangladesh: 720,
  westbengal: 720,
  assam:      720,
  nepal:      3645,
};

export const REGION_LABELS: Record<Region, string> = {
  bangladesh: "Bangladesh",
  westbengal: "West Bengal",
  assam:      "Assam",
  nepal:      "Nepal",
  custom:     "Custom",
};

export const UNIT_LABELS: Record<Unit, string> = {
  bigha:   "Bigha",
  katha:   "Katha",
  decimal: "Decimal",
  acre:    "Acre",
  sqft:    "Square Feet",
  sqm:     "Square Meter",
  hectare: "Hectare",
};

export const UNIT_SHORT: Record<Unit, string> = {
  bigha:   "Bigha",
  katha:   "Katha",
  decimal: "Decimal",
  acre:    "Acre",
  sqft:    "sq ft",
  sqm:     "sq m",
  hectare: "ha",
};

export const ALL_UNITS: Unit[] = ["bigha", "katha", "decimal", "acre", "sqft", "sqm", "hectare"];
export const ALL_REGIONS: Region[] = ["bangladesh", "westbengal", "assam", "nepal", "custom"];

function getTable(inputs: CalculatorInputs): Record<Unit, number> {
  let bigha: number;
  let katha: number;

  if (inputs.region === "custom") {
    bigha = parseFloat(inputs.customBigha) || 14400;
    katha = bigha / 20;
  } else {
    bigha = REGION_BIGHA_SQFT[inputs.region];
    katha = REGION_KATHA_SQFT[inputs.region];
  }

  return {
    bigha,
    katha,
    decimal: DECIMAL_SQFT,
    acre:    ACRE_SQFT,
    sqft:    1,
    sqm:     SQM_SQFT,
    hectare: HECTARE_SQFT,
  };
}

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
  const table = getTable(inputs);
  const sqft = val * table[inputs.fromUnit];

  return {
    squareFeet: sqft,
    bigha:   sqft / table.bigha,
    katha:   sqft / table.katha,
    decimal: sqft / table.decimal,
    acre:    sqft / table.acre,
    sqft:    sqft,
    sqm:     sqft / table.sqm,
    hectare: sqft / table.hectare,
  };
}

export function getBighaForRegion(inputs: CalculatorInputs): number {
  if (inputs.region === "custom") return parseFloat(inputs.customBigha) || 14400;
  return REGION_BIGHA_SQFT[inputs.region];
}

export function getKathaForRegion(inputs: CalculatorInputs): number {
  if (inputs.region === "custom") return getBighaForRegion(inputs) / 20;
  return REGION_KATHA_SQFT[inputs.region];
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "bigha-land-calculator-history";
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
    "Bigha Land Calculator – Result",
    "=".repeat(45),
    "",
    `Input   : ${formatNumber(parseFloat(inputs.value), p)} ${fromLabel}`,
    `Region  : ${region}`,
    "",
    "Converted Values:",
    `  Bigha        : ${formatNumber(result.bigha, p)}`,
    `  Katha        : ${formatNumber(result.katha, p)}`,
    `  Decimal      : ${formatNumber(result.decimal, p)}`,
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
