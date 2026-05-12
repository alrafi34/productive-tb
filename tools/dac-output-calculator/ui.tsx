"use client";

import { useState, useEffect, useCallback } from "react";
import { DACInputs, DACResult, DACMode } from "./types";
import {
  calculateDAC,
  validateInputs,
  getDACPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import DACOutputCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DACOutputCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<DACInputs>({
    digitalValue: savedSettings.digitalValue || 128,
    bits: savedSettings.bits || 8,
    referenceVoltage: savedSettings.referenceVoltage || 5,
    mode: (savedSettings.mode as DACMode) || 'unipolar'
  });
  
  const [result, setResult] = useState<DACResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getDACPresets();

  // Calculate max value for current bit resolution
  const maxValue = Math.pow(2, inputs.bits) - 1;

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
        const calculatedResult = calculateDAC(inputs);
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

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof DACInputs, value: number | DACMode) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      digitalValue: 128,
      bits: 8,
      referenceVoltage: 5,
      mode: 'unipolar'
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs(prev => ({
      ...prev,
      bits: preset.bits,
      referenceVoltage: preset.referenceVoltage,
      mode: preset.mode,
      digitalValue: Math.floor((Math.pow(2, preset.bits) - 1) / 2) // Set to mid-range
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `DAC Output: ${formatNumber(result.outputVoltage, 4)} V (${formatNumber(result.percentage, 2)}%)`;
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
      downloadFile(text, 'dac_output_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'dac_output_calculation.csv');
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
            <span className="text-2xl">📈</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">DAC Output Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate analog output voltage from digital input value. Supports unipolar and bipolar DAC configurations for microcontroller and audio applications.
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
                    {formatNumber(result.outputVoltage, 4)}
                  </div>
                  <div className="text-xl text-primary-100">
                    V
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Digital Value:</span>
                    <span className="font-semibold">{inputs.digitalValue} / {result.maxValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Percentage:</span>
                    <span className="font-semibold">{formatNumber(result.percentage, 2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Step Size:</span>
                    <span className="font-semibold">{formatNumber(result.stepSize * 1000, 3)} mV</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-white transition-all"
                      style={{ width: `${Math.min(result.percentage, 100)}%` }}
                    />
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
                      📄 Export TXT
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export CSV
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
                DAC Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Digital Input Value
                  </label>
                  <input
                    type="number"
                    value={inputs.digitalValue || ''}
                    onChange={(e) => handleInputChange('digitalValue', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="128"
                    min="0"
                    max={maxValue}
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Range: 0 to {maxValue}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resolution (bits)
                  </label>
                  <input
                    type="number"
                    value={inputs.bits || ''}
                    onChange={(e) => handleInputChange('bits', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="8"
                    min="1"
                    max="32"
                    step="1"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleInputChange('bits', 8)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      8-bit
                    </button>
                    <button
                      onClick={() => handleInputChange('bits', 10)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      10-bit
                    </button>
                    <button
                      onClick={() => handleInputChange('bits', 12)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      12-bit
                    </button>
                    <button
                      onClick={() => handleInputChange('bits', 16)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      16-bit
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Voltage (Vref)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.referenceVoltage || ''}
                      onChange={(e) => handleInputChange('referenceVoltage', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      V
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleInputChange('referenceVoltage', 3.3)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      3.3V
                    </button>
                    <button
                      onClick={() => handleInputChange('referenceVoltage', 5)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      5V
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DAC Mode
                  </label>
                  <select
                    value={inputs.mode}
                    onChange={(e) => handleInputChange('mode', e.target.value as DACMode)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-lg"
                  >
                    <option value="unipolar">Unipolar (0 to Vref)</option>
                    <option value="bipolar">Bipolar (-Vref to +Vref)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {inputs.mode === 'unipolar' ? 'Output: 0V to +Vref' : 'Output: -Vref to +Vref'}
                  </p>
                </div>
              </div>

              {/* Slider for Digital Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital Value Slider
                </label>
                <input
                  type="range"
                  value={inputs.digitalValue}
                  onChange={(e) => handleInputChange('digitalValue', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0"
                  max={maxValue}
                  step="1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>{inputs.digitalValue}</span>
                  <span>{maxValue}</span>
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {inputs.mode === 'unipolar' 
                      ? 'Vout = (D / Max) × Vref' 
                      : 'Vout = ((D / Max) × 2 × Vref) - Vref'}
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
                Common DAC Configurations
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
                      {preset.bits}-bit • {preset.referenceVoltage}V • {preset.mode}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  DAC Specifications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Output Voltage</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.outputVoltage, 6)}</div>
                    <div className="text-xs text-blue-700 mt-1">V (Volts)</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Percentage</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.percentage, 2)}</div>
                    <div className="text-xs text-green-700 mt-1">% of {inputs.mode === 'unipolar' ? 'full scale' : 'range'}</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Step Size</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.stepSize * 1000, 3)}</div>
                    <div className="text-xs text-purple-700 mt-1">mV per step</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1 font-semibold">Maximum Value</div>
                    <div className="text-2xl font-bold text-orange-900">{result.maxValue}</div>
                    <div className="text-xs text-orange-700 mt-1">2<sup>{inputs.bits}</sup> - 1</div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700 space-y-1">
                    <div className="flex justify-between">
                      <span>Output Range:</span>
                      <span className="font-semibold">
                        {inputs.mode === 'unipolar' 
                          ? `0V to ${inputs.referenceVoltage}V` 
                          : `-${inputs.referenceVoltage}V to +${inputs.referenceVoltage}V`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolution:</span>
                      <span className="font-semibold">{inputs.bits} bits ({result.maxValue + 1} levels)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                  {result.steps.map((step, index) => (
                    <div key={index} className={step === '' ? 'h-2' : 'text-gray-700'}>
                      {step}
                    </div>
                  ))}
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
                            {formatNumber(entry.result.outputVoltage, 4)}V • {formatNumber(entry.result.percentage, 1)}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          D={entry.inputs.digitalValue} • {entry.inputs.bits}-bit • {entry.inputs.referenceVoltage}V • {entry.inputs.mode}
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

      <DACOutputCalculatorSEO />
      <RelatedTools
        currentTool="dac-output-calculator"
        tools={['adc-resolution-calculator', 'decimal-to-binary-calculator', 'pwm-duty-cycle-calculator']}
      />
    </>
  );
}
