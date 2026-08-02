// ── Data Pipeline Latency Calculator Logic ──

export type LatencyUnit = "ms" | "sec" | "min";
export type StageType =
  | "source" | "queue" | "transformation" | "processing" | "validation"
  | "database" | "cache" | "storage" | "network" | "api" | "warehouse" | "custom";

export const UNIT_MS: Record<LatencyUnit, number> = { ms: 1, sec: 1000, min: 60000 };
export const UNIT_LABELS: Record<LatencyUnit, string> = { ms: "ms", sec: "sec", min: "min" };
export const UNIT_ORDER: LatencyUnit[] = ["ms", "sec", "min"];

export const STAGE_TYPE_META: Record<StageType, { label: string; color: string }> = {
  source: { label: "Source", color: "#2563eb" },
  queue: { label: "Queue", color: "#7c3aed" },
  transformation: { label: "Transformation", color: "#db2777" },
  processing: { label: "Processing", color: "#058554" },
  validation: { label: "Validation", color: "#0891b2" },
  database: { label: "Database", color: "#d97706" },
  cache: { label: "Cache", color: "#65a30d" },
  storage: { label: "Storage", color: "#4f46e5" },
  network: { label: "Network", color: "#dc2626" },
  api: { label: "API", color: "#0d9488" },
  warehouse: { label: "Warehouse", color: "#9333ea" },
  custom: { label: "Custom", color: "#6b7280" },
};
export const STAGE_TYPE_ORDER: StageType[] = [
  "source", "queue", "transformation", "processing", "validation",
  "database", "cache", "storage", "network", "api", "warehouse", "custom",
];

export type ParallelGroup = "A" | "B" | "C";
export const PARALLEL_GROUP_ORDER: ParallelGroup[] = ["A", "B", "C"];

export interface Stage {
  id: string;
  name: string;
  value: number;
  unit: LatencyUnit;
  type: StageType;
  parallel: boolean;
  groupId: ParallelGroup;
}

let idCounter = 0;
export function makeStageId(): string {
  idCounter += 1;
  return `st${Date.now().toString(36)}${idCounter}`;
}

export function makeStage(overrides: Partial<Stage> = {}): Stage {
  return {
    id: makeStageId(),
    name: "New Stage",
    value: 100,
    unit: "ms",
    type: "processing",
    parallel: false,
    groupId: "A",
    ...overrides,
  };
}

export const DEFAULT_STAGES: Stage[] = [
  makeStage({ name: "Source Delay", value: 200, unit: "ms", type: "source" }),
  makeStage({ name: "Processing", value: 350, unit: "ms", type: "processing" }),
  makeStage({ name: "Queue Delay", value: 120, unit: "ms", type: "queue" }),
  makeStage({ name: "Database Write", value: 180, unit: "ms", type: "database" }),
  makeStage({ name: "Network Delay", value: 80, unit: "ms", type: "network" }),
];

export const DEFAULT_PIPELINE_NAME = "Customer Analytics Pipeline";

export const PRESETS: { label: string; name: string; stages: Partial<Stage>[] }[] = [
  {
    label: "Streaming ETL",
    name: "Streaming ETL Pipeline",
    stages: [
      { name: "Source Polling", value: 2, unit: "sec", type: "source" },
      { name: "Processing", value: 5, unit: "sec", type: "processing" },
      { name: "Transformation", value: 3, unit: "sec", type: "transformation" },
      { name: "Loading", value: 8, unit: "sec", type: "warehouse" },
    ],
  },
  {
    label: "Kafka + Spark + Warehouse",
    name: "Kafka Analytics Pipeline",
    stages: [
      { name: "Kafka Consumer", value: 250, unit: "ms", type: "queue" },
      { name: "Spark Processing", value: 4, unit: "sec", type: "processing" },
      { name: "Warehouse Load", value: 9, unit: "sec", type: "warehouse" },
    ],
  },
  {
    label: "Parallel Processing Demo",
    name: "Parallel Processing Pipeline",
    stages: [
      { name: "Ingestion", value: 500, unit: "ms", type: "source", parallel: false },
      { name: "Processing 1", value: 900, unit: "ms", type: "processing", parallel: true, groupId: "A" },
      { name: "Processing 2", value: 1200, unit: "ms", type: "processing", parallel: true, groupId: "A" },
      { name: "Processing 3", value: 700, unit: "ms", type: "processing", parallel: true, groupId: "A" },
      { name: "Database Write", value: 400, unit: "ms", type: "database", parallel: false },
    ],
  },
];

// ── Calculation ───────────────────────────────────────────────────────────────

export function toMs(value: number, unit: LatencyUnit): number {
  return value * UNIT_MS[unit];
}

export function formatDuration(ms: number, decimals = 2): string {
  if (!isFinite(ms)) return "—";
  if (ms < 1000) return `${Math.round(ms)} ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(decimals)} sec`;
  return `${(ms / 60000).toFixed(decimals)} min`;
}

