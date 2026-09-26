"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateFrequency, validateInputs, getWarning, debounce, parseNum,
  formatFull,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareSummary,
  drawSummaryCanvas,
  DEFAULT_INPUTS,
  type FrequencyInputs, type FrequencyResult, type HistoryEntry,
} from "./logic";
import AdFrequencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4];

const BENCHMARK_ROWS: { range: string; label: string; dot: string }[] = [
  { range: "< 1.5",     label: "Very Low",  dot: "bg-slate-400"  },
  { range: "1.5 – 2.5", label: "Good",      dot: "bg-blue-500"   },
  { range: "2.5 – 4",   label: "Healthy",   dot: "bg-green-500"  },
  { range: "4 – 6",     label: "High",      dot: "bg-orange-500" },
  { range: "> 6",       label: "Very High", dot: "bg-red-500"    },
];

export default function AdFrequencyCalculatorUI() {
  const [inputs, setInputs]         = useState<FrequencyInputs>(DEFAULT_INPUTS);
  const [result, setResult]         = useState<FrequencyResult | null>(null);
  const [errors, setErrors]         = useState<Record<string, string | null>>({});
  const [copied, setCopied]         = useState(false);
  const [shared, setShared]         = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]       = useState<HistoryEntry[]>([]);
  const impressionsRef              = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); impressionsRef.current?.focus(); }, []);

  const run = useCallback(
    debounce((inp: FrequencyInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculateFrequency(inp));
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof FrequencyInputs>(field: K, val: FrequencyInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const warning = getWarning(inputs);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    impressionsRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `ad-frequency-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `ad-frequency-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadPng = () => {
    if (!result) return;
    const canvas = drawSummaryCanvas(result, inputs);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = `ad-frequency-summary-${Date.now()}.png`; a.click(); URL.revokeObjectURL(a.href);
    });
  };

  const handlePrintPdf = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, inputs));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = async () => {
    if (!result) return;
    const text = buildShareSummary(result, inputs);
    if (navigator.share) {
      try { await navigator.share({ title: "Ad Frequency Calculator", text }); return; } catch { /* user cancelled */ }
    }
    navigator.clipboard.writeText(text);
    setShared(true); setTimeout(() => setShared(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const repeatViews = inputs.impressions > inputs.reach ? inputs.impressions - inputs.reach : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Formula card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Formula</p>
          <p className="font-mono text-sm text-gray-900">Frequency = Impressions ÷ Reach</p>
          <p className="text-xs text-gray-400 mt-2">The average number of times each unique person has seen your advertisement.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Campaign Data</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="afc-impressions">Total Impressions</label>
                <input
                  ref={impressionsRef}
                  id="afc-impressions" type="number" min="0" inputMode="numeric"
                  value={inputs.impressions || ""}
                  onChange={(e) => set("impressions", parseNum(e.target.value))}
                  placeholder="10000"
                  aria-invalid={!!errors.impressions}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.impressions ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.impressions && <p className="text-xs text-red-600 mt-1" role="alert">{errors.impressions}</p>}
                {!errors.impressions && <p className="text-xs text-gray-400 mt-1">Total times your ad was shown.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="afc-reach">Total Reach</label>
                <input
                  id="afc-reach" type="number" min="0" inputMode="numeric"
                  value={inputs.reach || ""}
                  onChange={(e) => set("reach", parseNum(e.target.value))}
                  placeholder="2500"
                  aria-invalid={!!errors.reach}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.reach ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.reach && <p className="text-xs text-red-600 mt-1" role="alert">{errors.reach}</p>}
                {!errors.reach && <p className="text-xs text-gray-400 mt-1">Unique users who saw your advertisement.</p>}
              </div>

              {warning && !errors.impressions && !errors.reach && (
                <p className="text-xs text-orange-600 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2" role="alert">{warning}</p>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="afc-precision">Decimal Places</label>
                <select
                  id="afc-precision"
                  value={inputs.decimalPlaces}
                  onChange={(e) => set("decimalPlaces", parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                >
                  {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p} decimal{p === 1 ? "" : "s"}</option>)}
                </select>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopy} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleDownloadCSV} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                  <button onClick={handleDownloadJSON} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export JSON</button>
                  <button onClick={handleDownloadPng} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Download PNG</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handlePrintPdf} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print / PDF</button>
                  <button onClick={handleShare} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {shared ? "✓ Shared!" : "Share"}
                  </button>
                </div>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Ad Frequency — Result
              </p>
              {result ? (
                <>
                  <div className="mb-3">
                    <p className="text-primary-100 text-xs mb-0.5">Frequency</p>
                    <p className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{result.frequency.toFixed(inputs.decimalPlaces)}</p>
                    <p className="text-primary-100 text-xs mt-1">
                      On average, each person saw your advertisement {result.frequency.toFixed(inputs.decimalPlaces)} times.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${result.meta.bg} ${result.meta.color} border-transparent`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${result.meta.dot}`} />
                      {result.meta.label}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                      Save to History
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter impressions and reach above to calculate frequency.</p>
              )}
            </div>

            {/* Explanation + Recommendation panel */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${result.meta.dot}`} />
                  <p className="text-sm text-gray-600 leading-relaxed">{result.meta.explanation}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>Recommendation</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{result.meta.recommendation}</p>
                </div>
              </div>
            )}

            {/* Metric cards grid */}
            {result && (
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs text-gray-500 mb-1">Impressions</p>
                  <p className="text-xl font-bold font-mono text-primary tabular-nums">{formatFull(inputs.impressions)}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs text-gray-500 mb-1">Reach</p>
                  <p className="text-xl font-bold font-mono text-primary tabular-nums">{formatFull(inputs.reach)}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs text-gray-500 mb-1">Repeat Views</p>
                  <p className="text-xl font-bold font-mono text-primary tabular-nums">{formatFull(repeatViews)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Beyond first exposure</p>
                </div>
              </div>
            )}

            {/* Benchmark reference table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Frequency Benchmark Reference</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {BENCHMARK_ROWS.map((row) => (
                  <div key={row.label} className="flex items-center gap-3 px-5 py-3">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`} />
                    <span className="text-sm font-medium flex-1 text-gray-700">{row.label}</span>
                    <span className="text-xs font-mono font-medium text-gray-700">{row.range}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">* General guidance for awareness and consideration campaigns. Ideal frequency varies by objective, creative, and campaign length.</p>
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
                          {formatFull(entry.inputs.impressions)} impressions / {formatFull(entry.inputs.reach)} reach
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        Frequency: {entry.result.frequency.toFixed(entry.inputs.decimalPlaces)} · {entry.result.meta.label}
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
      <AdFrequencyCalculatorSEO />

      <RelatedTools />
    </>
  );
}
