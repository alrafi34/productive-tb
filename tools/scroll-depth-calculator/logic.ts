// ── Scroll Depth Calculator Logic ──

export type Mode = "manual" | "live";

export interface Tier {
  key: string;
  max: number;
  label: string;
  color: string;
  bg: string;
  text: string;
  dot: string;
  explanation: string;
  recommendation: string;
}

export const TIERS: Tier[] = [
  {
    key: "bounced", max: 25, label: "Bounced", color: "#ef4444", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500",
    explanation: "Most visitors are leaving early without engaging with the main content.",
    recommendation: "Move your most important message and call-to-action higher up the page, above where most visitors stop scrolling.",
  },
  {
    key: "skimmed", max: 50, label: "Skimmed", color: "#f97316", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500",
    explanation: "Visitors are skimming the page but not reaching deeper content.",
    recommendation: "Break up long sections with subheadings and visuals to encourage visitors to keep scrolling past the midpoint.",
  },
  {
    key: "engaged", max: 75, label: "Engaged", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500",
    explanation: "Visitors are engaging with a majority of the page content.",
    recommendation: "Content in the middle of the page is holding attention well — consider reinforcing key points here.",
  },
  {
    key: "highly-engaged", max: 90, label: "Highly Engaged", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500",
    explanation: "Most visitors are reading through nearly all of the page.",
    recommendation: "This page is performing well for engagement — a strong candidate for placing secondary calls-to-action near the bottom.",
  },
  {
    key: "completed", max: Infinity, label: "Completed", color: "#058554", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500",
    explanation: "Visitors are reaching the very bottom of the page.",
    recommendation: "Visitors who scroll this far are highly engaged — make sure your bottom-of-page content includes a clear next step.",
  },
];

export function getTier(pct: number): Tier {
  return TIERS.find((t) => pct <= t.max) ?? TIERS[TIERS.length - 1];
}

export interface Preset {
  label: string;
  icon: string;
  documentHeight: number;
  viewportHeight: number;
  currentScroll: number;
}

export const PRESETS: Preset[] = [
  { label: "Blog Post", icon: "📝", documentHeight: 6000, viewportHeight: 900, currentScroll: 2700 },
  { label: "Landing Page Bottom", icon: "📄", documentHeight: 3000, viewportHeight: 800, currentScroll: 2200 },
  { label: "Long-Form Article", icon: "📰", documentHeight: 12000, viewportHeight: 1000, currentScroll: 3500 },
];

export interface ScrollDepthInputs {
  mode: Mode;
  documentHeight: number;
  viewportHeight: number;
  currentScroll: number;
  stickyHeaderHeight: number;
  footerHeight: number;
  offsetAdjustment: number;
}

export interface ScrollDepthResult {
  scrollDepthPct: number;
  pixelsViewed: number;
  pixelsRemaining: number;
  effectiveViewport: number;
  effectiveDocument: number;
  tier: Tier;
  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ScrollDepthInputs;
  result: ScrollDepthResult;
}

export function getWarning(inputs: ScrollDepthInputs): string | null {
  if (inputs.documentHeight <= 0) return "Document height must be greater than zero.";
  if (inputs.viewportHeight > inputs.documentHeight) return "Viewport height cannot exceed total document height.";
  if (inputs.currentScroll > inputs.documentHeight) return "Scroll position exceeds page length.";
  if (inputs.currentScroll < 0) return "Scroll position cannot be negative.";
  return null;
}

