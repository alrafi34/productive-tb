"use client";

import { useState, useEffect, useCallback } from "react";
import { SolarInverterInputs, SolarInverterResult, SystemVoltage, SafetyFactor } from "./types";
import {
  calculateSolarInverter,
  validateInputs,
  INVERTER_PRESETS,
  getRecommendedVoltage,
  getUtilizationStatus,
  getSystemRecommendation,
  getEfficiencyRecommendation,
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
import SolarInverterCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SolarInverterCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<SolarInverterInputs>({
    totalLoad: savedSettings.totalLoad || 1000,
    systemVoltage: (savedSettings.systemVoltage as SystemVoltage) || 24,
    efficiency: savedSettings.efficiency || 0.90,
    safetyFactor: (savedSettings.safetyFactor as SafetyFactor) || 1.2
  });
  
  const [result, setResult] = useState<SolarInverterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const voltageOptions: SystemVoltage[] = [12, 24, 48];
  const safetyFactorOptions: SafetyFactor[] = [1.2, 1.5, 2.0];

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
        const calculatedResult = calculateSolarInverter(inputs);
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

  const handleInputChange = (field: keyof SolarInverterInputs, value: number | SystemVoltage | SafetyFactor) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      totalLoad: 1000,
      systemVoltage: 24,
      efficiency: 0.90,
      safetyFactor: 1.2
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof INVERTER_PRESETS[0]) => {
    setInputs(prev => ({
      ...prev,
      totalLoad: preset.totalLoad,
      systemVoltage: preset.systemVoltage
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Inverter: ${result.recommendedStandardSize} VA (${formatNumber(result.inverterSizeKW, 2)} kW) | ${inputs.systemVoltage}V`;
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
      downloadFile(text, 'solar_inverter_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'solar_inverter_calculation.csv');
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

  const recommendedVoltage = getRecommendedVoltage(inputs.totalLoad);
  const utilizationStatus = result ? getUtilizationStatus(result.utilizationPercent) : null;
  const efficiencyRecommendation = getEfficiencyRecommendation(inputs.efficiency);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Solar Inverter Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the appropriate inverter size (VA/kW) for your solar system based on load, voltage, and efficiency. Get instant sizing recommendations.
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
                    Recommended Inverter
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.recommendedStandardSize}
                  </div>
                  <div className="text-xl text-primary-100">
                    VA
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-primary-100 mb-1 text-sm">Power Rating:</div>
                  <div className="text-3xl font-bold">{formatNumber(result.inverterSizeKW, 2)} kW</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">System Voltage:</span>
                    <span className="font-semibold">{inputs.systemVoltage}V</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Current Draw:</span>
                    <span className="font-semibold">{formatNumber(result.current, 2)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Load Utilization:</span>
                    <span className="font-semibold">{formatNumber(result.utilizationPercent, 1)}%</span>
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
                System Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Load (Watts)
                </label>
                <input
                  type="number"
                  value={inputs.totalLoad || ''}
                  onChange={(e) => handleInputChange('totalLoad', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1000"
                  min="0"
                  step="50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Total power consumption of all appliances
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Voltage
                </label>
                <select
                  value={inputs.systemVoltage}
                  onChange={(e) => handleInputChange('systemVoltage', parseInt(e.target.value) as SystemVoltage)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-lg"
                >
                  {voltageOptions.map(voltage => (
                    <option key={voltage} value={voltage}>{voltage}V</option>
                  ))}
                </select>
                {inputs.systemVoltage !== recommendedVoltage && (
                  <p className="text-xs text-orange-600 mt-1">
                    💡 Recommended: {recommendedVoltage}V for {inputs.totalLoad}W load
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inverter Efficiency: {(inputs.efficiency * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  value={inputs.efficiency}
                  onChange={(e) => handleInputChange('efficiency', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0.80"
                  max="0.98"
                  step="0.01"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>80%</span>
                  <span>90%</span>
                  <span>98%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Pure sine wave: 90-95% | Modified sine: 80-85%
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Factor
                </label>
                <select
                  value={inputs.safetyFactor}
                  onChange={(e) => handleInputChange('safetyFactor', parseFloat(e.target.value) as SafetyFactor)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-lg"
                >
                  {safetyFactorOptions.map(factor => (
                    <option key={factor} value={factor}>
                      {factor}x {factor === 1.2 ? '(Recommended)' : factor === 1.5 ? '(Heavy Load)' : '(Future Expansion)'}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Accounts for surge loads and future expansion
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Inverter Size (VA) = (Load × Safety Factor) / Efficiency
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

            {/* Utilization Status */}
            {result && !error && utilizationStatus && (
              <div className={`bg-${utilizationStatus.color}-50 border border-${utilizationStatus.color}-200 rounded-xl p-4`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">
                    {utilizationStatus.status === 'Optimal' ? '✓' : 
                     utilizationStatus.status === 'Overloaded' ? '⚠️' : 'ℹ️'}
                  </span>
                  <div>
                    <h4 className={`font-semibold text-${utilizationStatus.color}-900 mb-1`}>
                      {utilizationStatus.status} Load Utilization
                    </h4>
                    <p className={`text-sm text-${utilizationStatus.color}-800`}>
                      {utilizationStatus.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Efficiency Recommendation */}
            {efficiencyRecommendation && !error && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Efficiency Notice</h4>
                    <p className="text-sm text-blue-800">{efficiencyRecommendation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* System Recommendation */}
            {result && !error && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">System Recommendation</h4>
                    <p className="text-sm text-blue-800">
                      {getSystemRecommendation(inputs, result)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INVERTER_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.totalLoad}W • {preset.systemVoltage}V
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Inverter Specifications */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Inverter Specifications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Calculated Size</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.inverterSizeVA, 0)} VA</div>
                    <div className="text-xs text-blue-700 mt-1">Minimum required</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Standard Size</div>
                    <div className="text-2xl font-bold text-green-900">{result.recommendedStandardSize} VA</div>
                    <div className="text-xs text-green-700 mt-1">Recommended model</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Power Rating</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.inverterSizeKW, 2)} kW</div>
                    <div className="text-xs text-purple-700 mt-1">Kilowatt equivalent</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1 font-semibold">Current Draw</div>
                    <div className="text-2xl font-bold text-orange-900">{formatNumber(result.current, 2)} A</div>
                    <div className="text-xs text-orange-700 mt-1">From battery</div>
                  </div>
                </div>
              </div>
            )}

            {/* Load Analysis */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Load Analysis
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Actual Load:</span>
                    <span className="font-semibold text-gray-900">{inputs.totalLoad} W</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Adjusted Load (with safety factor):</span>
                    <span className="font-semibold text-gray-900">{formatNumber(result.adjustedLoad, 0)} W</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Inverter Capacity:</span>
                    <span className="font-semibold text-gray-900">{result.recommendedStandardSize} VA</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Load Utilization:</span>
                      <span className="font-bold text-primary">{formatNumber(result.utilizationPercent, 1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          result.utilizationPercent > 95 ? 'bg-red-500' :
                          result.utilizationPercent > 80 ? 'bg-orange-500' :
                          result.utilizationPercent >= 50 ? 'bg-green-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(result.utilizationPercent, 100)}%` }}
                      />
                    </div>
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
                            {entry.result.recommendedStandardSize} VA • {entry.inputs.systemVoltage}V
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.totalLoad}W load • {formatNumber(entry.result.inverterSizeKW, 2)} kW
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

      <SolarInverterCalculatorSEO />
      <RelatedTools
        currentTool="solar-inverter-calculator"
        tools={['solar-panel-calculator', 'solar-battery-calculator', 'battery-capacity-calculator']}
      />
    </>
  );
}
