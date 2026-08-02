// ── Z-Score Calculator Logic ──

export type CalcMode = "forward" | "reverse";

export interface ForwardInputs {
  value: number;
  mean: number;
  stdDev: number;
}

export interface ReverseInputs {
  zScore: number;
  mean: number;
  stdDev: number;
}

export interface InterpretationTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const INTERPRETATION_TIERS: InterpretationTier[] = [
  { label: "Extremely Low", min: -Infinity, max: -3, color: "#B91C1C" },
  { label: "Very Low", min: -3, max: -2, color: "#DC2626" },
  { label: "Below Average", min: -2, max: -1, color: "#F59E0B" },
  { label: "Average", min: -1, max: 1, color: "#058554" },
  { label: "Above Average", min: 1, max: 2, color: "#F59E0B" },
  { label: "Very High", min: 2, max: 3, color: "#DC2626" },
  { label: "Extremely High", min: 3, max: Infinity, color: "#B91C1C" },
];

export function classifyZScore(z: number): InterpretationTier {
  return INTERPRETATION_TIERS.find((t) => z > t.min && z <= t.max) ?? INTERPRETATION_TIERS.find((t) => z <= t.min) ?? INTERPRETATION_TIERS[3];
}

export function buildInterpretationText(z: number): string {
  if (z === 0) return "The value is exactly equal to the mean.";
  const direction = z > 0 ? "above" : "below";
  const magnitude = Math.abs(z);
  const formatted = Number.isInteger(magnitude) ? magnitude.toFixed(0) : magnitude.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return `The value is ${formatted} standard deviation${magnitude === 1 ? "" : "s"} ${direction} the mean.`;
}

export interface ZScoreResult {
  mode: CalcMode;
  value: number | null;
  mean: number;
  stdDev: number;
  zScore: number | null;
  interpretation: InterpretationTier | null;
  interpretationText: string;
  error: string | null;
}

export function calculateForward(inputs: ForwardInputs): ZScoreResult {
  const { value, mean, stdDev } = inputs;
  if (![value, mean, stdDev].every(Number.isFinite)) {
    return { mode: "forward", value: null, mean, stdDev, zScore: null, interpretation: null, interpretationText: "", error: "Enter valid numbers for all fields." };
  }
  if (stdDev <= 0) {
    return { mode: "forward", value, mean, stdDev, zScore: null, interpretation: null, interpretationText: "", error: "Standard deviation must be greater than zero." };
  }
  const z = (value - mean) / stdDev;
  return { mode: "forward", value, mean, stdDev, zScore: z, interpretation: classifyZScore(z), interpretationText: buildInterpretationText(z), error: null };
}

export function calculateReverse(inputs: ReverseInputs): ZScoreResult {
  const { zScore, mean, stdDev } = inputs;
  if (![zScore, mean, stdDev].every(Number.isFinite)) {
    return { mode: "reverse", value: null, mean, stdDev, zScore: null, interpretation: null, interpretationText: "", error: "Enter valid numbers for all fields." };
  }
  if (stdDev <= 0) {
    return { mode: "reverse", value: null, mean, stdDev, zScore, interpretation: null, interpretationText: "", error: "Standard deviation must be greater than zero." };
  }
  const value = mean + zScore * stdDev;
  return { mode: "reverse", value, mean, stdDev, zScore, interpretation: classifyZScore(zScore), interpretationText: buildInterpretationText(zScore), error: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Presets ───────────────────────────────────────────────────────────────────

export const FORWARD_PRESETS: { label: string; value: number; mean: number; stdDev: number }[] = [
  { label: "Exam Score", value: 85, mean: 70, stdDev: 10 },
  { label: "Below Average", value: 45, mean: 60, stdDev: 5 },
  { label: "Equal to Mean", value: 100, mean: 100, stdDev: 20 },
];

export const REVERSE_PRESETS: { label: string; zScore: number; mean: number; stdDev: number }[] = [
  { label: "95% Confidence (1.96)", zScore: 1.96, mean: 100, stdDev: 15 },
  { label: "One Std Dev Above", zScore: 1, mean: 70, stdDev: 10 },
];

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(mode: CalcMode, a: number, mean: number, stdDev: number, precision: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  url.searchParams.set(mode === "forward" ? "value" : "z", String(a));
  url.searchParams.set("mean", String(mean));
  url.searchParams.set("sd", String(stdDev));
  url.searchParams.set("precision", String(precision));
  return url.toString();
}

export interface ShareParams {
  mode: CalcMode;
  a: number;
  mean: number;
  stdDev: number;
  precision: number;
}

export function parseShareParams(): ShareParams | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const modeParam = p.get("mode");
  const mode: CalcMode = modeParam === "reverse" ? "reverse" : "forward";
  const aParam = p.get(mode === "forward" ? "value" : "z");
  const meanParam = p.get("mean");
  const sdParam = p.get("sd");
  if (aParam === null || meanParam === null || sdParam === null) return null;
  return {
    mode,
    a: parseFloat(aParam),
    mean: parseFloat(meanParam),
    stdDev: parseFloat(sdParam),
    precision: parseInt(p.get("precision") ?? "2", 10) || 2,
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: CalcMode;
  result: ZScoreResult;
}

const STORAGE_KEY = "z-score-calculator-history";

export function saveHistory(result: ZScoreResult): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), mode: result.mode, result };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: ZScoreResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Z-Score Calculation Report",
    "===========================",
    `Generated: ${ts}`,
    "",
    `Mode: ${result.mode === "forward" ? "Calculate Z-Score" : "Reverse Calculate Value"}`,
    `Observed Value (X): ${formatNum(result.value, precision)}`,
    `Mean (μ): ${formatNum(result.mean, precision)}`,
    `Standard Deviation (σ): ${formatNum(result.stdDev, precision)}`,
    `Z-Score: ${formatNum(result.zScore, precision)}`,
    `Interpretation: ${result.interpretation?.label ?? "—"}`,
    result.interpretationText,
    "",
    "Formula: Z = (X − μ) ÷ σ",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: ZScoreResult, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Mode", result.mode === "forward" ? "Calculate Z-Score" : "Reverse Calculate Value"],
    ["Observed Value (X)", formatNum(result.value, precision)],
    ["Mean (μ)", formatNum(result.mean, precision)],
    ["Standard Deviation (σ)", formatNum(result.stdDev, precision)],
    ["Z-Score", formatNum(result.zScore, precision)],
    ["Interpretation", result.interpretation?.label ?? ""],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ZScoreResult): string {
  return JSON.stringify(
    {
      mode: result.mode,
      value: result.value,
      mean: result.mean,
      stdDev: result.stdDev,
      zScore: result.zScore,
      interpretation: result.interpretation?.label ?? null,
      interpretationText: result.interpretationText,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ZScoreResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Z-Score Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Z-Score Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Z-Score</td><td><strong>${formatNum(result.zScore, precision)}</strong></td></tr>
      <tr><td>Interpretation</td><td>${result.interpretation?.label ?? "—"}</td></tr>
      <tr><td>Observed Value (X)</td><td>${formatNum(result.value, precision)}</td></tr>
      <tr><td>Mean (μ)</td><td>${formatNum(result.mean, precision)}</td></tr>
      <tr><td>Standard Deviation (σ)</td><td>${formatNum(result.stdDev, precision)}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:13px;color:#374151;">${result.interpretationText}</p>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

export const DEFAULT_VALUE = 85;
export const DEFAULT_MEAN = 70;
export const DEFAULT_STDDEV = 10;
export const DEFAULT_ZSCORE = 1.96;
export const DEFAULT_PRECISION = 2;
