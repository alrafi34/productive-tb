"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GasInputs, GasResult, HistoryEntry, SolveFor, PressureUnit, VolumeUnit, TemperatureUnit, Precision } from "./types";
import {
  calculate,
  validatePositive,
  validateTemperature,
  formatSci,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  PRESSURE_LABELS,
  VOLUME_LABELS,
  TEMPERATURE_LABELS,
  PRESSURE_SHORT,
  VOLUME_SHORT,
  TEMPERATURE_SHORT,
  ALL_PRESSURE_UNITS,
  ALL_VOLUME_UNITS,
  ALL_TEMPERATURE_UNITS,
} from "./logic";
import IdealGasLawCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const GAS_PRESETS = [
  { label: "STP (1 mol)",    pressure: "1",      pressureUnit: "atm" as PressureUnit, volume: "22.414", volumeUnit: "L" as VolumeUnit, moles: "1",   temperature: "273.15", temperatureUnit: "K" as TemperatureUnit },
  { label: "Room Temp",      pressure: "1",      pressureUnit: "atm" as PressureUnit, volume: "24.465", volumeUnit: "L" as VolumeUnit, moles: "1",   temperature: "25",     temperatureUnit: "C" as TemperatureUnit },
  { label: "High Pressure",  pressure: "10",     pressureUnit: "atm" as PressureUnit, volume: "2.441",  volumeUnit: "L" as VolumeUnit, moles: "1",   temperature: "298",    temperatureUnit: "K" as TemperatureUnit },
  { label: "Example 2",      pressure: "2",      pressureUnit: "atm" as PressureUnit, volume: "10",     volumeUnit: "L" as VolumeUnit, moles: "0.5", temperature: "",       temperatureUnit: "K" as TemperatureUnit },
];

const DEFAULT_INPUTS: GasInputs = {
  solveFor: "T",
  pressure: "2",
  pressureUnit: "atm",
  volume: "10",
  volumeUnit: "L",
  moles: "0.5",
  temperature: "",
  temperatureUnit: "K",
  precision: 4,
};

const SOLVE_FOR_OPTIONS: { value: SolveFor; label: string; symbol: string }[] = [
  { value: "P", label: "Pressure (P)", symbol: "P" },
  { value: "V", label: "Volume (V)", symbol: "V" },
  { value: "n", label: "Moles (n)", symbol: "n" },
  { value: "T", label: "Temperature (T)", symbol: "T" },
];

