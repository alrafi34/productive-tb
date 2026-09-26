"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateMean, debounce, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  SAMPLE_DATASETS, generateRandomDataset, DEFAULT_TEXT, DEFAULT_PRECISION,
  type MeanResult, type HistoryEntry,
} from "./logic";
import MeanCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = Array.from({ length: 11 }, (_, i) => i);

export default function MeanCalculatorUI() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [result, setResult] = useState<MeanResult>(calculateMean(DEFAULT_TEXT));
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) { setText(shared.text); setPrecision(shared.precision); }
    else textareaRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((t: string) => { setResult(calculateMean(t)); }, 150),
    []
  );

  useEffect(() => { run(text); }, [text, run]);

  const handleClear = () => {
    setText("");
    textareaRef.current?.focus();
  };

  const handleSample = (data: string) => {
    setText(data);
    textareaRef.current?.focus();
  };

  const handleRandom = () => {
    setText(generateRandomDataset(20));
    textareaRef.current?.focus();
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = String(e.target?.result ?? "");
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result, precision)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `mean-calculation-report.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([buildTextReport(result, precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `mean-calculation-report.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `mean-calculation-report.json`; a.click(); URL.revokeObjectURL(a.href);
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
    navigator.clipboard.writeText(buildShareUrl(text, precision));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory(text, result.stats); setHistory(getHistory());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      setResult(calculateMean(text));
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "l") {
      e.preventDefault();
      handleClear();
    }
  };

  const { stats } = result;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Mean Calculator</p>
          <p className="text-xs text-gray-400 font-mono">Mean = (Sum of All Numbers) ÷ (Total Count)</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-6 space-y-5">
            <div
              className={`bg-white rounded-xl border shadow-sm p-5 space-y-4 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-100"}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Enter Numbers</h3>
                <span className="text-xs text-gray-400">Ctrl+Enter to calculate · Ctrl+L to clear</span>
              </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={10}
                placeholder={"10,20,30,40\nor\n10\n20\n30\n40\nor\n10 20 30 40"}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-y"
              />
              <p className="text-xs text-gray-400">Accepts commas, spaces, new lines, tabs, or mixed separators. Drag and drop a .csv or .txt file anywhere in this box.</p>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Sample:</span>
                {SAMPLE_DATASETS.map((s) => (
                  <button key={s.label} type="button" onClick={() => handleSample(s.data)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    <span>{s.icon}</span><span>{s.label}</span>
                  </button>
                ))}
                <button type="button" onClick={handleRandom}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                  <span>🎲</span><span>Random Dataset</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="mc-precision">Decimal Precision</label>
                <select id="mc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                </select>
              </div>

              {result.warning && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.warning}</p>
              )}
              {result.isLargeDataset && (
                <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">Large dataset detected. Optimized calculation enabled.</p>
              )}

              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleClear} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Clear</button>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    Upload CSV/TXT
                  </button>
                  <input ref={fileInputRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFileInput} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Mean (Average)</p>
              <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">{formatNum(stats.mean, precision)}</p>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <MetricCard label="Count" value={stats.count.toLocaleString("en-US")} />
              <MetricCard label="Sum" value={formatNum(stats.sum, precision)} />
              <MetricCard label="Minimum" value={stats.min !== null ? formatNum(stats.min, precision) : "—"} />
              <MetricCard label="Maximum" value={stats.max !== null ? formatNum(stats.max, precision) : "—"} />
              <MetricCard label="Range" value={stats.range !== null ? formatNum(stats.range, precision) : "—"} />
              {result.invalidCount > 0 && <MetricCard label="Invalid Values Ignored" value={String(result.invalidCount)} />}
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
                    <div key={entry.id} onClick={() => { setText(entry.text); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">Mean: {formatNum(entry.stats.mean, 2)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.stats.count} values</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <MeanCalculatorSEO />

      <RelatedTools />
    </>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold font-mono text-primary tabular-nums">{value}</p>
    </div>
  );
}
