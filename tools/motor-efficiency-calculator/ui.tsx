"use client";

import { useState, useEffect, useCallback } from "react";
import { MotorEfficiencyInputs, MotorEfficiencyResult, PowerUnit } from "./types";
import {
  calculateMotorEfficiency,
  validateInputs,
  getEfficiencyColor,
  getEfficiencyMessage,
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
import MotorEfficiencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function MotorEfficiencyCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<MotorEfficiencyInputs>({
    inputPower: savedSettings.inputPower || 1000,
    outputPower: savedSettings.outputPower || 850,
    unit: (savedSettings.unit as PowerUnit) || 'watts'
  });
  
  const [result, setResult] = useState<MotorEfficiencyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const unitOptions: PowerUnit[] = ['watts', 'kilowatts'];

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
        const calculatedResult = calculateMotorEfficiency(inputs);
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

  const handleInputChange = (field: keyof MotorEfficiencyInputs, value: number | PowerUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      inputPower: 1000,
      outputPower: 850,
      unit: 'watts'
    });
    setResult(null);
    setError(null);
  };

  const handleSwapValues = () => {
    setInputs(prev => ({
      ...prev,
      inputPower: prev.outputPower,
      outputPower: prev.inputPower
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Motor Efficiency: ${formatNumber(result.efficiency, 2)}% (${result.efficiencyRating.toUpperCase()})`;
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
      downloadFile(text, 'motor_efficiency_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'motor_efficiency_calculation.csv');
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

  const efficiencyColor = result ? getEfficiencyColor(result.efficiency) : 'gray';
  const efficiencyMessage = result ? getEfficiencyMessage(result.efficiency) : '';

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Motor Efficiency Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate electric motor efficiency from input and output power. Get instant efficiency percentage, power losses, and performance rating.
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
                    Motor Efficiency
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.efficiency, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    %
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-primary-100 mb-1 text-sm">Rating:</div>
                  <div className="text-2xl font-bold uppercase">{result.efficiencyRating}</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power Losses:</span>
                    <span className="font-semibold">{formatNumber(result.losses, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Loss Percentage:</span>
                    <span className="font-semibold">{formatNumber(result.lossesPercentage, 2)}%</span>
                  </div>
                </div>

                {/* Efficiency Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-white transition-all"
                      style={{ width: `${Math.min(result.efficiency, 100)}%` }}
                    />
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
                  onClick={handleSwapValues}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⇄ Swap Values
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power Unit
                </label>
                <select
                  value={inputs.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value as PowerUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-lg"
                >
                  <option value="watts">Watts (W)</option>
                  <option value="kilowatts">Kilowatts (kW)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Power ({inputs.unit === 'kilowatts' ? 'kW' : 'W'})
                </label>
                <input
                  type="number"
                  value={inputs.inputPower || ''}
                  onChange={(e) => handleInputChange('inputPower', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder={inputs.unit === 'kilowatts' ? '1.0' : '1000'}
                  min="0"
                  step={inputs.unit === 'kilowatts' ? '0.1' : '10'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Electrical power input to the motor
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Power ({inputs.unit === 'kilowatts' ? 'kW' : 'W'})
                </label>
                <input
                  type="number"
                  value={inputs.outputPower || ''}
                  onChange={(e) => handleInputChange('outputPower', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder={inputs.unit === 'kilowatts' ? '0.85' : '850'}
                  min="0"
                  step={inputs.unit === 'kilowatts' ? '0.1' : '10'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mechanical power output from the motor
                </p>
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

            {/* Efficiency Message */}
            {result && !error && (
              <div className={`bg-${efficiencyColor}-50 border border-${efficiencyColor}-200 rounded-xl p-4`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">
                    {result.efficiencyRating === 'excellent' ? '✓' : 
                     result.efficiencyRating === 'good' ? '👍' :
                     result.efficiencyRating === 'fair' ? 'ℹ️' : '⚠️'}
                  </span>
                  <div>
                    <h4 className={`font-semibold text-${efficiencyColor}-900 mb-1`}>
                      {result.efficiencyRating.charAt(0).toUpperCase() + result.efficiencyRating.slice(1)} Efficiency
                    </h4>
                    <p className={`text-sm text-${efficiencyColor}-800`}>
                      {efficiencyMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Efficiency Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Efficiency Breakdown
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Efficiency</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.efficiency, 2)}%</div>
                    <div className="text-xs text-green-700 mt-1">Useful power output</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-xs text-red-600 uppercase tracking-wider mb-1 font-semibold">Losses</div>
                    <div className="text-2xl font-bold text-red-900">{formatNumber(result.lossesPercentage, 2)}%</div>
                    <div className="text-xs text-red-700 mt-1">Wasted as heat</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Input Power:</span>
                    <span className="font-semibold text-gray-900">
                      {inputs.inputPower} {inputs.unit === 'kilowatts' ? 'kW' : 'W'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Output Power:</span>
                    <span className="font-semibold text-gray-900">
                      {inputs.outputPower} {inputs.unit === 'kilowatts' ? 'kW' : 'W'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Power Losses:</span>
                    <span className="font-semibold text-red-600">
                      {formatNumber(result.losses, 2)} W
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Efficiency Rating Guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Efficiency Rating Guide
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-16 text-center">
                    <div className="text-lg font-bold text-green-900">≥90%</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-green-900 text-sm">Excellent</div>
                    <div className="text-xs text-green-700">Premium efficiency motor</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-16 text-center">
                    <div className="text-lg font-bold text-blue-900">80-89%</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-blue-900 text-sm">Good</div>
                    <div className="text-xs text-blue-700">High efficiency motor</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-16 text-center">
                    <div className="text-lg font-bold text-yellow-900">70-79%</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-yellow-900 text-sm">Fair</div>
                    <div className="text-xs text-yellow-700">Standard efficiency motor</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-16 text-center">
                    <div className="text-lg font-bold text-red-900">&lt;70%</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-red-900 text-sm">Poor</div>
                    <div className="text-xs text-red-700">Low efficiency, needs attention</div>
                  </div>
                </div>
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
                            {formatNumber(entry.result.efficiency, 2)}% • {entry.result.efficiencyRating.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.inputPower} → {entry.inputs.outputPower} {entry.inputs.unit === 'kilowatts' ? 'kW' : 'W'}
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

      <MotorEfficiencyCalculatorSEO />
      <RelatedTools
        currentTool="motor-efficiency-calculator"
        tools={['electric-motor-power-calculator', 'power-factor-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}
