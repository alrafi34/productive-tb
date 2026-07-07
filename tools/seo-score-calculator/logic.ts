// ── SEO Score Calculator Logic ──

export type LoadSpeed   = "fast" | "average" | "slow";
export type RobotsMeta  = "index" | "noindex";

export interface SEOInputs {
  title:            string;
  metaDescription:  string;
  targetKeyword:    string;
  url:              string;
  h1:               string;
  wordCount:        string;
  totalImages:      string;
  imagesWithAlt:    string;
  internalLinks:    string;
  externalLinks:    string;
  keywordCount:     string;
  loadSpeed:        LoadSpeed;
  https:            boolean;
  mobileFriendly:   boolean;
  canonical:        boolean;
  robotsMeta:       RobotsMeta;
}

export type CheckStatus = "pass" | "warn" | "fail";

export interface CheckResult {
  id:          string;
  category:    string;
  label:       string;
  status:      CheckStatus;
  points:      number;      // earned
  maxPoints:   number;
  message:     string;
  tip:         string;
}

export interface SEOResult {
  totalScore:     number;   // 0–100
  maxScore:       number;   // 100
  grade:          string;   // A+, A, B, C, D, F
  healthLabel:    string;
  healthLevel:    "excellent" | "good" | "average" | "poor" | "critical";
  checks:         CheckResult[];
  passCount:      number;
  warnCount:      number;
  failCount:      number;
  reportText:     string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function parseNum(v: string): number {
  const n = parseInt(v.replace(/,/g, "").trim(), 10);
  return isNaN(n) ? 0 : Math.max(0, n);
}

function kw(keyword: string, text: string): boolean {
  if (!keyword.trim()) return false;
  return text.toLowerCase().includes(keyword.toLowerCase().trim());
}

function urlSlug(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : "https://" + url);
    return u.pathname;
  } catch {
    return url;
  }
}

// ── Scoring Checks ───────────────────────────────────────────────────────────

function checkTitle(i: SEOInputs): CheckResult {
  const len = i.title.trim().length;
  const hasKw = kw(i.targetKeyword, i.title);
  let points = 0; let status: CheckStatus = "fail"; let message = ""; let tip = "";

  if (len === 0) {
    message = "No page title found.";
    tip = "Add a descriptive title between 50–60 characters.";
  } else if (len < 30) {
    points = 3; status = "fail";
    message = `Title is too short (${len} chars). Aim for 50–60.`;
    tip = "Expand your title to include the target keyword and describe the page content clearly.";
  } else if (len > 70) {
    points = 5; status = "warn";
    message = `Title is too long (${len} chars). Keep it under 60.`;
    tip = "Shorten your title to prevent truncation in search results.";
  } else if (len >= 50 && len <= 60) {
    points = 10; status = "pass";
    message = `Title length is ideal (${len} chars).`;
    tip = hasKw ? "Keyword present in title — great!" : "Consider adding your target keyword early in the title.";
  } else {
    points = 7; status = "warn";
    message = `Title is acceptable (${len} chars), but 50–60 is ideal.`;
    tip = "Fine-tune the title length for optimal display in search results.";
  }
  if (len > 0 && !hasKw && i.targetKeyword) { points = Math.max(points - 2, 0); }
  return { id: "title", category: "Content", label: "Page Title", status, points, maxPoints: 10, message, tip };
}

function checkMeta(i: SEOInputs): CheckResult {
  const len = i.metaDescription.trim().length;
  const hasKw = kw(i.targetKeyword, i.metaDescription);
  let points = 0; let status: CheckStatus = "fail"; let message = ""; let tip = "";

  if (len === 0) {
    message = "Meta description is missing.";
    tip = "Write a compelling meta description between 140–160 characters to improve click-through rate.";
  } else if (len < 70) {
    points = 4; status = "fail";
    message = `Meta description is too short (${len} chars). Aim for 140–160.`;
    tip = "Expand the meta description to include your target keyword and a clear call to action.";
  } else if (len > 170) {
    points = 6; status = "warn";
    message = `Meta description is too long (${len} chars). Keep it under 160.`;
    tip = "Trim the meta description to avoid truncation in search results.";
  } else if (len >= 140 && len <= 160) {
    points = 10; status = "pass";
    message = `Meta description length is ideal (${len} chars).`;
    tip = hasKw ? "Keyword found in meta — good for relevance signals." : "Include your target keyword in the meta description.";
  } else {
    points = 7; status = "warn";
    message = `Meta description length is acceptable (${len} chars).`;
    tip = "Aim for 140–160 characters for best results in SERPs.";
  }
  if (len > 0 && !hasKw && i.targetKeyword) points = Math.max(points - 2, 0);
  return { id: "meta", category: "Content", label: "Meta Description", status, points, maxPoints: 10, message, tip };
}

