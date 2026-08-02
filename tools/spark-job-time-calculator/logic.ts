// ── Spark Job Time Calculator Logic ──
// Uses a simplified, transparent execution model. Network throughput and per-core
// processing rate are fixed assumptions (documented in the UI) since Spark's real
// runtime depends on many factors this browser-only estimator cannot observe.

export type DatasetUnit = "KB" | "MB" | "GB" | "TB" | "PB";
export type StorageType = "Local Disk" | "HDFS" | "S3" | "Azure Blob" | "Google Cloud Storage" | "Delta Lake" | "Iceberg" | "Parquet" | "ORC" | "CSV" | "JSON";
export type CompressionType = "None" | "Snappy" | "Gzip" | "LZ4" | "ZSTD";
export type ClusterManager = "Standalone" | "YARN" | "Kubernetes" | "Mesos" | "Databricks" | "EMR" | "Synapse";
export type Complexity = "Very Low" | "Low" | "Medium" | "High" | "Very High";
export type ShuffleIntensity = "None" | "Low" | "Medium" | "High" | "Very High";
export type Bottleneck = "Read" | "Processing" | "Shuffle" | "Write";

export const DATASET_UNITS: DatasetUnit[] = ["KB", "MB", "GB", "TB", "PB"];
export const STORAGE_TYPES: StorageType[] = ["Local Disk", "HDFS", "S3", "Azure Blob", "Google Cloud Storage", "Delta Lake", "Iceberg", "Parquet", "ORC", "CSV", "JSON"];
export const COMPRESSION_TYPES: CompressionType[] = ["None", "Snappy", "Gzip", "LZ4", "ZSTD"];
export const CLUSTER_MANAGERS: ClusterManager[] = ["Standalone", "YARN", "Kubernetes", "Mesos", "Databricks", "EMR", "Synapse"];
export const COMPLEXITIES: Complexity[] = ["Very Low", "Low", "Medium", "High", "Very High"];
export const SHUFFLE_INTENSITIES: ShuffleIntensity[] = ["None", "Low", "Medium", "High", "Very High"];

const BYTES_PER_UNIT: Record<DatasetUnit, number> = { KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4, PB: 1024 ** 5 };

export function datasetToMB(value: number, unit: DatasetUnit): number {
  return (value * BYTES_PER_UNIT[unit]) / (1024 ** 2);
}

const COMPLEXITY_FACTOR: Record<Complexity, number> = { "Very Low": 0.6, Low: 0.8, Medium: 1.0, High: 1.5, "Very High": 2.2 };
const SHUFFLE_MULTIPLIER: Record<ShuffleIntensity, number> = { None: 0, Low: 0.2, Medium: 0.5, High: 1.0, "Very High": 1.8 };

const STORAGE_READ_MULTIPLIER: Record<StorageType, number> = {
  "Local Disk": 1.1, HDFS: 1.0, S3: 0.9, "Azure Blob": 0.9, "Google Cloud Storage": 0.9,
  "Delta Lake": 1.2, Iceberg: 1.2, Parquet: 1.3, ORC: 1.3, CSV: 0.7, JSON: 0.6,
};

const COMPRESSION_RATIO: Record<CompressionType, number> = { None: 1.0, Snappy: 0.5, Gzip: 0.35, LZ4: 0.55, ZSTD: 0.4 };
const COMPRESSION_CPU_OVERHEAD: Record<CompressionType, number> = { None: 1.0, Snappy: 1.05, Gzip: 1.15, LZ4: 1.03, ZSTD: 1.08 };

const NETWORK_THROUGHPUT_MBPS = 300;
const BASE_MB_PER_CORE_SEC = 20;

export interface SparkJobParams {
  dataSizeMB: number;
  storageType: StorageType;
  compression: CompressionType;
  executors: number;
  executorCores: number;
  executorMemoryGB: number;
  driverMemoryGB: number;
  dynamicAllocation: boolean;
  clusterManager: ClusterManager;
  complexity: Complexity;
  shuffleIntensity: ShuffleIntensity;
  stages: number;
  wideTransformations: boolean;
  narrowTransformations: boolean;
  cachingUsed: boolean;
  broadcastJoins: boolean;
  partitionCount: number;
  ioThroughputMBps: number;
}

