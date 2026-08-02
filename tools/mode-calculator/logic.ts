// ── Mode Calculator Logic ──

export type SeparatorOption = "auto" | "comma" | "space" | "newline" | "tab";
export type ValueTypeOption = "auto" | "numbers" | "text";
export type SortOption = "original" | "ascending" | "descending";

export const SEPARATOR_OPTIONS: { value: SeparatorOption; label: string }[] = [
  { value: "auto", label: "Auto Detect" },
  { value: "comma", label: "Comma" },
  { value: "space", label: "Space" },
  { value: "newline", label: "New Line" },
  { value: "tab", label: "Tab" },
];

export const VALUE_TYPE_OPTIONS: { value: ValueTypeOption; label: string }[] = [
  { value: "auto", label: "Auto Detect" },
  { value: "numbers", label: "Numbers" },
  { value: "text", label: "Text" },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "original", label: "Original" },
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" },
];

function splitTokens(text: string, separator: SeparatorOption): string[] {
  let raw: string[];
  if (separator === "comma") raw = text.split(",");
  else if (separator === "space") raw = text.split(/\s+/);
  else if (separator === "newline") raw = text.split(/\r?\n/);
  else if (separator === "tab") raw = text.split("\t");
  else {
    // auto detect
    if (text.includes(",")) raw = text.split(",");
    else if (/\r?\n/.test(text.trim())) raw = text.split(/\r?\n/);
    else if (text.includes("\t")) raw = text.split("\t");
    else raw = text.split(/\s+/);
  }
  return raw.map((t) => t.trim()).filter((t) => t.length > 0);
}

export type ParsedValue = number | string;

export interface ParseResult {
  values: ParsedValue[];
  isNumeric: boolean;
  invalidCount: number;
}

export function parseValues(text: string, separator: SeparatorOption, valueType: ValueTypeOption): ParseResult {
  const tokens = splitTokens(text, separator);
  if (tokens.length === 0) return { values: [], isNumeric: false, invalidCount: 0 };

  if (valueType === "text") {
    return { values: tokens, isNumeric: false, invalidCount: 0 };
  }

  const allNumeric = tokens.every((t) => Number.isFinite(Number(t)) && t !== "");

  if (valueType === "numbers") {
    const values: ParsedValue[] = [];
    let invalidCount = 0;
    tokens.forEach((t) => {
      const n = Number(t);
      if (Number.isFinite(n) && t !== "") values.push(n);
      else invalidCount++;
    });
    return { values, isNumeric: true, invalidCount };
  }

  // auto
  if (allNumeric) {
    return { values: tokens.map((t) => Number(t)), isNumeric: true, invalidCount: 0 };
  }
  return { values: tokens, isNumeric: false, invalidCount: 0 };
}

export interface FrequencyRow {
  value: ParsedValue;
  frequency: number;
}

export interface ModeResult {
  modes: ParsedValue[];
  frequency: number;
  noMode: boolean;
  totalValues: number;
  uniqueValues: number;
  frequencyTable: FrequencyRow[];
  isNumeric: boolean;
  invalidCount: number;
  warning: string | null;
}

export function calculateMode(text: string, separator: SeparatorOption, valueType: ValueTypeOption, sort: SortOption): ModeResult {
  const { values, isNumeric, invalidCount } = parseValues(text, separator, valueType);

  if (values.length === 0) {
    return {
      modes: [], frequency: 0, noMode: false, totalValues: 0, uniqueValues: 0,
      frequencyTable: [], isNumeric, invalidCount,
      warning: "Please enter at least one value.",
    };
  }

  const frequency = new Map<ParsedValue, number>();
  const firstSeenOrder: ParsedValue[] = [];
  values.forEach((v) => {
    if (!frequency.has(v)) firstSeenOrder.push(v);
    frequency.set(v, (frequency.get(v) ?? 0) + 1);
  });

  let highest = 0;
  frequency.forEach((count) => { if (count > highest) highest = count; });

  const modes: ParsedValue[] = [];
  frequency.forEach((count, value) => { if (count === highest) modes.push(value); });

  const uniqueValues = frequency.size;
  const noMode = uniqueValues > 1 && new Set(frequency.values()).size === 1;

  let table: FrequencyRow[] = firstSeenOrder.map((value) => ({ value, frequency: frequency.get(value) ?? 0 }));
  if (sort === "ascending") {
    table = [...table].sort((a, b) => (isNumeric ? (a.value as number) - (b.value as number) : String(a.value).localeCompare(String(b.value))));
  } else if (sort === "descending") {
    table = [...table].sort((a, b) => (isNumeric ? (b.value as number) - (a.value as number) : String(b.value).localeCompare(String(a.value))));
  }

  return {
    modes: noMode ? [] : modes,
    frequency: noMode ? 0 : highest,
    noMode,
    totalValues: values.length,
    uniqueValues,
    frequencyTable: table,
    isNumeric,
    invalidCount,
    warning: invalidCount > 0 ? "Some values could not be processed." : null,
  };
}

