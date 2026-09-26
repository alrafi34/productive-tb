"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, calculateHistogram, debounce, formatNum,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  SAMPLE_DATASETS, generateRandomSample, BIN_METHODS,
  type BinMethod, type HistogramResult, type HistoryEntry,
} from "./logic";
import { HistogramBarChart, exportCanvasAsPng } from "./chart";
import HistogramBinCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function HistogramBinCalculatorUI() {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState<BinMethod>("auto");
  const [manualCount, setManualCount] = useState(10);
  const [decimals, setDecimals] = useState(2);
  const [chartWidth, setChartWidth] = useState(700);
  const [showStats, setShowStats] = useState(true);
  const [showComparison, setShowComparison] = useState(true);

  const [result, setResult] = useState<HistogramResult | null>(null);
  const [values, setValues] = useState<number[]>([]);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const runRef = useRef(debounce((text: string, m: BinMethod, mc: number, dec: number) => {
    const { values: vals, invalidTokens: invalid } = parseDataset(text);
    setInvalidTokens(invalid);
    setValues(vals);

    if (vals.length < 2) {
      setResult(null);
      setValidationError(vals.length === 0 ? "No valid numeric data found." : "At least two observations are required.");
      return;
    }
    setValidationError(null);
    setResult(calculateHistogram(vals, m, mc, dec));
  }, 150));

  const persistRef = useRef(debounce((text: string, m: BinMethod, mc: number, dec: number) => {
    saveInput({ text, method: m, manualCount: mc, decimals: dec });
  }, 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setInput(saved.text); setMethod(saved.method); setManualCount(saved.manualCount); setDecimals(saved.decimals);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runRef.current(input, method, manualCount, decimals);
  }, [input, method, manualCount, decimals]);

  useEffect(() => {
    persistRef.current(input, method, manualCount, decimals);
  }, [input, method, manualCount, decimals]);

  const handleClear = () => {
    setInput(""); setResult(null); setValues([]); setInvalidTokens([]); setFileError(null);
    setValidationError(null);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClear(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "l") { e.preventDefault(); handleRandomSample(); return; }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadSample = (sample: { text: string; method: BinMethod }) => {
    setInput(sample.text); setMethod(sample.method);
    setShowSamples(false);
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

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, values));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "histogram-bins.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "histogram-bins.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result));
    win.document.close();
    win.print();
  };

  const handleDownloadPng = () => exportCanvasAsPng(chartContainerRef.current, "histogram-chart.png");

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input: { text: input, method, manualCount, decimals }, binCount: result.binCount });
    setHistory(getHistory());
  };

  const currentMethod = BIN_METHODS.find((m) => m.id === method)!;

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
                rows={7}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"Enter numbers separated by commas, spaces, or new lines.\n\nExample:\n55, 62, 68, 71, 75, 78, 82, 85, 90, 95"}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
              />
              <p className="text-[11px] text-gray-400">Or drag &amp; drop a CSV / TXT file anywhere in this box.</p>
              {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
              {validationError && <p className="text-xs text-red-600" role="alert">⚠️ {validationError}</p>}
              {invalidTokens.length > 0 && (
                <p className="text-xs text-amber-600">⚠️ Ignored {invalidTokens.length} invalid value{invalidTokens.length === 1 ? "" : "s"}.</p>
              )}

              <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100 relative">
                <button onClick={() => setShowSamples(!showSamples)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Load Example</button>
                <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Import CSV</button>
                <input ref={fileInputRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={handleFileInput} className="hidden" />
                <button onClick={handleClear} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Reset</button>

                {showSamples && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    {SAMPLE_DATASETS.map((s) => (
                      <button key={s.name} onClick={() => handleLoadSample(s)} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">{s.name}</button>
                    ))}
                    <button onClick={handleRandomSample} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors font-medium text-primary">Random Dataset</button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Binning Method</h3>
              <select value={method} onChange={(e) => setMethod(e.target.value as BinMethod)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent">
                {BIN_METHODS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
              <p className="text-xs text-gray-400 font-mono">{currentMethod.formula}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{currentMethod.description}</p>

              {method === "manual" && (
                <div>
                  <label htmlFor="hb-manual" className="block text-xs font-medium text-gray-600 mb-1">Bin Count</label>
                  <input id="hb-manual" type="number" min={1} max={200} value={manualCount}
                    onChange={(e) => setManualCount(Math.max(1, Math.min(200, parseInt(e.target.value, 10) || 1)))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              )}

              <div>
                <label htmlFor="hb-precision" className="block text-xs font-medium text-gray-600 mb-1">Decimal Precision</label>
                <select id="hb-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                  {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="hb-width" className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1">
                  <span>Histogram Width</span><span className="font-mono text-primary">{chartWidth}px</span>
                </label>
                <input id="hb-width" type="range" min={300} max={1000} step={10} value={chartWidth}
                  onChange={(e) => setChartWidth(parseInt(e.target.value, 10))} className="w-full accent-primary" />
              </div>
              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> for a random dataset</p>
            </div>
            {method === "auto" && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold text-primary">Auto mode:</span> every statistical method below is calculated, and the histogram uses the median bin count across all of them as the recommended value.
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>{currentMethod.label}</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-4 mb-3 flex-wrap">
                    <div>
                      <span className="text-3xl font-bold font-mono tabular-nums">{result.binCount}</span>
                      <span className="text-sm text-primary-100 ml-1.5">bins</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold font-mono tabular-nums">{formatNum(result.binWidth)}</span>
                      <span className="text-sm text-primary-100 ml-1.5">width</span>
                    </div>
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    Range: {formatNum(result.min)} – {formatNum(result.max)} · n = {result.n}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={handleCopyReport} className="flex-1 bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">Save</button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter a dataset on the left to generate a histogram.</p>
              )}
            </div>

            {/* Chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Frequency Distribution</h3>
                  <button onClick={handleDownloadPng} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">PNG</button>
                </div>
                <div ref={chartContainerRef} className="p-5">
                  <div style={{ maxWidth: chartWidth, margin: "0 auto" }}>
                    <HistogramBarChart bins={result.bins} maxCount={result.maxCount} />
                  </div>
                </div>
              </div>
            )}

            {/* Statistics panel */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowStats(!showStats)} className="w-full p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Descriptive Statistics</h3>
                  <span className="text-xs text-gray-400">{showStats ? "Hide ▲" : "Show ▼"}</span>
                </button>
                {showStats && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-px bg-gray-100">
                    {[
                      ["Sample Size (n)", result.stats.n],
                      ["Min", result.stats.min],
                      ["Max", result.stats.max],
                      ["Range", result.stats.range],
                      ["Mean", result.stats.mean],
                      ["Median", result.stats.median],
                      ["Variance", result.stats.variance],
                      ["Std. Deviation", result.stats.stdDev],
                      ["Q1", result.stats.q1],
                      ["Q3", result.stats.q3],
                      ["IQR", result.stats.iqr],
                      ["Skewness", result.stats.skewness],
                    ].map(([label, value]) => (
                      <div key={label as string} className="bg-white p-3 text-center">
                        <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                        <p className="text-sm font-bold font-mono text-gray-800">{formatNum(value as number)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Method comparison panel */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowComparison(!showComparison)} className="w-full p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Formula Comparison</h3>
                  <span className="text-xs text-gray-400">{showComparison ? "Hide ▲" : "Show ▼"}</span>
                </button>
                {showComparison && (
                  <div className="divide-y divide-gray-50">
                    {result.comparisons.map((c) => (
                      <button
                        key={c.method}
                        onClick={() => setMethod(c.method)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-gray-50 ${method === c.method ? "bg-primary/5" : ""}`}
                      >
                        <span className={method === c.method ? "text-primary font-semibold" : "text-gray-700"}>{c.label}</span>
                        <span className="font-mono text-gray-600">{c.binCount} bins</span>
                      </button>
                    ))}
                    <div className={`flex items-center justify-between px-4 py-2.5 text-sm ${method === "auto" ? "bg-primary/5" : "bg-gray-50/50"}`}>
                      <span className="font-semibold text-gray-800">Recommended (median)</span>
                      <span className="font-mono font-bold text-primary">{result.recommendedBinCount} bins</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bin table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowTable(!showTable)} className="w-full p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Bin Frequency Table</h3>
                  <span className="text-xs text-gray-400">{showTable ? "Hide ▲" : "Show ▼"}</span>
                </button>
                {showTable && (
                  <div className="max-h-72 overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Bin Range</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Count</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Frequency %</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {result.bins.map((b) => (
                          <tr key={b.index}>
                            <td className="px-4 py-1.5 font-mono text-gray-700">{b.label}</td>
                            <td className="px-4 py-1.5 font-mono font-semibold text-primary">{b.count}</td>
                            <td className="px-4 py-1.5 font-mono">{formatNum(b.frequency)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                    <div key={entry.id} onClick={() => {
                      setInput(entry.input.text); setMethod(entry.input.method); setManualCount(entry.input.manualCount);
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.binCount} bins</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{BIN_METHODS.find((m) => m.id === entry.input.method)?.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedStrip />
      <HistogramBinCalculatorSEO />

      <RelatedTools />
    </>
  );
}
