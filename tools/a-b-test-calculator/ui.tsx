"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateABTest, debounce, formatPct, formatSignedPct, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  SAMPLE_EXAMPLES, DEFAULT_A, DEFAULT_B, DEFAULT_CONFIDENCE, DEFAULT_TEST_TYPE, DEFAULT_PRECISION,
  type TestType, type ABTestInputs, type ABTestResult, type HistoryEntry, type Variant,
} from "./logic";
import { ConversionBarChart } from "./chart";
import ABTestCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const CONFIDENCE_OPTIONS = [90, 95, 99];
const PRECISION_OPTIONS = [2, 3, 4, 5];

export default function ABTestCalculatorUI() {
  const [aVisitors, setAVisitors] = useState(String(DEFAULT_A.visitors));
  const [aConversions, setAConversions] = useState(String(DEFAULT_A.conversions));
  const [bVisitors, setBVisitors] = useState(String(DEFAULT_B.visitors));
  const [bConversions, setBConversions] = useState(String(DEFAULT_B.conversions));
  const [confidenceLevel, setConfidenceLevel] = useState(DEFAULT_CONFIDENCE);
  const [testType, setTestType] = useState<TestType>(DEFAULT_TEST_TYPE);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [exampleIndex, setExampleIndex] = useState(0);

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const buildInputs = useCallback((): ABTestInputs => ({
    a: { visitors: parseFloat(aVisitors), conversions: parseFloat(aConversions) },
    b: { visitors: parseFloat(bVisitors), conversions: parseFloat(bConversions) },
    confidenceLevel,
    testType,
  }), [aVisitors, aConversions, bVisitors, bConversions, confidenceLevel, testType]);

  const [result, setResult] = useState<ABTestResult>(() => calculateABTest(buildInputs()));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setAVisitors(String(shared.a.visitors));
      setAConversions(String(shared.a.conversions));
      setBVisitors(String(shared.b.visitors));
      setBConversions(String(shared.b.conversions));
      setConfidenceLevel(shared.confidenceLevel);
      setTestType(shared.testType);
    } else {
      firstInputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compute = useCallback(
    debounce((inputs: ABTestInputs) => { setResult(calculateABTest(inputs)); }, 150),
    []
  );

  useEffect(() => { compute(buildInputs()); }, [buildInputs, compute]);

  const applyVariants = (a: Variant, b: Variant) => {
    setAVisitors(String(a.visitors));
    setAConversions(String(a.conversions));
    setBVisitors(String(b.visitors));
    setBConversions(String(b.conversions));
  };

  const handleReset = () => {
    applyVariants(DEFAULT_A, DEFAULT_B);
    setConfidenceLevel(DEFAULT_CONFIDENCE);
    setTestType(DEFAULT_TEST_TYPE);
    setPrecision(DEFAULT_PRECISION);
    firstInputRef.current?.focus();
  };

  const handleSwap = () => {
    applyVariants(
      { visitors: parseFloat(bVisitors) || 0, conversions: parseFloat(bConversions) || 0 },
      { visitors: parseFloat(aVisitors) || 0, conversions: parseFloat(aConversions) || 0 }
    );
  };

  const handleLoadExample = () => {
    const next = (exampleIndex + 1) % SAMPLE_EXAMPLES.length;
    setExampleIndex(next);
    applyVariants(SAMPLE_EXAMPLES[next].a, SAMPLE_EXAMPLES[next].b);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result, precision)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "ab-test-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([buildTextReport(result, precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "ab-test-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "ab-test-data.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
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

  const badgeColor = result.error ? "#9CA3AF" : result.isSignificant ? "#058554" : "#D97706";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6" onKeyDown={handleKeyDown}>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Variant A</h3>
                <span className="text-xs text-gray-400">Control</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ab-a-visitors">Visitors</label>
                  <input ref={firstInputRef} id="ab-a-visitors" type="number" min={0} value={aVisitors} onChange={(e) => setAVisitors(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ab-a-conversions">Conversions</label>
                  <input id="ab-a-conversions" type="number" min={0} value={aConversions} onChange={(e) => setAConversions(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Variant B</h3>
                <span className="text-xs text-gray-400">Challenger</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ab-b-visitors">Visitors</label>
                  <input id="ab-b-visitors" type="number" min={0} value={bVisitors} onChange={(e) => setBVisitors(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ab-b-conversions">Conversions</label>
                  <input id="ab-b-conversions" type="number" min={0} value={bConversions} onChange={(e) => setBConversions(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ab-confidence" title="How confident you want to be before declaring a winner.">
                    Confidence Level
                  </label>
                  <select id="ab-confidence" value={confidenceLevel} onChange={(e) => setConfidenceLevel(parseFloat(e.target.value))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {CONFIDENCE_OPTIONS.map((cl) => <option key={cl} value={cl}>{cl}%</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ab-testtype" title="Two-tailed checks for a difference in either direction; one-tailed only checks for an improvement.">
                    Test Type
                  </label>
                  <select id="ab-testtype" value={testType} onChange={(e) => setTestType(e.target.value as TestType)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    <option value="two-tailed">Two-tailed</option>
                    <option value="one-tailed">One-tailed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ab-precision">Decimal Precision</label>
                <select id="ab-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimals</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <button onClick={handleSwap} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Swap Variants</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleLoadExample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Load Example</button>
                <button onClick={handleCopy} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
              </div>
            </div>

            {/* Formula / steps */}
            {!result.error && result.zScore !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>CRa = {aConversions} ÷ {aVisitors} = {formatPct(result.crA, 2)}</p>
                  <p>CRb = {bConversions} ÷ {bVisitors} = {formatPct(result.crB, 2)}</p>
                  <p>Pooled p = ({aConversions} + {bConversions}) ÷ ({aVisitors} + {bVisitors}) = {formatNum(result.pooledRate, precision)}</p>
                  <p>SE = √(p(1−p)(1/na + 1/nb)) = {formatNum(result.standardError, precision)}</p>
                  <p>Z = (CRb − CRa) ÷ SE = {formatNum(result.zScore, precision)}</p>
                  <p className="text-gray-900 font-semibold">P-value = {formatNum(result.pValue, precision)}</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Result
              </p>
              <p className="text-2xl font-bold font-mono tabular-nums transition-all duration-300">
                {result.error ? "—" : result.isSignificant ? "Statistically Significant" : "Not Statistically Significant"}
              </p>
              {!result.error && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {result.winner === "none" ? "No clear winner" : `Winner: Variant ${result.winner}`}
                </span>
              )}
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {!result.error && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Conversion Rate A", formatPct(result.crA, 2), "#60a5fa"],
                  ["Conversion Rate B", formatPct(result.crB, 2), "#058554"],
                  ["Relative Lift", formatSignedPct(result.lift, 2), badgeColor],
                ].map(([label, val, color]) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-lg font-bold font-mono" style={{ color: color as string }}>{val}</p>
                  </div>
                ))}
              </div>
            )}

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Conversion Rate Comparison</h3>
                <ConversionBarChart crA={result.crA} crB={result.crB} ciLower={result.ciLower} ciUpper={result.ciUpper} />
              </div>
            )}

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Decision Summary</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {result.isSignificant
                    ? `Variant ${result.winner} ${(result.lift ?? 0) > 0 ? "outperforms" : "underperforms relative to"} the other variant with a ${formatSignedPct(result.lift, 2)} relative change, and the difference is statistically significant at the ${confidenceLevel}% confidence level (p = ${formatNum(result.pValue, precision)}).`
                    : `The difference between Variant A (${formatPct(result.crA, 2)}) and Variant B (${formatPct(result.crB, 2)}) is not statistically significant at the ${confidenceLevel}% confidence level (p = ${formatNum(result.pValue, precision)}). Consider collecting more data before declaring a winner.`}
                </p>
              </div>
            )}

            {/* Result details */}
            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Statistical Details</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    ["Absolute Difference", formatPct(result.difference, 2)],
                    ["Z-score", formatNum(result.zScore, precision)],
                    ["P-value", formatNum(result.pValue, precision)],
                    ["Confidence Interval", `${formatPct(result.ciLower, 2)} to ${formatPct(result.ciUpper, 2)}`],
                    ["Test Type", testType === "two-tailed" ? "Two-tailed" : "One-tailed"],
                    ["Confidence Level", `${confidenceLevel}%`],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between px-4 py-2 text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-mono font-medium text-gray-800">{val}</span>
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
                        applyVariants(entry.inputs.a, entry.inputs.b);
                        setConfidenceLevel(entry.inputs.confidenceLevel);
                        setTestType(entry.inputs.testType);
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.isSignificant ? "Significant" : "Not significant"}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">
                        A: {entry.inputs.a.conversions}/{entry.inputs.a.visitors} · B: {entry.inputs.b.conversions}/{entry.inputs.b.visitors} · {entry.winner === "none" ? "No winner" : `Winner: ${entry.winner}`}
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
      <ABTestCalculatorSEO />

      <RelatedTools />
    </>
  );
}
