"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FeedRateInputs, FeedRateResult, HistoryEntry, Material, UnitSystem } from "./types";
import {
  calculate,
  validateRPM,
  validateFlutes,
  validateFeedPerTooth,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  getFeedStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  MATERIAL_DATA,
  ALL_MATERIALS,
} from "./logic";
import FeedRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: FeedRateInputs = {
  unitSystem:   "metric",
  material:     "aluminum",
  rpm:          "3000",
  flutes:       "4",
  feedPerTooth: "0.08",
  precision:    2,
};

const PRESETS = [
  { label: "Aluminum 4-flute",    rpm: "3000", flutes: "4", feedPerTooth: "0.08", material: "aluminum"        as Material, unitSystem: "metric"   as UnitSystem },
  { label: "Mild Steel 2-flute",  rpm: "1800", flutes: "2", feedPerTooth: "0.04", material: "mild-steel"      as Material, unitSystem: "metric"   as UnitSystem },
  { label: "Stainless 4-flute",   rpm: "1200", flutes: "4", feedPerTooth: "0.025",material: "stainless-steel" as Material, unitSystem: "metric"   as UnitSystem },
  { label: "Aluminum 6-fl (Imp)", rpm: "5000", flutes: "6", feedPerTooth: "0.004",material: "aluminum"        as Material, unitSystem: "imperial" as UnitSystem },
];

