// ── Engagement Rate Calculator Logic ──

export type Method = "followers" | "reach" | "impressions" | "views" | "cpe" | "custom";

export type Platform = "instagram" | "tiktok" | "facebook" | "youtube" | "linkedin" | "twitter";

export interface MethodMeta {
  label: string;
  short: string;
  hint: string;
}

export const METHODS: Record<Method, MethodMeta> = {
  followers: {
    label: "Engagement Rate by Followers",
    short: "ER by Followers",
    hint: "The most common metric for influencer and brand campaigns. Measures total engagement against your total audience size.",
  },
  reach: {
    label: "Engagement Rate by Reach",
    short: "ER by Reach",
    hint: "Measures engagement against the unique accounts who actually saw the post — a more accurate reflection of content performance than follower count.",
  },
  impressions: {
    label: "Engagement Rate by Impressions",
    short: "ER by Impressions",
    hint: "Measures engagement against total views including repeat views. Useful for paid campaigns where the same user may see a post multiple times.",
  },
  views: {
    label: "Engagement Rate by Views",
    short: "ER by Views",
    hint: "Standard for video-first platforms like YouTube, TikTok, and Reels — measures engagement against total video plays.",
  },
  cpe: {
    label: "Cost Per Engagement (CPE)",
    short: "Cost Per Engagement",
    hint: "Divides ad or campaign spend by total engagements to show how much each like, comment, share, or save cost.",
  },
  custom: {
    label: "Custom Formula",
    short: "Custom Formula",
    hint: "Divide total engagement by any denominator you choose — email list size, website visitors, event attendees, and more.",
  },
};

export const METHOD_ORDER: Method[] = ["followers", "reach", "impressions", "views", "cpe", "custom"];

// ── Platform quick-start presets (example data only — formula is platform-agnostic) ──

export interface PlatformPreset {
  label: string;
  icon: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  otherActions: number;
  followers: number;
  reach: number;
  impressions: number;
  views: number;
}

export const PLATFORM_PRESETS: Record<Platform, PlatformPreset> = {
  instagram: { label: "Instagram",   icon: "📸", likes: 250, comments: 35, shares: 18, saves: 40, otherActions: 0, followers: 12500, reach: 8300,  impressions: 14500, views: 22000 },
  tiktok:    { label: "TikTok",      icon: "🎵", likes: 900, comments: 120, shares: 300, saves: 150, otherActions: 0, followers: 20000, reach: 15000, impressions: 26000, views: 85000 },
  facebook:  { label: "Facebook",    icon: "👥", likes: 80,  comments: 12, shares: 20, saves: 5,  otherActions: 0, followers: 18000, reach: 4200,  impressions: 6000,  views: 3000  },
  youtube:   { label: "YouTube",     icon: "▶️", likes: 540, comments: 60, shares: 25, saves: 0,  otherActions: 0, followers: 9000,  reach: 5000,  impressions: 12000, views: 21000 },
  linkedin:  { label: "LinkedIn",    icon: "💼", likes: 130, comments: 22, shares: 15, saves: 8,  otherActions: 0, followers: 6000,  reach: 3200,  impressions: 5200,  views: 1800  },
  twitter:   { label: "X (Twitter)", icon: "𝕏",  likes: 95,  comments: 14, shares: 40, saves: 0,  otherActions: 0, followers: 8000,  reach: 4600,  impressions: 9800,  views: 15000 },
};

export const PLATFORM_ORDER: Platform[] = ["instagram", "tiktok", "facebook", "youtube", "linkedin", "twitter"];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface EngagementInputs {
  method: Method;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  otherActions: number;
  followers: number;
  reach: number;
  impressions: number;
  views: number;
  customBase: number;
  adSpend: number;
  decimalPrecision: number;
}

export interface EngagementResult {
  totalEngagement: number;
  denominator: number;
  denominatorLabel: string;
  rate: number | null;
  costPerEngagement: number | null;
  performanceLabel: string;
  performanceColor: string;
  performanceBg: string;
  performanceDot: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: EngagementInputs;
  result: EngagementResult;
}

// ── Denominator resolution ────────────────────────────────────────────────────

