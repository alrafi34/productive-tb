// ── Storage Requirement Calculator Logic ──

export type Mode = "file" | "backup" | "video";

export type FileScenario = "basic" | "database" | "website" | "cloud" | "custom";

export type SizeUnit = "bytes" | "kb" | "mb" | "gb" | "tb";
export type PeriodUnit = "days" | "weeks" | "months" | "years";
export type RaidKey = "none" | "raid1" | "raid5" | "raid6" | "raid10";
export type CurrencyKey = "USD" | "EUR" | "GBP" | "BDT" | "INR" | "CAD" | "AUD" | "JPY";

export const UNIT_BYTES: Record<SizeUnit, number> = {
  bytes: 1,
  kb: 1024,
  mb: 1024 ** 2,
  gb: 1024 ** 3,
  tb: 1024 ** 4,
};

export const UNIT_LABELS: Record<SizeUnit, string> = { bytes: "Bytes", kb: "KB", mb: "MB", gb: "GB", tb: "TB" };
export const UNIT_ORDER: SizeUnit[] = ["bytes", "kb", "mb", "gb", "tb"];

export const PERIOD_DAYS: Record<PeriodUnit, number> = { days: 1, weeks: 7, months: 30, years: 365 };
export const PERIOD_LABELS: Record<PeriodUnit, string> = { days: "Days", weeks: "Weeks", months: "Months", years: "Years" };
export const PERIOD_ORDER: PeriodUnit[] = ["days", "weeks", "months", "years"];

export const RAID_META: Record<RaidKey, { label: string; multiplier: number; hint: string }> = {
  none: { label: "None", multiplier: 1, hint: "No redundancy overhead." },
  raid1: { label: "RAID 1 (Mirror)", multiplier: 2, hint: "Full mirror — 100% overhead." },
  raid5: { label: "RAID 5", multiplier: 1.33, hint: "Single parity — ~33% overhead (assumes a typical 4-drive array)." },
  raid6: { label: "RAID 6", multiplier: 1.5, hint: "Dual parity — ~50% overhead (assumes a typical 4-drive array)." },
  raid10: { label: "RAID 10", multiplier: 2, hint: "Mirrored stripe — 100% overhead." },
};
export const RAID_ORDER: RaidKey[] = ["none", "raid1", "raid5", "raid6", "raid10"];

export const CURRENCY_SYMBOLS: Record<CurrencyKey, string> = {
  USD: "$", EUR: "€", GBP: "£", BDT: "৳", INR: "₹", CAD: "CA$", AUD: "A$", JPY: "¥",
};
export const CURRENCY_ORDER: CurrencyKey[] = ["USD", "EUR", "GBP", "BDT", "INR", "CAD", "AUD", "JPY"];

export const FILE_SCENARIO_META: Record<FileScenario, { label: string; hint: string; defaults: Partial<FileInputs> }> = {
  basic: { label: "Basic File Storage", hint: "Typical smartphone photo: 4 MB · Office document: 250 KB", defaults: { fileSize: 10, fileUnit: "mb", numFiles: 1000 } },
  database: { label: "Database Storage", hint: "A typical SQL table row averages 1–5 KB before indexing overhead.", defaults: { fileSize: 2, fileUnit: "kb", numFiles: 5_000_000 } },
  website: { label: "Website Storage", hint: "An average web page (HTML, CSS, JS, images) is 2–5 MB fully loaded.", defaults: { fileSize: 3, fileUnit: "mb", numFiles: 500 } },
  cloud: { label: "Cloud Storage", hint: "Cloud sync tools typically store full-resolution originals — plan for growth.", defaults: { fileSize: 8, fileUnit: "mb", numFiles: 20000 } },
  custom: { label: "Custom Calculation", hint: "Enter your own figures for any file-based storage scenario.", defaults: {} },
};
export const FILE_SCENARIO_ORDER: FileScenario[] = ["basic", "database", "website", "cloud", "custom"];

