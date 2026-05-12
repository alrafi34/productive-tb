"use client";

import { useState, useEffect, useCallback } from "react";
import { CapacityUnit, BatteryChargingInputs, BatteryChargingResult } from "./types";
import {
  calculateChargingTime,
  validateInputs,
  getChargingPresets,
  getCommonCurrents,
  getChargingSpeedDescription,
  getEfficiencyRecommendation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  formatTimeHHMM,
  debounce
} from "./logic";
import BatteryChargingTimeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BatteryChargingTimeCalculatorUI() {
  const [inputs, setInputs] = useState<BatteryChargingInputs>({
    capacity: 4000,
    capacityUnit: 'mAh',
    chargingCurrent: 2,
    efficiency: 85,
    startPercentage: 0,
    endPercentage: 100,
    voltage: undefined
  });
  
  const [result, setResult] = useState<BatteryChargingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const chargingPresets = getChargingPresets();
  const commonCurrents = getCommonCurrents();

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
        const calculatedResult = calculateChargingTime(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 120),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleInputChange = (field: keyof BatteryChargingInputs, value: number | CapacityUnit | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      capacity: 4000,
      capacityUnit: 'mAh',
      chargingCurrent: 2,
      efficiency: 85,
      startPercentage: 0,
      endPercentage: 100,
      voltage: undefined
    });
    setResult(null);
    setError(null);
    setShowAdvanced(false);
  };

  const handleApplyPreset = (preset: typeof chargingPresets[0]) => {
    setInputs(prev => ({
      ...prev,
      capacity: preset.capacity,
      capacityUnit: preset.capacityUnit,
      chargingCurrent: preset.chargingCurrent,
      efficiency: preset.efficiency
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Charging Time: ${formatNumber(result.chargingTimeHours, 2)} hours (${result.chargingTimeFormatted})`;
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
      downloadFile(text, 'battery_charging_time_calculation.txt');
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

  const efficiencyRecommendation = getEfficiencyRecommendation(inputs.capacityUnit);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔌</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Battery Charging Time Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate how long it takes to charge your battery. Perfect for phones, laptops, car batteries, power banks, and more.
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
                    Charging Time
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.chargingTimeHours, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    hours
                  </div>
                  <div className="text-lg text-primary-100 mt-2">
                    ≈ {result.chargingTimeFormatted}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Effective Capacity:</span>
                    <span className="font-semibold">{formatNumber(result.effectiveCapacityAh, 3)} Ah</span>
                  </div>
                  {result.energyWh > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Energy Required:</span>
                      <span className="font-semibold">{formatNumber(result.energyWh, 2)} Wh</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Charging Speed:</span>
                    <span className="font-semibold">{getChargingSpeedDescription(result.chargingTimeHours)}</span>
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
                Battery & Charger Parameters
              </h3>
              
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
                    placeholder="4000"
                    min="0"
                    step="100"
                  />
                  <select
                    value={inputs.capacityUnit}
                    onChange={(e) => handleInputChange('capacityUnit', e.target.value as CapacityUnit)}
                    className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700"
                  >
                    <option value="mAh">mAh</option>
                    <option value="Ah">Ah</option>
                  </select>
                </div>
              </div>

              {/* Charging Current Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charging Current
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.chargingCurrent || ''}
                    onChange={(e) => handleInputChange('chargingCurrent', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    A
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {commonCurrents.map((current) => (
                    <button
                      key={current}
                      onClick={() => handleInputChange('chargingCurrent', current)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      {current}A
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-600 italic">
                  💡 Typical phone charger: 1-3A
                </p>
              </div>

              {/* Efficiency Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charging Efficiency: {inputs.efficiency}%
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
                <p className="mt-2 text-xs text-gray-600">
                  {efficiencyRecommendation}
                </p>
              </div>

              {/* Charge Range Sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Level: {inputs.startPercentage}%
                  </label>
                  <input
                    type="range"
                    value={inputs.startPercentage}
                    onChange={(e) => handleInputChange('startPercentage', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    min="0"
                    max="100"
                    step="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Level: {inputs.endPercentage}%
                  </label>
                  <input
                    type="range"
                    value={inputs.endPercentage}
                    onChange={(e) => handleInputChange('endPercentage', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    min="0"
                    max="100"
                    step="5"
                  />
                </div>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Voltage (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.voltage || ''}
                        onChange={(e) => handleInputChange('voltage', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="3.7"
                        min="0"
                        step="0.1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        V
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      Used to calculate energy in Wh. Common: 3.7V (Li-ion), 12V (car)
                    </p>
                  </div>
                </div>
              )}

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Time = (Capacity × Range%) / (Current × Efficiency%)
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
                Common Device Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chargingPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.capacity} {preset.capacityUnit} @ {preset.chargingCurrent}A
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

            {/* Charging Analysis */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Charging Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Charging Time</div>
                    <div className="text-lg font-bold text-blue-900">{result.chargingTimeFormatted}</div>
                    <div className="text-xs text-blue-700">{formatNumber(result.chargingTimeHours, 2)} hours</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Effective Capacity</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.effectiveCapacityAh, 3)}</div>
                    <div className="text-xs text-green-700">Ah to charge</div>
                  </div>
                  {result.energyWh > 0 && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Energy Required</div>
                      <div className="text-lg font-bold text-purple-900">{formatNumber(result.energyWh, 2)}</div>
                      <div className="text-xs text-purple-700">Wh (Watt-hours)</div>
                    </div>
                  )}
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">Charging Speed</div>
                    <div className="text-lg font-bold text-orange-900">{getChargingSpeedDescription(result.chargingTimeHours)}</div>
                    <div className="text-xs text-orange-700">Classification</div>
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
                            {formatNumber(entry.result.chargingTimeHours, 2)} hours
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.capacity} {entry.inputs.capacityUnit} @ {entry.inputs.chargingCurrent}A
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

      <BatteryChargingTimeCalculatorSEO />
      <RelatedTools
        currentTool="battery-charging-time-calculator"
        tools={['battery-capacity-calculator', 'battery-backup-time-calculator', 'energy-consumption-calculator', 'power-calculator-electrical']}
      />
    </>
  );
}
