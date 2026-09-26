"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateQueryOptimization, isQueryOptimizationError, formatNum, formatMsDuration, debounce,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  SAMPLE_PRESETS, OPTIMIZATION_TYPES, DATABASE_ENGINES,
  type OptimizationType, type DatabaseEngine, type QueryOptimizationResult, type HistoryEntry, type SavedInput, type Rating,
} from "./logic";
import { BeforeAfterBarChart } from "./chart";
import QueryOptimizationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const RATING_COLORS: Record<Rating, { bg: string; text: string }> = {
  Poor: { bg: "bg-red-100", text: "text-red-700" },
  Fair: { bg: "bg-amber-100", text: "text-amber-700" },
  Good: { bg: "bg-blue-100", text: "text-blue-700" },
  Excellent: { bg: "bg-green-100", text: "text-green-700" },
  Outstanding: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

export default function QueryOptimizationCalculatorUI() {
  const [originalTime, setOriginalTime] = useState("2500");
  const [optimizedTime, setOptimizedTime] = useState("450");
  const [rowsBefore, setRowsBefore] = useState("2500000");
  const [rowsAfter, setRowsAfter] = useState("75000");
  const [dailyExecutions, setDailyExecutions] = useState("80000");
  const [optimizationType, setOptimizationType] = useState<OptimizationType>("Added Index");
  const [databaseEngine, setDatabaseEngine] = useState<DatabaseEngine>("PostgreSQL");
  const [decimals, setDecimals] = useState(2);

  const [result, setResult] = useState<QueryOptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showSamples, setShowSamples] = useState(false);

  const currentInput = (): SavedInput => ({
    originalTime, optimizedTime, rowsBefore, rowsAfter, dailyExecutions, optimizationType, databaseEngine, decimals,
  });

  const runRef = useRef(debounce((input: SavedInput) => {
    const rb = input.rowsBefore.trim() === "" ? null : parseFloat(input.rowsBefore);
    const ra = input.rowsAfter.trim() === "" ? null : parseFloat(input.rowsAfter);
    const exec = input.dailyExecutions.trim() === "" ? null : parseFloat(input.dailyExecutions);
    const r = calculateQueryOptimization(
      parseFloat(input.originalTime) || 0, parseFloat(input.optimizedTime) || 0,
      rb, ra, exec, input.optimizationType, input.databaseEngine, input.decimals
    );
    if (isQueryOptimizationError(r)) { setResult(null); setError(r.error); }
    else { setError(null); setResult(r); }
  }, 150));

  const persistRef = useRef(debounce((data: SavedInput) => saveInput(data), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    const saved = loadInput();
    const initial = shared ?? saved;
    if (initial) {
      setOriginalTime(initial.originalTime); setOptimizedTime(initial.optimizedTime);
      setRowsBefore(initial.rowsBefore); setRowsAfter(initial.rowsAfter);
      setDailyExecutions(initial.dailyExecutions); setOptimizationType(initial.optimizationType);
      setDatabaseEngine(initial.databaseEngine); setDecimals(initial.decimals);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const input = currentInput();
    runRef.current(input);
    persistRef.current(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalTime, optimizedTime, rowsBefore, rowsAfter, dailyExecutions, optimizationType, databaseEngine, decimals]);

  const handleReset = () => {
    setOriginalTime("2500"); setOptimizedTime("450"); setRowsBefore("2500000"); setRowsAfter("75000");
    setDailyExecutions("80000"); setOptimizationType("Added Index"); setDatabaseEngine("PostgreSQL"); setDecimals(2);
  };

  const handleLoadPreset = (p: (typeof SAMPLE_PRESETS)[number]) => {
    setOriginalTime(String(p.originalTimeMs)); setOptimizedTime(String(p.optimizedTimeMs));
    setRowsBefore(p.rowsBefore); setRowsAfter(p.rowsAfter); setDailyExecutions(p.dailyExecutions);
    setOptimizationType(p.optimizationType);
    setShowSamples(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(currentInput()));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "query-optimization-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "query-optimization-report.json"; a.click(); URL.revokeObjectURL(a.href);
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
    saveHistory({ input: currentInput(), improvementPct: result.improvementPct, rating: result.rating });
    setHistory(getHistory());
  };

  const ratingColors = result ? RATING_COLORS[result.rating] : RATING_COLORS.Poor;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Query Execution Time</h3>
                <button onClick={() => setShowSamples(!showSamples)} className="text-xs text-primary font-medium hover:underline">🎲 Examples</button>
              </div>
              {showSamples && (
                <div className="absolute top-10 right-5 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  {SAMPLE_PRESETS.map((s) => (
                    <button key={s.name} onClick={() => handleLoadPreset(s)} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">{s.name}</button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="qo-original" className="block text-xs font-medium text-gray-600 mb-1">Original Time (ms)</label>
                  <input id="qo-original" type="number" min={0} value={originalTime} onChange={(e) => setOriginalTime(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="qo-optimized" className="block text-xs font-medium text-gray-600 mb-1">Optimized Time (ms)</label>
                  <input id="qo-optimized" type="number" min={0} value={optimizedTime} onChange={(e) => setOptimizedTime(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <div>
                  <label htmlFor="qo-rows-before" className="block text-xs font-medium text-gray-600 mb-1">Rows Before (Optional)</label>
                  <input id="qo-rows-before" type="number" min={0} value={rowsBefore} onChange={(e) => setRowsBefore(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="qo-rows-after" className="block text-xs font-medium text-gray-600 mb-1">Rows After (Optional)</label>
                  <input id="qo-rows-after" type="number" min={0} value={rowsAfter} onChange={(e) => setRowsAfter(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              </div>

              <div>
                <label htmlFor="qo-daily" className="block text-xs font-medium text-gray-600 mb-1">Daily Query Executions (Optional)</label>
                <input id="qo-daily" type="number" min={0} value={dailyExecutions} onChange={(e) => setDailyExecutions(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <div>
                  <label htmlFor="qo-type" className="block text-xs font-medium text-gray-600 mb-1">Optimization Type</label>
                  <select id="qo-type" value={optimizationType} onChange={(e) => setOptimizationType(e.target.value as OptimizationType)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {OPTIMIZATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="qo-engine" className="block text-xs font-medium text-gray-600 mb-1">Database Engine</label>
                  <select id="qo-engine" value={databaseEngine} onChange={(e) => setDatabaseEngine(e.target.value as DatabaseEngine)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {DATABASE_ENGINES.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="qo-precision" className="block text-xs font-medium text-gray-600 mb-1">Decimal Precision</label>
                <select id="qo-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                  {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">{error}</p>}
              {result?.regressed && !error && (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2" role="alert">⚠️ Optimized time is slower than the original — this is a regression, not an improvement.</p>
              )}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Performance Improvement</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <span className="text-4xl font-bold font-mono tabular-nums">{formatNum(result.improvementPct)}%</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ratingColors.bg} ${ratingColors.text}`}>{result.rating}</span>
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    {formatNum(result.speedMultiplier)}× faster · {formatNum(result.timeSavedMs)} ms saved per query
                  </p>
                  <div className="space-y-2">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleShare} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter original and optimized execution times on the left to calculate.</p>
              )}
            </div>

            {/* Before/after chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Before vs. After</h3>
                </div>
                <div className="p-5">
                  <BeforeAfterBarChart originalMs={result.originalTimeMs} optimizedMs={result.optimizedTimeMs} />
                </div>
              </div>
            )}

            {/* Secondary stats */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Detailed Metrics</h3>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-50">
                  {[
                    ["Efficiency Score", `${formatNum(result.efficiencyScore)}%`],
                    ["Execution Time Saved", `${formatNum(result.timeSavedMs)} ms`],
                    ...(result.rowsReductionPct !== null ? [["Rows Reduced", `${formatNum(result.rowsReductionPct)}%`]] : []),
                    ...(result.dailyTimeSavedMs !== null ? [["Daily Time Saved", formatMsDuration(result.dailyTimeSavedMs)]] : []),
                    ...(result.monthlyTimeSavedMs !== null ? [["Monthly Time Saved", formatMsDuration(result.monthlyTimeSavedMs)]] : []),
                    ...(result.yearlyTimeSavedMs !== null ? [["Yearly Time Saved", formatMsDuration(result.yearlyTimeSavedMs)]] : []),
                  ].map(([label, value]) => (
                    <div key={label} className="px-4 py-3">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rating guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Optimization Rating Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["Below 10%", "Poor"],
                  ["10% – 39%", "Fair"],
                  ["40% – 69%", "Good"],
                  ["70% – 89%", "Excellent"],
                  ["90% and above", "Outstanding"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${result?.rating === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${RATING_COLORS[label as Rating].bg} ${RATING_COLORS[label as Rating].text}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

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
                      setOriginalTime(i.originalTime); setOptimizedTime(i.optimizedTime);
                      setRowsBefore(i.rowsBefore); setRowsAfter(i.rowsAfter); setDailyExecutions(i.dailyExecutions);
                      setOptimizationType(i.optimizationType); setDatabaseEngine(i.databaseEngine);
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatNum(entry.improvementPct)}% improvement</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className={`text-xs font-mono font-semibold ${RATING_COLORS[entry.rating].text}`}>{entry.rating} · {entry.input.optimizationType}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedStrip />
      <QueryOptimizationCalculatorSEO />

      <RelatedTools />
    </>
  );
}
