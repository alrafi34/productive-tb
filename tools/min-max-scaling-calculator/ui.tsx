"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  parseDataset, calculateMinMaxScaling, debounce, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport,
  buildShareUrl, parseShareParams,
  SAMPLE_DATASETS, generateRandomDataset,
  DEFAULT_TEXT, DEFAULT_NEW_MIN, DEFAULT_NEW_MAX, DEFAULT_PRECISION,
  type ScalingResult, type HistoryEntry,
} from "./logic";
import MinMaxScalingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5, 6];
const PREVIEW_LIMIT = 200;

export default function MinMaxScalingCalculatorUI() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [newMin, setNewMin] = useState(String(DEFAULT_NEW_MIN));
  const [newMax, setNewMax] = useState(String(DEFAULT_NEW_MAX));
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsed = parseDataset(text);
  const [result, setResult] = useState<ScalingResult>(() => calculateMinMaxScaling(parsed.values, DEFAULT_NEW_MIN, DEFAULT_NEW_MAX));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      setText(shared.text);
      setNewMin(String(shared.newMin));
      setNewMax(String(shared.newMax));
      setPrecision(shared.precision);
    } else {
      textareaRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = useCallback(
    debounce((t: string, mn: string, mx: string) => {
      const values = parseDataset(t).values;
      setResult(calculateMinMaxScaling(values, parseFloat(mn), parseFloat(mx)));
    }, 150),
    []
  );

  useEffect(() => { run(text, newMin, newMax); }, [text, newMin, newMax, run]);

  const handleClear = () => {
    setText("");
    textareaRef.current?.focus();
  };

  const handleReset = () => {
    setText(DEFAULT_TEXT);
    setNewMin(String(DEFAULT_NEW_MIN));
    setNewMax(String(DEFAULT_NEW_MAX));
    setPrecision(DEFAULT_PRECISION);
    textareaRef.current?.focus();
  };

  const handleSample = (sample: (typeof SAMPLE_DATASETS)[number]) => {
    setText(sample.text);
    setNewMin(String(sample.newMin));
    setNewMax(String(sample.newMax));
    textareaRef.current?.focus();
  };

  const handleRandom = () => {
    setText(generateRandomDataset(20));
    textareaRef.current?.focus();
  };

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
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.scaled.map((v) => formatNum(v, precision)).join("\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCSV = () => download(buildCSVReport(result), "text/csv", "min-max-scaled-data.csv");
  const handleDownloadJSON = () => download(buildJSONReport(result), "application/json", "min-max-scaled-data.json");
  const handleDownloadTXT = () => download(buildTextReport(result, precision), "text/plain", "min-max-scaled-data.txt");

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(text, parseFloat(newMin), parseFloat(newMax), precision));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory(result); setHistory(getHistory());
  };

  const isEmpty = text.trim() === "";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

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
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset</h3>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold text-primary">Upload File</button>
                <input ref={fileInputRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFileInput} />
              </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={"10\n20\n30\n40\n50"}
                rows={10}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-y"
              />
              <p className="text-xs text-gray-400">One value per line, or comma, space, or tab separated. Drag and drop a CSV or TXT file, or paste directly from Excel.</p>

              {parsed.invalidLines.length > 0 && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  Skipped {parsed.invalidLines.length} invalid value{parsed.invalidLines.length === 1 ? "" : "s"} on line{parsed.invalidLines.length === 1 ? "" : "s"} {parsed.invalidLines.slice(0, 10).join(", ")}{parsed.invalidLines.length > 10 ? "…" : ""}.
                </p>
              )}
              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="mms-min" title="The lowest value in your desired output range.">
                    Target Minimum
                  </label>
                  <input id="mms-min" type="number" value={newMin} onChange={(e) => setNewMin(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="mms-max" title="The highest value in your desired output range.">
                    Target Maximum
                  </label>
                  <input id="mms-max" type="number" value={newMax} onChange={(e) => setNewMax(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="mms-precision">Decimal Places</label>
                <select id="mms-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {SAMPLE_DATASETS.map((s) => (
                  <button key={s.label} type="button" onClick={() => handleSample(s)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button onClick={handleClear} disabled={isEmpty} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-40">Clear</button>
                <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <button onClick={handleRandom} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Sample Dataset</button>
              </div>
            </div>

            {!result.error && result.count > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Formula</h3>
                <p className="text-sm text-gray-600 font-mono">Scaled = ((X − Min) ÷ (Max − Min)) × (NewMax − NewMin) + NewMin</p>
                <p className="text-sm text-gray-600 font-mono">Scaled = ((X − {formatNum(result.min, precision)}) ÷ {formatNum(result.max - result.min, precision)}) × {formatNum(result.newMax - result.newMin, precision)} + {formatNum(result.newMin, precision)}</p>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="grid grid-cols-3 gap-3">
              {[
                ["Values", String(result.count)],
                ["Original Range", result.error ? "—" : `${formatNum(result.min, 2)} to ${formatNum(result.max, 2)}`],
                ["Target Range", `${formatNum(parseFloat(newMin) || 0, 2)} to ${formatNum(parseFloat(newMax) || 0, 2)}`],
              ].map(([label, val]) => (
                <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-bold font-mono text-gray-800">{val}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Scaled Values</h3>
                {!result.error && <span className="text-xs text-gray-400">{result.count.toLocaleString("en-US")} values</span>}
              </div>
              {result.error ? (
                <div className="p-6 text-center text-gray-400 text-sm">{result.error}</div>
              ) : (
                <>
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-gray-100">
                          <th className="text-right py-2 px-4 font-medium text-gray-500 text-xs">Original</th>
                          <th className="text-right py-2 px-4 font-medium text-gray-500 text-xs">Scaled</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {result.original.slice(0, PREVIEW_LIMIT).map((v, i) => (
                          <tr key={i}>
                            <td className="py-1.5 px-4 text-right font-mono text-gray-600">{formatNum(v, precision)}</td>
                            <td className="py-1.5 px-4 text-right font-mono font-medium text-primary">{formatNum(result.scaled[i], precision)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {result.count > PREVIEW_LIMIT && (
                    <p className="text-xs text-gray-400 text-center py-2 border-t border-gray-50">
                      Showing first {PREVIEW_LIMIT.toLocaleString("en-US")} of {result.count.toLocaleString("en-US")} values — download the full dataset below.
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Actions
              </p>
              <div className="space-y-2">
                <button onClick={handleCopy} disabled={!!result.error} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50">
                  {copied ? "✓ Copied!" : "Copy Scaled Values"}
                </button>
                <button onClick={handleSave} disabled={!!result.error} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50">
                  Save to History
                </button>
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export &amp; Share</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} disabled={!!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download CSV</button>
                <button onClick={handleDownloadTXT} disabled={!!result.error} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download TXT</button>
              </div>
              <button onClick={handleDownloadJSON} disabled={!!result.error} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">Download JSON</button>
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
                        <span className="text-sm font-semibold text-gray-900">{entry.count} values</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">Range {formatNum(entry.newMin, 2)} to {formatNum(entry.newMax, 2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <MinMaxScalingCalculatorSEO />

      <RelatedTools />
    </>
  );
}
