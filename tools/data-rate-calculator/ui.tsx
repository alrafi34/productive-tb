"use client";

import { useState, useEffect, useCallback } from "react";
import { DataRateInputs, DataRateResult, CalculationMode, DataUnit, TimeUnit, RateUnit } from "./types";
import {
  calculateDataRate,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getDataUnitLabel,
  getTimeUnitLabel,
  getRateUnitLabel,
  debounce,
  HistoryEntry
} from "./logic";
import DataRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DataRateCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('data-time-to-rate');
  const [inputs, setInputs] = useState<DataRateInputs>({
    mode: 'data-time-to-rate',
    dataSize: 100,
    dataUnit: 'mb',
    time: 10,
    timeUnit: 's',
    rateUnit: 'mbps',
    precision: 6
  });
  
  const [result, setResult] = useState<DataRateResult | null>(null);
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
        const calculatedResult = calculateDataRate(inputs);
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
    
    if (newMode === 'data-time-to-rate') {
      setInputs({ 
        mode: newMode, 
        dataSize: 100,
        dataUnit: 'mb',
        time: 10,
        timeUnit: 's',
        rateUnit: 'mbps',
        precision: 6
      });
    } else if (newMode === 'rate-time-to-data') {
      setInputs({ 
        mode: newMode, 
        dataRate: 10,
        rateUnit: 'mbps',
        time: 10,
        timeUnit: 's',
        dataUnit: 'mb',
        precision: 6
      });
    } else {
      setInputs({ 
        mode: newMode, 
        dataRate: 10,
        rateUnit: 'mbps',
        dataSize: 100,
        dataUnit: 'mb',
        timeUnit: 's',
        precision: 6
      });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof DataRateInputs, value: number | DataUnit | TimeUnit | RateUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'data-time-to-rate') {
      setInputs({ 
        mode, 
        dataSize: 100,
        dataUnit: 'mb',
        time: 10,
        timeUnit: 's',
        rateUnit: 'mbps',
        precision: 6
      });
    } else if (mode === 'rate-time-to-data') {
      setInputs({ 
        mode, 
        dataRate: 10,
        rateUnit: 'mbps',
        time: 10,
        timeUnit: 's',
        dataUnit: 'mb',
        precision: 6
      });
    } else {
      setInputs({ 
        mode, 
        dataRate: 10,
        rateUnit: 'mbps',
        dataSize: 100,
        dataUnit: 'mb',
        timeUnit: 's',
        precision: 6
      });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    const newInputs: DataRateInputs = { 
      mode,
      precision: inputs.precision,
      dataUnit: inputs.dataUnit,
      timeUnit: inputs.timeUnit,
      rateUnit: inputs.rateUnit,
    };

    if ('dataSize' in preset) {
      newInputs.dataSize = preset.dataSize;
      newInputs.dataUnit = preset.dataUnit;
    }
    if ('time' in preset) {
      newInputs.time = preset.time;
      newInputs.timeUnit = preset.timeUnit;
    }
    if ('dataRate' in preset) {
      newInputs.dataRate = preset.dataRate;
      newInputs.rateUnit = preset.rateUnit;
    }

    setInputs(newInputs);
  };

  const handleCopy = () => {
    if (result) {
      let text = `Data: ${formatNumber(result.dataSize, inputs.precision || 6)} ${getDataUnitLabel(inputs.dataUnit || 'mb')}, Time: ${formatNumber(result.time, inputs.precision || 6)} ${getTimeUnitLabel(inputs.timeUnit || 's')}, Rate: ${formatNumber(result.dataRate, inputs.precision || 6)} ${getRateUnitLabel(inputs.rateUnit || 'mbps')}`;
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
      downloadFile(text, 'data_rate_calculation.txt');
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
      case 'data-time-to-rate': return 'Data & Time → Rate';
      case 'rate-time-to-data': return 'Rate & Time → Data';
      case 'rate-data-to-time': return 'Rate & Data → Time';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Data Rate Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate data transmission rate, transfer speed, and bandwidth for networks and communication systems. Supports Bytes, KB, MB, GB, TB.
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
                    {mode === 'data-time-to-rate' && 'Data Rate'}
                    {mode === 'rate-time-to-data' && 'Data Size'}
                    {mode === 'rate-data-to-time' && 'Time Duration'}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {mode === 'data-time-to-rate' && formatNumber(result.dataRate, inputs.precision || 6)}
                    {mode === 'rate-time-to-data' && formatNumber(result.dataSize, inputs.precision || 6)}
                    {mode === 'rate-data-to-time' && formatNumber(result.time, inputs.precision || 6)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === 'data-time-to-rate' && getRateUnitLabel(inputs.rateUnit || 'mbps')}
                    {mode === 'rate-time-to-data' && getDataUnitLabel(inputs.dataUnit || 'mb')}
                    {mode === 'rate-data-to-time' && getTimeUnitLabel(inputs.timeUnit || 's')}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Data Size:</span>
                    <span className="font-semibold">{formatNumber(result.dataSizeBytes, 2)} Bytes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Time:</span>
                    <span className="font-semibold">{formatNumber(result.timeSeconds, 2)} s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Rate:</span>
                    <span className="font-semibold">{formatNumber(result.dataRateBps, 2)} B/s</span>
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
            
            {/* Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handleModeChange('data-time-to-rate')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'data-time-to-rate'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Data & Time → Rate
                </button>
                <button
                  onClick={() => handleModeChange('rate-time-to-data')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'rate-time-to-data'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rate & Time → Data
                </button>
                <button
                  onClick={() => handleModeChange('rate-data-to-time')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'rate-data-to-time'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rate & Data → Time
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              {(mode === 'data-time-to-rate' || mode === 'rate-data-to-time') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Size
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.dataSize || ''}
                      onChange={(e) => handleInputChange('dataSize', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      step="any"
                    />
                    <select
                      value={inputs.dataUnit}
                      onChange={(e) => handleInputChange('dataUnit', e.target.value as DataUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                    >
                      <option value="bytes">Bytes</option>
                      <option value="kb">KB</option>
                      <option value="mb">MB</option>
                      <option value="gb">GB</option>
                      <option value="tb">TB</option>
                    </select>
                  </div>
                </div>
              )}

              {(mode === 'data-time-to-rate' || mode === 'rate-time-to-data') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Duration
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.time || ''}
                      onChange={(e) => handleInputChange('time', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      step="any"
                    />
                    <select
                      value={inputs.timeUnit}
                      onChange={(e) => handleInputChange('timeUnit', e.target.value as TimeUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                    >
                      <option value="s">seconds</option>
                      <option value="min">minutes</option>
                      <option value="h">hours</option>
                    </select>
                  </div>
                </div>
              )}

              {(mode === 'rate-time-to-data' || mode === 'rate-data-to-time') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Rate
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.dataRate || ''}
                      onChange={(e) => handleInputChange('dataRate', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      step="any"
                    />
                    <select
                      value={inputs.rateUnit}
                      onChange={(e) => handleInputChange('rateUnit', e.target.value as RateUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                    >
                      <option value="bps">B/s</option>
                      <option value="kbps">KB/s</option>
                      <option value="mbps">MB/s</option>
                      <option value="gbps">GB/s</option>
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
                          Rate: {formatNumber(entry.result.dataRateBps, 2)} B/s
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

      <DataRateCalculatorSEO />
      <RelatedTools
        currentTool="data-rate-calculator"
        tools={['clock-frequency-calculator', 'energy-consumption-calculator', 'power-calculator-electrical', 'impedance-calculator']}
      />
    </>
  );
}
