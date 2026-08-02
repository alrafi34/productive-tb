"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  parseVector, computeDistance, getMetricMeta, debounce, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport,
  METRICS, SAMPLES, PRECISION_OPTIONS,
  DEFAULT_PRECISION, DEFAULT_MINKOWSKI_P, DEFAULT_VECTOR_A, DEFAULT_VECTOR_B,
  type MetricId, type HistoryEntry,
} from "./logic";
import { Scatter2DChart, DiffBarChart } from "./chart";
import ClusteringDistanceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ClusteringDistanceCalculatorUI() {
  const [metric, setMetric] = useState<MetricId>("euclidean");
  const [textA, setTextA] = useState(DEFAULT_VECTOR_A);
  const [textB, setTextB] = useState(DEFAULT_VECTOR_B);
  const [minkowskiP, setMinkowskiP] = useState(String(DEFAULT_MINKOWSKI_P));
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [debouncedA, setDebouncedA] = useState(DEFAULT_VECTOR_A);
  const [debouncedB, setDebouncedB] = useState(DEFAULT_VECTOR_B);

  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => { setHistory(getHistory()); }, []);

  const applyDebounce = useCallback(debounce((a: string, b: string) => { setDebouncedA(a); setDebouncedB(b); }, 150), []);
  useEffect(() => { applyDebounce(textA, textB); }, [textA, textB, applyDebounce]);

  const parsedA = useMemo(() => parseVector(debouncedA), [debouncedA]);
  const parsedB = useMemo(() => parseVector(debouncedB), [debouncedB]);

  const { result, ms } = useMemo(() => {
    const start = performance.now();
    const r = computeDistance(metric, parsedA.values, parsedB.values, parseFloat(minkowskiP));
    return { result: r, ms: performance.now() - start };
  }, [metric, parsedA.values, parsedB.values, minkowskiP]);

  const meta = getMetricMeta(metric);

  const handleSwap = () => { setTextA(textB); setTextB(textA); };
  const handleClear = () => { setTextA(""); setTextB(""); };
  const handleReset = () => {
    setMetric("euclidean"); setTextA(DEFAULT_VECTOR_A); setTextB(DEFAULT_VECTOR_B);
    setMinkowskiP(String(DEFAULT_MINKOWSKI_P)); setPrecision(DEFAULT_PRECISION);
  };
  const handleSample = (s: (typeof SAMPLES)[number]) => {
    setMetric(s.metric); setTextA(s.a); setTextB(s.b);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(meta, parsedA.values, parsedB.values, result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };
  const handleDownloadCSV = () => download(buildCSVReport(meta, parsedA.values, parsedB.values, result, precision), "text/csv", "clustering-distance-result.csv");
  const handleDownloadJSON = () => download(buildJSONReport(meta, parsedA.values, parsedB.values, result), "application/json", "clustering-distance-result.json");
  const handleDownloadTXT = () => download(buildTextReport(meta, parsedA.values, parsedB.values, result, precision), "text/plain", "clustering-distance-report.txt");

  const handleSave = () => {
    saveHistory({ metric, a: textA, b: textB, value: result.value });
    setHistory(getHistory());
  };

  const dims = Math.max(parsedA.values.length, parsedB.values.length);
  const lengthMismatch = parsedA.values.length > 0 && parsedB.values.length > 0 && parsedA.values.length !== parsedB.values.length;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cdc-metric">Distance Metric</label>
                <select id="cdc-metric" value={metric} onChange={(e) => setMetric(e.target.value as MetricId)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {METRICS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>

              {metric === "minkowski" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cdc-p" title="The order of the Minkowski norm. p=1 is Manhattan, p=2 is Euclidean.">
                    Minkowski Parameter (p)
                  </label>
                  <input id="cdc-p" type="number" min={1} step="0.5" value={minkowskiP} onChange={(e) => setMinkowskiP(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cdc-a">Vector A</label>
                <textarea id="cdc-a" value={textA} onChange={(e) => setTextA(e.target.value)} rows={3} placeholder="1,2,3,4,5"
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-y" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cdc-b">Vector B</label>
                <textarea id="cdc-b" value={textB} onChange={(e) => setTextB(e.target.value)} rows={3} placeholder="5,4,3,2,1"
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-y" />
              </div>
              <p className="text-xs text-gray-400">Comma, space, or newline separated numbers.</p>

              {(parsedA.invalid || parsedB.invalid) && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {parsedA.invalid ? "Vector A" : "Vector B"} contains invalid numeric values.
                </p>
              )}
              {!parsedA.invalid && !parsedB.invalid && lengthMismatch && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">Both vectors must have the same number of dimensions.</p>
              )}
              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cdc-precision">Decimal Precision</label>
                <select id="cdc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimals</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {SAMPLES.map((s) => (
                  <button key={s.label} type="button" onClick={() => handleSample(s)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button onClick={handleSwap} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Swap</button>
                <button onClick={handleClear} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Clear</button>
                <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
              </div>
            </div>

            {!result.error && result.value !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
                <p className="text-sm text-gray-600 font-mono">{meta.formula}</p>
                {result.steps.map((s, i) => <p key={i} className="text-sm text-gray-600 font-mono">{s}</p>)}
              </div>
            )}

            {!result.error && dims > 0 && dims <= 30 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Coordinate Table</h3>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-4 font-medium text-gray-500 text-xs">Dim</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-500 text-xs">A</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-500 text-xs">B</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-500 text-xs">|A − B|</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {parsedA.values.map((v, i) => (
                        <tr key={i}>
                          <td className="py-1.5 px-4 text-gray-500">{i + 1}</td>
                          <td className="py-1.5 px-4 text-right font-mono text-gray-700">{v}</td>
                          <td className="py-1.5 px-4 text-right font-mono text-gray-700">{parsedB.values[i]}</td>
                          <td className="py-1.5 px-4 text-right font-mono text-primary">{Math.abs(v - (parsedB.values[i] ?? 0)).toFixed(precision)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {meta.label}
              </p>
              <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">
                {result.error ? "—" : formatNum(result.value, precision)}
              </p>
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.75)" }}>
                {dims} dimension{dims === 1 ? "" : "s"} · calculated in {ms.toFixed(2)} ms
              </p>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Result"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {!result.error && parsedA.values.length === 2 && parsedB.values.length === 2 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>2D Scatter Plot</h3>
                <Scatter2DChart a={parsedA.values} b={parsedB.values} />
              </div>
            )}

            {!result.error && dims > 2 && dims <= 30 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Per-Dimension Difference</h3>
                <DiffBarChart a={parsedA.values} b={parsedB.values} />
              </div>
            )}

            {/* Metric reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>All Distance Metrics</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {METRICS.map((m) => (
                  <div key={m.id} className={`flex items-center justify-between px-4 py-2 text-sm ${m.id === metric ? "bg-primary/5" : ""}`}>
                    <span className={`font-medium ${m.id === metric ? "text-primary" : "text-gray-700"}`}>{m.label}</span>
                    <span className="font-mono text-xs text-gray-400">{m.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} disabled={!!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download CSV</button>
                <button onClick={handleDownloadTXT} disabled={!!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download TXT</button>
              </div>
              <button onClick={handleDownloadJSON} disabled={!!result.error} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download JSON</button>
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
                      onClick={() => { setMetric(entry.metric); setTextA(entry.a); setTextB(entry.b); setShowHistory(false); }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{getMetricMeta(entry.metric).label}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">Result: {formatNum(entry.value, 4)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ClusteringDistanceCalculatorSEO />

      <RelatedTools
        currentTool="clustering-distance-calculator"
        tools={[
          "correlation-coefficient-calculator",
          "standard-deviation-calculator",
          "roc-auc-calculator",
          "confusion-matrix-analyzer",
          "regression-calculator",
          "outlier-detection-calculator",
        ]}
      />
    </>
  );
}
