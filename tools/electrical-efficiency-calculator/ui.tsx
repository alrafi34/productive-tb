"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  EfficiencyInputs, 
  EfficiencyResult, 
  PowerUnit, 
  HistoryEntry 
} from "./types";
import {
  calculateEfficiency,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import ElectricalEfficiencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const POWER_UNITS: { label: string; value: PowerUnit }[] = [
  { label: 'W (Watts)', value: 'W' },
  { label: 'kW (Kilowatts)', value: 'kW' },
  { label: 'MW (Megawatts)', value: 'MW' },
];

export default function ElectricalEfficiencyCalculatorUI() {
  const [inputs, setInputs] = useState<EfficiencyInputs>({
    inputPower: 1000,
    outputPower: 800,
    powerUnit: 'W',
    precision: 2
  });
  
  const [result, setResult] = useState<EfficiencyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const presets = getPresets();

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

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
        const calculatedResult = calculateEfficiency(inputs);
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

  const handleInputChange = (field: keyof EfficiencyInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      inputPower: 1000,
      outputPower: 800,
      powerUnit: 'W',
      precision: 2
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs(prev => ({
      ...prev,
      inputPower: preset.inputPower,
      outputPower: preset.outputPower,
      powerUnit: preset.powerUnit
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Efficiency: ${formatNumber(result.efficiency, inputs.precision)}%`;
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
      downloadFile(text, 'electrical_efficiency_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'electrical_efficiency_calculation.csv', 'text/csv');
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

  const getEfficiencyColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getEfficiencyBg = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-50 border-green-200';
      case 'good': return 'bg-blue-50 border-blue-200';
      case 'fair': return 'bg-yellow-50 border-yellow-200';
      case 'poor': return 'bg-red-50 border-red-200';
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
              <h3 className="font-semibold text-blue-900 mb-1">Electrical Efficiency Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate system efficiency by comparing output power vs input power. Get instant results with efficiency analysis and power loss calculations.
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
                    System Efficiency
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.efficiency, inputs.precision)}
                  </div>
                  <div className="text-xl text-primary-100">
                    %
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Efficiency Level:</span>
                    <span className="font-semibold capitalize">{result.efficiencyLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power Loss:</span>
                    <span className="font-semibold">{formatNumber(result.powerLoss, inputs.precision)} {result.powerUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Loss Percentage:</span>
                    <span className="font-semibold">{formatNumber(result.powerLossPercentage, inputs.precision)}%</span>
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
                Power Parameters
              </h3>
              
              {/* Input Power */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Power
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.inputPower}
                    onChange={(e) => handleInputChange('inputPower', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1000"
                    min="0"
                    step="0.1"
                  />
                  <select
                    value={inputs.powerUnit}
                    onChange={(e) => handleInputChange('powerUnit', e.target.value as PowerUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    {POWER_UNITS.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total power consumed by the system</p>
              </div>

              {/* Output Power */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Power
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.outputPower}
                    onChange={(e) => handleInputChange('outputPower', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="800"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    {inputs.powerUnit}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Useful power delivered by the system</p>
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
                  <option value="1">1 decimal place</option>
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                </select>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Efficiency (%) = (Output Power / Input Power) × 100
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

            {/* Warning Display */}
            {result && result.warning && !error && (
              <div className={`rounded-xl border p-4 ${getEfficiencyBg(result.efficiencyLevel)}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span className={`font-medium ${getEfficiencyColor(result.efficiencyLevel)}`}>{result.warning}</span>
                </div>
              </div>
            )}

            {/* Efficiency Gauge */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Efficiency Analysis
                </h3>
                
                <div className="space-y-4">
                  {/* Efficiency Bar */}
                  <div className="relative">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${
                          result.efficiency >= 95 ? 'bg-green-500' :
                          result.efficiency >= 85 ? 'bg-blue-500' :
                          result.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(result.efficiency, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <span className={`font-semibold ${getEfficiencyColor(result.efficiencyLevel)}`}>
                        {result.efficiencyLevel.toUpperCase()} EFFICIENCY
                      </span>
                    </div>
                  </div>

                  {/* Efficiency Levels Guide */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                      <div className="font-semibold text-green-600">Excellent</div>
                      <div className="text-green-700">≥95%</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="font-semibold text-blue-600">Good</div>
                      <div className="text-blue-700">85-94%</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="font-semibold text-yellow-600">Fair</div>
                      <div className="text-yellow-700">70-84%</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                      <div className="font-semibold text-red-600">Poor</div>
                      <div className="text-red-700">&lt;70%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common System Examples
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
                      {preset.inputPower}{preset.powerUnit} → {preset.outputPower}{preset.powerUnit}
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
                
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                  {result.steps.map((step, index) => (
                    <div key={index} className={step === '' ? 'h-2' : 'text-gray-700'}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Power Flow Diagram */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Flow Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Input Power</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.inputPower, inputs.precision)}</div>
                    <div className="text-xs text-blue-700">{result.powerUnit}</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                    <div className="text-xs text-red-600 uppercase tracking-wider mb-1">Power Loss</div>
                    <div className="text-2xl font-bold text-red-900">{formatNumber(result.powerLoss, inputs.precision)}</div>
                    <div className="text-xs text-red-700">{result.powerUnit}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Output Power</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.outputPower, inputs.precision)}</div>
                    <div className="text-xs text-green-700">{result.powerUnit}</div>
                  </div>
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
                            {formatNumber(entry.result.efficiency, 2)}% Efficiency
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.inputPower}{entry.inputs.powerUnit} → {entry.inputs.outputPower}{entry.inputs.powerUnit} • {entry.result.efficiencyLevel}
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

      <ElectricalEfficiencyCalculatorSEO />
      <RelatedTools
        currentTool="electrical-efficiency-calculator"
        tools={['power-loss-calculator', 'power-calculator-electrical', 'energy-consumption-calculator', 'motor-efficiency-calculator']}
      />
    </>
  );
}