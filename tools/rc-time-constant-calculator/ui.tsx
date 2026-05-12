"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ResistanceUnit,
  CapacitanceUnit,
  CalculationInput,
  CalculationResult,
} from "./types";
import {
  calculateTimeConstant,
  validateInput,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  COMMON_PRESETS,
} from "./logic";
import RCTimeConstantCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RCTimeConstantCalculatorUI() {
  const [resistance, setResistance] = useState<string>("10");
  const [resistanceUnit, setResistanceUnit] = useState<ResistanceUnit>("kΩ");
  const [capacitance, setCapacitance] = useState<string>("10");
  const [capacitanceUnit, setCapacitanceUnit] = useState<CapacitanceUnit>("µF");
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [resistance, resistanceUnit, capacitance, capacitanceUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [resistance, resistanceUnit, capacitance, capacitanceUnit, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const input: CalculationInput = {
      resistance: parseFloat(resistance) || 0,
      resistanceUnit,
      capacitance: parseFloat(capacitance) || 0,
      capacitanceUnit,
    };

    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = calculateTimeConstant(input);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleReset = () => {
    setResistance("10");
    setResistanceUnit("kΩ");
    setCapacitance("10");
    setCapacitanceUnit("µF");
    setResult(null);
    setError(null);
  };

  const handleLoadPreset = (preset: typeof COMMON_PRESETS[0]) => {
    setResistance(preset.resistance.toString());
    setResistanceUnit(preset.resistanceUnit);
    setCapacitance(preset.capacitance.toString());
    setCapacitanceUnit(preset.capacitanceUnit);
  };

  const handleCopy = () => {
    if (result) {
      const text = `τ = ${result.timeConstantFormatted.value} ${result.timeConstantFormatted.unit}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const input: CalculationInput = {
        resistance: parseFloat(resistance),
        resistanceUnit,
        capacitance: parseFloat(capacitance),
        capacitanceUnit,
      };
      saveToHistory(input, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const input: CalculationInput = {
        resistance: parseFloat(resistance),
        resistanceUnit,
        capacitance: parseFloat(capacitance),
        capacitanceUnit,
      };
      const text = exportToText(input, result);
      downloadFile(text, 'rc_time_constant_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setResistance(entry.input.resistance.toString());
    setResistanceUnit(entry.input.resistanceUnit);
    setCapacitance(entry.input.capacitance.toString());
    setCapacitanceUnit(entry.input.capacitanceUnit);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">RC Time Constant Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the time constant (τ = RC) of resistor-capacitor circuits. Get instant results with charging/discharging time analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
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
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
            </div>

            {/* Result Display */}
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Time Constant (τ)
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {result.timeConstantFormatted.value}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.timeConstantFormatted.unit}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-3">
                  {result.conversions.slice(0, 3).map((conv, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-primary-100">{conv.unit}:</span>
                      <span className="font-semibold">{conv.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Values
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resistance (R)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={resistance}
                      onChange={(e) => setResistance(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      step="any"
                      min="0"
                    />
                    <select
                      value={resistanceUnit}
                      onChange={(e) => setResistanceUnit(e.target.value as ResistanceUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="Ω">Ω (Ohm)</option>
                      <option value="kΩ">kΩ (Kilo-ohm)</option>
                      <option value="MΩ">MΩ (Mega-ohm)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacitance (C)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={capacitance}
                      onChange={(e) => setCapacitance(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      step="any"
                      min="0"
                    />
                    <select
                      value={capacitanceUnit}
                      onChange={(e) => setCapacitanceUnit(e.target.value as CapacitanceUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="F">F (Farad)</option>
                      <option value="mF">mF (Millifarad)</option>
                      <option value="µF">µF (Microfarad)</option>
                      <option value="nF">nF (Nanofarad)</option>
                      <option value="pF">pF (Picofarad)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Common Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COMMON_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLoadPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left text-sm"
                  >
                    <div className="font-semibold text-gray-900">{preset.label}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      R={preset.resistance}{preset.resistanceUnit}, C={preset.capacitance}{preset.capacitanceUnit}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Formula & Steps Display */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Formula & Steps
                </h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-center text-lg font-mono font-semibold text-blue-900">
                    {result.formula}
                  </p>
                  <p className="text-center text-xs text-blue-700 mt-2">
                    Time Constant = Resistance × Capacitance
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Calculation Steps:</p>
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="font-semibold text-primary">{idx + 1}.</span>
                      <span className="font-mono">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Charging/Discharging Times */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Charging/Discharging Times
                </h3>
                
                <p className="text-sm text-gray-600">
                  Time to reach specific charge percentages:
                </p>

                <div className="space-y-2">
                  {result.chargePercentages.map((cp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-primary">{cp.percentage}%</div>
                        <div className="text-sm text-gray-600">({cp.timeConstants})</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {cp.timeFormatted.value} {cp.timeFormatted.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export Button */}
            {result && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Calculation
              </button>
            )}

            {/* Info Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> The time constant (τ) represents the time for a capacitor to charge 
                to 63.2% of the supply voltage in an RC circuit. After 5τ, the capacitor is considered 
                fully charged at 99.3%. For discharging, τ represents the time to discharge to 36.8% 
                of the initial voltage.
              </p>
            </div>

            {/* History Panel */}
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
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No calculations saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            τ = {entry.result.timeConstantFormatted.value} {entry.result.timeConstantFormatted.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          R = {entry.input.resistance} {entry.input.resistanceUnit}, 
                          C = {entry.input.capacitance} {entry.input.capacitanceUnit}
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

      <RCTimeConstantCalculatorSEO />
      <RelatedTools
        currentTool="rc-time-constant-calculator"
        tools={['capacitor-charge-time-calculator', 'capacitor-calculator', 'impedance-calculator']}
      />
    </>
  );
}
