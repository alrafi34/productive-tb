"use client";

import { useState, useEffect, useCallback } from "react";
import { PhaseType, TransformerCurrentInputs, TransformerCurrentResult } from "./types";
import {
  calculateTransformerCurrent,
  validateInputs,
  getPresets,
  getVoltageSuggestions,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToJSON,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import TransformerCurrentCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TransformerCurrentCalculatorUI() {
  const [inputs, setInputs] = useState<TransformerCurrentInputs>({
    power: 5000,
    voltage: 230,
    phase: 'single',
    powerFactor: 0.9
  });
  
  const [result, setResult] = useState<TransformerCurrentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();
  const voltageSuggestions = getVoltageSuggestions(inputs.phase);

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
        const calculatedResult = calculateTransformerCurrent(inputs);
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

  const handleInputChange = (field: keyof TransformerCurrentInputs, value: number | PhaseType) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      power: 5000,
      voltage: 230,
      phase: 'single',
      powerFactor: 0.9
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      power: preset.power,
      voltage: preset.voltage,
      phase: preset.phase,
      powerFactor: preset.powerFactor
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Primary Current: ${formatNumber(result.primaryCurrent, 2)} A | Secondary Current: ${formatNumber(result.secondaryCurrent, 2)} A`;
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
      downloadFile(text, 'transformer_current_calculation.txt');
    }
  };

  const handleExportJSON = () => {
    if (result) {
      const json = exportToJSON(inputs, result);
      downloadFile(json, 'transformer_current_calculation.json', 'application/json');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setInputs(entry.inputs);
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
              <h3 className="font-semibold text-blue-900 mb-1">Transformer Current Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate transformer primary and secondary current for single-phase and three-phase systems with instant results and power factor support.
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
                    Primary Current
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.primaryCurrent, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Amperes
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Secondary Current:</span>
                    <span className="font-semibold">{formatNumber(result.secondaryCurrent, 2)} A</span>
                  </div>
                  {result.lineCurrent && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Line Current:</span>
                      <span className="font-semibold">{formatNumber(result.lineCurrent, 2)} A</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Apparent Power:</span>
                    <span className="font-semibold">{formatNumber(result.apparentPower, 2)} VA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">System:</span>
                    <span className="font-semibold">{result.phase === 'single' ? 'Single Phase' : 'Three Phase'}</span>
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
                  <>
                    <button
                      onClick={handleExportText}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export Text
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export JSON
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                System Parameters
              </h3>
              
              {/* Power Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.power || ''}
                    onChange={(e) => handleInputChange('power', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5000"
                    min="0"
                    step="100"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    W
                  </div>
                </div>
              </div>

              {/* Voltage Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voltage
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.voltage || ''}
                    onChange={(e) => handleInputChange('voltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="230"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {voltageSuggestions.map((voltage) => (
                    <button
                      key={voltage}
                      onClick={() => handleInputChange('voltage', voltage)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      {voltage}V
                    </button>
                  ))}
                </div>
              </div>

              {/* Phase Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase Configuration
                </label>
                <select
                  value={inputs.phase}
                  onChange={(e) => handleInputChange('phase', e.target.value as PhaseType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="single">Single Phase</option>
                  <option value="three">Three Phase</option>
                </select>
              </div>

              {/* Power Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power Factor: {inputs.powerFactor}
                </label>
                <input
                  type="range"
                  value={inputs.powerFactor}
                  onChange={(e) => handleInputChange('powerFactor', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0.5"
                  max="1"
                  step="0.01"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5</span>
                  <span>0.75</span>
                  <span>1.0</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Typical range: 0.8-0.95 for most loads</p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {result.phase === 'single' ? 'I = P / (V × PF)' : 'I = P / (√3 × V × PF)'}
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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common System Examples
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.power}W @ {preset.voltage}V ({preset.phase === 'single' ? '1φ' : '3φ'})
                    </div>
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

            {/* Current Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Current Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Primary Current</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.primaryCurrent, 2)}</div>
                    <div className="text-xs text-blue-700">Amperes</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Secondary Current</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.secondaryCurrent, 2)}</div>
                    <div className="text-xs text-green-700">Amperes</div>
                  </div>
                  {result.lineCurrent && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Line Current</div>
                      <div className="text-lg font-bold text-purple-900">{formatNumber(result.lineCurrent, 2)}</div>
                      <div className="text-xs text-purple-700">Amperes (3-Phase)</div>
                    </div>
                  )}
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">Apparent Power</div>
                    <div className="text-lg font-bold text-orange-900">{formatNumber(result.apparentPower, 2)}</div>
                    <div className="text-xs text-orange-700">VA</div>
                  </div>
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
                            {formatNumber(entry.result.primaryCurrent, 2)} A
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.power}W @ {entry.inputs.voltage}V • {entry.result.phase === 'single' ? 'Single' : 'Three'} Phase
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

      <TransformerCurrentCalculatorSEO />
      <RelatedTools
        currentTool="transformer-current-calculator"
        tools={['transformer-turns-ratio-calculator', 'transformer-efficiency-calculator', 'three-phase-power-calculator', 'power-factor-calculator']}
      />
    </>
  );
}
