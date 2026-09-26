"use client";

import { useState, useEffect, useCallback } from "react";
import {
  calcMeanKnown, calcMeanUnknown, calcProportion, calcMarginOfError, calcSampleSize,
  debounce, formatNum, CONFIDENCE_PRESETS, PRECISION_OPTIONS, DEFAULT_PRECISION, PRESETS,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  type CalcType, type MoeBasis, type SampleSizeBasis, type CIResult, type HistoryEntry,
} from "./logic";
import ConfidenceIntervalCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const CALC_TYPES: { key: CalcType; label: string }[] = [
  { key: "mean-known", label: "Mean (Known σ)" },
  { key: "mean-unknown", label: "Mean (Unknown σ)" },
  { key: "proportion", label: "Proportion" },
  { key: "margin-of-error", label: "Margin of Error" },
  { key: "sample-size", label: "Sample Size" },
];

export default function ConfidenceIntervalCalculatorUI() {
  const [calcType, setCalcType] = useState<CalcType>("mean-unknown");
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [customConfidence, setCustomConfidence] = useState("");
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [sampleMean, setSampleMean] = useState(String(PRESETS["mean-unknown"].sampleMean));
  const [popStdDev, setPopStdDev] = useState(String(PRESETS["mean-known"].popStdDev));
  const [sampleStdDev, setSampleStdDev] = useState(String(PRESETS["mean-unknown"].sampleStdDev));
  const [sampleProportion, setSampleProportion] = useState(String(PRESETS.proportion.sampleProportion));
  const [sampleSize, setSampleSize] = useState(String(PRESETS["mean-unknown"].sampleSize));

  const [moeBasis, setMoeBasis] = useState<MoeBasis>("mean-unknown");
  const [ssBasis, setSsBasis] = useState<SampleSizeBasis>("proportion");
  const [marginOfErrorInput, setMarginOfErrorInput] = useState(String(PRESETS["sample-size"].marginOfError));

  const [result, setResult] = useState<CIResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setCalcType(shared.calcType);
      setConfidenceLevel(shared.confidenceLevel);
      setPrecision(shared.precision);
      if (shared.sampleMean) setSampleMean(shared.sampleMean);
      if (shared.popStdDev) setPopStdDev(shared.popStdDev);
      if (shared.sampleStdDev) setSampleStdDev(shared.sampleStdDev);
      if (shared.sampleProportion) setSampleProportion(shared.sampleProportion);
      if (shared.sampleSize) setSampleSize(shared.sampleSize);
      setMoeBasis(shared.moeBasis);
      setSsBasis(shared.ssBasis);
      if (shared.marginOfErrorInput) setMarginOfErrorInput(shared.marginOfErrorInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compute = useCallback(
    debounce((
      ct: CalcType, cl: number, mean: string, popsd: string, samplesd: string, prop: string, n: string,
      moeB: MoeBasis, ssB: SampleSizeBasis, moeInput: string
    ) => {
      const nNum = parseInt(n, 10);
      if (ct === "mean-known") {
        setResult(calcMeanKnown({ sampleMean: parseFloat(mean), popStdDev: parseFloat(popsd), sampleSize: nNum, confidenceLevel: cl }));
      } else if (ct === "mean-unknown") {
        setResult(calcMeanUnknown({ sampleMean: parseFloat(mean), sampleStdDev: parseFloat(samplesd), sampleSize: nNum, confidenceLevel: cl }));
      } else if (ct === "proportion") {
        setResult(calcProportion({ sampleProportion: parseFloat(prop), sampleSize: nNum, confidenceLevel: cl }));
      } else if (ct === "margin-of-error") {
        setResult(calcMarginOfError({ basis: moeB, stdDev: moeB === "mean-known" ? parseFloat(popsd) : parseFloat(samplesd), proportion: parseFloat(prop), sampleSize: nNum, confidenceLevel: cl }));
      } else {
        setResult(calcSampleSize({ basis: ssB, marginOfError: parseFloat(moeInput), stdDev: parseFloat(popsd), proportion: parseFloat(prop), confidenceLevel: cl }));
      }
    }, 150),
    []
  );

  useEffect(() => {
    compute(calcType, confidenceLevel, sampleMean, popStdDev, sampleStdDev, sampleProportion, sampleSize, moeBasis, ssBasis, marginOfErrorInput);
  }, [calcType, confidenceLevel, sampleMean, popStdDev, sampleStdDev, sampleProportion, sampleSize, moeBasis, ssBasis, marginOfErrorInput, compute]);

  const handlePreset = () => {
    if (calcType === "mean-known") { const p = PRESETS["mean-known"]; setSampleMean(String(p.sampleMean)); setPopStdDev(String(p.popStdDev)); setSampleSize(String(p.sampleSize)); setConfidenceLevel(p.confidenceLevel); }
    else if (calcType === "mean-unknown") { const p = PRESETS["mean-unknown"]; setSampleMean(String(p.sampleMean)); setSampleStdDev(String(p.sampleStdDev)); setSampleSize(String(p.sampleSize)); setConfidenceLevel(p.confidenceLevel); }
    else if (calcType === "proportion") { const p = PRESETS.proportion; setSampleProportion(String(p.sampleProportion)); setSampleSize(String(p.sampleSize)); setConfidenceLevel(p.confidenceLevel); }
    else if (calcType === "margin-of-error") { const p = PRESETS["margin-of-error"]; setSampleStdDev(String(p.stdDev)); setSampleProportion(String(p.proportion)); setSampleSize(String(p.sampleSize)); setConfidenceLevel(p.confidenceLevel); }
    else { const p = PRESETS["sample-size"]; setMarginOfErrorInput(String(p.marginOfError)); setPopStdDev(String(p.stdDev)); setSampleProportion(String(p.proportion)); setConfidenceLevel(p.confidenceLevel); }
    setCustomConfidence("");
  };

  const handleReset = () => {
    setSampleMean(""); setPopStdDev(""); setSampleStdDev(""); setSampleProportion(""); setSampleSize("");
    setMarginOfErrorInput(""); setConfidenceLevel(95); setCustomConfidence(""); setPrecision(DEFAULT_PRECISION);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, precision)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "confidence-interval-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "confidence-interval-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "confidence-interval-report.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
    w.document.close(); w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl({
      calcType, confidenceLevel, precision, sampleMean, popStdDev, sampleStdDev, sampleProportion, sampleSize,
      moeBasis, ssBasis, marginOfErrorInput,
    }));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(result, precision); setHistory(getHistory());
  };

  const isCI = calcType === "mean-known" || calcType === "mean-unknown" || calcType === "proportion";
  const isMoe = calcType === "margin-of-error";
  const isSS = calcType === "sample-size";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Confidence Interval Calculator</p>
          <p className="text-xs text-gray-400 font-mono">CI = x̄ ± Critical Value × Standard Error</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex flex-wrap gap-1.5">
          {CALC_TYPES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCalcType(c.key)}
              className={`flex-1 min-w-[120px] py-2.5 rounded-lg text-sm font-medium transition-colors ${calcType === c.key ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>
                <button onClick={handlePreset} className="text-xs font-medium text-primary hover:underline">Load Example</button>
              </div>

              {(calcType === "mean-known" || calcType === "mean-unknown") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-mean">Sample Mean (x̄)</label>
                  <input id="cic-mean" type="number" value={sampleMean} onChange={(e) => setSampleMean(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {calcType === "mean-known" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-popsd">Population Standard Deviation (σ)</label>
                  <input id="cic-popsd" type="number" value={popStdDev} onChange={(e) => setPopStdDev(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {calcType === "mean-unknown" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-samplesd">Sample Standard Deviation (s)</label>
                  <input id="cic-samplesd" type="number" value={sampleStdDev} onChange={(e) => setSampleStdDev(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {calcType === "proportion" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-prop">Sample Proportion (0–1)</label>
                  <input id="cic-prop" type="number" step="0.01" min="0" max="1" value={sampleProportion} onChange={(e) => setSampleProportion(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {isMoe && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Basis</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {([["mean-known", "Known σ"], ["mean-unknown", "Sample s"], ["proportion", "Proportion"]] as [MoeBasis, string][]).map(([key, label]) => (
                        <button key={key} type="button" onClick={() => setMoeBasis(key)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${moeBasis === key ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {moeBasis === "proportion" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-moe-prop">Sample Proportion (0–1)</label>
                      <input id="cic-moe-prop" type="number" step="0.01" min="0" max="1" value={sampleProportion} onChange={(e) => setSampleProportion(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-moe-sd">{moeBasis === "mean-known" ? "Population Standard Deviation (σ)" : "Sample Standard Deviation (s)"}</label>
                      <input id="cic-moe-sd" type="number" value={moeBasis === "mean-known" ? popStdDev : sampleStdDev} onChange={(e) => (moeBasis === "mean-known" ? setPopStdDev(e.target.value) : setSampleStdDev(e.target.value))}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                  )}
                </>
              )}

              {isSS && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Basis</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {([["proportion", "Proportion"], ["mean", "Mean (σ)"]] as [SampleSizeBasis, string][]).map(([key, label]) => (
                        <button key={key} type="button" onClick={() => setSsBasis(key)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${ssBasis === key ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-ss-moe">Target Margin of Error (E)</label>
                    <input id="cic-ss-moe" type="number" step="0.01" value={marginOfErrorInput} onChange={(e) => setMarginOfErrorInput(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  {ssBasis === "proportion" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-ss-prop">Estimated Proportion (0–1, default 0.5)</label>
                      <input id="cic-ss-prop" type="number" step="0.01" min="0" max="1" value={sampleProportion} onChange={(e) => setSampleProportion(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-ss-sd">Estimated Standard Deviation (σ)</label>
                      <input id="cic-ss-sd" type="number" value={popStdDev} onChange={(e) => setPopStdDev(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    </div>
                  )}
                </>
              )}

              {!isSS && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-n">Sample Size (n)</label>
                  <input id="cic-n" type="number" min="1" step="1" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Confidence Level</label>
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {CONFIDENCE_PRESETS.map((c) => (
                    <button key={c} type="button" onClick={() => { setConfidenceLevel(c); setCustomConfidence(""); }}
                      className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${confidenceLevel === c && customConfidence === "" ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                      {c}%
                    </button>
                  ))}
                </div>
                <input type="number" min="0.01" max="99.99" step="0.01" placeholder="Custom confidence level %"
                  value={customConfidence}
                  onChange={(e) => { setCustomConfidence(e.target.value); const v = parseFloat(e.target.value); if (Number.isFinite(v)) setConfidenceLevel(v); }}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cic-precision">Decimal Precision</label>
                <select id="cic-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimals</option>)}
                </select>
              </div>

              {result?.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {/* Formula / steps */}
            {result && !result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Formula Breakdown</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  {isCI && (
                    <>
                      <p>CI = {result.center !== null ? formatNum(result.center, precision) : "?"} ± {result.criticalValueType} × ({formatNum(result.standardError, precision)})</p>
                      <p>CI = {result.center !== null ? formatNum(result.center, precision) : "?"} ± {formatNum(result.criticalValue, precision)} × {formatNum(result.standardError, precision)}</p>
                      <p>CI = {result.center !== null ? formatNum(result.center, precision) : "?"} ± {formatNum(result.marginOfError, precision)}</p>
                      <p className="text-gray-900 font-semibold">CI = {formatNum(result.lower, precision)} to {formatNum(result.upper, precision)}</p>
                    </>
                  )}
                  {isMoe && (
                    <>
                      <p>MOE = {result.criticalValueType} × Standard Error</p>
                      <p>MOE = {formatNum(result.criticalValue, precision)} × {formatNum(result.standardError, precision)}</p>
                      <p className="text-gray-900 font-semibold">MOE = {formatNum(result.marginOfError, precision)}</p>
                    </>
                  )}
                  {isSS && (
                    <>
                      <p>n = (Z × {ssBasis === "proportion" ? "√(p(1−p))" : "σ"} ÷ E)² {ssBasis === "proportion" ? "" : ""}</p>
                      <p>n = ({formatNum(result.criticalValue, precision)} × {ssBasis === "proportion" ? formatNum(Math.sqrt((result.center ?? 0.5) * (1 - (result.center ?? 0.5))), precision) : formatNum(result.center, precision)} ÷ {formatNum(result.marginOfError, precision)})²</p>
                      <p className="text-gray-900 font-semibold">n = {result.requiredSampleSize}</p>
                    </>
                  )}
                </div>
                {result.degreesOfFreedom !== null && (
                  <p className="text-xs text-gray-400 pt-1">Degrees of freedom: n − 1 = {result.degreesOfFreedom}</p>
                )}
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {isCI ? `${confidenceLevel}% Confidence Interval` : isMoe ? "Margin of Error" : "Required Sample Size"}
              </p>
              {result && !result.error ? (
                <>
                  {isCI && (
                    <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">
                      {formatNum(result.lower, precision)} <span className="text-lg font-normal text-primary-100">to</span> {formatNum(result.upper, precision)}
                    </p>
                  )}
                  {isMoe && (
                    <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">± {formatNum(result.marginOfError, precision)}</p>
                  )}
                  {isSS && (
                    <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">{result.requiredSampleSize?.toLocaleString("en-US")}</p>
                  )}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Critical Value ({result.criticalValueType})</p>
                      <p className="text-sm font-bold font-mono">{formatNum(result.criticalValue, precision)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Std. Error</p>
                      <p className="text-sm font-bold font-mono">{result.standardError ? formatNum(result.standardError, precision) : "—"}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Margin of Error</p>
                      <p className="text-sm font-bold font-mono">{result.marginOfError ? formatNum(result.marginOfError, precision) : "—"}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Result"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                      Save to History
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter valid sample data on the left to calculate the result.</p>
              )}
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export &amp; Share</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} disabled={!result || !!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
                <button onClick={handleDownloadTXT} disabled={!result || !!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download TXT</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadJSON} disabled={!result || !!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download JSON</button>
                <button onClick={handlePrint} disabled={!result || !!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Print Report</button>
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
                    <div key={entry.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {entry.result.lower !== null ? `${formatNum(entry.result.lower, entry.precision)} to ${formatNum(entry.result.upper, entry.precision)}` : entry.result.requiredSampleSize !== null ? `n = ${entry.result.requiredSampleSize}` : `± ${formatNum(entry.result.marginOfError, entry.precision)}`}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.result.confidenceLevel}% · {entry.result.calcType}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <ConfidenceIntervalCalculatorSEO />

      <RelatedTools />
    </>
  );
}
