"use client";

import { useState, useEffect, useCallback } from "react";
import { ClockFrequencyInputs, ClockFrequencyResult, CalculationMode, FrequencyUnit, TimeUnit } from "./types";
import {
  calculateClockFrequency,
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
import ClockFrequencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ClockFrequencyCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('frequency-to-period');
  const [inputs, setInputs] = useState<ClockFrequencyInputs>({
    mode: 'frequency-to-period',
    frequency: 1,
    frequencyUnit: 'mhz',
    periodUnit: 'us',
    executionTimeUnit: 'ms',
    precision: 6
  });
  
  const [result, setResult] = useState<ClockFrequencyResult | null>(null);
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
        const calculatedResult = calculateClockFrequency(inputs);
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
        period: 1, 
        periodUnit: 'us',
        frequencyUnit: 'mhz',
        executionTimeUnit: 'ms',
        precision: 6
      });
    } else if (newMode === 'frequency-to-period') {
      setInputs({ 
        mode: newMode, 
        frequency: 1, 
        frequencyUnit: 'mhz',
        periodUnit: 'us',
        executionTimeUnit: 'ms',
        precision: 6
      });
    } else if (newMode === 'cycles-time') {
      setInputs({ 
        mode: newMode, 
        cycles: 1000,
        frequency: 1, 
        frequencyUnit: 'mhz',
        periodUnit: 'us',
        executionTimeUnit: 'ms',
        precision: 6
      });
    } else {
      setInputs({ 
        mode: newMode, 
        executionTime: 1,
        executionTimeUnit: 'ms',
        frequency: 1, 
        frequencyUnit: 'mhz',
        periodUnit: 'us',
        precision: 6
      });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof ClockFrequencyInputs, value: number | FrequencyUnit | TimeUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'period-to-frequency') {
      setInputs({ 
        mode, 
        period: 1, 
        periodUnit: 'us',
        frequencyUnit: 'mhz',
        executionTimeUnit: 'ms',
        precision: 6
      });
    } else if (mode === 'frequency-to-period') {
      setInputs({ 
        mode, 
        frequency: 1, 
        frequencyUnit: 'mhz',
        periodUnit: 'us',
        executionTimeUnit: 'ms',
        precision: 6
      });
    } else if (mode === 'cycles-time') {
      setInputs({ 
        mode, 
        cycles: 1000,
        frequency: 1, 
        frequencyUnit: 'mhz',
        periodUnit: 'us',
        executionTimeUnit: 'ms',
        precision: 6
      });
    } else {
      setInputs({ 
        mode, 
        executionTime: 1,
        executionTimeUnit: 'ms',
        frequency: 1, 
        frequencyUnit: 'mhz',
        periodUnit: 'us',
        precision: 6
      });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    const newInputs: ClockFrequencyInputs = { 
      mode,
      precision: inputs.precision,
      frequencyUnit: inputs.frequencyUnit,
      periodUnit: inputs.periodUnit,
      executionTimeUnit: inputs.executionTimeUnit,
    };

    if ('period' in preset) {
      newInputs.period = preset.period;
      newInputs.periodUnit = preset.periodUnit;
    }
    if ('frequency' in preset) {
      newInputs.frequency = preset.frequency;
      newInputs.frequencyUnit = preset.frequencyUnit;
    }
    if ('cycles' in preset) {
      newInputs.cycles = preset.cycles;
    }
    if ('executionTime' in preset) {
      newInputs.executionTime = preset.executionTime;
      newInputs.executionTimeUnit = preset.executionTimeUnit;
    }

    setInputs(newInputs);
  };

  const handleCopy = () => {
    if (result) {
      let text = `Frequency: ${formatNumber(result.frequency, inputs.precision || 6)} ${getFrequencyUnitLabel(inputs.frequencyUnit || 'hz')}, Period: ${formatNumber(result.period, inputs.precision || 6)} ${getTimeUnitLabel(inputs.periodUnit || 's')}`;
      if (result.cycles !== undefined) {
        text += `, Cycles: ${result.cycles}`;
      }
      if (result.executionTime !== undefined) {
        text += `, Time: ${formatNumber(result.executionTime, inputs.precision || 6)} ${getTimeUnitLabel(inputs.executionTimeUnit || 's')}`;
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
      downloadFile(text, 'clock_frequency_calculation.txt');
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

  const getModeLabel = (m: CalculationMode) => {
    switch (m) {
      case 'period-to-frequency': return 'T → f';
      case 'frequency-to-period': return 'f → T';
      case 'cycles-time': return 'Cycles → Time';
      case 'time-cycles': return 'Time → Cycles';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏱️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Clock Frequency Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate clock frequency, period, cycles, and execution time for digital electronics, microcontrollers, and embedded systems. Supports Hz, kHz, MHz, GHz.
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
                    {mode === 'period-to-frequency' && 'Frequency'}
                    {mode === 'frequency-to-period' && 'Clock Period'}
                    {mode === 'cycles-time' && 'Execution Time'}
                    {mode === 'time-cycles' && 'Clock Cycles'}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {mode === 'period-to-frequency' && formatNumber(result.frequency, inputs.precision || 6)}
                    {mode === 'frequency-to-period' && formatNumber(result.period, inputs.precision || 6)}
                    {mode === 'cycles-time' && formatNumber(result.executionTime!, inputs.precision || 6)}
                    {mode === 'time-cycles' && result.cycles}
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === 'period-to-frequency' && getFrequencyUnitLabel(inputs.frequencyUnit || 'hz')}
                    {mode === 'frequency-to-period' && getTimeUnitLabel(inputs.periodUnit || 's')}
                    {mode === 'cycles-time' && getTimeUnitLabel(inputs.executionTimeUnit || 's')}
                    {mode === 'time-cycles' && 'cycles'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Frequency:</span>
                    <span className="font-semibold">{formatNumber(result.frequencyHz, inputs.precision || 6)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Period:</span>
                    <span className="font-semibold">{formatNumber(result.periodSeconds, inputs.precision || 6)} s</span>
                  </div>
                  {result.cycles !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Cycles:</span>
                      <span className="font-semibold">{result.cycles}</span>
                    </div>
                  )}
                  {result.executionTimeSeconds !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Exec Time:</span>
                      <span className="font-semibold">{formatNumber(result.executionTimeSeconds, inputs.precision || 6)} s</span>
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
                  onClick={() => handleModeChange('frequency-to-period')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'frequency-to-period'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Frequency → Period
                </button>
                <button
                  onClick={() => handleModeChange('period-to-frequency')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'period-to-frequency'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Period → Frequency
                </button>
                <button
                  onClick={() => handleModeChange('cycles-time')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'cycles-time'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cycles → Time
                </button>
                <button
                  onClick={() => handleModeChange('time-cycles')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'time-cycles'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Time → Cycles
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              {mode === 'period-to-frequency' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clock Period (T)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.period || ''}
                      onChange={(e) => handleInputChange('period', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1"
                      step="any"
                    />
                    <select
                      value={inputs.periodUnit}
                      onChange={(e) => handleInputChange('periodUnit', e.target.value as TimeUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                    >
                      <option value="s">s (seconds)</option>
                      <option value="ms">ms (milliseconds)</option>
                      <option value="us">µs (microseconds)</option>
                      <option value="ns">ns (nanoseconds)</option>
                    </select>
                  </div>
                </div>
              )}

              {mode === 'frequency-to-period' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clock Frequency (f)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.frequency || ''}
                      onChange={(e) => handleInputChange('frequency', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1"
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
                      <option value="ghz">GHz</option>
                    </select>
                  </div>
                </div>
              )}

              {(mode === 'cycles-time' || mode === 'time-cycles') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clock Frequency (f)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.frequency || ''}
                        onChange={(e) => handleInputChange('frequency', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
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
                        <option value="ghz">GHz</option>
                      </select>
                    </div>
                  </div>

                  {mode === 'cycles-time' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Clock Cycles
                      </label>
                      <input
                        type="number"
                        value={inputs.cycles || ''}
                        onChange={(e) => handleInputChange('cycles', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1000"
                        step="1"
                        min="1"
                      />
                    </div>
                  )}

                  {mode === 'time-cycles' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Execution Time
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={inputs.executionTime || ''}
                          onChange={(e) => handleInputChange('executionTime', parseFloat(e.target.value) || 0)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="1"
                          step="any"
                        />
                        <select
                          value={inputs.executionTimeUnit}
                          onChange={(e) => handleInputChange('executionTimeUnit', e.target.value as TimeUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                        >
                          <option value="s">s (seconds)</option>
                          <option value="ms">ms (milliseconds)</option>
                          <option value="us">µs (microseconds)</option>
                          <option value="ns">ns (nanoseconds)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </>
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
                  <option value="10">10 decimal places</option>
                </select>
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
                          <span className="font-semibold text-gray-900">
                            {getModeLabel(entry.result.mode)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          f: {formatNumber(entry.result.frequencyHz, 3)} Hz, T: {formatNumber(entry.result.periodSeconds, 6)} s
                          {entry.result.cycles !== undefined && `, Cycles: ${entry.result.cycles}`}
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

      <ClockFrequencyCalculatorSEO />
      <RelatedTools
        currentTool="clock-frequency-calculator"
        tools={['capacitor-charge-time-calculator', 'inductor-calculator', 'impedance-calculator', 'capacitive-reactance-calculator']}
      />
    </>
  );
}
