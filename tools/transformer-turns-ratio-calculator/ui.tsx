"use client";

import { useState, useEffect, useCallback } from "react";
import { TransformerInputs, TransformerResult } from "./types";
import {
  calculateTransformer,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import TransformerTurnsRatioCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TransformerTurnsRatioCalculatorUI() {
  const [inputs, setInputs] = useState<TransformerInputs>({
    primaryVoltage: 220,
    secondaryVoltage: 110,
    primaryTurns: 0,
    secondaryTurns: 0
  });
  
  const [result, setResult] = useState<TransformerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();

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
        const calculatedResult = calculateTransformer(inputs);
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

  const handleInputChange = (field: keyof TransformerInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      primaryVoltage: 220,
      secondaryVoltage: 110,
      primaryTurns: 0,
      secondaryTurns: 0
    });
    setResult(null);
    setError(null);
  };

  const handleSwap = () => {
    setInputs(prev => ({
      primaryVoltage: prev.secondaryVoltage,
      secondaryVoltage: prev.primaryVoltage,
      primaryTurns: prev.secondaryTurns,
      secondaryTurns: prev.primaryTurns
    }));
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      primaryVoltage: preset.primaryVoltage,
      secondaryVoltage: preset.secondaryVoltage,
      primaryTurns: preset.primaryTurns || 0,
      secondaryTurns: preset.secondaryTurns || 0
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Turns Ratio: ${result.turnsRatioDisplay} | Voltage Ratio: ${result.voltageRatioDisplay} | Current Ratio: ${result.currentRatioDisplay}`;
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
      downloadFile(text, 'transformer_calculation.txt');
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
              <h3 className="font-semibold text-blue-900 mb-1">Transformer Turns Ratio Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate transformer turns ratio, voltage ratio, and current ratio using primary and secondary values with instant results.
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
                    Turns Ratio
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.turnsRatioDisplay}
                  </div>
                  <div className="text-xl text-primary-100">
                    Np : Ns
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Voltage Ratio:</span>
                    <span className="font-semibold">{result.voltageRatioDisplay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Current Ratio:</span>
                    <span className="font-semibold">{result.currentRatioDisplay}</span>
                  </div>
                  {result.calculatedSecondaryVoltage && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Calc. Vs:</span>
                      <span className="font-semibold">{formatNumber(result.calculatedSecondaryVoltage, 2)} V</span>
                    </div>
                  )}
                  {result.calculatedPrimaryVoltage && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Calc. Vp:</span>
                      <span className="font-semibold">{formatNumber(result.calculatedPrimaryVoltage, 2)} V</span>
                    </div>
                  )}
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
                  onClick={handleSwap}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Swap Primary ↔ Secondary
                </button>
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
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Transformer Parameters
              </h3>
              
              {/* Primary Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Voltage (Vp)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.primaryVoltage || ''}
                    onChange={(e) => handleInputChange('primaryVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="220"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
              </div>

              {/* Secondary Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Voltage (Vs)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.secondaryVoltage || ''}
                    onChange={(e) => handleInputChange('secondaryVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="110"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
              </div>

              {/* Primary Turns */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Turns (Np) <span className="text-gray-500 text-xs">- Optional</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.primaryTurns || ''}
                    onChange={(e) => handleInputChange('primaryTurns', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1000"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center min-w-[80px] justify-center">
                    turns
                  </div>
                </div>
              </div>

              {/* Secondary Turns */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Turns (Ns) <span className="text-gray-500 text-xs">- Optional</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.secondaryTurns || ''}
                    onChange={(e) => handleInputChange('secondaryTurns', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="500"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center min-w-[80px] justify-center">
                    turns
                  </div>
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Vp/Vs = Np/Ns = Is/Ip
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
                Common Transformer Types
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
                      {preset.primaryVoltage}V → {preset.secondaryVoltage}V
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

            {/* Ratio Visualization */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Transformer Ratios
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Turns Ratio</div>
                    <div className="text-lg font-bold text-blue-900">{result.turnsRatioDisplay}</div>
                    <div className="text-xs text-blue-700">Np : Ns</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Voltage Ratio</div>
                    <div className="text-lg font-bold text-purple-900">{result.voltageRatioDisplay}</div>
                    <div className="text-xs text-purple-700">Vp : Vs</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Current Ratio</div>
                    <div className="text-lg font-bold text-green-900">{result.currentRatioDisplay}</div>
                    <div className="text-xs text-green-700">Ip : Is</div>
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
                            Ratio: {entry.result.turnsRatioDisplay}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.primaryVoltage}V → {entry.inputs.secondaryVoltage}V
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

      <TransformerTurnsRatioCalculatorSEO />
      <RelatedTools
        currentTool="transformer-turns-ratio-calculator"
        tools={['voltage-divider-calculator', 'power-factor-calculator', 'impedance-calculator', 'ohms-law-calculator']}
      />
    </>
  );
}
