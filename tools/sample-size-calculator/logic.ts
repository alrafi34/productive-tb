// ── Sample Size Calculator Logic ──

export type Sidedness = "one-sided" | "two-sided";

export const CONFIDENCE_LEVELS = [80, 85, 90, 95, 98, 99, 99.9] as const;

const Z_TWO_SIDED: Record<number, number> = {
  80: 1.282, 85: 1.440, 90: 1.645, 95: 1.960, 98: 2.326, 99: 2.576, 99.9: 3.291,
};

const Z_ONE_SIDED: Record<number, number> = {
  80: 0.842, 85: 1.036, 90: 1.282, 95: 1.645, 98: 2.054, 99: 2.326, 99.9: 3.090,
};

export function getZScore(confidenceLevel: number, sided: Sidedness): number {
  const table = sided === "two-sided" ? Z_TWO_SIDED : Z_ONE_SIDED;
  return table[confidenceLevel] ?? Z_TWO_SIDED[95];
}

export interface SampleSizeInputs {
  population: number;
  isInfinite: boolean;
  confidenceLevel: number;
  marginOfError: number; // percent, e.g. 5 means ±5%
  proportion: number; // percent, 1–99
  deff: number; // design effect, 1–10
  sided: Sidedness;
}

export interface SampleSizeResult {
  inputs: SampleSizeInputs;
  zScore: number;
  n0: number; // infinite-population sample size (unrounded)
  n0Deff: number; // after design effect (unrounded)
  finiteApplied: boolean;
  finalSampleSize: number | null; // rounded up
  populationError: string | null;
  marginError: string | null;
  ciLower: number | null;
  ciUpper: number | null;
  interpretation: string;
}

export function trimNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Number.isInteger(n) ? String(n) : String(parseFloat(n.toFixed(2)));
}

export function calculateSampleSize(inputs: SampleSizeInputs): SampleSizeResult {
  const { population, isInfinite, confidenceLevel, marginOfError, proportion, deff, sided } = inputs;

  let populationError: string | null = null;
  let marginError: string | null = null;

  if (!isInfinite && (!Number.isFinite(population) || population <= 0)) {
    populationError = "Population must be greater than zero.";
  }
  if (!Number.isFinite(marginOfError) || marginOfError < 0.1 || marginOfError > 20) {
    marginError = "Margin of error must be between 0.1% and 20%.";
  }

  const zScore = getZScore(confidenceLevel, sided);
  const p = Math.min(99, Math.max(1, proportion)) / 100;
  const deffClamped = Math.min(10, Math.max(1, deff));

  if (populationError || marginError) {
    return {
      inputs, zScore, n0: 0, n0Deff: 0, finiteApplied: false, finalSampleSize: null,
      populationError, marginError, ciLower: null, ciUpper: null, interpretation: "",
    };
  }

  const e = marginOfError / 100;
  const n0 = (zScore ** 2 * p * (1 - p)) / (e ** 2);
  const n0Deff = n0 * deffClamped;

  let finiteApplied = false;
  let finalRaw: number;
  if (isInfinite) {
    finalRaw = n0Deff;
  } else {
    finiteApplied = true;
    finalRaw = n0Deff / (1 + (n0Deff - 1) / population);
  }

  const finalSampleSize = Math.ceil(finalRaw);
  const proportionPct = p * 100;
  const ciLower = Math.max(0, proportionPct - marginOfError);
  const ciUpper = Math.min(100, proportionPct + marginOfError);

  const interpretation = `You need approximately ${finalSampleSize.toLocaleString("en-US")} responses to estimate the population within a ±${trimNum(marginOfError)}% margin of error at a ${trimNum(confidenceLevel)}% confidence level.`;

  return {
    inputs, zScore, n0, n0Deff, finiteApplied, finalSampleSize,
    populationError: null, marginError: null, ciLower, ciUpper, interpretation,
  };
}

// ── Population sensitivity data (for chart) ────────────────────────────────

export interface SensitivityPoint {
  population: number;
  sampleSize: number;
}

const SENSITIVITY_POPULATIONS = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];

