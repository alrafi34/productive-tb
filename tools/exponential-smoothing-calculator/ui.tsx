"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, computeSES, computeHolt, computeHoltWinters, isHoltWintersError,
  debounce, formatNum, saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  SAMPLE_DATASETS, generateRandomSample,
  type SmoothingMethod, type SeasonalType, type SmoothingResult, type HistoryEntry,
} from "./logic";
import { SmoothingChart, exportCanvasAsPng, copyCanvasToClipboard, buildChartSVG } from "./chart";
import ExponentialSmoothingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 2, 4, 6];
const METHOD_LABELS: Record<SmoothingMethod, string> = { ses: "Simple (SES)", holt: "Double (Holt)", "holt-winters": "Triple (Holt-Winters)" };
const METHOD_FULL_LABELS: Record<SmoothingMethod, string> = {
  ses: "Simple Exponential Smoothing",
  holt: "Holt's Double Exponential Smoothing",
  "holt-winters": "Holt-Winters Triple Exponential Smoothing",
};

export default function ExponentialSmoothingCalculatorUI() {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState<SmoothingMethod>("ses");
  const [alpha, setAlpha] = useState(0.3);
  const [beta, setBeta] = useState(0.2);
  const [gamma, setGamma] = useState(0.2);
  const [period, setPeriod] = useState(12);
  const [seasonalType, setSeasonalType] = useState<SeasonalType>("additive");
  const [forecastPeriods, setForecastPeriods] = useState(5);
  const [decimals, setDecimals] = useState(2);

  const [result, setResult] = useState<SmoothingResult | null>(null);
  const [hwError, setHwError] = useState<string | null>(null);
  const [values, setValues] = useState<number[]>([]);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [chartCopied, setChartCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [showActual, setShowActual] = useState(true);
  const [showSmoothed, setShowSmoothed] = useState(true);
  const [showForecast, setShowForecast] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const runRef = useRef(debounce((
    text: string, m: SmoothingMethod, a: number, b: number, g: number,
    p: number, st: SeasonalType, fp: number, dec: number
  ) => {
    const { values: vals, invalidTokens: invalid } = parseDataset(text);
    setInvalidTokens(invalid);
    setValues(vals);
    setHwError(null);

    if (vals.length < 2) {
      setResult(null);
      setValidationError(vals.length === 0 ? "No valid numeric data found." : "Minimum two observations required.");
      return;
    }
    setValidationError(null);

    if (m === "ses") {
      setResult(computeSES(vals, a, fp, dec));
    } else if (m === "holt") {
      setResult(computeHolt(vals, a, b, fp, dec));
    } else {
      const r = computeHoltWinters(vals, a, b, g, p, st, fp, dec);
      if (isHoltWintersError(r)) {
        setResult(null);
        setHwError(r.error);
      } else {
        setResult(r);
      }
    }
  }, 200));

  const persistRef = useRef(debounce((
    text: string, m: SmoothingMethod, a: number, b: number, g: number,
    p: number, st: SeasonalType, fp: number, dec: number
  ) => {
    saveInput({ text, method: m, alpha: a, beta: b, gamma: g, period: p, seasonalType: st, forecastPeriods: fp, decimals: dec });
  }, 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setInput(saved.text); setMethod(saved.method); setAlpha(saved.alpha); setBeta(saved.beta);
      setGamma(saved.gamma); setPeriod(saved.period); setSeasonalType(saved.seasonalType);
      setForecastPeriods(saved.forecastPeriods); setDecimals(saved.decimals);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runRef.current(input, method, alpha, beta, gamma, period, seasonalType, forecastPeriods, decimals);
  }, [input, method, alpha, beta, gamma, period, seasonalType, forecastPeriods, decimals]);

  useEffect(() => {
    persistRef.current(input, method, alpha, beta, gamma, period, seasonalType, forecastPeriods, decimals);
  }, [input, method, alpha, beta, gamma, period, seasonalType, forecastPeriods, decimals]);

  const handleClear = () => {
    setInput(""); setResult(null); setValues([]); setInvalidTokens([]); setFileError(null);
    setValidationError(null); setHwError(null);
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

  const handleLoadSample = (sample: { text: string; method: SmoothingMethod; period?: number }) => {
    setInput(sample.text); setMethod(sample.method);
    if (sample.period) setPeriod(sample.period);
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

  const handleCopyResults = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.points.map((p) => formatNum(p.smoothed)).join("\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyForecast = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.forecast.map((f) => `${f.period}: ${f.forecast}`).join("\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, alpha, beta, gamma));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = (excelCompatible: boolean) => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, excelCompatible)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = excelCompatible ? "exponential-smoothing-results-excel.csv" : "exponential-smoothing-results.csv";
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "exponential-smoothing-results.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result, alpha));
    win.document.close();
    win.print();
  };

  const handleDownloadPng = () => exportCanvasAsPng(chartContainerRef.current, "exponential-smoothing-chart.png");

  const handleDownloadSvg = () => {
    if (!result) return;
    const svg = buildChartSVG(result.points, result.forecast, showActual, showSmoothed, showForecast);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "exponential-smoothing-chart.svg"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleCopyChart = async () => {
    const ok = await copyCanvasToClipboard(chartContainerRef.current);
    if (ok) { setChartCopied(true); setTimeout(() => setChartCopied(false), 2000); }
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({
      input: { text: input, method, alpha, beta, gamma, period, seasonalType, forecastPeriods, decimals },
      finalLevel: result.finalLevel,
      method,
    });
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
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Time-Series Dataset</h3>
              <textarea
                ref={textareaRef}
                rows={7}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"Enter one value per line or comma-separated.\n\nExample:\n10, 15, 18, 20, 22, 24, 27, 30"}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
              />
              <p className="text-[11px] text-gray-400">Or drag &amp; drop a CSV / TXT file anywhere in this box.</p>
              {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
              {validationError && <p className="text-xs text-red-600" role="alert">⚠️ {validationError}</p>}
              {hwError && <p className="text-xs text-red-600" role="alert">⚠️ {hwError}</p>}
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

            {/* Method settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Smoothing Method</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {(["ses", "holt", "holt-winters"] as SmoothingMethod[]).map((m) => (
                  <button key={m} type="button" onClick={() => setMethod(m)}
                    className={`px-1.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                      method === m ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}>
                    {METHOD_LABELS[m]}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="esc-alpha" className="text-xs font-medium text-gray-600">Alpha (α)</label>
                  <span className="text-xs font-mono font-semibold text-primary">{alpha.toFixed(2)}</span>
                </div>
                <input id="esc-alpha" type="range" min={0.01} max={1} step={0.01} value={alpha}
                  onChange={(e) => setAlpha(parseFloat(e.target.value))} className="w-full accent-primary" />
              </div>

              {(method === "holt" || method === "holt-winters") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="esc-beta" className="text-xs font-medium text-gray-600">Beta (β)</label>
                    <span className="text-xs font-mono font-semibold text-primary">{beta.toFixed(2)}</span>
                  </div>
                  <input id="esc-beta" type="range" min={0.01} max={1} step={0.01} value={beta}
                    onChange={(e) => setBeta(parseFloat(e.target.value))} className="w-full accent-primary" />
                </div>
              )}

              {method === "holt-winters" && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="esc-gamma" className="text-xs font-medium text-gray-600">Gamma (γ)</label>
                      <span className="text-xs font-mono font-semibold text-primary">{gamma.toFixed(2)}</span>
                    </div>
                    <input id="esc-gamma" type="range" min={0.01} max={1} step={0.01} value={gamma}
                      onChange={(e) => setGamma(parseFloat(e.target.value))} className="w-full accent-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="esc-period" className="block text-xs font-medium text-gray-600 mb-1">Seasonal Period</label>
                      <input id="esc-period" type="number" min={2} value={period}
                        onChange={(e) => setPeriod(Math.max(2, parseInt(e.target.value, 10) || 2))}
                        className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs" />
                    </div>
                    <div>
                      <label htmlFor="esc-seasonal-type" className="block text-xs font-medium text-gray-600 mb-1">Seasonality</label>
                      <select id="esc-seasonal-type" value={seasonalType} onChange={(e) => setSeasonalType(e.target.value as SeasonalType)}
                        className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                        <option value="additive">Additive</option>
                        <option value="multiplicative">Multiplicative</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <div>
                  <label htmlFor="esc-forecast" className="block text-xs font-medium text-gray-600 mb-1">Forecast Periods</label>
                  <input id="esc-forecast" type="number" min={1} max={100} value={forecastPeriods}
                    onChange={(e) => setForecastPeriods(Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)))}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs" />
                </div>
                <div>
                  <label htmlFor="esc-precision" className="block text-xs font-medium text-gray-600 mb-1">Precision</label>
                  <select id="esc-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                    {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> for a random dataset</p>
            </div>

            {/* Statistics panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Summary Statistics</h3>
              </div>
              {result ? (
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-50">
                  {[
                    ["MAE", formatNum(result.mae)],
                    ["RMSE", formatNum(result.rmse)],
                    ["MAPE", `${formatNum(result.mape)}%`],
                    ["Final Level", formatNum(result.finalLevel)],
                    ...(result.finalTrend !== null ? [["Final Trend", formatNum(result.finalTrend)]] : []),
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
                {METHOD_FULL_LABELS[method]}
              </p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                    {result.forecast.slice(0, 5).map((f, i) => (
                      <span key={i} className="text-2xl font-bold font-mono tabular-nums bg-white/10 rounded-lg px-3 py-1">{formatNum(f.forecast)}</span>
                    ))}
                    {result.forecast.length > 5 && <span className="text-sm text-primary-100">+{result.forecast.length - 5} more</span>}
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    {result.forecast.length} forecast period{result.forecast.length === 1 ? "" : "s"} generated from {values.length} observations
                  </p>

                  <div className="space-y-2">
                    <button onClick={handleCopyForecast} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Forecast"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleCopyResults} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Results</button>
                      <button onClick={handleCopyReport} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Report</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter a time-series dataset on the left to calculate smoothed values and forecasts.</p>
              )}
            </div>

            {/* Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex gap-1.5">
                    <button onClick={() => setShowActual(!showActual)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showActual ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Actual</button>
                    <button onClick={() => setShowSmoothed(!showSmoothed)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showSmoothed ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Smoothed</button>
                    <button onClick={() => setShowForecast(!showForecast)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showForecast ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Forecast</button>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleCopyChart} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{chartCopied ? "✓ Copied" : "Copy"}</button>
                    <button onClick={handleDownloadPng} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">PNG</button>
                    <button onClick={handleDownloadSvg} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">SVG</button>
                  </div>
                </div>
                <div ref={chartContainerRef} className="p-5">
                  <SmoothingChart points={result.points} forecast={result.forecast} showActual={showActual} showSmoothed={showSmoothed} showForecast={showForecast} />
                </div>
              </div>
            )}

            {/* Data table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowTable(!showTable)} className="w-full p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Results &amp; Forecast Table</h3>
                  <span className="text-xs text-gray-400">{showTable ? "Hide ▲" : "Show ▼"}</span>
                </button>
                {showTable && (
                  <div className="max-h-72 overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Observation</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Actual</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Smoothed</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Residual</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {result.points.map((p) => (
                          <tr key={p.index}>
                            <td className="px-4 py-1.5 font-mono text-gray-500">{p.index + 1}</td>
                            <td className="px-4 py-1.5 font-mono">{formatNum(p.actual)}</td>
                            <td className="px-4 py-1.5 font-mono font-semibold text-primary">{formatNum(p.smoothed)}</td>
                            <td className="px-4 py-1.5 font-mono">{formatNum(p.residual)}</td>
                          </tr>
                        ))}
                        {result.forecast.map((f) => (
                          <tr key={`f-${f.period}`} className="bg-blue-50">
                            <td className="px-4 py-1.5 font-mono text-blue-600">{f.period}</td>
                            <td className="px-4 py-1.5 font-mono text-blue-400">—</td>
                            <td className="px-4 py-1.5 font-mono text-blue-400">—</td>
                            <td className="px-4 py-1.5 font-mono font-semibold text-blue-700">{formatNum(f.forecast)}</td>
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
              <button onClick={() => handleDownloadCsv(false)} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
              <button onClick={() => handleDownloadCsv(true)} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Excel CSV</button>
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
                      setInput(entry.input.text); setMethod(entry.input.method); setAlpha(entry.input.alpha);
                      setBeta(entry.input.beta); setGamma(entry.input.gamma); setPeriod(entry.input.period);
                      setSeasonalType(entry.input.seasonalType); setForecastPeriods(entry.input.forecastPeriods);
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{METHOD_LABELS[entry.method]}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">Final level: {formatNum(entry.finalLevel)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <ExponentialSmoothingCalculatorSEO />

      <RelatedTools />
    </>
  );
}
