"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateROI, validateInputs, debounce, parseNum,
  formatMoney, getSymbol,
  saveHistory, getHistory, clearHistory, toggleFavorite, deleteHistoryEntry,
  saveInputs, loadInputs,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  CURRENCIES, CURRENCY_ORDER, PRESETS, DEFAULT_INPUTS,
  type ROIInputs, type ROIResult, type HistoryEntry,
} from "./logic";
import { ROIGauge, ROIBarChart, exportCanvasAsPng } from "./chart";
import MarketingROICalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4];

const BADGE_STYLES: Record<string, string> = {
  Excellent: "bg-green-50 text-green-700 border-green-200",
  Good: "bg-blue-50 text-blue-700 border-blue-200",
  Average: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Poor: "bg-amber-50 text-amber-700 border-amber-200",
  Loss: "bg-red-50 text-red-700 border-red-200",
};

export default function MarketingROICalculatorUI() {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<ROIResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const costRef = useRef<HTMLInputElement>(null);
  const chartWrapRef = useRef<HTMLDivElement>(null);
  const runRef = useRef(debounce((inp: ROIInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculateROI(inp));
  }, 150));
  const persistRef = useRef(debounce((inp: ROIInputs) => saveInputs(inp), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setInputs((p) => ({ ...p, ...shared }));
    } else {
      const saved = loadInputs();
      if (saved) setInputs(saved);
      else costRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(inputs); }, [inputs]);
  useEffect(() => { persistRef.current(inputs); }, [inputs]);

  const set = <K extends keyof ROIInputs>(field: K, val: ROIInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    costRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = () => {
    const errs = validateInputs(inputs);
    if (errs.marketingCost) { costRef.current?.focus(); return; }
    runRef.current(inputs);
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, campaignName: p.label, marketingCost: p.cost, revenue: p.revenue }));
    costRef.current?.focus();
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(`ROI: ${result.roi}% · Net Profit: ${formatMoney(result.profit, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)} · Status: ${result.status}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `marketing-roi-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `marketing-roi-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadPng = () => exportCanvasAsPng(chartWrapRef.current, `marketing-roi-chart-${Date.now()}.png`);

  const handlePrint = () => {
    if (!result) return;
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
    if (!result) return;
    saveHistory({ inputs, result });
    setHistory(getHistory());
  };

  const handleToggleFavorite = (id: string) => { toggleFavorite(id); setHistory(getHistory()); };
  const handleDeleteEntry = (id: string) => { deleteHistoryEntry(id); setHistory(getHistory()); setCompareIds((c) => c.filter((x) => x !== id)); };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const sym = getSymbol(inputs.currency, inputs.customSymbol);
  const visibleHistory = favoritesOnly ? history.filter((h) => h.favorite) : history;
  const compareEntries = history.filter((h) => compareIds.includes(h.id));
  const compareRows = [
    ...(result ? [{ id: "current", name: inputs.campaignName || "Current Campaign", inputs, result }] : []),
    ...compareEntries.map((e) => ({ id: e.id, name: e.inputs.campaignName || "Untitled Campaign", inputs: e.inputs, result: e.result })),
  ].sort((a, b) => b.result.roi - a.result.roi);
  const maxCompareRoi = Math.max(...compareRows.map((r) => Math.abs(r.result.roi)), 1);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Quick presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Quick Examples</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = inputs.campaignName === p.label && inputs.marketingCost === p.cost && inputs.revenue === p.revenue;
              return (
                <button key={p.label} onClick={() => handlePreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>
                  {p.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-2 font-mono">ROI (%) = ((Revenue − Marketing Cost) ÷ Marketing Cost) × 100</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Campaign Data</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-name">Campaign Name (Optional)</label>
                <input id="roi-name" type="text" maxLength={80} value={inputs.campaignName}
                  onChange={(e) => set("campaignName", e.target.value)}
                  placeholder="Google Ads - Summer Sale"
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-currency">Currency</label>
                <select id="roi-currency" value={inputs.currency} onChange={(e) => set("currency", e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {CURRENCY_ORDER.map((code) => <option key={code} value={code}>{CURRENCIES[code].label}</option>)}
                </select>
              </div>

              {inputs.currency === "CUSTOM" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-custom-symbol">Custom Symbol</label>
                  <input id="roi-custom-symbol" type="text" maxLength={4} value={inputs.customSymbol}
                    onChange={(e) => set("customSymbol", e.target.value)}
                    placeholder="$"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-cost" title="Total amount spent on the marketing campaign">
                  Marketing Cost ({sym})
                </label>
                <input
                  ref={costRef}
                  id="roi-cost" type="number" min="0" inputMode="decimal"
                  value={inputs.marketingCost || ""}
                  onChange={(e) => set("marketingCost", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="1000"
                  aria-invalid={!!errors.marketingCost}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.marketingCost ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.marketingCost ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.marketingCost}</p> : <p className="text-xs text-gray-400 mt-1">Total amount spent on the campaign.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="roi-revenue" title="Total revenue generated by the campaign">
                  Revenue Generated ({sym})
                </label>
                <input
                  id="roi-revenue" type="number" min="0" inputMode="decimal"
                  value={inputs.revenue || ""}
                  onChange={(e) => set("revenue", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="4500"
                  aria-invalid={!!errors.revenue}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.revenue ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.revenue ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.revenue}</p> : <p className="text-xs text-gray-400 mt-1">Total revenue attributed to this campaign.</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="roi-precision">Decimal Precision</label>
                <select id="roi-precision" value={inputs.decimalPlaces} onChange={(e) => set("decimalPlaces", parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p} decimal{p === 1 ? "" : "s"}</option>)}
                </select>
              </div>

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to jump to results, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopyResult} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy Result"}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                  <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export JSON</button>
                  <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleShare} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                  <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                    {showHistory ? "Hide" : "Show"} History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {inputs.campaignName || "Campaign"} — ROI Result
              </p>
              {result ? (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <ROIGauge performanceScore={result.performanceScore} roi={result.roi} color="#ffffff" />
                    <div className="flex-1 w-full">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-primary-100 text-xs mb-0.5">Net Profit</p>
                          <p className="text-2xl font-bold font-mono tabular-nums transition-all duration-300">{formatMoney(result.profit, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</p>
                        </div>
                        <div>
                          <p className="text-primary-100 text-xs mb-0.5">Profit Ratio</p>
                          <p className="text-2xl font-bold font-mono tabular-nums transition-all duration-300">{result.ratio}×</p>
                        </div>
                      </div>
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 border border-white/30">
                        {result.status} · {result.badge}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/20 mt-4 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Marketing Cost</span>
                      <span className="font-semibold font-mono">{formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Revenue Generated</span>
                      <span className="font-semibold font-mono">{formatMoney(result.revenue, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Result"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopyFull} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Full Report</button>
                      <button onClick={handleSave} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter marketing cost and revenue to calculate ROI."}
                </p>
              )}
            </div>

            {/* Bar chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Cost vs. Revenue vs. Profit</h3>
                  <button onClick={handleDownloadPng} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download PNG</button>
                </div>
                <div ref={chartWrapRef}>
                  <ROIBarChart cost={result.cost} revenue={result.revenue} profit={result.profit} symbol={sym} />
                </div>
              </div>
            )}

            {/* Compare campaigns */}
            {compareRows.length > 1 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Campaign Comparison</h3>
                  <button onClick={() => setCompareIds([])} className="text-xs text-gray-500 hover:text-gray-700 font-medium">Clear</button>
                </div>
                <div className="p-5 space-y-3">
                  {compareRows.map((row) => (
                    <div key={row.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium truncate">{row.name} {row.id === "current" && <span className="text-xs text-primary">(current)</span>}</span>
                        <span className="text-sm font-mono font-semibold" style={{ color: row.result.color }}>{row.result.roi >= 0 ? "+" : ""}{row.result.roi}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (Math.abs(row.result.roi) / maxCompareRoi) * 100)}%`, backgroundColor: row.result.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Glossary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Marketing ROI Glossary</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["ROI", "Return on Investment — the percentage return earned relative to the marketing cost, calculated as (Profit ÷ Cost) × 100."],
                  ["Net Profit", "Revenue generated minus the marketing cost — the actual dollar amount gained (or lost) from the campaign."],
                  ["Profit Ratio", "Revenue divided by cost, expressed as a multiplier (e.g. 3.5×) — shows how many dollars came back for every dollar spent."],
                  ["Break-Even", "The point where revenue exactly equals marketing cost, resulting in 0% ROI and zero net profit."],
                ].map(([term, def]) => (
                  <div key={term} className="px-5 py-3">
                    <p className="text-sm font-semibold text-gray-800">{term}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{def}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Campaign History</h3>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input type="checkbox" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} className="accent-primary" />
                      Favorites only
                    </label>
                    {history.length > 0 && (
                      <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); setCompareIds([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                    )}
                  </div>
                </div>
                <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                  {visibleHistory.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved campaigns yet</div>
                  ) : visibleHistory.map((entry) => (
                    <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <button onClick={() => { setInputs(entry.inputs); setShowHistory(false); }} className="text-left flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-semibold text-gray-900 truncate">{entry.inputs.campaignName || "Untitled Campaign"}</span>
                            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full border ${BADGE_STYLES[entry.result.badge]}`}>
                              {entry.result.roi >= 0 ? "+" : ""}{entry.result.roi}% · {entry.result.badge}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {formatMoney(entry.result.cost, entry.inputs.currency, entry.inputs.customSymbol, entry.inputs.decimalPlaces)} → {formatMoney(entry.result.revenue, entry.inputs.currency, entry.inputs.customSymbol, entry.inputs.decimalPlaces)} · {new Date(entry.timestamp).toLocaleDateString("en-US")}
                          </div>
                        </button>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button onClick={() => handleToggleFavorite(entry.id)} aria-label="Toggle favorite" className={`text-lg leading-none ${entry.favorite ? "text-amber-400" : "text-gray-300 hover:text-gray-400"}`}>
                            {entry.favorite ? "★" : "☆"}
                          </button>
                          <button onClick={() => toggleCompare(entry.id)}
                            className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-colors ${compareIds.includes(entry.id) ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                            {compareIds.includes(entry.id) ? "Comparing" : "Compare"}
                          </button>
                          <button onClick={() => handleDeleteEntry(entry.id)} aria-label="Delete entry" className="text-gray-300 hover:text-red-500 text-sm px-1">✕</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <MarketingROICalculatorSEO />

      <RelatedTools />
    </>
  );
}
