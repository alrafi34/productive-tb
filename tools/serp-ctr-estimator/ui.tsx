"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateEstimate, validateInputs, debounce, parseNum,
  formatNumber, formatPercent,
  saveHistory, getHistory, clearHistory,
  saveInputs, loadInputs,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  DATASET_META, DATASET_ORDER, DEVICE_META, DEVICE_ORDER, INTENT_META, INTENT_ORDER,
  CUSTOM_ANCHOR_POSITIONS, DEFAULT_INPUTS,
  type Dataset, type DeviceType, type Intent, type EstimatorInputs, type EstimatorResult, type HistoryEntry, type Anchor,
} from "./logic";
import CTRCurveChart, { exportCanvasAsPng } from "./chart";
import SERPCTREstimatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const POSITIONS = Array.from({ length: 100 }, (_, i) => i + 1);

const OPPORTUNITY_STYLES: Record<string, string> = {
  Low: "bg-green-50 text-green-700 border-green-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Critical: "bg-red-50 text-red-700 border-red-200",
};

export default function SERPCTREstimatorUI() {
  const [inputs, setInputs] = useState<EstimatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<EstimatorResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [csvCopied, setCsvCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [chartRange, setChartRange] = useState<20 | 100>(20);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const volumeRef = useRef<HTMLInputElement>(null);
  const chartWrapRef = useRef<HTMLDivElement>(null);
  const persistInputsRef = useRef(debounce((inp: EstimatorInputs) => saveInputs(inp), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setInputs((p) => ({ ...p, ...shared }));
    } else {
      const saved = loadInputs();
      if (saved) setInputs(saved);
      else volumeRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  const runRef = useRef(debounce((inp: EstimatorInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculateEstimate(inp));
  }, 150));

  useEffect(() => { runRef.current(inputs); }, [inputs]);

  useEffect(() => {
    persistInputsRef.current(inputs);
  }, [inputs]);

  const set = <K extends keyof EstimatorInputs>(field: K, val: EstimatorInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleAnchorChange = (pos: number, ctr: number) => {
    setInputs((p) => ({
      ...p,
      customAnchors: p.customAnchors.map((a) => (a.pos === pos ? { ...a, ctr } : a)),
    }));
  };

  const handleEnter = () => {
    const errs = validateInputs(inputs);
    if (errs.searchVolume) { volumeRef.current?.focus(); return; }
    runRef.current(inputs);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    volumeRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Estimated CTR: ${formatPercent(result.currentCTR, 2)} · Monthly Clicks: ${formatNumber(result.currentMonthlyClicks)}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTable = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildCSVReport(result, inputs));
    setCsvCopied(true); setTimeout(() => setCsvCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `serp-ctr-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `serp-ctr-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadPng = () => {
    exportCanvasAsPng(chartWrapRef.current, `serp-ctr-curve-${Date.now()}.png`);
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

  const setPositionFromHeatmap = (pos: number) => {
    if (inputs.targetEnabled) set("targetPosition", pos);
    else set("currentPosition", pos);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Estimation settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>Estimation Settings</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="sce-dataset">CTR Dataset</label>
              <select id="sce-dataset" value={inputs.dataset} onChange={(e) => set("dataset", e.target.value as Dataset)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium">
                {DATASET_ORDER.map((d) => <option key={d} value={d}>{DATASET_META[d].label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="sce-device">Device Type</label>
              <select id="sce-device" value={inputs.device} onChange={(e) => set("device", e.target.value as DeviceType)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium">
                {DEVICE_ORDER.map((d) => <option key={d} value={d}>{DEVICE_META[d].label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="sce-intent">Search Intent (Optional)</label>
              <select id="sce-intent" value={inputs.intent} onChange={(e) => set("intent", e.target.value as Intent)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium">
                {INTENT_ORDER.map((i) => <option key={i} value={i}>{INTENT_META[i].label}</option>)}
              </select>
            </div>
          </div>

          {inputs.dataset === "custom" && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-600 mb-2" title="Set your own CTR percentage for each anchor position — values between are interpolated automatically.">
                Custom CTR by Position (%) <span className="text-gray-400 font-normal">— hover for tips</span>
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
                {CUSTOM_ANCHOR_POSITIONS.map((pos) => {
                  const anchor = inputs.customAnchors.find((a) => a.pos === pos) as Anchor;
                  return (
                    <div key={pos}>
                      <label className="block text-[10px] text-gray-400 mb-0.5" htmlFor={`sce-anchor-${pos}`}>#{pos}</label>
                      <input
                        id={`sce-anchor-${pos}`} type="number" min="0.01" max="100" step="0.01"
                        value={anchor?.ctr ?? 0}
                        onChange={(e) => handleAnchorChange(pos, parseNum(e.target.value))}
                        className="w-full px-1.5 py-1.5 border border-gray-200 rounded-md text-xs font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  );
                })}
              </div>
              {errors.customAnchors && <p className="text-xs text-red-600 mt-2" role="alert">{errors.customAnchors}</p>}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Ranking Data</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sce-volume">Monthly Search Volume</label>
                <input
                  ref={volumeRef}
                  id="sce-volume" type="number" min="1" max="100000000" inputMode="numeric"
                  value={inputs.searchVolume || ""}
                  onChange={(e) => set("searchVolume", parseNum(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                  placeholder="1000"
                  aria-invalid={!!errors.searchVolume}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.searchVolume ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.searchVolume && <p className="text-xs text-red-600 mt-1" role="alert">{errors.searchVolume}</p>}
                {!errors.searchVolume && <p className="text-xs text-gray-400 mt-1">Average monthly searches for this keyword.</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="sce-position">Current Google Position</label>
                  <span className="text-sm font-mono font-semibold text-primary">#{inputs.currentPosition}</span>
                </div>
                <select id="sce-position" value={inputs.currentPosition} onChange={(e) => set("currentPosition", parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white mb-2">
                  {POSITIONS.map((p) => <option key={p} value={p}>Position {p}</option>)}
                </select>
                <input
                  type="range" min="1" max="100" step="1" value={inputs.currentPosition}
                  onChange={(e) => set("currentPosition", parseInt(e.target.value, 10))}
                  aria-label="Current position slider"
                  className="w-full accent-primary"
                />
                {errors.currentPosition && <p className="text-xs text-red-600 mt-1" role="alert">{errors.currentPosition}</p>}
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">Target Position</p>
                  <p className="text-xs text-gray-400">Compare traffic against a target ranking</p>
                </div>
                <button type="button" role="switch" aria-checked={inputs.targetEnabled}
                  onClick={() => set("targetEnabled", !inputs.targetEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.targetEnabled ? "bg-primary" : "bg-gray-200"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${inputs.targetEnabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {inputs.targetEnabled && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="sce-target">Target Google Position</label>
                    <span className="text-sm font-mono font-semibold text-amber-600">#{inputs.targetPosition}</span>
                  </div>
                  <select id="sce-target" value={inputs.targetPosition} onChange={(e) => set("targetPosition", parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white mb-2">
                    {POSITIONS.map((p) => <option key={p} value={p}>Position {p}</option>)}
                  </select>
                  <input
                    type="range" min="1" max="100" step="1" value={inputs.targetPosition}
                    onChange={(e) => set("targetPosition", parseInt(e.target.value, 10))}
                    aria-label="Target position slider"
                    className="w-full accent-amber-500"
                  />
                  {errors.targetPosition && <p className="text-xs text-red-600 mt-1" role="alert">{errors.targetPosition}</p>}
                </div>
              )}

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
                Estimated CTR — Position #{inputs.currentPosition}
              </p>
              {result ? (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Estimated CTR</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{formatPercent(result.currentCTR, 2)}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Monthly Clicks</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{formatNumber(result.currentMonthlyClicks)}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Annual Clicks</p>
                      <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">{formatNumber(result.currentAnnualClicks)}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-primary-100">CTR Dataset Used</span>
                      <span className="font-semibold">{DATASET_META[inputs.dataset].short} · {DEVICE_META[inputs.device].label}</span>
                    </div>
                    {inputs.targetEnabled && result.targetCTR !== null && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-primary-100">Target CTR (Position #{inputs.targetPosition})</span>
                          <span className="font-semibold font-mono">{formatPercent(result.targetCTR, 2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-100">Traffic Difference</span>
                          <span className="font-semibold font-mono">{(result.trafficDifference ?? 0) >= 0 ? "+" : ""}{formatNumber(result.trafficDifference ?? 0)} clicks/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-100">Traffic Change</span>
                          <span className="font-semibold font-mono">{(result.trafficIncreasePercent ?? 0) >= 0 ? "+" : ""}{formatPercent(result.trafficIncreasePercent ?? 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-100">Ranking Improvement Needed</span>
                          <span className="font-semibold font-mono">{result.rankingImprovementNeeded} position{Math.abs(result.rankingImprovementNeeded ?? 0) === 1 ? "" : "s"}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-primary-100 bg-white/10 rounded-lg px-3 py-2 mb-4 leading-relaxed">💡 {result.insight}</p>

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
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter your search volume and position to see estimated CTR."}
                </p>
              )}
            </div>

            {/* Traffic opportunity comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Traffic Opportunity</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${OPPORTUNITY_STYLES[result.opportunityLabel]}`} title="Opportunity Score reflects how much traffic you're missing compared to Position 1.">
                      Opportunity: {result.opportunityLabel} ({result.opportunityScore}/100)
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200" title="Visibility Score reflects the share of maximum possible clicks you're currently capturing.">
                      Visibility: {result.visibilityScore}/100
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "Position 1 Potential", clicks: result.position1MonthlyClicks, color: "bg-gray-300" },
                    { label: `Current (#${inputs.currentPosition})`, clicks: result.currentMonthlyClicks, color: "bg-primary" },
                    ...(inputs.targetEnabled && result.targetMonthlyClicks !== null
                      ? [{ label: `Target (#${inputs.targetPosition})`, clicks: result.targetMonthlyClicks, color: "bg-amber-400" }]
                      : []),
                  ].map(({ label, clicks, color }) => {
                    const max = result.position1MonthlyClicks || 1;
                    return (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{label}</span>
                          <span className="text-sm font-semibold font-mono text-gray-800">{formatNumber(clicks)} clicks/mo</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(100, (clicks / max) * 100)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-xs text-gray-500 pt-2 border-t border-gray-50">
                    Estimated lost traffic vs. Position 1: <strong className="text-gray-700">{formatNumber(result.lostClicks)} clicks/mo ({formatPercent(result.lostPercent)})</strong>
                  </p>
                </div>
              </div>
            )}

            {/* CTR curve chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>CTR Curve by Position</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs">
                      <button onClick={() => setChartRange(20)} className={`px-2.5 py-1 font-medium transition-colors ${chartRange === 20 ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Top 20</button>
                      <button onClick={() => setChartRange(100)} className={`px-2.5 py-1 font-medium transition-colors ${chartRange === 100 ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Full 100</button>
                    </div>
                    <button onClick={handleDownloadPng} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download PNG</button>
                  </div>
                </div>
                <div ref={chartWrapRef}>
                  <CTRCurveChart
                    curve={result.effectiveCurve}
                    range={chartRange}
                    currentPosition={inputs.currentPosition}
                    targetPosition={inputs.targetEnabled ? inputs.targetPosition : null}
                  />
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Current Position</span>
                  {inputs.targetEnabled && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Target Position</span>}
                </div>
              </div>
            )}

            {/* SERP position heatmap */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>SERP Position Heatmap</h3>
                  <p className="text-xs text-gray-400">Darker = higher CTR · click a cell to set {inputs.targetEnabled ? "target" : "current"} position</p>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {result.effectiveCurve.map((ctr, idx) => {
                    const pos = idx + 1;
                    const intensity = Math.max(0, Math.min(1, ctr / (result.effectiveCurve[0] || 1)));
                    const isCurrent = pos === inputs.currentPosition;
                    const isTarget = inputs.targetEnabled && pos === inputs.targetPosition;
                    return (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setPositionFromHeatmap(pos)}
                        title={`Position ${pos}: ${formatPercent(ctr, 2)} CTR`}
                        aria-label={`Position ${pos}, ${formatPercent(ctr, 2)} estimated CTR`}
                        style={{ backgroundColor: `rgba(5, 133, 84, ${0.08 + intensity * 0.85})` }}
                        className={`aspect-square rounded-sm text-[9px] font-mono flex items-center justify-center transition-transform hover:scale-110 ${
                          isCurrent ? "ring-2 ring-blue-600" : isTarget ? "ring-2 ring-amber-500" : ""
                        } ${intensity > 0.4 ? "text-white" : "text-gray-500"}`}
                      >
                        {pos}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTR lookup table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowTable(!showTable)} className="w-full p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between text-left">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>CTR Lookup Table (Position 1–100)</h3>
                  <span className="text-xs text-gray-500">{showTable ? "Hide ▲" : "Show ▼"}</span>
                </button>
                {showTable && (
                  <>
                    <div className="max-h-80 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-white">
                          <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
                            <th className="px-5 py-2 font-medium">Position</th>
                            <th className="px-5 py-2 font-medium">CTR</th>
                            <th className="px-5 py-2 font-medium">Est. Monthly Clicks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {result.effectiveCurve.map((ctr, idx) => {
                            const pos = idx + 1;
                            const isCurrent = pos === inputs.currentPosition;
                            const isTarget = inputs.targetEnabled && pos === inputs.targetPosition;
                            return (
                              <tr key={pos} className={`hover:bg-gray-50 ${isCurrent ? "bg-primary/5" : isTarget ? "bg-amber-50" : ""}`}>
                                <td className="px-5 py-2 text-gray-600">#{pos} {isCurrent && <span className="text-primary text-xs font-semibold">(current)</span>} {isTarget && <span className="text-amber-600 text-xs font-semibold">(target)</span>}</td>
                                <td className="px-5 py-2 font-mono text-gray-700">{formatPercent(ctr, 2)}</td>
                                <td className="px-5 py-2 font-mono font-semibold text-gray-900">{formatNumber(Math.round(inputs.searchVolume * (ctr / 100)))}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3 border-t border-gray-100">
                      <button onClick={handleCopyTable} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                        {csvCopied ? "✓ Copied!" : "Copy Table as CSV"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Glossary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>SEO Metric Glossary</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["CTR (Click-Through Rate)", "The percentage of searchers who click your result out of everyone who saw it in the SERP for that query."],
                  ["Opportunity Score", "How much traffic you're missing versus the Position 1 potential for this dataset — higher means more room to grow."],
                  ["Visibility Score", "The share of the maximum possible clicks (Position 1) that your current ranking is capturing."],
                  ["SERP Feature", "Non-organic elements like featured snippets, People Also Ask, or ads that can reduce organic CTR even at high positions."],
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
                          Position #{entry.inputs.currentPosition} — {formatPercent(entry.result.currentCTR, 2)} CTR
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {formatNumber(entry.result.currentMonthlyClicks)} clicks/mo · {DATASET_META[entry.inputs.dataset].short}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <SERPCTREstimatorSEO />

      <RelatedTools
        currentTool="serp-ctr-estimator"
        tools={[
          "ctr-calculator",
          "keyword-density-calculator-seo",
          "seo-score-calculator",
          "domain-authority-estimator",
          "traffic-growth-calculator",
          "backlink-ratio-calculator",
        ]}
      />
    </>
  );
}
