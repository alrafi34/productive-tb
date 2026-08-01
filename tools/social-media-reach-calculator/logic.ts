// ── Social Media Reach Calculator Logic ──

export type Platform =
  | "instagram" | "facebook" | "tiktok" | "linkedin"
  | "youtube" | "twitter" | "pinterest" | "threads" | "snapchat";

export type ContentType = "image" | "carousel" | "video" | "reel" | "short" | "story" | "live";
export type AudienceQuality = "poor" | "average" | "good" | "excellent";
export type PostingFrequency = "daily" | "weekly" | "monthly";

// ── Platform defaults ─────────────────────────────────────────────────────────

export interface PlatformDefaults {
  label: string;
  icon: string;
  reachRate: number;       // organic reach as % of followers (0–1)
  engagementRate: number;  // default engagement rate % (0–100)
  impressionMultiplier: number; // impressions = reach × this
  growthRate: number;      // monthly follower growth estimate %
}

export const PLATFORM_DEFAULTS: Record<Platform, PlatformDefaults> = {
  instagram: { label: "Instagram",  icon: "📸", reachRate: 0.32, engagementRate: 5.0,  impressionMultiplier: 1.35, growthRate: 1.5 },
  facebook:  { label: "Facebook",   icon: "👥", reachRate: 0.08, engagementRate: 3.0,  impressionMultiplier: 1.20, growthRate: 0.8 },
  tiktok:    { label: "TikTok",     icon: "🎵", reachRate: 0.60, engagementRate: 9.0,  impressionMultiplier: 1.50, growthRate: 5.0 },
  linkedin:  { label: "LinkedIn",   icon: "💼", reachRate: 0.30, engagementRate: 6.0,  impressionMultiplier: 1.25, growthRate: 1.0 },
  youtube:   { label: "YouTube",    icon: "▶️", reachRate: 0.20, engagementRate: 4.0,  impressionMultiplier: 1.40, growthRate: 2.0 },
  twitter:   { label: "X (Twitter)",icon: "𝕏",  reachRate: 0.15, engagementRate: 2.5,  impressionMultiplier: 1.30, growthRate: 1.2 },
  pinterest: { label: "Pinterest",  icon: "📌", reachRate: 0.25, engagementRate: 2.0,  impressionMultiplier: 1.60, growthRate: 2.5 },
  threads:   { label: "Threads",    icon: "🧵", reachRate: 0.22, engagementRate: 4.5,  impressionMultiplier: 1.20, growthRate: 3.0 },
  snapchat:  { label: "Snapchat",   icon: "👻", reachRate: 0.40, engagementRate: 5.5,  impressionMultiplier: 1.10, growthRate: 1.8 },
};

// ── Content type multipliers (relative to baseline) ───────────────────────────

const CONTENT_MULTIPLIERS: Record<ContentType, number> = {
  image:    1.00,
  carousel: 1.20,
  video:    1.30,
  reel:     1.50,
  short:    1.45,
  story:    0.75,
  live:     1.60,
};

// ── Audience quality multipliers ──────────────────────────────────────────────

const QUALITY_MULTIPLIERS: Record<AudienceQuality, number> = {
  poor:      0.60,
  average:   0.85,
  good:      1.00,
  excellent: 1.20,
};

// ── Posting frequency multipliers (affects growth estimate) ──────────────────

const FREQUENCY_GROWTH_MULTIPLIERS: Record<PostingFrequency, number> = {
  daily:   2.0,
  weekly:  1.0,
  monthly: 0.4,
};

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface ReachInputs {
  platform: Platform;
  followers: number;
  engagementRate: number;  // percentage 0–100
  shareRate: number;       // percentage 0–20
  saveRate: number;        // percentage 0–20
  paidEnabled: boolean;
  paidMultiplier: number;  // 1–10
  contentType: ContentType;
  audienceQuality: AudienceQuality;
  postingFrequency: PostingFrequency;
}