function checkKeyword(i: SEOInputs): CheckResult {
  if (!i.targetKeyword.trim()) {
    return { id: "keyword", category: "Keywords", label: "Keyword Usage", status: "warn", points: 5, maxPoints: 10,
      message: "No target keyword specified.",
      tip: "Enter your primary keyword to enable keyword-related checks." };
  }
  const count = parseNum(i.keywordCount);
  const words = parseNum(i.wordCount);
  const density = words > 0 ? (count / words) * 100 : 0;
  const inTitle = kw(i.targetKeyword, i.title);
  const inMeta  = kw(i.targetKeyword, i.metaDescription);
  const inH1    = kw(i.targetKeyword, i.h1);
  const inUrl   = kw(i.targetKeyword, urlSlug(i.url));
  const signals = [inTitle, inMeta, inH1, inUrl].filter(Boolean).length;

  let points = 0; let status: CheckStatus = "fail"; let message = ""; let tip = "";

  if (count === 0) {
    message = "Target keyword not found in content.";
    tip = "Include your target keyword naturally throughout your content.";
  } else if (density > 4) {
    points = 4; status = "warn";
    message = `Keyword density is ${density.toFixed(2)}% — possibly over-optimized.`;
    tip = "Reduce keyword repetition. Use synonyms and related terms instead.";
  } else if (density >= 0.5 && density <= 2.5) {
    points = 8 + Math.min(signals, 2); status = "pass";
    message = `Keyword density is ${density.toFixed(2)}% — within the ideal range.`;
    tip = signals >= 3 ? "Keyword found in multiple key locations." : "Try adding the keyword to more key areas (title, H1, URL).";
  } else {
    points = 6; status = "warn";
    message = `Keyword density is ${density.toFixed(2)}%.`;
    tip = "Aim for 0.5–2.5% keyword density for natural optimization.";
  }
  points = Math.min(points, 10);
  return { id: "keyword", category: "Keywords", label: "Keyword Usage", status, points, maxPoints: 10, message, tip };
}

function checkContent(i: SEOInputs): CheckResult {
  const words = parseNum(i.wordCount);
  let points = 0; let status: CheckStatus = "fail"; let message = ""; let tip = "";

  if (words === 0) {
    message = "No content word count provided."; tip = "Enter the total word count of your page content.";
  } else if (words < 300) {
    points = 3; status = "fail";
    message = `Content is very thin (${words.toLocaleString("en-US")} words).`;
    tip = "Increase content depth to at least 600 words. Aim for 1,500+ for competitive topics.";
  } else if (words < 600) {
    points = 7; status = "warn";
    message = `Content is below recommended length (${words.toLocaleString("en-US")} words).`;
    tip = "Expand content to at least 1,200 words for better topical coverage.";
  } else if (words < 1200) {
    points = 10; status = "warn";
    message = `Content length is moderate (${words.toLocaleString("en-US")} words).`;
    tip = "1,500+ words is recommended for competitive keywords.";
  } else if (words >= 1500) {
    points = 15; status = "pass";
    message = `Excellent content length (${words.toLocaleString("en-US")} words).`;
    tip = "Long-form content tends to rank better. Ensure quality over quantity.";
  } else {
    points = 12; status = "pass";
    message = `Good content length (${words.toLocaleString("en-US")} words).`;
    tip = "Try to reach 1,500+ words for very competitive queries.";
  }
  return { id: "content", category: "Content", label: "Content Length", status, points, maxPoints: 15, message, tip };
}

function checkH1(i: SEOInputs): CheckResult {
  const hasH1 = i.h1.trim().length > 0;
  const hasKw = kw(i.targetKeyword, i.h1);
  let points = 0; let status: CheckStatus = "fail"; let message = ""; let tip = "";

  if (!hasH1) {
    message = "H1 heading is missing.";
    tip = "Add a single H1 tag that includes your target keyword and summarizes the page topic.";
  } else if (i.h1.trim().length > 70) {
    points = 6; status = "warn";
    message = "H1 heading is quite long.";
    tip = "Keep H1 headings concise — under 60 characters is ideal.";
  } else {
    points = hasKw ? 10 : 7;
    status = hasKw ? "pass" : "warn";
    message = hasKw ? "H1 includes the target keyword." : "H1 heading found but doesn't include the target keyword.";
    tip = hasKw ? "Great — keyword in H1 is a positive relevance signal." : "Include your target keyword in the H1 heading.";
  }
  return { id: "h1", category: "Content", label: "H1 Heading", status, points, maxPoints: 10, message, tip };
}