// ── Inputs ────────────────────────────────────────────────────────────────────

export interface FileInputs {
  scenario: FileScenario;
  fileSize: number;
  fileUnit: SizeUnit;
  numFiles: number;
  compressionRatio: number;
  backupCopies: number;
  raid: RaidKey;
  retentionValue: number;
  retentionUnit: PeriodUnit;
}

export interface BackupInputs {
  dailyBackup: number;
  dailyBackupUnit: SizeUnit;
  retentionValue: number;
  retentionUnit: PeriodUnit;
}

export interface VideoInputs {
  bitrateMbps: number;
  hoursPerDay: number;
  cameras: number;
  days: number;
}

export interface CommonInputs {
  annualGrowth: number;
  safetyMargin: number;
  costPerGB: number;
  currency: CurrencyKey;
}

export interface StorageInputs {
  mode: Mode;
  common: CommonInputs;
  file: FileInputs;
  backup: BackupInputs;
  video: VideoInputs;
}

export const DEFAULT_INPUTS: StorageInputs = {
  mode: "file",
  common: { annualGrowth: 20, safetyMargin: 20, costPerGB: 0.02, currency: "USD" },
  file: { scenario: "basic", fileSize: 10, fileUnit: "mb", numFiles: 1000, compressionRatio: 0, backupCopies: 1, raid: "none", retentionValue: 0, retentionUnit: "years" },
  backup: { dailyBackup: 25, dailyBackupUnit: "gb", retentionValue: 90, retentionUnit: "days" },
  video: { bitrateMbps: 8, hoursPerDay: 24, cameras: 1, days: 30 },
};

// ── Unit helpers ──────────────────────────────────────────────────────────────

export function toBytes(value: number, unit: SizeUnit): number {
  return value * UNIT_BYTES[unit];
}

