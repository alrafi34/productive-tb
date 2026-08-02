// ── Index Size Calculator Logic ──

export type DatabaseEngine = "PostgreSQL" | "MySQL" | "MariaDB" | "SQL Server" | "Oracle" | "SQLite" | "Custom";
export const DATABASE_ENGINES: DatabaseEngine[] = ["PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Oracle", "SQLite", "Custom"];

export type IndexType = "B-Tree" | "Hash" | "Unique" | "Composite" | "Clustered" | "Non-Clustered" | "GIN" | "GiST" | "BRIN" | "Full Text" | "Bitmap";
export const INDEX_TYPES: IndexType[] = ["B-Tree", "Hash", "Unique", "Composite", "Clustered", "Non-Clustered", "GIN", "GiST", "BRIN", "Full Text", "Bitmap"];

export type CompressionLevel = "None" | "Basic" | "Medium" | "High";
export const COMPRESSION_LEVELS: CompressionLevel[] = ["None", "Basic", "Medium", "High"];

export type PageSizeKB = 4 | 8 | 16 | 32;
export const PAGE_SIZES: PageSizeKB[] = [4, 8, 16, 32];

// Typical per-entry pointer + row-header/metadata overhead by engine (bytes). Approximate.
export const ENGINE_DEFAULTS: Record<DatabaseEngine, { pointerSize: number; metadataSize: number; note: string }> = {
  PostgreSQL: { pointerSize: 8, metadataSize: 8, note: "Item pointer (6 bytes) plus tuple header overhead, rounded to typical alignment." },
  MySQL: { pointerSize: 6, metadataSize: 6, note: "InnoDB secondary indexes reference the clustered primary key (6-byte typical)." },
  MariaDB: { pointerSize: 6, metadataSize: 6, note: "Shares InnoDB/Aria storage engine characteristics with MySQL." },
  "SQL Server": { pointerSize: 8, metadataSize: 10, note: "Row ID or clustering key reference plus row header overhead." },
  Oracle: { pointerSize: 10, metadataSize: 8, note: "ROWID is a fixed 10-byte physical address." },
  SQLite: { pointerSize: 8, metadataSize: 4, note: "Variable-length rowid (up to 8 bytes) with minimal row overhead." },
  Custom: { pointerSize: 8, metadataSize: 8, note: "Generic estimate — adjust column and key sizes to model your engine." },
};

// Approximate size multiplier relative to a standard B-Tree index. Approximate, for estimation only.
export const INDEX_TYPE_MULTIPLIERS: Record<IndexType, { multiplier: number; note: string }> = {
  "B-Tree": { multiplier: 1.0, note: "Standard balanced tree index — the baseline for this estimate." },
  Hash: { multiplier: 0.85, note: "No ordering metadata to store, typically slightly smaller than B-Tree." },
  Unique: { multiplier: 1.0, note: "Same structure as B-Tree with a uniqueness constraint." },
  Composite: { multiplier: 1.0, note: "Multi-column index — additional columns are added to the entry size below." },
  Clustered: { multiplier: 1.3, note: "Data rows are stored with the index, increasing effective size." },
  "Non-Clustered": { multiplier: 1.0, note: "Stores a separate structure pointing back to the data rows." },
  GIN: { multiplier: 1.8, note: "Inverted index — larger due to per-value posting lists (PostgreSQL)." },
  GiST: { multiplier: 1.5, note: "Generalized search tree — larger due to bounding structures (PostgreSQL)." },
  BRIN: { multiplier: 0.05, note: "Block range index — extremely compact, stores summaries per block range." },
  "Full Text": { multiplier: 2.0, note: "Larger due to term dictionaries and positional data." },
  Bitmap: { multiplier: 0.3, note: "Very compact for low-cardinality columns." },
};

export const COMPRESSION_RATIOS: Record<CompressionLevel, number> = {
  None: 1.0,
  Basic: 0.85,
  Medium: 0.65,
  High: 0.45,
};

export interface IndexSizeInputs {
  engine: DatabaseEngine;
  indexType: IndexType;
  rows: number;
  columnSize: number;
  primaryKeySize: number;
  compositeColumns: number;
  fillFactor: number; // 50-100
  overheadPercent: number; // 0-50
  pageSizeKB: PageSizeKB;
  compression: CompressionLevel;
}