export default function FeedRateCalculatorUI() {
  const [inputs,      setInputs]      = useState<FeedRateInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<FeedRateResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const rpmRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    rpmRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const newErrors: Record<string, string | null> = {
        rpm:          validateRPM(inputs.rpm),
        flutes:       validateFlutes(inputs.flutes),
        feedPerTooth: validateFeedPerTooth(inputs.feedPerTooth),
      };
      setErrors(newErrors);
      const hasError = Object.values(newErrors).some(Boolean);
      if (hasError) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // When material changes, auto-suggest chip load
  const handleMaterialChange = (mat: Material) => {
    const data = MATERIAL_DATA[mat];
    const isMetric = inputs.unitSystem === "metric";
    if (mat !== "custom" && data.defaultChipLoadMetric > 0) {
      const chipLoad = isMetric
        ? String(data.defaultChipLoadMetric)
        : String((data.defaultChipLoadMetric / 25.4).toFixed(4));
      setInputs((p) => ({ ...p, material: mat, feedPerTooth: chipLoad }));
    } else {
      setInputs((p) => ({ ...p, material: mat }));
    }
  };

  // When unit system changes, convert feed per tooth
  const handleUnitChange = (unit: UnitSystem) => {
    const fpt = parseFloat(inputs.feedPerTooth);
    if (!isNaN(fpt) && fpt > 0) {
      const converted = unit === "imperial"
        ? (fpt / 25.4).toFixed(4)
        : (fpt * 25.4).toFixed(4);
      setInputs((p) => ({ ...p, unitSystem: unit, feedPerTooth: converted }));
    } else {
      setInputs((p) => ({ ...p, unitSystem: unit }));
    }
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      unitSystem:   p.unitSystem,
      material:     p.material,
      rpm:          p.rpm,
      flutes:       p.flutes,
      feedPerTooth: p.feedPerTooth,
    }));
    rpmRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    rpmRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const isMetric = inputs.unitSystem === "metric";
    const frUnit = isMetric ? "mm/min" : "in/min";
    const text = [
      `RPM: ${inputs.rpm}`,
      `Flutes: ${inputs.flutes}`,
      `Feed per Tooth: ${inputs.feedPerTooth} ${isMetric ? "mm/tooth" : "in/tooth"}`,
      `Feed Rate: ${formatNum(result.feedRate, inputs.precision)} ${frUnit}`,
    ].join(" | ");
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
    downloadFile(exportToText(inputs, result), "feed-rate-calculation.txt");
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
  const frUnit   = isMetric ? "mm/min" : "in/min";
  const fptUnit  = isMetric ? "mm/tooth" : "in/tooth";
  const mat      = MATERIAL_DATA[inputs.material];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Feed Rate Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate optimal CNC machining feed rate using spindle RPM, number of flutes, and feed per tooth (chip load).
                Supports metric and imperial units for milling, drilling, and CNC operations.
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
                Feed Rate
              </p>
              <div className="text-4xl font-bold leading-none break-all mb-1">
                {result ? formatNum(result.feedRate, inputs.precision) : "—"}
              </div>
              {result && (
                <p className="text-primary-100 text-sm mb-3">{frUnit}</p>
              )}

              {result && result.status !== "unknown" && (
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${STATUS_COLORS[result.status]}`}>
                  <span>{result.status === "optimal" ? "✓" : result.status === "high" ? "⚠" : "↓"}</span>
                  {STATUS_LABELS[result.status]}
                </div>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">{isMetric ? "in/min" : "mm/min"}</span>
                    <span className="font-semibold">{formatNum(result.feedRateAlt, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">RPM</span>
                    <span className="font-semibold">{inputs.rpm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Flutes</span>
                    <span className="font-semibold">{inputs.flutes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Chip Load</span>
                    <span className="font-semibold">{inputs.feedPerTooth} {fptUnit}</span>
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
                  <option value={2}>2 decimal places</option>
                  <option value={3}>3 decimal places</option>
                  <option value={4}>4 decimal places</option>
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
                      {u === "metric" ? "Metric (mm/min)" : "Imperial (in/min)"}
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
                    Recommended chip load: {mat.minChipLoadMetric}–{mat.maxChipLoadMetric} mm/tooth — {mat.note}
                  </p>
                )}
              </div>
            </div>

            {/* Input Values */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* RPM */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spindle Speed (RPM)
                    <span className="ml-1 text-xs text-gray-400" title="Revolutions per minute of the spindle">ⓘ</span>
                  </label>
                  <input
                    ref={rpmRef}
                    type="number"
                    inputMode="numeric"
                    value={inputs.rpm}
                    onChange={(e) => setInputs((p) => ({ ...p, rpm: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.rpm ? "border-red-300" : "border-gray-200"}`}
                    placeholder="3000"
                    min="0"
                    step="1"
                    aria-label="Spindle speed RPM"
                  />
                  {errors.rpm && <p className="text-xs text-red-600 mt-1">{errors.rpm}</p>}
                </div>

                {/* Flutes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Flutes
                    <span className="ml-1 text-xs text-gray-400" title="Number of cutting edges on the tool">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={inputs.flutes}
                    onChange={(e) => setInputs((p) => ({ ...p, flutes: e.target.value.replace(/[^0-9]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.flutes ? "border-red-300" : "border-gray-200"}`}
                    placeholder="4"
                    min="1"
                    step="1"
                    aria-label="Number of flutes"
                  />
                  {errors.flutes && <p className="text-xs text-red-600 mt-1">{errors.flutes}</p>}
                </div>
              </div>

              {/* Feed per Tooth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feed per Tooth / Chip Load ({fptUnit})
                  <span className="ml-1 text-xs text-gray-400" title="Distance the tool advances per cutting edge per revolution">ⓘ</span>
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputs.feedPerTooth}
                  onChange={(e) => setInputs((p) => ({ ...p, feedPerTooth: e.target.value.replace(/[^0-9.]/g, "") }))}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.feedPerTooth ? "border-red-300" : "border-gray-200"}`}
                  placeholder={isMetric ? "0.08" : "0.003"}
                  min="0"
                  step="any"
                  aria-label="Feed per tooth"
                />
                {errors.feedPerTooth && <p className="text-xs text-red-600 mt-1">{errors.feedPerTooth}</p>}
                {inputs.material !== "custom" && (
                  <p className="text-xs text-gray-500 mt-1.5">
                    Typical {mat.label}: {isMetric
                      ? `${mat.minChipLoadMetric}–${mat.maxChipLoadMetric} mm/tooth`
                      : `${(mat.minChipLoadMetric / 25.4).toFixed(4)}–${(mat.maxChipLoadMetric / 25.4).toFixed(4)} in/tooth`
                    }
                  </p>
                )}
              </div>

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Feed Rate = RPM × Flutes × Feed per Tooth</strong>
                  {" = "}{inputs.rpm} × {inputs.flutes} × {inputs.feedPerTooth}
                  {" = "}<strong>{formatNum(result.feedRate, inputs.precision)} {frUnit}</strong>
                </div>
              )}

              {/* Formula explanation (toggle) */}
              {showFormula && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 space-y-2">
                  <div className="font-semibold text-gray-800">Formula Reference</div>
                  <div className="font-mono">Feed Rate = RPM × z × fz</div>
                  <div className="text-gray-500 text-xs mt-1">
                    RPM = spindle speed · z = number of flutes · fz = feed per tooth (chip load)
                  </div>
                  <div className="text-gray-500 text-xs">
                    Metric: result in mm/min · Imperial: result in in/min
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
                  const active =
                    inputs.rpm === p.rpm &&
                    inputs.flutes === p.flutes &&
                    inputs.feedPerTooth === p.feedPerTooth &&
                    inputs.material === p.material;
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
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Feed Rate</div>
                    <div className="text-3xl font-bold text-primary">{formatNum(result.feedRate, inputs.precision)}</div>
                    <div className="text-xs text-gray-500 mt-1">{frUnit}</div>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                      {isMetric ? "in/min" : "mm/min"}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {formatNum(result.feedRateAlt, inputs.precision)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{isMetric ? "Imperial equivalent" : "Metric equivalent"}</div>
                  </div>
                </div>

                {/* Safety message */}
                <div className={`p-3 rounded-lg border text-sm ${
                  result.status === "optimal"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : result.status === "high"
                    ? "bg-red-50 border-red-200 text-red-800"
                    : result.status === "low"
                    ? "bg-blue-50 border-blue-200 text-blue-800"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}>
                  <strong>Status:</strong> {result.safetyMessage}
                </div>

                {/* Hint */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  <strong>Tip:</strong> {result.hint}
                </div>
              </div>
            )}

            {/* Material Chip Load Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Chip Load Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Material</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chip Load (mm/tooth)</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chip Load (in/tooth)</th>
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
                          <td className="py-2 px-3 font-mono text-gray-600">{d.minChipLoadMetric}–{d.maxChipLoadMetric}</td>
                          <td className="py-2 px-3 font-mono text-gray-600">
                            {(d.minChipLoadMetric / 25.4).toFixed(4)}–{(d.maxChipLoadMetric / 25.4).toFixed(4)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">Click a row to select that material. Values are for standard end mills.</p>
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
                            {formatNum(entry.result.feedRate, entry.inputs.precision)} {entry.inputs.unitSystem === "metric" ? "mm/min" : "in/min"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {MATERIAL_DATA[entry.inputs.material].label} · {entry.inputs.rpm} RPM · {entry.inputs.flutes} flutes · {entry.inputs.feedPerTooth} {entry.inputs.unitSystem === "metric" ? "mm/tooth" : "in/tooth"}
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

      <FeedRateCalculatorSEO />
      <RelatedTools
        currentTool="feed-rate-calculator"
        tools={[
          "cutting-speed-calculator",
          "lathe-speed-calculator",
          "torque-calculator",
          "angular-velocity-calculator",
          "thread-pitch-calculator",
          "gear-ratio-calculator",
        ]}
      />
    </>
  );
}
