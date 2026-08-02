// ── Hadoop Storage Calculator Logic ──

export type StorageUnit = "MB" | "GB" | "TB" | "PB";
export const UNITS: StorageUnit[] = ["MB", "GB", "TB", "PB"];

const UNIT_TO_BYTES: Record<StorageUnit, number> = {
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
};

export function toBytes(value: number, unit: StorageUnit): number {
  return value * UNIT_TO_BYTES[unit];
}

export const REPLICATION_FACTORS = [1, 2, 3, 4, 5];
export const FORECAST_MILESTONES = [1, 2, 3, 5, 10];

export interface HadoopInputs {
  rawDataSize: number;
  unit: StorageUnit;
  replicationFactor: number;
  compressionRatio: number;
  reservedPercent: number;
  growthRatePercent: number;
  planningYears: number;
  overheadPercent: number;
}

export interface ForecastPoint {
  year: number;
  futureData: number;
  futureStorage: number;
}

export interface HadoopResult {
  inputs: HadoopInputs;
  effectiveData: number | null;
  replicatedStorage: number | null;
  reservedCapacity: number | null;
  overheadCapacity: number | null;
  totalRequiredStorage: number | null;
  storageSavings: number | null;
  futureData: number | null;
  futureStorage: number | null;
  forecast: ForecastPoint[];
  compressionComparison: { ratio: number; label: string; replicatedStorage: number }[];
  replicationComparison: { factor: number; replicatedStorage: number }[];
  recommendation: string | null;
  error: string | null;
}

