"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateReach, validateInputs, debounce, parseNum,
  formatFull, formatShort,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildPrintHTML, buildShareSummary,
  PLATFORM_DEFAULTS, DEFAULT_INPUTS,
  type Platform, type ContentType, type AudienceQuality,
  type PostingFrequency, type ReachInputs, type ReachResult, type HistoryEntry,
} from "./logic";
import SocialMediaReachCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PLATFORMS = Object.entries(PLATFORM_DEFAULTS) as [Platform, typeof PLATFORM_DEFAULTS[Platform]][];

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: "image",    label: "Image"    },
  { value: "carousel", label: "Carousel" },
  { value: "video",    label: "Video"    },
  { value: "reel",     label: "Reel"     },
  { value: "short",    label: "Short"    },
  { value: "story",    label: "Story"    },
  { value: "live",     label: "Live"     },
];

const QUALITY_OPTIONS: { value: AudienceQuality; label: string }[] = [
  { value: "poor",      label: "Poor"      },
  { value: "average",   label: "Average"   },
  { value: "good",      label: "Good"      },
  { value: "excellent", label: "Excellent" },
];

const FREQUENCY_OPTIONS: { value: PostingFrequency; label: string }[] = [
  { value: "daily",   label: "Daily"   },
  { value: "weekly",  label: "Weekly"  },
  { value: "monthly", label: "Monthly" },
];

