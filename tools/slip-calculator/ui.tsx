"use client";

import { useState, useEffect, useCallback } from "react";
import { SlipInputs, SlipResult, AutoCalculateInputs } from "./types";
import {
  calculateSlip,
  calculateSynchronousSpeed,
  validateInputs,
  SLIP_PRESETS,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getSlipInterpretation,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import SlipCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SlipCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<SlipInputs>({
    synchronousSpeed: savedSettings.lastInputs?.synchronousSpeed || 1500,
    rotorSpeed: savedSettings.lastInputs?.rotorSpeed || 1440
  });
  
  const [showAutoCalculate, setShowAutoCalculate] = useState(
    savedSettings.showAutoCalculate ?? false
  );
  
  const [autoInputs, setAutoInputs] = useState<AutoCalculateInputs>({
    frequency: 50,
    poles: 4
  });
  
  const [result, setResult] = useState<SlipResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

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
        const calculatedResult = calculateSlip(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 100),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs, showAutoCalculate);
  }, [inputs, showAutoCalculate]);

  const handleInputChange = (field: keyof SlipInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleAutoInputChange = (field: keyof AutoCalculateInputs, value: number) => {
    setAutoInputs(prev => {
      const newInputs = { ...prev, [field]: value };
      // Auto-calculate synchronous speed
      const ns = calculateSynchronousSpeed(newInputs);
      setInputs(prevInputs => ({ ...prevInputs, synchronousSpeed: ns }));
      return newInputs;
    });
  };

  const handleReset = () => {
    setInputs({
      synchronousSpeed: 1500,
      rotorSpeed: 1440
    });
    setAutoInputs({
      frequency: 50,
      poles: 4
    });
    setResult(null);
    setError(null);
  };

  const handleSwapValues = () => {
    setInputs(prev => ({
      synchronousSpeed: prev.rotorSpeed,
      rotorSpeed: prev.synchronousSpeed
    }));
  };

  const handleApplyPreset = (preset: typeof SLIP_PRESETS[0]) => {
    setInputs({
      synchronousSpeed: preset.synchronousSpeed,
      rotorSpeed: preset.rotorSpeed
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Slip: ${formatNumber(result.slip, 6)} (${formatNumber(result.slipPercentage, 2)}%)`;
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
      downloadFile(text, 'slip_calculation.txt');
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

  const interpretation = result ? getSlipInterpretation(result.slipPercentage) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Slip Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate slip in induction motors using synchronous speed and rotor speed. Get instant results with detailed analysis.
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
                    Slip Percentage
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.slipPercentage, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    %
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slip (Decimal):</span>
                    <span className="font-semibold">{formatNumber(result.slip, 6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Speed Difference:</span>
                    <span className="font-semibold">{result.speedDifference} RPM</span>
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
                  onClick={handleSwapValues}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Swap Values
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={() => setShowAutoCalculate(!showAutoCalculate)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  {showAutoCalculate ? '📐 Hide' : '📐 Show'} Auto-Calculate
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
            
            {/* Auto-Calculate Panel */}
            {showAutoCalculate && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Auto-Calculate Synchronous Speed
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate synchronous speed from frequency and poles
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency (Hz)
                    </label>
                    <input
                      type="number"
                      value={autoInputs.frequency || ''}
                      onChange={(e) => handleAutoInputChange('frequency', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="50"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Poles
                    </label>
                    <select
                      value={autoInputs.poles}
                      onChange={(e) => handleAutoInputChange('poles', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-semibold"
                    >
                      <option value="2">2 Poles</option>
                      <option value="4">4 Poles</option>
                      <option value="6">6 Poles</option>
                      <option value="8">8 Poles</option>
                      <option value="10">10 Poles</option>
                      <option value="12">12 Poles</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Calculated Ns:</strong> {calculateSynchronousSpeed(autoInputs).toFixed(2)} RPM
                  </div>
                </div>
              </div>
            )}

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Speed Parameters
              </h3>
              
              {/* Synchronous Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Synchronous Speed (Ns)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.synchronousSpeed || ''}
                    onChange={(e) => handleInputChange('synchronousSpeed', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1500"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    RPM
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Theoretical speed of rotating magnetic field
                </p>
              </div>

              {/* Rotor Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotor Speed (Nr)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.rotorSpeed || ''}
                    onChange={(e) => handleInputChange('rotorSpeed', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1440"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    RPM
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Actual speed of motor rotor
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> s = (Ns - Nr) / Ns
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

            {/* Slip Interpretation */}
            {result && !error && interpretation && (
              <div className={`border rounded-xl p-6 ${interpretation.bgColor}`}>
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Slip Analysis
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-3xl font-bold ${interpretation.color}`}>
                    {interpretation.status}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-3">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      result.slipPercentage < 3 ? 'bg-green-500' :
                      result.slipPercentage < 5 ? 'bg-green-400' :
                      result.slipPercentage < 8 ? 'bg-yellow-500' :
                      result.slipPercentage < 15 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(result.slipPercentage * 5, 100)}%` }}
                  />
                </div>

                <p className={`text-sm ${interpretation.color}`}>
                  {interpretation.description}
                </p>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Motor Examples
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SLIP_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      Ns: {preset.synchronousSpeed} RPM, Nr: {preset.rotorSpeed} RPM
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Comparison */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Speed Comparison
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Synchronous Speed</div>
                    <div className="text-2xl font-bold text-blue-900">{inputs.synchronousSpeed}</div>
                    <div className="text-xs text-blue-700 mt-1">RPM</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Rotor Speed</div>
                    <div className="text-2xl font-bold text-green-900">{inputs.rotorSpeed}</div>
                    <div className="text-xs text-green-700 mt-1">RPM</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Difference</div>
                    <div className="text-2xl font-bold text-purple-900">{result.speedDifference}</div>
                    <div className="text-xs text-purple-700 mt-1">RPM</div>
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
                            Slip: {formatNumber(entry.result.slipPercentage, 2)}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Ns: {entry.inputs.synchronousSpeed} RPM • Nr: {entry.inputs.rotorSpeed} RPM
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

      <SlipCalculatorSEO />
      <RelatedTools
        currentTool="slip-calculator"
        tools={['motor-speed-calculator', 'electric-motor-power-calculator', 'frequency-calculator']}
      />
    </>
  );
}
