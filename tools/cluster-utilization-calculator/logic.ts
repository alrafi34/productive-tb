// ── Cluster Utilization Calculator Logic ──

export type ResourceType = "CPU" | "Memory" | "Storage" | "GPU" | "Network" | "Custom";
export type UnitType = "Cores" | "GB" | "TB" | "MB" | "Nodes" | "GPUs" | "Custom";
export type Status = "Healthy" | "Warning" | "Critical";

export const RESOURCE_TYPES: ResourceType[] = ["CPU", "Memory", "Storage", "GPU", "Network", "Custom"];
export const UNIT_TYPES: UnitType[] = ["Cores", "GB", "TB", "MB", "Nodes", "GPUs", "Custom"];

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

export interface UtilizationResult {
  resourceType: ResourceType;
  unit: UnitType;
  total: number;
  used: number;
  reserved: number;
  remaining: number;
  available: number;
  utilizationPct: number;
  headroomPct: number;
  reservedPct: number;
  overcommitRatio: number;
  status: Status;
}

export interface UtilizationError {
  error: string;
}

export function isUtilizationError(r: UtilizationResult | UtilizationError | null): r is UtilizationError {
  return r !== null && "error" in r;
}

export function classifyStatus(utilizationPct: number, warningThreshold: number, criticalThreshold: number): Status {
  if (utilizationPct >= criticalThreshold) return "Critical";
  if (utilizationPct >= warningThreshold) return "Warning";
  return "Healthy";
}

export function calculateUtilization(
  resourceType: ResourceType, unit: UnitType, total: number, used: number, reserved: number,
  warningThreshold: number, criticalThreshold: number, decimals: number
): UtilizationResult | UtilizationError {
  if (!isFinite(total) || total <= 0) return { error: "Total cluster capacity must be greater than zero." };
  if (!isFinite(used) || used < 0) return { error: "Used resources cannot be negative." };
  if (!isFinite(reserved) || reserved < 0) return { error: "Reserved resources cannot be negative." };
  if (used > total) return { error: "Used resources cannot exceed total capacity." };
  if (reserved + used > total) return { error: "Reserved resources exceed available cluster capacity." };

  const remaining = total - used;
  const available = total - used - reserved;
  const utilizationPct = (used / total) * 100;
  const headroomPct = (available / total) * 100;
  const reservedPct = (reserved / total) * 100;
  const overcommitRatio = (used + reserved) / total;
  const status = classifyStatus(utilizationPct, warningThreshold, criticalThreshold);

  return {
    resourceType, unit, total, used, reserved,
    remaining: round(remaining, decimals),
    available: round(available, decimals),
    utilizationPct: round(utilizationPct, decimals),
    headroomPct: round(headroomPct, decimals),
    reservedPct: round(reservedPct, decimals),
    overcommitRatio: round(overcommitRatio, 3),
    status,
  };
}

// ── Multi-resource dashboard ──

export interface ResourceRow {
  id: string;
  resourceType: ResourceType;
  unit: UnitType;
  total: number;
  used: number;
}

export function makeRowId(): string {
  return Math.random().toString(36).slice(2);
}

export const DEFAULT_ROWS: ResourceRow[] = [
  { id: "row-cpu", resourceType: "CPU", unit: "Cores", total: 64, used: 48 },
  { id: "row-mem", resourceType: "Memory", unit: "GB", total: 256, used: 190 },
  { id: "row-storage", resourceType: "Storage", unit: "TB", total: 20, used: 12.5 },
];

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

export const SAMPLE_PRESETS: { name: string; resourceType: ResourceType; unit: UnitType; total: number; used: number; reserved: number }[] = [
  { name: "CPU Cluster (64 Cores)", resourceType: "CPU", unit: "Cores", total: 64, used: 48, reserved: 4 },
  { name: "Memory Cluster (256 GB)", resourceType: "Memory", unit: "GB", total: 256, used: 190, reserved: 16 },
  { name: "Storage Cluster (20 TB)", resourceType: "Storage", unit: "TB", total: 20, used: 12.5, reserved: 1 },
  { name: "GPU Pool (16 GPUs)", resourceType: "GPU", unit: "GPUs", total: 16, used: 14, reserved: 0 },
];

// ── LocalStorage: last-session input ──

const INPUT_KEY = "cluster-utilization-calculator-input";

