"use client";

import { useState, useEffect, useCallback } from "react";
import { HeatInputs, HeatResult, CalculationMode } from "./types";
import {
  calculateHeatDissipation,
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
import HeatDissipationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HeatDissipationCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('voltage-current');
  const [inputs, setInputs] = useState<HeatInputs>({
    mode: 'voltage-current',
    voltage: 12,
    current: 2,
    precision: 2
  });
  
  const [result, setResult] = useState<HeatResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const presets = getPresets(mode);

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
        const calculatedResult = calculateHeatDissipation(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    
    if (newMode === 'voltage-current') {
      setInputs({ mode: newMode, voltage: 12, current: 2, precision: 2 });
    } else if (newMode === 'voltage-resistance') {
      setInputs({ mode: newMode, voltage: 230, resistance: 100, precision: 2 });
    } else if (newMode === 'current-resistance') {
      setInputs({ mode: newMode, current: 5, resistance: 10, precision: 2 });
    } else {
      setInputs({ mode: newMode, power: 50, precision: 2 });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof HeatInputs, value: number | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'voltage-current') {
      setInputs({ mode, voltage: 12, current: 2, precision: 2 });
    } else if (mode === 'voltage-resistance') {
      setInputs({ mode, voltage: 230, resistance: 100, precision: 2 });
    } else if (mode === 'current-resistance') {
      setInputs({ mode, current: 5, resistance: 10, precision: 2 });
    } else {
      setInputs({ mode, power: 50, precision: 2 });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    const newInputs: HeatInputs = { 
      mode,
      precision: inputs.precision,
    };

    if ('voltage' in preset) newInputs.voltage = preset.voltage;
    if ('current' in preset) newInputs.current = preset.current;
    if ('resistance' in preset) newInputs.resistance = preset.resistance;
    if ('power' in preset) newInputs.power = preset.power;

    setInputs(newInputs);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Heat Dissipation: ${formatNumber(result.heatDissipation, inputs.precision)} W`;
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
      downloadFile(text, 'heat_dissipation_calculation.txt');
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
      case 'voltage-current': return 'V × I Mode';
      case 'voltage-resistance': return 'V² / R Mode';
      case 'current-resistance': return 'I² × R Mode';
      case 'power-direct': return 'Direct Power';
    }
  };

  const getHeatColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHeatBgColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Heat Dissipation Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate heat dissipation in electrical circuits using voltage, current, or resistance. Get instant results with thermal analysis for electrical systems.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-6">
            
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Heat Dissipation
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.heatDissipation, inputs.precision)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Watts (W)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Heat Level:</span>
                    <span className="font-semibold uppercase">{result.heatLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Formula:</span>
                    <span className="font-semibold text-xs">{result.formula}</span>
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
                    📄 Export TXT
                  </button>
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => handleModeChange('voltage-current')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'voltage-current'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  V × I
                </button>
                <button
                  onClick={() => handleModeChange('voltage-resistance')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'voltage-resistance'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  V² / R
                </button>
                <button
                  onClick={() => handleModeChange('current-resistance')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'current-resistance'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  I² × R
                </button>
                <button
                  onClick={() => handleModeChange('power-direct')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'power-direct'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Power
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              {(mode === 'voltage-current' || mode === 'voltage-resistance') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voltage (V)
                  </label>
                  <input
                    type="number"
                    value={inputs.voltage || ''}
                    onChange={(e) => handleInputChange('voltage', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    step="any"
                    min="0"
                  />
                </div>
              )}

              {(mode === 'voltage-current' || mode === 'current-resistance') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current (A)
                  </label>
                  <input
                    type="number"
                    value={inputs.current || ''}
                    onChange={(e) => handleInputChange('current', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    step="any"
                    min="0"
                  />
                </div>
              )}

              {(mode === 'voltage-resistance' || mode === 'current-resistance') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resistance (Ω)
                  </label>
                  <input
                    type="number"
                    value={inputs.resistance || ''}
                    onChange={(e) => handleInputChange('resistance', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    step="any"
                    min="0"
                  />
                </div>
              )}

              {mode === 'power-direct' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power (W)
                  </label>
                  <input
                    type="number"
                    value={inputs.power || ''}
                    onChange={(e) => handleInputChange('power', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="50"
                    step="any"
                    min="0"
                  />
                </div>
              )}

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
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {result && result.warning && !error && (
              <div className={`rounded-xl border p-4 ${getHeatBgColor(result.heatLevel)}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{result.heatLevel === 'low' ? 'ℹ️' : '⚠️'}</span>
                  <span className={`font-medium ${getHeatColor(result.heatLevel)}`}>{result.warning}</span>
                </div>
              </div>
            )}

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
                          Heat Dissipation: {formatNumber(entry.result.heatDissipation, 2)} W
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

      <HeatDissipationCalculatorSEO />
      <RelatedTools
        currentTool="heat-dissipation-calculator"
        tools={['power-loss-calculator', 'power-calculator-electrical', 'ohms-law-calculator', 'electrical-efficiency-calculator']}
      />
    </>
  );
}