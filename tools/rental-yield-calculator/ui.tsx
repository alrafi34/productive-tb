"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult, CalculatorInputs, Currency, HistoryEntry,
} from "./types";
import {
  calculate, fmt, fmtPct, fmtCashFlow, debounce,
  saveToHistory, getHistory, clearHistory,
  exportToText, downloadFile,
  CURRENCY_SYMBOLS, CURRENCY_LABELS, ALL_CURRENCIES,
} from "./logic";
import RentalYieldCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  propertyPrice: "", monthlyRent: "", downPayment: "",
  mortgageRate: "", mortgageTerm: "30",
  propertyTax: "", insurance: "", maintenance: "",
  management: "", hoa: "", vacancyRate: 5, currency: "USD",
};

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "$200k / $1,800/mo", inputs: { propertyPrice: "200000", monthlyRent: "1800" } },
  { label: "$300k / $2,200/mo", inputs: { propertyPrice: "300000", monthlyRent: "2200", propertyTax: "3000", insurance: "1200", maintenance: "2000" } },
  { label: "$500k / $3,500/mo", inputs: { propertyPrice: "500000", monthlyRent: "3500", propertyTax: "5000", insurance: "1800", maintenance: "4000", management: "2520" } },
];

const RATING_COLORS: Record<CalculationResult["rating"], string> = {
  "Excellent":     "text-green-700 bg-green-50 border-green-200",
  "Strong":        "text-primary bg-primary/5 border-primary/20",
  "Average":       "text-yellow-700 bg-yellow-50 border-yellow-200",
  "Below Average": "text-orange-700 bg-orange-50 border-orange-200",
  "Poor":          "text-red-700 bg-red-50 border-red-200",
};

