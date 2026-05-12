"use client";

import { useState, useEffect, useCallback } from "react";
import { SolarPanelInputs, SolarPanelResult, PanelWattage } from "./types";
import {
  calculateSolarPanel,
  validateInputs,
  SOLAR_PRESETS,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
  saveSettings,
  loadSettings,
  getOffsetStatusColor,
  getOffsetStatusBgColor,
  getRecommendation
} from "./logic";
import SolarPanelCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SolarPanelCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<SolarPanelInputs>({
    monthlyUsage: savedSettings.monthlyUsage || 600,
    sunHours: savedSettings.sunHours || 5,
    panelWattage: (savedSettings.panelWattage as PanelWattage) || 400,
    systemEfficiency: savedSettings.systemEfficiency || 0.80,
    electricityRate: savedSettings.electricityRate || 0.12
  });
  
  const [result, setResult] = useState<SolarPanelResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const panelWattageOptions: PanelWattage[] = [250, 300, 350, 400, 450, 500];

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
        const calculatedResult = calculateSolarPanel(inputs);
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

  const handleInputChange = (field: keyof SolarPanelInputs, value: number | PanelWattage) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      monthlyUsage: 600,
      sunHours: 5,
      panelWattage: 400,
      systemEfficiency: 0.80,
      electricityRate: 0.12
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof SOLAR_PRESETS[0]) => {
    setInputs(prev => ({
      ...prev,
      monthlyUsage: preset.monthlyUsage,
      sunHours: preset.sunHours
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Solar System: ${formatNumber(result.systemSizeKW, 2)} kW | ${result.panelsNeeded} panels | Offset: ${formatNumber(result.offsetPercentage, 0)}%`;
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
      downloadFile(text, 'solar_panel_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'solar_panel_calculation.csv');
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
            <span className="text-2xl">☀️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Solar Panel Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate solar system size, number of panels needed, and energy production. Get instant estimates based on your electricity usage and location.
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
                    System Size
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.systemSizeKW, 1)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kW
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-primary-100 mb-1 text-sm">Panels Needed:</div>
                  <div className="text-3xl font-bold">{result.panelsNeeded}</div>
                  <div className="text-sm text-primary-100 mt-1">{inputs.panelWattage}W panels</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Monthly Production:</span>
                    <span className="font-semibold">{formatNumber(result.monthlyProduction, 0)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Energy Offset:</span>
                    <span className="font-semibold">{formatNumber(result.offsetPercentage, 0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Roof Space:</span>
                    <span className="font-semibold">{result.roofSpaceRequired} m²</span>
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
                Energy Requirements
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity Usage (kWh)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyUsage || ''}
                  onChange={(e) => handleInputChange('monthlyUsage', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="600"
                  min="0"
                  step="50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Average home: 300-800 kWh/month
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Sun Hours Per Day: {inputs.sunHours}h
                </label>
                <input
                  type="range"
                  value={inputs.sunHours}
                  onChange={(e) => handleInputChange('sunHours', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="2"
                  max="8"
                  step="0.5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2h</span>
                  <span>5h</span>
                  <span>8h</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Varies by location and season
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Panel Wattage
                </label>
                <select
                  value={inputs.panelWattage}
                  onChange={(e) => handleInputChange('panelWattage', parseInt(e.target.value) as PanelWattage)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-lg"
                >
                  {panelWattageOptions.map(wattage => (
                    <option key={wattage} value={wattage}>{wattage}W</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Efficiency: {(inputs.systemEfficiency * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  value={inputs.systemEfficiency}
                  onChange={(e) => handleInputChange('systemEfficiency', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0.70"
                  max="0.90"
                  step="0.01"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>70%</span>
                  <span>80%</span>
                  <span>90%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Accounts for losses (shading, temperature, inverter)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Electricity Rate ($ per kWh) - Optional
                </label>
                <input
                  type="number"
                  value={inputs.electricityRate || ''}
                  onChange={(e) => handleInputChange('electricityRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0.12"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">
                  For cost savings calculation
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> System Size (kW) = Daily Usage / (Sun Hours × Efficiency)
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

            {/* Offset Status */}
            {result && !error && (
              <div className={`border rounded-xl p-4 ${getOffsetStatusBgColor(result.offsetPercentage)}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {result.offsetPercentage >= 100 ? '✓' : result.offsetPercentage >= 80 ? '👍' : '⚠️'}
                  </span>
                  <div>
                    <h4 className={`font-semibold mb-1 ${getOffsetStatusColor(result.offsetPercentage)}`}>
                      {result.offsetPercentage >= 100 ? 'Full Coverage' : result.offsetPercentage >= 80 ? 'Good Coverage' : 'Partial Coverage'}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {getRecommendation(result)}
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
                {SOLAR_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.monthlyUsage} kWh/month • {preset.sunHours}h sun
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Production Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Energy Production
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Daily</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.dailyProduction, 1)} kWh</div>
                    <div className="text-xs text-blue-700 mt-1">Per day average</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Monthly</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.monthlyProduction, 0)} kWh</div>
                    <div className="text-xs text-green-700 mt-1">Per month average</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Yearly</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.yearlyProduction, 0)} kWh</div>
                    <div className="text-xs text-purple-700 mt-1">Per year total</div>
                  </div>
                </div>
              </div>
            )}

            {/* Environmental Impact */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Environmental Impact
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌍</span>
                      <div className="text-xs text-green-600 uppercase tracking-wider font-semibold">CO2 Reduction</div>
                    </div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.co2Savings, 0)} kg</div>
                    <div className="text-xs text-green-700 mt-1">Per year</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌳</span>
                      <div className="text-xs text-green-600 uppercase tracking-wider font-semibold">Trees Equivalent</div>
                    </div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.co2Savings / 21, 0)}</div>
                    <div className="text-xs text-green-700 mt-1">Trees planted</div>
                  </div>
                </div>
              </div>
            )}

            {/* Cost Savings */}
            {result && !error && result.monthlySavings && result.yearlySavings && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Cost Savings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-xs text-yellow-600 uppercase tracking-wider mb-1 font-semibold">Monthly</div>
                    <div className="text-2xl font-bold text-yellow-900">${formatNumber(result.monthlySavings, 2)}</div>
                    <div className="text-xs text-yellow-700 mt-1">Estimated savings</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-xs text-yellow-600 uppercase tracking-wider mb-1 font-semibold">Yearly</div>
                    <div className="text-2xl font-bold text-yellow-900">${formatNumber(result.yearlySavings, 2)}</div>
                    <div className="text-xs text-yellow-700 mt-1">Estimated savings</div>
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
                            {formatNumber(entry.result.systemSizeKW, 1)} kW • {entry.result.panelsNeeded} panels
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.monthlyUsage} kWh/month • {formatNumber(entry.result.offsetPercentage, 0)}% offset
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

      <SolarPanelCalculatorSEO />
      <RelatedTools
        currentTool="solar-panel-calculator"
        tools={['solar-battery-calculator', 'solar-inverter-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}