export function calculateHadoopStorage(inputs: HadoopInputs): HadoopResult {
  const base: HadoopResult = {
    inputs, effectiveData: null, replicatedStorage: null, reservedCapacity: null,
    overheadCapacity: null, totalRequiredStorage: null, storageSavings: null,
    futureData: null, futureStorage: null, forecast: [], compressionComparison: [],
    replicationComparison: [], recommendation: null, error: null,
  };

  const { rawDataSize, replicationFactor, compressionRatio, reservedPercent, growthRatePercent, planningYears, overheadPercent } = inputs;

  if (!Number.isFinite(rawDataSize) || rawDataSize <= 0) {
    return { ...base, error: "Raw data size must be greater than zero." };
  }
  if (!Number.isFinite(replicationFactor) || replicationFactor < 1) {
    return { ...base, error: "Replication factor must be at least 1." };
  }
  if (!Number.isFinite(compressionRatio) || compressionRatio < 0.1 || compressionRatio > 1) {
    return { ...base, error: "Compression ratio must be between 0.1 and 1." };
  }
  if (!Number.isFinite(reservedPercent) || reservedPercent < 0 || reservedPercent > 50) {
    return { ...base, error: "Reserved free space must be between 0% and 50%." };
  }
  if (!Number.isFinite(planningYears) || planningYears < 1 || planningYears > 10) {
    return { ...base, error: "Planning period must be between 1 and 10 years." };
  }
  if (!Number.isFinite(overheadPercent) || overheadPercent < 0) {
    return { ...base, error: "Storage overhead cannot be negative." };
  }

  const effectiveData = rawDataSize * compressionRatio;
  const replicatedStorage = effectiveData * replicationFactor;
  const reservedCapacity = replicatedStorage * (reservedPercent / 100);
  const overheadCapacity = replicatedStorage * (overheadPercent / 100);
  const totalRequiredStorage = replicatedStorage + reservedCapacity + overheadCapacity;
  const storageSavings = rawDataSize * replicationFactor - replicatedStorage;

  const growthMultiplier = Math.pow(1 + growthRatePercent / 100, planningYears);
  const futureData = rawDataSize * growthMultiplier;
  const futureStorage = futureData * compressionRatio * replicationFactor;

  const forecast: ForecastPoint[] = FORECAST_MILESTONES.map((year) => {
    const fd = rawDataSize * Math.pow(1 + growthRatePercent / 100, year);
    return { year, futureData: fd, futureStorage: fd * compressionRatio * replicationFactor };
  });

  const compressionComparison = [1.0, 0.7, 0.5, 0.3].map((ratio) => ({
    ratio,
    label: ratio === 1.0 ? "No Compression" : `${Math.round((1 - ratio) * 100)}% Compression`,
    replicatedStorage: rawDataSize * ratio * replicationFactor,
  }));

  const replicationComparison = REPLICATION_FACTORS.map((factor) => ({
    factor,
    replicatedStorage: effectiveData * factor,
  }));

  let recommendation: string;
  if (reservedPercent < 10) {
    recommendation = "Reserved space below 10% increases the risk of cluster instability as disks approach capacity — consider raising it to at least 15–20%.";
  } else if (replicationFactor < 3) {
    recommendation = `A replication factor of ${replicationFactor} offers less fault tolerance than the Hadoop-recommended default of 3 — acceptable for non-critical or dev/test data.`;
  } else if (totalRequiredStorage / rawDataSize > 4) {
    recommendation = "Total required storage is more than 4× your raw data size — review your replication factor and reserved space settings if storage cost is a concern.";
  } else {
    recommendation = `Provision at least ${totalRequiredStorage.toFixed(1)} ${inputs.unit} today, and plan for ${futureStorage.toFixed(1)} ${inputs.unit} within ${planningYears} year${planningYears === 1 ? "" : "s"} at your current growth rate.`;
  }

  return {
    inputs, effectiveData, replicatedStorage, reservedCapacity, overheadCapacity,
    totalRequiredStorage, storageSavings, futureData, futureStorage, forecast,
    compressionComparison, replicationComparison, recommendation, error: null,
  };
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

// Smart unit formatting — express a size (already in `unit`) in the most readable unit.
export function smartFormat(value: number, unit: StorageUnit, precision: number): string {
  const bytes = toBytes(Math.abs(value), unit);
  const sign = value < 0 ? "-" : "";
  if (bytes === 0) return `0 ${unit}`;
  const idx = Math.min(UNITS.length - 1, Math.max(0, Math.floor(Math.log(bytes) / Math.log(1024)) - 2));
  const displayUnit = UNITS[idx];
  const displayValue = bytes / UNIT_TO_BYTES[displayUnit];
  return `${sign}${displayValue.toFixed(precision)} ${displayUnit}`;
}

export const PRECISION_OPTIONS = [0, 1, 2, 3];
export const DEFAULT_PRECISION = 1;
export const DEFAULT_RAW_DATA = 100;
export const DEFAULT_UNIT: StorageUnit = "TB";
export const DEFAULT_REPLICATION_FACTOR = 3;
export const DEFAULT_COMPRESSION_RATIO = 1.0;
export const DEFAULT_RESERVED_PERCENT = 15;
export const DEFAULT_GROWTH_PERCENT = 20;
export const DEFAULT_PLANNING_YEARS = 3;
export const DEFAULT_OVERHEAD_PERCENT = 0;

export const PRESETS: { label: string; rawDataSize: number; unit: StorageUnit; replicationFactor: number; compressionRatio: number }[] = [
  { label: "Small Cluster (5 TB)", rawDataSize: 5, unit: "TB", replicationFactor: 3, compressionRatio: 1.0 },
  { label: "Compressed Dataset (25 TB)", rawDataSize: 25, unit: "TB", replicationFactor: 3, compressionRatio: 0.5 },
  { label: "Enterprise Growth (100 TB)", rawDataSize: 100, unit: "TB", replicationFactor: 3, compressionRatio: 0.5 },
  { label: "Dev/Test Cluster (2 TB)", rawDataSize: 2, unit: "TB", replicationFactor: 2, compressionRatio: 1.0 },
];

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: HadoopInputs;
  totalRequiredStorage: number;
}

const STORAGE_KEY = "hadoop-storage-calculator-history";