export function getDenominator(inputs: EngagementInputs): { value: number; label: string } {
  switch (inputs.method) {
    case "followers":   return { value: inputs.followers,   label: "Followers" };
    case "reach":        return { value: inputs.reach,        label: "Reach" };
    case "impressions":  return { value: inputs.impressions,  label: "Impressions" };
    case "views":        return { value: inputs.views,        label: "Video Views" };
    case "custom":       return { value: inputs.customBase,   label: "Custom Denominator" };
    case "cpe":          return { value: inputs.adSpend,      label: "Ad Spend ($)" };
  }
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculateEngagement(inputs: EngagementInputs): EngagementResult {
  const totalEngagement = inputs.likes + inputs.comments + inputs.shares + inputs.saves + inputs.otherActions;
  const { value: denominator, label: denominatorLabel } = getDenominator(inputs);

  let rate: number | null = null;
  let costPerEngagement: number | null = null;

  if (inputs.method === "cpe") {
    costPerEngagement = totalEngagement > 0 ? inputs.adSpend / totalEngagement : null;
  } else {
    rate = denominator > 0 ? (totalEngagement / denominator) * 100 : null;
  }

  const level = rate !== null ? getPerformanceLevel(rate) : {
    performanceLabel: "—", performanceColor: "text-gray-500", performanceBg: "bg-gray-50", performanceDot: "bg-gray-300",
  };

  return {
    totalEngagement,
    denominator,
    denominatorLabel,
    rate: rate !== null ? parseFloat(rate.toFixed(inputs.decimalPrecision)) : null,
    costPerEngagement: costPerEngagement !== null ? parseFloat(costPerEngagement.toFixed(Math.max(2, inputs.decimalPrecision))) : null,
    ...level,
  };
}

// ── Performance rating (configurable thresholds) ──────────────────────────────

export interface PerformanceThreshold {
  max: number; // exclusive upper bound, Infinity for open-ended
  label: string;
  color: string;
  bg: string;
  dot: string;
}

export const PERFORMANCE_THRESHOLDS: PerformanceThreshold[] = [
  { max: 1,        label: "Poor",       color: "text-red-700",    bg: "bg-red-50",    dot: "bg-red-500"    },
  { max: 3,        label: "Average",    color: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500" },
  { max: 6,        label: "Good",       color: "text-yellow-700", bg: "bg-yellow-50", dot: "bg-yellow-500" },
  { max: 10,       label: "Excellent",  color: "text-blue-700",   bg: "bg-blue-50",   dot: "bg-blue-500"   },
  { max: Infinity, label: "Exceptional",color: "text-green-700",  bg: "bg-green-50",  dot: "bg-green-500"  },
];

function getPerformanceLevel(rate: number): { performanceLabel: string; performanceColor: string; performanceBg: string; performanceDot: string } {
  const t = PERFORMANCE_THRESHOLDS.find((t) => rate < t.max) ?? PERFORMANCE_THRESHOLDS[PERFORMANCE_THRESHOLDS.length - 1];
  return { performanceLabel: t.label, performanceColor: t.color, performanceBg: t.bg, performanceDot: t.dot };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: EngagementInputs): ValidationErrors {
  const e: ValidationErrors = {};
  const totalEngagement = inputs.likes + inputs.comments + inputs.shares + inputs.saves + inputs.otherActions;

  if (totalEngagement <= 0) {
    e.engagement = "Please enter at least one engagement metric.";
  }

  if (inputs.method === "followers" && inputs.followers <= 0) e.followers = "Followers cannot be zero.";
  if (inputs.method === "reach" && inputs.reach <= 0) e.reach = "Reach must be greater than zero.";
  if (inputs.method === "impressions" && inputs.impressions <= 0) e.impressions = "Impressions must be greater than zero.";
  if (inputs.method === "views" && inputs.views <= 0) e.views = "Video views must be greater than zero.";
  if (inputs.method === "custom" && inputs.customBase <= 0) e.customBase = "Custom denominator must be greater than zero.";

  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatMoney(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 4 });
}

export function formatShort(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "")}B`;
  if (abs >= 1_000_000)     return `${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  if (abs >= 1_000)         return `${(n / 1_000).toFixed(1).replace(/\.?0+$/, "")}K`;
  return String(Math.round(n));
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage: history + favorite ──────────────────────────────────────────

const STORAGE_KEY = "engagement-rate-calculator-history";
const FAVORITE_KEY = "engagement-rate-calculator-favorite";

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

export function getFavoriteMethod(): Method | null {
  try { return localStorage.getItem(FAVORITE_KEY) as Method | null; } catch { return null; }
}

export function setFavoriteMethod(method: Method | null): void {
  try {
    if (method) localStorage.setItem(FAVORITE_KEY, method);
    else localStorage.removeItem(FAVORITE_KEY);
  } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: EngagementResult, inputs: EngagementInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Engagement Rate Calculator Report",
    "==================================",
    `Generated: ${ts}`,
    `Formula Used: ${METHODS[inputs.method].label}`,
    "",
    "INPUTS",
    `Likes: ${formatFull(inputs.likes)}`,
    `Comments: ${formatFull(inputs.comments)}`,
    `Shares: ${formatFull(inputs.shares)}`,
    `Saves: ${formatFull(inputs.saves)}`,
    `Other Engagement Actions: ${formatFull(inputs.otherActions)}`,
    `${result.denominatorLabel}: ${inputs.method === "cpe" ? formatMoney(inputs.adSpend) : formatFull(result.denominator)}`,
    "",
    "RESULTS",
    `Total Engagements: ${formatFull(result.totalEngagement)}`,
  ];
  if (inputs.method === "cpe") {
    lines.push(`Cost Per Engagement: ${result.costPerEngagement !== null ? formatMoney(result.costPerEngagement) : "N/A"}`);
  } else {
    lines.push(`Engagement Rate: ${result.rate !== null ? result.rate.toFixed(inputs.decimalPrecision) + "%" : "N/A"}`);
    lines.push(`Performance Rating: ${result.performanceLabel}`);
  }
  lines.push("", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: EngagementResult, inputs: EngagementInputs): string {
  const ts = new Date().toISOString();
  const rows: (string | number)[][] = [
    ["Engagement Rate Calculator Report", ts],
    [],
    ["Formula", METHODS[inputs.method].label],
    ["Likes", inputs.likes],
    ["Comments", inputs.comments],
    ["Shares", inputs.shares],
    ["Saves", inputs.saves],
    ["Other Engagement Actions", inputs.otherActions],
    [result.denominatorLabel, inputs.method === "cpe" ? inputs.adSpend : result.denominator],
    [],
    ["Metric", "Value"],
    ["Total Engagements", result.totalEngagement],
  ];
  if (inputs.method === "cpe") {
    rows.push(["Cost Per Engagement", result.costPerEngagement !== null ? result.costPerEngagement : "N/A"]);
  } else {
    rows.push(["Engagement Rate %", result.rate !== null ? `${result.rate}%` : "N/A"]);
    rows.push(["Performance Rating", result.performanceLabel]);
  }
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildPrintHTML(result: EngagementResult, inputs: EngagementInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const resultRow = inputs.method === "cpe"
    ? `<tr><td>Cost Per Engagement</td><td><strong>${result.costPerEngagement !== null ? formatMoney(result.costPerEngagement) : "N/A"}</strong></td></tr>`
    : `<tr><td>Engagement Rate</td><td><strong>${result.rate !== null ? result.rate.toFixed(inputs.decimalPrecision) + "%" : "N/A"}</strong></td></tr>
       <tr><td>Performance Rating</td><td>${result.performanceLabel}</td></tr>`;

  return `<!DOCTYPE html><html><head><title>Engagement Rate Report</title>
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
    <h1>Engagement Rate Calculator Report</h1>
    <p class="meta">Generated ${ts} — Formula: ${METHODS[inputs.method].label}</p>
    <h2>Inputs</h2>
    <table>
      <tr><td>Likes</td><td>${formatFull(inputs.likes)}</td></tr>
      <tr><td>Comments</td><td>${formatFull(inputs.comments)}</td></tr>
      <tr><td>Shares</td><td>${formatFull(inputs.shares)}</td></tr>
      <tr><td>Saves</td><td>${formatFull(inputs.saves)}</td></tr>
      <tr><td>Other Engagement Actions</td><td>${formatFull(inputs.otherActions)}</td></tr>
      <tr><td>${result.denominatorLabel}</td><td>${inputs.method === "cpe" ? formatMoney(inputs.adSpend) : formatFull(result.denominator)}</td></tr>
    </table>
    <h2>Results</h2>
    <table>
      <tr><td>Total Engagements</td><td>${formatFull(result.totalEngagement)}</td></tr>
      ${resultRow}
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: EngagementInputs = {
  method: "followers",
  likes: 250,
  comments: 35,
  shares: 18,
  saves: 40,
  otherActions: 0,
  followers: 12500,
  reach: 8300,
  impressions: 14500,
  views: 22000,
  customBase: 1000,
  adSpend: 150,
  decimalPrecision: 2,
};
