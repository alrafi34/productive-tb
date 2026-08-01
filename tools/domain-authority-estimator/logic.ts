// ── Domain Authority Estimator Logic ──

export interface DAInputs {
  domain: string;
  referringDomains: number;
  totalBacklinks: number;
  domainAge: number; // years
  organicTraffic: number; // monthly
  spamScore: number; // 0–100
  https: boolean;
  brandMentions: "low" | "medium" | "high" | "very-high";
  contentQuality: "poor" | "average" | "good" | "excellent";
}

export interface FactorScore {
  label: string;
  score: number; // 0–100 normalized
  weight: number; // weight fraction
  contribution: number; // score * weight (before penalty)
  description: string;
}

export interface DAResult {
  domain: string;
  estimatedDA: number; // 0–100 clamped
  authorityLevel: string;
  authorityColor: string;
  authorityBg: string;
  authorityBorder: string;
  authorityDot: string;
  factors: FactorScore[];
  strengths: string[];
  weaknesses: string[];
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
  inputs: DAInputs;
  result: DAResult;
}

// ── Logarithmic scaling helpers ───────────────────────────────────────────────

/** Scale referring domains 0–1,000,000 → 0–100 (log) */
function scaleReferringDomains(val: number): number {
  if (val <= 0) return 0;
  // log10(1,000,000) = 6 → maps to 100
  return Math.min(100, (Math.log10(val + 1) / 6) * 100);
}

/** Scale backlinks 0–100,000,000 → 0–100 (log) */
function scaleBacklinks(val: number): number {
  if (val <= 0) return 0;
  // log10(100,000,000) = 8 → maps to 100
  return Math.min(100, (Math.log10(val + 1) / 8) * 100);
}

/** Scale domain age 0–25+ years → 0–100 (linear, capped at 25) */
function scaleDomainAge(years: number): number {
  return Math.min(100, (years / 25) * 100);
}

/** Scale organic traffic 0–5,000,000 → 0–100 (log) */
function scaleTraffic(val: number): number {
  if (val <= 0) return 0;
  // log10(5,000,000) ≈ 6.7 → maps to 100
  return Math.min(100, (Math.log10(val + 1) / 6.7) * 100);
}

/** Brand mentions → 0–100 */
function scaleBrandMentions(val: DAInputs["brandMentions"]): number {
  const map: Record<DAInputs["brandMentions"], number> = {
    low: 15,
    medium: 45,
    high: 75,
    "very-high": 100,
  };
  return map[val];
}

