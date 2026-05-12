"use client";

import { useState, useEffect, useCallback } from "react";
import { FrequencyInputs, FrequencyResult, CalculationMode, FrequencyUnit, TimeUnit } from "./types";
import {
  calculateFrequency,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getFrequencyUnitLabel,
  getTimeUnitLabel,
  debounce,
  HistoryEntry
} from "./logic";
import FrequencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FrequencyCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('period-to-frequency');
  const [inputs, setInputs] = useState<FrequencyInputs>({
    mode: 'period-to-frequency',
    timePeriod: 0.02,
    timeUnit: 's',
    frequencyUnit: 'hz',
    precision: 6
  });
  
  const [result, setResult] = useState<FrequencyResult | null>(null);
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
        const calculatedResult = calculateFrequency(inputs);
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

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    
    if (newMode === 'period-to-frequency') {
      setInputs({ 
        mode: newMode, 
        timePeriod: 0.02, 
        timeUnit: 's',
        frequencyUnit: 'hz',
        precision: 6
      });
    } else {
      setInputs({ 
        mode: newMode, 
        frequency: 50, 
        frequencyUnit: 'hz',
        timeUnit: 's',
        precision: 6
      });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof FrequencyInputs, value: number | FrequencyUnit | TimeUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'period-to-frequency') {
      setInputs({ 
        mode, 
        timePeriod: 0.02, 
        timeUnit: 's',
        frequencyUnit: 'hz',
        precision: 6
      });
    } else {
      setInputs({ 
        mode, 
        frequency: 50, 
        frequencyUnit: 'hz',
        timeUnit: 's',
        precision: 6
      });
    }
    setResult(null);
    setError(null);
  };

  const handleSwap = () => {
    if (result) {
      if (mode === 'period-to-frequency') {
        setMode('frequency-to-period');
        setInputs({
          mode: 'frequency-to-period',
          frequency: result.frequency,
          frequencyUnit: inputs.frequencyUnit,
          timeUnit: inputs.timeUnit,
          precision: inputs.precision
        });
      } else {
        setMode('period-to-frequency');
        setInputs({
          mode: 'period-to-frequency',
          timePeriod: result.timePeriod,
          timeUnit: inputs.timeUnit,
          frequencyUnit: inputs.frequencyUnit,
          precision: inputs.precision
        });
      }
    }
  };

  const handleApplyPreset = (preset: any) => {
    if (mode === 'period-to-frequency') {
      setInputs({ 
        mode, 
        timePeriod: preset.timePeriod, 
        timeUnit: preset.timeUnit,
        frequencyUnit: inputs.frequencyUnit,
        precision: inputs.precision
      });
    } else {
      setInputs({ 
        mode, 
        frequency: preset.frequency, 
        frequencyUnit: preset.frequencyUnit,
        timeUnit: inputs.timeUnit,
        precision: inputs.precision
      });
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `Frequency: ${formatNumber(result.frequency, inputs.precision || 6)} ${getFrequencyUnitLabel(inputs.frequencyUnit || 'hz')}, Time Period: ${formatNumber(result.timePeriod, inputs.precision || 6)} ${getTimeUnitLabel(inputs.timeUnit || 's')}`;
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
      downloadFile(text, 'frequency_calculation.txt');
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
              <h3 className="font-semibold text-blue-900 mb-1">Frequency Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate frequency from time period or time period from frequency instantly. Convert between Hz, kHz, MHz and seconds, milliseconds, microseconds.
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
                    {mode === 'period-to-frequency' ? 'Frequency' : 'Time Period'}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {mode === 'period-to-frequency' 
                      ? formatNumber(result.frequency, inputs.precision || 6)
                      : formatNumber(result.timePeriod, inputs.precision || 6)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === 'period-to-frequency' 
                      ? getFrequencyUnitLabel(inputs.frequencyUnit || 'hz')
                      : getTimeUnitLabel(inputs.timeUnit || 's')
                    }
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Frequency:</span>
                    <span className="font-semibold">{formatNumber(result.frequencyHz, inputs.precision || 6)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Time Period:</span>
                    <span className="font-semibold">{formatNumber(result.timePeriodSeconds, inputs.precision || 6)} s</span>
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
                {result && (
                  <button
                    onClick={handleSwap}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    🔄 Swap Mode
                  </button>
                )}
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
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleModeChange('period-to-frequency')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'period-to-frequency'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Time Period → Frequency
                </button>
                <button
                  onClick={() => handleModeChange('frequency-to-period')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'frequency-to-period'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Frequency → Time Period
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              {mode === 'period-to-frequency' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period (T)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.timePeriod || ''}
                      onChange={(e) => handleInputChange('timePeriod', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.02"
                      step="any"
                    />
                    <select
                      value={inputs.timeUnit}
                      onChange={(e) => handleInputChange('timeUnit', e.target.value as TimeUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                    >
                      <option value="s">s (seconds)</option>
                      <option value="ms">ms (milliseconds)</option>
                      <option value="us">µs (microseconds)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency (f)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.frequency || ''}
                      onChange={(e) => handleInputChange('frequency', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="50"
                      step="any"
                    />
                    <select
                      value={inputs.frequencyUnit}
                      onChange={(e) => handleInputChange('frequencyUnit', e.target.value as FrequencyUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                    >
                      <option value="hz">Hz</option>
                      <option value="khz">kHz</option>
                      <option value="mhz">MHz</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Precision Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimal Precision
                </label>
                <select
                  value={inputs.precision}
                  onChange={(e) => handleInputChange('precision', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                  <option value="6">6 decimal places</option>
                  <option value="8">8 decimal places</option>
                </select>
              </div>

              {/* Output Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {mode === 'period-to-frequency' ? 'Output Frequency Unit' : 'Output Time Unit'}
                </label>
                {mode === 'period-to-frequency' ? (
                  <select
                    value={inputs.frequencyUnit}
                    onChange={(e) => handleInputChange('frequencyUnit', e.target.value as FrequencyUnit)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="hz">Hz</option>
                    <option value="khz">kHz</option>
                    <option value="mhz">MHz</option>
                  </select>
                ) : (
                  <select
                    value={inputs.timeUnit}
                    onChange={(e) => handleInputChange('timeUnit', e.target.value as TimeUnit)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="s">s (seconds)</option>
                    <option value="ms">ms (milliseconds)</option>
                    <option value="us">µs (microseconds)</option>
                  </select>
                )}
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
                            {entry.result.mode === 'period-to-frequency' ? 'T → f' : 'f → T'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          f: {formatNumber(entry.result.frequencyHz, 3)} Hz, T: {formatNumber(entry.result.timePeriodSeconds, 6)} s
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

      <FrequencyCalculatorSEO />
      <RelatedTools
        currentTool="frequency-calculator"
        tools={['impedance-calculator', 'capacitive-reactance-calculator', 'inductive-reactance-calculator']}
      />
    </>
  );
}
