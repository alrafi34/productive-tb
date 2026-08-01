// ── SERP CTR Estimator Logic ──

export type Dataset = "industry" | "backlinko" | "awr" | "fps" | "custom";
export type DeviceType = "desktop" | "mobile" | "combined";
export type Intent = "blended" | "informational" | "commercial" | "transactional" | "navigational";

export const DATASET_META: Record<Dataset, { label: string; short: string }> = {
  industry: { label: "Industry Average", short: "Industry Average" },
  backlinko: { label: "Backlinko (2023 Study)", short: "Backlinko" },
  awr: { label: "Advanced Web Ranking", short: "AWR" },
  fps: { label: "FirstPageSage", short: "FirstPageSage" },
  custom: { label: "Custom Dataset", short: "Custom" },
};

export const DATASET_ORDER: Dataset[] = ["industry", "backlinko", "awr", "fps", "custom"];

export const DEVICE_META: Record<DeviceType, { label: string; multiplier: number }> = {
  desktop: { label: "Desktop", multiplier: 1.08 },
  mobile: { label: "Mobile", multiplier: 0.88 },
  combined: { label: "Combined (Desktop + Mobile)", multiplier: 1.0 },
};

export const DEVICE_ORDER: DeviceType[] = ["combined", "desktop", "mobile"];

export const INTENT_META: Record<Intent, { label: string; multiplier: number }> = {
  blended: { label: "Any / Blended (no adjustment)", multiplier: 1.0 },
  informational: { label: "Informational", multiplier: 1.0 },
  commercial: { label: "Commercial Investigation", multiplier: 0.92 },
  transactional: { label: "Transactional", multiplier: 0.85 },
  navigational: { label: "Navigational", multiplier: 1.35 },
};

export const INTENT_ORDER: Intent[] = ["blended", "informational", "commercial", "transactional", "navigational"];

// ── CTR curve anchors (position → CTR %) per dataset, interpolated across 1–100 ──

export interface Anchor {
  pos: number;
  ctr: number;
}

const ANCHOR_SETS: Record<Exclude<Dataset, "custom">, Anchor[]> = {
  industry: [
    { pos: 1, ctr: 28 }, { pos: 2, ctr: 15 }, { pos: 3, ctr: 10 }, { pos: 4, ctr: 7 }, { pos: 5, ctr: 5 },
    { pos: 6, ctr: 4 }, { pos: 7, ctr: 3.5 }, { pos: 8, ctr: 3 }, { pos: 9, ctr: 2.5 }, { pos: 10, ctr: 2 },
    { pos: 15, ctr: 1.1 }, { pos: 20, ctr: 0.8 }, { pos: 30, ctr: 0.5 }, { pos: 50, ctr: 0.3 }, { pos: 75, ctr: 0.15 }, { pos: 100, ctr: 0.1 },
  ],
  backlinko: [
    { pos: 1, ctr: 31.7 }, { pos: 2, ctr: 24.7 }, { pos: 3, ctr: 18.7 }, { pos: 4, ctr: 13.6 }, { pos: 5, ctr: 9.5 },
    { pos: 6, ctr: 6.2 }, { pos: 7, ctr: 4.8 }, { pos: 8, ctr: 4.1 }, { pos: 9, ctr: 3.6 }, { pos: 10, ctr: 3.1 },
    { pos: 15, ctr: 1.5 }, { pos: 20, ctr: 1.0 }, { pos: 30, ctr: 0.6 }, { pos: 50, ctr: 0.35 }, { pos: 75, ctr: 0.18 }, { pos: 100, ctr: 0.12 },
  ],
  awr: [
    { pos: 1, ctr: 25.6 }, { pos: 2, ctr: 12.2 }, { pos: 3, ctr: 7.9 }, { pos: 4, ctr: 5.5 }, { pos: 5, ctr: 4.1 },
    { pos: 6, ctr: 3.2 }, { pos: 7, ctr: 2.6 }, { pos: 8, ctr: 2.2 }, { pos: 9, ctr: 1.9 }, { pos: 10, ctr: 1.6 },
    { pos: 15, ctr: 0.9 }, { pos: 20, ctr: 0.6 }, { pos: 30, ctr: 0.35 }, { pos: 50, ctr: 0.2 }, { pos: 75, ctr: 0.1 }, { pos: 100, ctr: 0.07 },
  ],
  fps: [
    { pos: 1, ctr: 39.8 }, { pos: 2, ctr: 18.7 }, { pos: 3, ctr: 10.2 }, { pos: 4, ctr: 7.2 }, { pos: 5, ctr: 5.1 },
    { pos: 6, ctr: 4.4 }, { pos: 7, ctr: 3.5 }, { pos: 8, ctr: 3.1 }, { pos: 9, ctr: 2.6 }, { pos: 10, ctr: 2.4 },
    { pos: 15, ctr: 1.2 }, { pos: 20, ctr: 0.85 }, { pos: 30, ctr: 0.5 }, { pos: 50, ctr: 0.28 }, { pos: 75, ctr: 0.14 }, { pos: 100, ctr: 0.09 },
  ],
};

