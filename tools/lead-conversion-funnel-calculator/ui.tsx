"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  calculateFunnel, validateInputs, debounce, parseNum, formatNumber, makeStageId,
  saveHistory, getHistory, clearHistory, saveInputs, loadInputs,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  MIN_STAGES, MAX_STAGES, PRESETS, DEFAULT_INPUTS,
  type FunnelInputs, type FunnelResult, type HistoryEntry, type Stage,
} from "./logic";
import FunnelSVG, { exportFunnelPng, exportFunnelSvg } from "./chart";
import LeadConversionFunnelCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRECISION_OPTIONS = [0, 1, 2, 3, 4];
const UNDO_LIMIT = 20;

const HEALTH_STYLES: Record<string, string> = {
  Healthy: "bg-green-50 text-green-700 border-green-200",
  "Needs Attention": "bg-amber-50 text-amber-700 border-amber-200",
  Critical: "bg-red-50 text-red-700 border-red-200",
};

function cloneStages(stages: Stage[]): Stage[] {
  return stages.map((s) => ({ ...s }));
}

export default function LeadConversionFunnelCalculatorUI() {
  const [inputs, setInputs] = useState<FunnelInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<FunnelResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [presetIdx, setPresetIdx] = useState(0);
  const dragIndex = useRef<number | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const chartWrapRef = useRef<HTMLDivElement>(null);
  const undoStack = useRef<Stage[][]>([]);
  const runRef = useRef(debounce((inp: FunnelInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculateFunnel(inp));
  }, 150));
  const persistRef = useRef(debounce((inp: FunnelInputs) => saveInputs(inp), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInputs();
    if (saved) setInputs(saved);
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(inputs); }, [inputs]);
  useEffect(() => { persistRef.current(inputs); }, [inputs]);

  const pushUndo = (stages: Stage[]) => {
    undoStack.current = [...undoStack.current.slice(-(UNDO_LIMIT - 1)), cloneStages(stages)];
  };

  const updateStages = (mutator: (stages: Stage[]) => Stage[]) => {
    setInputs((prev) => {
      pushUndo(prev.stages);
      return { ...prev, stages: mutator(cloneStages(prev.stages)) };
    });
  };

  const handleStageNameChange = (id: string, name: string) => updateStages((stages) => stages.map((s) => (s.id === id ? { ...s, name } : s)));
  const handleStageValueChange = (id: string, value: number) => updateStages((stages) => stages.map((s) => (s.id === id ? { ...s, value } : s)));

  const handleAddStage = () => {
    if (inputs.stages.length >= MAX_STAGES) return;
    updateStages((stages) => [...stages, { id: makeStageId(), name: `Stage ${stages.length + 1}`, value: 0 }]);
  };

  const handleRemoveStage = (id: string) => {
    if (inputs.stages.length <= MIN_STAGES) return;
    updateStages((stages) => stages.filter((s) => s.id !== id));
  };

  const handleMove = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= inputs.stages.length) return;
    updateStages((stages) => {
      const next = [...stages];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleDragStart = (index: number) => { dragIndex.current = index; };
  const handleDragOver = (e: DragEvent) => e.preventDefault();
  const handleDrop = (index: number) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === index) return;
    updateStages((stages) => {
      const next = [...stages];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
  };

  const handleUndo = () => {
    const prev = undoStack.current.pop();
    if (!prev) return;
    setInputs((p) => ({ ...p, stages: prev }));
  };

  const handleReset = () => {
    undoStack.current = [];
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    nameRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleReset();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); handleUndo(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadPreset = () => {
    undoStack.current = [];
    const preset = PRESETS[presetIdx % PRESETS.length];
    setInputs({ ...preset.inputs, stages: cloneStages(preset.inputs.stages) });
    setPresetIdx((i) => i + 1);
  };

  const handleCopySummary = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Overall Conversion: ${result.overallConversionRate}% · Efficiency Score: ${result.efficiencyScore}/100 · Health: ${result.healthLabel}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTable = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildCSVReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `lead-funnel-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `lead-funnel-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleDownloadPng = () => exportFunnelPng(chartWrapRef.current, `lead-funnel-${Date.now()}.png`);
  const handleDownloadSvg = () => exportFunnelSvg(chartWrapRef.current, `lead-funnel-${Date.now()}.svg`);

  const handleSave = () => {
    if (!result) return;
    saveHistory({ label: `${result.overallConversionRate}% overall`, inputs, result });
    setHistory(getHistory());
  };

  const compareEntry = compareId ? history.find((h) => h.id === compareId) ?? null : null;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Quick presets + settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
          <button onClick={handleLoadPreset} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Load Sample Data</button>
          <button onClick={handleUndo} disabled={undoStack.current.length === 0} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Undo</button>
          <button onClick={handleReset} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
          <button onClick={() => setShowHistory(!showHistory)} className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            {showHistory ? "Hide" : "Show"} History
          </button>
          <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer ml-auto" title="When enabled, a stage cannot have a higher value than the stage before it">
            <input type="checkbox" checked={inputs.strictValidation} onChange={(e) => setInputs((p) => ({ ...p, strictValidation: e.target.checked }))} className="accent-primary" />
            Strict validation
          </label>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span>Precision</span>
            <select value={inputs.decimalPlaces} onChange={(e) => setInputs((p) => ({ ...p, decimalPlaces: parseInt(e.target.value, 10) }))}
              className="px-2 py-1 border border-gray-200 rounded-md text-xs bg-white">
              {PRECISION_OPTIONS.map((p) => <option key={p} value={p}>{p} dec</option>)}
            </select>
          </div>
          <span className="text-xs text-gray-400 w-full">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl/Cmd+Z</kbd> to undo, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: stage editor ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Funnel Stages</h3>
                <span className="text-xs text-gray-400">{inputs.stages.length} / {MAX_STAGES}</span>
              </div>

              <div className="space-y-2">
                {inputs.stages.map((stage, i) => (
                  <div
                    key={stage.id}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(i)}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 cursor-grab select-none" aria-hidden="true" title="Drag to reorder">⠿</span>
                      <input
                        ref={i === 0 ? nameRef : undefined}
                        type="text" value={stage.name} maxLength={40}
                        onChange={(e) => handleStageNameChange(stage.id, e.target.value)}
                        aria-label={`Stage ${i + 1} name`}
                        className="flex-1 min-w-0 px-2 py-1.5 border border-gray-200 rounded-md text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <button onClick={() => handleMove(i, -1)} disabled={i === 0} aria-label="Move stage up" className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs">▲</button>
                        <button onClick={() => handleMove(i, 1)} disabled={i === inputs.stages.length - 1} aria-label="Move stage down" className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs">▼</button>
                        <button onClick={() => handleRemoveStage(stage.id)} disabled={inputs.stages.length <= MIN_STAGES} aria-label="Remove stage" className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-sm">✕</button>
                      </div>
                    </div>
                    <input
                      type="number" min="0" inputMode="numeric" value={stage.value || ""}
                      onChange={(e) => handleStageValueChange(stage.id, parseNum(e.target.value))}
                      aria-label={`Stage ${i + 1} value`}
                      placeholder="0"
                      aria-invalid={!!errors[`stage-${stage.id}`]}
                      className={`w-full mt-2 px-2.5 py-2 border-2 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent ${errors[`stage-${stage.id}`] ? "border-red-300" : "border-gray-200"}`}
                    />
                    {errors[`stage-${stage.id}`] && <p className="text-xs text-red-600 mt-1" role="alert">{errors[`stage-${stage.id}`]}</p>}
                    {i > 0 && result?.stages[i] && !errors[`stage-${stage.id}`] && (
                      <p className="text-xs text-gray-400 mt-1">{result.stages[i].conversionFromPrev}% conversion from {inputs.stages[i - 1].name || `Stage ${i}`}</p>
                    )}
                  </div>
                ))}
              </div>

              <button onClick={handleAddStage} disabled={inputs.stages.length >= MAX_STAGES}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                + Add Stage
              </button>
              {errors.stages && <p className="text-xs text-red-600" role="alert">{errors.stages}</p>}

              {/* Buttons */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleCopySummary} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy Summary"}
                  </button>
                  <button onClick={handleCopyTable} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Copy Table</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">CSV</button>
                  <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">JSON</button>
                  <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print</button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary metrics */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Funnel Performance</p>
              {result ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Overall Conversion</p>
                      <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">{result.overallConversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-0.5">Efficiency Score</p>
                      <p className="text-4xl font-bold font-mono tabular-nums transition-all duration-300">{result.efficiencyScore}<span className="text-lg">/100</span></p>
                    </div>
                  </div>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${HEALTH_STYLES[result.healthLabel]} bg-white`}>
                    {result.healthLabel}
                  </span>
                  {result.warnings.map((w, i) => (
                    <p key={i} className="text-xs bg-white/15 border border-white/30 rounded-lg px-3 py-2 mt-3">⚠️ {w}</p>
                  ))}
                  <div className="space-y-2 mt-4">
                    <button onClick={handleCopySummary} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Summary"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopyFull} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Full Report</button>
                      <button onClick={handleSave} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">
                  {Object.values(errors).some(Boolean) ? "Fix the errors in the stage list to calculate your funnel." : "Enter values for each stage to see your funnel performance."}
                </p>
              )}
            </div>

            {/* Funnel diagram */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Visual Funnel</h3>
                  <div className="flex gap-2">
                    <button onClick={handleDownloadPng} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download PNG</button>
                    <button onClick={handleDownloadSvg} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download SVG</button>
                  </div>
                </div>
                <div ref={chartWrapRef}>
                  <FunnelSVG stages={result.stages} bestTransitionIndex={result.bestTransitionIndex} worstTransitionIndex={result.worstTransitionIndex} />
                </div>
              </div>
            )}

            {/* Stage conversion table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Stage Conversion Table</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-2 font-medium">Stage</th>
                        <th className="px-5 py-2 font-medium">Value</th>
                        <th className="px-5 py-2 font-medium">Conversion</th>
                        <th className="px-5 py-2 font-medium">Drop-Off</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.stages.map((s, i) => (
                        <tr key={s.id} className={i === result.worstTransitionIndex ? "bg-red-50/50" : i === result.bestTransitionIndex ? "bg-green-50/50" : ""}>
                          <td className="px-5 py-2 text-gray-700 font-medium">
                            {s.name}
                            {i === result.worstTransitionIndex && <span className="ml-1.5 text-[10px] text-red-600 font-semibold">BIGGEST DROP-OFF</span>}
                            {i === result.bestTransitionIndex && <span className="ml-1.5 text-[10px] text-green-600 font-semibold">BEST</span>}
                          </td>
                          <td className="px-5 py-2 font-mono text-gray-700">{formatNumber(s.value)}</td>
                          <td className="px-5 py-2 font-mono text-gray-700">{s.conversionFromPrev === null ? "—" : `${s.conversionFromPrev}%`}</td>
                          <td className="px-5 py-2 font-mono text-gray-700">{s.dropOffFromPrev === null ? "—" : `${s.dropOffFromPrev}%`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Insights */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Insights</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {result.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comparison */}
            {compareEntry && result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Current vs. Previous Funnel</h3>
                  <button onClick={() => setCompareId(null)} className="text-xs text-gray-500 hover:text-gray-700 font-medium">Clear</button>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Overall Conversion</span>
                    <span className="font-mono font-semibold">{result.overallConversionRate}% <span className="text-gray-400">vs</span> {compareEntry.result.overallConversionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Efficiency Score</span>
                    <span className="font-mono font-semibold">{result.efficiencyScore} <span className="text-gray-400">vs</span> {compareEntry.result.efficiencyScore}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.min(100, result.efficiencyScore)}%` }} /></div>
                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="h-2 rounded-full bg-blue-400 transition-all duration-500" style={{ width: `${Math.min(100, compareEntry.result.efficiencyScore)}%` }} /></div>
                  </div>
                  <p className="text-xs text-gray-400">Left bar: current funnel · Right bar: {compareEntry.label} ({new Date(compareEntry.timestamp).toLocaleDateString("en-US")})</p>
                </div>
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recent Calculations</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); setCompareId(null); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved funnels yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-3">
                      <button onClick={() => { undoStack.current = []; setInputs(entry.inputs); setShowHistory(false); }} className="text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{entry.result.overallConversionRate}% overall</span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                        </div>
                        <div className="text-xs text-primary font-mono font-semibold">
                          {entry.inputs.stages[0]?.name} → {entry.inputs.stages[entry.inputs.stages.length - 1]?.name} · Efficiency {entry.result.efficiencyScore}/100
                        </div>
                      </button>
                      <button onClick={() => setCompareId(compareId === entry.id ? null : entry.id)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex-shrink-0 ${compareId === entry.id ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                        {compareId === entry.id ? "Comparing" : "Compare"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <LeadConversionFunnelCalculatorSEO />

      <RelatedTools
        currentTool="lead-conversion-funnel-calculator"
        tools={[
          "conversion-rate-calculator",
          "cost-per-acquisition-cpa-calculator",
          "customer-lifetime-value-calculator",
          "bounce-rate-calculator",
          "marketing-roi-calculator",
          "roi-calculator-marketing",
        ]}
      />
    </>
  );
}
