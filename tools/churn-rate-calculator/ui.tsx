"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateChurn, debounce, parseNum,
  formatFull, formatMoney,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  MODE_META, MODE_ORDER, CUSTOMER_MODES, CURRENCIES, CURRENCY_ORDER, PRESETS, DEFAULT_INPUTS,
  type Mode, type ChurnInputs, type ChurnResult, type HistoryEntry,
} from "./logic";
import ChurnGauge from "./gauge";
import { RetentionPieChart, ChurnProjectionChart } from "./chart";
import ChurnRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ChurnRateCalculatorUI() {
  const [inputs, setInputs] = useState<ChurnInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<ChurnResult>(calculateChurn(DEFAULT_INPUTS));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: ChurnInputs; result: ChurnResult } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: ChurnInputs; result: ChurnResult } | null>(null);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else primaryRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: ChurnInputs) => { setResult(calculateChurn(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof ChurnInputs>(field: K, val: ChurnInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mode: p.mode,
      startingCustomers: p.startingCustomers ?? prev.startingCustomers,
      lostCustomers: p.lostCustomers ?? prev.lostCustomers,
      startingRevenue: p.startingRevenue ?? prev.startingRevenue,
      lostRevenue: p.lostRevenue ?? prev.lostRevenue,
      expansionRevenue: p.expansionRevenue ?? prev.expansionRevenue,
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
    a.download = `churn-rate-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `churn-rate-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
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
  const isCustomerMode = CUSTOMER_MODES.includes(inputs.mode);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</p>
          <select
            id="crc-mode" value={inputs.mode}
            onChange={(e) => set("mode", e.target.value as Mode)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
          >
            {MODE_ORDER.map((m) => <option key={m} value={m}>{MODE_META[m].label}</option>)}
          </select>
          <p className="text-xs text-gray-400 mt-2 font-mono">{meta.hint}</p>

          <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Load example:</span>
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                <span>{p.icon}</span><span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Churn Inputs</h3>

              {!isCustomerMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="crc-currency">Currency</label>
                  <select id="crc-currency" value={inputs.currency} onChange={(e) => set("currency", e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {CURRENCY_ORDER.map((c) => <option key={c} value={c}>{CURRENCIES[c].label}</option>)}
                  </select>
                </div>
              )}

              {isCustomerMode && (
                <>
                  <NumField refEl={primaryRef} id="crc-starting" label={`Starting Customers (per ${meta.periodLabel})`} value={inputs.startingCustomers} onChange={(v) => set("startingCustomers", v)} placeholder="1000" />
                  <NumField id="crc-lost" label="Lost Customers" value={inputs.lostCustomers} onChange={(v) => set("lostCustomers", v)} placeholder="50" hint="Cannot exceed starting customers." />
                </>
              )}
              {!isCustomerMode && (
                <>
                  <NumField refEl={primaryRef} id="crc-starting-revenue" label={`Starting Revenue / MRR (${sym})`} value={inputs.startingRevenue} onChange={(v) => set("startingRevenue", v)} placeholder="50000" />
                  <NumField id="crc-lost-revenue" label={`Lost Revenue (${sym})`} value={inputs.lostRevenue} onChange={(v) => set("lostRevenue", v)} placeholder="4000" hint="Cannot exceed starting revenue." />
                  <NumField id="crc-expansion-revenue" label={`Expansion Revenue (${sym})`} value={inputs.expansionRevenue} onChange={(v) => set("expansionRevenue", v)} placeholder="0" hint="Upgrades/upsells from existing customers — used for Net Revenue Churn." />
                </>
              )}

              <div className="pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {showAdvanced ? "− Hide" : "+ Show"} Optional Inputs
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  {isCustomerMode && (
                    <NumField id="crc-new" label="New Customers Acquired" value={inputs.newCustomersAcquired} onChange={(v) => set("newCustomersAcquired", v)} placeholder="0" hint="Used to estimate net customers remaining after this period." />
                  )}
                  {isCustomerMode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="crc-currency-2">Currency (for ARPU / CAC)</label>
                      <select id="crc-currency-2" value={inputs.currency} onChange={(e) => set("currency", e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                        {CURRENCY_ORDER.map((c) => <option key={c} value={c}>{CURRENCIES[c].label}</option>)}
                      </select>
                    </div>
                  )}
                  <NumField id="crc-arpu" label={`Average Revenue Per User (${sym})`} value={inputs.arpu} onChange={(v) => set("arpu", v)} placeholder="Optional" hint="Used to estimate Customer Lifetime Value." />
                  <NumField id="crc-cac" label={`Customer Acquisition Cost (${sym})`} value={inputs.cac} onChange={(v) => set("cac", v)} placeholder="Optional" hint="Used to estimate LTV:CAC ratio." />
                  <NumField id="crc-lifetime" label="Average Customer Lifetime (months)" value={inputs.avgLifetimeOverride ?? 0} onChange={(v) => set("avgLifetimeOverride", v > 0 ? v : null)} placeholder="Optional — auto-calculated from churn" />
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
                <ChurnGauge churnPct={result.churnRatePct} color={result.tier.color} />
                <div className="flex-1 w-full">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>{meta.short} — Result</p>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${result.tier.bg} ${result.tier.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${result.tier.dot}`} />
                    {result.tier.label}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Retention Rate</p>
                      <p className="text-xl font-bold font-mono text-gray-900 tabular-nums">{result.retentionRatePct.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Health Score</p>
                      <p className="text-xl font-bold font-mono text-gray-900 tabular-nums">{result.healthScore.toFixed(0)} / 100</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{result.tier.explanation}</p>
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
              {isCustomerMode ? (
                <>
                  <MetricCard label="Total Customers" value={formatFull(result.totalCustomers)} />
                  <MetricCard label="Customers Lost" value={formatFull(result.customersLost)} />
                  <MetricCard label="Customers Remaining" value={formatFull(result.customersRemaining)} />
                </>
              ) : (
                <>
                  <MetricCard label="Starting Revenue" value={formatMoney(result.totalCustomers, inputs.currency)} />
                  <MetricCard label="Lost Revenue" value={formatMoney(result.customersLost, inputs.currency)} />
                  <MetricCard label="Revenue Remaining" value={formatMoney(result.customersRemaining, inputs.currency)} />
                </>
              )}
              {result.netRevenueChurnPct !== null && (
                <MetricCard label="Net Revenue Churn" value={`${result.netRevenueChurnPct.toFixed(2)}%`} />
              )}
              {result.periodComparisonValue !== null && (
                <MetricCard label={result.periodComparisonLabel ?? ""} value={`${result.periodComparisonValue.toFixed(2)}%`} />
              )}
              {result.customerLifetimeMonths !== null && (
                <MetricCard label="Est. Customer Lifetime" value={`${result.customerLifetimeMonths.toFixed(1)} mo`} />
              )}
              {result.ltv !== null && (
                <MetricCard label="Customer LTV" value={formatMoney(result.ltv, inputs.currency)} />
              )}
              {result.ltvCacRatio !== null && (
                <MetricCard label="LTV : CAC Ratio" value={`${result.ltvCacRatio.toFixed(2)} : 1`} />
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recommendations</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {result.tier.recommendations.map((r, i) => (
                  <li key={i} className="px-5 py-3 text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visualizations */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Retained vs Lost</h3>
                <RetentionPieChart retainedPct={result.retainedPct} lostPct={result.lostPct} />
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>12-Month Decay Projection</h3>
                <ChurnProjectionChart data={result.projection} />
                <p className="text-xs text-gray-400 mt-2">Assumes the current churn rate repeats every month with no new acquisitions.</p>
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
                        <span className="text-sm text-gray-600">Scenario {label}{s ? ` — ${MODE_META[s.inputs.mode].short}` : ""}</span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? `${s.result.churnRatePct.toFixed(2)}%` : "— not set —"}</span>
                      </div>
                      {s && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, (s.result.churnRatePct / (Math.max(snapA?.result.churnRatePct ?? 0, snapB?.result.churnRatePct ?? 0) || 1)) * 100)}%` }} />
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
                        {entry.result.churnRatePct.toFixed(2)}% churn · {entry.result.tier.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ChurnRateCalculatorSEO />

      <RelatedTools
        currentTool="churn-rate-calculator"
        tools={[
          "retention-rate-calculator",
          "customer-lifetime-value-calculator",
          "roi-calculator-marketing",
          "marketing-roi-calculator",
          "break-even-calculator",
          "ad-spend-calculator",
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