export const CUSTOM_ANCHOR_POSITIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100];

export const DEFAULT_CUSTOM_ANCHORS: Anchor[] = CUSTOM_ANCHOR_POSITIONS.map((pos) => {
  const found = ANCHOR_SETS.industry.find((a) => a.pos === pos);
  return { pos, ctr: found ? found.ctr : 0.1 };
});

/** Interpolates a smooth 1–100 CTR curve (percent) from a sparse set of anchors using log-space interpolation. */
export function interpolateCurve(anchors: Anchor[]): number[] {
  const sorted = [...anchors].sort((a, b) => a.pos - b.pos);
  const curve: number[] = [];
  for (let pos = 1; pos <= 100; pos++) {
    if (pos <= sorted[0].pos) { curve.push(sorted[0].ctr); continue; }
    if (pos >= sorted[sorted.length - 1].pos) { curve.push(sorted[sorted.length - 1].ctr); continue; }
    let lo = sorted[0], hi = sorted[sorted.length - 1];
    for (let i = 0; i < sorted.length - 1; i++) {
      if (pos >= sorted[i].pos && pos <= sorted[i + 1].pos) { lo = sorted[i]; hi = sorted[i + 1]; break; }
    }
    const t = hi.pos === lo.pos ? 0 : (pos - lo.pos) / (hi.pos - lo.pos);
    const logLo = Math.log(Math.max(lo.ctr, 0.01));
    const logHi = Math.log(Math.max(hi.ctr, 0.01));
    curve.push(Math.round(Math.exp(logLo + (logHi - logLo) * t) * 100) / 100);
  }
  return curve;
}

const BASE_CURVES: Record<Exclude<Dataset, "custom">, number[]> = {
  industry: interpolateCurve(ANCHOR_SETS.industry),
  backlinko: interpolateCurve(ANCHOR_SETS.backlinko),
  awr: interpolateCurve(ANCHOR_SETS.awr),
  fps: interpolateCurve(ANCHOR_SETS.fps),
};

export function getBaseCurve(dataset: Dataset, customAnchors: Anchor[]): number[] {
  if (dataset === "custom") return interpolateCurve(customAnchors);
  return BASE_CURVES[dataset];
}

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface EstimatorInputs {
  searchVolume: number;
  currentPosition: number;
  targetEnabled: boolean;
  targetPosition: number;
  dataset: Dataset;
  device: DeviceType;
  intent: Intent;
  customAnchors: Anchor[];
}

export type OpportunityLabel = "Low" | "Medium" | "High" | "Critical";