export function calculateScrollDepth(inputs: ScrollDepthInputs): ScrollDepthResult {
  const warning = getWarning(inputs);
  const documentHeight = Math.max(1, inputs.documentHeight);
  const viewportHeight = Math.max(0, inputs.viewportHeight);
  const currentScroll = Math.max(0, inputs.currentScroll);

  const effectiveViewport = Math.max(0, viewportHeight - Math.max(0, inputs.stickyHeaderHeight));
  const effectiveDocument = Math.max(effectiveViewport, documentHeight - Math.max(0, inputs.footerHeight));
  const adjustedScroll = Math.max(0, currentScroll + inputs.offsetAdjustment);

  const pixelsViewed = adjustedScroll + effectiveViewport;
  const scrollDepthPct = Math.min(100, Math.max(0, (pixelsViewed / effectiveDocument) * 100));
  const pixelsRemaining = Math.max(0, effectiveDocument - pixelsViewed);
  const tier = getTier(scrollDepthPct);

  const formula = "Scroll Depth (%) = ((Current Scroll + Viewport Height) ÷ Document Height) × 100";
  const breakdown = `(${adjustedScroll.toFixed(0)} + ${effectiveViewport.toFixed(0)}) ÷ ${effectiveDocument.toFixed(0)} × 100 = ${scrollDepthPct.toFixed(2)}%`;

  return { scrollDepthPct, pixelsViewed, pixelsRemaining, effectiveViewport, effectiveDocument, tier, formula, breakdown, warning };
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

export function buildEmbedSnippet(): string {
  return `<script>
(function () {
  function getScrollDepth() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var viewport = window.innerHeight || doc.clientHeight;
    var docHeight = doc.scrollHeight;
    var pct = Math.min(100, Math.max(0, ((scrollTop + viewport) / docHeight) * 100));
    return Math.round(pct);
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      console.log("Scroll depth:", getScrollDepth() + "%");
      ticking = false;
    });
  }, { passive: true });
})();
</script>`;
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: ScrollDepthInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("documentHeight", String(inputs.documentHeight));
  url.searchParams.set("viewportHeight", String(inputs.viewportHeight));
  url.searchParams.set("currentScroll", String(inputs.currentScroll));
  url.searchParams.set("header", String(inputs.stickyHeaderHeight));
  url.searchParams.set("footer", String(inputs.footerHeight));
  url.searchParams.set("offset", String(inputs.offsetAdjustment));
  return url.toString();
}

export function parseShareParams(): Partial<ScrollDepthInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const documentHeight = p.get("documentHeight");
  if (!documentHeight) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  return {
    documentHeight: num("documentHeight", 5000),
    viewportHeight: num("viewportHeight", 900),
    currentScroll: num("currentScroll", 0),
    stickyHeaderHeight: num("header", 0),
    footerHeight: num("footer", 0),
    offsetAdjustment: num("offset", 0),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "scroll-depth-calculator-history";

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

export function buildTextReport(result: ScrollDepthResult, inputs: ScrollDepthInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Scroll Depth Report",
    "====================",
    `Generated: ${ts}`,
    "",
    `Document Height: ${formatFull(inputs.documentHeight)} px`,
    `Viewport Height: ${formatFull(inputs.viewportHeight)} px`,
    `Scroll Position: ${formatFull(inputs.currentScroll)} px`,
    `Scroll Depth: ${result.scrollDepthPct.toFixed(2)}%`,
    `Pixels Viewed: ${formatFull(result.pixelsViewed)} px`,
    `Remaining: ${formatFull(result.pixelsRemaining)} px`,
    `Engagement Level: ${result.tier.label}`,
    "",
    `Formula: ${result.formula}`,
    `Calculation: ${result.breakdown}`,
    "",
    result.tier.explanation,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: ScrollDepthResult, inputs: ScrollDepthInputs): string {
  const rows: (string | number)[][] = [
    ["Scroll Depth Calculator Report", new Date().toISOString()],
    [],
    ["Metric", "Value"],
    ["Document Height (px)", inputs.documentHeight],
    ["Viewport Height (px)", inputs.viewportHeight],
    ["Scroll Position (px)", inputs.currentScroll],
    ["Scroll Depth (%)", result.scrollDepthPct.toFixed(2)],
    ["Pixels Viewed", result.pixelsViewed.toFixed(0)],
    ["Pixels Remaining", result.pixelsRemaining.toFixed(0)],
    ["Engagement Level", result.tier.label],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ScrollDepthResult, inputs: ScrollDepthInputs): string {
  return JSON.stringify(
    {
      inputs: {
        documentHeight: inputs.documentHeight,
        viewportHeight: inputs.viewportHeight,
        currentScroll: inputs.currentScroll,
      },
      results: {
        scrollDepthPct: parseFloat(result.scrollDepthPct.toFixed(2)),
        pixelsViewed: Math.round(result.pixelsViewed),
        pixelsRemaining: Math.round(result.pixelsRemaining),
        engagementLevel: result.tier.label,
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ScrollDepthResult, inputs: ScrollDepthInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Scroll Depth Report</title>
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
    <h1>Scroll Depth Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Summary</h2>
    <table>
      <tr><td>Document Height</td><td>${formatFull(inputs.documentHeight)} px</td></tr>
      <tr><td>Viewport Height</td><td>${formatFull(inputs.viewportHeight)} px</td></tr>
      <tr><td>Scroll Position</td><td>${formatFull(inputs.currentScroll)} px</td></tr>
      <tr><td>Scroll Depth</td><td><strong>${result.scrollDepthPct.toFixed(2)}%</strong></td></tr>
      <tr><td>Pixels Viewed</td><td>${formatFull(result.pixelsViewed)} px</td></tr>
      <tr><td>Remaining</td><td>${formatFull(result.pixelsRemaining)} px</td></tr>
      <tr><td>Engagement Level</td><td>${result.tier.label}</td></tr>
    </table>
    <h2>Formula</h2>
    <table>
      <tr><td>Formula</td><td>${result.formula}</td></tr>
      <tr><td>Calculation</td><td>${result.breakdown}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: ScrollDepthInputs = {
  mode: "manual",
  documentHeight: 5000,
  viewportHeight: 900,
  currentScroll: 0,
  stickyHeaderHeight: 0,
  footerHeight: 0,
  offsetAdjustment: 0,
};
