// ── Data Sampling Calculator Logic ──
// Cochran's sample size formula with finite population correction.

export type ConfidenceLevel = 90 | 95 | 99;

export const CONFIDENCE_LEVELS: ConfidenceLevel[] = [90, 95, 99];

const Z_SCORES: Record<ConfidenceLevel, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

export function zScoreFor(confidence: ConfidenceLevel): number {
  return Z_SCORES[confidence];
}

export interface SampleSizeResult {
  z: number;
  confidence: ConfidenceLevel;
  marginOfError: number;
  proportion: number;
  population: number | null;
  n0: number;
  sampleSize: number;
  finiteCorrectionApplied: boolean;
  decimals: number;
}

export interface SampleSizeError {
  error: string;
}

export function isSampleSizeError(r: SampleSizeResult | SampleSizeError | null): r is SampleSizeError {
  return r !== null && "error" in r;
}

export function calculateSampleSize(
  population: number | null, confidence: ConfidenceLevel, marginOfError: number, proportion: number, decimals: number
): SampleSizeResult | SampleSizeError {
  if (population !== null && (!isFinite(population) || population <= 0)) return { error: "Population must be greater than zero." };
  if (!isFinite(marginOfError) || marginOfError < 0.1 || marginOfError > 20) return { error: "Margin of error must be between 0.1% and 20%." };
  if (!isFinite(proportion) || proportion < 1 || proportion > 99) return { error: "Expected proportion should be between 1% and 99%." };

  const z = zScoreFor(confidence);
  const e = marginOfError / 100;
  const p = proportion / 100;
  const q = 1 - p;

  const n0 = (z * z * p * q) / (e * e);
  const finiteCorrectionApplied = population !== null;
  const sampleSize = finiteCorrectionApplied
    ? Math.ceil(n0 / (1 + (n0 - 1) / (population as number)))
    : Math.ceil(n0);

  return {
    z, confidence, marginOfError, proportion, population,
    n0: round(n0, decimals), sampleSize, finiteCorrectionApplied, decimals,
  };
}

// ── Sensitivity analysis ──

export interface SensitivityRow {
  confidence: ConfidenceLevel;
  sampleSize: number;
}

export function confidenceComparisonTable(population: number | null, marginOfError: number, proportion: number): SensitivityRow[] {
  return CONFIDENCE_LEVELS.map((c) => {
    const r = calculateSampleSize(population, c, marginOfError, proportion, 0);
    return { confidence: c, sampleSize: isSampleSizeError(r) ? 0 : r.sampleSize };
  });
}

export interface MarginSensitivityRow {
  marginOfError: number;
  sampleSize: number;
}

export function marginSensitivityTable(population: number | null, confidence: ConfidenceLevel, proportion: number): MarginSensitivityRow[] {
  const margins = [1, 2, 3, 5, 7, 10];
  return margins.map((m) => {
    const r = calculateSampleSize(population, confidence, m, proportion, 0);
    return { marginOfError: m, sampleSize: isSampleSizeError(r) ? 0 : r.sampleSize };
  });
}

// ── Formatting ──

export function formatNum(n: number, decimals = 0): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Presets ──

export interface SamplingPreset {
  name: string;
  population: string;
  infinitePopulation: boolean;
  confidence: ConfidenceLevel;
  marginOfError: number;
  proportion: number;
}

export const SAMPLE_PRESETS: SamplingPreset[] = [
  { name: "Standard Survey (10,000 population)", population: "10000", infinitePopulation: false, confidence: 95, marginOfError: 5, proportion: 50 },
  { name: "High-Precision Study (500,000 population)", population: "500000", infinitePopulation: false, confidence: 99, marginOfError: 3, proportion: 50 },
  { name: "Infinite Population (General Public)", population: "", infinitePopulation: true, confidence: 95, marginOfError: 5, proportion: 50 },
  { name: "A/B Test (Known Conversion Rate)", population: "", infinitePopulation: true, confidence: 95, marginOfError: 2, proportion: 20 },
];

// ── LocalStorage: last-session input ──

const INPUT_KEY = "data-sampling-calculator-input";

export interface SavedInput {
  population: string;
  infinitePopulation: boolean;
  confidence: ConfidenceLevel;
  marginOfError: number;
  proportion: number;
  decimals: number;
}

export function saveInput(data: SavedInput): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify(data)); } catch {}
}

export function loadInput(): SavedInput | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: SavedInput;
  sampleSize: number;
}

const HISTORY_KEY = "data-sampling-calculator-history";

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

// ── Shareable URL ──

export function buildShareUrl(input: SavedInput): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  const p = url.searchParams;
  if (!input.infinitePopulation) p.set("population", input.population);
  else p.delete("population");
  p.set("confidence", String(input.confidence));
  p.set("margin", String(input.marginOfError));
  p.set("proportion", String(input.proportion));
  return url.toString();
}

export function parseShareParams(): SavedInput | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const confidence = p.get("confidence");
  if (!confidence) return null;
  const population = p.get("population");
  return {
    population: population ?? "",
    infinitePopulation: !population,
    confidence: (parseInt(confidence, 10) as ConfidenceLevel) || 95,
    marginOfError: parseFloat(p.get("margin") ?? "5") || 5,
    proportion: parseFloat(p.get("proportion") ?? "50") || 50,
    decimals: 0,
  };
}

// ── Export helpers ──

export function buildTextReport(result: SampleSizeResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Data Sampling Calculator Report",
    "==================================",
    `Generated: ${ts}`,
    "",
    `Population: ${result.population !== null ? formatNum(result.population) : "Infinite"}`,
    `Confidence Level: ${result.confidence}%`,
    `Z-Score: ${result.z}`,
    `Margin of Error: ${result.marginOfError}%`,
    `Expected Proportion: ${result.proportion}%`,
    "",
    `Initial Sample Size (n₀): ${formatNum(result.n0, result.decimals)}`,
    `Finite Population Correction Applied: ${result.finiteCorrectionApplied ? "Yes" : "No"}`,
    "",
    `Required Sample Size: ${formatNum(result.sampleSize)}`,
    "",
    "Generated by Data Sampling Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: SampleSizeResult): string {
  return [
    "Metric,Value",
    `Population,${result.population !== null ? result.population : "Infinite"}`,
    `Confidence Level (%),${result.confidence}`,
    `Z-Score,${result.z}`,
    `Margin of Error (%),${result.marginOfError}`,
    `Expected Proportion (%),${result.proportion}`,
    `Initial Sample Size,${result.n0}`,
    `Finite Population Correction,${result.finiteCorrectionApplied}`,
    `Required Sample Size,${result.sampleSize}`,
  ].join("\n");
}

export function buildJSONReport(result: SampleSizeResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: SampleSizeResult): string {
  return `<!DOCTYPE html><html><head><title>Sample Size Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Data Sampling Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <table>
    <tbody>
      <tr><td>Population</td><td>${result.population !== null ? formatNum(result.population) : "Infinite"}</td></tr>
      <tr><td>Confidence Level</td><td>${result.confidence}%</td></tr>
      <tr><td>Z-Score</td><td>${result.z}</td></tr>
      <tr><td>Margin of Error</td><td>${result.marginOfError}%</td></tr>
      <tr><td>Expected Proportion</td><td>${result.proportion}%</td></tr>
      <tr><td>Required Sample Size</td><td>${formatNum(result.sampleSize)}</td></tr>
    </tbody>
  </table>
  </body></html>`;
}
