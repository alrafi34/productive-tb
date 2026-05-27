import { CalculationResult, HistoryEntry, OutputUnit, Point } from "./types";

// ── Output unit metadata ──────────────────────────────────────────────────────

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  sqft: "Square Feet (ft²)",
  sqm: "Square Meters (m²)",
  acres: "Acres",
  hectares: "Hectares",
  sqkm: "Square Kilometers (km²)",
  sqmi: "Square Miles (mi²)",
  sqyd: "Square Yards (yd²)",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  sqft: "ft²",
  sqm: "m²",
  acres: "acres",
  hectares: "ha",
  sqkm: "km²",
  sqmi: "mi²",
  sqyd: "yd²",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = [
  "sqft",
  "sqm",
  "acres",
  "hectares",
  "sqkm",
  "sqmi",
  "sqyd",
];

// ── Shoelace formula ──────────────────────────────────────────────────────────

export function shoelaceArea(points: Point[]): number {
  if (points.length < 3) return 0;
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  return Math.abs(area / 2);
}

// ── Perimeter ─────────────────────────────────────────────────────────────────

export function calcPerimeter(points: Point[]): number {
  if (points.length < 2) return 0;
  let p = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const dx = points[j].x - points[i].x;
    const dy = points[j].y - points[i].y;
    p += Math.sqrt(dx * dx + dy * dy);
  }
  return p;
}

// ── Unit conversion from sq meters ───────────────────────────────────────────

function sqmToUnit(sqm: number, unit: OutputUnit): number {
  switch (unit) {
    case "sqm":      return sqm;
    case "sqft":     return sqm * 10.7639;
    case "acres":    return sqm / 4046.86;
    case "hectares": return sqm / 10000;
    case "sqkm":     return sqm / 1_000_000;
    case "sqmi":     return sqm / 2_589_988.11;
    case "sqyd":     return sqm * 1.19599;
    default:         return sqm;
  }
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(
  points: Point[],
  scale: number,        // 1 canvas unit = scale meters
  outputUnit: OutputUnit
): CalculationResult | null {
  if (points.length < 3) return null;

  const rawArea = shoelaceArea(points);          // canvas units²
  const scaledAreaSqm = rawArea * scale * scale; // real-world sq meters
  const perimeter = calcPerimeter(points);
  const scaledPerimeter = perimeter * scale;

  const sqm       = scaledAreaSqm;
  const sqft      = sqmToUnit(sqm, "sqft");
  const acres     = sqmToUnit(sqm, "acres");
  const hectares  = sqmToUnit(sqm, "hectares");
  const sqkm      = sqmToUnit(sqm, "sqkm");
  const sqmi      = sqmToUnit(sqm, "sqmi");
  const sqyd      = sqmToUnit(sqm, "sqyd");

  const areaInUnit = sqmToUnit(sqm, outputUnit);

  return {
    rawArea,
    scaledArea: scaledAreaSqm,
    areaInUnit,
    outputUnit,
    perimeter,
    scaledPerimeter,
    vertexCount: points.length,
    sqft,
    sqm,
    acres,
    hectares,
    sqkm,
    sqmi,
    sqyd,
  };
}

// ── Coordinate parsing ────────────────────────────────────────────────────────

export function parseCoordinates(raw: string): Point[] | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Try line-by-line "x,y" or "x y"
  const lines = trimmed.split(/\n/);
  const points: Point[] = [];

  for (const line of lines) {
    const clean = line.trim();
    if (!clean) continue;
    // Accept "x,y" or "x y" or "x, y"
    const parts = clean.split(/[\s,]+/).filter(Boolean);
    if (parts.length < 2) return null;
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (isNaN(x) || isNaN(y)) return null;
    points.push({ x, y });
  }

  return points.length >= 3 ? points : null;
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

const HISTORY_KEY = "polygon-area-calculator-history";
const AUTOSAVE_KEY = "polygon-area-calculator-autosave";
const MAX_HISTORY = 10;

export function saveToHistory(
  points: Point[],
  scale: number,
  scaleUnit: string,
  outputUnit: OutputUnit,
  result: CalculationResult
): void {
  try {
    const h = getHistory();
    h.unshift({
      id: Date.now().toString(),
      timestamp: Date.now(),
      points,
      scale,
      scaleUnit,
      outputUnit,
      result,
    });
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

export function autosave(points: Point[]): void {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(points));
  } catch { /* ignore */ }
}

export function loadAutosave(): Point[] | null {
  try {
    const s = localStorage.getItem(AUTOSAVE_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(
  points: Point[],
  scale: number,
  scaleUnit: string,
  result: CalculationResult
): string {
  const coordLines = points
    .map((p, i) => `  P${i + 1}: (${p.x.toFixed(2)}, ${p.y.toFixed(2)})`)
    .join("\n");

  return [
    "Polygon Area Calculator – Result",
    "=".repeat(45),
    "",
    `Vertices         : ${result.vertexCount}`,
    `Scale            : 1 unit = ${scale} ${scaleUnit}`,
    "",
    "Coordinates:",
    coordLines,
    "",
    "── Area Results ──",
    `Square Feet      : ${smartFormat(result.sqft)} ft²`,
    `Square Meters    : ${smartFormat(result.sqm)} m²`,
    `Acres            : ${smartFormat(result.acres)} acres`,
    `Hectares         : ${smartFormat(result.hectares)} ha`,
    `Square Yards     : ${smartFormat(result.sqyd)} yd²`,
    `Square Km        : ${smartFormat(result.sqkm)} km²`,
    `Square Miles     : ${smartFormat(result.sqmi)} mi²`,
    "",
    `Perimeter        : ${smartFormat(result.scaledPerimeter)} ${scaleUnit}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function exportToJSON(points: Point[], result: CalculationResult): string {
  return JSON.stringify(
    {
      points: points.map((p) => ({ x: p.x, y: p.y })),
      area: {
        sqft: result.sqft,
        sqm: result.sqm,
        acres: result.acres,
        hectares: result.hectares,
      },
      perimeter: result.scaledPerimeter,
      vertexCount: result.vertexCount,
    },
    null,
    2
  );
}

export function exportToCSV(points: Point[]): string {
  const header = "vertex,x,y";
  const rows = points.map((p, i) => `P${i + 1},${p.x},${p.y}`);
  return [header, ...rows].join("\n");
}

export function downloadFile(content: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