function checkURL(i: SEOInputs): CheckResult {
  const url = i.url.trim();
  if (!url) {
    return { id: "url", category: "Technical", label: "URL Structure", status: "warn", points: 4, maxPoints: 10,
      message: "No URL provided.",
      tip: "Enter your page URL to check SEO-friendliness." };
  }
  const slug = urlSlug(url);
  const isHttps = url.startsWith("https://");
  const hasKw = kw(i.targetKeyword, slug);
  const hasNumbers = /\d{4,}/.test(slug);
  const hasDashes = slug.includes("-");
  const hasUnderscores = slug.includes("_");
  const isClean = !hasNumbers && !hasUnderscores && slug.length < 80;

  let points = 0; let status: CheckStatus = "warn"; let message = ""; let tip = "";

  if (!isClean) {
    points = 5; status = "warn";
    message = "URL structure could be improved.";
    tip = "Use short, lowercase, hyphen-separated URLs without numbers or underscores.";
  } else if (hasKw) {
    points = 10; status = "pass";
    message = "URL includes the target keyword and is well-structured.";
    tip = "Excellent URL structure — keep it concise and descriptive.";
  } else {
    points = 7; status = "warn";
    message = "URL is clean but doesn't include the target keyword.";
    tip = "Consider including the target keyword in the URL slug for better relevance.";
  }
  if (hasUnderscores) { points = Math.max(points - 2, 0); }
  return { id: "url", category: "Technical", label: "URL Structure", status, points, maxPoints: 10, message, tip };
}

function checkImages(i: SEOInputs): CheckResult {
  const total = parseNum(i.totalImages);
  const withAlt = parseNum(i.imagesWithAlt);

  if (total === 0) {
    return { id: "images", category: "Content", label: "Image ALT Text", status: "warn", points: 7, maxPoints: 10,
      message: "No images detected on this page.",
      tip: "Adding relevant images improves engagement and SEO. Use descriptive ALT text on all images." };
  }
  const coverage = (withAlt / total) * 100;
  let points = 0; let status: CheckStatus = "fail"; let message = ""; let tip = "";

  if (coverage === 100) {
    points = 10; status = "pass";
    message = `All ${total} images have ALT text (100% coverage).`;
    tip = "Great image optimization. Ensure ALT text is descriptive, not just filename.";
  } else if (coverage >= 80) {
    points = 7; status = "warn";
    message = `${withAlt} of ${total} images have ALT text (${coverage.toFixed(0)}% coverage).`;
    tip = `Add ALT text to the remaining ${total - withAlt} image${total - withAlt > 1 ? "s" : ""}.`;
  } else if (coverage >= 50) {
    points = 4; status = "fail";
    message = `Only ${withAlt} of ${total} images have ALT text (${coverage.toFixed(0)}% coverage).`;
    tip = "More than half your images lack ALT text. Add descriptive ALT text to all images.";
  } else {
    points = 2; status = "fail";
    message = `Very poor image ALT coverage (${coverage.toFixed(0)}%).`;
    tip = "Add ALT text to all images immediately — this affects both accessibility and SEO.";
  }
  return { id: "images", category: "Content", label: "Image ALT Text", status, points, maxPoints: 10, message, tip };
}

function checkInternalLinks(i: SEOInputs): CheckResult {
  const count = parseNum(i.internalLinks);
  let points = 0; let status: CheckStatus = "warn"; let message = ""; let tip = "";

  if (count === 0) {
    points = 0; status = "fail";
    message = "No internal links detected.";
    tip = "Add internal links to related pages. Aim for 3–10 contextual internal links per page.";
  } else if (count < 3) {
    points = 2; status = "fail";
    message = `Only ${count} internal link${count > 1 ? "s" : ""} found.`;
    tip = "Increase internal linking to distribute page authority and help users navigate your site.";
  } else if (count <= 10) {
    points = 5; status = "pass";
    message = `${count} internal links — good for site architecture.`;
    tip = "Good internal linking. Ensure links use descriptive anchor text.";
  } else {
    points = 4; status = "warn";
    message = `${count} internal links — consider if all are necessary.`;
    tip = "Too many internal links can dilute link equity. Keep them contextually relevant.";
  }
  return { id: "internal", category: "Links", label: "Internal Links", status, points, maxPoints: 5, message, tip };
}

