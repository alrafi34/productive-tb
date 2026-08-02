// ── Data Partition Calculator Logic ──

export type SizeUnit = "KB" | "MB" | "GB" | "TB" | "PB";
export const UNITS: SizeUnit[] = ["KB", "MB", "GB", "TB", "PB"];

const UNIT_TO_BYTES: Record<SizeUnit, number> = {
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
};

export function toBytes(value: number, unit: SizeUnit): number {
  return value * UNIT_TO_BYTES[unit];
}

export type CalcMode = "Partition Size" | "Number of Partitions" | "Records Per Partition" | "Total Storage" | "Balanced Distribution";
export const CALC_MODES: CalcMode[] = ["Partition Size", "Number of Partitions", "Records Per Partition", "Total Storage", "Balanced Distribution"];

export const MAX_PARTITIONS = 1_000_000;
export const MAX_DISPLAY_ROWS = 100;

export interface PartitionInputs {
  mode: CalcMode;
  totalDataSize: number;
  desiredPartitionSize: number;
  partitionSize: number;
  numberOfPartitions: number;
  totalRecords: number;
  unit: SizeUnit;
}

export interface DistributionRow {
  index: number;
  records: number;
}

export interface PartitionResult {
  mode: CalcMode;
  partitionSize: number | null; // in `unit`
  requiredPartitions: number | null;
  recordsPerPartition: number | null;
  totalStorage: number | null; // in `unit`
  unusedSpace: number | null; // in `unit`
  baseRecords: number | null;
  extraPartitions: number | null; // count of partitions with one extra record
  remaining: number | null;
  distributionRows: DistributionRow[];
  distributionTruncated: boolean;
  recommendation: string | null;
  error: string | null;
}

const RECOMMENDED_MIN_BYTES = 10 * 1024 ** 2; // 10 MB
const RECOMMENDED_MAX_BYTES = 1024 ** 3; // 1 GB

function sizeRecommendation(partitionBytes: number): string {
  if (partitionBytes > RECOMMENDED_MAX_BYTES) {
    return "Consider increasing the number of partitions for better performance — partitions larger than 1 GB can reduce parallelism.";
  }
  if (partitionBytes < RECOMMENDED_MIN_BYTES) {
    return "Consider decreasing the number of partitions — many small partitions under 10 MB can add unnecessary overhead.";
  }
  return "Partition size falls within the commonly recommended 10 MB – 1 GB range for balanced performance.";
}

