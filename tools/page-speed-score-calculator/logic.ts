// ── Page Speed Score Calculator Logic ──

export interface CoreMetrics {
  lcp: number;   // Largest Contentful Paint, seconds
  inp: number;   // Interaction to Next Paint, ms
  cls: number;   // Cumulative Layout Shift, unitless
  fcp: number;   // First Contentful Paint, seconds
  tbt: number;   // Total Blocking Time, ms
  si: number;    // Speed Index, seconds
}

export type MetricKey = keyof CoreMetrics;

export interface MetricMeta {
  key: MetricKey;
  label: string;
  short: string;
  unit: string;
  weight: number;
  good: number;
  poor: number;
  step: string;
  description: string;
}

export const METRICS: MetricMeta[] = [
  { key: "lcp", label: "Largest Contentful Paint", short: "LCP", unit: "s", weight: 0.30, good: 2.5, poor: 4.0, step: "0.1", description: "Time until the largest visible element finishes rendering." },
  { key: "inp", label: "Interaction to Next Paint", short: "INP", unit: "ms", weight: 0.25, good: 200, poor: 500, step: "1", description: "Responsiveness of the page to user interactions like taps and clicks." },
  { key: "tbt", label: "Total Blocking Time", short: "TBT", unit: "ms", weight: 0.20, good: 200, poor: 600, step: "1", description: "Total time the main thread was blocked and unable to respond." },
  { key: "cls", label: "Cumulative Layout Shift", short: "CLS", unit: "", weight: 0.15, good: 0.1, poor: 0.25, step: "0.01", description: "How much visible content unexpectedly shifts during load." },
  { key: "fcp", label: "First Contentful Paint", short: "FCP", unit: "s", weight: 0.05, good: 1.8, poor: 3.0, step: "0.1", description: "Time until the first text or image is painted on screen." },
  { key: "si", label: "Speed Index", short: "SI", unit: "s", weight: 0.05, good: 3.4, poor: 5.8, step: "0.1", description: "How quickly content is visually populated during load." },
];

export const DEFAULT_METRICS: CoreMetrics = {
  lcp: 2.4,
  inp: 180,
  cls: 0.08,
  fcp: 1.6,
  tbt: 140,
  si: 3.1,
};

export const EXAMPLE_PRESETS: { label: string; metrics: CoreMetrics }[] = [
  { label: "Excellent Site", metrics: { lcp: 2.1, cls: 0.02, inp: 140, fcp: 1.2, tbt: 80, si: 2.8 } },
  { label: "Needs Improvement", metrics: { lcp: 3.8, cls: 0.18, inp: 320, fcp: 2.4, tbt: 420, si: 5.1 } },
  { label: "Poor Site", metrics: { lcp: 6.3, cls: 0.45, inp: 620, fcp: 4.9, tbt: 900, si: 8.4 } },
];

export type PerformanceRating = "Excellent" | "Good" | "Needs Improvement" | "Poor";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Piecewise-linear scoring modeled on Lighthouse's good/poor thresholds:
// value <= good -> 100; good..poor -> 100..50; poor..2x poor -> 50..0; beyond -> 0.
export function scoreMetric(value: number, good: number, poor: number): number {
  if (!isFinite(value) || value < 0) return 0;
  if (value <= good) return 100;
  if (value <= poor) {
    const frac = (value - good) / (poor - good);
    return 100 - frac * 50;
  }
  const upperBound = poor * 2;
  if (value >= upperBound) return 0;
  const frac = (value - poor) / (upperBound - poor);
  return 50 - frac * 50;
}

export interface MetricScore {
  key: MetricKey;
  meta: MetricMeta;
  value: number;
  score: number;
  weighted: number;
  status: "good" | "needs-improvement" | "poor";
}

export interface PageSpeedResult {
  finalScore: number;
  grade: string;
  rating: PerformanceRating;
  color: string;
  metricScores: MetricScore[];
  recommendations: string[];
  summary: string;
}

export function classifyScore(score: number): { rating: PerformanceRating; color: string; grade: string } {
  if (score >= 90) return { rating: "Excellent", color: "#058554", grade: "A" };
  if (score >= 70) return { rating: "Good", color: "#2563eb", grade: "B" };
  if (score >= 50) return { rating: "Needs Improvement", color: "#d97706", grade: "C" };
  return { rating: "Poor", color: "#dc2626", grade: "F" };
}

function metricStatus(score: number): "good" | "needs-improvement" | "poor" {
  if (score >= 90) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
}

function recommendationFor(meta: MetricMeta, value: number, status: "good" | "needs-improvement" | "poor"): string | null {
  if (status === "good") return null;
  const worse = status === "poor";
  switch (meta.key) {
    case "lcp":
      return worse
        ? "Reduce image size and improve server response time — LCP is significantly above the 2.5s target."
        : "Optimize your largest image or text block (compress, preload, or use a CDN) to bring LCP under 2.5s.";
    case "inp":
      return worse
        ? "Reduce JavaScript execution time — INP is well above the 200ms target, making interactions feel sluggish."
        : "Break up long JavaScript tasks and reduce main-thread work to improve interaction responsiveness.";
    case "tbt":
      return worse
        ? "Defer or code-split non-critical JavaScript — Total Blocking Time is keeping the main thread busy far too long."
        : "Reduce unused JavaScript and defer third-party scripts to lower Total Blocking Time.";
    case "cls":
      return worse
        ? "Avoid layout shifts caused by late-loading elements — CLS is well above the 0.1 target."
        : "Reserve space for images, ads, and embeds to reduce unexpected layout shifts.";
    case "fcp":
      return worse
        ? "Eliminate render-blocking resources — First Contentful Paint is taking too long to appear."
        : "Minify CSS and preconnect to key origins to speed up First Contentful Paint.";
    case "si":
      return worse
        ? "Simplify above-the-fold content — Speed Index shows the page is populating far too slowly."
        : "Prioritize visible content and lazy-load offscreen assets to improve Speed Index.";
    default:
      return null;
  }
}

