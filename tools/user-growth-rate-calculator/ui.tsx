"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateGrowth, debounce, parseNum, formatFull, formatSigned,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  PRESETS, PERIOD_META, PERIOD_ORDER, DEFAULT_INPUTS,
  type TimePeriod, type GrowthInputs, type GrowthResult, type HistoryEntry,
} from "./logic";
import GrowthGauge from "./gauge";
import GrowthProjectionChart from "./chart";
import UserGrowthRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4];

export default function UserGrowthRateCalculatorUI() {
  const [inputs, setInputs] = useState<GrowthInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<GrowthResult>(calculateGrowth(DEFAULT_INPUTS));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: GrowthInputs; result: GrowthResult } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: GrowthInputs; result: GrowthResult } | null>(null);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else primaryRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: GrowthInputs) => { setResult(calculateGrowth(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof GrowthInputs>(field: K, val: GrowthInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, startingUsers: p.startingUsers, endingUsers: p.endingUsers }));
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
    a.download = `user-growth-rate-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `user-growth-rate-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
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

  const p = inputs.decimalPrecision;
  const trendIcon = result.direction === "positive" ? "▲" : result.direction === "negative" ? "▼" : "–";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>User Growth Rate Calculator</p>
          <p className="text-xs text-gray-400 font-mono">Growth Rate (%) = ((Ending Users − Starting Users) ÷ Starting Users) × 100</p>
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
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>User Counts</h3>

              <NumField refEl={primaryRef} id="ugrc-starting" label="Starting Users" value={inputs.startingUsers} onChange={(v) => set("startingUsers", v)} placeholder="1000" />
              <NumField id="ugrc-ending" label="Ending Users" value={inputs.endingUsers} onChange={(v) => set("endingUsers", v)} placeholder="1250" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ugrc-period">Time Period</label>
                <select id="ugrc-period" value={inputs.timePeriod} onChange={(e) => set("timePeriod", e.target.value as TimePeriod)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PERIOD_ORDER.map((p) => <option key={p} value={p}>{PERIOD_META[p].label}</option>)}
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {showAdvanced ? "− Hide" : "+ Show"} Optional Settings
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ugrc-precision">Decimal Precision</label>
                    <select id="ugrc-precision" value={inputs.decimalPrecision} onChange={(e) => set("decimalPrecision", parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                      {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                    </select>
                  </div>
                  <NumField id="ugrc-periods" label="Projection Periods" value={inputs.projectionPeriods} onChange={(v) => set("projectionPeriods", Math.min(60, Math.max(1, Math.round(v))))} placeholder="6" hint="Number of future periods to project on the growth chart." />
                </div>
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
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <GrowthGauge ratePct={result.growthRatePct} color={result.tier.color} />
                <div className="flex-1 w-full">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Growth Rate — Result</p>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${result.tier.bg} ${result.tier.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${result.tier.dot}`} />
                    {trendIcon} {result.tier.label}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Net Growth</p>
                      <p className={`text-xl font-bold font-mono tabular-nums ${result.direction === "negative" ? "text-red-600" : "text-gray-900"}`}>{formatSigned(result.netChange)} Users</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Time Period</p>
                      <p className="text-xl font-bold text-gray-900">{PERIOD_META[inputs.timePeriod].label}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{result.tier.message}</p>
                </div>
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                <button onClick={handleCopy} className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-hover transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <MetricCard label="Starting Users" value={formatFull(inputs.startingUsers)} />
              <MetricCard label="Ending Users" value={formatFull(inputs.endingUsers)} />
              <MetricCard label="Net Change" value={formatSigned(result.netChange)} />
              {result.annualizedPct !== null && (
                <MetricCard label="Annualized Growth Rate" value={`${result.annualizedPct.toFixed(p)}%`} />
              )}
            </div>

            {/* Growth timeline / horizontal meter */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Growth Meter</h3>
              {(() => {
                const METER_MIN = -50, METER_MAX = 100, METER_RANGE = METER_MAX - METER_MIN;
                const clamped = Math.min(METER_MAX, Math.max(METER_MIN, result.growthRatePct));
                const zeroPct = ((0 - METER_MIN) / METER_RANGE) * 100;
                const valuePct = ((clamped - METER_MIN) / METER_RANGE) * 100;
                const left = Math.min(zeroPct, valuePct);
                const width = Math.abs(valuePct - zeroPct);
                return (
                  <div className="w-full bg-gray-100 rounded-full h-3 relative mb-2">
                    <div className="absolute top-0 h-3 w-0.5 bg-gray-400" style={{ left: `${zeroPct}%` }} />
                    <div
                      className="absolute top-0 h-3 rounded-full transition-all duration-500"
                      style={{ backgroundColor: result.tier.color, left: `${left}%`, width: `${width}%` }}
                    />
                  </div>
                );
              })()}
              <p className="text-xs text-gray-400">Meter scaled from -50% to +100%, marker shows the 0% baseline.</p>
            </div>

            {/* Projection chart */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>User Growth Projection</h3>
              <GrowthProjectionChart data={result.projection} color={result.tier.color} />
              <p className="text-xs text-gray-400 mt-2">Projects forward from {formatFull(inputs.endingUsers)} users at the current {result.growthRatePct.toFixed(p)}% per-period rate for {inputs.projectionPeriods} periods.</p>
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
                        <span className="text-sm text-gray-600">Scenario {label}{s ? ` — ${s.result.tier.label}` : ""}</span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? `${s.result.growthRatePct.toFixed(2)}%` : "— not set —"}</span>
                      </div>
                      {s && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, (Math.abs(s.result.growthRatePct) / (Math.max(Math.abs(snapA?.result.growthRatePct ?? 0), Math.abs(snapB?.result.growthRatePct ?? 0)) || 1)) * 100)}%` }} />
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
                        <span className="text-sm font-semibold text-gray-900">{entry.result.growthRatePct.toFixed(2)}% growth</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{entry.result.tier.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <UserGrowthRateCalculatorSEO />

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
