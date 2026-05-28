"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GearInputs, GearResult, CompareEntry, HistoryEntry } from "./types";
import {
  calculate,
  validateTeeth,
  validateRPM,
  validateTorque,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
} from "./logic";
import GearRatioCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS = [
  { label: "Bicycle (Low)", driverTeeth: "22", drivenTeeth: "34", inputRPM: "80" },
  { label: "Bicycle (High)", driverTeeth: "50", drivenTeeth: "11", inputRPM: "80" },
  { label: "Automotive 1st", driverTeeth: "12", drivenTeeth: "40", inputRPM: "1500" },
  { label: "Robotics 1:1", driverTeeth: "20", drivenTeeth: "20", inputRPM: "300" },
  { label: "Overdrive", driverTeeth: "40", drivenTeeth: "20", inputRPM: "3000" },
  { label: "Industrial", driverTeeth: "15", drivenTeeth: "60", inputRPM: "1000" },
];

const DEFAULT_INPUTS: GearInputs = {
  driverTeeth: "20",
  drivenTeeth: "40",
  inputRPM: "1000",
  inputTorque: "50",
  torqueUnit: "Nm",
  rpmUnit: "rpm",
};

const DEFAULT_COMPARE: CompareEntry[] = [
  { label: "Setup A", driverTeeth: "", drivenTeeth: "", inputRPM: "" },
  { label: "Setup B", driverTeeth: "", drivenTeeth: "", inputRPM: "" },
];

