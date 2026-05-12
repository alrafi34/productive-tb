"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FrequencyUnit,
  InductanceUnit,
  CalculationInput,
  CalculationResult,
} from "./types";
import {
  calculateInductiveReactance,
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
import InductiveReactanceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function InductiveReactanceCalculatorUI() {
  const [frequency, setFrequency] = useState<string>("50");
  const [frequencyUnit, setFrequencyUnit] = useState<FrequencyUnit>("Hz");
  const [inductance, setInductance] = useState<string>("0.1");
  const [inductanceUnit, setInductanceUnit] = useState<InductanceUnit>("H");
  
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
    [frequency, frequencyUnit, inductance, inductanceUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [frequency, frequencyUnit, inductance, inductanceUnit, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const input: CalculationInput = {
      frequency: parseFloat(frequency) || 0,
      frequencyUnit,
      inductance: parseFloat(inductance) || 0,
      inductanceUnit,
    };

    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = calculateInductiveReactance(input);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleReset = () => {
    setFrequency("50");
    setFrequencyUnit("Hz");
    setInductance("0.1");
    setInductanceUnit("H");
    setResult(null);
    setError(null);
  };

  const handleLoadPreset = (preset: typeof COMMON_PRESETS[0]) => {
    setFrequency(preset.frequency.toString());
    setFrequencyUnit(preset.frequencyUnit);
    setInductance(preset.inductance.toString());
    setInductanceUnit(preset.inductanceUnit);
  };

  const handleCopy = () => {
    if (result) {
      const text = `${formatNumber(result.reactance)} Ω`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const input: CalculationInput = {
        frequency: parseFloat(frequency),
        frequencyUnit,
        inductance: parseFloat(inductance),
        inductanceUnit,
      };
      saveToHistory(input, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const input: CalculationInput = {
        frequency: parseFloat(frequency),
        frequencyUnit,
        inductance: parseFloat(inductance),
        inductanceUnit,
      };
      const text = exportToText(input, result);
      downloadFile(text, 'inductive_reactance_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setFrequency(entry.input.frequency.toString());
    setFrequencyUnit(entry.input.frequencyUnit);
    setInductance(entry.input.inductance.toString());
    setInductanceUnit(entry.input.inductanceUnit);
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
              <h3 className="font-semibold text-blue-900 mb-1">Inductive Reactance Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate inductive reactance (XL) using the formula XL = 2πfL. Get instant results with step-by-step explanations.
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
                    Inductive Reactance (XL)
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.reactance)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Ω (Ohms)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Frequency:</span>
                      <span className="font-semibold">{formatNumber(result.frequency)} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Inductance:</span>
                      <span className="font-semibold">{formatNumber(result.inductance)} H</span>
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
                Input Values
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency (f)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="50"
                      step="any"
                      min="0"
                    />
                    <select
                      value={frequencyUnit}
                      onChange={(e) => setFrequencyUnit(e.target.value as FrequencyUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="Hz">Hz (Hertz)</option>
                      <option value="kHz">kHz (Kilohertz)</option>
                      <option value="MHz">MHz (Megahertz)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inductance (L)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={inductance}
                      onChange={(e) => setInductance(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.1"
                      step="any"
                      min="0"
                    />
                    <select
                      value={inductanceUnit}
                      onChange={(e) => setInductanceUnit(e.target.value as InductanceUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="H">H (Henry)</option>
                      <option value="mH">mH (Millihenry)</option>
                      <option value="µH">µH (Microhenry)</option>
                      <option value="nH">nH (Nanohenry)</option>
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
                <strong>Note:</strong> Inductive reactance (XL) increases as frequency increases. 
                At DC (0 Hz), an inductor acts as a short circuit. At very high frequencies, 
                it acts as an open circuit. This calculator uses the formula XL = 2πfL.
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
                            {formatNumber(entry.result.reactance)} Ω
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          f = {entry.input.frequency} {entry.input.frequencyUnit}, 
                          L = {entry.input.inductance} {entry.input.inductanceUnit}
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

      <InductiveReactanceCalculatorSEO />
      <RelatedTools
        currentTool="inductive-reactance-calculator"
        tools={['capacitive-reactance-calculator', 'impedance-calculator', 'inductor-calculator']}
      />
    </>
  );
}