export interface EstimatorResult {
  effectiveCurve: number[]; // 100 values, percent, after device+intent multipliers
  currentCTR: number;
  currentMonthlyClicks: number;
  currentAnnualClicks: number;
  position1CTR: number;
  position1MonthlyClicks: number;
  lostClicks: number;
  lostPercent: number;
  visibilityScore: number;
  opportunityScore: number;
  opportunityLabel: OpportunityLabel;
  targetCTR: number | null;
  targetMonthlyClicks: number | null;
  targetAnnualClicks: number | null;
  trafficDifference: number | null;
  trafficIncreasePercent: number | null;
  rankingImprovementNeeded: number | null;
  insight: string;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function calculateEstimate(inputs: EstimatorInputs): EstimatorResult {
  const base = getBaseCurve(inputs.dataset, inputs.customAnchors);
  const deviceMult = DEVICE_META[inputs.device].multiplier;
  const intentMult = INTENT_META[inputs.intent].multiplier;
  const effectiveCurve = base.map((v) => clamp(Math.round(v * deviceMult * intentMult * 100) / 100, 0.01, 45));

  const ctrAt = (pos: number) => effectiveCurve[clamp(pos, 1, 100) - 1];

  const currentCTR = ctrAt(inputs.currentPosition);
  const currentMonthlyClicks = Math.round(inputs.searchVolume * (currentCTR / 100));
  const currentAnnualClicks = currentMonthlyClicks * 12;

  const position1CTR = ctrAt(1);
  const position1MonthlyClicks = Math.round(inputs.searchVolume * (position1CTR / 100));

  const lostClicks = Math.max(0, position1MonthlyClicks - currentMonthlyClicks);
  const lostPercent = position1MonthlyClicks > 0 ? (lostClicks / position1MonthlyClicks) * 100 : 0;
  const visibilityScore = clamp(Math.round(100 - lostPercent), 0, 100);
  const opportunityScore = clamp(Math.round(lostPercent), 0, 100);
  const opportunityLabel: OpportunityLabel =
    opportunityScore < 15 ? "Low" : opportunityScore < 40 ? "Medium" : opportunityScore < 70 ? "High" : "Critical";

  let targetCTR: number | null = null;
  let targetMonthlyClicks: number | null = null;
  let targetAnnualClicks: number | null = null;
  let trafficDifference: number | null = null;
  let trafficIncreasePercent: number | null = null;
  let rankingImprovementNeeded: number | null = null;
  let insight: string;

  if (inputs.targetEnabled) {
    targetCTR = ctrAt(inputs.targetPosition);
    targetMonthlyClicks = Math.round(inputs.searchVolume * (targetCTR / 100));
    targetAnnualClicks = targetMonthlyClicks * 12;
    trafficDifference = targetMonthlyClicks - currentMonthlyClicks;
    trafficIncreasePercent = currentMonthlyClicks > 0 ? (trafficDifference / currentMonthlyClicks) * 100 : 0;
    rankingImprovementNeeded = inputs.currentPosition - inputs.targetPosition;

    if (trafficDifference > 0) {
      const multiplier = currentMonthlyClicks > 0 ? targetMonthlyClicks / currentMonthlyClicks : 0;
      insight = `Moving from Position ${inputs.currentPosition} to Position ${inputs.targetPosition} could increase your organic traffic by ${formatPercent(trafficIncreasePercent)} (${multiplier.toFixed(1)}× more clicks) — roughly +${formatNumber(trafficDifference)} clicks per month.`;
    } else if (trafficDifference < 0) {
      insight = `Dropping from Position ${inputs.currentPosition} to Position ${inputs.targetPosition} would reduce your organic traffic by ${formatPercent(Math.abs(trafficIncreasePercent))} — a loss of roughly ${formatNumber(Math.abs(trafficDifference))} clicks per month.`;
    } else {
      insight = `Position ${inputs.targetPosition} produces the same estimated traffic as your current Position ${inputs.currentPosition} — no meaningful change expected.`;
    }
  } else if (inputs.currentPosition > 1) {
    insight = `Reaching Position 1 could grow your organic traffic by ${formatPercent(lostPercent)} based on the ${DATASET_META[inputs.dataset].short} CTR curve — roughly +${formatNumber(lostClicks)} clicks per month.`;
  } else {
    insight = `You're already estimated at Position 1 — the strongest possible CTR for this ${DATASET_META[inputs.dataset].short} curve. Focus on maintaining ranking and expanding to related keywords.`;
  }

  return {
    effectiveCurve, currentCTR, currentMonthlyClicks, currentAnnualClicks,
    position1CTR, position1MonthlyClicks, lostClicks, lostPercent,
    visibilityScore, opportunityScore, opportunityLabel,
    targetCTR, targetMonthlyClicks, targetAnnualClicks,
    trafficDifference, trafficIncreasePercent, rankingImprovementNeeded, insight,
  };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: EstimatorInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (!inputs.searchVolume || inputs.searchVolume <= 0) e.searchVolume = "Search volume must be greater than zero.";
  else if (inputs.searchVolume > 100_000_000) e.searchVolume = "Search volume must be 100,000,000 or less.";

  if (!Number.isInteger(inputs.currentPosition) || inputs.currentPosition < 1 || inputs.currentPosition > 100) {
    e.currentPosition = "Ranking must be between 1 and 100.";
  }

  if (inputs.targetEnabled && (!Number.isInteger(inputs.targetPosition) || inputs.targetPosition < 1 || inputs.targetPosition > 100)) {
    e.targetPosition = "Target ranking must be between 1 and 100.";
  }

  if (inputs.dataset === "custom") {
    for (const a of inputs.customAnchors) {
      if (a.ctr < 0.01 || a.ctr > 100) { e.customAnchors = "Custom CTR values must be between 0.01% and 100%."; break; }
    }
  }

  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

export function formatPercent(n: number, decimals = 1): string {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(decimals)}%`;
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "serp-ctr-estimator-inputs";

export function saveInputs(inputs: EstimatorInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): EstimatorInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as EstimatorInputs;
  } catch { return null; }
}

// ── Shareable URL (query parameters) ──────────────────────────────────────────

export function buildShareUrl(inputs: EstimatorInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("v", String(inputs.searchVolume));
  url.searchParams.set("p", String(inputs.currentPosition));
  url.searchParams.set("t", inputs.targetEnabled ? String(inputs.targetPosition) : "");
  url.searchParams.set("ds", inputs.dataset);
  url.searchParams.set("dv", inputs.device);
  url.searchParams.set("in", inputs.intent);
  if (inputs.dataset === "custom") url.searchParams.set("ca", JSON.stringify(inputs.customAnchors));
  return url.toString();
}

export function parseShareParams(): Partial<EstimatorInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const v = p.get("v");
  if (!v) return null;
  const t = p.get("t");
  let customAnchors: Anchor[] | undefined;
  const ca = p.get("ca");
  if (ca) { try { customAnchors = JSON.parse(ca); } catch {} }
  return {
    searchVolume: parseFloat(v) || 0,
    currentPosition: parseInt(p.get("p") ?? "10", 10) || 10,
    targetEnabled: !!t,
    targetPosition: t ? parseInt(t, 10) || 1 : 1,
    dataset: (DATASET_ORDER.includes(p.get("ds") as Dataset) ? p.get("ds") : "industry") as Dataset,
    device: (DEVICE_ORDER.includes(p.get("dv") as DeviceType) ? p.get("dv") : "combined") as DeviceType,
    intent: (INTENT_ORDER.includes(p.get("in") as Intent) ? p.get("in") : "blended") as Intent,
    ...(customAnchors ? { customAnchors } : {}),
  };
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: EstimatorResult, inputs: EstimatorInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "SERP CTR Estimator Report",
    "==========================",
    `Generated: ${ts}`,
    `Dataset: ${DATASET_META[inputs.dataset].label}`,
    `Device: ${DEVICE_META[inputs.device].label}`,
    `Search Intent: ${INTENT_META[inputs.intent].label}`,
    "",
    `Monthly Search Volume: ${formatNumber(inputs.searchVolume)}`,
    `Current Position: ${inputs.currentPosition}`,
    `Estimated CTR: ${formatPercent(result.currentCTR, 2)}`,
    `Estimated Monthly Clicks: ${formatNumber(result.currentMonthlyClicks)}`,
    `Estimated Annual Clicks: ${formatNumber(result.currentAnnualClicks)}`,
    "",
    `Position 1 Potential CTR: ${formatPercent(result.position1CTR, 2)}`,
    `Position 1 Potential Monthly Clicks: ${formatNumber(result.position1MonthlyClicks)}`,
    `Estimated Lost Traffic (vs Position 1): ${formatNumber(result.lostClicks)} clicks/mo (${formatPercent(result.lostPercent)})`,
    `Visibility Score: ${result.visibilityScore}/100`,
    `Opportunity Score: ${result.opportunityScore}/100 (${result.opportunityLabel})`,
  ];
  if (inputs.targetEnabled && result.targetCTR !== null) {
    lines.push(
      "",
      `Target Position: ${inputs.targetPosition}`,
      `Target CTR: ${formatPercent(result.targetCTR, 2)}`,
      `Target Monthly Clicks: ${formatNumber(result.targetMonthlyClicks ?? 0)}`,
      `Traffic Difference: ${(result.trafficDifference ?? 0) >= 0 ? "+" : ""}${formatNumber(result.trafficDifference ?? 0)} clicks/mo`,
      `Traffic Change: ${(result.trafficIncreasePercent ?? 0) >= 0 ? "+" : ""}${formatPercent(result.trafficIncreasePercent ?? 0)}`,
      `Ranking Improvement Needed: ${result.rankingImprovementNeeded ?? 0} position(s)`,
    );
  }
  lines.push("", result.insight, "", "Generated by SERP CTR Estimator — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: EstimatorResult, inputs: EstimatorInputs): string {
  const rows: (string | number)[][] = [
    ["Position", "CTR (%)", "Estimated Monthly Clicks"],
  ];
  for (let pos = 1; pos <= 100; pos++) {
    const ctr = result.effectiveCurve[pos - 1];
    rows.push([pos, ctr, Math.round(inputs.searchVolume * (ctr / 100))]);
  }
  return rows.map((r) => r.join(",")).join("\n");
}

export function buildJSONReport(result: EstimatorResult, inputs: EstimatorInputs): string {
  return JSON.stringify(
    {
      dataset: inputs.dataset,
      device: inputs.device,
      intent: inputs.intent,
      searchVolume: inputs.searchVolume,
      currentPosition: inputs.currentPosition,
      currentCTR: result.currentCTR,
      currentMonthlyClicks: result.currentMonthlyClicks,
      currentAnnualClicks: result.currentAnnualClicks,
      position1CTR: result.position1CTR,
      position1MonthlyClicks: result.position1MonthlyClicks,
      lostClicks: result.lostClicks,
      lostPercent: result.lostPercent,
      visibilityScore: result.visibilityScore,
      opportunityScore: result.opportunityScore,
      opportunityLabel: result.opportunityLabel,
      target: inputs.targetEnabled ? {
        position: inputs.targetPosition,
        ctr: result.targetCTR,
        monthlyClicks: result.targetMonthlyClicks,
        annualClicks: result.targetAnnualClicks,
        trafficDifference: result.trafficDifference,
        trafficIncreasePercent: result.trafficIncreasePercent,
        rankingImprovementNeeded: result.rankingImprovementNeeded,
      } : null,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: EstimatorResult, inputs: EstimatorInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>SERP CTR Estimator Report</title>
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
    <h1>SERP CTR Estimator Report</h1>
    <p class="meta">Generated ${ts} — ${DATASET_META[inputs.dataset].label} · ${DEVICE_META[inputs.device].label} · ${INTENT_META[inputs.intent].label}</p>
    <h2>Current Position</h2>
    <table>
      <tr><td>Monthly Search Volume</td><td>${formatNumber(inputs.searchVolume)}</td></tr>
      <tr><td>Current Position</td><td>${inputs.currentPosition}</td></tr>
      <tr><td>Estimated CTR</td><td><strong>${formatPercent(result.currentCTR, 2)}</strong></td></tr>
      <tr><td>Estimated Monthly Clicks</td><td>${formatNumber(result.currentMonthlyClicks)}</td></tr>
      <tr><td>Estimated Annual Clicks</td><td>${formatNumber(result.currentAnnualClicks)}</td></tr>
      <tr><td>Visibility Score</td><td>${result.visibilityScore}/100</td></tr>
      <tr><td>Opportunity Score</td><td>${result.opportunityScore}/100 (${result.opportunityLabel})</td></tr>
    </table>
    ${inputs.targetEnabled && result.targetCTR !== null ? `
    <h2>Target Position</h2>
    <table>
      <tr><td>Target Position</td><td>${inputs.targetPosition}</td></tr>
      <tr><td>Target CTR</td><td>${formatPercent(result.targetCTR, 2)}</td></tr>
      <tr><td>Target Monthly Clicks</td><td>${formatNumber(result.targetMonthlyClicks ?? 0)}</td></tr>
      <tr><td>Traffic Difference</td><td>${(result.trafficDifference ?? 0) >= 0 ? "+" : ""}${formatNumber(result.trafficDifference ?? 0)}</td></tr>
      <tr><td>Traffic Change</td><td>${(result.trafficIncreasePercent ?? 0) >= 0 ? "+" : ""}${formatPercent(result.trafficIncreasePercent ?? 0)}</td></tr>
    </table>` : ""}
    <h2>Insight</h2>
    <table><tr><td colspan="2">${result.insight}</td></tr></table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: EstimatorInputs;
  result: EstimatorResult;
}

const HISTORY_KEY = "serp-ctr-estimator-history";

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

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: EstimatorInputs = {
  searchVolume: 1000,
  currentPosition: 10,
  targetEnabled: false,
  targetPosition: 3,
  dataset: "industry",
  device: "combined",
  intent: "blended",
  customAnchors: DEFAULT_CUSTOM_ANCHORS,
};
