"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateDataGrowth, debounce, parseNum, formatSize,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  PRESETS, UNIT_ORDER, GROWTH_INTERVAL_META, GROWTH_INTERVAL_ORDER, DURATION_UNIT_META, DURATION_UNIT_ORDER,
  DEFAULT_INPUTS,
  type StorageUnit, type GrowthType, type GrowthInterval, type DurationUnit,
  type DataGrowthInputs, type DataGrowthResult, type HistoryEntry,
} from "./logic";
import DataGrowthChart, { exportCanvasAsPng } from "./chart";
import DataGrowthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 2, 4, 6];

export default function DataGrowthCalculatorUI() {
  const [inputs, setInputs] = useState<DataGrowthInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<DataGrowthResult>(calculateDataGrowth(DEFAULT_INPUTS));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: DataGrowthInputs; result: DataGrowthResult } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: DataGrowthInputs; result: DataGrowthResult } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else primaryRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: DataGrowthInputs) => { setResult(calculateDataGrowth(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof DataGrowthInputs>(field: K, val: DataGrowthInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      initialSize: p.initialSize, storageUnit: p.storageUnit, growthType: p.growthType,
      growthValue: p.growthValue, growthInterval: p.growthInterval,
      projectionDuration: p.projectionDuration, durationUnit: p.durationUnit,
    }));
    primaryRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setSnapA(null); setSnapB(null);
    primaryRef.current?.focus();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `data-growth-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `data-growth-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
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
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const handleDownloadChart = () => {
    exportCanvasAsPng(chartContainerRef.current, `data-growth-chart-${Date.now()}.png`);
  };

  const p = inputs.decimalPrecision;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Data Growth Calculator</p>
          <p className="text-xs text-gray-400 font-mono">
            {inputs.growthType === "fixed" ? "Final Size = Initial Size + (Growth × Periods)" : "Final Size = Initial Size × (1 + Growth Rate)^Periods"}
          </p>
          <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Load example:</span>
            {PRESETS.map((preset) => (
              <button key={preset.label} type="button" onClick={() => handlePreset(preset)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                <span>{preset.icon}</span><span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Storage Inputs</h3>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <NumField refEl={primaryRef} id="dgc-initial" label="Initial Data Size" value={inputs.initialSize} onChange={(v) => set("initialSize", v)} placeholder="100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dgc-unit">Unit</label>
                  <select id="dgc-unit" value={inputs.storageUnit} onChange={(e) => set("storageUnit", e.target.value as StorageUnit)}
                    className="w-full px-2 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {UNIT_ORDER.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dgc-growth-type">Growth Type</label>
                <select id="dgc-growth-type" value={inputs.growthType} onChange={(e) => set("growthType", e.target.value as GrowthType)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  <option value="fixed">Fixed Growth</option>
                  <option value="percentage">Percentage Growth (Compound)</option>
                </select>
              </div>

              <NumField
                id="dgc-growth-value"
                label={inputs.growthType === "fixed" ? `Growth Value (${inputs.storageUnit} per period)` : "Growth Value (% per period)"}
                value={inputs.growthValue}
                onChange={(v) => set("growthValue", v)}
                placeholder={inputs.growthType === "fixed" ? "10" : "15"}
                step={inputs.growthType === "percentage" ? "0.1" : "1"}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dgc-interval">Growth Interval</label>
                <select id="dgc-interval" value={inputs.growthInterval} onChange={(e) => set("growthInterval", e.target.value as GrowthInterval)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {GROWTH_INTERVAL_ORDER.map((i) => <option key={i} value={i}>{GROWTH_INTERVAL_META[i].label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <NumField id="dgc-duration" label="Projection Duration" value={inputs.projectionDuration} onChange={(v) => set("projectionDuration", v)} placeholder="24" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dgc-duration-unit">Duration Unit</label>
                  <select id="dgc-duration-unit" value={inputs.durationUnit} onChange={(e) => set("durationUnit", e.target.value as DurationUnit)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {DURATION_UNIT_ORDER.map((u) => <option key={u} value={u}>{DURATION_UNIT_META[u].label}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {showAdvanced ? "− Hide" : "+ Show"} Optional Inputs
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dgc-precision">Decimal Precision</label>
                    <select id="dgc-precision" value={inputs.decimalPrecision} onChange={(e) => set("decimalPrecision", parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                      {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                    </select>
                  </div>
                  <NumField id="dgc-cost" label="Cost per GB ($)" value={inputs.costPerGB} onChange={(v) => set("costPerGB", v)} placeholder="Optional" step="0.01" hint="Estimates total storage cost at the final projected size." />
                </div>
              )}

              {result.warning && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.warning}</p>
              )}
              {result.highGrowthWarning && (
                <p className="text-xs text-orange-700 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">⚠ {result.highGrowthWarning}</p>
              )}

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    {copied ? "✓ Copied!" : "Copy Results"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setSnapA({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as A</button>
                  <button onClick={() => setSnapB({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as B</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export CSV</button>
                  <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export JSON</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
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
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Projected Final Size</p>
              <p className="text-3xl font-bold font-mono tabular-nums mb-3">{formatSize(result.finalMB, p)}</p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-3">
                <div>
                  <p className="text-primary-100 text-xs">Total Growth</p>
                  <p className="font-semibold font-mono">{formatSize(result.totalGrowthMB, p)}</p>
                </div>
                <div>
                  <p className="text-primary-100 text-xs">Percentage Increase</p>
                  <p className="font-semibold font-mono">{result.percentageIncrease.toFixed(p)}%</p>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <MetricCard label="Initial Size" value={formatSize(result.initialMB, p)} />
              <MetricCard label="Average Growth / Period" value={formatSize(result.averageGrowthPerPeriodMB, p)} />
              <MetricCard label="Total Periods" value={result.periods.toFixed(1)} />
              {result.estimatedCost !== null && (
                <MetricCard label="Estimated Storage Cost" value={`$${result.estimatedCost.toFixed(2)}`} />
              )}
            </div>

            {/* Chart */}
            <div ref={chartContainerRef} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Growth Projection Chart</h3>
                <button onClick={handleDownloadChart} className="text-xs text-primary font-medium hover:underline">Download PNG</button>
              </div>
              <DataGrowthChart seriesA={result.chartData} seriesB={snapB ? snapB.result.chartData : null} />
              {snapB && <p className="text-xs text-gray-400 mt-2">Green = current scenario, blue = Scenario B.</p>}
            </div>

            {/* Growth timeline table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Growth Timeline</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Period</th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-700">Projected Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {result.timeline.map((row) => (
                      <tr key={row.period} className="hover:bg-gray-50">
                        <td className="py-2 px-4 text-gray-700">{GROWTH_INTERVAL_META[inputs.growthInterval].periodLabel} {row.period}</td>
                        <td className="py-2 px-4 text-right font-mono text-primary font-semibold">{formatSize(row.sizeMB, p)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formula & breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Formula &amp; Calculation Breakdown</h3>
              </div>
              <div className="divide-y divide-gray-50">
                <div className="px-5 py-3">
                  <p className="text-xs text-gray-500 mb-1">Formula</p>
                  <p className="text-sm font-mono text-gray-800">{result.formula}</p>
                </div>
                <div className="px-5 py-3">
                  <p className="text-xs text-gray-500 mb-1">Calculation</p>
                  <p className="text-sm font-mono text-gray-800">{result.breakdown}</p>
                </div>
              </div>
            </div>

            {/* Compare scenarios */}
            {(snapA || snapB) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare Scenarios</h3>
                  <button onClick={() => { setSnapA(null); setSnapB(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {([["A", snapA], ["B", snapB]] as const).map(([label, s]) => (
                    <div key={label} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Scenario {label}</span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? formatSize(s.result.finalMB, 2) : "— not set —"}</span>
                      </div>
                      {s && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, (s.result.finalMB / (Math.max(snapA?.result.finalMB ?? 0, snapB?.result.finalMB ?? 0) || 1)) * 100)}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
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
                        <span className="text-sm font-semibold text-gray-900">{formatSize(entry.result.finalMB, 2)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.inputs.growthType === "fixed" ? "Fixed" : "Percentage"} growth · {GROWTH_INTERVAL_META[entry.inputs.growthInterval].label}
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
      <DataGrowthCalculatorSEO />

      <RelatedTools />
    </>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold font-mono text-primary tabular-nums">{value}</p>
    </div>
  );
}

function NumField({
  id, label, value, onChange, placeholder, hint, step, refEl,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  hint?: string;
  step?: string;
  refEl?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
      <input
        ref={refEl}
        id={id} type="number" min="0" step={step ?? "1"} inputMode="decimal"
        value={value || ""}
        onChange={(e) => onChange(parseNum(e.target.value))}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
