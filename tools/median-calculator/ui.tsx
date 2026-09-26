"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, calculateMedian, debounce, formatNum,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, generateRandomSample,
  type MedianResult, type HistoryEntry,
} from "./logic";
import MedianCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 6];

export default function MedianCalculatorUI() {
  const [input, setInput] = useState("");
  const [decimals, setDecimals] = useState(2);
  const [result, setResult] = useState<MedianResult | null>(null);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [sortedCopied, setSortedCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runRef = useRef(debounce((text: string, dec: number) => {
    const { values, invalidTokens: invalid } = parseDataset(text);
    setInvalidTokens(invalid);
    setResult(calculateMedian(values, dec));
  }, 150));
  const persistRef = useRef(debounce((text: string) => saveInput(text), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) setInput(saved);
    else textareaRef.current?.focus();
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(input, decimals); }, [input, decimals]);
  useEffect(() => { persistRef.current(input); }, [input]);

  const handleClear = () => {
    setInput(""); setResult(null); setInvalidTokens([]); setFileError(null);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClear(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSample = () => {
    setInput(generateRandomSample());
    textareaRef.current?.focus();
  };

  const loadFile = (file: File) => {
    setFileError(null);
    if (!/\.(csv|txt)$/i.test(file.name)) { setFileError("Please upload a .csv or .txt file."); return; }
    if (file.size > 5 * 1024 * 1024) { setFileError("File is too large. Maximum size is 5MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result));
    reader.onerror = () => setFileError("This file could not be read.");
    reader.readAsText(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(String(result.median));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySorted = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.sorted.join(", "));
    setSortedCopied(true); setTimeout(() => setSortedCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, input)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "median-calculation-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "median-calculation-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input, result });
    setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`bg-white rounded-xl border-2 shadow-sm p-5 space-y-3 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-100"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset</h3>
                <label className="block text-xs font-medium text-gray-600">
                  Precision:
                  <select value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                    className="ml-1.5 px-1.5 py-1 border-2 border-gray-200 rounded-md text-xs bg-white">
                    {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>
              </div>
              <textarea
                ref={textareaRef}
                rows={8}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"Enter numbers separated by commas, spaces, or new lines\n\nExample:\n10, 20, 30, 40, 50"}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
              />
              <p className="text-[11px] text-gray-400">Or drag &amp; drop a CSV / TXT file anywhere in this box.</p>
              {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
              {invalidTokens.length > 0 && (
                <p className="text-xs text-amber-600">⚠️ Ignored {invalidTokens.length} invalid value{invalidTokens.length === 1 ? "" : "s"}: <span className="font-mono">{invalidTokens.slice(0, 8).join(", ")}{invalidTokens.length > 8 ? "…" : ""}</span></p>
              )}

              <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                <button onClick={handleSample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Sample Dataset</button>
                <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Upload CSV / TXT</button>
                <input ref={fileInputRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={handleFileInput} className="hidden" />
                <button onClick={handleClear} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Clear</button>
              </div>
              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to clear</p>
            </div>

            {/* Statistics panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Statistics</h3>
              </div>
              {result ? (
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-50">
                  {[
                    ["Count", result.count],
                    ["Min", formatNum(result.min)],
                    ["Max", formatNum(result.max)],
                    ["Mean", formatNum(result.mean)],
                  ].map(([label, value]) => (
                    <div key={label} className="px-4 py-3">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-lg font-bold font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-400 text-sm">Enter a dataset to see statistics</div>
              )}
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Median</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{formatNum(result.median)}</span>
                  </div>
                  <p className="text-sm text-primary-100 bg-white/10 rounded-lg px-3 py-2 mb-1">
                    {result.isEven ? "Even dataset detected. Median calculated using the average of the two middle values." : "Odd dataset detected. Median is the single middle value."}
                  </p>
                  <p className="text-xs text-primary-100 mb-4">Dataset contains {result.count} value{result.count === 1 ? "" : "s"}.</p>

                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Result"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopySorted} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{sortedCopied ? "✓ Copied!" : "Copy Sorted Dataset"}</button>
                      <button onClick={handleSave} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter or paste a dataset on the left to calculate the median.</p>
              )}
            </div>

            {/* Explanation */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Explanation</h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "1. Sorted Dataset", value: result.sorted.join(", ") },
                    { label: "2. Total Count", value: `${result.count} (${result.isEven ? "Even" : "Odd"})` },
                    { label: "3. Middle Position", value: result.middlePosition },
                    { label: "4. Formula", value: result.formula },
                    { label: "5. Calculation", value: result.calculation },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-5 py-3">
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className="text-sm font-mono text-gray-800 break-words">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Enter values to see the step-by-step explanation</div>
              )}
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
              <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download TXT</button>
              <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
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
                    <div key={entry.id} onClick={() => { setInput(entry.input); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">Median: {formatNum(entry.result.median)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{entry.result.count} values</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <MedianCalculatorSEO />

      <RelatedTools />
    </>
  );
}
