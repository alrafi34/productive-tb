// ── Data Compression Ratio Calculator Logic ──

export type SizeUnit = "Bytes" | "KB" | "MB" | "GB" | "TB";

export const UNITS: SizeUnit[] = ["Bytes", "KB", "MB", "GB", "TB"];

const UNIT_TO_BYTES: Record<SizeUnit, number> = {
  Bytes: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

export function toBytes(value: number, unit: SizeUnit): number {
  return value * UNIT_TO_BYTES[unit];
}

export type CompressionStatus = "compressed" | "no-change" | "expanded";

export interface EfficiencyTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const EFFICIENCY_TIERS: EfficiencyTier[] = [
  { label: "Outstanding", min: 90, max: Infinity, color: "#058554" },
  { label: "Excellent", min: 75, max: 90, color: "#058554" },
  { label: "Good", min: 50, max: 75, color: "#2563EB" },
  { label: "Moderate", min: 25, max: 50, color: "#D97706" },
  { label: "Low", min: 10, max: 25, color: "#F59E0B" },
  { label: "Minimal", min: 0, max: 10, color: "#DC2626" },
];

export function classifyEfficiency(percentage: number): EfficiencyTier | null {
  if (percentage < 0) return null; // expansion — no efficiency tier applies
  return EFFICIENCY_TIERS.find((t) => percentage >= t.min && percentage < t.max) ?? EFFICIENCY_TIERS[EFFICIENCY_TIERS.length - 1];
}

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  unit: SizeUnit;
  ratio: number | null; // original / compressed
  percentage: number | null; // reduction %, negative if expanded
  spaceSaved: number | null; // original - compressed, negative if expanded
  status: CompressionStatus | null;
  efficiency: EfficiencyTier | null;
  error: string | null;
}

export function calculateCompression(originalSize: number, compressedSize: number, unit: SizeUnit): CompressionResult {
  const base: CompressionResult = {
    originalSize, compressedSize, unit, ratio: null, percentage: null, spaceSaved: null, status: null, efficiency: null, error: null,
  };

  if (!Number.isFinite(originalSize) || !Number.isFinite(compressedSize)) {
    return { ...base, error: "Enter valid numbers for both file sizes." };
  }
  if (originalSize <= 0) {
    return { ...base, error: "Original size must be greater than zero." };
  }
  if (compressedSize < 0) {
    return { ...base, error: "Compressed size cannot be negative." };
  }
  if (compressedSize === 0) {
    return { ...base, error: "Compressed size cannot be zero — the compression ratio is undefined." };
  }

  const ratio = originalSize / compressedSize;
  const percentage = ((originalSize - compressedSize) / originalSize) * 100;
  const spaceSaved = originalSize - compressedSize;

  let status: CompressionStatus;
  if (compressedSize === originalSize) status = "no-change";
  else if (compressedSize > originalSize) status = "expanded";
  else status = "compressed";

  const efficiency = status === "compressed" ? classifyEfficiency(percentage) : null;

  return { originalSize, compressedSize, unit, ratio, percentage, spaceSaved, status, efficiency, error: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function formatRatio(result: CompressionResult, precision: number): string {
  if (result.ratio === null) return "—";
  if (result.status === "expanded") {
    const expansionRatio = result.compressedSize / result.originalSize;
    return `1 : ${expansionRatio.toFixed(precision)}`;
  }
  return `${result.ratio.toFixed(precision)} : 1`;
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
  const idx = Math.min(UNITS.length - 1, Math.max(0, Math.floor(Math.log(bytes) / Math.log(1024))));
  const displayUnit = UNITS[idx];
  const displayValue = bytes / UNIT_TO_BYTES[displayUnit];
  return `${sign}${displayValue.toFixed(precision)} ${displayUnit}`;
}

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4];
export const DEFAULT_PRECISION = 2;
export const DEFAULT_ORIGINAL = 100;
export const DEFAULT_COMPRESSED = 25;
export const DEFAULT_UNIT: SizeUnit = "MB";

export const PRESETS: { label: string; original: number; compressed: number; unit: SizeUnit }[] = [
  { label: "ZIP Archive", original: 100, compressed: 25, unit: "MB" },
  { label: "Cloud Backup", original: 8, compressed: 2, unit: "GB" },
  { label: "Low Compression", original: 500, compressed: 450, unit: "KB" },
  { label: "Video Transcode", original: 4, compressed: 1.2, unit: "GB" },
];

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(original: number, compressed: number, unit: SizeUnit, precision: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("orig", String(original));
  url.searchParams.set("comp", String(compressed));
  url.searchParams.set("unit", unit);
  url.searchParams.set("precision", String(precision));
  return url.toString();
}

export interface ShareParams {
  original: number;
  compressed: number;
  unit: SizeUnit;
  precision: number;
}

export function parseShareParams(): ShareParams | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const orig = p.get("orig");
  const comp = p.get("comp");
  if (orig === null || comp === null) return null;
  const unitParam = p.get("unit");
  return {
    original: parseFloat(orig),
    compressed: parseFloat(comp),
    unit: (UNITS as string[]).includes(unitParam ?? "") ? (unitParam as SizeUnit) : DEFAULT_UNIT,
    precision: parseInt(p.get("precision") ?? "2", 10) || 2,
  };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: CompressionResult;
}

