"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateSampleSize, buildSensitivityData, debounce, formatInt, formatNum, trimNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  CONFIDENCE_LEVELS, PRESETS,
  DEFAULT_POPULATION, DEFAULT_IS_INFINITE, DEFAULT_CONFIDENCE, DEFAULT_MARGIN, DEFAULT_PROPORTION, DEFAULT_DEFF, DEFAULT_SIDED,
  type Sidedness, type SampleSizeInputs, type SampleSizeResult, type HistoryEntry,
} from "./logic";
import { SensitivityChart } from "./chart";
import SampleSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SampleSizeCalculatorUI() {
  const [population, setPopulation] = useState(String(DEFAULT_POPULATION));
  const [isInfinite, setIsInfinite] = useState(DEFAULT_IS_INFINITE);
  const [confidenceLevel, setConfidenceLevel] = useState(DEFAULT_CONFIDENCE);
  const [marginOfError, setMarginOfError] = useState(String(DEFAULT_MARGIN));
  const [proportion, setProportion] = useState(DEFAULT_PROPORTION);
  const [deff, setDeff] = useState(String(DEFAULT_DEFF));
  const [sided, setSided] = useState<Sidedness>(DEFAULT_SIDED);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showCI, setShowCI] = useState(true);

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: SampleSizeInputs; n: number } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: SampleSizeInputs; n: number } | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const buildInputs = useCallback((): SampleSizeInputs => ({
    population: parseFloat(population),
    isInfinite,
    confidenceLevel,
    marginOfError: parseFloat(marginOfError),
    proportion,
    deff: parseFloat(deff),
    sided,
  }), [population, isInfinite, confidenceLevel, marginOfError, proportion, deff, sided]);

  const [result, setResult] = useState<SampleSizeResult>(() => calculateSampleSize(buildInputs()));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setPopulation(String(shared.population));
      setIsInfinite(shared.isInfinite);
      setConfidenceLevel(shared.confidenceLevel);
      setMarginOfError(String(shared.marginOfError));
      setProportion(shared.proportion);
      setDeff(String(shared.deff));
      setSided(shared.sided);
    } else {
      firstInputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compute = useCallback(
    debounce((inputs: SampleSizeInputs) => { setResult(calculateSampleSize(inputs)); }, 150),
    []
  );

  useEffect(() => { compute(buildInputs()); }, [buildInputs, compute]);

  const handleReset = () => {
    setPopulation(String(DEFAULT_POPULATION));
    setIsInfinite(DEFAULT_IS_INFINITE);
    setConfidenceLevel(DEFAULT_CONFIDENCE);
    setMarginOfError(String(DEFAULT_MARGIN));
    setProportion(DEFAULT_PROPORTION);
    setDeff(String(DEFAULT_DEFF));
    setSided(DEFAULT_SIDED);
    firstInputRef.current?.focus();
  };

  const handlePreset = (preset: (typeof PRESETS)[number]) => {
    setPopulation(String(preset.population));
    setIsInfinite(preset.isInfinite);
    setConfidenceLevel(preset.confidenceLevel);
    setMarginOfError(String(preset.marginOfError));
    setProportion(preset.proportion);
    setDeff(String(preset.deff));
    setSided(preset.sided);
  };

  const handleApplyInfiniteSuggestion = () => setIsInfinite(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "sample-size-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([buildTextReport(result)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "sample-size-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "sample-size-data.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(result.inputs));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory(result); setHistory(getHistory());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      compute(buildInputs());
    }
  };

  const populationNum = parseFloat(population);
  const marginNum = parseFloat(marginOfError) || 0;
  const showInfiniteSuggestion = !isInfinite && Number.isFinite(populationNum) && populationNum > 1000000;
  const showConfidenceWarning = confidenceLevel > 99;
  const showSmallPopulationNote = !isInfinite && Number.isFinite(populationNum) && populationNum > 0 && populationNum < 50;

  const maxSnapN = Math.max(snapA?.n ?? 0, snapB?.n ?? 0) || 1;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6" onKeyDown={handleKeyDown}>

        {/* Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 flex-shrink-0">Smart presets:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePreset(preset)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors"
              >
                {preset.icon} {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ssc-population">
                  Population Size
                </label>
                <input
                  ref={firstInputRef}
                  id="ssc-population"
                  type="number"
                  min={1}
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  disabled={isInfinite}
                  placeholder="10000"
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono disabled:bg-gray-50 disabled:text-gray-400"
                />
                <label className="flex items-center gap-2 mt-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={isInfinite} onChange={(e) => setIsInfinite(e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary" />
                  Population is very large (Infinite Population)
                </label>

                {result.populationError && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-2">{result.populationError}</p>
                )}
                {showInfiniteSuggestion && (
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <span>Population exceeds 1,000,000 — consider using Infinite Population.</span>
                    <button type="button" onClick={handleApplyInfiniteSuggestion} className="font-semibold underline flex-shrink-0">Apply</button>
                  </div>
                )}
                {showSmallPopulationNote && (
                  <p className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mt-2">
                    Population is small — consider surveying the entire population instead of sampling.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ssc-confidence" title="How confident you are that the true population value falls within your margin of error.">
                    Confidence Level
                  </label>
                  <select
                    id="ssc-confidence"
                    value={confidenceLevel}
                    onChange={(e) => setConfidenceLevel(parseFloat(e.target.value))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  >
                    {CONFIDENCE_LEVELS.map((cl) => <option key={cl} value={cl}>{cl}%</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ssc-margin" title="The maximum acceptable difference between your sample result and the true population value.">
                    Margin of Error (%)
                  </label>
                  <input
                    id="ssc-margin"
                    type="number"
                    step="0.1"
                    min={0.1}
                    max={20}
                    value={marginOfError}
                    onChange={(e) => setMarginOfError(e.target.value)}
                    placeholder="5"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                  />
                </div>
              </div>

              {result.marginError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.marginError}</p>
              )}

              {/* Margin of error visualizer */}
              <div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-primary rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, (marginNum / 20) * 100))}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0.1%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700" htmlFor="ssc-proportion" title="Your best estimate of how the population is split. Use 50% if unsure — it produces the most conservative (largest) sample size.">
                    Expected Proportion
                  </label>
                  <span className="text-sm font-mono font-semibold text-primary">{proportion}%</span>
                </div>
                <input
                  id="ssc-proportion"
                  type="range"
                  min={1}
                  max={99}
                  value={proportion}
                  onChange={(e) => setProportion(parseInt(e.target.value, 10))}
                  className="w-full h-2 accent-primary cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1">50% gives the most conservative sample size. Use it if the true distribution is unknown.</p>
              </div>

              <div className="pt-1 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {showAdvanced ? "− Hide" : "+ Show"} Advanced Options
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ssc-deff" title="Multiplier that inflates the sample size for cluster or multi-stage sampling designs. Leave at 1 for simple random sampling.">
                        Design Effect (DEFF)
                      </label>
                      <input
                        id="ssc-deff"
                        type="number"
                        step="0.1"
                        min={1}
                        max={10}
                        value={deff}
                        onChange={(e) => setDeff(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ssc-sided" title="Two-sided tests check for a difference in either direction; one-sided tests check for a difference in only one direction.">
                        Test Type
                      </label>
                      <select
                        id="ssc-sided"
                        value={sided}
                        onChange={(e) => setSided(e.target.value as Sidedness)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                      >
                        <option value="two-sided">Two-sided</option>
                        <option value="one-sided">One-sided</option>
                      </select>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={showCI} onChange={(e) => setShowCI(e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary" />
                    Show Confidence Interval panel
                  </label>
                </div>
              )}

              {showConfidenceWarning && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  Confidence levels above 99% significantly increase the required sample size.
                </p>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {copied ? "✓ Copied!" : "Copy Result"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setSnapA(result.finalSampleSize !== null ? { inputs: result.inputs, n: result.finalSampleSize } : null)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as A</button>
                <button onClick={() => setSnapB(result.finalSampleSize !== null ? { inputs: result.inputs, n: result.finalSampleSize } : null)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as B</button>
              </div>
            </div>

            {/* Formula / steps */}
            {!result.populationError && !result.marginError && result.finalSampleSize !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Z = {formatNum(result.zScore, 3)} &nbsp;(from {trimNum(confidenceLevel)}% {sided === "two-sided" ? "two-sided" : "one-sided"} confidence)</p>
                  <p>n = (Z² × p × (1 − p)) ÷ E²</p>
                  <p>n = ({formatNum(result.zScore, 3)}² × {trimNum(proportion)}% × {trimNum(100 - proportion)}%) ÷ {trimNum(marginNum)}%²</p>
                  <p>n = {formatNum(result.n0, 2)} &nbsp;(infinite population)</p>
                  {parseFloat(deff) > 1 && <p>n × DEFF = {formatNum(result.n0, 2)} × {trimNum(parseFloat(deff))} = {formatNum(result.n0Deff, 2)}</p>}
                  {result.finiteApplied ? (
                    <p>n_adjusted = {formatNum(result.n0Deff, 2)} ÷ (1 + (({formatNum(result.n0Deff, 2)} − 1) ÷ {population})) = {formatNum(result.n0Deff / (1 + (result.n0Deff - 1) / populationNum), 2)}</p>
                  ) : (
                    <p>Infinite population — no finite correction applied.</p>
                  )}
                  <p className="text-gray-900 font-semibold">Required Sample Size = {formatInt(result.finalSampleSize)} (rounded up)</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Required Sample Size
              </p>
              <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">
                {formatInt(result.finalSampleSize)}
              </p>
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.75)" }}>
                {trimNum(confidenceLevel)}% confidence · ±{trimNum(marginNum)}% margin of error
              </p>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Result"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {!result.populationError && !result.marginError && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Interpretation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{result.interpretation}</p>
              </div>
            )}

            {/* Result details */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Result Details</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["Population", isInfinite ? "Infinite / Very Large" : (Number.isFinite(populationNum) ? populationNum.toLocaleString("en-US") : "—")],
                  ["Confidence Level", `${trimNum(confidenceLevel)}%`],
                  ["Margin of Error", `±${trimNum(marginNum)}%`],
                  ["Expected Proportion", `${trimNum(proportion)}%`],
                  ["Design Effect (DEFF)", trimNum(parseFloat(deff) || 1)],
                  ["Test Type", sided === "two-sided" ? "Two-sided" : "One-sided"],
                  ["Z-score Used", formatNum(result.zScore, 3)],
                  ["Finite Population Applied", result.finiteApplied ? "Yes" : "No"],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between px-4 py-2 text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-mono font-medium text-gray-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence interval panel */}
            {showCI && !result.populationError && !result.marginError && result.ciLower !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Estimated Confidence Interval</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  With this sample size, an observed proportion of {trimNum(proportion)}% would have a true population value estimated between:
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono font-semibold text-primary">{formatNum(result.ciLower, 2)}%</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full relative">
                    <div className="absolute inset-y-0 bg-primary/20 rounded-full" style={{ left: `${result.ciLower}%`, right: `${100 - (result.ciUpper ?? 0)}%` }} />
                  </div>
                  <span className="text-lg font-mono font-semibold text-primary">{formatNum(result.ciUpper, 2)}%</span>
                </div>
              </div>
            )}

            {/* Sensitivity graph */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Population Size Sensitivity</h3>
              <p className="text-xs text-gray-400 mb-3">How the required sample size changes as population grows, at your current confidence level, margin of error, and proportion.</p>
              <SensitivityChart data={buildSensitivityData(result.inputs)} currentPopulation={isInfinite ? null : populationNum} />
            </div>

            {/* Compare scenarios */}
            {(snapA || snapB) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare Scenarios</h3>
                  <button onClick={() => { setSnapA(null); setSnapB(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {([["A", snapA], ["B", snapB]] as const).map(([label, s]) => (
                    <div key={label} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Scenario {label}{s ? ` — ${trimNum(s.inputs.confidenceLevel)}% CL, ±${trimNum(s.inputs.marginOfError)}% MoE` : ""}
                        </span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? formatInt(s.n) : "— not set —"}</span>
                      </div>
                      {s && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, (s.n / maxSnapN) * 100)}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export &amp; Share</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download CSV</button>
                <button onClick={handleDownloadTXT} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download TXT</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download JSON</button>
                <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
              </div>
              <button onClick={handleShare} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                {showHistory ? "Hide" : "Show"} History
              </button>
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
                    <div
                      key={entry.id}
                      onClick={() => {
                        setPopulation(String(entry.inputs.population));
                        setIsInfinite(entry.inputs.isInfinite);
                        setConfidenceLevel(entry.inputs.confidenceLevel);
                        setMarginOfError(String(entry.inputs.marginOfError));
                        setProportion(entry.inputs.proportion);
                        setDeff(String(entry.inputs.deff));
                        setSided(entry.inputs.sided);
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">n = {formatInt(entry.finalSampleSize)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">
                        {entry.inputs.isInfinite ? "Infinite" : entry.inputs.population.toLocaleString("en-US")} pop · {trimNum(entry.inputs.confidenceLevel)}% CL · ±{trimNum(entry.inputs.marginOfError)}% MoE
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <SampleSizeCalculatorSEO />

      <RelatedTools
        currentTool="sample-size-calculator"
        tools={[
          "confidence-interval-calculator",
          "a-b-test-calculator",
          "p-value-calculator",
          "standard-deviation-calculator",
          "mean-calculator",
          "z-score-calculator",
        ]}
      />
    </>
  );
}