export interface StageBreakdown {
  stage: Stage;
  ms: number;
  percentOfTotal: number;
  isBottleneck: boolean;
  isOutlier: boolean;
}

export interface PipelineResult {
  totalLatencyMs: number;
  sequentialDelayMs: number;
  parallelDelayMs: number;
  averageStageMs: number;
  maxStageMs: number;
  minStageMs: number;
  totalStageCount: number;
  bottleneckStage: Stage | null;
  outlierStages: Stage[];
  breakdown: StageBreakdown[];
  groupBreakdown: { group: ParallelGroup; stages: Stage[]; maxMs: number }[];
}

export function calculatePipeline(stages: Stage[]): PipelineResult | null {
  if (stages.length === 0) return null;

  const msValues = stages.map((s) => toMs(s.value, s.unit));
  const rawSum = msValues.reduce((a, b) => a + b, 0);

  const parallelStages = stages.filter((s) => s.parallel);
  const sequentialStages = stages.filter((s) => !s.parallel);

  const sequentialDelayMs = sequentialStages.reduce((sum, s) => sum + toMs(s.value, s.unit), 0);

  const groups = new Map<ParallelGroup, Stage[]>();
  for (const s of parallelStages) {
    if (!groups.has(s.groupId)) groups.set(s.groupId, []);
    groups.get(s.groupId)!.push(s);
  }
  const groupBreakdown = Array.from(groups.entries()).map(([group, groupStages]) => ({
    group,
    stages: groupStages,
    maxMs: Math.max(...groupStages.map((s) => toMs(s.value, s.unit))),
  }));
  const parallelDelayMs = groupBreakdown.reduce((sum, g) => sum + g.maxMs, 0);

  const totalLatencyMs = sequentialDelayMs + parallelDelayMs;
  const averageStageMs = rawSum / stages.length;
  const maxStageMs = Math.max(...msValues);
  const minStageMs = Math.min(...msValues);

  const bottleneckIdx = msValues.indexOf(maxStageMs);
  const bottleneckStage = bottleneckIdx >= 0 ? stages[bottleneckIdx] : null;

  const outlierThreshold = averageStageMs * 2;
  const outlierStages = stages.length >= 3 ? stages.filter((s, i) => msValues[i] > outlierThreshold) : [];

  const breakdown: StageBreakdown[] = stages.map((s, i) => ({
    stage: s,
    ms: msValues[i],
    percentOfTotal: rawSum > 0 ? (msValues[i] / rawSum) * 100 : 0,
    isBottleneck: s.id === bottleneckStage?.id,
    isOutlier: outlierStages.some((o) => o.id === s.id),
  }));

  return {
    totalLatencyMs, sequentialDelayMs, parallelDelayMs, averageStageMs, maxStageMs, minStageMs,
    totalStageCount: stages.length, bottleneckStage, outlierStages, breakdown, groupBreakdown,
  };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateStages(stages: Stage[]): ValidationErrors {
  const e: ValidationErrors = {};
  if (stages.length === 0) { e._global = "Add at least one stage to calculate pipeline latency."; return e; }
  stages.forEach((s) => {
    if (!s.name.trim()) e[`name-${s.id}`] = "Stage name cannot be empty.";
    if (!s.value || s.value <= 0) e[`value-${s.id}`] = "Latency value must be greater than zero.";
  });
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

const INPUTS_KEY = "data-pipeline-latency-calculator-inputs";

export interface PipelineState {
  pipelineName: string;
  stages: Stage[];
}

export function saveInputs(state: PipelineState): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(state)); } catch {}
}

export function loadInputs(): PipelineState | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.stages)) return null;
    return parsed as PipelineState;
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  state: PipelineState;
  result: PipelineResult;
}

const HISTORY_KEY = "data-pipeline-latency-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 15))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Import / Export ───────────────────────────────────────────────────────────

