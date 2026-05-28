"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ThermalExpansionInputs,
  ThermalExpansionResult,
  HistoryEntry,
  ExpansionType,
  TempUnit,
  DimUnit,
  Precision,
} from "./types";
import {
  calculate,
  validatePositive,
  validateAlpha,
  validateTemp,
  formatNum,
  formatAlpha,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  MATERIALS,
  MATERIAL_NOTES,
  TEMP_LABELS,
  DIM_LABELS,
  DIM_SHORT,
  ALL_DIM_UNITS,
  ALL_TEMP_UNITS,
} from "./logic";
import ThermalExpansionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ────────────────────────────────────────────────────────────────
const PRESETS = [
  { label: "Steel Bridge",    material: "Steel",    alpha: "0.000012", dimension: "100", dimUnit: "m"  as DimUnit, initialTemp: "20",  finalTemp: "70",  tempUnit: "C" as TempUnit },
  { label: "Aluminum Rail",   material: "Aluminum", alpha: "0.000023", dimension: "50",  dimUnit: "m"  as DimUnit, initialTemp: "32",  finalTemp: "212", tempUnit: "F" as TempUnit },
  { label: "Copper Pipe",     material: "Copper",   alpha: "0.000017", dimension: "25",  dimUnit: "m"  as DimUnit, initialTemp: "20",  finalTemp: "95",  tempUnit: "C" as TempUnit },
  { label: "Concrete Slab",   material: "Concrete", alpha: "0.000012", dimension: "30",  dimUnit: "m"  as DimUnit, initialTemp: "10",  finalTemp: "50",  tempUnit: "C" as TempUnit },
];

const DEFAULT_INPUTS: ThermalExpansionInputs = {
  expansionType: "linear",
  material:      "Steel",
  alpha:         "0.000012",
  dimension:     "10",
  dimUnit:       "m",
  initialTemp:   "68",
  finalTemp:     "168",
  tempUnit:      "F",
  precision:     4,
  compareMode:   false,
  material2:     "Aluminum",
  alpha2:        "0.000023",
};

const TYPE_LABELS: Record<ExpansionType, string> = {
  linear: "Linear Expansion",
  area:   "Area Expansion",
  volume: "Volume Expansion",
};

const TYPE_ICONS: Record<ExpansionType, string> = {
  linear: "📏",
  area:   "⬛",
  volume: "📦",
};

const DIM_PLACEHOLDER: Record<ExpansionType, string> = {
  linear: "e.g. 10 m",
  area:   "e.g. 5 m²",
  volume: "e.g. 2 m³",
};

const DIM_LABEL_TEXT: Record<ExpansionType, string> = {
  linear: "Initial Length",
  area:   "Initial Area",
  volume: "Initial Volume",
};

const RESULT_LABEL: Record<ExpansionType, string> = {
  linear: "Length Change",
  area:   "Area Change",
  volume: "Volume Change",
};

const FINAL_LABEL: Record<ExpansionType, string> = {
  linear: "Final Length",
  area:   "Final Area",
  volume: "Final Volume",
};

