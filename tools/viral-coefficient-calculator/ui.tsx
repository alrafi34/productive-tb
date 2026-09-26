"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateViral, debounce, parseNum, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  PRESETS, DEFAULT_INPUTS,
  type ViralInputs, type ViralResult, type HistoryEntry,
} from "./logic";
import ViralGauge from "./gauge";
import GrowthTimelineChart from "./chart";
import ViralCoefficientCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4];

export default function ViralCoefficientCalculatorUI() {
  const [inputs, setInputs] = useState<ViralInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<ViralResult>(calculateViral(DEFAULT_INPUTS));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: ViralInputs; result: ViralResult } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: ViralInputs; result: ViralResult } | null>(null);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else primaryRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: ViralInputs) => { setResult(calculateViral(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof ViralInputs>(field: K, val: ViralInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, invitations: p.invitations, conversionRate: p.conversionRate }));
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
    a.download = `viral-coefficient-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `viral-coefficient-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
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
  const barPct = Math.min(100, (result.k / 3) * 100);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Examples */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Viral Coefficient (K-Factor) Calculator</p>
          <p className="text-xs text-gray-400 font-mono">K = Average Invitations × (Conversion Rate ÷ 100)</p>
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
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Referral Inputs</h3>

              <NumField refEl={primaryRef} id="vcc-invitations" label="Average Invitations Sent Per User" value={inputs.invitations} onChange={(v) => set("invitations", v)} placeholder="5" step="0.01" hint="How many people does a typical user invite or share with?" />
              <NumField id="vcc-conversion" label="Invitation Conversion Rate (%)" value={inputs.conversionRate} onChange={(v) => set("conversionRate", Math.min(100, v))} placeholder="20" step="0.01" hint="What percentage of invitations turn into a new signup?" />

              <div className="pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {showAdvanced ? "− Hide" : "+ Show"} Optional Inputs
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  <NumField id="vcc-existing" label="Existing Users" value={inputs.existingUsers} onChange={(v) => set("existingUsers", v)} placeholder="1000" hint="Used to estimate projected new users from your current K-factor." />
                  <NumField id="vcc-cycles" label="Referral Cycles (Generations)" value={inputs.referralCycles} onChange={(v) => set("referralCycles", Math.min(20, Math.max(1, Math.round(v))))} placeholder="5" hint="Number of compounding referral generations to project." />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="vcc-precision">Decimal Precision</label>
                    <select id="vcc-precision" value={inputs.decimalPrecision} onChange={(e) => set("decimalPrecision", parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                      {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                    </select>
                  </div>
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
                <ViralGauge k={result.k} color={result.tier.color} />
                <div className="flex-1 w-full">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Viral Coefficient — Result</p>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${result.tier.bg} ${result.tier.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${result.tier.dot}`} />
                    {result.tier.label}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1 relative">
                    <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${barPct}%`, backgroundColor: result.tier.color }} />
                    <div className="absolute top-0 h-2 w-0.5 bg-gray-400" style={{ left: `${(1 / 3) * 100}%` }} title="K = 1 threshold" />
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Bar scaled to K = 3.0, marker shows the K = 1 stable threshold.</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.tier.explanation}</p>
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
              <MetricCard label="Viral Coefficient (K)" value={formatNum(result.k, p)} />
              <MetricCard label="Projected New Users" value={formatNum(result.projectedNewUsers, p)} />
              <MetricCard label="Total After 1 Cycle" value={formatNum(result.totalUsersAfterOneCycle, p)} />
              <MetricCard label="Growth Status" value={result.growthDirection === "growing" ? "Growing" : result.growthDirection === "stable" ? "Stable" : "Declining"} />
              <MetricCard label="Growth Category" value={result.tier.label} />
              <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4`}>
                <p className="text-xs text-gray-500 mb-1">Referral Effectiveness</p>
                <p className={`text-xl font-bold tabular-nums ${result.effectiveness.text}`}>{result.effectiveness.label}</p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recommendation</h3>
              </div>
              <div className="px-5 py-4 text-sm text-gray-600 flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span>{result.tier.recommendation}</span>
              </div>
            </div>

            {/* Visualization + projection table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Compound Referral Growth Timeline</h3>
              <GrowthTimelineChart generations={result.generations} />
              <p className="text-xs text-gray-400 mt-2 mb-4">Cumulative users starting from {formatNum(inputs.existingUsers, 0)} existing users, compounding K = {formatNum(result.k, p)} across {inputs.referralCycles} generations.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Generation</th>
                      <th className="text-right py-2 px-3 font-semibold text-gray-700">New Users</th>
                      <th className="text-right py-2 px-3 font-semibold text-gray-700">Cumulative Users</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {result.generations.map((g) => (
                      <tr key={g.generation} className="hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Generation {g.generation}</td>
                        <td className="py-2 px-3 text-right font-mono text-gray-800">{formatNum(g.users, p)}</td>
                        <td className="py-2 px-3 text-right font-mono text-primary font-semibold">{formatNum(g.cumulative, p)}</td>
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
                        <span className="text-sm text-gray-600">Scenario {label}{s ? ` — K = ${formatNum(s.result.k, 2)}` : ""}</span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? s.result.tier.label : "— not set —"}</span>
                      </div>
                      {s && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, (s.result.k / (Math.max(snapA?.result.k ?? 0, snapB?.result.k ?? 0) || 1)) * 100)}%` }} />
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
                        <span className="text-sm font-semibold text-gray-900">K = {formatNum(entry.result.k, 2)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.tier.label}
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
      <ViralCoefficientCalculatorSEO />

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
  id, label, value, onChange, placeholder, hint, step, compact, refEl,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  hint?: string;
  step?: string;
  compact?: boolean;
  refEl?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label className={`block font-medium text-gray-700 mb-1.5 ${compact ? "text-xs" : "text-sm"}`} htmlFor={id}>{label}</label>
      <input
        ref={refEl}
        id={id} type="number" min="0" step={step ?? "1"} inputMode="decimal"
        value={value || ""}
        onChange={(e) => onChange(parseNum(e.target.value))}
        placeholder={placeholder}
        className={`w-full border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${compact ? "px-2 py-2 text-sm" : "px-3 py-2.5 text-sm"}`}
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
