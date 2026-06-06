// ── Unit conversions ──────────────────────────────────────────────────────────

export function fileSizeToBytes(value: number, unit: string): number {
  const units: Record<string, number> = {
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  };
  return value * (units[unit] ?? 1);
}

export function speedToBitsPerSecond(value: number, unit: string): number {
  const units: Record<string, number> = {
    Kbps: 1_000,
    Mbps: 1_000_000,
    Gbps: 1_000_000_000,
  };
  return value * (units[unit] ?? 1);
}

// ── Mode 1: Transfer Time ─────────────────────────────────────────────────────

export interface TransferResult {
  seconds: number;
  formatted: string;
  fileSizeGB: number;
  speedMbps: number;
}

export function calcTransferTime(
  fileSize: number,
  fileSizeUnit: string,
  speed: number,
  speedUnit: string
): TransferResult | null {
  if (!fileSize || !speed || fileSize <= 0 || speed <= 0) return null;
  const bytes = fileSizeToBytes(fileSize, fileSizeUnit);
  const bits = bytes * 8;
  const bps = speedToBitsPerSecond(speed, speedUnit);
  const seconds = bits / bps;
  return {
    seconds,
    formatted: formatDuration(seconds),
    fileSizeGB: bytes / 1024 ** 3,
    speedMbps: bps / 1_000_000,
  };
}

// ── Mode 2: Monthly Website Bandwidth ────────────────────────────────────────

export interface WebsiteResult {
  monthlyBytes: number;
  monthlyGB: number;
  monthlyTB: number;
  formatted: string;
  peakMbps: number;
}

export function calcWebsiteBandwidth(
  visitors: number,
  pageSizeMB: number,
  pagesPerVisitor: number,
  growthPct: number
): WebsiteResult | null {
  if (!visitors || !pageSizeMB || !pagesPerVisitor) return null;
  if (visitors <= 0 || pageSizeMB <= 0 || pagesPerVisitor <= 0) return null;
  const base = visitors * pageSizeMB * pagesPerVisitor; // MB
  const withGrowth = base * (1 + growthPct / 100);
  const bytes = withGrowth * 1024 ** 2;
  const gb = bytes / 1024 ** 3;
  const tb = gb / 1024;
  // rough peak Mbps: assume 10% of daily traffic in 1 peak hour
  const dailyBytes = bytes / 30;
  const peakBits = dailyBytes * 0.1 * 8;
  const peakMbps = peakBits / 3600 / 1_000_000;
  return {
    monthlyBytes: bytes,
    monthlyGB: gb,
    monthlyTB: tb,
    formatted: gb >= 1000 ? `${tb.toFixed(2)} TB/month` : `${gb.toFixed(2)} GB/month`,
    peakMbps,
  };
}

// ── Mode 3: Streaming Data Usage ─────────────────────────────────────────────

export const STREAMING_RATES: Record<string, number> = {
  "480p": 0.7,
  "720p": 1.5,
  "1080p": 3.0,
  "2K": 6.0,
  "4K": 10.0,
};

export interface StreamingResult {
  hourlyGB: number;
  dailyGB: number;
  monthlyGB: number;
  monthlyTB: number;
  formatted: string;
  requiredMbps: number;
}

export function calcStreamingUsage(
  quality: string,
  hoursPerDay: number,
  daysPerMonth: number
): StreamingResult | null {
  if (!hoursPerDay || hoursPerDay <= 0 || !daysPerMonth || daysPerMonth <= 0) return null;
  const hourlyGB = STREAMING_RATES[quality] ?? 3.0;
  const dailyGB = hourlyGB * hoursPerDay;
  const monthlyGB = dailyGB * daysPerMonth;
  const monthlyTB = monthlyGB / 1024;
  const requiredMbps = (hourlyGB * 8 * 1024) / 3600; // Gbytes → bits / seconds → Mbps
  return {
    hourlyGB,
    dailyGB,
    monthlyGB,
    monthlyTB,
    formatted: monthlyGB >= 1000 ? `${monthlyTB.toFixed(2)} TB/month` : `${monthlyGB.toFixed(1)} GB/month`,
    requiredMbps,
  };
}

// ── Mode 4: Multi-User Bandwidth ─────────────────────────────────────────────

export interface MultiUserResult {
  totalMbps: number;
  peakMbps: number;
  totalGbps: number;
  peakGbps: number;
  recommendedPlan: string;
}

export function calcMultiUserBandwidth(
  users: number,
  mbpsPerUser: number,
  peakPct: number
): MultiUserResult | null {
  if (!users || !mbpsPerUser || users <= 0 || mbpsPerUser <= 0) return null;
  const totalMbps = users * mbpsPerUser;
  const peakMbps = totalMbps * (peakPct / 100);
  const totalGbps = totalMbps / 1000;
  const peakGbps = peakMbps / 1000;
  let recommendedPlan = "";
  if (peakMbps <= 100) recommendedPlan = "100 Mbps plan";
  else if (peakMbps <= 500) recommendedPlan = "500 Mbps plan";
  else if (peakMbps <= 1000) recommendedPlan = "1 Gbps plan";
  else if (peakMbps <= 5000) recommendedPlan = "5 Gbps plan";
  else recommendedPlan = "10 Gbps+ enterprise plan";
  return { totalMbps, peakMbps, totalGbps, peakGbps, recommendedPlan };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatDuration(seconds: number): string {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
  if (seconds < 60) return `${seconds.toFixed(1)} seconds`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m < 60) return `${m}m ${s}s`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return `${h}h ${rm}m ${s}s`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes.toFixed(0)} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
  if (bytes < 1024 ** 4) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  return `${(bytes / 1024 ** 4).toFixed(2)} TB`;
}

export function formatNumber(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── History ───────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  mode: string;
  label: string;
  result: string;
  timestamp: number;
}

const HISTORY_KEY = "bandwidth-calc-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  history.unshift({ ...entry, id: Date.now().toString(36), timestamp: Date.now() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
