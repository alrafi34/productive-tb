// ── Clustering Distance Calculator Logic ──

export type MetricId =
  | "euclidean" | "manhattan" | "minkowski" | "chebyshev" | "cosine"
  | "hamming" | "canberra" | "braycurtis" | "pearson" | "jaccard";

export interface MetricMeta {
  id: MetricId;
  label: string;
  formula: string;
  isSimilarity: boolean; // true if higher = more similar (cosine similarity, Pearson correlation)
}

export const METRICS: MetricMeta[] = [
  { id: "euclidean", label: "Euclidean Distance", formula: "√Σ(xᵢ − yᵢ)²", isSimilarity: false },
  { id: "manhattan", label: "Manhattan Distance", formula: "Σ|xᵢ − yᵢ|", isSimilarity: false },
  { id: "minkowski", label: "Minkowski Distance", formula: "(Σ|xᵢ − yᵢ|ᵖ)^(1/p)", isSimilarity: false },
  { id: "chebyshev", label: "Chebyshev Distance", formula: "max(|xᵢ − yᵢ|)", isSimilarity: false },
  { id: "cosine", label: "Cosine Similarity", formula: "(A · B) ÷ (‖A‖ × ‖B‖)", isSimilarity: true },
  { id: "hamming", label: "Hamming Distance", formula: "count(xᵢ ≠ yᵢ) ÷ n", isSimilarity: false },
  { id: "canberra", label: "Canberra Distance", formula: "Σ |xᵢ − yᵢ| ÷ (|xᵢ| + |yᵢ|)", isSimilarity: false },
  { id: "braycurtis", label: "Bray-Curtis Distance", formula: "Σ|xᵢ − yᵢ| ÷ Σ|xᵢ + yᵢ|", isSimilarity: false },
  { id: "pearson", label: "Pearson Correlation Distance", formula: "1 − Pearson(X, Y)", isSimilarity: false },
  { id: "jaccard", label: "Jaccard Distance", formula: "1 − (Σ min(xᵢ,yᵢ) ÷ Σ max(xᵢ,yᵢ))", isSimilarity: false },
];

export function getMetricMeta(id: MetricId): MetricMeta {
  return METRICS.find((m) => m.id === id) ?? METRICS[0];
}

// ── Vector parsing ───────────────────────────────────────────────────────

export interface ParsedVector {
  values: number[];
  invalid: boolean;
}

export function parseVector(text: string): ParsedVector {
  const tokens = text.trim().split(/[,\s]+/).filter(Boolean);
  const values: number[] = [];
  for (const t of tokens) {
    const n = parseFloat(t);
    if (!Number.isFinite(n)) return { values: [], invalid: true };
    values.push(n);
  }
  return { values, invalid: false };
}

// ── Distance computations ────────────────────────────────────────────────

export interface DistanceResult {
  metric: MetricId;
  value: number | null;
  steps: string[];
  error: string | null;
}

function dot(a: number[], b: number[]): number {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}
function norm(a: number[]): number {
  return Math.sqrt(a.reduce((s, v) => s + v * v, 0));
}
function mean(a: number[]): number {
  return a.reduce((s, v) => s + v, 0) / a.length;
}

