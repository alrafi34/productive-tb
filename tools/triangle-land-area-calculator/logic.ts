import {
  CalculatorInputs,
  CalculationResult,
  HistoryEntry,
  InputUnit,
  OutputUnit,
} from "./types";

// ── Unit labels ───────────────────────────────────────────────────────────────

export const INPUT_UNIT_LABELS: Record<InputUnit, string> = {
  ft: "Feet (ft)",
  m:  "Meters (m)",
  yd: "Yards (yd)",
  in: "Inches (in)",
  cm: "Centimeters (cm)",
};

export const INPUT_UNIT_SHORT: Record<InputUnit, string> = {
  ft: "ft", m: "m", yd: "yd", in: "in", cm: "cm",
};

export const ALL_INPUT_UNITS: InputUnit[] = ["ft", "m", "yd", "in", "cm"];

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  sqft:     "Square Feet (ft²)",
  sqm:      "Square Meters (m²)",
  acres:    "Acres",
  hectares: "Hectares",
  sqyd:     "Square Yards (yd²)",
  sqin:     "Square Inches (in²)",
  sqcm:     "Square Centimeters (cm²)",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  sqft:     "ft²",
  sqm:      "m²",
  acres:    "acres",
  hectares: "ha",
  sqyd:     "yd²",
  sqin:     "in²",
  sqcm:     "cm²",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = [
  "sqft", "sqm", "acres", "hectares", "sqyd", "sqin", "sqcm",
];

// ── Conversion: input unit → sq ft ───────────────────────────────────────────

const UNIT_TO_FT: Record<InputUnit, number> = {
  ft: 1,
  m:  3.28084,
  yd: 3,
  in: 1 / 12,
  cm: 1 / 30.48,
};

// ── Conversion: sq ft → output unit ──────────────────────────────────────────

function sqftToOutput(sqft: number, unit: OutputUnit): number {
  switch (unit) {
    case "sqft":     return sqft;
    case "sqm":      return sqft / 10.7639;
    case "acres":    return sqft / 43_560;
    case "hectares": return sqft / 107_639;
    case "sqyd":     return sqft / 9;
    case "sqin":     return sqft * 144;
    case "sqcm":     return sqft * 929.0304;
    default:         return sqft;
  }
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const ftFactor = UNIT_TO_FT[inputs.unit];
  const u = INPUT_UNIT_SHORT[inputs.unit];
  let rawAreaInUnit = 0; // area in input unit²
  const steps: string[] = [];
  let formula = "";
  let perimeter: number | undefined;
  let semiPerimeter: number | undefined;

  if (inputs.method === "base-height") {
    const base   = parseFloat(inputs.baseHeight.base);
    const height = parseFloat(inputs.baseHeight.height);
    if (!base || !height || base <= 0 || height <= 0) return null;
    rawAreaInUnit = (base * height) / 2;
    formula = "Area = (Base × Height) ÷ 2";
    steps.push(`Base = ${base} ${u}`);
    steps.push(`Height = ${height} ${u}`);
    steps.push(`Area = (${base} × ${height}) ÷ 2`);
    steps.push(`Area = ${base * height} ÷ 2`);
    steps.push(`Area = ${rawAreaInUnit.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${u}²`);

  } else if (inputs.method === "three-sides") {
    const a = parseFloat(inputs.threeSides.sideA);
    const b = parseFloat(inputs.threeSides.sideB);
    const c = parseFloat(inputs.threeSides.sideC);
    if (!a || !b || !c || a <= 0 || b <= 0 || c <= 0) return null;
    if (a + b <= c || a + c <= b || b + c <= a) return null;
    const s = (a + b + c) / 2;
    const areaSquared = s * (s - a) * (s - b) * (s - c);
    if (areaSquared <= 0) return null;
    rawAreaInUnit = Math.sqrt(areaSquared);
    semiPerimeter = s;
    perimeter = a + b + c;
    formula = "Heron's Formula: Area = √(s(s-a)(s-b)(s-c))";
    steps.push(`a = ${a} ${u}, b = ${b} ${u}, c = ${c} ${u}`);
    steps.push(`s = (${a} + ${b} + ${c}) ÷ 2 = ${s.toFixed(4)} ${u}`);
    steps.push(`s−a = ${(s - a).toFixed(4)}, s−b = ${(s - b).toFixed(4)}, s−c = ${(s - c).toFixed(4)}`);
    steps.push(`Area = √(${s.toFixed(4)} × ${(s-a).toFixed(4)} × ${(s-b).toFixed(4)} × ${(s-c).toFixed(4)})`);
    steps.push(`Area = √${areaSquared.toFixed(4)} = ${rawAreaInUnit.toFixed(4)} ${u}²`);

  } else if (inputs.method === "coordinates") {
    const x1 = parseFloat(inputs.coords.x1), y1 = parseFloat(inputs.coords.y1);
    const x2 = parseFloat(inputs.coords.x2), y2 = parseFloat(inputs.coords.y2);
    const x3 = parseFloat(inputs.coords.x3), y3 = parseFloat(inputs.coords.y3);
    if ([x1,y1,x2,y2,x3,y3].some(isNaN)) return null;
    rawAreaInUnit = Math.abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) / 2);
    if (rawAreaInUnit <= 0) return null;
    formula = "Area = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|";
    steps.push(`A = (${x1}, ${y1}), B = (${x2}, ${y2}), C = (${x3}, ${y3})`);
    steps.push(`= ½|${x1}(${y2}−${y3}) + ${x2}(${y3}−${y1}) + ${x3}(${y1}−${y2})|`);
    steps.push(`= ½|${(x1*(y2-y3)).toFixed(4)} + ${(x2*(y3-y1)).toFixed(4)} + ${(x3*(y1-y2)).toFixed(4)}|`);
    steps.push(`Area = ${rawAreaInUnit.toFixed(4)} ${u}²`);
  }

  if (rawAreaInUnit <= 0 || isNaN(rawAreaInUnit)) return null;

  // Convert to sq ft
  const areaSqFt = rawAreaInUnit * ftFactor * ftFactor;

  return {
    areaSqFt,
    areaInUnit: sqftToOutput(areaSqFt, inputs.outputUnit),
    outputUnit: inputs.outputUnit,
    formula,
    steps,
    method: inputs.method,
    inputUnit: inputs.unit,
    sqft:     areaSqFt,
    sqm:      sqftToOutput(areaSqFt, "sqm"),
    acres:    sqftToOutput(areaSqFt, "acres"),
    hectares: sqftToOutput(areaSqFt, "hectares"),
    sqyd:     sqftToOutput(areaSqFt, "sqyd"),
    sqin:     sqftToOutput(areaSqFt, "sqin"),
    sqcm:     sqftToOutput(areaSqFt, "sqcm"),
    perimeter: perimeter !== undefined ? perimeter * ftFactor : undefined,
    semiPerimeter: semiPerimeter !== undefined ? semiPerimeter * ftFactor : undefined,
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

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const HISTORY_KEY = "triangle-land-area-calculator-history";
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
  if (typeof window === 'undefined') return [];
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
  const methodLabel =
    inputs.method === "base-height"  ? "Base × Height" :
    inputs.method === "three-sides"  ? "Three Sides (Heron's Formula)" :
    "Coordinates";

  return [
    "Triangle Land Area Calculator – Result",
    "=".repeat(45),
    "",
    `Method           : ${methodLabel}`,
    `Input Unit       : ${inputs.unit}`,
    `Formula          : ${result.formula}`,
    "",
    "── Steps ──",
    ...result.steps,
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
