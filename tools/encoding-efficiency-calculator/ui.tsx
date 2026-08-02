"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateEncoding, debounce, formatNum, smartFormat, getRecommendation,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  UNITS, ENCODING_TYPES, ENCODING_REFERENCE, PRESETS, PRECISION_OPTIONS,
  DEFAULT_ORIGINAL, DEFAULT_ENCODED, DEFAULT_UNIT, DEFAULT_ENCODING_TYPE, DEFAULT_PRECISION,
  type SizeUnit, type EncodingType, type EncodingResult, type HistoryEntry,
} from "./logic";
import EncodingEfficiencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function EncodingEfficiencyCalculatorUI() {
  const [original, setOriginal] = useState(String(DEFAULT_ORIGINAL));
  const [encoded, setEncoded] = useState(String(DEFAULT_ENCODED));
  const [unit, setUnit] = useState<SizeUnit>(DEFAULT_UNIT);
  const [encodingType, setEncodingType] = useState<EncodingType>(DEFAULT_ENCODING_TYPE);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [result, setResult] = useState<EncodingResult>(() =>
    calculateEncoding(DEFAULT_ORIGINAL, DEFAULT_ENCODED, DEFAULT_UNIT, DEFAULT_ENCODING_TYPE)
  );

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setOriginal(String(shared.original));
      setEncoded(String(shared.encoded));
      setUnit(shared.unit);
      setEncodingType(shared.encodingType);
      setPrecision(shared.precision);
    } else {
      firstInputRef.current?.focus();
    }
  }, []);

  const compute = useCallback(
    debounce((o: string, e: string, u: SizeUnit, t: EncodingType) => {
      setResult(calculateEncoding(parseFloat(o), parseFloat(e), u, t));
    }, 150),
    []
  );

  useEffect(() => { compute(original, encoded, unit, encodingType); }, [original, encoded, unit, encodingType, compute]);

  const handleReset = () => {
    setOriginal(String(DEFAULT_ORIGINAL));
    setEncoded(String(DEFAULT_ENCODED));
    setUnit(DEFAULT_UNIT);
    setEncodingType(DEFAULT_ENCODING_TYPE);
    setPrecision(DEFAULT_PRECISION);
    firstInputRef.current?.focus();
  };

  const handleSwap = () => {
    setOriginal(encoded);
    setEncoded(original);
  };

  const handlePreset = (p: (typeof PRESETS)[number]) => {
    setOriginal(String(p.original));
    setEncoded(String(p.encoded));
    setUnit(p.unit);
    setEncodingType(p.encodingType);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };
  const handleDownloadCSV = () => download(buildCSVReport(result, precision), "text/csv", "encoding-efficiency-report.csv");
  const handleDownloadTXT = () => download(buildTextReport(result, precision), "text/plain", "encoding-efficiency-report.txt");
  const handleDownloadJSON = () => download(buildJSONReport(result), "application/json", "encoding-efficiency-data.json");

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(parseFloat(original), parseFloat(encoded), unit, encodingType, precision));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => { saveHistory(result); setHistory(getHistory()); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      compute(original, encoded, unit, encodingType);
    }
  };

  const eff = result.efficiency ?? 0;
  const gaugePct = Math.min(100, Math.max(0, eff));
  const overhead = result.overhead ?? 0;
  const statusText = result.status === "expanded" ? "Expanded" : result.status === "reduced" ? "Reduced" : "No Change";
  const additionalLabel = result.status === "reduced" ? "Storage Saved" : "Additional Storage";
  const recommendation = getRecommendation(result);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6" onKeyDown={handleKeyDown}>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="eec-original">Original Data Size</label>
                  <input ref={firstInputRef} id="eec-original" type="number" min={0} value={original} onChange={(e) => setOriginal(e.target.value)}
                    placeholder="1024"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="eec-encoded">Encoded Data Size</label>
                  <input id="eec-encoded" type="number" min={0} value={encoded} onChange={(e) => setEncoded(e.target.value)}
                    placeholder="1368"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="eec-unit">Size Unit</label>
                  <select id="eec-unit" value={unit} onChange={(e) => setUnit(e.target.value as SizeUnit)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="eec-precision">Decimal Precision</label>
                  <select id="eec-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="eec-type">Encoding Type (Optional)</label>
                <select id="eec-type" value={encodingType} onChange={(e) => setEncodingType(e.target.value as EncodingType)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {ENCODING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {PRESETS.map((p) => (
                  <button key={p.label} type="button" onClick={() => handlePreset(p)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <button onClick={handleSwap} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Swap Values</button>
              </div>
            </div>

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Formula Breakdown</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Overhead % = ((Encoded − Original) ÷ Original) × 100 = {formatNum(overhead, precision)}%</p>
                  <p>Expansion Ratio = Encoded ÷ Original = {formatNum(result.expansionRatio, precision)}×</p>
                  <p>Compression Ratio = Original ÷ Encoded = {formatNum(result.compressionRatio, precision)}×</p>
                  <p className="text-gray-900 font-semibold">Efficiency % = (Original ÷ Encoded) × 100 = {formatNum(eff, precision)}%</p>
                </div>
              </div>
            )}

            {/* Encoding comparison reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare Encoding Methods</h3>
              </div>
              <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                {ENCODING_REFERENCE.map((ref) => (
                  <div key={ref.type} className={`flex items-start justify-between gap-3 px-4 py-2.5 text-sm ${encodingType === ref.type ? "bg-primary/5" : ""}`}>
                    <span className={`font-medium flex-shrink-0 ${encodingType === ref.type ? "text-primary" : "text-gray-700"}`}>{ref.type}</span>
                    <span className="text-xs text-gray-500 text-right">{ref.typical}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <div className="flex items-center gap-5">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                  style={{ background: `conic-gradient(#ffffff ${gaugePct * 3.6}deg, rgba(255,255,255,0.2) 0deg)` }}
                  role="img"
                  aria-label={`Efficiency: ${formatNum(eff, 0)} percent`}
                >
                  <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-base font-bold font-mono">{result.error ? "—" : `${formatNum(eff, 0)}%`}</span>
                  </div>
                </div>
                <div>
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Encoding Overhead</p>
                  <p className="text-3xl font-bold font-mono tabular-nums transition-all duration-300">
                    {result.error ? "—" : `${formatNum(overhead, precision)}%`}
                  </p>
                  {!result.error && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      {statusText}{result.rating ? ` · ${result.rating.label}` : ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                <div className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: `${gaugePct}%` }} />
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {!result.error && recommendation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Summary</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{recommendation}</p>
              </div>
            )}

            {!result.error && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  ["Original Size", `${formatNum(result.originalSize, precision)} ${unit}`],
                  ["Encoded Size", `${formatNum(result.encodedSize, precision)} ${unit}`],
                  [additionalLabel, `${formatNum(Math.abs(result.additionalStorage ?? 0), precision)} ${unit}`],
                  ["Expansion Ratio", `${formatNum(result.expansionRatio, precision)}×`],
                  ["Compression Ratio", `${formatNum(result.compressionRatio, precision)}×`],
                  ["Efficiency", `${formatNum(eff, precision)}%`],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
            )}

            {!result.error && (
              <p className="text-xs text-gray-400 px-1">
                Additional storage in readable units: {smartFormat(Math.abs(result.additionalStorage ?? 0), unit, precision)}
              </p>
            )}

            {/* Efficiency guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Performance Rating Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["≥ 90%", "Highly Efficient"],
                  ["75 – 89%", "Efficient"],
                  ["60 – 74%", "Moderately Efficient"],
                  ["40 – 59%", "Low Efficiency"],
                  ["0 – 39%", "Poor Efficiency"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${result.rating?.label === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`font-medium ${result.rating?.label === label ? "text-primary" : "text-gray-700"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

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
                        setOriginal(String(entry.result.originalSize));
                        setEncoded(String(entry.result.encodedSize));
                        setUnit(entry.result.unit);
                        setEncodingType(entry.result.encodingType);
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatNum(entry.result.overhead, 2)}% overhead</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">
                        {entry.result.originalSize} → {entry.result.encodedSize} {entry.result.unit} · {entry.result.encodingType}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <EncodingEfficiencyCalculatorSEO />

      <RelatedTools
        currentTool="encoding-efficiency-calculator"
        tools={[
          "data-compression-ratio-calculator",
          "storage-requirement-calculator",
          "data-transfer-cost-calculator",
          "data-growth-calculator",
          "hadoop-storage-calculator",
          "data-pipeline-latency-calculator",
        ]}
      />
    </>
  );
}
