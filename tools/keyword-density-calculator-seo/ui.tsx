"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  analyzeContent, entriesToCsv, buildFullReport, formatTime, debounce,
  type AnalysisResult, type KeywordEntry, type NGramMode, type SortMode,
} from "./logic";
import KeywordDensityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const SAMPLE_TEXT = `SEO is a critical part of any digital marketing strategy. Good SEO helps websites rank higher in search engine results pages. Content marketing and SEO work together to improve visibility. When you write content with SEO in mind, you naturally include keywords that your audience is searching for. SEO techniques include on-page optimization, link building, and technical SEO. Every digital marketer should understand how SEO affects organic traffic growth.`;

export default function KeywordDensityCalculatorUI() {
  const [text, setText]                     = useState("");
  const [searchKw, setSearchKw]             = useState("");
  const [minLength, setMinLength]           = useState(3);
  const [ignoreStops, setIgnoreStops]       = useState(true);
  const [caseSensitive, setCaseSensitive]   = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [ngramMode, setNgramMode]           = useState<NGramMode>("single");
  const [sortMode, setSortMode]             = useState<SortMode>("frequency");
  const [result, setResult]                 = useState<AnalysisResult | null>(null);
  const [copied, setCopied]                 = useState(false);
  const [activeTab, setActiveTab]           = useState<"single" | "bigram" | "trigram">("single");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const run = useCallback(
    debounce((t: string, kw: string, ml: number, is: boolean, cs: boolean, inc: boolean, ng: NGramMode, sm: SortMode) => {
      setResult(analyzeContent(t, {
        caseSensitive: cs, includeNumbers: inc, minLength: ml,
        ignoreStopWords: is, ngramMode: ng, sortMode: sm, searchKeyword: kw,
      }));
    }, 200),
    []
  );

  useEffect(() => {
    run(text, searchKw, minLength, ignoreStops, caseSensitive, includeNumbers, ngramMode, sortMode);
  }, [text, searchKw, minLength, ignoreStops, caseSensitive, includeNumbers, ngramMode, sortMode, run]);

  const handleClear = () => { setText(""); setSearchKw(""); setResult(null); textRef.current?.focus(); };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildFullReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const csv = entriesToCsv(result.singles, "Keyword");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "keyword-density-report.csv";
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildFullReport(result)], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "keyword-density-report.txt";
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const data = {
      stats: result.stats,
      keywords: result.singles.slice(0, 50),
      bigrams:  result.bigrams.slice(0, 20),
      trigrams: result.trigrams.slice(0, 10),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "keyword-density-report.json";
    a.click(); URL.revokeObjectURL(a.href);
  };

  const activeEntries: KeywordEntry[] =
    result
      ? activeTab === "single"  ? result.singles
      : activeTab === "bigram"  ? result.bigrams
      : result.trigrams
      : [];

  const DensityBar = ({ pct }: { pct: number }) => {
    const width = Math.min(pct * 10, 100); // scale: 10% density → full bar
    const color = pct > 5 ? "bg-red-400" : pct > 2.5 ? "bg-yellow-400" : "bg-primary";
    return (
      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-0.5">
        <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${width}%` }} />
      </div>
    );
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🔍</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Keyword Density Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Paste your content to instantly analyze keyword density, word frequency, phrase analysis, and reading time. Everything runs locally — your text never leaves your browser.
            </p>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left column: textarea + options ── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Textarea */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Your Content
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  {text.length.toLocaleString("en-US")} chars
                </span>
              </div>
              <textarea
                ref={textRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-y font-body leading-relaxed"
                placeholder="Paste your article, blog post, landing page, or any content here..."
                aria-label="Content to analyze"
              />
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => { setText(SAMPLE_TEXT); textRef.current?.focus(); }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                  Load Sample
                </button>
                <button onClick={handleClear} disabled={!text}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Clear
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Analysis Options
              </h3>

              {/* Keyword search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kd-search">
                  Search Keyword / Phrase
                </label>
                <input id="kd-search" type="text" value={searchKw}
                  onChange={(e) => setSearchKw(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="e.g. seo strategy" />
                <p className="text-xs text-gray-400 mt-1">Find a specific keyword or phrase instantly</p>
              </div>

              {/* Min word length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kd-minlen">
                  Minimum Word Length
                </label>
                <select id="kd-minlen" value={minLength} onChange={(e) => setMinLength(Number(e.target.value))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+ characters</option>)}
                </select>
              </div>

              {/* Sort mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="kd-sort">
                  Sort Results By
                </label>
                <select id="kd-sort" value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  <option value="frequency">Highest Frequency</option>
                  <option value="density">Highest Density</option>
                  <option value="alpha">Alphabetical</option>
                  <option value="occurrence">First Occurrence</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2.5">
                {[
                  { id: "kd-stops",   label: "Ignore stop words (the, a, is…)", value: ignoreStops,     set: setIgnoreStops     },
                  { id: "kd-case",    label: "Case-sensitive analysis",          value: caseSensitive,   set: setCaseSensitive   },
                  { id: "kd-nums",    label: "Include numbers",                  value: includeNumbers,  set: setIncludeNumbers  },
                ].map(({ id, label, value, set }) => (
                  <label key={id} htmlFor={id} className="flex items-center gap-2.5 cursor-pointer">
                    <input id={id} type="checkbox" checked={value} onChange={(e) => set(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>

              {/* Export buttons */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <button onClick={handleCopyReport} disabled={!result}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "Copy Report"}
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleDownloadTxt} disabled={!result}
                    className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    TXT
                  </button>
                  <button onClick={handleDownloadCsv} disabled={!result}
                    className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    CSV
                  </button>
                  <button onClick={handleDownloadJson} disabled={!result}
                    className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    JSON
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Empty state */}
            {!result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500 text-sm">Paste content on the left to start analyzing</p>
                <button onClick={() => { setText(SAMPLE_TEXT); textRef.current?.focus(); }}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
                  Try with Sample Text
                </button>
              </div>
            )}

            {result && (
              <>
                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-1">
                    {result.warnings.map((w, i) => (
                      <p key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0">⚠️</span>{w}
                      </p>
                    ))}
                  </div>
                )}

                {/* Keyword search result */}
                {searchKw.trim() && (
                  <div className={`rounded-xl border p-5 ${result.searchResult ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-gray-50 border-gray-200"}`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${result.searchResult ? "text-primary-100" : "text-gray-500"}`}>
                      Keyword Search: &quot;{searchKw}&quot;
                    </p>
                    {result.searchResult ? (
                      <>
                        <div className="text-3xl font-bold font-mono tabular-nums mb-0.5">{result.searchResult.densityFormatted}</div>
                        <div className="text-sm text-primary-100">density · found {result.searchResult.count}× in {result.stats.totalWords.toLocaleString("en-US")} words</div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">Keyword not found in the content.</p>
                    )}
                  </div>
                )}

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Total Words",    value: result.stats.totalWords.toLocaleString("en-US") },
                    { label: "Unique Words",   value: result.stats.uniqueWords.toLocaleString("en-US") },
                    { label: "Characters",     value: result.stats.characters.toLocaleString("en-US") },
                    { label: "Reading Time",   value: formatTime(result.stats.readingTimeMin) },
                    { label: "Sentences",      value: result.stats.sentences.toLocaleString("en-US") },
                    { label: "Paragraphs",     value: result.stats.paragraphs.toLocaleString("en-US") },
                    { label: "Avg Word Len",   value: result.stats.avgWordLength.toFixed(1) + " chars" },
                    { label: "Speaking Time",  value: formatTime(result.stats.speakingTimeMin) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{label}</p>
                      <p className="text-lg font-bold text-gray-900 font-mono tabular-nums">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Keyword table with tabs */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                      Keyword Frequency
                    </h3>
                    <div className="flex gap-1">
                      {(["single", "bigram", "trigram"] as const).map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
                            activeTab === tab ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}>
                          {tab === "single" ? "Single" : tab === "bigram" ? "2-Word" : "3-Word"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeEntries.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">
                      No{activeTab !== "single" ? ` ${activeTab === "bigram" ? "2-word" : "3-word"} phrase` : ""} results with current settings.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50/80 sticky top-0">
                          <tr className="border-b border-gray-100">
                            <th className="text-left py-2.5 px-4 font-semibold text-gray-600 text-xs w-10">#</th>
                            <th className="text-left py-2.5 px-4 font-semibold text-gray-600 text-xs">Keyword</th>
                            <th className="text-right py-2.5 px-4 font-semibold text-gray-600 text-xs w-16">Count</th>
                            <th className="text-right py-2.5 px-4 font-semibold text-gray-600 text-xs w-20">Density</th>
                            <th className="py-2.5 px-4 w-24 hidden sm:table-cell"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {activeEntries.slice(0, 50).map((entry) => (
                            <tr key={entry.word} className="hover:bg-gray-50 transition-colors">
                              <td className="py-2 px-4 text-gray-400 text-xs font-mono">{entry.rank}</td>
                              <td className="py-2 px-4 font-medium text-gray-900">{entry.word}</td>
                              <td className="py-2 px-4 text-right font-mono text-gray-700">{entry.count}</td>
                              <td className={`py-2 px-4 text-right font-mono font-semibold text-xs ${entry.density > 5 ? "text-red-500" : entry.density > 2.5 ? "text-yellow-600" : "text-primary"}`}>
                                {entry.densityFormatted}
                              </td>
                              <td className="py-2 px-4 hidden sm:table-cell">
                                <DensityBar pct={entry.density} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {activeEntries.length > 0 && (
                    <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">
                      Showing top {Math.min(activeEntries.length, 50)} of {activeEntries.length} results ·{" "}
                      <span className="text-red-400">red &gt; 5%</span> ·{" "}
                      <span className="text-yellow-600">yellow 2.5–5%</span> ·{" "}
                      <span className="text-primary">green &lt; 2.5%</span>
                    </p>
                  )}
                </div>

              </>
            )}
          </div>
        </div>
      </div>

      <KeywordDensityCalculatorSEO />

      <RelatedTools
        currentTool="keyword-density-calculator-seo"
        tools={[
          "ctr-calculator",
          "conversion-rate-calculator",
          "cost-per-click-cpc-calculator",
          "cost-per-acquisition-cpa-calculator",
          "bounce-rate-calculator",
          "roi-calculator-marketing",
        ]}
      />
    </>
  );
}
