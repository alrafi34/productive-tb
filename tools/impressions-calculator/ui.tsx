"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculate, validate, debounce, parseNum, formatNumber,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport,
  DEFAULTS, MODE_LABELS,
  type CalcMode, type ImpressionResult, type HistoryEntry,
  type ReachFrequencyInputs, type CpmBudgetInputs,
  type CtrClicksInputs, type EngagementInputs,
} from "./logic";
import ImpressionsCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const MODES: CalcMode[] = ["reach-frequency", "cpm-budget", "ctr-clicks", "engagement"];

export default function ImpressionsCalculatorUI() {
  const [mode, setMode]           = useState<CalcMode>("reach-frequency");
  const [rf, setRf]               = useState<ReachFrequencyInputs>(DEFAULTS["reach-frequency"]);
  const [cpm, setCpm]             = useState<CpmBudgetInputs>(DEFAULTS["cpm-budget"]);
  const [ctr, setCtr]             = useState<CtrClicksInputs>(DEFAULTS["ctr-clicks"]);
  const [eng, setEng]             = useState<EngagementInputs>(DEFAULTS["engagement"]);
  const [result, setResult]       = useState<ImpressionResult | null>(null);
  const [errors, setErrors]       = useState<Record<string, string | null>>({});
  const [copied, setCopied]       = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory]     = useState<HistoryEntry[]>([]);
  const firstInputRef             = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); }, []);
  useEffect(() => { firstInputRef.current?.focus(); }, [mode]);

  const getModeInputs = useCallback(() => {
    if (mode === "reach-frequency") return { mode, inputs: rf };
    if (mode === "cpm-budget")      return { mode, inputs: cpm };
    if (mode === "ctr-clicks")      return { mode, inputs: ctr };
    return { mode, inputs: eng };
  }, [mode, rf, cpm, ctr, eng]);

  const run = useCallback(
    debounce((data: ReturnType<typeof getModeInputs>) => {
      const errs = validate(data as Parameters<typeof validate>[0]);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculate(data as Parameters<typeof calculate>[0]));
    }, 150),
    []
  );

  useEffect(() => { run(getModeInputs()); }, [rf, cpm, ctr, eng, mode]);

  const handleReset = () => {
    setRf(DEFAULTS["reach-frequency"]);
    setCpm(DEFAULTS["cpm-budget"]);
    setCtr(DEFAULTS["ctr-clicks"]);
    setEng(DEFAULTS["engagement"]);
    setErrors({});
    setResult(null);
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `impressions-${mode}-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `impressions-${mode}-${Date.now()}.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ mode, result, inputs: getModeInputs().inputs });
    setHistory(getHistory());
  };

  const field = (
    id: string, label: string, value: number,
    onChange: (v: number) => void, placeholder: string,
    hint: string, error?: string | null,
    prefix?: string, ref?: React.RefObject<HTMLInputElement | null>
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">{prefix}</span>}
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          id={id} type="number" min="0" inputMode="decimal"
          value={value || ""}
          onChange={(e) => onChange(parseNum(e.target.value))}
          placeholder={placeholder}
          className={`w-full ${prefix ? "pl-7" : "px-3"} py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${error ? "border-red-300" : "border-gray-200"}`}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1" role="alert">{error}</p>}
      <p className="text-xs text-gray-400 mt-1">{hint}</p>
    </div>
  );


  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1 flex-wrap">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setErrors({}); }}
              className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {MODE_LABELS[mode]}
              </h3>

              {/* Mode 1: Reach × Frequency */}
              {mode === "reach-frequency" && (
                <>
                  {field("imp-reach", "Reach", rf.reach, (v) => setRf((p) => ({ ...p, reach: v })), "25000", "Unique users who saw the content", errors.reach, undefined, firstInputRef)}
                  {field("imp-freq", "Frequency", rf.frequency, (v) => setRf((p) => ({ ...p, frequency: v })), "3.5", "Average times each user sees the content", errors.frequency)}
                </>
              )}

              {/* Mode 2: CPM + Budget */}
              {mode === "cpm-budget" && (
                <>
                  {field("imp-budget", "Advertising Budget", cpm.budget, (v) => setCpm((p) => ({ ...p, budget: v })), "500", "Total ad spend in USD", errors.budget, "$", firstInputRef)}
                  {field("imp-cpm", "CPM (Cost per 1,000 impressions)", cpm.cpm, (v) => setCpm((p) => ({ ...p, cpm: v })), "8", "Cost to serve 1,000 impressions", errors.cpm, "$")}
                </>
              )}

              {/* Mode 3: Clicks ÷ CTR */}
              {mode === "ctr-clicks" && (
                <>
                  {field("imp-clicks", "Clicks", ctr.clicks, (v) => setCtr((p) => ({ ...p, clicks: v })), "350", "Total number of clicks recorded", errors.clicks, undefined, firstInputRef)}
                  {field("imp-ctr", "CTR (%)", ctr.ctr, (v) => setCtr((p) => ({ ...p, ctr: v })), "2.5", "Click-through rate as a percentage (e.g. 2.5)", errors.ctr)}
                </>
              )}

              {/* Mode 4: Engagement Rate */}
              {mode === "engagement" && (
                <>
                  {field("imp-followers", "Followers", eng.followers, (v) => setEng((p) => ({ ...p, followers: v })), "50000", "Total audience / follower count", errors.followers, undefined, firstInputRef)}
                  {field("imp-engrate", "Engagement Rate (%)", eng.engagementRate, (v) => setEng((p) => ({ ...p, engagementRate: v })), "3.5", "Likes, comments, shares as % of followers", errors.engagementRate)}
                  {field("imp-reachpct", "Estimated Reach (%)", eng.reachPct, (v) => setEng((p) => ({ ...p, reachPct: v })), "20", "% of followers estimated to see the post (typical: 10–30%)", errors.reachPct)}
                  {field("imp-avgfreq", "Average Frequency", eng.avgFrequency, (v) => setEng((p) => ({ ...p, avgFrequency: v })), "1.8", "Average times each reached user sees it", errors.avgFrequency)}
                </>
              )}

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopy} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export TXT</button>
                  <button onClick={handleDownloadCSV} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                </div>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* Formula card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full flex items-center justify-between text-sm font-semibold text-gray-800"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span>Formula & Steps</span>
                <span className="text-gray-400 text-xs">{showSteps ? "▲ Hide" : "▼ Show"}</span>
              </button>
              {showSteps && result && (
                <div className="mt-3 space-y-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                    <p className="text-xs text-gray-500 mb-1">Formula used</p>
                    <p className="font-mono text-sm text-gray-900 font-semibold">{result.formulaUsed}</p>
                  </div>
                  <div className="space-y-1.5">
                    {result.steps.map((s, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-500">{s.label}</span>
                        <span className="font-mono font-semibold text-gray-800">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {showSteps && !result && (
                <p className="text-xs text-gray-400 mt-2">Enter values to see the calculation steps.</p>
              )}
            </div>
          </div>


          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Estimated Impressions
              </p>
              {result ? (
                <>
                  <div className="text-5xl font-bold font-mono tabular-nums mb-1 break-all">
                    {result.formattedShort}
                  </div>
                  <div className="text-sm text-primary-100 mb-1">{result.formattedFull} impressions</div>
                  <div className="text-xs text-primary-100 mb-4 font-mono opacity-80">{result.formulaUsed}</div>
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
                <p className="text-primary-100 text-sm">Enter values above to calculate estimated impressions.</p>
              )}
            </div>

            {/* Insights */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Insights</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {result.insights.map((ins, i) => (
                    <div key={i} className="px-5 py-3 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{ins.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{ins.note}</p>
                      </div>
                      <span className="text-sm font-semibold font-mono text-primary tabular-nums flex-shrink-0">{ins.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mode comparison reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode Reference</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { mode: "reach-frequency" as CalcMode, formula: "Reach × Frequency",              use: "Known audience size and average exposure count"     },
                  { mode: "cpm-budget"      as CalcMode, formula: "(Budget ÷ CPM) × 1,000",         use: "Planning paid media with a known budget and CPM rate" },
                  { mode: "ctr-clicks"      as CalcMode, formula: "Clicks ÷ (CTR / 100)",           use: "Back-calculate impressions from click and CTR data"   },
                  { mode: "engagement"      as CalcMode, formula: "(Followers × Reach%) × Freq",    use: "Estimating organic social media post impressions"     },
                ] as const).map(({ mode: m, formula, use }) => (
                  <div
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-5 py-3 flex items-start gap-3 cursor-pointer transition-colors hover:bg-gray-50 ${mode === m ? "bg-primary/5" : ""}`}
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${mode === m ? "bg-primary" : "bg-gray-300"}`} />
                    <div>
                      <p className={`text-sm font-medium ${mode === m ? "text-primary" : "text-gray-700"}`}>{MODE_LABELS[m]}</p>
                      <p className="text-xs font-mono text-gray-400">{formula}</p>
                      <p className="text-xs text-gray-400">{use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry benchmarks */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Industry Benchmark Reference</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { channel: "Google Search Ads",     cpm: "$2–$10",    ctr: "2–5%",    freq: "1–3×",    note: "Intent-driven; CTR varies by industry"             },
                  { channel: "Google Display Ads",    cpm: "$0.50–$3",  ctr: "0.05–0.3%",freq: "3–7×",  note: "Broad reach; lower CTR is normal"                  },
                  { channel: "Facebook / Instagram",  cpm: "$5–$15",    ctr: "0.5–1.5%",freq: "2–5×",   note: "Strong targeting; feed vs story differs"           },
                  { channel: "LinkedIn Ads",          cpm: "$15–$50",   ctr: "0.3–0.8%",freq: "2–4×",   note: "Premium B2B audience; higher CPM"                  },
                  { channel: "YouTube Pre-roll",      cpm: "$4–$10",    ctr: "0.3–0.7%",freq: "2–4×",   note: "Video completion rate is the key metric"           },
                  { channel: "Organic Social (IG)",   cpm: "—",         ctr: "—",       freq: "1–2×",   note: "Typical reach: 10–30% of followers per post"       },
                ] as const).map(({ channel, cpm: c, ctr: r, freq, note }) => (
                  <div key={channel} className="px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium text-gray-700">{channel}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>CPM: <span className="font-mono font-medium text-gray-700">{c}</span></span>
                      <span>CTR: <span className="font-mono font-medium text-gray-700">{r}</span></span>
                      <span>Freq: <span className="font-mono font-medium text-gray-700">{freq}</span></span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{note}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">* Benchmarks are approximate industry averages. Actual values vary by industry, creative quality, and targeting.</p>
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
                    <div key={entry.id} onClick={() => { setMode(entry.mode); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{MODE_LABELS[entry.mode]}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.formattedFull} impressions ({entry.result.formattedShort})
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
      <ImpressionsCalculatorSEO />

      <RelatedTools />
    </>
  );
}
