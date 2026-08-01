"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateDifficulty, debounce, parseNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  SERP_FEATURES, PRESETS, DEFAULT_INPUTS,
  type SearchIntent, type BrandDominance, type SerpFeature,
  type DifficultyInputs, type DifficultyResult, type HistoryEntry,
} from "./logic";
import DifficultyGauge, { exportGaugeAsPng } from "./gauge";
import KeywordDifficultyEstimatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const INTENT_OPTIONS: { value: SearchIntent; label: string }[] = [
  { value: "informational", label: "Informational" },
  { value: "commercial", label: "Commercial" },
  { value: "transactional", label: "Transactional" },
  { value: "navigational", label: "Navigational" },
];

const BRAND_OPTIONS: { value: BrandDominance; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function KeywordDifficultyEstimatorUI() {
  const [inputs, setInputs] = useState<DifficultyInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<DifficultyResult>(calculateDifficulty(DEFAULT_INPUTS));
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: DifficultyInputs; result: DifficultyResult } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: DifficultyInputs; result: DifficultyResult } | null>(null);
  const keywordRef = useRef<HTMLInputElement>(null);
  const gaugeWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else keywordRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: DifficultyInputs) => { setResult(calculateDifficulty(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof DifficultyInputs>(field: K, val: DifficultyInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const toggleSerp = (key: SerpFeature) => {
    setInputs((p) => ({
      ...p,
      serpFeatures: p.serpFeatures.includes(key) ? p.serpFeatures.filter((k) => k !== key) : [...p.serpFeatures, key],
    }));
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setInputs({
      keyword: preset.keyword,
      domainAuthority: preset.domainAuthority,
      referringDomains: preset.referringDomains,
      searchVolume: preset.searchVolume,
      contentLength: preset.contentLength,
      intent: preset.intent,
      brand: preset.brand,
      serpFeatures: preset.serpFeatures,
      exactMatchDomain: preset.exactMatchDomain,
      userAuthority: inputs.userAuthority,
    });
    keywordRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    keywordRef.current?.focus();
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `keyword-difficulty-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadPng = () => {
    exportGaugeAsPng(gaugeWrapRef.current, `keyword-difficulty-gauge-${Date.now()}.png`);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, inputs));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(inputs));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const toggleUserAuthority = () => {
    set("userAuthority", inputs.userAuthority === null ? 50 : null);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>Quick Preset Examples</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button key={p.label} onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${inputs.keyword === p.keyword ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            This is an estimated difficulty score based on a transparent client-side model — not an official score from Ahrefs, Semrush, or Moz.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Keyword Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kde-keyword">Keyword</label>
                <input
                  ref={keywordRef}
                  id="kde-keyword" type="text" maxLength={150}
                  value={inputs.keyword}
                  onChange={(e) => set("keyword", e.target.value)}
                  placeholder="best running shoes"
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                {!inputs.keyword.trim() && <p className="text-xs text-orange-500 mt-1">Enter a keyword to label this analysis.</p>}
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>SEO Metrics (Top 10 Average)</h3>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-700" htmlFor="kde-da">Average Domain Authority</label>
                    <span className="text-sm font-semibold font-mono text-primary tabular-nums">{inputs.domainAuthority}</span>
                  </div>
                  <input id="kde-da" type="range" min="0" max="100" value={inputs.domainAuthority}
                    onChange={(e) => set("domainAuthority", parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kde-rd">Average Referring Domains</label>
                  <input id="kde-rd" type="number" min="0" max="100000" inputMode="numeric"
                    value={inputs.referringDomains || ""}
                    onChange={(e) => set("referringDomains", parseNum(e.target.value))}
                    placeholder="100"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kde-vol">Average Monthly Search Volume</label>
                  <input id="kde-vol" type="number" min="0" inputMode="numeric"
                    value={inputs.searchVolume || ""}
                    onChange={(e) => set("searchVolume", parseNum(e.target.value))}
                    placeholder="1000"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kde-content">Average Content Length (words)</label>
                  <input id="kde-content" type="number" min="0" inputMode="numeric"
                    value={inputs.contentLength || ""}
                    onChange={(e) => set("contentLength", parseNum(e.target.value))}
                    placeholder="1500"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kde-intent">Search Intent</label>
                  <select id="kde-intent" value={inputs.intent} onChange={(e) => set("intent", e.target.value as SearchIntent)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {INTENT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>SERP Features Present</h3>
                <div className="grid grid-cols-2 gap-2">
                  {SERP_FEATURES.map((f) => (
                    <label key={f.key} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" checked={inputs.serpFeatures.includes(f.key)} onChange={() => toggleSerp(f.key)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Additional Factors</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="kde-brand">Brand Dominance</label>
                    <select id="kde-brand" value={inputs.brand} onChange={(e) => set("brand", e.target.value as BrandDominance)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                      {BRAND_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="kde-emd">Exact Match Domains</label>
                    <select id="kde-emd" value={inputs.exactMatchDomain ? "yes" : "no"} onChange={(e) => set("exactMatchDomain", e.target.value === "yes")}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Your Website Authority</p>
                    <p className="text-xs text-gray-400">Optional — compares against top-10 average</p>
                  </div>
                  <button type="button" role="switch" aria-checked={inputs.userAuthority !== null}
                    onClick={toggleUserAuthority}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.userAuthority !== null ? "bg-primary" : "bg-gray-200"}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${inputs.userAuthority !== null ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
                {inputs.userAuthority !== null && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">Website Authority</span>
                      <span className="text-sm font-semibold font-mono text-primary tabular-nums">{inputs.userAuthority}</span>
                    </div>
                    <input type="range" min="0" max="100" value={inputs.userAuthority}
                      onChange={(e) => set("userAuthority", parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopySummary} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    {copied ? "✓ Copied!" : "Copy Results"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setSnapA({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as A</button>
                  <button onClick={() => setSnapB({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as B</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export JSON</button>
                  <button onClick={handleDownloadPng} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export PNG</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
                  <button onClick={handleShare} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                </div>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {inputs.keyword ? `"${inputs.keyword}"` : "Keyword Difficulty"}
              </p>
              <div className="flex items-center gap-4 mb-3">
                <p className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{result.score}</p>
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${result.level.bg} ${result.level.color} border-transparent`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${result.level.dot}`} />
                    {result.level.label}
                  </span>
                  <p className="text-primary-100 text-xs mt-1">out of 100</p>
                </div>
              </div>
              <p className="text-sm text-primary-100 mb-4 leading-relaxed">{result.level.recommendation}</p>
              <div className="space-y-2">
                <button onClick={handleCopySummary} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {/* Gauge */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center">
              <h3 className="font-semibold text-gray-800 text-sm self-start mb-3" style={{ fontFamily: "var(--font-heading)" }}>Difficulty Gauge</h3>
              <div ref={gaugeWrapRef}>
                <DifficultyGauge score={result.score} color={result.level.gaugeColor} />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-gray-500">
                {[
                  ["Very Easy", "bg-green-500"], ["Easy", "bg-green-500"], ["Medium", "bg-yellow-500"], ["Hard", "bg-orange-500"], ["Very Hard", "bg-red-500"],
                ].map(([label, dot]) => (
                  <span key={label} className="flex items-center gap-1"><span className={`w-2 h-2 rounded-full inline-block ${dot}`} />{label}</span>
                ))}
              </div>
            </div>

            {/* Score breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Score Breakdown</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {result.breakdown.map((row) => (
                  <div key={row.factor} className="px-5 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{row.factor} <span className="text-xs text-gray-400">({(row.weight * 100).toFixed(0)}% weight)</span></span>
                      <span className="text-sm font-semibold font-mono text-gray-800">{row.rawScore.toFixed(1)} → +{row.contribution.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-primary transition-all duration-500" style={{ width: `${row.rawScore}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">Contribution = raw factor score (0–100) × its weight. The sum of all contributions is the final difficulty score.</p>
            </div>

            {/* Tips */}
            {result.tips.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Optimization Tips</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ranking opportunity */}
            {result.rankingOpportunity && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Your Ranking Opportunity</p>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${result.rankingOpportunity.bg} ${result.rankingOpportunity.color} border-transparent`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${result.rankingOpportunity.dot}`} />
                  {result.rankingOpportunity.label}
                </span>
                <p className="text-sm text-gray-600 mt-2">
                  Your website authority ({inputs.userAuthority}) compared to the top-10 average ({inputs.domainAuthority}) for this keyword.
                </p>
              </div>
            )}

            {/* Compare keywords */}
            {(snapA || snapB) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare Keywords</h3>
                  <button onClick={() => { setSnapA(null); setSnapB(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {([["A", snapA], ["B", snapB]] as const).map(([label, s]) => (
                    <div key={label} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{label}: {s ? (s.inputs.keyword || "Untitled Keyword") : "— not set —"}</span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? `${s.result.score}/100` : ""}</span>
                      </div>
                      {s && (
                        <>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`} style={{ width: `${s.result.score}%` }} />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{s.result.level.label}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {snapA && snapB && (
                  <p className="text-xs text-gray-500 px-5 py-3 border-t border-gray-50">
                    {snapB.result.score > snapA.result.score
                      ? `"${snapA.inputs.keyword || "A"}" is easier to rank for than "${snapB.inputs.keyword || "B"}" by ${snapB.result.score - snapA.result.score} points.`
                      : snapA.result.score > snapB.result.score
                        ? `"${snapB.inputs.keyword || "B"}" is easier to rank for than "${snapA.inputs.keyword || "A"}" by ${snapA.result.score - snapB.result.score} points.`
                        : "Both keywords have equal estimated difficulty."}
                  </p>
                )}
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved analyses yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => { setInputs(entry.inputs); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.inputs.keyword || "Untitled Keyword"}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.score}/100 · {entry.result.level.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <KeywordDifficultyEstimatorSEO />

      <RelatedTools
        currentTool="keyword-difficulty-estimator"
        tools={[
          "seo-score-calculator",
          "domain-authority-estimator",
          "backlink-ratio-calculator",
          "keyword-density-calculator-seo",
          "serp-ctr-estimator",
          "organic-vs-paid-ratio-calculator",
        ]}
      />
    </>
  );
}
