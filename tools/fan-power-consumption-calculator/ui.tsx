"use client";

import { useState, useEffect, useCallback } from "react";
import { FanConsumptionInputs, FanConsumptionResult, FanType } from "./types";
import {
  calculateFanConsumption,
  validateInputs,
  FAN_PRESETS,
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
import FanPowerConsumptionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FanPowerConsumptionCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<FanConsumptionInputs>({
    power: savedSettings.power || 75,
    hoursPerDay: savedSettings.hoursPerDay || 8,
    daysPerMonth: savedSettings.daysPerMonth || 30,
    tariff: savedSettings.tariff || 0.12,
    fanType: (savedSettings.fanType as FanType) || 'ceiling'
  });
  
  const [result, setResult] = useState<FanConsumptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

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
        const calculatedResult = calculateFanConsumption(inputs);
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

  const handleInputChange = (field: keyof FanConsumptionInputs, value: number | FanType) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      power: 75,
      hoursPerDay: 8,
      daysPerMonth: 30,
      tariff: 0.12,
      fanType: 'ceiling'
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof FAN_PRESETS[0]) => {
    setInputs({
      power: preset.power,
      hoursPerDay: preset.typicalHours,
      daysPerMonth: 30,
      tariff: inputs.tariff,
      fanType: preset.type
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Fan Power: ${inputs.power}W | Monthly: ${formatNumber(result.monthlyEnergy, 2)} kWh | Cost: ${formatNumber(result.monthlyCost, 2)}`;
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
      downloadFile(text, 'fan_power_consumption.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'fan_power_consumption.csv');
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
            <span className="text-2xl">🌀</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Fan Power Consumption Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate electricity consumption and cost for fans. Get instant estimates for daily, monthly, and yearly usage with real-time calculations.
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
                    Monthly Consumption
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.monthlyEnergy, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kWh
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-primary-100 mb-1 text-sm">Monthly Cost:</div>
                  <div className="text-3xl font-bold">${formatNumber(result.monthlyCost, 2)}</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Daily:</span>
                    <span className="font-semibold">{formatNumber(result.dailyEnergy, 3)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Yearly:</span>
                    <span className="font-semibold">{formatNumber(result.yearlyEnergy, 0)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Current Draw:</span>
                    <span className="font-semibold">{formatNumber(result.current, 2)} A</span>
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
                Fan Specifications
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fan Power (Watts)
                </label>
                <input
                  type="number"
                  value={inputs.power || ''}
                  onChange={(e) => handleInputChange('power', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="75"
                  min="0"
                  step="5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical fans use 30-200W. Check fan label or manual.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usage Hours Per Day
                </label>
                <input
                  type="number"
                  value={inputs.hoursPerDay || ''}
                  onChange={(e) => handleInputChange('hoursPerDay', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="8"
                  min="0"
                  max="24"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  24 hours = continuous usage
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days Per Month
                </label>
                <input
                  type="number"
                  value={inputs.daysPerMonth || ''}
                  onChange={(e) => handleInputChange('daysPerMonth', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="30"
                  min="1"
                  max="31"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Electricity Tariff ($ per kWh)
                </label>
                <input
                  type="number"
                  value={inputs.tariff || ''}
                  onChange={(e) => handleInputChange('tariff', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0.12"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Check your electricity bill for exact rate
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Energy (kWh) = (Power × Hours × Days) / 1000
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

            {/* Fan Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Fan Types
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FAN_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.power}W • {preset.typicalHours}h/day
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Cost Breakdown
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Daily</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.dailyEnergy, 3)} kWh</div>
                    <div className="text-sm text-blue-700 mt-1">${formatNumber(result.dailyCost, 2)}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Monthly</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.monthlyEnergy, 2)} kWh</div>
                    <div className="text-sm text-green-700 mt-1">${formatNumber(result.monthlyCost, 2)}</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Yearly</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.yearlyEnergy, 0)} kWh</div>
                    <div className="text-sm text-purple-700 mt-1">${formatNumber(result.yearlyCost, 2)}</div>
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

            {/* Energy Savings Tip */}
            {result && !error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Energy Saving Tip</h4>
                    <p className="text-sm text-yellow-800">
                      {inputs.power > 70 && (
                        <>Consider switching to an energy-efficient BLDC fan (40-50W) to save up to ${formatNumber((result.monthlyCost * 0.4), 2)}/month.</>
                      )}
                      {inputs.power <= 70 && inputs.hoursPerDay > 12 && (
                        <>Reducing usage by 2 hours/day could save approximately ${formatNumber((result.monthlyCost * (2 / inputs.hoursPerDay)), 2)}/month.</>
                      )}
                      {inputs.power <= 70 && inputs.hoursPerDay <= 12 && (
                        <>Your fan usage is already efficient! Regular cleaning can maintain optimal performance.</>
                      )}
                    </p>
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
                            {entry.inputs.power}W • {formatNumber(entry.result.monthlyEnergy, 2)} kWh/month
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.hoursPerDay}h/day • ${formatNumber(entry.result.monthlyCost, 2)}/month
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

      <FanPowerConsumptionCalculatorSEO />
      <RelatedTools
        currentTool="fan-power-consumption-calculator"
        tools={['energy-consumption-calculator', 'electric-bill-calculator', 'power-calculator-electrical']}
      />
    </>
  );
}