export function bytesToGB(bytes: number): number {
  return bytes / UNIT_BYTES.gb;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (!isFinite(bytes) || bytes <= 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB"];
  const exp = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / Math.pow(1024, exp);
  return `${value.toFixed(exp === 0 ? 0 : decimals)} ${units[exp]}`;
}

function periodToDays(value: number, unit: PeriodUnit): number {
  return value * PERIOD_DAYS[unit];
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// ── Breakdown / result types ────────────────────────────────────────────────

export interface BreakdownSegment {
  label: string;
  bytes: number;
  color: string;
}

export interface StorageResult {
  rawBytes: number;
  projectedBytes: number;
  compressedBytes: number;
  backupBytes: number;
  raidBytes: number;
  finalBytes: number;
  estimatedCost: number;
  recommendedDisk: string;
  recommendedType: string;
  suggestedCloudPlan: string;
  breakdown: BreakdownSegment[];
  forecast: { year: number; bytes: number }[];
}

const DISK_TIERS: { label: string; gb: number; type: string }[] = [
  { label: "128 GB SSD", gb: 128, type: "SSD" },
  { label: "256 GB SSD", gb: 256, type: "SSD" },
  { label: "512 GB SSD", gb: 512, type: "SSD" },
  { label: "1 TB SSD", gb: 1024, type: "SSD" },
  { label: "2 TB HDD", gb: 2048, type: "External HDD" },
  { label: "4 TB HDD", gb: 4096, type: "External HDD" },
  { label: "8 TB NAS", gb: 8192, type: "NAS" },
  { label: "16 TB NAS", gb: 16384, type: "NAS" },
  { label: "24 TB NAS Array", gb: 24576, type: "NAS" },
  { label: "50 TB+ Enterprise SAN", gb: 51200, type: "Enterprise Storage" },
];

const CLOUD_TIERS: { label: string; gb: number }[] = [
  { label: "100 GB Cloud Plan", gb: 100 },
  { label: "1 TB Cloud Plan", gb: 1024 },
  { label: "2 TB Cloud Plan", gb: 2048 },
  { label: "5 TB Cloud Plan", gb: 5120 },
  { label: "10 TB Cloud Plan", gb: 10240 },
  { label: "Custom Enterprise Cloud Plan", gb: Infinity },
];

function recommendDisk(finalGB: number): { disk: string; type: string } {
  if (finalGB > 20 * 1024) return { disk: "50 TB+ Enterprise SAN", type: "Enterprise Storage" };
  if (finalGB > 4 * 1024) return { disk: "NAS (Network Attached Storage)", type: "NAS" };
  if (finalGB > 1 * 1024) return { disk: "External HDD", type: "External HDD" };
  const tier = DISK_TIERS.find((t) => t.gb >= finalGB) ?? DISK_TIERS[DISK_TIERS.length - 1];
  return { disk: tier.label, type: tier.type };
}

function recommendCloudPlan(finalGB: number): string {
  const tier = CLOUD_TIERS.find((t) => t.gb >= finalGB) ?? CLOUD_TIERS[CLOUD_TIERS.length - 1];
  return tier.label;
}

function buildForecast(finalBytes: number, annualGrowth: number): { year: number; bytes: number }[] {
  const forecast: { year: number; bytes: number }[] = [];
  for (let y = 0; y <= 5; y++) {
    forecast.push({ year: y, bytes: finalBytes * Math.pow(1 + annualGrowth / 100, y) });
  }
  return forecast;
}

// ── Calculation engines ──────────────────────────────────────────────────────

export function calculateFileStorage(inputs: FileInputs, common: CommonInputs): StorageResult {
  const rawBytes = toBytes(inputs.fileSize, inputs.fileUnit) * inputs.numFiles;
  const growthYears = periodToDays(inputs.retentionValue, inputs.retentionUnit) / 365;
  const projectedBytes = rawBytes * Math.pow(1 + common.annualGrowth / 100, growthYears);
  const compressedBytes = projectedBytes * (1 - clamp(inputs.compressionRatio, 0, 100) / 100);
  const backupBytes = compressedBytes * Math.max(1, inputs.backupCopies);
  const raidBytes = backupBytes * RAID_META[inputs.raid].multiplier;
  const finalBytes = raidBytes * (1 + common.safetyMargin / 100);

  const finalGB = bytesToGB(finalBytes);
  const { disk, type } = recommendDisk(finalGB);

  const breakdown: BreakdownSegment[] = [
    { label: "Compressed Data", bytes: compressedBytes, color: "#058554" },
    { label: "Backup Copies", bytes: Math.max(0, backupBytes - compressedBytes), color: "#2563eb" },
    { label: "RAID Redundancy", bytes: Math.max(0, raidBytes - backupBytes), color: "#d97706" },
    { label: "Safety Margin", bytes: Math.max(0, finalBytes - raidBytes), color: "#9333ea" },
  ].filter((s) => s.bytes > 0);

  return {
    rawBytes, projectedBytes, compressedBytes, backupBytes, raidBytes, finalBytes,
    estimatedCost: finalGB * common.costPerGB,
    recommendedDisk: disk,
    recommendedType: type,
    suggestedCloudPlan: recommendCloudPlan(finalGB),
    breakdown,
    forecast: buildForecast(finalBytes, common.annualGrowth),
  };
}

export function calculateBackupStorage(inputs: BackupInputs, common: CommonInputs): StorageResult {
  const dailyBytes = toBytes(inputs.dailyBackup, inputs.dailyBackupUnit);
  const days = periodToDays(inputs.retentionValue, inputs.retentionUnit);
  const rawBytes = dailyBytes * days;
  const finalBytes = rawBytes * (1 + common.safetyMargin / 100);
  const finalGB = bytesToGB(finalBytes);
  const { disk, type } = recommendDisk(finalGB);

  const breakdown: BreakdownSegment[] = [
    { label: "Backup Data", bytes: rawBytes, color: "#058554" },
    { label: "Safety Margin", bytes: Math.max(0, finalBytes - rawBytes), color: "#9333ea" },
  ].filter((s) => s.bytes > 0);

  return {
    rawBytes, projectedBytes: rawBytes, compressedBytes: rawBytes, backupBytes: rawBytes, raidBytes: rawBytes, finalBytes,
    estimatedCost: finalGB * common.costPerGB,
    recommendedDisk: disk,
    recommendedType: type,
    suggestedCloudPlan: recommendCloudPlan(finalGB),
    breakdown,
    forecast: buildForecast(finalBytes, common.annualGrowth),
  };
}

export function calculateVideoStorage(inputs: VideoInputs, common: CommonInputs): StorageResult {
  const dailyBytesPerCamera = (inputs.bitrateMbps * 1_000_000 / 8) * inputs.hoursPerDay * 3600;
  const rawBytes = dailyBytesPerCamera * inputs.days * Math.max(1, inputs.cameras);
  const finalBytes = rawBytes * (1 + common.safetyMargin / 100);
  const finalGB = bytesToGB(finalBytes);
  const { disk, type } = recommendDisk(finalGB);

  const breakdown: BreakdownSegment[] = [
    { label: "Recorded Footage", bytes: rawBytes, color: "#058554" },
    { label: "Safety Margin", bytes: Math.max(0, finalBytes - rawBytes), color: "#9333ea" },
  ].filter((s) => s.bytes > 0);

  return {
    rawBytes, projectedBytes: rawBytes, compressedBytes: rawBytes, backupBytes: rawBytes, raidBytes: rawBytes, finalBytes,
    estimatedCost: finalGB * common.costPerGB,
    recommendedDisk: disk,
    recommendedType: type,
    suggestedCloudPlan: recommendCloudPlan(finalGB),
    breakdown,
    forecast: buildForecast(finalBytes, common.annualGrowth),
  };
}

export function calculateStorage(inputs: StorageInputs): StorageResult {
  if (inputs.mode === "backup") return calculateBackupStorage(inputs.backup, inputs.common);
  if (inputs.mode === "video") return calculateVideoStorage(inputs.video, inputs.common);
  return calculateFileStorage(inputs.file, inputs.common);
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: StorageInputs): ValidationErrors {
  const e: ValidationErrors = {};

  if (inputs.mode === "file") {
    if (inputs.file.fileSize <= 0) e.fileSize = "Average file size must be greater than zero.";
    if (inputs.file.fileSize > 0 && toBytes(inputs.file.fileSize, inputs.file.fileUnit) > UNIT_BYTES.tb * 10) e.fileSize = "That file size looks unrealistic — please double-check the unit.";
    if (!inputs.file.numFiles || inputs.file.numFiles <= 0) e.numFiles = "Number of files must be greater than zero.";
  } else if (inputs.mode === "backup") {
    if (inputs.backup.dailyBackup <= 0) e.dailyBackup = "Daily backup size must be greater than zero.";
    if (!inputs.backup.retentionValue || inputs.backup.retentionValue <= 0) e.retentionValue = "Retention period must be greater than zero.";
  } else {
    if (inputs.video.bitrateMbps <= 0) e.bitrateMbps = "Video bitrate must be greater than zero.";
    if (inputs.video.hoursPerDay <= 0 || inputs.video.hoursPerDay > 24) e.hoursPerDay = "Hours recorded per day must be between 1 and 24.";
    if (!inputs.video.days || inputs.video.days <= 0) e.days = "Recording days must be greater than zero.";
    if (!inputs.video.cameras || inputs.video.cameras <= 0) e.cameras = "Number of cameras must be at least 1.";
  }

  if (inputs.common.costPerGB < 0) e.costPerGB = "Storage cost cannot be negative.";

  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "storage-requirement-calculator-inputs";

export function saveInputs(inputs: StorageInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): StorageInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as StorageInputs;
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: StorageInputs;
  result: StorageResult;
}

const HISTORY_KEY = "storage-requirement-calculator-history";

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

// ── Shareable URL ────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: StorageInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", inputs.mode);
  url.searchParams.set("growth", String(inputs.common.annualGrowth));
  url.searchParams.set("safety", String(inputs.common.safetyMargin));
  url.searchParams.set("cost", String(inputs.common.costPerGB));
  url.searchParams.set("currency", inputs.common.currency);
  if (inputs.mode === "file") {
    url.searchParams.set("size", String(inputs.file.fileSize));
    url.searchParams.set("unit", inputs.file.fileUnit);
    url.searchParams.set("files", String(inputs.file.numFiles));
  } else if (inputs.mode === "backup") {
    url.searchParams.set("daily", String(inputs.backup.dailyBackup));
    url.searchParams.set("dailyUnit", inputs.backup.dailyBackupUnit);
    url.searchParams.set("retention", String(inputs.backup.retentionValue));
  } else {
    url.searchParams.set("bitrate", String(inputs.video.bitrateMbps));
    url.searchParams.set("hours", String(inputs.video.hoursPerDay));
    url.searchParams.set("days", String(inputs.video.days));
  }
  return url.toString();
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: StorageResult, inputs: StorageInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const symbol = CURRENCY_SYMBOLS[inputs.common.currency];
  return [
    "Storage Requirement Calculator Report",
    "======================================",
    `Generated: ${ts}`,
    `Mode: ${inputs.mode === "file" ? "File Storage" : inputs.mode === "backup" ? "Backup Storage" : "Video / CCTV Storage"}`,
    "",
    `Raw Storage: ${formatBytes(result.rawBytes)}`,
    `Final Required Storage: ${formatBytes(result.finalBytes)}`,
    `Estimated Cost: ${symbol}${result.estimatedCost.toFixed(2)}/month`,
    `Recommended: ${result.recommendedDisk}`,
    `Suggested Cloud Plan: ${result.suggestedCloudPlan}`,
    "",
    "Generated by Storage Requirement Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: StorageResult, inputs: StorageInputs): string {
  const symbol = CURRENCY_SYMBOLS[inputs.common.currency];
  const rows = [
    ["Metric", "Value"],
    ["Mode", inputs.mode],
    ["Raw Storage", formatBytes(result.rawBytes)],
    ["Final Required Storage", formatBytes(result.finalBytes)],
    ["Estimated Cost", `${symbol}${result.estimatedCost.toFixed(2)}`],
    ["Recommended Disk", result.recommendedDisk],
    ["Suggested Cloud Plan", result.suggestedCloudPlan],
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

export function buildJSONReport(result: StorageResult, inputs: StorageInputs): string {
  return JSON.stringify(
    {
      mode: inputs.mode,
      rawBytes: Math.round(result.rawBytes),
      finalBytes: Math.round(result.finalBytes),
      finalFormatted: formatBytes(result.finalBytes),
      estimatedCost: Math.round(result.estimatedCost * 100) / 100,
      currency: inputs.common.currency,
      recommendedDisk: result.recommendedDisk,
      suggestedCloudPlan: result.suggestedCloudPlan,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: StorageResult, inputs: StorageInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const symbol = CURRENCY_SYMBOLS[inputs.common.currency];
  return `<!DOCTYPE html><html><head><title>Storage Requirement Report</title>
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
    <h1>Storage Requirement Calculator Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Result</h2>
    <table>
      <tr><td>Raw Storage</td><td>${formatBytes(result.rawBytes)}</td></tr>
      <tr><td>Final Required Storage</td><td><strong>${formatBytes(result.finalBytes)}</strong></td></tr>
      <tr><td>Estimated Cost</td><td>${symbol}${result.estimatedCost.toFixed(2)}/month</td></tr>
    </table>
    <h2>Recommendations</h2>
    <table>
      <tr><td>Recommended Storage</td><td>${result.recommendedDisk}</td></tr>
      <tr><td>Suggested Cloud Plan</td><td>${result.suggestedCloudPlan}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
