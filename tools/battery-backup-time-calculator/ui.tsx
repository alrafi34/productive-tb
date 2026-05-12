"use client";

import { useState, useEffect, useCallback } from "react";
import { BatteryBackupInputs, BatteryBackupResult } from "./types";
import {
  calculateBackupTime,
  validateInputs,
  getBatteryPresets,
  getLoadPresets,
  getCommonVoltages,
  getLoadSuggestion,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  formatTimeHHMM,
  debounce
} from "./logic";
import BatteryBackupTimeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BatteryBackupTimeCalculatorUI() {
  const [inputs, setInputs] = useState<BatteryBackupInputs>({
    voltage: 12,
    capacity: 100,
    loadPower: 100,
    efficiency: 85,
    depthOfDischarge: 100
  });
  
  const [result, setResult] = useState<BatteryBackupResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const batteryPresets = getBatteryPresets();
  const loadPresets = getLoadPresets();
  const commonVoltages = getCommonVoltages();

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
        const calculatedResult = calculateBackupTime(inputs);
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

  const handleInputChange = (field: keyof BatteryBackupInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      voltage: 12,
      capacity: 100,
      loadPower: 100,
      efficiency: 85,
      depthOfDischarge: 100
    });
    setResult(null);
    setError(null);
    setShowAdvanced(false);
  };

  const handleApplyBatteryPreset = (preset: typeof batteryPresets[0]) => {
    setInputs(prev => ({
      ...prev,
      voltage: preset.voltage,
      capacity: preset.capacity,
      loadPower: preset.loadPower,
      efficiency: preset.efficiency
    }));
  };

  const handleApplyLoadPreset = (preset: typeof loadPresets[0]) => {
    setInputs(prev => ({ ...prev, loadPower: preset.power }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Battery Backup Time: ${formatNumber(result.backupTimeHours, 2)} hours (${result.backupTimeFormatted})`;
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
      downloadFile(text, 'battery_backup_time_calculation.txt');
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

  const loadSuggestion = getLoadSuggestion(inputs.loadPower);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏱️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Battery Backup Time Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate how long your battery will power a load. Perfect for UPS, inverter, solar systems, and backup power planning.
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
                    Backup Time
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.backupTimeHours, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    hours
                  </div>
                  <div className="text-lg text-primary-100 mt-2">
                    ≈ {result.backupTimeFormatted}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Energy:</span>
                    <span className="font-semibold">{formatNumber(result.energyWh, 2)} Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Effective Energy:</span>
                    <span className="font-semibold">{formatNumber(result.effectiveEnergyWh, 2)} Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Current Draw:</span>
                    <span className="font-semibold">{formatNumber(result.currentDraw, 2)} A</span>
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
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ {showAdvanced ? 'Hide' : 'Show'} Advanced
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
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Battery & Load Parameters
              </h3>
              
              {/* Voltage Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Voltage
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.voltage || ''}
                    onChange={(e) => handleInputChange('voltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  {commonVoltages.map((voltage) => (
                    <button
                      key={voltage}
                      onClick={() => handleInputChange('voltage', voltage)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      {voltage}V
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Capacity
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.capacity || ''}
                    onChange={(e) => handleInputChange('capacity', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="10"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    Ah
                  </div>
                </div>
              </div>

              {/* Load Power Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load Power
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.loadPower || ''}
                    onChange={(e) => handleInputChange('loadPower', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="10"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    W
                  </div>
                </div>
                {loadSuggestion && (
                  <p className="mt-2 text-xs text-gray-600 italic">
                    💡 {loadSuggestion}
                  </p>
                )}
              </div>

              {/* Efficiency Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Efficiency: {inputs.efficiency}%
                </label>
                <input
                  type="range"
                  value={inputs.efficiency}
                  onChange={(e) => handleInputChange('efficiency', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="50"
                  max="100"
                  step="1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Depth of Discharge (DoD): {inputs.depthOfDischarge}%
                    </label>
                    <input
                      type="range"
                      value={inputs.depthOfDischarge || 100}
                      onChange={(e) => handleInputChange('depthOfDischarge', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      min="20"
                      max="100"
                      step="5"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>20%</span>
                      <span>60%</span>
                      <span>100%</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      Recommended: Lead Acid 50%, Lithium 80%, LiFePO4 90%
                    </p>
                  </div>
                </div>
              )}

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Time = (V × Ah × Efficiency%) / Load (W)
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

            {/* Load Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Load Types
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {loadPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyLoadPreset(preset)}
                    className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-xs">{preset.name}</div>
                    <div className="text-xs text-primary font-semibold">{preset.power}W</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Battery Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Battery System Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {batteryPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyBatteryPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.voltage}V {preset.capacity}Ah @ {preset.loadPower}W
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

            {/* Energy Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Energy Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Total Energy</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.energyWh, 2)}</div>
                    <div className="text-xs text-blue-700">Wh (Battery capacity)</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Effective Energy</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.effectiveEnergyWh, 2)}</div>
                    <div className="text-xs text-green-700">Wh (After efficiency)</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Current Draw</div>
                    <div className="text-lg font-bold text-purple-900">{formatNumber(result.currentDraw, 2)}</div>
                    <div className="text-xs text-purple-700">A (Amperes)</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">Backup Duration</div>
                    <div className="text-lg font-bold text-orange-900">{result.backupTimeFormatted}</div>
                    <div className="text-xs text-orange-700">{formatNumber(result.backupTimeHours, 2)} hours</div>
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
                            {formatNumber(entry.result.backupTimeHours, 2)} hours
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.voltage}V {entry.inputs.capacity}Ah @ {entry.inputs.loadPower}W
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

      <BatteryBackupTimeCalculatorSEO />
      <RelatedTools
        currentTool="battery-backup-time-calculator"
        tools={['battery-capacity-calculator', 'energy-consumption-calculator', 'power-calculator-electrical', 'voltage-divider-calculator']}
      />
    </>
  );
}
