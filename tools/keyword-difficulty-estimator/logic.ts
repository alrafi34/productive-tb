// ── Keyword Difficulty Estimator Logic ──

export type SearchIntent = "informational" | "commercial" | "transactional" | "navigational";
export type BrandDominance = "low" | "medium" | "high";
export type SerpFeature = "featuredSnippet" | "peopleAlsoAsk" | "videos" | "images" | "shoppingResults" | "localPack" | "knowledgePanel" | "aiOverview";

export const SERP_FEATURES: { key: SerpFeature; label: string }[] = [
  { key: "featuredSnippet", label: "Featured Snippet" },
  { key: "peopleAlsoAsk",   label: "People Also Ask" },
  { key: "videos",          label: "Videos" },
  { key: "images",          label: "Images" },
  { key: "shoppingResults", label: "Shopping Results" },
  { key: "localPack",       label: "Local Pack" },
  { key: "knowledgePanel",  label: "Knowledge Panel" },
  { key: "aiOverview",      label: "AI Overview" },
];

export const INTENT_SCORES: Record<SearchIntent, number> = {
  informational: 25,
  commercial: 65,
  transactional: 80,
  navigational: 15,
};

export const BRAND_SCORES: Record<BrandDominance, number> = {
  low: 20,
  medium: 50,
  high: 85,
};

export interface DifficultyLevel {
  label: string;
  color: string;
  bg: string;
  dot: string;
  gaugeColor: string;
  recommendation: string;
}

