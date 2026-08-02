// ── Big Data Throughput Calculator Logic ──

export type DatasetUnit = "KB" | "MB" | "GB" | "TB" | "PB";
export type ThroughputUnit = "KBps" | "MBps" | "GBps" | "TBps";
export type TimeUnit = "seconds" | "minutes" | "hours" | "days";
export type Mode = "throughput" | "required-throughput" | "time" | "dataset-size" | "compare";

export const DATASET_UNITS: DatasetUnit[] = ["KB", "MB", "GB", "TB", "PB"];
export const THROUGHPUT_UNITS: ThroughputUnit[] = ["KBps", "MBps", "GBps", "TBps"];
export const TIME_UNITS: TimeUnit[] = ["seconds", "minutes", "hours", "days"];

const BYTES_PER_UNIT: Record<DatasetUnit, number> = {
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
};

const BPS_PER_UNIT: Record<ThroughputUnit, number> = {
  KBps: 1024,
  MBps: 1024 ** 2,
  GBps: 1024 ** 3,
  TBps: 1024 ** 4,
};

const SECONDS_PER_UNIT: Record<TimeUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
};

export function datasetToBytes(value: number, unit: DatasetUnit): number {
  return value * BYTES_PER_UNIT[unit];
}

export function throughputToBps(value: number, unit: ThroughputUnit): number {
  return value * BPS_PER_UNIT[unit];
}

export function timeToSeconds(value: number, unit: TimeUnit): number {
  return value * SECONDS_PER_UNIT[unit];
}

export function bpsToUnit(bps: number, unit: ThroughputUnit): number {
  return bps / BPS_PER_UNIT[unit];
}

export function bytesToAuto(bytes: number): string {
  const units: DatasetUnit[] = ["KB", "MB", "GB", "TB", "PB"];
  if (bytes < 1024) return `${bytes.toFixed(0)} Bytes`;
  let unit: DatasetUnit = "KB";
  let val = bytes / 1024;
  for (const u of units) {
    if (val < 1024) { unit = u; break; }
    val /= 1024;
    unit = u;
  }
  return `${val.toFixed(2)} ${unit}`;
}

export interface DurationParts {
  seconds: number;
  totalSeconds: number;
  minutes: number;
  hours: number;
  days: number;
  human: string;
}

export function formatDuration(totalSeconds: number): DurationParts {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (parts.length === 0 || seconds > 0) parts.push(`${seconds < 1 && parts.length === 0 ? seconds.toFixed(2) : Math.round(seconds)}s`);
  return {
    seconds: totalSeconds % 60,
    totalSeconds,
    minutes: totalSeconds / 60,
    hours: totalSeconds / 3600,
    days: totalSeconds / 86400,
    human: parts.join(" "),
  };
}

export type SpeedClass = "Low" | "Medium" | "High" | "Very High";

export function classifySpeed(bps: number): SpeedClass {
  const mbps = bps / (1024 ** 2);
  if (mbps < 10) return "Low";
  if (mbps < 100) return "Medium";
  if (mbps < 1024) return "High";
  return "Very High";
}

export interface ThroughputResult {
  mode: Mode;
  datasetBytes: number;
  rawThroughputBps: number;
  effectiveThroughputBps: number;
  timeSeconds: number;
  workers: number;
  efficiencyPct: number;
  speedClass: SpeedClass;
  compareRows?: { throughputBps: number; effectiveBps: number; timeSeconds: number }[];
}

export interface ThroughputError {
  error: string;
}

export function isThroughputError(r: ThroughputResult | ThroughputError | null): r is ThroughputError {
  return r !== null && "error" in r;
}

function validateCommon(workers: number, efficiencyPct: number): string | null {
  if (!isFinite(workers) || workers < 1) return "Concurrency (workers) must be at least 1.";
  if (!isFinite(efficiencyPct) || efficiencyPct < 10 || efficiencyPct > 100) return "Efficiency must be between 10% and 100%.";
  return null;
}

export function calculateThroughput(
  datasetBytes: number, timeSeconds: number, workers: number, efficiencyPct: number, mode: "throughput" | "required-throughput"
): ThroughputResult | ThroughputError {
  const commonErr = validateCommon(workers, efficiencyPct);
  if (commonErr) return { error: commonErr };
  if (!isFinite(datasetBytes) || datasetBytes <= 0) return { error: "Dataset size must be greater than zero." };
  if (!isFinite(timeSeconds) || timeSeconds <= 0) return { error: "Processing time cannot be zero." };

  const efficiencyFrac = efficiencyPct / 100;
  const effectiveThroughputBps = datasetBytes / timeSeconds;
  const rawThroughputBps = effectiveThroughputBps / (workers * efficiencyFrac);

  return {
    mode, datasetBytes, timeSeconds, workers, efficiencyPct,
    rawThroughputBps, effectiveThroughputBps,
    speedClass: classifySpeed(effectiveThroughputBps),
  };
}

