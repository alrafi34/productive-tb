"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult, CalculatorInputs, Currency, HistoryEntry,
} from "./types";
import {
  calculate, fmt, fmtPct, debounce,
  saveToHistory, getHistory, clearHistory,
  generateCSV, downloadFile, exportToText,
  buildShareURL, parseURLParams,
  CURRENCY_SYMBOLS, CURRENCY_LABELS, ALL_CURRENCIES,
  COMPOUND_FREQUENCY_LABELS,
} from "./logic";
import PropertyAppreciationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  initialValue: "",
  appreciationRate: 5,
  years: 10,
  additionalAnnualInvestment: "",
  inflationRate: "",
  compoundFrequency: "yearly",
  currency: "USD",
};

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "$100k / 5% / 10yr",  inputs: { initialValue: "100000",  appreciationRate: 5,  years: 10 } },
  { label: "$250k / 4% / 20yr",  inputs: { initialValue: "250000",  appreciationRate: 4,  years: 20 } },
  { label: "$50k / 8% / 15yr",   inputs: { initialValue: "50000",   appreciationRate: 8,  years: 15 } },
  { label: "$500k / 6% / 25yr",  inputs: { initialValue: "500000",  appreciationRate: 6,  years: 25 } },
];

// ── Mini bar chart ────────────────────────────────────────────────────────────
function GrowthChart({
  breakdown,
  currency,
  hasInflation,
}: {
  breakdown: CalculationResult["yearlyBreakdown"];
  currency: Currency;
  hasInflation: boolean;
}) {
  const maxVal = Math.max(...breakdown.map((r) => r.propertyValue));
  const step = breakdown.length <= 10 ? 1 : breakdown.length <= 20 ? 2 : 5;
  const visible = breakdown.filter((r) => r.year % step === 0 || r.year === 1);

  return (
    <div className="space-y-2">
      {visible.map((row) => {
        const pct = (row.propertyValue / maxVal) * 100;
        const inflPct = hasInflation && row.inflationAdjustedValue
          ? (row.inflationAdjustedValue / maxVal) * 100
          : null;
        return (
          <div key={row.year} className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 w-10 shrink-0">Y{row.year}</span>
            <div className="flex-1 relative h-5">
              <div
                className="absolute inset-y-0 left-0 bg-primary/20 rounded"
                style={{ width: `${pct}%` }}
              />
              {inflPct !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-orange-300/60 rounded"
                  style={{ width: `${inflPct}%` }}
                />
              )}
              <div
                className="absolute inset-y-0 left-0 bg-primary rounded"
                style={{ width: `${Math.min(pct, 100)}%`, maxWidth: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-mono text-gray-700 w-24 text-right shrink-0">
              {fmt(row.propertyValue, currency, 0)}
            </span>
          </div>
        );
      })}
      {hasInflation && (
        <div className="flex items-center gap-3 pt-1 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" />
          <span>Nominal Value</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-orange-300/60 inline-block ml-2" />
          <span>Inflation-Adjusted</span>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PropertyAppreciationCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedURL, setCopiedURL] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showOptional, setShowOptional] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  // Load history + parse URL params on mount
  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
    const urlParams = parseURLParams();
    if (Object.keys(urlParams).length > 0) {
      setInputs((prev) => ({ ...prev, ...urlParams }));
    }
  }, []);

  const run = useCallback(
    debounce(() => { setResult(calculate(inputs)); }, 150),
    [inputs]
  );
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    firstRef.current?.focus();
  };

  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({ ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `Property Appreciation Summary\nInitial Value: ${sym}${result.initialValue.toLocaleString("en-US")}\nFuture Value: ${sym}${result.futureValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}\nTotal Gain: ${sym}${result.totalGain.toLocaleString("en-US", { maximumFractionDigits: 0 })}\nGrowth: ${fmtPct(result.growthPercent)}\nCAGR: ${result.annualizedReturn.toFixed(2)}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareURL = () => {
    const url = buildShareURL(inputs);
    navigator.clipboard.writeText(url);
    setCopiedURL(true);
    setTimeout(() => setCopiedURL(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExportCSV = () => {
    if (!result) return;
    const hasInflation = !!inputs.inflationRate;
    const csv = generateCSV(result.yearlyBreakdown, result.currency, hasInflation);
    downloadFile(csv, "property_appreciation.csv");
  };

  const handleExportTXT = () => {
    if (!result) return;
    const blob = new Blob([exportToText(inputs, result)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "property_appreciation.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const hasInflation = !!inputs.inflationRate && !isNaN(parseFloat(inputs.inflationRate));

  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Property Appreciation Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate future land and property value using compound appreciation. Get year-by-year projections, growth charts, and inflation-adjusted comparisons instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select value={inputs.currency} onChange={(e) => set("currency", e.target.value as Currency)} className={selectCls}>
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Compound Frequency</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["yearly", "quarterly", "monthly"] as const).map((f) => (
                    <button key={f} onClick={() => set("compoundFrequency", f)}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${inputs.compoundFrequency === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {COMPOUND_FREQUENCY_LABELS[f]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">FV = P × (1 + r/n)^(n×t)</div>
                <div className="text-gray-500 mt-1 font-sans">P = value · r = rate · n = freq · t = years</div>
              </div>

              <div className="pt-2 space-y-2">
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🔄 Reset
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <>
                    <button onClick={handleExportCSV} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      📊 Export CSV
                    </button>
                    <button onClick={handleExportTXT} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      📄 Export TXT
                    </button>
                    <button onClick={handleShareURL} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      {copiedURL ? "✓ Link Copied!" : "🔗 Share Link"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Future Property Value
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? fmt(result.futureValue, result.currency, 0) : "—"}
              </div>
              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Initial Value:</span>
                    <span className="font-semibold">{fmt(result.initialValue, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Gain:</span>
                    <span className="font-semibold text-green-300">{fmt(result.totalGain, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Growth:</span>
                    <span className="font-semibold text-green-300">{fmtPct(result.growthPercent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">CAGR:</span>
                    <span className="font-semibold">{result.annualizedReturn.toFixed(2)}%</span>
                  </div>
                  {result.inflationAdjustedValue !== null && (
                    <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                      <span className="text-primary-100">Inflation-Adj:</span>
                      <span className="font-semibold text-orange-300">{fmt(result.inflationAdjustedValue, result.currency, 0)}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <button onClick={handleCopy} disabled={!result} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button onClick={handleSave} disabled={!result} className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  💾 Save to History
                </button>
              </div>
            </div>

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Core Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Property Details</h3>

              {/* Initial Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Purchase Price ({sym})
                </label>
                <input
                  ref={firstRef}
                  type="number"
                  inputMode="decimal"
                  value={inputs.initialValue}
                  onChange={(e) => setNum("initialValue", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run()}
                  className={inputCls}
                  placeholder="e.g. 100000"
                  min="0"
                  step="any"
                  aria-label="Property purchase price"
                />
              </div>

              {/* Appreciation Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Annual Appreciation Rate: <span className="text-primary font-bold">{inputs.appreciationRate}%</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.appreciationRate}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v) && v >= 0 && v <= 30) set("appreciationRate", v);
                    }}
                    className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                    min="0" max="30" step="0.1"
                  />
                </div>
                <input
                  type="range" min="0" max="30" step="0.1"
                  value={inputs.appreciationRate}
                  onChange={(e) => set("appreciationRate", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Annual appreciation rate"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>0%</span><span>15%</span><span>30%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Typical: Urban land 6–10% · Residential 3–6% · Commercial 4–8%
                </p>
              </div>

              {/* Years */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Investment Duration: <span className="text-primary font-bold">{inputs.years} years</span>
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={inputs.years}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      if (!isNaN(v) && v >= 1 && v <= 50) set("years", v);
                    }}
                    className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                    min="1" max="50" step="1"
                  />
                </div>
                <input
                  type="range" min="1" max="50" step="1"
                  value={inputs.years}
                  onChange={(e) => set("years", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Investment duration in years"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>1 yr</span><span>25 yrs</span><span>50 yrs</span>
                </div>
              </div>

              {/* Calculation preview */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>{sym}{result.initialValue.toLocaleString("en-US")}</strong>
                  {" × (1 + "}
                  <strong>{inputs.appreciationRate}%</strong>
                  {")^"}
                  <strong>{inputs.years}</strong>
                  {" = "}
                  <strong>{fmt(result.futureValue, result.currency, 0)}</strong>
                </div>
              )}
            </div>

            {/* Optional Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Optional Inputs</h3>
                <button onClick={() => setShowOptional(!showOptional)} className="text-sm text-primary font-medium hover:underline">
                  {showOptional ? "Hide" : "Show"}
                </button>
              </div>
              {showOptional ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yearly Property Investment ({sym})
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.additionalAnnualInvestment}
                      onChange={(e) => setNum("additionalAnnualInvestment", e.target.value)}
                      className={inputCls} placeholder="e.g. 5000" min="0" step="any"
                    />
                    <p className="text-xs text-gray-500 mt-1">Annual upgrades or maintenance investments</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inflation Rate (%)
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.inflationRate}
                      onChange={(e) => setNum("inflationRate", e.target.value)}
                      className={inputCls} placeholder="e.g. 3" min="0" step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Shows real purchasing power comparison</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Click Show to add yearly investment and inflation adjustment.</p>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Appreciation Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Future Value",     value: fmt(result.futureValue, result.currency, 0),    highlight: true },
                    { label: "Total Gain",        value: fmt(result.totalGain, result.currency, 0),      isGreen: true },
                    { label: "Growth %",          value: fmtPct(result.growthPercent),                   isGreen: true },
                    { label: "Initial Value",     value: fmt(result.initialValue, result.currency, 0) },
                    { label: "CAGR",              value: `${result.annualizedReturn.toFixed(2)}%` },
                    ...(result.inflationAdjustedValue !== null ? [
                      { label: "Inflation-Adj Value", value: fmt(result.inflationAdjustedValue, result.currency, 0) },
                      { label: "Real Gain %",          value: fmtPct(result.realGainPercent ?? 0) },
                    ] : []),
                  ].map(({ label, value, highlight, isGreen }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : isGreen ? "text-green-600 text-base" : "text-base text-gray-900"}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Growth Chart */}
            {result && result.yearlyBreakdown.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Growth Chart</h3>
                  <button onClick={() => setShowChart(!showChart)} className="text-sm text-primary font-medium hover:underline">
                    {showChart ? "Hide" : "Show"}
                  </button>
                </div>
                {showChart ? (
                  <GrowthChart
                    breakdown={result.yearlyBreakdown}
                    currency={result.currency}
                    hasInflation={hasInflation}
                  />
                ) : (
                  <p className="text-sm text-gray-500">Click Show to view the appreciation growth chart.</p>
                )}
              </div>
            )}

            {/* Year-by-Year Table */}
            {result && result.yearlyBreakdown.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Year-by-Year Breakdown</h3>
                  <button onClick={() => setShowTable(!showTable)} className="text-sm text-primary font-medium hover:underline">
                    {showTable ? "Hide" : "Show"}
                  </button>
                </div>
                {showTable ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead className="bg-white border-b border-gray-200">
                        <tr>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Property Value</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Annual Gain</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Cumulative Gain</th>
                          {hasInflation && (
                            <th className="text-right py-2 px-3 font-semibold text-gray-700">Inflation-Adj</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {result.yearlyBreakdown.map((row) => (
                          <tr key={row.year} className="hover:bg-gray-50">
                            <td className="py-2 px-3 font-medium">Year {row.year}</td>
                            <td className="py-2 px-3 text-right font-mono text-primary font-semibold">
                              {fmt(row.propertyValue, result.currency, 0)}
                            </td>
                            <td className="py-2 px-3 text-right font-mono text-green-600">
                              +{fmt(row.appreciationGain, result.currency, 0)}
                            </td>
                            <td className="py-2 px-3 text-right font-mono text-gray-700">
                              +{fmt(row.cumulativeGain, result.currency, 0)}
                            </td>
                            {hasInflation && (
                              <td className="py-2 px-3 text-right font-mono text-orange-600">
                                {row.inflationAdjustedValue !== null ? fmt(row.inflationAdjustedValue, result.currency, 0) : "—"}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 text-sm text-gray-500">
                    Click Show to view year-by-year property value, annual gain, and cumulative appreciation.
                  </div>
                )}
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {CURRENCY_SYMBOLS[entry.inputs.currency]}{parseFloat(entry.inputs.initialValue).toLocaleString("en-US")}
                            {" · "}{entry.inputs.appreciationRate}% · {entry.inputs.years}yr
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          → {fmt(entry.result.futureValue, entry.result.currency, 0)}
                          {" · "}{fmtPct(entry.result.growthPercent)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <PropertyAppreciationCalculatorSEO />
      <RelatedTools
        currentTool="property-appreciation-calculator"
        tools={[
          "roi-real-estate-calculator",
          "rental-yield-calculator",
          "land-price-calculator",
          "mortgage-loan-calculator",
          "down-payment-calculator",
          "land-valuation-calculator",
        ]}
      />
    </>
  );
}
