"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateMode, debounce, formatValue,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  SAMPLE_DATASETS, generateRandomDataset,
  SEPARATOR_OPTIONS, VALUE_TYPE_OPTIONS, SORT_OPTIONS,
  DEFAULT_TEXT,
  type SeparatorOption, type ValueTypeOption, type SortOption, type ModeResult, type HistoryEntry,
} from "./logic";
import FrequencyBarChart from "./chart";
import ModeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ModeCalculatorUI() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [separator, setSeparator] = useState<SeparatorOption>("auto");
  const [valueType, setValueType] = useState<ValueTypeOption>("auto");
  const [sort, setSort] = useState<SortOption>("original");
  const [result, setResult] = useState<ModeResult>(calculateMode(DEFAULT_TEXT, "auto", "auto", "original"));
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) { setText(shared.text); setSeparator(shared.separator); setValueType(shared.valueType); }
    else textareaRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((t: string, sep: SeparatorOption, vt: ValueTypeOption, srt: SortOption) => {
      setResult(calculateMode(t, sep, vt, srt));
    }, 150),
    []
  );

  useEffect(() => { run(text, separator, valueType, sort); }, [text, separator, valueType, sort, run]);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `mode-calculation-report.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([buildTextReport(result)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `mode-calculation-report.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `mode-calculation-report.json`; a.click(); URL.revokeObjectURL(a.href);
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
    navigator.clipboard.writeText(buildShareUrl(text, separator, valueType));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory(text, result.modes, result.frequency); setHistory(getHistory());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      setResult(calculateMode(text, separator, valueType, sort));
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Mode Calculator</p>
          <p className="text-xs text-gray-400 font-mono">Mode = Value(s) with the highest frequency</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset Input</h3>
                <span className="text-xs text-gray-400">Ctrl+Enter to calculate</span>
              </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={8}
                placeholder={"12, 18, 18, 25, 30, 18, 45\nor\nApple,Banana,Apple,Orange"}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-y"
              />

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="mode-sep">Separator</label>
                  <select id="mode-sep" value={separator} onChange={(e) => setSeparator(e.target.value as SeparatorOption)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {SEPARATOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="mode-type">Value Type</label>
                  <select id="mode-type" value={valueType} onChange={(e) => setValueType(e.target.value as ValueTypeOption)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {VALUE_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="mode-sort">Sorting</label>
                <select id="mode-sort" value={sort} onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {result.warning && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.warning}</p>
              )}
              {result.totalValues >= 10000 && (
                <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">Large dataset detected. Optimized calculation enabled.</p>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
                <button onClick={handleClear} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Clear</button>
                <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {result.noMode ? "No Mode" : result.modes.length > 1 ? "Modes" : "Mode"}
              </p>
              {result.noMode ? (
                <p className="text-lg font-semibold">Every value appears the same number of times.</p>
              ) : (
                <p className="text-3xl font-bold font-mono tabular-nums break-words">{result.modes.map(formatValue).join(", ") || "—"}</p>
              )}
              {!result.noMode && result.modes.length > 0 && (
                <p className="text-primary-100 text-sm mt-1">Frequency: {result.frequency}</p>
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

            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <MetricCard label="Number of Modes" value={String(result.modes.length)} />
              <MetricCard label="Total Values" value={result.totalValues.toLocaleString("en-US")} />
              <MetricCard label="Unique Values" value={result.uniqueValues.toLocaleString("en-US")} />
              {result.invalidCount > 0 && <MetricCard label="Invalid Values Ignored" value={String(result.invalidCount)} />}
            </div>

            {/* Frequency chart */}
            {result.frequencyTable.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Frequency Chart</h3>
                <FrequencyBarChart rows={result.frequencyTable} modeValues={result.modes} />
                {result.frequencyTable.length > 20 && <p className="text-xs text-gray-400 mt-2">Showing the first 20 of {result.frequencyTable.length} unique values.</p>}
              </div>
            )}

            {/* Frequency table */}
            {result.frequencyTable.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Frequency Table</h3>
                </div>
                <div className="overflow-x-auto max-h-72 overflow-y-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">Value</th>
                        <th className="text-right py-2 px-4 font-semibold text-gray-700">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.frequencyTable.map((row, i) => (
                        <tr key={i} className={result.modes.includes(row.value) ? "bg-primary/5" : "hover:bg-gray-50"}>
                          <td className="py-2 px-4 text-gray-700 font-mono">{formatValue(row.value)}</td>
                          <td className="py-2 px-4 text-right font-mono text-primary font-semibold">{row.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export &amp; Share</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download CSV</button>
                <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download JSON</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadTXT} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download TXT</button>
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
                        <span className="text-sm font-semibold text-gray-900">Mode: {entry.modes.map(formatValue).join(", ") || "None"}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">Frequency: {entry.frequency}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ModeCalculatorSEO />

      <RelatedTools
        currentTool="mode-calculator"
        tools={[
          "mean-calculator",
          "median-calculator",
          "standard-deviation-calculator",
          "variance-calculator",
          "percentile-calculator",
          "percentage-calculator",
        ]}
      />
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