// ── Sample data ────────────────────────────────────────────────────────────────

export const SAMPLE_DATASETS: { label: string; icon: string; data: string }[] = [
  { label: "Single Mode (Numbers)", icon: "🔢", data: "2,4,5,5,6,7,5,8" },
  { label: "Single Mode (Text)", icon: "🔤", data: "Red,Blue,Green,Red,Yellow,Red,Blue" },
  { label: "Multiple Modes", icon: "🔀", data: "1,2,2,3,3,4" },
];

export function generateRandomDataset(count = 20): string {
  const pool = [3, 7, 12, 15, 18, 21, 25, 30];
  const values = Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]);
  return values.join(", ");
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function formatValue(v: ParsedValue): string {
  return String(v);
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(text: string, separator: SeparatorOption, valueType: ValueTypeOption): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("data", text);
  url.searchParams.set("sep", separator);
  url.searchParams.set("type", valueType);
  return url.toString();
}

export function parseShareParams(): { text: string; separator: SeparatorOption; valueType: ValueTypeOption } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const data = p.get("data");
  if (!data) return null;
  const sep = p.get("sep") as SeparatorOption;
  const type = p.get("type") as ValueTypeOption;
  return {
    text: data,
    separator: SEPARATOR_OPTIONS.some((o) => o.value === sep) ? sep : "auto",
    valueType: VALUE_TYPE_OPTIONS.some((o) => o.value === type) ? type : "auto",
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  text: string;
  modes: ParsedValue[];
  frequency: number;
}

const STORAGE_KEY = "mode-calculator-history";

export function saveHistory(text: string, modes: ParsedValue[], frequency: number): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), text, modes, frequency };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: ModeResult): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Mode Calculation Report",
    "========================",
    `Generated: ${ts}`,
    "",
    result.noMode ? "Mode: No Mode (every value appears the same number of times)" : `Mode: ${result.modes.map(formatValue).join(", ")}`,
    `Frequency: ${result.frequency}`,
    `Number of Modes: ${result.modes.length}`,
    `Total Values: ${result.totalValues}`,
    `Unique Values: ${result.uniqueValues}`,
  ];
  if (result.invalidCount > 0) lines.push(`Invalid Values Ignored: ${result.invalidCount}`);
  lines.push("", "Formula: Mode = Value(s) with the highest frequency", "", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: ModeResult): string {
  const rows: (string | number)[][] = [
    ["Value", "Frequency"],
    ...result.frequencyTable.map((row) => [formatValue(row.value), row.frequency]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ModeResult): string {
  return JSON.stringify(
    {
      mode: result.modes,
      frequency: result.frequency,
      totalValues: result.totalValues,
      uniqueValues: result.uniqueValues,
      noMode: result.noMode,
      frequencyTable: result.frequencyTable,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ModeResult): string {
  const ts = new Date().toLocaleString("en-US");
  const rows = result.frequencyTable.map((row) => `<tr><td>${formatValue(row.value)}</td><td>${row.frequency}</td></tr>`).join("");
  return `<!DOCTYPE html><html><head><title>Mode Calculation Report</title>
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
    <h1>Mode Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Mode</td><td><strong>${result.noMode ? "No Mode" : result.modes.map(formatValue).join(", ")}</strong></td></tr>
      <tr><td>Frequency</td><td>${result.frequency}</td></tr>
      <tr><td>Total Values</td><td>${result.totalValues}</td></tr>
      <tr><td>Unique Values</td><td>${result.uniqueValues}</td></tr>
    </table>
    <h2>Frequency Table</h2>
    <table>
      <tr><td><strong>Value</strong></td><td><strong>Frequency</strong></td></tr>
      ${rows}
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

export const DEFAULT_TEXT = "2,4,5,5,6,7,5,8";