export function buildJSONExport(state: PipelineState): string {
  return JSON.stringify(
    {
      pipelineName: state.pipelineName,
      stages: state.stages.map((s) => ({ name: s.name, value: s.value, unit: s.unit, type: s.type, parallel: s.parallel, groupId: s.groupId })),
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export interface ImportResult {
  state: PipelineState | null;
  error: string | null;
}

export function parseJSONImport(text: string): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { state: null, error: "This file is not valid JSON." };
  }
  if (!data || typeof data !== "object" || !Array.isArray((data as Record<string, unknown>).stages)) {
    return { state: null, error: "Expected a JSON object with a \"stages\" array." };
  }
  const raw = data as { pipelineName?: string; stages: unknown[] };
  const stages: Stage[] = [];
  for (const item of raw.stages) {
    if (!item || typeof item !== "object") continue;
    const s = item as Record<string, unknown>;
    if (typeof s.name !== "string" || typeof s.value !== "number") continue;
    stages.push(makeStage({
      name: s.name,
      value: s.value,
      unit: UNIT_ORDER.includes(s.unit as LatencyUnit) ? (s.unit as LatencyUnit) : "ms",
      type: STAGE_TYPE_ORDER.includes(s.type as StageType) ? (s.type as StageType) : "custom",
      parallel: Boolean(s.parallel),
      groupId: PARALLEL_GROUP_ORDER.includes(s.groupId as ParallelGroup) ? (s.groupId as ParallelGroup) : "A",
    }));
  }
  if (stages.length === 0) return { state: null, error: "No valid pipeline stages were found in this file." };
  return { state: { pipelineName: typeof raw.pipelineName === "string" ? raw.pipelineName : "Imported Pipeline", stages }, error: null };
}

export function buildCSVExport(state: PipelineState, result: PipelineResult): string {
  const rows = [
    ["Stage", "Type", "Value", "Unit", "Latency (ms)", "Parallel", "Group", "% of Total"],
    ...result.breakdown.map((b) => [
      b.stage.name, STAGE_TYPE_META[b.stage.type].label, String(b.stage.value), b.stage.unit,
      String(Math.round(b.ms)), b.stage.parallel ? "Yes" : "No", b.stage.parallel ? b.stage.groupId : "-",
      `${b.percentOfTotal.toFixed(1)}%`,
    ]),
    [],
    ["Pipeline", state.pipelineName],
    ["Total Latency (ms)", String(Math.round(result.totalLatencyMs))],
    ["Sequential Delay (ms)", String(Math.round(result.sequentialDelayMs))],
    ["Parallel Delay (ms)", String(Math.round(result.parallelDelayMs))],
    ["Average Stage (ms)", String(Math.round(result.averageStageMs))],
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

export function buildTextSummary(state: PipelineState, result: PipelineResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Data Pipeline Latency Calculator Report",
    "========================================",
    `Generated: ${ts}`,
    `Pipeline: ${state.pipelineName}`,
    "",
    `Total Pipeline Latency: ${formatDuration(result.totalLatencyMs)}`,
    `Sequential Delay: ${formatDuration(result.sequentialDelayMs)}`,
    `Parallel Delay: ${formatDuration(result.parallelDelayMs)}`,
    `Total Stages: ${result.totalStageCount}`,
    `Average Stage Latency: ${formatDuration(result.averageStageMs)}`,
    `Longest Stage: ${result.bottleneckStage?.name ?? "—"} (${formatDuration(result.maxStageMs)})`,
    `Shortest Stage: ${formatDuration(result.minStageMs)}`,
    "",
    "Stages:",
    ...state.stages.map((s, i) => `  ${i + 1}. ${s.name} — ${s.value} ${s.unit} (${STAGE_TYPE_META[s.type].label}${s.parallel ? `, Parallel Group ${s.groupId}` : ""})`),
    "",
    "Generated by Data Pipeline Latency Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildMarkdownSummary(state: PipelineState, result: PipelineResult): string {
  return [
    `### ${state.pipelineName} — Latency Summary`,
    "",
    `**Total Latency:** ${formatDuration(result.totalLatencyMs)}`,
    `**Sequential Delay:** ${formatDuration(result.sequentialDelayMs)}`,
    `**Parallel Delay:** ${formatDuration(result.parallelDelayMs)}`,
    `**Bottleneck Stage:** ${result.bottleneckStage?.name ?? "—"} (${formatDuration(result.maxStageMs)})`,
    "",
    "| Stage | Type | Latency | % of Total |",
    "|---|---|---|---|",
    ...result.breakdown.map((b) => `| ${b.stage.name} | ${STAGE_TYPE_META[b.stage.type].label} | ${formatDuration(b.ms)} | ${b.percentOfTotal.toFixed(1)}% |`),
  ].join("\n");
}

export function buildPrintHTML(state: PipelineState, result: PipelineResult): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Pipeline Latency Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 680px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td, th { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 13px; text-align: left; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>${state.pipelineName}</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Summary</h2>
    <table>
      <tr><td>Total Pipeline Latency</td><td><strong>${formatDuration(result.totalLatencyMs)}</strong></td></tr>
      <tr><td>Sequential Delay</td><td>${formatDuration(result.sequentialDelayMs)}</td></tr>
      <tr><td>Parallel Delay</td><td>${formatDuration(result.parallelDelayMs)}</td></tr>
      <tr><td>Total Stages</td><td>${result.totalStageCount}</td></tr>
      <tr><td>Bottleneck Stage</td><td>${result.bottleneckStage?.name ?? "—"} (${formatDuration(result.maxStageMs)})</td></tr>
    </table>
    <h2>Stages</h2>
    <table>
      <tr><th>Stage</th><th>Type</th><th>Latency</th><th>% of Total</th></tr>
      ${result.breakdown.map((b) => `<tr><td>${b.stage.name}</td><td>${STAGE_TYPE_META[b.stage.type].label}</td><td>${formatDuration(b.ms)}</td><td>${b.percentOfTotal.toFixed(1)}%</td></tr>`).join("")}
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
