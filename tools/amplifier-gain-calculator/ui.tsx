"use client";

import { useState, useEffect, useCallback } from "react";
import { AmplifierInputs, AmplifierResult, CalculationMode } from "./types";
import {
  calculateAmplifierGain,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  HistoryEntry
} from "./logic";
import AmplifierGainCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AmplifierGainCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('voltage');
  const [inputs, setInputs] = useState<AmplifierInputs>({
    mode: 'voltage',
    vin: 1,
    vout: 10,
  });
  
  const [result, setResult] = useState<AmplifierResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

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
        const calculatedResult = calculateAmplifierGain(inputs);
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
    
    // Reset inputs based on mode
    if (newMode === 'voltage') {
      setInputs({ mode: newMode, vin: 1, vout: 10 });
    } else if (newMode === 'current') {
      setInputs({ mode: newMode, iin: 0.001, iout: 0.01 });
    } else if (newMode === 'power') {
      setInputs({ mode: newMode, pin: 1, pout: 10 });
    } else if (newMode === 'db') {
      setInputs({ mode: newMode, gain: 10 });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'voltage') {
      setInputs({ mode, vin: 1, vout: 10 });
    } else if (mode === 'current') {
      setInputs({ mode, iin: 0.001, iout: 0.01 });
    } else if (mode === 'power') {
      setInputs({ mode, pin: 1, pout: 10 });
    } else if (mode === 'db') {
      setInputs({ mode, gain: 10 });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    if (mode === 'voltage') {
      setInputs({ mode, vin: preset.vin, vout: preset.vout });
    } else if (mode === 'current') {
      setInputs({ mode, iin: preset.iin, iout: preset.iout });
    } else if (mode === 'power') {
      setInputs({ mode, pin: preset.pin, pout: preset.pout });
    } else if (mode === 'db') {
      setInputs({ mode, gain: preset.gain });
    }
  };

  const handleCopy = () => {
    if (result) {
      let text = "";
      if (result.voltageGain !== undefined) {
        text = `Voltage Gain: ${formatNumber(result.voltageGain, 4)} (${formatNumber(result.gainDb!, 2)} dB)`;
      } else if (result.currentGain !== undefined) {
        text = `Current Gain: ${formatNumber(result.currentGain, 4)} (${formatNumber(result.gainDb!, 2)} dB)`;
      } else if (result.powerGain !== undefined) {
        text = `Power Gain: ${formatNumber(result.powerGain, 4)} (${formatNumber(result.gainDb!, 2)} dB)`;
      } else if (result.gainDb !== undefined) {
        text = `Gain: ${formatNumber(result.gainDb, 2)} dB`;
      }
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
      downloadFile(text, 'amplifier_gain_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setMode(entry.inputs.mode);
    setInputs(entry.inputs);
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
              <h3 className="font-semibold text-blue-900 mb-1">Amplifier Gain Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate voltage gain, current gain, power gain, and decibel (dB) gain for electronic amplifiers. Get instant results with step-by-step explanations.
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
                    {mode === 'voltage' && 'Voltage Gain (Av)'}
                    {mode === 'current' && 'Current Gain (Ai)'}
                    {mode === 'power' && 'Power Gain (Ap)'}
                    {mode === 'db' && 'Gain (dB)'}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {mode === 'voltage' && formatNumber(result.voltageGain!, 4)}
                    {mode === 'current' && formatNumber(result.currentGain!, 4)}
                    {mode === 'power' && formatNumber(result.powerGain!, 4)}
                    {mode === 'db' && formatNumber(result.gainDb!, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === 'db' ? 'dB' : 'Linear Gain'}
                  </div>
                </div>

                {result.gainDb !== undefined && mode !== 'db' && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Gain in dB:</span>
                      <span className="font-semibold text-2xl">{formatNumber(result.gainDb, 2)} dB</span>
                    </div>
                  </div>
                )}

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
            
            {/* Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => handleModeChange('voltage')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'voltage'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Voltage Gain
                </button>
                <button
                  onClick={() => handleModeChange('current')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'current'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Current Gain
                </button>
                <button
                  onClick={() => handleModeChange('power')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'power'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Power Gain
                </button>
                <button
                  onClick={() => handleModeChange('db')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'db'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  dB Conversion
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              {mode === 'voltage' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Voltage (Vin)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.vin || ''}
                        onChange={(e) => handleInputChange('vin', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
                        min="0"
                        step="0.01"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        V
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Voltage (Vout)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.vout || ''}
                        onChange={(e) => handleInputChange('vout', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="10"
                        min="0"
                        step="0.01"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        V
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mode === 'current' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Current (Iin)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.iin || ''}
                        onChange={(e) => handleInputChange('iin', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="0.001"
                        min="0"
                        step="0.0001"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        A
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Current (Iout)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.iout || ''}
                        onChange={(e) => handleInputChange('iout', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="0.01"
                        min="0"
                        step="0.0001"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        A
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mode === 'power' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Power (Pin)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.pin || ''}
                        onChange={(e) => handleInputChange('pin', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
                        min="0"
                        step="0.01"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Power (Pout)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.pout || ''}
                        onChange={(e) => handleInputChange('pout', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="10"
                        min="0"
                        step="0.01"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mode === 'db' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Linear Gain
                  </label>
                  <input
                    type="number"
                    value={inputs.gain || ''}
                    onChange={(e) => handleInputChange('gain', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Examples
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
                          <span className="font-semibold text-gray-900 capitalize">
                            {entry.result.mode} Gain
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.gainDb !== undefined && `${formatNumber(entry.result.gainDb, 2)} dB`}
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

      <AmplifierGainCalculatorSEO />
      <RelatedTools
        currentTool="amplifier-gain-calculator"
        tools={['impedance-calculator', 'power-factor-calculator', 'voltage-divider-calculator']}
      />
    </>
  );
}
