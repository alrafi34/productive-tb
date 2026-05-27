import {
  DensityUnit,
  CompactionStandard,
  CalculatorInputs,
  CalculationResult,
  HistoryEntry,
} from "./types";

const HISTORY_KEY = "soil-compaction-ratio-history";
const MAX_HISTORY = 10;

// ── Unit display labels ───────────────────────────────────────────────────────

export const UNIT_LABELS: Record<DensityUnit, string> = {
  "g/cm3":  "g/cm³",
  "kg/m3":  "kg/m³",
  "lb/ft3": "lb/ft³",
};

export const ALL_UNITS: DensityUnit[] = ["g/cm3", "kg/m3", "lb/ft3"];

export const STANDARD_LABELS: Record<CompactionStandard, string> = {
  90:  "90% – Light Duty",
  92:  "92% – Subgrade",
  95:  "95% – Standard",
  98:  "98% – Heavy Duty",
  100: "100% – Maximum",
};

export const ALL_STANDARDS: CompactionStandard[] = [90, 92, 95, 98, 100];

// ── Soil presets (US defaults) ────────────────────────────────────────────────

export interface SoilPreset {
  label: string;
  description: string;
  fieldDensity: string;
  maxDensity: string;
  unit: DensityUnit;
}

export const SOIL_PRESETS: SoilPreset[] = [
  {
    label: "Sandy Soil",
    description: "Typical compacted sandy soil",
    fieldDensity: "1.75",
    maxDensity: "1.85",
    unit: "g/cm3",
  },
  {
    label: "Clay Soil",
    description: "Well-compacted clay",
    fieldDensity: "1.65",
    maxDensity: "1.75",
    unit: "g/cm3",
  },
  {
    label: "Silty Soil",
    description: "Typical silty soil",
    fieldDensity: "1.60",
    maxDensity: "1.70",
    unit: "g/cm3",
  },
  {
    label: "Gravel",
    description: "Compacted gravel base",
    fieldDensity: "1.90",
    maxDensity: "2.00",
    unit: "g/cm3",
  },
  {
    label: "Road Subgrade",
    description: "Highway subgrade fill",
    fieldDensity: "1.80",
    maxDensity: "1.95",
    unit: "g/cm3",
  },
  {
    label: "Embankment Fill",
    description: "Earthwork embankment",
    fieldDensity: "2.02",
    maxDensity: "2.08",
    unit: "g/cm3",
  },
];

// ── Core calculation ──────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const field = parseFloat(inputs.fieldDensity);
  const max   = parseFloat(inputs.maxDensity);

  if (isNaN(field) || isNaN(max) || field <= 0 || max <= 0) return null;

  const ratio      = (field / max) * 100;
  const difference = ratio - inputs.requiredStandard;

  // Status thresholds
  let status: CalculationResult["status"];
  let statusLabel: string;
  let engineeringNote: string;

  if (ratio >= inputs.requiredStandard) {
    status       = "pass";
    statusLabel  = "Acceptable Compaction";
    engineeringNote =
      ratio >= 98
        ? "Excellent compaction achieved. Suitable for critical structural applications."
        : "Compaction meets the required standard. Proceed with construction.";
  } else if (ratio >= inputs.requiredStandard - 2) {
    status       = "warning";
    statusLabel  = "Marginally Below Standard";
    engineeringNote =
      "Compaction is close to the requirement. Consider one additional compaction pass or verify testing procedure.";
  } else {
    status       = "fail";
    statusLabel  = "Below Required Standard";
    engineeringNote =
      "Additional compaction effort is required. Check moisture content and apply more compaction passes before retesting.";
  }

  const unitLabel = UNIT_LABELS[inputs.unit];

  const steps = [
    `Field Dry Density = ${fmt(field)} ${unitLabel}`,
    `Maximum Dry Density (MDD) = ${fmt(max)} ${unitLabel}`,
    `Compaction Ratio = (Field Density ÷ MDD) × 100`,
    `Compaction Ratio = (${fmt(field)} ÷ ${fmt(max)}) × 100`,
    `Compaction Ratio = ${fmt(ratio)}%`,
    `Required Standard = ${inputs.requiredStandard}%`,
    `Difference = ${fmt(ratio)} − ${inputs.requiredStandard} = ${fmt(difference)}%`,
    `Status: ${statusLabel}`,
  ];

  return {
    fieldDensity: field,
    maxDensity: max,
    unit: inputs.unit,
    requiredStandard: inputs.requiredStandard,
    compactionRatio: parseFloat(ratio.toFixed(2)),
    difference: parseFloat(difference.toFixed(2)),
    status,
    statusLabel,
    engineeringNote,
    steps,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(n: number, decimals = 2): string {
  return n.toFixed(decimals);
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── History ───────────────────────────────────────────────────────────────────

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  if (typeof window === "undefined") return;
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };
  const updated = [entry, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const u = UNIT_LABELS[inputs.unit];
  return [
    "SOIL COMPACTION RATIO REPORT",
    "=".repeat(40),
    "",
    "INPUTS:",
    `  Field Dry Density : ${fmt(result.fieldDensity)} ${u}`,
    `  Max Dry Density   : ${fmt(result.maxDensity)} ${u}`,
    `  Required Standard : ${result.requiredStandard}%`,
    "",
    "RESULTS:",
    `  Compaction Ratio  : ${fmt(result.compactionRatio)}%`,
    `  Difference        : ${fmt(result.difference)}%`,
    `  Status            : ${result.statusLabel}`,
    "",
    "ENGINEERING NOTE:",
    `  ${result.engineeringNote}`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function exportToCSV(inputs: CalculatorInputs, result: CalculationResult): string {
  const u = UNIT_LABELS[inputs.unit];
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Field Dry Density", fmt(result.fieldDensity), u],
    ["Max Dry Density",   fmt(result.maxDensity),   u],
    ["Required Standard", result.requiredStandard.toString(), "%"],
    ["Compaction Ratio",  fmt(result.compactionRatio), "%"],
    ["Difference",        fmt(result.difference), "%"],
    ["Status",            result.statusLabel, ""],
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

export function downloadFile(content: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildCopyText(inputs: CalculatorInputs, result: CalculationResult): string {
  const u = UNIT_LABELS[inputs.unit];
  return [
    "Soil Compaction Ratio Report",
    `Field Dry Density: ${fmt(result.fieldDensity)} ${u}`,
    `Maximum Dry Density: ${fmt(result.maxDensity)} ${u}`,
    `Compaction Ratio: ${fmt(result.compactionRatio)}%`,
    `Required Standard: ${result.requiredStandard}%`,
    `Status: ${result.statusLabel}`,
  ].join("\n");
}
