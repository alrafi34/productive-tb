"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, calculatePercentile, calculatePercentileRank, calculateMultiplePercentiles, debounce, formatNum,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  SAMPLE_DATASETS, generateRandomSample, PERCENTILE_METHODS,
  type PercentileResult, type HistoryEntry, type PercentileMethod, type MultiplePercentileResult,
} from "./logic";

type CalcMode = "value" | "rank" | "multiple";
import { PercentileChart } from "./chart";
import PercentileCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function PercentileCalculatorUI() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<CalcMode>("value");
  const [method, setMethod] = useState<PercentileMethod>("linear");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [targetPercentile, setTargetPercentile] = useState(90);
  const [rankValue, setRankValue] = useState("72");
  const [multipleList, setMultipleList] = useState("10,25,50,75,90,95,99");
  const [decimals, setDecimals] = useState(2);

  const [result, setResult] = useState<PercentileResult | null>(null);
  const [rankResult, setRankResult] = useState<number | null>(null);
  const [multipleResults, setMultipleResults] = useState<MultiplePercentileResult[]>([]);
  const [calcTimeMs, setCalcTimeMs] = useState<number | null>(null);
  const [values, setValues] = useState<number[]>([]);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

const runRef = useRef(debounce((text: string, p: number, dec: number, m: CalcMode, meth: PercentileMethod, rv: string, mList: string) => {
    const { values: vals, invalidTokens: invalid } = parseDataset(text);
    setInvalidTokens(invalid);
    setValues(vals);

    if (vals.length === 0) {
      setResult(null); setRankResult(null); setMultipleResults([]); setCalcTimeMs(null);
      setValidationError("No valid numeric data found.");
      return;
    }
    setValidationError(null);

    const start = performance.now();
    const base = calculatePercentile(vals, p, dec, meth);
    setResult(base);

    if (m === "rank") {
      setRankResult(calculatePercentileRank(vals, parseFloat(rv), dec));
      setMultipleResults([]);
    } else if (m === "multiple") {
      setMultipleResults(calculateMultiplePercentiles(vals, mList, dec, meth));
      setRankResult(null);
    } else {
      setRankResult(null);
      setMultipleResults([]);
    }
    setCalcTimeMs(Math.round((performance.now() - start) * 100) / 100);
  }, 150));

  const persistRef = useRef(debounce((text: string, p: number, dec: number) => {
    saveInput(text, p, dec);
  }, 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    const saved = loadInput();
    if (shared) {
      setInput(shared.text); setTargetPercentile(shared.targetPercentile);
    } else if (saved) {
      setInput(saved.text); setTargetPercentile(saved.targetPercentile); setDecimals(saved.decimals);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runRef.current(input, targetPercentile, decimals, mode, method, rankValue, multipleList);
  }, [input, targetPercentile, decimals, mode, method, rankValue, multipleList]);

  useEffect(() => {
    persistRef.current(input, targetPercentile, decimals);
  }, [input, targetPercentile, decimals]);

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

  const handleLoadSample = (sample: { text: string; percentile: number }) => {
    setInput(sample.text); setTargetPercentile(sample.percentile);
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

  const handleCopy = () => {
    if (!result) return;
    if (mode === "rank") {
      navigator.clipboard.writeText(rankResult === null ? "" : `${formatNum(rankResult)}th percentile`);
    } else if (mode === "multiple") {
      navigator.clipboard.writeText(multipleResults.filter((r) => r.valid).map((r) => `P${r.p}: ${formatNum(r.value)}`).join(", "));
    } else {
      navigator.clipboard.writeText(formatNum(result.targetValue));
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, values));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(input, targetPercentile));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "percentile-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "percentile-results.json"; a.click(); URL.revokeObjectURL(a.href);
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
    saveHistory({ input, targetPercentile, targetValue: result.targetValue });
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
                placeholder={"Enter numbers separated by commas, spaces, or new lines.\n\nExample:\n62, 68, 71, 74, 75, 78, 80, 85, 90, 95"}
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
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</h3>
              <select value={mode} onChange={(e) => setMode(e.target.value as CalcMode)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="value">Find Percentile Value</option>
                <option value="rank">Find Percentile Rank</option>
                <option value="multiple">Calculate Multiple Percentiles</option>
              </select>

              {mode === "value" && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="pc-target" className="text-xs font-medium text-gray-600">Percentile</label>
                    <span className="text-xs font-mono font-semibold text-primary">P{targetPercentile}</span>
                  </div>
                  <input id="pc-target" type="range" min={0} max={100} step={1} value={targetPercentile}
                    onChange={(e) => setTargetPercentile(parseInt(e.target.value, 10))} className="w-full accent-primary" />
                  <input type="number" min={0} max={100} value={targetPercentile}
                    onChange={(e) => setTargetPercentile(Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)))}
                    className="w-full mt-2 px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs font-mono" />
                </div>
              )}

              {mode === "rank" && (
                <div>
                  <label htmlFor="pc-rank-value" className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                  <input id="pc-rank-value" type="number" value={rankValue} onChange={(e) => setRankValue(e.target.value)}
                    placeholder="72"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              )}

              {mode === "multiple" && (
                <div>
                  <label htmlFor="pc-multiple" className="block text-xs font-medium text-gray-600 mb-1">Percentiles (comma-separated)</label>
                  <input id="pc-multiple" type="text" value={multipleList} onChange={(e) => setMultipleList(e.target.value)}
                    placeholder="10,25,50,75,90,95,99"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              )}

              <div>
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-medium text-primary hover:underline">
                  {showAdvanced ? "Hide" : "Show"} Advanced Settings
                </button>
                {showAdvanced && (
                  <div className="mt-2 space-y-1">
                    <label htmlFor="pc-method" className="block text-xs font-medium text-gray-600 mb-1">Percentile Method</label>
                    <select id="pc-method" value={method} onChange={(e) => setMethod(e.target.value as PercentileMethod)}
                      className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                      {PERCENTILE_METHODS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                    </select>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{PERCENTILE_METHODS.find((m) => m.id === method)?.description}</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="pc-precision" className="block text-xs font-medium text-gray-600 mb-1">Decimal Precision</label>
                <select id="pc-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
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
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "value" && `P${targetPercentile}`}
                {mode === "rank" && `Percentile Rank of ${rankValue}`}
                {mode === "multiple" && "Multiple Percentiles"}
              </p>
              {result ? (
                <>
                  {mode === "value" && (
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-4xl font-bold font-mono tabular-nums">{formatNum(result.targetValue)}</span>
                    </div>
                  )}
                  {mode === "rank" && (
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-4xl font-bold font-mono tabular-nums">
                        {rankResult === null ? "—" : `${formatNum(rankResult)}th`}
                      </span>
                    </div>
                  )}
                  {mode === "multiple" && (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {multipleResults.filter((r) => r.valid).map((r) => (
                        <div key={r.p} className="bg-white/10 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-[10px] text-primary-100">P{r.p}</p>
                          <p className="text-sm font-bold font-mono">{formatNum(r.value)}</p>
                        </div>
                      ))}
                      {multipleResults.some((r) => !r.valid) && (
                        <p className="col-span-4 text-xs text-primary-100">⚠️ Some percentile values were ignored (must be 0–100).</p>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-primary-100 mb-4">
                    n = {result.count} · {calcTimeMs !== null && `calculated in ${calcTimeMs}ms`}
                  </p>
                  <div className="space-y-2">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Value"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleCopyReport} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Report</button>
                      <button onClick={handleShare} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter a dataset on the left to calculate a percentile.</p>
              )}
            </div>

            {/* Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Distribution</h3>
                </div>
                <div className="p-5">
                  <PercentileChart sorted={result.sorted} targetValue={result.targetValue} targetPercentile={result.targetPercentile} q1={result.q1} q3={result.q3} />
                </div>
              </div>
            )}

            {/* Statistics */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Descriptive Statistics</h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 divide-x divide-gray-50">
                  {[
                    ["Sample Size", result.count],
                    ["Min", formatNum(result.min)],
                    ["Max", formatNum(result.max)],
                    ["Range", formatNum(result.range)],
                    ["Mean", formatNum(result.mean)],
                    ["Median (P50)", formatNum(result.median)],
                    ["Std. Deviation", formatNum(result.stdDev)],
                    ["Q1 (P25)", formatNum(result.q1)],
                    ["Q3 (P75)", formatNum(result.q3)],
                    ["IQR", formatNum(result.iqr)],
                  ].map(([label, value]) => (
                    <div key={label as string} className="px-4 py-3 border-b border-gray-50">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
                {result.duplicateCount > 0 && (
                  <p className="px-4 py-2 text-xs text-amber-600 bg-amber-50 border-t border-amber-100">⚠️ {result.duplicateCount} duplicate value{result.duplicateCount === 1 ? "" : "s"} detected in the dataset.</p>
                )}
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/30">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Step-by-Step Calculation</p>
                  <p className="text-xs text-gray-500 font-mono leading-relaxed">
                    {mode === "rank"
                      ? `Percentile Rank = (values ≤ ${rankValue} ÷ n) × 100 = ${rankResult === null ? "—" : `${formatNum(rankResult)}%`}`
                      : `Index = (P ÷ 100) × (n − 1) = (${result.targetPercentile} ÷ 100) × ${result.count - 1} → P${result.targetPercentile} = ${formatNum(result.targetValue)}`}
                  </p>
                </div>
              </div>
            )}

            {/* Common percentiles table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Common Percentiles</h3>
                </div>
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      {result.commonPercentiles.map((c) => (
                        <th key={c.p} className="text-center px-2 py-2 font-semibold text-gray-600">{c.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {result.commonPercentiles.map((c) => (
                        <td key={c.p} className={`text-center px-2 py-2 font-mono ${c.p === targetPercentile ? "font-bold text-primary" : "text-gray-700"}`}>{formatNum(c.value)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
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
                    <div key={entry.id} onClick={() => { setInput(entry.input); setTargetPercentile(entry.targetPercentile); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">P{entry.targetPercentile} = {formatNum(entry.targetValue)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedStrip />
      <PercentileCalculatorSEO />

      <RelatedTools />
    </>
  );
}