export function saveHistory(result: HadoopResult): void {
  if (result.error || result.totalRequiredStorage === null) return;
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
    inputs: result.inputs,
    totalRequiredStorage: result.totalRequiredStorage,
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(result: HadoopResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { inputs } = result;
  const lines = [
    "Hadoop Storage Report",
    "======================",
    `Generated: ${ts}`,
    "",
    `Raw Data Size: ${formatNum(inputs.rawDataSize, precision)} ${inputs.unit}`,
    `Replication Factor: ${inputs.replicationFactor}`,
    `Compression Ratio: ${inputs.compressionRatio}`,
    `Reserved Free Space: ${inputs.reservedPercent}%`,
    `Storage Overhead: ${inputs.overheadPercent}%`,
    `Annual Growth: ${inputs.growthRatePercent}%`,
    `Planning Period: ${inputs.planningYears} year(s)`,
    "",
    `Effective Data: ${formatNum(result.effectiveData, precision)} ${inputs.unit}`,
    `Replicated Storage: ${formatNum(result.replicatedStorage, precision)} ${inputs.unit}`,
    `Reserved Capacity: ${formatNum(result.reservedCapacity, precision)} ${inputs.unit}`,
    `Storage Overhead: ${formatNum(result.overheadCapacity, precision)} ${inputs.unit}`,
    `Total Required Storage: ${formatNum(result.totalRequiredStorage, precision)} ${inputs.unit}`,
    `Storage Savings from Compression: ${formatNum(result.storageSavings, precision)} ${inputs.unit}`,
    `Future Data (${inputs.planningYears}y): ${formatNum(result.futureData, precision)} ${inputs.unit}`,
    `Future Cluster Size (${inputs.planningYears}y): ${formatNum(result.futureStorage, precision)} ${inputs.unit}`,
    "",
    ...(result.recommendation ? [`Recommendation: ${result.recommendation}`, ""] : []),
    "Formula: Total Storage = (Raw × Compression × Replication) + Reserved + Overhead",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: HadoopResult, precision: number): string {
  const { inputs } = result;
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Raw Data Size", `${formatNum(inputs.rawDataSize, precision)} ${inputs.unit}`],
    ["Replication Factor", inputs.replicationFactor],
    ["Compression Ratio", inputs.compressionRatio],
    ["Reserved Free Space (%)", inputs.reservedPercent],
    ["Storage Overhead (%)", inputs.overheadPercent],
    ["Annual Growth (%)", inputs.growthRatePercent],
    ["Planning Period (Years)", inputs.planningYears],
    ["Effective Data", `${formatNum(result.effectiveData, precision)} ${inputs.unit}`],
    ["Replicated Storage", `${formatNum(result.replicatedStorage, precision)} ${inputs.unit}`],
    ["Reserved Capacity", `${formatNum(result.reservedCapacity, precision)} ${inputs.unit}`],
    ["Storage Overhead", `${formatNum(result.overheadCapacity, precision)} ${inputs.unit}`],
    ["Total Required Storage", `${formatNum(result.totalRequiredStorage, precision)} ${inputs.unit}`],
    ["Storage Savings from Compression", `${formatNum(result.storageSavings, precision)} ${inputs.unit}`],
    ["Future Data", `${formatNum(result.futureData, precision)} ${inputs.unit}`],
    ["Future Cluster Size", `${formatNum(result.futureStorage, precision)} ${inputs.unit}`],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: HadoopResult): string {
  return JSON.stringify(
    {
      inputs: result.inputs,
      effectiveData: result.effectiveData,
      replicatedStorage: result.replicatedStorage,
      reservedCapacity: result.reservedCapacity,
      overheadCapacity: result.overheadCapacity,
      totalRequiredStorage: result.totalRequiredStorage,
      storageSavings: result.storageSavings,
      futureData: result.futureData,
      futureStorage: result.futureStorage,
      forecast: result.forecast,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: HadoopResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { inputs } = result;
  return `<!DOCTYPE html><html><head><title>Hadoop Storage Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Hadoop Storage Report</h1>
    <p class="meta">Generated ${ts} · RF=${inputs.replicationFactor}, Compression=${inputs.compressionRatio}</p>
    <table>
      <tr><td>Raw Data Size</td><td>${formatNum(inputs.rawDataSize, precision)} ${inputs.unit}</td></tr>
      <tr><td>Effective Data</td><td>${formatNum(result.effectiveData, precision)} ${inputs.unit}</td></tr>
      <tr><td>Replicated Storage</td><td><strong>${formatNum(result.replicatedStorage, precision)} ${inputs.unit}</strong></td></tr>
      <tr><td>Reserved Capacity</td><td>${formatNum(result.reservedCapacity, precision)} ${inputs.unit}</td></tr>
      <tr><td>Storage Overhead</td><td>${formatNum(result.overheadCapacity, precision)} ${inputs.unit}</td></tr>
      <tr><td>Total Required Storage</td><td><strong>${formatNum(result.totalRequiredStorage, precision)} ${inputs.unit}</strong></td></tr>
      <tr><td>Future Cluster Size (${inputs.planningYears}y)</td><td>${formatNum(result.futureStorage, precision)} ${inputs.unit}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