export function computeDistance(metric: MetricId, a: number[], b: number[], minkowskiP: number): DistanceResult {
  const base: DistanceResult = { metric, value: null, steps: [], error: null };

  if (a.length === 0 || b.length === 0) {
    return { ...base, error: "Please enter at least one numeric value in each vector." };
  }
  if (a.length !== b.length) {
    return { ...base, error: "Both vectors must have the same number of dimensions." };
  }

  switch (metric) {
    case "euclidean": {
      const sqDiffs = a.map((v, i) => (v - b[i]) ** 2);
      const sum = sqDiffs.reduce((s, v) => s + v, 0);
      return { ...base, value: Math.sqrt(sum), steps: [
        `Σ(xᵢ − yᵢ)² = ${sqDiffs.map((v) => v.toFixed(4)).join(" + ")} = ${sum.toFixed(4)}`,
        `√${sum.toFixed(4)} = ${Math.sqrt(sum).toFixed(4)}`,
      ] };
    }
    case "manhattan": {
      const diffs = a.map((v, i) => Math.abs(v - b[i]));
      const sum = diffs.reduce((s, v) => s + v, 0);
      return { ...base, value: sum, steps: [`Σ|xᵢ − yᵢ| = ${diffs.map((v) => v.toFixed(4)).join(" + ")} = ${sum.toFixed(4)}`] };
    }
    case "minkowski": {
      if (!Number.isFinite(minkowskiP) || minkowskiP < 1) {
        return { ...base, error: "Minkowski parameter (p) must be 1 or greater." };
      }
      const powSum = a.reduce((s, v, i) => s + Math.abs(v - b[i]) ** minkowskiP, 0);
      const value = powSum ** (1 / minkowskiP);
      return { ...base, value, steps: [
        `Σ|xᵢ − yᵢ|^${minkowskiP} = ${powSum.toFixed(4)}`,
        `${powSum.toFixed(4)}^(1/${minkowskiP}) = ${value.toFixed(4)}`,
      ] };
    }
    case "chebyshev": {
      const diffs = a.map((v, i) => Math.abs(v - b[i]));
      const value = Math.max(...diffs);
      return { ...base, value, steps: [`max(|xᵢ − yᵢ|) = max(${diffs.map((v) => v.toFixed(4)).join(", ")}) = ${value.toFixed(4)}`] };
    }
    case "cosine": {
      const na = norm(a), nb = norm(b);
      if (na === 0 || nb === 0) return { ...base, error: "Cosine similarity is undefined for a zero vector." };
      const d = dot(a, b);
      const value = d / (na * nb);
      return { ...base, value, steps: [
        `A · B = ${d.toFixed(4)}`,
        `‖A‖ = ${na.toFixed(4)}, ‖B‖ = ${nb.toFixed(4)}`,
        `${d.toFixed(4)} ÷ (${na.toFixed(4)} × ${nb.toFixed(4)}) = ${value.toFixed(4)}`,
      ] };
    }
    case "hamming": {
      const mismatches = a.reduce((s, v, i) => s + (v !== b[i] ? 1 : 0), 0);
      const value = mismatches / a.length;
      return { ...base, value, steps: [`Mismatched positions: ${mismatches} of ${a.length} = ${value.toFixed(4)}`] };
    }
    case "canberra": {
      const terms = a.map((v, i) => {
        const denom = Math.abs(v) + Math.abs(b[i]);
        return denom === 0 ? 0 : Math.abs(v - b[i]) / denom;
      });
      const value = terms.reduce((s, v) => s + v, 0);
      return { ...base, value, steps: [`Σ |xᵢ − yᵢ| ÷ (|xᵢ| + |yᵢ|) = ${terms.map((v) => v.toFixed(4)).join(" + ")} = ${value.toFixed(4)}`] };
    }
    case "braycurtis": {
      const numerator = a.reduce((s, v, i) => s + Math.abs(v - b[i]), 0);
      const denominator = a.reduce((s, v, i) => s + Math.abs(v + b[i]), 0);
      if (denominator === 0) return { ...base, error: "Bray-Curtis distance is undefined when both vectors sum to zero." };
      const value = numerator / denominator;
      return { ...base, value, steps: [`${numerator.toFixed(4)} ÷ ${denominator.toFixed(4)} = ${value.toFixed(4)}`] };
    }
    case "pearson": {
      if (a.length < 2) return { ...base, error: "Pearson correlation requires at least two values per vector." };
      const ma = mean(a), mb = mean(b);
      const cov = a.reduce((s, v, i) => s + (v - ma) * (b[i] - mb), 0);
      const sa = Math.sqrt(a.reduce((s, v) => s + (v - ma) ** 2, 0));
      const sb = Math.sqrt(b.reduce((s, v) => s + (v - mb) ** 2, 0));
      if (sa === 0 || sb === 0) return { ...base, error: "Pearson correlation is undefined when a vector has zero variance." };
      const r = cov / (sa * sb);
      const value = 1 - r;
      return { ...base, value, steps: [
        `Pearson r = ${r.toFixed(4)}`,
        `1 − ${r.toFixed(4)} = ${value.toFixed(4)}`,
      ] };
    }
    case "jaccard": {
      const sumMin = a.reduce((s, v, i) => s + Math.min(v, b[i]), 0);
      const sumMax = a.reduce((s, v, i) => s + Math.max(v, b[i]), 0);
      if (sumMax === 0) return { ...base, error: "Jaccard distance is undefined when both vectors are entirely zero." };
      const similarity = sumMin / sumMax;
      const value = 1 - similarity;
      return { ...base, value, steps: [
        `Σ min(xᵢ, yᵢ) = ${sumMin.toFixed(4)}, Σ max(xᵢ, yᵢ) = ${sumMax.toFixed(4)}`,
        `1 − (${sumMin.toFixed(4)} ÷ ${sumMax.toFixed(4)}) = ${value.toFixed(4)}`,
      ] };
    }
    default:
      return base;
  }
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

export const PRECISION_OPTIONS = [2, 4, 6, 8];
export const DEFAULT_PRECISION = 4;
export const DEFAULT_MINKOWSKI_P = 3;
export const DEFAULT_VECTOR_A = "1,2,3";
export const DEFAULT_VECTOR_B = "4,6,8";

export const SAMPLES: { label: string; a: string; b: string; metric: MetricId }[] = [
  { label: "Euclidean Example", a: "1,2,3", b: "4,6,8", metric: "euclidean" },
  { label: "Manhattan Example", a: "3,5,1", b: "2,7,4", metric: "manhattan" },
  { label: "Cosine Example", a: "0.12,0.45,0.81", b: "0.15,0.48,0.75", metric: "cosine" },
  { label: "Chebyshev Example", a: "1,5,9,2", b: "4,3,7,6", metric: "chebyshev" },
];

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  metric: MetricId;
  a: string;
  b: string;
  value: number | null;
}

const STORAGE_KEY = "clustering-distance-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), ...entry };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(metric: MetricMeta, a: number[], b: number[], result: DistanceResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Clustering Distance Calculation Report",
    "========================================",
    `Generated: ${ts}`,
    "",
    `Metric: ${metric.label}`,
    `Vector A: ${a.join(", ")}`,
    `Vector B: ${b.join(", ")}`,
    `Dimensions: ${a.length}`,
    "",
    `Formula: ${metric.formula}`,
    ...result.steps,
    "",
    `Result: ${formatNum(result.value, precision)}`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(metric: MetricMeta, a: number[], b: number[], result: DistanceResult, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Metric", metric.label],
    ["Vector A", a.join(" ")],
    ["Vector B", b.join(" ")],
    ["Dimensions", a.length],
    ["Result", formatNum(result.value, precision)],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(metric: MetricMeta, a: number[], b: number[], result: DistanceResult): string {
  return JSON.stringify(
    { metric: metric.id, label: metric.label, vectorA: a, vectorB: b, dimensions: a.length, result: result.value, generatedAt: new Date().toISOString() },
    null,
    2
  );
}