export function calculatePartitions(inputs: PartitionInputs): PartitionResult {
  const empty: PartitionResult = {
    mode: inputs.mode, partitionSize: null, requiredPartitions: null, recordsPerPartition: null,
    totalStorage: null, unusedSpace: null, baseRecords: null, extraPartitions: null, remaining: null,
    distributionRows: [], distributionTruncated: false, recommendation: null, error: null,
  };

  const { mode, totalDataSize, desiredPartitionSize, partitionSize, numberOfPartitions, totalRecords } = inputs;

  if (mode === "Partition Size") {
    if (!Number.isFinite(totalDataSize) || totalDataSize <= 0) return { ...empty, error: "Total data size must be greater than zero." };
    if (!Number.isFinite(numberOfPartitions) || numberOfPartitions < 1) return { ...empty, error: "Number of partitions must be greater than zero." };
    if (numberOfPartitions > MAX_PARTITIONS) return { ...empty, error: `Number of partitions cannot exceed ${MAX_PARTITIONS.toLocaleString("en-US")}.` };

    const size = totalDataSize / numberOfPartitions;
    const bytes = toBytes(size, inputs.unit);
    return { ...empty, partitionSize: size, requiredPartitions: numberOfPartitions, totalStorage: totalDataSize, recommendation: sizeRecommendation(bytes) };
  }

  if (mode === "Number of Partitions") {
    if (!Number.isFinite(totalDataSize) || totalDataSize <= 0) return { ...empty, error: "Total data size must be greater than zero." };
    if (!Number.isFinite(desiredPartitionSize) || desiredPartitionSize <= 0) return { ...empty, error: "Desired partition size must be greater than zero." };

    const required = Math.ceil(totalDataSize / desiredPartitionSize);
    if (required > MAX_PARTITIONS) return { ...empty, error: `Required partitions (${required.toLocaleString("en-US")}) exceeds the maximum of ${MAX_PARTITIONS.toLocaleString("en-US")}.` };

    const avgPartition = totalDataSize / required;
    const bytes = toBytes(avgPartition, inputs.unit);
    return {
      ...empty, requiredPartitions: required, partitionSize: avgPartition, totalStorage: totalDataSize,
      unusedSpace: 0, recommendation: sizeRecommendation(bytes),
    };
  }

  if (mode === "Records Per Partition") {
    if (!Number.isFinite(totalRecords) || totalRecords <= 0) return { ...empty, error: "Total records must be greater than zero." };
    if (!Number.isFinite(numberOfPartitions) || numberOfPartitions < 1) return { ...empty, error: "Number of partitions must be greater than zero." };
    if (numberOfPartitions > MAX_PARTITIONS) return { ...empty, error: `Number of partitions cannot exceed ${MAX_PARTITIONS.toLocaleString("en-US")}.` };

    const perPartition = totalRecords / numberOfPartitions;
    return { ...empty, recordsPerPartition: perPartition, requiredPartitions: numberOfPartitions };
  }

  if (mode === "Total Storage") {
    if (!Number.isFinite(partitionSize) || partitionSize <= 0) return { ...empty, error: "Partition size must be greater than zero." };
    if (!Number.isFinite(numberOfPartitions) || numberOfPartitions < 1) return { ...empty, error: "Number of partitions must be greater than zero." };
    if (numberOfPartitions > MAX_PARTITIONS) return { ...empty, error: `Number of partitions cannot exceed ${MAX_PARTITIONS.toLocaleString("en-US")}.` };

    const total = partitionSize * numberOfPartitions;
    return { ...empty, totalStorage: total, requiredPartitions: numberOfPartitions, partitionSize };
  }

  // Balanced Distribution
  if (!Number.isFinite(totalRecords) || totalRecords <= 0) return { ...empty, error: "Total records must be greater than zero." };
  if (!Number.isFinite(numberOfPartitions) || numberOfPartitions < 1) return { ...empty, error: "Number of partitions must be greater than zero." };
  if (numberOfPartitions > MAX_PARTITIONS) return { ...empty, error: `Number of partitions cannot exceed ${MAX_PARTITIONS.toLocaleString("en-US")}.` };

  const totalRecordsInt = Math.floor(totalRecords);
  const baseRecords = Math.floor(totalRecordsInt / numberOfPartitions);
  const remaining = totalRecordsInt % numberOfPartitions;

  const rowCount = Math.min(numberOfPartitions, MAX_DISPLAY_ROWS);
  const distributionRows: DistributionRow[] = [];
  for (let i = 0; i < rowCount; i++) {
    distributionRows.push({ index: i + 1, records: i < remaining ? baseRecords + 1 : baseRecords });
  }

  return {
    ...empty, baseRecords, remaining, extraPartitions: remaining,
    recordsPerPartition: totalRecordsInt / numberOfPartitions,
    requiredPartitions: numberOfPartitions,
    distributionRows, distributionTruncated: numberOfPartitions > MAX_DISPLAY_ROWS,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function formatCompact(n: number | null): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function smartFormat(value: number, unit: SizeUnit, precision: number): string {
  const bytes = toBytes(Math.abs(value), unit);
  const sign = value < 0 ? "-" : "";
  if (bytes === 0) return `0 ${unit}`;
  const idx = Math.min(UNITS.length - 1, Math.max(0, Math.floor(Math.log(bytes) / Math.log(1024)) - 1));
  const displayUnit = UNITS[idx];
  const displayValue = bytes / UNIT_TO_BYTES[displayUnit];
  return `${sign}${displayValue.toFixed(precision)} ${displayUnit}`;
}

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5];
export const DEFAULT_PRECISION = 2;
export const DEFAULT_MODE: CalcMode = "Partition Size";
export const DEFAULT_UNIT: SizeUnit = "GB";
export const DEFAULT_TOTAL_DATA_SIZE = 500;
export const DEFAULT_DESIRED_PARTITION_SIZE = 128;
export const DEFAULT_PARTITION_SIZE = 50;
export const DEFAULT_NUMBER_OF_PARTITIONS = 10;
export const DEFAULT_TOTAL_RECORDS = 50_000_000;

export const PRESETS: { label: string; mode: CalcMode; totalDataSize: number; desiredPartitionSize: number; partitionSize: number; numberOfPartitions: number; totalRecords: number; unit: SizeUnit }[] = [
  { label: "500 GB / 10 Partitions", mode: "Partition Size", totalDataSize: 500, desiredPartitionSize: 128, partitionSize: 50, numberOfPartitions: 10, totalRecords: 50_000_000, unit: "GB" },
  { label: "2 TB / 200 GB Target", mode: "Number of Partitions", totalDataSize: 2048, desiredPartitionSize: 200, partitionSize: 50, numberOfPartitions: 10, totalRecords: 50_000_000, unit: "GB" },
  { label: "50M Records / 8 Partitions", mode: "Records Per Partition", totalDataSize: 500, desiredPartitionSize: 128, partitionSize: 50, numberOfPartitions: 8, totalRecords: 50_000_000, unit: "GB" },
  { label: "850 GB / 128 GB Target", mode: "Number of Partitions", totalDataSize: 850, desiredPartitionSize: 128, partitionSize: 50, numberOfPartitions: 10, totalRecords: 50_000_000, unit: "GB" },
];

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PartitionInputs;
  summary: string;
}

