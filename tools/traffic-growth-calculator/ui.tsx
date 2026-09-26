"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateGrowth, validateInputs, debounce, parseNum,
  formatFull, formatPercent,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  DURATION_OPTIONS, PRESETS, DEFAULT_INPUTS,
  type GrowthModel, type GrowthInputs, type GrowthResult, type HistoryEntry,
} from "./logic";
import GrowthChart, { exportCanvasAsPng } from "./chart";
import TrafficGrowthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function TrafficGrowthCalculatorUI() {
  const [inputs, setInputs]         = useState<GrowthInputs>(DEFAULT_INPUTS);
  const [result, setResult]         = useState<GrowthResult | null>(null);
  const [resultB, setResultB]       = useState<GrowthResult | null>(null);
  const [errors, setErrors]         = useState<Record<string, string | null>>({});
  const [copied, setCopied]         = useState(false);
  const [tableCopied, setTableCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]       = useState<HistoryEntry[]>([]);
  const trafficRef    = useRef<HTMLInputElement>(null);
  const growthRateRef = useRef<HTMLInputElement>(null);
  const chartWrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else trafficRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: GrowthInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); setResultB(null); return; }
      setResult(calculateGrowth(inp));
      setResultB(inp.compareEnabled ? calculateGrowth({ ...inp, growthRate: inp.growthRateB }) : null);
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof GrowthInputs>(field: K, val: GrowthInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleEnter = () => {
    const errs = validateInputs(inputs);
    if (errs.currentTraffic) { trafficRef.current?.focus(); return; }
    if (errs.growthRate) { growthRateRef.current?.focus(); return; }
    run(inputs);
  };

  const handlePreset = (traffic: number) => { set("currentTraffic", traffic); trafficRef.current?.focus(); };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setResultB(null); setErrors({});
    trafficRef.current?.focus();
  };

  const handleCopySummary = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTable = () => {
    if (!result) return;
    const lines = ["Month\tStarting Traffic\tGrowth\tEnding Traffic",
      ...result.projection.map((r) => `${r.month}\t${formatFull(r.start)}\t${formatFull(r.growth)}\t${formatFull(r.end)}`)];
    navigator.clipboard.writeText(lines.join("\n"));
    setTableCopied(true); setTimeout(() => setTableCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `traffic-growth-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `traffic-growth-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadPng = () => {
    exportCanvasAsPng(chartWrapRef.current, `traffic-growth-chart-${Date.now()}.png`);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, inputs));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(inputs));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const months = result ? [0, ...result.projection.map((r) => r.month)] : [];
  const seriesA = result ? [inputs.currentTraffic, ...result.projection.map((r) => r.end)] : [];
  const seriesB = resultB ? [inputs.currentTraffic, ...resultB.projection.map((r) => r.end)] : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Growth model + presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Growth Model</p>
          <select
            id="tgc-model" value={inputs.model}
            onChange={(e) => set("model", e.target.value as GrowthModel)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
          >
            <option value="compound">Compound Growth</option>
            <option value="linear">Linear Growth</option>
          </select>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            {inputs.model === "compound" ? "Future Traffic = Current × (1 + Rate)^Months" : "Future Traffic = Current + (Current × Rate × Months)"}
          </p>
          <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Quick presets:</span>
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p.traffic)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${inputs.currentTraffic === p.traffic ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Traffic Data</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="tgc-traffic">Current Monthly Traffic</label>
                <input
                  ref={trafficRef}
                  id="tgc-traffic" type="number" min="0" inputMode="numeric"
                  value={inputs.currentTraffic || ""}
                  onChange={(e) => set("currentTraffic", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="10000"
                  aria-invalid={!!errors.currentTraffic}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.currentTraffic ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.currentTraffic && <p className="text-xs text-red-600 mt-1" role="alert">{errors.currentTraffic}</p>}
                {!errors.currentTraffic && <p className="text-xs text-gray-400 mt-1">Your website's current monthly visitor count.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="tgc-rate">Expected Monthly Growth Rate (%)</label>
                <input
                  ref={growthRateRef}
                  id="tgc-rate" type="number" min="0" max="1000" step="0.1" inputMode="decimal"
                  value={inputs.growthRate}
                  onChange={(e) => set("growthRate", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="5"
                  aria-invalid={!!errors.growthRate}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.growthRate ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.growthRate && <p className="text-xs text-red-600 mt-1" role="alert">{errors.growthRate}</p>}
                {!errors.growthRate && <p className="text-xs text-gray-400 mt-1">Estimated month-over-month traffic increase.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="tgc-duration">Forecast Duration</label>
                <select id="tgc-duration" value={inputs.duration} onChange={(e) => set("duration", parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {DURATION_OPTIONS.map((d) => <option key={d} value={d}>{d} Month{d === 1 ? "" : "s"}</option>)}
                </select>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">Compare Scenario B</p>
                  <p className="text-xs text-gray-400">Add a second growth rate for comparison</p>
                </div>
                <button type="button" role="switch" aria-checked={inputs.compareEnabled}
                  onClick={() => set("compareEnabled", !inputs.compareEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.compareEnabled ? "bg-primary" : "bg-gray-200"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${inputs.compareEnabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {inputs.compareEnabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="tgc-rate-b">Scenario B Growth Rate (%)</label>
                  <input
                    id="tgc-rate-b" type="number" min="0" max="1000" step="0.1" inputMode="decimal"
                    value={inputs.growthRateB}
                    onChange={(e) => set("growthRateB", parseNum(e.target.value))}
                    placeholder="12"
                    aria-invalid={!!errors.growthRateB}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.growthRateB ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.growthRateB && <p className="text-xs text-red-600 mt-1" role="alert">{errors.growthRateB}</p>}
                </div>
              )}

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to jump to results, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopySummary} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy Summary"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleCopyTable} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {tableCopied ? "✓ Copied!" : "Copy Table"}
                  </button>
                  <button onClick={handleShare} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                    {shareCopied ? "✓ Copied!" : "Share URL"}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleDownloadCSV} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                  <button onClick={handleDownloadJSON} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export JSON</button>
                  <button onClick={handleDownloadPng} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export PNG</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print Report</button>
                  <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                    {showHistory ? "Hide" : "Show"} History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Projected Traffic — {inputs.duration} Months
              </p>
              {result ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Projected Monthly Traffic</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{formatFull(result.futureTraffic)}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Additional Visitors</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">+{formatFull(result.additionalVisitors)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-primary-100 mb-3">
                    Growth: <span className="font-semibold text-white">{formatPercent(result.growthPercent)}</span> · Multiplier: <span className="font-semibold text-white">{result.growthMultiplier.toFixed(2)}×</span>
                  </p>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Average Monthly Increase</span>
                      <span className="font-semibold font-mono">{formatFull(result.averageMonthlyIncrease)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Total Visitors During Forecast</span>
                      <span className="font-semibold font-mono">{formatFull(result.totalVisitorsDuringForecast)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopySummary} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Summary"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                      Save to History
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter your current traffic and growth rate to see a forecast."}
                </p>
              )}
            </div>

            {/* Scenario comparison */}
            {result && resultB && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Scenario Comparison</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: `Scenario A (${inputs.growthRate}%/mo)`, res: result, color: "bg-primary" },
                    { label: `Scenario B (${inputs.growthRateB}%/mo)`, res: resultB, color: "bg-blue-400" },
                  ].map(({ label, res, color }) => {
                    const maxFuture = Math.max(result.futureTraffic, resultB.futureTraffic) || 1;
                    return (
                      <div key={label} className="px-5 py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{label}</span>
                          <span className="text-sm font-semibold font-mono text-gray-800">{formatFull(res.futureTraffic)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(100, (res.futureTraffic / maxFuture) * 100)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 px-5 py-3 border-t border-gray-50">
                  {resultB.futureTraffic > result.futureTraffic
                    ? `Scenario B produces ${formatFull(resultB.futureTraffic - result.futureTraffic)} more monthly visitors than Scenario A after ${inputs.duration} months.`
                    : result.futureTraffic > resultB.futureTraffic
                      ? `Scenario A produces ${formatFull(result.futureTraffic - resultB.futureTraffic)} more monthly visitors than Scenario B after ${inputs.duration} months.`
                      : "Both scenarios produce equal traffic."}
                </p>
              </div>
            )}

            {/* Growth chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Traffic Growth Chart</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Scenario A</span>
                    {resultB && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Scenario B</span>}
                  </div>
                </div>
                <div ref={chartWrapRef}>
                  <GrowthChart
                    months={months}
                    series={[
                      { label: "Scenario A", color: "#058554", data: seriesA },
                      ...(resultB ? [{ label: "Scenario B", color: "#60a5fa", data: seriesB }] : []),
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Growth insights */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Growth Insights</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {result.doublingTimeMonths !== null && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                      <span>At this growth rate, your traffic could double in approximately <strong>{result.doublingTimeMonths.toFixed(1)} months</strong>.</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                    <span>
                      Your projected growth over {inputs.duration} months is <strong>{formatPercent(result.growthPercent)}</strong>
                      {result.growthPercent > 150 ? " — an exceptionally strong trajectory if sustained." : result.growthPercent > 50 ? " — a healthy, above-average trajectory." : " — a steady, gradual trajectory."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                    <span>On average, you'd gain <strong>{formatFull(result.averageMonthlyIncrease)}</strong> visitors per month over this forecast period.</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Monthly projection table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Monthly Projection Table</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-2 font-medium">Month</th>
                        <th className="px-5 py-2 font-medium">Starting Traffic</th>
                        <th className="px-5 py-2 font-medium">Growth</th>
                        <th className="px-5 py-2 font-medium">Ending Traffic</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.projection.map((r) => (
                        <tr key={r.month} className="hover:bg-gray-50">
                          <td className="px-5 py-2 text-gray-600">{r.month}</td>
                          <td className="px-5 py-2 font-mono text-gray-700">{formatFull(r.start)}</td>
                          <td className="px-5 py-2 font-mono text-green-600">+{formatFull(r.growth)}</td>
                          <td className="px-5 py-2 font-mono font-semibold text-gray-900">{formatFull(r.end)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

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
                    <div key={entry.id} onClick={() => { setInputs(entry.inputs); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatFull(entry.inputs.currentTraffic)} → {formatFull(entry.result.futureTraffic)} ({entry.inputs.duration}mo)
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.inputs.growthRate}%/mo · {entry.inputs.model === "compound" ? "Compound" : "Linear"} · +{formatFull(entry.result.additionalVisitors)}
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
      <TrafficGrowthCalculatorSEO />

      <RelatedTools />
    </>
  );
}
