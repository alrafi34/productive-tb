"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateROI,
  validateInputs,
  formatCurrency,
  parseNumber,
  saveHistory,
  getHistory,
  clearHistory,
  debounce,
  buildShareUrl,
  parseShareParams,
  CURRENCIES,
  type ROIResult,
  type HistoryEntry,
} from "./logic";
import ROICalculatorMarketingSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS = [
  { label: "Google Ads", investment: 1000, revenue: 1500 },
  { label: "Facebook Ads", investment: 5000, revenue: 12500 },
  { label: "Email Campaign", investment: 500, revenue: 2500 },
  { label: "SEO Project", investment: 3000, revenue: 9000 },
  { label: "Loss Example", investment: 10000, revenue: 8000 },
  { label: "Break-Even", investment: 2000, revenue: 2000 },
];

const STATUS_STYLES = {
  profitable: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
  "break-even": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  loss: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
};

const PERF_STYLES: Record<ROIResult["performanceLevel"], { bg: string; text: string; border: string; dot: string }> = {
  exceptional: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  excellent:   { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
  good:        { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500"   },
  average:     { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  low:         { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-400" },
  loss:        { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500"    },
};

export default function ROICalculatorMarketingUI() {
  const [investment, setInvestment] = useState("1000");
  const [revenue, setRevenue] = useState("1500");
  const [currency, setCurrency] = useState("USD");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [result, setResult] = useState<ROIResult | null>(null);
  const [investmentError, setInvestmentError] = useState<string | null>(null);
  const [revenueError, setRevenueError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const investmentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setInvestment(shared.investment);
      setRevenue(shared.revenue);
      setCurrency(shared.currency);
    } else {
      investmentRef.current?.focus();
    }
  }, []);

  const run = useCallback(
    debounce((inv: string, rev: string, cur: string, dp: number) => {
      const { investmentError: ie, revenueError: re } = validateInputs(inv, rev);
      setInvestmentError(ie);
      setRevenueError(re);
      if (ie || re) { setResult(null); return; }
      const iv = parseNumber(inv);
      const rv = parseNumber(rev);
      if (iv === null || rv === null) { setResult(null); return; }
      setResult(calculateROI(iv, rv, cur, dp));
    }, 120),
    []
  );

  useEffect(() => { run(investment, revenue, currency, decimalPlaces); },
    [investment, revenue, currency, decimalPlaces, run]);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInvestment(String(p.investment));
    setRevenue(String(p.revenue));
    investmentRef.current?.focus();
  };

  const handleReset = () => {
    setInvestment("1000"); setRevenue("1500");
    setResult(null); setInvestmentError(null); setRevenueError(null);
    investmentRef.current?.focus();
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.roiFormatted);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    const sym = CURRENCIES[result.currency]?.symbol ?? "$";
    const text = [
      `ROI Calculator Report`,
      `=====================`,
      `Investment:  ${sym}${result.investment.toLocaleString("en-US")}`,
      `Revenue:     ${sym}${result.revenue.toLocaleString("en-US")}`,
      `Profit:      ${result.profitFormatted}`,
      `ROI:         ${result.roiFormatted}`,
      `Status:      ${result.statusLabel}`,
      `Performance: ${result.performanceLabel}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const sym = CURRENCIES[result.currency]?.symbol ?? "$";
    const text = [
      `ROI Calculator Report`, `=====================`, ``,
      `Investment:  ${sym}${result.investment.toLocaleString("en-US")}`,
      `Revenue:     ${sym}${result.revenue.toLocaleString("en-US")}`,
      `Profit:      ${result.profitFormatted}`,
      `ROI:         ${result.roiFormatted}`,
      `Status:      ${result.statusLabel}`,
      `Performance: ${result.performanceLabel}`,
      ``, result.interpretation,
      ``, `Generated by Productive Toolbox`,
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `roi_${result.investment}_${result.revenue}.txt`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const csv = [
      "Investment,Revenue,Profit,ROI,Status,Performance",
      `${result.investment},${result.revenue},${result.profit},${result.roiFormatted},${result.statusLabel},${result.performanceLabel}`,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `roi_${result.investment}_${result.revenue}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleShare = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildShareUrl(result.investment, result.revenue, result.currency));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ investment: result.investment, revenue: result.revenue, currency: result.currency, result });
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInvestment(String(entry.investment));
    setRevenue(String(entry.revenue));
    setCurrency(entry.currency);
    setShowHistory(false);
  };

  const perfStyle = result ? PERF_STYLES[result.performanceLevel] : null;
  const statusStyle = result ? STATUS_STYLES[result.status] : null;
  const sym = CURRENCIES[currency]?.symbol ?? "$";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">💰</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Marketing ROI Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter your investment and revenue to instantly calculate ROI. All calculations run locally in your browser — no data is sent anywhere.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Controls */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Campaign Data</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-investment">
                  Investment Amount ({sym})
                </label>
                <input
                  ref={investmentRef} id="roi-investment" type="number" min="0"
                  value={investment} onChange={(e) => setInvestment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run(investment, revenue, currency, decimalPlaces)}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${investmentError ? "border-red-300" : "border-gray-200"}`}
                  placeholder="1000" aria-label="Investment amount" inputMode="decimal"
                />
                {investmentError && <p className="text-xs text-red-600 mt-1" role="alert">{investmentError}</p>}
                <p className="text-xs text-gray-400 mt-1">Total cost of the campaign or project</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-revenue">
                  Revenue Generated ({sym})
                </label>
                <input
                  id="roi-revenue" type="number" min="0"
                  value={revenue} onChange={(e) => setRevenue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run(investment, revenue, currency, decimalPlaces)}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${revenueError ? "border-red-300" : "border-gray-200"}`}
                  placeholder="1500" aria-label="Revenue generated" inputMode="decimal"
                />
                {revenueError && <p className="text-xs text-red-600 mt-1" role="alert">{revenueError}</p>}
                <p className="text-xs text-gray-400 mt-1">Total revenue or return from the investment</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-currency">Currency</label>
                <select id="roi-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {Object.entries(CURRENCIES).map(([code, { label }]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-decimal">Decimal Places</label>
                <select id="roi-decimal" value={decimalPlaces} onChange={(e) => setDecimalPlaces(Number(e.target.value))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {[0, 1, 2, 3, 4].map((d) => <option key={d} value={d}>{d} decimal{d !== 1 ? "s" : ""}</option>)}
                </select>
              </div>

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to recalculate</p>

              <div className="space-y-2 pt-1">
                <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export TXT</button>
                  <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                </div>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Result</p>
              {result ? (
                <>
                  <div className={`text-4xl font-bold font-mono mb-1 tabular-nums ${result.roi < 0 ? "text-red-300" : ""}`}>{result.roiFormatted}</div>
                  <div className="flex flex-wrap gap-2 mb-3 mt-2">
                    {statusStyle && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {result.statusLabel}
                      </span>
                    )}
                    {perfStyle && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${perfStyle.bg} ${perfStyle.text} ${perfStyle.border} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${perfStyle.dot}`} />
                        {result.performanceLabel}
                      </span>
                    )}
                  </div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Investment</span>
                      <span className="font-semibold font-mono">{formatCurrency(result.investment, result.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Revenue</span>
                      <span className="font-semibold font-mono">{formatCurrency(result.revenue, result.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Profit</span>
                      <span className={`font-semibold font-mono ${result.profit < 0 ? "text-red-300" : result.profit > 0 ? "text-green-300" : ""}`}>{result.profitFormatted}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy ROI"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopyFull} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy All</button>
                      <button onClick={handleShare} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                    </div>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">Save to History</button>
                  </div>
                </>
              ) : (
                <div className="text-primary-100 text-sm">
                  {investmentError || revenueError ? "Fix the errors above to calculate" : "Enter investment and revenue to calculate"}
                </div>
              )}
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8 space-y-5">

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Quick Examples</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = investment === String(p.investment) && revenue === String(p.revenue);
                  return (
                    <button key={p.label} onClick={() => handlePreset(p)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Profit/Loss Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Investment vs Revenue</h3>
                <div className="space-y-3">
                  {[
                    { label: "Investment", value: result.investment, color: "bg-gray-300", max: Math.max(result.investment, result.revenue) },
                    { label: "Revenue", value: result.revenue, color: result.revenue >= result.investment ? "bg-primary" : "bg-red-400", max: Math.max(result.investment, result.revenue) },
                  ].map(({ label, value, color, max }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{label}</span>
                        <span className="font-semibold font-mono">{formatCurrency(value, currency)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full transition-all duration-500 ${color}`}
                          style={{ width: `${max > 0 ? Math.min((value / max) * 100, 100) : 0}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                {perfStyle && result && (
                  <div className={`mt-4 rounded-lg p-3 border ${perfStyle.bg} ${perfStyle.border}`}>
                    <p className={`text-xs font-semibold mb-1 ${perfStyle.text}`}>Interpretation</p>
                    <p className={`text-sm ${perfStyle.text}`}>{result.interpretation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Calculation Breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation Breakdown</h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Investment", value: formatCurrency(result.investment, result.currency) },
                    { label: "Revenue", value: formatCurrency(result.revenue, result.currency) },
                    { label: "Profit / Loss", value: result.profitFormatted, colored: true },
                    { label: "Formula", value: result.formula },
                    { label: "ROI", value: result.roiFormatted, highlight: true },
                    { label: "Status", value: result.statusLabel },
                  ].map(({ label, value, highlight, colored }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className={`text-sm font-semibold font-mono ${highlight ? "text-primary text-base" : colored && result.profit < 0 ? "text-red-600" : colored && result.profit > 0 ? "text-green-600" : "text-gray-900"}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {investmentError || revenueError ? investmentError || revenueError : "Enter values above to see the breakdown"}
                </div>
              )}
            </div>

            {/* Performance Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Reference</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { level: "exceptional", label: "Exceptional", range: "≥ 200%", desc: "3x or more return" },
                  { level: "excellent",   label: "Excellent",   range: "100% – 199%", desc: "Investment more than doubled" },
                  { level: "good",        label: "Good",        range: "50% – 99%",  desc: "Strong above-average return" },
                  { level: "average",     label: "Average",     range: "20% – 49%",  desc: "Solid, typical marketing ROI" },
                  { level: "low",         label: "Low",         range: "1% – 19%",   desc: "Positive but room to improve" },
                  { level: "loss",        label: "Loss",        range: "< 0%",       desc: "Costs exceeded revenue" },
                ] as { level: ROIResult["performanceLevel"]; label: string; range: string; desc: string }[]).map(({ level, label, range, desc }) => {
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
                * ROI above 20% is generally considered good, though benchmarks vary significantly by industry and channel.
              </p>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => loadFromHistory(entry)} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          {formatCurrency(entry.investment, entry.currency)} → {formatCurrency(entry.revenue, entry.currency)}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        ROI: {entry.result.roiFormatted} · {entry.result.statusLabel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ROICalculatorMarketingSEO />

      <RelatedTools
        currentTool="roi-calculator-marketing"
        tools={[
          "ctr-calculator",
          "conversion-rate-calculator",
          "bounce-rate-calculator",
          "investment-return-calculator",
          "simple-interest-calculator",
          "compound-interest-calculator",
        ]}
      />
    </>
  );
}
