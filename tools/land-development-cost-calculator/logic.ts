import {
  AreaUnit,
  CalculationResult,
  CalculatorInputs,
  Currency,
} from "./types";

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

export const AREA_UNIT_LABELS: Record<AreaUnit, string> = {
  sqft: "Square Feet",
  sqm: "Square Meters",
  acre: "Acres",
  hectare: "Hectares",
};

export const AREA_UNIT_SHORT: Record<AreaUnit, string> = {
  sqft: "sq ft",
  sqm: "sq m",
  acre: "ac",
  hectare: "ha",
};

export const ALL_AREA_UNITS: AreaUnit[] = ["sqft", "sqm", "acre", "hectare"];

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

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: unknown[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) || n < 0 ? 0 : n;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const HISTORY_KEY = "land_dev_cost_history";
const SCENARIOS_KEY = "land_dev_cost_scenarios";

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
  } catch {}
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

export function saveScenario(label: string, inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const scenarios = getScenarios();
    scenarios.unshift({ id: Date.now().toString(), label, inputs, result });
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios.slice(0, 10)));
  } catch {}
}

export function getScenarios() {
  try {
    return JSON.parse(localStorage.getItem(SCENARIOS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function deleteScenario(id: string): void {
  try {
    const scenarios = getScenarios().filter((s: { id: string }) => s.id !== id);
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
  } catch {}
}

// ── Auto-save ─────────────────────────────────────────────────────────────────

const AUTOSAVE_KEY = "land_dev_cost_autosave";

export function autoSave(inputs: CalculatorInputs): void {
  try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadAutoSave(): CalculatorInputs | null {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const lines = [
    "Land Development Cost Calculator – Summary",
    "=".repeat(46),
    `Land Area:       ${inputs.landArea} ${AREA_UNIT_LABELS[inputs.areaUnit]}`,
    `Currency:        ${inputs.currency}`,
    "",
    "Cost Breakdown:",
    ...result.breakdown.map((b) =>
      `  ${b.label.padEnd(28)} ${sym}${b.value.toLocaleString("en-US")}`
    ),
    "",
    `Base Cost:       ${sym}${result.baseCost.toLocaleString("en-US")}`,
    `Contingency (${inputs.contingencyPct}%): ${sym}${result.contingencyAmount.toLocaleString("en-US")}`,
    `Tax (${inputs.taxPct}%):          ${sym}${result.taxAmount.toLocaleString("en-US")}`,
    `Total Cost:      ${sym}${result.totalCost.toLocaleString("en-US")}`,
    `Cost per ${AREA_UNIT_SHORT[inputs.areaUnit]}: ${sym}${fmtNum(result.costPerUnit)}`,
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

export function calculate(inputs: CalculatorInputs): CalculationResult {
  const landPurchase  = parseNum(inputs.landPurchase);
  const roadCost      = parseNum(inputs.roadCost);
  const sitePrep      = parseNum(inputs.sitePreparation);
  const drainage      = parseNum(inputs.drainage);
  const water         = parseNum(inputs.water);
  const electricity   = parseNum(inputs.electricity);
  const sewer         = parseNum(inputs.sewer);
  const permitFees    = parseNum(inputs.permitFees);
  const engineering   = parseNum(inputs.engineering);
  const labor         = parseNum(inputs.labor);
  const materials     = parseNum(inputs.materials);

  // Custom rows
  const customTotal = inputs.customRows.reduce((sum, row) => sum + parseNum(row.value), 0);

  const baseCost =
    landPurchase + roadCost + sitePrep + drainage + water +
    electricity + sewer + permitFees + engineering + labor + materials + customTotal;

  const contingencyAmount = baseCost * (inputs.contingencyPct / 100);
  const taxAmount = baseCost * (inputs.taxPct / 100);
  const totalCost = baseCost + contingencyAmount + taxAmount;

  const landArea = parseNum(inputs.landArea);
  const costPerUnit = landArea > 0 ? totalCost / landArea : 0;

  // Build breakdown (only non-zero items)
  const rawItems = [
    { label: "Land Purchase",       value: landPurchase },
    { label: "Road Construction",   value: roadCost },
    { label: "Site Preparation",    value: sitePrep },
    { label: "Drainage System",     value: drainage },
    { label: "Water Connection",    value: water },
    { label: "Electricity",         value: electricity },
    { label: "Sewer System",        value: sewer },
    { label: "Permits & Legal",     value: permitFees },
    { label: "Survey & Engineering",value: engineering },
    { label: "Labor",               value: labor },
    { label: "Materials",           value: materials },
    ...inputs.customRows
      .filter((r) => parseNum(r.value) > 0)
      .map((r) => ({ label: r.label || "Custom", value: parseNum(r.value) })),
    { label: `Contingency (${inputs.contingencyPct}%)`, value: contingencyAmount },
    { label: `Tax (${inputs.taxPct}%)`,                  value: taxAmount },
  ].filter((i) => i.value > 0);

  const breakdown = rawItems.map((i) => ({
    label: i.label,
    value: i.value,
    pct: totalCost > 0 ? (i.value / totalCost) * 100 : 0,
  }));

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const steps = [
    `Land Purchase: ${sym}${landPurchase.toLocaleString("en-US")}`,
    `Road Construction: ${sym}${roadCost.toLocaleString("en-US")}`,
    `Site Preparation: ${sym}${sitePrep.toLocaleString("en-US")}`,
    `Drainage: ${sym}${drainage.toLocaleString("en-US")}`,
    `Water: ${sym}${water.toLocaleString("en-US")}`,
    `Electricity: ${sym}${electricity.toLocaleString("en-US")}`,
    `Sewer: ${sym}${sewer.toLocaleString("en-US")}`,
    `Permits & Legal: ${sym}${permitFees.toLocaleString("en-US")}`,
    `Engineering: ${sym}${engineering.toLocaleString("en-US")}`,
    `Labor: ${sym}${labor.toLocaleString("en-US")}`,
    `Materials: ${sym}${materials.toLocaleString("en-US")}`,
    ...(customTotal > 0 ? [`Custom Costs: ${sym}${customTotal.toLocaleString("en-US")}`] : []),
    `Base Cost = ${sym}${baseCost.toLocaleString("en-US")}`,
    `Contingency (${inputs.contingencyPct}%) = ${sym}${contingencyAmount.toLocaleString("en-US")}`,
    `Tax (${inputs.taxPct}%) = ${sym}${taxAmount.toLocaleString("en-US")}`,
    `Total = Base + Contingency + Tax = ${sym}${totalCost.toLocaleString("en-US")}`,
    ...(landArea > 0
      ? [`Cost per ${AREA_UNIT_SHORT[inputs.areaUnit]} = ${sym}${fmtNum(costPerUnit)}`]
      : []),
  ];

  return {
    baseCost,
    contingencyAmount,
    taxAmount,
    totalCost,
    costPerUnit,
    areaUnit: inputs.areaUnit,
    currency: inputs.currency,
    breakdown,
    steps,
  };
}
