// ── Page Rank Estimator Logic ──
// Estimates ranking POTENTIAL using a weighted SEO best-practices scoring model.
// This does NOT use or approximate Google's actual ranking algorithm.

export type YesNo = boolean;
export type Quality4 = "excellent" | "good" | "average" | "poor";
export type Quality3 = "low" | "medium" | "high";
export type KeywordUsage = "low" | "optimal" | "high";
export type CoreWebVitals = "excellent" | "good" | "needs-improvement" | "poor";
export type RobotsMeta = "correct" | "incorrect";
export type StructuredData = "none" | "basic" | "advanced";

export type CategoryKey = "onpage" | "content" | "images" | "internal" | "technical" | "ux" | "authority";

export const CATEGORY_META: Record<CategoryKey, { label: string; weight: number; icon: string }> = {
  onpage: { label: "On-Page SEO", weight: 15, icon: "🏷️" },
  content: { label: "Content Quality", weight: 20, icon: "📝" },
  images: { label: "Images", weight: 6, icon: "🖼️" },
  internal: { label: "Internal SEO", weight: 8, icon: "🔗" },
  technical: { label: "Technical SEO", weight: 25, icon: "⚙️" },
  ux: { label: "User Experience", weight: 10, icon: "👤" },
  authority: { label: "Authority", weight: 16, icon: "🏆" },
};

export const CATEGORY_ORDER: CategoryKey[] = ["onpage", "content", "images", "internal", "technical", "ux", "authority"];

// ── Inputs ─────────────────────────────────────────────────────────────────────

