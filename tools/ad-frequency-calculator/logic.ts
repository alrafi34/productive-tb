// ── Ad Frequency Calculator Logic ──

export type FrequencyStatus = "very-low" | "good" | "healthy" | "high" | "very-high";

export interface StatusMeta {
  label: string;
  color: string;
  bg: string;
  dot: string;
  explanation: string;
  recommendation: string;
}

export const STATUS_META: Record<FrequencyStatus, StatusMeta> = {
  "very-low": {
    label: "Very Low Frequency",
    color: "text-slate-700",
    bg: "bg-slate-50",
    dot: "bg-slate-400",
    explanation: "Your ad likely isn't being seen often enough for people to remember it.",
    recommendation: "Increase your budget, extend the campaign duration, or expand placements so the same audience sees the ad more often.",
  },
  good: {
    label: "Good Frequency",
    color: "text-blue-700",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
    explanation: "Your audience is seeing the ad a reasonable number of times without excessive repetition.",
    recommendation: "Campaign is performing normally. Keep monitoring CTR and conversion rate as the campaign continues.",
  },
  healthy: {
    label: "Healthy Frequency",
    color: "text-green-700",
    bg: "bg-green-50",
    dot: "bg-green-500",
    explanation: "This is the ideal exposure range for most awareness and consideration campaigns.",
    recommendation: "Campaign is within a common performance range. Continue monitoring CTR and conversion rate.",
  },
  high: {
    label: "High Frequency",
    color: "text-orange-700",
    bg: "bg-orange-50",
    dot: "bg-orange-500",
    explanation: "People are seeing your ad quite often — performance may start to soften if this continues.",
    recommendation: "Monitor CTR closely and watch for early signs of audience fatigue. Consider refreshing creatives or expanding audience targeting.",
  },
  "very-high": {
    label: "Very High Frequency",
    color: "text-red-700",
    bg: "bg-red-50",
    dot: "bg-red-500",
    explanation: "Your audience is seeing this ad far more than average, which often leads to ad fatigue and rising costs.",
    recommendation: "Refresh creatives, expand targeting, reduce budget, or pause the campaign if CTR and conversion rate are dropping.",
  },
};

export function getStatus(frequency: number): FrequencyStatus {
  if (frequency < 1.5) return "very-low";
  if (frequency < 2.5) return "good";
  if (frequency <= 4) return "healthy";
  if (frequency <= 6) return "high";
  return "very-high";
}

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface FrequencyInputs {
  impressions: number;
  reach: number;
  decimalPlaces: number;
}

