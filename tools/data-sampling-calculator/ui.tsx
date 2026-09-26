"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateSampleSize, isSampleSizeError, confidenceComparisonTable, marginSensitivityTable,
  formatNum, debounce, saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  SAMPLE_PRESETS, CONFIDENCE_LEVELS,
  type ConfidenceLevel, type SampleSizeResult, type HistoryEntry, type SavedInput,
} from "./logic";
import { SampleSizeSensitivityChart } from "./chart";
import DataSamplingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function DataSamplingCalculatorUI() {
  const [population, setPopulation] = useState("10000");
  const [infinitePopulation, setInfinitePopulation] = useState(false);
  const [confidence, setConfidence] = useState<ConfidenceLevel>(95);
  const [marginOfError, setMarginOfError] = useState(5);
  const [proportion, setProportion] = useState(50);
  const [decimals, setDecimals] = useState(0);

  const [result, setResult] = useState<SampleSizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showSamples, setShowSamples] = useState(false);

  const currentInput = (): SavedInput => ({ population, infinitePopulation, confidence, marginOfError, proportion, decimals });

  const runRef = useRef(debounce((input: SavedInput) => {
    const pop = input.infinitePopulation ? null : (parseFloat(input.population) || 0);
    const r = calculateSampleSize(pop, input.confidence, input.marginOfError, input.proportion, input.decimals);
    if (isSampleSizeError(r)) { setResult(null); setError(r.error); }
    else { setError(null); setResult(r); }
  }, 150));

  const persistRef = useRef(debounce((data: SavedInput) => saveInput(data), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    const saved = loadInput();
    const initial = shared ?? saved;
    if (initial) {
      setPopulation(initial.population); setInfinitePopulation(initial.infinitePopulation);
      setConfidence(initial.confidence); setMarginOfError(initial.marginOfError);
      setProportion(initial.proportion); setDecimals(initial.decimals);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const input = currentInput();
    runRef.current(input);
    persistRef.current(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [population, infinitePopulation, confidence, marginOfError, proportion, decimals]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "c" && result) {
        handleCopy();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleReset = () => {
    setPopulation("10000"); setInfinitePopulation(false); setConfidence(95);
    setMarginOfError(5); setProportion(50); setDecimals(0);
  };

  const handleLoadPreset = (p: (typeof SAMPLE_PRESETS)[number]) => {
    setPopulation(p.population); setInfinitePopulation(p.infinitePopulation);
    setConfidence(p.confidence); setMarginOfError(p.marginOfError); setProportion(p.proportion);
    setShowSamples(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(String(result.sampleSize));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(currentInput()));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "sample-size-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "sample-size-report.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result));
    win.document.close();
    win.print();
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input: currentInput(), sampleSize: result.sampleSize });
    setHistory(getHistory());
  };

  const popForTables = infinitePopulation ? null : (parseFloat(population) || 0);
  const confidenceTable = result ? confidenceComparisonTable(popForTables, marginOfError, proportion) : [];
  const marginTable = result ? marginSensitivityTable(popForTables, confidence, proportion) : [];

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Sample Size Inputs</h3>
                <button onClick={() => setShowSamples(!showSamples)} className="text-xs text-primary font-medium hover:underline">🎲 Examples</button>
              </div>
              {showSamples && (
                <div className="absolute top-10 right-5 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  {SAMPLE_PRESETS.map((s) => (
                    <button key={s.name} onClick={() => handleLoadPreset(s)} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">{s.name}</button>
                  ))}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="ds-population" className="text-xs font-medium text-gray-600">Population Size</label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-500">
                    <input type="checkbox" checked={infinitePopulation} onChange={(e) => setInfinitePopulation(e.target.checked)} className="accent-primary" />
                    Infinite Population
                  </label>
                </div>
                <input id="ds-population" type="number" min={1} value={population} disabled={infinitePopulation}
                  onChange={(e) => setPopulation(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono disabled:bg-gray-50 disabled:text-gray-400" />
              </div>

              <div>
                <label htmlFor="ds-confidence" className="block text-xs font-medium text-gray-600 mb-1">Confidence Level</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {CONFIDENCE_LEVELS.map((c) => (
                    <button key={c} type="button" onClick={() => setConfidence(c)}
                      className={`px-2 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                        confidence === c ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}>
                      {c}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="ds-margin" className="block text-xs font-medium text-gray-600 mb-1">Margin of Error (%)</label>
                <input id="ds-margin" type="number" min={0.1} max={20} step={0.1} value={marginOfError}
                  onChange={(e) => setMarginOfError(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="ds-proportion" className="text-xs font-medium text-gray-600">Expected Proportion</label>
                  <span className="text-xs font-mono font-semibold text-primary">{proportion}%</span>
                </div>
                <input id="ds-proportion" type="range" min={1} max={99} step={1} value={proportion}
                  onChange={(e) => setProportion(parseInt(e.target.value, 10))} className="w-full accent-primary" />
              </div>

              <div>
                <label htmlFor="ds-precision" className="block text-xs font-medium text-gray-600 mb-1">Decimal Precision</label>
                <select id="ds-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                  {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">{error}</p>}

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+C</kbd> to copy the sample size</p>

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {/* Formula breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Z = {result.z} (for {result.confidence}% confidence)</p>
                  <p>e = {result.marginOfError}%, p = {result.proportion}%, q = {100 - result.proportion}%</p>
                  <p>n₀ = (Z² × p × q) ÷ e² = {formatNum(result.n0, result.decimals)}</p>
                  {result.finiteCorrectionApplied && (
                    <p>n = n₀ ÷ (1 + ((n₀ − 1) ÷ N)) = {formatNum(result.sampleSize)}</p>
                  )}
                  <p className="text-gray-900 font-semibold">Required Sample Size = {formatNum(result.sampleSize)}</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Required Sample Size</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <span className="text-4xl font-bold font-mono tabular-nums">{formatNum(result.sampleSize)}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20">Statistically Valid</span>
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    {result.confidence}% confidence · {result.marginOfError}% margin of error · {result.population !== null ? `Population ${formatNum(result.population)}` : "Infinite population"}
                  </p>
                  <div className="space-y-2">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Sample Size"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleCopyReport} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Report</button>
                      <button onClick={handleShare} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter your population, confidence level, and margin of error to calculate sample size.</p>
              )}
            </div>

            {/* Sensitivity chart */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Margin of Error Sensitivity</h3>
                </div>
                <div className="p-5">
                  <SampleSizeSensitivityChart rows={marginTable} currentMargin={marginOfError} />
                </div>
              </div>
            )}

            {/* Confidence comparison table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Confidence Level Comparison</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {confidenceTable.map((row) => (
                    <div key={row.confidence} className={`flex items-center justify-between px-4 py-2.5 text-sm ${row.confidence === confidence ? "bg-primary/5" : ""}`}>
                      <span className="font-medium text-gray-600">{row.confidence}% Confidence</span>
                      <span className="font-mono font-semibold text-gray-800">{formatNum(row.sampleSize)} respondents</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
              <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
              <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download JSON</button>
              <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Print Report</button>
              <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors ml-auto">{showHistory ? "Hide" : "Show"} History</button>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recent Calculations</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => {
                      const i = entry.input;
                      setPopulation(i.population); setInfinitePopulation(i.infinitePopulation);
                      setConfidence(i.confidence); setMarginOfError(i.marginOfError); setProportion(i.proportion);
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">n = {formatNum(entry.sampleSize)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.input.confidence}% confidence · {entry.input.marginOfError}% margin</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedStrip />
      <DataSamplingCalculatorSEO />

      <RelatedTools />
    </>
  );
}
