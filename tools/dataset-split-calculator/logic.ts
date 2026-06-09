import type { SplitResult, HistoryEntry } from "./types";

// ── Formatting helpers ──────────────────────────────────────────────────────

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

// ── Core calculation ────────────────────────────────────────────────────────

/**
 * Calculates dataset splits with intelligent rounding so the total always
 * equals the original dataset size.
 */
export function calculateSplit(
  datasetSize: number,
  trainPct: number,
  valPct: number,
  testPct: number
): SplitResult {
  const trainExact = (datasetSize * trainPct) / 100;
  const valExact = (datasetSize * valPct) / 100;

  const trainCount = Math.round(trainExact);
  const valCount = Math.round(valExact);
  // Test absorbs any rounding remainder so totals always match
  const testCount = datasetSize - trainCount - valCount;

  return {
    trainCount,
    valCount,
    testCount,
    trainPct,
    valPct,
    testPct,
    total: datasetSize,
  };
}

// ── Ratio conversion ────────────────────────────────────────────────────────

/**
 * Converts a ratio string like "8:2" or "7:1.5:1.5" into percentages.
 * Returns null if the input is invalid.
 */
export function parseRatio(input: string): { train: number; val: number; test: number } | null {
  const parts = input
    .split(":")
    .map((p) => parseFloat(p.trim()))
    .filter((p) => !isNaN(p) && p >= 0);

  if (parts.length === 2) {
    const total = parts[0] + parts[1];
    if (total <= 0) return null;
    return {
      train: (parts[0] / total) * 100,
      val: 0,
      test: (parts[1] / total) * 100,
    };
  }

  if (parts.length === 3) {
    const total = parts[0] + parts[1] + parts[2];
    if (total <= 0) return null;
    return {
      train: (parts[0] / total) * 100,
      val: (parts[1] / total) * 100,
      test: (parts[2] / total) * 100,
    };
  }

  return null;
}

// ── Validation ──────────────────────────────────────────────────────────────

export function validateInputs(
  datasetSize: number,
  trainPct: number,
  valPct: number,
  testPct: number
): string | null {
  if (!datasetSize || datasetSize < 1) return "Dataset size must be at least 1.";
  if (!Number.isInteger(datasetSize)) return "Dataset size must be a whole number.";
  if (datasetSize > 1_000_000_000) return "Dataset size is too large (max 1 billion).";

  if (trainPct < 0 || valPct < 0 || testPct < 0)
    return "Percentages cannot be negative.";
  if (trainPct > 100 || valPct > 100 || testPct > 100)
    return "No single percentage can exceed 100%.";

  const total = trainPct + valPct + testPct;
  if (Math.abs(total - 100) > 0.01)
    return `Split percentages must total exactly 100% (currently ${total.toFixed(1)}%).`;

  return null;
}

// ── Recommendations ─────────────────────────────────────────────────────────

export interface SplitRec {
  label: string;
  description: string;
  color: string;
}