export function calculateTime(
  datasetBytes: number, rawThroughputBps: number, workers: number, efficiencyPct: number
): ThroughputResult | ThroughputError {
  const commonErr = validateCommon(workers, efficiencyPct);
  if (commonErr) return { error: commonErr };
  if (!isFinite(datasetBytes) || datasetBytes <= 0) return { error: "Dataset size must be greater than zero." };
  if (!isFinite(rawThroughputBps) || rawThroughputBps <= 0) return { error: "Please enter a valid throughput." };

  const efficiencyFrac = efficiencyPct / 100;
  const effectiveThroughputBps = rawThroughputBps * workers * efficiencyFrac;
  const timeSeconds = datasetBytes / effectiveThroughputBps;

  return {
    mode: "time", datasetBytes, timeSeconds, workers, efficiencyPct,
    rawThroughputBps, effectiveThroughputBps,
    speedClass: classifySpeed(effectiveThroughputBps),
  };
}

export function calculateDatasetSize(
  rawThroughputBps: number, timeSeconds: number, workers: number, efficiencyPct: number
): ThroughputResult | ThroughputError {
  const commonErr = validateCommon(workers, efficiencyPct);
  if (commonErr) return { error: commonErr };
  if (!isFinite(rawThroughputBps) || rawThroughputBps <= 0) return { error: "Please enter a valid throughput." };
  if (!isFinite(timeSeconds) || timeSeconds <= 0) return { error: "Processing time cannot be zero." };

  const efficiencyFrac = efficiencyPct / 100;
  const effectiveThroughputBps = rawThroughputBps * workers * efficiencyFrac;
  const datasetBytes = effectiveThroughputBps * timeSeconds;

  return {
    mode: "dataset-size", datasetBytes, timeSeconds, workers, efficiencyPct,
    rawThroughputBps, effectiveThroughputBps,
    speedClass: classifySpeed(effectiveThroughputBps),
  };
}

export function calculateCompare(
  datasetBytes: number, throughputValues: number[], workers: number, efficiencyPct: number
): ThroughputResult | ThroughputError {
  const commonErr = validateCommon(workers, efficiencyPct);
  if (commonErr) return { error: commonErr };
  if (!isFinite(datasetBytes) || datasetBytes <= 0) return { error: "Dataset size must be greater than zero." };
  const valid = throughputValues.filter((v) => isFinite(v) && v > 0);
  if (valid.length === 0) return { error: "Enter at least one valid throughput value to compare." };

  const efficiencyFrac = efficiencyPct / 100;
  const compareRows = valid.map((v) => {
    const effectiveBps = v * workers * efficiencyFrac;
    return { throughputBps: v, effectiveBps, timeSeconds: datasetBytes / effectiveBps };
  });
  const first = compareRows[0];

  return {
    mode: "compare", datasetBytes, timeSeconds: first.timeSeconds, workers, efficiencyPct,
    rawThroughputBps: first.throughputBps, effectiveThroughputBps: first.effectiveBps,
    speedClass: classifySpeed(first.effectiveBps),
    compareRows,
  };
}

// ── Formatting ──

export function formatNum(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Presets ──

export const SAMPLE_PRESETS: { name: string; mode: Mode; datasetValue: number; datasetUnit: DatasetUnit; throughputValue: number; throughputUnit: ThroughputUnit; timeValue: number; timeUnit: TimeUnit }[] = [
  { name: "1 TB in 2 Hours", mode: "required-throughput", datasetValue: 1, datasetUnit: "TB", throughputValue: 250, throughputUnit: "MBps", timeValue: 2, timeUnit: "hours" },
  { name: "500 GB @ 250 MB/s", mode: "time", datasetValue: 500, datasetUnit: "GB", throughputValue: 250, throughputUnit: "MBps", timeValue: 1, timeUnit: "hours" },
  { name: "10 TB in 30 Minutes", mode: "required-throughput", datasetValue: 10, datasetUnit: "TB", throughputValue: 250, throughputUnit: "MBps", timeValue: 30, timeUnit: "minutes" },
  { name: "750 GB in 90 Minutes", mode: "required-throughput", datasetValue: 750, datasetUnit: "GB", throughputValue: 250, throughputUnit: "MBps", timeValue: 90, timeUnit: "minutes" },
];

// ── LocalStorage: last-session input ──

const INPUT_KEY = "big-data-throughput-calculator-input";

export interface SavedInput {
  mode: Mode;
  datasetValue: string;
  datasetUnit: DatasetUnit;
  throughputValue: string;
  throughputUnit: ThroughputUnit;
  timeValue: string;
  timeUnit: TimeUnit;
  compareValues: string;
  workers: number;
  efficiencyPct: number;
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
  effectiveThroughputBps: number;
  timeSeconds: number;
}

const HISTORY_KEY = "big-data-throughput-calculator-history";

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
  p.set("mode", input.mode);
  p.set("dataset", input.datasetValue);
  p.set("datasetunit", input.datasetUnit);
  p.set("throughput", input.throughputValue);
  p.set("throughputunit", input.throughputUnit);
  p.set("time", input.timeValue);
  p.set("timeunit", input.timeUnit);
  p.set("workers", String(input.workers));
  p.set("eff", String(input.efficiencyPct));
  return url.toString();
}

