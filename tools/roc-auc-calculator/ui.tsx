"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  parseDataset, computeROC, downsampleROC, calculateAtThreshold, classifyAUC,
  debounce, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport,
  SAMPLE_DATASET, generateRandomDataset,
  DEFAULT_PRECISION, DEFAULT_THRESHOLD,
  type HistoryEntry,
} from "./logic";
import { ROCChart } from "./chart";
import ROCAUCCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ROCAUCCalculatorUI() {
  const [text, setText] = useState(SAMPLE_DATASET);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [debouncedText, setDebouncedText] = useState(SAMPLE_DATASET);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); }, []);

  const applyDebounce = useCallback(debounce((t: string) => setDebouncedText(t), 150), []);
  useEffect(() => { applyDebounce(text); }, [text, applyDebounce]);

  const parsed = useMemo(() => parseDataset(debouncedText), [debouncedText]);
  const result = useMemo(() => computeROC(parsed.points), [parsed.points]);
  const thresholdStats = useMemo(() => calculateAtThreshold(parsed.points, threshold), [parsed.points, threshold]);
  const chartPoints = useMemo(() => downsampleROC(result.rocPoints, 400), [result.rocPoints]);
  const currentChartPoint = useMemo(() => {
    if (result.rocPoints.length === 0) return null;
    let nearest = result.rocPoints[0];
    let minDist = Infinity;
    for (const p of result.rocPoints) {
      const d = Math.abs(p.threshold - threshold);
      if (d < minDist) { minDist = d; nearest = p; }
    }
    return nearest;
  }, [result.rocPoints, threshold]);

  const rating = result.error ? null : classifyAUC(result.auc);

  const handleClear = () => { setText(""); textareaRef.current?.focus(); };
  const handleReset = () => { setText(SAMPLE_DATASET); setThreshold(DEFAULT_THRESHOLD); setPrecision(DEFAULT_PRECISION); };
  const handleSample = () => setText(SAMPLE_DATASET);
  const handleRandom = () => setText(generateRandomDataset(50));

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setText(String(e.target?.result ?? ""));
    reader.readAsText(file);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleCopyAUC = () => {
    navigator.clipboard.writeText(`AUC = ${formatNum(result.auc, precision)} (${rating?.label ?? ""})`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMetrics = () => {
    navigator.clipboard.writeText(buildTextReport(result, thresholdStats, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };
  const handleDownloadCSV = () => download(buildCSVReport(result), "text/csv", "roc-auc-results.csv");
  const handleDownloadJSON = () => download(buildJSONReport(result, thresholdStats), "application/json", "roc-auc-metrics.json");
  const handleDownloadTXT = () => download(buildTextReport(result, thresholdStats, precision), "text/plain", "roc-auc-report.txt");

  const handleSave = () => { saveHistory(result); setHistory(getHistory()); };

  const isEmpty = text.trim() === "";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: dataset input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div
              className={`bg-white rounded-xl border shadow-sm p-5 space-y-4 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-100"}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset</h3>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold text-primary">Upload CSV</button>
                <input ref={fileInputRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFileInput} />
              </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={"Actual,Probability\n1,0.98\n0,0.32"}
                rows={14}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-y"
              />
              <p className="text-xs text-gray-400">Each line: actual label (0 or 1), then predicted probability (0–1). Comma, tab, or space separated. Drag and drop a CSV file, or paste directly.</p>

              {parsed.invalidLines.length > 0 && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  Skipped {parsed.invalidLines.length} invalid row{parsed.invalidLines.length === 1 ? "" : "s"} on line{parsed.invalidLines.length === 1 ? "" : "s"} {parsed.invalidLines.slice(0, 10).join(", ")}{parsed.invalidLines.length > 10 ? "…" : ""}.
                </p>
              )}
              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-sm font-bold font-mono text-gray-800">{parsed.points.length}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">Positive</p>
                  <p className="text-sm font-bold font-mono text-gray-800">{result.totalPositives}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">Negative</p>
                  <p className="text-sm font-bold font-mono text-gray-800">{result.totalNegatives}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="rac-precision">Decimal Precision</label>
                <select id="rac-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} decimals</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button onClick={handleClear} disabled={isEmpty} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-40">Clear</button>
                <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <button onClick={handleSample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Sample Data</button>
              </div>
              <button onClick={handleRandom} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Generate Random Dataset (50 rows)</button>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                ROC AUC Score
              </p>
              <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">
                {result.error ? "—" : formatNum(result.auc, precision)}
              </p>
              {rating && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {rating.label}
                </span>
              )}
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopyAUC} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy AUC Score"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>ROC Curve</h3>
                <ROCChart points={chartPoints} currentThreshold={currentChartPoint} />
                <p className="text-xs text-gray-400 mt-2">The dashed diagonal represents a random classifier (AUC = 0.5). Hover the curve to inspect any threshold.</p>
              </div>
            )}

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Threshold Explorer</h3>
                  <span className="text-sm font-mono font-semibold text-primary">{threshold.toFixed(2)}</span>
                </div>
                <input type="range" min={0} max={1} step={0.01} value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full h-2 accent-primary cursor-pointer mb-4" aria-label="Classification threshold" />
                <div className="grid grid-cols-4 gap-2 text-center mb-3">
                  {[["TP", thresholdStats.tp, "text-primary"], ["FP", thresholdStats.fp, "text-gray-700"], ["FN", thresholdStats.fn, "text-red-600"], ["TN", thresholdStats.tn, "text-gray-700"]].map(([label, val, cls]) => (
                    <div key={label as string} className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className={`text-sm font-bold font-mono ${cls}`}>{val}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[["Accuracy", thresholdStats.accuracy], ["Precision", thresholdStats.precision], ["Recall", thresholdStats.recall], ["Specificity", thresholdStats.specificity], ["F1 Score", thresholdStats.f1], ["Sensitivity", thresholdStats.sensitivity]].map(([label, val]) => (
                    <div key={label as string} className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-bold font-mono text-gray-800">{formatNum(val as number | null, precision)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interpretation guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>AUC Interpretation Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["0.90 – 1.00", "Excellent Classifier"],
                  ["0.80 – 0.90", "Good Classifier"],
                  ["0.70 – 0.80", "Fair Classifier"],
                  ["0.60 – 0.70", "Poor Classifier"],
                  ["≤ 0.60", "Fails to Discriminate"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${rating?.label === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`font-medium ${rating?.label === label ? "text-primary" : "text-gray-700"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} disabled={!!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download CSV</button>
                <button onClick={handleDownloadTXT} disabled={!!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download TXT</button>
              </div>
              <button onClick={handleDownloadJSON} disabled={!!result.error} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download JSON</button>
              <button onClick={handleCopyMetrics} disabled={!!result.error} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Copy Full Metrics</button>
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
                        <span className="text-sm font-semibold text-gray-900">AUC = {formatNum(entry.auc, 4)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.totalSamples} samples · {entry.totalPositives} pos · {entry.totalNegatives} neg</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ROCAUCCalculatorSEO />

      <RelatedTools
        currentTool="roc-auc-calculator"
        tools={[
          "precision-calculator",
          "recall-calculator",
          "f1-score-calculator-analytics",
          "confusion-matrix-analyzer",
          "chi-square-calculator",
          "a-b-test-calculator",
        ]}
      />
    </>
  );
}
