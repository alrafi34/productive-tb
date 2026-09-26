"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateCPM, validateInputs, debounce, parseNum,
  formatNumber, formatMoney, getSymbol,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  MODE_META, MODE_ORDER, CURRENCIES, CURRENCY_ORDER, DEFAULT_INPUTS,
  type Mode, type CPMInputs, type CPMResult, type HistoryEntry,
} from "./logic";
import CPMCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4];

const PRESETS: { label: string; cost: number; impressions: number }[] = [
  { label: "Google Ads",   cost: 250,  impressions: 50000  },
  { label: "Meta Ads",     cost: 400,  impressions: 100000 },
  { label: "TikTok Ads",   cost: 600,  impressions: 120000 },
  { label: "LinkedIn Ads", cost: 850,  impressions: 42500  },
  { label: "YouTube Ads",  cost: 960,  impressions: 120000 },
];

export default function CPMCalculatorUI() {
  const [inputs, setInputs]         = useState<CPMInputs>(DEFAULT_INPUTS);
  const [result, setResult]         = useState<CPMResult | null>(null);
  const [errors, setErrors]         = useState<Record<string, string | null>>({});
  const [copied, setCopied]         = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]       = useState<HistoryEntry[]>([]);
  const costRef        = useRef<HTMLInputElement>(null);
  const impressionsRef = useRef<HTMLInputElement>(null);
  const cpmRef          = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else costRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: CPMInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculateCPM(inp));
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleReset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof CPMInputs>(field: K, val: CPMInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleModeChange = (mode: Mode) => setInputs((p) => ({ ...p, mode }));

  const handleSwapMode = () => {
    const idx = MODE_ORDER.indexOf(inputs.mode);
    handleModeChange(MODE_ORDER[(idx + 1) % MODE_ORDER.length]);
  };

  const handleEnter = () => {
    const errs = validateInputs(inputs);
    if (errs.cost) { costRef.current?.focus(); return; }
    if (errs.impressions) { impressionsRef.current?.focus(); return; }
    if (errs.cpm) { cpmRef.current?.focus(); return; }
    run(inputs);
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, mode: "cpm", cost: p.cost, impressions: p.impressions }));
    costRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    costRef.current?.focus();
  };

  const handleCopyResult = () => {
    if (!result) return;
    const value =
      inputs.mode === "cpm" ? formatMoney(result.cpm, inputs.currency, inputs.customSymbol, inputs.decimalPlaces) :
      inputs.mode === "cost" ? formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces) :
      formatNumber(result.impressions);
    navigator.clipboard.writeText(value);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, inputs)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `cpm-${Date.now()}.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `cpm-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
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
    navigator.clipboard.writeText(buildShareUrl(inputs));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const meta = MODE_META[inputs.mode];
  const sym = getSymbol(inputs.currency, inputs.customSymbol);

  const primaryValue = !result ? null :
    inputs.mode === "cpm" ? formatMoney(result.cpm, inputs.currency, inputs.customSymbol, inputs.decimalPlaces) :
    inputs.mode === "cost" ? formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces) :
    formatNumber(result.impressions);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Calculation mode selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</p>
            <button type="button" onClick={handleSwapMode} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-medium transition-colors">
              ⇄ Swap
            </button>
          </div>
          <select
            id="cpm-mode"
            value={inputs.mode}
            onChange={(e) => handleModeChange(e.target.value as Mode)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
          >
            {MODE_ORDER.map((m) => <option key={m} value={m}>{MODE_META[m].label}</option>)}
          </select>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">{meta.hint}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Campaign Data</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cpm-currency">Currency</label>
                <select id="cpm-currency" value={inputs.currency} onChange={(e) => set("currency", e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {CURRENCY_ORDER.map((code) => <option key={code} value={code}>{CURRENCIES[code].label}</option>)}
                </select>
              </div>

              {inputs.currency === "CUSTOM" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cpm-custom-symbol">Custom Symbol</label>
                  <input id="cpm-custom-symbol" type="text" maxLength={4} value={inputs.customSymbol}
                    onChange={(e) => set("customSymbol", e.target.value)}
                    placeholder="$"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cpm-cost">
                  Advertising Cost ({sym}) {inputs.mode === "cost" && <span className="text-primary text-xs font-normal">— calculated</span>}
                </label>
                <input
                  ref={costRef}
                  id="cpm-cost" type="number" min="0" inputMode="decimal"
                  value={inputs.mode === "cost" ? (result ? result.cost : "") : (inputs.cost || "")}
                  onChange={(e) => set("cost", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  readOnly={inputs.mode === "cost"}
                  placeholder="250"
                  aria-invalid={!!errors.cost}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.cost ? "border-red-300" : "border-gray-200"} ${inputs.mode === "cost" ? "bg-gray-50 text-gray-500 font-mono" : ""}`}
                />
                {errors.cost && <p className="text-xs text-red-600 mt-1" role="alert">{errors.cost}</p>}
                {!errors.cost && <p className="text-xs text-gray-400 mt-1">The total amount spent on advertising.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cpm-impressions">
                  Impressions {inputs.mode === "impressions" && <span className="text-primary text-xs font-normal">— calculated</span>}
                </label>
                <input
                  ref={impressionsRef}
                  id="cpm-impressions" type="number" min="0" inputMode="numeric"
                  value={inputs.mode === "impressions" ? (result ? result.impressions : "") : (inputs.impressions || "")}
                  onChange={(e) => set("impressions", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  readOnly={inputs.mode === "impressions"}
                  placeholder="50000"
                  aria-invalid={!!errors.impressions}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.impressions ? "border-red-300" : "border-gray-200"} ${inputs.mode === "impressions" ? "bg-gray-50 text-gray-500 font-mono" : ""}`}
                />
                {errors.impressions && <p className="text-xs text-red-600 mt-1" role="alert">{errors.impressions}</p>}
                {!errors.impressions && <p className="text-xs text-gray-400 mt-1">How many times your ad was displayed.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cpm-cpm">
                  CPM ({sym}) {inputs.mode === "cpm" && <span className="text-primary text-xs font-normal">— calculated</span>}
                </label>
                <input
                  ref={cpmRef}
                  id="cpm-cpm" type="number" min="0" inputMode="decimal"
                  value={inputs.mode === "cpm" ? (result ? result.cpm : "") : (inputs.cpm || "")}
                  onChange={(e) => set("cpm", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  readOnly={inputs.mode === "cpm"}
                  placeholder="5"
                  aria-invalid={!!errors.cpm}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.cpm ? "border-red-300" : "border-gray-200"} ${inputs.mode === "cpm" ? "bg-gray-50 text-gray-500 font-mono" : ""}`}
                />
                {errors.cpm && <p className="text-xs text-red-600 mt-1" role="alert">{errors.cpm}</p>}
                {!errors.cpm && <p className="text-xs text-gray-400 mt-1">Cost per 1,000 impressions.</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="cpm-precision">Decimal Precision</label>
                <select id="cpm-precision" value={inputs.decimalPlaces} onChange={(e) => set("decimalPlaces", parseInt(e.target.value, 10))}
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
                  <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export TXT</button>
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
                {meta.short} — Result
              </p>
              {result ? (
                <>
                  <div className="text-4xl font-bold font-mono mb-1 tabular-nums transition-all duration-300">{primaryValue}</div>
                  <div className="text-sm text-primary-100 mb-3">{meta.label}</div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Advertising Cost</span>
                      <span className="font-semibold font-mono">{formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Impressions</span>
                      <span className="font-semibold font-mono">{formatNumber(result.impressions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">CPM</span>
                      <span className="font-semibold font-mono">{formatMoney(result.cpm, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</span>
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
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter the values on the left to calculate."}
                </p>
              )}
            </div>

            {/* Formula & breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Formula &amp; Calculation Breakdown</h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Formula", value: result.formula },
                    { label: "Calculation", value: result.breakdown },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-5 py-3">
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className="text-sm font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Enter values on the left to see the calculation breakdown</div>
              )}
            </div>

            {/* Quick examples */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Quick Examples</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = inputs.mode === "cpm" && inputs.cost === p.cost && inputs.impressions === p.impressions;
                  return (
                    <button key={p.label} onClick={() => handlePreset(p)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Glossary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Advertising Metric Glossary</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["CPM", "Cost Per Mille (thousand) — the price advertisers pay for every 1,000 ad impressions delivered."],
                  ["Impressions", "The total number of times an ad was displayed, regardless of whether it was clicked or how many unique people saw it."],
                  ["Advertising Cost", "The total amount spent to run a campaign or ad set over a given period."],
                  ["eCPM", "Effective CPM — the CPM equivalent of a campaign priced by a different model (like CPC), calculated as (Revenue ÷ Impressions) × 1000."],
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
                        <span className="text-sm font-semibold text-gray-900">
                          {MODE_META[entry.inputs.mode].short} — {formatMoney(entry.result.cpm, entry.inputs.currency, entry.inputs.customSymbol, entry.inputs.decimalPlaces)} CPM
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        Cost: {formatMoney(entry.result.cost, entry.inputs.currency, entry.inputs.customSymbol, entry.inputs.decimalPlaces)} · Impressions: {formatNumber(entry.result.impressions)}
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
      <CPMCalculatorSEO />

      <RelatedTools />
    </>
  );
}