export interface IndexSizeResult {
  entrySize: number | null;
  rawIndexSize: number | null;
  typeAdjustedSize: number | null;
  compressedSize: number | null;
  fillFactorAdjustedSize: number | null;
  finalSize: number | null;
  estimatedPages: number | null;
  compressionSaved: number | null;
  fillFactorImpact: number | null;
  overheadImpact: number | null;
  storageOverheadPercent: number | null;
  warning: string | null;
  error: string | null;
}

const LARGE_INDEX_WARNING_BYTES = 2 * 1024 ** 3; // 2 GB

export function calculateIndexSize(inputs: IndexSizeInputs): IndexSizeResult {
  const empty: IndexSizeResult = {
    entrySize: null, rawIndexSize: null, typeAdjustedSize: null, compressedSize: null,
    fillFactorAdjustedSize: null, finalSize: null, estimatedPages: null, compressionSaved: null,
    fillFactorImpact: null, overheadImpact: null, storageOverheadPercent: null, warning: null, error: null,
  };

  const { engine, indexType, rows, columnSize, primaryKeySize, compositeColumns, fillFactor, overheadPercent, pageSizeKB, compression } = inputs;

  if (!Number.isFinite(rows) || rows <= 0) return { ...empty, error: "Rows must be greater than zero." };
  if (!Number.isFinite(columnSize) || columnSize < 0) return { ...empty, error: "Column size cannot be negative." };
  if (!Number.isFinite(primaryKeySize) || primaryKeySize < 0) return { ...empty, error: "Primary key size cannot be negative." };
  if (indexType === "Composite" && (!Number.isFinite(compositeColumns) || compositeColumns < 1)) {
    return { ...empty, error: "Composite index requires at least 1 additional column." };
  }
  if (!Number.isFinite(fillFactor) || fillFactor < 50 || fillFactor > 100) return { ...empty, error: "Fill factor must be between 50% and 100%." };
  if (!Number.isFinite(overheadPercent) || overheadPercent < 0 || overheadPercent > 50) return { ...empty, error: "Estimated overhead must be between 0% and 50%." };

  const { pointerSize, metadataSize } = ENGINE_DEFAULTS[engine];
  const compositeBytes = indexType === "Composite" ? compositeColumns * columnSize : 0;
  const entrySize = columnSize + primaryKeySize + pointerSize + metadataSize + compositeBytes;

  const rawIndexSize = entrySize * rows;
  const typeMultiplier = INDEX_TYPE_MULTIPLIERS[indexType].multiplier;
  const typeAdjustedSize = rawIndexSize * typeMultiplier;

  const compressionRatio = COMPRESSION_RATIOS[compression];
  const compressedSize = typeAdjustedSize * compressionRatio;
  const compressionSaved = typeAdjustedSize - compressedSize;

  const fillFactorAdjustedSize = compressedSize / (fillFactor / 100);
  const fillFactorImpact = fillFactorAdjustedSize - compressedSize;

  const finalSize = fillFactorAdjustedSize * (1 + overheadPercent / 100);
  const overheadImpact = finalSize - fillFactorAdjustedSize;

  const pageSizeBytes = pageSizeKB * 1024;
  const estimatedPages = Math.ceil(finalSize / pageSizeBytes);

  const storageOverheadPercent = rawIndexSize > 0 ? ((finalSize - rawIndexSize) / rawIndexSize) * 100 : 0;

  const warning = finalSize > LARGE_INDEX_WARNING_BYTES
    ? "Very Large Index — may impact write performance and increase maintenance time."
    : null;

  return {
    entrySize, rawIndexSize, typeAdjustedSize, compressedSize, fillFactorAdjustedSize, finalSize,
    estimatedPages, compressionSaved, fillFactorImpact, overheadImpact, storageOverheadPercent, warning, error: null,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────

const BYTE_UNITS = ["Bytes", "KB", "MB", "GB", "TB"];

export function formatBytes(bytes: number | null, precision = 2): string {
  if (bytes === null || !Number.isFinite(bytes)) return "—";
  if (bytes === 0) return "0 Bytes";
  const idx = Math.min(BYTE_UNITS.length - 1, Math.max(0, Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024))));
  const value = bytes / 1024 ** idx;
  return `${value.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision })} ${BYTE_UNITS[idx]}`;
}

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const DEFAULT_ENGINE: DatabaseEngine = "PostgreSQL";
export const DEFAULT_INDEX_TYPE: IndexType = "B-Tree";
export const DEFAULT_ROWS = 5_000_000;
export const DEFAULT_COLUMN_SIZE = 16;
export const DEFAULT_PRIMARY_KEY_SIZE = 8;
export const DEFAULT_COMPOSITE_COLUMNS = 2;
export const DEFAULT_FILL_FACTOR = 90;
export const DEFAULT_OVERHEAD_PERCENT = 20;
export const DEFAULT_PAGE_SIZE: PageSizeKB = 8;
export const DEFAULT_COMPRESSION: CompressionLevel = "None";

