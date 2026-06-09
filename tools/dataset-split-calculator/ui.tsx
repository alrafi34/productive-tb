"use client";

import { useState, useEffect, useCallback } from "react";
import type { SplitMode, SplitResult, HistoryEntry } from "./types";
import {
  calculateSplit,
  parseRatio,
  validateInputs,
  getRecommendation,
  formatNumber,
  formatPct,
  buildExportText,
  buildExportCSV,
  downloadFile,
  saveHistory,
  getHistory,
  clearHistory,
  debounce,
  PRESETS,
} from "./logic";
import DatasetSplitCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_DATASET = 10000;
const DEFAULT_TRAIN = 80;
const DEFAULT_VAL = 0;
const DEFAULT_TEST = 20;

export default function DatasetSplitCalculatorUI() {
  // ── Inputs ──────────────────────────────────────────────────────────────
  const [splitMode, setSplitMode] = useState<SplitMode>("train-test");
  const [datasetRaw, setDatasetRaw] = useState("10000");
  const [trainPct, setTrainPct] = useState(DEFAULT_TRAIN);
  const [valPct, setValPct] = useState(DEFAULT_VAL);
  const [testPct, setTestPct] = useState(DEFAULT_TEST);
  const [ratioRaw, setRatioRaw] = useState("8:2");
  const [useRatioMode, setUseRatioMode] = useState(false);

  // ── UI state ─────────────────────────────────────────────────────────────
  const [result, setResult] = useState<SplitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // ── Sync percentages when mode changes ───────────────────────────────────
  useEffect(() => {
    if (splitMode === "train-test") {
      setTrainPct(80);
      setValPct(0);
      setTestPct(20);
      setRatioRaw("8:2");
    } else if (splitMode === "train-val-test") {
      setTrainPct(70);
      setValPct(15);
      setTestPct(15);
      setRatioRaw("7:1.5:1.5");
    }
    setUseRatioMode(false);
  }, [splitMode]);

  // ── Calculation ───────────────────────────────────────────────────────────
  const run = useCallback(
    debounce(
      (ds: string, tr: number, vl: number, te: number) => {
        const datasetSize = parseInt(ds.replace(/,/g, ""), 10);
        const err = validateInputs(datasetSize, tr, vl, te);
        if (err) {
          setError(err);
          setResult(null);
          return;
        }
        setError(null);
        setResult(calculateSplit(datasetSize, tr, vl, te));
      },
      100
    ),
    []
  );

  useEffect(() => {
    run(datasetRaw, trainPct, valPct, testPct);
  }, [datasetRaw, trainPct, valPct, testPct, run]);

  // Keyboard shortcut
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        run(datasetRaw, trainPct, valPct, testPct);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [datasetRaw, trainPct, valPct, testPct, run]);

  // ── Ratio apply ───────────────────────────────────────────────────────────
  const applyRatio = () => {
    const parsed = parseRatio(ratioRaw);
    if (!parsed) {
      setError("Invalid ratio format. Use formats like 8:2 or 7:1.5:1.5");
      return;
    }
    // Round to 1 decimal; re-assign test to make total 100
    const tr = Math.round(parsed.train * 10) / 10;
    const vl = Math.round(parsed.val * 10) / 10;
    const te = Math.round((100 - tr - vl) * 10) / 10;

    setTrainPct(tr);
    setValPct(vl);
    setTestPct(te);

    if (parsed.val > 0 && splitMode !== "train-val-test") {
      setSplitMode("train-val-test");
    }
    setError(null);
  };

  // ── Percentage sliders ────────────────────────────────────────────────────
  const handleTrainChange = (val: number) => {
    if (splitMode === "train-test") {
      const clamped = Math.min(99, Math.max(1, val));
      setTrainPct(clamped);
      setTestPct(100 - clamped);
    } else {
      // three-way: adjust test to compensate
      const clamped = Math.min(100 - valPct - 1, Math.max(1, val));
      setTrainPct(clamped);
      setTestPct(Math.max(0, 100 - clamped - valPct));
    }
  };

  const handleValChange = (val: number) => {
    const clamped = Math.min(100 - trainPct - 1, Math.max(0, val));
    setValPct(clamped);
    setTestPct(Math.max(0, 100 - trainPct - clamped));
  };

  const handleTestChange = (val: number) => {
    if (splitMode === "train-test") {
      const clamped = Math.min(99, Math.max(1, val));
      setTestPct(clamped);
      setTrainPct(100 - clamped);
    } else {
      const clamped = Math.min(100 - valPct - 1, Math.max(1, val));
      setTestPct(clamped);
      setTrainPct(Math.max(0, 100 - clamped - valPct));
    }
  };

  // ── Preset ────────────────────────────────────────────────────────────────
  const loadPreset = (p: typeof PRESETS[number]) => {
    const newMode: SplitMode = p.val > 0 ? "train-val-test" : "train-test";
    setSplitMode(newMode);
    setTrainPct(p.train);
    setValPct(p.val);
    setTestPct(p.test);
    setUseRatioMode(false);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setSplitMode("train-test");
    setDatasetRaw("10000");
    setTrainPct(80);
    setValPct(0);
    setTestPct(20);
    setRatioRaw("8:2");
    setUseRatioMode(false);
    setError(null);
  };

  // ── Load example ──────────────────────────────────────────────────────────
  const loadExample = () => {
    setSplitMode("train-val-test");
    setDatasetRaw("50000");
    setTrainPct(70);
    setValPct(15);
    setTestPct(15);
    setRatioRaw("7:1.5:1.5");
    setUseRatioMode(false);
  };

  // ── Copy ──────────────────────────────────────────────────────────────────
  const handleCopy = () => {
    if (!result) return;
    const datasetSize = parseInt(datasetRaw.replace(/,/g, ""), 10);
    navigator.clipboard.writeText(buildExportText(datasetSize, result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Export ────────────────────────────────────────────────────────────────
  const handleExportTxt = () => {
    if (!result) return;
    const datasetSize = parseInt(datasetRaw.replace(/,/g, ""), 10);
    downloadFile(buildExportText(datasetSize, result), "dataset-split-report.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    downloadFile(buildExportCSV(result), "dataset-split.csv", "text/csv");
  };

  const handleSave = () => {
    if (!result) return;
    const datasetSize = parseInt(datasetRaw.replace(/,/g, ""), 10);
    saveHistory(datasetSize, result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const datasetSize = parseInt(datasetRaw.replace(/,/g, ""), 10) || 0;
  const rec = result ? getRecommendation(datasetSize, trainPct, valPct) : null;

  const isPresetActive = (p: typeof PRESETS[number]) =>
    splitMode === (p.val > 0 ? "train-val-test" : "train-test") &&
    trainPct === p.train &&
    valPct === p.val &&
    testPct === p.test;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">✂️</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Dataset Split Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Split your dataset into training, validation, and testing sets using percentages or ratios.
              Supports 2-way and 3-way splits with smart rounding to preserve the total count.
              All calculations run locally in your browser.
            </p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1">
          {(
            [
              { id: "train-test", label: "Train / Test" },
              { id: "train-val-test", label: "Train / Val / Test" },
            ] as { id: SplitMode; label: string }[]
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setSplitMode(m.id)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                splitMode === m.id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: Inputs ── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Dataset size */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Dataset Size
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Total Samples
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={datasetRaw}
                  onChange={(e) => setDatasetRaw(e.target.value)}
                  placeholder="10000"
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono ${
                    error ? "border-red-300" : "border-gray-200"
                  }`}
                  aria-label="Total dataset size"
                />
                <p className="text-xs text-gray-400 mt-1">Positive integer, e.g. 10000</p>
              </div>
            </div>

            {/* Split percentages */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Split Percentages
                </h3>
                <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                  Math.abs(trainPct + valPct + testPct - 100) < 0.01
                    ? "text-green-700 bg-green-50"
                    : "text-red-700 bg-red-50"
                }`}>
                  {(trainPct + valPct + testPct).toFixed(1)}%
                </span>
              </div>

              {/* Train % */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Train %</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    step="1"
                    value={trainPct}
                    onChange={(e) => handleTrainChange(Number(e.target.value))}
                    className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg text-sm font-mono text-right focus:ring-2 focus:ring-primary focus:border-transparent"
                    aria-label="Training percentage"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="99"
                  step="1"
                  value={trainPct}
                  onChange={(e) => handleTrainChange(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Training percentage slider"
                />
              </div>

              {/* Val % (only in 3-way mode) */}
              {splitMode === "train-val-test" && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">Validation %</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      step="1"
                      value={valPct}
                      onChange={(e) => handleValChange(Number(e.target.value))}
                      className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg text-sm font-mono text-right focus:ring-2 focus:ring-primary focus:border-transparent"
                      aria-label="Validation percentage"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={valPct}
                    onChange={(e) => handleValChange(Number(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="Validation percentage slider"
                  />
                </div>
              )}

              {/* Test % */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Test %</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    step="1"
                    value={testPct}
                    onChange={(e) => handleTestChange(Number(e.target.value))}
                    className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg text-sm font-mono text-right focus:ring-2 focus:ring-primary focus:border-transparent"
                    aria-label="Test percentage"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="99"
                  step="1"
                  value={testPct}
                  onChange={(e) => handleTestChange(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Test percentage slider"
                />
              </div>
            </div>

            {/* Ratio input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Ratio Input
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={ratioRaw}
                  onChange={(e) => setRatioRaw(e.target.value)}
                  placeholder="8:2 or 7:1.5:1.5"
                  className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Ratio input"
                  onKeyDown={(e) => e.key === "Enter" && applyRatio()}
                />
                <button
                  onClick={applyRatio}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Apply
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Enter ratio parts separated by colons. Press Apply or Enter.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700" role="alert">
                {error}
              </div>
            )}

            <p className="text-xs text-gray-400 px-1">
              <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Ctrl+Enter</kbd> to recalculate
            </p>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={loadExample}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Load Example
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "Copy Results"}
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
                    History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-56 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-5 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : (
                    history.map((entry) => (
                      <div key={entry.id} className="p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs font-semibold text-primary font-mono">
                            {formatNumber(entry.datasetSize)} samples
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">{entry.label}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Quick presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => loadPreset(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      isPresetActive(p)
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary result */}
            {result ? (
              <>
                <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                  <p
                    className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Split Results — {formatNumber(result.total)} samples
                  </p>
                  <div className={`grid gap-3 ${result.valPct > 0 ? "grid-cols-3" : "grid-cols-2"}`}>
                    <div className="bg-white/10 rounded-lg py-3 px-3 text-center">
                      <div className="text-2xl font-bold font-mono">{formatNumber(result.trainCount)}</div>
                      <div className="text-xs text-primary-100 mt-0.5">Training</div>
                      <div className="text-xs text-primary-100 font-mono">{formatPct(result.trainPct)}</div>
                    </div>
                    {result.valPct > 0 && (
                      <div className="bg-white/10 rounded-lg py-3 px-3 text-center">
                        <div className="text-2xl font-bold font-mono">{formatNumber(result.valCount)}</div>
                        <div className="text-xs text-primary-100 mt-0.5">Validation</div>
                        <div className="text-xs text-primary-100 font-mono">{formatPct(result.valPct)}</div>
                      </div>
                    )}
                    <div className="bg-white/10 rounded-lg py-3 px-3 text-center">
                      <div className="text-2xl font-bold font-mono">{formatNumber(result.testCount)}</div>
                      <div className="text-xs text-primary-100 mt-0.5">Testing</div>
                      <div className="text-xs text-primary-100 font-mono">{formatPct(result.testPct)}</div>
                    </div>
                  </div>
                </div>

                {/* Visual split bar */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Dataset Visualization
                  </h3>
                  <div className="space-y-3">
                    {/* Combined bar */}
                    <div className="flex rounded-lg overflow-hidden h-8">
                      <div
                        className="bg-primary flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
                        style={{ width: `${result.trainPct}%` }}
                        title={`Train: ${formatPct(result.trainPct)}`}
                      >
                        {result.trainPct >= 20 ? `${result.trainPct}%` : ""}
                      </div>
                      {result.valPct > 0 && (
                        <div
                          className="bg-blue-400 flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
                          style={{ width: `${result.valPct}%` }}
                          title={`Val: ${formatPct(result.valPct)}`}
                        >
                          {result.valPct >= 10 ? `${result.valPct}%` : ""}
                        </div>
                      )}
                      <div
                        className="bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-semibold transition-all duration-500"
                        style={{ width: `${result.testPct}%` }}
                        title={`Test: ${formatPct(result.testPct)}`}
                      >
                        {result.testPct >= 10 ? `${result.testPct}%` : ""}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-primary inline-block" />
                        Train ({formatPct(result.trainPct)})
                      </span>
                      {result.valPct > 0 && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" />
                          Validation ({formatPct(result.valPct)})
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-gray-300 inline-block" />
                        Test ({formatPct(result.testPct)})
                      </span>
                    </div>

                    {/* Individual bars */}
                    <div className="space-y-2 pt-1">
                      {[
                        { label: "Training Set", count: result.trainCount, pct: result.trainPct, color: "bg-primary" },
                        ...(result.valPct > 0
                          ? [{ label: "Validation Set", count: result.valCount, pct: result.valPct, color: "bg-blue-400" }]
                          : []),
                        { label: "Testing Set", count: result.testCount, pct: result.testPct, color: "bg-gray-300" },
                      ].map(({ label, count, pct, color }) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{label}</span>
                            <span className="font-mono font-semibold">{formatNumber(count)} samples</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className={`${color} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Breakdown table */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                      Detailed Breakdown
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { label: "Training Set", count: result.trainCount, pct: result.trainPct, tooltip: "Used to train the model" },
                      ...(result.valPct > 0
                        ? [{ label: "Validation Set", count: result.valCount, pct: result.valPct, tooltip: "Used to tune hyperparameters" }]
                        : []),
                      { label: "Testing Set", count: result.testCount, pct: result.testPct, tooltip: "Used to evaluate final performance" },
                      { label: "Total", count: result.total, pct: 100, tooltip: "Total dataset samples" },
                    ].map(({ label, count, pct, tooltip }) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors" title={tooltip}>
                        <span className={`text-sm ${label === "Total" ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                          {label}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900 font-mono">
                            {formatNumber(count)}
                          </span>
                          <span className="text-xs text-gray-400 font-mono ml-2">
                            ({formatPct(pct)})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                {rec && (
                  <div className={`rounded-xl border p-4 ${rec.color}`}>
                    <p className="font-semibold text-sm mb-1">{rec.label}</p>
                    <p className="text-xs leading-relaxed">{rec.description}</p>
                  </div>
                )}

                {/* Educational cards */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    What Each Set Is For
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: "🏋️",
                        title: "Training Set",
                        desc: "The model learns patterns from this data. The larger this set, generally the better the model learns.",
                      },
                      ...(result.valPct > 0
                        ? [{
                            icon: "🔧",
                            title: "Validation Set",
                            desc: "Used during training to tune hyperparameters and detect overfitting. Not used for final evaluation.",
                          }]
                        : []),
                      {
                        icon: "🎯",
                        title: "Testing Set",
                        desc: "Held out entirely until final evaluation. Gives an unbiased estimate of real-world model performance.",
                      },
                    ].map(({ icon, title, desc }) => (
                      <div key={title} className="flex gap-3">
                        <span className="text-lg mt-0.5">{icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
                <div className="text-3xl mb-3">✂️</div>
                <p className="text-sm">Enter a dataset size to see the split results.</p>
                <p className="text-xs mt-2">
                  Try one of the quick presets or type your own values above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DatasetSplitCalculatorSEO />

      <RelatedTools
        currentTool="dataset-split-calculator"
        tools={[
          "model-accuracy-calculator",
          "confusion-matrix-calculator",
          "f1-score-calculator",
          "precision-recall-calculator",
          "ai-token-cost-calculator",
          "time-complexity-calculator",
        ]}
      />
    </>
  );
}