function checkExternalLinks(i: SEOInputs): CheckResult {
  const count = parseNum(i.externalLinks);
  let points = 0; let status: CheckStatus = "warn"; let message = ""; let tip = "";

  if (count === 0) {
    points = 2; status = "warn";
    message = "No external links found.";
    tip = "Link out to authoritative sources to add credibility to your content.";
  } else if (count >= 1 && count <= 8) {
    points = 5; status = "pass";
    message = `${count} outbound link${count > 1 ? "s" : ""} found.`;
    tip = "Good use of outbound links. Ensure they open in a new tab and use relevant anchor text.";
  } else {
    points = 3; status = "warn";
    message = `${count} outbound links may be excessive.`;
    tip = "Limit outbound links to highly relevant, authoritative sources.";
  }
  return { id: "external", category: "Links", label: "External Links", status, points, maxPoints: 5, message, tip };
}

function checkHTTPS(i: SEOInputs): CheckResult {
  const enabled = i.https || i.url.startsWith("https://");
  return {
    id: "https", category: "Technical", label: "HTTPS", status: enabled ? "pass" : "fail",
    points: enabled ? 5 : 0, maxPoints: 5,
    message: enabled ? "HTTPS is enabled — great for security and SEO." : "HTTPS is not enabled.",
    tip: enabled ? "HTTPS is a confirmed Google ranking signal." : "Install an SSL certificate. HTTPS is a lightweight but confirmed ranking factor.",
  };
}

function checkMobile(i: SEOInputs): CheckResult {
  return {
    id: "mobile", category: "Technical", label: "Mobile Friendly", status: i.mobileFriendly ? "pass" : "fail",
    points: i.mobileFriendly ? 5 : 0, maxPoints: 5,
    message: i.mobileFriendly ? "Page is mobile-friendly." : "Page is not marked as mobile-friendly.",
    tip: i.mobileFriendly ? "Google uses mobile-first indexing — this is critical." : "Ensure your page uses a responsive design and passes Google's Mobile-Friendly Test.",
  };
}

function checkCanonical(i: SEOInputs): CheckResult {
  return {
    id: "canonical", category: "Technical", label: "Canonical Tag", status: i.canonical ? "pass" : "warn",
    points: i.canonical ? 3 : 1, maxPoints: 3,
    message: i.canonical ? "Canonical tag is present." : "Canonical tag is missing.",
    tip: i.canonical ? "Good — canonical tags prevent duplicate content issues." : "Add a canonical tag to indicate the preferred URL for this page.",
  };
}

function checkRobots(i: SEOInputs): CheckResult {
  const indexed = i.robotsMeta === "index";
  return {
    id: "robots", category: "Technical", label: "Robots Meta", status: indexed ? "pass" : "fail",
    points: indexed ? 2 : 0, maxPoints: 2,
    message: indexed ? "Page is set to index — visible to search engines." : "Page is set to noindex — hidden from search engines.",
    tip: indexed ? "Page is indexable. Ensure you haven't accidentally blocked important resources in robots.txt." : "Remove the noindex directive unless you intentionally want to hide this page.",
  };
}

function checkLoadSpeed(i: SEOInputs): CheckResult {
  const map: Record<LoadSpeed, { points: number; status: CheckStatus; message: string; tip: string }> = {
    fast:    { points: 0, status: "pass",  message: "Page load speed is fast.", tip: "Excellent — fast pages are favored by Google's Core Web Vitals. Maintain this through caching and image optimization." },
    average: { points: 0, status: "warn",  message: "Page load speed is average.", tip: "Improve page speed by compressing images, using a CDN, and reducing render-blocking JavaScript." },
    slow:    { points: 0, status: "fail",  message: "Page load speed is slow.", tip: "Slow pages rank lower and have higher bounce rates. Use PageSpeed Insights to identify specific issues." },
  };
  const v = map[i.loadSpeed];
  // Load speed is informational — not scored separately (HTTPS/mobile cover technical)
  return { id: "speed", category: "Technical", label: "Page Load Speed", ...v, points: 0, maxPoints: 0 };
}

