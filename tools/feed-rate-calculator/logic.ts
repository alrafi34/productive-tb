import {
  FeedRateInputs,
  FeedRateResult,
  HistoryEntry,
  Material,
  MaterialData,
  FeedStatus,
} from "./types";

// ── Material database (chip loads in mm/tooth for end mills) ───────────────
export const MATERIAL_DATA: Record<Material, MaterialData> = {
  aluminum:        { label: "Aluminum",        minChipLoadMetric: 0.05, maxChipLoadMetric: 0.20, defaultChipLoadMetric: 0.08, note: "High speeds possible. Use sharp tools and lubrication." },
  "mild-steel":    { label: "Mild Steel",      minChipLoadMetric: 0.02, maxChipLoadMetric: 0.08, defaultChipLoadMetric: 0.04, note: "Use coolant. Good for general milling." },
  "carbon-steel":  { label: "Carbon Steel",    minChipLoadMetric: 0.02, maxChipLoadMetric: 0.07, defaultChipLoadMetric: 0.03, note: "Reduce chip load for harder grades." },
  "stainless-steel": { label: "Stainless Steel", minChipLoadMetric: 0.01, maxChipLoadMetric: 0.05, defaultChipLoadMetric: 0.025, note: "Use sharp tools and steady feed to avoid work hardening." },
  titanium:        { label: "Titanium",        minChipLoadMetric: 0.01, maxChipLoadMetric: 0.04, defaultChipLoadMetric: 0.02, note: "Low chip loads required. Use flood coolant." },
  brass:           { label: "Brass",           minChipLoadMetric: 0.04, maxChipLoadMetric: 0.15, defaultChipLoadMetric: 0.07, note: "Free-machining. Excellent surface finish achievable." },
  copper:          { label: "Copper",          minChipLoadMetric: 0.03, maxChipLoadMetric: 0.10, defaultChipLoadMetric: 0.05, note: "Tends to smear. Use sharp tools and light cuts." },
  "cast-iron":     { label: "Cast Iron",       minChipLoadMetric: 0.02, maxChipLoadMetric: 0.07, defaultChipLoadMetric: 0.04, note: "Dry machining preferred. Avoid coolant shock." },
  plastic:         { label: "Plastic",         minChipLoadMetric: 0.05, maxChipLoadMetric: 0.25, defaultChipLoadMetric: 0.10, note: "High speeds OK. Avoid heat buildup to prevent melting." },
  wood:            { label: "Wood",            minChipLoadMetric: 0.10, maxChipLoadMetric: 0.50, defaultChipLoadMetric: 0.20, note: "High chip loads possible. Use sharp carbide tools." },
  custom:          { label: "Custom Material", minChipLoadMetric: 0,    maxChipLoadMetric: 0,    defaultChipLoadMetric: 0,    note: "Enter your own chip load values." },
};

export const ALL_MATERIALS = Object.keys(MATERIAL_DATA) as Material[];

// ── Conversion ─────────────────────────────────────────────────────────────
const MM_TO_INCH = 1 / 25.4;
const INCH_TO_MM = 25.4;

// ── Core formula ───────────────────────────────────────────────────────────
/** Feed Rate = RPM × Flutes × Feed per Tooth */
export function calcFeedRate(rpm: number, flutes: number, feedPerTooth: number): number {
  return rpm * flutes * feedPerTooth;
}

// ── Feed status ────────────────────────────────────────────────────────────
export function getFeedStatus(chipLoadMm: number, material: Material): FeedStatus {
  const data = MATERIAL_DATA[material];
  if (material === "custom" || data.minChipLoadMetric === 0) return "unknown";
  if (chipLoadMm < data.minChipLoadMetric * 0.8) return "low";
  if (chipLoadMm > data.maxChipLoadMetric * 1.2) return "high";
  return "optimal";
}

export const STATUS_LABELS: Record<FeedStatus, string> = {
  low:     "Below Recommended",
  optimal: "Optimal Range",
  high:    "Above Recommended",
  unknown: "—",
};

export const STATUS_COLORS: Record<FeedStatus, string> = {
  low:     "bg-blue-100 text-blue-800 border-blue-200",
  optimal: "bg-green-100 text-green-800 border-green-200",
  high:    "bg-red-100 text-red-800 border-red-200",
  unknown: "bg-gray-100 text-gray-600 border-gray-200",
};

