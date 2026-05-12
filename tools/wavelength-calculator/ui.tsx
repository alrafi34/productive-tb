"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FrequencyUnit,
  MediumType,
  CalculationInput,
  CalculationResult,
} from "./types";
import {
  calculateWavelength,
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
import WavelengthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WavelengthCalculatorUI() {
  const [frequency, setFrequency] = useState<string>("100");
  const [frequencyUnit, setFrequencyUnit] = useState<FrequencyUnit>("MHz");
  const [medium, setMedium] = useState<MediumType>("air");
  const [customSpeed, setCustomSpeed] = useState<string>("299792458");
  
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
    [frequency, frequencyUnit, medium, customSpeed]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [frequency, frequencyUnit, medium, customSpeed, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const input: CalculationInput = {
      frequency: parseFloat(frequency) || 0,
      frequencyUnit,
      medium,
      customSpeed: medium === "custom" ? parseFloat(customSpeed) || 0 : undefined,
    };

    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = calculateWavelength(input);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleReset = () => {
    setFrequency("100");
    setFrequencyUnit("MHz");
    setMedium("air");
    setCustomSpeed("299792458");
    setResult(null);
    setError(null);
  };

  const handleLoadPreset = (preset: typeof COMMON_PRESETS[0]) => {
    setFrequency(preset.frequency.toString());
    setFrequencyUnit(preset.frequencyUnit);
    setMedium(preset.medium);
  };

  const handleCopy = () => {
    if (result) {
      const text = `λ = ${result.wavelengthFormatted.value} ${result.wavelengthFormatted.unit}`;
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
        medium,
        customSpeed: medium === "custom" ? parseFloat(customSpeed) : undefined,
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
        medium,
        customSpeed: medium === "custom" ? parseFloat(customSpeed) : undefined,
      };
      const text = exportToText(input, result);
      downloadFile(text, 'wavelength_calculation.txt');
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
    setMedium(entry.input.medium);
    if (entry.input.customSpeed) {
      setCustomSpeed(entry.input.customSpeed.toString());
    }
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Wavelength Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate wavelength from frequency using λ = v/f. Get instant results for electromagnetic waves, RF signals, and more.
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
                    Wavelength (λ)
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {result.wavelengthFormatted.value}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.wavelengthFormatted.unit}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-3">
                  {result.conversions.filter(c => parseFloat(c.value) > 0 && parseFloat(c.value) < 1e6).slice(0, 3).map((conv, idx) => (
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
                    Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
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
                      <option value="GHz">GHz (Gigahertz)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Propagation Medium
                  </label>
                  <select
                    value={medium}
                    onChange={(e) => setMedium(e.target.value as MediumType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="vacuum">Vacuum (299,792,458 m/s)</option>
                    <option value="air">Air (299,702,547 m/s)</option>
                    <option value="water">Water (~225,000,000 m/s)</option>
                    <option value="copper">Copper (~200,000,000 m/s)</option>
                    <option value="custom">Custom Speed</option>
                  </select>
                </div>

                {medium === "custom" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Wave Speed (m/s)
                    </label>
                    <input
                      type="number"
                      value={customSpeed}
                      onChange={(e) => setCustomSpeed(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="299792458"
                      step="any"
                      min="0"
                    />
                  </div>
                )}
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
                Common Frequencies
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
                      {preset.frequency} {preset.frequencyUnit} • {preset.description}
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
                    Wavelength = Wave Speed / Frequency
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

            {/* Wavelength Conversions */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Wavelength Conversions
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {result.conversions.map((conv, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{conv.unit}</div>
                      <div className="text-lg font-bold text-gray-900 break-all">{conv.value}</div>
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
                <strong>Note:</strong> Wavelength (λ) is the distance between successive crests of a wave. 
                It's inversely proportional to frequency: higher frequencies have shorter wavelengths. 
                The speed of electromagnetic waves varies by medium, with the fastest being in vacuum 
                (speed of light, c ≈ 3×10⁸ m/s).
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
                            λ = {entry.result.wavelengthFormatted.value} {entry.result.wavelengthFormatted.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          f = {entry.input.frequency} {entry.input.frequencyUnit} • {entry.input.medium}
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

      <WavelengthCalculatorSEO />
      <RelatedTools
        currentTool="wavelength-calculator"
        tools={['frequency-calculator', 'rlc-resonance-calculator', 'impedance-calculator']}
      />
    </>
  );
}