export default function IdealGasLawCalculatorUI() {
  const [inputs, setInputs] = useState<GasInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<GasResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const newErrors: Record<string, string | null> = {};
      if (inputs.solveFor !== "P") newErrors.pressure    = validatePositive(inputs.pressure, "Pressure");
      if (inputs.solveFor !== "V") newErrors.volume      = validatePositive(inputs.volume, "Volume");
      if (inputs.solveFor !== "n") newErrors.moles       = validatePositive(inputs.moles, "Moles");
      if (inputs.solveFor !== "T") newErrors.temperature = validateTemperature(inputs.temperature, inputs.temperatureUnit);
      setErrors(newErrors);
      const hasError = Object.values(newErrors).some(Boolean);
      if (hasError) { setResult(null); return; }
      try {
        setResult(calculate(inputs));
      } catch {
        setResult(null);
      }
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const handleSolveForChange = (val: SolveFor) => {
    setInputs((p) => ({ ...p, solveFor: val, pressure: val === "P" ? "" : p.pressure, volume: val === "V" ? "" : p.volume, moles: val === "n" ? "" : p.moles, temperature: val === "T" ? "" : p.temperature }));
    setResult(null);
    setErrors({});
  };

  const handlePreset = (preset: typeof GAS_PRESETS[0]) => {
    setInputs((p) => ({
      ...p,
      pressure: preset.pressure,
      pressureUnit: preset.pressureUnit,
      volume: preset.volume,
      volumeUnit: preset.volumeUnit,
      moles: preset.moles,
      temperature: preset.temperature,
      temperatureUnit: preset.temperatureUnit,
      solveFor: preset.temperature === "" ? "T" : p.solveFor,
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const solveLabel = SOLVE_FOR_OPTIONS.find((o) => o.value === inputs.solveFor)?.label ?? inputs.solveFor;
    navigator.clipboard.writeText(
      `${solveLabel} = ${formatSci(result.value, inputs.precision)} ${result.unit} | Formula: ${result.formulaUsed}`
    );
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
    downloadFile(exportToText(inputs, result), "ideal-gas-law-calculation.txt");
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

  const solveLabel = SOLVE_FOR_OPTIONS.find((o) => o.value === inputs.solveFor)?.label ?? "";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Ideal Gas Law Calculator</h3>
              <p className="text-sm text-blue-800">
                Solve for any variable in <strong>PV = nRT</strong>. Select what to calculate, enter the three known values, and get the result instantly with full unit conversion.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-1 text-xs uppercase tracking-wider">
                {solveLabel}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all font-mono">
                {result ? `${formatSci(result.value, inputs.precision)} ${result.unit}` : "—"}
              </div>

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Formula</span>
                    <span className="font-semibold font-mono text-xs">{result.formulaUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">R</span>
                    <span className="font-semibold font-mono text-xs">8.3145 J/mol·K</span>
                  </div>
                  {inputs.solveFor !== "P" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">P (SI)</span>
                      <span className="font-semibold font-mono text-xs">{formatSci(result.P_Pa, 4)} Pa</span>
                    </div>
                  )}
                  {inputs.solveFor !== "T" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">T (SI)</span>
                      <span className="font-semibold font-mono text-xs">{formatSci(result.T_K, 4)} K</span>
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
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-800">Settings & Actions</h3>

              <div>
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

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Equation</div>
                <div className="font-mono text-center text-sm font-bold text-gray-800">PV = nRT</div>
                <div className="text-gray-500 mt-1">R = 8.314472 J/(mol·K)</div>
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowFormula(!showFormula)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showFormula ? "Hide" : "Show"} Formula
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

            {/* Solve For + Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              {/* Solve For */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Solve For</label>
                <div className="grid grid-cols-4 gap-2">
                  {SOLVE_FOR_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSolveForChange(opt.value)}
                      className={`py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                        inputs.solveFor === opt.value
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {opt.symbol}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  Solving for: <span className="font-medium text-gray-700">{solveLabel}</span>
                </p>
              </div>

              {/* Pressure */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pressure (P)
                    {inputs.solveFor === "P" && <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">solving</span>}
                  </label>
                  <input
                    ref={inputs.solveFor !== "P" ? firstInputRef : undefined}
                    type="number"
                    inputMode="decimal"
                    value={inputs.pressure}
                    onChange={(e) => setInputs((p) => ({ ...p, pressure: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    disabled={inputs.solveFor === "P"}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                      inputs.solveFor === "P" ? "bg-primary/5 border-primary/20 text-primary/50 cursor-not-allowed" :
                      errors.pressure ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder={inputs.solveFor === "P" ? "calculated" : "e.g. 1"}
                    min="0" step="any"
                    aria-label="Pressure"
                  />
                  {errors.pressure && <p className="text-xs text-red-600 mt-1">{errors.pressure}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pressure Unit</label>
                  <select
                    value={inputs.pressureUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, pressureUnit: e.target.value as PressureUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_PRESSURE_UNITS.map((u) => (
                      <option key={u} value={u}>{PRESSURE_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Volume */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume (V)
                    {inputs.solveFor === "V" && <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.volume}
                    onChange={(e) => setInputs((p) => ({ ...p, volume: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    disabled={inputs.solveFor === "V"}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                      inputs.solveFor === "V" ? "bg-primary/5 border-primary/20 text-primary/50 cursor-not-allowed" :
                      errors.volume ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder={inputs.solveFor === "V" ? "calculated" : "e.g. 22.4"}
                    min="0" step="any"
                    aria-label="Volume"
                  />
                  {errors.volume && <p className="text-xs text-red-600 mt-1">{errors.volume}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Volume Unit</label>
                  <select
                    value={inputs.volumeUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, volumeUnit: e.target.value as VolumeUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_VOLUME_UNITS.map((u) => (
                      <option key={u} value={u}>{VOLUME_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Moles */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moles (n)
                    {inputs.solveFor === "n" && <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.moles}
                    onChange={(e) => setInputs((p) => ({ ...p, moles: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    disabled={inputs.solveFor === "n"}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                      inputs.solveFor === "n" ? "bg-primary/5 border-primary/20 text-primary/50 cursor-not-allowed" :
                      errors.moles ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder={inputs.solveFor === "n" ? "calculated" : "e.g. 1"}
                    min="0" step="any"
                    aria-label="Moles"
                  />
                  {errors.moles && <p className="text-xs text-red-600 mt-1">{errors.moles}</p>}
                </div>
                <div className="flex items-end">
                  <div className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg bg-gray-50 text-sm text-gray-500 font-medium">
                    Unit: mol (moles)
                  </div>
                </div>
              </div>

              {/* Temperature */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (T)
                    {inputs.solveFor === "T" && <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.temperature}
                    onChange={(e) => setInputs((p) => ({ ...p, temperature: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    disabled={inputs.solveFor === "T"}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                      inputs.solveFor === "T" ? "bg-primary/5 border-primary/20 text-primary/50 cursor-not-allowed" :
                      errors.temperature ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder={inputs.solveFor === "T" ? "calculated" : "e.g. 273.15"}
                    step="any"
                    aria-label="Temperature"
                  />
                  {errors.temperature && <p className="text-xs text-red-600 mt-1">{errors.temperature}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                  <select
                    value={inputs.temperatureUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, temperatureUnit: e.target.value as TemperatureUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_TEMPERATURE_UNITS.map((u) => (
                      <option key={u} value={u}>{TEMPERATURE_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live formula substitution */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>{result.formulaUsed}</strong>
                  <br />
                  <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{formatSci(result.value, inputs.precision)} {result.unit}</strong></span>
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
                {GAS_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Calculation Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Variable</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Input</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SI Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className={inputs.solveFor === "P" ? "bg-primary/5" : ""}>
                        <td className={`py-2 px-3 font-medium ${inputs.solveFor === "P" ? "text-primary" : "text-gray-700"}`}>Pressure (P)</td>
                        <td className="py-2 px-3 font-mono">
                          {inputs.solveFor === "P" ? <span className="text-primary font-semibold">{formatSci(result.value, inputs.precision)} {result.unit}</span> : `${inputs.pressure} ${PRESSURE_SHORT[inputs.pressureUnit]}`}
                        </td>
                        <td className="py-2 px-3 font-mono text-gray-600">{formatSci(result.P_Pa, 4)} Pa</td>
                      </tr>
                      <tr className={inputs.solveFor === "V" ? "bg-primary/5" : ""}>
                        <td className={`py-2 px-3 font-medium ${inputs.solveFor === "V" ? "text-primary" : "text-gray-700"}`}>Volume (V)</td>
                        <td className="py-2 px-3 font-mono">
                          {inputs.solveFor === "V" ? <span className="text-primary font-semibold">{formatSci(result.value, inputs.precision)} {result.unit}</span> : `${inputs.volume} ${VOLUME_SHORT[inputs.volumeUnit]}`}
                        </td>
                        <td className="py-2 px-3 font-mono text-gray-600">{formatSci(result.V_m3, 6)} m³</td>
                      </tr>
                      <tr className={inputs.solveFor === "n" ? "bg-primary/5" : ""}>
                        <td className={`py-2 px-3 font-medium ${inputs.solveFor === "n" ? "text-primary" : "text-gray-700"}`}>Moles (n)</td>
                        <td className="py-2 px-3 font-mono">
                          {inputs.solveFor === "n" ? <span className="text-primary font-semibold">{formatSci(result.value, inputs.precision)} mol</span> : `${inputs.moles} mol`}
                        </td>
                        <td className="py-2 px-3 font-mono text-gray-600">{formatSci(result.n_mol, 4)} mol</td>
                      </tr>
                      <tr className={inputs.solveFor === "T" ? "bg-primary/5" : ""}>
                        <td className={`py-2 px-3 font-medium ${inputs.solveFor === "T" ? "text-primary" : "text-gray-700"}`}>Temperature (T)</td>
                        <td className="py-2 px-3 font-mono">
                          {inputs.solveFor === "T" ? <span className="text-primary font-semibold">{formatSci(result.value, inputs.precision)} {result.unit}</span> : `${inputs.temperature} ${TEMPERATURE_SHORT[inputs.temperatureUnit]}`}
                        </td>
                        <td className="py-2 px-3 font-mono text-gray-600">{formatSci(result.T_K, 4)} K</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-3 font-medium text-gray-700">Gas Constant (R)</td>
                        <td className="py-2 px-3 font-mono text-gray-600" colSpan={2}>8.314472 J/(mol·K)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-lg font-bold text-gray-800">
                  PV = nRT
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { sym: "P", name: "Pressure",    color: "blue",   desc: "Force per unit area exerted by the gas. Units: Pa, kPa, atm, bar, psi, mmHg." },
                    { sym: "V", name: "Volume",      color: "green",  desc: "Space occupied by the gas. Units: m³, L, mL, ft³." },
                    { sym: "n", name: "Moles",       color: "orange", desc: "Amount of gas substance. 1 mol = 6.022 × 10²³ molecules." },
                    { sym: "R", name: "Gas Constant", color: "gray",  desc: "Universal constant = 8.314472 J/(mol·K). Fixed value." },
                    { sym: "T", name: "Temperature", color: "purple", desc: "Absolute temperature in Kelvin. Must be > 0 K." },
                  ].map(({ sym, name, color, desc }) => (
                    <div key={sym} className={`p-3 bg-${color}-50 border border-${color}-200 rounded-lg`}>
                      <div className={`font-semibold text-${color}-800 text-xs uppercase mb-1`}>{sym} — {name}</div>
                      <div className={`text-${color}-700 text-xs`}>{desc}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 space-y-1">
                  <div className="font-semibold text-gray-600 mb-1">Rearranged Forms</div>
                  {["P = nRT / V", "V = nRT / P", "n = PV / RT", "T = PV / nR"].map((f) => (
                    <div key={f} className="font-mono">{f}</div>
                  ))}
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
                      const sLabel = SOLVE_FOR_OPTIONS.find((o) => o.value === entry.inputs.solveFor)?.label ?? entry.inputs.solveFor;
                      return (
                        <div
                          key={entry.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => loadFromHistory(entry)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {sLabel} = {formatSci(entry.result.value, entry.inputs.precision)} {entry.result.unit}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">{entry.result.formulaUsed}</div>
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

      <IdealGasLawCalculatorSEO />
      <RelatedTools
        currentTool="ideal-gas-law-calculator"
        tools={[
          "reynolds-number-calculator",
          "bernoulli-equation-calculator",
          "pressure-drop-calculator",
          "flow-rate-calculator",
          "temperature-conversion-scientific",
          "heat-transfer-calculator",
        ]}
      />
    </>
  );
}
