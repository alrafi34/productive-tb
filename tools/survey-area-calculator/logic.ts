import {
  CalculatorInputs,
  CalculationResult,
  HistoryEntry,
  OutputUnit,
  PolygonPoint,
  Unit,
} from "./types";

// ── Unit conversion: everything converts to sq ft first ──────────────────────

const TO_SQFT: Record<Unit, number> = {
  ft: 1,
  m: 10.7639,
  yd: 9,
  km: 10_763_910.4,
};

// ── Output unit labels ────────────────────────────────────────────────────────

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  sqft: "Square Feet (sq ft)",
  sqm: "Square Meters (sq m)",
  acres: "Acres",
  hectares: "Hectares",
  sqyd: "Square Yards (sq yd)",
  decimal: "Decimal",
  bigha: "Bigha",
  katha: "Katha",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  sqft: "sq ft",
  sqm: "sq m",
  acres: "acres",
  hectares: "ha",
  sqyd: "sq yd",
  decimal: "decimal",
  bigha: "bigha",
  katha: "katha",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = [
  "sqft",
  "sqm",
  "acres",
  "hectares",
  "sqyd",
  "decimal",
  "bigha",
  "katha",
];

export const INPUT_UNIT_LABELS: Record<Unit, string> = {
  ft: "Feet (ft)",
  m: "Meters (m)",
  yd: "Yards (yd)",
  km: "Kilometers (km)",
};

export const ALL_INPUT_UNITS: Unit[] = ["ft", "m", "yd", "km"];

// ── Conversion from sq ft to output unit ─────────────────────────────────────

function sqftToOutput(sqft: number, unit: OutputUnit): number {
  switch (unit) {
    case "sqft":      return sqft;
    case "sqm":       return sqft / 10.7639;
    case "acres":     return sqft / 43_560;
    case "hectares":  return sqft / 107_639;
    case "sqyd":      return sqft / 9;
    case "decimal":   return sqft / 435.6;   // 1 decimal = 435.6 sq ft (Bangladesh/India)
    case "bigha":     return sqft / 14_400;  // 1 bigha ≈ 14,400 sq ft (common standard)
    case "katha":     return sqft / 720;     // 1 katha = 720 sq ft
    default:          return sqft;
  }
}

// ── Polygon area via Shoelace formula ─────────────────────────────────────────

