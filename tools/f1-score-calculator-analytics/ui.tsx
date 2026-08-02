"use client";

import { useState, useEffect, useCallback } from "react";
import {
  calculateFromMetrics, calculateFromConfusion, debounce, formatNum,
  PRECISION_OPTIONS, DEFAULT_PRECISION, DEFAULT_TP, DEFAULT_FP, DEFAULT_FN,
  DEFAULT_METRIC_PRECISION, DEFAULT_METRIC_RECALL, CONFUSION_PRESETS, METRIC_PRESETS,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  type CalcMode, type F1Result, type HistoryEntry,
} from "./logic";
import F1ScoreCalculatorAnalyticsSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function F1ScoreCalculatorAnalyticsUI() {
  const [mode, setMode] = useState<CalcMode>("confusion");
  const [tp, setTp] = useState(String(DEFAULT_TP));
  const [fp, setFp] = useState(String(DEFAULT_FP));
  const [fn, setFn] = useState(String(DEFAULT_FN));
  const [precisionInput, setPrecisionInput] = useState(String(DEFAULT_METRIC_PRECISION));
  const [recallInput, setRecallInput] = useState(String(DEFAULT_METRIC_RECALL));
  const [decimals, setDecimals] = useState(DEFAULT_PRECISION);
  const [result, setResult] = useState<F1Result | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setMode(shared.mode);
      if (shared.tp) setTp(shared.tp);
      if (shared.fp) setFp(shared.fp);
      if (shared.fn) setFn(shared.fn);
      if (shared.precision) setPrecisionInput(shared.precision);
      if (shared.recall) setRecallInput(shared.recall);
      setDecimals(shared.decimals);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compute = useCallback(
    debounce((m: CalcMode, tpVal: string, fpVal: string, fnVal: string, pVal: string, rVal: string) => {
      if (m === "confusion") {
        setResult(calculateFromConfusion(parseFloat(tpVal || "0"), parseFloat(fpVal || "0"), parseFloat(fnVal || "0")));
      } else {
        setResult(calculateFromMetrics(parseFloat(pVal), parseFloat(rVal)));
      }
    }, 150),
    []
  );

  useEffect(() => { compute(mode, tp, fp, fn, precisionInput, recallInput); }, [mode, tp, fp, fn, precisionInput, recallInput, compute]);

  const handleReset = () => {
    setTp(String(DEFAULT_TP)); setFp(String(DEFAULT_FP)); setFn(String(DEFAULT_FN));
    setPrecisionInput(String(DEFAULT_METRIC_PRECISION)); setRecallInput(String(DEFAULT_METRIC_RECALL));
    setDecimals(DEFAULT_PRECISION);
  };

  const handleCopy = () => {
    if (!result || result.error) return;
    navigator.clipboard.writeText(buildTextReport(result, decimals));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, decimals)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "f1-score-calculation-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, decimals)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "f1-score-calculation-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "f1-score-calculation-report.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, decimals));
    w.document.close(); w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(mode, tp, fp, fn, precisionInput, recallInput, decimals));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(result); setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>F1 Score Calculator</p>
          <p className="text-xs text-gray-400 font-mono">F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1.5">
          <button onClick={() => setMode("confusion")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "confusion" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Confusion Matrix</button>
          <button onClick={() => setMode("metrics")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "metrics" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Precision + Recall</button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              {mode === "confusion" ? (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="f1c-tp">TP</label>
                      <input id="f1c-tp" type="number" min="0" value={tp} onChange={(e) => setTp(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="f1c-fp">FP</label>
                      <input id="f1c-fp" type="number" min="0" value={fp} onChange={(e) => setFp(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="f1c-fn">FN</label>
                      <input id="f1c-fn" type="number" min="0" value={fn} onChange={(e) => setFn(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400">Examples:</span>
                    {CONFUSION_PRESETS.map((p) => (
                      <button key={p.label} type="button" onClick={() => { setTp(String(p.tp)); setFp(String(p.fp)); setFn(String(p.fn)); }}
                        className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                        {p.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="f1c-precision">Precision (0–1)</label>
                      <input id="f1c-precision" type="number" min="0" max="1" step="0.0001" value={precisionInput} onChange={(e) => setPrecisionInput(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="f1c-recall">Recall (0–1)</label>
                      <input id="f1c-recall" type="number" min="0" max="1" step="0.0001" value={recallInput} onChange={(e) => setRecallInput(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400">Examples:</span>
                    {METRIC_PRESETS.map((p) => (
                      <button key={p.label} type="button" onClick={() => { setPrecisionInput(String(p.precision)); setRecallInput(String(p.recall)); }}
                        className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                        {p.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="f1c-decimals">Decimal Places</label>
                <select id="f1c-decimals" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {result?.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {/* Formula / steps */}
            {result && result.f1 !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  {mode === "confusion" && (
                    <>
                      <p>Precision = {result.tp} ÷ ({result.tp} + {result.fp}) = {formatNum(result.precision, decimals)}</p>
                      <p>Recall = {result.tp} ÷ ({result.tp} + {result.fn}) = {formatNum(result.recall, decimals)}</p>
                    </>
                  )}
                  <p>F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)</p>
                  <p>F1 = 2 × ({formatNum(result.precision, decimals)} × {formatNum(result.recall, decimals)}) ÷ ({formatNum(result.precision, decimals)} + {formatNum(result.recall, decimals)})</p>
                  <p className="text-gray-900 font-semibold">F1 = {formatNum(result.f1, decimals)}</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>F1 Score</p>
              {result && result.f1 !== null ? (
                <>
                  <p className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{formatNum(result.f1, decimals)}</p>
                  {result.rating && (
                    <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      {result.rating.label}
                    </span>
                  )}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Precision</p>
                      <p className="text-lg font-bold font-mono">{formatNum(result.precision, decimals)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Recall</p>
                      <p className="text-lg font-bold font-mono">{formatNum(result.recall, decimals)}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Result"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                      Save to History
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter valid inputs on the left to calculate the F1 score.</p>
              )}
            </div>

            {/* Rating guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Rating Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["90% – 100%", "Excellent"],
                  ["75% – 89%", "Good"],
                  ["60% – 74%", "Average"],
                  ["Below 60%", "Needs Improvement"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${result?.rating?.label === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`font-medium ${result?.rating?.label === label ? "text-primary" : "text-gray-700"}`}>{label}</span>
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
                    <div key={entry.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">F1: {formatNum(entry.result.f1, 4)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.result.mode} · {entry.result.rating?.label ?? "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <F1ScoreCalculatorAnalyticsSEO />

      <RelatedTools
        currentTool="f1-score-calculator-analytics"
        tools={[
          "precision-calculator",
          "recall-calculator",
          "roc-auc-calculator",
          "confusion-matrix-analyzer",
          "p-value-calculator",
          "correlation-coefficient-calculator",
        ]}
      />
    </>
  );
}
