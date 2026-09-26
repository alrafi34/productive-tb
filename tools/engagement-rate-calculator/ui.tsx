"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateEngagement, validateInputs, debounce, parseNum,
  formatFull, formatShort, formatMoney,
  saveHistory, getHistory, clearHistory,
  getFavoriteMethod, setFavoriteMethod,
  buildTextReport, buildCSVReport, buildPrintHTML,
  METHODS, METHOD_ORDER, PLATFORM_PRESETS, PLATFORM_ORDER, DEFAULT_INPUTS,
  type Method, type Platform, type EngagementInputs, type EngagementResult, type HistoryEntry,
} from "./logic";
import EngagementRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3];

export default function EngagementRateCalculatorUI() {
  const [inputs, setInputs]         = useState<EngagementInputs>(DEFAULT_INPUTS);
  const [result, setResult]         = useState<EngagementResult | null>(null);
  const [errors, setErrors]         = useState<Record<string, string | null>>({});
  const [copied, setCopied]         = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]       = useState<HistoryEntry[]>([]);
  const [favorite, setFavorite]     = useState<Method | null>(null);
  const [snapA, setSnapA]           = useState<{ inputs: EngagementInputs; result: EngagementResult } | null>(null);
  const [snapB, setSnapB]           = useState<{ inputs: EngagementInputs; result: EngagementResult } | null>(null);
  const likesRef                    = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const fav = getFavoriteMethod();
    if (fav) { setFavorite(fav); setInputs((p) => ({ ...p, method: fav })); }
    likesRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: EngagementInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculateEngagement(inp));
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof EngagementInputs>(field: K, val: EngagementInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleMethodChange = (method: Method) => set("method", method);

  const handleSwapFormula = () => {
    const idx = METHOD_ORDER.indexOf(inputs.method);
    handleMethodChange(METHOD_ORDER[(idx + 1) % METHOD_ORDER.length]);
  };

  const toggleFavorite = () => {
    if (favorite === inputs.method) { setFavorite(null); setFavoriteMethod(null); }
    else { setFavorite(inputs.method); setFavoriteMethod(inputs.method); }
  };

  const applyPreset = (platform: Platform) => {
    const p = PLATFORM_PRESETS[platform];
    setInputs((prev) => ({
      ...prev,
      likes: p.likes, comments: p.comments, shares: p.shares, saves: p.saves, otherActions: p.otherActions,
      followers: p.followers, reach: p.reach, impressions: p.impressions, views: p.views,
    }));
  };

  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS, method: inputs.method });
    setResult(null); setErrors({}); setSnapA(null); setSnapB(null);
    likesRef.current?.focus();
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
    a.download = `engagement-rate-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, inputs)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `engagement-rate-${Date.now()}.txt`; a.click(); URL.revokeObjectURL(a.href);
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

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const meta = METHODS[inputs.method];
  const isCpe = inputs.method === "cpe";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Formula selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Calculation Method</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFavorite}
                aria-pressed={favorite === inputs.method}
                title={favorite === inputs.method ? "Remove favorite formula" : "Set as favorite formula"}
                className={`text-lg leading-none transition-colors ${favorite === inputs.method ? "text-yellow-500" : "text-gray-300 hover:text-gray-400"}`}
              >
                {favorite === inputs.method ? "★" : "☆"}
              </button>
              <button
                type="button"
                onClick={handleSwapFormula}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-medium transition-colors"
              >
                ⇄ Swap
              </button>
            </div>
          </div>
          <select
            id="erc-method"
            value={inputs.method}
            onChange={(e) => handleMethodChange(e.target.value as Method)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
          >
            {METHOD_ORDER.map((m) => <option key={m} value={m}>{METHODS[m].label}</option>)}
          </select>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">{meta.hint}</p>

          {/* Quick-start platform presets */}
          <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Load example:</span>
            {PLATFORM_ORDER.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyPreset(p)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <span>{PLATFORM_PRESETS[p].icon}</span>
                <span>{PLATFORM_PRESETS[p].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Engagement Actions</h3>

              <div className="grid grid-cols-2 gap-3">
                <NumField id="erc-likes" label="Likes" refEl={likesRef} value={inputs.likes} onChange={(v) => set("likes", v)} placeholder="250" />
                <NumField id="erc-comments" label="Comments" value={inputs.comments} onChange={(v) => set("comments", v)} placeholder="35" />
                <NumField id="erc-shares" label="Shares" value={inputs.shares} onChange={(v) => set("shares", v)} placeholder="18" />
                <NumField id="erc-saves" label="Saves" value={inputs.saves} onChange={(v) => set("saves", v)} placeholder="40" />
              </div>
              <NumField id="erc-other" label="Other Engagement Actions (optional)" value={inputs.otherActions} onChange={(v) => set("otherActions", v)} placeholder="0" hint="Clicks, replies, DMs, or any custom action you want counted." />
              {errors.engagement && <p className="text-xs text-red-600" role="alert">{errors.engagement}</p>}

              <div className="pt-3 border-t border-gray-100 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>{meta.short} — Denominator</h3>

                {inputs.method === "followers" && (
                  <NumField id="erc-followers" label="Followers" value={inputs.followers} onChange={(v) => set("followers", v)} placeholder="12500" error={errors.followers} hint="Total audience / subscriber count." />
                )}
                {inputs.method === "reach" && (
                  <NumField id="erc-reach" label="Reach" value={inputs.reach} onChange={(v) => set("reach", v)} placeholder="8300" error={errors.reach} hint="Unique accounts that saw the post." />
                )}
                {inputs.method === "impressions" && (
                  <NumField id="erc-impressions" label="Impressions" value={inputs.impressions} onChange={(v) => set("impressions", v)} placeholder="14500" error={errors.impressions} hint="Total views including repeat views." />
                )}
                {inputs.method === "views" && (
                  <NumField id="erc-views" label="Video Views" value={inputs.views} onChange={(v) => set("views", v)} placeholder="22000" error={errors.views} hint="Total video plays." />
                )}
                {inputs.method === "custom" && (
                  <NumField id="erc-custom" label="Custom Denominator" value={inputs.customBase} onChange={(v) => set("customBase", v)} placeholder="1000" error={errors.customBase} hint="Email list size, site visitors, event attendees — anything you want to divide by." />
                )}
                {inputs.method === "cpe" && (
                  <NumField id="erc-spend" label="Ad / Campaign Spend ($)" value={inputs.adSpend} onChange={(v) => set("adSpend", v)} placeholder="150" hint="Total amount spent on the post or campaign." />
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="erc-precision">Decimal Precision</label>
                <select
                  id="erc-precision"
                  value={inputs.decimalPrecision}
                  onChange={(e) => set("decimalPrecision", parseInt(e.target.value, 10))}
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
                  <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export TXT</button>
                  <button onClick={handleDownloadCSV} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                  <button onClick={handlePrintPdf} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print / PDF</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setSnapA(result ? { inputs, result } : null)} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Compare as A</button>
                  <button onClick={() => setSnapB(result ? { inputs, result } : null)} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Compare as B</button>
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
                {meta.short} — Result
              </p>
              {result ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Total Engagements</p>
                      <p className="text-3xl font-bold font-mono tabular-nums">{formatShort(result.totalEngagement)}</p>
                      <p className="text-primary-100 text-xs">{formatFull(result.totalEngagement)} actions</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">{isCpe ? "Cost Per Engagement" : "Engagement Rate"}</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">
                        {isCpe
                          ? (result.costPerEngagement !== null ? formatMoney(result.costPerEngagement) : "N/A")
                          : (result.rate !== null ? `${result.rate.toFixed(inputs.decimalPrecision)}%` : "N/A")}
                      </p>
                      <p className="text-primary-100 text-xs">
                        {isCpe ? `on ${formatMoney(inputs.adSpend)} spend` : `of ${formatFull(result.denominator)} ${result.denominatorLabel.toLowerCase()}`}
                      </p>
                    </div>
                  </div>
                  {!isCpe && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${result.performanceBg} ${result.performanceColor} border-transparent`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${result.performanceDot}`} />
                        {result.performanceLabel}
                      </span>
                      <span className="text-xs text-primary-100">{meta.label}</span>
                    </div>
                  )}
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
                <p className="text-primary-100 text-sm">Enter at least one engagement metric above to calculate your rate.</p>
              )}
            </div>

            {/* Metric cards grid */}
            {result && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {([
                  { label: "Likes",    value: formatShort(inputs.likes),    sub: formatFull(inputs.likes) },
                  { label: "Comments", value: formatShort(inputs.comments), sub: formatFull(inputs.comments) },
                  { label: "Shares",   value: formatShort(inputs.shares),   sub: formatFull(inputs.shares) },
                  { label: "Saves",    value: formatShort(inputs.saves),    sub: formatFull(inputs.saves) },
                  { label: "Other Actions", value: formatShort(inputs.otherActions), sub: formatFull(inputs.otherActions) },
                  { label: result.denominatorLabel, value: isCpe ? formatMoney(inputs.adSpend) : formatShort(result.denominator), sub: isCpe ? "spend" : formatFull(result.denominator) },
                ] as const).map(({ label, value, sub }) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className="text-2xl font-bold font-mono text-primary tabular-nums">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Compare A vs B */}
            {(snapA || snapB) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare Engagement Rates</h3>
                  <button onClick={() => { setSnapA(null); setSnapB(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {([["A", snapA], ["B", snapB]] as const).map(([label, s]) => {
                    return (
                      <div key={label} className="px-5 py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Calculation {label}</span>
                          <span className="text-sm font-semibold font-mono text-gray-800">
                            {s ? (s.inputs.method === "cpe"
                              ? (s.result.costPerEngagement !== null ? formatMoney(s.result.costPerEngagement) : "N/A")
                              : (s.result.rate !== null ? `${s.result.rate}%` : "N/A"))
                              : "— not set —"}
                          </span>
                        </div>
                        {s && (
                          <>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                                style={{ width: `${s.result.rate !== null ? Math.min(100, (s.result.rate / 15) * 100) : 0}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{METHODS[s.inputs.method].short} · {formatFull(s.result.totalEngagement)} total engagements</p>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                {snapA && snapB && snapA.result.rate !== null && snapB.result.rate !== null && (
                  <p className="text-xs text-gray-500 px-5 py-3 border-t border-gray-50">
                    {snapB.result.rate > snapA.result.rate
                      ? `B outperforms A by ${(snapB.result.rate - snapA.result.rate).toFixed(2)} percentage points.`
                      : snapA.result.rate > snapB.result.rate
                        ? `A outperforms B by ${(snapA.result.rate - snapB.result.rate).toFixed(2)} percentage points.`
                        : "A and B are equal."}
                  </p>
                )}
              </div>
            )}

            {/* Benchmark reference table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Typical Engagement Rate Benchmarks</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { platform: "Instagram", icon: "📸", range: "0.5% – 3%" },
                  { platform: "TikTok", icon: "🎵", range: "4% – 18%" },
                  { platform: "Facebook", icon: "👥", range: "0.15% – 1%" },
                  { platform: "YouTube", icon: "▶️", range: "1% – 5%" },
                  { platform: "LinkedIn", icon: "💼", range: "2% – 6%" },
                  { platform: "X (Twitter)", icon: "𝕏", range: "0.5% – 2%" },
                ].map(({ platform, icon, range }) => (
                  <div key={platform} className="flex items-center gap-3 px-5 py-3">
                    <span className="text-base flex-shrink-0 w-6 text-center">{icon}</span>
                    <span className="text-sm font-medium flex-1 text-gray-700">{platform}</span>
                    <span className="text-xs font-mono font-medium text-gray-700">{range}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">* Widely cited industry averages by follower count and niche. Actual engagement varies by content quality, posting time, and algorithm changes.</p>
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
                          {METHODS[entry.inputs.method].short} — {formatFull(entry.result.totalEngagement)} engagements
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.inputs.method === "cpe"
                          ? (entry.result.costPerEngagement !== null ? formatMoney(entry.result.costPerEngagement) : "N/A")
                          : (entry.result.rate !== null ? `${entry.result.rate}%` : "N/A")} · {entry.result.performanceLabel}
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
      <EngagementRateCalculatorSEO />

      <RelatedTools />
    </>
  );
}

// ── Reusable number field ──────────────────────────────────────────────────────

function NumField({
  id, label, value, onChange, placeholder, error, hint, refEl,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  error?: string | null;
  hint?: string;
  refEl?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
      <input
        ref={refEl}
        id={id} type="number" min="0" inputMode="decimal"
        value={value || ""}
        onChange={(e) => onChange(parseNum(e.target.value))}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${error ? "border-red-300" : "border-gray-200"}`}
      />
      {error && <p className="text-xs text-red-600 mt-1" role="alert">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
