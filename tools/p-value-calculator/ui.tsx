"use client";

import { useState, useEffect, useCallback } from "react";
import {
  calculatePValue, debounce, formatNum, formatPValue,
  TEST_TYPES, ALPHA_PRESETS, PRECISION_OPTIONS, DEFAULT_PRECISION, PRESETS, TAIL_LABELS,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  type TestType, type TailType, type PValueResult, type HistoryEntry,
} from "./logic";
import PValueCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function PValueCalculatorUI() {
  const [testType, setTestType] = useState<TestType>("z");
  const [tail, setTail] = useState<TailType>("two");
  const [statistic, setStatistic] = useState(String(PRESETS.z.statistic));
  const [df, setDf] = useState(String(PRESETS.t1.df));
  const [df2, setDf2] = useState(String(PRESETS.f.df2));
  const [correlationR, setCorrelationR] = useState(String(PRESETS.correlation.correlationR));
  const [correlationN, setCorrelationN] = useState(String(PRESETS.correlation.correlationN));
  const [alpha, setAlpha] = useState("0.05");
  const [customAlpha, setCustomAlpha] = useState("");
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [result, setResult] = useState<PValueResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const meta = TEST_TYPES.find((t) => t.key === testType)!;

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setTestType(shared.testType);
      setTail(shared.tail);
      if (shared.statistic) setStatistic(shared.statistic);
      if (shared.df) setDf(shared.df);
      if (shared.df2) setDf2(shared.df2);
      if (shared.correlationR) setCorrelationR(shared.correlationR);
      if (shared.correlationN) setCorrelationN(shared.correlationN);
      if (shared.alpha) { setAlpha(shared.alpha); setCustomAlpha(shared.alpha); }
      setPrecision(shared.precision);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Chi-square and F-tests are inherently right-tailed.
  useEffect(() => {
    if (!meta.usesTail) setTail("right");
  }, [testType, meta.usesTail]);

  const compute = useCallback(
    debounce((
      tt: TestType, tl: TailType, stat: string, dfVal: string, df2Val: string, r: string, n: string, a: string
    ) => {
      setResult(calculatePValue({
        testType: tt, tail: tl,
        statistic: parseFloat(stat), df: parseInt(dfVal, 10), df2: parseInt(df2Val, 10),
        correlationR: parseFloat(r), correlationN: parseInt(n, 10), alpha: parseFloat(a),
      }));
    }, 150),
    []
  );

  useEffect(() => {
    compute(testType, tail, statistic, df, df2, correlationR, correlationN, alpha);
  }, [testType, tail, statistic, df, df2, correlationR, correlationN, alpha, compute]);

  const handlePreset = () => {
    const p = PRESETS[testType];
    if (p.statistic !== undefined) setStatistic(String(p.statistic));
    if (p.df !== undefined) setDf(String(p.df));
    if (p.df2 !== undefined) setDf2(String(p.df2));
    if (p.correlationR !== undefined) setCorrelationR(String(p.correlationR));
    if (p.correlationN !== undefined) setCorrelationN(String(p.correlationN));
    if (meta.usesTail) setTail(p.tail);
  };

  const handleReset = () => {
    setStatistic(""); setDf(""); setDf2(""); setCorrelationR(""); setCorrelationN("");
    setAlpha("0.05"); setCustomAlpha(""); setTail("two"); setPrecision(DEFAULT_PRECISION);
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
    a.download = "p-value-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "p-value-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "p-value-report.json"; a.click(); URL.revokeObjectURL(a.href);
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
      testType, tail, statistic, df, df2, correlationR, correlationN, alpha, precision,
    }));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(result, precision); setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>P-Value Calculator</p>
          <p className="text-xs text-gray-400 font-mono">p ≤ α → Reject Null Hypothesis</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex flex-wrap gap-1.5">
          {TEST_TYPES.map((t) => (
            <button
              key={t.key}
              onClick={() => setTestType(t.key)}
              className={`flex-1 min-w-[110px] py-2.5 rounded-lg text-xs font-medium transition-colors ${testType === t.key ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {t.label}
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

              {meta.usesCorrelationInputs ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pvc-r">Correlation Coefficient (r)</label>
                    <input id="pvc-r" type="number" step="0.01" min="-1" max="1" value={correlationR} onChange={(e) => setCorrelationR(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pvc-n">Sample Size (n)</label>
                    <input id="pvc-n" type="number" min="3" step="1" value={correlationN} onChange={(e) => setCorrelationN(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pvc-stat">Test Statistic</label>
                  <input id="pvc-stat" type="number" step="0.01" value={statistic} onChange={(e) => setStatistic(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {meta.usesDf && !meta.usesTwoDf && !meta.usesCorrelationInputs && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pvc-df">Degrees of Freedom</label>
                  <input id="pvc-df" type="number" min="1" step="1" value={df} onChange={(e) => setDf(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {meta.usesTwoDf && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pvc-df1">df₁ (numerator)</label>
                    <input id="pvc-df1" type="number" min="1" step="1" value={df} onChange={(e) => setDf(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pvc-df2">df₂ (denominator)</label>
                    <input id="pvc-df2" type="number" min="1" step="1" value={df2} onChange={(e) => setDf2(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                </div>
              )}

              {meta.usesTail && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tail Type</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["left", "right", "two"] as TailType[]).map((tl) => (
                      <button key={tl} type="button" onClick={() => setTail(tl)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${tail === tl ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                        {TAIL_LABELS[tl]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {!meta.usesTail && (
                <p className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">This test is inherently right-tailed since its statistic can&apos;t be negative.</p>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Significance Level (α)</label>
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {ALPHA_PRESETS.map((a) => (
                    <button key={a} type="button" onClick={() => { setAlpha(String(a)); setCustomAlpha(""); }}
                      className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${alpha === String(a) && customAlpha === "" ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                      {a}
                    </button>
                  ))}
                </div>
                <input type="number" min="0.001" max="0.999" step="0.001" placeholder="Custom α"
                  value={customAlpha}
                  onChange={(e) => { setCustomAlpha(e.target.value); if (e.target.value) setAlpha(e.target.value); }}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="pvc-precision">Decimal Precision</label>
                <select id="pvc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimals</option>)}
                </select>
              </div>

              {result?.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {/* Formula */}
            {result && !result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Formula &amp; Interpretation</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  {meta.usesCorrelationInputs && (
                    <p>t = r√(n − 2) ÷ √(1 − r²) = {formatNum(result.statistic, precision)}, df = {result.df}</p>
                  )}
                  <p>p = {result.tail === "two" ? "2 × (1 − F(|stat|))" : result.tail === "right" ? "1 − F(stat)" : "F(stat)"}</p>
                  <p className="text-gray-900 font-semibold">p = {formatPValue(result.pValue, precision)}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  The observed result is <strong>{result.significant ? "" : "not "}statistically significant</strong> at α = {result.alpha}.
                </p>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>P-Value</p>
              {result && !result.error ? (
                <>
                  <p className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{formatPValue(result.pValue, precision)}</p>
                  <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: result.significant ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.2)" }}>
                    {result.significant ? "Reject Null Hypothesis" : "Fail to Reject Null Hypothesis"}
                  </span>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Test Statistic</p>
                      <p className="text-sm font-bold font-mono">{formatNum(result.statistic, precision)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Alpha (α)</p>
                      <p className="text-sm font-bold font-mono">{result.alpha}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-[11px] mb-0.5">Confidence</p>
                      <p className="text-sm font-bold font-mono">{formatNum((1 - result.alpha) * 100, 0)}%</p>
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
                <p className="text-primary-100 text-sm">Enter a valid test statistic on the left to calculate the p-value.</p>
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
                        <span className="text-sm font-semibold text-gray-900">p = {formatPValue(entry.result.pValue, entry.precision)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.result.testType} · {entry.result.significant ? "Significant" : "Not significant"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <PValueCalculatorSEO />

      <RelatedTools />
    </>
  );
}
