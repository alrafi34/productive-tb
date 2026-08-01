"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  calculatePageRank, validateInputs, debounce, parseNum,
  saveHistory, getHistory, clearHistory, saveInputs, loadInputs,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  CATEGORY_META, CATEGORY_ORDER, EXAMPLES, DEFAULT_INPUTS, SCORE_COLOR,
  type PageRankInputs, type PageRankResult, type HistoryEntry,
  type Quality4, type Quality3, type KeywordUsage, type CoreWebVitals, type RobotsMeta, type StructuredData, type CategoryKey,
} from "./logic";
import { ScoreGauge, MiniGauge } from "./chart";
import PageRankEstimatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type SectionKey = "onpage" | "content" | "images" | "internal" | "technical" | "ux" | "authority";

const SECTION_LABELS: Record<SectionKey, { title: string; icon: string }> = {
  onpage: { title: "Basic SEO", icon: "🏷️" },
  content: { title: "Content Quality", icon: "📝" },
  images: { title: "Images", icon: "🖼️" },
  internal: { title: "Internal SEO", icon: "🔗" },
  technical: { title: "Technical SEO", icon: "⚙️" },
  ux: { title: "User Experience", icon: "👤" },
  authority: { title: "Authority", icon: "🏆" },
};

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-gray-700">{label}</span>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex-shrink-0 ${checked ? "bg-primary" : "bg-gray-200"}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

function Field({ label, tooltip, children }: { label: string; tooltip?: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" title={tooltip}>{label}</label>
      {children}
    </div>
  );
}

