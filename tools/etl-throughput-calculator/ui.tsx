"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateEtl, debounce, parseNum, formatFull, formatDecimal, formatDataSize, formatDuration,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  MODE_META, MODE_ORDER, PRESETS,
  TIME_UNIT_META, TIME_UNIT_ORDER, DATA_UNIT_ORDER, DEFAULT_INPUTS,
  type Mode, type TimeUnit, type DataUnit, type EtlInputs, type EtlResult, type HistoryEntry,
} from "./logic";
import ThroughputTrendChart from "./chart";
import EtlThroughputCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function EtlThroughputCalculatorUI() {
  const [inputs, setInputs] = useState<EtlInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<EtlResult>(calculateEtl(DEFAULT_INPUTS));
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapCurrent, setSnapCurrent] = useState<{ inputs: EtlInputs; result: EtlResult } | null>(null);
  const [snapOptimized, setSnapOptimized] = useState<{ inputs: EtlInputs; result: EtlResult } | null>(null);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else primaryRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: EtlInputs) => { setResult(calculateEtl(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof EtlInputs>(field: K, val: EtlInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mode: p.mode,
      totalRecords: p.totalRecords ?? prev.totalRecords,
      executionTimeValue: p.executionTimeValue ?? prev.executionTimeValue,
      executionTimeUnit: p.executionTimeUnit ?? prev.executionTimeUnit,
      dataSize: p.dataSize ?? prev.dataSize,
      dataSizeUnit: p.dataSizeUnit ?? prev.dataSizeUnit,
    }));
    primaryRef.current?.focus();
  };

  const handleSwapTimeUnit = () => {
    const idx = TIME_UNIT_ORDER.indexOf(inputs.executionTimeUnit);
    set("executionTimeUnit", TIME_UNIT_ORDER[(idx + 1) % TIME_UNIT_ORDER.length]);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setSnapCurrent(null); setSnapOptimized(null);
    primaryRef.current?.focus();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `etl-throughput-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `etl-throughput-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
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

  const meta = MODE_META[inputs.mode];
  const p = inputs.decimalPrecision;
  const chartColor = result.recordTier?.color ?? result.dataTier?.color ?? "#058554";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</p>
          <select
            id="etl-mode" value={inputs.mode}
            onChange={(e) => set("mode", e.target.value as Mode)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
          >
            {MODE_ORDER.map((m) => <option key={m} value={m}>{MODE_META[m].label}</option>)}
          </select>
          <p className="text-xs text-gray-400 mt-2 font-mono">{meta.hint}</p>

          {(inputs.mode === "records" || inputs.mode === "data") && (
            <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Load example:</span>
              {PRESETS.map((preset) => (
                <button key={preset.label} type="button" onClick={() => handlePreset(preset)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                  <span>{preset.icon}</span><span>{preset.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Pipeline Inputs</h3>

              {inputs.mode === "records" && (
                <>
                  <NumField refEl={primaryRef} id="etl-total-records" label="Total Records" value={inputs.totalRecords} onChange={(v) => set("totalRecords", v)} placeholder="5000000" />
                  <TimeField value={inputs.executionTimeValue} unit={inputs.executionTimeUnit} onValueChange={(v) => set("executionTimeValue", v)} onUnitChange={(u) => set("executionTimeUnit", u)} label="Execution Time" onSwap={handleSwapTimeUnit} />
                </>
              )}

              {inputs.mode === "data" && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <NumField refEl={primaryRef} id="etl-data-size" label="Data Size" value={inputs.dataSize} onChange={(v) => set("dataSize", v)} placeholder="120" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="etl-data-unit">Unit</label>
                      <select id="etl-data-unit" value={inputs.dataSizeUnit} onChange={(e) => set("dataSizeUnit", e.target.value as DataUnit)}
                        className="w-full px-2 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                        {DATA_UNIT_ORDER.map((u) => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <TimeField value={inputs.executionTimeValue} unit={inputs.executionTimeUnit} onValueChange={(v) => set("executionTimeValue", v)} onUnitChange={(u) => set("executionTimeUnit", u)} label="Execution Time" onSwap={handleSwapTimeUnit} />
                </>
              )}

              {inputs.mode === "completion" && (
                <>
                  <NumField refEl={primaryRef} id="etl-dataset-records" label="Dataset Size (Records)" value={inputs.datasetRecords} onChange={(v) => set("datasetRecords", v)} placeholder="1000000" />
                  <NumField id="etl-speed" label="Processing Speed (records/sec)" value={inputs.processingSpeed} onChange={(v) => set("processingSpeed", v)} placeholder="5000" />
                  <NumField id="etl-desired" label="Desired Throughput (records/sec)" value={inputs.desiredThroughput} onChange={(v) => set("desiredThroughput", v)} placeholder="Optional" hint="Compare your actual processing speed against a target throughput." />
                </>
              )}

              {inputs.mode === "capacity" && (
                <>
                  <NumField refEl={primaryRef} id="etl-avg" label="Average Records" value={inputs.averageRecords} onChange={(v) => set("averageRecords", v)} placeholder="1000000" />
                  <NumField id="etl-peak" label="Peak Records" value={inputs.peakRecords} onChange={(v) => set("peakRecords", v)} placeholder="2000000" />
                  <TimeField value={inputs.pipelineRuntimeValue} unit={inputs.pipelineRuntimeUnit} onValueChange={(v) => set("pipelineRuntimeValue", v)} onUnitChange={(u) => set("pipelineRuntimeUnit", u)} label="Pipeline Runtime (at Average Load)" />
                  <TimeField value={inputs.targetSlaValue} unit={inputs.targetSlaUnit} onValueChange={(v) => set("targetSlaValue", v)} onUnitChange={(u) => set("targetSlaUnit", u)} label="Target SLA (for Peak Load)" />
                  <NumField id="etl-growth" label="Expected Growth (%)" value={inputs.expectedGrowthPercent} onChange={(v) => set("expectedGrowthPercent", v)} placeholder="20" hint="Projects peak load growth to check future capacity sufficiency." />
                </>
              )}

              {result.warning && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.warning}</p>
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
                  <button onClick={() => setSnapCurrent({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Set as Current</button>
                  <button onClick={() => setSnapOptimized({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Set as Optimized</button>
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
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>{meta.short} — Result</p>

              {inputs.mode === "records" && result.recordsPerSecond !== null && (
                <>
                  <p className="text-3xl font-bold font-mono tabular-nums">{formatDecimal(result.recordsPerSecond, p)} <span className="text-lg">records/sec</span></p>
                  {result.recordTier && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15">
                      {result.recordTier.emoji} {result.recordTier.label}
                    </div>
                  )}
                </>
              )}
              {inputs.mode === "data" && result.mbPerSecond !== null && (
                <>
                  <p className="text-3xl font-bold font-mono tabular-nums">{formatDecimal(result.mbPerSecond, p)} <span className="text-lg">MB/sec</span></p>
                  {result.dataTier && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15">
                      {result.dataTier.emoji} {result.dataTier.label}
                    </div>
                  )}
                </>
              )}
              {inputs.mode === "completion" && result.completionSeconds !== null && (
                <>
                  <p className="text-3xl font-bold font-mono tabular-nums">{formatDuration(result.completionSeconds)}</p>
                  {result.meetsDesiredThroughput !== null && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15">
                      {result.meetsDesiredThroughput ? "✓ Meets Desired Throughput" : "✕ Below Desired Throughput"}
                    </div>
                  )}
                </>
              )}
              {inputs.mode === "capacity" && result.currentThroughput !== null && (
                <>
                  <p className="text-3xl font-bold font-mono tabular-nums">{formatDecimal(result.currentThroughput, p)} <span className="text-lg">records/sec</span></p>
                  <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15">
                    {result.isSufficient ? "✓ Sufficient for SLA" : "✕ Insufficient for SLA"}
                  </div>
                </>
              )}

              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {/* Metric cards */}
            {inputs.mode === "records" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <MetricCard label="Records/min" value={formatDecimal(result.recordsPerMinute ?? 0, p)} />
                <MetricCard label="Records/hour" value={formatFull(result.recordsPerHour ?? 0)} />
                <MetricCard label="Daily Capacity" value={formatFull(result.dailyCapacityRecords ?? 0)} />
                <MetricCard label="Weekly Capacity" value={formatFull(result.weeklyCapacityRecords ?? 0)} />
                <MetricCard label="Monthly Capacity" value={formatFull(result.monthlyCapacityRecords ?? 0)} />
              </div>
            )}
            {inputs.mode === "data" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <MetricCard label="Hourly Capacity" value={formatDataSize(result.hourlyCapacityMB ?? 0, p)} />
                <MetricCard label="Daily Capacity" value={formatDataSize(result.dailyCapacityMB ?? 0, p)} />
                <MetricCard label="Weekly Capacity" value={formatDataSize(result.weeklyCapacityMB ?? 0, p)} />
                <MetricCard label="Monthly Capacity" value={formatDataSize(result.monthlyCapacityMB ?? 0, p)} />
              </div>
            )}
            {inputs.mode === "completion" && result.desiredCompletionSeconds !== null && (
              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Completion at Desired Rate" value={formatDuration(result.desiredCompletionSeconds)} />
                <MetricCard label="Processing Speed" value={`${formatDecimal(inputs.processingSpeed, p)} rec/s`} />
              </div>
            )}
            {inputs.mode === "capacity" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <MetricCard label="Required Throughput (SLA)" value={formatDecimal(result.requiredThroughput ?? 0, p)} />
                <MetricCard label="Shortfall" value={`${(result.shortfallPercent ?? 0).toFixed(1)}%`} />
                <MetricCard label="Projected Peak (+Growth)" value={formatFull(result.projectedPeakRecords ?? 0)} />
                <MetricCard label="Required After Growth" value={formatDecimal(result.projectedRequiredThroughput ?? 0, p)} />
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs text-gray-500 mb-1">Sufficient After Growth</p>
                  <p className={`text-xl font-bold tabular-nums ${result.projectedIsSufficient ? "text-primary" : "text-red-600"}`}>{result.projectedIsSufficient ? "Yes" : "No"}</p>
                </div>
              </div>
            )}

            {/* Trend chart */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Throughput Trend</h3>
              <ThroughputTrendChart data={result.trend} color={chartColor} />
              <p className="text-xs text-gray-400 mt-2">Cumulative volume processed over the pipeline's run window at the calculated throughput.</p>
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

            {/* Compare: Current vs Optimized */}
            {(snapCurrent || snapOptimized) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare: Current vs Optimized</h3>
                  <button onClick={() => { setSnapCurrent(null); setSnapOptimized(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {([["Current", snapCurrent, "bg-blue-400"], ["Optimized", snapOptimized, "bg-primary"]] as const).map(([label, s, barColor]) => {
                    const primaryValue = s?.result.recordsPerSecond ?? s?.result.mbPerSecond ?? s?.result.currentThroughput ?? 0;
                    const maxValue = Math.max(
                      snapCurrent?.result.recordsPerSecond ?? snapCurrent?.result.mbPerSecond ?? snapCurrent?.result.currentThroughput ?? 0,
                      snapOptimized?.result.recordsPerSecond ?? snapOptimized?.result.mbPerSecond ?? snapOptimized?.result.currentThroughput ?? 0
                    ) || 1;
                    return (
                      <div key={label} className="px-5 py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{label}</span>
                          <span className="text-sm font-semibold font-mono text-gray-800">{s ? formatDecimal(primaryValue, p) : "— not set —"}</span>
                        </div>
                        {s && (
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${Math.min(100, (primaryValue / maxValue) * 100)}%` }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                        <span className="text-sm font-semibold text-gray-900">{MODE_META[entry.inputs.mode].short}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.recordsPerSecond !== null && `${formatDecimal(entry.result.recordsPerSecond, 2)} records/sec`}
                        {entry.result.mbPerSecond !== null && `${formatDecimal(entry.result.mbPerSecond, 2)} MB/sec`}
                        {entry.result.completionSeconds !== null && formatDuration(entry.result.completionSeconds)}
                        {entry.result.currentThroughput !== null && `${formatDecimal(entry.result.currentThroughput, 2)} records/sec`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <EtlThroughputCalculatorSEO />

      <RelatedTools
        currentTool="etl-throughput-calculator"
        tools={[
          "data-growth-calculator",
          "session-duration-calculator",
          "page-speed-score-calculator",
          "user-growth-rate-calculator",
          "scroll-depth-calculator",
          "mean-calculator",
        ]}
      />
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
  id, label, value, onChange, placeholder, hint, refEl,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  hint?: string;
  refEl?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
      <input
        ref={refEl}
        id={id} type="number" min="0" step="1" inputMode="decimal"
        value={value || ""}
        onChange={(e) => onChange(parseNum(e.target.value))}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function TimeField({
  value, unit, onValueChange, onUnitChange, label, onSwap,
}: {
  value: number;
  unit: TimeUnit;
  onValueChange: (v: number) => void;
  onUnitChange: (u: TimeUnit) => void;
  label: string;
  onSwap?: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {onSwap && <button type="button" onClick={onSwap} className="text-xs text-primary hover:underline">Swap Unit</button>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <input
            type="number" min="0" step="1" inputMode="decimal"
            value={value || ""}
            onChange={(e) => onValueChange(parseNum(e.target.value))}
            placeholder="10"
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
        <select value={unit} onChange={(e) => onUnitChange(e.target.value as TimeUnit)}
          className="w-full px-2 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
          {TIME_UNIT_ORDER.map((u) => <option key={u} value={u}>{TIME_UNIT_META[u].label}</option>)}
        </select>
      </div>
    </div>
  );
}
