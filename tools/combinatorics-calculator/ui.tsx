"use client";

import { useState, useEffect, useCallback } from "react";
import type { Operation, MultisetGroup, CalcResult, HistoryEntry } from "./types";
import {
  compute,
  validateInputs,
  buildExportText,
  downloadFile,
  saveHistory,
  getHistory,
  clearHistory,
  debounce,
  PRESETS,
  OP_META,
  formatNumber,
} from "./logic";
import CombinatoricsCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_OP: Operation = "combination";
const DEFAULT_N = 10;
const DEFAULT_R = 3;

// Default multiset groups (e.g. MISSISSIPPI-like: 4+3+2+1 = 10)
const DEFAULT_GROUPS: MultisetGroup[] = [
  { count: 4 },
  { count: 3 },
  { count: 2 },
  { count: 1 },
];

export default function CombinatoricsCalculatorUI() {
  // ── State ────────────────────────────────────────────────────────────────
  const [op, setOp] = useState<Operation>(DEFAULT_OP);
  const [nRaw, setNRaw] = useState(String(DEFAULT_N));
  const [rRaw, setRRaw] = useState(String(DEFAULT_R));
  const [sciMode, setSciMode] = useState(false);
  const [groups, setGroups] = useState<MultisetGroup[]>(DEFAULT_GROUPS);

  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSteps, setShowSteps] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => { setHistory(getHistory()); }, []);

  // ── Derived integers ──────────────────────────────────────────────────────
  const n = parseInt(nRaw, 10);
  const r = parseInt(rRaw, 10);

  // ── Calculation ───────────────────────────────────────────────────────────
  const run = useCallback(
    debounce((operation: Operation, nVal: number, rVal: number, grps: MultisetGroup[], sci: boolean) => {
      const err = validateInputs(operation, nVal, rVal, grps);
      if (err) { setError(err); setResult(null); return; }
      setError(null);
      const res = compute(operation, nVal, rVal, grps, sci);
      setResult(res);
    }, 100),
    []
  );

  useEffect(() => {
    run(op, isNaN(n) ? 0 : n, isNaN(r) ? 0 : r, groups, sciMode);
  }, [op, nRaw, rRaw, groups, sciMode, run]);

  // Keyboard shortcut
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        run(op, isNaN(n) ? 0 : n, isNaN(r) ? 0 : r, groups, sciMode);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [op, n, r, groups, sciMode, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleReset = () => {
    setOp(DEFAULT_OP);
    setNRaw(String(DEFAULT_N));
    setRRaw(String(DEFAULT_R));
    setSciMode(false);
    setGroups(DEFAULT_GROUPS);
    setError(null);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `${result.notation} = ${result.valueStr}\nFormula: ${result.formula}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile(
      buildExportText(op, isNaN(n) ? 0 : n, isNaN(r) ? 0 : r, result),
      "combinatorics-report.txt"
    );
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(op, isNaN(n) ? 0 : n, isNaN(r) ? 0 : r, groups, result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all history?")) { clearHistory(); setHistory([]); }
  };

  const loadPreset = (p: typeof PRESETS[number]) => {
    setOp(p.op);
    setNRaw(String(p.n));
    setRRaw(String(p.r));
    setSciMode(false);
  };

  // ── Multiset group helpers ────────────────────────────────────────────────
  const updateGroup = (i: number, val: string) => {
    const v = parseInt(val, 10);
    setGroups((prev) => prev.map((g, idx) => idx === i ? { count: isNaN(v) ? 0 : Math.max(0, v) } : g));
  };
  const addGroup = () => setGroups((prev) => [...prev, { count: 1 }]);
  const removeGroup = (i: number) => setGroups((prev) => prev.filter((_, idx) => idx !== i));

  // ── Auto-sync multiset n ──────────────────────────────────────────────────
  const multisetSum = groups.reduce((a, g) => a + g.count, 0);

  const meta = OP_META[op];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🔢</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Combinatorics Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Calculate permutations, combinations, factorials, circular arrangements, and multiset
              permutations instantly. Step-by-step formulas included. All calculations run locally
              in your browser using exact BigInt arithmetic.
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Example Presets
          </h3>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => loadPreset(p)}
                title={p.hint}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  op === p.op && n === p.n && r === p.r
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── LEFT: Inputs ── */}
          <div className="lg:col-span-4 space-y-5">

            {/* Operation selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Operation
              </h3>
              <div>
                <select
                  value={op}
                  onChange={(e) => setOp(e.target.value as Operation)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  aria-label="Combinatorics operation"
                >
                  {(Object.keys(OP_META) as Operation[]).map((key) => (
                    <option key={key} value={key}>{OP_META[key].label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1.5">{meta.hint}</p>
              </div>
            </div>

            {/* n and r inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Values
              </h3>

              {/* n input — for multiset, show the auto-sum hint */}
              {op === "multiset" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Total items (n)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={nRaw}
                    onChange={(e) => setNRaw(e.target.value)}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono ${
                      multisetSum !== (parseInt(nRaw, 10) || 0) ? "border-yellow-300" : "border-gray-200"
                    }`}
                    aria-label="Total items n"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Group counts sum: <strong className="font-mono">{multisetSum}</strong>
                    {multisetSum !== (parseInt(nRaw, 10) || 0) && (
                      <span className="text-yellow-600 ml-1">— must equal n</span>
                    )}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Total items (n)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={nRaw}
                    onChange={(e) => setNRaw(e.target.value)}
                    placeholder="10"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    aria-label="Total items n"
                  />
                  <p className="text-xs text-gray-400 mt-1">Non-negative integer · max 1000</p>
                </div>
              )}

              {/* r input — only when needed */}
              {meta.needsR && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Selected items (r)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={rRaw}
                    onChange={(e) => setRRaw(e.target.value)}
                    placeholder="3"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    aria-label="Selected items r"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {op === "perm-repetition" ? "Exponent / positions" : "Must satisfy r ≤ n"}
                  </p>
                </div>
              )}

              {/* Multiset group editor */}
              {op === "multiset" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Groups (identical item counts)
                  </label>
                  <div className="space-y-2">
                    {groups.map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-5 text-right">{String.fromCharCode(97 + i)}:</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={g.count}
                          onChange={(e) => updateGroup(i, e.target.value)}
                          className="flex-1 px-2.5 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                          aria-label={`Group ${String.fromCharCode(65 + i)} count`}
                        />
                        {groups.length > 2 && (
                          <button
                            onClick={() => removeGroup(i)}
                            className="text-gray-400 hover:text-red-500 transition-colors text-sm px-1"
                            aria-label="Remove group"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addGroup}
                    className="mt-2 text-xs text-primary font-medium hover:underline"
                  >
                    + Add group
                  </button>
                </div>
              )}

              {/* Scientific notation toggle */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="sci-toggle">
                  Scientific notation
                </label>
                <button
                  id="sci-toggle"
                  role="switch"
                  aria-checked={sciMode}
                  onClick={() => setSciMode(!sciMode)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${sciMode ? "bg-primary" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${sciMode ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
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
                <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  Reset
                </button>
                <button onClick={handleCopy} disabled={!result || !!error} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleExport} disabled={!result || !!error} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  Export TXT
                </button>
                <button onClick={handleSave} disabled={!result || !!error} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  Save
                </button>
              </div>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                {showHistory ? "Hide" : "Show"} History
              </button>
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
                      <div
                        key={entry.id}
                        className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setOp(entry.operation);
                          setNRaw(String(entry.n));
                          setRRaw(String(entry.r));
                          if (entry.multiset?.length) setGroups(entry.multiset);
                        }}
                      >
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs font-semibold text-primary font-mono">{entry.result.notation}</span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">= {entry.result.valueStr}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Results ── */}
          <div className="lg:col-span-8 space-y-5">

            {result && !error ? (
              <>
                {/* Primary result */}
                <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {meta.label}
                  </p>
                  <div className="text-4xl font-bold font-mono mb-1 break-all leading-tight">
                    {result.overflow
                      ? <span className="text-2xl text-primary-100">Result too large — enable scientific notation</span>
                      : result.valueStr
                    }
                  </div>
                  <div className="text-sm text-primary-100 mt-1 font-mono">
                    {result.notation} = {result.valueStr}
                  </div>
                  {result.formula && (
                    <div className="mt-3 bg-white/10 rounded-lg px-3 py-2 font-mono text-sm text-primary-100">
                      {result.formula}
                    </div>
                  )}
                </div>

                {/* Quick stats */}
                {!result.overflow && result.value !== null && (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Result",     val: result.valueStr },
                      { label: "Notation",   val: result.notation },
                      { label: "Operation",  val: meta.label.split("(")[0].trim() },
                    ].map(({ label, val }) => (
                      <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                        <div className="text-xs text-gray-500 mb-1">{label}</div>
                        <div className="font-semibold text-gray-900 text-sm font-mono break-all">{val}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step-by-step */}
                {result.steps.length > 0 && (
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
                        <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-1">
                          {result.steps.map((line, i) => (
                            <div key={i} className="text-gray-700 whitespace-pre">{line}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Educational explanation */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    What This Means
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.explanation}</p>

                  {/* Inline cheat-sheet for the selected operation */}
                  <div className="mt-4 bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600 space-y-0.5">
                    {op === "factorial" && (
                      <>
                        <div>n! = n × (n−1) × … × 2 × 1</div>
                        <div>0! = 1  (by definition)</div>
                      </>
                    )}
                    {op === "permutation" && (
                      <>
                        <div>nPr = n! ÷ (n−r)!</div>
                        <div>Order matters</div>
                      </>
                    )}
                    {op === "combination" && (
                      <>
                        <div>nCr = n! ÷ (r! × (n−r)!)</div>
                        <div>Order does not matter</div>
                      </>
                    )}
                    {op === "perm-repetition" && (
                      <>
                        <div>n^r  (n raised to r)</div>
                        <div>Each position can repeat any item</div>
                      </>
                    )}
                    {op === "comb-repetition" && (
                      <>
                        <div>C(n+r−1, r) = (n+r−1)! ÷ (r! × (n−1)!)</div>
                        <div>Stars and bars formula</div>
                      </>
                    )}
                    {op === "circular" && (
                      <>
                        <div>(n−1)!  (fix one position, arrange the rest)</div>
                        <div>Rotations are considered identical</div>
                      </>
                    )}
                    {op === "multiset" && (
                      <>
                        <div>n! ÷ (a! × b! × c! × …)</div>
                        <div>Items within each group are identical</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Related formulas quick reference */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                      Formula Reference
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {(
                      [
                        ["Factorial",                 "n!",                            "n × (n−1) × … × 1"],
                        ["Permutation",               "nPr",                           "n! ÷ (n−r)!"],
                        ["Combination",               "nCr",                           "n! ÷ (r! × (n−r)!)"],
                        ["Perm w/ Repetition",        "nʳ",                            "n raised to power r"],
                        ["Comb w/ Repetition",        "C(n+r−1, r)",                   "(n+r−1)! ÷ (r!(n−1)!)"],
                        ["Circular Permutation",      "(n−1)!",                        "Fix one, arrange rest"],
                        ["Multiset Permutation",      "n! ÷ (a!b!c!…)",               "Divide by group factorials"],
                      ] as [string, string, string][]
                    ).map(([name, notation, formula]) => (
                      <div
                        key={name}
                        className={`flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors ${
                          OP_META[op].label.startsWith(name) ? "bg-primary/5" : ""
                        }`}
                      >
                        <span className="text-sm text-gray-700 font-medium">{name}</span>
                        <div className="text-right">
                          <span className="text-sm font-mono font-semibold text-primary">{notation}</span>
                          <span className="text-xs text-gray-400 ml-2 font-mono">{formula}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : error ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
                <div className="text-3xl mb-3">⚠️</div>
                <p className="text-sm text-red-600 font-medium">{error}</p>
                <p className="text-xs text-gray-400 mt-2">Adjust your inputs to resolve the issue.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
                <div className="text-3xl mb-3">🔢</div>
                <p className="text-sm">Select an operation and enter values to calculate.</p>
                <p className="text-xs mt-2">Try one of the example presets to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CombinatoricsCalculatorSEO />

      <RelatedTools
        currentTool="combinatorics-calculator"
        tools={[
          "model-accuracy-calculator",
          "dataset-split-calculator",
          "f1-score-calculator",
          "time-complexity-calculator",
          "standard-deviation-calculator",
          "percentage-calculator",
        ]}
      />
    </>
  );
}
