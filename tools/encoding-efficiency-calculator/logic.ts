// ── Encoding Efficiency Calculator Logic ──

export type SizeUnit = "Bytes" | "KB" | "MB" | "GB" | "TB" | "Bits";

export const UNITS: SizeUnit[] = ["Bytes", "KB", "MB", "GB", "TB", "Bits"];

const UNIT_TO_BYTES: Record<SizeUnit, number> = {
  Bytes: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  Bits: 1 / 8,
};

export function toBytes(value: number, unit: SizeUnit): number {
  return value * UNIT_TO_BYTES[unit];
}

export type EncodingType =
  | "Base64" | "Base32" | "Hexadecimal" | "Binary" | "URL Encoding"
  | "Percent Encoding" | "UTF-8" | "UTF-16" | "UTF-32" | "ASCII" | "Custom";

export const ENCODING_TYPES: EncodingType[] = [
  "Base64", "Base32", "Hexadecimal", "Binary", "URL Encoding",
  "Percent Encoding", "UTF-8", "UTF-16", "UTF-32", "ASCII", "Custom",
];

export const ENCODING_REFERENCE: { type: EncodingType; typical: string }[] = [
  { type: "Base64", typical: "~33% overhead (4 chars per 3 bytes)" },
  { type: "Base32", typical: "~60% overhead (8 chars per 5 bytes)" },
  { type: "Hexadecimal", typical: "100% overhead (2 chars per byte)" },
  { type: "Binary", typical: "~700% overhead (8 chars per byte)" },
  { type: "URL Encoding", typical: "Varies — 0% to 200%+ depending on content" },
  { type: "Percent Encoding", typical: "Varies — 0% to 200%+ depending on content" },
  { type: "UTF-8", typical: "0% for ASCII text, up to 300% for some Unicode" },
  { type: "UTF-16", typical: "~100% vs UTF-8 ASCII (2 bytes per character)" },
  { type: "UTF-32", typical: "~300% vs UTF-8 ASCII (4 bytes per character)" },
  { type: "ASCII", typical: "0% baseline (1 byte per character)" },
  { type: "Custom", typical: "Depends on implementation" },
];

export type EncodingStatus = "expanded" | "no-change" | "reduced";

export interface EfficiencyTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const EFFICIENCY_TIERS: EfficiencyTier[] = [
  { label: "Highly Efficient", min: 90, max: Infinity, color: "#058554" },
  { label: "Efficient", min: 75, max: 90, color: "#058554" },
  { label: "Moderately Efficient", min: 60, max: 75, color: "#2563EB" },
  { label: "Low Efficiency", min: 40, max: 60, color: "#D97706" },
  { label: "Poor Efficiency", min: 0, max: 40, color: "#DC2626" },
];

export function classifyEfficiency(efficiency: number): EfficiencyTier {
  const capped = Math.min(efficiency, 999);
  return EFFICIENCY_TIERS.find((t) => capped >= t.min && capped < t.max) ?? EFFICIENCY_TIERS[0];
}

export interface EncodingResult {
  originalSize: number;
  encodedSize: number;
  unit: SizeUnit;
  encodingType: EncodingType;
  overhead: number | null; // %
  expansionRatio: number | null; // encoded / original
  compressionRatio: number | null; // original / encoded
  efficiency: number | null; // %
  additionalStorage: number | null; // encoded - original
  status: EncodingStatus | null;
  rating: EfficiencyTier | null;
  error: string | null;
}

