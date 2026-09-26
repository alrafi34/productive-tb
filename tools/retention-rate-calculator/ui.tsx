"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateRetention, validateInputs, debounce, parseNum,
  formatNumber, buildShareUrl, parseShareParams,
  saveHistory, getHistory, clearHistory, saveInputs, loadInputs,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  METRIC_META, METRIC_ORDER, PERIOD_META, PERIOD_ORDER, PRESETS, DEFAULT_INPUTS,
  type MetricType, type Period, type RetentionInputs, type RetentionResult, type HistoryEntry,
} from "./logic";
import RetentionGauge from "./chart";
import RetentionRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3];

const STATUS_STYLES: Record<string, string> = {
  Excellent: "bg-green-50 text-green-700 border-green-200",
  "Very Good": "bg-blue-50 text-blue-700 border-blue-200",
  Good: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Average: "bg-amber-50 text-amber-700 border-amber-200",
  "Needs Improvement": "bg-red-50 text-red-700 border-red-200",
};

export default function RetentionRateCalculatorUI() {
  const [inputs, setInputs] = useState<RetentionInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<RetentionResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const startRef = useRef<HTMLInputElement>(null);
  const runRef = useRef(debounce((inp: RetentionInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculateRetention(inp));
  }, 150));
  const persistRef = useRef(debounce((inp: RetentionInputs) => saveInputs(inp), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setInputs((p) => ({ ...p, ...shared }));
    } else {
      const saved = loadInputs();
      if (saved) setInputs(saved);
      else startRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(inputs); }, [inputs]);
  useEffect(() => { persistRef.current(inputs); }, [inputs]);

  const set = <K extends keyof RetentionInputs>(field: K, val: RetentionInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    startRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = () => {
    const errs = validateInputs(inputs);
    if (errs.startingUsers) { startRef.current?.focus(); return; }
    runRef.current(inputs);
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, ...p.inputs }));
    startRef.current?.focus();
  };

  const label = METRIC_META[inputs.metricType].label;

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.retentionRate}%`);
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
    a.download = `retention-rate-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `retention-rate-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
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

  const handleShare = async () => {
    if (!result) return;
    const url = buildShareUrl(inputs);
    const text = `${label} retention rate: ${result.retentionRate}% (${result.status})`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "Retention Rate Calculator", text, url }); return; } catch { /* user cancelled or unsupported — fall through to clipboard */ }
    }
    navigator.clipboard.writeText(url);
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

        {/* Metric + period settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="rrc-metric">What Are You Measuring?</label>
              <select id="rrc-metric" value={inputs.metricType} onChange={(e) => set("metricType", e.target.value as MetricType)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium">
                {METRIC_ORDER.map((m) => <option key={m} value={m}>{METRIC_META[m].label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="rrc-period">Period</label>
              <select id="rrc-period" value={inputs.period} onChange={(e) => set("period", e.target.value as Period)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium">
                {PERIOD_ORDER.map((p) => <option key={p} value={p}>{PERIOD_META[p].label}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-400">Quick presets:</span>
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 font-mono">Retention Rate (%) = ((Ending − New) ÷ Starting) × 100</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>{label} Data</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rrc-start" title={`Number of ${label.toLowerCase()} at the beginning of the period`}>
                  Starting {label}
                </label>
                <input
                  ref={startRef}
                  id="rrc-start" type="number" min="0" inputMode="numeric"
                  value={inputs.startingUsers || ""}
                  onChange={(e) => set("startingUsers", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="1000"
                  aria-invalid={!!errors.startingUsers}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.startingUsers ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.startingUsers ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.startingUsers}</p> : <p className="text-xs text-gray-400 mt-1">{`Number of ${label.toLowerCase()} at the start of the period.`}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rrc-end" title={`Total ${label.toLowerCase()} at the end of the period`}>
                  Ending {label}
                </label>
                <input
                  id="rrc-end" type="number" min="0" inputMode="numeric"
                  value={inputs.endingUsers || ""}
                  onChange={(e) => set("endingUsers", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="850"
                  aria-invalid={!!errors.endingUsers}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.endingUsers ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.endingUsers ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.endingUsers}</p> : <p className="text-xs text-gray-400 mt-1">{`Total ${label.toLowerCase()} at the end of the period.`}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rrc-new" title={`New ${label.toLowerCase()} acquired during this period`}>
                  New {label} Acquired
                </label>
                <input
                  id="rrc-new" type="number" min="0" inputMode="numeric"
                  value={inputs.newUsers || ""}
                  onChange={(e) => set("newUsers", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="150"
                  aria-invalid={!!errors.newUsers}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.newUsers ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.newUsers ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.newUsers}</p> : <p className="text-xs text-gray-400 mt-1">{`New ${label.toLowerCase()} acquired during this period.`}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="rrc-precision">Decimal Places</label>
                <select id="rrc-precision" value={inputs.decimalPlaces} onChange={(e) => set("decimalPlaces", parseInt(e.target.value, 10))}
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
                  <button onClick={handleShare} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{shareCopied ? "✓ Copied!" : "Share Result"}</button>
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
                {PERIOD_META[inputs.period].label} {label} Retention
              </p>
              {result ? (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <RetentionGauge rate={result.retentionRate} color="#ffffff" />
                    <div className="flex-1 w-full">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-primary-100 text-xs mb-0.5">Retained {label}</p>
                          <p className="text-2xl font-bold font-mono tabular-nums transition-all duration-300">{formatNumber(result.retainedUsers)}</p>
                        </div>
                        <div>
                          <p className="text-primary-100 text-xs mb-0.5">Lost {label}</p>
                          <p className="text-2xl font-bold font-mono tabular-nums transition-all duration-300">{formatNumber(result.lostUsers)}</p>
                        </div>
                      </div>
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 border border-white/30`}>
                        {result.status} · Churn {result.churnRate}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-white/15 rounded-full h-2 mt-4">
                    <div className="h-2 rounded-full bg-white transition-all duration-700" style={{ width: `${Math.min(100, Math.max(0, result.retentionRate))}%` }} />
                  </div>

                  {result.exceedsHundred && (
                    <p className="text-xs bg-white/15 border border-white/30 rounded-lg px-3 py-2 mt-3">⚠️ Retention rate exceeds 100% — this usually means New {label} were undercounted, or Ending {label} includes people beyond the original cohort. Please verify your inputs.</p>
                  )}

                  <p className="text-sm text-primary-100 bg-white/10 rounded-lg px-3 py-2 mt-3 mb-4 leading-relaxed">💡 {result.insight}</p>

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
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : `Enter your starting, ending, and new ${label.toLowerCase()} to calculate retention.`}
                </p>
              )}
            </div>

            {/* Formula breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Formula &amp; Calculation Breakdown</h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Formula", value: "Retention Rate (%) = ((Ending − New) ÷ Starting) × 100" },
                    { label: "Calculation", value: `((${formatNumber(inputs.endingUsers)} − ${formatNumber(inputs.newUsers)}) ÷ ${formatNumber(inputs.startingUsers)}) × 100 = ${result.retentionRate}%` },
                    ...(result.compoundedAnnual !== null && inputs.period !== "yearly" ? [{ label: "Compounded Annual Retention", value: `${result.retentionRate}% ^ ${PERIOD_META[inputs.period].periodsPerYear} periods ≈ ${result.compoundedAnnual}%` }] : []),
                  ].map(({ label: rowLabel, value }) => (
                    <div key={rowLabel} className="px-5 py-3">
                      <p className="text-xs text-gray-500 mb-1">{rowLabel}</p>
                      <p className="text-sm font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Enter values on the left to see the calculation breakdown</div>
              )}
            </div>

            {/* Performance bands + glossary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Bands</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["Excellent", "≥ 90%"],
                  ["Very Good", "80% – 89%"],
                  ["Good", "70% – 79%"],
                  ["Average", "60% – 69%"],
                  ["Needs Improvement", "Below 60%"],
                ].map(([status, range]) => (
                  <div key={status} className={`px-5 py-2.5 flex items-center justify-between ${result?.status === status ? "bg-primary/5" : ""}`}>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[status]}`}>{status}</span>
                    <span className="text-sm font-mono text-gray-600">{range}</span>
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
                          {entry.result.retentionRate}% — {METRIC_META[entry.inputs.metricType].label}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.status} · {PERIOD_META[entry.inputs.period].label}
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
      <RetentionRateCalculatorSEO />

      <RelatedTools />
    </>
  );
}
