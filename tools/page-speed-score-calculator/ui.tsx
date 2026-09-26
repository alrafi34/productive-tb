"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculatePageSpeed, validateMetrics, debounce, parseNum,
  buildShareUrl, parseShareParams, saveHistory, getHistory, clearHistory,
  saveInputs, loadInputs, buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  METRICS, DEFAULT_METRICS, EXAMPLE_PRESETS,
  type CoreMetrics, type MetricKey, type PageSpeedResult, type HistoryEntry,
} from "./logic";
import { ScoreGauge, MetricBar } from "./chart";
import PageSpeedScoreCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const RATING_STYLES: Record<string, string> = {
  Excellent: "bg-green-50 text-green-700 border-green-200",
  Good: "bg-blue-50 text-blue-700 border-blue-200",
  "Needs Improvement": "bg-amber-50 text-amber-700 border-amber-200",
  Poor: "bg-red-50 text-red-700 border-red-200",
};

export default function PageSpeedScoreCalculatorUI() {
  const [metrics, setMetrics] = useState<CoreMetrics>(DEFAULT_METRICS);
  const [result, setResult] = useState<PageSpeedResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);
  const runRef = useRef(debounce((m: CoreMetrics) => {
    const errs = validateMetrics(m);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculatePageSpeed(m));
  }, 150));
  const persistRef = useRef(debounce((m: CoreMetrics) => saveInputs(m), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setMetrics((p) => ({ ...p, ...shared }));
    } else {
      const saved = loadInputs();
      if (saved) setMetrics(saved);
      else firstRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(metrics); }, [metrics]);
  useEffect(() => { persistRef.current(metrics); }, [metrics]);

  const set = (field: MetricKey, val: number) => setMetrics((p) => ({ ...p, [field]: val }));

  const handleReset = () => {
    setMetrics(DEFAULT_METRICS); setResult(null); setErrors({});
    firstRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreset = (p: typeof EXAMPLE_PRESETS[0]) => {
    setMetrics(p.metrics);
    firstRef.current?.focus();
  };

  const handleRandom = () => {
    const rand = (min: number, max: number, decimals = 0) => {
      const v = min + Math.random() * (max - min);
      return decimals ? parseFloat(v.toFixed(decimals)) : Math.round(v);
    };
    setMetrics({
      lcp: rand(1.2, 7, 1),
      inp: rand(80, 700),
      cls: rand(0.01, 0.5, 2),
      fcp: rand(0.8, 5, 1),
      tbt: rand(20, 1000),
      si: rand(1.5, 9, 1),
    });
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.finalScore} / 100 (${result.rating})`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `page-speed-score-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, metrics)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `page-speed-score-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `page-speed-score-${Date.now()}.txt`; a.click(); URL.revokeObjectURL(a.href);
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

  const handleShare = () => {
    if (!result) return;
    const url = buildShareUrl(metrics);
    navigator.clipboard.writeText(url);
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ metrics, result });
    setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Quick presets:</span>
            {EXAMPLE_PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                {p.label}
              </button>
            ))}
            <button type="button" onClick={handleRandom}
              className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
              🎲 Random Example
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Enter your Core Web Vitals from Lighthouse, Chrome DevTools, PageSpeed Insights, WebPageTest, or GTmetrix.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Core Web Vitals</h3>

              {METRICS.map((meta, i) => (
                <div key={meta.key}>
                  <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5" htmlFor={`psc-${meta.key}`} title={meta.description}>
                    <span>{meta.label} ({meta.short})</span>
                    <span className="text-xs text-gray-400 font-normal">Good ≤ {meta.good}{meta.unit}</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={i === 0 ? firstRef : undefined}
                      id={`psc-${meta.key}`} type="number" min="0" step={meta.step} inputMode="decimal"
                      value={metrics[meta.key] || metrics[meta.key] === 0 ? metrics[meta.key] : ""}
                      onChange={(e) => set(meta.key, parseNum(e.target.value))}
                      placeholder={String(meta.good)}
                      aria-invalid={!!errors[meta.key]}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors[meta.key] ? "border-red-300" : "border-gray-200"}`}
                    />
                    {meta.unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{meta.unit}</span>}
                  </div>
                  {errors[meta.key] ? <p className="text-xs text-red-600 mt-1" role="alert">{errors[meta.key]}</p> : <p className="text-xs text-gray-400 mt-1">{meta.description}</p>}
                </div>
              ))}

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>

              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopyResult} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy Result"}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                  <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export JSON</button>
                  <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export TXT</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print</button>
                  <button onClick={handleShare} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                  <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                    {showHistory ? "Hide" : "Show"} History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Estimated Performance Score
              </p>
              {result ? (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <ScoreGauge score={result.finalScore} color="#ffffff" />
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl font-bold font-mono">{result.grade}</span>
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 border border-white/30">
                          {result.rating}
                        </span>
                      </div>
                      <p className="text-sm text-primary-100 leading-relaxed">{result.summary}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Result"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopyFull} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Full Report</button>
                      <button onClick={handleSave} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter your Core Web Vitals to estimate the performance score."}
                </p>
              )}
            </div>

            {/* Metric breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Metric Breakdown</h3>
              </div>
              {result ? (
                <div className="p-5 space-y-4">
                  {result.metricScores.map((m) => (
                    <MetricBar key={m.key} label={`${m.meta.label} (${m.meta.short}) — ${m.value}${m.meta.unit}, weight ${Math.round(m.meta.weight * 100)}%`} score={m.score} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Enter values on the left to see the metric breakdown</div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recommendations</h3>
              </div>
              {result ? (
                <ul className="divide-y divide-gray-50">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="px-5 py-3 text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">→</span><span>{r}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Recommendations appear here once you enter your metrics</div>
              )}
            </div>

            {/* Performance rating reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Rating</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["Excellent", "90 – 100"],
                  ["Good", "70 – 89"],
                  ["Needs Improvement", "50 – 69"],
                  ["Poor", "0 – 49"],
                ].map(([rating, range]) => (
                  <div key={rating} className={`px-5 py-2.5 flex items-center justify-between ${result?.rating === rating ? "bg-primary/5" : ""}`}>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${RATING_STYLES[rating]}`}>{rating}</span>
                    <span className="text-sm font-mono text-gray-600">{range}</span>
                  </div>
                ))}
              </div>
            </div>

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
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => { setMetrics(entry.metrics); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {entry.result.finalScore} / 100 — {entry.result.grade}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{entry.result.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <PageSpeedScoreCalculatorSEO />

      <RelatedTools />
    </>
  );
}
