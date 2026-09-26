"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  parseDataset, transform, transformDataset, debounce, formatNum, generateSampleDataset, logBaseLabel,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport,
  LOG_BASES, PRECISION_OPTIONS, DEFAULT_PRECISION,
  type LogBase, type InputMode, type TransformResult, type HistoryEntry,
} from "./logic";
import LogTransformationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function LogTransformationCalculatorUI() {
  const [mode, setMode] = useState<InputMode>("single");
  const [singleValue, setSingleValue] = useState("25");
  const [input, setInput] = useState("");
  const [base, setBase] = useState<LogBase>("ln");
  const [customBase, setCustomBase] = useState("5");
  const [ignoreInvalid, setIgnoreInvalid] = useState(true);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [singleResult, setSingleResult] = useState<number | null>(null);
  const [result, setResult] = useState<TransformResult | null>(null);
  const [invalidTokens, setInvalidTokens] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runRef = useRef(debounce((m: InputMode, sv: string, text: string, b: LogBase, cb: string, ignore: boolean) => {
    if (m === "single") {
      setSingleResult(transform(parseFloat(sv), b, parseFloat(cb)));
    } else {
      const { values, invalidTokens: invalid } = parseDataset(text);
      setInvalidTokens(invalid);
      setResult(transformDataset(values, b, parseFloat(cb), ignore));
    }
  }, 150));
  const persistRef = useRef(debounce((text: string, b: LogBase, cb: string, m: InputMode, sv: string) => saveInput(text, b, parseFloat(cb), m, sv), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInput();
    if (saved) {
      setInput(saved.input);
      setBase(saved.base);
      setCustomBase(String(saved.customBase));
      setMode(saved.mode);
      setSingleValue(saved.singleValue);
    } else if (mode === "multiple") {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(mode, singleValue, input, base, customBase, ignoreInvalid); }, [mode, singleValue, input, base, customBase, ignoreInvalid]);
  useEffect(() => { persistRef.current(input, base, customBase, mode, singleValue); }, [input, base, customBase, mode, singleValue]);

  const handleClear = () => {
    setInput(""); setSingleValue(""); setResult(null); setSingleResult(null); setInvalidTokens([]); setFileError(null);
    textareaRef.current?.focus();
  };

  const handleSample = () => {
    if (mode === "single") setSingleValue(String(Math.floor(Math.random() * 900) + 10));
    else { setInput(generateSampleDataset()); textareaRef.current?.focus(); }
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

  const handleCopy = () => {
    if (mode === "single") {
      if (singleResult === null) return;
      navigator.clipboard.writeText(formatNum(singleResult, precision));
    } else {
      if (!result || result.error) return;
      navigator.clipboard.writeText(result.rows.map((r) => formatNum(r.transformed, precision)).join(", "));
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result || result.error) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "log-transformation-results.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result || result.error) return;
    const blob = new Blob([buildJSONReport(result, base, parseFloat(customBase))], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "log-transformation-results.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result || result.error) return;
    const blob = new Blob([buildTextReport(result, base, parseFloat(customBase), precision)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "log-transformation-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (mode === "multiple" && (!result || result.error)) return;
    saveHistory(mode === "single" ? singleValue : input, base, parseFloat(customBase));
    setHistory(getHistory());
  };

  const cb = parseFloat(customBase);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Log Transformation Calculator</p>
          <p className="text-xs text-gray-400 font-mono">Currently using: {logBaseLabel(base, cb)}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1.5">
          <button onClick={() => setMode("single")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "single" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Single Value</button>
          <button onClick={() => { setMode("multiple"); setTimeout(() => textareaRef.current?.focus(), 0); }} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "multiple" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Multiple Values</button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-6 space-y-5">
            {mode === "single" ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Value</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ltc-value">Value (must be greater than 0)</label>
                  <input id="ltc-value" type="number" value={singleValue} onChange={(e) => setSingleValue(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <button onClick={handleSample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Random Example</button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`bg-white rounded-xl border-2 shadow-sm p-5 space-y-3 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-100"}`}
              >
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset</h3>
                <textarea
                  ref={textareaRef}
                  rows={7}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={"Enter numbers separated by commas, spaces, or new lines.\n\nExample:\n10, 25, 50, 100, 250"}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                />
                <p className="text-[11px] text-gray-400">Or drag &amp; drop a CSV / TXT file anywhere in this box.</p>
                {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
                {invalidTokens.length > 0 && (
                  <p className="text-xs text-amber-600">⚠️ Ignored {invalidTokens.length} non-numeric value{invalidTokens.length === 1 ? "" : "s"}: <span className="font-mono">{invalidTokens.slice(0, 8).join(", ")}{invalidTokens.length > 8 ? "…" : ""}</span></p>
                )}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                  <button onClick={handleSample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Load Example</button>
                  <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Import CSV</button>
                  <input ref={fileInputRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={handleFileInput} className="hidden" />
                </div>
                <label className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <input type="checkbox" checked={ignoreInvalid} onChange={(e) => setIgnoreInvalid(e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary" />
                  Ignore Invalid Values (zero, negative, non-numeric)
                </label>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ltc-base">Log Base</label>
                <select id="ltc-base" value={base} onChange={(e) => setBase(e.target.value as LogBase)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {LOG_BASES.map((b) => <option key={b.key} value={b.key}>{b.label}</option>)}
                </select>
              </div>
              {base === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ltc-custombase">Custom Base (&gt; 0, ≠ 1)</label>
                  <input id="ltc-custombase" type="number" value={customBase} onChange={(e) => setCustomBase(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ltc-precision">Decimal Places</label>
                <select id="ltc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimals</option>)}
                </select>
              </div>
              {mode === "multiple" && result?.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}
              {mode === "single" && singleResult === null && singleValue !== "" && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">Logarithm is only defined for numbers greater than zero.</p>
              )}
              <button onClick={handleClear} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Clear</button>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "single" ? `${logBaseLabel(base, cb)}(${singleValue || "?"})` : "Transformed Dataset"}
              </p>
              {mode === "single" ? (
                singleResult !== null ? (
                  <p className="text-5xl font-bold font-mono tabular-nums transition-all duration-300">{formatNum(singleResult, precision)}</p>
                ) : (
                  <p className="text-primary-100 text-sm">Enter a positive number to transform.</p>
                )
              ) : result && !result.error ? (
                <>
                  <p className="text-sm text-primary-100 mb-3">{result.validCount} valid · {result.invalidCount} invalid</p>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {result.rows.slice(0, 40).map((r, i) => (
                      <span key={i} className="bg-white/10 rounded px-2 py-1 text-xs font-mono">{formatNum(r.transformed, precision)}</span>
                    ))}
                    {result.rows.length > 40 && <span className="text-xs text-primary-100 px-2 py-1">+{result.rows.length - 40} more</span>}
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter or paste a dataset on the left to transform it.</p>
              )}

              {((mode === "single" && singleResult !== null) || (mode === "multiple" && result && !result.error)) && (
                <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                  <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    {copied ? "✓ Copied!" : "Copy Result"}
                  </button>
                  <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">Save to History</button>
                </div>
              )}
            </div>

            {mode === "multiple" && result && !result.error && (
              <>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Statistics</h3>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-50 text-xs">
                    <div className="divide-y divide-gray-50">
                      <div className="px-4 py-2 font-semibold text-gray-500 bg-gray-50/50">Original</div>
                      {[
                        ["Count", result.originalStats.count],
                        ["Min", formatNum(result.originalStats.min, precision)],
                        ["Max", formatNum(result.originalStats.max, precision)],
                        ["Mean", formatNum(result.originalStats.mean, precision)],
                        ["Std Dev", formatNum(result.originalStats.stdDev, precision)],
                      ].map(([label, value]) => (
                        <div key={label} className="px-4 py-2 flex justify-between">
                          <span className="text-gray-500">{label}</span>
                          <span className="font-mono font-semibold text-gray-800">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="divide-y divide-gray-50">
                      <div className="px-4 py-2 font-semibold text-primary bg-gray-50/50">Transformed</div>
                      {[
                        ["Count", result.transformedStats.count],
                        ["Min", formatNum(result.transformedStats.min, precision)],
                        ["Max", formatNum(result.transformedStats.max, precision)],
                        ["Mean", formatNum(result.transformedStats.mean, precision)],
                        ["Std Dev", formatNum(result.transformedStats.stdDev, precision)],
                      ].map(([label, value]) => (
                        <div key={label} className="px-4 py-2 flex justify-between">
                          <span className="text-gray-500">{label}</span>
                          <span className="font-mono font-semibold text-primary">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Results Table</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-gray-100 text-xs text-gray-500">
                          <th className="text-left py-2 px-4 font-medium">#</th>
                          <th className="text-left py-2 px-4 font-medium">Original</th>
                          <th className="text-left py-2 px-4 font-medium">Transformed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {result.rows.map((r, i) => (
                          <tr key={i} className={r.transformed === null ? "bg-red-50/50" : "hover:bg-gray-50"}>
                            <td className="py-1.5 px-4 text-gray-400 text-xs">{i + 1}</td>
                            <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(r.original, precision)}</td>
                            <td className="py-1.5 px-4 font-mono text-primary font-semibold">{r.transformed === null ? <span className="text-red-500">Invalid</span> : formatNum(r.transformed, precision)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
                  <button onClick={handleDownloadTxt} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download TXT</button>
                  <button onClick={handleDownloadCsv} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download CSV</button>
                  <button onClick={handleDownloadJson} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download JSON</button>
                  <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors ml-auto">{showHistory ? "Hide" : "Show"} History</button>
                </div>
              </>
            )}

            {mode === "single" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">{showHistory ? "Hide" : "Show"} History</button>
              </div>
            )}

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
                    <div key={entry.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{logBaseLabel(entry.base, entry.customBase)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono truncate">{entry.input.slice(0, 60)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <LogTransformationCalculatorSEO />

      <RelatedTools />
    </>
  );
}
