// ── Unit conversion to bits ───────────────────────────────────────────────────

/** Convert a data size value to bits */
export function dataSizeToBits(value: number, unit: string): number {
  const bytesMap: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
  };
  return value * (bytesMap[unit] ?? 1) * 8;
}

/** Convert a speed value to bits per second */
export function speedToBps(value: number, unit: string): number {
  const map: Record<string, number> = {
    Kbps: 1_000,
    Mbps: 1_000_000,
    Gbps: 1_000_000_000,
    "KB/s": 1_024 * 8,
    "MB/s": 1_024 ** 2 * 8,
    "GB/s": 1_024 ** 3 * 8,
  };
  return value * (map[unit] ?? 1_000_000);
}

// ── Core calculation ─────────────────────────────────────────────────────────

export interface TransferResult {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  formatted: string;
  effectiveSpeedBps: number;
  effectiveSpeedMbps: number;
  dataSizeBits: number;
  dataSizeGB: number;
}

export function calculateTransfer(
  dataSize: number,
  dataSizeUnit: string,
  speed: number,
  speedUnit: string,
  efficiencyLoss: number
): TransferResult | null {
  if (!dataSize || !speed || dataSize <= 0 || speed <= 0) return null;

  const bits = dataSizeToBits(dataSize, dataSizeUnit);
  const bps = speedToBps(speed, speedUnit);
  const effectiveBps = bps * (1 - efficiencyLoss / 100);
  if (effectiveBps <= 0) return null;

  const seconds = bits / effectiveBps;
  const minutes = seconds / 60;
  const hours = seconds / 3600;
  const days = seconds / 86400;

  return {
    seconds,
    minutes,
    hours,
    days,
    formatted: formatDuration(seconds),
    effectiveSpeedBps: effectiveBps,
    effectiveSpeedMbps: effectiveBps / 1_000_000,
    dataSizeBits: bits,
    dataSizeGB: bits / (1024 ** 3 * 8),
  };
}

// ── Formatters ────────────────────────────────────────────────────────────────

export function formatDuration(seconds: number): string {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
  if (seconds < 60) return `${Math.round(seconds)} seconds`;

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 && d === 0) parts.push(`${s}s`);
  return parts.join(" ") || "< 1s";
}

export function formatNumber(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export function formatSpeed(bps: number): string {
  if (bps >= 1_000_000_000) return `${(bps / 1_000_000_000).toFixed(2)} Gbps`;
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(2)} Mbps`;
  if (bps >= 1_000) return `${(bps / 1_000).toFixed(2)} Kbps`;
  return `${bps.toFixed(0)} bps`;
}

// ── Debounce ──────────────────────────────────────────────────────────────────

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
  label: string;
  result: string;
  timestamp: number;
}

const HISTORY_KEY = "data-transfer-calc-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const h = getHistory();
  h.unshift({ ...entry, id: Date.now().toString(36), timestamp: Date.now() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 20)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
