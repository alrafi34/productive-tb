"use client";

import { useState, useEffect, useCallback } from "react";
import {
  calculateRecall, debounce, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  PRESETS, PRECISION_OPTIONS,
  DEFAULT_TP, DEFAULT_FN, DEFAULT_FP, DEFAULT_TN, DEFAULT_PRECISION,
  type InputMode, type OutputFormat, type RecallResult, type HistoryEntry,
} from "./logic";
import RecallCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RecallCalculatorUI() {
  const [mode, setMode] = useState<InputMode>("simple");
  const [tp, setTp] = useState(String(DEFAULT_TP));
  const [fn, setFn] = useState(String(DEFAULT_FN));
  const [fp, setFp] = useState(String(DEFAULT_FP));
  const [tn, setTn] = useState(String(DEFAULT_TN));
  const [format, setFormat] = useState<OutputFormat>("both");
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [result, setResult] = useState<RecallResult>(() => calculateRecall(DEFAULT_TP, DEFAULT_FN));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setMode(shared.mode);
      setTp(String(shared.tp));
      setFn(String(shared.fn));
      setFp(String(shared.fp));
      setTn(String(shared.tn));
      setPrecision(shared.precision);
      setFormat(shared.format);
    }
  }, []);

  const compute = useCallback(
    debounce((m: InputMode, tpV: string, fnV: string, fpV: string, tnV: string) => {
      setResult(calculateRecall(
        parseFloat(tpV), parseFloat(fnV),
        m === "confusion-matrix" ? parseFloat(fpV) : null,
        m === "confusion-matrix" ? parseFloat(tnV) : null,
      ));
    }, 150),
    []
  );

  useEffect(() => { compute(mode, tp, fn, fp, tn); }, [mode, tp, fn, fp, tn, compute]);

  const handleReset = () => {
    setTp(String(DEFAULT_TP));
    setFn(String(DEFAULT_FN));
    setFp(String(DEFAULT_FP));
    setTn(String(DEFAULT_TN));
    setPrecision(DEFAULT_PRECISION);
    setFormat("both");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCSV = () => download(buildCSVReport(result, precision), "text/csv", "recall-calculation.csv");
  const handleDownloadTXT = () => download(buildTextReport(result, precision), "text/plain", "recall-calculation.txt");
  const handleDownloadJSON = () => download(buildJSONReport(result), "application/json", "recall-calculation.json");

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(mode, parseFloat(tp), parseFloat(fn), parseFloat(fp), parseFloat(tn), precision, format));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory(result); setHistory(getHistory());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      compute(mode, tp, fn, fp, tn);
    }
  };

  const pct = result.percentage ?? 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6" onKeyDown={handleKeyDown}>

        {/* Mode switch */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1.5">
          <button onClick={() => setMode("simple")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "simple" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            TP / FN
          </button>
          <button onClick={() => setMode("confusion-matrix")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "confusion-matrix" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            Confusion Matrix
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rc-tp" title="Cases correctly predicted as positive.">
                    True Positives (TP)
                  </label>
                  <input id="rc-tp" type="number" min={0} value={tp} onChange={(e) => setTp(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rc-fn" title="Actual positive cases the model predicted as negative (missed).">
                    False Negatives (FN)
                  </label>
                  <input id="rc-fn" type="number" min={0} value={fn} onChange={(e) => setFn(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              {mode === "confusion-matrix" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rc-fp" title="Cases incorrectly predicted as positive.">
                      False Positives (FP)
                    </label>
                    <input id="rc-fp" type="number" min={0} value={fp} onChange={(e) => setFp(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rc-tn" title="Cases correctly predicted as negative.">
                      True Negatives (TN)
                    </label>
                    <input id="rc-tn" type="number" min={0} value={tn} onChange={(e) => setTn(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                </div>
              )}

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rc-format">Output Format</label>
                  <select id="rc-format" value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    <option value="both">Decimal + Percentage</option>
                    <option value="decimal">Decimal</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rc-precision">Decimal Precision</label>
                  <select id="rc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {PRESETS.map((p) => (
                  <button key={p.label} type="button" onClick={() => { setTp(String(p.tp)); setFn(String(p.fn)); }}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {p.label}
                  </button>
                ))}
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {/* Formula / steps */}
            {!result.error && result.recall !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Breakdown</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Recall = TP ÷ (TP + FN)</p>
                  <p>Recall = {tp} ÷ ({tp} + {fn})</p>
                  <p>Recall = {tp} ÷ {result.denominator}</p>
                  <p className="text-gray-900 font-semibold">Recall = {formatNum(result.recall, precision)} = {formatNum(result.percentage, precision)}%</p>
                </div>
              </div>
            )}

            {mode === "confusion-matrix" && !result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Confusion Matrix</h3>
                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                    <p className="text-xs text-gray-500">True Positive</p>
                    <p className="font-mono font-bold text-primary">{tp}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-500">False Positive</p>
                    <p className="font-mono font-bold text-gray-700">{fp}</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                    <p className="text-xs text-gray-500">False Negative</p>
                    <p className="font-mono font-bold text-red-600">{fn}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-500">True Negative</p>
                    <p className="font-mono font-bold text-gray-700">{tn}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Recall only uses the highlighted True Positive and False Negative cells.</p>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <div className="flex items-center gap-5">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                  style={{ background: `conic-gradient(#ffffff ${pct * 3.6}deg, rgba(255,255,255,0.2) 0deg)` }}
                  role="img"
                  aria-label={`Recall progress: ${formatNum(result.percentage, 0)} percent`}
                >
                  <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-lg font-bold font-mono">{formatNum(result.percentage, 0)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Recall</p>
                  <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">
                    {format === "decimal" ? formatNum(result.recall, precision) : format === "percentage" ? `${formatNum(result.percentage, precision)}%` : formatNum(result.recall, precision)}
                  </p>
                  {format === "both" && <p className="text-sm text-primary-100">{formatNum(result.percentage, precision)}%</p>}
                  {result.rating && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      {result.rating.label}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                <div className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: `${Math.min(100, pct)}%` }} />
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Result"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {mode === "confusion-matrix" && !result.error && (result.precision !== null || result.accuracy !== null) && (
              <div className="grid grid-cols-2 gap-3">
                {result.precision !== null && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Precision (context)</p>
                    <p className="text-lg font-bold font-mono text-gray-800">{formatNum(result.precision, precision)}</p>
                  </div>
                )}
                {result.accuracy !== null && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Accuracy (context)</p>
                    <p className="text-lg font-bold font-mono text-gray-800">{formatNum(result.accuracy, precision)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Interpretation guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Interpretation</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["90–100%", "Excellent Recall"],
                  ["75–89%", "Good Recall"],
                  ["50–74%", "Moderate Recall"],
                  ["Below 50%", "Poor Recall"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${result.rating?.label === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`font-medium ${result.rating?.label === label ? "text-primary" : "text-gray-700"}`}>{label}</span>
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
              <button onClick={handleShare} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share Result"}</button>
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
                    <div
                      key={entry.id}
                      onClick={() => {
                        setTp(String(entry.result.tp));
                        setFn(String(entry.result.fn));
                        if (entry.result.fp !== null) { setFp(String(entry.result.fp)); setTn(String(entry.result.tn ?? DEFAULT_TN)); setMode("confusion-matrix"); }
                        else setMode("simple");
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">Recall: {formatNum(entry.result.percentage, 2)}%</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.result.rating?.label ?? "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RecallCalculatorSEO />

      <RelatedTools
        currentTool="recall-calculator"
        tools={[
          "precision-calculator",
          "f1-score-calculator-analytics",
          "roc-auc-calculator",
          "confusion-matrix-analyzer",
          "chi-square-calculator",
          "a-b-test-calculator",
        ]}
      />
    </>
  );
}
