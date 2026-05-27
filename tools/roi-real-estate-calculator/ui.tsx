"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult, CalculatorInputs, Currency,
  HistoryEntry, InvestmentDuration, MortgageTerm,
} from "./types";
import {
  calculate, fmt, fmtPct, fmtCF, debounce,
  saveToHistory, getHistory, clearHistory,
  exportToText, downloadFile,
  CURRENCY_SYMBOLS, CURRENCY_LABELS, ALL_CURRENCIES,
  MORTGAGE_TERMS, INVESTMENT_DURATIONS,
} from "./logic";
import RoiRealEstateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  purchasePrice: "", downPayment: "", closingCosts: "",
  renovationCost: "", mortgageRate: "", mortgageTerm: 30,
  monthlyRent: "", otherIncome: "",
  propertyTax: "", insurance: "", maintenance: "",
  management: "", hoa: "",
  vacancyRate: 5, appreciationRate: "3",
  investmentDuration: 5, currency: "USD",
};

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "$200k / $2k rent",  inputs: { purchasePrice: "200000", downPayment: "40000",  monthlyRent: "2000", mortgageRate: "6.5", propertyTax: "200", insurance: "100", maintenance: "150" } },
  { label: "$350k / $3.2k rent",inputs: { purchasePrice: "350000", downPayment: "70000",  monthlyRent: "3200", mortgageRate: "6.5", propertyTax: "350", insurance: "150", maintenance: "250", management: "256" } },
  { label: "$500k / $4k rent",  inputs: { purchasePrice: "500000", downPayment: "100000", monthlyRent: "4000", mortgageRate: "7",   propertyTax: "500", insurance: "200", maintenance: "400", management: "320" } },
];

const RATING_COLORS: Record<CalculationResult["rating"], string> = {
  "Excellent":     "text-green-700 bg-green-50 border-green-200",
  "Strong":        "text-primary bg-primary/5 border-primary/20",
  "Average":       "text-yellow-700 bg-yellow-50 border-yellow-200",
  "Below Average": "text-orange-700 bg-orange-50 border-orange-200",
  "Poor":          "text-red-700 bg-red-50 border-red-200",
};