export const PRESETS: { label: string; engine: DatabaseEngine; indexType: IndexType; rows: number; columnSize: number; primaryKeySize: number }[] = [
  { label: "PostgreSQL B-Tree (5M rows)", engine: "PostgreSQL", indexType: "B-Tree", rows: 5_000_000, columnSize: 16, primaryKeySize: 8 },
  { label: "MySQL VARCHAR (25M rows)", engine: "MySQL", indexType: "B-Tree", rows: 25_000_000, columnSize: 40, primaryKeySize: 8 },
  { label: "SQL Server Composite (150M rows)", engine: "SQL Server", indexType: "Composite", rows: 150_000_000, columnSize: 16, primaryKeySize: 8 },
  { label: "PostgreSQL BRIN (1B rows)", engine: "PostgreSQL", indexType: "BRIN", rows: 1_000_000_000, columnSize: 8, primaryKeySize: 8 },
];

// ── Column type auto-suggestions ─────────────────────────────────────────

export const COLUMN_TYPE_SUGGESTIONS: { label: string; bytes: number }[] = [
  { label: "TINYINT / BOOLEAN", bytes: 1 },
  { label: "SMALLINT", bytes: 2 },
  { label: "INT", bytes: 4 },
  { label: "BIGINT", bytes: 8 },
  { label: "UUID", bytes: 16 },
  { label: "VARCHAR(40) avg", bytes: 40 },
  { label: "DATE", bytes: 4 },
  { label: "TIMESTAMP", bytes: 8 },
];

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(inputs: IndexSizeInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("engine", inputs.engine);
  url.searchParams.set("type", inputs.indexType);
  url.searchParams.set("rows", String(inputs.rows));
  url.searchParams.set("col", String(inputs.columnSize));
  url.searchParams.set("pk", String(inputs.primaryKeySize));
  url.searchParams.set("comp", String(inputs.compositeColumns));
  url.searchParams.set("fill", String(inputs.fillFactor));
  url.searchParams.set("overhead", String(inputs.overheadPercent));
  url.searchParams.set("page", String(inputs.pageSizeKB));
  url.searchParams.set("compression", inputs.compression);
  return url.toString();
}

export function parseShareParams(): Partial<IndexSizeInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const rows = p.get("rows");
  if (rows === null) return null;
  return {
    engine: (DATABASE_ENGINES as string[]).includes(p.get("engine") ?? "") ? (p.get("engine") as DatabaseEngine) : DEFAULT_ENGINE,
    indexType: (INDEX_TYPES as string[]).includes(p.get("type") ?? "") ? (p.get("type") as IndexType) : DEFAULT_INDEX_TYPE,
    rows: parseFloat(rows),
    columnSize: parseFloat(p.get("col") ?? String(DEFAULT_COLUMN_SIZE)),
    primaryKeySize: parseFloat(p.get("pk") ?? String(DEFAULT_PRIMARY_KEY_SIZE)),
    compositeColumns: parseFloat(p.get("comp") ?? String(DEFAULT_COMPOSITE_COLUMNS)),
    fillFactor: parseFloat(p.get("fill") ?? String(DEFAULT_FILL_FACTOR)),
    overheadPercent: parseFloat(p.get("overhead") ?? String(DEFAULT_OVERHEAD_PERCENT)),
    pageSizeKB: (parseInt(p.get("page") ?? String(DEFAULT_PAGE_SIZE), 10) as PageSizeKB) ?? DEFAULT_PAGE_SIZE,
    compression: (COMPRESSION_LEVELS as string[]).includes(p.get("compression") ?? "") ? (p.get("compression") as CompressionLevel) : DEFAULT_COMPRESSION,
  };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: IndexSizeInputs;
  finalSize: number;
}

