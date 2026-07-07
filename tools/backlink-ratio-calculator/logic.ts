// ── Backlink Ratio Calculator Logic ──

export interface BacklinkInputs {
  totalBacklinks: number;
  followLinks: number;
  nofollowLinks: number;
  homepageLinks: number;
  innerPageLinks: number;
  brandAnchors: number;
  exactMatchAnchors: number;
  partialMatchAnchors: number;
  genericAnchors: number;
  imageLinks: number;
  textLinks: number;
  referringDomains: number;
  uniqueIPs: number;
}

export interface RatioItem {
  label: string;
  value: number;
  total: number;
  percentage: number;
  status: "healthy" | "warning" | "danger" | "neutral";
  tip: string;
}

export interface HealthScore {
  score: number;
  level: "excellent" | "good" | "fair" | "poor";
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  description: string;
}

export interface BacklinkResult {
  inputs: BacklinkInputs;
  followRatio: RatioItem;
  nofollowRatio: RatioItem;
  homepageRatio: RatioItem;
  deepPageRatio: RatioItem;
  brandRatio: RatioItem;
  exactMatchRatio: RatioItem;
  partialMatchRatio: RatioItem;
  genericRatio: RatioItem;
  imageRatio: RatioItem;
  textRatio: RatioItem;
  domainDiversity: RatioItem;
  healthScore: HealthScore;
  recommendations: Recommendation[];
}

export interface Recommendation {
  type: "success" | "warning" | "danger" | "info";
  title: string;
  message: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BacklinkInputs;
  result: BacklinkResult;
}

export interface ValidationErrors {
  [key: string]: string | null;
}

// ── Ratio calculation ──────────────────────────────────────────────────────

export function ratio(value: number, total: number): number {
  if (total === 0) return 0;
  return parseFloat(((value / total) * 100).toFixed(2));
}

// ── Status helpers ─────────────────────────────────────────────────────────

function followStatus(pct: number): RatioItem["status"] {
  // Healthy: 60–80% follow
  if (pct >= 60 && pct <= 80) return "healthy";
  if (pct > 80 && pct <= 90) return "warning";
  if (pct < 60 && pct >= 40) return "warning";
  return "danger";
}

function nofollowStatus(pct: number): RatioItem["status"] {
  // Healthy: 20–40% nofollow
  if (pct >= 20 && pct <= 40) return "healthy";
  if ((pct > 40 && pct <= 50) || (pct < 20 && pct >= 10)) return "warning";
  return "danger";
}

function homepageStatus(pct: number): RatioItem["status"] {
  if (pct <= 40) return "healthy";
  if (pct <= 60) return "warning";
  return "danger";
}

function deepPageStatus(pct: number): RatioItem["status"] {
  if (pct >= 60) return "healthy";
  if (pct >= 40) return "warning";
  return "danger";
}

function brandStatus(pct: number): RatioItem["status"] {
  if (pct >= 30 && pct <= 60) return "healthy";
  if ((pct > 20 && pct < 30) || (pct > 60 && pct <= 70)) return "warning";
  return "danger";
}

function exactMatchStatus(pct: number): RatioItem["status"] {
  if (pct <= 20) return "healthy";
  if (pct <= 35) return "warning";
  return "danger";
}

function genericStatus(pct: number): RatioItem["status"] {
  if (pct >= 10 && pct <= 30) return "healthy";
  if (pct < 10 || (pct > 30 && pct <= 40)) return "warning";
  return "danger";
}

function domainDiversityStatus(pct: number): RatioItem["status"] {
  if (pct >= 50) return "healthy";
  if (pct >= 30) return "warning";
  return "danger";
}

// ── Build ratio item ────────────────────────────────────────────────────────

function buildRatioItem(
  label: string,
  value: number,
  total: number,
  statusFn: (pct: number) => RatioItem["status"],
  tip: string
): RatioItem {
  const percentage = ratio(value, total);
  return { label, value, total, percentage, status: statusFn(percentage), tip };
}

// ── Health score ─────────────────────────────────────────────────────────────

