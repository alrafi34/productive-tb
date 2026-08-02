"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateTransferCost, validateInputs, debounce, parseNum, formatBytes, formatMoney,
  buildShareUrl, parseShareParams, saveHistory, getHistory, clearHistory, saveInputs, loadInputs,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  DATA_UNIT_LABELS, DATA_UNIT_ORDER, PRICE_UNIT_LABELS, PRICE_UNIT_ORDER,
  BILLING_META, BILLING_ORDER, CURRENCY_SYMBOLS, CURRENCY_ORDER,
  DEFAULT_INPUTS, PRESETS,
  type TransferInputs, type TransferResult, type HistoryEntry,
  type DataUnit, type PriceUnit, type BillingPeriod, type CurrencyKey, type ConversionStandard,
} from "./logic";
import CostBarChart from "./chart";
import DataTransferCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DataTransferCostCalculatorUI() {
  const [inputs, setInputs] = useState<TransferInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<TransferResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  const runRef = useRef(debounce((inp: TransferInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculateTransferCost(inp));
  }, 150));
  const persistRef = useRef(debounce((inp: TransferInputs) => saveInputs(inp), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setInputs((p) => ({ ...p, ...shared }));
    } else {
      const saved = loadInputs();
      if (saved) setInputs(saved);
      else firstRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(inputs); }, [inputs]);
  useEffect(() => { persistRef.current(inputs); }, [inputs]);

  const set = <K extends keyof TransferInputs>(field: K, val: TransferInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    firstRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, ...p.inputs }));
    firstRef.current?.focus();
  };

  const symbol = CURRENCY_SYMBOLS[inputs.currency];

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${symbol}${formatMoney(result.periodCost)}`);
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
    a.download = `data-transfer-cost-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `data-transfer-cost-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

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
    if (!result) return;
    navigator.clipboard.writeText(buildShareUrl(inputs));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result });
    setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Quick presets:</span>
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 font-mono">Total Cost = Normalized Data Size × Normalized Unit Price</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Transfer Details</h3>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dtc-size">Data Size</label>
                  <input ref={firstRef} id="dtc-size" type="number" min="0" step="any" inputMode="decimal"
                    value={inputs.dataSize || ""} onChange={(e) => set("dataSize", parseNum(e.target.value))}
                    placeholder="500" aria-invalid={!!errors.dataSize}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.dataSize ? "border-red-300" : "border-gray-200"}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dtc-unit">Unit</label>
                  <select id="dtc-unit" value={inputs.dataUnit} onChange={(e) => set("dataUnit", e.target.value as DataUnit)}
                    className="w-full px-2 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {DATA_UNIT_ORDER.map((u) => <option key={u} value={u}>{DATA_UNIT_LABELS[u]}</option>)}
                  </select>
                </div>
              </div>
              {errors.dataSize && <p className="text-xs text-red-600" role="alert">{errors.dataSize}</p>}

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dtc-price">Transfer Price</label>
                  <input id="dtc-price" type="number" min="0" step="0.0001" inputMode="decimal"
                    value={inputs.price} onChange={(e) => set("price", parseNum(e.target.value))}
                    placeholder="0.09" aria-invalid={!!errors.price}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.price ? "border-red-300" : "border-gray-200"}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dtc-priceunit">Price Unit</label>
                  <select id="dtc-priceunit" value={inputs.priceUnit} onChange={(e) => set("priceUnit", e.target.value as PriceUnit)}
                    className="w-full px-2 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {PRICE_UNIT_ORDER.map((u) => <option key={u} value={u}>{PRICE_UNIT_LABELS[u]}</option>)}
                  </select>
                </div>
              </div>
              {errors.price && <p className="text-xs text-red-600" role="alert">{errors.price}</p>}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dtc-billing">Billing Period</label>
                  <select id="dtc-billing" value={inputs.billingPeriod} onChange={(e) => set("billingPeriod", e.target.value as BillingPeriod)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {BILLING_ORDER.map((b) => <option key={b} value={b}>{BILLING_META[b].label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dtc-currency">Currency</label>
                  <select id="dtc-currency" value={inputs.currency} onChange={(e) => set("currency", e.target.value as CurrencyKey)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {CURRENCY_ORDER.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dtc-count">Transfer Count <span className="text-xs text-gray-400 font-normal">(per billing period)</span></label>
                <input id="dtc-count" type="number" min="1" inputMode="numeric"
                  value={inputs.transferCount || ""} onChange={(e) => set("transferCount", parseNum(e.target.value))}
                  placeholder="1" aria-invalid={!!errors.transferCount}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.transferCount ? "border-red-300" : "border-gray-200"}`} />
                {errors.transferCount ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.transferCount}</p> : <p className="text-xs text-gray-400 mt-1">Used when performing multiple transfers per period, e.g. 120 requests/month.</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Conversion Standard</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["decimal", "binary"] as ConversionStandard[]).map((std) => (
                    <button key={std} type="button" onClick={() => set("standard", std)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                        inputs.standard === std ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}>
                      {std === "decimal" ? "Decimal (1 GB = 1000 MB)" : "Binary (1 GiB = 1024 MiB)"}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">MiB/GiB/TiB/PiB units are always 1024-based. This toggle only affects how MB/GB/TB/PB are interpreted.</p>
              </div>

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>

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
                  <button onClick={handleShare} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                  <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                    {showHistory ? "Hide" : "Show"} History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Estimated Cost</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl font-bold font-mono tabular-nums">{symbol}{formatMoney(result.periodCost)}</span>
                  </div>
                  <p className="text-primary-100 text-sm mb-4">
                    {inputs.dataSize.toLocaleString("en-US")} {DATA_UNIT_LABELS[inputs.dataUnit]} at {symbol}{inputs.price} {PRICE_UNIT_LABELS[inputs.priceUnit]}
                    {inputs.transferCount > 1 ? ` × ${inputs.transferCount} transfers` : ""}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">Normalized Size</p>
                      <p className="text-sm font-bold font-mono">{formatBytes(result.dataBytes, inputs.standard)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">Normalized Price</p>
                      <p className="text-sm font-bold font-mono">{symbol}{result.normalizedPricePerGB.toFixed(4)}/GB</p>
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
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter your transfer size and price to estimate cost."}
                </p>
              )}
            </div>

            {result && result.monthlyCost !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Monthly &amp; Yearly Projection</h3>
                </div>
                <div className="p-5">
                  <CostBarChart
                    symbol={symbol}
                    bars={[
                      { label: `Single Period (${BILLING_META[inputs.billingPeriod].label})`, value: result.periodCost },
                      { label: "Monthly Cost", value: result.monthlyCost ?? 0 },
                      { label: "Yearly Cost", value: result.yearlyCost ?? 0 },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Decimal vs Binary comparison */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Decimal vs. Binary Comparison</h3>
              </div>
              {result ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs text-gray-400">
                        <th className="text-left py-2 px-5 font-medium">Standard</th>
                        <th className="text-left py-2 px-5 font-medium">1 GB / TB equals</th>
                        <th className="text-right py-2 px-5 font-medium">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className={inputs.standard === "decimal" ? "bg-primary/5" : ""}>
                        <td className="py-2.5 px-5 font-medium text-gray-700">Decimal</td>
                        <td className="py-2.5 px-5 text-gray-500 text-xs font-mono">1000 MB / 1000 GB</td>
                        <td className="py-2.5 px-5 text-right font-mono font-semibold">{symbol}{formatMoney(result.decimalCost)}</td>
                      </tr>
                      <tr className={inputs.standard === "binary" ? "bg-primary/5" : ""}>
                        <td className="py-2.5 px-5 font-medium text-gray-700">Binary</td>
                        <td className="py-2.5 px-5 text-gray-500 text-xs font-mono">1024 MiB / 1024 GiB</td>
                        <td className="py-2.5 px-5 text-right font-mono font-semibold">{symbol}{formatMoney(result.binaryCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Enter values on the left to compare decimal vs. binary calculations</div>
              )}
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => { setInputs(entry.inputs); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{CURRENCY_SYMBOLS[entry.inputs.currency]}{formatMoney(entry.result.periodCost)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.inputs.dataSize} {DATA_UNIT_LABELS[entry.inputs.dataUnit]} · {BILLING_META[entry.inputs.billingPeriod].label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <DataTransferCostCalculatorSEO />

      <RelatedTools
        currentTool="data-transfer-cost-calculator"
        tools={[
          "storage-requirement-calculator",
          "cloud-cost-calculator",
          "download-time-calculator",
          "session-duration-calculator",
          "page-speed-score-calculator",
          "click-heatmap-density-calculator",
        ]}
      />
    </>
  );
}
