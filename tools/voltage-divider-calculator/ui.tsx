"use client";

import { useState, useEffect, useCallback } from "react";
import { ResistanceUnit, VoltageInputs, VoltageResult } from "./types";
import {
  calculateVoltageDivider,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  debounce
} from "./logic";
import VoltageDividerCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function VoltageDividerCalculatorUI() {
  const [inputs, setInputs] = useState<VoltageInputs>({
    vin: 5,
    r1: 1,
    r2: 1,
    r1Unit: 'kohm',
    r2Unit: 'kohm'
  });
  
  const [result, setResult] = useState<VoltageResult | null>(null);
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
        const calculatedResult = calculateVoltageDivider(inputs);
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

  const handleInputChange = (field: keyof VoltageInputs, value: number | ResistanceUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      vin: 5,
      r1: 1,
      r2: 1,
      r1Unit: 'kohm',
      r2Unit: 'kohm'
    });
    setResult(null);
    setError(null);
  };

  const handleSwapResistors = () => {
    setInputs(prev => ({
      ...prev,
      r1: prev.r2,
      r2: prev.r1,
      r1Unit: prev.r2Unit,
      r2Unit: prev.r1Unit
    }));
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      vin: preset.vin,
      r1: preset.r1,
      r2: preset.r2,
      r1Unit: preset.r1Unit,
      r2Unit: preset.r2Unit
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Vout = ${formatNumber(result.vout, 4)} V`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(result);
      downloadFile(text, 'voltage_divider_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (savedResult: VoltageResult) => {
    // Reconstruct inputs from result
    setInputs({
      vin: savedResult.vin,
      r1: savedResult.r1Ohms >= 1000000 ? savedResult.r1Ohms / 1000000 : 
          savedResult.r1Ohms >= 1000 ? savedResult.r1Ohms / 1000 : savedResult.r1Ohms,
      r2: savedResult.r2Ohms >= 1000000 ? savedResult.r2Ohms / 1000000 : 
          savedResult.r2Ohms >= 1000 ? savedResult.r2Ohms / 1000 : savedResult.r2Ohms,
      r1Unit: savedResult.r1Ohms >= 1000000 ? 'mohm' : 
              savedResult.r1Ohms >= 1000 ? 'kohm' : 'ohm',
      r2Unit: savedResult.r2Ohms >= 1000000 ? 'mohm' : 
              savedResult.r2Ohms >= 1000 ? 'kohm' : 'ohm'
    });
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
              <h3 className="font-semibold text-blue-900 mb-1">Voltage Divider Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate output voltage (Vout) using two resistors and input voltage. Get instant results with step-by-step explanation.
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
                    Output Voltage
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.vout, 4)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Volts
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Ratio:</span>
                    <span className="font-semibold">{formatNumber(result.ratio * 100, 2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Current:</span>
                    <span className="font-semibold">{formatNumber(result.current * 1000, 2)} mA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Power:</span>
                    <span className="font-semibold">{formatNumber(result.totalPower * 1000, 2)} mW</span>
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
                  onClick={handleSwapResistors}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Swap R1 ↔ R2
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
                Circuit Parameters
              </h3>
              
              {/* Input Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Voltage (Vin)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.vin}
                    onChange={(e) => handleInputChange('vin', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
              </div>

              {/* Resistor R1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resistor R1
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.r1}
                    onChange={(e) => handleInputChange('r1', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1"
                    min="0"
                    step="0.1"
                  />
                  <select
                    value={inputs.r1Unit}
                    onChange={(e) => handleInputChange('r1Unit', e.target.value as ResistanceUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="ohm">Ω</option>
                    <option value="kohm">kΩ</option>
                    <option value="mohm">MΩ</option>
                  </select>
                </div>
              </div>

              {/* Resistor R2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resistor R2
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.r2}
                    onChange={(e) => handleInputChange('r2', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1"
                    min="0"
                    step="0.1"
                  />
                  <select
                    value={inputs.r2Unit}
                    onChange={(e) => handleInputChange('r2Unit', e.target.value as ResistanceUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="ohm">Ω</option>
                    <option value="kohm">kΩ</option>
                    <option value="mohm">MΩ</option>
                  </select>
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Vout = Vin × (R2 / (R1 + R2))
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
                Common Configurations
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
                      {preset.vin}V, {preset.r1}{getUnitLabel(preset.r1Unit)}, {preset.r2}{getUnitLabel(preset.r2Unit)}
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

            {/* Power Dissipation */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Dissipation
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">R1 Power</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(result.powerR1 * 1000, 2)}</div>
                    <div className="text-xs text-gray-600">mW</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">R2 Power</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(result.powerR2 * 1000, 2)}</div>
                    <div className="text-xs text-gray-600">mW</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Power</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(result.totalPower * 1000, 2)}</div>
                    <div className="text-xs text-gray-600">mW</div>
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
                        onClick={() => loadFromHistory(entry.result)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            Vout: {formatNumber(entry.result.vout, 4)} V
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Vin: {entry.result.vin}V • R1: {entry.result.r1Display} • R2: {entry.result.r2Display}
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

      <VoltageDividerCalculatorSEO />
      <RelatedTools
        currentTool="voltage-divider-calculator"
        tools={['ohms-law-calculator', 'power-consumption-calculator', 'resistor-color-code-calculator']}
      />
    </>
  );
}
