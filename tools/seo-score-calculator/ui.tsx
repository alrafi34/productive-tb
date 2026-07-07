"use client";

import { useState, useEffect, useCallback } from "react";
import {
  calculateSEOScore, validateInputs, debounce, SAMPLE_INPUTS,
  type SEOInputs, type SEOResult, type CheckResult, type LoadSpeed, type RobotsMeta,
} from "./logic";
import SEOScoreCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: SEOInputs = {
  title: "", metaDescription: "", targetKeyword: "", url: "", h1: "",
  wordCount: "", totalImages: "", imagesWithAlt: "", internalLinks: "", externalLinks: "", keywordCount: "",
  loadSpeed: "fast", https: true, mobileFriendly: true, canonical: false, robotsMeta: "index",
};

const HEALTH_STYLES: Record<SEOResult["healthLevel"], { bg: string; text: string; border: string; ring: string }> = {
  excellent: { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  ring: "text-green-500"  },
  good:      { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   ring: "text-blue-500"   },
  average:   { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", ring: "text-yellow-500" },
  poor:      { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", ring: "text-orange-400" },
  critical:  { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    ring: "text-red-500"    },
};

const STATUS_ICON: Record<CheckResult["status"], string> = {
  pass: "✓", warn: "⚠", fail: "✗",
};
const STATUS_COLOR: Record<CheckResult["status"], string> = {
  pass: "text-green-600", warn: "text-yellow-600", fail: "text-red-500",
};

export default function SEOScoreCalculatorUI() {
  const [inputs, setInputs]       = useState<SEOInputs>(DEFAULT_INPUTS);
  const [result, setResult]       = useState<SEOResult | null>(null);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [copied, setCopied]       = useState(false);

  const set = (field: keyof SEOInputs, value: string | boolean) =>
    setInputs((prev) => ({ ...prev, [field]: value }));

  const run = useCallback(
    debounce((inp: SEOInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      const hasAnyInput = inp.title || inp.metaDescription || inp.wordCount || inp.h1;
      if (!hasAnyInput) { setResult(null); return; }
      setResult(calculateSEOScore(inp));
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); setErrors({}); };
  const handleSample = () => { setInputs(SAMPLE_INPUTS); };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.reportText);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result.reportText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "seo-score-report.txt";
    a.click(); URL.revokeObjectURL(a.href);
  };

  // Input field helpers
  const inputCls = (err?: string) =>
    `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${err ? "border-red-300" : "border-gray-200"}`;

  const Toggle = ({ id, label, value, onChange }: { id: string; label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button id={id} role="switch" aria-checked={value} onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${value ? "bg-primary" : "bg-gray-200"}`}>
        <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </label>
  );

  const scoreColor = result
    ? result.totalScore >= 80 ? "text-green-600" : result.totalScore >= 55 ? "text-yellow-600" : "text-red-500"
    : "text-gray-300";

  const visibleChecks = result?.checks.filter((c) => c.maxPoints > 0) ?? [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">📊</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              SEO Score Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter your page details to get an instant on-page SEO score with actionable recommendations. All analysis runs locally — nothing leaves your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Content inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Content</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-title">Page Title</label>
                <input id="seo-title" type="text" value={inputs.title} onChange={(e) => set("title", e.target.value)}
                  className={inputCls()} placeholder="Best SEO Tips for Beginners" maxLength={120} />
                <p className="text-xs text-gray-400 mt-1">{inputs.title.length} chars · ideal: 50–60</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-meta">Meta Description</label>
                <textarea id="seo-meta" value={inputs.metaDescription} onChange={(e) => set("metaDescription", e.target.value)}
                  rows={3} className={inputCls() + " resize-none"} placeholder="Learn practical SEO tips to improve rankings..." maxLength={250} />
                <p className="text-xs text-gray-400 mt-1">{inputs.metaDescription.length} chars · ideal: 140–160</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-kw">Target Keyword</label>
                <input id="seo-kw" type="text" value={inputs.targetKeyword} onChange={(e) => set("targetKeyword", e.target.value)}
                  className={inputCls()} placeholder="seo tips" />
                <p className="text-xs text-gray-400 mt-1">Primary keyword you're optimizing for</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-h1">H1 Heading</label>
                <input id="seo-h1" type="text" value={inputs.h1} onChange={(e) => set("h1", e.target.value)}
                  className={inputCls()} placeholder="SEO Tips for Beginners" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-url">Page URL</label>
                <input id="seo-url" type="url" value={inputs.url} onChange={(e) => set("url", e.target.value)}
                  className={inputCls()} placeholder="https://example.com/seo-tips" inputMode="url" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-words">Word Count</label>
                  <input id="seo-words" type="number" min="0" value={inputs.wordCount} onChange={(e) => set("wordCount", e.target.value)}
                    className={inputCls()} placeholder="1800" inputMode="numeric" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-kwcount">Keyword Count</label>
                  <input id="seo-kwcount" type="number" min="0" value={inputs.keywordCount} onChange={(e) => set("keywordCount", e.target.value)}
                    className={inputCls(errors.keywordCount)} placeholder="14" inputMode="numeric" />
                  {errors.keywordCount && <p className="text-xs text-red-600 mt-1">{errors.keywordCount}</p>}
                </div>
              </div>
            </div>

            {/* Images & Links */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Images &amp; Links</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-imgs">Total Images</label>
                  <input id="seo-imgs" type="number" min="0" value={inputs.totalImages} onChange={(e) => set("totalImages", e.target.value)}
                    className={inputCls()} placeholder="8" inputMode="numeric" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-alt">Images w/ ALT</label>
                  <input id="seo-alt" type="number" min="0" value={inputs.imagesWithAlt} onChange={(e) => set("imagesWithAlt", e.target.value)}
                    className={inputCls(errors.imagesWithAlt)} placeholder="8" inputMode="numeric" />
                  {errors.imagesWithAlt && <p className="text-xs text-red-600 mt-1">{errors.imagesWithAlt}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-int">Internal Links</label>
                  <input id="seo-int" type="number" min="0" value={inputs.internalLinks} onChange={(e) => set("internalLinks", e.target.value)}
                    className={inputCls()} placeholder="7" inputMode="numeric" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-ext">External Links</label>
                  <input id="seo-ext" type="number" min="0" value={inputs.externalLinks} onChange={(e) => set("externalLinks", e.target.value)}
                    className={inputCls()} placeholder="4" inputMode="numeric" />
                </div>
              </div>
            </div>

            {/* Technical */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Technical SEO</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-speed">Page Load Speed</label>
                <select id="seo-speed" value={inputs.loadSpeed} onChange={(e) => set("loadSpeed", e.target.value as LoadSpeed)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  <option value="fast">Fast (≤ 2s)</option>
                  <option value="average">Average (2–5s)</option>
                  <option value="slow">Slow (5s+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="seo-robots">Robots Meta</label>
                <select id="seo-robots" value={inputs.robotsMeta} onChange={(e) => set("robotsMeta", e.target.value as RobotsMeta)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  <option value="index">Index (visible to search engines)</option>
                  <option value="noindex">Noindex (hidden from search engines)</option>
                </select>
              </div>

              <div className="space-y-3 pt-1">
                <Toggle id="seo-https"  label="HTTPS Enabled"   value={inputs.https}          onChange={(v) => set("https", v)} />
                <Toggle id="seo-mobile" label="Mobile Friendly"  value={inputs.mobileFriendly} onChange={(v) => set("mobileFriendly", v)} />
                <Toggle id="seo-canon"  label="Canonical Tag"    value={inputs.canonical}      onChange={(v) => set("canonical", v)} />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <button onClick={handleSample}
                className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors">
                Load Sample Data
              </button>
              <button onClick={handleReset}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                Reset All Fields
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleCopyReport} disabled={!result}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "Copy Report"}
                </button>
                <button onClick={handleDownloadTxt} disabled={!result}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Download TXT
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: score + results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Empty state */}
            {!result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="text-5xl mb-3">📊</div>
                <p className="text-gray-500 text-sm mb-4">Fill in your page details to calculate your SEO score</p>
                <button onClick={handleSample}
                  className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
                  Try with Sample Data
                </button>
              </div>
            )}

            {result && (
              <>
                {/* Score Card */}
                <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1">Overall SEO Score</p>
                      <div className="flex items-end gap-3">
                        <span className="text-6xl font-bold font-mono tabular-nums">{result.totalScore}</span>
                        <span className="text-2xl text-primary-200 mb-1">/100</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-3xl font-bold">{result.grade}</span>
                        {(() => {
                          const s = HEALTH_STYLES[result.healthLevel];
                          return (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text} ${s.border} border`}>
                              {result.healthLabel}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    {/* Circular indicator */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="white" strokeWidth="3"
                          strokeDasharray={`${result.totalScore} 100`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{result.totalScore}%</span>
                      </div>
                    </div>
                  </div>
                  {/* Stats row */}
                  <div className="border-t border-white/20 pt-4 grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <div className="text-xl font-bold text-green-200">{result.passCount}</div>
                      <div className="text-primary-100 text-xs">Passed</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-yellow-200">{result.warnCount}</div>
                      <div className="text-primary-100 text-xs">Warnings</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-red-200">{result.failCount}</div>
                      <div className="text-primary-100 text-xs">Failed</div>
                    </div>
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                      Category Breakdown
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {visibleChecks.map((check) => (
                      <div key={check.id} className="px-5 py-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${STATUS_COLOR[check.status]}`}>{STATUS_ICON[check.status]}</span>
                            <span className="text-sm font-medium text-gray-800">{check.label}</span>
                          </div>
                          <span className="text-xs font-mono font-semibold text-gray-500">{check.points}/{check.maxPoints}</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${check.status === "pass" ? "bg-green-500" : check.status === "warn" ? "bg-yellow-400" : "bg-red-400"}`}
                            style={{ width: `${(check.points / check.maxPoints) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">{check.message}</p>
                        {check.status !== "pass" && (
                          <p className="text-xs text-primary mt-0.5">💡 {check.tip}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick wins / recommendations */}
                {(result.failCount > 0 || result.warnCount > 0) && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                        Recommendations
                      </h3>
                    </div>
                    <div className="p-5 space-y-3">
                      {visibleChecks
                        .filter((c) => c.status === "fail")
                        .map((c) => (
                          <div key={c.id} className="flex items-start gap-2.5">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-red-100 text-red-500 text-xs flex items-center justify-center mt-0.5 font-bold">✗</span>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{c.label}</p>
                              <p className="text-xs text-gray-500">{c.tip}</p>
                            </div>
                          </div>
                        ))}
                      {visibleChecks
                        .filter((c) => c.status === "warn")
                        .map((c) => (
                          <div key={c.id} className="flex items-start gap-2.5">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-100 text-yellow-600 text-xs flex items-center justify-center mt-0.5 font-bold">⚠</span>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{c.label}</p>
                              <p className="text-xs text-gray-500">{c.tip}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <SEOScoreCalculatorSEO />

      <RelatedTools
        currentTool="seo-score-calculator"
        tools={[
          "keyword-density-checker",
          "ctr-calculator",
          "conversion-rate-calculator",
          "cost-per-click-cpc-calculator",
          "bounce-rate-calculator",
          "roi-calculator-marketing",
        ]}
      />
    </>
  );
}
