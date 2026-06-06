"use client";

import { useState, useEffect, useCallback } from "react";
import type { CMInputs, HistoryEntry } from "./types";
import {
  calculateMetrics,
  validateInputs,
  pct,
  fmt,
  formatNumber,
  PRESETS,
  buildExportText,
  buildExportCSV,
  buildExportJSON,
  downloadFile,
  saveHistory,
  getHistory,
  clearHistory,
  debounce,
} from "./logic";
import PrecisionRecallCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// Metric card definition
interface MetricCard {
  key: string;
  label: string;
  value: (r: ReturnType<typeof calculateMetrics>) => string;
  description: string;
  color: string;
  stepKey?: string;
}

const METRIC_CARDS: MetricCard[] = [
  {
    key: "precision",
    label: "Precision",
    value: (r) => pct(r.precision),
    description: "Of all predicted positives, how many were correct?",
    color: "bg-blue-50 border-blue-200",
    stepKey: "precision",
  },
  {
    key: "recall",
    label: "Recall",
    value: (r) => pct(r.recall),
    description: "Of all actual positives, how many were detected?",
    color: "bg-green-50 border-green-200",
    stepKey: "recall",
  },
  {
    key: "f1",
    label: "F1 Score",
    value: (r) => pct(r.f1),
    description: "Harmonic mean of precision and recall.",
    color: "bg-purple-50 border-purple-200",
    stepKey: "f1",
  },
  {
    key: "accuracy",
    label: "Accuracy",
    value: (r) => pct(r.accuracy),
    description: "Fraction of all predictions that were correct.",
    color: "bg-primary/5 border-primary/20",
    stepKey: "accuracy",
  },
  {
    key: "specificity",
    label: "Specificity",
    value: (r) => pct(r.specificity),
    description: "Of all actual negatives, how many were correctly identified?",
    color: "bg-orange-50 border-orange-200",
    stepKey: "specificity",
  },
  {
    key: "npv",
    label: "NPV",
    value: (r) => pct(r.npv),
    description: "Negative Predictive Value — accuracy of negative predictions.",
    color: "bg-gray-50 border-gray-200",
  },
  {
    key: "fpr",
    label: "FPR",
    value: (r) => pct(r.fpr),
    description: "False Positive Rate (1 − Specificity).",
    color: "bg-red-50 border-red-200",
  },
  {
    key: "fnr",
    label: "FNR",
    value: (r) => pct(r.fnr),
    description: "False Negative Rate (1 − Recall).",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    key: "mcc",
    label: "MCC",
    value: (r) => fmt(r.mcc),
    description: "Matthews Correlation Coefficient (−1 to +1).",
    color: "bg-indigo-50 border-indigo-200",
    stepKey: "mcc",
  },
];

const DEFAULT_INPUTS: CMInputs = { tp: 90, fp: 10, fn: 15, tn: 885 };

