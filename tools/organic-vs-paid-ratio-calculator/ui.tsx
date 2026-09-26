"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateRatio, validateInputs, debounce, parseNum,
  formatFull, formatPercent,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  PRESETS, DEFAULT_INPUTS,
  type ChartType, type DisplayMode, type RatioInputs, type RatioResult, type HistoryEntry,
} from "./logic";
import RatioChart, { exportCanvasAsPng } from "./chart";
import OrganicVsPaidRatioCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const CHART_TYPES: { value: ChartType; label: string }[] = [
  { value: "pie", label: "Pie Chart" },
  { value: "doughnut", label: "Doughnut Chart" },
  { value: "hbar", label: "Horizontal Bar" },
  { value: "vbar", label: "Vertical Bar" },
];

const DISPLAY_MODES: { value: DisplayMode; label: string }[] = [
  { value: "percentage", label: "Percentage" },
  { value: "absolute", label: "Absolute" },
  { value: "both", label: "Both" },
];

export default function OrganicVsPaidRatioCalculatorUI() {
  const [organicStr, setOrganicStr] = useState(String(DEFAULT_INPUTS.organic));
  const [paidStr, setPaidStr]       = useState(String(DEFAULT_INPUTS.paid));
  const [decimalPlaces, setDecimalPlaces] = useState(DEFAULT_INPUTS.decimalPlaces);
  const [chartType, setChartType]   = useState<ChartType>(DEFAULT_INPUTS.chartType);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DEFAULT_INPUTS.displayMode);
  const [result, setResult]         = useState<RatioResult | null>(null);
  const [organicError, setOrganicError] = useState<string | null>(null);
  const [paidError, setPaidError]   = useState<string | null>(null);
  const [copied, setCopied]         = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]       = useState<HistoryEntry[]>([]);
  const organicRef = useRef<HTMLInputElement>(null);
  const chartWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      if (shared.organic !== undefined) setOrganicStr(String(shared.organic));
      if (shared.paid !== undefined) setPaidStr(String(shared.paid));
      if (shared.chartType) setChartType(shared.chartType);
    } else {
      organicRef.current?.focus();
    }
  }, []);

  const run = useCallback(
    debounce((o: string, p: string, dp: number, ct: ChartType, dm: DisplayMode) => {
      const errs = validateInputs(o, p);
      setOrganicError(errs.organic ?? null);
      setPaidError(errs.paid ?? null);
      if (errs.organic || errs.paid) { setResult(null); return; }
      const inputs: RatioInputs = { organic: parseNum(o), paid: parseNum(p), decimalPlaces: dp, chartType: ct, displayMode: dm };
      setResult(calculateRatio(inputs));
    }, 150),
    []
  );

  useEffect(() => { run(organicStr, paidStr, decimalPlaces, chartType, displayMode); }, [organicStr, paidStr, decimalPlaces, chartType, displayMode, run]);

  const currentInputs = (): RatioInputs => ({
    organic: parseNum(organicStr), paid: parseNum(paidStr), decimalPlaces, chartType, displayMode,
  });

  const handlePreset = (organic: number, paid: number) => {
    setOrganicStr(String(organic)); setPaidStr(String(paid)); organicRef.current?.focus();
  };

  const handleReset = () => {
    if (!confirm("Reset all inputs to defaults?")) return;
    setOrganicStr(String(DEFAULT_INPUTS.organic));
    setPaidStr(String(DEFAULT_INPUTS.paid));
    setDecimalPlaces(DEFAULT_INPUTS.decimalPlaces);
    setChartType(DEFAULT_INPUTS.chartType);
    setDisplayMode(DEFAULT_INPUTS.displayMode);
    setResult(null); setOrganicError(null); setPaidError(null);
    organicRef.current?.focus();
  };

  const handleCopySummary = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, currentInputs()));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `organic-vs-paid-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadPng = () => {
    exportCanvasAsPng(chartWrapRef.current, `organic-vs-paid-chart-${Date.now()}.png`);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, currentInputs()));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(currentInputs()));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs: currentInputs(), result }); setHistory(getHistory());
  };

  const hasErrors = !!(organicError || paidError);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = organicStr === String(p.organic) && paidStr === String(p.paid);
              return (
                <button key={p.label} onClick={() => handlePreset(p.organic, p.paid)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Traffic Sources</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="opr-organic">Organic Traffic</label>
                <input
                  ref={organicRef}
                  id="opr-organic" type="number" min="0" inputMode="numeric"
                  value={organicStr}
                  onChange={(e) => setOrganicStr(e.target.value)}
                  placeholder="50000"
                  aria-invalid={!!organicError}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${organicError ? "border-red-300" : "border-gray-200"}`}
                />
                {organicError && <p className="text-xs text-red-600 mt-1" role="alert">{organicError}</p>}
                {!organicError && <p className="text-xs text-gray-400 mt-1">Organic traffic comes from unpaid search results.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="opr-paid">Paid Traffic</label>
                <input
                  id="opr-paid" type="number" min="0" inputMode="numeric"
                  value={paidStr}
                  onChange={(e) => setPaidStr(e.target.value)}
                  placeholder="20000"
                  aria-invalid={!!paidError}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${paidError ? "border-red-300" : "border-gray-200"}`}
                />
                {paidError && <p className="text-xs text-red-600 mt-1" role="alert">{paidError}</p>}
                {!paidError && <p className="text-xs text-gray-400 mt-1">Paid traffic comes from advertising campaigns.</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="opr-decimals">Decimal Places</label>
                  <select id="opr-decimals" value={decimalPlaces} onChange={(e) => setDecimalPlaces(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {[0, 1, 2, 3].map((d) => <option key={d} value={d}>{d} decimal{d === 1 ? "" : "s"}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="opr-chart-type">Chart Type</label>
                  <select id="opr-chart-type" value={chartType} onChange={(e) => setChartType(e.target.value as ChartType)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {CHART_TYPES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <p className="block text-xs font-medium text-gray-700 mb-1.5">Display Mode</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {DISPLAY_MODES.map((m) => (
                    <button key={m.value} type="button" onClick={() => setDisplayMode(m.value)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-colors ${displayMode === m.value ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopySummary} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy Summary"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadCSV} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                  <button onClick={handleDownloadPng} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export PNG</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print Report</button>
                  <button onClick={handleShare} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                </div>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Traffic Source Breakdown
              </p>
              {result ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Total Traffic</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{formatFull(result.total)}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Organic : Paid Ratio</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{result.ratioLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${result.insight.bg} ${result.insight.color} border-transparent`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${result.insight.dot}`} />
                      {result.insight.label}
                    </span>
                  </div>

                  {/* Animated traffic breakdown bars */}
                  <div className="space-y-2 mb-4">
                    <div>
                      <div className="flex justify-between text-xs text-primary-100 mb-1">
                        <span>Organic</span>
                        <span className="font-mono">{formatPercent(result.organicPct, decimalPlaces)}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: `${result.organicPct}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-primary-100 mb-1">
                        <span>Paid</span>
                        <span className="font-mono">{formatPercent(result.paidPct, decimalPlaces)}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="h-2 rounded-full bg-white/70 transition-all duration-500" style={{ width: `${result.paidPct}%` }} />
                      </div>
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
                  {hasErrors ? "Fix the errors on the left to calculate" : "No traffic data available. Enter organic and/or paid traffic to see the breakdown."}
                </p>
              )}
            </div>

            {/* Metric cards */}
            {result && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <MetricCard label="Organic Traffic" value={formatOrganicPaidValue(result.organic, result.organicPct, displayMode, decimalPlaces)} />
                <MetricCard label="Paid Traffic" value={formatOrganicPaidValue(result.paid, result.paidPct, displayMode, decimalPlaces)} />
                <MetricCard label="Total Traffic" value={formatFull(result.total)} />
                <MetricCard label="Organic %" value={formatPercent(result.organicPct, decimalPlaces)} />
                <MetricCard label="Paid %" value={formatPercent(result.paidPct, decimalPlaces)} />
                <MetricCard label="Difference" value={formatFull(result.difference)} sub={result.largerSide === "equal" ? "equal split" : `more ${result.largerSide}`} />
              </div>
            )}

            {/* Chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Traffic Source Chart</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Organic</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Paid</span>
                  </div>
                </div>
                <div ref={chartWrapRef}>
                  <RatioChart type={chartType} organicPct={result.organicPct} paidPct={result.paidPct} />
                </div>
              </div>
            )}

            {/* Insight panel */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Marketing Insight</p>
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${result.insight.dot}`} />
                  <p className="text-sm text-gray-600 leading-relaxed">{result.insight.message}</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                    <span>Organic traffic compounds over time and carries no ongoing cost per visitor, while paid traffic stops the moment ad spend stops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                    <span>A healthy long-term acquisition mix typically leans organic, with paid used to accelerate growth or target specific campaigns rather than as the primary channel.</span>
                  </li>
                </ul>
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
                    <div key={entry.id} onClick={() => { setOrganicStr(String(entry.inputs.organic)); setPaidStr(String(entry.inputs.paid)); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatFull(entry.result.organic)} organic / {formatFull(entry.result.paid)} paid
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.ratioLabel} · {entry.result.insight.label}
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
      <OrganicVsPaidRatioCalculatorSEO />

      <RelatedTools />
    </>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold font-mono text-primary tabular-nums">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function formatOrganicPaidValue(absolute: number, pct: number, mode: DisplayMode, decimals: number): string {
  if (mode === "absolute") return formatFull(absolute);
  if (mode === "percentage") return formatPercent(pct, decimals);
  return `${formatFull(absolute)} (${formatPercent(pct, decimals)})`;
}