export interface FrequencyResult {
  frequency: number;
  status: FrequencyStatus;
  meta: StatusMeta;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FrequencyInputs;
  result: FrequencyResult;
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculateFrequency(inputs: FrequencyInputs): FrequencyResult {
  const frequency = parseFloat((inputs.impressions / inputs.reach).toFixed(inputs.decimalPlaces));
  const status = getStatus(frequency);
  return { frequency, status, meta: STATUS_META[status] };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: FrequencyInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (inputs.impressions <= 0) e.impressions = "Impressions must be greater than zero.";
  if (inputs.reach <= 0) e.reach = "Reach must be greater than zero.";
  return e;
}

export function getWarning(inputs: FrequencyInputs): string | null {
  if (inputs.reach > 0 && inputs.impressions > 0 && inputs.reach > inputs.impressions) {
    return "Reach is greater than impressions. Please verify your numbers.";
  }
  return null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "ad-frequency-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: FrequencyResult, inputs: FrequencyInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Ad Frequency Calculator Report",
    "===============================",
    `Generated: ${ts}`,
    "",
    "INPUTS",
    `Impressions: ${formatFull(inputs.impressions)}`,
    `Reach: ${formatFull(inputs.reach)}`,
    "",
    "RESULTS",
    `Frequency: ${result.frequency.toFixed(inputs.decimalPlaces)}`,
    `Status: ${result.meta.label}`,
    `Recommendation: ${result.meta.recommendation}`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildShareSummary(result: FrequencyResult, inputs: FrequencyInputs): string {
  return [
    "Campaign Frequency",
    `Impressions: ${formatFull(inputs.impressions)}`,
    `Reach: ${formatFull(inputs.reach)}`,
    `Frequency: ${result.frequency.toFixed(inputs.decimalPlaces)}`,
    `Status: ${result.meta.label}`,
    "",
    "Calculated with Productive Toolbox — https://productivetoolbox.com/tools/marketing/ad-frequency-calculator",
  ].join("\n");
}

export function buildCSVReport(result: FrequencyResult, inputs: FrequencyInputs): string {
  const rows = [
    ["Impressions", "Reach", "Frequency", "Status", "Recommendation"],
    [
      String(inputs.impressions),
      String(inputs.reach),
      result.frequency.toFixed(inputs.decimalPlaces),
      result.meta.label,
      result.meta.recommendation,
    ],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: FrequencyResult, inputs: FrequencyInputs): string {
  return JSON.stringify(
    {
      impressions: inputs.impressions,
      reach: inputs.reach,
      frequency: result.frequency,
      status: result.meta.label,
      recommendation: result.meta.recommendation,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: FrequencyResult, inputs: FrequencyInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Ad Frequency Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    p.rec { font-size: 14px; line-height: 1.6; margin-top: 8px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Ad Frequency Calculator Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Inputs</h2>
    <table>
      <tr><td>Impressions</td><td>${formatFull(inputs.impressions)}</td></tr>
      <tr><td>Reach</td><td>${formatFull(inputs.reach)}</td></tr>
    </table>
    <h2>Results</h2>
    <table>
      <tr><td>Frequency</td><td><strong>${result.frequency.toFixed(inputs.decimalPlaces)}</strong></td></tr>
      <tr><td>Status</td><td>${result.meta.label}</td></tr>
    </table>
    <h2>Recommendation</h2>
    <p class="rec">${result.meta.recommendation}</p>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── PNG summary card (canvas) ─────────────────────────────────────────────────

export function drawSummaryCanvas(result: FrequencyResult, inputs: FrequencyInputs): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const width = 800, height = 480;
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Header bar
  ctx.fillStyle = "#058554";
  ctx.fillRect(0, 0, width, 96);
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 26px -apple-system, Arial, sans-serif";
  ctx.fillText("Ad Frequency Calculator", 32, 44);
  ctx.font = "400 14px -apple-system, Arial, sans-serif";
  ctx.fillText("productivetoolbox.com", 32, 70);

  // Frequency (big number)
  ctx.fillStyle = "#111827";
  ctx.font = "700 72px -apple-system, Arial, sans-serif";
  ctx.fillText(result.frequency.toFixed(inputs.decimalPlaces), 32, 200);

  ctx.font = "500 18px -apple-system, Arial, sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText("Average views per person", 32, 228);

  // Status badge
  ctx.font = "600 18px -apple-system, Arial, sans-serif";
  ctx.fillStyle = "#058554";
  ctx.fillText(result.meta.label, 32, 268);

  // Divider
  ctx.strokeStyle = "#e5e7eb";
  ctx.beginPath(); ctx.moveTo(32, 292); ctx.lineTo(width - 32, 292); ctx.stroke();

  // Inputs
  ctx.font = "400 16px -apple-system, Arial, sans-serif";
  ctx.fillStyle = "#374151";
  ctx.fillText(`Impressions: ${formatFull(inputs.impressions)}`, 32, 330);
  ctx.fillText(`Reach: ${formatFull(inputs.reach)}`, 32, 358);

  // Recommendation
  ctx.font = "600 15px -apple-system, Arial, sans-serif";
  ctx.fillStyle = "#111827";
  ctx.fillText("Recommendation", 32, 398);
  ctx.font = "400 14px -apple-system, Arial, sans-serif";
  ctx.fillStyle = "#6b7280";
  wrapText(ctx, result.meta.recommendation, 32, 422, width - 64, 20);

  return canvas;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let curY = y;
  for (const word of words) {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth && line !== "") {
      ctx.fillText(line, x, curY);
      line = word + " ";
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: FrequencyInputs = {
  impressions: 10000,
  reach: 2500,
  decimalPlaces: 2,
};
