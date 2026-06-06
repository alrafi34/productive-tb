import { ThreadInputs, ThreadResult, HistoryEntry, CalcMode } from "./types";

// ── Standard metric thread pitches (diameter mm → standard pitch mm) ──────
export const METRIC_STANDARD: Record<number, number[]> = {
  1:    [0.25],
  1.2:  [0.25],
  1.4:  [0.3],
  1.6:  [0.35],
  1.8:  [0.35],
  2:    [0.4],
  2.5:  [0.45],
  3:    [0.5],
  3.5:  [0.6],
  4:    [0.7],
  5:    [0.8],
  6:    [1.0],
  7:    [1.0],
  8:    [1.25, 1.0],
  10:   [1.5, 1.25, 1.0],
  12:   [1.75, 1.5, 1.25],
  14:   [2.0, 1.5],
  16:   [2.0, 1.5],
  18:   [2.5, 2.0, 1.5],
  20:   [2.5, 2.0, 1.5],
  22:   [2.5, 2.0, 1.5],
  24:   [3.0, 2.0],
  27:   [3.0, 2.0],
  30:   [3.5, 2.0],
  33:   [3.5, 2.0],
  36:   [4.0, 3.0],
  39:   [4.0, 3.0],
  42:   [4.5, 3.0],
  45:   [4.5, 3.0],
  48:   [5.0, 3.0],
  52:   [5.0, 4.0],
  56:   [5.5, 4.0],
  60:   [5.5, 4.0],
  64:   [6.0, 4.0],
};

// ── Standard UNC/UNF TPI table (diameter inch → TPI) ─────────────────────
export const IMPERIAL_STANDARD: Array<{ label: string; diamInch: number; tpi: number; series: string }> = [
  { label: "#0",       diamInch: 0.060,  tpi: 80,  series: "UNF" },
  { label: "#1",       diamInch: 0.073,  tpi: 64,  series: "UNC" },
  { label: "#1",       diamInch: 0.073,  tpi: 72,  series: "UNF" },
  { label: "#2",       diamInch: 0.086,  tpi: 56,  series: "UNC" },
  { label: "#2",       diamInch: 0.086,  tpi: 64,  series: "UNF" },
  { label: "#3",       diamInch: 0.099,  tpi: 48,  series: "UNC" },
  { label: "#4",       diamInch: 0.112,  tpi: 40,  series: "UNC" },
  { label: "#4",       diamInch: 0.112,  tpi: 48,  series: "UNF" },
  { label: "#5",       diamInch: 0.125,  tpi: 40,  series: "UNC" },
  { label: "#6",       diamInch: 0.138,  tpi: 32,  series: "UNC" },
  { label: "#8",       diamInch: 0.164,  tpi: 32,  series: "UNC" },
  { label: "#10",      diamInch: 0.190,  tpi: 24,  series: "UNC" },
  { label: "#10",      diamInch: 0.190,  tpi: 32,  series: "UNF" },
  { label: "#12",      diamInch: 0.216,  tpi: 24,  series: "UNC" },
  { label: "1/4\"",    diamInch: 0.250,  tpi: 20,  series: "UNC" },
  { label: "1/4\"",    diamInch: 0.250,  tpi: 28,  series: "UNF" },
  { label: "5/16\"",   diamInch: 0.3125, tpi: 18,  series: "UNC" },
  { label: "5/16\"",   diamInch: 0.3125, tpi: 24,  series: "UNF" },
  { label: "3/8\"",    diamInch: 0.375,  tpi: 16,  series: "UNC" },
  { label: "3/8\"",    diamInch: 0.375,  tpi: 24,  series: "UNF" },
  { label: "7/16\"",   diamInch: 0.4375, tpi: 14,  series: "UNC" },
  { label: "7/16\"",   diamInch: 0.4375, tpi: 20,  series: "UNF" },
  { label: "1/2\"",    diamInch: 0.500,  tpi: 13,  series: "UNC" },
  { label: "1/2\"",    diamInch: 0.500,  tpi: 20,  series: "UNF" },
  { label: "9/16\"",   diamInch: 0.5625, tpi: 12,  series: "UNC" },
  { label: "9/16\"",   diamInch: 0.5625, tpi: 18,  series: "UNF" },
  { label: "5/8\"",    diamInch: 0.625,  tpi: 11,  series: "UNC" },
  { label: "5/8\"",    diamInch: 0.625,  tpi: 18,  series: "UNF" },
  { label: "3/4\"",    diamInch: 0.750,  tpi: 10,  series: "UNC" },
  { label: "3/4\"",    diamInch: 0.750,  tpi: 16,  series: "UNF" },
  { label: "7/8\"",    diamInch: 0.875,  tpi: 9,   series: "UNC" },
  { label: "7/8\"",    diamInch: 0.875,  tpi: 14,  series: "UNF" },
  { label: "1\"",      diamInch: 1.000,  tpi: 8,   series: "UNC" },
  { label: "1\"",      diamInch: 1.000,  tpi: 12,  series: "UNF" },
  { label: "1-1/8\"",  diamInch: 1.125,  tpi: 7,   series: "UNC" },
  { label: "1-1/4\"",  diamInch: 1.250,  tpi: 7,   series: "UNC" },
  { label: "1-3/8\"",  diamInch: 1.375,  tpi: 6,   series: "UNC" },
  { label: "1-1/2\"",  diamInch: 1.500,  tpi: 6,   series: "UNC" },
  { label: "1-3/4\"",  diamInch: 1.750,  tpi: 5,   series: "UNC" },
  { label: "2\"",      diamInch: 2.000,  tpi: 4.5, series: "UNC" },
];