/** Content quality → 0–100 */
function scaleContentQuality(val: DAInputs["contentQuality"]): number {
  const map: Record<DAInputs["contentQuality"], number> = {
    poor: 10,
    average: 40,
    good: 72,
    excellent: 100,
  };
  return map[val];
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculateDA(inputs: DAInputs): DAResult {
  const {
    domain,
    referringDomains,
    totalBacklinks,
    domainAge,
    organicTraffic,
    spamScore,
    https,
    brandMentions,
    contentQuality,
  } = inputs;

  // Normalize each factor to 0–100
  const rdScore       = scaleReferringDomains(referringDomains);
  const blScore       = scaleBacklinks(totalBacklinks);
  const ageScore      = scaleDomainAge(domainAge);
  const trafficScore  = scaleTraffic(organicTraffic);
  const httpsScore    = https ? 100 : 0;
  const brandScore    = scaleBrandMentions(brandMentions);
  const contentScore  = scaleContentQuality(contentQuality);

  // Spam penalty: 0% spam = 0 penalty, 100% spam = 100 penalty (applied with weight 0.15)
  const spamPenalty = spamScore; // already 0–100

  // Weighted sum (before penalty)
  const factors: FactorScore[] = [
    { label: "Referring Domains", score: rdScore,      weight: 0.35, contribution: rdScore      * 0.35, description: "Unique websites linking to your domain — the most powerful authority signal." },
    { label: "Total Backlinks",   score: blScore,      weight: 0.20, contribution: blScore      * 0.20, description: "Raw count of all inbound links pointing to your domain." },
    { label: "Organic Traffic",   score: trafficScore, weight: 0.15, contribution: trafficScore * 0.15, description: "Estimated monthly organic search visitors — reflects real-world visibility." },
    { label: "Domain Age",        score: ageScore,     weight: 0.10, contribution: ageScore     * 0.10, description: "Older domains have had more time to accumulate trust and authority signals." },
    { label: "HTTPS Security",    score: httpsScore,   weight: 0.05, contribution: httpsScore   * 0.05, description: "HTTPS is a confirmed Google ranking signal and user-trust indicator." },
    { label: "Brand Mentions",    score: brandScore,   weight: 0.05, contribution: brandScore   * 0.05, description: "Unlinked brand mentions across the web contribute to entity authority." },
    { label: "Content Quality",   score: contentScore, weight: 0.05, contribution: contentScore * 0.05, description: "High-quality content earns natural backlinks and signals topical expertise." },
  ];

  const positiveSum = factors.reduce((acc, f) => acc + f.contribution, 0);
  const penaltyAmount = spamPenalty * 0.15;

  let raw = positiveSum - penaltyAmount;
  const estimatedDA = Math.round(Math.max(0, Math.min(100, raw)));

  // Authority level
  const { authorityLevel, authorityColor, authorityBg, authorityBorder, authorityDot } =
    getAuthorityLevel(estimatedDA);

  // Strengths & weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (https)                                       strengths.push("HTTPS enabled");
  if (rdScore >= 60)                               strengths.push("Strong referring domain profile");
  if (blScore >= 60)                               strengths.push("Healthy backlink volume");
  if (ageScore >= 50)                              strengths.push("Established domain age");
  if (trafficScore >= 50)                          strengths.push("Good organic traffic");
  if (brandScore >= 60)                            strengths.push("Strong brand presence");
  if (contentScore >= 60)                          strengths.push("High-quality content");
  if (spamScore <= 5)                              strengths.push("Very low spam score");

  if (!https)                                      weaknesses.push("HTTPS not enabled");
  if (rdScore < 30 && referringDomains > 0)        weaknesses.push("Few referring domains");
  if (rdScore === 0)                                weaknesses.push("No referring domains entered");
  if (blScore < 30 && totalBacklinks > 0)          weaknesses.push("Low backlink volume");
  if (ageScore < 25)                               weaknesses.push("Young domain age");
  if (trafficScore < 25 && organicTraffic > 0)     weaknesses.push("Low organic traffic");
  if (trafficScore === 0)                           weaknesses.push("No organic traffic entered");
  if (brandScore < 30)                             weaknesses.push("Weak brand mentions");
  if (contentScore < 40)                           weaknesses.push("Content quality needs improvement");
  if (spamScore > 20)                              weaknesses.push("High spam score");

  // Recommendations
  const recommendations = buildRecommendations(inputs, factors, estimatedDA, spamPenalty);

  return {
    domain: sanitizeDomain(domain),
    estimatedDA,
    authorityLevel,
    authorityColor,
    authorityBg,
    authorityBorder,
    authorityDot,
    factors,
    strengths,
    weaknesses,
    recommendations,
  };
}

// ── Authority level ───────────────────────────────────────────────────────────

export function getAuthorityLevel(score: number): {
  authorityLevel: string;
  authorityColor: string;
  authorityBg: string;
  authorityBorder: string;
  authorityDot: string;
} {
  if (score >= 81) return { authorityLevel: "Excellent",  authorityColor: "text-green-700",  authorityBg: "bg-green-50",  authorityBorder: "border-green-200",  authorityDot: "bg-green-500"  };
  if (score >= 61) return { authorityLevel: "Strong",     authorityColor: "text-blue-700",   authorityBg: "bg-blue-50",   authorityBorder: "border-blue-200",   authorityDot: "bg-blue-500"   };
  if (score >= 41) return { authorityLevel: "Moderate",   authorityColor: "text-yellow-700", authorityBg: "bg-yellow-50", authorityBorder: "border-yellow-200", authorityDot: "bg-yellow-500" };
  if (score >= 21) return { authorityLevel: "Low",        authorityColor: "text-orange-700", authorityBg: "bg-orange-50", authorityBorder: "border-orange-200", authorityDot: "bg-orange-500" };
  return               { authorityLevel: "Very Weak",  authorityColor: "text-red-700",    authorityBg: "bg-red-50",    authorityBorder: "border-red-200",    authorityDot: "bg-red-500"    };
}

// ── Recommendations ───────────────────────────────────────────────────────────

function buildRecommendations(
  inputs: DAInputs,
  factors: FactorScore[],
  estimatedDA: number,
  spamPenalty: number
): Recommendation[] {
  const recs: Recommendation[] = [];

  const rdFactor      = factors[0];
  const blFactor      = factors[1];
  const trafficFactor = factors[2];
  const ageFactor     = factors[3];
  const httpsFactor   = factors[4];
  const brandFactor   = factors[5];
  const contentFactor = factors[6];

  // HTTPS
  if (!inputs.https) {
    recs.push({ type: "danger", title: "Enable HTTPS", message: "Your site is not on HTTPS. Migrate to a secure connection immediately — it is a confirmed Google ranking signal and increases user trust." });
  } else {
    recs.push({ type: "success", title: "HTTPS is enabled", message: "Your site serves content over a secure connection. This ranking signal is fully satisfied." });
  }

  // Spam score
  if (inputs.spamScore > 30) {
    recs.push({ type: "danger", title: "Critical: High spam score", message: `Your spam score of ${inputs.spamScore}% is severely reducing your estimated authority (penalty: −${spamPenalty.toFixed(1)} pts). Conduct a backlink audit and disavow toxic links via Google Search Console.` });
  } else if (inputs.spamScore > 10) {
    recs.push({ type: "warning", title: "Elevated spam score", message: `Spam score of ${inputs.spamScore}% is applying a moderate penalty. Review your backlink profile for low-quality or spammy links and disavow those that cannot be removed.` });
  } else if (inputs.spamScore <= 5) {
    recs.push({ type: "success", title: "Healthy spam score", message: `Spam score of ${inputs.spamScore}% is excellent. Your backlink profile appears clean and natural.` });
  }

  // Referring domains
  if (rdFactor.score < 20) {
    recs.push({ type: "danger", title: "Very few referring domains", message: "Referring domains carry 35% of the estimated authority score — the largest single factor. Focus link-building efforts on earning links from diverse, authoritative websites." });
  } else if (rdFactor.score < 50) {
    recs.push({ type: "warning", title: "Referring domain count could be stronger", message: `Your referring domain score is ${rdFactor.score.toFixed(0)}/100. Target high-DR publications, directories, podcasts, and resource pages in your niche for new link opportunities.` });
  } else {
    recs.push({ type: "success", title: "Strong referring domain profile", message: "Your referring domain count is contributing well to estimated authority. Maintain link diversity and continue outreach." });
  }

  // Backlinks
  if (blFactor.score < 20 && inputs.totalBacklinks > 0) {
    recs.push({ type: "warning", title: "Low total backlink count", message: "A low backlink volume limits your authority ceiling. Prioritize content that earns natural links — data studies, free tools, comprehensive guides, and original research." });
  }

  // Traffic
  if (trafficFactor.score < 20 && inputs.organicTraffic > 0) {
    recs.push({ type: "warning", title: "Low organic traffic", message: "Low organic traffic signals that the domain has limited search visibility. Target long-tail keywords with lower competition to build topical authority and traffic incrementally." });
  } else if (trafficFactor.score < 20 && inputs.organicTraffic === 0) {
    recs.push({ type: "info", title: "Add organic traffic estimate", message: "Enter your estimated monthly organic visitors to factor this 15% weighted signal into your authority estimate." });
  }

  // Domain age
  if (ageFactor.score < 25) {
    recs.push({ type: "info", title: "Young domain", message: "Domain age is a passive signal — it improves over time without action. Focus on accelerating the higher-weight factors: backlinks, referring domains, and content quality." });
  }

  // Content quality
  if (contentFactor.score < 40) {
    recs.push({ type: "warning", title: "Improve content quality", message: "Content quality affects both direct authority signals and your ability to earn natural backlinks. Publish in-depth, original content that covers topics comprehensively and cites authoritative sources." });
  }

  // Brand mentions
  if (brandFactor.score < 30) {
    recs.push({ type: "warning", title: "Low brand visibility", message: "Brand mentions signal entity authority to search engines. Increase visibility through PR, guest contributions, podcast appearances, social media, and community participation in your niche." });
  }

  // DA-level guidance
  if (estimatedDA < 21) {
    recs.push({ type: "info", title: "New or early-stage domain", message: "Estimated DA below 21 is typical for domains under 1–2 years old with limited links. Focus on publishing 10–20 cornerstone pieces of content and earning your first 50 referring domains." });
  } else if (estimatedDA >= 61) {
    recs.push({ type: "success", title: "Strong authority foundation", message: `Estimated DA of ${estimatedDA} reflects a well-established domain. At this level, focus on maintaining link diversity, refreshing older content, and building topical depth to push into the 70+ range.` });
  }

  return recs;
}

// ── Validation ────────────────────────────────────────────────────────────────

export interface ValidationErrors {
  [key: string]: string | null;
}

export function validateInputs(inputs: DAInputs): ValidationErrors {
  const errors: ValidationErrors = {};

  if (inputs.domain && !isValidDomain(inputs.domain)) {
    errors.domain = "Enter a valid domain (e.g. example.com)";
  }
  if (inputs.referringDomains < 0)  errors.referringDomains = "Cannot be negative";
  if (inputs.totalBacklinks < 0)    errors.totalBacklinks   = "Cannot be negative";
  if (inputs.domainAge < 0)         errors.domainAge        = "Cannot be negative";
  if (inputs.domainAge > 100)       errors.domainAge        = "Unusually high — max 100 years";
  if (inputs.organicTraffic < 0)    errors.organicTraffic   = "Cannot be negative";
  if (inputs.spamScore < 0 || inputs.spamScore > 100) errors.spamScore = "Must be between 0 and 100";

  return errors;
}

function isValidDomain(domain: string): boolean {
  const cleaned = sanitizeDomain(domain);
  if (!cleaned) return true; // empty is fine
  return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(cleaned);
}

export function sanitizeDomain(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "")
    .replace(/\s+/g, "");
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function parseNumber(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "da-estimator-history";

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

// ── Export builders ───────────────────────────────────────────────────────────

export function buildTextReport(result: DAResult, inputs: DAInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Domain Authority Estimator Report",
    "===================================",
    `Generated: ${ts}`,
    `Domain: ${result.domain || "Not specified"}`,
    "",
    `ESTIMATED DA SCORE: ${result.estimatedDA} / 100`,
    `Authority Level:    ${result.authorityLevel}`,
    "",
    "FACTOR BREAKDOWN",
    ...result.factors.map(
      (f) => `${f.label.padEnd(22)}: ${f.score.toFixed(1).padStart(5)}/100  (weight ${(f.weight * 100).toFixed(0)}%)`
    ),
    "",
    `Spam Score Penalty: −${(inputs.spamScore * 0.15).toFixed(1)} pts (spam: ${inputs.spamScore}%)`,
    "",
    "STRENGTHS",
    ...result.strengths.map((s) => `  ✓ ${s}`),
    "",
    "WEAKNESSES",
    ...result.weaknesses.map((w) => `  ✗ ${w}`),
    "",
    "RECOMMENDATIONS",
    ...result.recommendations.map((r) => `[${r.type.toUpperCase()}] ${r.title}: ${r.message}`),
    "",
    "DISCLAIMER",
    "This is an estimated score based on publicly known SEO factors. Domain Authority (DA)",
    "is a proprietary metric by Moz and cannot be calculated exactly without their data.",
    "This estimator is for educational and comparative purposes only.",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildJSONReport(result: DAResult, inputs: DAInputs): object {
  return {
    domain: result.domain || "Not specified",
    estimatedDA: result.estimatedDA,
    authorityLevel: result.authorityLevel,
    inputs: {
      referringDomains: inputs.referringDomains,
      totalBacklinks: inputs.totalBacklinks,
      domainAge: inputs.domainAge,
      organicTraffic: inputs.organicTraffic,
      spamScore: inputs.spamScore,
      https: inputs.https,
      brandMentions: inputs.brandMentions,
      contentQuality: inputs.contentQuality,
    },
    factorBreakdown: result.factors.map((f) => ({
      factor: f.label,
      normalizedScore: parseFloat(f.score.toFixed(1)),
      weight: `${(f.weight * 100).toFixed(0)}%`,
      contribution: parseFloat(f.contribution.toFixed(2)),
    })),
    spamPenalty: parseFloat((inputs.spamScore * 0.15).toFixed(2)),
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    recommendations: result.recommendations.map((r) => ({
      priority: r.type,
      title: r.title,
      action: r.message,
    })),
    disclaimer: "Estimated score for educational purposes only. Domain Authority is a proprietary Moz metric.",
    generatedAt: new Date().toISOString(),
  };
}

// ── Sample data ───────────────────────────────────────────────────────────────

export const SAMPLE_DATA: DAInputs = {
  domain: "example.com",
  referringDomains: 250,
  totalBacklinks: 4800,
  domainAge: 8,
  organicTraffic: 18000,
  spamScore: 3,
  https: true,
  brandMentions: "medium",
  contentQuality: "good",
};

export const DEFAULT_INPUTS: DAInputs = {
  domain: "",
  referringDomains: 0,
  totalBacklinks: 0,
  domainAge: 0,
  organicTraffic: 0,
  spamScore: 5,
  https: true,
  brandMentions: "medium",
  contentQuality: "good",
};
