export type Unit = "B" | "KB" | "MB" | "GB" | "TB" | "PB";
export type Standard = "binary" | "decimal";

export const UNITS: Unit[] = ["B", "KB", "MB", "GB", "TB", "PB"];

export const UNIT_LABELS: Record<Unit, { binary: string; decimal: string; desc: string }> = {
  B:  { binary: "Bytes",     decimal: "Bytes",     desc: "Bytes" },
  KB: { binary: "KiB",       decimal: "KB",        desc: "Kilobytes" },
  MB: { binary: "MiB",       decimal: "MB",        desc: "Megabytes" },
  GB: { binary: "GiB",       decimal: "GB",        desc: "Gigabytes" },
  TB: { binary: "TiB",       decimal: "TB",        desc: "Terabytes" },
  PB: { binary: "PiB",       decimal: "PB",        desc: "Petabytes" },
};

export type ConversionResult = {
  bytes: number;
  values: Record<Unit, number>;
  standard: Standard;
  inputUnit: Unit;
  inputValue: number;
};

function getBase(standard: Standard): number {
  return standard === "binary" ? 1024 : 1000;
}

function getFactors(standard: Standard): Record<Unit, number> {
  const base = getBase(standard);
  return {
    B:  1,
    KB: Math.pow(base, 1),
    MB: Math.pow(base, 2),
    GB: Math.pow(base, 3),
    TB: Math.pow(base, 4),
    PB: Math.pow(base, 5),
  };
}

export function convert(value: number, fromUnit: Unit, standard: Standard): ConversionResult {
  const factors = getFactors(standard);
  const bytes = value * factors[fromUnit];
  const values = {} as Record<Unit, number>;
  for (const unit of UNITS) {
    values[unit] = bytes / factors[unit];
  }
  return { bytes, values, standard, inputUnit: fromUnit, inputValue: value };
}

export function formatValue(n: number): string {
  if (n === 0) return "0";
  if (!isFinite(n)) return "∞";

  // Very small values
  if (n < 0.000001) return n.toExponential(4);
  if (n < 0.001) return n.toPrecision(4);

  // Preserve useful precision
  if (n < 1) return parseFloat(n.toPrecision(6)).toString();
  if (n < 1000) return parseFloat(n.toPrecision(8)).toString();

  // Large values — use locale string with up to 3 decimal places
  const rounded = parseFloat(n.toPrecision(10));
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export function formatBytes(bytes: number): string {
  return bytes.toLocaleString("en-US");
}

export function buildCopyText(result: ConversionResult, standard: Standard): string {
  const base = getBase(standard);
  const lines = [
    `File Size Converter`,
    `===================`,
    `Input: ${result.inputValue} ${result.inputUnit}`,
    `Standard: ${standard === "binary" ? "Binary (1 KB = 1024 B)" : "Decimal (1 KB = 1000 B)"}`,
    ``,
    ...UNITS.map(u => {
      const label = standard === "binary" ? UNIT_LABELS[u].binary : UNIT_LABELS[u].decimal;
      return `${label.padEnd(8)} = ${formatValue(result.values[u])}`;
    }),
  ];
  return lines.join("\n");
}

export function buildShareText(result: ConversionResult, standard: Standard): string {
  return UNITS
    .filter(u => result.values[u] >= 0.000001 && result.values[u] < 1e15)
    .map(u => {
      const label = standard === "binary" ? UNIT_LABELS[u].binary : UNIT_LABELS[u].decimal;
      return `${formatValue(result.values[u])} ${label}`;
    })
    .join(" = ");
}

export function downloadFile(content: string, filename: string, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type HistoryEntry = {
  id: string;
  inputValue: number;
  inputUnit: Unit;
  standard: Standard;
  bytes: number;
  timestamp: number;
};

const HISTORY_KEY = "file_size_converter_history";

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">) {
  const history = getHistory();
  history.unshift({ ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