function computeHealthScore(items: RatioItem[]): HealthScore {
  // Each healthy = 10pts, warning = 5pts, danger = 0pts, neutral = 7pts
  const relevant = items.filter((i) => i.total > 0 && i.status !== "neutral");
  if (relevant.length === 0) {
    return { score: 0, level: "poor", label: "No Data", color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200", dot: "bg-gray-400", description: "Enter backlink data to calculate your health score." };
  }
  const points = relevant.reduce((acc, i) => {
    if (i.status === "healthy") return acc + 10;
    if (i.status === "warning") return acc + 5;
    return acc; // danger = 0
  }, 0);
  const maxPoints = relevant.length * 10;
  const score = Math.round((points / maxPoints) * 100);

  if (score >= 80) return { score, level: "excellent", label: "Excellent", color: "text-green-700", bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500", description: "Your backlink profile looks healthy. Keep building diverse, high-quality links." };
  if (score >= 60) return { score, level: "good", label: "Good", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500", description: "Your profile is generally healthy with some areas to improve." };
  if (score >= 40) return { score, level: "fair", label: "Fair", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200", dot: "bg-yellow-500", description: "Several ratios are outside healthy ranges. Review the recommendations below." };
  return { score, level: "poor", label: "Poor", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500", description: "Your backlink profile has significant issues that could harm your SEO. Take action on the recommendations." };
}

// ── Recommendations ───────────────────────────────────────────────────────────

function buildRecommendations(result: Omit<BacklinkResult, "recommendations">): Recommendation[] {
  const recs: Recommendation[] = [];
  const { followRatio, nofollowRatio, homepageRatio, deepPageRatio, brandRatio, exactMatchRatio, domainDiversity, inputs } = result;

  if (inputs.totalBacklinks === 0) {
    recs.push({ type: "info", title: "No data entered", message: "Enter your backlink statistics to receive personalized recommendations." });
    return recs;
  }

  // Follow/Nofollow
  if (followRatio.status === "danger" && followRatio.percentage > 90) {
    recs.push({ type: "danger", title: "Too many follow links", message: `Your follow ratio is ${followRatio.percentage}%. An unnaturally high follow ratio can trigger over-optimization penalties. Aim for 60–80% follow links.` });
  } else if (followRatio.status === "warning" && followRatio.percentage > 80) {
    recs.push({ type: "warning", title: "Follow ratio slightly high", message: `Follow ratio is ${followRatio.percentage}%. Try to acquire more nofollow links from social platforms, news sites, and directories to create a natural profile.` });
  } else if (followRatio.status === "healthy") {
    recs.push({ type: "success", title: "Healthy follow/nofollow balance", message: `Follow ratio of ${followRatio.percentage}% is within the recommended 60–80% range. Your link profile appears natural.` });
  }

  // Homepage vs Deep page
  if (homepageRatio.total > 0) {
    if (homepageRatio.status === "danger") {
      recs.push({ type: "danger", title: "Too many homepage backlinks", message: `${homepageRatio.percentage}% of links point to your homepage. Real sites get links to many pages. Increase deep-page link building for inner content and landing pages.` });
    } else if (homepageRatio.status === "warning") {
      recs.push({ type: "warning", title: "Homepage links a bit high", message: `${homepageRatio.percentage}% of backlinks point to the homepage. Consider building more links to blog posts, product pages, or category pages.` });
    } else if (deepPageRatio.status === "healthy") {
      recs.push({ type: "success", title: "Good deep-link distribution", message: `${deepPageRatio.percentage}% of links point to inner pages, showing a natural content-focused link profile.` });
    }
  }

  // Anchor text
  if (exactMatchRatio.total > 0) {
    if (exactMatchRatio.status === "danger") {
      recs.push({ type: "danger", title: "Anchor text over-optimized", message: `Exact-match anchor text is ${exactMatchRatio.percentage}%. Google's Penguin algorithm penalizes over-optimization. Keep exact-match anchors below 20% and diversify with brand and generic anchors.` });
    } else if (exactMatchRatio.status === "warning") {
      recs.push({ type: "warning", title: "Exact-match anchors slightly elevated", message: `Exact-match ratio of ${exactMatchRatio.percentage}% is borderline. Monitor this closely and focus new links on brand or partial-match anchors.` });
    }
    if (brandRatio.status === "danger" && brandRatio.percentage < 20) {
      recs.push({ type: "warning", title: "Brand anchors low", message: `Only ${brandRatio.percentage}% of anchors use your brand name. Brand anchors are the most natural signal. Aim for 30–60% brand anchor text.` });
    } else if (brandRatio.status === "healthy") {
      recs.push({ type: "success", title: "Healthy anchor text mix", message: `Brand anchor text at ${brandRatio.percentage}% looks natural. Keep diversifying your anchor text profile.` });
    }
  }

  // Domain diversity
  if (domainDiversity.total > 0) {
    if (domainDiversity.status === "danger") {
      recs.push({ type: "danger", title: "Low domain diversity", message: `Only ${domainDiversity.percentage}% referring domain ratio. Many links from few domains reduce authority. Focus on earning links from diverse, unique domains.` });
    } else if (domainDiversity.status === "warning") {
      recs.push({ type: "warning", title: "Domain diversity could improve", message: `Referring domain ratio is ${domainDiversity.percentage}%. Try to diversify your link sources to improve domain authority signals.` });
    } else {
      recs.push({ type: "success", title: "Good domain diversity", message: `Strong referring domain ratio of ${domainDiversity.percentage}% indicates links from many unique domains, which is a positive authority signal.` });
    }
  }

  return recs;
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculateBacklinkRatios(inputs: BacklinkInputs): BacklinkResult {
  const {
    totalBacklinks, followLinks, nofollowLinks,
    homepageLinks, innerPageLinks,
    brandAnchors, exactMatchAnchors, partialMatchAnchors, genericAnchors,
    imageLinks, textLinks,
    referringDomains,
  } = inputs;

  const anchorTotal = brandAnchors + exactMatchAnchors + partialMatchAnchors + genericAnchors;
  const linkTypeTotal = imageLinks + textLinks;

  const followRatio     = buildRatioItem("Follow Links",         followLinks,         totalBacklinks, followStatus,         "Healthy range: 60–80%. Natural profiles mix follow and nofollow links.");
  const nofollowRatio   = buildRatioItem("Nofollow Links",       nofollowLinks,       totalBacklinks, nofollowStatus,       "Healthy range: 20–40%. Nofollow links from social, news, and directories signal natural growth.");
  const homepageRatio   = buildRatioItem("Homepage Links",       homepageLinks,       totalBacklinks, homepageStatus,       "Healthy: under 40%. Natural profiles link to many pages, not just the homepage.");
  const deepPageRatio   = buildRatioItem("Deep Page Links",      innerPageLinks,      totalBacklinks, deepPageStatus,       "Healthy: 60%+. Deep links to inner content show topical authority and natural growth.");
  const brandRatio      = buildRatioItem("Brand Anchors",        brandAnchors,        anchorTotal,    brandStatus,          "Healthy range: 30–60%. Brand anchors are the most natural and trusted anchor type.");
  const exactMatchRatio = buildRatioItem("Exact-Match Anchors",  exactMatchAnchors,   anchorTotal,    exactMatchStatus,     "Keep below 20%. High exact-match ratios can trigger Penguin-style over-optimization penalties.");
  const partialMatchRatio = buildRatioItem("Partial-Match Anchors", partialMatchAnchors, anchorTotal, () => "neutral",      "Partial-match anchors add SEO value without the risk of exact-match over-optimization.");
  const genericRatio    = buildRatioItem("Generic Anchors",      genericAnchors,      anchorTotal,    genericStatus,        "Healthy range: 10–30%. 'Click here', 'visit', and URL anchors add natural diversity.");
  const imageRatio      = buildRatioItem("Image Links",          imageLinks,          linkTypeTotal,  () => "neutral",      "Image links contribute to diversity. Alt text acts as anchor text for SEO value.");
  const textRatio       = buildRatioItem("Text Links",           textLinks,           linkTypeTotal,  () => "neutral",      "Text links with relevant anchor text carry the most SEO value in a link profile.");
  const domainDiversity = buildRatioItem("Domain Diversity",     referringDomains,    totalBacklinks, domainDiversityStatus,"Higher ratio = more unique domains. Links from diverse domains carry more authority.");

  const allItems = [followRatio, nofollowRatio, homepageRatio, deepPageRatio, brandRatio, exactMatchRatio, domainDiversity];
  const healthScore = computeHealthScore(allItems);

  const partialResult = {
    inputs, followRatio, nofollowRatio, homepageRatio, deepPageRatio,
    brandRatio, exactMatchRatio, partialMatchRatio, genericRatio,
    imageRatio, textRatio, domainDiversity, healthScore,
  };

  const recommendations = buildRecommendations(partialResult);

  return { ...partialResult, recommendations };
}

// ── Validation ────────────────────────────────────────────────────────────────

export function validateInputs(inputs: BacklinkInputs): ValidationErrors {
  const errors: ValidationErrors = {};
  const { totalBacklinks, followLinks, nofollowLinks, homepageLinks, innerPageLinks } = inputs;

  if (totalBacklinks < 0) errors.totalBacklinks = "Total backlinks cannot be negative.";
  if (followLinks < 0)    errors.followLinks    = "Follow links cannot be negative.";
  if (nofollowLinks < 0)  errors.nofollowLinks  = "Nofollow links cannot be negative.";

  if (totalBacklinks > 0) {
    if (followLinks > totalBacklinks)   errors.followLinks   = "Follow links cannot exceed total backlinks.";
    if (nofollowLinks > totalBacklinks) errors.nofollowLinks = "Nofollow links cannot exceed total backlinks.";
    if (homepageLinks > totalBacklinks) errors.homepageLinks = "Homepage links cannot exceed total backlinks.";
    if (innerPageLinks > totalBacklinks) errors.innerPageLinks = "Inner page links cannot exceed total backlinks.";
    if (followLinks + nofollowLinks > totalBacklinks) {
      errors.followLinks = "Follow + Nofollow links cannot exceed total backlinks.";
    }
    if (homepageLinks + innerPageLinks > totalBacklinks) {
      errors.homepageLinks = "Homepage + Inner page links cannot exceed total backlinks.";
    }
  }

  return errors;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function parseInputValue(val: string): number {
  const n = parseInt(val.replace(/,/g, "").trim(), 10);
  return isNaN(n) || n < 0 ? 0 : n;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "backlink-ratio-calculator-history";

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

// ── CSV parsing ───────────────────────────────────────────────────────────────

export function parseBatchText(text: string): Partial<BacklinkInputs> {
  const result: Partial<BacklinkInputs> = {};
  const map: Record<string, keyof BacklinkInputs> = {
    total: "totalBacklinks",
    follow: "followLinks",
    nofollow: "nofollowLinks",
    homepage: "homepageLinks",
    inner: "innerPageLinks",
    brand: "brandAnchors",
    exact: "exactMatchAnchors",
    partial: "partialMatchAnchors",
    generic: "genericAnchors",
    image: "imageLinks",
    text: "textLinks",
    domains: "referringDomains",
    ips: "uniqueIPs",
  };
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const [key, val] = line.split(/:/).map((s) => s.trim().toLowerCase());
    if (key && val && map[key]) {
      const num = parseInt(val, 10);
      if (!isNaN(num) && num >= 0) {
        (result as Record<string, number>)[map[key]] = num;
      }
    }
  }
  return result;
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildCSVReport(result: BacklinkResult): string {
  const ts = new Date().toISOString();
  const rows = [
    ["Backlink Ratio Calculator Report", ts],
    [],
    ["Metric", "Value", "Total", "Percentage", "Status"],
    [result.followRatio.label,      result.followRatio.value,       result.followRatio.total,       `${result.followRatio.percentage}%`,       result.followRatio.status],
    [result.nofollowRatio.label,    result.nofollowRatio.value,     result.nofollowRatio.total,     `${result.nofollowRatio.percentage}%`,     result.nofollowRatio.status],
    [result.homepageRatio.label,    result.homepageRatio.value,     result.homepageRatio.total,     `${result.homepageRatio.percentage}%`,     result.homepageRatio.status],
    [result.deepPageRatio.label,    result.deepPageRatio.value,     result.deepPageRatio.total,     `${result.deepPageRatio.percentage}%`,     result.deepPageRatio.status],
    [result.brandRatio.label,       result.brandRatio.value,        result.brandRatio.total,        `${result.brandRatio.percentage}%`,        result.brandRatio.status],
    [result.exactMatchRatio.label,  result.exactMatchRatio.value,   result.exactMatchRatio.total,   `${result.exactMatchRatio.percentage}%`,   result.exactMatchRatio.status],
    [result.partialMatchRatio.label,result.partialMatchRatio.value, result.partialMatchRatio.total, `${result.partialMatchRatio.percentage}%`, result.partialMatchRatio.status],
    [result.genericRatio.label,     result.genericRatio.value,      result.genericRatio.total,      `${result.genericRatio.percentage}%`,      result.genericRatio.status],
    [result.imageRatio.label,       result.imageRatio.value,        result.imageRatio.total,        `${result.imageRatio.percentage}%`,        result.imageRatio.status],
    [result.textRatio.label,        result.textRatio.value,         result.textRatio.total,         `${result.textRatio.percentage}%`,         result.textRatio.status],
    [result.domainDiversity.label,  result.domainDiversity.value,   result.domainDiversity.total,   `${result.domainDiversity.percentage}%`,   result.domainDiversity.status],
    [],
    ["Health Score", `${result.healthScore.score}/100`, result.healthScore.label],
    [],
    ["Recommendations"],
    ...result.recommendations.map((r) => [r.type.toUpperCase(), r.title, r.message]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildTextReport(result: BacklinkResult): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Backlink Ratio Calculator Report",
    "=================================",
    `Generated: ${ts}`,
    "",
    "LINK TYPE RATIOS",
    `Follow Links:      ${result.followRatio.value} / ${result.followRatio.total} = ${result.followRatio.percentage}% (${result.followRatio.status})`,
    `Nofollow Links:    ${result.nofollowRatio.value} / ${result.nofollowRatio.total} = ${result.nofollowRatio.percentage}% (${result.nofollowRatio.status})`,
    `Homepage Links:    ${result.homepageRatio.value} / ${result.homepageRatio.total} = ${result.homepageRatio.percentage}% (${result.homepageRatio.status})`,
    `Deep Page Links:   ${result.deepPageRatio.value} / ${result.deepPageRatio.total} = ${result.deepPageRatio.percentage}% (${result.deepPageRatio.status})`,
    "",
    "ANCHOR TEXT DISTRIBUTION",
    `Brand Anchors:     ${result.brandRatio.value} / ${result.brandRatio.total} = ${result.brandRatio.percentage}% (${result.brandRatio.status})`,
    `Exact-Match:       ${result.exactMatchRatio.value} / ${result.exactMatchRatio.total} = ${result.exactMatchRatio.percentage}% (${result.exactMatchRatio.status})`,
    `Partial-Match:     ${result.partialMatchRatio.value} / ${result.partialMatchRatio.total} = ${result.partialMatchRatio.percentage}%`,
    `Generic Anchors:   ${result.genericRatio.value} / ${result.genericRatio.total} = ${result.genericRatio.percentage}%`,
    "",
    "LINK FORMAT",
    `Text Links:        ${result.textRatio.value} / ${result.textRatio.total} = ${result.textRatio.percentage}%`,
    `Image Links:       ${result.imageRatio.value} / ${result.imageRatio.total} = ${result.imageRatio.percentage}%`,
    "",
    "DOMAIN DIVERSITY",
    `Referring Domains: ${result.domainDiversity.value} / ${result.domainDiversity.total} = ${result.domainDiversity.percentage}% (${result.domainDiversity.status})`,
    "",
    `HEALTH SCORE: ${result.healthScore.score}/100 – ${result.healthScore.label}`,
    result.healthScore.description,
    "",
    "RECOMMENDATIONS",
    ...result.recommendations.map((r) => `[${r.type.toUpperCase()}] ${r.title}: ${r.message}`),
    "",
    "Generated by Productive Toolbox",
  ];
  return lines.join("\n");
}

// ── Sample data ────────────────────────────────────────────────────────────────

export const SAMPLE_DATA: BacklinkInputs = {
  totalBacklinks: 1200,
  followLinks: 840,
  nofollowLinks: 360,
  homepageLinks: 420,
  innerPageLinks: 780,
  brandAnchors: 480,
  exactMatchAnchors: 180,
  partialMatchAnchors: 240,
  genericAnchors: 180,
  imageLinks: 120,
  textLinks: 960,
  referringDomains: 720,
  uniqueIPs: 650,
};

export const DEFAULT_INPUTS: BacklinkInputs = {
  totalBacklinks: 0,
  followLinks: 0,
  nofollowLinks: 0,
  homepageLinks: 0,
  innerPageLinks: 0,
  brandAnchors: 0,
  exactMatchAnchors: 0,
  partialMatchAnchors: 0,
  genericAnchors: 0,
  imageLinks: 0,
  textLinks: 0,
  referringDomains: 0,
  uniqueIPs: 0,
};