export function calculateEncoding(
  originalSize: number,
  encodedSize: number,
  unit: SizeUnit,
  encodingType: EncodingType
): EncodingResult {
  const base: EncodingResult = {
    originalSize, encodedSize, unit, encodingType,
    overhead: null, expansionRatio: null, compressionRatio: null,
    efficiency: null, additionalStorage: null, status: null, rating: null, error: null,
  };

  if (!Number.isFinite(originalSize) || !Number.isFinite(encodedSize)) {
    return { ...base, error: "Enter valid numbers for both data sizes." };
  }
  if (originalSize <= 0) {
    return { ...base, error: "Original size must be greater than zero." };
  }
  if (encodedSize < 0) {
    return { ...base, error: "Encoded size cannot be negative." };
  }
  if (encodedSize === 0) {
    return { ...base, error: "Encoded size cannot be zero — efficiency is undefined." };
  }

  const overhead = ((encodedSize - originalSize) / originalSize) * 100;
  const expansionRatio = encodedSize / originalSize;
  const compressionRatio = originalSize / encodedSize;
  const efficiency = (originalSize / encodedSize) * 100;
  const additionalStorage = encodedSize - originalSize;

  let status: EncodingStatus;
  if (encodedSize > originalSize) status = "expanded";
  else if (encodedSize < originalSize) status = "reduced";
  else status = "no-change";

  const rating = classifyEfficiency(efficiency);

  return {
    originalSize, encodedSize, unit, encodingType,
    overhead, expansionRatio, compressionRatio, efficiency, additionalStorage,
    status, rating, error: null,
  };
}

export function getRecommendation(result: EncodingResult): string {
  if (result.error || result.overhead === null) return "";
  const o = result.overhead;
  if (o < 0) return "Encoding actually reduced data size — unusual, but valid for this input.";
  if (o === 0) return "No size change — the encoded output is identical in size to the original.";
  if (o < 5) return "Excellent encoding efficiency.";
  if (o >= 30 && o <= 40) return "Typical Base64 encoding overhead.";
  if (o > 100) return "Very high encoding expansion.";
  return `${result.rating?.label ?? "Moderate"} — encoding adds ${formatNum(o, 2)}% overhead.`;
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// Smart unit formatting — express a size (already in `unit`) in the most readable unit.
export function smartFormat(value: number, unit: SizeUnit, precision: number): string {
  const bytes = toBytes(Math.abs(value), unit);
  const sign = value < 0 ? "-" : "";
  if (bytes === 0) return `0 ${unit}`;
  const byteUnits: SizeUnit[] = ["Bytes", "KB", "MB", "GB", "TB"];
  const idx = Math.min(byteUnits.length - 1, Math.max(0, Math.floor(Math.log(bytes) / Math.log(1024))));
  const displayUnit = byteUnits[idx];
  const displayValue = bytes / UNIT_TO_BYTES[displayUnit];
  return `${sign}${displayValue.toFixed(precision)} ${displayUnit}`;
}

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5];
export const DEFAULT_PRECISION = 2;
export const DEFAULT_ORIGINAL = 1024;
export const DEFAULT_ENCODED = 1368;
export const DEFAULT_UNIT: SizeUnit = "Bytes";
export const DEFAULT_ENCODING_TYPE: EncodingType = "Base64";

export const PRESETS: { label: string; original: number; encoded: number; unit: SizeUnit; encodingType: EncodingType }[] = [
  { label: "Base64 Typical", original: 1024, encoded: 1368, unit: "Bytes", encodingType: "Base64" },
  { label: "Hex Encoding", original: 500, encoded: 1000, unit: "Bytes", encodingType: "Hexadecimal" },
  { label: "Base32 Encoding", original: 500, encoded: 800, unit: "Bytes", encodingType: "Base32" },
  { label: "URL Encoded Text", original: 2000, encoded: 2400, unit: "Bytes", encodingType: "URL Encoding" },
];

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(original: number, encoded: number, unit: SizeUnit, encodingType: EncodingType, precision: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("orig", String(original));
  url.searchParams.set("enc", String(encoded));
  url.searchParams.set("unit", unit);
  url.searchParams.set("type", encodingType);
  url.searchParams.set("precision", String(precision));
  return url.toString();
}

export interface ShareParams {
  original: number;
  encoded: number;
  unit: SizeUnit;
  encodingType: EncodingType;
  precision: number;
}

export function parseShareParams(): ShareParams | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const orig = p.get("orig");
  const enc = p.get("enc");
  if (orig === null || enc === null) return null;
  const unitParam = p.get("unit");
  const typeParam = p.get("type");
  return {
    original: parseFloat(orig),
    encoded: parseFloat(enc),
    unit: (UNITS as string[]).includes(unitParam ?? "") ? (unitParam as SizeUnit) : DEFAULT_UNIT,
    encodingType: (ENCODING_TYPES as string[]).includes(typeParam ?? "") ? (typeParam as EncodingType) : DEFAULT_ENCODING_TYPE,
    precision: parseInt(p.get("precision") ?? "2", 10) || 2,
  };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: EncodingResult;
}