// ── Find closest standard metric thread ───────────────────────────────────
export function findClosestMetricThread(diamMm: number, pitchMm: number): string {
  const diameters = Object.keys(METRIC_STANDARD).map(Number);
  let closestDiam = diameters[0];
  let minDiff = Infinity;
  for (const d of diameters) {
    const diff = Math.abs(d - diamMm);
    if (diff < minDiff) { minDiff = diff; closestDiam = d; }
  }
  const pitches = METRIC_STANDARD[closestDiam];
  let closestPitch = pitches[0];
  let minPDiff = Infinity;
  for (const p of pitches) {
    const diff = Math.abs(p - pitchMm);
    if (diff < minPDiff) { minPDiff = diff; closestPitch = p; }
  }
  return `M${closestDiam} × ${closestPitch}`;
}

// ── Find closest imperial standard ────────────────────────────────────────
export function findClosestImperialThread(tpi: number): string {
  let closest = IMPERIAL_STANDARD[0];
  let minDiff = Infinity;
  for (const entry of IMPERIAL_STANDARD) {
    const diff = Math.abs(entry.tpi - tpi);
    if (diff < minDiff) { minDiff = diff; closest = entry; }
  }
  return `${closest.label}-${closest.tpi} ${closest.series}`;
}

// ── Classify thread pitch ─────────────────────────────────────────────────
export function classifyThread(pitchMm: number): string {
  if (pitchMm < 0.5)  return "Extra Fine Thread";
  if (pitchMm < 1.0)  return "Fine Thread";
  if (pitchMm < 2.0)  return "Standard / Coarse Thread";
  if (pitchMm < 4.0)  return "Coarse Thread";
  return "Extra Coarse Thread";
}

