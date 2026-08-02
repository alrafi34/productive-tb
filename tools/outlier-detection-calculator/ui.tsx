"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, detectOutliers, cleanDataset, debounce, formatNum,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  SAMPLE_DATASETS, generateRandomSample, METHODS,
  type OutlierMethod, type OutlierResult, type HistoryEntry, type SavedInput,
} from "./logic";
import { OutlierChart, OutlierBoxPlot, OutlierHistogram } from "./chart";
import OutlierDetectionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type ChartTab = "dotplot" | "boxplot" | "histogram";

export default function OutlierDetectionCalculatorUI() {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState<OutlierMethod>("iqr");
  const [threshold, setThreshold] = useState(1.5);
  const [lowerPercentile, setLowerPercentile] = useState(1);
  const [upperPercentile, setUpperPercentile] = useState(99);
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");
  const [decimals, setDecimals] = useState(2);

  const [result, setResult] = useState<OutlierResult | null>(null);
  const [values, setValues] = useState<number[]>([]);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [cleanCopied, setCleanCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [chartTab, setChartTab] = useState<ChartTab>("dotplot");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentInput = (): SavedInput => ({
    text: input, method, threshold, lowerPercentile, upperPercentile, customMin, customMax, decimals,
  });

  const runRef = useRef(debounce((si: SavedInput) => {
    const { values: vals, invalidTokens: invalid } = parseDataset(si.text);
    setInvalidTokens(invalid);
    setValues(vals);

    if (vals.length < 4) {
      setResult(null);
      setValidationError(vals.length === 0 ? "No valid numeric data found." : "At least four observations are recommended for reliable outlier detection.");
      return;
    }
    setValidationError(null);
    setResult(detectOutliers(vals, {
      method: si.method, threshold: si.threshold,
      lowerPercentile: si.lowerPercentile, upperPercentile: si.upperPercentile,
      customMin: si.customMin.trim() === "" ? null : parseFloat(si.customMin),
      customMax: si.customMax.trim() === "" ? null : parseFloat(si.customMax),
      decimals: si.decimals,
    }));
  }, 150));

  const persistRef = useRef(debounce((si: SavedInput) => saveInput(si), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setInput(saved.text); setMethod(saved.method); setThreshold(saved.threshold);
      setLowerPercentile(saved.lowerPercentile ?? 1); setUpperPercentile(saved.upperPercentile ?? 99);
      setCustomMin(saved.customMin ?? ""); setCustomMax(saved.customMax ?? "");
      setDecimals(saved.decimals);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const si = currentInput();
    runRef.current(si);
    persistRef.current(si);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, method, threshold, lowerPercentile, upperPercentile, customMin, customMax, decimals]);

  const handleMethodChange = (m: OutlierMethod) => {
    setMethod(m);
    setThreshold(METHODS.find((x) => x.id === m)!.defaultThreshold);
  };

  const handleClear = () => {
    setInput(""); setResult(null); setValues([]); setInvalidTokens([]); setFileError(null);
    setValidationError(null);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClear(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "l") { e.preventDefault(); handleRandomSample(); return; }
      if (e.ctrlKey && e.key === "Enter") { e.preventDefault(); textareaRef.current?.blur(); return; }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadSample = (sample: { text: string; method: OutlierMethod }) => {
    setInput(sample.text);
    handleMethodChange(sample.method);
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

  const handleCopyClean = () => {
    if (!result) return;
    navigator.clipboard.writeText(cleanDataset(result).join(", "));
    setCleanCopied(true); setTimeout(() => setCleanCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "outlier-detection-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "outlier-detection-results.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result));
    win.document.close();
    win.print();
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input: currentInput(), outlierCount: result.outlierCount });
    setHistory(getHistory());
  };

  const currentMethod = METHODS.find((m) => m.id === method)!;

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
                placeholder={"Enter numbers separated by commas, spaces, or new lines.\n\nExample:\n62, 65, 68, 70, 72, 75, 78, 80, 15, 85"}
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
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Detection Method</h3>
              <select value={method} onChange={(e) => handleMethodChange(e.target.value as OutlierMethod)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent">
                {METHODS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>

              {(method === "iqr" || method === "zscore" || method === "modified-zscore") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="od-threshold" className="text-xs font-medium text-gray-600">{currentMethod.thresholdLabel}</label>
                    <span className="text-xs font-mono font-semibold text-primary">{threshold}</span>
                  </div>
                  <input id="od-threshold" type="range" min={method === "iqr" ? 0.5 : 1} max={method === "iqr" ? 4 : 5} step={0.1} value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))} className="w-full accent-primary" />
                </div>
              )}

              {method === "percentile" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="od-plower" className="block text-xs font-medium text-gray-600 mb-1">Lower Percentile</label>
                    <input id="od-plower" type="number" min={0} max={49} value={lowerPercentile}
                      onChange={(e) => setLowerPercentile(Math.max(0, Math.min(49, parseFloat(e.target.value) || 0)))}
                      className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs font-mono" />
                  </div>
                  <div>
                    <label htmlFor="od-pupper" className="block text-xs font-medium text-gray-600 mb-1">Upper Percentile</label>
                    <input id="od-pupper" type="number" min={51} max={100} value={upperPercentile}
                      onChange={(e) => setUpperPercentile(Math.max(51, Math.min(100, parseFloat(e.target.value) || 100)))}
                      className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs font-mono" />
                  </div>
                </div>
              )}

              {method === "custom" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="od-cmin" className="block text-xs font-medium text-gray-600 mb-1">Minimum</label>
                    <input id="od-cmin" type="number" value={customMin} placeholder="No limit"
                      onChange={(e) => setCustomMin(e.target.value)}
                      className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs font-mono" />
                  </div>
                  <div>
                    <label htmlFor="od-cmax" className="block text-xs font-medium text-gray-600 mb-1">Maximum</label>
                    <input id="od-cmax" type="number" value={customMax} placeholder="No limit"
                      onChange={(e) => setCustomMax(e.target.value)}
                      className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs font-mono" />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="od-precision" className="block text-xs font-medium text-gray-600 mb-1">Decimal Precision</label>
                <select id="od-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                  {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> for a random dataset</p>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>{currentMethod.label}</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <span className="text-4xl font-bold font-mono tabular-nums">{result.outlierCount}</span>
                    <span className="text-sm text-primary-100">outlier{result.outlierCount === 1 ? "" : "s"} ({formatNum(result.outlierPct)}%)</span>
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    {result.lowerBound !== null
                      ? `Bounds: ${formatNum(result.lowerBound)} to ${formatNum(result.upperBound as number)}`
                      : `Mean ${formatNum(result.mean)}, Median ${formatNum(result.median)}`} · n = {result.points.length}
                  </p>
                  <div className="space-y-2">
                    <button onClick={handleCopyReport} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleCopyClean} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{cleanCopied ? "✓ Copied!" : "Copy Clean Dataset"}</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter a dataset on the left to detect outliers.</p>
              )}
            </div>

            {/* Charts */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-1.5">
                  {([["dotplot", "Dot Plot"], ["boxplot", "Box Plot"], ["histogram", "Histogram"]] as [ChartTab, string][]).map(([id, label]) => (
                    <button key={id} onClick={() => setChartTab(id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${chartTab === id ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      {label}
                    </button>
                  ))}
                </div>
                <div className="p-5">
                  {chartTab === "dotplot" && <OutlierChart points={result.points} lowerBound={result.lowerBound} upperBound={result.upperBound} />}
                  {chartTab === "boxplot" && <OutlierBoxPlot min={result.min} q1={result.q1} median={result.median} q3={result.q3} max={result.max} outliers={result.outliers} />}
                  {chartTab === "histogram" && <OutlierHistogram points={result.points} />}
                </div>
              </div>
            )}

            {/* Stats panel */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Summary Statistics</h3>
                </div>
                <div className="grid grid-cols-3 divide-x divide-y divide-gray-50">
                  {[
                    ["Mean", formatNum(result.mean)],
                    ["Median", formatNum(result.median)],
                    ["Mode", result.mode.length ? result.mode.map(formatNum).join(", ") : "None"],
                    ["Min", formatNum(result.min)],
                    ["Max", formatNum(result.max)],
                    ["Range", formatNum(result.range)],
                    ["Std Dev", formatNum(result.stdDev)],
                    ["Variance", formatNum(result.variance)],
                    ["MAD", formatNum(result.mad)],
                    ["Q1 / Q3", `${formatNum(result.q1)} / ${formatNum(result.q3)}`],
                    ["IQR", formatNum(result.iqr)],
                    ["Valid / Invalid", `${result.points.length} / ${invalidTokens.length}`],
                  ].map(([label, value]) => (
                    <div key={label} className="px-4 py-3 border-b border-gray-50">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Points table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowTable(!showTable)} className="w-full p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>All Values &amp; Scores</h3>
                  <span className="text-xs text-gray-400">{showTable ? "Hide ▲" : "Show ▼"}</span>
                </button>
                {showTable && (
                  <div className="max-h-72 overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Index</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Value</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Score</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {result.points.map((p) => (
                          <tr key={p.index} className={p.isOutlier ? "bg-red-50" : ""}>
                            <td className="px-4 py-1.5 font-mono text-gray-500">{p.index + 1}</td>
                            <td className={`px-4 py-1.5 font-mono ${p.isOutlier ? "font-semibold text-red-700" : ""}`}>{formatNum(p.value)}</td>
                            <td className="px-4 py-1.5 font-mono">{formatNum(p.score)}</td>
                            <td className="px-4 py-1.5">{p.isOutlier ? <span className="text-red-600 font-semibold">Outlier</span> : <span className="text-green-600">Normal</span>}</td>
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
                      const i = entry.input;
                      setInput(i.text); setMethod(i.method); setThreshold(i.threshold);
                      setLowerPercentile(i.lowerPercentile ?? 1); setUpperPercentile(i.upperPercentile ?? 99);
                      setCustomMin(i.customMin ?? ""); setCustomMax(i.customMax ?? "");
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.outlierCount} outlier{entry.outlierCount === 1 ? "" : "s"}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{METHODS.find((m) => m.id === entry.input.method)?.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <OutlierDetectionCalculatorSEO />

      <RelatedTools
        currentTool="outlier-detection-calculator"
        tools={[
          "standard-deviation-calculator",
          "percentile-calculator",
          "histogram-bin-calculator",
          "mean-calculator",
          "median-calculator",
          "z-score-calculator",
        ]}
      />
    </>
  );
}
