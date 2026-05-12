"use client";

import { useState, useEffect, useCallback } from "react";
import { ADCInputs, ADCResult } from "./types";
import {
  calculateADC,
  validateInputs,
  getADCPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  formatNumberSmart,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import ADCResolutionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ADCResolutionCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<ADCInputs>({
    referenceVoltage: savedSettings.referenceVoltage || 5,
    bits: savedSettings.bits || 10,
    inputVoltage: savedSettings.inputVoltage || 0
  });
  
  const [result, setResult] = useState<ADCResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getADCPresets();

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
        const calculatedResult = calculateADC(inputs);
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

  const handleInputChange = (field: keyof ADCInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      referenceVoltage: 5,
      bits: 10,
      inputVoltage: 0
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs(prev => ({
      ...prev,
      referenceVoltage: preset.referenceVoltage,
      bits: preset.bits
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `ADC: ${inputs.bits}-bit | Step: ${formatNumber(result.stepSizeMillivolts, 3)} mV | Levels: ${result.levels}`;
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
      downloadFile(text, 'adc_resolution_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'adc_resolution_calculation.csv');
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
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">ADC Resolution Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate ADC step size, quantization levels, and digital output values. Essential for microcontroller projects and data acquisition systems.
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
                    Step Size
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.stepSizeMillivolts, 3)}
                  </div>
                  <div className="text-xl text-primary-100">
                    mV
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Resolution:</span>
                    <span className="font-semibold">{inputs.bits} bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Levels:</span>
                    <span className="font-semibold">{result.levels.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Max Voltage:</span>
                    <span className="font-semibold">{formatNumber(result.maxVoltage, 3)} V</span>
                  </div>
                  {result.digitalValue !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Digital Value:</span>
                      <span className="font-semibold">{result.digitalValue}</span>
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
                ADC Parameters
              </h3>
              
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
                    ADC Resolution
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.bits || ''}
                      onChange={(e) => handleInputChange('bits', parseInt(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="1"
                      max="32"
                      step="1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      bits
                    </div>
                  </div>
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
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Voltage (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.inputVoltage || ''}
                    onChange={(e) => handleInputChange('inputVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter analog input voltage to calculate digital output value
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Step Size = Vref / 2<sup>n</sup>
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
                Common ADC Configurations
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
                      {preset.bits}-bit • {preset.referenceVoltage}V
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  ADC Specifications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Quantization Levels</div>
                    <div className="text-2xl font-bold text-blue-900">{result.levels.toLocaleString()}</div>
                    <div className="text-xs text-blue-700 mt-1">2<sup>{inputs.bits}</sup> levels</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Step Size (Volts)</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumberSmart(result.stepSizeVolts)}</div>
                    <div className="text-xs text-green-700 mt-1">V per step</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Step Size (Millivolts)</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.stepSizeMillivolts, 6)}</div>
                    <div className="text-xs text-purple-700 mt-1">mV per step</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1 font-semibold">Maximum Voltage</div>
                    <div className="text-2xl font-bold text-orange-900">{formatNumber(result.maxVoltage, 6)}</div>
                    <div className="text-xs text-orange-700 mt-1">V (max measurable)</div>
                  </div>
                </div>

                {result.digitalValue !== null && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Digital Output Value</div>
                        <div className="text-3xl font-bold text-primary">{result.digitalValue}</div>
                        <div className="text-xs text-primary/70 mt-1">
                          For {inputs.inputVoltage}V input
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">Percentage</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatNumber((result.digitalValue / (result.levels - 1)) * 100, 2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                            {entry.inputs.bits}-bit • {formatNumber(entry.result.stepSizeMillivolts, 3)} mV
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Vref: {entry.inputs.referenceVoltage}V • Levels: {entry.result.levels.toLocaleString()}
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

      <ADCResolutionCalculatorSEO />
      <RelatedTools
        currentTool="adc-resolution-calculator"
        tools={['dac-output-calculator', 'binary-to-decimal-calculator', 'logic-gate-calculator']}
      />
    </>
  );
}
