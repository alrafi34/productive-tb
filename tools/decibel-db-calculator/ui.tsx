"use client";

import { useState, useEffect, useCallback } from "react";
import { DecibelInputs, DecibelResult, CalculationMode } from "./types";
import {
  calculateDecibel,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  saveMode,
  loadMode
} from "./logic";
import DecibelCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DecibelCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>(() => loadMode());
  const [inputs, setInputs] = useState<DecibelInputs>({
    mode: mode,
    value: mode === 'power_to_db' || mode === 'voltage_to_db' ? 10 : 10
  });
  
  const [result, setResult] = useState<DecibelResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [precision, setPrecision] = useState(4);

  const presets = getPresets(mode);

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = calculateDecibel(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    saveMode(newMode);
    
    // Reset value based on mode
    const defaultValue = newMode === 'power_to_db' || newMode === 'voltage_to_db' ? 10 : 10;
    setInputs({ mode: newMode, value: defaultValue });
    setResult(null);
    setError(null);
  };

  const handleInputChange = (value: number) => {
    setInputs(prev => ({ ...prev, value }));
  };

  const handleReset = () => {
    const defaultValue = mode === 'power_to_db' || mode === 'voltage_to_db' ? 10 : 10;
    setInputs({ mode, value: defaultValue });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: { value: number }) => {
    setInputs({ mode, value: preset.value });
  };

  const handleCopy = () => {
    if (result) {
      const text = `${formatNumber(result.outputValue, precision)} ${getOutputUnit()}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(inputs, result);
      downloadFile(text, 'decibel_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setMode(entry.inputs.mode);
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getInputLabel = (): string => {
    const labels = {
      power_to_db: 'Power Ratio (P₂/P₁)',
      voltage_to_db: 'Voltage/Current Ratio (V₂/V₁)',
      db_to_power: 'Decibels (dB)',
      db_to_voltage: 'Decibels (dB)'
    };
    return labels[mode];
  };

  const getOutputLabel = (): string => {
    const labels = {
      power_to_db: 'Decibels',
      voltage_to_db: 'Decibels',
      db_to_power: 'Power Ratio',
      db_to_voltage: 'Voltage/Current Ratio'
    };
    return labels[mode];
  };

  const getOutputUnit = (): string => {
    return mode === 'power_to_db' || mode === 'voltage_to_db' ? 'dB' : '';
  };

  const getInputPlaceholder = (): string => {
    return mode === 'power_to_db' || mode === 'voltage_to_db' ? '10' : '10';
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Decibel (dB) Calculator</h3>
              <p className="text-sm text-blue-800">
                Convert gain or loss ratios to decibels (dB) and vice versa. Supports both power-based and amplitude-based calculations for electronics, audio, and RF engineering.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Result Display */}
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    {getOutputLabel()}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.outputValue, precision)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getOutputUnit() || 'Ratio'}
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

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Precision</h3>
              
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrecision(p)}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                      precision === p
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                {result && (
                  <button
                    onClick={handleExportText}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export Report
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleModeChange('power_to_db')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'power_to_db'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Power Ratio → dB</div>
                  <div className={`text-xs mt-1 ${mode === 'power_to_db' ? 'text-primary-100' : 'text-gray-500'}`}>
                    10 × log₁₀(P₂/P₁)
                  </div>
                </button>
                <button
                  onClick={() => handleModeChange('voltage_to_db')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'voltage_to_db'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Voltage/Current → dB</div>
                  <div className={`text-xs mt-1 ${mode === 'voltage_to_db' ? 'text-primary-100' : 'text-gray-500'}`}>
                    20 × log₁₀(V₂/V₁)
                  </div>
                </button>
                <button
                  onClick={() => handleModeChange('db_to_power')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'db_to_power'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">dB → Power Ratio</div>
                  <div className={`text-xs mt-1 ${mode === 'db_to_power' ? 'text-primary-100' : 'text-gray-500'}`}>
                    10^(dB/10)
                  </div>
                </button>
                <button
                  onClick={() => handleModeChange('db_to_voltage')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'db_to_voltage'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">dB → Voltage/Current</div>
                  <div className={`text-xs mt-1 ${mode === 'db_to_voltage' ? 'text-primary-100' : 'text-gray-500'}`}>
                    10^(dB/20)
                  </div>
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Value
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getInputLabel()}
                </label>
                <input
                  type="number"
                  value={inputs.value}
                  onChange={(e) => handleInputChange(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder={getInputPlaceholder()}
                  step="0.01"
                />
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {result.formula}
                  </div>
                </div>
              )}
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

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {result.steps.map((step, index) => (
                    <div key={index} className={step === '' ? 'h-2' : 'text-gray-700'}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reference Guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Reference
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-900 mb-2">Common dB Values</div>
                  <div className="space-y-1 text-blue-800">
                    <div>+3 dB ≈ 2× power</div>
                    <div>+6 dB ≈ 2× voltage</div>
                    <div>+10 dB = 10× power</div>
                    <div>+20 dB = 10× voltage</div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-900 mb-2">Attenuation</div>
                  <div className="space-y-1 text-purple-800">
                    <div>-3 dB = 50% power</div>
                    <div>-6 dB = 50% voltage</div>
                    <div>-10 dB = 10% power</div>
                    <div>-20 dB = 10% voltage</div>
                  </div>
                </div>
              </div>
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
                            {entry.inputs.value} → {formatNumber(entry.result.outputValue, 4)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {entry.result.mode.replace(/_/g, ' ')}
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

      <DecibelCalculatorSEO />
      <RelatedTools
        currentTool="decibel-db-calculator"
        tools={['amplifier-gain-calculator', 'frequency-calculator', 'impedance-calculator']}
      />
    </>
  );
}
