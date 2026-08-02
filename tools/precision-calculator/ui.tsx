"use client";

import { useState, useEffect, useCallback } from "react";
import {
  calculatePrecision, debounce, formatNum,
  PRECISION_OPTIONS, DEFAULT_PRECISION, DEFAULT_TP, DEFAULT_FP, PRESETS,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  type OutputFormat, type PrecisionResult, type HistoryEntry,
} from "./logic";
import PrecisionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PrecisionCalculatorUI() {
  const [tp, setTp] = useState(String(DEFAULT_TP));
  const [fp, setFp] = useState(String(DEFAULT_FP));
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [format, setFormat] = useState<OutputFormat>("both");
  const [result, setResult] = useState<PrecisionResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setTp(String(shared.tp));
      setFp(String(shared.fp));
      setPrecision(shared.precision);
      setFormat(shared.format);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compute = useCallback(
    debounce((tpVal: string, fpVal: string) => {
      setResult(calculatePrecision(parseFloat(tpVal || "0"), parseFloat(fpVal || "0")));
    }, 150),
    []
  );

  useEffect(() => { compute(tp, fp); }, [tp, fp, compute]);

  const handlePreset = (p: { tp: number; fp: number }) => {
    setTp(String(p.tp)); setFp(String(p.fp));
  };

  const handleReset = () => {
    setTp(String(DEFAULT_TP)); setFp(String(DEFAULT_FP)); setPrecision(DEFAULT_PRECISION); setFormat("both");
  };

  const handleCopy = () => {
    if (!result || result.error) return;
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, precision)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "precision-calculation-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "precision-calculation-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "precision-calculation-report.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
    w.document.close(); w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(parseFloat(tp || "0"), parseFloat(fp || "0"), precision, format));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(result); setHistory(getHistory());
  };

  const showDecimal = format === "decimal" || format === "both";
  const showPercentage = format === "percentage" || format === "both";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Precision Calculator</p>
          <p className="text-xs text-gray-400 font-mono">Precision = TP ÷ (TP + FP)</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pc-tp">True Positive (TP)</label>
                  <input id="pc-tp" type="number" min="0" value={tp} onChange={(e) => setTp(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pc-fp">False Positive (FP)</label>
                  <input id="pc-fp" type="number" min="0" value={fp} onChange={(e) => setFp(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pc-format">Output Format</label>
                  <select id="pc-format" value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    <option value="decimal">Decimal</option>
                    <option value="percentage">Percentage</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pc-precision">Decimal Places</label>
                  <select id="pc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {PRESETS.map((p) => (
                  <button key={p.label} type="button" onClick={() => handlePreset(p)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {p.label}
                  </button>
                ))}
              </div>

              {result?.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {/* Formula / steps */}
            {result && result.precision !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Precision = TP ÷ (TP + FP)</p>
                  <p>Precision = {result.tp} ÷ ({result.tp} + {result.fp})</p>
                  <p>Precision = {result.tp} ÷ {result.denominator}</p>
                  <p className="text-gray-900 font-semibold">Precision = {formatNum(result.precision, precision)} ({formatNum(result.percentage, precision)}%)</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Precision</p>
              {result && result.precision !== null ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    {showDecimal && <span className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">{formatNum(result.precision, precision)}</span>}
                    {showPercentage && <span className="text-2xl font-bold font-mono tabular-nums text-primary-100">{formatNum(result.percentage, precision)}%</span>}
                  </div>
                  {result.rating && (
                    <span className="inline-block mt-1 mb-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      {result.rating.label}
                    </span>
                  )}
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
                <p className="text-primary-100 text-sm">Enter True Positive and False Positive values on the left to calculate precision.</p>
              )}
            </div>

            {/* Rating guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Rating Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["95% – 100%", "Excellent"],
                  ["90% – 94%", "Very High"],
                  ["80% – 89%", "High"],
                  ["70% – 79%", "Good"],
                  ["60% – 69%", "Moderate"],
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
                    <div key={entry.id} onClick={() => { setTp(String(entry.result.tp)); setFp(String(entry.result.fp)); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">Precision: {formatNum(entry.result.percentage, 2)}%</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">TP={entry.result.tp}, FP={entry.result.fp} · {entry.result.rating?.label ?? "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <PrecisionCalculatorSEO />

      <RelatedTools
        currentTool="precision-calculator"
        tools={[
          "recall-calculator",
          "f1-score-calculator-analytics",
          "roc-auc-calculator",
          "confusion-matrix-analyzer",
          "p-value-calculator",
          "correlation-coefficient-calculator",
        ]}
      />
    </>
  );
}
