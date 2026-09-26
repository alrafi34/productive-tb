"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateAdSpend, debounce, parseNum,
  formatFull, formatMoney,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  MODE_META, MODE_ORDER, CURRENCIES, CURRENCY_ORDER, PLATFORM_PRESETS, DEFAULT_INPUTS,
  type Mode, type AdSpendInputs, type AdSpendResult, type HistoryEntry,
} from "./logic";
import AdSpendCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function AdSpendCalculatorUI() {
  const [inputs, setInputs] = useState<AdSpendInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<AdSpendResult>(calculateAdSpend(DEFAULT_INPUTS));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: AdSpendInputs; result: AdSpendResult } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: AdSpendInputs; result: AdSpendResult } | null>(null);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else primaryRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: AdSpendInputs) => { setResult(calculateAdSpend(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof AdSpendInputs>(field: K, val: AdSpendInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handlePreset = (p: typeof PLATFORM_PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, mode: "cpc", clicks: p.clicks, cpc: p.cpc }));
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
    a.download = `ad-spend-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `ad-spend-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
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
  const sym = CURRENCIES[inputs.currency]?.symbol ?? "$";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</p>
          <select
            id="asc-mode" value={inputs.mode}
            onChange={(e) => set("mode", e.target.value as Mode)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
          >
            {MODE_ORDER.map((m) => <option key={m} value={m}>{MODE_META[m].label}</option>)}
          </select>
          <p className="text-xs text-gray-400 mt-2 font-mono">{meta.hint}</p>

          <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Platform presets:</span>
            {PLATFORM_PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${inputs.mode === "cpc" && inputs.clicks === p.clicks && inputs.cpc === p.cpc ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                <span>{p.icon}</span><span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Budget Inputs</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="asc-currency">Currency</label>
                <select id="asc-currency" value={inputs.currency} onChange={(e) => set("currency", e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {CURRENCY_ORDER.map((c) => <option key={c} value={c}>{CURRENCIES[c].label}</option>)}
                </select>
              </div>

              {inputs.mode === "cpc" && (
                <>
                  <NumField refEl={primaryRef} id="asc-clicks" label="Desired Clicks" value={inputs.clicks} onChange={(v) => set("clicks", v)} placeholder="5000" />
                  <NumField id="asc-cpc" label={`Average CPC (${sym})`} value={inputs.cpc} onChange={(v) => set("cpc", v)} placeholder="0.80" step="0.01" />
                </>
              )}
              {inputs.mode === "cpm" && (
                <>
                  <NumField refEl={primaryRef} id="asc-impressions" label="Desired Impressions" value={inputs.impressions} onChange={(v) => set("impressions", v)} placeholder="2000000" />
                  <NumField id="asc-cpm" label={`Average CPM (${sym})`} value={inputs.cpm} onChange={(v) => set("cpm", v)} placeholder="8" step="0.01" />
                </>
              )}
              {inputs.mode === "cpa" && (
                <>
                  <NumField refEl={primaryRef} id="asc-conversions" label="Target Conversions" value={inputs.conversions} onChange={(v) => set("conversions", v)} placeholder="300" />
                  <NumField id="asc-cpa" label={`Average CPA (${sym})`} value={inputs.cpa} onChange={(v) => set("cpa", v)} placeholder="20" step="0.01" />
                </>
              )}
              {inputs.mode === "roas" && (
                <>
                  <NumField refEl={primaryRef} id="asc-revenue-roas" label={`Revenue Goal (${sym})`} value={inputs.revenueGoal} onChange={(v) => set("revenueGoal", v)} placeholder="50000" />
                  <NumField id="asc-roas" label="Expected ROAS" value={inputs.roas} onChange={(v) => set("roas", v)} placeholder="5" step="0.1" hint="Return on ad spend, e.g. 5 means $5 revenue per $1 spent." />
                </>
              )}
              {inputs.mode === "roi" && (
                <>
                  <NumField refEl={primaryRef} id="asc-revenue-roi" label={`Revenue Goal (${sym})`} value={inputs.revenueGoal} onChange={(v) => set("revenueGoal", v)} placeholder="50000" />
                  <NumField id="asc-roi" label="Expected ROI (%)" value={inputs.roiPercent} onChange={(v) => set("roiPercent", v)} placeholder="250" hint="e.g. 250% ROI means $2.50 profit per $1 spent." />
                </>
              )}
              {inputs.mode === "revenue" && (
                <>
                  <NumField refEl={primaryRef} id="asc-revenue-goal" label={`Revenue Goal (${sym})`} value={inputs.revenueGoal} onChange={(v) => set("revenueGoal", v)} placeholder="50000" />
                  <NumField id="asc-aov" label={`Average Order Value (${sym})`} value={inputs.aov} onChange={(v) => set("aov", v)} placeholder="100" />
                  <NumField id="asc-cpa-rev" label={`Average CPA (${sym})`} value={inputs.cpa} onChange={(v) => set("cpa", v)} placeholder="20" step="0.01" />
                </>
              )}
              {inputs.mode === "custom" && (
                <NumField refEl={primaryRef} id="asc-custom" label={`Total Budget (${sym})`} value={inputs.customBudget} onChange={(v) => set("customBudget", v)} placeholder="5000" hint="Enter a known total budget to break it down into daily, weekly, and monthly spend." />
              )}

              <div className="pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {showAdvanced ? "− Hide" : "+ Show"} Advanced Options
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  <NumField id="asc-days" label="Campaign Duration (Days)" value={inputs.campaignDays} onChange={(v) => set("campaignDays", v)} placeholder="30" />
                  <NumField id="asc-daily-override" label={`Daily Budget Override (${sym})`} value={inputs.dailyOverride ?? 0} onChange={(v) => set("dailyOverride", v > 0 ? v : null)} placeholder="Optional" />
                  <NumField id="asc-monthly-override" label={`Monthly Budget Override (${sym})`} value={inputs.monthlyOverride ?? 0} onChange={(v) => set("monthlyOverride", v > 0 ? v : null)} placeholder="Optional" />
                  <div className="grid grid-cols-3 gap-2">
                    <NumField id="asc-tax" label="Tax (%)" value={inputs.taxPercent} onChange={(v) => set("taxPercent", v)} placeholder="0" compact />
                    <NumField id="asc-fee" label="Mgmt Fee (%)" value={inputs.feePercent} onChange={(v) => set("feePercent", v)} placeholder="0" compact />
                    <NumField id="asc-buffer" label="Buffer (%)" value={inputs.bufferPercent} onChange={(v) => set("bufferPercent", v)} placeholder="10" compact />
                  </div>
                </div>
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
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {meta.short} — Result
              </p>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-primary-100 text-xs mb-0.5">Estimated Ad Spend</p>
                  <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{formatMoney(result.baseBudget, inputs.currency)}</p>
                </div>
                <div>
                  <p className="text-primary-100 text-xs mb-0.5">Recommended Total Budget</p>
                  <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{formatMoney(result.recommendedBudget, inputs.currency)}</p>
                  <p className="text-primary-100 text-xs">incl. buffer, fee &amp; tax</p>
                </div>
              </div>
              <div className="border-t border-white/20 pt-3 grid grid-cols-3 gap-2 text-sm mb-4">
                <div>
                  <p className="text-primary-100 text-xs">Daily</p>
                  <p className="font-semibold font-mono">{formatMoney(result.dailyBudget, inputs.currency)}</p>
                </div>
                <div>
                  <p className="text-primary-100 text-xs">Weekly</p>
                  <p className="font-semibold font-mono">{formatMoney(result.weeklyBudget, inputs.currency)}</p>
                </div>
                <div>
                  <p className="text-primary-100 text-xs">Monthly</p>
                  <p className="font-semibold font-mono">{formatMoney(result.monthlyBudget, inputs.currency)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {/* Revenue/ROI metrics (only for modes with a revenue figure) */}
            {result.projectedRevenue !== null && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MetricCard label="Projected Revenue" value={formatMoney(result.projectedRevenue, inputs.currency)} />
                <MetricCard label="Expected Profit" value={formatMoney(result.expectedProfit ?? 0, inputs.currency)} />
                <MetricCard label="ROAS" value={`${result.roas?.toFixed(2)}×`} />
                <MetricCard label="ROI" value={`${result.roiPercent?.toFixed(1)}%`} />
              </div>
            )}
            {inputs.mode === "cpc" && (
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Expected Clicks" value={formatFull(inputs.clicks)} />
                <MetricCard label="Average CPC" value={formatMoney(inputs.cpc, inputs.currency)} />
                <MetricCard label="Estimated Click Cost" value={formatMoney(inputs.cpc, inputs.currency)} />
              </div>
            )}
            {inputs.mode === "cpm" && (
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Expected Impressions" value={formatFull(inputs.impressions)} />
                <MetricCard label="Average CPM" value={formatMoney(inputs.cpm, inputs.currency)} />
                <MetricCard label="Est. Impression Cost" value={formatMoney(inputs.cpm, inputs.currency)} />
              </div>
            )}
            {inputs.mode === "cpa" && (
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Target Conversions" value={formatFull(inputs.conversions)} />
                <MetricCard label="Average CPA" value={formatMoney(inputs.cpa, inputs.currency)} />
                <MetricCard label="Est. Conversion Cost" value={formatMoney(inputs.cpa, inputs.currency)} />
              </div>
            )}
            {inputs.mode === "revenue" && result.requiredConversions !== null && (
              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Required Conversions" value={result.requiredConversions.toFixed(1)} />
                <MetricCard label="Average Order Value" value={formatMoney(inputs.aov, inputs.currency)} />
              </div>
            )}

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
                        <span className="text-sm text-gray-600">Scenario {label}{s ? ` — ${MODE_META[s.inputs.mode].short}` : ""}</span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? formatMoney(s.result.recommendedBudget, s.inputs.currency) : "— not set —"}</span>
                      </div>
                      {s && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, (s.result.recommendedBudget / (Math.max(snapA?.result.recommendedBudget ?? 0, snapB?.result.recommendedBudget ?? 0) || 1)) * 100)}%` }} />
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
                        <span className="text-sm font-semibold text-gray-900">{MODE_META[entry.inputs.mode].short}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {formatMoney(entry.result.recommendedBudget, entry.inputs.currency)} total · {formatMoney(entry.result.dailyBudget, entry.inputs.currency)}/day
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
      <AdSpendCalculatorSEO />

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
