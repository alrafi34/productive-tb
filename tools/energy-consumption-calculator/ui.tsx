"use client";

import { useState, useEffect, useCallback } from "react";
import { ApplianceInput, EnergyCalculation } from "./types";
import {
  createDefaultAppliance,
  performCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  calculatePercentage,
  generateId,
  APPLIANCE_PRESETS,
  debounce,
  calculateApplianceEnergy,
} from "./logic";
import EnergyConsumptionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function EnergyConsumptionCalculatorUI() {
  const [appliances, setAppliances] = useState<ApplianceInput[]>([createDefaultAppliance()]);
  const [calculation, setCalculation] = useState<EnergyCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      const result = performCalculation(appliances);
      setCalculation(result);
    }, 150),
    [appliances]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [appliances, debouncedCalculate]);

  const handleFieldChange = (id: string, field: keyof ApplianceInput, value: string | number) => {
    setAppliances(prev =>
      prev.map(a => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleAddAppliance = () => {
    setAppliances(prev => [...prev, createDefaultAppliance()]);
  };

  const handleRemoveAppliance = (id: string) => {
    if (appliances.length <= 1) return;
    setAppliances(prev => prev.filter(a => a.id !== id));
  };

  const handleApplyPreset = (id: string, presetKey: string) => {
    const preset = APPLIANCE_PRESETS[presetKey];
    if (!preset) return;
    
    setAppliances(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              name: preset.name,
              power: preset.power,
              hours: preset.typicalHours,
              minutes: 0,
            }
          : a
      )
    );
  };

  const handleReset = () => {
    setAppliances([createDefaultAppliance()]);
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Energy: ${formatNumber(calculation.totalEnergy, 3)} kWh\nTotal Cost: $${formatNumber(calculation.totalCost, 2)}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      saveToHistory(calculation);
      setHistory(getHistory());
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'energy_consumption.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'energy_consumption.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: EnergyCalculation) => {
    setAppliances(calc.appliances);
    setShowHistory(false);
  };

  const activeAppliances = appliances.filter(a => a.power > 0 && (a.hours > 0 || a.minutes > 0));
  const hasData = calculation && calculation.totalEnergy > 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Energy Consumption Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate electricity usage in kWh and estimate costs. Add multiple appliances, get instant results, and export detailed reports.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={handleAddAppliance}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  ➕ Add Appliance
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset All
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
            </div>

            {/* Result Display */}
            {hasData && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Energy Consumption
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalEnergy, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kWh per day
                  </div>
                </div>

                {calculation.totalCost > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-primary-100 mb-1 text-sm">Estimated Cost:</div>
                    <div className="text-2xl font-bold">${formatNumber(calculation.totalCost, 2)}</div>
                    <div className="text-sm text-primary-100">per day</div>
                  </div>
                )}

                {calculation.highestConsumer && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="text-primary-100 mb-1">Highest Consumer:</div>
                    <div className="font-semibold">{calculation.highestConsumer.name}</div>
                    <div className="text-primary-100 text-xs mt-1">
                      {formatNumber(calculation.highestConsumer.energy, 2)} kWh 
                      ({formatNumber(calculatePercentage(calculation.highestConsumer.energy, calculation.totalEnergy), 1)}%)
                    </div>
                  </div>
                )}

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

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Appliances Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Appliances
              </h3>
              
              <div className="space-y-4">
                {appliances.map((appliance) => (
                  <div key={appliance.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={appliance.name}
                        onChange={(e) => handleFieldChange(appliance.id, 'name', e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        placeholder="Appliance name"
                      />
                      {appliances.length > 1 && (
                        <button
                          onClick={() => handleRemoveAppliance(appliance.id)}
                          className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Power (Watts)</label>
                        <input
                          type="number"
                          value={appliance.power || ""}
                          onChange={(e) => handleFieldChange(appliance.id, 'power', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                          placeholder="100"
                          min="0"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                        <input
                          type="number"
                          value={appliance.quantity || ""}
                          onChange={(e) => handleFieldChange(appliance.id, 'quantity', parseFloat(e.target.value) || 1)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                          placeholder="1"
                          min="1"
                          step="1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Hours</label>
                        <input
                          type="number"
                          value={appliance.hours || ""}
                          onChange={(e) => handleFieldChange(appliance.id, 'hours', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                          placeholder="5"
                          min="0"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Minutes</label>
                        <input
                          type="number"
                          value={appliance.minutes || ""}
                          onChange={(e) => handleFieldChange(appliance.id, 'minutes', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                          placeholder="0"
                          min="0"
                          max="59"
                          step="1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Electricity Rate ($ per kWh)
                      </label>
                      <input
                        type="number"
                        value={appliance.rate || ""}
                        onChange={(e) => handleFieldChange(appliance.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                        placeholder="0.12"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quick Presets</label>
                      <select
                        onChange={(e) => handleApplyPreset(appliance.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        value=""
                      >
                        <option value="">Select preset...</option>
                        {Object.entries(APPLIANCE_PRESETS).map(([key, preset]) => (
                          <option key={key} value={key}>
                            {preset.name} ({preset.power}W)
                          </option>
                        ))}
                      </select>
                    </div>

                    {(appliance.power > 0 && (appliance.hours > 0 || appliance.minutes > 0)) && (
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Energy:</span>
                          <span className="text-lg font-bold text-primary">
                            {formatNumber(calculateApplianceEnergy(appliance), 3)} kWh
                          </span>
                        </div>
                        {appliance.rate && appliance.rate > 0 && (
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-medium text-gray-700">Cost:</span>
                            <span className="text-lg font-bold text-green-600">
                              ${formatNumber(calculateApplianceEnergy(appliance) * appliance.rate, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Energy Breakdown */}
            {hasData && activeAppliances.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Energy Breakdown
                </h3>
                
                <div className="space-y-3">
                  {activeAppliances.map((appliance) => {
                    const energy = calculateApplianceEnergy(appliance);
                    const percentage = calculatePercentage(energy, calculation.totalEnergy);
                    return (
                      <div key={appliance.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{appliance.name}</span>
                          <span className="text-sm text-gray-600">
                            {formatNumber(energy, 2)} kWh ({formatNumber(percentage, 1)}%)
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Projections */}
            {hasData && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Usage Projections
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Daily</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(calculation.dailyEnergy, 2)} kWh</div>
                    {calculation.dailyCost > 0 && (
                      <div className="text-sm text-blue-700 mt-1">${formatNumber(calculation.dailyCost, 2)}</div>
                    )}
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Monthly</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(calculation.monthlyEnergy, 0)} kWh</div>
                    {calculation.monthlyCost > 0 && (
                      <div className="text-sm text-green-700 mt-1">${formatNumber(calculation.monthlyCost, 2)}</div>
                    )}
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Yearly</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(calculation.yearlyEnergy, 0)} kWh</div>
                    {calculation.yearlyCost > 0 && (
                      <div className="text-sm text-purple-700 mt-1">${formatNumber(calculation.yearlyCost, 2)}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Summary Table */}
            {hasData && activeAppliances.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Appliance</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Power</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Qty</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Energy (kWh)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {activeAppliances.map((appliance) => {
                        const energy = calculateApplianceEnergy(appliance);
                        return (
                          <tr key={appliance.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{appliance.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-right font-mono">
                              {appliance.power}W
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-right font-mono">
                              {appliance.hours}h {appliance.minutes}m
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-right font-mono">
                              {appliance.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-primary text-right">
                              {formatNumber(energy, 3)}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-primary/5 font-bold">
                        <td colSpan={4} className="px-4 py-3 text-sm text-gray-900">Total</td>
                        <td className="px-4 py-3 text-sm text-primary text-right">
                          {formatNumber(calculation.totalEnergy, 3)} kWh
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {hasData && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export TXT
                </button>
              </div>
            )}

            {/* Info Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Energy consumption calculations are based on the formula: Energy (kWh) = (Power × Time) ÷ 1000. 
                Actual consumption may vary based on appliance efficiency, voltage fluctuations, and usage patterns. 
                Check your electricity bill for your exact rate per kWh.
              </p>
            </div>

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
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {formatNumber(entry.calculation.totalEnergy, 2)} kWh
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.appliances.filter(a => a.power > 0 && (a.hours > 0 || a.minutes > 0)).length} appliances
                          {entry.calculation.totalCost > 0 && ` • $${formatNumber(entry.calculation.totalCost, 2)}`}
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

      <EnergyConsumptionCalculatorSEO />
      <RelatedTools
        currentTool="energy-consumption-calculator"
        tools={['ohms-law-calculator', 'power-calculator-electrical', 'electric-bill-calculator']}
      />
    </>
  );
}
