"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { LatheInputs, LatheResult, HistoryEntry, Material, UnitSystem } from "./types";
import {
  calculate,
  validateDiameter,
  validateCuttingSpeed,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  getSpeedStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  MATERIAL_DATA,
  ALL_MATERIALS,
} from "./logic";
import LatheSpeedCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: LatheInputs = {
  unitSystem:   "metric",
  material:     "mild-steel",
  diameter:     "",
  cuttingSpeed: "30",
  precision:    1,
};

const PRESETS = [
  { label: "Mild Steel Ø50mm",  diameter: "50",  cuttingSpeed: "30",  material: "mild-steel"      as Material, unitSystem: "metric"   as UnitSystem },
  { label: "Aluminum Ø25mm",    diameter: "25",  cuttingSpeed: "90",  material: "aluminum"        as Material, unitSystem: "metric"   as UnitSystem },
  { label: "Stainless Ø75mm",   diameter: "75",  cuttingSpeed: "20",  material: "stainless-steel" as Material, unitSystem: "metric"   as UnitSystem },
  { label: 'Brass 1.5" (Imp)',  diameter: "1.5", cuttingSpeed: "328", material: "brass"           as Material, unitSystem: "imperial" as UnitSystem },
];

export default function LatheSpeedCalculatorUI() {
  const [inputs,      setInputs]      = useState<LatheInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<LatheResult | null>(null);
  const [diamError,   setDiamError]   = useState<string | null>(null);
  const [vcError,     setVcError]     = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const diamRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    diamRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const de = validateDiameter(inputs.diameter);
      const ve = validateCuttingSpeed(inputs.cuttingSpeed);
      setDiamError(de);
      setVcError(ve);
      if (de || ve) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => {
    if (inputs.diameter === "" && inputs.cuttingSpeed === "") {
      setResult(null); setDiamError(null); setVcError(null); return;
    }
    run();
  }, [inputs, run]);

  // When material changes, auto-fill recommended cutting speed
  const handleMaterialChange = (mat: Material) => {
    const data = MATERIAL_DATA[mat];
    const isMetric = inputs.unitSystem === "metric";
    const speed: number = data.metricSpeed > 0
      ? (isMetric ? data.metricSpeed : Math.round(data.metricSpeed * 3.28084))
      : parseFloat(inputs.cuttingSpeed) || 0;
    setInputs((p) => ({ ...p, material: mat, cuttingSpeed: speed > 0 ? String(speed) : p.cuttingSpeed }));
  };

  // When unit system changes, convert cutting speed
  const handleUnitChange = (unit: UnitSystem) => {
    const vc = parseFloat(inputs.cuttingSpeed);
    if (!isNaN(vc) && vc > 0) {
      const converted = unit === "imperial"
        ? Math.round(vc * 3.28084)
        : Math.round(vc / 3.28084);
      const diam = parseFloat(inputs.diameter);
      const convertedDiam = !isNaN(diam) && diam > 0
        ? (unit === "imperial" ? String((diam / 25.4).toFixed(3)) : String(Math.round(diam * 25.4)))
        : inputs.diameter;
      setInputs((p) => ({ ...p, unitSystem: unit, cuttingSpeed: String(converted), diameter: convertedDiam }));
    } else {
      setInputs((p) => ({ ...p, unitSystem: unit }));
    }
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      unitSystem:   p.unitSystem,
      material:     p.material,
      diameter:     p.diameter,
      cuttingSpeed: p.cuttingSpeed,
    }));
    diamRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setDiamError(null);
    setVcError(null);
    diamRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Recommended RPM: ${formatNum(result.rpm, inputs.precision)}`;
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
    downloadFile(exportToText(inputs, result), "lathe_speed_calculation.txt");
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

  const isMetric = inputs.unitSystem === "metric";
  const dUnit    = isMetric ? "mm" : "in";
  const vcUnit   = isMetric ? "m/min" : "SFM";
  const mat      = MATERIAL_DATA[inputs.material];
  const vcMmin   = isMetric
    ? parseFloat(inputs.cuttingSpeed)
    : parseFloat(inputs.cuttingSpeed) / 3.28084;
  const speedStatus = result ? getSpeedStatus(vcMmin, inputs.material) : "unknown";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Lathe Speed Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate optimal spindle RPM for lathe turning operations using workpiece diameter,
                cutting speed, and material type. Supports metric and imperial units.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-1 text-xs uppercase tracking-wider">
                Recommended Spindle Speed
              </p>
              <div className="text-4xl font-bold leading-none break-all mb-1">
                {result ? formatNum(result.rpm, inputs.precision) : "—"}
              </div>
              {result && (
                <p className="text-primary-100 text-sm mb-3">RPM</p>
              )}

              {result && speedStatus !== "unknown" && (
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${STATUS_COLORS[speedStatus]}`}>
                  <span>{speedStatus === "optimal" ? "✓" : speedStatus === "high" ? "⚠" : "↓"}</span>
                  {STATUS_LABELS[speedStatus]}
                </div>
              )}

              {result && result.rpmMin > 0 && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">RPM Range:</span>
                    <span className="font-semibold">
                      {formatNum(result.rpmMin, 0)} – {formatNum(result.rpmMax, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Material:</span>
                    <span className="font-semibold">{mat.label}</span>
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
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={0}>0 decimal places</option>
                  <option value={1}>1 decimal place</option>
                  <option value={2}>2 decimal places</option>
                </select>
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

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Calculator Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Calculator Settings</h3>

              {/* Unit System */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="flex gap-2">
                  {(["metric", "imperial"] as UnitSystem[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => handleUnitChange(u)}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.unitSystem === u
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {u === "metric" ? "Metric (mm, m/min)" : "Imperial (in, SFM)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
                <select
                  value={inputs.material}
                  onChange={(e) => handleMaterialChange(e.target.value as Material)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {ALL_MATERIALS.map((m) => (
                    <option key={m} value={m}>{MATERIAL_DATA[m].label}</option>
                  ))}
                </select>
                {inputs.material !== "custom" && (
                  <p className="text-xs text-gray-500 mt-1.5">
                    Recommended: {mat.minSpeed}–{mat.maxSpeed} m/min — {mat.note}
                  </p>
                )}
              </div>
            </div>

            {/* Input Values */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Diameter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workpiece Diameter ({dUnit})
                    <span className="ml-1 text-xs text-gray-400" title="Outer diameter of the workpiece being turned">ⓘ</span>
                  </label>
                  <input
                    ref={diamRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.diameter}
                    onChange={(e) => setInputs((p) => ({ ...p, diameter: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${diamError ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isMetric ? "e.g. 50" : "e.g. 2"}
                    min="0"
                    step="any"
                    aria-label="Workpiece diameter"
                  />
                  {diamError && <p className="text-xs text-red-600 mt-1">{diamError}</p>}
                </div>

                {/* Cutting Speed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cutting Speed ({vcUnit})
                    <span className="ml-1 text-xs text-gray-400" title="Surface speed of the cutting tool relative to the workpiece">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.cuttingSpeed}
                    onChange={(e) => setInputs((p) => ({ ...p, cuttingSpeed: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${vcError ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isMetric ? "e.g. 30" : "e.g. 100"}
                    min="0"
                    step="any"
                    aria-label="Cutting speed"
                  />
                  {vcError && <p className="text-xs text-red-600 mt-1">{vcError}</p>}
                </div>
              </div>

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  {isMetric ? (
                    <>
                      <strong>RPM = (1000 × {inputs.cuttingSpeed}) ÷ (π × {inputs.diameter})</strong>
                      {" = "}<strong>{formatNum(result.rpm, inputs.precision)} RPM</strong>
                    </>
                  ) : (
                    <>
                      <strong>RPM = (12 × {inputs.cuttingSpeed}) ÷ (π × {inputs.diameter})</strong>
                      {" = "}<strong>{formatNum(result.rpm, inputs.precision)} RPM</strong>
                    </>
                  )}
                </div>
              )}

              {/* Formula explanation (toggle) */}
              {showFormula && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 space-y-2">
                  <div className="font-semibold text-gray-800">Formula Reference</div>
                  <div className="font-mono">Metric:   RPM = (1000 × Vc) ÷ (π × D)</div>
                  <div className="font-mono">Imperial: RPM = (12 × SFM) ÷ (π × D)</div>
                  <div className="text-gray-500 text-xs mt-1">
                    Vc = cutting speed (m/min) · D = diameter (mm) · SFM = surface feet per minute
                  </div>
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
                  const active = inputs.diameter === p.diameter && inputs.cuttingSpeed === p.cuttingSpeed && inputs.material === p.material;
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
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Results Breakdown</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Recommended RPM</div>
                    <div className="text-3xl font-bold text-primary">{formatNum(result.rpm, inputs.precision)}</div>
                    <div className="text-xs text-gray-500 mt-1">RPM</div>
                  </div>
                  {result.rpmMin > 0 && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">RPM Range</div>
                      <div className="text-2xl font-bold text-gray-800">
                        {formatNum(result.rpmMin, 0)} – {formatNum(result.rpmMax, 0)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Based on {mat.minSpeed}–{mat.maxSpeed} m/min</div>
                    </div>
                  )}
                </div>

                {/* Safety message */}
                <div className={`p-3 rounded-lg border text-sm ${
                  result.speedStatus === "optimal"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : result.speedStatus === "high"
                    ? "bg-red-50 border-red-200 text-red-800"
                    : result.speedStatus === "low"
                    ? "bg-blue-50 border-blue-200 text-blue-800"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}>
                  <strong>Safety:</strong> {result.safetyMessage}
                </div>

                {/* Hint */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  <strong>Tip:</strong> {result.hint}
                </div>
              </div>
            )}

            {/* Material Reference Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Material Speed Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Material</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Speed (m/min)</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Speed (SFM)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ALL_MATERIALS.filter((m) => m !== "custom").map((m) => {
                      const d = MATERIAL_DATA[m];
                      const isActive = inputs.material === m;
                      return (
                        <tr
                          key={m}
                          className={`hover:bg-gray-50 cursor-pointer transition-colors ${isActive ? "bg-primary/5" : ""}`}
                          onClick={() => handleMaterialChange(m)}
                        >
                          <td className={`py-2 px-3 font-medium ${isActive ? "text-primary" : "text-gray-700"}`}>{d.label}</td>
                          <td className="py-2 px-3 font-mono text-gray-600">{d.minSpeed}–{d.maxSpeed}</td>
                          <td className="py-2 px-3 font-mono text-gray-600">
                            {Math.round(d.minSpeed * 3.28084)}–{Math.round(d.maxSpeed * 3.28084)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">Click a row to select that material. Speeds are for HSS tools.</p>
            </div>

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
                            {formatNum(entry.result.rpm, entry.inputs.precision)} RPM
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {MATERIAL_DATA[entry.inputs.material].label} · Ø{entry.inputs.diameter} {entry.inputs.unitSystem === "metric" ? "mm" : "in"} · {entry.inputs.cuttingSpeed} {entry.inputs.unitSystem === "metric" ? "m/min" : "SFM"}
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

      <LatheSpeedCalculatorSEO />
      <RelatedTools
        currentTool="lathe-speed-calculator"
        tools={[
          "cutting-speed-calculator",
          "torque-calculator",
          "gear-ratio-calculator",
          "angular-velocity-calculator",
          "thread-pitch-calculator",
          "feed-rate-calculator",
        ]}
      />
    </>
  );
}
