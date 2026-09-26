"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  calculateForward, calculateReverse, debounce, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  FORWARD_PRESETS, REVERSE_PRESETS,
  DEFAULT_VALUE, DEFAULT_MEAN, DEFAULT_STDDEV, DEFAULT_ZSCORE, DEFAULT_PRECISION,
  type CalcMode, type ZScoreResult, type HistoryEntry,
} from "./logic";
import ZScoreCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5];

export default function ZScoreCalculatorUI() {
  const [mode, setMode] = useState<CalcMode>("forward");
  const [value, setValue] = useState(String(DEFAULT_VALUE));
  const [zScoreInput, setZScoreInput] = useState(String(DEFAULT_ZSCORE));
  const [mean, setMean] = useState(String(DEFAULT_MEAN));
  const [stdDev, setStdDev] = useState(String(DEFAULT_STDDEV));
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setMode(shared.mode);
      setMean(String(shared.mean));
      setStdDev(String(shared.stdDev));
      setPrecision(shared.precision);
      if (shared.mode === "forward") setValue(String(shared.a));
      else setZScoreInput(String(shared.a));
    }
  }, []);

  const [result, setResult] = useState<ZScoreResult>(() =>
    calculateForward({ value: DEFAULT_VALUE, mean: DEFAULT_MEAN, stdDev: DEFAULT_STDDEV })
  );

  const compute = useCallback(
    debounce((m: CalcMode, v: string, z: string, mn: string, sd: string) => {
      if (m === "forward") {
        setResult(calculateForward({ value: parseFloat(v), mean: parseFloat(mn), stdDev: parseFloat(sd) }));
      } else {
        setResult(calculateReverse({ zScore: parseFloat(z), mean: parseFloat(mn), stdDev: parseFloat(sd) }));
      }
    }, 150),
    []
  );

  useEffect(() => { compute(mode, value, zScoreInput, mean, stdDev); }, [mode, value, zScoreInput, mean, stdDev, compute]);

  const handleReset = () => {
    setValue(String(DEFAULT_VALUE));
    setZScoreInput(String(DEFAULT_ZSCORE));
    setMean(String(DEFAULT_MEAN));
    setStdDev(String(DEFAULT_STDDEV));
    setPrecision(DEFAULT_PRECISION);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result, precision)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `z-score-calculation-report.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([buildTextReport(result, precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `z-score-calculation-report.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `z-score-calculation-report.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    const a = mode === "forward" ? parseFloat(value) : parseFloat(zScoreInput);
    navigator.clipboard.writeText(buildShareUrl(mode, a, parseFloat(mean), parseFloat(stdDev), precision));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory(result); setHistory(getHistory());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      compute(mode, value, zScoreInput, mean, stdDev);
    }
  };

  const badgeColor = useMemo(() => result.interpretation?.color ?? "#058554", [result.interpretation]);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6" onKeyDown={handleKeyDown}>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Z-Score Calculator</p>
          <p className="text-xs text-gray-400 font-mono">Z = (X − μ) ÷ σ &nbsp;·&nbsp; Reverse: X = μ + (Z × σ)</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1.5">
          <button
            onClick={() => setMode("forward")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "forward" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
          >
            Calculate Z-Score
          </button>
          <button
            onClick={() => setMode("reverse")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "reverse" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
          >
            Reverse Calculate Value
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              {mode === "forward" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="zc-value">Observed Value (X)</label>
                  <input id="zc-value" type="number" value={value} onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="zc-z">Target Z-Score</label>
                  <input id="zc-z" type="number" value={zScoreInput} onChange={(e) => setZScoreInput(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="zc-mean">Mean (μ)</label>
                  <input id="zc-mean" type="number" value={mean} onChange={(e) => setMean(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="zc-sd">Standard Deviation (σ)</label>
                  <input id="zc-sd" type="number" value={stdDev} onChange={(e) => setStdDev(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="zc-precision">Decimal Precision</label>
                <select id="zc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {(mode === "forward" ? FORWARD_PRESETS : REVERSE_PRESETS).map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setMean(String(p.mean));
                      setStdDev(String(p.stdDev));
                      if (mode === "forward" && "value" in p) setValue(String(p.value));
                      if (mode === "reverse" && "zScore" in p) setZScoreInput(String(p.zScore));
                    }}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {/* Formula / steps */}
            {!result.error && result.zScore !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
                {mode === "forward" ? (
                  <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                    <p>Z = (X − μ) ÷ σ</p>
                    <p>Z = ({formatNum(result.value, precision)} − {formatNum(result.mean, precision)}) ÷ {formatNum(result.stdDev, precision)}</p>
                    <p>Z = {formatNum((result.value ?? 0) - result.mean, precision)} ÷ {formatNum(result.stdDev, precision)}</p>
                    <p className="text-gray-900 font-semibold">Z = {formatNum(result.zScore, precision)}</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                    <p>X = μ + (Z × σ)</p>
                    <p>X = {formatNum(result.mean, precision)} + ({formatNum(result.zScore, precision)} × {formatNum(result.stdDev, precision)})</p>
                    <p>X = {formatNum(result.mean, precision)} + {formatNum((result.zScore ?? 0) * result.stdDev, precision)}</p>
                    <p className="text-gray-900 font-semibold">X = {formatNum(result.value, precision)}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "forward" ? "Z-Score" : "Calculated Value (X)"}
              </p>
              <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">
                {mode === "forward" ? formatNum(result.zScore, precision) : formatNum(result.value, precision)}
              </p>
              {result.interpretation && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {result.interpretation.label}
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
            </div>

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Interpretation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{result.interpretationText}</p>
              </div>
            )}

            {/* Interpretation guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Interpretation Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["Z < -3", "Extremely Low"],
                  ["-3 to -2", "Very Low"],
                  ["-2 to -1", "Below Average"],
                  ["-1 to 1", "Average"],
                  ["1 to 2", "Above Average"],
                  ["2 to 3", "Very High"],
                  ["> 3", "Extremely High"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${result.interpretation?.label === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`font-medium ${result.interpretation?.label === label ? "text-primary" : "text-gray-700"}`} style={result.interpretation?.label === label ? { color: badgeColor } : undefined}>{label}</span>
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
                    <div
                      key={entry.id}
                      onClick={() => {
                        setMode(entry.result.mode);
                        setMean(String(entry.result.mean));
                        setStdDev(String(entry.result.stdDev));
                        if (entry.result.mode === "forward") setValue(String(entry.result.value ?? ""));
                        else setZScoreInput(String(entry.result.zScore ?? ""));
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">Z: {formatNum(entry.result.zScore, 2)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.result.interpretation?.label ?? "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <ZScoreCalculatorSEO />

      <RelatedTools />
    </>
  );
}