export function parseShareParams(): SavedInput | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const mode = p.get("mode");
  if (!mode) return null;
  return {
    mode: mode as Mode,
    datasetValue: p.get("dataset") ?? "500",
    datasetUnit: (p.get("datasetunit") as DatasetUnit) ?? "GB",
    throughputValue: p.get("throughput") ?? "250",
    throughputUnit: (p.get("throughputunit") as ThroughputUnit) ?? "MBps",
    timeValue: p.get("time") ?? "1",
    timeUnit: (p.get("timeunit") as TimeUnit) ?? "hours",
    compareValues: "",
    workers: parseInt(p.get("workers") ?? "1", 10) || 1,
    efficiencyPct: parseInt(p.get("eff") ?? "100", 10) || 100,
  };
}

// ── Export helpers ──

const MODE_LABELS: Record<Mode, string> = {
  throughput: "Achieved Throughput",
  "required-throughput": "Required Throughput",
  time: "Processing Time",
  "dataset-size": "Dataset Size",
  compare: "Throughput Comparison",
};

export function buildTextReport(result: ThroughputResult): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Big Data Throughput Calculator Report",
    "=======================================",
    `Generated: ${ts}`,
    `Mode: ${MODE_LABELS[result.mode]}`,
    "",
    `Dataset Size: ${bytesToAuto(result.datasetBytes)}`,
    `Processing Time: ${formatDuration(result.timeSeconds).human}`,
    `Required/Effective Throughput: ${formatNum(bpsToUnit(result.effectiveThroughputBps, "MBps"))} MB/s`,
    `Per-Worker Throughput: ${formatNum(bpsToUnit(result.rawThroughputBps, "MBps"))} MB/s`,
    `Workers: ${result.workers}`,
    `Efficiency: ${result.efficiencyPct}%`,
    `Speed Classification: ${result.speedClass}`,
  ];
  if (result.compareRows) {
    lines.push("", "Throughput Comparison:", "Throughput (MB/s), Effective (MB/s), Time Required");
    result.compareRows.forEach((r) => {
      lines.push(`${formatNum(bpsToUnit(r.throughputBps, "MBps"))}, ${formatNum(bpsToUnit(r.effectiveBps, "MBps"))}, ${formatDuration(r.timeSeconds).human}`);
    });
  }
  lines.push("", "Generated by Big Data Throughput Calculator — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: ThroughputResult): string {
  if (result.compareRows) {
    const rows = ["Throughput (MB/s),Effective Throughput (MB/s),Time Required (s)"];
    result.compareRows.forEach((r) => rows.push(`${bpsToUnit(r.throughputBps, "MBps")},${bpsToUnit(r.effectiveBps, "MBps")},${r.timeSeconds}`));
    return rows.join("\n");
  }
  return [
    "Metric,Value",
    `Mode,${MODE_LABELS[result.mode]}`,
    `Dataset Size (Bytes),${result.datasetBytes}`,
    `Processing Time (s),${result.timeSeconds}`,
    `Effective Throughput (MB/s),${bpsToUnit(result.effectiveThroughputBps, "MBps")}`,
    `Per-Worker Throughput (MB/s),${bpsToUnit(result.rawThroughputBps, "MBps")}`,
    `Workers,${result.workers}`,
    `Efficiency (%),${result.efficiencyPct}`,
    `Speed Classification,${result.speedClass}`,
  ].join("\n");
}

export function buildJSONReport(result: ThroughputResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: ThroughputResult): string {
  const rowsHtml = result.compareRows
    ? `<table><thead><tr><th>Throughput (MB/s)</th><th>Effective (MB/s)</th><th>Time Required</th></tr></thead><tbody>
      ${result.compareRows.map((r) => `<tr><td>${formatNum(bpsToUnit(r.throughputBps, "MBps"))}</td><td>${formatNum(bpsToUnit(r.effectiveBps, "MBps"))}</td><td>${formatDuration(r.timeSeconds).human}</td></tr>`).join("")}
      </tbody></table>`
    : "";
  return `<!DOCTYPE html><html><head><title>Throughput Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Big Data Throughput Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Mode: ${MODE_LABELS[result.mode]}</p>
  <table>
    <tbody>
      <tr><td>Dataset Size</td><td>${bytesToAuto(result.datasetBytes)}</td></tr>
      <tr><td>Processing Time</td><td>${formatDuration(result.timeSeconds).human}</td></tr>
      <tr><td>Effective Throughput</td><td>${formatNum(bpsToUnit(result.effectiveThroughputBps, "MBps"))} MB/s</td></tr>
      <tr><td>Per-Worker Throughput</td><td>${formatNum(bpsToUnit(result.rawThroughputBps, "MBps"))} MB/s</td></tr>
      <tr><td>Workers</td><td>${result.workers}</td></tr>
      <tr><td>Efficiency</td><td>${result.efficiencyPct}%</td></tr>
      <tr><td>Speed Classification</td><td>${result.speedClass}</td></tr>
    </tbody>
  </table>
  ${rowsHtml}
  </body></html>`;
}
