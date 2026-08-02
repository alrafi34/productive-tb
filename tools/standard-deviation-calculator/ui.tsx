"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, calculateStats, getSD, getVariance, debounce, formatNum,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, generateRandomSample, buildHistogram,
  type CalcType, type StatsResult, type HistoryEntry,
} from "./logic";
import { HistogramChart, BoxPlotChart, exportCanvasAsPng } from "./chart";
import StandardDeviationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 6, 8, 10];

export default function StandardDeviationCalculatorUI() {
  const [input, setInput] = useState("");
  const [calcType, setCalcType] = useState<CalcType>("sample");
  const [decimals, setDecimals] = useState(2);
  const [result, setResult] = useState<StatsResult | null>(null);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [chartView, setChartView] = useState<"histogram" | "boxplot">("histogram");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const runRef = useRef(debounce((text: string, dec: number) => {
    const { values, invalidTokens: invalid } = parseDataset(text);
    setInvalidTokens(invalid);
    setResult(calculateStats(values, dec));
  }, 150));
  const persistRef = useRef(debounce((text: string, ct: CalcType, dec: number) => saveInput(text, ct, dec), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setInput(saved.text);
      setCalcType(saved.calcType);
      setDecimals(saved.decimals);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(input, decimals); }, [input, decimals]);
  useEffect(() => { persistRef.current(input, calcType, decimals); }, [input, calcType, decimals]);

  const handleClear = () => {
    setInput(""); setResult(null); setInvalidTokens([]); setFileError(null);
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

  const handleSample = () => {
    setInput(generateRandomSample());
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
    navigator.clipboard.writeText(buildTextReport(result, calcType));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "standard-deviation-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, calcType)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "standard-deviation-results.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, calcType)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "standard-deviation-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadChart = () => {
    exportCanvasAsPng(chartContainerRef.current, `${chartView}-chart.png`);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input, calcType, result });
    setHistory(getHistory());
  };

  const sd = result ? getSD(result, calcType) : 0;
  const variance = result ? getVariance(result, calcType) : 0;
  const histogramBins = result ? buildHistogram(result.sorted, Math.min(10, Math.max(3, Math.ceil(Math.sqrt(result.count))))) : [];

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
                placeholder={"Enter numbers separated by commas, spaces, or new lines.\n\nExample:\n12, 15, 18, 20, 25"}
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

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Calculation Type</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["sample", "population"] as CalcType[]).map((ct) => (
                      <button key={ct} type="button" onClick={() => setCalcType(ct)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          calcType === ct ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}>
                        {ct === "sample" ? "Sample" : "Population"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="sdc-precision">Decimal Precision</label>
                  <select id="sdc-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                    {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to clear, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> for a new example</p>
            </div>

            {/* Statistics panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Statistics</h3>
              </div>
              {result ? (
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-50">
                  {[
                    ["Count", result.count],
                    ["Sum", formatNum(result.sum)],
                    ["Mean", formatNum(result.mean)],
                    ["Median", formatNum(result.median)],
                    ["Mode", result.mode.length ? result.mode.slice(0, 3).join(", ") : "None"],
                    ["Min / Max", `${formatNum(result.min)} / ${formatNum(result.max)}`],
                    ["Range", formatNum(result.range)],
                    ["Q1 / Q3", `${formatNum(result.q1)} / ${formatNum(result.q3)}`],
                    ["Interquartile Range", formatNum(result.iqr)],
                    ["Coefficient of Variation", `${formatNum(result.coefficientOfVariation)}%`],
                    ["Standard Error", formatNum(result.standardError)],
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
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {calcType === "sample" ? "Sample" : "Population"} Standard Deviation
              </p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{formatNum(sd)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">Variance</p>
                      <p className="text-lg font-bold font-mono">{formatNum(variance)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">Mean</p>
                      <p className="text-lg font-bold font-mono">{formatNum(result.mean)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    {calcType === "sample"
                      ? `s = √(Σ(x − x̄)² ÷ (n − 1)) — using n − 1 = ${result.count - 1} degrees of freedom`
                      : `σ = √(Σ(x − μ)² ÷ N) — dividing by the full population count N = ${result.count}`}
                  </p>

                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Full Report"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter or paste a dataset on the left to calculate standard deviation.</p>
              )}
            </div>

            {/* Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex gap-1.5">
                    {(["histogram", "boxplot"] as const).map((v) => (
                      <button key={v} onClick={() => setChartView(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${chartView === v ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {v === "histogram" ? "Histogram" : "Box Plot"}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleDownloadChart} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download PNG</button>
                </div>
                <div ref={chartContainerRef} className="p-5">
                  {chartView === "histogram" ? (
                    <HistogramChart bins={histogramBins} mean={result.mean} median={result.median} stdDev={sd} />
                  ) : (
                    <BoxPlotChart min={result.min} q1={result.q1} median={result.median} q3={result.q3} max={result.max} mean={result.mean} />
                  )}
                </div>
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
              <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download TXT</button>
              <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
              <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download JSON</button>
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
                    <div key={entry.id} onClick={() => { setInput(entry.input); setCalcType(entry.calcType); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">SD: {formatNum(getSD(entry.result, entry.calcType))}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{entry.result.count} values · {entry.calcType}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <StandardDeviationCalculatorSEO />

      <RelatedTools
        currentTool="standard-deviation-calculator"
        tools={[
          "mean-calculator",
          "median-calculator",
          "data-growth-calculator",
          "etl-throughput-calculator",
          "storage-requirement-calculator",
          "session-duration-calculator",
        ]}
      />
    </>
  );
}
