"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateMargin, validateInputs, formatCurrency, formatPct, parseNum,
  saveHistory, getHistory, clearHistory, debounce, buildShareUrl, parseShareParams,
  CURRENCIES, MODE_LABELS,
  type CalcMode, type ProfitMarginResult, type HistoryEntry, type ValidationErrors,
} from "./logic";
import ProfitMarginCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; mode: CalcMode; fields: Record<string, string> }[] = [
  { label: "33% Margin",    mode: "margin",       fields: { cost: "80",    selling: "120"   } },
  { label: "25% Margin",    mode: "margin",       fields: { cost: "150",   selling: "200"   } },
  { label: "50% Markup",    mode: "markup",       fields: { cost: "100",   selling: "150"   } },
  { label: "Find Price 40%",mode: "sellingPrice", fields: { cost: "60",    targetMargin: "40" } },
  { label: "Revenue Mode",  mode: "revenue",      fields: { revenue: "15000", totalCost: "10500" } },
];

const PERF_STYLES: Record<ProfitMarginResult["performanceLevel"], { bg: string; text: string; border: string; dot: string }> = {
  excellent: { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
  good:      { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500"   },
  average:   { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  low:       { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-400" },
  loss:      { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500"    },
};

export default function ProfitMarginCalculatorUI() {
  const [mode, setMode]               = useState<CalcMode>("margin");
  const [currency, setCurrency]       = useState("USD");
  const [decimals, setDecimals]       = useState(2);
  // Margin / Markup fields
  const [cost, setCost]               = useState("80");
  const [selling, setSelling]         = useState("120");
  // Find Selling Price / Find Cost Price
  const [targetMargin, setTargetMargin] = useState("33.33");
  // Revenue mode
  const [revenue, setRevenue]         = useState("15000");
  const [totalCost, setTotalCost]     = useState("10500");

  const [result, setResult]           = useState<ProfitMarginResult | null>(null);
  const [errors, setErrors]           = useState<ValidationErrors>({});
  const [copied, setCopied]           = useState(false);
  const [shareCopied, setShare]       = useState(false);
  const [showHistory, setShowHist]    = useState(false);
  const [history, setHistData]        = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistData(getHistory());
    const shared = parseShareParams();
    if (shared) {
      if (shared.mode)        setMode(shared.mode as CalcMode);
      if (shared.currency)    setCurrency(shared.currency);
      if (shared.cost)        setCost(shared.cost);
      if (shared.selling)     setSelling(shared.selling);
      if (shared.targetMargin)setTargetMargin(shared.targetMargin);
      if (shared.revenue)     setRevenue(shared.revenue);
      if (shared.totalCost)   setTotalCost(shared.totalCost);
    } else {
      firstRef.current?.focus();
    }
  }, []);

  const run = useCallback(
    debounce((m: CalcMode, cur: string, dp: number,
              c: string, s: string, tm: string, rev: string, tc: string) => {
      const fields = { cost: c, selling: s, targetMargin: tm, revenue: rev, totalCost: tc };
      const errs = validateInputs(m, fields);
      setErrors(errs);
      if (Object.keys(errs).length > 0) { setResult(null); return; }
      const parsed = {
        cost:         parseNum(c)  ?? undefined,
        selling:      parseNum(s)  ?? undefined,
        targetMargin: parseNum(tm) ?? undefined,
        revenue:      parseNum(rev) ?? undefined,
        totalCost:    parseNum(tc)  ?? undefined,
      };
      setResult(calculateMargin(m, parsed, cur, dp));
    }, 130),
    []
  );

  useEffect(() => {
    run(mode, currency, decimals, cost, selling, targetMargin, revenue, totalCost);
  }, [mode, currency, decimals, cost, selling, targetMargin, revenue, totalCost, run]);

  const applyPreset = (p: typeof PRESETS[0]) => {
    setMode(p.mode);
    if (p.fields.cost)         setCost(p.fields.cost);
    if (p.fields.selling)      setSelling(p.fields.selling);
    if (p.fields.targetMargin) setTargetMargin(p.fields.targetMargin);
    if (p.fields.revenue)      setRevenue(p.fields.revenue);
    if (p.fields.totalCost)    setTotalCost(p.fields.totalCost);
    firstRef.current?.focus();
  };

  const handleReset = () => {
    setMode("margin"); setCost("80"); setSelling("120");
    setTargetMargin("33.33"); setRevenue("15000"); setTotalCost("10500");
    setErrors({}); setResult(null); firstRef.current?.focus();
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.marginFormatted);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    const lines = [
      "Profit Margin Report", "====================",
      `Mode:          ${MODE_LABELS[result.mode]}`,
      `Cost Price:    ${result.costPriceFormatted}`,
      `Selling Price: ${result.sellingPriceFormatted}`,
      `Profit:        ${result.profitFormatted}`,
      `Margin:        ${result.marginFormatted}`,
      `Markup:        ${result.markupFormatted}`,
      `Status:        ${result.statusLabel}`,
      `Assessment:    ${result.performanceLabel}`,
    ].join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const text = [
      "Profit Margin Report", "====================", "",
      `Mode:          ${MODE_LABELS[result.mode]}`,
      `Formula:       ${result.formula}`, "",
      `Cost Price:    ${result.costPriceFormatted}`,
      `Selling Price: ${result.sellingPriceFormatted}`,
      `Profit:        ${result.profitFormatted}`,
      `Margin:        ${result.marginFormatted}`,
      `Markup:        ${result.markupFormatted}`,
      `Status:        ${result.statusLabel}`,
      `Assessment:    ${result.performanceLabel}`, "",
      result.interpretation, "",
      "Generated by Productive Toolbox",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `profit_margin_${result.mode}.txt`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const csv = [
      "Mode,Cost Price,Selling Price,Profit,Margin,Markup,Status,Assessment",
      [MODE_LABELS[result.mode], result.costPriceFormatted, result.sellingPriceFormatted,
       result.profitFormatted, result.marginFormatted, result.markupFormatted,
       result.statusLabel, result.performanceLabel].join(","),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `profit_margin_${result.mode}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleShare = () => {
    if (!result) return;
    const fields: Record<string, string> = { cost, selling, targetMargin, revenue, totalCost };
    navigator.clipboard.writeText(buildShareUrl(mode, fields, currency));
    setShare(true); setTimeout(() => setShare(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ mode, result });
    setHistData(getHistory());
  };

  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const perfStyle = result ? PERF_STYLES[result.performanceLevel] : null;
  const hasErrors = Object.keys(errors).length > 0;

  // ── Shared input class ─────────────────────────────────────────────────────
  const inputCls = (err?: string) =>
    `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${err ? "border-red-300" : "border-gray-200"}`;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">💰</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Profit Margin Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter your cost and selling price to instantly calculate profit margin, markup, and profitability. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Calculation Mode
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(Object.keys(MODE_LABELS) as CalcMode[]).map((m) => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); }}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-colors border ${
                  mode === m ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}>
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left column ── */}
          <div className="lg:col-span-4 space-y-5">

            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Inputs
              </h3>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-currency">Currency</label>
                <select id="pm-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {Object.entries(CURRENCIES).map(([code, { label }]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Decimal Places */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-decimal">Decimal Places</label>
                <select id="pm-decimal" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {[0, 1, 2, 3, 4].map((d) => (
                    <option key={d} value={d}>{d} decimal{d !== 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              {/* Margin / Markup mode */}
              {(mode === "margin" || mode === "markup") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-cost">
                      Cost Price ({sym})
                    </label>
                    <input ref={firstRef} id="pm-cost" type="number" min="0" value={cost}
                      onChange={(e) => setCost(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.cost)} placeholder="80" aria-label="Cost price" />
                    {errors.cost && <p className="text-xs text-red-600 mt-1" role="alert">{errors.cost}</p>}
                    <p className="text-xs text-gray-400 mt-1">What you paid for the product</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-selling">
                      Selling Price ({sym})
                    </label>
                    <input id="pm-selling" type="number" min="0" value={selling}
                      onChange={(e) => setSelling(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.selling)} placeholder="120" aria-label="Selling price" />
                    {errors.selling && <p className="text-xs text-red-600 mt-1" role="alert">{errors.selling}</p>}
                    <p className="text-xs text-gray-400 mt-1">What you charge the customer</p>
                  </div>
                </>
              )}

              {/* Find Selling Price mode */}
              {mode === "sellingPrice" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-cost-sp">
                      Cost Price ({sym})
                    </label>
                    <input ref={firstRef} id="pm-cost-sp" type="number" min="0" value={cost}
                      onChange={(e) => setCost(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.cost)} placeholder="60" />
                    {errors.cost && <p className="text-xs text-red-600 mt-1" role="alert">{errors.cost}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-tm-sp">
                      Target Margin (%)
                    </label>
                    <input id="pm-tm-sp" type="number" min="0.01" max="99.99" value={targetMargin}
                      onChange={(e) => setTargetMargin(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.targetMargin)} placeholder="40" />
                    {errors.targetMargin && <p className="text-xs text-red-600 mt-1" role="alert">{errors.targetMargin}</p>}
                    <p className="text-xs text-gray-400 mt-1">Desired profit margin percentage</p>
                  </div>
                </>
              )}

              {/* Find Cost Price mode */}
              {mode === "costPrice" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-selling-cp">
                      Selling Price ({sym})
                    </label>
                    <input ref={firstRef} id="pm-selling-cp" type="number" min="0" value={selling}
                      onChange={(e) => setSelling(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.selling)} placeholder="120" />
                    {errors.selling && <p className="text-xs text-red-600 mt-1" role="alert">{errors.selling}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-tm-cp">
                      Target Margin (%)
                    </label>
                    <input id="pm-tm-cp" type="number" min="0" max="99.99" value={targetMargin}
                      onChange={(e) => setTargetMargin(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.targetMargin)} placeholder="33.33" />
                    {errors.targetMargin && <p className="text-xs text-red-600 mt-1" role="alert">{errors.targetMargin}</p>}
                    <p className="text-xs text-gray-400 mt-1">Desired profit margin percentage</p>
                  </div>
                </>
              )}

              {/* Revenue mode */}
              {mode === "revenue" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-revenue">
                      Revenue ({sym})
                    </label>
                    <input ref={firstRef} id="pm-revenue" type="number" min="0.01" value={revenue}
                      onChange={(e) => setRevenue(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.revenue)} placeholder="15000" />
                    {errors.revenue && <p className="text-xs text-red-600 mt-1" role="alert">{errors.revenue}</p>}
                    <p className="text-xs text-gray-400 mt-1">Total sales revenue for the period</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pm-totalcost">
                      Total Cost ({sym})
                    </label>
                    <input id="pm-totalcost" type="number" min="0" value={totalCost}
                      onChange={(e) => setTotalCost(e.target.value)} inputMode="decimal"
                      className={inputCls(errors.totalCost)} placeholder="10500" />
                    {errors.totalCost && <p className="text-xs text-red-600 mt-1" role="alert">{errors.totalCost}</p>}
                    <p className="text-xs text-gray-400 mt-1">Total cost of goods sold</p>
                  </div>
                </>
              )}

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
                Result
              </p>
              {result ? (
                <>
                  <div className="text-4xl font-bold font-mono mb-0.5 tabular-nums">{result.marginFormatted}</div>
                  <div className="text-sm text-primary-100 mb-2">profit margin</div>
                  {perfStyle && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${perfStyle.bg} ${perfStyle.text} ${perfStyle.border} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${perfStyle.dot}`} />{result.performanceLabel}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Profit</span>
                      <span className="font-semibold font-mono">{result.profitFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Markup</span>
                      <span className="font-semibold font-mono">{result.markupFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Status</span>
                      <span className="font-semibold">{result.statusLabel}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopyResult}
                      className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Margin"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopyFull}
                        className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">
                        Copy All
                      </button>
                      <button onClick={handleShare}
                        className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">
                        {shareCopied ? "✓ Copied!" : "Share URL"}
                      </button>
                    </div>
                    <button onClick={handleSave}
                      className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                      Save to History
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-primary-100 text-sm">
                  {hasErrors ? "Fix the errors above to calculate" : "Enter values to calculate margin"}
                </div>
              )}
            </div>

          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-8 space-y-5">

            {/* Quick Examples */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Examples
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => applyPreset(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      mode === p.mode ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}>
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

            {/* Calculation Breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Breakdown
                </h3>
              </div>
              {result ? (
                <>
                  <div className="divide-y divide-gray-50">
                    {[
                      { label: "Mode",          value: MODE_LABELS[result.mode] },
                      { label: "Cost Price",     value: result.costPriceFormatted },
                      { label: "Selling Price",  value: result.sellingPriceFormatted },
                      { label: "Profit",         value: result.profitFormatted,
                        colorClass: result.profit > 0 ? "text-green-600" : result.profit < 0 ? "text-red-500" : "text-gray-900" },
                      { label: "Profit Margin",  value: result.marginFormatted, highlight: true,
                        colorClass: result.profit >= 0 ? "text-primary" : "text-red-500" },
                      { label: "Markup",         value: result.markupFormatted },
                      { label: "Status",         value: result.statusLabel },
                      { label: "Formula",        value: result.formula },
                    ].map(({ label, value, highlight, colorClass }) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className={`text-sm font-semibold font-mono ${highlight ? "text-base" : ""} ${colorClass ?? "text-gray-900"}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {result.steps.length > 0 && (
                    <div className="px-5 pb-5 pt-2">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Steps</p>
                      <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs space-y-1">
                        {result.steps.map((s, i) => <div key={i} className="text-gray-700">{s}</div>)}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {hasErrors ? Object.values(errors)[0] : "Enter values above to see the breakdown"}
                </div>
              )}
            </div>

            {/* Performance Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Profit Margin Reference
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { level: "excellent" as const, label: "Excellent", range: "≥ 40%",      desc: "SaaS, digital products, luxury goods" },
                  { level: "good"      as const, label: "Good",      range: "20% – 39%",   desc: "Branded goods, professional services" },
                  { level: "average"   as const, label: "Average",   range: "10% – 19%",   desc: "Ecommerce, specialty retail" },
                  { level: "low"       as const, label: "Low",       range: "1% – 9%",     desc: "Grocery, consumer electronics" },
                  { level: "loss"      as const, label: "Loss",      range: "< 0%",        desc: "Cost exceeds selling price" },
                ] as { level: ProfitMarginResult["performanceLevel"]; label: string; range: string; desc: string }[]).map(({ level, label, range, desc }) => {
                  const s = PERF_STYLES[level];
                  const isActive = result?.performanceLevel === level;
                  return (
                    <div key={level} className={`flex items-center justify-between px-5 py-3 transition-colors ${isActive ? "bg-primary/5" : "hover:bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text} ${s.border} border`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{label}
                        </span>
                        <span className="text-xs text-gray-500">{desc}</span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-gray-700">{range}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">
                * Benchmarks reflect gross profit margin. Net margin will be lower after operating expenses and taxes.
              </p>
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
                        setMode(entry.mode);
                        setCost(String(entry.result.costPrice));
                        setSelling(String(entry.result.sellingPrice));
                        setShowHist(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          {entry.result.costPriceFormatted} → {entry.result.sellingPriceFormatted}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        Margin: {entry.result.marginFormatted} · {entry.result.performanceLabel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ProfitMarginCalculatorSEO />

      <RelatedTools
        currentTool="profit-margin-calculator-marketing"
        tools={[
          "revenue-growth-calculator",
          "roi-calculator-marketing",
          "cost-per-acquisition-cpa-calculator",
          "customer-lifetime-value-calculator",
          "investment-return-calculator",
          "break-even-calculator",
        ]}
      />
    </>
  );
}