export function calculatePageSpeed(metrics: CoreMetrics): PageSpeedResult {
  const metricScores: MetricScore[] = METRICS.map((meta) => {
    const value = metrics[meta.key];
    const score = scoreMetric(value, meta.good, meta.poor);
    return { key: meta.key, meta, value, score, weighted: score * meta.weight, status: metricStatus(score) };
  });

  const rawFinal = metricScores.reduce((sum, m) => sum + m.weighted, 0);
  const finalScore = Math.round(clamp(rawFinal, 0, 100));
  const { rating, color, grade } = classifyScore(finalScore);

  const recommendations = metricScores
    .filter((m) => m.status !== "good")
    .sort((a, b) => a.score - b.score)
    .map((m) => recommendationFor(m.meta, m.value, m.status))
    .filter((r): r is string => Boolean(r));

  if (recommendations.length === 0) {
    recommendations.push("No critical issues detected. Maintain your current optimization strategy.");
  }

  const summary = `Your estimated performance score is ${finalScore}/100 (${rating}). ${
    rating === "Excellent" ? "Core Web Vitals are within Google's recommended thresholds." :
    rating === "Good" ? "Most metrics are solid, with some room to optimize." :
    rating === "Needs Improvement" ? "Several metrics are outside recommended thresholds and are likely affecting user experience and SEO." :
    "Multiple critical metrics are far outside recommended thresholds — prioritize the recommendations below."
  }`;

  return { finalScore, grade, rating, color, metricScores, recommendations, summary };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Partial<Record<MetricKey, string | null>>;

export function validateMetrics(metrics: CoreMetrics): ValidationErrors {
  const e: ValidationErrors = {};
  for (const meta of METRICS) {
    const value = metrics[meta.key];
    if (value === null || value === undefined || isNaN(value)) {
      e[meta.key] = `${meta.short} is required.`;
    } else if (value < 0) {
      e[meta.key] = `${meta.short} must be greater than or equal to zero.`;
    }
  }
  if (!e.lcp && metrics.lcp === 0) e.lcp = "LCP must be greater than zero.";
  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function parseNum(val: string): number {
  const n = parseFloat(val.trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ────────────────────────────────────────────────────────────

export function buildShareUrl(metrics: CoreMetrics): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  for (const meta of METRICS) url.searchParams.set(meta.key, String(metrics[meta.key]));
  return url.toString();
}

export function parseShareParams(): Partial<CoreMetrics> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  if (!p.get("lcp")) return null;
  const out: Partial<CoreMetrics> = {};
  for (const meta of METRICS) {
    const raw = p.get(meta.key);
    if (raw !== null) out[meta.key] = parseFloat(raw) || 0;
  }
  return out;
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "page-speed-score-calculator-inputs";

export function saveInputs(metrics: CoreMetrics): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(metrics)); } catch {}
}

export function loadInputs(): CoreMetrics | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as CoreMetrics;
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  metrics: CoreMetrics;
  result: PageSpeedResult;
}

const HISTORY_KEY = "page-speed-score-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: PageSpeedResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Page Speed Score Calculator Report",
    "===================================",
    `Generated: ${ts}`,
    "",
    `Estimated Performance Score: ${result.finalScore} / 100`,
    `Grade: ${result.grade}`,
    `Status: ${result.rating}`,
    "",
    "Metrics",
    ...result.metricScores.map((m) => `${m.meta.label} (${m.meta.short}): ${m.value}${m.meta.unit} — score ${Math.round(m.score)}`),
    "",
    "Recommendations",
    ...result.recommendations.map((r) => `- ${r}`),
    "",
    result.summary,
    "",
    "Generated by Page Speed Score Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: PageSpeedResult): string {
  const rows = [
    ["Metric", "Value", "Unit", "Score", "Weight"],
    ...result.metricScores.map((m) => [m.meta.short, String(m.value), m.meta.unit || "-", String(Math.round(m.score)), `${Math.round(m.meta.weight * 100)}%`]),
    [],
    ["Final Score", String(result.finalScore)],
    ["Grade", result.grade],
    ["Status", result.rating],
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

export function buildJSONReport(result: PageSpeedResult, metrics: CoreMetrics): string {
  return JSON.stringify(
    {
      metrics,
      finalScore: result.finalScore,
      grade: result.grade,
      rating: result.rating,
      metricScores: result.metricScores.map((m) => ({ key: m.key, value: m.value, score: Math.round(m.score) })),
      recommendations: result.recommendations,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: PageSpeedResult): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Page Speed Score Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Page Speed Score Calculator Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Result</h2>
    <table>
      <tr><td>Estimated Score</td><td><strong>${result.finalScore} / 100</strong></td></tr>
      <tr><td>Grade</td><td>${result.grade}</td></tr>
      <tr><td>Status</td><td>${result.rating}</td></tr>
    </table>
    <h2>Metrics</h2>
    <table>
      ${result.metricScores.map((m) => `<tr><td>${m.meta.label} (${m.meta.short})</td><td>${m.value}${m.meta.unit} — score ${Math.round(m.score)}</td></tr>`).join("")}
    </table>
    <h2>Recommendations</h2>
    <table>
      ${result.recommendations.map((r) => `<tr><td colspan="2">${r}</td></tr>`).join("")}
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
