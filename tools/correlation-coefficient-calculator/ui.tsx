"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  pairSeries, calculateCorrelation, detectOutliers, detectDuplicatePairs, isKendallCapped,
  debounce, formatNum, saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  SAMPLE_DATASETS, generateRandomDataset, parseCSV, extractColumn,
  type CorrelationMethod, type CorrelationResult, type HistoryEntry, type CSVParseResult,
} from "./logic";
import { ScatterPlot, exportCanvasAsPng, buildScatterSVG } from "./chart";
import CorrelationCoefficientCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [2, 3, 4, 5, 6];
const METHOD_LABELS: Record<CorrelationMethod, string> = { pearson: "Pearson", spearman: "Spearman Rank", kendall: "Kendall Tau" };

export default function CorrelationCoefficientCalculatorUI() {
  const [xText, setXText] = useState("");
  const [yText, setYText] = useState("");
  const [method, setMethod] = useState<CorrelationMethod>("pearson");
  const [decimals, setDecimals] = useState(4);
  const [result, setResult] = useState<CorrelationResult | null>(null);
  const [pairInfo, setPairInfo] = useState<{ invalidX: string[]; invalidY: string[]; lengthMismatch: boolean; count: number }>({ invalidX: [], invalidY: [], lengthMismatch: false, count: 0 });
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [csvPreview, setCsvPreview] = useState<CSVParseResult | null>(null);
  const [colX, setColX] = useState(0);
  const [colY, setColY] = useState(1);

  const xRef = useRef<HTMLTextAreaElement>(null);
  const yRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const [x, setX] = useState<number[]>([]);
  const [y, setY] = useState<number[]>([]);

  const runRef = useRef(debounce((xt: string, yt: string, m: CorrelationMethod) => {
    const paired = pairSeries(xt, yt);
    setPairInfo({ invalidX: paired.invalidX, invalidY: paired.invalidY, lengthMismatch: paired.lengthMismatch, count: paired.x.length });
    setX(paired.x);
    setY(paired.y);
    setResult(calculateCorrelation(paired.x, paired.y, m));
  }, 150));
  const persistRef = useRef(debounce((xt: string, yt: string, m: CorrelationMethod, dec: number) => saveInput(xt, yt, m, dec), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setXText(saved.xText); setYText(saved.yText); setMethod(saved.method); setDecimals(saved.decimals);
    } else {
      xRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(xText, yText, method); }, [xText, yText, method]);
  useEffect(() => { persistRef.current(xText, yText, method, decimals); }, [xText, yText, method, decimals]);

  const handleClear = () => {
    setXText(""); setYText(""); setResult(null); setFileError(null); setCsvPreview(null);
    xRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClear(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "l") { e.preventDefault(); handleLoadSample(SAMPLE_DATASETS[0]); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadSample = (sample: { x: string; y: string }) => {
    setXText(sample.x); setYText(sample.y); setShowSamples(false);
  };

  const handleRandomSample = () => {
    const s = generateRandomDataset();
    setXText(s.x); setYText(s.y); setShowSamples(false);
  };

  const loadFile = (file: File) => {
    setFileError(null); setCsvPreview(null);
    if (!/\.(csv|txt)$/i.test(file.name)) { setFileError("Please upload a .csv or .txt file."); return; }
    if (file.size > 5 * 1024 * 1024) { setFileError("File is too large. Maximum size is 5MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result);
      const parsed = parseCSV(text);
      if (parsed.numericColumns.length >= 2) {
        setCsvPreview(parsed);
        setColX(parsed.numericColumns[0]);
        setColY(parsed.numericColumns[1]);
      } else {
        setFileError("Could not find two numeric columns in this file.");
      }
    };
    reader.onerror = () => setFileError("This file could not be read.");
    reader.readAsText(file);
  };

  const applyCsvColumns = () => {
    if (!csvPreview) return;
    setXText(extractColumn(csvPreview, colX));
    setYText(extractColumn(csvPreview, colY));
    setCsvPreview(null);
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
    navigator.clipboard.writeText(buildTextReport(result, x, y));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, x, y)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "correlation-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, x, y)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "correlation-results.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result));
    win.document.close();
    win.print();
  };

  const handleDownloadPng = () => exportCanvasAsPng(chartContainerRef.current, "correlation-scatter-plot.png");

  const handleDownloadSvg = () => {
    if (!result) return;
    const svg = buildScatterSVG(x, y, result.slope, result.intercept, outliers);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "correlation-scatter-plot.svg"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ xText, yText, method, result });
    setHistory(getHistory());
  };

  const outliers = result ? detectOutliers(x, y, result.slope, result.intercept) : [];
  const duplicates = detectDuplicatePairs(x, y);
  const kendallCapped = method === "kendall" && isKendallCapped(pairInfo.count);

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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Variable X</label>
                  <textarea
                    ref={xRef}
                    rows={7}
                    value={xText}
                    onChange={(e) => setXText(e.target.value)}
                    placeholder={"1\n2\n3\n4\n5"}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Variable Y</label>
                  <textarea
                    ref={yRef}
                    rows={7}
                    value={yText}
                    onChange={(e) => setYText(e.target.value)}
                    placeholder={"2\n4\n6\n8\n10"}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                  />
                </div>
              </div>
              <p className="text-[11px] text-gray-400">One value per line in each box, or drag &amp; drop a CSV / TXT file to auto-detect two numeric columns.</p>

              {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
              {pairInfo.lengthMismatch && (
                <p className="text-xs text-amber-600" role="alert">⚠️ Variable X and Variable Y must contain the same number of values. Using the first {pairInfo.count} paired rows.</p>
              )}
              {pairInfo.invalidX.length + pairInfo.invalidY.length > 0 && (
                <p className="text-xs text-amber-600">⚠️ Ignored {pairInfo.invalidX.length + pairInfo.invalidY.length} non-numeric line(s).</p>
              )}
              {pairInfo.count === 1 && (
                <p className="text-xs text-red-600" role="alert">A minimum of two observations is required.</p>
              )}
              {duplicates > 0 && result && (
                <p className="text-xs text-gray-400">ℹ️ {duplicates} duplicate (X, Y) pair{duplicates === 1 ? "" : "s"} detected.</p>
              )}

              {csvPreview && (
                <div className="border-2 border-primary/30 bg-primary/5 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Choose columns to import</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Column → X</label>
                      <select value={colX} onChange={(e) => setColX(parseInt(e.target.value, 10))} className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-xs bg-white">
                        {csvPreview.headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Column → Y</label>
                      <select value={colY} onChange={(e) => setColY(parseInt(e.target.value, 10))} className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-xs bg-white">
                        {csvPreview.headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={applyCsvColumns} className="px-3 py-1.5 bg-primary text-white rounded-md text-xs font-semibold">Use These Columns</button>
                    <button onClick={() => setCsvPreview(null)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">Cancel</button>
                  </div>
                </div>
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

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Method</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["pearson", "spearman", "kendall"] as CorrelationMethod[]).map((m) => (
                      <button key={m} type="button" onClick={() => setMethod(m)}
                        className={`px-1.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                          method === m ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}>
                        {m === "pearson" ? "Pearson" : m === "spearman" ? "Spearman" : "Kendall"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="ccc-precision">Decimal Precision</label>
                  <select id="ccc-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                    {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              {kendallCapped && (
                <p className="text-[11px] text-amber-600">ℹ️ Kendall Tau is computed on the first 3,000 pairs for performance on very large datasets.</p>
              )}
              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to clear, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> for a sample dataset</p>
            </div>

            {/* Statistics panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Statistics</h3>
              </div>
              {result ? (
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-50">
                  {[
                    ["Sample Size (n)", result.n],
                    ["Mean X", formatNum(result.meanX, decimals)],
                    ["Mean Y", formatNum(result.meanY, decimals)],
                    ["Variance X", formatNum(result.varianceX, decimals)],
                    ["Variance Y", formatNum(result.varianceY, decimals)],
                    ["Covariance", formatNum(result.covariance, decimals)],
                    ["R²", formatNum(result.rSquared, decimals)],
                    ["Outliers", outliers.length],
                  ].map(([label, value]) => (
                    <div key={label} className="px-4 py-3">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-400 text-sm">Enter paired data to see statistics</div>
              )}
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {METHOD_LABELS[method]} Correlation Coefficient
              </p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{formatNum(result.r, decimals)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">Interpretation</p>
                      <p className="text-sm font-bold">{result.interpretation}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">R² (Coefficient of Determination)</p>
                      <p className="text-lg font-bold font-mono">{formatNum(result.rSquared, decimals)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-primary-100 mb-4 font-mono">
                    Regression Line: Y = {formatNum(result.intercept, 3)} + {formatNum(result.slope, 3)}X
                  </p>

                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Full Report"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter paired X and Y data on the left to calculate correlation.</p>
              )}
            </div>

            {/* Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Scatter Plot with Regression Line</h3>
                  <div className="flex gap-2">
                    <button onClick={handleDownloadPng} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">PNG</button>
                    <button onClick={handleDownloadSvg} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">SVG</button>
                  </div>
                </div>
                <div ref={chartContainerRef} className="p-5">
                  <ScatterPlot x={x} y={y} slope={result.slope} intercept={result.intercept} outliers={outliers} />
                </div>
                {outliers.length > 0 && (
                  <div className="px-5 pb-4 text-xs text-gray-500">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 mr-1.5 align-middle" />
                    {outliers.length} point{outliers.length === 1 ? "" : "s"} highlighted as statistical outlier{outliers.length === 1 ? "" : "s"} (residual z-score &gt; 2)
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
                    <div key={entry.id} onClick={() => { setXText(entry.xText); setYText(entry.yText); setMethod(entry.method); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">r = {formatNum(entry.result.r, 4)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{entry.result.n} pairs · {METHOD_LABELS[entry.method]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <CorrelationCoefficientCalculatorSEO />

      <RelatedTools />
    </>
  );
}