export default function SocialMediaReachCalculatorUI() {
  const [inputs, setInputs]         = useState<ReachInputs>(DEFAULT_INPUTS);
  const [result, setResult]         = useState<ReachResult | null>(null);
  const [errors, setErrors]         = useState<Record<string, string | null>>({});
  const [copied, setCopied]         = useState(false);
  const [shared, setShared]         = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]       = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA]           = useState<{ inputs: ReachInputs; result: ReachResult } | null>(null);
  const [snapB, setSnapB]           = useState<{ inputs: ReachInputs; result: ReachResult } | null>(null);
  const followersRef                = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); followersRef.current?.focus(); }, []);

  const run = useCallback(
    debounce((inp: ReachInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.values(errs).some(Boolean) || inp.followers <= 0) { setResult(null); return; }
      setResult(calculateReach(inp));
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof ReachInputs>(field: K, val: ReachInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  // When platform changes, update default engagement rate
  const handlePlatformChange = (platform: Platform) => {
    setInputs((p) => ({
      ...p,
      platform,
      engagementRate: PLATFORM_DEFAULTS[platform].engagementRate,
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    followersRef.current?.focus();
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
    a.download = `reach-${inputs.platform}-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, inputs)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `reach-${inputs.platform}-${Date.now()}.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result }); setHistory(getHistory());
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
      try { await navigator.share({ title: "Social Media Reach Calculator", text }); return; } catch { /* user cancelled */ }
    }
    navigator.clipboard.writeText(text);
    setShared(true); setTimeout(() => setShared(false), 2000);
  };

  const pd = PLATFORM_DEFAULTS[inputs.platform];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Platform selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>Select Platform</p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(([key, p]) => (
              <button
                key={key}
                onClick={() => handlePlatformChange(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  inputs.platform === key
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {pd.icon} {pd.label} Settings
              </h3>

              {/* Followers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="smr-followers">Followers</label>
                <input
                  ref={followersRef}
                  id="smr-followers" type="number" min="0" inputMode="numeric"
                  value={inputs.followers || ""}
                  onChange={(e) => set("followers", parseNum(e.target.value))}
                  placeholder="25000"
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.followers ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.followers && <p className="text-xs text-red-600 mt-1" role="alert">{errors.followers}</p>}
                <p className="text-xs text-gray-400 mt-1">Total audience / subscriber count</p>
              </div>

              {/* Engagement Rate slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700" htmlFor="smr-er">Engagement Rate</label>
                  <span className="text-sm font-semibold font-mono text-primary tabular-nums">{inputs.engagementRate.toFixed(1)}%</span>
                </div>
                <input
                  id="smr-er" type="range" min="0" max="100" step="0.1"
                  value={inputs.engagementRate}
                  onChange={(e) => set("engagementRate", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>Platform avg: {pd.engagementRate}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Share Rate slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700" htmlFor="smr-share">Avg Shares (%)</label>
                  <span className="text-sm font-semibold font-mono text-primary tabular-nums">{inputs.shareRate.toFixed(1)}%</span>
                </div>
                <input
                  id="smr-share" type="range" min="0" max="20" step="0.1"
                  value={inputs.shareRate}
                  onChange={(e) => set("shareRate", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-gray-400 mt-1">Shares as % of engagement</p>
              </div>

              {/* Save Rate slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700" htmlFor="smr-save">Avg Saves (%)</label>
                  <span className="text-sm font-semibold font-mono text-primary tabular-nums">{inputs.saveRate.toFixed(1)}%</span>
                </div>
                <input
                  id="smr-save" type="range" min="0" max="20" step="0.1"
                  value={inputs.saveRate}
                  onChange={(e) => set("saveRate", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-gray-400 mt-1">Saves as % of engagement</p>
              </div>

              {/* Content Type + Audience Quality */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="smr-content">Content Type</label>
                  <select id="smr-content" value={inputs.contentType}
                    onChange={(e) => set("contentType", e.target.value as ContentType)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {CONTENT_TYPES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="smr-quality">Audience Quality</label>
                  <select id="smr-quality" value={inputs.audienceQuality}
                    onChange={(e) => set("audienceQuality", e.target.value as AudienceQuality)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {QUALITY_OPTIONS.map((q) => <option key={q.value} value={q.value}>{q.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Posting Frequency */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="smr-freq">Posting Frequency</label>
                <select id="smr-freq" value={inputs.postingFrequency}
                  onChange={(e) => set("postingFrequency", e.target.value as PostingFrequency)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {FREQUENCY_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>

              {/* Paid Promotion toggle */}
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">Paid Promotion</p>
                  <p className="text-xs text-gray-400">Boost reach with paid amplification</p>
                </div>
                <button type="button" role="switch" aria-checked={inputs.paidEnabled}
                  onClick={() => set("paidEnabled", !inputs.paidEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.paidEnabled ? "bg-primary" : "bg-gray-200"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${inputs.paidEnabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {/* Paid multiplier — only when paid is enabled */}
              {inputs.paidEnabled && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-700" htmlFor="smr-paid">Paid Reach Multiplier</label>
                    <span className="text-sm font-semibold font-mono text-primary tabular-nums">{inputs.paidMultiplier}×</span>
                  </div>
                  <input
                    id="smr-paid" type="range" min="1" max="10" step="0.5"
                    value={inputs.paidMultiplier}
                    onChange={(e) => set("paidMultiplier", parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1× (no boost)</span><span>10× (heavy spend)</span>
                  </div>
                </div>
              )}

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
                {pd.icon} {pd.label} — Estimated Results
              </p>
              {result ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Final Reach</p>
                      <p className="text-3xl font-bold font-mono tabular-nums">{formatShort(result.finalReach)}</p>
                      <p className="text-primary-100 text-xs">{formatFull(result.finalReach)} users</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Impressions</p>
                      <p className="text-3xl font-bold font-mono tabular-nums">{formatShort(result.impressions)}</p>
                      <p className="text-primary-100 text-xs">{formatFull(result.impressions)} total</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${result.performanceBg} ${result.performanceColor} border-transparent`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${result.performanceDot}`} />
                      {result.performanceLabel} — {result.performanceScore}/100
                    </span>
                    <span className="text-xs text-primary-100">{result.reachPct}% reach rate</span>
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleShare} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                        {shared ? "✓ Shared!" : "Share"}
                      </button>
                      <button onClick={handleSave} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                        Save to History
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter follower count above to estimate reach and engagement.</p>
              )}
            </div>

            {/* Metric cards grid */}
            {result && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {([
                  { label: "Organic Reach",     value: formatShort(result.organicReach),  sub: formatFull(result.organicReach),      note: "Without paid boost"       },
                  { label: "Engagement",        value: formatShort(result.engagement),    sub: formatFull(result.engagement),        note: `${inputs.engagementRate}% rate` },
                  { label: "Shares",            value: formatShort(result.shares),        sub: formatFull(result.shares),            note: `${inputs.shareRate}% of engmt`  },
                  { label: "Saves",             value: formatShort(result.saves),         sub: formatFull(result.saves),             note: `${inputs.saveRate}% of engmt`   },
                  { label: "Audience Growth",   value: formatShort(result.audienceGrowth),sub: "est. / month",                       note: "New followers estimate"    },
                  { label: "Reach %",           value: result.reachPct + "%",             sub: "of followers",                       note: "Organic reach rate"        },
                ] as const).map(({ label, value, sub, note }) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className="text-2xl font-bold font-mono text-primary tabular-nums">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                    <p className="text-xs text-gray-400 mt-1">{note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Compare two campaigns side by side */}
            {(snapA || snapB) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare Campaigns</h3>
                  <button onClick={() => { setSnapA(null); setSnapB(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {([["A", snapA], ["B", snapB]] as const).map(([label, s]) => (
                    <div key={label} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Campaign {label}{s ? ` — ${PLATFORM_DEFAULTS[s.inputs.platform].icon} ${PLATFORM_DEFAULTS[s.inputs.platform].label}` : ""}
                        </span>
                        <span className="text-sm font-semibold font-mono text-gray-800">
                          {s ? formatFull(s.result.finalReach) : "— not set —"}
                        </span>
                      </div>
                      {s && (
                        <>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                              style={{ width: `${Math.min(100, (s.result.finalReach / (Math.max(snapA?.result.finalReach ?? 0, snapB?.result.finalReach ?? 0) || 1)) * 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Engagement: {formatFull(s.result.engagement)} · Impressions: {formatFull(s.result.impressions)} · Score: {s.result.performanceScore}/100
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {snapA && snapB && (
                  <p className="text-xs text-gray-500 px-5 py-3 border-t border-gray-50">
                    {snapB.result.finalReach > snapA.result.finalReach
                      ? `Campaign B reaches ${formatFull(snapB.result.finalReach - snapA.result.finalReach)} more users than Campaign A.`
                      : snapA.result.finalReach > snapB.result.finalReach
                        ? `Campaign A reaches ${formatFull(snapA.result.finalReach - snapB.result.finalReach)} more users than Campaign B.`
                        : "Campaign A and B have equal estimated reach."}
                  </p>
                )}
              </div>
            )}

            {/* Paid vs organic comparison */}
            {result && inputs.paidEnabled && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Organic vs Paid Comparison</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {([
                    { label: "Organic Reach",  value: result.organicReach, color: "bg-blue-400"   },
                    { label: "Paid Reach",     value: result.finalReach,   color: "bg-primary"    },
                    { label: "Impressions",    value: result.impressions,  color: "bg-purple-400" },
                  ]).map(({ label, value, color }) => {
                    const pct = result.finalReach > 0 ? Math.min(100, (value / result.finalReach) * 100) : 0;
                    return (
                      <div key={label} className="px-5 py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{label}</span>
                          <span className="text-sm font-semibold font-mono text-gray-800">{formatFull(value)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Platform benchmark table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Platform Benchmark Reference</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {PLATFORMS.map(([key, p]) => (
                  <div
                    key={key}
                    onClick={() => handlePlatformChange(key)}
                    className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-50 ${inputs.platform === key ? "bg-primary/5" : ""}`}
                  >
                    <span className="text-base flex-shrink-0 w-6 text-center">{p.icon}</span>
                    <span className={`text-sm font-medium flex-1 ${inputs.platform === key ? "text-primary" : "text-gray-700"}`}>{p.label}</span>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Reach: <span className="font-mono font-medium text-gray-700">{(p.reachRate * 100).toFixed(0)}%</span></span>
                      <span>ER: <span className="font-mono font-medium text-gray-700">{p.engagementRate}%</span></span>
                      <span>Growth: <span className="font-mono font-medium text-gray-700">~{p.growthRate}%/mo</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">* Averages based on industry research. Actual metrics depend on content quality, audience, and algorithm changes.</p>
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
                          {PLATFORM_DEFAULTS[entry.inputs.platform].icon} {PLATFORM_DEFAULTS[entry.inputs.platform].label} — {formatFull(entry.inputs.followers)} followers
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        Reach: {formatShort(entry.result.finalReach)} · Engagement: {formatShort(entry.result.engagement)} · Score: {entry.result.performanceScore}/100
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
      <SocialMediaReachCalculatorSEO />

      <RelatedTools />
    </>
  );
}
