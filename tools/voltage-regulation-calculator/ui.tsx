"use client";

import { useState, useEffect, useCallback } from "react";
import { VoltageRegulationInputs, VoltageRegulationResult, SystemType, VoltageUnit } from "./types";
import {
  calculateVoltageRegulation,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
  HistoryEntry
} from "./logic";
import VoltageRegulationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function VoltageRegulationCalculatorUI() {
  const [inputs, setInputs] = useState<VoltageRegulationInputs>({
    noLoadVoltage: 240,
    fullLoadVoltage: 220,
    systemType: 'transformer',
    voltageUnit: 'V',
    precision: 2
  });
  
  const [result, setResult] = useState<VoltageRegulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

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
        const calculatedResult = calculateVoltageRegulation(inputs);
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

  const handleInputChange = (field: keyof VoltageRegulationInputs, value: number | SystemType | VoltageUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      noLoadVoltage: 240,
      fullLoadVoltage: 220,
      systemType: 'transformer',
      voltageUnit: 'V',
      precision: 2
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputs(prev => ({
      ...prev,
      noLoadVoltage: preset.noLoadVoltage,
      fullLoadVoltage: preset.fullLoadVoltage,
      systemType: preset.systemType,
      voltageUnit: preset.voltageUnit
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Voltage Regulation: ${formatNumber(result.regulation, inputs.precision)}%`;
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
      downloadFile(text, 'voltage_regulation_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'voltage_regulation_calculation.csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getRegulationColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'moderate': return 'text-yellow-600';
      case 'poor': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRegulationBgColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-50 border-green-200';
      case 'good': return 'bg-blue-50 border-blue-200';
      case 'moderate': return 'bg-yellow-50 border-yellow-200';
      case 'poor': return 'bg-orange-50 border-orange-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Voltage Regulation Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate voltage regulation of electrical systems using no-load and full-load voltages. Get instant results with real-time calculations for transformers and power distribution lines.
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
                    Voltage Regulation
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.regulation, inputs.precision)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Percent (%)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Level:</span>
                    <span className="font-semibold uppercase">{result.regulationLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Voltage Drop:</span>
                    <span className="font-semibold">{formatNumber(result.voltageDrop, inputs.precision)} {result.voltageUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">System:</span>
                    <span className="font-semibold capitalize">{result.systemType.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Formula:</span>
                    <span className="font-semibold text-xs">VR% = (V₀-V_FL)/V_FL×100</span>
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
                Input Parameters
              </h3>
              
              {/* No Load Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No Load Voltage (V₀)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.noLoadVoltage}
                    onChange={(e) => handleInputChange('noLoadVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="240"
                    step="any"
                    min="0"
                  />
                  <select
                    value={inputs.voltageUnit}
                    onChange={(e) => handleInputChange('voltageUnit', e.target.value as VoltageUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="V">V</option>
                    <option value="kV">kV</option>
                  </select>
                </div>
              </div>

              {/* Full Load Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Load Voltage (V_FL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.fullLoadVoltage}
                    onChange={(e) => handleInputChange('fullLoadVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="220"
                    step="any"
                    min="0"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    {inputs.voltageUnit}
                  </div>
                </div>
              </div>

              {/* System Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Type
                </label>
                <select
                  value={inputs.systemType}
                  onChange={(e) => handleInputChange('systemType', e.target.value as SystemType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="transformer">Transformer</option>
                  <option value="transmission-line">Transmission Line</option>
                  <option value="general">General System</option>
                </select>
              </div>

              {/* Precision */}
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
                </select>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> VR% = ((V₀ - V_FL) / V_FL) × 100
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

            {/* Interpretation Display */}
            {result && result.interpretation && !error && (
              <div className={`rounded-xl border p-4 ${getRegulationBgColor(result.regulationLevel)}`}>
                <div className="flex items-start gap-2">
                  <span className="text-lg">
                    {result.regulationLevel === 'excellent' ? '✅' : 
                     result.regulationLevel === 'good' ? 'ℹ️' : 
                     result.regulationLevel === 'moderate' ? '⚠️' : '🚨'}
                  </span>
                  <span className={`font-medium ${getRegulationColor(result.regulationLevel)}`}>
                    {result.interpretation}
                  </span>
                </div>
              </div>
            )}

            {/* Warning Display */}
            {result && result.warning && !error && (
              <div className={`rounded-xl border p-4 ${getRegulationBgColor(result.regulationLevel)}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span className={`font-medium ${getRegulationColor(result.regulationLevel)}`}>{result.warning}</span>
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
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.noLoadVoltage}{preset.voltageUnit} → {preset.fullLoadVoltage}{preset.voltageUnit}
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
                            {formatNumber(entry.result.regulation, 2)}% Regulation
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.noLoadVoltage}{entry.result.voltageUnit} → {entry.result.fullLoadVoltage}{entry.result.voltageUnit} | {entry.result.systemType.replace('-', ' ')}
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

      <VoltageRegulationCalculatorSEO />
      <RelatedTools
        currentTool="voltage-regulation-calculator"
        tools={['voltage-divider-calculator', 'transformer-efficiency-calculator', 'power-loss-calculator', 'voltage-drop-calculator']}
      />
    </>
  );
}