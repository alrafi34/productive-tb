"use client";

import { useState, useEffect, useCallback } from "react";
import { SolarBatteryInputs, SolarBatteryResult, SystemVoltage } from "./types";
import {
  calculateSolarBattery,
  validateInputs,
  BATTERY_PRESETS,
  getRecommendedVoltage,
  getDoDWarning,
  getSystemRecommendation,
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
import SolarBatteryCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SolarBatteryCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<SolarBatteryInputs>({
    dailyLoad: savedSettings.dailyLoad || 5,
    backupDays: savedSettings.backupDays || 2,
    systemVoltage: (savedSettings.systemVoltage as SystemVoltage) || 24,
    batteryEfficiency: savedSettings.batteryEfficiency || 0.85,
    depthOfDischarge: savedSettings.depthOfDischarge || 0.80
  });
  
  const [result, setResult] = useState<SolarBatteryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const voltageOptions: SystemVoltage[] = [12, 24, 48];

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
        const calculatedResult = calculateSolarBattery(inputs);
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

  const handleInputChange = (field: keyof SolarBatteryInputs, value: number | SystemVoltage) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      dailyLoad: 5,
      backupDays: 2,
      systemVoltage: 24,
      batteryEfficiency: 0.85,
      depthOfDischarge: 0.80
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof BATTERY_PRESETS[0]) => {
    setInputs(prev => ({
      ...prev,
      dailyLoad: preset.dailyLoad,
      backupDays: preset.backupDays,
      systemVoltage: preset.systemVoltage
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Battery: ${formatNumber(result.batteryCapacityAh, 0)} Ah | ${inputs.systemVoltage}V | ${formatNumber(result.totalStoredEnergykWh, 1)} kWh`;
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
      downloadFile(text, 'solar_battery_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'solar_battery_calculation.csv');
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

  const dodWarning = getDoDWarning(inputs.depthOfDischarge);
  const recommendedVoltage = getRecommendedVoltage(inputs.dailyLoad);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔋</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Solar Battery Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate required battery capacity for solar systems. Get instant estimates based on daily load, backup duration, and system specifications.
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
                    Battery Capacity
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.batteryCapacityAh, 0)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Ah
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-primary-100 mb-1 text-sm">System Voltage:</div>
                  <div className="text-3xl font-bold">{inputs.systemVoltage}V</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Stored Energy:</span>
                    <span className="font-semibold">{formatNumber(result.totalStoredEnergykWh, 1)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Batteries Needed:</span>
                    <span className="font-semibold">{result.recommendedBatteries} × 200Ah</span>
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
                System Requirements
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Energy Load (kWh)
                </label>
                <input
                  type="number"
                  value={inputs.dailyLoad || ''}
                  onChange={(e) => handleInputChange('dailyLoad', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="5"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical home: 3-10 kWh/day
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Duration (Days)
                </label>
                <input
                  type="number"
                  value={inputs.backupDays || ''}
                  onChange={(e) => handleInputChange('backupDays', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="2"
                  min="1"
                  max="10"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  How many days of backup power needed
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
                    💡 Recommended: {recommendedVoltage}V for {inputs.dailyLoad} kWh/day
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Efficiency: {(inputs.batteryEfficiency * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  value={inputs.batteryEfficiency}
                  onChange={(e) => handleInputChange('batteryEfficiency', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0.70"
                  max="0.95"
                  step="0.05"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>70%</span>
                  <span>85%</span>
                  <span>95%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Lithium: 90-95% | Lead-acid: 70-85%
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Depth of Discharge (DoD): {(inputs.depthOfDischarge * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  value={inputs.depthOfDischarge}
                  onChange={(e) => handleInputChange('depthOfDischarge', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0.50"
                  max="0.90"
                  step="0.10"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>70%</span>
                  <span>90%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Higher DoD = more usable capacity, shorter lifespan
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Capacity (Ah) = (Load × Days × 1000) / (Voltage × Efficiency × DoD)
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

            {/* DoD Warning */}
            {dodWarning && !error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Depth of Discharge Notice</h4>
                    <p className="text-sm text-yellow-800">{dodWarning}</p>
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
                {BATTERY_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.dailyLoad} kWh/day • {preset.backupDays} days • {preset.systemVoltage}V
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Battery Bank Configurations */}
            {result && !error && result.batteryBankConfig.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Battery Bank Configurations
                </h3>
                
                <div className="space-y-2">
                  {result.batteryBankConfig.map((config, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">Option {index + 1}:</span>
                        <span className="text-gray-700 text-sm">{config}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Energy Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Energy Breakdown
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Total Energy</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.totalEnergyWh / 1000, 1)} kWh</div>
                    <div className="text-xs text-blue-700 mt-1">Required energy</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Usable Energy</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.usableEnergyWh / 1000, 1)} kWh</div>
                    <div className="text-xs text-green-700 mt-1">After efficiency & DoD</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Stored Energy</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.totalStoredEnergykWh, 1)} kWh</div>
                    <div className="text-xs text-purple-700 mt-1">Total battery capacity</div>
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
                            {formatNumber(entry.result.batteryCapacityAh, 0)} Ah • {entry.inputs.systemVoltage}V
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.dailyLoad} kWh/day • {entry.inputs.backupDays} days backup
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

      <SolarBatteryCalculatorSEO />
      <RelatedTools
        currentTool="solar-battery-calculator"
        tools={['solar-panel-calculator', 'battery-capacity-calculator', 'solar-inverter-calculator']}
      />
    </>
  );
}