// ── Grade ────────────────────────────────────────────────────────────────────

function getGrade(score: number): { grade: string; healthLabel: string; healthLevel: SEOResult["healthLevel"] } {
  if (score >= 90) return { grade: "A+", healthLabel: "Excellent",  healthLevel: "excellent" };
  if (score >= 80) return { grade: "A",  healthLabel: "Very Good",  healthLevel: "good"      };
  if (score >= 70) return { grade: "B",  healthLabel: "Good",       healthLevel: "good"      };
  if (score >= 55) return { grade: "C",  healthLabel: "Average",    healthLevel: "average"   };
  if (score >= 40) return { grade: "D",  healthLabel: "Poor",       healthLevel: "poor"      };
  return                  { grade: "F",  healthLabel: "Critical",   healthLevel: "critical"  };
}

// ── Main ─────────────────────────────────────────────────────────────────────

export function calculateSEOScore(inputs: SEOInputs): SEOResult {
  const checks: CheckResult[] = [
    checkTitle(inputs),
    checkMeta(inputs),
    checkKeyword(inputs),
    checkContent(inputs),
    checkH1(inputs),
    checkURL(inputs),
    checkImages(inputs),
    checkInternalLinks(inputs),
    checkExternalLinks(inputs),
    checkHTTPS(inputs),
    checkMobile(inputs),
    checkCanonical(inputs),
    checkRobots(inputs),
    checkLoadSpeed(inputs),
  ];

  const totalScore = checks.reduce((sum, c) => sum + c.points, 0);
  const maxScore   = checks.reduce((sum, c) => sum + c.maxPoints, 0); // 100
  const pct = Math.round((totalScore / maxScore) * 100);

  const passCount = checks.filter((c) => c.status === "pass").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const failCount = checks.filter((c) => c.status === "fail").length;

  const { grade, healthLabel, healthLevel } = getGrade(pct);

  const reportText = [
    "SEO Score Report",
    "================",
    `Score:        ${pct}/100  (${grade})`,
    `SEO Health:   ${healthLabel}`,
    `Passed:       ${passCount}`,
    `Warnings:     ${warnCount}`,
    `Failed:       ${failCount}`,
    "",
    "Category Results",
    "----------------",
    ...checks.filter((c) => c.maxPoints > 0).map(
      (c) => `${c.status === "pass" ? "✓" : c.status === "warn" ? "⚠" : "✗"} ${c.label}: ${c.points}/${c.maxPoints} — ${c.message}`
    ),
    "",
    "Recommendations",
    "---------------",
    ...checks.filter((c) => c.status !== "pass" && c.maxPoints > 0).map((c) => `• ${c.tip}`),
    "",
    "Generated by Productive Toolbox",
  ].join("\n");

  return { totalScore: pct, maxScore: 100, grade, healthLabel, healthLevel, checks, passCount, warnCount, failCount, reportText };
}

// ── Debounce ─────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Validation ───────────────────────────────────────────────────────────────

export function validateInputs(inputs: SEOInputs): Record<string, string> {
  const errs: Record<string, string> = {};
  const imgTotal = parseNum(inputs.totalImages);
  const imgAlt   = parseNum(inputs.imagesWithAlt);
  if (imgAlt > imgTotal && imgTotal > 0)
    errs.imagesWithAlt = "Images with ALT cannot exceed total images.";
  const kc = parseNum(inputs.keywordCount);
  const wc = parseNum(inputs.wordCount);
  if (kc > wc && wc > 0)
    errs.keywordCount = "Keyword count cannot exceed total word count.";
  return errs;
}

// ── Sample Data ───────────────────────────────────────────────────────────────

export const SAMPLE_INPUTS: SEOInputs = {
  title:           "Best SEO Tips for Beginners – Complete 2024 Guide",
  metaDescription: "Learn practical SEO tips to improve your website rankings and drive more organic traffic. A complete beginner's guide to on-page SEO optimization.",
  targetKeyword:   "SEO tips",
  url:             "https://example.com/seo-tips-beginners",
  h1:              "SEO Tips for Beginners",
  wordCount:       "1850",
  totalImages:     "8",
  imagesWithAlt:   "6",
  internalLinks:   "7",
  externalLinks:   "4",
  keywordCount:    "14",
  loadSpeed:       "fast",
  https:           true,
  mobileFriendly:  true,
  canonical:       true,
  robotsMeta:      "index",
};