export interface SparkJobResult {
  parallelism: number;
  readTimeSec: number;
  processingTimeSec: number;
  shuffleTimeSec: number;
  writeTimeSec: number;
  overheadSec: number;
  totalRuntimeSec: number;
  overheadFraction: number;
  cpuUtilizationPct: number;
  efficiencyScore: number;
  bottleneck: Bottleneck;
  recommendation: string;
  partitionRecommendation: string;
  idealPartitionMin: number;
  idealPartitionMax: number;
}

export interface SparkJobError {
  error: string;
}

export function isSparkJobError(r: SparkJobResult | SparkJobError | null): r is SparkJobError {
  return r !== null && "error" in r;
}

const BOTTLENECK_RECOMMENDATIONS: Record<Bottleneck, string> = {
  Read: "Increase I/O throughput, switch to a columnar format like Parquet or ORC, or enable a faster compression codec.",
  Processing: "Reduce processing complexity, increase executor cores, or optimize expensive transformations and UDFs.",
  Shuffle: "Increase partition count, enable broadcast joins for small tables, or reduce wide transformations that trigger shuffles.",
  Write: "Increase write throughput, use a faster storage format, or write compressed output to reduce bytes written.",
};

export function calculateSparkJobTime(p: SparkJobParams): SparkJobResult | SparkJobError {
  if (!isFinite(p.executors) || p.executors < 1) return { error: "Executor count must be greater than zero." };
  if (!isFinite(p.executorCores) || p.executorCores < 1) return { error: "Executor core count must be greater than zero." };
  if (!isFinite(p.dataSizeMB) || p.dataSizeMB <= 0) return { error: "Please enter a valid dataset size." };
  if (!isFinite(p.ioThroughputMBps) || p.ioThroughputMBps <= 0) return { error: "Please enter a valid I/O throughput." };
  if (!isFinite(p.stages) || p.stages < 1) return { error: "Number of stages must be at least 1." };
  if (!isFinite(p.partitionCount) || p.partitionCount < 1) return { error: "Partition count must be at least 1." };

  const parallelism = p.executors * p.executorCores;
  const complexityFactor = COMPLEXITY_FACTOR[p.complexity];
  const shuffleMultiplier = SHUFFLE_MULTIPLIER[p.shuffleIntensity];
  const storageMultiplier = STORAGE_READ_MULTIPLIER[p.storageType];
  const compressionRatio = COMPRESSION_RATIO[p.compression];
  const compressionCpuOverhead = COMPRESSION_CPU_OVERHEAD[p.compression];

  // Read Time = compressed-on-disk size ÷ effective read throughput
  const effectiveReadThroughput = p.ioThroughputMBps * storageMultiplier;
  const onDiskSizeMB = p.dataSizeMB * compressionRatio;
  const readTimeSec = onDiskSizeMB / effectiveReadThroughput;

  // Processing Time = (data size × complexity factor × decompression overhead) ÷ total CPU capacity
  let processingTimeSec = (p.dataSizeMB * complexityFactor * compressionCpuOverhead) / (parallelism * BASE_MB_PER_CORE_SEC);
  if (p.cachingUsed) processingTimeSec *= 0.85;

  // Shuffle Time = shuffle data ÷ network throughput, reduced by broadcast joins
  let shuffleTimeSec = (p.dataSizeMB * shuffleMultiplier) / NETWORK_THROUGHPUT_MBPS;
  if (p.broadcastJoins) shuffleTimeSec *= 0.3;

  // Write Time = output size ÷ write throughput (assumes output ≈ input size, written uncompressed on disk target)
  const writeThroughput = effectiveReadThroughput * 0.85;
  const writeTimeSec = p.dataSizeMB / writeThroughput;

  const subtotalSec = readTimeSec + processingTimeSec + shuffleTimeSec + writeTimeSec;
  const overheadFraction = 0.05 + Math.min(1, p.stages / 40) * 0.10;
  const overheadSec = subtotalSec * overheadFraction;
  const totalRuntimeSec = subtotalSec + overheadSec;

  const phases: { name: Bottleneck; value: number }[] = [
    { name: "Read", value: readTimeSec },
    { name: "Processing", value: processingTimeSec },
    { name: "Shuffle", value: shuffleTimeSec },
    { name: "Write", value: writeTimeSec },
  ];
  const bottleneck = phases.reduce((a, b) => (b.value > a.value ? b : a)).name;

  const idealPartitionMin = parallelism * 2;
  const idealPartitionMax = parallelism * 4;
  let partitionRecommendation: string;
  if (p.partitionCount < parallelism) {
    partitionRecommendation = `Too few partitions for your parallelism — increase to at least ${idealPartitionMin} for better core utilization.`;
  } else if (p.partitionCount > idealPartitionMax * 3) {
    partitionRecommendation = `Too many small partitions can increase scheduling overhead — consider reducing toward ${idealPartitionMax}.`;
  } else if (p.partitionCount < idealPartitionMin) {
    partitionRecommendation = `Slightly under-partitioned — consider increasing toward ${idealPartitionMin}–${idealPartitionMax} for smoother parallelism.`;
  } else {
    partitionRecommendation = `Partition count looks well-tuned for ${parallelism} available cores.`;
  }

  let efficiencyScore = 100;
  if (p.partitionCount < parallelism) efficiencyScore -= 25;
  else if (p.partitionCount > idealPartitionMax * 3) efficiencyScore -= 15;
  else if (p.partitionCount < idealPartitionMin) efficiencyScore -= 10;
  if ((p.shuffleIntensity === "High" || p.shuffleIntensity === "Very High") && !p.broadcastJoins) efficiencyScore -= 15;
  if (p.cachingUsed) efficiencyScore += 5;
  if (p.wideTransformations && !p.cachingUsed) efficiencyScore -= 5;
  if (p.narrowTransformations && !p.wideTransformations) efficiencyScore += 5;
  efficiencyScore = Math.max(0, Math.min(100, efficiencyScore));

  const cpuUtilizationPct = Math.max(0, Math.min(100, (processingTimeSec / totalRuntimeSec) * 100 + (1 - overheadFraction) * 20));

  return {
    parallelism, readTimeSec, processingTimeSec, shuffleTimeSec, writeTimeSec, overheadSec, totalRuntimeSec, overheadFraction,
    cpuUtilizationPct, efficiencyScore, bottleneck, recommendation: BOTTLENECK_RECOMMENDATIONS[bottleneck],
    partitionRecommendation, idealPartitionMin, idealPartitionMax,
  };
}

