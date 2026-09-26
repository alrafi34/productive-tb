"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateSessionDuration, validateInputs, debounce, parseNum,
  buildShareUrl, parseShareParams, saveHistory, getHistory, clearHistory,
  saveInputs, loadInputs, buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  DEFAULT_INPUTS, PRESETS,
  type Mode, type SessionDurationInputs, type SessionDurationResult, type HistoryEntry,
} from "./logic";
import SessionBarChart from "./chart";
import SessionDurationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const MODE_META: Record<Mode, string> = {
  time: "Hours / Minutes / Seconds",
  seconds: "Total Seconds",
  bulk: "Paste Analytics Data",
};

export default function SessionDurationCalculatorUI() {
  const [inputs, setInputs] = useState<SessionDurationInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<SessionDurationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);
  const runRef = useRef(debounce((inp: SessionDurationInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculateSessionDuration(inp));
  }, 150));
  const persistRef = useRef(debounce((inp: SessionDurationInputs) => saveInputs(inp), 400));

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

  const setMode = (mode: Mode) => setInputs((p) => ({ ...p, mode }));
  const setTimeField = (field: keyof SessionDurationInputs["time"], val: number) =>
    setInputs((p) => ({ ...p, time: { ...p.time, [field]: val } }));
  const setSecondsField = (field: keyof SessionDurationInputs["secondsMode"], val: number) =>
    setInputs((p) => ({ ...p, secondsMode: { ...p.secondsMode, [field]: val } }));
  const setBulkText = (text: string) => setInputs((p) => ({ ...p, bulkText: text }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, ...p.inputs }));
    firstRef.current?.focus();
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.humanReadableAverage);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `session-duration-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `session-duration-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    if (!result) return;
    const url = buildShareUrl(inputs);
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

        {/* Mode selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {(Object.keys(MODE_META) as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  inputs.mode === m ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {MODE_META[m]}
              </button>
            ))}
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
          <p className="text-xs text-gray-400 mt-2 font-mono">Average Session Duration = Total Session Time ÷ Number of Sessions</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Session Data</h3>

              {inputs.mode === "time" && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="sdc-hours">Hours</label>
                      <input ref={firstRef} id="sdc-hours" type="number" min="0" inputMode="numeric"
                        value={inputs.time.hours || ""}
                        onChange={(e) => setTimeField("hours", parseNum(e.target.value))}
                        placeholder="0"
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.hours ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="sdc-minutes">Minutes</label>
                      <input id="sdc-minutes" type="number" min="0" max="59" inputMode="numeric"
                        value={inputs.time.minutes || ""}
                        onChange={(e) => setTimeField("minutes", parseNum(e.target.value))}
                        placeholder="0"
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.minutes ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="sdc-seconds">Seconds</label>
                      <input id="sdc-seconds" type="number" min="0" max="59" inputMode="numeric"
                        value={inputs.time.seconds || ""}
                        onChange={(e) => setTimeField("seconds", parseNum(e.target.value))}
                        placeholder="0"
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.seconds ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                  </div>
                  {errors.hours && <p className="text-xs text-red-600" role="alert">{errors.hours}</p>}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sdc-sessions-time">Number of Sessions</label>
                    <input id="sdc-sessions-time" type="number" min="1" inputMode="numeric"
                      value={inputs.time.sessions || ""}
                      onChange={(e) => setTimeField("sessions", parseNum(e.target.value))}
                      placeholder="24"
                      aria-invalid={!!errors.sessions}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.sessions ? "border-red-300" : "border-gray-200"}`} />
                    {errors.sessions ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.sessions}</p> : <p className="text-xs text-gray-400 mt-1">Total number of sessions to average across.</p>}
                  </div>
                </>
              )}

              {inputs.mode === "seconds" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sdc-total-seconds">Total Seconds</label>
                    <input ref={firstRef} id="sdc-total-seconds" type="number" min="0" inputMode="numeric"
                      value={inputs.secondsMode.totalSeconds || ""}
                      onChange={(e) => setSecondsField("totalSeconds", parseNum(e.target.value))}
                      placeholder="5400"
                      aria-invalid={!!errors.totalSeconds}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.totalSeconds ? "border-red-300" : "border-gray-200"}`} />
                    {errors.totalSeconds ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.totalSeconds}</p> : <p className="text-xs text-gray-400 mt-1">Total session time in seconds.</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sdc-sessions-seconds">Number of Sessions</label>
                    <input id="sdc-sessions-seconds" type="number" min="1" inputMode="numeric"
                      value={inputs.secondsMode.sessions || ""}
                      onChange={(e) => setSecondsField("sessions", parseNum(e.target.value))}
                      placeholder="18"
                      aria-invalid={!!errors.sessions}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.sessions ? "border-red-300" : "border-gray-200"}`} />
                    {errors.sessions && <p className="text-xs text-red-600 mt-1" role="alert">{errors.sessions}</p>}
                  </div>
                </>
              )}

              {inputs.mode === "bulk" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sdc-bulk">Paste Session Durations</label>
                  <textarea
                    id="sdc-bulk" rows={8}
                    value={inputs.bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder={"Session 1 = 240\nSession 2 = 185\n\nor\n\n240\n185\n301\n90"}
                    aria-invalid={!!errors.bulkText}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono ${errors.bulkText ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.bulkText ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.bulkText}</p> : (
                    <p className="text-xs text-gray-400 mt-1">One duration per line — plain seconds, HH:MM:SS, MM:SS, or &quot;Session N = seconds&quot;.</p>
                  )}
                  {result && result.ignoredRows > 0 && (
                    <p className="text-xs text-amber-600 mt-1">⚠️ {result.ignoredRows} row{result.ignoredRows === 1 ? "" : "s"} ignored (unrecognized format).</p>
                  )}
                </div>
              )}

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

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Average Session Duration
              </p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl font-bold font-mono tabular-nums">{result.humanReadableAverage}</span>
                  </div>
                  <p className="text-primary-100 text-sm font-mono mb-4">{result.hhmmssAverage}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Total Time</p>
                      <p className="text-sm font-bold font-mono">{result.humanReadableTotal}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Sessions</p>
                      <p className="text-sm font-bold font-mono">{result.sessions.toLocaleString("en-US")}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Decimal Minutes</p>
                      <p className="text-sm font-bold font-mono">{result.decimalMinutesAverage}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Decimal Hours</p>
                      <p className="text-sm font-bold font-mono">{result.decimalHoursAverage}</p>
                    </div>
                  </div>

                  {inputs.mode === "bulk" && result.bulkDurations.length > 1 && (
                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                      <SessionBarChart durations={result.bulkDurations} averageSeconds={result.averageSeconds} />
                    </div>
                  )}

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
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter your session time and count to calculate the average."}
                </p>
              )}
            </div>

            {/* Formula breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation Breakdown</h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Formula", value: "Average = Total Seconds ÷ Sessions" },
                    { label: "Calculation", value: `${Math.round(result.totalSeconds)}s ÷ ${result.sessions} = ${result.averageSeconds.toFixed(2)}s` },
                    { label: "Average (H:M:S)", value: `${result.averageParts.hours}h ${result.averageParts.minutes}m ${result.averageParts.seconds}s` },
                    { label: "Total (H:M:S)", value: `${result.totalParts.hours}h ${result.totalParts.minutes}m ${result.totalParts.seconds}s` },
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
                        <span className="text-sm font-semibold text-gray-900">{entry.result.humanReadableAverage} avg</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.sessions} sessions · {entry.result.humanReadableTotal} total
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
      <SessionDurationCalculatorSEO />

      <RelatedTools />
    </>
  );
}
