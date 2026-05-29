"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  NaturalFrequencyInputs,
  NaturalFrequencyResult,
  HistoryEntry,
  SystemType,
  MassUnit,
  SpringKUnit,
  LengthUnit,
  BeamLengthUnit,
  YoungModulusUnit,
  MomentUnit,
  DensityUnit,
  TorsionalKUnit,
  MomentOfInertiaUnit,
  Precision,
} from "./types";
import {
  calculate,
  getErrors,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  MASS_LABELS,
  SPRING_K_LABELS,
  LENGTH_LABELS,
  BEAM_LENGTH_LABELS,
  YOUNG_LABELS,
  MOMENT_LABELS,
  DENSITY_LABELS,
  TORSIONAL_K_LABELS,
  MOI_LABELS,
} from "./logic";
import NaturalFrequencySEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  {
    label: "Car Suspension",
    system: "spring-mass" as SystemType,
    springMass: { mass: "1500", massUnit: "kg" as MassUnit, springConstant: "25000", springKUnit: "N/m" as SpringKUnit },
  },
  {
    label: "Machine Spring",
    system: "spring-mass" as SystemType,
    springMass: { mass: "10", massUnit: "kg" as MassUnit, springConstant: "1000", springKUnit: "N/m" as SpringKUnit },
  },
  {
    label: "Pendulum Clock",
    system: "pendulum" as SystemType,
    pendulum: { length: "0.994", lengthUnit: "m" as LengthUnit },
  },
  {
    label: "Playground Swing",
    system: "pendulum" as SystemType,
    pendulum: { length: "2", lengthUnit: "m" as LengthUnit },
  },
];

const DEFAULT_INPUTS: NaturalFrequencyInputs = {
  system: "spring-mass",
  springMass: {
    mass: "10",
    massUnit: "kg",
    springConstant: "1000",
    springKUnit: "N/m",
  },
  pendulum: {
    length: "1",
    lengthUnit: "m",
  },
  beam: {
    beamLength: "5",
    beamLengthUnit: "m",
    youngModulus: "200",
    youngModulusUnit: "GPa",
    momentOfInertia: "8333",
    momentUnit: "cm4",
    density: "7850",
    densityUnit: "kg/m3",
    crossSectionArea: "0.01",
  },
  torsional: {
    torsionalStiffness: "1000",
    torsionalKUnit: "N·m/rad",
    momentOfInertia: "5",
    momentOfInertiaUnit: "kg·m2",
  },
  precision: 2,
};

const SYSTEM_LABELS: Record<SystemType, string> = {
  "spring-mass": "Spring-Mass System",
  "pendulum":    "Pendulum System",
  "beam":        "Beam Vibration",
  "torsional":   "Torsional System",
};

const SYSTEM_ICONS: Record<SystemType, string> = {
  "spring-mass": "🌀",
  "pendulum":    "🕰️",
  "beam":        "🏗️",
  "torsional":   "⚙️",
};