// ── Formatting ──

export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = Math.round(s % 60);
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (parts.length === 0 || seconds > 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}

export function formatNum(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Presets ──

export interface SparkPreset {
  name: string;
  dataSizeValue: number;
  dataSizeUnit: DatasetUnit;
  executors: number;
  executorCores: number;
  complexity: Complexity;
  shuffleIntensity: ShuffleIntensity;
}

export const SAMPLE_PRESETS: SparkPreset[] = [
  { name: "Development Job (12 GB, 2 Executors)", dataSizeValue: 12, dataSizeUnit: "GB", executors: 2, executorCores: 2, complexity: "Low", shuffleIntensity: "Low" },
  { name: "Standard ETL (100 GB, 8 Executors)", dataSizeValue: 100, dataSizeUnit: "GB", executors: 8, executorCores: 4, complexity: "Medium", shuffleIntensity: "Medium" },
  { name: "Shuffle-Heavy Job (2 TB, 20 Executors)", dataSizeValue: 2, dataSizeUnit: "TB", executors: 20, executorCores: 5, complexity: "High", shuffleIntensity: "Very High" },
  { name: "Enterprise Batch (10 TB, 50 Executors)", dataSizeValue: 10, dataSizeUnit: "TB", executors: 50, executorCores: 8, complexity: "Very High", shuffleIntensity: "High" },
];

// ── LocalStorage: last-session input ──

const INPUT_KEY = "spark-job-time-calculator-input";

export interface SavedInput {
  dataSizeValue: string;
  dataSizeUnit: DatasetUnit;
  storageType: StorageType;
  compression: CompressionType;
  executors: number;
  executorCores: number;
  executorMemoryGB: number;
  driverMemoryGB: number;
  dynamicAllocation: boolean;
  clusterManager: ClusterManager;
  complexity: Complexity;
  shuffleIntensity: ShuffleIntensity;
  stages: number;
  wideTransformations: boolean;
  narrowTransformations: boolean;
  cachingUsed: boolean;
  broadcastJoins: boolean;
  partitionCount: number;
  ioThroughputMBps: number;
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
  totalRuntimeSec: number;
  bottleneck: Bottleneck;
}

const HISTORY_KEY = "spark-job-time-calculator-history";

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
  p.set("size", input.dataSizeValue);
  p.set("unit", input.dataSizeUnit);
  p.set("exec", String(input.executors));
  p.set("cores", String(input.executorCores));
  p.set("complexity", input.complexity);
  p.set("shuffle", input.shuffleIntensity);
  p.set("io", String(input.ioThroughputMBps));
  return url.toString();
}

