"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, normalize, debounce, formatNum, generateSampleDataset,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport,
  NORM_METHODS, PRECISION_OPTIONS, DEFAULT_PRECISION,
  type NormMethod, type NormalizationResult, type HistoryEntry,
} from "./logic";
import { BeforeAfterChart, exportCanvasAsPng } from "./chart";
import DataNormalizationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DataNormalizationCalculatorUI() {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState<NormMethod>("minmax");
  const [customMin, setCustomMin] = useState("0");
  const [customMax, setCustomMax] = useState("1");
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [result, setResult] = useState<NormalizationResult | null>(null);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const runRef = useRef(debounce((text: string, m: NormMethod, min: string, max: string) => {
    const { values, invalidTokens: invalid } = parseDataset(text);
    setInvalidTokens(invalid);
    setResult(normalize(values, m, parseFloat(min), parseFloat(max)));
  }, 150));
  const persistRef = useRef(debounce((text: string, m: NormMethod) => saveInput(text, m), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setInput(saved.input);
      setMethod(saved.method);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(input, method, customMin, customMax); }, [input, method, customMin, customMax]);
  useEffect(() => { persistRef.current(input, method); }, [input, method]);

  const handleClear = () => {
    setInput(""); setResult(null); setInvalidTokens([]); setFileError(null);
    textareaRef.current?.focus();
  };

  const handleSample = () => {
    setInput(generateSampleDataset());
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClear(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "l") { e.preventDefault(); handleSample(); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleCopy = () => {
    if (!result || result.error) return;
    navigator.clipboard.writeText(result.normalized.map((v) => formatNum(v, precision)).join(", "));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result || result.error) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "data-normalization-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result || result.error) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "data-normalization-results.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result || result.error) return;
    const blob = new Blob([buildTextReport(result, precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "data-normalization-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadChart = () => {
    exportCanvasAsPng(chartContainerRef.current, "normalization-comparison.png");
  };

  const handleSave = () => {
    if (!result || result.error) return;
    saveHistory(input, method);
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
                rows={7}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"Enter numbers separated by commas, spaces, or new lines.\n\nExample:\n10, 20, 30, 40, 50"}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
              />
              <p className="text-[11px] text-gray-400">Or drag &amp; drop a CSV / TXT file anywhere in this box. Supports decimals, negatives, and scientific notation.</p>
              {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
              {invalidTokens.length > 0 && (
                <p className="text-xs text-amber-600">⚠️ Ignored {invalidTokens.length} invalid value{invalidTokens.length === 1 ? "" : "s"}: <span className="font-mono">{invalidTokens.slice(0, 8).join(", ")}{invalidTokens.length > 8 ? "…" : ""}</span></p>
              )}

              <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                <button onClick={handleSample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Load Example</button>
                <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Import CSV</button>
                <input ref={fileInputRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={handleFileInput} className="hidden" />
                <button onClick={handleClear} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Clear</button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dnc-method">Normalization Method</label>
                <select id="dnc-method" value={method} onChange={(e) => setMethod(e.target.value as NormMethod)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {NORM_METHODS.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
                </select>
              </div>

              {method === "minmax-custom" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dnc-min">Target Min</label>
                    <input id="dnc-min" type="number" value={customMin} onChange={(e) => setCustomMin(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dnc-max">Target Max</label>
                    <input id="dnc-max" type="number" value={customMax} onChange={(e) => setCustomMax(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dnc-precision">Decimal Precision</label>
                <select id="dnc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                  {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p} decimals</option>)}
                </select>
              </div>

              {result?.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to clear, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> for a new example</p>
            </div>

            {/* Original stats */}
            {result && !result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Original vs. Normalized Statistics</h3>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-50 text-xs">
                  <div className="divide-y divide-gray-50">
                    <div className="px-4 py-2 font-semibold text-gray-500 bg-gray-50/50">Original</div>
                    {[
                      ["Count", result.originalStats.count],
                      ["Min", formatNum(result.originalStats.min, precision)],
                      ["Max", formatNum(result.originalStats.max, precision)],
                      ["Mean", formatNum(result.originalStats.mean, precision)],
                      ["Median", formatNum(result.originalStats.median, precision)],
                      ["Std Dev", formatNum(result.originalStats.stdDev, precision)],
                    ].map(([label, value]) => (
                      <div key={label} className="px-4 py-2 flex justify-between">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-mono font-semibold text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="divide-y divide-gray-50">
                    <div className="px-4 py-2 font-semibold text-primary bg-gray-50/50">Normalized</div>
                    {[
                      ["Count", result.normalizedStats.count],
                      ["Min", formatNum(result.normalizedStats.min, precision)],
                      ["Max", formatNum(result.normalizedStats.max, precision)],
                      ["Mean", formatNum(result.normalizedStats.mean, precision)],
                      ["Median", formatNum(result.normalizedStats.median, precision)],
                      ["Std Dev", formatNum(result.normalizedStats.stdDev, precision)],
                    ].map(([label, value]) => (
                      <div key={label} className="px-4 py-2 flex justify-between">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-mono font-semibold text-primary">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {result.decimalScalingFactor !== null && (
                  <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-50">Scaling factor: ÷{result.decimalScalingFactor.toLocaleString("en-US")}</div>
                )}
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {NORM_METHODS.find((m) => m.key === method)?.label}
              </p>
              {result && !result.error ? (
                <>
                  <p className="text-sm text-primary-100 mb-3">{result.normalized.length} values normalized</p>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {result.normalized.slice(0, 40).map((v, i) => (
                      <span key={i} className="bg-white/10 rounded px-2 py-1 text-xs font-mono">{formatNum(v, precision)}</span>
                    ))}
                    {result.normalized.length > 40 && <span className="text-xs text-primary-100 px-2 py-1">+{result.normalized.length - 40} more</span>}
                  </div>

                  <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Normalized Dataset"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter or paste a dataset on the left to normalize it.</p>
              )}
            </div>

            {/* Chart */}
            {result && !result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Before / After Comparison</h3>
                  <button onClick={handleDownloadChart} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download PNG</button>
                </div>
                <div ref={chartContainerRef} className="p-5">
                  <BeforeAfterChart original={result.original} normalized={result.normalized} />
                </div>
              </div>
            )}

            {/* Results table */}
            {result && !result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Results Table</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-gray-100 text-xs text-gray-500">
                        <th className="text-left py-2 px-4 font-medium">#</th>
                        <th className="text-left py-2 px-4 font-medium">Original</th>
                        <th className="text-left py-2 px-4 font-medium">Normalized</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.original.map((v, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="py-1.5 px-4 text-gray-400 text-xs">{i + 1}</td>
                          <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(v, precision)}</td>
                          <td className="py-1.5 px-4 font-mono text-primary font-semibold">{formatNum(result.normalized[i], precision)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
              <button onClick={handleDownloadTxt} disabled={!result || !!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download TXT</button>
              <button onClick={handleDownloadCsv} disabled={!result || !!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
              <button onClick={handleDownloadJson} disabled={!result || !!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download JSON</button>
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
                    <div key={entry.id} onClick={() => { setInput(entry.input); setMethod(entry.method); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{NORM_METHODS.find((m) => m.key === entry.method)?.label}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono truncate">{entry.input.slice(0, 60)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <DataNormalizationCalculatorSEO />

      <RelatedTools
        currentTool="data-normalization-calculator"
        tools={[
          "min-max-scaling-calculator",
          "log-transformation-calculator",
          "standard-deviation-calculator",
          "z-score-calculator",
          "mean-calculator",
          "variance-calculator",
        ]}
      />
    </>
  );
}
