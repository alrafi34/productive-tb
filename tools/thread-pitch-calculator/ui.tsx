"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ThreadInputs, ThreadResult, HistoryEntry, CalcMode, ThreadStarts, Precision } from "./types";
import {
  calculate,
  validatePositive,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  MODE_LABELS,
} from "./logic";
import ThreadPitchCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: ThreadInputs = {
  mode: "metric",
  metricDiameter: "10",
  metricPitch: "1.5",
  threadsCount: "20",
  measuredLength: "1",
  customLength: "",
  measuredDistance: "1.5",
  measurementUnit: "mm",
  leadPitch: "2",
  leadPitchUnit: "mm",
  threadStarts: 1,
  precision: 4,
};

const PRESETS: Record<CalcMode, Array<{ label: string; inputs: Partial<ThreadInputs> }>> = {
  metric: [
    { label: "M6 × 1.0",   inputs: { metricDiameter: "6",  metricPitch: "1.0"  } },
    { label: "M8 × 1.25",  inputs: { metricDiameter: "8",  metricPitch: "1.25" } },
    { label: "M10 × 1.5",  inputs: { metricDiameter: "10", metricPitch: "1.5"  } },
    { label: "M12 × 1.75", inputs: { metricDiameter: "12", metricPitch: "1.75" } },
    { label: "M16 × 2.0",  inputs: { metricDiameter: "16", metricPitch: "2.0"  } },
  ],
  imperial: [
    { label: "1/4\"-20",  inputs: { threadsCount: "20", measuredLength: "1" } },
    { label: "3/8\"-16",  inputs: { threadsCount: "16", measuredLength: "1" } },
    { label: "1/2\"-13",  inputs: { threadsCount: "13", measuredLength: "1" } },
    { label: "3/4\"-10",  inputs: { threadsCount: "10", measuredLength: "1" } },
    { label: "1\"-8",     inputs: { threadsCount: "8",  measuredLength: "1" } },
  ],
  measurement: [
    { label: "1.0 mm",  inputs: { measuredDistance: "1.0",  measurementUnit: "mm"   } },
    { label: "1.5 mm",  inputs: { measuredDistance: "1.5",  measurementUnit: "mm"   } },
    { label: "2.0 mm",  inputs: { measuredDistance: "2.0",  measurementUnit: "mm"   } },
    { label: "0.05\"",  inputs: { measuredDistance: "0.05", measurementUnit: "inch" } },
    { label: "0.0625\"",inputs: { measuredDistance: "0.0625",measurementUnit: "inch"} },
  ],
  lead: [
    { label: "2mm × 1",  inputs: { leadPitch: "2", leadPitchUnit: "mm", threadStarts: 1 } },
    { label: "2mm × 2",  inputs: { leadPitch: "2", leadPitchUnit: "mm", threadStarts: 2 } },
    { label: "5mm × 4",  inputs: { leadPitch: "5", leadPitchUnit: "mm", threadStarts: 4 } },
    { label: "0.1\" × 2",inputs: { leadPitch: "0.1", leadPitchUnit: "inch", threadStarts: 2 } },
  ],
};