export function parseShareParams(): Partial<SavedInput> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const size = p.get("size");
  if (!size) return null;
  return {
    dataSizeValue: size,
    dataSizeUnit: (p.get("unit") as DatasetUnit) ?? "GB",
    executors: parseInt(p.get("exec") ?? "4", 10) || 4,
    executorCores: parseInt(p.get("cores") ?? "4", 10) || 4,
    complexity: (p.get("complexity") as Complexity) ?? "Medium",
    shuffleIntensity: (p.get("shuffle") as ShuffleIntensity) ?? "Medium",
    ioThroughputMBps: parseInt(p.get("io") ?? "500", 10) || 500,
  };
}

// ── Export helpers ──

export function buildTextReport(result: SparkJobResult, p: SavedInput): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Spark Job Time Calculator Report",
    "===================================",
    `Generated: ${ts}`,
    `Dataset: ${p.dataSizeValue} ${p.dataSizeUnit} · Storage: ${p.storageType} · Compression: ${p.compression}`,
    `Cluster: ${p.executors} executors × ${p.executorCores} cores (parallelism ${result.parallelism})`,
    `Complexity: ${p.complexity} · Shuffle: ${p.shuffleIntensity} · Stages: ${p.stages}`,
    "",
    `Read Time: ${formatDuration(result.readTimeSec)}`,
    `Processing Time: ${formatDuration(result.processingTimeSec)}`,
    `Shuffle Time: ${formatDuration(result.shuffleTimeSec)}`,
    `Write Time: ${formatDuration(result.writeTimeSec)}`,
    `Scheduling Overhead: ${formatDuration(result.overheadSec)} (${formatNum(result.overheadFraction * 100)}%)`,
    "",
    `Estimated Runtime: ${formatDuration(result.totalRuntimeSec)}`,
    `Cluster Efficiency Score: ${formatNum(result.efficiencyScore, 0)}%`,
    `Estimated CPU Utilization: ${formatNum(result.cpuUtilizationPct, 0)}%`,
    `Primary Bottleneck: ${result.bottleneck}`,
    `Recommendation: ${result.recommendation}`,
    `Partition Note: ${result.partitionRecommendation}`,
    "",
    "Generated by Spark Job Time Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: SparkJobResult): string {
  return [
    "Metric,Value",
    `Parallelism,${result.parallelism}`,
    `Read Time (s),${result.readTimeSec.toFixed(2)}`,
    `Processing Time (s),${result.processingTimeSec.toFixed(2)}`,
    `Shuffle Time (s),${result.shuffleTimeSec.toFixed(2)}`,
    `Write Time (s),${result.writeTimeSec.toFixed(2)}`,
    `Scheduling Overhead (s),${result.overheadSec.toFixed(2)}`,
    `Total Runtime (s),${result.totalRuntimeSec.toFixed(2)}`,
    `Cluster Efficiency Score (%),${result.efficiencyScore}`,
    `CPU Utilization Estimate (%),${result.cpuUtilizationPct.toFixed(1)}`,
    `Primary Bottleneck,${result.bottleneck}`,
  ].join("\n");
}

export function buildJSONReport(result: SparkJobResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: SparkJobResult, p: SavedInput): string {
  return `<!DOCTYPE html><html><head><title>Spark Job Time Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Spark Job Time Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Dataset: ${p.dataSizeValue} ${p.dataSizeUnit} · Cluster: ${p.executors} × ${p.executorCores} cores</p>
  <table>
    <tbody>
      <tr><td>Estimated Runtime</td><td>${formatDuration(result.totalRuntimeSec)}</td></tr>
      <tr><td>Read Time</td><td>${formatDuration(result.readTimeSec)}</td></tr>
      <tr><td>Processing Time</td><td>${formatDuration(result.processingTimeSec)}</td></tr>
      <tr><td>Shuffle Time</td><td>${formatDuration(result.shuffleTimeSec)}</td></tr>
      <tr><td>Write Time</td><td>${formatDuration(result.writeTimeSec)}</td></tr>
      <tr><td>Scheduling Overhead</td><td>${formatDuration(result.overheadSec)}</td></tr>
      <tr><td>Cluster Efficiency Score</td><td>${formatNum(result.efficiencyScore, 0)}%</td></tr>
      <tr><td>Primary Bottleneck</td><td>${result.bottleneck}</td></tr>
      <tr><td>Recommendation</td><td>${result.recommendation}</td></tr>
    </tbody>
  </table>
  </body></html>`;
}