export default function NaturalFrequencyCalculatorUI() {
  const [inputs,      setInputs]      = useState<NaturalFrequencyInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<NaturalFrequencyResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const errs = getErrors(inputs);
      setErrors(errs);
      const hasError = Object.values(errs).some(Boolean);
      if (hasError) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSystemChange = (system: SystemType) => {
    setInputs((p) => ({ ...p, system }));
    setResult(null);
    setErrors({});
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      system: preset.system,
      ...(preset.springMass ? { springMass: { ...prev.springMass, ...preset.springMass } } : {}),
      ...(preset.pendulum   ? { pendulum:   { ...prev.pendulum,   ...preset.pendulum   } } : {}),
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
    const text = `Natural Frequency: ${formatNum(result.frequencyHz, inputs.precision)} Hz | Angular: ${formatNum(result.angularFrequencyRad, inputs.precision)} rad/s | System: ${SYSTEM_LABELS[inputs.system]}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result, SYSTEM_LABELS[inputs.system]);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "natural-frequency-calculation.txt");
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

  // ── Input helpers ─────────────────────────────────────────────────────────
  const setSpringMass = (field: string, value: string) =>
    setInputs((p) => ({ ...p, springMass: { ...p.springMass, [field]: value } }));
  const setPendulum = (field: string, value: string) =>
    setInputs((p) => ({ ...p, pendulum: { ...p.pendulum, [field]: value } }));
  const setBeam = (field: string, value: string) =>
    setInputs((p) => ({ ...p, beam: { ...p.beam, [field]: value } }));
  const setTorsional = (field: string, value: string) =>
    setInputs((p) => ({ ...p, torsional: { ...p.torsional, [field]: value } }));

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">〰️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Natural Frequency Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the natural frequency of mechanical systems using standard engineering formulas.
                Supports spring-mass, pendulum, beam vibration, and torsional systems with real-time results.
              </p>
            </div>
          </div>
        </div>

        {/* System Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Select System Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["spring-mass", "pendulum", "beam", "torsional"] as SystemType[]).map((sys) => (
              <button
                key={sys}
                onClick={() => handleSystemChange(sys)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border flex items-center gap-2 justify-center ${
                  inputs.system === sys
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span>{SYSTEM_ICONS[sys]}</span>
                <span className="hidden sm:inline">{SYSTEM_LABELS[sys].split(" ")[0]}</span>
                <span className="sm:hidden">{SYSTEM_LABELS[sys].split(" ")[0]}</span>
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
                Natural Frequency
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result !== null ? `${formatNum(result.frequencyHz, inputs.precision)} Hz` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Frequency (Hz)</span>
                    <span className="font-semibold">{formatNum(result.frequencyHz, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Angular (rad/s)</span>
                    <span className="font-semibold">{formatNum(result.angularFrequencyRad, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Period (s)</span>
                    <span className="font-semibold">{formatNum(result.periodSeconds, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">System</span>
                    <span className="font-semibold text-xs">{SYSTEM_LABELS[inputs.system]}</span>
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
                  <option value={8}>8 decimal places</option>
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

            {/* Spring-Mass Inputs */}
            {inputs.system === "spring-mass" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Spring-Mass System</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mass (m)
                      <span className="ml-1 text-xs text-gray-400" title="Mass of the vibrating object">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.springMass.mass}
                      onChange={(e) => setSpringMass("mass", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.mass ? "border-red-300" : "border-gray-200"}`}
                      placeholder="10"
                      min="0"
                      step="any"
                      aria-label="Mass value"
                    />
                    {errors.mass && <p className="text-xs text-red-600 mt-1">{errors.mass}</p>}
                    <p className="text-xs text-gray-400 mt-1">e.g. 10 kg, 500 g, 22 lb</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mass Unit</label>
                    <select
                      value={inputs.springMass.massUnit}
                      onChange={(e) => setSpringMass("massUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(["kg", "g", "lb"] as MassUnit[]).map((u) => (
                        <option key={u} value={u}>{MASS_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spring Constant (k)
                      <span className="ml-1 text-xs text-gray-400" title="Stiffness of the spring">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.springMass.springConstant}
                      onChange={(e) => setSpringMass("springConstant", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.springConstant ? "border-red-300" : "border-gray-200"}`}
                      placeholder="1000"
                      min="0"
                      step="any"
                      aria-label="Spring constant value"
                    />
                    {errors.springConstant && <p className="text-xs text-red-600 mt-1">{errors.springConstant}</p>}
                    <p className="text-xs text-gray-400 mt-1">Typical: 100–5000 N/m</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Spring Constant Unit</label>
                    <select
                      value={inputs.springMass.springKUnit}
                      onChange={(e) => setSpringMass("springKUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(["N/m", "kN/m", "lb/in"] as SpringKUnit[]).map((u) => (
                        <option key={u} value={u}>{SPRING_K_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> f = (1 / 2π) × √(k / m) = <strong>{formatNum(result.frequencyHz, inputs.precision)} Hz</strong>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* Pendulum Inputs */}
            {inputs.system === "pendulum" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Pendulum System</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pendulum Length (L)
                      <span className="ml-1 text-xs text-gray-400" title="Length from pivot to center of mass">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.pendulum.length}
                      onChange={(e) => setPendulum("length", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.length ? "border-red-300" : "border-gray-200"}`}
                      placeholder="1"
                      min="0"
                      step="any"
                      aria-label="Pendulum length"
                    />
                    {errors.length && <p className="text-xs text-red-600 mt-1">{errors.length}</p>}
                    <p className="text-xs text-gray-400 mt-1">e.g. 1 m, 100 cm, 3.28 ft</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length Unit</label>
                    <select
                      value={inputs.pendulum.lengthUnit}
                      onChange={(e) => setPendulum("lengthUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(["m", "cm", "ft", "in"] as LengthUnit[]).map((u) => (
                        <option key={u} value={u}>{LENGTH_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <strong>Note:</strong> Uses standard gravity g = 9.80665 m/s². Valid for small-angle oscillations (θ &lt; 15°).
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> f = (1 / 2π) × √(g / L) = <strong>{formatNum(result.frequencyHz, inputs.precision)} Hz</strong>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* Beam Inputs */}
            {inputs.system === "beam" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Beam Vibration (Simply Supported, First Mode)</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Beam Length (L)</label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={inputs.beam.beamLength}
                      onChange={(e) => setBeam("beamLength", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.beamLength ? "border-red-300" : "border-gray-200"}`}
                      placeholder="5" min="0" step="any" aria-label="Beam length"
                    />
                    {errors.beamLength && <p className="text-xs text-red-600 mt-1">{errors.beamLength}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length Unit</label>
                    <select value={inputs.beam.beamLengthUnit} onChange={(e) => setBeam("beamLengthUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium">
                      {(["m", "cm", "ft", "in"] as BeamLengthUnit[]).map((u) => (
                        <option key={u} value={u}>{BEAM_LENGTH_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Young&apos;s Modulus (E)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.beam.youngModulus}
                      onChange={(e) => setBeam("youngModulus", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.youngModulus ? "border-red-300" : "border-gray-200"}`}
                      placeholder="200" min="0" step="any" aria-label="Young's modulus"
                    />
                    {errors.youngModulus && <p className="text-xs text-red-600 mt-1">{errors.youngModulus}</p>}
                    <p className="text-xs text-gray-400 mt-1">Steel ≈ 200 GPa, Aluminum ≈ 70 GPa</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Modulus Unit</label>
                    <select value={inputs.beam.youngModulusUnit} onChange={(e) => setBeam("youngModulusUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium">
                      {(["GPa", "MPa", "psi"] as YoungModulusUnit[]).map((u) => (
                        <option key={u} value={u}>{YOUNG_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Moment of Inertia (I)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.beam.momentOfInertia}
                      onChange={(e) => setBeam("momentOfInertia", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.momentOfInertia ? "border-red-300" : "border-gray-200"}`}
                      placeholder="8333" min="0" step="any" aria-label="Moment of inertia"
                    />
                    {errors.momentOfInertia && <p className="text-xs text-red-600 mt-1">{errors.momentOfInertia}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inertia Unit</label>
                    <select value={inputs.beam.momentUnit} onChange={(e) => setBeam("momentUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium">
                      {(["m4", "cm4", "in4"] as MomentUnit[]).map((u) => (
                        <option key={u} value={u}>{MOMENT_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Density (ρ)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.beam.density}
                      onChange={(e) => setBeam("density", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.density ? "border-red-300" : "border-gray-200"}`}
                      placeholder="7850" min="0" step="any" aria-label="Density"
                    />
                    {errors.density && <p className="text-xs text-red-600 mt-1">{errors.density}</p>}
                    <p className="text-xs text-gray-400 mt-1">Steel ≈ 7850 kg/m³</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Density Unit</label>
                    <select value={inputs.beam.densityUnit} onChange={(e) => setBeam("densityUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium">
                      {(["kg/m3", "lb/ft3"] as DensityUnit[]).map((u) => (
                        <option key={u} value={u}>{DENSITY_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cross-Section Area (A) in m²
                    <span className="ml-1 text-xs text-gray-400" title="Cross-sectional area of the beam in square meters">ⓘ</span>
                  </label>
                  <input type="number" inputMode="decimal"
                    value={inputs.beam.crossSectionArea}
                    onChange={(e) => setBeam("crossSectionArea", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.crossSectionArea ? "border-red-300" : "border-gray-200"}`}
                    placeholder="0.01" min="0" step="any" aria-label="Cross-section area"
                  />
                  {errors.crossSectionArea && <p className="text-xs text-red-600 mt-1">{errors.crossSectionArea}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. 0.01 m² = 100 cm² = 10×10 cm section</p>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> f = (π² / 2πL²) × √(EI / ρA) = <strong>{formatNum(result.frequencyHz, inputs.precision)} Hz</strong>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* Torsional Inputs */}
            {inputs.system === "torsional" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Torsional System</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Torsional Stiffness (kₜ)
                      <span className="ml-1 text-xs text-gray-400" title="Rotational spring stiffness">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={inputs.torsional.torsionalStiffness}
                      onChange={(e) => setTorsional("torsionalStiffness", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.torsionalStiffness ? "border-red-300" : "border-gray-200"}`}
                      placeholder="1000" min="0" step="any" aria-label="Torsional stiffness"
                    />
                    {errors.torsionalStiffness && <p className="text-xs text-red-600 mt-1">{errors.torsionalStiffness}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stiffness Unit</label>
                    <select value={inputs.torsional.torsionalKUnit} onChange={(e) => setTorsional("torsionalKUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium">
                      {(["N·m/rad", "lb·in/rad"] as TorsionalKUnit[]).map((u) => (
                        <option key={u} value={u}>{TORSIONAL_K_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mass Moment of Inertia (J)
                      <span className="ml-1 text-xs text-gray-400" title="Rotational inertia of the body">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.torsional.momentOfInertia}
                      onChange={(e) => setTorsional("momentOfInertia", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.momentOfInertia ? "border-red-300" : "border-gray-200"}`}
                      placeholder="5" min="0" step="any" aria-label="Mass moment of inertia"
                    />
                    {errors.momentOfInertia && <p className="text-xs text-red-600 mt-1">{errors.momentOfInertia}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inertia Unit</label>
                    <select value={inputs.torsional.momentOfInertiaUnit} onChange={(e) => setTorsional("momentOfInertiaUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium">
                      {(["kg·m2", "lb·in2"] as MomentOfInertiaUnit[]).map((u) => (
                        <option key={u} value={u}>{MOI_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> f = (1 / 2π) × √(kₜ / J) = <strong>{formatNum(result.frequencyHz, inputs.precision)} Hz</strong>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      inputs.system === p.system &&
                      (p.system === "spring-mass"
                        ? inputs.springMass.mass === p.springMass?.mass && inputs.springMass.springConstant === p.springMass?.springConstant
                        : inputs.pendulum.length === p.pendulum?.length)
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
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
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">f (Hz)</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.frequencyHz, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Natural frequency in Hertz</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">ω (rad/s)</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.angularFrequencyRad, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Angular frequency</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">T (s)</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.periodSeconds, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Period (time per cycle)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">f (rpm)</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.frequencyHz * 60, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Cycles per minute</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step-by-Step Breakdown */}
            {result && result.stepByStep.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Step-by-Step Calculation</h3>
                <ol className="space-y-2">
                  {result.stepByStep.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">
                        {i + 1}
                      </span>
                      <span className="font-mono text-xs leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Educational Formula Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Spring-Mass</div>
                      <div className="font-mono text-center text-sm">f = (1/2π) × √(k/m)</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Pendulum</div>
                      <div className="font-mono text-center text-sm">f = (1/2π) × √(g/L)</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Beam (Simply Supported)</div>
                      <div className="font-mono text-center text-sm">f = (π²/2πL²) × √(EI/ρA)</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Torsional</div>
                      <div className="font-mono text-center text-sm">f = (1/2π) × √(kₜ/J)</div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">f (Hz)</div>
                      <div className="text-blue-700 text-xs">Natural frequency — cycles per second</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">ω (rad/s)</div>
                      <div className="text-orange-700 text-xs">Angular frequency = 2π × f</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">T (s)</div>
                      <div className="text-green-700 text-xs">Period = 1/f — time per cycle</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Key concept:</strong> Natural frequency is the rate at which a system oscillates when disturbed without external forcing or damping. Resonance occurs when an external force matches the natural frequency, potentially causing large amplitudes.
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
                          <span className="font-semibold text-gray-900 text-sm">{entry.systemLabel}</span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {formatNum(entry.result.frequencyHz, 4)} Hz
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

      <NaturalFrequencySEO />
      <RelatedTools
        currentTool="natural-frequency-calculator"
        tools={[
          "spring-force-calculator",
          "torque-calculator",
          "kinetic-energy-calculator",
          "moment-of-inertia-calculator",
          "beam-deflection-calculator",
          "stress-calculator",
        ]}
      />
    </>
  );
}
