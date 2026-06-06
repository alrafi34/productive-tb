import type {
  AccuracyResult,
  ClassSummary,
  ComparisonRow,
  HistoryEntry,
} from "./types";

// ── Parsing ───────────────────────────────────────────────────────────────────
/**
 * Parse a free-form label string into an array of trimmed, normalised strings.
 * Supports: comma, newline, tab, space-separated, or bare digit runs.
 */
export function parseLabels(raw: string): string[] {
  if (!raw.trim()) return [];

  // If the input looks like a bare run of 0s and 1s with no delimiters (e.g. "10110")
  // treat each character as a separate label.
  const stripped = raw.trim();
  if (/^[01]+$/.test(stripped) && !stripped.includes(",") && !stripped.includes(" ") && !stripped.includes("\n")) {
    return stripped.split("");
  }

  // Split on comma, newline, tab, or multiple spaces
  return stripped
    .split(/[\n,\t]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Parse a CSV string with "actual,predicted" header (or two-column data).
 * Returns { actual[], predicted[] } or null on parse failure.
 */
export function parseCSV(raw: string): { actual: string[]; predicted: string[] } | null {
  const lines = raw.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return null;

  // Detect if first row is a header
  const first = lines[0].toLowerCase();
  const startIdx = first.includes("actual") || first.includes("predict") ? 1 : 0;
  const dataLines = lines.slice(startIdx);

  const actual: string[] = [];
  const predicted: string[] = [];

  for (const line of dataLines) {
    const parts = line.split(",");
    if (parts.length < 2) return null;
    actual.push(parts[0].trim());
    predicted.push(parts[1].trim());
  }

  return { actual, predicted };
}

// ── Core accuracy logic ───────────────────────────────────────────────────────
export function computeAccuracy(
  actualArr: string[],
  predictedArr: string[]
): AccuracyResult {
  const total = actualArr.length;
  const rows: ComparisonRow[] = [];
  let correct = 0;

  for (let i = 0; i < total; i++) {
    const a = actualArr[i];
    const p = predictedArr[i];
    const match = a === p;
    if (match) correct++;
    rows.push({ index: i + 1, actual: a, predicted: p, correct: match });
  }

  const incorrect = total - correct;
  const accuracy = total > 0 ? (correct / total) * 100 : 0;

  // Per-class breakdown
  const classMap: Record<string, { total: number; correct: number }> = {};
  for (const row of rows) {
    if (!classMap[row.actual]) classMap[row.actual] = { total: 0, correct: 0 };
    classMap[row.actual].total++;
    if (row.correct) classMap[row.actual].correct++;
  }
  const classSummary: ClassSummary[] = Object.entries(classMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, { total, correct: c }]) => ({
      label,
      total,
      correct: c,
      accuracy: total > 0 ? (c / total) * 100 : 0,
    }));

  // Tier
  let tier: AccuracyResult["tier"];
  let tierLabel: string;
  if (accuracy >= 90) { tier = "excellent"; tierLabel = "Excellent"; }
  else if (accuracy >= 75) { tier = "good"; tierLabel = "Good"; }
  else if (accuracy >= 50) { tier = "moderate"; tierLabel = "Moderate"; }
  else { tier = "poor"; tierLabel = "Poor"; }

  return { accuracy, correct, incorrect, total, rows, classSummary, tier, tierLabel };
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateLabels(
  actual: string[],
  predicted: string[]
): string | null {
  if (actual.length === 0 || predicted.length === 0) return "Please provide both actual and predicted labels.";
  if (actual.length !== predicted.length)
    return `Length mismatch: actual has ${actual.length} items, predicted has ${predicted.length}.`;
  return null;
}

// ── Formatting ────────────────────────────────────────────────────────────────
export function formatPct(n: number): string {
  return `${n.toFixed(2)}%`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ── Export helpers ────────────────────────────────────────────────────────────
export function buildExportText(result: AccuracyResult): string {
  return [
    "Model Accuracy Report",
    "=====================",
    `Accuracy:       ${formatPct(result.accuracy)}`,
    `Correct:        ${result.correct}`,
    `Incorrect:      ${result.incorrect}`,
    `Total Samples:  ${result.total}`,
    "",
    "Per-Class Accuracy",
    "------------------",
    ...result.classSummary.map(
      (c) => `  ${c.label.padEnd(12)} ${formatPct(c.accuracy)} (${c.correct}/${c.total})`
    ),
    "",
    "Row-by-Row Comparison",
    "---------------------",
    "Index  Actual      Predicted   Result",
    ...result.rows.map(
      (r) =>
        `${String(r.index).padEnd(7)}${r.actual.padEnd(12)}${r.predicted.padEnd(12)}${r.correct ? "✓" : "✗"}`
    ),
  ].join("\n");
}

export function buildExportCSV(result: AccuracyResult): string {
  const header = "index,actual,predicted,result";
  const rows = result.rows.map(
    (r) => `${r.index},${r.actual},${r.predicted},${r.correct ? "correct" : "wrong"}`
  );
  return [header, ...rows].join("\n");
}

export function downloadFile(content: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Example datasets ──────────────────────────────────────────────────────────
export const EXAMPLES = [
  {
    label: "Binary (80%)",
    actual: "1,1,0,1,0",
    predicted: "1,0,0,1,0",
  },
  {
    label: "Multi-class (75%)",
    actual: "cat,dog,dog,bird",
    predicted: "cat,dog,cat,bird",
  },
  {
    label: "Spam filter (75%)",
    actual: "spam,spam,ham,ham",
    predicted: "spam,ham,ham,ham",
  },
  {
    label: "10-sample (90%)",
    actual: "1,0,1,1,0,1,0,0,1,1",
    predicted: "1,0,1,1,0,1,0,1,1,1",
  },
  {
    label: "Perfect (100%)",
    actual: "yes,no,yes,yes,no",
    predicted: "yes,no,yes,yes,no",
  },
];

// ── LocalStorage history ──────────────────────────────────────────────────────
const HISTORY_KEY = "model-accuracy-calculator-history";
const MAX_HISTORY = 15;

export function saveHistory(result: AccuracyResult): void {
  if (typeof window === "undefined") return;
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    result,
    snippet: `${result.total} samples · ${formatPct(result.accuracy)}`,
  };
  const existing = getHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...existing].slice(0, MAX_HISTORY)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}