export interface PageRankInputs {
  // Section A — Basic SEO
  titleLength: number;
  metaDescriptionLength: number;
  keywordInTitle: YesNo;
  keywordInDescription: YesNo;
  keywordInH1: YesNo;
  urlLength: number;
  urlReadability: Quality4;
  // Section B — Content Quality
  contentLength: number;
  contentOriginality: number;
  readabilityScore: number;
  headingStructure: Quality4;
  keywordUsage: KeywordUsage;
  // Section C — Images
  numImages: number;
  imagesWithAlt: number;
  imageOptimization: YesNo;
  // Section D — Internal SEO
  internalLinks: number;
  externalLinks: number;
  brokenLinks: number;
  breadcrumbs: YesNo;
  tableOfContents: YesNo;
  // Section E — Technical SEO
  https: YesNo;
  mobileFriendly: YesNo;
  pageSpeed: number;
  coreWebVitals: CoreWebVitals;
  canonicalTag: YesNo;
  robotsMeta: RobotsMeta;
  xmlSitemap: YesNo;
  structuredData: StructuredData;
  // Section F — User Experience
  bounceRate: number;
  avgTimeOnPage: number;
  ctrEstimate: number;
  navigationQuality: Quality4;
  // Section G — Authority
  estimatedBacklinks: number;
  referringDomains: number;
  brandAuthority: Quality3;
  domainAge: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function scaleTriangular(value: number, low: number, idealLow: number, idealHigh: number, high: number): number {
  // 100 within [idealLow, idealHigh], falls off linearly to 0 at low/high bounds
  if (value >= idealLow && value <= idealHigh) return 100;
  if (value <= low || value >= high) return 0;
  if (value < idealLow) return ((value - low) / (idealLow - low)) * 100;
  return ((high - value) / (high - idealHigh)) * 100;
}

function scaleUp(value: number, zero: number, hundred: number): number {
  if (hundred === zero) return value >= hundred ? 100 : 0;
  return clamp(((value - zero) / (hundred - zero)) * 100, 0, 100);
}

function logScale(value: number, hundredAt: number): number {
  if (value <= 0) return 0;
  return clamp((Math.log10(value + 1) / Math.log10(hundredAt + 1)) * 100, 0, 100);
}

const quality4Score: Record<Quality4, number> = { excellent: 100, good: 78, average: 50, poor: 20 };
const quality3Score: Record<Quality3, number> = { high: 100, medium: 60, low: 25 };
const cwvScore: Record<CoreWebVitals, number> = { excellent: 100, good: 80, "needs-improvement": 50, poor: 20 };

// ── Factor definition ────────────────────────────────────────────────────────

export interface FactorResult {
  key: string;
  category: CategoryKey;
  label: string;
  score: number; // 0-100
  subWeight: number; // 0-1, weight within category
  impact: number; // percentage points of the 100-point overall score this factor is worth
  tooltip: string;
}

export function computeFactors(inputs: PageRankInputs): FactorResult[] {
  const factors: Omit<FactorResult, "impact">[] = [
    // ── On-Page (15%) ──
    { key: "titleLength", category: "onpage", subWeight: 0.30, score: scaleTriangular(inputs.titleLength, 20, 50, 60, 90), label: "Title Length", tooltip: "Titles between 50-60 characters display fully in search results without being truncated." },
    { key: "metaLength", category: "onpage", subWeight: 0.20, score: scaleTriangular(inputs.metaDescriptionLength, 60, 140, 160, 300), label: "Meta Description Length", tooltip: "Meta descriptions between 140-160 characters are fully shown in Google's snippet and improve click-through rate." },
    { key: "kwTitle", category: "onpage", subWeight: 0.15, score: inputs.keywordInTitle ? 100 : 0, label: "Keyword in Title", tooltip: "Including your primary keyword in the title tag is one of the strongest on-page relevance signals." },
    { key: "kwDesc", category: "onpage", subWeight: 0.10, score: inputs.keywordInDescription ? 100 : 0, label: "Keyword in Meta Description", tooltip: "Keywords in the meta description reinforce relevance and are bolded in search results, improving CTR." },
    { key: "kwH1", category: "onpage", subWeight: 0.10, score: inputs.keywordInH1 ? 100 : 0, label: "Keyword in H1", tooltip: "The H1 heading should contain your primary keyword to reinforce topical relevance for both users and search engines." },
    { key: "urlLength", category: "onpage", subWeight: 0.05, score: scaleTriangular(inputs.urlLength, 5, 10, 60, 120), label: "URL Length", tooltip: "Shorter, descriptive URLs (under ~60 characters) are easier to read, share, and remember." },
    { key: "urlReadability", category: "onpage", subWeight: 0.10, score: quality4Score[inputs.urlReadability], label: "URL Readability", tooltip: "Clean, human-readable URLs with real words outperform URLs full of IDs and parameters." },

    // ── Content (20%) ──
    { key: "contentLength", category: "content", subWeight: 0.30, score: scaleUp(inputs.contentLength, 0, 1500), label: "Content Length", tooltip: "Content above roughly 1,500 words tends to perform better for competitive topics by covering more subtopics in depth." },
    { key: "originality", category: "content", subWeight: 0.25, score: clamp(inputs.contentOriginality, 0, 100), label: "Content Originality", tooltip: "Unique, non-duplicated content is essential — search engines actively devalue thin or copied content." },
    { key: "readability", category: "content", subWeight: 0.20, score: clamp(inputs.readabilityScore, 0, 100), label: "Readability Score", tooltip: "Content that's easy to read keeps visitors engaged longer and reduces bounce rate." },
    { key: "headingStructure", category: "content", subWeight: 0.15, score: quality4Score[inputs.headingStructure], label: "Heading Structure", tooltip: "A logical H1 → H2 → H3 hierarchy helps both readers and search engines understand your content's structure." },
    { key: "keywordUsage", category: "content", subWeight: 0.10, score: inputs.keywordUsage === "optimal" ? 100 : inputs.keywordUsage === "low" ? 50 : 40, label: "Keyword Usage", tooltip: "Optimal keyword usage reads naturally; both too little (under-optimized) and too much (keyword stuffing) hurt rankings." },

    // ── Images (6%) ──
    { key: "altCoverage", category: "images", subWeight: 0.6, score: inputs.numImages === 0 ? 60 : clamp((inputs.imagesWithAlt / inputs.numImages) * 100, 0, 100), label: "Image ALT Text Coverage", tooltip: "ALT text helps search engines understand images and is essential for screen-reader accessibility." },
    { key: "imageOptimization", category: "images", subWeight: 0.4, score: inputs.imageOptimization ? 100 : 20, label: "Image Optimization", tooltip: "Compressed, appropriately-sized images reduce page weight and improve loading speed." },

    // ── Internal SEO (8%) ──
    { key: "internalLinks", category: "internal", subWeight: 0.35, score: scaleUp(inputs.internalLinks, 0, 12), label: "Internal Links", tooltip: "Internal links distribute authority across your site and help search engines discover related pages." },
    { key: "externalLinks", category: "internal", subWeight: 0.15, score: scaleTriangular(inputs.externalLinks, 0, 2, 10, 25), label: "External Links", tooltip: "Linking to a reasonable number of authoritative external sources builds trust without diluting page focus." },
    { key: "brokenLinks", category: "internal", subWeight: 0.25, score: clamp(100 - inputs.brokenLinks * 25, 0, 100), label: "Broken Links", tooltip: "Broken links harm user experience and waste crawl budget — each one should be fixed or removed." },
    { key: "breadcrumbs", category: "internal", subWeight: 0.10, score: inputs.breadcrumbs ? 100 : 30, label: "Breadcrumbs", tooltip: "Breadcrumb navigation improves usability and can appear directly in Google search results." },
    { key: "toc", category: "internal", subWeight: 0.15, score: inputs.tableOfContents ? 100 : 40, label: "Table of Contents", tooltip: "A table of contents improves navigation on long pages and can generate jump-link sitelinks in search results." },

    // ── Technical SEO (25%) ──
    { key: "https", category: "technical", subWeight: 0.15, score: inputs.https ? 100 : 0, label: "HTTPS", tooltip: "HTTPS is a confirmed Google ranking signal and required for user trust and modern browser features." },
    { key: "mobileFriendly", category: "technical", subWeight: 0.15, score: inputs.mobileFriendly ? 100 : 0, label: "Mobile Friendly", tooltip: "Google uses mobile-first indexing, so a page that isn't mobile-friendly is severely disadvantaged." },
    { key: "pageSpeed", category: "technical", subWeight: 0.20, score: clamp(inputs.pageSpeed, 0, 100), label: "Page Speed", tooltip: "Faster-loading pages rank better and convert more visitors — speed is both a ranking and UX factor." },
    { key: "cwv", category: "technical", subWeight: 0.20, score: cwvScore[inputs.coreWebVitals], label: "Core Web Vitals", tooltip: "Core Web Vitals (LCP, INP, CLS) measure real-world loading, interactivity, and visual stability." },
    { key: "canonical", category: "technical", subWeight: 0.08, score: inputs.canonicalTag ? 100 : 30, label: "Canonical Tag", tooltip: "Canonical tags prevent duplicate content issues by telling search engines which URL version to index." },
    { key: "robots", category: "technical", subWeight: 0.07, score: inputs.robotsMeta === "correct" ? 100 : 0, label: "Robots Meta", tooltip: "An incorrect robots meta tag (e.g. accidental noindex) can completely block a page from ranking." },
    { key: "sitemap", category: "technical", subWeight: 0.05, score: inputs.xmlSitemap ? 100 : 40, label: "XML Sitemap", tooltip: "An XML sitemap helps search engines discover and crawl your pages more efficiently." },
    { key: "structuredData", category: "technical", subWeight: 0.10, score: inputs.structuredData === "advanced" ? 100 : inputs.structuredData === "basic" ? 60 : 0, label: "Structured Data", tooltip: "Schema markup enables rich results (stars, FAQs, breadcrumbs) that improve visibility and CTR in search." },

    // ── User Experience (10%) ──
    { key: "bounceRate", category: "ux", subWeight: 0.30, score: clamp(100 - inputs.bounceRate, 0, 100), label: "Bounce Rate", tooltip: "A lower bounce rate suggests the page satisfies search intent and keeps visitors engaged." },
    { key: "timeOnPage", category: "ux", subWeight: 0.25, score: scaleUp(inputs.avgTimeOnPage, 0, 3), label: "Average Time on Page", tooltip: "Longer engaged time signals to search engines that visitors find the content valuable." },
    { key: "ctrEstimate", category: "ux", subWeight: 0.25, score: clamp(inputs.ctrEstimate, 0, 100), label: "CTR Estimate", tooltip: "A higher click-through rate from search results indicates a compelling title and meta description." },
    { key: "navigation", category: "ux", subWeight: 0.20, score: quality4Score[inputs.navigationQuality], label: "Navigation Quality", tooltip: "Clear, intuitive navigation reduces friction and helps both users and crawlers find related content." },

    // ── Authority (16%) ──
    { key: "backlinks", category: "authority", subWeight: 0.35, score: logScale(inputs.estimatedBacklinks, 1000), label: "Estimated Backlinks", tooltip: "Backlinks remain one of the strongest ranking signals, though quality matters far more than raw quantity." },
    { key: "referringDomains", category: "authority", subWeight: 0.30, score: logScale(inputs.referringDomains, 200), label: "Referring Domains", tooltip: "Links from many unique domains carry more weight than many links from a single domain." },
    { key: "brandAuthority", category: "authority", subWeight: 0.20, score: quality3Score[inputs.brandAuthority], label: "Brand Authority", tooltip: "Strong brand recognition increases organic CTR and trust signals independent of raw link counts." },
    { key: "domainAge", category: "authority", subWeight: 0.15, score: scaleUp(inputs.domainAge, 0, 5), label: "Domain Age", tooltip: "Older, established domains have had more time to accumulate trust signals, though this factor matters less than content and links." },
  ];

  return factors.map((f) => ({
    ...f,
    score: Math.round(clamp(f.score, 0, 100)),
    impact: Math.round(CATEGORY_META[f.category].weight * f.subWeight * 100) / 100,
  }));
}

// ── Category + overall scoring ──────────────────────────────────────────────

export interface CategoryScore {
  category: CategoryKey;
  label: string;
  icon: string;
  weight: number;
  score: number; // 0-100
  factors: FactorResult[];
}

export type RankingPotential = "Excellent" | "Good" | "Average" | "Poor" | "Very Poor";
export type Grade = "A+" | "A" | "B" | "C" | "D" | "F";

export interface PageRankResult {
  overallScore: number;
  grade: Grade;
  rankingPotential: RankingPotential;
  categories: CategoryScore[];
  factors: FactorResult[];
  strengths: FactorResult[];
  weaknesses: FactorResult[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  key: string;
  category: CategoryKey;
  text: string;
  impact: number;
}

const RECOMMENDATION_TEXT: Record<string, string> = {
  titleLength: "Adjust your title tag to 50-60 characters so it doesn't get truncated in search results.",
  metaLength: "Write a meta description between 140-160 characters to maximize snippet visibility.",
  kwTitle: "Add your primary keyword to the page title.",
  kwDesc: "Add your primary keyword to the meta description.",
  kwH1: "Add your primary keyword to the H1 heading.",
  urlLength: "Shorten the URL and remove unnecessary parameters or IDs.",
  urlReadability: "Rewrite the URL using clear, hyphen-separated words instead of IDs or parameters.",
  contentLength: "Expand the content — aim for 1,500+ words on competitive topics to cover the subject in depth.",
  originality: "Increase content originality — rewrite or remove duplicated and thin sections.",
  readability: "Simplify sentence structure and shorten paragraphs to improve readability.",
  headingStructure: "Fix the heading hierarchy so H1, H2, and H3 tags follow a logical structure.",
  keywordUsage: "Adjust keyword usage — avoid stuffing while ensuring the primary keyword appears naturally.",
  altCoverage: "Add descriptive ALT text to every image that's missing it.",
  imageOptimization: "Compress and resize images to reduce page weight.",
  internalLinks: "Add more internal links to relevant pages on your site.",
  externalLinks: "Link out to a few authoritative external sources to build topical trust.",
  brokenLinks: "Fix or remove all broken links on the page.",
  breadcrumbs: "Add breadcrumb navigation to improve usability and search appearance.",
  toc: "Add a table of contents for easier navigation on long-form content.",
  https: "Migrate the page to HTTPS immediately — this is a confirmed ranking factor.",
  mobileFriendly: "Fix mobile usability issues — the page must be fully mobile-friendly.",
  pageSpeed: "Improve page loading speed by optimizing assets, caching, and reducing render-blocking resources.",
  cwv: "Improve Core Web Vitals — focus on Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift.",
  canonical: "Add a canonical tag to prevent duplicate content issues.",
  robots: "Fix the robots meta tag — verify the page isn't accidentally set to noindex.",
  sitemap: "Add the page to your XML sitemap so search engines can discover it more easily.",
  structuredData: "Add structured data (schema markup) — start with Article, FAQ, or Breadcrumb schema.",
  bounceRate: "Reduce bounce rate by better matching search intent and improving the above-the-fold experience.",
  timeOnPage: "Increase engagement — add more valuable content, media, or internal links to keep visitors reading.",
  ctrEstimate: "Improve CTR with a more compelling title and meta description.",
  navigation: "Simplify site navigation so users and crawlers can find related content easily.",
  backlinks: "Build more high-quality backlinks through outreach, guest posts, or digital PR.",
  referringDomains: "Diversify your backlink profile by earning links from more unique referring domains.",
  brandAuthority: "Invest in brand-building activities to increase recognition and trust.",
  domainAge: "Domain age can't be changed directly — focus on the other factors while your site naturally matures.",
};

export function calculatePageRank(inputs: PageRankInputs): PageRankResult {
  const factors = computeFactors(inputs);

  const categories: CategoryScore[] = CATEGORY_ORDER.map((cat) => {
    const catFactors = factors.filter((f) => f.category === cat);
    const totalWeight = catFactors.reduce((s, f) => s + f.subWeight, 0) || 1;
    const score = Math.round(catFactors.reduce((s, f) => s + f.score * f.subWeight, 0) / totalWeight);
    return { category: cat, label: CATEGORY_META[cat].label, icon: CATEGORY_META[cat].icon, weight: CATEGORY_META[cat].weight, score, factors: catFactors };
  });

  const overallScore = Math.round(categories.reduce((s, c) => s + (c.score / 100) * c.weight, 0));

  const grade: Grade =
    overallScore >= 97 ? "A+" : overallScore >= 90 ? "A" : overallScore >= 80 ? "B" :
    overallScore >= 70 ? "C" : overallScore >= 55 ? "D" : "F";

  const rankingPotential: RankingPotential =
    overallScore >= 85 ? "Excellent" : overallScore >= 70 ? "Good" : overallScore >= 55 ? "Average" :
    overallScore >= 40 ? "Poor" : "Very Poor";

  const strengths = [...factors].filter((f) => f.score >= 85).sort((a, b) => b.impact - a.impact).slice(0, 8);
  const weaknesses = [...factors].filter((f) => f.score < 50).sort((a, b) => b.impact - a.impact).slice(0, 8);

  const recommendations: Recommendation[] = [...factors]
    .filter((f) => f.score < 75)
    .sort((a, b) => (a.score * a.impact) - (b.score * b.impact))
    .slice(0, 10)
    .map((f) => ({ key: f.key, category: f.category, text: RECOMMENDATION_TEXT[f.key] ?? `Improve ${f.label}.`, impact: f.impact }));

  return { overallScore, grade, rankingPotential, categories, factors, strengths, weaknesses, recommendations };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: PageRankInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (inputs.titleLength < 0 || inputs.titleLength > 120) e.titleLength = "Title length must be between 0 and 120.";
  if (inputs.metaDescriptionLength < 0 || inputs.metaDescriptionLength > 320) e.metaDescriptionLength = "Meta description length must be between 0 and 320.";
  if (inputs.contentLength < 0) e.contentLength = "Content length cannot be negative.";
  if (inputs.numImages < 0) e.numImages = "Number of images cannot be negative.";
  if (inputs.imagesWithAlt < 0) e.imagesWithAlt = "Images with ALT text cannot be negative.";
  if (inputs.imagesWithAlt > inputs.numImages) e.imagesWithAlt = "Images with ALT text cannot exceed total images.";
  if (inputs.internalLinks < 0) e.internalLinks = "Internal links cannot be negative.";
  if (inputs.externalLinks < 0) e.externalLinks = "External links cannot be negative.";
  if (inputs.brokenLinks < 0) e.brokenLinks = "Broken links cannot be negative.";
  if (inputs.estimatedBacklinks < 0) e.estimatedBacklinks = "Backlinks cannot be negative.";
  if (inputs.referringDomains < 0) e.referringDomains = "Referring domains cannot be negative.";
  if (inputs.domainAge < 0) e.domainAge = "Domain age cannot be negative.";
  return e;
}

// ── Formatting / parsing helpers ─────────────────────────────────────────────

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
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

export const SCORE_COLOR = (score: number): string =>
  score >= 80 ? "#058554" : score >= 60 ? "#d97706" : "#dc2626";

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "page-rank-estimator-inputs";

export function saveInputs(inputs: PageRankInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): PageRankInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as PageRankInputs;
  } catch { return null; }
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: PageRankResult): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Page Rank Estimator Report",
    "===========================",
    `Generated: ${ts}`,
    "",
    `Overall SEO Score: ${result.overallScore}/100`,
    `Grade: ${result.grade}`,
    `Ranking Potential: ${result.rankingPotential}`,
    "",
    "Category Breakdown:",
    ...result.categories.map((c) => `  ${c.label}: ${c.score}/100 (weight ${c.weight}%)`),
    "",
    "Strengths:",
    ...(result.strengths.length ? result.strengths.map((s) => `  + ${s.label} (${s.score}/100)`) : ["  (none identified)"]),
    "",
    "Weaknesses:",
    ...(result.weaknesses.length ? result.weaknesses.map((w) => `  - ${w.label} (${w.score}/100)`) : ["  (none identified)"]),
    "",
    "Top Recommendations:",
    ...(result.recommendations.length ? result.recommendations.map((r, i) => `  ${i + 1}. ${r.text}`) : ["  (none — great job!)"]),
    "",
    "This is an estimate of ranking POTENTIAL based on SEO best practices, not Google's actual ranking algorithm.",
    "",
    "Generated by Page Rank Estimator — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: PageRankResult): string {
  const rows: (string | number)[][] = [["Category", "Factor", "Score", "Impact (pts)"]];
  result.factors.forEach((f) => rows.push([CATEGORY_META[f.category].label, f.label, f.score, f.impact]));
  return rows.map((r) => r.map((v) => (typeof v === "string" && v.includes(",") ? `"${v}"` : v)).join(",")).join("\n");
}

