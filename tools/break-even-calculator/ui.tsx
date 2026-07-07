"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateBreakEven, validateInputs, formatCurrency, parseNum,
  saveHistory, getHistory, clearHistory, debounce, buildShareUrl, parseShareParams,
  CURRENCIES,
  type BreakEvenResult, type HistoryEntry, type ValidationErrors,
} from "./logic";
import BreakEvenCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS = [
  { label: "Retail",        fc: "5000",  vc: "12",  sp: "30",  cu: "",    tp: "" },
  { label: "SaaS",          fc: "8000",  vc: "5",   sp: "49",  cu: "250", tp: "5000" },
  { label: "Restaurant",    fc: "12000", vc: "8",   sp: "22",  cu: "700", tp: "" },
  { label: "Freelancer",    fc: "2000",  vc: "0",   sp: "100", cu: "30",  tp: "3000" },
  { label: "Manufacturing", fc: "25000", vc: "40",  sp: "90",  cu: "600", tp: "" },
];

type PerfLevel = "profitable" | "near-break-even" | "loss" | null;
const PERF_STYLES: Record<NonNullable<PerfLevel>, { bg: string; text: string; border: string; dot: string }> = {
  "profitable":     { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
  "near-break-even":{ bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  "loss":           { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500"    },
};

export default function BreakEvenCalculatorUI() {
  const [currency, setCurrency]     = useState("USD");
  const [decimals, setDecimals]     = useState(2);
  const [fc, setFc]                 = useState("10000");
  const [vc, setVc]                 = useState("20");
  const [sp, setSp]                 = useState("50");
  const [cu, setCu]                 = useState("500");
  const [tp, setTp]                 = useState("");
  const [result, setResult]         = useState<BreakEvenResult | null>(null);
  const [errors, setErrors]         = useState<ValidationErrors>({});
  const [copied, setCopied]         = useState(false);
  const [shareCopied, setShare]     = useState(false);
  const [showHistory, setShowHist]  = useState(false);
  const [history, setHistData]      = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistData(getHistory());
    const shared = parseShareParams();
    if (shared) {
      if (shared.currency) setCurrency(shared.currency);
      if (shared.fc) setFc(shared.fc);
      if (shared.vc) setVc(shared.vc);
      if (shared.sp) setSp(shared.sp);
      if (shared.cu) setCu(shared.cu);
      if (shared.tp) setTp(shared.tp);
    } else { firstRef.current?.focus(); }
  }, []);

  const run = useCallback(
    debounce((cur: string, dp: number, _fc: string, _vc: string, _sp: string, _cu: string, _tp: string) => {
      const errs = validateInputs({ fixedCosts: _fc, variableCostPerUnit: _vc, sellingPricePerUnit: _sp, currentUnitsSold: _cu, targetProfit: _tp });
      setErrors(errs);
      if (Object.keys(errs).length > 0) { setResult(null); return; }
      const inputs = {
        fixedCosts: parseNum(_fc) ?? 0,
        variableCostPerUnit: parseNum(_vc) ?? 0,
        sellingPricePerUnit: parseNum(_sp) ?? 0,
        currentUnitsSold: _cu.trim() ? (parseNum(_cu) ?? undefined) : undefined,
        targetProfit: _tp.trim() ? (parseNum(_tp) ?? undefined) : undefined,
        currency: cur,
      };
      setResult(calculateBreakEven(inputs, dp));
    }, 130),
    []
  );

  useEffect(() => { run(currency, decimals, fc, vc, sp, cu, tp); }, [currency, decimals, fc, vc, sp, cu, tp, run]);

  const applyPreset = (p: typeof PRESETS[0]) => {
    setFc(p.fc); setVc(p.vc); setSp(p.sp); setCu(p.cu); setTp(p.tp);
    firstRef.current?.focus();
  };

  const handleReset = () => {
    setFc("10000"); setVc("20"); setSp("50"); setCu("500"); setTp("");
    setErrors({}); setResult(null); firstRef.current?.focus();
  };

  const buildSummaryText = () => {
    if (!result) return "";
    const lines = [
      "Break Even Analysis Report", "===========================",
      `Fixed Costs:              ${formatCurrency(result.breakEvenUnits * 0, currency, decimals)}`, // placeholder
      `Contribution Margin:      ${result.contributionMarginFormatted}`,
      `CM Ratio:                 ${result.contributionMarginRatioFormatted}`,
      `Break-even Units:         ${result.breakEvenUnitsFormatted}`,
      `Break-even Revenue:       ${result.breakEvenRevenueFormatted}`,
      result.profitFormatted    ? `Profit / Loss:            ${result.profitFormatted}` : "",
      result.marginOfSafetyPctFormatted ? `Margin of Safety:         ${result.marginOfSafetyPctFormatted}` : "",
      result.unitsForTargetProfitFormatted ? `Units for Target Profit:  ${result.unitsForTargetProfitFormatted}` : "",
    ].filter(Boolean).join("\n");
    return lines;
  };

  const handleCopyFull = () => {
    navigator.clipboard.writeText(buildSummaryText());
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const text = buildSummaryText() + "\n\nGenerated by Productive Toolbox";
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "break_even_analysis.txt";
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const rows = [
      ["Metric", "Value"],
      ["Contribution Margin", result.contributionMarginFormatted],
      ["CM Ratio", result.contributionMarginRatioFormatted],
      ["Break-even Units", result.breakEvenUnitsFormatted],
      ["Break-even Revenue", result.breakEvenRevenueFormatted],
      result.profitFormatted ? ["Profit / Loss", result.profitFormatted] : null,
      result.marginOfSafetyPctFormatted ? ["Margin of Safety %", result.marginOfSafetyPctFormatted] : null,
      result.unitsForTargetProfitFormatted ? ["Units for Target Profit", result.unitsForTargetProfitFormatted] : null,
    ].filter(Boolean).map((r) => (r as string[]).join(",")).join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "break_even_analysis.csv";
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl({ fc, vc, sp, cu, tp }, currency));
    setShare(true); setTimeout(() => setShare(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs: { fixedCosts: parseNum(fc) ?? 0, variableCostPerUnit: parseNum(vc) ?? 0, sellingPricePerUnit: parseNum(sp) ?? 0, currentUnitsSold: cu.trim() ? parseNum(cu) ?? undefined : undefined, targetProfit: tp.trim() ? parseNum(tp) ?? undefined : undefined, currency }, result });
    setHistData(getHistory());
  };

  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const hasErrors = Object.keys(errors).length > 0;
  const perfStyle = result?.performanceLevel ? PERF_STYLES[result.performanceLevel] : null;
  const inputCls = (err?: string) =>
    `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${err ? "border-red-300" : "border-gray-200"}`;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">⚖️</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Break Even Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter your fixed costs, variable cost per unit, and selling price to instantly calculate your break-even point. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left column: inputs ── */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Cost &amp; Price Inputs
              </h3>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="be-currency">Currency</label>
                <select id="be-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {Object.entries(CURRENCIES).map(([code, { label }]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Decimal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="be-dp">Decimal Places</label>
                <select id="be-dp" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {[0, 1, 2, 3, 4].map((d) => <option key={d} value={d}>{d} decimal{d !== 1 ? "s" : ""}</option>)}
                </select>
              </div>

              {/* Fixed Costs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="be-fc">Fixed Costs ({sym})</label>
                <input ref={firstRef} id="be-fc" type="number" min="0" value={fc}
                  onChange={(e) => setFc(e.target.value)} inputMode="decimal"
                  className={inputCls(errors.fixedCosts)} placeholder="10000" />
                {errors.fixedCosts && <p className="text-xs text-red-600 mt-1" role="alert">{errors.fixedCosts}</p>}
                <p className="text-xs text-gray-400 mt-1">Rent, salaries, insurance — constant costs</p>
              </div>

              {/* Variable Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="be-vc">Variable Cost per Unit ({sym})</label>
                <input id="be-vc" type="number" min="0" value={vc}
                  onChange={(e) => setVc(e.target.value)} inputMode="decimal"
                  className={inputCls(errors.variableCostPerUnit)} placeholder="20" />
                {errors.variableCostPerUnit && <p className="text-xs text-red-600 mt-1" role="alert">{errors.variableCostPerUnit}</p>}
                <p className="text-xs text-gray-400 mt-1">Materials, shipping per unit produced</p>
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="be-sp">Selling Price per Unit ({sym})</label>
                <input id="be-sp" type="number" min="0.01" value={sp}
                  onChange={(e) => setSp(e.target.value)} inputMode="decimal"
                  className={inputCls(errors.sellingPricePerUnit)} placeholder="50" />
                {errors.sellingPricePerUnit && <p className="text-xs text-red-600 mt-1" role="alert">{errors.sellingPricePerUnit}</p>}
                <p className="text-xs text-gray-400 mt-1">Must be greater than variable cost</p>
              </div>

              {/* Optional divider */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Optional</p>
                {/* Current Units Sold */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="be-cu">Current Units Sold</label>
                    <input id="be-cu" type="number" min="0" value={cu}
                      onChange={(e) => setCu(e.target.value)} inputMode="numeric"
                      className={inputCls(errors.currentUnitsSold)} placeholder="500 (for profit/loss)" />
                    {errors.currentUnitsSold && <p className="text-xs text-red-600 mt-1" role="alert">{errors.currentUnitsSold}</p>}
                    <p className="text-xs text-gray-400 mt-1">Enables profit/loss &amp; margin of safety</p>
                  </div>
                  {/* Target Profit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="be-tp">Target Profit ({sym})</label>
                    <input id="be-tp" type="number" min="0" value={tp}
                      onChange={(e) => setTp(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.targetProfit)} placeholder="0 (optional)" />
                    {errors.targetProfit && <p className="text-xs text-red-600 mt-1" role="alert">{errors.targetProfit}</p>}
                    <p className="text-xs text-gray-400 mt-1">Calculates units needed to hit this profit</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <button onClick={handleReset}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  Reset
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadTxt} disabled={!result}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Export TXT
                  </button>
                  <button onClick={handleDownloadCsv} disabled={!result}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Export CSV
                  </button>
                </div>
                <button onClick={() => setShowHist(!showHistory)}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Break-Even Point
              </p>
              {result ? (
                <>
                  <div className="text-3xl font-bold font-mono mb-0.5 tabular-nums">{result.breakEvenUnitsFormatted}</div>
                  <div className="text-sm text-primary-100 mb-2">units to break even</div>
                  {perfStyle && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${perfStyle.bg} ${perfStyle.text} ${perfStyle.border} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${perfStyle.dot}`} />{result.performanceLabel}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Break-even Revenue</span>
                      <span className="font-semibold font-mono">{result.breakEvenRevenueFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Contribution Margin</span>
                      <span className="font-semibold font-mono">{result.contributionMarginFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">CM Ratio</span>
                      <span className="font-semibold font-mono">{result.contributionMarginRatioFormatted}</span>
                    </div>
                    {result.profitFormatted && (
                      <div className="flex justify-between">
                        <span className="text-primary-100">Profit / Loss</span>
                        <span className={`font-semibold font-mono ${result.profit !== null && result.profit < 0 ? "text-red-200" : ""}`}>
                          {result.profitFormatted}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopyFull}
                      className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy All Results"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleShare}
                        className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">
                        {shareCopied ? "✓ Copied!" : "Share URL"}
                      </button>
                      <button onClick={handleSave}
                        className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">
                        Save
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-primary-100 text-sm">
                  {hasErrors ? "Fix the errors above to calculate" : "Enter your costs and selling price to calculate"}
                </div>
              )}
            </div>
          </div>

          {/* ── Right column: results ── */}
          <div className="lg:col-span-8 space-y-5">

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Industry Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => applyPreset(p)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interpretation */}
            {result && perfStyle && (
              <div className={`rounded-xl border p-5 ${perfStyle.bg} ${perfStyle.border}`}>
                <p className={`text-xs font-semibold mb-1 ${perfStyle.text}`}>Interpretation</p>
                <p className={`text-sm ${perfStyle.text}`}>{result.interpretation}</p>
              </div>
            )}

            {/* Full Breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Full Breakdown
                </h3>
              </div>
              {result ? (
                <>
                  <div className="divide-y divide-gray-50">
                    {[
                      { label: "Contribution Margin",   value: result.contributionMarginFormatted,       highlight: false },
                      { label: "CM Ratio",              value: result.contributionMarginRatioFormatted,  highlight: false },
                      { label: "Break-even Units",      value: result.breakEvenUnitsFormatted + " units", highlight: true  },
                      { label: "Break-even Revenue",    value: result.breakEvenRevenueFormatted,          highlight: true  },
                      ...(result.profitFormatted ? [{ label: "Profit / Loss", value: result.profitFormatted,
                          highlight: false, colorClass: result.profit !== null && result.profit < 0 ? "text-red-500" : "text-green-600" }] : []),
                      ...(result.marginOfSafetyRevenueFormatted ? [{ label: "Margin of Safety (Revenue)", value: result.marginOfSafetyRevenueFormatted, highlight: false }] : []),
                      ...(result.marginOfSafetyPctFormatted ? [{ label: "Margin of Safety %", value: result.marginOfSafetyPctFormatted, highlight: false }] : []),
                      ...(result.unitsForTargetProfitFormatted ? [{ label: "Units for Target Profit", value: result.unitsForTargetProfitFormatted, highlight: false }] : []),
                      ...(result.revenueForTargetProfitFormatted ? [{ label: "Revenue for Target Profit", value: result.revenueForTargetProfitFormatted, highlight: false }] : []),
                    ].map(({ label, value, highlight, colorClass }: { label: string; value: string; highlight: boolean; colorClass?: string }) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className={`text-sm font-semibold font-mono ${highlight ? "text-primary text-base" : colorClass ?? "text-gray-900"}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {result.steps.length > 0 && (
                    <div className="px-5 pb-5 pt-2">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Calculation Steps</p>
                      <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs space-y-1">
                        {result.steps.map((s, i) => <div key={i} className="text-gray-700">{s}</div>)}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {hasErrors ? Object.values(errors)[0] : "Enter values above to see the full breakdown"}
                </div>
              )}
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistData([]); } }}
                      className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id}
                      onClick={() => {
                        setFc(String(entry.inputs.fixedCosts));
                        setVc(String(entry.inputs.variableCostPerUnit));
                        setSp(String(entry.inputs.sellingPricePerUnit));
                        setCu(entry.inputs.currentUnitsSold != null ? String(entry.inputs.currentUnitsSold) : "");
                        setTp(entry.inputs.targetProfit != null ? String(entry.inputs.targetProfit) : "");
                        setCurrency(entry.inputs.currency);
                        setShowHist(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          BEU: {entry.result.breakEvenUnitsFormatted} · {entry.result.breakEvenRevenueFormatted}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        CM: {entry.result.contributionMarginFormatted} · {entry.result.performanceLabel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BreakEvenCalculatorSEO />

      <RelatedTools
        currentTool="break-even-calculator"
        tools={[
          "profit-margin-calculator-marketing",
          "revenue-growth-calculator",
          "roi-calculator-marketing",
          "cost-per-acquisition-cpa-calculator",
          "customer-lifetime-value-calculator",
          "investment-return-calculator",
        ]}
      />
    </>
  );
}