export function buildSensitivityData(inputs: SampleSizeInputs): SensitivityPoint[] {
  const zScore = getZScore(inputs.confidenceLevel, inputs.sided);
  const p = Math.min(99, Math.max(1, inputs.proportion)) / 100;
  const e = inputs.marginOfError / 100;
  const deff = Math.min(10, Math.max(1, inputs.deff));
  if (!(e > 0) || !Number.isFinite(e)) return [];
  const n0Deff = ((zScore ** 2 * p * (1 - p)) / (e ** 2)) * deff;
  return SENSITIVITY_POPULATIONS.map((N) => ({
    population: N,
    sampleSize: Math.ceil(n0Deff / (1 + (n0Deff - 1) / N)),
  }));
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatInt(n: number | null): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

export function formatNum(n: number | null, precision = 2): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Presets ───────────────────────────────────────────────────────────────

export interface Preset {
  label: string;
  icon: string;
  population: number;
  isInfinite: boolean;
  confidenceLevel: number;
  marginOfError: number;
  proportion: number;
  deff: number;
  sided: Sidedness;
}

export const PRESETS: Preset[] = [
  { label: "Academic Survey", icon: "🎓", population: 2000, isInfinite: false, confidenceLevel: 95, marginOfError: 5, proportion: 50, deff: 1, sided: "two-sided" },
  { label: "Market Research", icon: "📈", population: 100000, isInfinite: false, confidenceLevel: 95, marginOfError: 4, proportion: 50, deff: 1, sided: "two-sided" },
  { label: "Medical Study", icon: "🩺", population: 500, isInfinite: false, confidenceLevel: 99, marginOfError: 5, proportion: 50, deff: 1.5, sided: "two-sided" },
  { label: "Election Poll", icon: "🗳️", population: 1000000, isInfinite: true, confidenceLevel: 95, marginOfError: 3, proportion: 50, deff: 1, sided: "two-sided" },
  { label: "Customer Feedback", icon: "💬", population: 10000, isInfinite: false, confidenceLevel: 90, marginOfError: 7, proportion: 50, deff: 1, sided: "two-sided" },
  { label: "UX Research", icon: "🖥️", population: 200, isInfinite: false, confidenceLevel: 90, marginOfError: 10, proportion: 50, deff: 1, sided: "two-sided" },
];

// ── Defaults ──────────────────────────────────────────────────────────────

export const DEFAULT_POPULATION = 10000;
export const DEFAULT_IS_INFINITE = false;
export const DEFAULT_CONFIDENCE = 95;
export const DEFAULT_MARGIN = 5;
export const DEFAULT_PROPORTION = 50;
export const DEFAULT_DEFF = 1;
export const DEFAULT_SIDED: Sidedness = "two-sided";

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(inputs: SampleSizeInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("pop", String(inputs.population));
  url.searchParams.set("inf", inputs.isInfinite ? "1" : "0");
  url.searchParams.set("cl", String(inputs.confidenceLevel));
  url.searchParams.set("moe", String(inputs.marginOfError));
  url.searchParams.set("prop", String(inputs.proportion));
  url.searchParams.set("deff", String(inputs.deff));
  url.searchParams.set("sided", inputs.sided);
  return url.toString();
}

export function parseShareParams(): SampleSizeInputs | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const pop = p.get("pop");
  const cl = p.get("cl");
  const moe = p.get("moe");
  if (pop === null || cl === null || moe === null) return null;
  return {
    population: parseFloat(pop) || DEFAULT_POPULATION,
    isInfinite: p.get("inf") === "1",
    confidenceLevel: parseFloat(cl) || DEFAULT_CONFIDENCE,
    marginOfError: parseFloat(moe) || DEFAULT_MARGIN,
    proportion: parseFloat(p.get("prop") ?? "") || DEFAULT_PROPORTION,
    deff: parseFloat(p.get("deff") ?? "") || DEFAULT_DEFF,
    sided: p.get("sided") === "one-sided" ? "one-sided" : "two-sided",
  };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SampleSizeInputs;
  finalSampleSize: number;
}

