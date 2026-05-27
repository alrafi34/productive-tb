"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult,
  CalculatorInputs,
  Currency,
  DownPaymentMode,
  HistoryEntry,
  LoanTerm,
} from "./types";
import {
  calculate,
  buildScenarios,
  fmt,
  fmtPct,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  ALL_CURRENCIES,
  LOAN_TERMS,
  QUICK_PRESETS,
} from "./logic";
import DownPaymentCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Payment bar visualization ─────────────────────────────────────────────────

function PaymentBar({ downPct, currency, downAmt, remaining }: {
  downPct: number; currency: Currency; downAmt: number; remaining: number;
}) {
  const pct = Math.min(100, Math.max(0, downPct));
  const sym = CURRENCY_SYMBOLS[currency];
  return (
    <div className="space-y-2">
      <div className="flex rounded-lg overflow-hidden h-8 text-xs font-semibold">
        <div
          className="bg-primary flex items-center justify-center text-white transition-all duration-300 overflow-hidden"
          style={{ width: `${pct}%`, minWidth: pct > 5 ? "auto" : 0 }}
        >
          {pct >= 8 && `${pct.toFixed(1)}%`}
        </div>
        <div
          className="bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-300 overflow-hidden flex-1"
        >
          {(100 - pct) >= 8 && `${(100 - pct).toFixed(1)}%`}
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" />
          Down: {sym}{downAmt.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-gray-200 inline-block" />
          Loan: {sym}{remaining.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </span>
      </div>
    </div>
  );
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_INPUTS: CalculatorInputs = {
  purchasePrice:    "",
  downPaymentMode:  "percentage",
  downPaymentValue: "20",
  interestRate:     "",
  loanTerm:         30,
  currency:         "USD",
};

const PRESETS_PRICE: { label: string; price: string }[] = [
  { label: "$100k",  price: "100000"  },
  { label: "$300k",  price: "300000"  },
  { label: "$500k",  price: "500000"  },
  { label: "$1M",    price: "1000000" },
];

export default function DownPaymentCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
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

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `Down Payment Summary\nPurchase Price: ${sym}${result.purchasePrice.toLocaleString("en-US")}\nDown Payment: ${sym}${result.downPaymentAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })} (${fmtPct(result.downPaymentPercent)})\nRemaining Loan: ${sym}${result.remainingLoan.toLocaleString("en-US", { maximumFractionDigits: 0 })}${result.monthlyPayment ? `\nEst. Monthly: ${sym}${result.monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : ""}`;
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
    downloadFile(exportToText(inputs, result), "down_payment_summary.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  const priceVal = parseFloat(inputs.purchasePrice) || 0;
  const dpVal    = parseFloat(inputs.downPaymentValue) || 0;
  const rateVal  = parseFloat(inputs.interestRate) || 0;

  const scenarios = showScenarios && priceVal > 0
    ? buildScenarios(priceVal, rateVal, inputs.loanTerm, QUICK_PRESETS)
    : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💵</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Down Payment Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate your upfront down payment and remaining financing for property, land, or vehicle purchases. Supports percentage and fixed amount modes.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select value={inputs.currency} onChange={(e) => set("currency", e.target.value as Currency)} className={selectCls}>
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (for monthly estimate)</label>
                <select value={inputs.loanTerm} onChange={(e) => set("loanTerm", parseInt(e.target.value) as LoanTerm)} className={selectCls}>
                  {LOAN_TERMS.map((t) => (
                    <option key={t} value={t}>{t} years</option>
                  ))}
                </select>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Down = Price × (% ÷ 100)</div>
                <div className="font-mono">Loan = Price − Down</div>
                <div className="font-mono">EMI = P × r(1+r)ⁿ / ((1+r)ⁿ−1)</div>
              </div>

              {/* Actions */}
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
                Down Payment Required
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? fmt(result.downPaymentAmount, result.currency, 0) : "—"}
              </div>
              {result && (
                <div className="text-primary-100 text-sm mb-3">{fmtPct(result.downPaymentPercent)} of purchase price</div>
              )}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Purchase Price:</span>
                    <span className="font-semibold">{fmt(result.purchasePrice, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Remaining Loan:</span>
                    <span className="font-semibold">{fmt(result.remainingLoan, result.currency, 0)}</span>
                  </div>
                  {result.monthlyPayment !== null && (
                    <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                      <span className="text-primary-100">Est. Monthly:</span>
                      <span className="font-semibold">{fmt(result.monthlyPayment, result.currency, 2)}</span>
                    </div>
                  )}
                  {result.totalInterest !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Total Interest:</span>
                      <span className="font-semibold">{fmt(result.totalInterest, result.currency, 0)}</span>
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
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Purchase Details</h3>

              {/* Purchase Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price ({sym})</label>
                <input ref={firstRef} type="number" inputMode="decimal"
                  value={inputs.purchasePrice} onChange={(e) => setNum("purchasePrice", e.target.value)}
                  className={inputCls} placeholder="e.g. 300000" min="0" step="any" />
                {/* Price presets */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {PRESETS_PRICE.map((p) => (
                    <button key={p.label} onClick={() => setNum("purchasePrice", p.price)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["percentage", "fixed"] as DownPaymentMode[]).map((m) => (
                    <button key={m} onClick={() => set("downPaymentMode", m)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.downPaymentMode === m ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {m === "percentage" ? "Percentage (%)" : "Fixed Amount"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {inputs.downPaymentMode === "percentage" ? "Down Payment (%)" : `Down Payment Amount (${sym})`}
                </label>
                <input type="number" inputMode="decimal"
                  value={inputs.downPaymentValue} onChange={(e) => setNum("downPaymentValue", e.target.value)}
                  className={inputCls}
                  placeholder={inputs.downPaymentMode === "percentage" ? "e.g. 20" : "e.g. 60000"}
                  min="0" max={inputs.downPaymentMode === "percentage" ? "100" : undefined} step="any" />

                {/* Percentage slider */}
                {inputs.downPaymentMode === "percentage" && (
                  <>
                    <input type="range" min="0" max="100" step="0.5"
                      value={dpVal || 0}
                      onChange={(e) => setNum("downPaymentValue", e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-2" />
                    <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                      <span>0%</span><span>100%</span>
                    </div>
                  </>
                )}

                {/* Quick % presets */}
                {inputs.downPaymentMode === "percentage" && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {[5, 10, 15, 20, 25, 30].map((pct) => (
                      <button key={pct} onClick={() => setNum("downPaymentValue", String(pct))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${dpVal === pct ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>
                        {pct}%
                      </button>
                    ))}
                  </div>
                )}

                {inputs.downPaymentMode === "percentage" && (
                  <p className="text-xs text-gray-500 mt-1">20% is commonly recommended for mortgages to avoid PMI.</p>
                )}
              </div>

              {/* Payment bar */}
              {result && (
                <PaymentBar
                  downPct={result.downPaymentPercent}
                  currency={result.currency}
                  downAmt={result.downPaymentAmount}
                  remaining={result.remainingLoan}
                />
              )}
            </div>

            {/* Optional: Interest Rate */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Monthly Payment Estimate (Optional)</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (%)</label>
                <input type="number" inputMode="decimal"
                  value={inputs.interestRate} onChange={(e) => setNum("interestRate", e.target.value)}
                  className={inputCls} placeholder="e.g. 6.5" min="0" max="30" step="0.1" />
                <p className="text-xs text-gray-500 mt-1">Leave blank to skip monthly payment estimate</p>
              </div>
              {result && result.monthlyPayment !== null && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Monthly Payment", value: fmt(result.monthlyPayment, result.currency, 2), highlight: true },
                    { label: "Total Interest",  value: fmt(result.totalInterest!, result.currency, 0) },
                    { label: "Total Payment",   value: fmt(result.totalPayment!, result.currency, 0) },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold text-base break-all ${highlight ? "text-primary" : "text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Purchase Price",  value: fmt(result.purchasePrice, result.currency, 0) },
                    { label: "Down Payment",    value: fmt(result.downPaymentAmount, result.currency, 0), highlight: true },
                    { label: "Down Payment %",  value: fmtPct(result.downPaymentPercent), isText: true },
                    { label: "Remaining Loan",  value: fmt(result.remainingLoan, result.currency, 0) },
                  ].map(({ label, value, highlight, isText }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : isText ? "text-base text-gray-900" : "text-base text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scenario Comparison */}
            {priceVal > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Scenario Comparison</h3>
                  <button onClick={() => setShowScenarios(!showScenarios)} className="text-sm text-primary font-medium hover:underline">
                    {showScenarios ? "Hide" : "Show"}
                  </button>
                </div>
                {showScenarios && scenarios.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Down %</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Down Amount</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Remaining Loan</th>
                          {rateVal > 0 && <th className="text-right py-2 px-3 font-semibold text-gray-700">Monthly EMI</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {scenarios.map((s) => {
                          const isCurrent = inputs.downPaymentMode === "percentage" && Math.abs(dpVal - s.downPaymentPercent) < 0.1;
                          return (
                            <tr key={s.label} className={`hover:bg-gray-50 ${isCurrent ? "bg-primary/5" : ""}`}>
                              <td className={`py-2 px-3 font-semibold ${isCurrent ? "text-primary" : ""}`}>{s.label}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(s.downPaymentAmount, inputs.currency, 0)}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(s.remainingLoan, inputs.currency, 0)}</td>
                              {rateVal > 0 && (
                                <td className="py-2 px-3 text-right font-mono">
                                  {s.monthlyPayment !== null ? fmt(s.monthlyPayment, inputs.currency, 2) : "—"}
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {rateVal === 0 && (
                      <p className="text-xs text-gray-500 mt-2">Enter an interest rate above to see monthly EMI estimates.</p>
                    )}
                  </div>
                ) : showScenarios && (
                  <p className="text-sm text-gray-500">Enter a purchase price to see the comparison table.</p>
                )}
                {!showScenarios && (
                  <p className="text-sm text-gray-500">Click Show to compare 5%, 10%, 15%, 20%, 25%, and 30% down payment scenarios.</p>
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
                            {CURRENCY_SYMBOLS[entry.inputs.currency]}{parseFloat(entry.inputs.purchasePrice).toLocaleString("en-US")} · {entry.inputs.downPaymentMode === "percentage" ? `${entry.inputs.downPaymentValue}%` : `${CURRENCY_SYMBOLS[entry.inputs.currency]}${parseFloat(entry.inputs.downPaymentValue).toLocaleString("en-US")}`}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Down: {fmt(entry.result.downPaymentAmount, entry.result.currency, 0)} · Loan: {fmt(entry.result.remainingLoan, entry.result.currency, 0)}
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

      <DownPaymentCalculatorSEO />
      <RelatedTools
        currentTool="down-payment-calculator"
        tools={[
          "mortgage-loan-calculator",
          "home-loan-emi-calculator",
          "land-price-calculator",
          "property-tax-calculator",
        ]}
      />
    </>
  );
}