const STORAGE_KEY = "data-partition-calculator-history";

export function saveHistory(inputs: PartitionInputs, summary: string): void {
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), inputs, summary };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(result: PartitionResult, inputs: PartitionInputs, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Data Partition Report",
    "======================",
    `Generated: ${ts}`,
    `Mode: ${result.mode}`,
    "",
    ...(result.partitionSize !== null ? [`Partition Size: ${formatNum(result.partitionSize, precision)} ${inputs.unit}`] : []),
    ...(result.requiredPartitions !== null ? [`Partitions: ${formatNum(result.requiredPartitions, 0)}`] : []),
    ...(result.recordsPerPartition !== null ? [`Records Per Partition: ${formatNum(result.recordsPerPartition, precision)}`] : []),
    ...(result.totalStorage !== null ? [`Total Storage: ${formatNum(result.totalStorage, precision)} ${inputs.unit}`] : []),
    ...(result.unusedSpace !== null ? [`Unused Space: ${formatNum(result.unusedSpace, precision)} ${inputs.unit}`] : []),
    ...(result.remaining !== null ? [`Remaining Records (extra partitions): ${result.remaining}`] : []),
    "",
    ...(result.recommendation ? [`Recommendation: ${result.recommendation}`, ""] : []),
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: PartitionResult, inputs: PartitionInputs, precision: number): string {
  const rows: (string | number)[][] = [["Field", "Value"], ["Mode", result.mode]];
  if (result.partitionSize !== null) rows.push(["Partition Size", `${formatNum(result.partitionSize, precision)} ${inputs.unit}`]);
  if (result.requiredPartitions !== null) rows.push(["Partitions", result.requiredPartitions]);
  if (result.recordsPerPartition !== null) rows.push(["Records Per Partition", formatNum(result.recordsPerPartition, precision)]);
  if (result.totalStorage !== null) rows.push(["Total Storage", `${formatNum(result.totalStorage, precision)} ${inputs.unit}`]);
  if (result.unusedSpace !== null) rows.push(["Unused Space", `${formatNum(result.unusedSpace, precision)} ${inputs.unit}`]);
  if (result.distributionRows.length > 0) {
    rows.push([]);
    rows.push(["Partition #", "Records"]);
    result.distributionRows.forEach((r) => rows.push([r.index, r.records]));
  }
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: PartitionResult, inputs: PartitionInputs): string {
  return JSON.stringify(
    {
      mode: result.mode,
      inputs,
      partitionSize: result.partitionSize,
      requiredPartitions: result.requiredPartitions,
      recordsPerPartition: result.recordsPerPartition,
      totalStorage: result.totalStorage,
      unusedSpace: result.unusedSpace,
      baseRecords: result.baseRecords,
      remaining: result.remaining,
      distributionRows: result.distributionRows,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: PartitionResult, inputs: PartitionInputs, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const rows: [string, string][] = [];
  if (result.partitionSize !== null) rows.push(["Partition Size", `${formatNum(result.partitionSize, precision)} ${inputs.unit}`]);
  if (result.requiredPartitions !== null) rows.push(["Partitions", formatNum(result.requiredPartitions, 0)]);
  if (result.recordsPerPartition !== null) rows.push(["Records Per Partition", formatNum(result.recordsPerPartition, precision)]);
  if (result.totalStorage !== null) rows.push(["Total Storage", `${formatNum(result.totalStorage, precision)} ${inputs.unit}`]);
  if (result.unusedSpace !== null) rows.push(["Unused Space", `${formatNum(result.unusedSpace, precision)} ${inputs.unit}`]);
  const rowsHtml = rows.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");
  return `<!DOCTYPE html><html><head><title>Data Partition Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Data Partition Report</h1>
    <p class="meta">Generated ${ts} · Mode: ${result.mode}</p>
    <table>${rowsHtml}</table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