export function getRecommendation(
  datasetSize: number,
  trainPct: number,
  valPct: number
): SplitRec {
  const hasVal = valPct > 0;

  if (datasetSize >= 1_000_000) {
    return {
      label: "Very Large Dataset",
      description:
        "For very large datasets (1M+ samples), a 90/5/5 or 95/5 split keeps ample training data while still giving reliable evaluation.",
      color: "text-blue-700 bg-blue-50 border-blue-200",
    };
  }

  if (datasetSize >= 100_000) {
    if (!hasVal && trainPct >= 90) {
      return {
        label: "Good for Large Datasets",
        description:
          "A 90/10 split is suitable for large datasets where training data is abundant. The 10% test set still provides statistically significant results.",
        color: "text-green-700 bg-green-50 border-green-200",
      };
    }
    return {
      label: "Good for Large Datasets",
      description:
        "With 100K+ samples, a 70/15/15 or 80/10/10 split balances training power with rigorous validation and testing.",
      color: "text-green-700 bg-green-50 border-green-200",
    };
  }

  if (datasetSize >= 10_000) {
    if (hasVal && Math.abs(trainPct - 70) <= 5) {
      return {
        label: "Recommended Split",
        description:
          "For medium-sized datasets, a 70/15/15 split is commonly used to balance training performance and evaluation reliability.",
        color: "text-green-700 bg-green-50 border-green-200",
      };
    }
    if (!hasVal && Math.abs(trainPct - 80) <= 5) {
      return {
        label: "Standard ML Split",
        description:
          "The 80/20 split is the most widely used baseline in machine learning for medium datasets — simple and effective.",
        color: "text-green-700 bg-green-50 border-green-200",
      };
    }
    return {
      label: "Medium Dataset",
      description:
        "For datasets of this size, a 70/15/15 or 80/20 split is generally appropriate. Ensure your test set has at least 1,000 samples for reliable metrics.",
      color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    };
  }

  // small dataset
  if (datasetSize < 500) {
    return {
      label: "Small Dataset",
      description:
        "With fewer than 500 samples, consider k-fold cross-validation instead of a fixed split. If you must split, keep training data as large as possible (80%+).",
      color: "text-orange-700 bg-orange-50 border-orange-200",
    };
  }

  return {
    label: "Small–Medium Dataset",
    description:
      "For datasets under 10K samples, maximize training data. A 70/15/15 or 80/10/10 split is reasonable, but keep test set size in mind for statistical significance.",
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
  };
}

// ── Debounce ────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Export helpers ──────────────────────────────────────────────────────────

export function buildExportText(datasetSize: number, result: SplitResult): string {
  const lines = [
    "Dataset Split Report",
    "====================",
    `Dataset Size:     ${formatNumber(datasetSize)}`,
    "",
    `Training Set:     ${formatNumber(result.trainCount)} (${formatPct(result.trainPct)})`,
    result.valPct > 0
      ? `Validation Set:   ${formatNumber(result.valCount)} (${formatPct(result.valPct)})`
      : null,
    `Testing Set:      ${formatNumber(result.testCount)} (${formatPct(result.testPct)})`,
    "",
    `Total:            ${formatNumber(result.trainCount + result.valCount + result.testCount)}`,
    "",
    `Generated: ${new Date().toLocaleString("en-US")}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
  return lines;
}

export function buildExportCSV(result: SplitResult): string {
  const rows = [
    "Split,Count,Percentage",
    `Train,${result.trainCount},${result.trainPct}`,
  ];
  if (result.valPct > 0) {
    rows.push(`Validation,${result.valCount},${result.valPct}`);
  }
  rows.push(`Test,${result.testCount},${result.testPct}`);
  return rows.join("\n");
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType = "text/plain"
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── LocalStorage history ────────────────────────────────────────────────────

const HISTORY_KEY = "dataset-split-history";
const MAX_HISTORY = 10;

export function saveHistory(
  datasetSize: number,
  result: SplitResult
): void {
  try {
    const existing = getHistory();
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      datasetSize,
      mode: result.valPct > 0 ? "train-val-test" : "train-test",
      result,
      label: result.valPct > 0
        ? `${formatNumber(datasetSize)} → ${result.trainPct}/${result.valPct}/${result.testPct}`
        : `${formatNumber(datasetSize)} → ${result.trainPct}/${result.testPct}`,
    };
    const updated = [entry, ...existing].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // noop
  }
}

// ── Presets ──────────────────────────────────────────────────────────────────

export const PRESETS = [
  { label: "80/20", train: 80, val: 0, test: 20 },
  { label: "70/30", train: 70, val: 0, test: 30 },
  { label: "90/10", train: 90, val: 0, test: 10 },
  { label: "70/15/15", train: 70, val: 15, test: 15 },
  { label: "80/10/10", train: 80, val: 10, test: 10 },
  { label: "60/20/20", train: 60, val: 20, test: 20 },
] as const;
