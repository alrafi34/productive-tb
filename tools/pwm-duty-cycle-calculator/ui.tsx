"use client";

import { useState, useEffect, useCallback } from "react";
import { PWMInputs, PWMResult, CalculationMode, TimeUnit } from "./types";
import {
  calculatePWM,
  validateInputs,
  getPWMPresets,
  getUnitLabel,
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
import PWMDutyCycleCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PWMDutyCycleCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<PWMInputs>({
    mode: (savedSettings.mode as CalculationMode) || 'dutyCycle',
    onTime: savedSettings.onTime || 2,
    offTime: savedSettings.offTime || 8,
    dutyCycle: savedSettings.dutyCycle || 50,
    frequency: savedSettings.frequency || 1000,
    period: savedSettings.period || 1,
    unit: (savedSettings.unit as TimeUnit) || 'ms'
  });
  
  const [result, setResult] = useState<PWMResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPWMPresets();

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
        const calculatedResult = calculatePWM(inputs);
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

  const handleInputChange = (field: keyof PWMInputs, value: number | CalculationMode | TimeUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      mode: 'dutyCycle',
      onTime: 2,
      offTime: 8,
      dutyCycle: 50,
      frequency: 1000,
      period: 1,
      unit: 'ms'
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs(prev => ({
      ...prev,
      mode: preset.mode,
      onTime: preset.onTime || prev.onTime,
      offTime: preset.offTime || prev.offTime,
      dutyCycle: preset.dutyCycle || prev.dutyCycle,
      frequency: preset.frequency || prev.frequency,
      unit: preset.unit
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Duty Cycle: ${formatNumber(result.dutyCycle, 2)}% | Frequency: ${formatNumber(result.frequency, 2)} Hz`;
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
      downloadFile(text, 'pwm_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'pwm_calculation.csv');
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
              <h3 className="font-semibold text-blue-900 mb-1">PWM Duty Cycle Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate PWM duty cycle, frequency, period, ON/OFF time instantly. Essential for motor control, LED dimming, and signal processing.
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
                    Duty Cycle
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.dutyCycle, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    %
                  </div>
                </div>

                {/* Duty Cycle Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-white transition-all"
                      style={{ width: `${Math.min(result.dutyCycle, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Frequency:</span>
                    <span className="font-semibold">{formatNumber(result.frequency, 2)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Period:</span>
                    <span className="font-semibold">{formatNumber(result.period, 6)} {getUnitLabel(inputs.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">ON Time:</span>
                    <span className="font-semibold">{formatNumber(result.onTime, 6)} {getUnitLabel(inputs.unit)}</span>
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
            
            {/* Mode and Unit Selection */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mode
                  </label>
                  <select
                    value={inputs.mode}
                    onChange={(e) => handleInputChange('mode', e.target.value as CalculationMode)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="dutyCycle">Calculate Duty Cycle</option>
                    <option value="onOffTime">Calculate ON/OFF Time</option>
                    <option value="frequency">Calculate Frequency/Period</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Unit
                  </label>
                  <select
                    value={inputs.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value as TimeUnit)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="us">Microseconds (µs)</option>
                    <option value="ms">Milliseconds (ms)</option>
                    <option value="s">Seconds (s)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Input Panel - Mode: Calculate Duty Cycle */}
            {inputs.mode === 'dutyCycle' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Time Parameters
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ON Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.onTime || ''}
                        onChange={(e) => handleInputChange('onTime', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="2"
                        min="0"
                        step="0.001"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        {getUnitLabel(inputs.unit)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OFF Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.offTime || ''}
                        onChange={(e) => handleInputChange('offTime', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="8"
                        min="0"
                        step="0.001"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        {getUnitLabel(inputs.unit)}
                      </div>
                    </div>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> Duty Cycle (%) = (ON Time / Period) × 100
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Panel - Mode: Calculate ON/OFF Time */}
            {inputs.mode === 'onOffTime' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  PWM Parameters
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duty Cycle: {formatNumber(inputs.dutyCycle, 1)}%
                  </label>
                  <input
                    type="range"
                    value={inputs.dutyCycle}
                    onChange={(e) => handleInputChange('dutyCycle', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.frequency || ''}
                        onChange={(e) => handleInputChange('frequency', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1000"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        Hz
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OR Period
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.period || ''}
                        onChange={(e) => handleInputChange('period', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
                        min="0"
                        step="0.001"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        {getUnitLabel(inputs.unit)}
                      </div>
                    </div>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> ON Time = (Duty Cycle / 100) × Period
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Panel - Mode: Calculate Frequency */}
            {inputs.mode === 'frequency' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Time Parameters
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ON Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.onTime || ''}
                        onChange={(e) => handleInputChange('onTime', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="2"
                        min="0"
                        step="0.001"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        {getUnitLabel(inputs.unit)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OFF Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.offTime || ''}
                        onChange={(e) => handleInputChange('offTime', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="8"
                        min="0"
                        step="0.001"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        {getUnitLabel(inputs.unit)}
                      </div>
                    </div>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> Frequency (Hz) = 1 / Period (s)
                    </div>
                  </div>
                )}
              </div>
            )}

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
                Common PWM Configurations
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

            {/* Results Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  PWM Signal Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Duty Cycle</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.dutyCycle, 2)}</div>
                    <div className="text-xs text-blue-700 mt-1">%</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Frequency</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.frequency, 2)}</div>
                    <div className="text-xs text-green-700 mt-1">Hz</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">ON Time</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.onTime, 6)}</div>
                    <div className="text-xs text-purple-700 mt-1">{getUnitLabel(inputs.unit)}</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1 font-semibold">OFF Time</div>
                    <div className="text-2xl font-bold text-orange-900">{formatNumber(result.offTime, 6)}</div>
                    <div className="text-xs text-orange-700 mt-1">{getUnitLabel(inputs.unit)}</div>
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
                            {formatNumber(entry.result.dutyCycle, 2)}% • {formatNumber(entry.result.frequency, 2)} Hz
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          ON: {formatNumber(entry.result.onTime, 3)} {getUnitLabel(entry.inputs.unit)} • OFF: {formatNumber(entry.result.offTime, 3)} {getUnitLabel(entry.inputs.unit)}
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

      <PWMDutyCycleCalculatorSEO />
      <RelatedTools
        currentTool="pwm-duty-cycle-calculator"
        tools={['frequency-calculator', 'signal-attenuation-calculator', 'rc-time-constant-calculator']}
      />
    </>
  );
}
