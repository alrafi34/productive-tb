"use client";

import { useState, useEffect, useCallback } from "react";
import { Appliance, LoadCalculatorInputs, LoadCalculatorResult } from "./types";
import {
  calculateLoad,
  validateInputs,
  getAppliancePresets,
  createEmptyAppliance,
  calculateApplianceTotal,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  saveAppliances,
  loadAppliances,
  getPresetConfigurations
} from "./logic";
import HouseWiringLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HouseWiringLoadCalculatorUI() {
  const [appliances, setAppliances] = useState<Appliance[]>(() => {
    const saved = loadAppliances();
    return saved.length > 0 ? saved : [createEmptyAppliance()];
  });
  
  const [voltage, setVoltage] = useState(220);
  const [diversityFactor, setDiversityFactor] = useState(0.8);
  const [result, setResult] = useState<LoadCalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const appliancePresets = getAppliancePresets();
  const presetConfigurations = getPresetConfigurations();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const inputs: LoadCalculatorInputs = {
        appliances,
        voltage,
        diversityFactor
      };
      
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = calculateLoad(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [appliances, voltage, diversityFactor]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [appliances, voltage, diversityFactor, debouncedCalculate]);

  // Save appliances when they change
  useEffect(() => {
    saveAppliances(appliances);
  }, [appliances]);

  const handleAddAppliance = () => {
    setAppliances([...appliances, createEmptyAppliance()]);
  };

  const handleRemoveAppliance = (id: string) => {
    if (appliances.length > 1) {
      setAppliances(appliances.filter(a => a.id !== id));
    }
  };

  const handleApplianceChange = (id: string, field: keyof Appliance, value: string | number) => {
    setAppliances(appliances.map(appliance => {
      if (appliance.id === id) {
        const updated = { ...appliance, [field]: value };
        return calculateApplianceTotal(updated);
      }
      return appliance;
    }));
  };

  const handleApplyPreset = (presetName: string, presetWattage: number) => {
    // Find first empty appliance or add new one
    const emptyIndex = appliances.findIndex(a => !a.name && a.wattage === 0);
    
    if (emptyIndex >= 0) {
      handleApplianceChange(appliances[emptyIndex].id, 'name', presetName);
      handleApplianceChange(appliances[emptyIndex].id, 'wattage', presetWattage);
    } else {
      const newAppliance = createEmptyAppliance();
      newAppliance.name = presetName;
      newAppliance.wattage = presetWattage;
      newAppliance.quantity = 1;
      setAppliances([...appliances, calculateApplianceTotal(newAppliance)]);
    }
    
    setShowPresets(false);
  };

  const handleApplyConfiguration = (config: typeof presetConfigurations[0]) => {
    const newAppliances = config.appliances.map(a => {
      const appliance = createEmptyAppliance();
      appliance.name = a.name;
      appliance.quantity = a.quantity;
      appliance.wattage = a.wattage;
      return calculateApplianceTotal(appliance);
    });
    
    setAppliances(newAppliances);
  };

  const handleReset = () => {
    setAppliances([createEmptyAppliance()]);
    setVoltage(220);
    setDiversityFactor(0.8);
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Total Load: ${formatNumber(result.totalLoad)}W | Current: ${formatNumber(result.current)}A | Breaker: ${result.recommendedBreaker}A`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const inputs: LoadCalculatorInputs = { appliances, voltage, diversityFactor };
      saveToHistory(inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(appliances);
    downloadFile(csv, 'house_wiring_load.csv');
  };

  const handleExportText = () => {
    if (result) {
      const inputs: LoadCalculatorInputs = { appliances, voltage, diversityFactor };
      const text = exportToText(inputs, result);
      downloadFile(text, 'house_wiring_load_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setAppliances(entry.inputs.appliances);
    setVoltage(entry.inputs.voltage);
    setDiversityFactor(entry.inputs.diversityFactor);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏠</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">House Wiring Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate total electrical load for your house by adding appliances. Get instant recommendations for circuit breakers and wiring capacity.
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
                    Total Load
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.totalLoad, 0)}W
                  </div>
                  <div className="text-xl text-primary-100">
                    {formatNumber(result.totalLoad / 1000, 2)} kW
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adjusted Load:</span>
                    <span className="font-semibold">{formatNumber(result.adjustedLoad, 0)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Current:</span>
                    <span className="font-semibold">{formatNumber(result.current, 2)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Recommended Breaker:</span>
                    <span className="font-semibold text-2xl">{result.recommendedBreaker}A</span>
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

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voltage (V)
                </label>
                <select
                  value={voltage}
                  onChange={(e) => setVoltage(parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="110">110V (US)</option>
                  <option value="220">220V (EU/Asia)</option>
                  <option value="230">230V (UK)</option>
                  <option value="240">240V (AU)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diversity Factor: {diversityFactor}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.05"
                  value={diversityFactor}
                  onChange={(e) => setDiversityFactor(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5 (Conservative)</span>
                  <span>1.0 (All On)</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Accounts for not all appliances running simultaneously
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📦 {showPresets ? 'Hide' : 'Show'} Appliance Library
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Reset All
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                <button
                  onClick={handleExportCSV}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
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
            
            {/* Appliances Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Appliances & Loads
                </h3>
                <button
                  onClick={handleAddAppliance}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                >
                  + Add Appliance
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Appliance Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wattage
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total (W)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appliances.map((appliance) => (
                      <tr key={appliance.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={appliance.name}
                            onChange={(e) => handleApplianceChange(appliance.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            placeholder="e.g., LED Bulb"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={appliance.quantity}
                            onChange={(e) => handleApplianceChange(appliance.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={appliance.wattage}
                            onChange={(e) => handleApplianceChange(appliance.id, 'wattage', parseInt(e.target.value) || 0)}
                            className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900">{appliance.total}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleRemoveAppliance(appliance.id)}
                            disabled={appliances.length === 1}
                            className="text-red-600 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

            {/* Preset Configurations */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Start Configurations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {presetConfigurations.map((config, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyConfiguration(config)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">{config.name}</div>
                    <div className="text-xs text-gray-600">{config.description}</div>
                    <div className="text-xs text-primary font-semibold mt-2">
                      {config.appliances.length} appliances
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Appliance Library */}
            {showPresets && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Appliance Library
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                  {appliancePresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplyPreset(preset.name, preset.wattage)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-xs">{preset.name}</div>
                      <div className="text-xs text-primary font-semibold mt-1">{preset.wattage}W</div>
                    </button>
                  ))}
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
                            {formatNumber(entry.result.totalLoad, 0)}W • {entry.result.recommendedBreaker}A Breaker
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.appliances.filter(a => a.quantity > 0 && a.wattage > 0).length} appliances • {entry.inputs.voltage}V
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

      <HouseWiringLoadCalculatorSEO />
      <RelatedTools
        currentTool="house-wiring-load-calculator"
        tools={['fuse-rating-calculator', 'voltage-drop-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}
