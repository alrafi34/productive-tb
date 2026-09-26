"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, calculateMovingAverage, trendSummary, debounce, formatNum,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  SAMPLE_DATASETS, generateRandomSample,
  type MAType, type MAResult, type HistoryEntry,
} from "./logic";
import { TrendChart, exportCanvasAsPng, buildChartSVG } from "./chart";
import MovingAverageCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5];
const TYPE_LABELS: Record<MAType, string> = { sma: "SMA", wma: "WMA", ema: "EMA" };
const TYPE_FULL_LABELS: Record<MAType, string> = { sma: "Simple Moving Average", wma: "Weighted Moving Average", ema: "Exponential Moving Average" };

export default function MovingAverageCalculatorUI() {
  const [input, setInput] = useState("");
  const [maType, setMaType] = useState<MAType>("sma");
  const [windowSize, setWindowSize] = useState(3);
  const [decimals, setDecimals] = useState(2);
  const [result, setResult] = useState<MAResult | null>(null);
  const [values, setValues] = useState<number[]>([]);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showMA, setShowMA] = useState(true);
  const [calcTimeMs, setCalcTimeMs] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const runRef = useRef(debounce((text: string, type: MAType, win: number, dec: number) => {
    const start = performance.now();
    const { values: vals, invalidTokens: invalid } = parseDataset(text);
    setInvalidTokens(invalid);
    setValues(vals);

    if (vals.length < 2) {
      setResult(null);
      setError(vals.length === 0 ? null : "Please enter at least two numbers.");
      return;
    }
    if (win < 2) {
      setResult(null);
      setError("Window size must be at least 2.");
      return;
    }
    if (win > vals.length) {
      setResult(null);
      setError("Window size cannot exceed dataset length.");
      return;
    }
    setError(null);
    const r = calculateMovingAverage(vals, type, win, dec);
    setResult(r);
    setCalcTimeMs(performance.now() - start);
  }, 150));
  const persistRef = useRef(debounce((text: string, type: MAType, win: number, dec: number) => saveInput(text, type, win, dec), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setInput(saved.text); setMaType(saved.type); setWindowSize(saved.window); setDecimals(saved.decimals);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(input, maType, windowSize, decimals); }, [input, maType, windowSize, decimals]);
  useEffect(() => { persistRef.current(input, maType, windowSize, decimals); }, [input, maType, windowSize, decimals]);

  const handleClear = () => {
    setInput(""); setResult(null); setValues([]); setInvalidTokens([]); setFileError(null); setError(null);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClear(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "l") { e.preventDefault(); handleRandomSample(); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadSample = (sample: { text: string; window: number }) => {
    setInput(sample.text); setWindowSize(sample.window); setShowSamples(false);
    textareaRef.current?.focus();
  };

  const handleRandomSample = () => {
    setInput(generateRandomSample());
    setShowSamples(false);
    textareaRef.current?.focus();
  };

  const loadFile = (file: File) => {
    setFileError(null);
    if (!/\.(csv|txt)$/i.test(file.name)) { setFileError("Please upload a .csv or .txt file."); return; }
    if (file.size > 5 * 1024 * 1024) { setFileError("File is too large. Maximum size is 5MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result));
    reader.onerror = () => setFileError("This file could not be read.");
    reader.readAsText(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.points.map((p) => p.ma).join("\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, values));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "moving-average-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "moving-average-results.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result));
    win.document.close();
    win.print();
  };

  const handleDownloadPng = () => exportCanvasAsPng(chartContainerRef.current, "moving-average-chart.png");

  const handleDownloadSvg = () => {
    if (!result) return;
    const svg = buildChartSVG(values, result.points, showOriginal, showMA);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "moving-average-chart.svg"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input, type: maType, window: windowSize, result });
    setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`bg-white rounded-xl border-2 shadow-sm p-5 space-y-3 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-100"}`}
            >
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset</h3>
              <textarea
                ref={textareaRef}
                rows={8}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"Enter numbers separated by commas, spaces, or new lines.\n\nExample:\n10, 20, 30, 40, 50"}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
              />
              <p className="text-[11px] text-gray-400">Or drag &amp; drop a CSV / TXT file anywhere in this box. Supports decimals, negatives, and mixed separators.</p>
              {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
              {error && <p className="text-xs text-red-600" role="alert">⚠️ {error}</p>}
              {invalidTokens.length > 0 && (
                <p className="text-xs text-amber-600">⚠️ Ignored {invalidTokens.length} invalid value{invalidTokens.length === 1 ? "" : "s"}: <span className="font-mono">{invalidTokens.slice(0, 8).join(", ")}{invalidTokens.length > 8 ? "…" : ""}</span></p>
              )}

              <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100 relative">
                <button onClick={() => setShowSamples(!showSamples)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Load Sample</button>
                <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Import CSV</button>
                <input ref={fileInputRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={handleFileInput} className="hidden" />
                <button onClick={handleClear} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Clear</button>

                {showSamples && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    {SAMPLE_DATASETS.map((s) => (
                      <button key={s.name} onClick={() => handleLoadSample(s)} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">{s.name}</button>
                    ))}
                    <button onClick={handleRandomSample} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors font-medium text-primary">Random Dataset</button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                  <select value={maType} onChange={(e) => setMaType(e.target.value as MAType)}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                    <option value="sma">SMA</option>
                    <option value="wma">WMA</option>
                    <option value="ema">EMA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="mac-window">Window Size</label>
                  <input id="mac-window" type="number" min={2} max={1000} value={windowSize}
                    onChange={(e) => setWindowSize(Math.max(2, Math.min(1000, parseInt(e.target.value, 10) || 2)))}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="mac-precision">Precision</label>
                  <select id="mac-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                    {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to clear, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> for a random dataset</p>
            </div>

            {/* Statistics panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Summary Statistics</h3>
                {calcTimeMs !== null && result && (
                  <span className="text-[10px] text-gray-400 font-mono">{calcTimeMs < 1 ? "<1ms" : `${calcTimeMs.toFixed(1)}ms`}</span>
                )}
              </div>
              {result ? (
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-50">
                  {[
                    ["Dataset Count", result.originalCount],
                    ["MA Value Count", result.count],
                    ["Min", formatNum(result.min)],
                    ["Max", formatNum(result.max)],
                    ["Average", formatNum(result.average)],
                    ["Window Size", result.window],
                  ].map(([label, value]) => (
                    <div key={label} className="px-4 py-3">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-400 text-sm">Enter a dataset to see statistics</div>
              )}
              {result && (
                <div className="px-4 py-3 border-t border-gray-50 text-xs text-gray-600">{trendSummary(result)}</div>
              )}
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {TYPE_FULL_LABELS[maType]} ({TYPE_LABELS[maType]})
              </p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                    {result.points.slice(0, 8).map((p, i) => (
                      <span key={i} className="text-2xl font-bold font-mono tabular-nums bg-white/10 rounded-lg px-3 py-1">{formatNum(p.ma)}</span>
                    ))}
                    {result.points.length > 8 && <span className="text-sm text-primary-100">+{result.points.length - 8} more</span>}
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    {result.count} moving average value{result.count === 1 ? "" : "s"} computed from {result.originalCount} data points with window size {result.window}
                  </p>

                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Results"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleCopyReport} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Full Report</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter a dataset on the left to calculate the moving average.</p>
              )}
            </div>

            {/* Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex gap-1.5">
                    <button onClick={() => setShowOriginal(!showOriginal)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showOriginal ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      Original
                    </button>
                    <button onClick={() => setShowMA(!showMA)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showMA ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      Moving Average
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleDownloadPng} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">PNG</button>
                    <button onClick={handleDownloadSvg} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">SVG</button>
                  </div>
                </div>
                <div ref={chartContainerRef} className="p-5">
                  <TrendChart values={values} points={result.points} showOriginal={showOriginal} showMA={showMA} />
                </div>
              </div>
            )}

            {/* Data table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Results Table</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="text-left px-4 py-2 font-semibold text-gray-600">#</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-600">Original Value</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-600">{TYPE_LABELS[maType]}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.points.map((p, i) => (
                        <tr key={i}>
                          <td className="px-4 py-1.5 font-mono text-gray-500">{p.index + 1}</td>
                          <td className="px-4 py-1.5 font-mono">{formatNum(p.value)}</td>
                          <td className="px-4 py-1.5 font-mono font-semibold text-primary">{formatNum(p.ma)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
              <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
              <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download JSON</button>
              <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Print Report</button>
              <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors ml-auto">{showHistory ? "Hide" : "Show"} History</button>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recent Calculations</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => { setInput(entry.input); setMaType(entry.type); setWindowSize(entry.window); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{TYPE_LABELS[entry.type]} · Window {entry.window}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{entry.result.count} values · avg {formatNum(entry.result.average)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <MovingAverageCalculatorSEO />

      <RelatedTools />
    </>
  );
}
