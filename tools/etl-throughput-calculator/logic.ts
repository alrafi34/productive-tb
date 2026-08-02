// ── ETL Throughput Calculator Logic ──

export type Mode = "records" | "data" | "completion" | "capacity";

export const MODE_META: Record<Mode, { label: string; short: string; hint: string }> = {
  records: { label: "Records Throughput", short: "Records Throughput", hint: "Records/sec = Total Records ÷ Execution Time (sec)" },
  data: { label: "Data Size Throughput", short: "Data Throughput", hint: "MB/sec = Data Size (MB) ÷ Execution Time (sec)" },
  completion: { label: "Completion Time", short: "Completion Time", hint: "Completion Time = Total Records ÷ Processing Speed" },
  capacity: { label: "Capacity Planning", short: "Capacity Planning", hint: "Required Throughput = Peak Records ÷ Target SLA" },
};

export const MODE_ORDER: Mode[] = ["records", "data", "completion", "capacity"];

export type TimeUnit = "seconds" | "minutes" | "hours";

export const TIME_UNIT_META: Record<TimeUnit, { label: string; toSeconds: number }> = {
  seconds: { label: "Seconds", toSeconds: 1 },
  minutes: { label: "Minutes", toSeconds: 60 },
  hours: { label: "Hours", toSeconds: 3600 },
};

export const TIME_UNIT_ORDER: TimeUnit[] = ["seconds", "minutes", "hours"];

export type DataUnit = "MB" | "GB" | "TB";

export const DATA_UNIT_TO_MB: Record<DataUnit, number> = {
  MB: 1,
  GB: 1024,
  TB: 1024 * 1024,
};

export const DATA_UNIT_ORDER: DataUnit[] = ["MB", "GB", "TB"];

// ── Performance tiers ─────────────────────────────────────────────────────────

export interface Tier {
  key: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
  text: string;
  dot: string;
}