export default function RoiRealEstateCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProjections, setShowProjections] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 130), [inputs]);
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
    const text = `Real Estate ROI Summary\nInvestment: ${sym}${result.totalInvestment.toLocaleString("en-US")}\nCash-on-Cash ROI: ${fmtPct(result.cashOnCashROI)}\nMonthly Cash Flow: ${fmtCF(result.monthlyCashFlow, result.currency)}\nTotal ROI (${inputs.investmentDuration}yr): ${fmtPct(result.totalROI)}\nRating: ${result.rating}`;
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
    downloadFile(exportToText(inputs, result), "real_estate_roi.txt");
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
            <span className="text-2xl">📈</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">ROI Real Estate Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate real estate ROI, monthly cash flow, appreciation, and total investment returns. Includes mortgage estimator and year-by-year projections.
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
                  {ALL_CURRENCIES.map((c) => <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Duration</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {INVESTMENT_DURATIONS.map((d) => (
                    <button key={d} onClick={() => set("investmentDuration", d)}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${inputs.investmentDuration === d ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {d}yr
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vacancy Rate: {inputs.vacancyRate}%</label>
                <input type="range" min="0" max="25" step="0.5"
                  value={inputs.vacancyRate}
                  onChange={(e) => set("vacancyRate", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0%</span><span>25%</span></div>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Key Formulas</div>
                <div className="font-mono">CoC ROI = Annual CF ÷ Investment</div>
                <div className="font-mono">Total ROI = (CF + Appreciation) ÷ Investment</div>
              </div>

              <div className="pt-2 space-y-2">
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">🔄 Reset</button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">📄 Export TXT</button>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Cash-on-Cash ROI
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result ? fmtPct(result.cashOnCashROI) : "—"}
              </div>
              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Monthly Cash Flow:</span>
                    <span className={`font-semibold ${result.monthlyCashFlow >= 0 ? "text-green-300" : "text-red-300"}`}>
                      {fmtCF(result.monthlyCashFlow, result.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Gross Yield:</span>
                    <span className="font-semibold">{fmtPct(result.grossYield)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Net Yield:</span>
                    <span className="font-semibold">{fmtPct(result.netYield)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total ROI ({inputs.investmentDuration}yr):</span>
                    <span className="font-semibold">{fmtPct(result.totalROI)}</span>
                  </div>
                  {result.breakEvenMonths !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Break-even:</span>
                      <span className="font-semibold">{result.breakEvenMonths} mo</span>
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

            {/* Purchase Details */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Purchase Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price ({sym})</label>
                  <input ref={firstRef} type="number" inputMode="decimal" value={inputs.purchasePrice}
                    onChange={(e) => setNum("purchasePrice", e.target.value)} className={inputCls} placeholder="e.g. 200000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment ({sym})</label>
                  <input type="number" inputMode="decimal" value={inputs.downPayment}
                    onChange={(e) => setNum("downPayment", e.target.value)} className={inputCls} placeholder="e.g. 40000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Closing Costs ({sym})</label>
                  <input type="number" inputMode="decimal" value={inputs.closingCosts}
                    onChange={(e) => setNum("closingCosts", e.target.value)} className={inputCls} placeholder="e.g. 5000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Renovation Cost ({sym})</label>
                  <input type="number" inputMode="decimal" value={inputs.renovationCost}
                    onChange={(e) => setNum("renovationCost", e.target.value)} className={inputCls} placeholder="e.g. 15000" min="0" step="any" />
                </div>
              </div>
              {result && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  Total Investment: <strong>{fmt(result.totalInvestment, result.currency, 0)}</strong>
                  {" · "}Loan: <strong>{fmt(result.loanAmount, result.currency, 0)}</strong>
                </div>
              )}
            </div>

            {/* Mortgage */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Mortgage (Optional)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                  <input type="number" inputMode="decimal" value={inputs.mortgageRate}
                    onChange={(e) => setNum("mortgageRate", e.target.value)} className={inputCls} placeholder="e.g. 6.5" min="0" step="0.1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mortgage Term</label>
                  <div className="grid grid-cols-3 gap-2">
                    {MORTGAGE_TERMS.map((t) => (
                      <button key={t} onClick={() => set("mortgageTerm", t)}
                        className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${inputs.mortgageTerm === t ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                        {t}yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {result && result.monthlyMortgage > 0 && (
                <p className="text-xs text-gray-500">Monthly mortgage: <strong>{fmt(result.monthlyMortgage, result.currency, 2)}</strong></p>
              )}
            </div>

            {/* Income & Expenses */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Income & Monthly Expenses</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent ({sym})</label>
                  <input type="number" inputMode="decimal" value={inputs.monthlyRent}
                    onChange={(e) => setNum("monthlyRent", e.target.value)} className={inputCls} placeholder="e.g. 2000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Other Income ({sym}/mo)</label>
                  <input type="number" inputMode="decimal" value={inputs.otherIncome}
                    onChange={(e) => setNum("otherIncome", e.target.value)} className={inputCls} placeholder="e.g. 100" min="0" step="any" />
                </div>
                {[
                  { key: "propertyTax",  label: "Property Tax" },
                  { key: "insurance",    label: "Insurance" },
                  { key: "maintenance",  label: "Maintenance" },
                  { key: "management",   label: "Management Fees" },
                  { key: "hoa",          label: "HOA Fees" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label} ({sym}/mo)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs[key as keyof CalculatorInputs] as string}
                      onChange={(e) => setNum(key as keyof CalculatorInputs, e.target.value)}
                      className={inputCls} placeholder="e.g. 200" min="0" step="any" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Appreciation (%)</label>
                  <input type="number" inputMode="decimal" value={inputs.appreciationRate}
                    onChange={(e) => setNum("appreciationRate", e.target.value)} className={inputCls} placeholder="e.g. 3" min="0" step="0.1" />
                </div>
              </div>
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  Income: <strong>{fmt(result.monthlyIncome, result.currency, 0)}/mo</strong>
                  {" · "}Expenses: <strong>{fmt(result.monthlyExpenses, result.currency, 0)}/mo</strong>
                  {" · "}Cash Flow: <strong className={result.monthlyCashFlow >= 0 ? "text-green-700" : "text-red-600"}>{fmtCF(result.monthlyCashFlow, result.currency)}/mo</strong>
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

            {/* ROI Summary Cards */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Investment Summary</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${RATING_COLORS[result.rating]}`}>{result.rating}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Cash-on-Cash ROI",  value: fmtPct(result.cashOnCashROI),                    highlight: true },
                    { label: "Gross Yield",        value: fmtPct(result.grossYield) },
                    { label: "Net Yield",          value: fmtPct(result.netYield) },
                    { label: "Monthly Cash Flow",  value: fmtCF(result.monthlyCashFlow, result.currency),  isText: true },
                    { label: "Annual Cash Flow",   value: fmtCF(result.annualCashFlow, result.currency),   isText: true },
                    { label: `Total ROI (${inputs.investmentDuration}yr)`, value: fmtPct(result.totalROI) },
                    { label: "Total Investment",   value: fmt(result.totalInvestment, result.currency, 0) },
                    { label: `Future Value (${inputs.investmentDuration}yr)`, value: fmt(result.futureValue, result.currency, 0) },
                    { label: "Appreciation Gain",  value: fmt(result.appreciationGain, result.currency, 0) },
                  ].map(({ label, value, highlight, isText }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : isText ? "text-sm text-gray-900" : "text-base text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Year-by-year projections */}
            {result && result.projections.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Year-by-Year Projections</h3>
                  <button onClick={() => setShowProjections(!showProjections)} className="text-sm text-primary font-medium hover:underline">
                    {showProjections ? "Hide" : "Show"}
                  </button>
                </div>
                {showProjections ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead className="bg-white border-b border-gray-200">
                        <tr>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Property Value</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Equity</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Cum. Cash Flow</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Total ROI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {result.projections.map((p) => (
                          <tr key={p.year} className="hover:bg-gray-50">
                            <td className="py-2 px-3 font-medium">Year {p.year}</td>
                            <td className="py-2 px-3 text-right font-mono">{fmt(p.propertyValue, result.currency, 0)}</td>
                            <td className="py-2 px-3 text-right font-mono text-primary">{fmt(p.equity, result.currency, 0)}</td>
                            <td className={`py-2 px-3 text-right font-mono ${p.cumulativeCashFlow >= 0 ? "text-green-600" : "text-red-500"}`}>
                              {fmtCF(p.cumulativeCashFlow, result.currency)}
                            </td>
                            <td className="py-2 px-3 text-right font-mono font-semibold">{fmtPct(p.roi)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 text-sm text-gray-500">Click Show to view year-by-year property value, equity, and ROI projections.</div>
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
                            {CURRENCY_SYMBOLS[entry.inputs.currency]}{parseFloat(entry.inputs.purchasePrice).toLocaleString("en-US")} · {CURRENCY_SYMBOLS[entry.inputs.currency]}{parseFloat(entry.inputs.monthlyRent).toLocaleString("en-US")}/mo
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          CoC ROI: {fmtPct(entry.result.cashOnCashROI)} · CF: {fmtCF(entry.result.monthlyCashFlow, entry.result.currency)}/mo · {entry.result.rating}
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

      <RoiRealEstateCalculatorSEO />
      <RelatedTools
        currentTool="roi-real-estate-calculator"
        tools={[
          "rental-yield-calculator",
          "mortgage-loan-calculator",
          "down-payment-calculator",
          "land-price-calculator",
        ]}
      />
    </>
  );
}
