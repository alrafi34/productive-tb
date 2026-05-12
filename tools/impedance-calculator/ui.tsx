"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ResistanceUnit,
  CalculationInput,
  CalculationResult,
} from "./types";
import {
  calculateImpedance,
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
import ImpedanceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ImpedanceCalculatorUI() {
  const [resistance, setResistance] = useState<string>("10");
  const [resistanceUnit, setResistanceUnit] = useState<ResistanceUnit>("Ω");
  const [inductiveReactance, setInductiveReactance] = useState<string>("5");
  const [inductiveReactanceUnit, setInductiveReactanceUnit] = useState<ResistanceUnit>("Ω");
  const [capacitiveReactance, setCapacitiveReactance] = useState<string>("0");
  const [capacitiveReactanceUnit, setCapacitiveReactanceUnit] = useState<ResistanceUnit>("Ω");
  
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
    [resistance, resistanceUnit, inductiveReactance, inductiveReactanceUnit, capacitiveReactance, capacitiveReactanceUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [resistance, resistanceUnit, inductiveReactance, inductiveReactanceUnit, capacitiveReactance, capacitiveReactanceUnit, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const input: CalculationInput = {
      resistance: parseFloat(resistance) || 0,
      resistanceUnit,
      inductiveReactance: parseFloat(inductiveReactance) || 0,
      inductiveReactanceUnit,
      capacitiveReactance: parseFloat(capacitiveReactance) || 0,
      capacitiveReactanceUnit,
    };

    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = calculateImpedance(input);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleReset = () => {
    setResistance("10");
    setResistanceUnit("Ω");
    setInductiveReactance("5");
    setInductiveReactanceUnit("Ω");
    setCapacitiveReactance("0");
    setCapacitiveReactanceUnit("Ω");
    setResult(null);
    setError(null);
  };

  const handleLoadPreset = (preset: typeof COMMON_PRESETS[0]) => {
    setResistance(preset.resistance.toString());
    setResistanceUnit(preset.resistanceUnit);
    setInductiveReactance(preset.inductiveReactance.toString());
    setInductiveReactanceUnit(preset.inductiveReactanceUnit);
    setCapacitiveReactance(preset.capacitiveReactance.toString());
    setCapacitiveReactanceUnit(preset.capacitiveReactanceUnit);
  };

  const handleCopy = () => {
    if (result) {
      const text = `${formatNumber(result.impedance)} Ω`;
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
        inductiveReactance: parseFloat(inductiveReactance),
        inductiveReactanceUnit,
        capacitiveReactance: parseFloat(capacitiveReactance),
        capacitiveReactanceUnit,
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
        inductiveReactance: parseFloat(inductiveReactance),
        inductiveReactanceUnit,
        capacitiveReactance: parseFloat(capacitiveReactance),
        capacitiveReactanceUnit,
      };
      const text = exportToText(input, result);
      downloadFile(text, 'impedance_calculation.txt');
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
    setInductiveReactance(entry.input.inductiveReactance.toString());
    setInductiveReactanceUnit(entry.input.inductiveReactanceUnit);
    setCapacitiveReactance(entry.input.capacitiveReactance.toString());
    setCapacitiveReactanceUnit(entry.input.capacitiveReactanceUnit);
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
              <h3 className="font-semibold text-blue-900 mb-1">Impedance Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate impedance (Z) in AC circuits using resistance, inductive reactance, and capacitive reactance. Get instant results with step-by-step explanations.
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
                    Impedance (Z)
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.impedance)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Ω (Ohms)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Net Reactance (X):</span>
                      <span className="font-semibold">{formatNumber(result.netReactance)} Ω</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Phase Angle (θ):</span>
                      <span className="font-semibold">{formatNumber(result.phaseAngle, 2)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Circuit Type:</span>
                      <span className="font-semibold">{result.circuitType}</span>
                    </div>
                  </div>
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
                Circuit Parameters
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
                    Inductive Reactance (XL)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={inductiveReactance}
                      onChange={(e) => setInductiveReactance(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      step="any"
                      min="0"
                    />
                    <select
                      value={inductiveReactanceUnit}
                      onChange={(e) => setInductiveReactanceUnit(e.target.value as ResistanceUnit)}
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
                    Capacitive Reactance (XC)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={capacitiveReactance}
                      onChange={(e) => setCapacitiveReactance(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0"
                      step="any"
                      min="0"
                    />
                    <select
                      value={capacitiveReactanceUnit}
                      onChange={(e) => setCapacitiveReactanceUnit(e.target.value as ResistanceUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="Ω">Ω (Ohm)</option>
                      <option value="kΩ">kΩ (Kilo-ohm)</option>
                      <option value="MΩ">MΩ (Mega-ohm)</option>
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
                Common Circuit Examples
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COMMON_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLoadPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left text-sm"
                  >
                    <div className="font-semibold text-gray-900">{preset.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Formula & Steps Display */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Formula & Calculation Steps
                </h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-center text-lg font-mono font-semibold text-blue-900">
                    {result.formula}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className={step === '' ? 'h-2' : 'text-gray-700'}>
                      {step}
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
                <strong>Note:</strong> Impedance (Z) represents the total opposition to current in an AC circuit. 
                When XL = XC, the circuit is at resonance and impedance equals resistance. 
                If XL &gt; XC, the circuit is inductive; if XC &gt; XL, it&apos;s capacitive.
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
                            Z = {formatNumber(entry.result.impedance)} Ω
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          R = {entry.input.resistance} {entry.input.resistanceUnit}, 
                          XL = {entry.input.inductiveReactance} {entry.input.inductiveReactanceUnit}, 
                          XC = {entry.input.capacitiveReactance} {entry.input.capacitiveReactanceUnit}
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

      <ImpedanceCalculatorSEO />
      <RelatedTools
        currentTool="impedance-calculator"
        tools={['inductive-reactance-calculator', 'capacitive-reactance-calculator', 'phase-angle-calculator']}
      />
    </>
  );
}