export default function ThreadPitchCalculatorUI() {
  const [inputs,      setInputs]      = useState<ThreadInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<ThreadResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const newErrors: Record<string, string | null> = {};
      const { mode } = inputs;

      if (mode === "metric") {
        newErrors.metricPitch = validatePositive(inputs.metricPitch, "thread pitch");
      } else if (mode === "imperial") {
        newErrors.threadsCount = validatePositive(inputs.threadsCount, "thread count");
        const len = inputs.measuredLength === "custom" ? inputs.customLength : inputs.measuredLength;
        newErrors.measuredLength = validatePositive(len, "measured length");
      } else if (mode === "measurement") {
        newErrors.measuredDistance = validatePositive(inputs.measuredDistance, "measured distance");
      } else if (mode === "lead") {
        newErrors.leadPitch = validatePositive(inputs.leadPitch, "pitch");
      }

      setErrors(newErrors);
      const hasError = Object.values(newErrors).some(Boolean);
      if (hasError) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const handlePreset = (preset: Partial<ThreadInputs>) => {
    setInputs((p) => ({ ...p, ...preset }));
    firstRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    firstRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    let text = "";
    if (result.mode === "metric") {
      text = `${result.threadDesignation} | TPI: ${formatNum(result.tpi!, inputs.precision)} | Pitch: ${formatNum(result.pitchInch!, inputs.precision)}" | Closest: ${result.closestStandard}`;
    } else if (result.mode === "imperial") {
      text = `TPI: ${formatNum(result.calculatedTPI!, inputs.precision)} | Pitch: ${formatNum(result.pitchFromTPI!, inputs.precision)}" (${formatNum(result.pitchFromTPImm!, inputs.precision)} mm) | Closest: ${result.closestStandard}`;
    } else if (result.mode === "measurement") {
      text = `Pitch: ${formatNum(result.measuredPitchMm!, inputs.precision)} mm | TPI: ${formatNum(result.measuredTPI!, inputs.precision)} | Class: ${result.threadClassification}`;
    } else if (result.mode === "lead") {
      text = `Lead: ${formatNum(result.leadMm!, inputs.precision)} mm (${formatNum(result.leadInch!, inputs.precision)}")`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "thread-pitch-result.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  // ── Primary result display ────────────────────────────────────────────────
  const primaryLabel = result?.mode === "metric"      ? "Thread Designation"
    : result?.mode === "imperial"    ? "Threads Per Inch"
    : result?.mode === "measurement" ? "Thread Pitch"
    : result?.mode === "lead"        ? "Lead"
    : "Result";

  const primaryValue = result?.mode === "metric"      ? result.threadDesignation
    : result?.mode === "imperial"    ? `${formatNum(result.calculatedTPI!, inputs.precision)} TPI`
    : result?.mode === "measurement" ? `${formatNum(result.measuredPitchMm!, inputs.precision)} mm`
    : result?.mode === "lead"        ? `${formatNum(result.leadMm!, inputs.precision)} mm`
    : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔩</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Thread Pitch Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate thread pitch, TPI, lead, and thread spacing for metric and imperial fasteners.
                Supports bolt identification, CNC machining, pipe fitting, and mechanical assembly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                {primaryLabel}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {primaryValue ?? "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  {result.mode === "metric" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">TPI</span>
                        <span className="font-semibold">{formatNum(result.tpi!, inputs.precision)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Pitch (inch)</span>
                        <span className="font-semibold">{formatNum(result.pitchInch!, inputs.precision)}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Closest Std</span>
                        <span className="font-semibold text-xs">{result.closestStandard}</span>
                      </div>
                    </>
                  )}
                  {result.mode === "imperial" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Pitch (inch)</span>
                        <span className="font-semibold">{formatNum(result.pitchFromTPI!, inputs.precision)}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Pitch (mm)</span>
                        <span className="font-semibold">{formatNum(result.pitchFromTPImm!, inputs.precision)} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Closest Std</span>
                        <span className="font-semibold text-xs">{result.closestStandard}</span>
                      </div>
                    </>
                  )}
                  {result.mode === "measurement" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Pitch (inch)</span>
                        <span className="font-semibold">{formatNum(result.measuredPitchInch!, inputs.precision)}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">TPI</span>
                        <span className="font-semibold">{formatNum(result.measuredTPI!, inputs.precision)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Class</span>
                        <span className="font-semibold text-xs">{result.threadClassification}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Closest Std</span>
                        <span className="font-semibold text-xs">{result.closestStandard}</span>
                      </div>
                    </>
                  )}
                  {result.mode === "lead" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Lead (inch)</span>
                        <span className="font-semibold">{formatNum(result.leadInch!, inputs.precision)}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Thread Starts</span>
                        <span className="font-semibold">{inputs.threadStarts}</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!result}
                  className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Save to History
                </button>
              </div>
            </div>

            {/* Settings & Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings & Actions</h3>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) as Precision }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowEdu(!showEdu)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📖 {showEdu ? "Hide" : "Show"} Formula
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              {result && (
                <button
                  onClick={handleExport}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export TXT
                </button>
              )}
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Mode Selector + Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <select
                  value={inputs.mode}
                  onChange={(e) => setInputs((p) => ({ ...p, mode: e.target.value as CalcMode }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="metric">Metric Thread Pitch</option>
                  <option value="imperial">Imperial Thread Pitch (TPI)</option>
                  <option value="measurement">Thread Measurement Calculator</option>
                  <option value="lead">Lead Calculator</option>
                </select>
              </div>

              {/* Mode 1: Metric */}
              {inputs.mode === "metric" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Metric Thread Inputs</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nominal Diameter (mm)
                        <span className="ml-1 text-xs text-gray-400" title="Outer diameter of the bolt or screw">ⓘ</span>
                      </label>
                      <input
                        ref={firstRef}
                        type="number"
                        inputMode="decimal"
                        value={inputs.metricDiameter}
                        onChange={(e) => setInputs((p) => ({ ...p, metricDiameter: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="10"
                        min="0"
                        step="any"
                        aria-label="Nominal diameter in mm"
                      />
                      <p className="text-xs text-gray-400 mt-1">Example: 10 for M10</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thread Pitch (mm)
                        <span className="ml-1 text-xs text-gray-400" title="Distance between adjacent thread peaks in mm">ⓘ</span>
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.metricPitch}
                        onChange={(e) => setInputs((p) => ({ ...p, metricPitch: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.metricPitch ? "border-red-300" : "border-gray-200"}`}
                        placeholder="1.5"
                        min="0"
                        step="any"
                        aria-label="Thread pitch in mm"
                      />
                      {errors.metricPitch && <p className="text-xs text-red-600 mt-1">{errors.metricPitch}</p>}
                      <p className="text-xs text-gray-400 mt-1">Example: 1.5 for M10 × 1.5</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Imperial */}
              {inputs.mode === "imperial" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Imperial Thread Inputs</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Threads Counted
                        <span className="ml-1 text-xs text-gray-400" title="Number of thread peaks counted over the measured length">ⓘ</span>
                      </label>
                      <input
                        ref={firstRef}
                        type="number"
                        inputMode="decimal"
                        value={inputs.threadsCount}
                        onChange={(e) => setInputs((p) => ({ ...p, threadsCount: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.threadsCount ? "border-red-300" : "border-gray-200"}`}
                        placeholder="20"
                        min="0"
                        step="any"
                        aria-label="Threads counted"
                      />
                      {errors.threadsCount && <p className="text-xs text-red-600 mt-1">{errors.threadsCount}</p>}
                      <p className="text-xs text-gray-400 mt-1">Example: 20 for 1/4"-20</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Measured Length
                        <span className="ml-1 text-xs text-gray-400" title="Length over which threads were counted">ⓘ</span>
                      </label>
                      <select
                        value={inputs.measuredLength}
                        onChange={(e) => setInputs((p) => ({ ...p, measuredLength: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        <option value="1">1 inch</option>
                        <option value="0.5">0.5 inch</option>
                        <option value="custom">Custom length</option>
                      </select>
                    </div>
                  </div>
                  {inputs.measuredLength === "custom" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Custom Length (inches)</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.customLength}
                        onChange={(e) => setInputs((p) => ({ ...p, customLength: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.measuredLength ? "border-red-300" : "border-gray-200"}`}
                        placeholder="0.75"
                        min="0"
                        step="any"
                        aria-label="Custom measured length in inches"
                      />
                      {errors.measuredLength && <p className="text-xs text-red-600 mt-1">{errors.measuredLength}</p>}
                    </div>
                  )}
                </div>
              )}

              {/* Mode 3: Measurement */}
              {inputs.mode === "measurement" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Thread Measurement Inputs</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distance Between Thread Peaks
                        <span className="ml-1 text-xs text-gray-400" title="Measured distance between two adjacent thread crests">ⓘ</span>
                      </label>
                      <input
                        ref={firstRef}
                        type="number"
                        inputMode="decimal"
                        value={inputs.measuredDistance}
                        onChange={(e) => setInputs((p) => ({ ...p, measuredDistance: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.measuredDistance ? "border-red-300" : "border-gray-200"}`}
                        placeholder="1.5"
                        min="0"
                        step="any"
                        aria-label="Measured distance between thread peaks"
                      />
                      {errors.measuredDistance && <p className="text-xs text-red-600 mt-1">{errors.measuredDistance}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                      <select
                        value={inputs.measurementUnit}
                        onChange={(e) => setInputs((p) => ({ ...p, measurementUnit: e.target.value as "mm" | "inch" }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        <option value="mm">Millimeter (mm)</option>
                        <option value="inch">Inch (")</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 4: Lead */}
              {inputs.mode === "lead" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Lead Calculator Inputs</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thread Pitch
                        <span className="ml-1 text-xs text-gray-400" title="Distance between adjacent thread peaks">ⓘ</span>
                      </label>
                      <input
                        ref={firstRef}
                        type="number"
                        inputMode="decimal"
                        value={inputs.leadPitch}
                        onChange={(e) => setInputs((p) => ({ ...p, leadPitch: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.leadPitch ? "border-red-300" : "border-gray-200"}`}
                        placeholder="2"
                        min="0"
                        step="any"
                        aria-label="Thread pitch for lead calculation"
                      />
                      {errors.leadPitch && <p className="text-xs text-red-600 mt-1">{errors.leadPitch}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pitch Unit</label>
                      <select
                        value={inputs.leadPitchUnit}
                        onChange={(e) => setInputs((p) => ({ ...p, leadPitchUnit: e.target.value as "mm" | "inch" }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        <option value="mm">Millimeter (mm)</option>
                        <option value="inch">Inch (")</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Thread Starts
                      <span className="ml-1 text-xs text-gray-400" title="Single-start = 1, double-start = 2, etc.">ⓘ</span>
                    </label>
                    <div className="flex gap-2">
                      {([1, 2, 3, 4] as ThreadStarts[]).map((n) => (
                        <button
                          key={n}
                          onClick={() => setInputs((p) => ({ ...p, threadStarts: n }))}
                          className={`flex-1 py-3 rounded-lg text-sm font-semibold border-2 transition-colors ${
                            inputs.threadStarts === n
                              ? "bg-primary text-white border-primary"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                          aria-label={`${n} thread start${n > 1 ? "s" : ""}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {inputs.threadStarts === 1 ? "Single-start: Lead = Pitch" :
                       inputs.threadStarts === 2 ? "Double-start: Lead = 2 × Pitch" :
                       inputs.threadStarts === 3 ? "Triple-start: Lead = 3 × Pitch" :
                       "Quad-start: Lead = 4 × Pitch"}
                    </p>
                  </div>
                </div>
              )}

              {/* Live formula display */}
              {result?.formula && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula}
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS[inputs.mode].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p.inputs)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Results Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.mode === "metric" && (
                        <>
                          <tr className="bg-primary/5">
                            <td className="py-2 px-3 font-medium text-primary">Designation</td>
                            <td className="py-2 px-3 font-mono font-semibold text-primary">{result.threadDesignation}</td>
                            <td className="py-2 px-3 text-gray-500">ISO metric thread</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Pitch</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.pitchMm!, inputs.precision)} mm</td>
                            <td className="py-2 px-3 text-gray-500">Distance between peaks</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">TPI</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.tpi!, inputs.precision)}</td>
                            <td className="py-2 px-3 text-gray-500">Threads per inch</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Pitch (inch)</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.pitchInch!, inputs.precision)}"</td>
                            <td className="py-2 px-3 text-gray-500">Imperial equivalent</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Closest Standard</td>
                            <td className="py-2 px-3 font-mono">{result.closestStandard}</td>
                            <td className="py-2 px-3 text-gray-500">Nearest ISO standard</td>
                          </tr>
                        </>
                      )}
                      {result.mode === "imperial" && (
                        <>
                          <tr className="bg-primary/5">
                            <td className="py-2 px-3 font-medium text-primary">TPI</td>
                            <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.calculatedTPI!, inputs.precision)}</td>
                            <td className="py-2 px-3 text-gray-500">Threads per inch</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Pitch (inch)</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.pitchFromTPI!, inputs.precision)}"</td>
                            <td className="py-2 px-3 text-gray-500">1 ÷ TPI</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Pitch (mm)</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.pitchFromTPImm!, inputs.precision)} mm</td>
                            <td className="py-2 px-3 text-gray-500">Metric equivalent</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Closest Standard</td>
                            <td className="py-2 px-3 font-mono">{result.closestStandard}</td>
                            <td className="py-2 px-3 text-gray-500">Nearest UNC/UNF</td>
                          </tr>
                        </>
                      )}
                      {result.mode === "measurement" && (
                        <>
                          <tr className="bg-primary/5">
                            <td className="py-2 px-3 font-medium text-primary">Pitch (mm)</td>
                            <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.measuredPitchMm!, inputs.precision)} mm</td>
                            <td className="py-2 px-3 text-gray-500">Measured pitch</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Pitch (inch)</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.measuredPitchInch!, inputs.precision)}"</td>
                            <td className="py-2 px-3 text-gray-500">Imperial equivalent</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">TPI</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.measuredTPI!, inputs.precision)}</td>
                            <td className="py-2 px-3 text-gray-500">Threads per inch</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Classification</td>
                            <td className="py-2 px-3 font-mono">{result.threadClassification}</td>
                            <td className="py-2 px-3 text-gray-500">Thread type</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Closest Standard</td>
                            <td className="py-2 px-3 font-mono">{result.closestStandard}</td>
                            <td className="py-2 px-3 text-gray-500">Nearest UNC/UNF</td>
                          </tr>
                        </>
                      )}
                      {result.mode === "lead" && (
                        <>
                          <tr className="bg-primary/5">
                            <td className="py-2 px-3 font-medium text-primary">Lead (mm)</td>
                            <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.leadMm!, inputs.precision)} mm</td>
                            <td className="py-2 px-3 text-gray-500">Axial advance per rotation</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Lead (inch)</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.leadInch!, inputs.precision)}"</td>
                            <td className="py-2 px-3 text-gray-500">Imperial equivalent</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Thread Starts</td>
                            <td className="py-2 px-3 font-mono">{inputs.threadStarts}</td>
                            <td className="py-2 px-3 text-gray-500">Number of helical starts</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">Pitch</td>
                            <td className="py-2 px-3 font-mono">{inputs.leadPitch} {inputs.leadPitchUnit}</td>
                            <td className="py-2 px-3 text-gray-500">Input pitch value</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Educational Formula Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Pitch (mm) = Distance between thread peaks
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    TPI = 25.4 ÷ Pitch (mm)
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Pitch (inch) = 1 ÷ TPI
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Lead = Pitch × Number of Starts
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">Metric (ISO)</div>
                      <div className="text-blue-700 text-xs">M10 × 1.5 → 10 mm diameter, 1.5 mm pitch, 16.93 TPI</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">Imperial (UNC/UNF)</div>
                      <div className="text-orange-700 text-xs">1/4"-20 → 0.25" diameter, 20 TPI, 0.05" pitch</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Lead vs Pitch:</strong> For single-start threads, lead = pitch. For multi-start threads,
                    lead = pitch × starts. A double-start 2 mm pitch screw advances 4 mm per revolution.
                  </div>
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => {
                      const label = entry.result.mode === "metric"
                        ? entry.result.threadDesignation
                        : entry.result.mode === "imperial"
                        ? `${formatNum(entry.result.calculatedTPI!, 2)} TPI`
                        : entry.result.mode === "measurement"
                        ? `${formatNum(entry.result.measuredPitchMm!, 2)} mm pitch`
                        : `Lead: ${formatNum(entry.result.leadMm!, 2)} mm`;
                      return (
                        <div
                          key={entry.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => loadFromHistory(entry)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {MODE_LABELS[entry.inputs.mode]}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-primary">{label}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ThreadPitchCalculatorSEO />
      <RelatedTools
        currentTool="thread-pitch-calculator"
        tools={[
          "torque-calculator",
          "bolt-load-calculator",
          "stress-calculator",
          "force-calculator",
          "gear-ratio-calculator",
          "spring-force-calculator",
        ]}
      />
    </>
  );
}