export interface ReachResult {
  platform: Platform;
  organicReach: number;
  finalReach: number;
  impressions: number;
  engagement: number;
  shares: number;
  saves: number;
  audienceGrowth: number;  // estimated monthly new followers
  reachPct: number;        // finalReach / followers × 100
  performanceScore: number; // 0–100
  performanceLabel: string;
  performanceColor: string;
  performanceBg: string;
  performanceDot: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ReachInputs;
  result: ReachResult;
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculateReach(inputs: ReachInputs): ReachResult {
  const {
    platform, followers, engagementRate, shareRate, saveRate,
    paidEnabled, paidMultiplier, contentType, audienceQuality, postingFrequency,
  } = inputs;

  const pd = PLATFORM_DEFAULTS[platform];
  const contentMult  = CONTENT_MULTIPLIERS[contentType];
  const qualityMult  = QUALITY_MULTIPLIERS[audienceQuality];
  const freqMult     = FREQUENCY_GROWTH_MULTIPLIERS[postingFrequency];

  // Organic reach
  const organicReach = Math.round(followers * pd.reachRate * contentMult * qualityMult);

  // Final reach (with optional paid boost)
  const finalReach = paidEnabled
    ? Math.round(organicReach * paidMultiplier)
    : organicReach;

  // Impressions
  const impressions = Math.round(finalReach * pd.impressionMultiplier);

  // Engagement (based on organic reach, not paid — paid reach has lower engagement density)
  const engDecimal = engagementRate / 100;
  const engagement = Math.round(organicReach * engDecimal);

  // Shares and saves are percentages of engagement
  const shares = Math.round(engagement * (shareRate / 100));
  const saves  = Math.round(engagement * (saveRate  / 100));

  // Audience growth estimate (monthly)
  const audienceGrowth = Math.round(followers * (pd.growthRate / 100) * qualityMult * freqMult);

  // Reach percentage
  const reachPct = followers > 0 ? parseFloat(((finalReach / followers) * 100).toFixed(1)) : 0;

  // Performance score — weighted blend of reach rate and engagement
  const reachScore      = Math.min(100, (finalReach / (followers * 0.5)) * 100);
  const engScore        = Math.min(100, (engagementRate / 10) * 100);
  const performanceScore = Math.round(reachScore * 0.6 + engScore * 0.4);

  const { performanceLabel, performanceColor, performanceBg, performanceDot } =
    getPerformanceLevel(performanceScore);

  return {
    platform, organicReach, finalReach, impressions,
    engagement, shares, saves, audienceGrowth,
    reachPct, performanceScore,
    performanceLabel, performanceColor, performanceBg, performanceDot,
  };
}

// ── Performance level ─────────────────────────────────────────────────────────

function getPerformanceLevel(score: number): {
  performanceLabel: string;
  performanceColor: string;
  performanceBg: string;
  performanceDot: string;
} {
  if (score >= 80) return { performanceLabel: "Outstanding", performanceColor: "text-green-700",  performanceBg: "bg-green-50",  performanceDot: "bg-green-500"  };
  if (score >= 60) return { performanceLabel: "Excellent",   performanceColor: "text-blue-700",   performanceBg: "bg-blue-50",   performanceDot: "bg-blue-500"   };
  if (score >= 40) return { performanceLabel: "Good",        performanceColor: "text-yellow-700", performanceBg: "bg-yellow-50", performanceDot: "bg-yellow-500" };
  if (score >= 20) return { performanceLabel: "Average",     performanceColor: "text-orange-700", performanceBg: "bg-orange-50", performanceDot: "bg-orange-500" };
  return               { performanceLabel: "Poor",         performanceColor: "text-red-700",    performanceBg: "bg-red-50",    performanceDot: "bg-red-500"    };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: ReachInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (inputs.followers <= 0)                e.followers      = "Followers must be greater than 0";
  if (inputs.followers > 1_000_000_000)     e.followers      = "Maximum 1 billion followers";
  if (inputs.engagementRate < 0)            e.engagementRate = "Cannot be negative";
  if (inputs.engagementRate > 100)          e.engagementRate = "Cannot exceed 100%";
  if (inputs.shareRate < 0)                 e.shareRate      = "Cannot be negative";
  if (inputs.shareRate > 20)                e.shareRate      = "Maximum 20%";
  if (inputs.saveRate < 0)                  e.saveRate       = "Cannot be negative";
  if (inputs.saveRate > 20)                 e.saveRate       = "Maximum 20%";
  if (inputs.paidMultiplier < 1)            e.paidMultiplier = "Minimum 1×";
  if (inputs.paidMultiplier > 10)           e.paidMultiplier = "Maximum 10×";
  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
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

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "social-reach-calculator-history";

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

export function buildTextReport(result: ReachResult, inputs: ReachInputs): string {
  const pd = PLATFORM_DEFAULTS[inputs.platform];
  const ts = new Date().toLocaleString("en-US");
  return [
    "Social Media Reach Calculator Report",
    "=====================================",
    `Generated: ${ts}`,
    `Platform: ${pd.label}`,
    `Followers: ${formatFull(inputs.followers)}`,
    `Content Type: ${inputs.contentType}`,
    `Audience Quality: ${inputs.audienceQuality}`,
    `Paid Promotion: ${inputs.paidEnabled ? `Yes (${inputs.paidMultiplier}×)` : "No"}`,
    "",
    "RESULTS",
    `Organic Reach:      ${formatFull(result.organicReach)} (${result.reachPct}% of followers)`,
    `Final Reach:        ${formatFull(result.finalReach)}`,
    `Estimated Impressions: ${formatFull(result.impressions)}`,
    `Estimated Engagement:  ${formatFull(result.engagement)}`,
    `Estimated Shares:      ${formatFull(result.shares)}`,
    `Estimated Saves:       ${formatFull(result.saves)}`,
    `Est. Audience Growth:  ${formatFull(result.audienceGrowth)}/month`,
    `Performance Score:     ${result.performanceScore}/100 — ${result.performanceLabel}`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: ReachResult, inputs: ReachInputs): string {
  const pd = PLATFORM_DEFAULTS[inputs.platform];
  const ts = new Date().toISOString();
  const rows = [
    ["Social Media Reach Calculator Report", ts],
    [],
    ["Platform", pd.label],
    ["Followers", inputs.followers],
    ["Content Type", inputs.contentType],
    ["Audience Quality", inputs.audienceQuality],
    ["Engagement Rate %", inputs.engagementRate],
    ["Paid Promotion", inputs.paidEnabled ? `Yes (${inputs.paidMultiplier}×)` : "No"],
    [],
    ["Metric", "Value"],
    ["Organic Reach", result.organicReach],
    ["Final Reach", result.finalReach],
    ["Impressions", result.impressions],
    ["Engagement", result.engagement],
    ["Shares", result.shares],
    ["Saves", result.saves],
    ["Audience Growth / month", result.audienceGrowth],
    ["Reach %", `${result.reachPct}%`],
    ["Performance Score", `${result.performanceScore}/100`],
    ["Performance Level", result.performanceLabel],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildShareSummary(result: ReachResult, inputs: ReachInputs): string {
  const pd = PLATFORM_DEFAULTS[inputs.platform];
  return [
    `Platform: ${pd.label}`,
    `Estimated Reach: ${formatFull(result.finalReach)}`,
    `Estimated Engagement: ${formatFull(result.engagement)}`,
    `Estimated Impressions: ${formatFull(result.impressions)}`,
    "",
    "Calculated with Productive Toolbox — https://productivetoolbox.com/tools/marketing/social-media-reach-calculator",
  ].join("\n");
}

export function buildPrintHTML(result: ReachResult, inputs: ReachInputs): string {
  const pd = PLATFORM_DEFAULTS[inputs.platform];
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Social Media Reach Report</title>
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
    <h1>Social Media Reach Calculator Report</h1>
    <p class="meta">Generated ${ts} — Platform: ${pd.label}</p>
    <h2>Campaign Settings</h2>
    <table>
      <tr><td>Followers</td><td>${formatFull(inputs.followers)}</td></tr>
      <tr><td>Content Type</td><td>${inputs.contentType}</td></tr>
      <tr><td>Audience Quality</td><td>${inputs.audienceQuality}</td></tr>
      <tr><td>Posting Frequency</td><td>${inputs.postingFrequency}</td></tr>
      <tr><td>Paid Promotion</td><td>${inputs.paidEnabled ? `Yes (${inputs.paidMultiplier}×)` : "No"}</td></tr>
    </table>
    <h2>Results</h2>
    <table>
      <tr><td>Organic Reach</td><td>${formatFull(result.organicReach)} (${result.reachPct}% of followers)</td></tr>
      <tr><td>Final Reach</td><td><strong>${formatFull(result.finalReach)}</strong></td></tr>
      <tr><td>Impressions</td><td>${formatFull(result.impressions)}</td></tr>
      <tr><td>Engagement</td><td>${formatFull(result.engagement)}</td></tr>
      <tr><td>Shares</td><td>${formatFull(result.shares)}</td></tr>
      <tr><td>Saves</td><td>${formatFull(result.saves)}</td></tr>
      <tr><td>Audience Growth / month</td><td>${formatFull(result.audienceGrowth)}</td></tr>
      <tr><td>Performance Score</td><td>${result.performanceScore}/100 — ${result.performanceLabel}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: ReachInputs = {
  platform: "instagram",
  followers: 25000,
  engagementRate: 5.0,
  shareRate: 2.0,
  saveRate: 3.0,
  paidEnabled: false,
  paidMultiplier: 2,
  contentType: "image",
  audienceQuality: "good",
  postingFrequency: "weekly",
};