export default function ThermalExpansionCalculatorUI() {
  const [inputs,      setInputs]      = useState<ThermalExpansionInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<ThermalExpansionResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const [matSearch,   setMatSearch]   = useState("");
  const [showMatDrop, setShowMatDrop] = useState(false);
  const dimRef = useRef<HTMLInputElement>(null);
  const matRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    dimRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const errs: Record<string, string | null> = {};
      errs.alpha     = validateAlpha(inputs.alpha);
      errs.dimension = validatePositive(inputs.dimension, DIM_LABEL_TEXT[inputs.expansionType]);
      errs.initTemp  = validateTemp(inputs.initialTemp, "Initial Temperature");
      errs.finalTemp = validateTemp(inputs.finalTemp, "Final Temperature");
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleMaterialSelect = (label: string) => {
    const mat = MATERIALS.find((m) => m.label === label);
    if (!mat) return;
    setInputs((p) => ({
      ...p,
      material: label,
      alpha: label === "Custom" ? p.alpha : mat.alpha.toString(),
    }));
    setMatSearch(label === "Custom" ? "" : label);
    setShowMatDrop(false);
  };

  const handleMaterial2Select = (label: string) => {
    const mat = MATERIALS.find((m) => m.label === label);
    if (!mat) return;
    setInputs((p) => ({
      ...p,
      material2: label,
      alpha2: label === "Custom" ? p.alpha2 : mat.alpha.toString(),
    }));
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      material:    p.material,
      alpha:       p.alpha,
      dimension:   p.dimension,
      dimUnit:     p.dimUnit,
      initialTemp: p.initialTemp,
      finalTemp:   p.finalTemp,
      tempUnit:    p.tempUnit,
    }));
    setMatSearch(p.material);
    dimRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    setMatSearch("Steel");
    dimRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const unit = DIM_SHORT[inputs.dimUnit];
    const text = `Thermal Expansion | Material: ${inputs.material} | ${DIM_LABEL_TEXT[inputs.expansionType]}: ${inputs.dimension} ${unit} | ΔT: ${result.deltaT.toFixed(2)}°C | Δ: ${formatNum(result.delta, inputs.precision)} ${unit} | Final: ${formatNum(result.finalDim, inputs.precision)} ${unit}`;
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
    downloadFile(exportToText(inputs, result), "thermal-expansion-report.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setMatSearch(entry.inputs.material);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  const filteredMaterials = MATERIALS.filter((m) =>
    m.label.toLowerCase().includes(matSearch.toLowerCase())
  );

  const unit = DIM_SHORT[inputs.dimUnit];
  const isExpanding = result ? result.deltaT > 0 : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌡️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Thermal Expansion Calculator</h3>
              <p className="text-sm text-blue-800">
                Select a material, enter dimensions and temperature range, and instantly calculate how much a material expands or contracts. Supports linear, area, and volumetric expansion with metric and imperial units.
              </p>
            </div>
          </div>
        </div>

        {/* Expansion Type Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Expansion Type</p>
          <div className="flex gap-2 flex-wrap">
            {(["linear", "area", "volume"] as ExpansionType[]).map((type) => (
              <button
                key={type}
                onClick={() => setInputs((p) => ({ ...p, expansionType: type }))}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                  inputs.expansionType === type
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span>{TYPE_ICONS[type]}</span>
                {TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                {RESULT_LABEL[inputs.expansionType]}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.delta, inputs.precision)} ${unit}` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">{FINAL_LABEL[inputs.expansionType]}</span>
                    <span className="font-semibold">{formatNum(result.finalDim, inputs.precision)} {unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">% Change</span>
                    <span className="font-semibold">{formatNum(result.percentChange, 4)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">ΔT</span>
                    <span className="font-semibold">{result.deltaT.toFixed(2)} °C</span>
                  </div>
                  {isExpanding !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Direction</span>
                      <span className="font-semibold">{isExpanding ? "↑ Expanding" : "↓ Contracting"}</span>
                    </div>
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

              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowEdu(!showEdu)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showEdu ? "Hide" : "Show"} Formula
              </button>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              {result && (
                <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
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

              {/* Material Selector */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                  <span className="ml-1 text-xs text-gray-400" title="Select a material to auto-fill the thermal expansion coefficient">ⓘ</span>
                </label>
                <input
                  ref={matRef}
                  type="text"
                  value={matSearch}
                  onChange={(e) => { setMatSearch(e.target.value); setShowMatDrop(true); }}
                  onFocus={() => setShowMatDrop(true)}
                  onBlur={() => setTimeout(() => setShowMatDrop(false), 150)}
                  placeholder="Search material..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  aria-label="Material search"
                  aria-autocomplete="list"
                />
                {showMatDrop && filteredMaterials.length > 0 && (
                  <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto">
                    {filteredMaterials.map((m) => (
                      <li
                        key={m.label}
                        onMouseDown={() => handleMaterialSelect(m.label)}
                        className={`px-4 py-2.5 cursor-pointer text-sm hover:bg-gray-50 flex justify-between items-center ${inputs.material === m.label ? "bg-primary/5 text-primary font-medium" : "text-gray-700"}`}
                      >
                        <span>{m.label}</span>
                        {m.label !== "Custom" && (
                          <span className="text-xs text-gray-400 font-mono">{formatAlpha(m.alpha)}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Coefficient of Thermal Expansion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coefficient of Thermal Expansion (α)
                  <span className="ml-1 text-xs text-gray-400" title="Measures how much a material expands per degree of temperature change">ⓘ</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={inputs.alpha}
                  onChange={(e) => setInputs((p) => ({ ...p, alpha: e.target.value, material: "Custom" }))}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.alpha ? "border-red-300" : "border-gray-200"}`}
                  placeholder="0.000012 or 1.2e-5"
                  aria-label="Coefficient of thermal expansion"
                />
                {errors.alpha && <p className="text-xs text-red-600 mt-1">{errors.alpha}</p>}
                <p className="text-xs text-gray-400 mt-1">Supports scientific notation: 1.2e-5 · Unit: per °C</p>
              </div>

              {/* Initial Dimension */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {DIM_LABEL_TEXT[inputs.expansionType]}
                    <span className="ml-1 text-xs text-gray-400" title={DIM_PLACEHOLDER[inputs.expansionType]}>ⓘ</span>
                  </label>
                  <input
                    ref={dimRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.dimension}
                    onChange={(e) => setInputs((p) => ({ ...p, dimension: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.dimension ? "border-red-300" : "border-gray-200"}`}
                    placeholder="10"
                    min="0"
                    step="any"
                    aria-label={DIM_LABEL_TEXT[inputs.expansionType]}
                  />
                  {errors.dimension && <p className="text-xs text-red-600 mt-1">{errors.dimension}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={inputs.dimUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, dimUnit: e.target.value as DimUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_DIM_UNITS.map((u) => (
                      <option key={u} value={u}>{DIM_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Temperature Inputs */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Temperature</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.initialTemp}
                    onChange={(e) => setInputs((p) => ({ ...p, initialTemp: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.initTemp ? "border-red-300" : "border-gray-200"}`}
                    placeholder="68"
                    step="any"
                    aria-label="Initial temperature"
                  />
                  {errors.initTemp && <p className="text-xs text-red-600 mt-1">{errors.initTemp}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Final Temperature</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.finalTemp}
                    onChange={(e) => setInputs((p) => ({ ...p, finalTemp: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.finalTemp ? "border-red-300" : "border-gray-200"}`}
                    placeholder="168"
                    step="any"
                    aria-label="Final temperature"
                  />
                  {errors.finalTemp && <p className="text-xs text-red-600 mt-1">{errors.finalTemp}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                  <select
                    value={inputs.tempUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, tempUnit: e.target.value as TempUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_TEMP_UNITS.map((u) => (
                      <option key={u} value={u}>{TEMP_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula}<br />
                  <span className="font-mono text-xs">{result.breakdown} = <strong>{formatNum(result.delta, inputs.precision)} {unit}</strong></span>
                </div>
              )}

              {/* Material note */}
              {inputs.material && inputs.material !== "Custom" && MATERIAL_NOTES[inputs.material] && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  <strong>Engineering Note:</strong> {MATERIAL_NOTES[inputs.material]}
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
                  const active = inputs.material === p.material && inputs.dimension === p.dimension && inputs.initialTemp === p.initialTemp;
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

            {/* Results Breakdown */}
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
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">{RESULT_LABEL[inputs.expansionType]}</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.delta, inputs.precision)} {unit}</td>
                        <td className="py-2 px-3 text-gray-500">{result.deltaT > 0 ? "Expansion" : "Contraction"}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">{FINAL_LABEL[inputs.expansionType]}</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.finalDim, inputs.precision)} {unit}</td>
                        <td className="py-2 px-3 text-gray-500">Initial + Δ</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">% Change</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.percentChange, 4)}%</td>
                        <td className="py-2 px-3 text-gray-500">Relative to initial</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Temperature ΔT</td>
                        <td className="py-2 px-3 font-mono">{result.deltaT.toFixed(4)} °C</td>
                        <td className="py-2 px-3 text-gray-500">T_final − T_initial</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Coefficient (α)</td>
                        <td className="py-2 px-3 font-mono">{parseFloat(inputs.alpha).toExponential(3)}</td>
                        <td className="py-2 px-3 text-gray-500">per °C</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Compare Mode */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Compare Two Materials</h3>
                  <p className="text-xs text-gray-500 mt-0.5">See how two materials expand under the same conditions</p>
                </div>
                <button
                  role="switch"
                  aria-checked={inputs.compareMode}
                  onClick={() => setInputs((p) => ({ ...p, compareMode: !p.compareMode }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.compareMode ? "bg-primary" : "bg-gray-300"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.compareMode ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {inputs.compareMode && (
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Material 2</label>
                      <select
                        value={inputs.material2}
                        onChange={(e) => handleMaterial2Select(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        {MATERIALS.map((m) => (
                          <option key={m.label} value={m.label}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coefficient (α₂)</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={inputs.alpha2}
                        onChange={(e) => setInputs((p) => ({ ...p, alpha2: e.target.value, material2: "Custom" }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="0.000023"
                        aria-label="Second material coefficient"
                      />
                    </div>
                  </div>

                  {result && result.delta2 !== undefined && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Material</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">α (per °C)</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Δ ({unit})</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Final ({unit})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          <tr className="bg-primary/5">
                            <td className="py-2 px-3 font-medium text-primary">{inputs.material}</td>
                            <td className="py-2 px-3 font-mono text-xs">{parseFloat(inputs.alpha).toExponential(2)}</td>
                            <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.delta, inputs.precision)}</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.finalDim, inputs.precision)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium text-gray-700">{inputs.material2}</td>
                            <td className="py-2 px-3 font-mono text-xs">{parseFloat(inputs.alpha2 || "0").toExponential(2)}</td>
                            <td className="py-2 px-3 font-mono font-semibold">{formatNum(result.delta2, inputs.precision)}</td>
                            <td className="py-2 px-3 font-mono">{formatNum(result.finalDim2!, inputs.precision)}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-gray-500 mt-2">
                        {Math.abs(result.delta) > Math.abs(result.delta2)
                          ? `${inputs.material} expands ${formatNum(Math.abs(result.delta - result.delta2), inputs.precision)} ${unit} more than ${inputs.material2}.`
                          : result.delta2 > result.delta
                          ? `${inputs.material2} expands ${formatNum(Math.abs(result.delta2 - result.delta), inputs.precision)} ${unit} more than ${inputs.material}.`
                          : "Both materials expand equally."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Educational Formula Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    ΔL = α × L₀ × ΔT
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    ΔA = 2α × A₀ × ΔT
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    ΔV = 3α × V₀ × ΔT
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    {[
                      { sym: "α", color: "blue",   title: "Coefficient (α)", desc: "Expansion per unit length per °C" },
                      { sym: "L₀", color: "orange", title: "Initial Dim",    desc: "Original length, area, or volume" },
                      { sym: "ΔT", color: "green",  title: "Temp Change",    desc: "T_final − T_initial in °C" },
                      { sym: "Δ",  color: "purple", title: "Expansion",      desc: "Change in dimension" },
                    ].map(({ sym, color, title, desc }) => (
                      <div key={sym} className={`p-3 bg-${color}-50 border border-${color}-200 rounded-lg text-center`}>
                        <div className={`font-semibold text-${color}-800 text-xs uppercase mb-1`}>{title}</div>
                        <div className={`font-mono text-lg font-bold text-${color}-700 mb-1`}>{sym}</div>
                        <div className={`text-${color}-700 text-xs`}>{desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    <strong>Why does it matter?</strong> Thermal expansion causes bridges to buckle, pipes to burst, and rails to warp if not accounted for. Engineers design expansion joints, loops, and clearances to safely accommodate dimensional changes.
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
                            {entry.inputs.material} · {entry.inputs.dimension} {DIM_SHORT[entry.inputs.dimUnit]} · ΔT {entry.result.deltaT.toFixed(1)}°C
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Δ = {formatNum(entry.result.delta, 4)} {DIM_SHORT[entry.inputs.dimUnit]}
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

      <ThermalExpansionCalculatorSEO />
      <RelatedTools
        currentTool="thermal-expansion-calculator"
        tools={[
          "heat-transfer-calculator",
          "stress-calculator",
          "reynolds-number-calculator",
          "flow-rate-calculator",
          "torque-calculator",
          "kinetic-energy-calculator",
        ]}
      />
    </>
  );
}
