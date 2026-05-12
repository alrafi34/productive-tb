"use client";

import { useState, useEffect, useCallback } from "react";
import { CalculationMode, TransformerEfficiencyInputs, TransformerEfficiencyResult } from "./types";
import {
  calculateTransformerEfficiency,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getEfficiencyColor,
  getEfficiencyBgColor,
  debounce
} from "./logic";
import TransformerEfficiencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TransformerEfficiencyCalculatorUI() {
  const [inputs, setInputs] = useState<TransformerEfficiencyInputs>({
    mode: 'power',
    inputPower: 1000,
    outputPower: 950,
    losses: 0,
    voltage: 0,
    current: 0,
    powerFactor: 1
  });
  
  const [result, setResult] = useState<TransformerEfficiencyResult | null>(null);
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
        const calculatedResult = calculateTransformerEfficiency(inputs);
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

  const handleInputChange = (field: keyof TransformerEfficiencyInputs, value: number | CalculationMode) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      mode: 'power',
      inputPower: 1000,
      outputPower: 950,
      losses: 0,
      voltage: 0,
      current: 0,
      powerFactor: 1
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs(prev => ({
      ...prev,
      mode: 'power',
      inputPower: preset.inputPower,
      outputPower: preset.outputPower,
      losses: preset.losses || 0
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Transformer Efficiency: ${formatNumber(result.efficiency, 2)}% (${result.efficiencyRating})`;
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
      downloadFile(text, 'transformer_efficiency_calculation.txt');
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
              <h3 className="font-semibold text-blue-900 mb-1">Transformer Efficiency Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate transformer efficiency using input/output power, voltage & current, or losses. Get instant efficiency ratings and power loss analysis.
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
                    Efficiency
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.efficiency, 2)}%
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.efficiencyRating}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Input Power:</span>
                    <span className="font-semibold">{formatNumber(result.inputPower, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Output Power:</span>
                    <span className="font-semibold">{formatNumber(result.outputPower, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Losses:</span>
                    <span className="font-semibold">{formatNumber(result.losses, 2)} W</span>
                  </div>
                </div>

                {/* Efficiency Bar */}
                <div className="mt-4">
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${Math.min(result.efficiency, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-primary-100 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
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
                Calculation Parameters
              </h3>
              
              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Mode
                </label>
                <select
                  value={inputs.mode}
                  onChange={(e) => handleInputChange('mode', e.target.value as CalculationMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="power">Input & Output Power</option>
                  <option value="voltage-current">Voltage & Current</option>
                  <option value="output-losses">Output Power & Losses</option>
                </select>
              </div>

              {/* Conditional Inputs Based on Mode */}
              {inputs.mode === 'power' && (
                <>
                  {/* Input Power */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Power
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.inputPower || ''}
                        onChange={(e) => handleInputChange('inputPower', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1000"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>

                  {/* Output Power */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Power
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.outputPower || ''}
                        onChange={(e) => handleInputChange('outputPower', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="950"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>
                </>
              )}

              {inputs.mode === 'voltage-current' && (
                <>
                  {/* Voltage */}
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
                        placeholder="220"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        V
                      </div>
                    </div>
                  </div>

                  {/* Current */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.current || ''}
                        onChange={(e) => handleInputChange('current', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="5"
                        min="0"
                        step="0.1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        A
                      </div>
                    </div>
                  </div>

                  {/* Power Factor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Power Factor
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.powerFactor || ''}
                        onChange={(e) => handleInputChange('powerFactor', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
                        min="0"
                        max="1"
                        step="0.01"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center min-w-[60px] justify-center">
                        -
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Range: 0 to 1 (typically 0.8-1.0)</p>
                  </div>

                  {/* Output Power */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Power
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.outputPower || ''}
                        onChange={(e) => handleInputChange('outputPower', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1000"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>
                </>
              )}

              {inputs.mode === 'output-losses' && (
                <>
                  {/* Output Power */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Power
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.outputPower || ''}
                        onChange={(e) => handleInputChange('outputPower', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="950"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>

                  {/* Losses */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Losses
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.losses || ''}
                        onChange={(e) => handleInputChange('losses', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="50"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>
                </>
              )}

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Efficiency (η) = (Output Power / Input Power) × 100%
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

            {/* Efficiency Rating */}
            {result && !error && (
              <div className={`border rounded-xl p-6 ${getEfficiencyBgColor(result.efficiency)}`}>
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Efficiency Rating
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className={`text-4xl font-bold ${getEfficiencyColor(result.efficiency)}`}>
                    {result.efficiencyRating}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-700">
                      {result.efficiency >= 98 && (
                        <p>✓ Excellent efficiency! Modern high-performance transformer with minimal losses.</p>
                      )}
                      {result.efficiency >= 95 && result.efficiency < 98 && (
                        <p>✓ Very good efficiency. Typical for quality power transformers.</p>
                      )}
                      {result.efficiency >= 90 && result.efficiency < 95 && (
                        <p>✓ Good efficiency. Acceptable for most applications.</p>
                      )}
                      {result.efficiency >= 85 && result.efficiency < 90 && (
                        <p>⚠ Fair efficiency. Consider improvements or replacement for critical applications.</p>
                      )}
                      {result.efficiency >= 80 && result.efficiency < 85 && (
                        <p>⚠ Poor efficiency. High losses - replacement recommended.</p>
                      )}
                      {result.efficiency < 80 && (
                        <p>⚠ Very poor efficiency. Significant energy waste - immediate replacement advised.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Transformer Examples
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
                      {preset.inputPower}W → {preset.outputPower}W
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

            {/* Power Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Breakdown
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Input Power</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.inputPower, 2)}</div>
                    <div className="text-xs text-blue-700">Watts</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Output Power</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.outputPower, 2)}</div>
                    <div className="text-xs text-green-700">Watts</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-xs text-red-600 uppercase tracking-wider mb-1">Losses</div>
                    <div className="text-lg font-bold text-red-900">{formatNumber(result.losses, 2)}</div>
                    <div className="text-xs text-red-700">Watts ({formatNumber((result.losses / result.inputPower) * 100, 2)}%)</div>
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
                            Efficiency: {formatNumber(entry.result.efficiency, 2)}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.result.inputPower, 0)}W → {formatNumber(entry.result.outputPower, 0)}W • {entry.result.efficiencyRating}
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

      <TransformerEfficiencyCalculatorSEO />
      <RelatedTools
        currentTool="transformer-efficiency-calculator"
        tools={['transformer-turns-ratio-calculator', 'power-factor-calculator', 'energy-consumption-calculator', 'three-phase-power-calculator']}
      />
    </>
  );
}
