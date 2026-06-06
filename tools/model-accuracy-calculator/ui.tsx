"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { InputMode, AccuracyResult, HistoryEntry } from "./types";
import {
  parseLabels,
  parseCSV,
  computeAccuracy,
  validateLabels,
  formatPct,
  formatNumber,
  buildExportText,
  buildExportCSV,
  downloadFile,
  saveHistory,
  getHistory,
  clearHistory,
  debounce,
  EXAMPLES,
} from "./logic";
import ModelAccuracyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const TIER_COLORS: Record<string, string> = {
  excellent: "text-green-700 bg-green-50 border-green-200",
  good:      "text-blue-700 bg-blue-50 border-blue-200",
  moderate:  "text-yellow-700 bg-yellow-50 border-yellow-200",
  poor:      "text-red-700 bg-red-50 border-red-200",
};

const TIER_ICONS: Record<string, string> = {
  excellent: "🎯",
  good:      "✅",
  moderate:  "⏳",
  poor:      "⚠️",
};

// How many comparison rows to show before "Show all" toggle
const PREVIEW_ROWS = 20;

export default function ModelAccuracyCalculatorUI() {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<InputMode>("manual");
  const [actualRaw, setActualRaw] = useState("1,1,0,1,0");
  const [predictedRaw, setPredictedRaw] = useState("1,0,0,1,0");
  const [csvRaw, setCsvRaw] = useState("");

  // ── UI state ───────────────────────────────────────────────────────────────
  const [result, setResult] = useState<AccuracyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAllRows, setShowAllRows] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const actualRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // ── Calculation ────────────────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      let actual: string[];
      let predicted: string[];

      if (mode === "csv") {
        if (!csvRaw.trim()) { setResult(null); setError(null); return; }
        const parsed = parseCSV(csvRaw);
        if (!parsed) { setError("Could not parse CSV. Expected two columns: actual,predicted"); setResult(null); return; }
        actual = parsed.actual;
        predicted = parsed.predicted;
      } else {
        if (!actualRaw.trim() && !predictedRaw.trim()) { setResult(null); setError(null); return; }
        actual = parseLabels(actualRaw);
        predicted = parseLabels(predictedRaw);
      }

      const err = validateLabels(actual, predicted);
      if (err) { setError(err); setResult(null); return; }

      setError(null);
      setResult(computeAccuracy(actual, predicted));
      setShowAllRows(false);
    }, 150),
    [mode, actualRaw, predictedRaw, csvRaw]
  );

  useEffect(() => { run(); }, [actualRaw, predictedRaw, csvRaw, mode, run]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [run]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleClear = () => {
    setActualRaw("");
    setPredictedRaw("");
    setCsvRaw("");
    setResult(null);
    setError(null);
    actualRef.current?.focus();
  };

  const handleSwap = () => {
    setActualRaw(predictedRaw);
    setPredictedRaw(actualRaw);
  };

  const loadExample = (ex: typeof EXAMPLES[0]) => {
    setMode("manual");
    setActualRaw(ex.actual);
    setPredictedRaw(ex.predicted);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCsvRaw(ev.target?.result as string ?? "");
      setMode("csv");
    };
    reader.readAsText(file);
    // Reset input so the same file can be re-uploaded
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleCopy = () => {
    if (!result) return;
    const text = [
      `Accuracy: ${formatPct(result.accuracy)}`,
      `Correct: ${result.correct}`,
      `Incorrect: ${result.incorrect}`,
      `Total Samples: ${result.total}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    if (!result) return;
    downloadFile(buildExportText(result), "model-accuracy-report.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    downloadFile(buildExportCSV(result), "model-accuracy-results.csv", "text/csv");
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  // ── Derived display values ─────────────────────────────────────────────────
  const visibleRows = result
    ? showAllRows ? result.rows : result.rows.slice(0, PREVIEW_ROWS)
    : [];

  const accuracyBarPct = result ? Math.min(result.accuracy, 100) : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🎯</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Model Accuracy Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Paste actual and predicted labels to instantly compute classification accuracy. Supports binary,
              multi-class, and text labels. Upload CSV for batch evaluation. All computation runs locally.
            </p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1">
          {(["manual", "csv"] as InputMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m === "manual" ? "Manual Input" : "CSV Upload"}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs + actions */}
          <div className="lg:col-span-5 space-y-5">

            {/* Manual input */}
            {mode === "manual" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Labels
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Actual Labels
                  </label>
                  <textarea
                    ref={actualRef}
                    value={actualRaw}
                    onChange={(e) => setActualRaw(e.target.value)}
                    placeholder="1,1,0,1,0"
                    rows={4}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-none ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                    aria-label="Actual Labels"
                    spellCheck={false}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Comma, newline, or tab separated · bare 0s/1s also work
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Predicted Labels
                  </label>
                  <textarea
                    value={predictedRaw}
                    onChange={(e) => setPredictedRaw(e.target.value)}
                    placeholder="1,0,0,1,0"
                    rows={4}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-none"
                    aria-label="Predicted Labels"
                    spellCheck={false}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleSwap}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Swap ↕
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <p className="text-xs text-gray-400">
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Ctrl+Enter</kbd> to recalculate
                </p>
              </div>
            )}

            {/* CSV input */}
            {mode === "csv" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  CSV Input
                </h3>

                {/* File upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload CSV File</label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                    aria-label="Upload CSV file"
                  />
                  <p className="text-xs text-gray-400 mt-1">Expected columns: actual, predicted</p>
                </div>

                {/* Or paste */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Or Paste CSV</label>
                  <textarea
                    value={csvRaw}
                    onChange={(e) => setCsvRaw(e.target.value)}
                    placeholder={"actual,predicted\n1,1\n0,1\n1,0\n1,1"}
                    rows={8}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono resize-none ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                    aria-label="CSV Data"
                    spellCheck={false}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleClear}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Example datasets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Example Datasets
              </h3>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => loadExample(ex)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      mode === "manual" && actualRaw === ex.actual && predictedRaw === ex.predicted
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Export / save actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "Copy Stats"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExportTxt}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export TXT
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export CSV
                </button>
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                {showHistory ? "Hide" : "Show"} History
              </button>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : (
                    history.map((entry) => (
                      <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-primary font-mono">
                            {formatPct(entry.result.accuracy)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">{entry.snippet}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ fontFamily: "var(--font-heading)" }}>
                Accuracy Score
              </p>
              {result ? (
                <>
                  <div className="text-4xl font-bold font-mono mb-1">
                    {formatPct(result.accuracy)}
                  </div>
                  <div className="text-sm text-primary-100 mb-4">
                    {result.correct} correct out of {result.total} · {result.tierLabel}
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-white h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${accuracyBarPct}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { label: "Correct", value: result.correct, color: "bg-white/10" },
                      { label: "Incorrect", value: result.incorrect, color: "bg-white/10" },
                      { label: "Total", value: result.total, color: "bg-white/10" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className={`${color} rounded-lg py-2`}>
                        <div className="text-xl font-bold font-mono">{formatNumber(value)}</div>
                        <div className="text-xs text-primary-100">{label}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-primary-100 text-sm">
                  {error ?? "Enter labels to calculate accuracy"}
                </div>
              )}
            </div>

            {/* Performance rating */}
            {result && (
              <div className={`rounded-xl border p-4 ${TIER_COLORS[result.tier]}`}>
                <span className="font-semibold text-sm">
                  {TIER_ICONS[result.tier]} {result.tierLabel} Model Performance
                </span>
                <p className="text-xs mt-1 leading-relaxed">
                  {result.tier === "excellent" && "Your model is performing at a production-grade level."}
                  {result.tier === "good" && "Good performance. Minor fine-tuning may improve results further."}
                  {result.tier === "moderate" && "Moderate performance. Consider reviewing misclassified samples and improving training data."}
                  {result.tier === "poor" && "Below-random performance for binary tasks. Review your model, data quality, and label encoding."}
                </p>
              </div>
            )}

            {/* Per-class accuracy */}
            {result && result.classSummary.length > 1 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Per-Class Accuracy
                </h3>
                <div className="space-y-3">
                  {result.classSummary.map((cls) => (
                    <div key={cls.label}>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span className="font-medium font-mono">{cls.label}</span>
                        <span className="font-semibold">
                          {formatPct(cls.accuracy)} ({cls.correct}/{cls.total})
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${cls.accuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Row-by-Row Comparison
                    <span className="ml-2 font-normal text-gray-400 text-xs">
                      ({formatNumber(result.total)} rows)
                    </span>
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-green-600 font-semibold">✓ {result.correct}</span>
                    <span className="text-red-500 font-semibold">✗ {result.incorrect}</span>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50 z-10">
                      <tr>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 border-b border-gray-100 w-16">#</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 border-b border-gray-100">Actual</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 border-b border-gray-100">Predicted</th>
                        <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-500 border-b border-gray-100 w-16">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {visibleRows.map((row) => (
                        <tr
                          key={row.index}
                          className={`transition-colors ${
                            row.correct ? "hover:bg-green-50/30" : "bg-red-50/20 hover:bg-red-50/40"
                          }`}
                        >
                          <td className="px-4 py-2 text-xs text-gray-400 font-mono">{row.index}</td>
                          <td className="px-4 py-2 font-mono text-gray-800 text-sm">{row.actual}</td>
                          <td className="px-4 py-2 font-mono text-gray-800 text-sm">{row.predicted}</td>
                          <td className="px-4 py-2 text-center">
                            {row.correct ? (
                              <span className="text-green-600 font-bold">✓</span>
                            ) : (
                              <span className="text-red-500 font-bold">✗</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {result.total > PREVIEW_ROWS && (
                  <div className="p-3 border-t border-gray-100 text-center">
                    <button
                      onClick={() => setShowAllRows(!showAllRows)}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      {showAllRows
                        ? "Show fewer rows"
                        : `Show all ${formatNumber(result.total)} rows`}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Empty state */}
            {!result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
                <div className="text-3xl mb-3">🎯</div>
                <p className="text-sm">Enter actual and predicted labels to see accuracy results and the comparison table.</p>
                <p className="text-xs mt-2">
                  Try an example above or paste comma-separated values like{" "}
                  <code className="bg-gray-100 px-1 rounded font-mono">1,1,0,1,0</code>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      <ModelAccuracyCalculatorSEO />

      <RelatedTools
        currentTool="model-accuracy-calculator"
        tools={[
          "ai-token-cost-calculator",
          "ai-prompt-length-calculator",
          "time-complexity-calculator",
          "latency-calculator",
          "data-transfer-calculator",
          "subnet-calculator",
        ]}
      />
    </>
  );
}
