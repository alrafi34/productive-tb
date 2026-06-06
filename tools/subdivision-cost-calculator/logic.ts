import { CalculatorInputs, CalculationResult, Currency, LandUnit } from "./types";

// ── Constants ─────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD – US Dollar",
  EUR: "EUR – Euro",
  GBP: "GBP – British Pound",
  AUD: "AUD – Australian Dollar",
  CAD: "CAD – Canadian Dollar",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "AUD", "CAD"];

export const UNIT_LABELS: Record<LandUnit, string> = {
  acres: "Acres",
  sqft: "Square Feet",
  sqm: "Square Meters",
  hectares: "Hectares",
};

export const UNIT_SHORT: Record<LandUnit, string> = {
  acres: "ac",
  sqft: "sq ft",
  sqm: "sq m",
  hectares: "ha",
};

export const ALL_UNITS: LandUnit[] = ["acres", "sqft", "sqm", "hectares"];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function fmt(value: number, currency: Currency, decimals = 0): string {
  const sym = CURRENCY_SYMBOLS[currency];
  return `${sym}${value.toLocaleString("en-US", {
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

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "subdivision_cost_history";

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 20)));
  } catch {}
}

export function getHistory() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const lines = [
    "Subdivision Cost Calculator – Estimate",
    "=".repeat(44),
    `Land Size:       ${inputs.landSize} ${UNIT_LABELS[inputs.landUnit]}`,
    `Number of Plots: ${inputs.numPlots}`,
    "",
    "Cost Breakdown:",
    ...result.breakdown.map((b) => `  ${b.label.padEnd(24)} ${sym}${b.value.toLocaleString("en-US")}`),
    "",
    `Total Cost:      ${sym}${result.totalCost.toLocaleString("en-US")}`,
    `Cost Per Plot:   ${sym}${result.costPerPlot.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
    `Land Per Plot:   ${fmtNum(result.landPerPlot)} ${UNIT_SHORT[result.landUnit]}`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
  ];
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Core Calculation ──────────────────────────────────────────────────────────

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) || n < 0 ? 0 : n;
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const plots = parseFloat(inputs.numPlots);
  const landSize = parseFloat(inputs.landSize);

  if (!plots || plots <= 0) return null;

  const survey   = parseNum(inputs.surveyCost);
  const legal    = parseNum(inputs.legalFees);
  const permit   = parseNum(inputs.permitCost);
  const utility  = parseNum(inputs.utilityCost);
  const road     = parseNum(inputs.roadCost);
  const drainage = parseNum(inputs.drainageCost);
  const misc     = parseNum(inputs.miscCost);

  const totalCost = survey + legal + permit + utility + road + drainage + misc;
  const costPerPlot = totalCost / plots;
  const landPerPlot = landSize > 0 ? landSize / plots : 0;

  const items = [
    { label: "Surveying",          value: survey },
    { label: "Legal Fees",         value: legal },
    { label: "Permits & Approvals",value: permit },
    { label: "Utility Installation",value: utility },
    { label: "Road Development",   value: road },
    { label: "Drainage / Infrastructure", value: drainage },
    { label: "Miscellaneous",      value: misc },
  ].filter((i) => i.value > 0);

  const breakdown = items.map((i) => ({
    label: i.label,
    value: i.value,
    pct: totalCost > 0 ? (i.value / totalCost) * 100 : 0,
  }));

  const steps = [
    `Survey: $${survey.toLocaleString("en-US")}`,
    `Legal: $${legal.toLocaleString("en-US")}`,
    `Permits: $${permit.toLocaleString("en-US")}`,
    `Utilities: $${utility.toLocaleString("en-US")}`,
    `Road: $${road.toLocaleString("en-US")}`,
    `Drainage: $${drainage.toLocaleString("en-US")}`,
    `Misc: $${misc.toLocaleString("en-US")}`,
    `Total = ${survey} + ${legal} + ${permit} + ${utility} + ${road} + ${drainage} + ${misc} = ${totalCost}`,
    `Cost/Plot = ${totalCost} ÷ ${plots} = ${costPerPlot.toFixed(2)}`,
    ...(landSize > 0 ? [`Land/Plot = ${landSize} ÷ ${plots} = ${landPerPlot.toFixed(4)} ${UNIT_SHORT[inputs.landUnit]}`] : []),
  ];

  return {
    totalCost,
    costPerPlot,
    landPerPlot,
    landUnit: inputs.landUnit,
    currency: inputs.currency,
    breakdown,
    steps,
  };
}

export function validateInputs(inputs: CalculatorInputs): string | null {
  const plots = parseFloat(inputs.numPlots);
  if (!inputs.numPlots || isNaN(plots) || plots <= 0) {
    return "Plot count must be greater than 0";
  }
  return null;
}