export function buildJSONReport(result: PageRankResult): string {
  return JSON.stringify(
    {
      overallScore: result.overallScore,
      grade: result.grade,
      rankingPotential: result.rankingPotential,
      categories: result.categories.map((c) => ({ category: c.category, label: c.label, score: c.score, weight: c.weight })),
      strengths: result.strengths.map((s) => ({ label: s.label, score: s.score })),
      weaknesses: result.weaknesses.map((w) => ({ label: w.label, score: w.score })),
      recommendations: result.recommendations.map((r) => r.text),
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: PageRankResult): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Page Rank Estimator Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 680px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    li { font-size: 14px; margin-bottom: 4px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Page Rank Estimator Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Overall Score</h2>
    <table>
      <tr><td>Overall SEO Score</td><td><strong>${result.overallScore}/100</strong></td></tr>
      <tr><td>Grade</td><td>${result.grade}</td></tr>
      <tr><td>Ranking Potential</td><td>${result.rankingPotential}</td></tr>
    </table>
    <h2>Category Breakdown</h2>
    <table>
      ${result.categories.map((c) => `<tr><td>${c.label}</td><td>${c.score}/100</td></tr>`).join("")}
    </table>
    <h2>Top Recommendations</h2>
    <ul>${result.recommendations.map((r) => `<li>${r.text}</li>`).join("") || "<li>None — great job!</li>"}</ul>
    <footer>This is an estimate of ranking potential based on SEO best practices, not Google's actual ranking algorithm.<br/>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  label: string;
  inputs: PageRankInputs;
  result: PageRankResult;
}

const HISTORY_KEY = "page-rank-estimator-history";

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

// ── Default inputs + examples ─────────────────────────────────────────────────

export const DEFAULT_INPUTS: PageRankInputs = {
  titleLength: 60,
  metaDescriptionLength: 155,
  keywordInTitle: true,
  keywordInDescription: true,
  keywordInH1: true,
  urlLength: 55,
  urlReadability: "good",
  contentLength: 800,
  contentOriginality: 70,
  readabilityScore: 65,
  headingStructure: "good",
  keywordUsage: "optimal",
  numImages: 6,
  imagesWithAlt: 4,
  imageOptimization: true,
  internalLinks: 8,
  externalLinks: 4,
  brokenLinks: 0,
  breadcrumbs: true,
  tableOfContents: false,
  https: true,
  mobileFriendly: true,
  pageSpeed: 70,
  coreWebVitals: "good",
  canonicalTag: true,
  robotsMeta: "correct",
  xmlSitemap: true,
  structuredData: "basic",
  bounceRate: 55,
  avgTimeOnPage: 2,
  ctrEstimate: 50,
  navigationQuality: "good",
  estimatedBacklinks: 50,
  referringDomains: 20,
  brandAuthority: "medium",
  domainAge: 2,
};

export const EXAMPLES: { label: string; inputs: PageRankInputs }[] = [
  {
    label: "Excellent Page",
    inputs: {
      titleLength: 58, metaDescriptionLength: 152, keywordInTitle: true, keywordInDescription: true, keywordInH1: true,
      urlLength: 42, urlReadability: "excellent",
      contentLength: 2100, contentOriginality: 95, readabilityScore: 85, headingStructure: "excellent", keywordUsage: "optimal",
      numImages: 14, imagesWithAlt: 14, imageOptimization: true,
      internalLinks: 26, externalLinks: 8, brokenLinks: 0, breadcrumbs: true, tableOfContents: true,
      https: true, mobileFriendly: true, pageSpeed: 92, coreWebVitals: "excellent", canonicalTag: true, robotsMeta: "correct", xmlSitemap: true, structuredData: "basic",
      bounceRate: 32, avgTimeOnPage: 4.2, ctrEstimate: 78, navigationQuality: "excellent",
      estimatedBacklinks: 340, referringDomains: 95, brandAuthority: "high", domainAge: 6,
    },
  },
  {
    label: "Poor Page",
    inputs: {
      titleLength: 95, metaDescriptionLength: 0, keywordInTitle: false, keywordInDescription: false, keywordInH1: false,
      urlLength: 110, urlReadability: "poor",
      contentLength: 350, contentOriginality: 40, readabilityScore: 35, headingStructure: "poor", keywordUsage: "low",
      numImages: 0, imagesWithAlt: 0, imageOptimization: false,
      internalLinks: 2, externalLinks: 0, brokenLinks: 3, breadcrumbs: false, tableOfContents: false,
      https: false, mobileFriendly: false, pageSpeed: 28, coreWebVitals: "poor", canonicalTag: false, robotsMeta: "incorrect", xmlSitemap: false, structuredData: "none",
      bounceRate: 82, avgTimeOnPage: 0.4, ctrEstimate: 15, navigationQuality: "poor",
      estimatedBacklinks: 2, referringDomains: 1, brandAuthority: "low", domainAge: 0.3,
    },
  },
  {
    label: "Balanced Page",
    inputs: {
      titleLength: 62, metaDescriptionLength: 148, keywordInTitle: true, keywordInDescription: true, keywordInH1: true,
      urlLength: 58, urlReadability: "good",
      contentLength: 1100, contentOriginality: 75, readabilityScore: 68, headingStructure: "good", keywordUsage: "optimal",
      numImages: 7, imagesWithAlt: 6, imageOptimization: true,
      internalLinks: 10, externalLinks: 3, brokenLinks: 0, breadcrumbs: true, tableOfContents: false,
      https: true, mobileFriendly: true, pageSpeed: 68, coreWebVitals: "good", canonicalTag: true, robotsMeta: "correct", xmlSitemap: true, structuredData: "basic",
      bounceRate: 50, avgTimeOnPage: 2.1, ctrEstimate: 48, navigationQuality: "good",
      estimatedBacklinks: 65, referringDomains: 24, brandAuthority: "medium", domainAge: 2.5,
    },
  },
];
