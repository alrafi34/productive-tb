"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
  DensityUnit,
  CompactionStandard,
  HistoryEntry,
} from "./types";
import {
  calculate,
  fmt,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  buildCopyText,
  UNIT_LABELS,
  ALL_UNITS,
  STANDARD_LABELS,
  ALL_STANDARDS,
  SOIL_PRESETS,
} from "./logic";
import SoilCompactionRatioCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  fieldDensity:     "",
  maxDensity:       "",
  unit:             "g/cm3",
  requiredStandard: 95,
};

const STATUS_STYLES: Record<CalculationResult["status"], string> = {
  pass:    "text-green-700 bg-green-50 border-green-200",
  warning: "text-yellow-700 bg-yellow-50 border-yellow-200",
  fail:    "text-red-700 bg-red-50 border-red-200",
};

const STATUS_ICONS: Record<CalculationResult["status"], string> = {
  pass:    "✅",
  warning: "⚠️",
  fail:    "❌",
};

export default function SoilCompactionRatioCalculatorUI() {
  const [inputs, setInputs]           = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult]           = useState<CalculationResult | null>(null);
  const [copied, setCopied]           = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps]     = useState(false);
  const [history, setHistory]         = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => { setResult(calculate(inputs)); }, 100),
    [inputs]
  );
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));

  const setNum = (key: "fieldDensity" | "maxDensity", val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    firstRef.current?.focus();
  };

  const handlePreset = (preset: typeof SOIL_PRESETS[0]) => {
    setInputs((p) => ({
      ...p,
      fieldDensity: preset.fieldDensity,
      maxDensity:   preset.maxDensity,
      unit:         preset.unit,
    }));
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildCopyText(inputs, result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExportTxt = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "soil_compaction_ratio_report.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    downloadFile(exportToCSV(inputs, result), "soil_compaction_ratio_report.csv", "text/csv");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  // Warning: field > max
  const fieldVal = parseFloat(inputs.fieldDensity);
  const maxVal   = parseFloat(inputs.maxDensity);
  const fieldExceedsMax =
    !isNaN(fieldVal) && !isNaN(maxVal) && fieldVal > maxVal;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Soil Compaction Ratio Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate relative compaction (compaction ratio) by comparing field dry density with maximum dry density from Proctor test. Instant quality control for earthwork and construction projects.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Density Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Density Unit</label>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_UNITS.map((u) => (
                    <button
                      key={u}
                      onClick={() => set("unit", u)}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                        inputs.unit === u
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {UNIT_LABELS[u]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Required Standard */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Compaction Standard</label>
                <select
                  value={inputs.requiredStandard}
                  onChange={(e) => set("requiredStandard", parseInt(e.target.value) as CompactionStandard)}
                  className={selectCls}
                >
                  {ALL_STANDARDS.map((s) => (
                    <option key={s} value={s}>{STANDARD_LABELS[s]}</option>
                  ))}
                </select>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Ratio (%) = (Field Density ÷ MDD) × 100</div>
                <div className="text-gray-500 mt-1">MDD = Maximum Dry Density (Proctor)</div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <>
                    <button
                      onClick={handleExportTxt}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export TXT
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export CSV
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p
                className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Compaction Ratio
              </p>
              <div className="text-4xl font-bold mb-1 leading-none">
                {result ? `${fmt(result.compactionRatio)}%` : "—"}
              </div>

              {result && (
                <>
                  {/* Progress bar */}
                  <div className="mt-3 mb-4">
                    <div className="flex justify-between text-xs text-primary-100 mb-1">
                      <span>0%</span>
                      <span>Required: {result.requiredStandard}%</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div
                        className="bg-white h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(result.compactionRatio, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Status:</span>
                      <span className="font-semibold">{result.statusLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Required:</span>
                      <span className="font-semibold">{result.requiredStandard}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Difference:</span>
                      <span className={`font-semibold ${result.difference >= 0 ? "text-green-300" : "text-red-300"}`}>
                        {result.difference >= 0 ? "+" : ""}{fmt(result.difference)}%
                      </span>
                    </div>
                  </div>
                </>
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

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Density Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Density Measurements
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field Dry Density ({UNIT_LABELS[inputs.unit]})
                  </label>
                  <input
                    ref={firstRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.fieldDensity}
                    onChange={(e) => setNum("fieldDensity", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 1.85"
                    min="0"
                    step="0.01"
                    aria-label="Field dry density"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measured on site</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Dry Density ({UNIT_LABELS[inputs.unit]})
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.maxDensity}
                    onChange={(e) => setNum("maxDensity", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 2.00"
                    min="0"
                    step="0.01"
                    aria-label="Maximum dry density from Proctor test"
                  />
                  <p className="text-xs text-gray-500 mt-1">From Proctor test (lab)</p>
                </div>
              </div>

              {/* Validation warning */}
              {fieldExceedsMax && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  ⚠️ Field density appears higher than maximum dry density. Please verify your values.
                </div>
              )}

              {/* Inline formula result */}
              {result && !fieldExceedsMax && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>({fmt(result.fieldDensity)} ÷ {fmt(result.maxDensity)}) × 100</strong>
                  {" = "}
                  <strong>{fmt(result.compactionRatio)}%</strong>
                </div>
              )}
            </div>

            {/* Status Panel */}
            {result && (
              <div className={`rounded-xl border p-6 ${STATUS_STYLES[result.status]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{STATUS_ICONS[result.status]}</span>
                  <h3 className="font-semibold text-base">{result.statusLabel}</h3>
                </div>
                <p className="text-sm">{result.engineeringNote}</p>
              </div>
            )}

            {/* Soil Type Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Soil Type Presets
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {SOIL_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{preset.description}</div>
                    <div className="text-xs text-primary font-medium mt-1">
                      Field: {preset.fieldDensity} / MDD: {preset.maxDensity} {UNIT_LABELS[preset.unit]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Summary */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Compaction Ratio",  value: `${fmt(result.compactionRatio)}%`,  highlight: true },
                    { label: "Required Standard", value: `${result.requiredStandard}%` },
                    { label: "Difference",        value: `${result.difference >= 0 ? "+" : ""}${fmt(result.difference)}%` },
                    { label: "Field Density",     value: `${fmt(result.fieldDensity)} ${UNIT_LABELS[result.unit]}` },
                    { label: "Max Density",       value: `${fmt(result.maxDensity)} ${UNIT_LABELS[result.unit]}` },
                    { label: "Status",            value: result.statusLabel },
                  ].map(({ label, value, highlight }) => (
                    <div
                      key={label}
                      className={`p-3 rounded-lg border ${
                        highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div
                        className={`font-bold break-all text-sm ${
                          highlight ? "text-primary text-base" : "text-gray-900"
                        }`}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visual comparison bars */}
                <div className="mt-5 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Field Dry Density</span>
                      <span className="font-medium">{fmt(result.fieldDensity)} {UNIT_LABELS[result.unit]}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((result.fieldDensity / result.maxDensity) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Maximum Dry Density (MDD)</span>
                      <span className="font-medium">{fmt(result.maxDensity)} {UNIT_LABELS[result.unit]}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Required Compaction</span>
                      <span className="font-medium">{result.requiredStandard}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.requiredStandard}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-step breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Step-by-Step Breakdown
                  </h3>
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    {showSteps ? "Hide" : "Show"}
                  </button>
                </div>
                {showSteps ? (
                  <ol className="space-y-2">
                    {result.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">
                          {i + 1}
                        </span>
                        <code className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-xs">
                          {step}
                        </code>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-500">Click Show to see the full calculation steps.</p>
                )}
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
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
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setInputs(entry.inputs);
                          setShowHistory(false);
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {fmt(entry.result.compactionRatio)}% — {entry.result.statusLabel}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Field: {fmt(entry.result.fieldDensity)} / MDD: {fmt(entry.result.maxDensity)}{" "}
                          {UNIT_LABELS[entry.result.unit]} · Required: {entry.result.requiredStandard}%
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <SoilCompactionRatioCalculatorSEO />
      <RelatedTools
        currentTool="soil-compaction-ratio-calculator"
        tools={[
          "land-leveling-calculator",
          "earth-filling-calculator",
          "soil-volume-calculator",
          "excavation-cost-calculator",
        ]}
      />
    </>
  );
}