const STORAGE_KEY = "data-compression-ratio-calculator-history";

export function saveHistory(result: CompressionResult): void {
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

export function buildTextReport(result: CompressionResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const statusLabel = result.status === "expanded" ? "Data Expanded" : result.status === "no-change" ? "No Compression" : "Compressed";
  const lines = [
    "Data Compression Ratio Report",
    "===============================",
    `Generated: ${ts}`,
    "",
    `Original Size: ${formatNum(result.originalSize, precision)} ${result.unit}`,
    `Compressed Size: ${formatNum(result.compressedSize, precision)} ${result.unit}`,
    `Compression Ratio: ${formatRatio(result, precision)}`,
    `${result.status === "expanded" ? "Expansion" : "Reduction"}: ${formatNum(result.percentage, precision)}%`,
    `Space Saved: ${formatNum(result.spaceSaved, precision)} ${result.unit}`,
    `Status: ${statusLabel}`,
    ...(result.efficiency ? [`Efficiency: ${result.efficiency.label}`] : []),
    "",
    "Formula: Ratio = Original ÷ Compressed, Reduction % = ((Original − Compressed) ÷ Original) × 100",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: CompressionResult, precision: number): string {
  const statusLabel = result.status === "expanded" ? "Data Expanded" : result.status === "no-change" ? "No Compression" : "Compressed";
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Original Size", `${formatNum(result.originalSize, precision)} ${result.unit}`],
    ["Compressed Size", `${formatNum(result.compressedSize, precision)} ${result.unit}`],
    ["Compression Ratio", formatRatio(result, precision)],
    ["Reduction (%)", formatNum(result.percentage, precision)],
    ["Space Saved", `${formatNum(result.spaceSaved, precision)} ${result.unit}`],
    ["Status", statusLabel],
    ["Efficiency", result.efficiency?.label ?? ""],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: CompressionResult): string {
  return JSON.stringify(
    {
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      unit: result.unit,
      ratio: result.ratio,
      percentage: result.percentage,
      spaceSaved: result.spaceSaved,
      status: result.status,
      efficiency: result.efficiency?.label ?? null,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: CompressionResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const statusLabel = result.status === "expanded" ? "Data Expanded" : result.status === "no-change" ? "No Compression" : "Compressed";
  return `<!DOCTYPE html><html><head><title>Data Compression Ratio Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Data Compression Ratio Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Compression Ratio</td><td><strong>${formatRatio(result, precision)}</strong></td></tr>
      <tr><td>${result.status === "expanded" ? "Expansion" : "Reduction"}</td><td>${formatNum(result.percentage, precision)}%</td></tr>
      <tr><td>Space Saved</td><td>${formatNum(result.spaceSaved, precision)} ${result.unit}</td></tr>
      <tr><td>Status</td><td>${statusLabel}</td></tr>
      <tr><td>Efficiency</td><td>${result.efficiency?.label ?? "—"}</td></tr>
      <tr><td>Original Size</td><td>${formatNum(result.originalSize, precision)} ${result.unit}</td></tr>
      <tr><td>Compressed Size</td><td>${formatNum(result.compressedSize, precision)} ${result.unit}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
