import type { FileSizeUnit, SpeedUnit, DownloadInputs, DownloadResult, HistoryEntry } from "./types";

// ── Unit maps ─────────────────────────────────────────────────────────────────
// File size: bytes
const FILE_SIZE_BYTES: Record<FileSizeUnit, number> = {
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

// Speed: bits per second
const SPEED_BPS: Record<SpeedUnit, number> = {
  Kbps: 1_000,
  Mbps: 1_000_000,
  Gbps: 1_000_000_000,
};

// ── Core calculation ─────────────────────────────────────────────────────────
export function calculateDownloadTime(inputs: DownloadInputs): DownloadResult | null {
  const { fileSize, fileSizeUnit, speed, speedUnit, efficiency } = inputs;

  if (!fileSize || !speed || fileSize <= 0 || speed <= 0 || efficiency <= 0) return null;

  const fileSizeBits = fileSize * FILE_SIZE_BYTES[fileSizeUnit] * 8;
  const rawSpeedBps = speed * SPEED_BPS[speedUnit];
  const effectiveSpeedBps = rawSpeedBps * efficiency;

  const seconds = fileSizeBits / effectiveSpeedBps;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  const formatted = formatDuration(seconds);

  // Completion time
  const now = new Date();
  const finishTime = new Date(now.getTime() + seconds * 1000);
  const completionTime = finishTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Speed tier
  let speedTier: "fast" | "moderate" | "slow";
  if (seconds < 300) speedTier = "fast";         // < 5 min
  else if (seconds < 1800) speedTier = "moderate"; // 5–30 min
  else speedTier = "slow";

  const fileSizeLabel = `${fileSize} ${fileSizeUnit}`;
  const speedLabel = `${speed} ${speedUnit}`;

  return {
    seconds,
    minutes,
    hours,
    days,
    formatted,
    fileSizeBits,
    effectiveSpeedBps,
    speedLabel,
    fileSizeLabel,
    completionTime,
    speedTier,
  };
}

// ── Formatting ───────────────────────────────────────────────────────────────
export function formatDuration(seconds: number): string {
  if (seconds < 1) return "< 1 second";

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (d > 0) parts.push(`${d} day${d !== 1 ? "s" : ""}`);
  if (h > 0) parts.push(`${h} hour${h !== 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} minute${m !== 1 ? "s" : ""}`);
  if (s > 0 && d === 0) parts.push(`${s} second${s !== 1 ? "s" : ""}`);

  return parts.join(" ") || "< 1 second";
}

export function formatNumber(value: number, decimals = 2): string {
  if (!isFinite(value)) return "–";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

// ── Validation ───────────────────────────────────────────────────────────────
export function validateInputs(inputs: DownloadInputs): string | null {
  if (!inputs.fileSize || inputs.fileSize <= 0) return "File size must be greater than 0.";
  if (!inputs.speed || inputs.speed <= 0) return "Internet speed must be greater than 0.";
  if (inputs.fileSize > 1_000_000) return "File size value seems too large. Please check your input.";
  if (inputs.speed > 100_000) return "Speed value seems too large. Please check your input.";
  return null;
}

// ── Hints ────────────────────────────────────────────────────────────────────
export function getFileSizeHint(size: number, unit: FileSizeUnit): string | null {
  const bytes = size * FILE_SIZE_BYTES[unit];
  const gb = bytes / FILE_SIZE_BYTES["GB"];
  if (gb >= 50) return "Large download detected. Consider a wired connection for best results.";
  return null;
}

export function getSpeedHint(speed: number, unit: SpeedUnit): string | null {
  const bps = speed * SPEED_BPS[unit];
  if (bps < 10_000_000) return "Slow connection detected. Download may take longer than expected.";
  return null;
}

// ── Presets ──────────────────────────────────────────────────────────────────
export const QUICK_PRESETS = [
  { label: "Netflix Movie", fileSize: 5, fileSizeUnit: "GB" as FileSizeUnit },
  { label: "AAA Game", fileSize: 100, fileSizeUnit: "GB" as FileSizeUnit },
  { label: "Software Update", fileSize: 1, fileSizeUnit: "GB" as FileSizeUnit },
  { label: "4K Movie", fileSize: 50, fileSizeUnit: "GB" as FileSizeUnit },
];

export const SPEED_PRESETS = [
  { label: "DSL (10 Mbps)", speed: 10, speedUnit: "Mbps" as SpeedUnit },
  { label: "Cable (50 Mbps)", speed: 50, speedUnit: "Mbps" as SpeedUnit },
  { label: "Fiber (300 Mbps)", speed: 300, speedUnit: "Mbps" as SpeedUnit },
  { label: "Gigabit (1 Gbps)", speed: 1, speedUnit: "Gbps" as SpeedUnit },
];

export const EFFICIENCY_OPTIONS = [
  { label: "100% Ideal", value: 1.0 },
  { label: "95% Excellent", value: 0.95 },
  { label: "90% Good", value: 0.9 },
  { label: "80% Average", value: 0.8 },
  { label: "70% Slow Network", value: 0.7 },
];

// ── History (localStorage) ───────────────────────────────────────────────────
const HISTORY_KEY = "download-time-calculator-history";
const MAX_HISTORY = 20;

export function saveHistory(inputs: DownloadInputs, result: DownloadResult): void {
  if (typeof window === "undefined") return;
  const existing: HistoryEntry[] = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    inputs,
    result,
  };
  const updated = [entry, ...existing].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ── Export ───────────────────────────────────────────────────────────────────
export function buildExportText(inputs: DownloadInputs, result: DownloadResult): string {
  const effPct = Math.round(inputs.efficiency * 100);
  return [
    "Download Time Calculator",
    "========================",
    `File Size:        ${inputs.fileSize} ${inputs.fileSizeUnit}`,
    `Internet Speed:   ${inputs.speed} ${inputs.speedUnit}`,
    `Efficiency:       ${effPct}%`,
    `Effective Speed:  ${formatNumber(result.effectiveSpeedBps / 1_000_000, 2)} Mbps`,
    "",
    `Estimated Download Time: ${result.formatted}`,
    `  Seconds: ${formatNumber(result.seconds, 1)}`,
    `  Minutes: ${formatNumber(result.minutes, 2)}`,
    `  Hours:   ${formatNumber(result.hours, 3)}`,
    `  Days:    ${formatNumber(result.days, 4)}`,
    "",
    `Estimated Finish Time: ${result.completionTime}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}
