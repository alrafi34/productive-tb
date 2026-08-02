"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  calculatePipeline, validateStages, debounce, parseNum, formatDuration, toMs,
  saveHistory, getHistory, clearHistory, saveInputs, loadInputs,
  buildJSONExport, parseJSONImport, buildCSVExport, buildTextSummary, buildMarkdownSummary, buildPrintHTML,
  makeStage, DEFAULT_STAGES, DEFAULT_PIPELINE_NAME, PRESETS,
  UNIT_ORDER, UNIT_LABELS, STAGE_TYPE_ORDER, STAGE_TYPE_META, PARALLEL_GROUP_ORDER,
  type Stage, type PipelineResult, type HistoryEntry, type PipelineState,
  type LatencyUnit, type StageType, type ParallelGroup,
} from "./logic";
import LatencyDistributionChart from "./chart";
import DataPipelineLatencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DataPipelineLatencyCalculatorUI() {
  const [pipelineName, setPipelineName] = useState(DEFAULT_PIPELINE_NAME);
  const [stages, setStages] = useState<Stage[]>(DEFAULT_STAGES);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [search, setSearch] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [lastDeleted, setLastDeleted] = useState<{ stage: Stage; index: number } | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dragIndex = useRef<number | null>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const runRef = useRef(debounce((s: Stage[]) => {
    const errs = validateStages(s);
    setErrors(errs);
    if (errs._global) { setResult(null); return; }
    setResult(calculatePipeline(s));
  }, 150));
  const persistRef = useRef(debounce((state: PipelineState) => saveInputs(state), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInputs();
    if (saved && saved.stages.length > 0) {
      setPipelineName(saved.pipelineName);
      setStages(saved.stages);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(stages); }, [stages]);
  useEffect(() => { persistRef.current({ pipelineName, stages }); }, [pipelineName, stages]);

  const handleReset = () => {
    setPipelineName(DEFAULT_PIPELINE_NAME);
    setStages(DEFAULT_STAGES.map((s) => ({ ...s, id: makeStage().id })));
    setErrors({}); setLastDeleted(null); setSearch("");
    nameRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleReset(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "z") { e.preventDefault(); handleUndoDelete(); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDeleted]);

  const updateStage = <K extends keyof Stage>(id: string, field: K, value: Stage[K]) => {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleAddStage = () => setStages((prev) => [...prev, makeStage({ name: `Stage ${prev.length + 1}` })]);

  const handleDuplicateStage = (id: string) => {
    setStages((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const copy = makeStage({ ...prev[idx], name: `${prev[idx].name} (Copy)` });
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };

  const handleDeleteStage = (id: string) => {
    setStages((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      setLastDeleted({ stage: prev[idx], index: idx });
      return prev.filter((s) => s.id !== id);
    });
  };

  const handleUndoDelete = () => {
    if (!lastDeleted) return;
    setStages((prev) => {
      const next = [...prev];
      next.splice(Math.min(lastDeleted.index, next.length), 0, lastDeleted.stage);
      return next;
    });
    setLastDeleted(null);
  };

  const handleClearAll = () => {
    if (stages.length === 0) return;
    if (!confirm(`Remove all ${stages.length} stages from this pipeline? This cannot be undone.`)) return;
    setStages([]);
    setLastDeleted(null);
  };

  const moveStage = (index: number, dir: -1 | 1) => {
    setStages((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleDragStart = (index: number) => { dragIndex.current = index; };
  const handleDragOver = (e: DragEvent) => e.preventDefault();
  const handleDrop = (index: number) => {
    setStages((prev) => {
      if (dragIndex.current === null || dragIndex.current === index) return prev;
      const next = [...prev];
      const [moved] = next.splice(dragIndex.current, 1);
      next.splice(index, 0, moved);
      dragIndex.current = null;
      return next;
    });
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setPipelineName(p.name);
    setStages(p.stages.map((s) => makeStage(s)));
    setLastDeleted(null); setSearch("");
  };

  const handleCopySummary = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextSummary({ pipelineName, stages }, result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMarkdown = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildMarkdownSummary({ pipelineName, stages }, result));
    setMdCopied(true); setTimeout(() => setMdCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([buildJSONExport({ pipelineName, stages })], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "pipeline-latency.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVExport({ pipelineName, stages }, result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "pipeline-latency.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextSummary({ pipelineName, stages }, result)], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "pipeline-summary.txt"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML({ pipelineName, stages }, result));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const { state, error } = parseJSONImport(String(reader.result));
      if (error || !state) { setImportError(error); return; }
      setImportError(null);
      setPipelineName(state.pipelineName);
      setStages(state.stages);
    };
    reader.readAsText(file);
  };

  const handleSaveHistory = () => {
    if (!result) return;
    saveHistory({ state: { pipelineName, stages }, result });
    setHistory(getHistory());
  };

  const filteredStages = search.trim()
    ? new Set(stages.filter((s) => s.name.toLowerCase().includes(search.trim().toLowerCase())).map((s) => s.id))
    : null;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Pipeline name + presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="dpl-name">Pipeline Name</label>
            <input ref={nameRef} id="dpl-name" type="text" value={pipelineName} onChange={(e) => setPipelineName(e.target.value)}
              placeholder="Customer Analytics Pipeline"
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Quick presets:</span>
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-mono">Total = Sum(Sequential Stages) + Sum(Max of Each Parallel Group)</p>
        </div>

        {importError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3" role="alert">{importError}</div>
        )}
        {errors._global && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3" role="alert">{errors._global}</div>
        )}
        {lastDeleted && (
          <div className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-3 flex items-center justify-between">
            <span>Deleted &quot;{lastDeleted.stage.name}&quot;</span>
            <button onClick={handleUndoDelete} className="text-primary font-semibold text-xs hover:underline">Undo (Ctrl+Z)</button>
          </div>
        )}

        {/* Stage table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Pipeline Stages ({stages.length})</h3>
            <div className="flex items-center gap-2">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter stages..."
                className="px-2.5 py-1.5 border-2 border-gray-200 rounded-lg text-xs w-32 sm:w-44" />
              <button onClick={handleAddStage} className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">+ Add Stage</button>
              <button onClick={handleClearAll} disabled={stages.length === 0} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-red-600 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Clear All</button>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {stages.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No stages yet — add one to start calculating pipeline latency.</div>
            ) : stages.map((stage, i) => (
              <div
                key={stage.id}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(i)}
                className={`p-4 transition-opacity ${filteredStages && !filteredStages.has(stage.id) ? "opacity-30" : "opacity-100"} ${result?.bottleneckStage?.id === stage.id ? "bg-red-50/40" : ""}`}
              >
                <div className="grid sm:grid-cols-12 gap-2 items-start">
                  <div className="sm:col-span-1 flex sm:flex-col items-center gap-1 pt-2 cursor-grab text-gray-300" title="Drag to reorder">
                    <span aria-hidden="true">⠿</span>
                    <div className="flex sm:flex-col gap-0.5">
                      <button onClick={() => moveStage(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs" aria-label="Move up">▲</button>
                      <button onClick={() => moveStage(i, 1)} disabled={i === stages.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs" aria-label="Move down">▼</button>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <input
                      type="text" value={stage.name} onChange={(e) => updateStage(stage.id, "name", e.target.value)}
                      placeholder="Stage name" aria-label="Stage name"
                      aria-invalid={!!errors[`name-${stage.id}`]}
                      className={`w-full px-2.5 py-2 border-2 rounded-lg text-sm ${errors[`name-${stage.id}`] ? "border-red-300" : "border-gray-200"}`}
                    />
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium" style={{ color: STAGE_TYPE_META[stage.type].color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: STAGE_TYPE_META[stage.type].color }} />
                      {STAGE_TYPE_META[stage.type].label}
                    </span>
                  </div>

                  <div className="sm:col-span-2 flex gap-1">
                    <input
                      type="number" min="0" step="any" value={stage.value || ""} onChange={(e) => updateStage(stage.id, "value", parseNum(e.target.value))}
                      aria-label="Latency value" aria-invalid={!!errors[`value-${stage.id}`]}
                      className={`w-full px-2.5 py-2 border-2 rounded-lg text-sm ${errors[`value-${stage.id}`] ? "border-red-300" : "border-gray-200"}`}
                    />
                    <select value={stage.unit} onChange={(e) => updateStage(stage.id, "unit", e.target.value as LatencyUnit)}
                      aria-label="Latency unit" className="px-1.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white">
                      {UNIT_ORDER.map((u) => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <select value={stage.type} onChange={(e) => updateStage(stage.id, "type", e.target.value as StageType)}
                      aria-label="Stage type" className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white">
                      {STAGE_TYPE_ORDER.map((t) => <option key={t} value={t}>{STAGE_TYPE_META[t].label}</option>)}
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs text-gray-600">
                      <input type="checkbox" checked={stage.parallel} onChange={(e) => updateStage(stage.id, "parallel", e.target.checked)} className="accent-primary" />
                      Parallel
                    </label>
                    {stage.parallel && (
                      <select value={stage.groupId} onChange={(e) => updateStage(stage.id, "groupId", e.target.value as ParallelGroup)}
                        aria-label="Parallel group" className="px-1.5 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                        {PARALLEL_GROUP_ORDER.map((g) => <option key={g} value={g}>Group {g}</option>)}
                      </select>
                    )}
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-end gap-1">
                    <span className="text-xs font-mono text-gray-500 mr-1 hidden lg:inline">{formatDuration(toMs(stage.value, stage.unit))}</span>
                    <button onClick={() => handleDuplicateStage(stage.id)} title="Duplicate stage" className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs">⧉</button>
                    <button onClick={() => handleDeleteStage(stage.id)} title="Delete stage" className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-red-100 text-red-500 rounded-md text-xs">✕</button>
                  </div>
                </div>
                {(errors[`name-${stage.id}`] || errors[`value-${stage.id}`]) && (
                  <p className="text-xs text-red-600 mt-1.5 ml-8" role="alert">{errors[`name-${stage.id}`] || errors[`value-${stage.id}`]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-wrap gap-2">
            <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset to Default</button>
            <button onClick={() => jsonInputRef.current?.click()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Import JSON</button>
            <input ref={jsonInputRef} type="file" accept=".json,application/json" onChange={handleImportJson} className="hidden" />
            <p className="text-xs text-gray-400 self-center ml-auto hidden sm:block">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Esc</kbd> to reset, <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Ctrl+Z</kbd> to undo delete</p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
          <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Total Pipeline Latency</p>
          {result ? (
            <>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold font-mono tabular-nums">{formatDuration(result.totalLatencyMs)}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  ["Stages", String(result.totalStageCount)],
                  ["Sequential", formatDuration(result.sequentialDelayMs)],
                  ["Parallel", formatDuration(result.parallelDelayMs)],
                  ["Average Stage", formatDuration(result.averageStageMs)],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/10 rounded-lg px-3 py-2">
                    <p className="text-primary-100 text-xs mb-0.5">{label}</p>
                    <p className="text-sm font-bold font-mono">{value}</p>
                  </div>
                ))}
              </div>
              {result.bottleneckStage && (
                <p className="text-sm bg-white/10 rounded-lg px-3 py-2 mb-4">🔍 Bottleneck: <strong>{result.bottleneckStage.name}</strong> ({formatDuration(result.maxStageMs)}) — the longest single stage in this pipeline.</p>
              )}
              <div className="space-y-2">
                <button onClick={handleCopySummary} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Summary"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleCopyMarkdown} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{mdCopied ? "✓ Copied!" : "Copy as Markdown"}</button>
                  <button onClick={handleSaveHistory} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-primary-100 text-sm">{errors._global ? "Add stages to calculate total pipeline latency." : "Fix the errors above to calculate."}</p>
          )}
        </div>

        {/* Export buttons */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
          <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Export CSV</button>
          <button onClick={handleDownloadJson} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export JSON</button>
          <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Export TXT</button>
          <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Print</button>
          <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors ml-auto">{showHistory ? "Hide" : "Show"} History</button>
        </div>

        {/* Latency distribution */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Latency Distribution</h3>
            </div>
            <div className="p-5">
              <LatencyDistributionChart breakdown={result.breakdown} />
            </div>
          </div>
        )}

        {/* Parallel group breakdown */}
        {result && result.groupBreakdown.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Parallel Group Breakdown</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {result.groupBreakdown.map((g) => (
                <div key={g.group} className="px-5 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">Group {g.group}</span>
                    <span className="text-sm font-mono text-primary font-semibold">Max: {formatDuration(g.maxMs)}</span>
                  </div>
                  <p className="text-xs text-gray-500">{g.stages.map((s) => `${s.name} (${formatDuration(toMs(s.value, s.unit))})`).join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {showHistory && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recent Pipelines</h3>
              {history.length > 0 && (
                <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
              )}
            </div>
            <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
              {history.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">No saved pipelines yet</div>
              ) : history.map((entry) => (
                <div key={entry.id} onClick={() => { setPipelineName(entry.state.pipelineName); setStages(entry.state.stages); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{entry.state.pipelineName}</span>
                    <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                  </div>
                  <div className="text-xs text-primary font-mono font-semibold">
                    {formatDuration(entry.result.totalLatencyMs)} · {entry.result.totalStageCount} stages
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DataPipelineLatencyCalculatorSEO />

      <RelatedTools
        currentTool="data-pipeline-latency-calculator"
        tools={[
          "latency-calculator",
          "cloud-cost-calculator",
          "download-time-calculator",
          "session-duration-calculator",
          "storage-requirement-calculator",
          "data-transfer-cost-calculator",
        ]}
      />
    </>
  );
}
