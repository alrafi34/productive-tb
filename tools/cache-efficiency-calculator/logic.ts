// ── Cache Efficiency Calculator Logic ──

export interface PerformanceTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  { label: "Outstanding", min: 95, max: 100.0001, color: "#058554" },
  { label: "Excellent", min: 90, max: 95, color: "#058554" },
  { label: "Good", min: 80, max: 90, color: "#2563EB" },
  { label: "Fair", min: 70, max: 80, color: "#D97706" },
  { label: "Poor", min: 0, max: 70, color: "#DC2626" },
];

export function classifyPerformance(hitRate: number): PerformanceTier {
  return PERFORMANCE_TIERS.find((t) => hitRate >= t.min && hitRate < t.max) ?? PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];
}

export interface CacheResult {
  hits: number;
  misses: number;
  total: number;
  hitRate: number;
  missRate: number;
  performance: PerformanceTier | null;
  error: string | null;
}

export function calculateCacheEfficiency(hits: number, misses: number): CacheResult {
  const base: CacheResult = { hits, misses, total: 0, hitRate: 0, missRate: 0, performance: null, error: null };

  if (!Number.isFinite(hits) || !Number.isFinite(misses)) {
    return { ...base, error: "Enter valid numbers for cache hits and misses." };
  }
  if (hits < 0) return { ...base, error: "Cache hits cannot be negative." };
  if (misses < 0) return { ...base, error: "Cache misses cannot be negative." };

  const total = hits + misses;
  if (total === 0) {
    return { hits, misses, total: 0, hitRate: 0, missRate: 0, performance: null, error: null };
  }

  const hitRate = (hits / total) * 100;
  const missRate = (misses / total) * 100;
  const performance = classifyPerformance(hitRate);

  return { hits, misses, total, hitRate, missRate, performance, error: null };
}

export function getSummaryText(result: CacheResult): string {
  if (result.error) return "";
  if (result.total === 0) return "Enter cache hits and misses to see your hit rate.";
  const p = result.performance?.label ?? "Unknown";
  return `Out of ${result.total.toLocaleString("en-US")} total requests, ${result.hits.toLocaleString("en-US")} were cache hits — a ${result.hitRate.toFixed(2)}% hit rate, rated ${p}.`;
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatPercent(n: number, precision = 2): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Number(n.toFixed(precision));
  return `${rounded}%`;
}

export function formatNum(n: number, precision = 0): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const DEFAULT_HITS = 850;
export const DEFAULT_MISSES = 150;

export const SAMPLE_DATASETS: { label: string; hits: number; misses: number }[] = [
  { label: "Excellent (850/150)", hits: 850, misses: 150 },
  { label: "Outstanding (4930/70)", hits: 4930, misses: 70 },
  { label: "Fair (720/280)", hits: 720, misses: 280 },
  { label: "Poor (320/680)", hits: 320, misses: 680 },
];

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(hits: number, misses: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("hits", String(hits));
  url.searchParams.set("misses", String(misses));
  return url.toString();
}

export function parseShareParams(): { hits: number; misses: number } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const hits = p.get("hits");
  const misses = p.get("misses");
  if (hits === null || misses === null) return null;
  return { hits: parseFloat(hits), misses: parseFloat(misses) };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: CacheResult;
}

const STORAGE_KEY = "cache-efficiency-calculator-history";

export function saveHistory(result: CacheResult): void {
  if (result.error || result.total === 0) return;
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

export function buildTextReport(result: CacheResult): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Cache Efficiency Report",
    "========================",
    `Generated: ${ts}`,
    "",
    `Cache Hits: ${formatNum(result.hits)}`,
    `Cache Misses: ${formatNum(result.misses)}`,
    `Total Requests: ${formatNum(result.total)}`,
    `Hit Rate: ${formatPercent(result.hitRate)}`,
    `Miss Rate: ${formatPercent(result.missRate)}`,
    `Performance: ${result.performance?.label ?? "—"}`,
    "",
    "Formula: Hit Rate = (Cache Hits ÷ Total Requests) × 100",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: CacheResult): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Cache Hits", result.hits],
    ["Cache Misses", result.misses],
    ["Total Requests", result.total],
    ["Hit Rate (%)", formatPercent(result.hitRate)],
    ["Miss Rate (%)", formatPercent(result.missRate)],
    ["Performance", result.performance?.label ?? ""],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: CacheResult): string {
  return JSON.stringify(
    {
      hits: result.hits,
      misses: result.misses,
      total: result.total,
      hitRate: result.hitRate,
      missRate: result.missRate,
      performance: result.performance?.label ?? null,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: CacheResult): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Cache Efficiency Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Cache Efficiency Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Hit Rate</td><td><strong>${formatPercent(result.hitRate)}</strong></td></tr>
      <tr><td>Miss Rate</td><td>${formatPercent(result.missRate)}</td></tr>
      <tr><td>Performance</td><td>${result.performance?.label ?? "—"}</td></tr>
      <tr><td>Cache Hits</td><td>${formatNum(result.hits)}</td></tr>
      <tr><td>Cache Misses</td><td>${formatNum(result.misses)}</td></tr>
      <tr><td>Total Requests</td><td>${formatNum(result.total)}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