export function parsePolygonCoords(raw: string): PolygonPoint[] | null {
  const lines = raw
    .trim()
    .split(/[\n,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Expect pairs: "x y" or "x,y"
  const pairs: PolygonPoint[] = [];
  for (let i = 0; i < lines.length - 1; i += 2) {
    const x = parseFloat(lines[i]);
    const y = parseFloat(lines[i + 1]);
    if (isNaN(x) || isNaN(y)) return null;
    pairs.push({ x: String(x), y: String(y) });
  }
  return pairs.length >= 3 ? pairs : null;
}

function shoelaceArea(points: PolygonPoint[]): number {
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += parseFloat(points[i].x) * parseFloat(points[j].y);
    area -= parseFloat(points[j].x) * parseFloat(points[i].y);
  }
  return Math.abs(area / 2);
}

// ── Main calculate function ───────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const toSqFt = TO_SQFT[inputs.unit];
  let rawArea = 0; // area in input unit²
  let formula = "";

  if (inputs.mode === "rectangle") {
    const l = parseFloat(inputs.rectangle.length);
    const w = parseFloat(inputs.rectangle.width);
    if (!l || !w || l <= 0 || w <= 0) return null;
    rawArea = l * w;
    formula = `${l} × ${w} = ${rawArea.toLocaleString("en-US")} ${inputs.unit}²`;
  } else if (inputs.mode === "triangle") {
    const a = parseFloat(inputs.triangle.sideA);
    const b = parseFloat(inputs.triangle.sideB);
    const c = parseFloat(inputs.triangle.sideC);
    if (!a || !b || !c || a <= 0 || b <= 0 || c <= 0) return null;
    // Triangle inequality
    if (a + b <= c || a + c <= b || b + c <= a) return null;
    const s = (a + b + c) / 2;
    rawArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    if (isNaN(rawArea) || rawArea <= 0) return null;
    formula = `Heron's: s=${s.toFixed(2)}, Area=√(s(s-a)(s-b)(s-c))`;
  } else if (inputs.mode === "polygon") {
    const points = parsePolygonCoords(inputs.polygonCoords);
    if (!points) return null;
    rawArea = shoelaceArea(points);
    if (rawArea <= 0) return null;
    formula = `Shoelace formula, ${points.length} vertices`;
  }

  // Convert raw area (in input unit²) to sq ft
  const areaSqFt = rawArea * toSqFt;

  // Build all conversions
  const sqft      = areaSqFt;
  const sqm       = sqftToOutput(areaSqFt, "sqm");
  const acres     = sqftToOutput(areaSqFt, "acres");
  const hectares  = sqftToOutput(areaSqFt, "hectares");
  const sqyd      = sqftToOutput(areaSqFt, "sqyd");
  const decimal   = sqftToOutput(areaSqFt, "decimal");
  const bigha     = sqftToOutput(areaSqFt, "bigha");
  const katha     = sqftToOutput(areaSqFt, "katha");

  const areaInUnit = sqftToOutput(areaSqFt, inputs.outputUnit);

  return {
    areaSqFt,
    areaInUnit,
    outputUnit: inputs.outputUnit,
    formula,
    inputUnit: inputs.unit,
    mode: inputs.mode,
    sqft,
    sqm,
    acres,
    hectares,
    sqyd,
    decimal,
    bigha,
    katha,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function formatNumber(value: number, decimals = 2): string {
  if (value >= 1_000_000) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function smartFormat(value: number): string {
  if (value === 0) return "0";
  if (value < 0.001) return value.toExponential(3);
  if (value < 1) return value.toFixed(4);
  if (value < 10) return value.toFixed(3);
  if (value < 1000) return value.toFixed(2);
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const HISTORY_KEY = "survey-area-calculator-history";
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
  const modeLabel = inputs.mode === "rectangle"
    ? "Rectangle Plot"
    : inputs.mode === "triangle"
    ? "Triangle Plot"
    : "Polygon Plot";

  return [
    "Survey Area Calculator – Result",
    "=".repeat(45),
    "",
    `Plot Type        : ${modeLabel}`,
    `Input Unit       : ${inputs.unit}`,
    "",
    inputs.mode === "rectangle"
      ? `Length           : ${inputs.rectangle.length} ${inputs.unit}\nWidth            : ${inputs.rectangle.width} ${inputs.unit}`
      : inputs.mode === "triangle"
      ? `Side A           : ${inputs.triangle.sideA} ${inputs.unit}\nSide B           : ${inputs.triangle.sideB} ${inputs.unit}\nSide C           : ${inputs.triangle.sideC} ${inputs.unit}`
      : `Coordinates      : ${inputs.polygonCoords.trim()}`,
    "",
    `Formula          : ${result.formula}`,
    "",
    "── Area Conversions ──",
    `Square Feet      : ${smartFormat(result.sqft)} sq ft`,
    `Square Meters    : ${smartFormat(result.sqm)} sq m`,
    `Acres            : ${smartFormat(result.acres)} acres`,
    `Hectares         : ${smartFormat(result.hectares)} ha`,
    `Square Yards     : ${smartFormat(result.sqyd)} sq yd`,
    `Decimal          : ${smartFormat(result.decimal)} decimal`,
    `Bigha            : ${smartFormat(result.bigha)} bigha`,
    `Katha            : ${smartFormat(result.katha)} katha`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ]
    .flat()
    .filter((l) => l !== undefined)
    .join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
