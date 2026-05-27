"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult,
  CalculatorInputs,
  Currency,
  HistoryEntry,
  LoanTerm,
} from "./types";
import {
  calculate,
  compareTerms,
  fmt,
  fmtNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportScheduleCSV,
  exportToText,
  downloadFile,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  ALL_CURRENCIES,
  LOAN_TERMS,
} from "./logic";
import MortgageLoanCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── SVG Donut Chart ───────────────────────────────────────────────────────────

function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total <= 0) return null;
  const pct = principal / total;
  const R = 54, cx = 64, cy = 64;
  const circ = 2 * Math.PI * R;
  const pDash = pct * circ;
  const iDash = circ - pDash;
  return (
    <svg viewBox="0 0 128 128" className="w-full max-w-[128px]" aria-label="Payment breakdown">
      {/* Interest arc */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e5e7eb" strokeWidth="18" />
      {/* Principal arc */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#058554" strokeWidth="18"
        strokeDasharray={`${pDash} ${iDash}`}
        strokeDashoffset={circ / 4}
        transform={`rotate(-90 ${cx} ${cy})`} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#374151" fontFamily="system-ui">
        {Math.round(pct * 100)}%
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="system-ui">principal</text>
    </svg>
  );
}

// ── Balance SVG line chart ────────────────────────────────────────────────────

function BalanceChart({ result }: { result: CalculationResult }) {
  const W = 400, H = 120, PAD = { t: 10, r: 10, b: 24, l: 48 };
  const dW = W - PAD.l - PAD.r;
  const dH = H - PAD.t - PAD.b;
  const yearly = result.yearlySchedule;
  if (yearly.length === 0) return null;
  const maxBal = result.principal;
  const pts = yearly.map((y, i) => {
    const x = PAD.l + (i / (yearly.length - 1 || 1)) * dW;
    const yy = PAD.t + (1 - y.endBalance / maxBal) * dH;
    return `${x},${yy}`;
  });
  const startPt = `${PAD.l},${PAD.t}`;
  const polyline = [startPt, ...pts].join(" ");
  const area = `M${PAD.l},${PAD.t + dH} L${startPt} L${pts.join(" L")} L${PAD.l + dW},${PAD.t + dH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Loan balance over time">
      <defs>
        <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#058554" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#058554" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f) => {
        const y = PAD.t + f * dH;
        return (
          <g key={f}>
            <line x1={PAD.l} y1={y} x2={PAD.l + dW} y2={y} stroke="#f3f4f6" strokeWidth="1" />
            <text x={PAD.l - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#9ca3af" fontFamily="system-ui">
              {Math.round(maxBal * (1 - f) / 1000)}k
            </text>
          </g>
        );
      })}
      {/* Area fill */}
      <path d={area} fill="url(#balGrad)" />
      {/* Line */}
      <polyline points={polyline} fill="none" stroke="#058554" strokeWidth="2" strokeLinejoin="round" />
      {/* X labels */}
      {yearly.filter((_, i) => i % Math.max(1, Math.floor(yearly.length / 5)) === 0).map((y) => {
        const x = PAD.l + ((y.year - 1) / (yearly.length - 1 || 1)) * dW;
        return (
          <text key={y.year} x={x} y={H - 4} textAnchor="middle" fontSize="8" fill="#9ca3af" fontFamily="system-ui">
            Yr {y.year}
          </text>
        );
      })}
    </svg>
  );
}

// ── Defaults & Presets ────────────────────────────────────────────────────────

const DEFAULT_INPUTS: CalculatorInputs = {
  loanAmount:    "",
  interestRate:  "",
  loanTermYears: 30,
  downPayment:   "",
  propertyTax:   "",
  homeInsurance: "",
  extraPayment:  "",
  currency:      "USD",
};

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "$300k / 6.5% / 30yr", inputs: { loanAmount: "300000", interestRate: "6.5", loanTermYears: 30 } },
  { label: "$150k / 5% / 15yr",   inputs: { loanAmount: "150000", interestRate: "5",   loanTermYears: 15 } },
  { label: "$500k / 7% / 30yr",   inputs: { loanAmount: "500000", interestRate: "7",   loanTermYears: 30, downPayment: "100000" } },
  { label: "$250k / 6% / 20yr",   inputs: { loanAmount: "250000", interestRate: "6",   loanTermYears: 20 } },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function MortgageLoanCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAmort, setShowAmort] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [amortView, setAmortView] = useState<"monthly" | "yearly">("yearly");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 150), [inputs]);
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({ ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `Mortgage Summary\nMonthly Payment: ${sym}${fmtNum(result.monthlyPayment, 2)}\nTotal Interest: ${sym}${fmtNum(result.totalInterest, 0)}\nTotal Cost: ${sym}${fmtNum(result.totalPayment, 0)}\nPayoff: ${result.payoffDate}`;
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
    downloadFile(exportToText(inputs, result), "mortgage_summary.txt");
  };
  const handleExportCSV = () => {
    if (!result || result.schedule.length === 0) return;
    exportScheduleCSV(result.schedule, result.currency);
  };
  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  const comparison = result
    ? compareTerms(
        parseFloat(inputs.loanAmount) || 0,
        parseFloat(inputs.downPayment) || 0,
        parseFloat(inputs.interestRate) || 0
      )
    : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏦</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Mortgage Loan Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate monthly mortgage payments, total interest, amortization schedule, and payoff date. Simulate extra payments to see how much you can save.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {LOAN_TERMS.map((t) => (
                    <button key={t} onClick={() => set("loanTermYears", t)}
                      className={`px-2 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.loanTermYears === t ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {t}yr
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
                <div className="font-mono">M = P × r(1+r)ⁿ / ((1+r)ⁿ−1)</div>
                <div className="text-gray-500 mt-1">P=principal, r=monthly rate, n=months</div>
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
                Monthly Payment (P&I)
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result ? fmt(result.monthlyPayment, result.currency, 2) : "—"}
              </div>
              {result && result.totalMonthly !== result.monthlyPayment && (
                <div className="text-primary-100 text-sm mb-2">
                  Total w/ tax & ins: {fmt(result.totalMonthly, result.currency, 2)}
                </div>
              )}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Principal:</span>
                    <span className="font-semibold">{fmt(result.principal, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Interest:</span>
                    <span className="font-semibold">{fmt(result.totalInterest, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Cost:</span>
                    <span className="font-semibold">{fmt(result.totalPayment, result.currency, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Payoff:</span>
                    <span className="font-semibold text-xs">{result.payoffDate}</span>
                  </div>
                  {result.extraMonthlyPayment > 0 && result.interestSaved > 0 && (
                    <>
                      <div className="pt-1 border-t border-white/20 mt-1 flex justify-between">
                        <span className="text-primary-100">Interest Saved:</span>
                        <span className="font-semibold text-yellow-300">{fmt(result.interestSaved, result.currency, 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Months Saved:</span>
                        <span className="font-semibold text-yellow-300">{result.monthsSaved}</span>
                      </div>
                    </>
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
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Loan Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount ({sym})</label>
                  <input ref={firstRef} type="number" inputMode="decimal"
                    value={inputs.loanAmount} onChange={(e) => setNum("loanAmount", e.target.value)}
                    className={inputCls} placeholder="e.g. 300000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment ({sym})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.downPayment} onChange={(e) => setNum("downPayment", e.target.value)}
                    className={inputCls} placeholder="e.g. 60000" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (%)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.interestRate} onChange={(e) => setNum("interestRate", e.target.value)}
                    className={inputCls} placeholder="e.g. 6.5" min="0" max="30" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Extra Monthly Payment ({sym})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.extraPayment} onChange={(e) => setNum("extraPayment", e.target.value)}
                    className={inputCls} placeholder="e.g. 200" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Reduces total interest and payoff time</p>
                </div>
              </div>
            </div>

            {/* Optional Costs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Optional Costs</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Property Tax ({sym})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.propertyTax} onChange={(e) => setNum("propertyTax", e.target.value)}
                    className={inputCls} placeholder="e.g. 3600" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Added to monthly total</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Home Insurance ({sym})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.homeInsurance} onChange={(e) => setNum("homeInsurance", e.target.value)}
                    className={inputCls} placeholder="e.g. 1200" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Added to monthly total</p>
                </div>
              </div>
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

            {/* Summary Cards + Chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Payment Breakdown</h3>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <DonutChart principal={result.principal} interest={result.totalInterest} />
                    <div className="flex gap-3 mt-2 text-xs justify-center">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary inline-block" />Principal</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />Interest</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                    {[
                      { label: "Monthly P&I",    value: fmt(result.monthlyPayment, result.currency, 2), highlight: true },
                      { label: "Total Monthly",  value: fmt(result.totalMonthly, result.currency, 2) },
                      { label: "Total Interest", value: fmt(result.totalInterest, result.currency, 0) },
                      { label: "Total Cost",     value: fmt(result.totalPayment, result.currency, 0) },
                      { label: "Loan Term",      value: `${result.totalMonths} months`, isText: true },
                      { label: "Payoff Date",    value: result.payoffDate, isText: true },
                    ].map(({ label, value, highlight, isText }) => (
                      <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                        <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : isText ? "text-sm text-gray-900" : "text-base text-gray-900"}`}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Balance Chart */}
            {result && result.yearlySchedule.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Loan Balance Over Time</h3>
                <BalanceChart result={result} />
              </div>
            )}

            {/* Term Comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Term Comparison</h3>
                  <button onClick={() => setShowComparison(!showComparison)} className="text-sm text-primary font-medium hover:underline">
                    {showComparison ? "Hide" : "Show"}
                  </button>
                </div>
                {showComparison && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Term</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Monthly</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Total Interest</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Total Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {comparison.map((c) => (
                          <tr key={c.term} className={`hover:bg-gray-50 ${c.term === inputs.loanTermYears ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-medium ${c.term === inputs.loanTermYears ? "text-primary" : ""}`}>{c.term} years</td>
                            <td className="py-2 px-3 text-right font-mono">{fmt(c.monthlyPayment, inputs.currency, 2)}</td>
                            <td className="py-2 px-3 text-right font-mono">{fmt(c.totalInterest, inputs.currency, 0)}</td>
                            <td className="py-2 px-3 text-right font-mono">{fmt(c.totalPayment, inputs.currency, 0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {!showComparison && <p className="text-sm text-gray-500">Click Show to compare all loan terms side by side.</p>}
              </div>
            )}

            {/* Amortization Table */}
            {result && result.schedule.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Amortization Schedule</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {(["yearly", "monthly"] as const).map((v) => (
                        <button key={v} onClick={() => setAmortView(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${amortView === v ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setShowAmort(!showAmort)} className="text-sm text-primary font-medium hover:underline">
                      {showAmort ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {showAmort && (
                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead className="sticky top-0 bg-white border-b border-gray-200">
                        <tr>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">{amortView === "yearly" ? "Year" : "Month"}</th>
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
                            <tr key={r.month} className="hover:bg-gray-50">
                              <td className="py-2 px-3 font-medium">{r.month}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(r.payment, result.currency, 2)}</td>
                              <td className="py-2 px-3 text-right font-mono text-primary">{fmt(r.principal, result.currency, 2)}</td>
                              <td className="py-2 px-3 text-right font-mono text-gray-500">{fmt(r.interest, result.currency, 2)}</td>
                              <td className="py-2 px-3 text-right font-mono">{fmt(r.balance, result.currency, 0)}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    {amortView === "monthly" && result.schedule.length > 120 && (
                      <div className="p-3 text-center text-xs text-gray-500 border-t border-gray-100">
                        Showing first 120 months. Export CSV for full schedule.
                      </div>
                    )}
                  </div>
                )}
                {!showAmort && <div className="p-4 text-sm text-gray-500">Click Show to view the full amortization schedule.</div>}
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
                            {CURRENCY_SYMBOLS[entry.inputs.currency]}{fmtNum(parseFloat(entry.inputs.loanAmount) || 0, 0)} · {entry.inputs.interestRate}% · {entry.inputs.loanTermYears}yr
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {fmt(entry.result.monthlyPayment, entry.result.currency, 2)}/mo · {fmt(entry.result.totalInterest, entry.result.currency, 0)} interest
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

      <MortgageLoanCalculatorSEO />
      <RelatedTools
        currentTool="mortgage-loan-calculator"
        tools={[
          "land-price-calculator",
          "land-valuation-calculator",
          "property-tax-calculator",
          "down-payment-calculator",
        ]}
      />
    </>
  );
}
