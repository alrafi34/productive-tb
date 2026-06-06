"use client";

import { useState, useEffect, useCallback } from "react";
import type { InputMode, ConfusionInputs, PRInputs, HistoryEntry } from "./types";
import {
  calcFromConfusion,
  calcFromPR,
  validateConfusion,
  validatePR,
  parsePRInput,
  pct,
  fmtD,
  formatNumber,
  PRESETS,
  buildExportText,
  buildExportJSON,
  downloadFile,
  saveHistory,
  getHistory,
  clearHistory,
  debounce,
} from "./logic";
import F1ScoreCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const TIER_COLORS: Record<string, string> = {
  excellent: "text-green-700 bg-green-50 border-green-200",
  good:      "text-blue-700 bg-blue-50 border-blue-200",
  moderate:  "text-yellow-700 bg-yellow-50 border-yellow-200",
  poor:      "text-red-700 bg-red-50 border-red-200",
};

const TIER_ICONS: Record<string, string> = {
  excellent: "🎯", good: "✅", moderate: "⏳", poor: "⚠️",
};

const DEFAULT_CM: ConfusionInputs = { tp: 80, fp: 20, fn: 10, tn: 890 };
const DEFAULT_PR: PRInputs = { precision: 0.80, recall: 0.8889 };

export default function F1ScoreCalculatorUI() {
  // ── Mode ───────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<InputMode>("confusion");

  // ── Confusion matrix inputs ────────────────────────────────────────────────
  const [cm, setCm] = useState<ConfusionInputs>(DEFAULT_CM);

  // ── PR inputs (stored as raw strings to allow "75%" entry) ────────────────
  const [precRaw, setPrecRaw] = useState("0.80");
  const [recRaw, setRecRaw] = useState("0.8889");

  // ── UI state ───────────────────────────────────────────────────────────────
  const [result, setResult] = useState(() => calcFromConfusion(DEFAULT_CM));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => { setHistory(getHistory()); }, []);

  // ── Calculation ────────────────────────────────────────────────────────────
  const run = useCallback(
    debounce((m: InputMode, cmv: ConfusionInputs, prec: string, rec: string) => {
      if (m === "confusion") {
        const err = validateConfusion(cmv);
        if (err) { setError(err); return; }
        setError(null);
        setResult(calcFromConfusion(cmv));
      } else {
        const p = parsePRInput(prec);
        const r = parsePRInput(rec);
        const err = validatePR({ precision: p, recall: r });
        if (err) { setError(err); return; }
        setError(null);
        setResult(calcFromPR({ precision: p, recall: r }));
      }
    }, 80),
    []
  );

  useEffect(() => { run(mode, cm, precRaw, recRaw); }, [mode, cm, precRaw, recRaw, run]);

  // Keyboard shortcut
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run(mode, cm, precRaw, recRaw);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [mode, cm, precRaw, recRaw, run]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const setCMField = (field: keyof ConfusionInputs, raw: string) => {
    const v = parseInt(raw, 10);
    setCm((prev) => ({ ...prev, [field]: isNaN(v) ? 0 : Math.max(0, v) }));
  };

  const handleReset = () => {
    setCm(DEFAULT_CM);
    setPrecRaw("0.80");
    setRecRaw("0.8889");
    setError(null);
  };

  const handleCopy = () => {
    const text = [
      `F1 Score:  ${pct(result.f1)}  (${fmtD(result.f1)})`,
      `Precision: ${pct(result.precision)}  (${fmtD(result.precision)})`,
      `Recall:    ${pct(result.recall)}  (${fmtD(result.recall)})`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => downloadFile(buildExportText(mode, result), "f1-score-report.txt");
  const handleExportJSON = () => downloadFile(buildExportJSON(result), "f1-score-result.json", "application/json");

  const handleSave = () => {
    saveHistory(mode, result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all history?")) { clearHistory(); setHistory([]); }
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    if (p.mode === "confusion") {
      setMode("confusion");
      setCm({ tp: p.tp, fp: p.fp, fn: p.fn, tn: p.tn });
    } else {
      setMode("pr");
      setPrecRaw(String(p.pr!.precision));
      setRecRaw(String(p.pr!.recall));
    }
  };

  // ── Confusion matrix visual pct ───────────────────────────────────────────
  const total = cm.tp + cm.fp + cm.fn + cm.tn;
  const cmPct = (v: number) => total > 0 ? `${((v / total) * 100).toFixed(1)}%` : "0%";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🧮</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              F1 Score Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Calculate F1 score from confusion matrix values (TP, FP, FN) or directly from precision and recall.
              Instant results with step-by-step formulas. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1">
          {([
            { id: "confusion", label: "Confusion Matrix" },
            { id: "pr",        label: "Precision & Recall" },
          ] as { id: InputMode; label: string }[]).map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m.id ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs + actions */}
          <div className="lg:col-span-4 space-y-5">

            {/* Confusion matrix inputs */}
            {mode === "confusion" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Confusion Matrix
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { field: "tp", label: "True Positive (TP)", hint: "Correct positive", border: "border-green-300 focus:ring-green-400" },
                      { field: "fn", label: "False Negative (FN)", hint: "Missed positive", border: "border-red-200 focus:ring-red-300" },
                      { field: "fp", label: "False Positive (FP)", hint: "Wrong positive", border: "border-orange-200 focus:ring-orange-300" },
                      { field: "tn", label: "True Negative (TN)", hint: "Correct negative", border: "border-green-200 focus:ring-green-300" },
                    ] as { field: keyof ConfusionInputs; label: string; hint: string; border: string }[]
                  ).map(({ field, label, hint, border }) => (
                    <div key={field}>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
                      <input
                        type="number"
                        min="0"
                        value={cm[field]}
                        onChange={(e) => setCMField(field, e.target.value)}
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:border-transparent text-sm font-mono ${border}`}
                        aria-label={label}
                      />
                      <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between px-1 text-xs text-gray-500">
                  <span>Total: <strong className="font-mono">{formatNumber(total)}</strong></span>
                  <span>TN not needed for F1</span>
                </div>

                {/* Visual confusion matrix */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Visual Matrix</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {[
                      { label: "TP", val: cm.tp, color: "bg-green-50 border-green-200 text-green-700" },
                      { label: "FN", val: cm.fn, color: "bg-red-50 border-red-200 text-red-600" },
                      { label: "FP", val: cm.fp, color: "bg-orange-50 border-orange-200 text-orange-600" },
                      { label: "TN", val: cm.tn, color: "bg-green-50 border-green-200 text-green-700" },
                    ].map(({ label, val, color }) => (
                      <div key={label} className={`text-center py-2 border rounded-lg ${color}`}>
                        <div className="font-bold text-sm font-mono">{formatNumber(val)}</div>
                        <div className="font-semibold">{label}</div>
                        <div className="text-gray-400">{cmPct(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Precision & Recall inputs */}
            {mode === "pr" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Precision & Recall
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Precision
                  </label>
                  <input
                    type="text"
                    value={precRaw}
                    onChange={(e) => setPrecRaw(e.target.value)}
                    placeholder="0.80 or 80%"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    aria-label="Precision"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Enter decimal (0.80) or percentage (80%) · parsed: {fmtD(parsePRInput(precRaw))}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Recall
                  </label>
                  <input
                    type="text"
                    value={recRaw}
                    onChange={(e) => setRecRaw(e.target.value)}
                    placeholder="0.89 or 89%"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    aria-label="Recall"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Enter decimal (0.89) or percentage (89%) · parsed: {fmtD(parsePRInput(recRaw))}
                  </p>
                </div>

                {/* Formula hint */}
                <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600">
                  F1 = 2 × P × R ÷ (P + R)
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
                {error}
              </div>
            )}

            <p className="text-xs text-gray-400 px-1">
              <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Ctrl+Enter</kbd> to recalculate
            </p>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleExportTxt} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Export TXT</button>
                <button onClick={handleExportJSON} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Export JSON</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleSave} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Save</button>
                <button onClick={() => setShowHistory(!showHistory)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-56 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-5 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : (
                    history.map((entry) => (
                      <div key={entry.id} className="p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs font-semibold text-primary font-mono">{pct(entry.result.f1)}</span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">{entry.label}</div>
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
                  const activeCM = mode === "confusion" && p.mode === "confusion" && cm.tp === p.tp && cm.fp === p.fp && cm.fn === p.fn;
                  const activePR = mode === "pr" && p.mode === "pr" && p.pr && precRaw === String(p.pr.precision) && recRaw === String(p.pr.recall);
                  const active = activeCM || activePR;
                  return (
                    <button
                      key={p.label}
                      onClick={() => loadPreset(p)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ fontFamily: "var(--font-heading)" }}>
                F1 Score Result
              </p>
              <div className="text-5xl font-bold font-mono mb-1">{pct(result.f1)}</div>
              <div className="text-sm text-primary-100 mb-4">{fmtD(result.f1)} · {result.tierLabel}</div>
              {/* Accuracy bar */}
              <div className="w-full bg-white/20 rounded-full h-2.5 mb-5">
                <div
                  className="bg-white h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${result.f1 * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Precision", val: pct(result.precision) },
                  { label: "Recall", val: pct(result.recall) },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-white/10 rounded-lg py-3 px-3 text-center">
                    <div className="text-xl font-bold font-mono">{val}</div>
                    <div className="text-xs text-primary-100 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance badge */}
            <div className={`rounded-xl border p-4 ${TIER_COLORS[result.tier]}`}>
              <span className="font-semibold text-sm">
                {TIER_ICONS[result.tier]} {result.tierLabel} F1 Score
              </span>
              <p className="text-xs mt-1 leading-relaxed">{result.explanation}</p>
            </div>

            {/* All metrics */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                All Metrics
              </h3>
              <div className="space-y-3">
                {[
                  { label: "F1 Score",  v: result.f1,        color: "bg-primary" },
                  { label: "Precision", v: result.precision, color: "bg-blue-400" },
                  { label: "Recall",    v: result.recall,    color: "bg-green-400" },
                  ...(result.accuracy !== undefined ? [
                    { label: "Accuracy",    v: result.accuracy,    color: "bg-purple-400" },
                    { label: "Specificity", v: result.specificity ?? 0, color: "bg-orange-400" },
                  ] : []),
                ].map(({ label, v, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{label}</span>
                      <span className="font-mono font-semibold">{pct(v)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${color} h-2 rounded-full transition-all duration-300`} style={{ width: `${v * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra metrics from confusion matrix */}
            {result.accuracy !== undefined && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Extended Metrics
                  </h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Accuracy",     val: pct(result.accuracy) },
                    { label: "Specificity",  val: pct(result.specificity ?? 0) },
                    { label: "NPV",          val: pct(result.npv ?? 0) },
                    { label: "MCC",          val: fmtD(result.mcc ?? 0) },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className="text-sm font-semibold text-gray-900 font-mono">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-step formulas */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Step-by-Step Calculation
                </h3>
                <span className="text-xs text-gray-500">{showSteps ? "▲ Hide" : "▼ Show"}</span>
              </button>
              {showSteps && (
                <div className="p-5">
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-0.5">
                    {result.steps.map((line, i) => (
                      <div key={i} className={line === "" ? "h-2" : "text-gray-700 whitespace-pre"}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <F1ScoreCalculatorSEO />

      <RelatedTools
        currentTool="f1-score-calculator"
        tools={[
          "precision-recall-calculator",
          "model-accuracy-calculator",
          "ai-token-cost-calculator",
          "ai-prompt-length-calculator",
          "time-complexity-calculator",
          "latency-calculator",
        ]}
      />
    </>
  );
}
