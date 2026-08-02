"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateCacheEfficiency, debounce, formatPercent, formatNum, getSummaryText,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  SAMPLE_DATASETS, DEFAULT_HITS, DEFAULT_MISSES,
  type CacheResult, type HistoryEntry,
} from "./logic";
import CacheEfficiencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CacheEfficiencyCalculatorUI() {
  const [useTotalMode, setUseTotalMode] = useState(false);
  const [hits, setHits] = useState(String(DEFAULT_HITS));
  const [misses, setMisses] = useState(String(DEFAULT_MISSES));
  const [totalRequests, setTotalRequests] = useState(String(DEFAULT_HITS + DEFAULT_MISSES));

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [result, setResult] = useState<CacheResult>(() => calculateCacheEfficiency(DEFAULT_HITS, DEFAULT_MISSES));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setHits(String(shared.hits));
      setMisses(String(shared.misses));
    } else {
      firstInputRef.current?.focus();
    }
  }, []);

  const compute = useCallback(
    debounce((h: string, m: string, totalMode: boolean, total: string) => {
      const hitsNum = parseFloat(h);
      const missesNum = totalMode ? parseFloat(total) - hitsNum : parseFloat(m);
      setResult(calculateCacheEfficiency(hitsNum, missesNum));
    }, 150),
    []
  );

  useEffect(() => { compute(hits, misses, useTotalMode, totalRequests); }, [hits, misses, useTotalMode, totalRequests, compute]);

  const handleReset = () => {
    setUseTotalMode(false);
    setHits(String(DEFAULT_HITS));
    setMisses(String(DEFAULT_MISSES));
    setTotalRequests(String(DEFAULT_HITS + DEFAULT_MISSES));
    firstInputRef.current?.focus();
  };

  const handleSample = (s: (typeof SAMPLE_DATASETS)[number]) => {
    setUseTotalMode(false);
    setHits(String(s.hits));
    setMisses(String(s.misses));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };
  const handleDownloadCSV = () => download(buildCSVReport(result), "text/csv", "cache-efficiency-report.csv");
  const handleDownloadTXT = () => download(buildTextReport(result), "text/plain", "cache-efficiency-report.txt");
  const handleDownloadJSON = () => download(buildJSONReport(result), "application/json", "cache-efficiency-data.json");

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(result.hits, result.misses));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => { saveHistory(result); setHistory(getHistory()); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      compute(hits, misses, useTotalMode, totalRequests);
    }
  };

  const gaugePct = Math.min(100, Math.max(0, result.hitRate));
  const summary = getSummaryText(result);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6" onKeyDown={handleKeyDown}>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={useTotalMode} onChange={(e) => setUseTotalMode(e.target.checked)} className="accent-primary w-4 h-4" />
                <span className="text-sm text-gray-700">Calculate using Total Requests instead of Cache Misses</span>
              </label>

              {!useTotalMode ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cec-hits">Cache Hits</label>
                    <input ref={firstInputRef} id="cec-hits" type="number" min={0} value={hits} onChange={(e) => setHits(e.target.value)}
                      placeholder="850"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cec-misses">Cache Misses</label>
                    <input id="cec-misses" type="number" min={0} value={misses} onChange={(e) => setMisses(e.target.value)}
                      placeholder="150"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cec-total">Total Requests</label>
                    <input ref={firstInputRef} id="cec-total" type="number" min={0} value={totalRequests} onChange={(e) => setTotalRequests(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cec-hits2">Cache Hits</label>
                    <input id="cec-hits2" type="number" min={0} value={hits} onChange={(e) => setHits(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                </div>
              )}

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {SAMPLE_DATASETS.map((s) => (
                  <button key={s.label} type="button" onClick={() => handleSample(s)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {s.label}
                  </button>
                ))}
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {!result.error && result.total > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Formula Breakdown</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Total = Hits + Misses = {formatNum(result.hits)} + {formatNum(result.misses)} = {formatNum(result.total)}</p>
                  <p>Hit Rate = (Hits ÷ Total) × 100 = {formatPercent(result.hitRate)}</p>
                  <p className="text-gray-900 font-semibold">Miss Rate = (Misses ÷ Total) × 100 = {formatPercent(result.missRate)}</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <div className="flex items-center gap-5">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                  style={{ background: `conic-gradient(#ffffff ${gaugePct * 3.6}deg, rgba(255,255,255,0.2) 0deg)` }}
                  role="img"
                  aria-label={`Hit rate: ${formatPercent(result.hitRate, 0)}`}
                >
                  <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-base font-bold font-mono">{result.error ? "—" : formatPercent(result.hitRate, 0)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Cache Hit Rate</p>
                  <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">
                    {result.error ? "—" : formatPercent(result.hitRate)}
                  </p>
                  {!result.error && result.performance && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      {result.performance.label}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                <div className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: `${gaugePct}%` }} />
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {!result.error && summary && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Summary</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
              </div>
            )}

            {!result.error && result.total > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Cache Hits", formatNum(result.hits)],
                  ["Cache Misses", formatNum(result.misses)],
                  ["Total Requests", formatNum(result.total)],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Performance guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Rating Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["95 – 100%", "Outstanding"],
                  ["90 – 95%", "Excellent"],
                  ["80 – 90%", "Good"],
                  ["70 – 80%", "Fair"],
                  ["0 – 70%", "Poor"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${result.performance?.label === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`font-medium ${result.performance?.label === label ? "text-primary" : "text-gray-700"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export &amp; Share</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download CSV</button>
                <button onClick={handleDownloadTXT} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download TXT</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download JSON</button>
                <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
              </div>
              <button onClick={handleShare} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                {showHistory ? "Hide" : "Show"} History
              </button>
            </div>

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
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => {
                        setUseTotalMode(false);
                        setHits(String(entry.result.hits));
                        setMisses(String(entry.result.misses));
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatPercent(entry.result.hitRate)} hit rate</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">
                        {entry.result.hits} hits / {entry.result.misses} misses · {entry.result.performance?.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <CacheEfficiencyCalculatorSEO />

      <RelatedTools
        currentTool="cache-efficiency-calculator"
        tools={[
          "index-size-calculator",
          "cluster-utilization-calculator",
          "big-data-throughput-calculator",
          "etl-throughput-calculator",
          "data-pipeline-latency-calculator",
          "storage-requirement-calculator",
        ]}
      />
    </>
  );
}