export default function PrecisionRecallCalculatorUI() {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  const [inputs, setInputs] = useState<CMInputs>(DEFAULT_INPUTS);

  // ── UI state ───────────────────────────────────────────────────────────────
  const [result, setResult] = useState(() => calculateMetrics(DEFAULT_INPUTS));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [activeStepKey, setActiveStepKey] = useState<string>("precision");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // ── Calculation ────────────────────────────────────────────────────────────
  const run = useCallback(
    debounce((inp: CMInputs) => {
      const err = validateInputs(inp);
      if (err) { setError(err); return; }
      setError(null);
      setResult(calculateMetrics(inp));
    }, 80),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run(inputs);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inputs, run]);

  // ── Input handler ─────────────────────────────────────────────────────────
  const set = (field: keyof CMInputs, raw: string) => {
    const v = parseInt(raw, 10);
    setInputs((prev) => ({ ...prev, [field]: isNaN(v) ? 0 : Math.max(0, v) }));
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setError(null);
  };

  const handleCopy = () => {
    const text = [
      `Precision: ${pct(result.precision)}`,
      `Recall: ${pct(result.recall)}`,
      `F1 Score: ${pct(result.f1)}`,
      `Accuracy: ${pct(result.accuracy)}`,
      `Specificity: ${pct(result.specificity)}`,
      `MCC: ${fmt(result.mcc)}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => downloadFile(buildExportText(inputs, result), "precision-recall-report.txt");
  const handleExportCSV = () => downloadFile(buildExportCSV(inputs, result), "precision-recall-metrics.csv", "text/csv");
  const handleExportJSON = () => downloadFile(buildExportJSON(inputs, result), "precision-recall-metrics.json", "application/json");

  const handleSave = () => {
    saveHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    setInputs({ tp: p.tp, fp: p.fp, fn: p.fn, tn: p.tn });
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const total = inputs.tp + inputs.fp + inputs.fn + inputs.tn;
  const cmPct = (v: number) => total > 0 ? `${((v / total) * 100).toFixed(1)}%` : "0%";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">📊</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Precision Recall Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter your confusion matrix values (TP, FP, FN, TN) to instantly calculate precision, recall,
              F1 score, accuracy, specificity, and more. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs + actions */}
          <div className="lg:col-span-4 space-y-5">

            {/* Confusion matrix inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Confusion Matrix
              </h3>

              {/* 2×2 grid inputs mirroring confusion matrix layout */}
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { field: "tp", label: "True Positive (TP)", hint: "Correctly predicted positive", color: "border-green-300 focus:ring-green-400" },
                    { field: "fn", label: "False Negative (FN)", hint: "Missed positive (Type II)", color: "border-red-200 focus:ring-red-300" },
                    { field: "fp", label: "False Positive (FP)", hint: "Wrong positive (Type I)", color: "border-orange-200 focus:ring-orange-300" },
                    { field: "tn", label: "True Negative (TN)", hint: "Correctly predicted negative", color: "border-green-200 focus:ring-green-300" },
                  ] as { field: keyof CMInputs; label: string; hint: string; color: string }[]
                ).map(({ field, label, hint, color }) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={inputs[field]}
                      onChange={(e) => set(field, e.target.value)}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:border-transparent text-sm font-mono ${color}`}
                      aria-label={label}
                    />
                    <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Total summary */}
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-600">
                <span>Total samples</span>
                <span className="font-mono font-semibold text-gray-800">{formatNumber(total)}</span>
              </div>

              <p className="text-xs text-gray-400">
                <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Ctrl+Enter</kbd> to recalculate
              </p>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Reset
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    Save
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleExportTxt} className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">TXT</button>
                  <button onClick={handleExportCSV} className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">CSV</button>
                  <button onClick={handleExportJSON} className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">JSON</button>
                </div>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* Visual confusion matrix */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Confusion Matrix
              </h3>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="text-center py-2.5 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-bold text-green-700 text-base font-mono">{formatNumber(inputs.tp)}</div>
                  <div className="text-green-600 font-semibold">TP</div>
                  <div className="text-gray-400">{cmPct(inputs.tp)}</div>
                </div>
                <div className="text-center py-2.5 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-bold text-red-600 text-base font-mono">{formatNumber(inputs.fn)}</div>
                  <div className="text-red-500 font-semibold">FN</div>
                  <div className="text-gray-400">{cmPct(inputs.fn)}</div>
                </div>
                <div className="text-center py-2.5 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-bold text-orange-600 text-base font-mono">{formatNumber(inputs.fp)}</div>
                  <div className="text-orange-500 font-semibold">FP</div>
                  <div className="text-gray-400">{cmPct(inputs.fp)}</div>
                </div>
                <div className="text-center py-2.5 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-bold text-green-700 text-base font-mono">{formatNumber(inputs.tn)}</div>
                  <div className="text-green-600 font-semibold">TN</div>
                  <div className="text-gray-400">{cmPct(inputs.tn)}</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                <span>← Predicted Pos | Predicted Neg →</span>
              </div>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    History
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
                      <div
                        key={entry.id}
                        onClick={() => loadFromHistory(entry)}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-mono text-gray-600">
                            TP:{entry.inputs.tp} FP:{entry.inputs.fp} FN:{entry.inputs.fn} TN:{entry.inputs.tn}
                          </span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-xs text-primary font-semibold font-mono">
                          P:{pct(entry.result.precision)} R:{pct(entry.result.recall)} F1:{pct(entry.result.f1)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8 space-y-5">

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Example Scenarios
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = inputs.tp === p.tp && inputs.fp === p.fp && inputs.fn === p.fn && inputs.tn === p.tn;
                  return (
                    <button
                      key={p.label}
                      onClick={() => loadPreset(p)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary metric summary card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ fontFamily: "var(--font-heading)" }}>
                Key Metrics
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Precision", val: pct(result.precision) },
                  { label: "Recall", val: pct(result.recall) },
                  { label: "F1 Score", val: pct(result.f1) },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-white/10 rounded-lg py-3 px-2 text-center">
                    <div className="text-xl font-bold font-mono">{val}</div>
                    <div className="text-xs text-primary-100 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  { label: "Accuracy", val: pct(result.accuracy) },
                  { label: "Specificity", val: pct(result.specificity) },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-white/10 rounded-lg py-2 px-3 flex justify-between items-center">
                    <span className="text-xs text-primary-100">{label}</span>
                    <span className="font-mono font-semibold text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* All metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {METRIC_CARDS.map((card) => (
                <div
                  key={card.key}
                  className={`rounded-xl border p-4 ${card.color} ${card.stepKey ? "cursor-pointer hover:shadow-sm transition-shadow" : ""}`}
                  onClick={() => {
                    if (card.stepKey) {
                      setActiveStepKey(card.stepKey);
                      setShowSteps(true);
                    }
                  }}
                  title={card.stepKey ? "Click to see formula" : undefined}
                >
                  <div className="text-xs text-gray-500 mb-1">{card.label}</div>
                  <div className="text-xl font-bold text-gray-900 font-mono">{card.value(result)}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-snug">{card.description}</div>
                </div>
              ))}
            </div>

            {/* Precision/Recall bar comparison */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Metrics Overview
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Precision", v: result.precision, color: "bg-blue-400" },
                  { label: "Recall", v: result.recall, color: "bg-green-400" },
                  { label: "F1 Score", v: result.f1, color: "bg-purple-400" },
                  { label: "Accuracy", v: result.accuracy, color: "bg-primary" },
                  { label: "Specificity", v: result.specificity, color: "bg-orange-400" },
                ].map(({ label, v, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{label}</span>
                      <span className="font-mono font-semibold">{pct(v)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${v * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula steps panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Step-by-Step Formulas
                </h3>
                <span className="text-xs text-gray-500">{showSteps ? "▲ Hide" : "▼ Show"}</span>
              </button>
              {showSteps && (
                <div className="p-5 space-y-4">
                  {/* Metric selector tabs */}
                  <div className="flex flex-wrap gap-1">
                    {(["precision", "recall", "f1", "accuracy", "specificity", "mcc"] as const).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveStepKey(key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                          activeStepKey === key
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {key === "f1" ? "F1 Score" : key === "mcc" ? "MCC" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs space-y-0.5 overflow-x-auto">
                    {(result.steps[activeStepKey] ?? []).map((line, i) => (
                      <div key={i} className="text-gray-700 whitespace-pre">{line}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <PrecisionRecallCalculatorSEO />

      <RelatedTools
        currentTool="precision-recall-calculator"
        tools={[
          "model-accuracy-calculator",
          "ai-token-cost-calculator",
          "ai-prompt-length-calculator",
          "time-complexity-calculator",
          "latency-calculator",
          "data-transfer-calculator",
        ]}
      />
    </>
  );
}