const STORAGE_KEY = "index-size-calculator-history";

export function saveHistory(inputs: IndexSizeInputs, result: IndexSizeResult): void {
  if (result.error || result.finalSize === null) return;
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), inputs, finalSize: result.finalSize };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(inputs: IndexSizeInputs, result: IndexSizeResult): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Index Size Estimation Report",
    "==============================",
    `Generated: ${ts}`,
    "",
    `Database Engine: ${inputs.engine}`,
    `Index Type: ${inputs.indexType}`,
    `Number of Rows: ${inputs.rows.toLocaleString("en-US")}`,
    `Indexed Column Size: ${inputs.columnSize} Bytes`,
    `Primary Key Size: ${inputs.primaryKeySize} Bytes`,
    ...(inputs.indexType === "Composite" ? [`Composite Columns: ${inputs.compositeColumns}`] : []),
    `Fill Factor: ${inputs.fillFactor}%`,
    `Estimated Overhead: ${inputs.overheadPercent}%`,
    `Page Size: ${inputs.pageSizeKB} KB`,
    `Compression: ${inputs.compression}`,
    "",
    `Entry Size: ${formatNum(result.entrySize, 0)} Bytes`,
    `Raw Index Size: ${formatBytes(result.rawIndexSize)}`,
    `Compression Saved: ${formatBytes(result.compressionSaved)}`,
    `Estimated Pages: ${formatNum(result.estimatedPages, 0)}`,
    `Storage Overhead: ${formatNum(result.storageOverheadPercent, 1)}%`,
    "",
    `Estimated Index Size: ${formatBytes(result.finalSize)}`,
    "",
    ...(result.warning ? [`Warning: ${result.warning}`, ""] : []),
    "Note: This is an estimate. Actual index size depends on database engine internals, version, and storage configuration.",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(inputs: IndexSizeInputs, result: IndexSizeResult): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Database Engine", inputs.engine],
    ["Index Type", inputs.indexType],
    ["Number of Rows", inputs.rows],
    ["Indexed Column Size (Bytes)", inputs.columnSize],
    ["Primary Key Size (Bytes)", inputs.primaryKeySize],
    ["Fill Factor (%)", inputs.fillFactor],
    ["Estimated Overhead (%)", inputs.overheadPercent],
    ["Page Size (KB)", inputs.pageSizeKB],
    ["Compression", inputs.compression],
    ["Entry Size (Bytes)", formatNum(result.entrySize, 0)],
    ["Raw Index Size", formatBytes(result.rawIndexSize)],
    ["Estimated Pages", formatNum(result.estimatedPages, 0)],
    ["Storage Overhead (%)", formatNum(result.storageOverheadPercent, 1)],
    ["Estimated Index Size", formatBytes(result.finalSize)],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(inputs: IndexSizeInputs, result: IndexSizeResult): string {
  return JSON.stringify({ inputs, result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(inputs: IndexSizeInputs, result: IndexSizeResult): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Index Size Estimation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Index Size Estimation Report</h1>
    <p class="meta">Generated ${ts} · ${inputs.engine} · ${inputs.indexType}</p>
    <table>
      <tr><td>Rows</td><td>${inputs.rows.toLocaleString("en-US")}</td></tr>
      <tr><td>Entry Size</td><td>${formatNum(result.entrySize, 0)} Bytes</td></tr>
      <tr><td>Raw Index Size</td><td>${formatBytes(result.rawIndexSize)}</td></tr>
      <tr><td>Estimated Pages</td><td>${formatNum(result.estimatedPages, 0)}</td></tr>
      <tr><td>Storage Overhead</td><td>${formatNum(result.storageOverheadPercent, 1)}%</td></tr>
      <tr><td>Estimated Index Size</td><td><strong>${formatBytes(result.finalSize)}</strong></td></tr>
    </table>
    <footer>Estimate only — actual size depends on engine internals. Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
