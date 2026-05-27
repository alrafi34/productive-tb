"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, ConversionMode, DistanceUnit, HistoryEntry, OutputUnit } from "./types";
import {
  calculate,
  parseScale,
  formatNum,
  formatScale,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  UNIT_LABELS,
  UNIT_SHORT,
  OUTPUT_UNIT_LABELS,
  ALL_DISTANCE_UNITS,
  ALL_OUTPUT_UNITS,
} from "./logic";
import MapScaleCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const SCALE_PRESETS = [
  { label: "1:500",     value: "1:500" },
  { label: "1:1,000",   value: "1:1000" },
  { label: "1:2,500",   value: "1:2500" },
  { label: "1:5,000",   value: "1:5000" },
  { label: "1:10,000",  value: "1:10000" },
  { label: "1:25,000",  value: "1:25000" },
  { label: "1:50,000",  value: "1:50000" },
  { label: "1:100,000", value: "1:100000" },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  mode: "mapToReal",
  scaleInput: "1:25000",
  distance: "",
  distanceUnit: "cm",
  outputUnit: "auto",
  precision: 2,
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function MapScaleCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [scaleError, setScaleError] = useState<string | null>(null);
  const [distError, setDistError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const distanceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    distanceRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      // Validate scale
      const scale = parseScale(inputs.scaleInput);
      if (inputs.scaleInput && !scale) {
        setScaleError("Please enter a valid map scale (e.g. 1:25000 or 25000).");
        setResult(null);
        return;
      }
      setScaleError(null);

      // Validate distance
      const dist = parseFloat(inputs.distance);
      if (inputs.distance && (isNaN(dist) || dist < 0)) {
        setDistError("Distance cannot be negative.");
        setResult(null);
        return;
      }
      if (inputs.distance && dist === 0) {
        setDistError("Please enter a measurement greater than zero.");
        setResult(null);
        return;
      }
      setDistError(null);

      if (!inputs.scaleInput || !inputs.distance) {
        setResult(null);
        return;
      }

      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) =>
    setInputs((p) => ({ ...p, [key]: value }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setScaleError(null);
    setDistError(null);
    distanceRef.current?.focus();
  };

  const handleSwapMode = () => {
    setInputs((p) => ({
      ...p,
      mode: p.mode === "mapToReal" ? "realToMap" : "mapToReal",
    }));
  };

  const handlePreset = (value: string) => {
    setInputs((p) => ({ ...p, scaleInput: value }));
  };

  const handleCopy = () => {
    if (!result) return;
    const mode = inputs.mode === "mapToReal" ? "Map → Real Distance" : "Real → Map Distance";
    const text = `Scale: ${formatScale(result.scaleDenominator)}\nMode: ${mode}\nInput: ${formatNum(result.inputDistance, inputs.precision)} ${UNIT_SHORT[result.inputUnit]}\nResult: ${result.outputDistanceFormatted}`;
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
    downloadFile(exportToText(inputs, result), "map_scale_calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  const inputCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  const modeLabel = inputs.mode === "mapToReal" ? "Map → Real Distance" : "Real → Map Distance";
  const inputLabel = inputs.mode === "mapToReal" ? "Map Distance" : "Real-World Distance";
  const outputLabel = inputs.mode === "mapToReal" ? "Real-World Distance" : "Map Distance";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Map Scale Calculator</h3>
              <p className="text-sm text-blue-800">
                Convert map measurements to real-world distances using any scale ratio. Supports 1:1000, 1:50000, and all common survey scales. Works in both directions.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              {/* Conversion Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Mode</label>
                <div className="grid grid-cols-1 gap-2">
                  {(["mapToReal", "realToMap"] as ConversionMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => set("mode", m)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                        inputs.mode === m
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {m === "mapToReal" ? "Map → Real Distance" : "Real → Map Distance"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
                <select
                  value={inputs.outputUnit}
                  onChange={(e) => set("outputUnit", e.target.value as OutputUnit)}
                  className={selectCls}
                >
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Precision */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => set("precision", parseInt(e.target.value))}
                  className={selectCls}
                >
                  <option value={0}>0 decimal places</option>
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                {inputs.mode === "mapToReal" ? (
                  <div className="font-mono">Real = Map Distance × Scale</div>
                ) : (
                  <div className="font-mono">Map = Real Distance ÷ Scale</div>
                )}
                <div className="text-gray-500 mt-1">
                  e.g. 1:25000 means 1 cm = 250 m
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleSwapMode}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⇄ Swap Mode
                </button>
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
                  <button
                    onClick={handleExport}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export TXT
                  </button>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                {outputLabel}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? result.outputDistanceFormatted : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Scale:</span>
                    <span className="font-semibold">{formatScale(result.scaleDenominator)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Input:</span>
                    <span className="font-semibold">
                      {formatNum(result.inputDistance, inputs.precision)} {UNIT_SHORT[result.inputUnit]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Mode:</span>
                    <span className="font-semibold text-xs">{modeLabel}</span>
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

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Scale &amp; Distance
              </h3>

              {/* Scale Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Map Scale
                </label>
                <input
                  type="text"
                  value={inputs.scaleInput}
                  onChange={(e) => set("scaleInput", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`${inputCls} ${scaleError ? "border-red-300" : ""}`}
                  placeholder="e.g. 1:25000"
                  aria-label="Map scale"
                />
                {scaleError && <p className="text-xs text-red-600 mt-1">{scaleError}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: <span className="font-mono">1:25000</span>, <span className="font-mono">1/25000</span>, or <span className="font-mono">25000</span>
                </p>
              </div>

              {/* Distance Input + Unit */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {inputLabel}
                  </label>
                  <input
                    ref={distanceRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.distance}
                    onChange={(e) => set("distance", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={`${inputCls} ${distError ? "border-red-300" : ""}`}
                    placeholder="e.g. 4"
                    min="0"
                    step="any"
                    aria-label="Distance value"
                  />
                  {distError && <p className="text-xs text-red-600 mt-1">{distError}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={inputs.distanceUnit}
                    onChange={(e) => set("distanceUnit", e.target.value as DistanceUnit)}
                    className={selectCls}
                  >
                    {ALL_DISTANCE_UNITS.map((u) => (
                      <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>

              {/* Calculation breakdown */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Calculation:</strong> {result.formulaText}
                </div>
              )}
            </div>

            {/* Scale Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Survey Scales
              </h3>
              <div className="flex flex-wrap gap-2">
                {SCALE_PRESETS.map((p) => {
                  const active = inputs.scaleInput === p.value;
                  return (
                    <button
                      key={p.value}
                      onClick={() => handlePreset(p.value)}
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

            {/* Unit Conversion Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  {outputLabel} — All Units
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ALL_DISTANCE_UNITS.map((u) => {
                    const val = result.allUnits[u];
                    const isSelected = result.outputUnit === u;
                    return (
                      <div
                        key={u}
                        className={`p-3 rounded-lg border ${
                          isSelected
                            ? "bg-primary/5 border-primary/20"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          {UNIT_SHORT[u]}
                        </div>
                        <div
                          className={`font-bold text-base break-all ${
                            isSelected ? "text-primary" : "text-gray-900"
                          }`}
                        >
                          {formatNum(val, inputs.precision)}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{UNIT_LABELS[u].split(" (")[0]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scale Reference Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Scale Reference — 1 cm on Map
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scale</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Real Distance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {SCALE_PRESETS.map((p) => {
                        const scale = parseInt(p.value.replace("1:", ""));
                        const meters = 0.01 * scale; // 1 cm × scale
                        const isActive = result.scaleDenominator === scale;
                        let display: string;
                        if (meters >= 1000) display = `${formatNum(meters / 1000, 2)} km`;
                        else if (meters >= 1) display = `${formatNum(meters, 2)} m`;
                        else display = `${formatNum(meters * 100, 2)} cm`;
                        return (
                          <tr key={p.value} className={`hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-mono ${isActive ? "text-primary font-semibold" : "text-gray-700"}`}>
                              {p.label}
                            </td>
                            <td className={`py-2 px-3 font-mono font-semibold ${isActive ? "text-primary" : "text-gray-900"}`}>
                              {display}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
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
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {formatScale(entry.result.scaleDenominator)} · {formatNum(entry.result.inputDistance, 2)} {UNIT_SHORT[entry.result.inputUnit]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {entry.result.outputDistanceFormatted}
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

      <MapScaleCalculatorSEO />
      <RelatedTools
        currentTool="map-scale-calculator"
        tools={[
          "survey-area-calculator",
          "boundary-length-calculator",
          "land-area-calculator",
          "distance-between-points-calculator",
        ]}
      />
    </>
  );
}
