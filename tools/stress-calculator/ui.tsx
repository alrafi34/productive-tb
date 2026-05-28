"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  StressInputs,
  StressResult,
  HistoryEntry,
  ForceUnit,
  AreaUnit,
  StressUnit,
  Precision,
} from "./types";
import {
  calculate,
  validateForce,
  validateArea,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  FORCE_LABELS,
  FORCE_SHORT,
  AREA_LABELS,
  AREA_SHORT,
  STRESS_LABELS,
  ALL_FORCE_UNITS,
  ALL_AREA_UNITS,
  ALL_STRESS_UNITS,
} from "./logic";
import StressCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  {
    label: "Steel Rod",
    force: "10000",
    forceUnit: "N" as ForceUnit,
    area: "100",
    areaUnit: "mm2" as AreaUnit,
    outputUnit: "MPa" as StressUnit,
  },
  {
    label: "Concrete Column",
    force: "500",
    forceUnit: "kN" as ForceUnit,
    area: "0.25",
    areaUnit: "m2" as AreaUnit,
    outputUnit: "MPa" as StressUnit,
  },
  {
    label: "Bolt (US)",
    force: "5000",
    forceUnit: "lbf" as ForceUnit,
    area: "0.5",
    areaUnit: "in2" as AreaUnit,
    outputUnit: "psi" as StressUnit,
  },
  {
    label: "Thin Wire",
    force: "50",
    forceUnit: "N" as ForceUnit,
    area: "1",
    areaUnit: "mm2" as AreaUnit,
    outputUnit: "MPa" as StressUnit,
  },
];

const DEFAULT_INPUTS: StressInputs = {
  force:      "1000",
  forceUnit:  "N",
  area:       "0.01",
  areaUnit:   "m2",
  outputUnit: "MPa",
  precision:  2,
};

export default function StressCalculatorUI() {
  const [inputs,      setInputs]      = useState<StressInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<StressResult | null>(null);
  const [forceErr,    setForceErr]    = useState<string | null>(null);
  const [areaErr,     setAreaErr]     = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const forceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    forceRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const fe = validateForce(inputs.force);
      const ae = validateArea(inputs.area);
      setForceErr(fe);
      setAreaErr(ae);
      if (fe || ae) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      force:      p.force,
      forceUnit:  p.forceUnit,
      area:       p.area,
      areaUnit:   p.areaUnit,
      outputUnit: p.outputUnit,
    }));
    forceRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setForceErr(null);
    setAreaErr(null);
    forceRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Stress: ${formatNum(result.stressInOutputUnit, inputs.precision)} ${inputs.outputUnit} | Force: ${inputs.force} ${FORCE_SHORT[inputs.forceUnit]} | Area: ${inputs.area} ${AREA_SHORT[inputs.areaUnit]}`;
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
    downloadFile(exportToText(inputs, result), "stress-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔩</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Stress Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter force and cross-sectional area to instantly calculate mechanical stress (σ = F / A).
                Supports metric and imperial units with real-time results in Pa, MPa, psi, and more.
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
                Stress Result
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result !== null
                  ? `${formatNum(result.stressInOutputUnit, inputs.precision)} ${inputs.outputUnit}`
                  : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Pa</span>
                    <span className="font-semibold">{formatNum(result.stressPaDisplay, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">kPa</span>
                    <span className="font-semibold">{formatNum(result.stressKPa, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">MPa</span>
                    <span className="font-semibold">{formatNum(result.stressMPa, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">psi</span>
                    <span className="font-semibold">{formatNum(result.stressPsi, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">ksi</span>
                    <span className="font-semibold">{formatNum(result.stressKsi, inputs.precision)}</span>
                  </div>
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
                onClick={() => setShowFormula(!showFormula)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📖 {showFormula ? "Hide" : "Show"} Formula
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

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              {/* Force row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Force (F)
                    <span className="ml-1 text-xs text-gray-400" title="The applied force magnitude">ⓘ</span>
                  </label>
                  <input
                    ref={forceRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.force}
                    onChange={(e) => setInputs((p) => ({ ...p, force: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${forceErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="1000"
                    min="0"
                    step="any"
                    aria-label="Force value"
                  />
                  {forceErr && <p className="text-xs text-red-600 mt-1">{forceErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Force Unit</label>
                  <select
                    value={inputs.forceUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, forceUnit: e.target.value as ForceUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_FORCE_UNITS.map((u) => (
                      <option key={u} value={u}>{FORCE_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cross-Sectional Area (A)
                    <span className="ml-1 text-xs text-gray-400" title="The area resisting the applied force">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.area}
                    onChange={(e) => setInputs((p) => ({ ...p, area: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${areaErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="0.01"
                    min="0"
                    step="any"
                    aria-label="Area value"
                  />
                  {areaErr && <p className="text-xs text-red-600 mt-1">{areaErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                  <select
                    value={inputs.areaUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, areaUnit: e.target.value as AreaUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_AREA_UNITS.map((u) => (
                      <option key={u} value={u}>{AREA_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Output unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Stress Unit</label>
                <select
                  value={inputs.outputUnit}
                  onChange={(e) => setInputs((p) => ({ ...p, outputUnit: e.target.value as StressUnit }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {ALL_STRESS_UNITS.map((u) => (
                    <option key={u} value={u}>{STRESS_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  σ = F / A = {inputs.force} {FORCE_SHORT[inputs.forceUnit]} / {inputs.area} {AREA_SHORT[inputs.areaUnit]} = <strong>{formatNum(result.stressInOutputUnit, inputs.precision)} {inputs.outputUnit}</strong>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active =
                    inputs.force === p.force &&
                    inputs.forceUnit === p.forceUnit &&
                    inputs.area === p.area &&
                    inputs.areaUnit === p.areaUnit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePreset(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
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

            {/* Results Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Unit Conversion Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">MPa</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.stressMPa, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Megapascal (engineering standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Pa</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.stressPaDisplay, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pascal (SI base unit)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kPa</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.stressKPa, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilopascal</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">GPa</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.stressGPa, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Gigapascal (high-strength materials)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">psi</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.stressPsi, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pounds per square inch (US standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">ksi</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.stressKsi, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilopounds per square inch</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Engineering interpretation */}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  <strong>Engineering Note:</strong> {result.interpretation}
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    σ = F / A
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">σ (Sigma)</div>
                      <div className="text-blue-700 text-xs">Mechanical stress in Pa, MPa, or psi</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">F (Force)</div>
                      <div className="text-orange-700 text-xs">Applied load in Newtons (N) or lbf</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">A (Area)</div>
                      <div className="text-green-700 text-xs">Cross-sectional area in m² or in²</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Tip:</strong> Larger cross-sectional area = lower stress for the same force.
                    This is why structural members are made wider or thicker in high-load zones.
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
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {entry.inputs.force} {FORCE_SHORT[entry.inputs.forceUnit]} / {entry.inputs.area} {AREA_SHORT[entry.inputs.areaUnit]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.stressMPa, 2)} MPa
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

      <StressCalculatorSEO />
      <RelatedTools
        currentTool="stress-calculator"
        tools={[
          "torque-calculator",
          "force-calculator",
          "beam-deflection-calculator",
          "spring-force-calculator",
          "kinetic-energy-calculator",
          "reynolds-number-calculator",
        ]}
      />
    </>
  );
}