export default function GearRatioCalculatorUI() {
  const [inputs, setInputs] = useState<GearInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<GearResult | null>(null);
  const [driverErr, setDriverErr] = useState<string | null>(null);
  const [drivenErr, setDrivenErr] = useState<string | null>(null);
  const [rpmErr, setRpmErr] = useState<string | null>(null);
  const [torqueErr, setTorqueErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showEdu, setShowEdu] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [compareEntries, setCompareEntries] = useState<CompareEntry[]>(DEFAULT_COMPARE);
  const driverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    driverRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const de = validateTeeth(inputs.driverTeeth, "Driver gear teeth");
      const dne = validateTeeth(inputs.drivenTeeth, "Driven gear teeth");
      const re = validateRPM(inputs.inputRPM);
      const te = validateTorque(inputs.inputTorque);
      setDriverErr(de);
      setDrivenErr(dne);
      setRpmErr(re);
      setTorqueErr(te);
      if (de || dne || re || te) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, driverTeeth: p.driverTeeth, drivenTeeth: p.drivenTeeth, inputRPM: p.inputRPM }));
  };

  const handleSwap = () => {
    setInputs((prev) => ({ ...prev, driverTeeth: prev.drivenTeeth, drivenTeeth: prev.driverTeeth }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setDriverErr(null);
    setDrivenErr(null);
    setRpmErr(null);
    setTorqueErr(null);
    driverRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Gear Ratio: ${result.simplifiedRatio} | Driver: ${inputs.driverTeeth} teeth | Driven: ${inputs.drivenTeeth} teeth${result.outputRPM !== null ? ` | Output RPM: ${formatNum(result.outputRPM, 2)}` : ""}${result.outputTorque !== null ? ` | Output Torque: ${formatNum(result.outputTorque, 2)} ${inputs.torqueUnit}` : ""}`;
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
    downloadFile(exportToText(inputs, result), "gear_ratio_calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const modeColor = result?.mode === "torque-increase"
    ? "text-blue-700 bg-blue-50 border-blue-200"
    : result?.mode === "speed-increase"
    ? "text-orange-700 bg-orange-50 border-orange-200"
    : "text-gray-700 bg-gray-50 border-gray-200";

  const modeLabel = result?.mode === "torque-increase"
    ? "⬇ Torque Increase Mode"
    : result?.mode === "speed-increase"
    ? "⬆ Speed Increase Mode"
    : "↔ Direct Drive (1:1)";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Gear Ratio Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter driver and driven gear teeth to instantly calculate gear ratio, output RPM, and torque multiplication. Works for automotive, bicycle, robotics, and industrial systems.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                Gear Ratio
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result ? result.simplifiedRatio : "—"}
              </div>
              {result && (
                <div className="text-sm text-primary-100 mb-3">
                  {formatNum(result.decimalRatio, 4)} decimal
                </div>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Torque ×</span>
                    <span className="font-semibold">{formatNum(result.torqueMultiplier, 2)}×</span>
                  </div>
                  {result.outputRPM !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Output RPM</span>
                      <span className="font-semibold">{formatNum(result.outputRPM, 1)} rpm</span>
                    </div>
                  )}
                  {result.outputRadS !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Output rad/s</span>
                      <span className="font-semibold">{formatNum(result.outputRadS, 3)}</span>
                    </div>
                  )}
                  {result.outputTorque !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Output Torque</span>
                      <span className="font-semibold">{formatNum(result.outputTorque, 2)} {inputs.torqueUnit}</span>
                    </div>
                  )}
                </div>
              )}

              {result && (
                <div className={`text-xs font-semibold px-2 py-1 rounded-md border mb-4 ${modeColor}`}>
                  {modeLabel}
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

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Actions</h3>
              <button
                onClick={handleSwap}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                🔄 Swap Gears
              </button>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowCompare(!showCompare)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ⚖️ {showCompare ? "Hide" : "Show"} Compare
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              <button
                onClick={() => setShowEdu(!showEdu)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📖 {showEdu ? "Hide" : "Show"} Formula
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

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Gear Teeth</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driving Gear Teeth
                    <span className="ml-1 text-xs text-gray-400" title="The gear connected to the power source">ⓘ</span>
                  </label>
                  <input
                    ref={driverRef}
                    type="number"
                    inputMode="numeric"
                    value={inputs.driverTeeth}
                    onChange={(e) => setInputs((p) => ({ ...p, driverTeeth: e.target.value }))}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${driverErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="20"
                    min="1"
                    step="1"
                    aria-label="Driver gear teeth"
                  />
                  {driverErr && <p className="text-xs text-red-600 mt-1">{driverErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driven Gear Teeth
                    <span className="ml-1 text-xs text-gray-400" title="The gear receiving power from the driver">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={inputs.drivenTeeth}
                    onChange={(e) => setInputs((p) => ({ ...p, drivenTeeth: e.target.value }))}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${drivenErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="40"
                    min="1"
                    step="1"
                    aria-label="Driven gear teeth"
                  />
                  {drivenErr && <p className="text-xs text-red-600 mt-1">{drivenErr}</p>}
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {inputs.drivenTeeth} ÷ {inputs.driverTeeth} = <strong>{formatNum(result.decimalRatio, 4)}</strong> → Ratio <strong>{result.simplifiedRatio}</strong>
                </div>
              )}

              <h3 className="font-semibold text-gray-800 pt-1">
                Optional Inputs
                <span className="ml-2 text-xs font-normal text-gray-400">Used for RPM and torque output</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Input Speed</label>
                  <div className={`flex rounded-lg border-2 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${rpmErr ? "border-red-300" : "border-gray-200"}`}>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.inputRPM}
                      onChange={(e) => setInputs((p) => ({ ...p, inputRPM: e.target.value }))}
                      className="w-0 flex-1 px-4 py-3 font-mono text-sm bg-white outline-none"
                      placeholder="1000"
                      min="0"
                      step="any"
                      aria-label="Input speed"
                    />
                    <select
                      value={inputs.rpmUnit}
                      onChange={(e) => setInputs((p) => ({ ...p, rpmUnit: e.target.value as GearInputs["rpmUnit"] }))}
                      className="w-20 shrink-0 px-2 py-3 bg-gray-50 border-l border-gray-200 text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <option value="rpm">rpm</option>
                      <option value="rad/s">rad/s</option>
                    </select>
                  </div>
                  {rpmErr && <p className="text-xs text-red-600 mt-1">{rpmErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Input Torque</label>
                  <div className={`flex rounded-lg border-2 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${torqueErr ? "border-red-300" : "border-gray-200"}`}>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.inputTorque}
                      onChange={(e) => setInputs((p) => ({ ...p, inputTorque: e.target.value }))}
                      className="w-0 flex-1 px-4 py-3 font-mono text-sm bg-white outline-none"
                      placeholder="50"
                      min="0"
                      step="any"
                      aria-label="Input torque"
                    />
                    <select
                      value={inputs.torqueUnit}
                      onChange={(e) => setInputs((p) => ({ ...p, torqueUnit: e.target.value as GearInputs["torqueUnit"] }))}
                      className="w-20 shrink-0 px-2 py-3 bg-gray-50 border-l border-gray-200 text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <option value="Nm">Nm</option>
                      <option value="lb-ft">lb-ft</option>
                      <option value="lb-in">lb-in</option>
                    </select>
                  </div>
                  {torqueErr && <p className="text-xs text-red-600 mt-1">{torqueErr}</p>}
                </div>
              </div>

              {result?.explanation && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  💡 {result.explanation}
                </div>
              )}
            </div>

            {/* Gear Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Gear Visualization</h3>
                <GearDiagram
                  driverTeeth={parseInt(inputs.driverTeeth) || 20}
                  drivenTeeth={parseInt(inputs.drivenTeeth) || 40}
                  gearRatio={result.gearRatio}
                />
              </div>
            )}

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = inputs.driverTeeth === p.driverTeeth && inputs.drivenTeeth === p.drivenTeeth;
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
                <h3 className="font-semibold text-gray-800 mb-4">Results Summary</h3>
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
                        <td className="py-2 px-3 font-medium text-primary">Gear Ratio</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{result.simplifiedRatio}</td>
                        <td className="py-2 px-3 text-gray-500">{formatNum(result.decimalRatio, 4)} decimal</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Torque Multiplier</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.torqueMultiplier, 2)}×</td>
                        <td className="py-2 px-3 text-gray-500">Output torque factor</td>
                      </tr>
                      {result.outputRPM !== null && (
                        <tr>
                          <td className="py-2 px-3 font-medium text-gray-700">Output Speed</td>
                          <td className="py-2 px-3 font-mono">{formatNum(result.outputRPM, 2)} rpm</td>
                          <td className="py-2 px-3 text-gray-500">{result.outputRadS !== null ? `${formatNum(result.outputRadS, 3)} rad/s` : ""}</td>
                        </tr>
                      )}
                      {result.outputTorque !== null && (
                        <tr>
                          <td className="py-2 px-3 font-medium text-gray-700">Output Torque</td>
                          <td className="py-2 px-3 font-mono">{formatNum(result.outputTorque, 2)} {inputs.torqueUnit}</td>
                          <td className="py-2 px-3 text-gray-500">From {inputs.inputTorque} {inputs.torqueUnit} input</td>
                        </tr>
                      )}
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Driver Teeth</td>
                        <td className="py-2 px-3 font-mono">{inputs.driverTeeth}</td>
                        <td className="py-2 px-3 text-gray-500">Input / driving gear</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Driven Teeth</td>
                        <td className="py-2 px-3 font-mono">{inputs.drivenTeeth}</td>
                        <td className="py-2 px-3 text-gray-500">Output / driven gear</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Educational Mode */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Gear Ratio = Driven Teeth ÷ Driver Teeth
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Output RPM = Input RPM ÷ Gear Ratio
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Output Torque = Input Torque × Gear Ratio
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">Ratio &gt; 1</div>
                      <div className="text-blue-700 text-xs">Torque increase, speed decrease. Driven gear is larger.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">Ratio &lt; 1</div>
                      <div className="text-orange-700 text-xs">Speed increase, torque decrease. Driven gear is smaller.</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
                      <div className="font-semibold text-gray-800 text-xs uppercase mb-1">Ratio = 1</div>
                      <div className="text-gray-700 text-xs">Equal speed and torque. Direct drive configuration.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Compare Mode */}
            {showCompare && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Compare Two Gear Setups</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {compareEntries.map((entry, idx) => {
                    const cDriver = parseInt(entry.driverTeeth) || 0;
                    const cDriven = parseInt(entry.drivenTeeth) || 0;
                    const cRatio = cDriver > 0 && cDriven > 0 ? cDriven / cDriver : null;
                    const cRPM = cRatio && entry.inputRPM ? parseFloat(entry.inputRPM) / cRatio : null;
                    return (
                      <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                        <div className="font-semibold text-gray-700 text-sm">{entry.label}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            inputMode="numeric"
                            value={entry.driverTeeth}
                            onChange={(e) => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], driverTeeth: e.target.value };
                              setCompareEntries(updated);
                            }}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Driver teeth"
                          />
                          <input
                            type="number"
                            inputMode="numeric"
                            value={entry.drivenTeeth}
                            onChange={(e) => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], drivenTeeth: e.target.value };
                              setCompareEntries(updated);
                            }}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Driven teeth"
                          />
                          <input
                            type="number"
                            inputMode="decimal"
                            value={entry.inputRPM}
                            onChange={(e) => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], inputRPM: e.target.value };
                              setCompareEntries(updated);
                            }}
                            className="col-span-2 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Input RPM (optional)"
                          />
                        </div>
                        <div className={`text-center py-2 rounded-lg font-mono font-bold text-lg ${cRatio ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          {cRatio ? `${formatNum(cRatio, 2)}:1` : "—"}
                        </div>
                        {cRPM !== null && (
                          <div className="text-center text-xs text-gray-600">
                            Output: {formatNum(cRPM, 1)} rpm
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {(() => {
                  const a = compareEntries[0];
                  const b = compareEntries[1];
                  const rA = parseInt(a.driverTeeth) > 0 && parseInt(a.drivenTeeth) > 0 ? parseInt(a.drivenTeeth) / parseInt(a.driverTeeth) : null;
                  const rB = parseInt(b.driverTeeth) > 0 && parseInt(b.drivenTeeth) > 0 ? parseInt(b.drivenTeeth) / parseInt(b.driverTeeth) : null;
                  if (!rA || !rB) return null;
                  const higher = rA > rB ? "Setup A" : rA < rB ? "Setup B" : null;
                  return (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                      {higher
                        ? <><strong>{higher}</strong> has a higher gear ratio ({formatNum(Math.max(rA, rB), 2)}:1) — more torque, less speed.</>
                        : <>Both setups have equal gear ratios ({formatNum(rA, 2)}:1).</>
                      }
                    </div>
                  );
                })()}
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
                            {entry.inputs.driverTeeth}T → {entry.inputs.drivenTeeth}T
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Ratio: {entry.result.simplifiedRatio}
                          {entry.result.outputRPM !== null && ` | ${formatNum(entry.result.outputRPM, 1)} rpm out`}
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

      <GearRatioCalculatorSEO />
      <RelatedTools
        currentTool="gear-ratio-calculator"
        tools={[
          "torque-calculator",
          "angular-velocity-calculator",
          "force-calculator",
          "velocity-calculator",
          "kinetic-energy-calculator",
          "spring-force-calculator",
        ]}
      />
    </>
  );
}

// ── Gear Visualization Component ──────────────────────────────────────────────
function GearDiagram({
  driverTeeth,
  drivenTeeth,
  gearRatio,
}: {
  driverTeeth: number;
  drivenTeeth: number;
  gearRatio: number;
}) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        setAngle((prev) => (prev + delta * 0.06) % 360);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const maxTeeth = Math.max(driverTeeth, drivenTeeth);
  const driverR = Math.max(28, Math.min(60, (driverTeeth / maxTeeth) * 60));
  const drivenR = Math.max(28, Math.min(60, (drivenTeeth / maxTeeth) * 60));
  const gap = 8;
  const cx1 = 90;
  const cx2 = cx1 + driverR + drivenR + gap;
  const cy = 80;
  const svgW = cx2 + drivenR + 20;
  const svgH = cy + Math.max(driverR, drivenR) + 20;

  const driverAngle = angle;
  const drivenAngle = -(angle * driverTeeth) / drivenTeeth;

  function gearPath(cx: number, cy: number, r: number, teeth: number, rot: number): string {
    const toothH = r * 0.22;
    const toothW = (2 * Math.PI * r) / teeth * 0.35;
    const pts: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a = (rot * Math.PI) / 180 + (i / teeth) * 2 * Math.PI;
      const a1 = a - toothW / r / 2;
      const a2 = a + toothW / r / 2;
      pts.push(`${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)}`);
      pts.push(`${cx + (r + toothH) * Math.cos(a)},${cy + (r + toothH) * Math.sin(a)}`);
      pts.push(`${cx + r * Math.cos(a2)},${cy + r * Math.sin(a2)}`);
    }
    return `M ${pts.join(" L ")} Z`;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full max-w-xs"
        aria-label="Animated gear diagram"
        role="img"
      >
        {/* Driver gear */}
        <circle cx={cx1} cy={cy} r={driverR} fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <path d={gearPath(cx1, cy, driverR, driverTeeth, driverAngle)} fill="#0284c7" opacity="0.7" />
        <circle cx={cx1} cy={cy} r={driverR * 0.18} fill="#0284c7" />
        <text x={cx1} y={cy + driverR + 14} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">
          Driver ({driverTeeth}T)
        </text>

        {/* Driven gear */}
        <circle cx={cx2} cy={cy} r={drivenR} fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <path d={gearPath(cx2, cy, drivenR, drivenTeeth, drivenAngle)} fill="#d97706" opacity="0.7" />
        <circle cx={cx2} cy={cy} r={drivenR * 0.18} fill="#d97706" />
        <text x={cx2} y={cy + drivenR + 14} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">
          Driven ({drivenTeeth}T)
        </text>

        {/* Ratio label */}
        <text x={svgW / 2} y={16} textAnchor="middle" fontSize="11" fill="#6b7280">
          {gearRatio.toFixed(2)}:1
        </text>
      </svg>
      <p className="text-xs text-gray-500 text-center">
        {gearRatio > 1
          ? `Driven gear rotates ${formatNum(1 / gearRatio * 100, 0)}% as fast as driver`
          : gearRatio < 1
          ? `Driven gear rotates ${formatNum((1 / gearRatio) * 100, 0)}% faster than driver`
          : "Both gears rotate at the same speed"}
      </p>
    </div>
  );
}