// ── Safety messages ────────────────────────────────────────────────────────
function getSafetyMessage(status: FeedStatus, material: Material): string {
  const mat = MATERIAL_DATA[material].label;
  switch (status) {
    case "optimal": return `Feed rate is within the recommended range for ${mat}.`;
    case "low":     return `Chip load is below recommended range for ${mat}. May cause rubbing and poor tool life.`;
    case "high":    return `Chip load exceeds recommended range for ${mat}. Risk of tool breakage and poor surface finish.`;
    default:        return "Verify chip load against material specifications.";
  }
}

function getHint(status: FeedStatus): string {
  switch (status) {
    case "optimal": return "Feed rate parameters are within the recommended range for good tool life and surface finish.";
    case "low":     return "Increase feed per tooth for better chip formation and to avoid rubbing.";
    case "high":    return "Reduce feed per tooth to extend tool life and prevent tool breakage.";
    default:        return "Select a material to get chip load recommendations.";
  }
}

// ── Main calculate function ────────────────────────────────────────────────
export function calculate(inputs: FeedRateInputs): FeedRateResult | null {
  const isMetric = inputs.unitSystem === "metric";
  const rpm = parseFloat(inputs.rpm);
  const flutes = parseFloat(inputs.flutes);
  const fpt = parseFloat(inputs.feedPerTooth);

  if (isNaN(rpm) || rpm <= 0) return null;
  if (isNaN(flutes) || flutes < 1) return null;
  if (isNaN(fpt) || fpt <= 0) return null;

  const feedRate = calcFeedRate(rpm, flutes, fpt);

  // Normalise chip load to mm for status check
  const chipLoadMm = isMetric ? fpt : fpt * INCH_TO_MM;
  const status = getFeedStatus(chipLoadMm, inputs.material);

  // Alt unit conversion
  const feedRateAlt = isMetric
    ? feedRate * MM_TO_INCH   // mm/min → in/min
    : feedRate * INCH_TO_MM;  // in/min → mm/min

  return {
    feedRate,
    feedRateAlt,
    status,
    safetyMessage: getSafetyMessage(status, inputs.material),
    hint: getHint(status),
  };
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validateRPM(val: string): string | null {
  if (!val || val.trim() === "") return "Spindle speed (RPM) is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "RPM must be greater than zero.";
  return null;
}

export function validateFlutes(val: string): string | null {
  if (!val || val.trim() === "") return "Number of flutes is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n < 1) return "Flutes must be at least 1.";
  if (!Number.isInteger(n)) return "Flutes must be a whole number.";
  return null;
}

export function validateFeedPerTooth(val: string): string | null {
  if (!val || val.trim() === "") return "Feed per tooth is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Feed per tooth must be greater than zero.";
  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────
export function formatNum(val: number, precision: number): string {
  if (!isFinite(val) || isNaN(val)) return "—";
  // Remove trailing zeros for clean engineering display
  const fixed = val.toFixed(precision);
  const num = parseFloat(fixed);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  });
}

// ── Debounce ───────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────
const HISTORY_KEY = "feed-rate-calc-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: FeedRateInputs, result: FeedRateResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {}
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export ─────────────────────────────────────────────────────────────────
export function exportToText(inputs: FeedRateInputs, result: FeedRateResult): string {
  const isMetric = inputs.unitSystem === "metric";
  const frUnit  = isMetric ? "mm/min" : "in/min";
  const fptUnit = isMetric ? "mm/tooth" : "in/tooth";
  const mat     = MATERIAL_DATA[inputs.material];

  const lines = [
    "=== Feed Rate Calculator Result ===",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "--- Inputs ---",
    `Material: ${mat.label}`,
    `Unit System: ${inputs.unitSystem}`,
    `Spindle Speed: ${inputs.rpm} RPM`,
    `Number of Flutes: ${inputs.flutes}`,
    `Feed per Tooth: ${inputs.feedPerTooth} ${fptUnit}`,
    `Decimal Precision: ${inputs.precision}`,
    "",
    "--- Results ---",
    `Feed Rate: ${formatNum(result.feedRate, inputs.precision)} ${frUnit}`,
    `Feed Rate (alt): ${formatNum(result.feedRateAlt, inputs.precision)} ${isMetric ? "in/min" : "mm/min"}`,
    `Status: ${STATUS_LABELS[result.status]}`,
    `Safety Note: ${result.safetyMessage}`,
    "",
    "--- Formula ---",
    `Feed Rate = RPM × Flutes × Feed per Tooth`,
    `= ${inputs.rpm} × ${inputs.flutes} × ${inputs.feedPerTooth}`,
    `= ${formatNum(result.feedRate, inputs.precision)} ${frUnit}`,
    "",
    "Generated by ProductiveToolbox.com",
  ];

  return lines.filter((l) => l !== "").join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