const STORAGE_KEY = "sample-size-calculator-history";

export function saveHistory(result: SampleSizeResult): void {
  if (result.finalSampleSize === null) return;
  const history = getHistory();
  const newEntry: HistoryEntry = {
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
    inputs: result.inputs,
    finalSampleSize: result.finalSampleSize,
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(result: SampleSizeResult): string {
  const ts = new Date().toLocaleString("en-US");
  const { inputs } = result;
  const lines = [
    "Sample Size Calculation Report",
    "===============================",
    `Generated: ${ts}`,
    "",
    `Population: ${inputs.isInfinite ? "Infinite / Very Large" : inputs.population.toLocaleString("en-US")}`,
    `Confidence Level: ${trimNum(inputs.confidenceLevel)}%`,
    `Margin of Error: ±${trimNum(inputs.marginOfError)}%`,
    `Expected Proportion: ${trimNum(inputs.proportion)}%`,
    `Design Effect (DEFF): ${trimNum(inputs.deff)}`,
    `Test Type: ${inputs.sided === "two-sided" ? "Two-sided" : "One-sided"}`,
    `Z-score Used: ${formatNum(result.zScore, 3)}`,
    `Finite Population Correction Applied: ${result.finiteApplied ? "Yes" : "No"}`,
    "",
    `Required Sample Size: ${formatInt(result.finalSampleSize)}`,
    "",
    result.interpretation,
    "",
    "Formula: n = (Z² × p × (1 − p)) / E²  →  Finite: n / (1 + ((n − 1) / N))",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: SampleSizeResult): string {
  const { inputs } = result;
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Population", inputs.isInfinite ? "Infinite / Very Large" : inputs.population],
    ["Confidence Level (%)", trimNum(inputs.confidenceLevel)],
    ["Margin of Error (%)", trimNum(inputs.marginOfError)],
    ["Expected Proportion (%)", trimNum(inputs.proportion)],
    ["Design Effect (DEFF)", trimNum(inputs.deff)],
    ["Test Type", inputs.sided],
    ["Z-score", formatNum(result.zScore, 3)],
    ["Finite Population Correction Applied", result.finiteApplied ? "Yes" : "No"],
    ["Required Sample Size", formatInt(result.finalSampleSize)],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: SampleSizeResult): string {
  return JSON.stringify(
    {
      population: result.inputs.isInfinite ? "infinite" : result.inputs.population,
      confidenceLevel: result.inputs.confidenceLevel,
      marginOfError: result.inputs.marginOfError,
      proportion: result.inputs.proportion,
      deff: result.inputs.deff,
      testType: result.inputs.sided,
      zScore: result.zScore,
      finiteApplied: result.finiteApplied,
      requiredSampleSize: result.finalSampleSize,
      interpretation: result.interpretation,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: SampleSizeResult): string {
  const ts = new Date().toLocaleString("en-US");
  const { inputs } = result;
  return `<!DOCTYPE html><html><head><title>Sample Size Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Sample Size Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Required Sample Size</td><td><strong>${formatInt(result.finalSampleSize)}</strong></td></tr>
      <tr><td>Population</td><td>${inputs.isInfinite ? "Infinite / Very Large" : inputs.population.toLocaleString("en-US")}</td></tr>
      <tr><td>Confidence Level</td><td>${trimNum(inputs.confidenceLevel)}%</td></tr>
      <tr><td>Margin of Error</td><td>±${trimNum(inputs.marginOfError)}%</td></tr>
      <tr><td>Expected Proportion</td><td>${trimNum(inputs.proportion)}%</td></tr>
      <tr><td>Design Effect</td><td>${trimNum(inputs.deff)}</td></tr>
      <tr><td>Test Type</td><td>${inputs.sided === "two-sided" ? "Two-sided" : "One-sided"}</td></tr>
      <tr><td>Z-score Used</td><td>${formatNum(result.zScore, 3)}</td></tr>
      <tr><td>Finite Population Correction</td><td>${result.finiteApplied ? "Applied" : "Not Applied"}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:13px;color:#374151;">${result.interpretation}</p>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