export default function RentalYieldCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 120), [inputs]);
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: (typeof PRESETS)[0]) => setInputs((prev) => ({ ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `Rental Yield Summary\nProperty: ${sym}${result.propertyPrice.toLocaleString("en-US")} | Rent: ${sym}${result.monthlyRent}/mo\nGross Yield: ${fmtPct(result.grossYield)} | Net Yield: ${fmtPct(result.netYield)}\nMonthly Cash Flow: ${fmtCashFlow(result.monthlyCashFlow, result.currency)}\nRating: ${result.rating}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };
  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "rental_yield_summary.txt");
  };
  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Rental Yield Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate gross and net rental yield, monthly cash flow, and ROI for investment properties. Includes vacancy adjustment and full expense breakdown.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vacancy Rate: {inputs.vacancyRate}%
                </label>
                <input type="range" min="0" max="20" step="0.5"
                  value={inputs.vacancyRate}
                  onChange={(e) => set("vacancyRate", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>0%</span><span>20%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Typical: 5% for most markets</p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formulas</div>
                <div className="font-mono">Gross = (Annual Rent ÷ Price) × 100</div>
                <div className="font-mono">Net = ((Rent − Expenses) ÷ Price) × 100</div>
              </div>

              <div className="pt-2 space-y-2">
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🔄 Reset
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                    📄 Export TXT
                  </button>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Gross Rental Yield
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result ? fmtPct(result.grossYield) : "—"}
              </div>
              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Net Yield:</span>
                    <span className="font-semibold">{fmtPct(result.netYield)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adj. Net Yield:</span>
                    <span className="font-semibold">{fmtPct(result.vacancyAdjustedNetYield)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Monthly Cash Flow:</span>
                    <span className={`font-semibold ${result.monthlyCashFlow >= 0 ? "text-green-300" : "text-red-300"}`}>
                      {fmtCashFlow(result.monthlyCashFlow, result.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cash-on-Cash:</span>
                    <span className="font-semibold">{fmtPct(result.cashOnCashReturn)}</span>
                  </div>
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

            {/* Property Details */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Property Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Price ({sym})</label>
                  <input ref={firstRef} type="number" inputMode="decimal"
                    value={inputs.propertyPrice} onChange={(e) => setNum("propertyPrice", e.target.value)}
                    className={inputCls} placeholder="e.g. 250000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent ({sym})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.monthlyRent} onChange={(e) => setNum("monthlyRent", e.target.value)}
                    className={inputCls} placeholder="e.g. 1800" min="0" step="any" />
                </div>
              </div>
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Annual Rent: {fmt(result.annualRent, result.currency, 0)}</strong>
                  {" → "}
                  <strong>Vacancy-Adj: {fmt(result.vacancyAdjustedRent, result.currency, 0)}</strong>
                  {" → "}
                  <strong>Gross Yield: {fmtPct(result.grossYield)}</strong>
                </div>
              )}
            </div>

            {/* Mortgage (optional) */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Mortgage (Optional)</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment ({sym})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.downPayment} onChange={(e) => setNum("downPayment", e.target.value)}
                    className={inputCls} placeholder="e.g. 50000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.mortgageRate} onChange={(e) => setNum("mortgageRate", e.target.value)}
                    className={inputCls} placeholder="e.g. 6.5" min="0" step="0.1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Term (years)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.mortgageTerm} onChange={(e) => setNum("mortgageTerm", e.target.value)}
                    className={inputCls} placeholder="30" min="1" step="1" />
                </div>
              </div>
              {result && result.mortgagePayment > 0 && (
                <p className="text-xs text-gray-500">
                  Monthly mortgage: <strong>{fmt(result.mortgagePayment, result.currency, 2)}</strong>
                </p>
              )}
            </div>

            {/* Annual Expenses */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Annual Expenses (Optional)</h3>
                <button onClick={() => setShowExpenses(!showExpenses)} className="text-sm text-primary font-medium hover:underline">
                  {showExpenses ? "Hide" : "Show"}
                </button>
              </div>
              {showExpenses && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "propertyTax",  label: "Property Tax" },
                    { key: "insurance",    label: "Insurance" },
                    { key: "maintenance",  label: "Maintenance" },
                    { key: "management",   label: "Management Fees" },
                    { key: "hoa",          label: "HOA Fees" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{label} ({sym}/yr)</label>
                      <input type="number" inputMode="decimal"
                        value={inputs[key as keyof CalculatorInputs] as string}
                        onChange={(e) => setNum(key as keyof CalculatorInputs, e.target.value)}
                        className={inputCls} placeholder="e.g. 2500" min="0" step="any" />
                    </div>
                  ))}
                </div>
              )}
              {!showExpenses && (
                <p className="text-sm text-gray-500">Click Show to add property tax, insurance, maintenance, and management fees.</p>
              )}
              {result && result.annualExpenses > 0 && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  Total annual expenses: <strong>{fmt(result.annualExpenses, result.currency, 0)}</strong>
                  {" · "}Monthly: <strong>{fmt(result.monthlyExpenses, result.currency, 2)}</strong>
                </div>
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

            {/* Financial Summary */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Financial Summary</h3>
                  {result && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${RATING_COLORS[result.rating]}`}>
                      {result.rating}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Gross Yield",       value: fmtPct(result.grossYield),                    highlight: true },
                    { label: "Net Yield",          value: fmtPct(result.netYield) },
                    { label: "Adj. Net Yield",     value: fmtPct(result.vacancyAdjustedNetYield) },
                    { label: "Annual Rent",        value: fmt(result.annualRent, result.currency, 0) },
                    { label: "Annual Expenses",    value: fmt(result.annualExpenses, result.currency, 0) },
                    { label: "Annual Profit",      value: fmt(result.annualProfit, result.currency, 0) },
                    { label: "Monthly Cash Flow",  value: fmtCashFlow(result.monthlyCashFlow, result.currency), isText: true },
                    { label: "Annual Cash Flow",   value: fmtCashFlow(result.annualCashFlow, result.currency), isText: true },
                    { label: "Cash-on-Cash ROI",   value: fmtPct(result.cashOnCashReturn) },
                  ].map(({ label, value, highlight, isText }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : isText ? "text-sm text-gray-900" : "text-base text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Expense breakdown */}
                {result.expenseBreakdown.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Expense Breakdown</div>
                    <div className="space-y-2">
                      {result.expenseBreakdown.map((e) => (
                        <div key={e.label} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{e.label}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-gray-100 rounded-full h-1.5">
                              <div className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${Math.min(100, (e.annual / result.annualExpenses) * 100)}%` }} />
                            </div>
                            <span className="font-mono text-gray-700 text-xs w-20 text-right">{fmt(e.annual, result.currency, 0)}/yr</span>
                          </div>
                        </div>
                      ))}
                    </div>
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
                      <div key={entry.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {CURRENCY_SYMBOLS[entry.inputs.currency]}{parseFloat(entry.inputs.propertyPrice).toLocaleString("en-US")} · {CURRENCY_SYMBOLS[entry.inputs.currency]}{parseFloat(entry.inputs.monthlyRent).toLocaleString("en-US")}/mo
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Gross: {fmtPct(entry.result.grossYield)} · Net: {fmtPct(entry.result.netYield)} · {entry.result.rating}
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

      <RentalYieldCalculatorSEO />
      <RelatedTools
        currentTool="rental-yield-calculator"
        tools={[
          "land-price-calculator",
          "mortgage-loan-calculator",
          "down-payment-calculator",
          "property-tax-calculator",
        ]}
      />
    </>
  );
}