// ── Core calculations ─────────────────────────────────────────────────────
export function calculate(inputs: ThreadInputs): ThreadResult | null {
  const { mode } = inputs;

  if (mode === "metric") {
    const pitch = parseFloat(inputs.metricPitch);
    const diam  = parseFloat(inputs.metricDiameter);
    if (isNaN(pitch) || pitch <= 0) return null;
    const tpi       = 25.4 / pitch;
    const pitchInch = pitch / 25.4;
    const designation = !isNaN(diam) && diam > 0
      ? `M${diam} × ${pitch}`
      : `Pitch = ${pitch} mm`;
    const closest = !isNaN(diam) && diam > 0
      ? findClosestMetricThread(diam, pitch)
      : findClosestMetricThread(6, pitch);
    return {
      mode,
      pitchMm: pitch,
      tpi,
      pitchInch,
      threadDesignation: designation,
      closestStandard: closest,
      formula: `TPI = 25.4 ÷ ${pitch} = ${(25.4 / pitch).toFixed(4)}`,
    };
  }

  if (mode === "imperial") {
    const count  = parseFloat(inputs.threadsCount);
    const length = inputs.measuredLength === "custom"
      ? parseFloat(inputs.customLength)
      : parseFloat(inputs.measuredLength);
    if (isNaN(count) || count <= 0) return null;
    if (isNaN(length) || length <= 0) return null;
    const tpi       = count / length;
    const pitchInch = 1 / tpi;
    const pitchMm   = pitchInch * 25.4;
    const closest   = findClosestImperialThread(tpi);
    return {
      mode,
      calculatedTPI: tpi,
      pitchFromTPI: pitchInch,
      pitchFromTPImm: pitchMm,
      closestStandard: closest,
      formula: `TPI = ${count} ÷ ${length}" = ${tpi.toFixed(4)} | Pitch = 1 ÷ ${tpi.toFixed(4)} = ${pitchInch.toFixed(6)}"`,
    };
  }

  if (mode === "measurement") {
    const dist = parseFloat(inputs.measuredDistance);
    if (isNaN(dist) || dist <= 0) return null;
    const pitchMm   = inputs.measurementUnit === "mm" ? dist : dist * 25.4;
    const pitchInch = inputs.measurementUnit === "inch" ? dist : dist / 25.4;
    const tpi       = 1 / pitchInch;
    const classification = classifyThread(pitchMm);
    const closest = findClosestImperialThread(tpi);
    return {
      mode,
      measuredPitchMm: pitchMm,
      measuredPitchInch: pitchInch,
      measuredTPI: tpi,
      threadClassification: classification,
      closestStandard: closest,
      formula: inputs.measurementUnit === "mm"
        ? `Pitch = ${dist} mm | TPI = 25.4 ÷ ${dist} = ${tpi.toFixed(4)}`
        : `Pitch = ${dist}" | TPI = 1 ÷ ${dist} = ${tpi.toFixed(4)}`,
    };
  }

  if (mode === "lead") {
    const pitch = parseFloat(inputs.leadPitch);
    if (isNaN(pitch) || pitch <= 0) return null;
    const starts  = inputs.threadStarts;
    const pitchMm = inputs.leadPitchUnit === "mm" ? pitch : pitch * 25.4;
    const leadMm  = pitchMm * starts;
    const leadInch = leadMm / 25.4;
    return {
      mode,
      leadMm,
      leadInch,
      formula: `Lead = Pitch × Starts = ${pitchMm.toFixed(4)} mm × ${starts} = ${leadMm.toFixed(4)} mm`,
    };
  }

  return null;
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validatePositive(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Please enter a ${label}.`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${label} must be a valid number.`;
  if (num <= 0) return `${label} must be greater than zero.`;
  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────
export function formatNum(value: number, decimals: number): string {
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.0001 && value !== 0)) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ── Debounce ───────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────
const HISTORY_KEY = "thread-pitch-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: ThreadInputs, result: ThreadResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ─────────────────────────────────────────────────────────────────
export function exportToText(inputs: ThreadInputs, result: ThreadResult): string {
  const p = inputs.precision;
  const lines: string[] = [
    "Thread Pitch Calculator – Result",
    "=".repeat(45),
    "",
  ];

  if (result.mode === "metric") {
    lines.push(`Mode         : Metric Thread Pitch`);
    lines.push(`Diameter     : ${inputs.metricDiameter} mm`);
    lines.push(`Pitch        : ${inputs.metricPitch} mm`);
    lines.push(`Designation  : ${result.threadDesignation}`);
    lines.push(`TPI          : ${formatNum(result.tpi!, p)}`);
    lines.push(`Pitch (inch) : ${formatNum(result.pitchInch!, p)}"`);
    lines.push(`Closest Std  : ${result.closestStandard}`);
  } else if (result.mode === "imperial") {
    lines.push(`Mode         : Imperial Thread Pitch (TPI)`);
    lines.push(`Threads      : ${inputs.threadsCount}`);
    lines.push(`Length       : ${inputs.measuredLength === "custom" ? inputs.customLength : inputs.measuredLength}"`);
    lines.push(`TPI          : ${formatNum(result.calculatedTPI!, p)}`);
    lines.push(`Pitch (inch) : ${formatNum(result.pitchFromTPI!, p)}"`);
    lines.push(`Pitch (mm)   : ${formatNum(result.pitchFromTPImm!, p)} mm`);
    lines.push(`Closest Std  : ${result.closestStandard}`);
  } else if (result.mode === "measurement") {
    lines.push(`Mode         : Thread Measurement`);
    lines.push(`Distance     : ${inputs.measuredDistance} ${inputs.measurementUnit}`);
    lines.push(`Pitch (mm)   : ${formatNum(result.measuredPitchMm!, p)} mm`);
    lines.push(`Pitch (inch) : ${formatNum(result.measuredPitchInch!, p)}"`);
    lines.push(`TPI          : ${formatNum(result.measuredTPI!, p)}`);
    lines.push(`Class        : ${result.threadClassification}`);
    lines.push(`Closest Std  : ${result.closestStandard}`);
  } else if (result.mode === "lead") {
    lines.push(`Mode         : Lead Calculator`);
    lines.push(`Pitch        : ${inputs.leadPitch} ${inputs.leadPitchUnit}`);
    lines.push(`Thread Starts: ${inputs.threadStarts}`);
    lines.push(`Lead (mm)    : ${formatNum(result.leadMm!, p)} mm`);
    lines.push(`Lead (inch)  : ${formatNum(result.leadInch!, p)}"`);
  }

  lines.push("");
  lines.push(`Formula: ${result.formula}`);
  lines.push("");
  lines.push("=".repeat(45));
  lines.push(`Generated: ${new Date().toLocaleString()}`);
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const MODE_LABELS: Record<string, string> = {
  metric:      "Metric Thread Pitch",
  imperial:    "Imperial Thread Pitch (TPI)",
  measurement: "Thread Measurement Calculator",
  lead:        "Lead Calculator",
};