export const RECORD_TIERS: Tier[] = [
  { key: "low", label: "Low", emoji: "🔴", color: "#ef4444", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  { key: "good", label: "Good", emoji: "🟡", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  { key: "excellent", label: "Excellent", emoji: "🟢", color: "#058554", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
];

export function getRecordTier(recordsPerSec: number): Tier {
  if (recordsPerSec > 100000) return RECORD_TIERS[2];
  if (recordsPerSec >= 10000) return RECORD_TIERS[1];
  return RECORD_TIERS[0];
}

export function getDataTier(mbPerSec: number): Tier {
  if (mbPerSec > 100) return RECORD_TIERS[2];
  if (mbPerSec >= 10) return RECORD_TIERS[1];
  return RECORD_TIERS[0];
}

// ── Presets ────────────────────────────────────────────────────────────────────

export interface Preset {
  label: string;
  icon: string;
  mode: Mode;
  totalRecords?: number;
  executionTimeValue?: number;
  executionTimeUnit?: TimeUnit;
  dataSize?: number;
  dataSizeUnit?: DataUnit;
}

export const PRESETS: Preset[] = [
  { label: "Large Batch Job", icon: "📦", mode: "records", totalRecords: 5000000, executionTimeValue: 20, executionTimeUnit: "minutes" },
  { label: "Fast Ingestion Job", icon: "⚡", mode: "records", totalRecords: 800000, executionTimeValue: 240, executionTimeUnit: "seconds" },
  { label: "File Transfer Pipeline", icon: "🗄️", mode: "data", dataSize: 120, dataSizeUnit: "GB", executionTimeValue: 45, executionTimeUnit: "minutes" },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface EtlInputs {
  mode: Mode;
  decimalPrecision: number;

  // Records / Data modes
  totalRecords: number;
  executionTimeValue: number;
  executionTimeUnit: TimeUnit;
  dataSize: number;
  dataSizeUnit: DataUnit;

  // Completion mode
  datasetRecords: number;
  processingSpeed: number;
  desiredThroughput: number;

  // Capacity mode
  averageRecords: number;
  peakRecords: number;
  targetSlaValue: number;
  targetSlaUnit: TimeUnit;
  pipelineRuntimeValue: number;
  pipelineRuntimeUnit: TimeUnit;
  expectedGrowthPercent: number;
}

export interface EtlResult {
  // records/data modes
  recordsPerSecond: number | null;
  recordsPerMinute: number | null;
  recordsPerHour: number | null;
  dailyCapacityRecords: number | null;
  weeklyCapacityRecords: number | null;
  monthlyCapacityRecords: number | null;
  mbPerSecond: number | null;
  hourlyCapacityMB: number | null;
  dailyCapacityMB: number | null;
  weeklyCapacityMB: number | null;
  monthlyCapacityMB: number | null;
  recordTier: Tier | null;
  dataTier: Tier | null;

  // completion mode
  completionSeconds: number | null;
  desiredCompletionSeconds: number | null;
  meetsDesiredThroughput: boolean | null;

  // capacity mode
  currentThroughput: number | null;
  requiredThroughput: number | null;
  isSufficient: boolean | null;
  shortfallPercent: number | null;
  projectedPeakRecords: number | null;
  projectedRequiredThroughput: number | null;
  projectedIsSufficient: boolean | null;

  // chart trend (cumulative units over normalized time window)
  trend: number[];

  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: EtlInputs;
  result: EtlResult;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function toSeconds(value: number, unit: TimeUnit): number {
  return value * TIME_UNIT_META[unit].toSeconds;
}

export function toMB(value: number, unit: DataUnit): number {
  return value * DATA_UNIT_TO_MB[unit];
}

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatDecimal(n: number, precision: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function formatDataSize(mb: number, precision: number): string {
  const abs = Math.abs(mb);
  if (abs >= DATA_UNIT_TO_MB.TB) return `${formatDecimal(mb / DATA_UNIT_TO_MB.TB, precision)} TB`;
  if (abs >= DATA_UNIT_TO_MB.GB) return `${formatDecimal(mb / DATA_UNIT_TO_MB.GB, precision)} GB`;
  return `${formatDecimal(mb, precision)} MB`;
}

export function formatDuration(totalSeconds: number): string {
  if (!isFinite(totalSeconds)) return "∞";
  if (totalSeconds < 60) return `${totalSeconds.toFixed(1)} sec`;
  if (totalSeconds < 3600) return `${(totalSeconds / 60).toFixed(2)} min`;
  if (totalSeconds < 86400) return `${(totalSeconds / 3600).toFixed(2)} hr`;
  return `${(totalSeconds / 86400).toFixed(2)} days`;
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Validation ─────────────────────────────────────────────────────────────────

export function getWarning(inputs: EtlInputs): string | null {
  if (inputs.mode === "records") {
    if (inputs.totalRecords <= 0) return "Total records must be greater than zero.";
    if (inputs.executionTimeValue <= 0) return "Execution time must be greater than zero.";
  } else if (inputs.mode === "data") {
    if (inputs.dataSize <= 0) return "Data size must be greater than zero.";
    if (inputs.executionTimeValue <= 0) return "Execution time must be greater than zero.";
  } else if (inputs.mode === "completion") {
    if (inputs.datasetRecords <= 0) return "Dataset size must be greater than zero.";
    if (inputs.processingSpeed <= 0) return "Processing speed must be greater than zero.";
  } else if (inputs.mode === "capacity") {
    if (inputs.peakRecords <= 0) return "Peak records must be greater than zero.";
    if (inputs.targetSlaValue <= 0) return "Target SLA must be greater than zero.";
    if (inputs.pipelineRuntimeValue <= 0) return "Pipeline runtime must be greater than zero.";
  }
  return null;
}

// ── Main calculation ────────────────────────────────────────────────────────────

export function calculateEtl(inputs: EtlInputs): EtlResult {
  const warning = getWarning(inputs);

  const empty: EtlResult = {
    recordsPerSecond: null, recordsPerMinute: null, recordsPerHour: null,
    dailyCapacityRecords: null, weeklyCapacityRecords: null, monthlyCapacityRecords: null,
    mbPerSecond: null, hourlyCapacityMB: null, dailyCapacityMB: null, weeklyCapacityMB: null, monthlyCapacityMB: null,
    recordTier: null, dataTier: null,
    completionSeconds: null, desiredCompletionSeconds: null, meetsDesiredThroughput: null,
    currentThroughput: null, requiredThroughput: null, isSufficient: null, shortfallPercent: null,
    projectedPeakRecords: null, projectedRequiredThroughput: null, projectedIsSufficient: null,
    trend: [], formula: "", breakdown: "", warning,
  };

  if (inputs.mode === "records") {
    const totalRecords = Math.max(0, inputs.totalRecords);
    const seconds = Math.max(0.0001, toSeconds(inputs.executionTimeValue, inputs.executionTimeUnit));
    const recordsPerSecond = totalRecords / seconds;
    const recordsPerMinute = recordsPerSecond * 60;
    const recordsPerHour = recordsPerMinute * 60;

    const trend = Array.from({ length: 13 }, (_, i) => recordsPerSecond * (seconds * (i / 12)));

    return {
      ...empty,
      recordsPerSecond, recordsPerMinute, recordsPerHour,
      dailyCapacityRecords: recordsPerHour * 24,
      weeklyCapacityRecords: recordsPerHour * 24 * 7,
      monthlyCapacityRecords: recordsPerHour * 24 * 30,
      recordTier: getRecordTier(recordsPerSecond),
      trend,
      formula: "Records/sec = Total Records ÷ Execution Time (sec)",
      breakdown: `${formatFull(totalRecords)} ÷ ${seconds.toFixed(1)}s = ${recordsPerSecond.toFixed(2)} records/sec`,
      warning,
    };
  }

  if (inputs.mode === "data") {
    const dataSizeMB = toMB(Math.max(0, inputs.dataSize), inputs.dataSizeUnit);
    const seconds = Math.max(0.0001, toSeconds(inputs.executionTimeValue, inputs.executionTimeUnit));
    const mbPerSecond = dataSizeMB / seconds;
    const hourlyCapacityMB = mbPerSecond * 3600;

    const trend = Array.from({ length: 13 }, (_, i) => mbPerSecond * (seconds * (i / 12)));

    return {
      ...empty,
      mbPerSecond, hourlyCapacityMB,
      dailyCapacityMB: hourlyCapacityMB * 24,
      weeklyCapacityMB: hourlyCapacityMB * 24 * 7,
      monthlyCapacityMB: hourlyCapacityMB * 24 * 30,
      dataTier: getDataTier(mbPerSecond),
      trend,
      formula: "Throughput (MB/sec) = Data Size (MB) ÷ Execution Time (sec)",
      breakdown: `${formatDataSize(dataSizeMB, 2)} ÷ ${seconds.toFixed(1)}s = ${mbPerSecond.toFixed(2)} MB/sec`,
      warning,
    };
  }

  if (inputs.mode === "completion") {
    const datasetRecords = Math.max(0, inputs.datasetRecords);
    const speed = Math.max(0.0001, inputs.processingSpeed);
    const completionSeconds = datasetRecords / speed;
    const desiredCompletionSeconds = inputs.desiredThroughput > 0 ? datasetRecords / inputs.desiredThroughput : null;
    const meetsDesiredThroughput = inputs.desiredThroughput > 0 ? speed >= inputs.desiredThroughput : null;

    const trend = Array.from({ length: 13 }, (_, i) => speed * (completionSeconds * (i / 12)));

    return {
      ...empty,
      recordsPerSecond: speed,
      completionSeconds, desiredCompletionSeconds, meetsDesiredThroughput,
      recordTier: getRecordTier(speed),
      trend,
      formula: "Completion Time = Total Records ÷ Processing Speed",
      breakdown: `${formatFull(datasetRecords)} ÷ ${speed.toFixed(2)} records/sec = ${formatDuration(completionSeconds)}`,
      warning,
    };
  }

  // capacity mode
  const averageRecords = Math.max(0, inputs.averageRecords);
  const peakRecords = Math.max(0, inputs.peakRecords);
  const slaSeconds = Math.max(0.0001, toSeconds(inputs.targetSlaValue, inputs.targetSlaUnit));
  const runtimeSeconds = Math.max(0.0001, toSeconds(inputs.pipelineRuntimeValue, inputs.pipelineRuntimeUnit));

  const currentThroughput = averageRecords / runtimeSeconds;
  const requiredThroughput = peakRecords / slaSeconds;
  const isSufficient = currentThroughput >= requiredThroughput;
  const shortfallPercent = requiredThroughput > 0 ? ((requiredThroughput - currentThroughput) / requiredThroughput) * 100 : 0;

  const projectedPeakRecords = peakRecords * (1 + Math.max(0, inputs.expectedGrowthPercent) / 100);
  const projectedRequiredThroughput = projectedPeakRecords / slaSeconds;
  const projectedIsSufficient = currentThroughput >= projectedRequiredThroughput;

  const trend = Array.from({ length: 13 }, (_, i) => currentThroughput * (runtimeSeconds * (i / 12)));

  return {
    ...empty,
    currentThroughput, requiredThroughput, isSufficient, shortfallPercent,
    projectedPeakRecords, projectedRequiredThroughput, projectedIsSufficient,
    recordTier: getRecordTier(currentThroughput),
    trend,
    formula: "Required Throughput = Peak Records ÷ Target SLA (sec)",
    breakdown: `${formatFull(peakRecords)} ÷ ${slaSeconds.toFixed(1)}s = ${requiredThroughput.toFixed(2)} records/sec required (current: ${currentThroughput.toFixed(2)} records/sec)`,
    warning,
  };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: EtlInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", inputs.mode);
  url.searchParams.set("totalRecords", String(inputs.totalRecords));
  url.searchParams.set("execTime", String(inputs.executionTimeValue));
  url.searchParams.set("execUnit", inputs.executionTimeUnit);
  url.searchParams.set("dataSize", String(inputs.dataSize));
  url.searchParams.set("dataUnit", inputs.dataSizeUnit);
  url.searchParams.set("datasetRecords", String(inputs.datasetRecords));
  url.searchParams.set("speed", String(inputs.processingSpeed));
  url.searchParams.set("desired", String(inputs.desiredThroughput));
  url.searchParams.set("avgRecords", String(inputs.averageRecords));
  url.searchParams.set("peakRecords", String(inputs.peakRecords));
  url.searchParams.set("sla", String(inputs.targetSlaValue));
  url.searchParams.set("slaUnit", inputs.targetSlaUnit);
  url.searchParams.set("runtime", String(inputs.pipelineRuntimeValue));
  url.searchParams.set("runtimeUnit", inputs.pipelineRuntimeUnit);
  url.searchParams.set("growth", String(inputs.expectedGrowthPercent));
  return url.toString();
}

export function parseShareParams(): Partial<EtlInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const mode = p.get("mode");
  if (!mode) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  return {
    mode: (MODE_ORDER.includes(mode as Mode) ? mode : "records") as Mode,
    totalRecords: num("totalRecords", 5000000),
    executionTimeValue: num("execTime", 20),
    executionTimeUnit: (TIME_UNIT_ORDER.includes(p.get("execUnit") as TimeUnit) ? p.get("execUnit") : "minutes") as TimeUnit,
    dataSize: num("dataSize", 120),
    dataSizeUnit: (DATA_UNIT_ORDER.includes(p.get("dataUnit") as DataUnit) ? p.get("dataUnit") : "GB") as DataUnit,
    datasetRecords: num("datasetRecords", 1000000),
    processingSpeed: num("speed", 5000),
    desiredThroughput: num("desired", 0),
    averageRecords: num("avgRecords", 1000000),
    peakRecords: num("peakRecords", 2000000),
    targetSlaValue: num("sla", 30),
    targetSlaUnit: (TIME_UNIT_ORDER.includes(p.get("slaUnit") as TimeUnit) ? p.get("slaUnit") : "minutes") as TimeUnit,
    pipelineRuntimeValue: num("runtime", 10),
    pipelineRuntimeUnit: (TIME_UNIT_ORDER.includes(p.get("runtimeUnit") as TimeUnit) ? p.get("runtimeUnit") : "minutes") as TimeUnit,
    expectedGrowthPercent: num("growth", 20),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "etl-throughput-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: EtlResult, inputs: EtlInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const p = inputs.decimalPrecision;
  const lines = [
    "ETL Throughput Report",
    "======================",
    `Generated: ${ts}`,
    `Mode: ${MODE_META[inputs.mode].label}`,
    "",
  ];
  if (inputs.mode === "records" && result.recordsPerSecond !== null) {
    lines.push(
      `Records/sec: ${formatDecimal(result.recordsPerSecond, p)}`,
      `Records/min: ${formatDecimal(result.recordsPerMinute ?? 0, p)}`,
      `Records/hour: ${formatFull(result.recordsPerHour ?? 0)}`,
      `Daily Capacity: ${formatFull(result.dailyCapacityRecords ?? 0)} records`,
      `Weekly Capacity: ${formatFull(result.weeklyCapacityRecords ?? 0)} records`,
      `Monthly Capacity: ${formatFull(result.monthlyCapacityRecords ?? 0)} records`,
      `Performance: ${result.recordTier?.label}`
    );
  } else if (inputs.mode === "data" && result.mbPerSecond !== null) {
    lines.push(
      `Throughput: ${formatDecimal(result.mbPerSecond, p)} MB/sec`,
      `Hourly Capacity: ${formatDataSize(result.hourlyCapacityMB ?? 0, p)}`,
      `Daily Capacity: ${formatDataSize(result.dailyCapacityMB ?? 0, p)}`,
      `Weekly Capacity: ${formatDataSize(result.weeklyCapacityMB ?? 0, p)}`,
      `Monthly Capacity: ${formatDataSize(result.monthlyCapacityMB ?? 0, p)}`,
      `Performance: ${result.dataTier?.label}`
    );
  } else if (inputs.mode === "completion" && result.completionSeconds !== null) {
    lines.push(
      `Estimated Completion Time: ${formatDuration(result.completionSeconds)}`,
      result.desiredCompletionSeconds !== null ? `Completion Time at Desired Throughput: ${formatDuration(result.desiredCompletionSeconds)}` : "",
      result.meetsDesiredThroughput !== null ? `Meets Desired Throughput: ${result.meetsDesiredThroughput ? "Yes" : "No"}` : ""
    );
  } else if (inputs.mode === "capacity" && result.currentThroughput !== null) {
    lines.push(
      `Current Throughput: ${formatDecimal(result.currentThroughput, p)} records/sec`,
      `Required Throughput (SLA): ${formatDecimal(result.requiredThroughput ?? 0, p)} records/sec`,
      `Sufficient for Current SLA: ${result.isSufficient ? "Yes" : "No"}`,
      `Required Throughput After Growth: ${formatDecimal(result.projectedRequiredThroughput ?? 0, p)} records/sec`,
      `Sufficient After Growth: ${result.projectedIsSufficient ? "Yes" : "No"}`
    );
  }
  lines.push("", `Formula: ${result.formula}`, `Calculation: ${result.breakdown}`, "", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.filter(Boolean).join("\n");
}

export function buildCSVReport(result: EtlResult, inputs: EtlInputs): string {
  const rows: (string | number)[][] = [
    ["ETL Throughput Calculator Report", new Date().toISOString()],
    [],
    ["Mode", MODE_META[inputs.mode].label],
    [],
    ["Metric", "Value"],
  ];
  if (result.recordsPerSecond !== null) rows.push(["Records/sec", result.recordsPerSecond.toFixed(2)]);
  if (result.recordsPerMinute !== null) rows.push(["Records/min", result.recordsPerMinute.toFixed(2)]);
  if (result.recordsPerHour !== null) rows.push(["Records/hour", result.recordsPerHour.toFixed(2)]);
  if (result.mbPerSecond !== null) rows.push(["MB/sec", result.mbPerSecond.toFixed(2)]);
  if (result.completionSeconds !== null) rows.push(["Completion Time (sec)", result.completionSeconds.toFixed(2)]);
  if (result.currentThroughput !== null) rows.push(["Current Throughput (records/sec)", result.currentThroughput.toFixed(2)]);
  if (result.requiredThroughput !== null) rows.push(["Required Throughput (records/sec)", result.requiredThroughput.toFixed(2)]);
  rows.push(["Formula", result.formula]);
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: EtlResult, inputs: EtlInputs): string {
  return JSON.stringify(
    {
      mode: inputs.mode,
      results: {
        recordsPerSecond: result.recordsPerSecond,
        recordsPerMinute: result.recordsPerMinute,
        recordsPerHour: result.recordsPerHour,
        mbPerSecond: result.mbPerSecond,
        completionSeconds: result.completionSeconds,
        currentThroughput: result.currentThroughput,
        requiredThroughput: result.requiredThroughput,
        isSufficient: result.isSufficient,
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: EtlResult, inputs: EtlInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>ETL Throughput Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>ETL Throughput Report</h1>
    <p class="meta">Generated ${ts} — ${MODE_META[inputs.mode].label}</p>
    <h2>Formula</h2>
    <table>
      <tr><td>Formula</td><td>${result.formula}</td></tr>
      <tr><td>Calculation</td><td>${result.breakdown}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: EtlInputs = {
  mode: "records",
  decimalPrecision: 2,
  totalRecords: 5000000,
  executionTimeValue: 20,
  executionTimeUnit: "minutes",
  dataSize: 120,
  dataSizeUnit: "GB",
  datasetRecords: 1000000,
  processingSpeed: 5000,
  desiredThroughput: 0,
  averageRecords: 1000000,
  peakRecords: 2000000,
  targetSlaValue: 30,
  targetSlaUnit: "minutes",
  pipelineRuntimeValue: 10,
  pipelineRuntimeUnit: "minutes",
  expectedGrowthPercent: 20,
};
