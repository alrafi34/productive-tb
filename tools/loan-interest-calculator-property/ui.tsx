"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult, CalculatorInputs, Currency,
  DurationUnit, HistoryEntry, InterestType, PaymentFrequency,
} from "./types";
import {
  calculate, compareRates, fmt, fmtNum, debounce,
  saveToHistory, getHistory, clearHistory,
  exportScheduleCSV, exportToText, downloadFile,
  CURRENCY_SYMBOLS, CURRENCY_LABELS, ALL_CURRENCIES,
  ALL_INTEREST_TYPES, ALL_FREQUENCIES,
  INTEREST_TYPE_LABELS, FREQUENCY_LABELS,
} from "./logic";
import LoanInterestCalculatorPropertySEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  loanAmount: "", interestRate: "", duration: "20",
  durationUnit: "years", interestType: "emi",
  frequency: "monthly", downPayment: "", currency: "USD",
};

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "$100k / 7% / 10yr",  inputs: { loanAmount: "100000", interestRate: "7",   duration: "10", durationUnit: "years" } },
  { label: "$250k / 5.5% / 20yr",inputs: { loanAmount: "250000", interestRate: "5.5", duration: "20", durationUnit: "years" } },
  { label: "$500k / 6.5% / 30yr",inputs: { loanAmount: "500000", interestRate: "6.5", duration: "30", durationUnit: "years" } },
  { label: "$80k / 6% / 15yr",   inputs: { loanAmount: "80000",  interestRate: "6",   duration: "15", durationUnit: "years" } },
];

const COMPARE_RATES = [4, 5, 6, 7, 8, 9, 10];

export default function LoanInterestCalculatorPropertyUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAmort, setShowAmort] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [amortView, setAmortView] = useState<"yearly" | "periodic">("yearly");
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
    const freqLabel = FREQUENCY_LABELS[result.frequency];
    const text = `Property Loan Summary\n${freqLabel} Payment: ${sym}${fmtNum(result.periodicPayment, 2)}\nTotal Interest: ${sym}${fmtNum(result.totalInterest, 0)}\nTotal Payment: ${sym}${fmtNum(result.totalPayment, 0)}\nPayoff: ${result.payoffDate}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };
  const handleExportTXT = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "property_loan_summary.txt");
  };
  const handleExportCSV = () => {
    if (!result || result.schedule.length === 0) return;
    exportScheduleCSV(result.schedule, result.frequency, result.currency);
  };
  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";
  const freqLabel = result ? FREQUENCY_LABELS[result.frequency] : "Periodic";

  const principal = parseFloat(inputs.loanAmount) || 0;
  const down      = parseFloat(inputs.downPayment) || 0;
  const rate      = parseFloat(inputs.interestRate) || 0;
  const dur       = parseFloat(inputs.duration) || 0;
  const years     = inputs.durationUnit === "years" ? dur : dur / 12;
  const ppy       = inputs.frequency === "monthly" ? 12 : inputs.frequency === "quarterly" ? 4 : 1;
  const totalPeriods = Math.round(years * ppy);

  const rateComparison = showCompare && principal > 0 && totalPeriods > 0
    ? compareRates(principal - down, COMPARE_RATES, totalPeriods, inputs.frequency)
    : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Loan Interest Calculator (Property)</h3>
              <p className="text-sm text-blue-800">
                Calculate property loan interest, EMI, total repayment, and amortization schedule. Supports EMI, simple interest, and compound interest methods.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Type</label>
                <div className="space-y-1.5">
                  {ALL_INTEREST_TYPES.map((t) => (
                    <button key={t} onClick={() => set("interestType", t)}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${inputs.interestType === t ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {INTEREST_TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {ALL_FREQUENCIES.map((f) => (
                    <button key={f} onClick={() => set("frequency", f)}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${inputs.frequency === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {FREQUENCY_LABELS[f]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select value={inputs.currency} onChange={(e) => set("currency", e.target.value as Currency)} className={selectCls}>
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                {inputs.interestType === "emi"      && <div className="font-mono">EMI = P×r(1+r)ⁿ / ((1+r)ⁿ−1)</div>}
                {inputs.interestType === "simple"   && <div className="font-mono">I = P × R × T</div>}
                {inputs.interestType === "compound" && <div className="font-mono">A = P(1 + r/n)^(nt)</div>}
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
                    <button onClick={handleExportTXT} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      📄 Export TXT
                    </button>
                    <button onClick={handleExportCSV} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      📊 Export CSV
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                {freqLabel} Payment
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? fmt(result.periodicPayment, result.currency, 2) : "—"}
              </div>
              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Principal:</span>
                    <span className="font-semibold">{fmt(result.principal, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Interest:</span>
                    <span className="font-semibold">{fmt(result.totalInterest, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Payment:</span>
                    <span className="font-semibold">{fmt(result.totalPayment, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Payoff:</span>
                    <span className="font-semibold text-xs">{result.payoffDate}</span>
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

            {/* Loan Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Loan Details</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount ({sym})</label>
                  <input ref={firstRef} type="number" inputMode="decimal"
                    value={inputs.loanAmount} onChange={(e) => setNum("loanAmount", e.target.value)}
                    className={inputCls} placeholder="e.g. 100000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment ({sym}) — Optional</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.downPayment} onChange={(e) => setNum("downPayment", e.target.value)}
                    className={inputCls} placeholder="e.g. 20000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (%)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.interestRate} onChange={(e) => setNum("interestRate", e.target.value)}
                    className={inputCls} placeholder="e.g. 6.5" min="0" max="30" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <div className="flex gap-2">
                    <input type="number" inputMode="decimal"
                      value={inputs.duration} onChange={(e) => setNum("duration", e.target.value)}
                      className={inputCls} placeholder="e.g. 20" min="1" step="1" />
                    <div className="flex flex-col gap-1">
                      {(["years", "months"] as DurationUnit[]).map((u) => (
                        <button key={u} onClick={() => set("durationUnit", u)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${inputs.durationUnit === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Principal: {fmt(result.principal, result.currency, 0)}</strong>
                  {" → "}
                  <strong>{freqLabel} Payment: {fmt(result.periodicPayment, result.currency, 2)}</strong>
                  {" · "}
                  <strong>Total Interest: {fmt(result.totalInterest, result.currency, 0)}</strong>
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

            {/* Summary Cards */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Loan Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: `${freqLabel} Payment`, value: fmt(result.periodicPayment, result.currency, 2), highlight: true },
                    { label: "Principal",             value: fmt(result.principal, result.currency, 0) },
                    { label: "Total Interest",        value: fmt(result.totalInterest, result.currency, 0) },
                    { label: "Total Payment",         value: fmt(result.totalPayment, result.currency, 0) },
                    { label: "Total Periods",         value: `${result.totalPeriods}`, isText: true },
                    { label: "Payoff Date",           value: result.payoffDate, isText: true },
                  ].map(({ label, value, highlight, isText }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : isText ? "text-sm text-gray-900" : "text-base text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rate Comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Rate Comparison</h3>
                  <button onClick={() => setShowCompare(!showCompare)} className="text-sm text-primary font-medium hover:underline">
                    {showCompare ? "Hide" : "Show"}
                  </button>
                </div>
                {showCompare && rateComparison.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Rate</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">{freqLabel} Payment</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Total Interest</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Total Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {rateComparison.map((s) => {
                          const isCurrent = Math.abs(s.rate - rate) < 0.05;
                          return (
                            <tr key={s.rate} className={`hover:bg-gray-50 ${isCurrent ? "bg-primary/5" : ""}`}>
                              <td className={`py-2 px-3 font-semibold ${isCurrent ? "text-primary" : ""}`}>{s.rate}%</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(s.periodicPayment, inputs.currency, 2)}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(s.totalInterest, inputs.currency, 0)}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(s.totalPayment, inputs.currency, 0)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : showCompare && (
                  <p className="text-sm text-gray-500">Enter loan details above to see the rate comparison.</p>
                )}
                {!showCompare && <p className="text-sm text-gray-500">Click Show to compare rates from 4% to 10%.</p>}
              </div>
            )}

            {/* Amortization Table */}
            {result && result.schedule.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Repayment Schedule</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {(["yearly", "periodic"] as const).map((v) => (
                        <button key={v} onClick={() => setAmortView(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${amortView === v ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                          {v === "periodic" ? freqLabel : "Yearly"}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setShowAmort(!showAmort)} className="text-sm text-primary font-medium hover:underline">
                      {showAmort ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {showAmort ? (
                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead className="sticky top-0 bg-white border-b border-gray-200">
                        <tr>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">{amortView === "yearly" ? "Year" : "Period"}</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Payment</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Principal</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Interest</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {amortView === "yearly"
                          ? result.yearlySchedule.map((y) => (
                            <tr key={y.year} className="hover:bg-gray-50">
                              <td className="py-2 px-3 font-medium">Year {y.year}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(y.totalPayment, result.currency, 0)}</td>
                              <td className="py-2 px-3 text-right font-mono text-primary">{fmt(y.totalPrincipal, result.currency, 0)}</td>
                              <td className="py-2 px-3 text-right font-mono text-gray-500">{fmt(y.totalInterest, result.currency, 0)}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(y.endBalance, result.currency, 0)}</td>
                            </tr>
                          ))
                          : result.schedule.slice(0, 120).map((r) => (
                            <tr key={r.period} className="hover:bg-gray-50">
                              <td className="py-2 px-3 font-medium">{r.period}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(r.payment, result.currency, 2)}</td>
                              <td className="py-2 px-3 text-right font-mono text-primary">{fmt(r.principal, result.currency, 2)}</td>
                              <td className="py-2 px-3 text-right font-mono text-gray-500">{fmt(r.interest, result.currency, 2)}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(r.balance, result.currency, 0)}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    {amortView === "periodic" && result.schedule.length > 120 && (
                      <div className="p-3 text-center text-xs text-gray-500 border-t border-gray-100">
                        Showing first 120 periods. Export CSV for full schedule.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-sm text-gray-500">Click Show to view the full repayment schedule.</div>
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
                            {CURRENCY_SYMBOLS[entry.inputs.currency]}{fmtNum(parseFloat(entry.inputs.loanAmount) || 0, 0)} · {entry.inputs.interestRate}% · {entry.inputs.duration} {entry.inputs.durationUnit}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {fmt(entry.result.periodicPayment, entry.result.currency, 2)}/{FREQUENCY_LABELS[entry.result.frequency].toLowerCase()} · {fmt(entry.result.totalInterest, entry.result.currency, 0)} interest
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

      <LoanInterestCalculatorPropertySEO />
      <RelatedTools
        currentTool="loan-interest-calculator-property"
        tools={[
          "mortgage-loan-calculator",
          "home-loan-emi-calculator",
          "down-payment-calculator",
          "land-price-calculator",
        ]}
      />
    </>
  );
}