function CollapsibleSection({ id, title, icon, open, onToggle, children }: { id: SectionKey; title: string; icon: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`section-${id}`}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50/50 transition-colors">
        <span className="text-sm font-semibold text-gray-800 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
          <span>{icon}</span>{title}
        </span>
        <span className="text-xs text-gray-400">{open ? "Hide ▲" : "Show ▼"}</span>
      </button>
      {open && <div id={`section-${id}`} className="px-5 pb-5 pt-1 space-y-4 border-t border-gray-50">{children}</div>}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white";
const sliderCls = "w-full accent-primary";

export default function PageRankEstimatorUI() {
  const [inputs, setInputs] = useState<PageRankInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<PageRankResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    onpage: true, content: true, images: false, internal: false, technical: false, ux: false, authority: false,
  });
  const [expandedCategory, setExpandedCategory] = useState<CategoryKey | null>(null);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [csvCopied, setCsvCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const runRef = useRef(debounce((inp: PageRankInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculatePageRank(inp));
  }, 150));
  const persistRef = useRef(debounce((inp: PageRankInputs) => saveInputs(inp), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInputs();
    if (saved) setInputs(saved);
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(inputs); }, [inputs]);
  useEffect(() => { persistRef.current(inputs); }, [inputs]);

  const set = <K extends keyof PageRankInputs>(field: K, val: PageRankInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    titleRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadExample = () => {
    const ex = EXAMPLES[exampleIdx % EXAMPLES.length];
    setInputs(ex.inputs);
    setExampleIdx((i) => i + 1);
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopyScore = () => {
    if (!result) return;
    navigator.clipboard.writeText(`SEO Score: ${result.overallScore}/100 (Grade ${result.grade}) — Ranking Potential: ${result.rankingPotential}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTable = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildCSVReport(result));
    setCsvCopied(true); setTimeout(() => setCsvCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `page-rank-report-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `page-rank-report-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ label: `${result.overallScore}/100 · ${result.grade}`, inputs, result });
    setHistory(getHistory());
  };

  const toggleSection = (key: SectionKey) => setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  const compareEntry = compareId ? history.find((h) => h.id === compareId) ?? null : null;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
          <strong>Note:</strong> This tool estimates ranking <em>potential</em> using a weighted SEO best-practices model — it does not use or predict Google&apos;s actual ranking algorithm. Use it to identify strengths, weaknesses, and improvement opportunities.
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-2">
          <button onClick={handleLoadExample} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Load Example</button>
          <button onClick={handleReset} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
          <button onClick={() => setShowHistory(!showHistory)} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            {showHistory ? "Hide" : "Show"} History
          </button>
          <span className="text-xs text-gray-400 ml-auto">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-4">

            <CollapsibleSection id="onpage" title={SECTION_LABELS.onpage.title} icon={SECTION_LABELS.onpage.icon} open={openSections.onpage} onToggle={() => toggleSection("onpage")}>
              <Field label="Page Title Length (characters)" tooltip="Recommended: 50-60 characters">
                <input ref={titleRef} type="number" min={0} max={120} value={inputs.titleLength}
                  onChange={(e) => set("titleLength", parseNum(e.target.value))} className={inputCls} />
                {errors.titleLength ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.titleLength}</p> : <p className="text-xs text-gray-400 mt-1">Recommended: 50–60 characters.</p>}
              </Field>
              <Field label="Meta Description Length (characters)" tooltip="Recommended: 140-160 characters">
                <input type="number" min={0} max={320} value={inputs.metaDescriptionLength}
                  onChange={(e) => set("metaDescriptionLength", parseNum(e.target.value))} className={inputCls} />
                {errors.metaDescriptionLength ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.metaDescriptionLength}</p> : <p className="text-xs text-gray-400 mt-1">Recommended: 140–160 characters.</p>}
              </Field>
              <Toggle checked={inputs.keywordInTitle} onChange={(v) => set("keywordInTitle", v)} label="Primary Keyword in Title" />
              <Toggle checked={inputs.keywordInDescription} onChange={(v) => set("keywordInDescription", v)} label="Primary Keyword in Description" />
              <Toggle checked={inputs.keywordInH1} onChange={(v) => set("keywordInH1", v)} label="Primary Keyword in H1" />
              <Field label="URL Length (characters)">
                <input type="number" min={0} value={inputs.urlLength} onChange={(e) => set("urlLength", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Field label="URL Readability">
                <select value={inputs.urlReadability} onChange={(e) => set("urlReadability", e.target.value as Quality4)} className={inputCls}>
                  <option value="excellent">Excellent</option><option value="good">Good</option><option value="average">Average</option><option value="poor">Poor</option>
                </select>
              </Field>
            </CollapsibleSection>

            <CollapsibleSection id="content" title={SECTION_LABELS.content.title} icon={SECTION_LABELS.content.icon} open={openSections.content} onToggle={() => toggleSection("content")}>
              <Field label="Content Length (words)" tooltip="Content above ~1,500 words generally performs better for competitive topics">
                <input type="number" min={0} value={inputs.contentLength} onChange={(e) => set("contentLength", parseNum(e.target.value))} className={inputCls} />
                {errors.contentLength ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.contentLength}</p> : <p className="text-xs text-gray-400 mt-1">1,500+ words generally performs better for competitive topics.</p>}
              </Field>
              <Field label={`Content Originality — ${inputs.contentOriginality}`}>
                <input type="range" min={0} max={100} value={inputs.contentOriginality} onChange={(e) => set("contentOriginality", parseNum(e.target.value))} className={sliderCls} />
              </Field>
              <Field label={`Readability Score — ${inputs.readabilityScore}`}>
                <input type="range" min={0} max={100} value={inputs.readabilityScore} onChange={(e) => set("readabilityScore", parseNum(e.target.value))} className={sliderCls} />
              </Field>
              <Field label="Heading Structure">
                <select value={inputs.headingStructure} onChange={(e) => set("headingStructure", e.target.value as Quality4)} className={inputCls}>
                  <option value="excellent">Excellent</option><option value="good">Good</option><option value="average">Average</option><option value="poor">Poor</option>
                </select>
              </Field>
              <Field label="Keyword Usage">
                <select value={inputs.keywordUsage} onChange={(e) => set("keywordUsage", e.target.value as KeywordUsage)} className={inputCls}>
                  <option value="low">Low</option><option value="optimal">Optimal</option><option value="high">High (risk of stuffing)</option>
                </select>
              </Field>
            </CollapsibleSection>

            <CollapsibleSection id="images" title={SECTION_LABELS.images.title} icon={SECTION_LABELS.images.icon} open={openSections.images} onToggle={() => toggleSection("images")}>
              <Field label="Number of Images">
                <input type="number" min={0} value={inputs.numImages} onChange={(e) => set("numImages", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Images with ALT Text">
                <input type="number" min={0} value={inputs.imagesWithAlt} onChange={(e) => set("imagesWithAlt", parseNum(e.target.value))} className={inputCls} />
                {errors.imagesWithAlt && <p className="text-xs text-red-600 mt-1" role="alert">{errors.imagesWithAlt}</p>}
              </Field>
              <Toggle checked={inputs.imageOptimization} onChange={(v) => set("imageOptimization", v)} label="Images Optimized / Compressed" />
            </CollapsibleSection>

            <CollapsibleSection id="internal" title={SECTION_LABELS.internal.title} icon={SECTION_LABELS.internal.icon} open={openSections.internal} onToggle={() => toggleSection("internal")}>
              <Field label="Internal Links">
                <input type="number" min={0} value={inputs.internalLinks} onChange={(e) => set("internalLinks", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Field label="External Links">
                <input type="number" min={0} value={inputs.externalLinks} onChange={(e) => set("externalLinks", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Broken Links">
                <input type="number" min={0} value={inputs.brokenLinks} onChange={(e) => set("brokenLinks", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Toggle checked={inputs.breadcrumbs} onChange={(v) => set("breadcrumbs", v)} label="Breadcrumbs" />
              <Toggle checked={inputs.tableOfContents} onChange={(v) => set("tableOfContents", v)} label="Table of Contents" />
            </CollapsibleSection>

            <CollapsibleSection id="technical" title={SECTION_LABELS.technical.title} icon={SECTION_LABELS.technical.icon} open={openSections.technical} onToggle={() => toggleSection("technical")}>
              <Toggle checked={inputs.https} onChange={(v) => set("https", v)} label="HTTPS Enabled" />
              <Toggle checked={inputs.mobileFriendly} onChange={(v) => set("mobileFriendly", v)} label="Mobile Friendly" />
              <Field label={`Page Speed — ${inputs.pageSpeed}`}>
                <input type="range" min={0} max={100} value={inputs.pageSpeed} onChange={(e) => set("pageSpeed", parseNum(e.target.value))} className={sliderCls} />
              </Field>
              <Field label="Core Web Vitals">
                <select value={inputs.coreWebVitals} onChange={(e) => set("coreWebVitals", e.target.value as CoreWebVitals)} className={inputCls}>
                  <option value="excellent">Excellent</option><option value="good">Good</option><option value="needs-improvement">Needs Improvement</option><option value="poor">Poor</option>
                </select>
              </Field>
              <Toggle checked={inputs.canonicalTag} onChange={(v) => set("canonicalTag", v)} label="Canonical Tag" />
              <Field label="Robots Meta">
                <select value={inputs.robotsMeta} onChange={(e) => set("robotsMeta", e.target.value as RobotsMeta)} className={inputCls}>
                  <option value="correct">Correct</option><option value="incorrect">Incorrect</option>
                </select>
              </Field>
              <Toggle checked={inputs.xmlSitemap} onChange={(v) => set("xmlSitemap", v)} label="XML Sitemap" />
              <Field label="Structured Data">
                <select value={inputs.structuredData} onChange={(e) => set("structuredData", e.target.value as StructuredData)} className={inputCls}>
                  <option value="none">None</option><option value="basic">Basic</option><option value="advanced">Advanced</option>
                </select>
              </Field>
            </CollapsibleSection>

            <CollapsibleSection id="ux" title={SECTION_LABELS.ux.title} icon={SECTION_LABELS.ux.icon} open={openSections.ux} onToggle={() => toggleSection("ux")}>
              <Field label={`Bounce Rate — ${inputs.bounceRate}%`}>
                <input type="range" min={0} max={100} value={inputs.bounceRate} onChange={(e) => set("bounceRate", parseNum(e.target.value))} className={sliderCls} />
              </Field>
              <Field label="Average Time on Page (minutes)">
                <input type="number" min={0} step={0.1} value={inputs.avgTimeOnPage} onChange={(e) => set("avgTimeOnPage", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Field label={`CTR Estimate — ${inputs.ctrEstimate}%`}>
                <input type="range" min={0} max={100} value={inputs.ctrEstimate} onChange={(e) => set("ctrEstimate", parseNum(e.target.value))} className={sliderCls} />
              </Field>
              <Field label="Navigation Quality">
                <select value={inputs.navigationQuality} onChange={(e) => set("navigationQuality", e.target.value as Quality4)} className={inputCls}>
                  <option value="excellent">Excellent</option><option value="good">Good</option><option value="average">Average</option><option value="poor">Poor</option>
                </select>
              </Field>
            </CollapsibleSection>

            <CollapsibleSection id="authority" title={SECTION_LABELS.authority.title} icon={SECTION_LABELS.authority.icon} open={openSections.authority} onToggle={() => toggleSection("authority")}>
              <Field label="Estimated Backlinks">
                <input type="number" min={0} value={inputs.estimatedBacklinks} onChange={(e) => set("estimatedBacklinks", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Referring Domains">
                <input type="number" min={0} value={inputs.referringDomains} onChange={(e) => set("referringDomains", parseNum(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Brand Authority">
                <select value={inputs.brandAuthority} onChange={(e) => set("brandAuthority", e.target.value as Quality3)} className={inputCls}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                </select>
              </Field>
              <Field label="Domain Age (years)">
                <input type="number" min={0} step={0.1} value={inputs.domainAge} onChange={(e) => set("domainAge", parseNum(e.target.value))} className={inputCls} />
              </Field>
            </CollapsibleSection>
          </div>

          {/* ── Right: results ── */}
          <div ref={resultRef} className="lg:col-span-6 space-y-5">

            {/* Score dashboard */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              {result ? (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <ScoreGauge score={result.overallScore} label="/ 100" />
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Grade {result.grade}</span>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full border" style={{ color: SCORE_COLOR(result.overallScore), borderColor: SCORE_COLOR(result.overallScore), backgroundColor: `${SCORE_COLOR(result.overallScore)}10` }}>
                          {result.rankingPotential}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Estimated ranking potential based on {result.factors.length} weighted SEO signals across 7 categories.</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <button onClick={handleCopyScore} className="px-3.5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                          {copied ? "✓ Copied!" : "Copy Score"}
                        </button>
                        <button onClick={handleSave} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Save to History</button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5 pt-5 border-t border-gray-100">
                    <button onClick={handleCopyFull} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Copy Full Report</button>
                    <button onClick={handleDownloadCsv} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export CSV</button>
                    <button onClick={handleDownloadJson} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export JSON</button>
                    <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">
                  {Object.values(errors).some(Boolean) ? "Fix the errors in the input panel to calculate your score." : "Adjust the inputs on the left to see your estimated SEO score."}
                </p>
              )}
            </div>

            {/* Category breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Category Breakdown</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {result.categories.map((cat) => (
                    <div key={cat.category}>
                      <button type="button" onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left" aria-expanded={expandedCategory === cat.category}>
                        <MiniGauge score={cat.score} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-800">{cat.icon} {cat.label}</span>
                            <span className="text-xs text-gray-400">weight {cat.weight}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                            <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${cat.score}%`, backgroundColor: SCORE_COLOR(cat.score) }} />
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">{expandedCategory === cat.category ? "▲" : "▼"}</span>
                      </button>
                      {expandedCategory === cat.category && (
                        <div className="px-5 pb-4 pl-[4.25rem] space-y-2">
                          {cat.factors.map((f) => (
                            <div key={f.key} title={f.tooltip}>
                              <div className="flex items-center justify-between text-xs mb-0.5">
                                <span className="text-gray-600">{f.label}</span>
                                <span className="font-mono font-semibold" style={{ color: SCORE_COLOR(f.score) }}>{f.score}</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1">
                                <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${f.score}%`, backgroundColor: SCORE_COLOR(f.score) }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Weaknesses */}
            {result && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Strengths</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {result.strengths.length === 0 && <li className="text-gray-400 text-xs">No standout strengths identified yet.</li>}
                    {result.strengths.map((s) => (
                      <li key={s.key} className="flex items-start gap-2"><span className="text-green-500 flex-shrink-0">✓</span><span>{s.label} <span className="text-gray-400 text-xs">({s.score}/100)</span></span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Weaknesses</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {result.weaknesses.length === 0 && <li className="text-gray-400 text-xs">No critical weaknesses identified.</li>}
                    {result.weaknesses.map((w) => (
                      <li key={w.key} className="flex items-start gap-2"><span className="text-red-400 flex-shrink-0">✕</span><span>{w.label} <span className="text-gray-400 text-xs">({w.score}/100)</span></span></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Top Recommendations</h3>
                </div>
                <ol className="divide-y divide-gray-50">
                  {result.recommendations.length === 0 ? (
                    <li className="p-6 text-center text-gray-400 text-sm">No major issues found — great job!</li>
                  ) : result.recommendations.map((r, i) => (
                    <li key={r.key} className="px-5 py-3 flex items-start gap-3">
                      <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                      <span className="text-sm text-gray-700">{r.text} <span className="text-xs text-gray-400">({CATEGORY_META[r.category].label})</span></span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* History + Compare */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Report History</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); setCompareId(null); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved reports yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-3">
                      <button onClick={() => { setInputs(entry.inputs); setShowHistory(false); }} className="text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{entry.result.overallScore}/100 — Grade {entry.result.grade}</span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                        </div>
                        <div className="text-xs text-primary font-mono font-semibold">{entry.result.rankingPotential}</div>
                      </button>
                      <button onClick={() => setCompareId(compareId === entry.id ? null : entry.id)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex-shrink-0 ${compareId === entry.id ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                        {compareId === entry.id ? "Comparing" : "Compare"}
                      </button>
                    </div>
                  ))}
                </div>

                {compareEntry && result && (
                  <div className="p-5 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>Comparison: Current vs. Saved Report</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Overall Score</span>
                        <span className="font-mono font-semibold">{result.overallScore} <span className="text-gray-400">vs</span> {compareEntry.result.overallScore}</span>
                      </div>
                      {CATEGORY_ORDER.map((catKey) => {
                        const a = result.categories.find((c) => c.category === catKey)!;
                        const b = compareEntry.result.categories.find((c) => c.category === catKey)!;
                        return (
                          <div key={catKey}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600">{CATEGORY_META[catKey].label}</span>
                              <span className="font-mono">{a.score} <span className="text-gray-400">vs</span> {b.score}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${a.score}%` }} /></div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="h-1.5 rounded-full bg-blue-400" style={{ width: `${b.score}%` }} /></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {result && (
                  <div className="p-3 border-t border-gray-100">
                    <button onClick={handleCopyTable} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                      {csvCopied ? "✓ Copied!" : "Copy Factor Table as CSV"}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      <PageRankEstimatorSEO />

      <RelatedTools
        currentTool="page-rank-estimator"
        tools={[
          "seo-score-calculator",
          "serp-ctr-estimator",
          "domain-authority-estimator",
          "keyword-density-calculator-seo",
          "backlink-ratio-calculator",
          "traffic-growth-calculator",
        ]}
      />
    </>
  );
}
