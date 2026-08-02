"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  calculateGoodnessOfFit, calculateIndependence, formatNum, debounce, cramersVLabel,
  saveHistory, getHistory, clearHistory,
  buildGoodnessTextReport, buildIndependenceTextReport, buildGoodnessCSV, buildIndependenceCSV,
  buildGoodnessJSON, buildIndependenceJSON,
  SIGNIFICANCE_LEVELS, DEFAULT_ALPHA, DEFAULT_GOODNESS_ROWS,
  DEFAULT_INDEPENDENCE_ROW_LABELS, DEFAULT_INDEPENDENCE_COL_LABELS, DEFAULT_INDEPENDENCE_TABLE,
  type TestMode, type GoodnessRow, type GoodnessResult, type IndependenceResult, type HistoryEntry,
} from "./logic";
import { contributionColor, residualColor } from "./chart";
import ChiSquareCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

function cloneTable(t: number[][]): number[][] {
  return t.map((row) => [...row]);
}

export default function ChiSquareCalculatorUI() {
  const [mode, setMode] = useState<TestMode>("goodness-of-fit");
  const [alpha, setAlpha] = useState<number>(DEFAULT_ALPHA);
  const [customAlpha, setCustomAlpha] = useState("0.05");
  const [useCustomAlpha, setUseCustomAlpha] = useState(false);

  const [rows, setRows] = useState<GoodnessRow[]>(DEFAULT_GOODNESS_ROWS.map((r) => ({ ...r })));
  const [rowLabels, setRowLabels] = useState<string[]>([...DEFAULT_INDEPENDENCE_ROW_LABELS]);
  const [colLabels, setColLabels] = useState<string[]>([...DEFAULT_INDEPENDENCE_COL_LABELS]);
  const [table, setTable] = useState<number[][]>(cloneTable(DEFAULT_INDEPENDENCE_TABLE));

  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const effectiveAlpha = useCustomAlpha ? (parseFloat(customAlpha) || 0.05) : alpha;

  const [goodnessResult, setGoodnessResult] = useState<GoodnessResult>(() => calculateGoodnessOfFit(rows, effectiveAlpha));
  const [independenceResult, setIndependenceResult] = useState<IndependenceResult>(() => calculateIndependence(table, effectiveAlpha));

  useEffect(() => { setHistory(getHistory()); }, []);

  const computeGoodness = useCallback(
    debounce((r: GoodnessRow[], a: number) => setGoodnessResult(calculateGoodnessOfFit(r, a)), 150),
    []
  );
  const computeIndependence = useCallback(
    debounce((t: number[][], a: number) => setIndependenceResult(calculateIndependence(t, a)), 150),
    []
  );

  useEffect(() => { computeGoodness(rows, effectiveAlpha); }, [rows, effectiveAlpha, computeGoodness]);
  useEffect(() => { computeIndependence(table, effectiveAlpha); }, [table, effectiveAlpha, computeIndependence]);

  // ── Goodness of fit table handlers ──
  const updateRow = (i: number, field: keyof GoodnessRow, value: string) => {
    setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: field === "label" ? value : (parseFloat(value)) } : r));
  };
  const addGoodnessRow = () => {
    if (rows.length >= 12) return;
    setRows((prev) => [...prev, { label: `Category ${prev.length + 1}`, observed: 0, expected: 0 }]);
  };
  const removeGoodnessRow = (i: number) => {
    if (rows.length <= 2) return;
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ── Independence table handlers ──
  const updateCell = (i: number, j: number, value: string) => {
    setTable((prev) => { const next = cloneTable(prev); next[i][j] = parseFloat(value); return next; });
  };
  const updateRowLabel = (i: number, value: string) => setRowLabels((prev) => prev.map((l, idx) => idx === i ? value : l));
  const updateColLabel = (j: number, value: string) => setColLabels((prev) => prev.map((l, idx) => idx === j ? value : l));
  const addTableRow = () => {
    if (rowLabels.length >= 10) return;
    setRowLabels((prev) => [...prev, `Row ${prev.length + 1}`]);
    setTable((prev) => [...prev, Array(colLabels.length).fill(0)]);
  };
  const removeTableRow = () => {
    if (rowLabels.length <= 2) return;
    setRowLabels((prev) => prev.slice(0, -1));
    setTable((prev) => prev.slice(0, -1));
  };
  const addTableCol = () => {
    if (colLabels.length >= 10) return;
    setColLabels((prev) => [...prev, `Col ${prev.length + 1}`]);
    setTable((prev) => prev.map((row) => [...row, 0]));
  };
  const removeTableCol = () => {
    if (colLabels.length <= 2) return;
    setColLabels((prev) => prev.slice(0, -1));
    setTable((prev) => prev.map((row) => row.slice(0, -1)));
  };

  const handleReset = () => {
    setRows(DEFAULT_GOODNESS_ROWS.map((r) => ({ ...r })));
    setRowLabels([...DEFAULT_INDEPENDENCE_ROW_LABELS]);
    setColLabels([...DEFAULT_INDEPENDENCE_COL_LABELS]);
    setTable(cloneTable(DEFAULT_INDEPENDENCE_TABLE));
    setAlpha(DEFAULT_ALPHA);
    setUseCustomAlpha(false);
  };

  const handleRandomExample = () => {
    if (mode === "goodness-of-fit") {
      const n = rows.length;
      const total = 100 + Math.floor(Math.random() * 300);
      const expectedEach = Math.round(total / n);
      setRows(rows.map((r, i) => ({ ...r, expected: expectedEach, observed: Math.max(0, expectedEach + Math.round((Math.random() - 0.5) * expectedEach)) })));
    } else {
      setTable(table.map((row) => row.map(() => Math.floor(5 + Math.random() * 50))));
    }
  };

  const handleCopy = () => {
    const text = mode === "goodness-of-fit"
      ? buildGoodnessTextReport(rows, goodnessResult, effectiveAlpha)
      : buildIndependenceTextReport(rowLabels, colLabels, independenceResult, effectiveAlpha);
    navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCSV = () => download(
    mode === "goodness-of-fit" ? buildGoodnessCSV(rows, goodnessResult) : buildIndependenceCSV(rowLabels, colLabels, independenceResult),
    "text/csv", "chi-square-results.csv"
  );
  const handleDownloadJSON = () => download(
    mode === "goodness-of-fit" ? buildGoodnessJSON(rows, goodnessResult, effectiveAlpha) : buildIndependenceJSON(rowLabels, colLabels, independenceResult, effectiveAlpha),
    "application/json", "chi-square-data.json"
  );
  const handleDownloadTXT = () => download(
    mode === "goodness-of-fit" ? buildGoodnessTextReport(rows, goodnessResult, effectiveAlpha) : buildIndependenceTextReport(rowLabels, colLabels, independenceResult, effectiveAlpha),
    "text/plain", "chi-square-report.txt"
  );

  const handlePrint = () => {
    const text = mode === "goodness-of-fit"
      ? buildGoodnessTextReport(rows, goodnessResult, effectiveAlpha)
      : buildIndependenceTextReport(rowLabels, colLabels, independenceResult, effectiveAlpha);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Chi-Square Report</title><style>body{font-family:-apple-system,Arial,sans-serif;padding:40px;max-width:640px;margin:0 auto;white-space:pre-wrap;font-size:14px;color:#111827;}</style></head><body>${text}</body></html>`);
    w.document.close(); w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleSave = () => {
    if (mode === "goodness-of-fit") {
      if (goodnessResult.error) return;
      saveHistory({ mode, chi2: goodnessResult.chi2, df: goodnessResult.df, pValue: goodnessResult.pValue, isSignificant: goodnessResult.isSignificant });
    } else {
      if (independenceResult.error) return;
      saveHistory({ mode, chi2: independenceResult.chi2, df: independenceResult.df, pValue: independenceResult.pValue, isSignificant: independenceResult.isSignificant });
    }
    setHistory(getHistory());
  };

  const currentError = mode === "goodness-of-fit" ? goodnessResult.error : independenceResult.error;
  const currentChi2 = mode === "goodness-of-fit" ? goodnessResult.chi2 : independenceResult.chi2;
  const currentDf = mode === "goodness-of-fit" ? goodnessResult.df : independenceResult.df;
  const currentP = mode === "goodness-of-fit" ? goodnessResult.pValue : independenceResult.pValue;
  const currentSignificant = mode === "goodness-of-fit" ? goodnessResult.isSignificant : independenceResult.isSignificant;
  const currentLowWarning = mode === "goodness-of-fit" ? goodnessResult.lowExpectedWarning : independenceResult.lowExpectedWarning;

  const maxGoodnessContribution = useMemo(() => Math.max(...goodnessResult.contributions, 0.0001), [goodnessResult.contributions]);
  const maxIndepContribution = useMemo(() => Math.max(...independenceResult.contributions.flat(), 0.0001), [independenceResult.contributions]);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode switch */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1.5">
          <button onClick={() => setMode("goodness-of-fit")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "goodness-of-fit" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            Goodness of Fit
          </button>
          <button onClick={() => setMode("independence")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "independence" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            Test of Independence
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  {mode === "goodness-of-fit" ? "Observed vs. Expected Frequencies" : "Contingency Table (Observed)"}
                </h3>
              </div>

              {mode === "goodness-of-fit" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-2 font-medium text-gray-500 text-xs">Category</th>
                        <th className="text-left py-2 px-2 font-medium text-gray-500 text-xs">Observed</th>
                        <th className="text-left py-2 px-2 font-medium text-gray-500 text-xs">Expected</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr key={i} className="border-b border-gray-50">
                          <td className="py-1.5 px-2">
                            <input value={r.label} onChange={(e) => updateRow(i, "label", e.target.value)} aria-label={`Category ${i + 1} label`}
                              className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm" />
                          </td>
                          <td className="py-1.5 px-2">
                            <input type="number" min={0} value={r.observed} onChange={(e) => updateRow(i, "observed", e.target.value)} aria-label={`Category ${i + 1} observed`}
                              className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm font-mono" />
                          </td>
                          <td className="py-1.5 px-2">
                            <input type="number" min={0} value={r.expected} onChange={(e) => updateRow(i, "expected", e.target.value)} aria-label={`Category ${i + 1} expected`}
                              className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm font-mono" />
                          </td>
                          <td className="py-1.5 px-1">
                            <button onClick={() => removeGoodnessRow(i)} disabled={rows.length <= 2} className="text-gray-300 hover:text-red-500 disabled:opacity-30 text-sm px-1" aria-label="Remove row">✕</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={addGoodnessRow} disabled={rows.length >= 12} className="mt-2 text-xs font-semibold text-primary disabled:opacity-40">+ Add Row</button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        <th></th>
                        {colLabels.map((c, j) => (
                          <th key={j} className="py-1.5 px-1">
                            <input value={c} onChange={(e) => updateColLabel(j, e.target.value)} aria-label={`Column ${j + 1} label`}
                              className="w-full px-1.5 py-1 border border-gray-200 rounded-md text-xs text-center font-medium" />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rowLabels.map((rLabel, i) => (
                        <tr key={i}>
                          <td className="py-1.5 pr-1">
                            <input value={rLabel} onChange={(e) => updateRowLabel(i, e.target.value)} aria-label={`Row ${i + 1} label`}
                              className="w-16 px-1.5 py-1 border border-gray-200 rounded-md text-xs font-medium" />
                          </td>
                          {colLabels.map((_, j) => (
                            <td key={j} className="py-1.5 px-1">
                              <input type="number" min={0} value={table[i]?.[j] ?? 0} onChange={(e) => updateCell(i, j, e.target.value)} aria-label={`${rLabel} × ${colLabels[j]} value`}
                                className="w-full px-1.5 py-1.5 border border-gray-200 rounded-md text-sm font-mono text-center" />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <button onClick={addTableRow} disabled={rowLabels.length >= 10} className="text-xs font-semibold text-primary disabled:opacity-40">+ Add Row</button>
                    <button onClick={removeTableRow} disabled={rowLabels.length <= 2} className="text-xs font-semibold text-gray-400 disabled:opacity-40">− Remove Row</button>
                    <button onClick={addTableCol} disabled={colLabels.length >= 10} className="text-xs font-semibold text-primary disabled:opacity-40">+ Add Column</button>
                    <button onClick={removeTableCol} disabled={colLabels.length <= 2} className="text-xs font-semibold text-gray-400 disabled:opacity-40">− Remove Column</button>
                  </div>
                </div>
              )}

              {currentError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{currentError}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="csc-alpha" title="The probability threshold used to decide statistical significance.">
                  Significance Level (α)
                </label>
                <select
                  id="csc-alpha"
                  value={useCustomAlpha ? "custom" : String(alpha)}
                  onChange={(e) => {
                    if (e.target.value === "custom") setUseCustomAlpha(true);
                    else { setUseCustomAlpha(false); setAlpha(parseFloat(e.target.value)); }
                  }}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                >
                  {SIGNIFICANCE_LEVELS.map((a) => <option key={a} value={a}>{a}</option>)}
                  <option value="custom">Custom</option>
                </select>
                {useCustomAlpha && (
                  <input type="number" step="0.01" min={0.001} max={0.5} value={customAlpha} onChange={(e) => setCustomAlpha(e.target.value)}
                    className="w-full mt-2 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" placeholder="0.05" />
                )}
              </div>

              {currentLowWarning && !currentError && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  One or more expected frequencies are below 5 — the chi-square approximation may be less reliable for this table.
                </p>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                <button onClick={handleRandomExample} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Random Example</button>
              </div>
              <button onClick={handleCopy} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                {copied ? "✓ Copied!" : "Copy Results"}
              </button>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Chi-Square Statistic (χ²)
              </p>
              <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">
                {currentError ? "—" : formatNum(currentChi2, 4)}
              </p>
              {!currentError && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {currentSignificant ? "Reject the null hypothesis" : "Fail to reject the null hypothesis"}
                </span>
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

            {!currentError && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Degrees of Freedom", String(currentDf)],
                  ["P-value", formatNum(currentP, 4)],
                  mode === "independence" ? ["Cramér's V", formatNum(independenceResult.cramersV, 4)] : ["Significance (α)", String(effectiveAlpha)],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-lg font-bold font-mono text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
            )}

            {!currentError && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Interpretation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {mode === "goodness-of-fit"
                    ? (currentSignificant
                        ? `With χ² = ${formatNum(currentChi2, 4)} and ${currentDf} degree${currentDf === 1 ? "" : "s"} of freedom, the p-value (${formatNum(currentP, 4)}) is below α = ${effectiveAlpha}, so the observed frequencies differ significantly from the expected frequencies.`
                        : `With χ² = ${formatNum(currentChi2, 4)} and ${currentDf} degree${currentDf === 1 ? "" : "s"} of freedom, the p-value (${formatNum(currentP, 4)}) is not below α = ${effectiveAlpha}, so there isn't enough evidence that the observed frequencies differ from the expected frequencies.`)
                    : (currentSignificant
                        ? `With χ² = ${formatNum(currentChi2, 4)} and ${currentDf} degrees of freedom, the p-value (${formatNum(currentP, 4)}) is below α = ${effectiveAlpha}, indicating a statistically significant association between the row and column variables (Cramér's V = ${formatNum(independenceResult.cramersV, 4)}, a ${cramersVLabel(independenceResult.cramersV).toLowerCase()} effect).`
                        : `With χ² = ${formatNum(currentChi2, 4)} and ${currentDf} degrees of freedom, the p-value (${formatNum(currentP, 4)}) is not below α = ${effectiveAlpha}, so there isn't enough evidence of an association between the row and column variables.`)}
                </p>
              </div>
            )}

            {/* Contribution heatmap */}
            {!currentError && mode === "goodness-of-fit" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Contribution Heatmap</h3>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-2 font-medium text-gray-500 text-xs">Category</th>
                      <th className="text-right py-2 px-2 font-medium text-gray-500 text-xs">Observed</th>
                      <th className="text-right py-2 px-2 font-medium text-gray-500 text-xs">Expected</th>
                      <th className="text-right py-2 px-2 font-medium text-gray-500 text-xs">Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i}>
                        <td className="py-1.5 px-2 text-gray-700">{r.label}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-gray-600">{r.observed}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-gray-600">{r.expected}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-semibold" style={{ backgroundColor: contributionColor(goodnessResult.contributions[i] ?? 0, maxGoodnessContribution) }}>
                          {formatNum(goodnessResult.contributions[i], 4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!currentError && mode === "independence" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-x-auto">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Expected Frequencies &amp; Contribution Heatmap</h3>
                <table className="text-sm border-collapse min-w-full">
                  <thead>
                    <tr>
                      <th></th>
                      {colLabels.map((c) => <th key={c} className="text-center py-1.5 px-2 font-medium text-gray-500 text-xs">{c}</th>)}
                      <th className="text-center py-1.5 px-2 font-medium text-gray-500 text-xs">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowLabels.map((rLabel, i) => (
                      <tr key={rLabel}>
                        <td className="py-1.5 px-2 font-medium text-gray-700 text-xs">{rLabel}</td>
                        {colLabels.map((_, j) => (
                          <td key={j} className="py-1.5 px-2 text-center font-mono text-xs" style={{ backgroundColor: contributionColor(independenceResult.contributions[i]?.[j] ?? 0, maxIndepContribution) }}>
                            <div className="text-gray-800">{independenceResult.observed[i]?.[j]}</div>
                            <div className="text-gray-400">exp {formatNum(independenceResult.expected[i]?.[j], 1)}</div>
                          </td>
                        ))}
                        <td className="py-1.5 px-2 text-center font-mono text-xs text-gray-500">{independenceResult.rowTotals[i]}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-100">
                      <td className="py-1.5 px-2 font-medium text-gray-700 text-xs">Total</td>
                      {colLabels.map((_, j) => <td key={j} className="py-1.5 px-2 text-center font-mono text-xs text-gray-500">{independenceResult.colTotals[j]}</td>)}
                      <td className="py-1.5 px-2 text-center font-mono text-xs text-gray-700 font-semibold">{independenceResult.grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {!currentError && mode === "independence" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-x-auto">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Standardized Residuals</h3>
                <p className="text-xs text-gray-400 mb-3">Green indicates more observations than expected; red indicates fewer. Values beyond ±2 suggest a notable deviation.</p>
                <table className="text-sm border-collapse min-w-full">
                  <thead>
                    <tr>
                      <th></th>
                      {colLabels.map((c) => <th key={c} className="text-center py-1.5 px-2 font-medium text-gray-500 text-xs">{c}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rowLabels.map((rLabel, i) => (
                      <tr key={rLabel}>
                        <td className="py-1.5 px-2 font-medium text-gray-700 text-xs">{rLabel}</td>
                        {colLabels.map((_, j) => (
                          <td key={j} className="py-1.5 px-2 text-center font-mono text-xs" style={{ backgroundColor: residualColor(independenceResult.residuals[i]?.[j] ?? 0) }}>
                            {formatNum(independenceResult.residuals[i]?.[j], 2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download CSV</button>
                <button onClick={handleDownloadTXT} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download TXT</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download JSON</button>
                <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
              </div>
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
                        <span className="text-sm font-semibold text-gray-900">χ² = {formatNum(entry.chi2, 4)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">
                        {entry.mode === "goodness-of-fit" ? "Goodness of Fit" : "Test of Independence"} · df={entry.df} · p={formatNum(entry.pValue, 4)} · {entry.isSignificant ? "Significant" : "Not significant"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ChiSquareCalculatorSEO />

      <RelatedTools
        currentTool="chi-square-calculator"
        tools={[
          "p-value-calculator",
          "a-b-test-calculator",
          "sample-size-calculator",
          "correlation-coefficient-calculator",
          "standard-deviation-calculator",
          "confidence-interval-calculator",
        ]}
      />
    </>
  );
}
