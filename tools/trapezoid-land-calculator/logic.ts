import { CalculatorInputs, CalculationResult, HistoryEntry, InputUnit, OutputUnit } from "./types";

// ── Unit labels ───────────────────────────────────────────────────────────────

export const INPUT_UNIT_LABELS: Record<InputUnit, string> = {
  ft: "Feet (ft)",
  m:  "Meters (m)",
  yd: "Yards (yd)",
  in: "Inches (in)",
};

export const INPUT_UNIT_SHORT: Record<InputUnit, string> = {
  ft: "ft", m: "m", yd: "yd", in: "in",
};

export const ALL_INPUT_UNITS: InputUnit[] = ["ft", "m", "yd", "in"];

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  sqft:     "Square Feet (ft²)",
  sqm:      "Square Meters (m²)",
  acres:    "Acres",
  hectares: "Hectares",
  sqyd:     "Square Yards (yd²)",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  sqft:     "ft²",
  sqm:      "m²",
  acres:    "acres",
  hectares: "ha",
  sqyd:     "yd²",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = ["sqft", "sqm", "acres", "hectares", "sqyd"];

// ── Conversion: input unit → feet (linear) ───────────────────────────────────

const UNIT_TO_FT: Record<InputUnit, number> = {
  ft: 1,
  m:  3.28084,
  yd: 3,
  in: 1 / 12,
};

// ── Conversion: sq ft → output unit ──────────────────────────────────────────

function sqftToOutput(sqft: number, unit: OutputUnit): number {
  switch (unit) {
    case "sqft":     return sqft;
    case "sqm":      return sqft / 10.7639;
    case "acres":    return sqft / 43_560;
    case "hectares": return sqft / 107_639;
    case "sqyd":     return sqft / 9;
    default:         return sqft;
  }
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const a = parseFloat(inputs.topBase);
  const b = parseFloat(inputs.bottomBase);
  const h = parseFloat(inputs.height);

  if (!a || !b || !h || a <= 0 || b <= 0 || h <= 0) return null;
  if (isNaN(a) || isNaN(b) || isNaN(h)) return null;

  const u = INPUT_UNIT_SHORT[inputs.unit];
  const rawArea = ((a + b) / 2) * h;
  const ftFactor = UNIT_TO_FT[inputs.unit];
  const areaSqFt = rawArea * ftFactor * ftFactor;

  const steps = [
    `Top base (a) = ${a} ${u}`,
    `Bottom base (b) = ${b} ${u}`,
    `Height (h) = ${h} ${u}`,
    `Sum of bases = ${a} + ${b} = ${a + b} ${u}`,
    `Average of bases = (${a + b}) ÷ 2 = ${((a + b) / 2).toFixed(4)} ${u}`,
    `Area = ${((a + b) / 2).toFixed(4)} × ${h} = ${rawArea.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${u}²`,
  ];

  const sqft     = areaSqFt;
  const sqm      = sqftToOutput(areaSqFt, "sqm");
  const acres    = sqftToOutput(areaSqFt, "acres");
  const hectares = sqftToOutput(areaSqFt, "hectares");
  const sqyd     = sqftToOutput(areaSqFt, "sqyd");

  return {
    topBase: a,
    bottomBase: b,
    height: h,
    rawArea,
    areaSqFt,
    areaInUnit: sqftToOutput(areaSqFt, inputs.outputUnit),
    outputUnit: inputs.outputUnit,
    inputUnit: inputs.unit,
    formula: `((${a} + ${b}) ÷ 2) × ${h} = ${rawArea.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${u}²`,
    steps,
    sqft,
    sqm,
    acres,
    hectares,
    sqyd,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function smartFormat(value: number): string {
  if (value === 0) return "0";
  if (value < 0.0001) return value.toExponential(3);
  if (value < 0.01)   return value.toFixed(6);
  if (value < 1)      return value.toFixed(4);
  if (value < 10)     return value.toFixed(3);
  if (value < 10000)  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
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

const HISTORY_KEY = "trapezoid-land-calculator-history";
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

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const u = INPUT_UNIT_SHORT[inputs.unit];
  return [
    "Trapezoid Land Calculator – Result",
    "=".repeat(45),
    "",
    `Top Base (a)     : ${result.topBase} ${u}`,
    `Bottom Base (b)  : ${result.bottomBase} ${u}`,
    `Height (h)       : ${result.height} ${u}`,
    `Formula          : ((a + b) ÷ 2) × h`,
    `                 : ${result.formula}`,
    "",
    "── Area Conversions ──",
    `Square Feet      : ${smartFormat(result.sqft)} ft²`,
    `Square Meters    : ${smartFormat(result.sqm)} m²`,
    `Acres            : ${smartFormat(result.acres)} acres`,
    `Hectares         : ${smartFormat(result.hectares)} ha`,
    `Square Yards     : ${smartFormat(result.sqyd)} yd²`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