export const DIFFICULTY_LEVELS: { max: number; meta: DifficultyLevel }[] = [
  { max: 20, meta: { label: "Very Easy", color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500", gaugeColor: "#22c55e", recommendation: "Great opportunity — a well-optimized page with modest authority can realistically rank for this keyword." } },
  { max: 40, meta: { label: "Easy",      color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500", gaugeColor: "#22c55e", recommendation: "Good opportunity for newer websites. Solid on-page SEO and a handful of quality backlinks should be enough to compete." } },
  { max: 60, meta: { label: "Medium",    color: "text-yellow-700", bg: "bg-yellow-50", dot: "bg-yellow-500", gaugeColor: "#eab308", recommendation: "Requires quality content and moderate domain authority. Expect to need some link-building and strong on-page optimization." } },
  { max: 80, meta: { label: "Hard",      color: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500", gaugeColor: "#f97316", recommendation: "Build quality backlinks, publish comprehensive content, improve topical authority, and optimize on-page SEO." } },
  { max: 101, meta: { label: "Very Hard", color: "text-red-700", bg: "bg-red-50", dot: "bg-red-500", gaugeColor: "#ef4444", recommendation: "Requires strong domain authority, a substantial backlink profile, and comprehensive, highly authoritative content." } },
];

export function getLevel(score: number): DifficultyLevel {
  return DIFFICULTY_LEVELS.find((l) => score <= l.max)!.meta;
}

// ── Presets ────────────────────────────────────────────────────────────────────

export interface PresetDef {
  label: string;
  keyword: string;
  domainAuthority: number;
  referringDomains: number;
  searchVolume: number;
  contentLength: number;
  intent: SearchIntent;
  brand: BrandDominance;
  serpFeatures: SerpFeature[];
  exactMatchDomain: boolean;
}

export const PRESETS: PresetDef[] = [
  {
    label: "Competitive Commercial (Very Hard)",
    keyword: "best running shoes",
    domainAuthority: 82, referringDomains: 3500, searchVolume: 50000, contentLength: 3200,
    intent: "commercial", brand: "high",
    serpFeatures: ["featuredSnippet", "images", "shoppingResults", "peopleAlsoAsk", "aiOverview"],
    exactMatchDomain: false,
  },
  {
    label: "Long-Tail How-To (Easy)",
    keyword: "how to clean a keyboard",
    domainAuthority: 34, referringDomains: 28, searchVolume: 800, contentLength: 1400,
    intent: "informational", brand: "low",
    serpFeatures: ["featuredSnippet", "peopleAlsoAsk"],
    exactMatchDomain: false,
  },
  {
    label: "Technical Reference (Medium)",
    keyword: "javascript array methods",
    domainAuthority: 62, referringDomains: 185, searchVolume: 5000, contentLength: 2100,
    intent: "informational", brand: "low",
    serpFeatures: ["featuredSnippet", "peopleAlsoAsk", "videos"],
    exactMatchDomain: false,
  },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface DifficultyInputs {
  keyword: string;
  domainAuthority: number;
  referringDomains: number;
  searchVolume: number;
  contentLength: number;
  intent: SearchIntent;
  serpFeatures: SerpFeature[];
  brand: BrandDominance;
  exactMatchDomain: boolean;
  userAuthority: number | null;
}

export interface ScoreBreakdownRow {
  factor: string;
  rawScore: number;
  weight: number;
  contribution: number;
}

export interface DifficultyResult {
  score: number;
  level: DifficultyLevel;
  breakdown: ScoreBreakdownRow[];
  tips: string[];
  rankingOpportunity: { label: string; color: string; bg: string; dot: string } | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DifficultyInputs;
  result: DifficultyResult;
}

// ── Sub-score curves ───────────────────────────────────────────────────────────

function logScore(value: number, cap: number): number {
  return Math.min(100, (100 * Math.log10(value + 1)) / Math.log10(cap + 1));
}

export function referringDomainScore(rd: number): number {
  return logScore(rd, 10000);
}

export function contentLengthScore(words: number): number {
  return Math.min(100, (words / 3000) * 100);
}

export function searchVolumeScore(volume: number): number {
  return logScore(volume, 100000);
}

export function serpFeatureScore(features: SerpFeature[]): number {
  return (features.length / SERP_FEATURES.length) * 100;
}

// ── Main calculation ──────────────────────────────────────────────────────────

const WEIGHTS = {
  da: 0.35,
  rd: 0.25,
  content: 0.10,
  brand: 0.10,
  serp: 0.10,
  intent: 0.05,
  volume: 0.05,
};

export function calculateDifficulty(inputs: DifficultyInputs): DifficultyResult {
  const daScore = inputs.domainAuthority;
  const rdScore = referringDomainScore(inputs.referringDomains);
  const contentScore = contentLengthScore(inputs.contentLength);
  const brandScore = BRAND_SCORES[inputs.brand];
  const serpScore = serpFeatureScore(inputs.serpFeatures);
  const intentScore = INTENT_SCORES[inputs.intent];
  const volumeScore = searchVolumeScore(inputs.searchVolume);

  const breakdown: ScoreBreakdownRow[] = [
    { factor: "Domain Authority",   rawScore: daScore,    weight: WEIGHTS.da,      contribution: daScore * WEIGHTS.da },
    { factor: "Referring Domains",  rawScore: rdScore,    weight: WEIGHTS.rd,      contribution: rdScore * WEIGHTS.rd },
    { factor: "Content Length",     rawScore: contentScore, weight: WEIGHTS.content, contribution: contentScore * WEIGHTS.content },
    { factor: "Brand Dominance",    rawScore: brandScore, weight: WEIGHTS.brand,   contribution: brandScore * WEIGHTS.brand },
    { factor: "SERP Features",      rawScore: serpScore,  weight: WEIGHTS.serp,    contribution: serpScore * WEIGHTS.serp },
    { factor: "Search Intent",      rawScore: intentScore, weight: WEIGHTS.intent, contribution: intentScore * WEIGHTS.intent },
    { factor: "Search Volume",      rawScore: volumeScore, weight: WEIGHTS.volume, contribution: volumeScore * WEIGHTS.volume },
  ];

  const rawTotal = breakdown.reduce((sum, r) => sum + r.contribution, 0);
  const score = Math.min(100, Math.round(rawTotal));
  const level = getLevel(score);

  const tips: string[] = [];
  if (inputs.userAuthority !== null && inputs.userAuthority < inputs.domainAuthority - 15) {
    tips.push("Your website authority is well below the top-10 average — consider targeting long-tail variations of this keyword first to build topical relevance before competing head-on.");
  }
  if (inputs.serpFeatures.length >= 4) {
    tips.push("This SERP has several rich features present, which can reduce organic click-through rate even if you rank well. Consider optimizing for the featured snippet or 'People Also Ask' box directly.");
  }
  if (inputs.exactMatchDomain) {
    tips.push("Exact-match domains are ranking in the top results. This is a weaker ranking signal than it once was — strong topical relevance and content quality still outweigh domain naming.");
  }
  if (contentScore < 40) {
    tips.push("Top-ranking pages for similar keywords tend to be longer and more comprehensive. Consider expanding your content depth and covering related subtopics.");
  }
  if (rdScore > 70 && daScore > 60) {
    tips.push("Both authority and backlinks are high for this keyword — a sustained link-building campaign will likely be necessary, not just strong content.");
  }

  let rankingOpportunity: DifficultyResult["rankingOpportunity"] = null;
  if (inputs.userAuthority !== null) {
    const gap = inputs.userAuthority - inputs.domainAuthority;
    if (gap >= 10) rankingOpportunity = { label: "Strong Opportunity", color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" };
    else if (gap >= -10) rankingOpportunity = { label: "Moderate Opportunity", color: "text-yellow-700", bg: "bg-yellow-50", dot: "bg-yellow-500" };
    else if (gap >= -25) rankingOpportunity = { label: "Uphill Battle", color: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500" };
    else rankingOpportunity = { label: "Low Probability", color: "text-red-700", bg: "bg-red-50", dot: "bg-red-500" };
  }

  return { score, level, breakdown, tips, rankingOpportunity };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : Math.round(n);
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: DifficultyInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("kw", inputs.keyword);
  url.searchParams.set("da", String(inputs.domainAuthority));
  url.searchParams.set("rd", String(inputs.referringDomains));
  url.searchParams.set("vol", String(inputs.searchVolume));
  url.searchParams.set("len", String(inputs.contentLength));
  url.searchParams.set("intent", inputs.intent);
  url.searchParams.set("brand", inputs.brand);
  url.searchParams.set("serp", inputs.serpFeatures.join(","));
  return url.toString();
}

export function parseShareParams(): Partial<DifficultyInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const kw = p.get("kw");
  if (kw === null) return null;
  const serpRaw = p.get("serp");
  return {
    keyword: kw,
    domainAuthority: parseFloat(p.get("da") ?? "50") || 50,
    referringDomains: parseFloat(p.get("rd") ?? "100") || 100,
    searchVolume: parseFloat(p.get("vol") ?? "1000") || 1000,
    contentLength: parseFloat(p.get("len") ?? "1500") || 1500,
    intent: (["informational", "commercial", "transactional", "navigational"].includes(p.get("intent") ?? "") ? p.get("intent") : "informational") as SearchIntent,
    brand: (["low", "medium", "high"].includes(p.get("brand") ?? "") ? p.get("brand") : "medium") as BrandDominance,
    serpFeatures: serpRaw ? (serpRaw.split(",").filter(Boolean) as SerpFeature[]) : [],
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "keyword-difficulty-estimator-history";

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

export function buildTextReport(result: DifficultyResult, inputs: DifficultyInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Keyword Difficulty Estimator Report",
    "====================================",
    `Generated: ${ts}`,
    `Keyword: ${inputs.keyword || "Untitled Keyword"}`,
    "",
    `Domain Authority (avg. top 10): ${inputs.domainAuthority}`,
    `Referring Domains (avg. top 10): ${formatFull(inputs.referringDomains)}`,
    `Search Volume: ${formatFull(inputs.searchVolume)}/mo`,
    `Content Length (avg. top 10): ${formatFull(inputs.contentLength)} words`,
    `Search Intent: ${inputs.intent}`,
    `Brand Dominance: ${inputs.brand}`,
    `SERP Features: ${inputs.serpFeatures.length ? inputs.serpFeatures.join(", ") : "None"}`,
    "",
    "RESULT",
    `Estimated Difficulty: ${result.score}/100`,
    `Difficulty Level: ${result.level.label}`,
    `Recommendation: ${result.level.recommendation}`,
    "",
    "This is an estimated score based on a transparent client-side model — not an official score from Ahrefs, Semrush, or Moz.",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildJSONReport(result: DifficultyResult, inputs: DifficultyInputs): string {
  return JSON.stringify(
    {
      keyword: inputs.keyword || "Untitled Keyword",
      inputs: {
        domainAuthority: inputs.domainAuthority,
        referringDomains: inputs.referringDomains,
        searchVolume: inputs.searchVolume,
        contentLength: inputs.contentLength,
        intent: inputs.intent,
        brand: inputs.brand,
        serpFeatures: inputs.serpFeatures,
        exactMatchDomain: inputs.exactMatchDomain,
      },
      result: {
        score: result.score,
        level: result.level.label,
        recommendation: result.level.recommendation,
        breakdown: result.breakdown,
      },
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: DifficultyResult, inputs: DifficultyInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const rows = result.breakdown
    .map((r) => `<tr><td>${r.factor}</td><td>${r.rawScore.toFixed(1)}</td><td>${(r.weight * 100).toFixed(0)}%</td><td>${r.contribution.toFixed(1)}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><head><title>Keyword Difficulty Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 680px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    td, th { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; font-size: 13px; text-align: left; }
    th { color: #6b7280; text-transform: uppercase; font-size: 11px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    p.rec { font-size: 14px; line-height: 1.6; margin-top: 8px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Keyword Difficulty Estimator Report</h1>
    <p class="meta">Generated ${ts} — Keyword: "${inputs.keyword || "Untitled Keyword"}"</p>
    <h2>Result</h2>
    <table>
      <tr><td>Estimated Difficulty</td><td><strong>${result.score}/100</strong></td></tr>
      <tr><td>Difficulty Level</td><td>${result.level.label}</td></tr>
    </table>
    <h2>Score Breakdown</h2>
    <table>
      <thead><tr><th>Factor</th><th>Raw Score</th><th>Weight</th><th>Contribution</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <h2>Recommendation</h2>
    <p class="rec">${result.level.recommendation}</p>
    <footer>Estimated score based on a transparent client-side model — not an official score from Ahrefs, Semrush, or Moz. Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: DifficultyInputs = {
  keyword: "best running shoes",
  domainAuthority: 50,
  referringDomains: 100,
  searchVolume: 1000,
  contentLength: 1500,
  intent: "informational",
  serpFeatures: [],
  brand: "medium",
  exactMatchDomain: false,
  userAuthority: null,
};