const STORAGE_KEY = "encoding-efficiency-calculator-history";

export function saveHistory(result: EncodingResult): void {
  if (result.error) return;
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), result };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

function statusLabel(result: EncodingResult): string {
  return result.status === "expanded" ? "Expanded" : result.status === "reduced" ? "Reduced" : "No Change";
}

export function buildTextReport(result: EncodingResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Encoding Efficiency Report",
    "===========================",
    `Generated: ${ts}`,
    "",
    `Encoding Type: ${result.encodingType}`,
    `Original Size: ${formatNum(result.originalSize, precision)} ${result.unit}`,
    `Encoded Size: ${formatNum(result.encodedSize, precision)} ${result.unit}`,
    `Encoding Overhead: ${formatNum(result.overhead, precision)}%`,
    `Expansion Ratio: ${formatNum(result.expansionRatio, precision)}×`,
    `Compression Ratio: ${formatNum(result.compressionRatio, precision)}×`,
    `Encoding Efficiency: ${formatNum(result.efficiency, precision)}%`,
    `Additional Storage: ${formatNum(result.additionalStorage, precision)} ${result.unit}`,
    `Status: ${statusLabel(result)}`,
    ...(result.rating ? [`Performance Rating: ${result.rating.label}`] : []),
    "",
    "Formula: Overhead % = ((Encoded − Original) ÷ Original) × 100",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: EncodingResult, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Encoding Type", result.encodingType],
    ["Original Size", `${formatNum(result.originalSize, precision)} ${result.unit}`],
    ["Encoded Size", `${formatNum(result.encodedSize, precision)} ${result.unit}`],
    ["Encoding Overhead (%)", formatNum(result.overhead, precision)],
    ["Expansion Ratio", formatNum(result.expansionRatio, precision)],
    ["Compression Ratio", formatNum(result.compressionRatio, precision)],
    ["Encoding Efficiency (%)", formatNum(result.efficiency, precision)],
    ["Additional Storage", `${formatNum(result.additionalStorage, precision)} ${result.unit}`],
    ["Status", statusLabel(result)],
    ["Performance Rating", result.rating?.label ?? ""],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: EncodingResult): string {
  return JSON.stringify(
    {
      encodingType: result.encodingType,
      originalSize: result.originalSize,
      encodedSize: result.encodedSize,
      unit: result.unit,
      overhead: result.overhead,
      expansionRatio: result.expansionRatio,
      compressionRatio: result.compressionRatio,
      efficiency: result.efficiency,
      additionalStorage: result.additionalStorage,
      status: result.status,
      rating: result.rating?.label ?? null,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: EncodingResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Encoding Efficiency Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Encoding Efficiency Report</h1>
    <p class="meta">Generated ${ts} · ${result.encodingType}</p>
    <table>
      <tr><td>Encoding Overhead</td><td><strong>${formatNum(result.overhead, precision)}%</strong></td></tr>
      <tr><td>Expansion Ratio</td><td>${formatNum(result.expansionRatio, precision)}×</td></tr>
      <tr><td>Compression Ratio</td><td>${formatNum(result.compressionRatio, precision)}×</td></tr>
      <tr><td>Encoding Efficiency</td><td>${formatNum(result.efficiency, precision)}%</td></tr>
      <tr><td>Additional Storage</td><td>${formatNum(result.additionalStorage, precision)} ${result.unit}</td></tr>
      <tr><td>Status</td><td>${statusLabel(result)}</td></tr>
      <tr><td>Performance Rating</td><td>${result.rating?.label ?? "—"}</td></tr>
      <tr><td>Original Size</td><td>${formatNum(result.originalSize, precision)} ${result.unit}</td></tr>
      <tr><td>Encoded Size</td><td>${formatNum(result.encodedSize, precision)} ${result.unit}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