export interface SavedInput {
  resourceType: ResourceType;
  unit: UnitType;
  total: string;
  used: string;
  reserved: string;
  warningThreshold: number;
  criticalThreshold: number;
  decimals: number;
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

const ROWS_KEY = "cluster-utilization-calculator-rows";

export function saveRows(rows: ResourceRow[]): void {
  try { localStorage.setItem(ROWS_KEY, JSON.stringify(rows)); } catch {}
}

export function loadRows(): ResourceRow[] | null {
  try {
    const raw = localStorage.getItem(ROWS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: SavedInput;
  utilizationPct: number;
  status: Status;
}

const HISTORY_KEY = "cluster-utilization-calculator-history";

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
  p.set("type", input.resourceType);
  p.set("unit", input.unit);
  p.set("total", input.total);
  p.set("used", input.used);
  p.set("reserved", input.reserved);
  p.set("warn", String(input.warningThreshold));
  p.set("crit", String(input.criticalThreshold));
  return url.toString();
}

export function parseShareParams(): SavedInput | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const total = p.get("total");
  if (!total) return null;
  return {
    resourceType: (p.get("type") as ResourceType) ?? "CPU",
    unit: (p.get("unit") as UnitType) ?? "Cores",
    total,
    used: p.get("used") ?? "0",
    reserved: p.get("reserved") ?? "0",
    warningThreshold: parseInt(p.get("warn") ?? "80", 10) || 80,
    criticalThreshold: parseInt(p.get("crit") ?? "90", 10) || 90,
    decimals: 2,
  };
}

// ── Export helpers ──

export function buildTextReport(result: UtilizationResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Cluster Utilization Report",
    "============================",
    `Generated: ${ts}`,
    `Resource Type: ${result.resourceType}`,
    "",
    `Total Capacity: ${formatNum(result.total)} ${result.unit}`,
    `Used: ${formatNum(result.used)} ${result.unit}`,
    `Reserved: ${formatNum(result.reserved)} ${result.unit}`,
    `Remaining: ${formatNum(result.remaining)} ${result.unit}`,
    `Available: ${formatNum(result.available)} ${result.unit}`,
    "",
    `Utilization: ${formatNum(result.utilizationPct)}%`,
    `Headroom: ${formatNum(result.headroomPct)}%`,
    `Reserved %: ${formatNum(result.reservedPct)}%`,
    `Overcommit Ratio: ${formatNum(result.overcommitRatio, 3)}`,
    `Status: ${result.status}`,
    "",
    "Generated by Cluster Utilization Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: UtilizationResult): string {
  return [
    "Metric,Value",
    `Resource Type,${result.resourceType}`,
    `Unit,${result.unit}`,
    `Total Capacity,${result.total}`,
    `Used,${result.used}`,
    `Reserved,${result.reserved}`,
    `Remaining,${result.remaining}`,
    `Available,${result.available}`,
    `Utilization (%),${result.utilizationPct}`,
    `Headroom (%),${result.headroomPct}`,
    `Reserved (%),${result.reservedPct}`,
    `Overcommit Ratio,${result.overcommitRatio}`,
    `Status,${result.status}`,
  ].join("\n");
}

export function buildJSONReport(result: UtilizationResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: UtilizationResult): string {
  return `<!DOCTYPE html><html><head><title>Cluster Utilization Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Cluster Utilization Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Resource Type: ${result.resourceType}</p>
  <table>
    <tbody>
      <tr><td>Total Capacity</td><td>${formatNum(result.total)} ${result.unit}</td></tr>
      <tr><td>Used</td><td>${formatNum(result.used)} ${result.unit}</td></tr>
      <tr><td>Reserved</td><td>${formatNum(result.reserved)} ${result.unit}</td></tr>
      <tr><td>Remaining</td><td>${formatNum(result.remaining)} ${result.unit}</td></tr>
      <tr><td>Available</td><td>${formatNum(result.available)} ${result.unit}</td></tr>
      <tr><td>Utilization</td><td>${formatNum(result.utilizationPct)}%</td></tr>
      <tr><td>Headroom</td><td>${formatNum(result.headroomPct)}%</td></tr>
      <tr><td>Overcommit Ratio</td><td>${formatNum(result.overcommitRatio, 3)}</td></tr>
      <tr><td>Status</td><td>${result.status}</td></tr>
    </tbody>
  </table>
  </body></html>`;
}
