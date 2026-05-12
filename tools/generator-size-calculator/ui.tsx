"use client";

import { useState, useEffect, useCallback } from "react";
import { GeneratorInputs, GeneratorResult, Appliance, SafetyMargin, PhaseType } from "./types";
import {
  calculateGenerator,
  validateInputs,
  APPLIANCE_PRESETS,
  SYSTEM_PRESETS,
  createAppliance,
  updateApplianceTotalPower,
  getUtilizationStatus,
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
  loadSettings,
  kvaToKw
} from "./logic";
import GeneratorSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function GeneratorSizeCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<GeneratorInputs>({
    appliances: [createAppliance()],
    safetyMargin: (savedSettings.safetyMargin as SafetyMargin) || 0.30,
    powerFactor: savedSettings.powerFactor || 0.8,
    phaseType: (savedSettings.phaseType as PhaseType) || 'single'
  });
  
  const [result, setResult] = useState<GeneratorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const safetyMarginOptions: SafetyMargin[] = [0.10, 0.20, 0.30, 0.50];

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
        const calculatedResult = calculateGenerator(inputs);
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
  }, [inputs.safetyMargin, inputs.powerFactor, inputs.phaseType]);

  const handleApplianceChange = (id: string, field: keyof Appliance, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      appliances: prev.appliances.map(appliance => {
        if (appliance.id === id) {
          const updated = { ...appliance, [field]: value };
          return updateApplianceTotalPower(updated);
        }
        return appliance;
      })
    }));
  };

  const handleAddAppliance = () => {
    setInputs(prev => ({
      ...prev,
      appliances: [...prev.appliances, createAppliance()]
    }));
  };

  const handleRemoveAppliance = (id: string) => {
    setInputs(prev => ({
      ...prev,
      appliances: prev.appliances.filter(a => a.id !== id)
    }));
  };

  const handleApplyPreset = (presetName: string) => {
    const preset = APPLIANCE_PRESETS.find(p => p.name === presetName);
    if (preset) {
      const newAppliance = createAppliance(preset.name, preset.power, 1);
      setInputs(prev => ({
        ...prev,
        appliances: [...prev.appliances, newAppliance]
      }));
    }
  };

  const handleApplySystemPreset = (presetName: string) => {
    const preset = SYSTEM_PRESETS.find(p => p.name === presetName);
    if (preset) {
      const newAppliances = preset.appliances.map(a => 
        createAppliance(a.name, a.power, a.quantity)
      );
      setInputs(prev => ({
        ...prev,
        appliances: newAppliances
      }));
      setShowPresets(false);
    }
  };

  const handleInputChange = (field: keyof GeneratorInputs, value: number | SafetyMargin | PhaseType) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      appliances: [createAppliance()],
      safetyMargin: 0.30,
      powerFactor: 0.8,
      phaseType: 'single'
    });
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Generator: ${result.recommendedSize} kVA (${formatNumber(kvaToKw(result.recommendedSize, inputs.powerFactor), 2)} kW) | Load: ${result.totalLoad}W`;
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
      downloadFile(text, 'generator_size_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'generator_size_calculation.csv');
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

  const utilizationStatus = result ? getUtilizationStatus(result.totalLoad, result.recommendedSize, inputs.powerFactor) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Generator Size Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the appropriate generator capacity (kVA/kW) for your electrical loads. Add appliances and get instant sizing recommendations with safety margin.
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
                    Recommended Generator
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.recommendedSize}
                  </div>
                  <div className="text-xl text-primary-100">
                    kVA
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-primary-100 mb-1 text-sm">Power Rating:</div>
                  <div className="text-3xl font-bold">{formatNumber(kvaToKw(result.recommendedSize, inputs.powerFactor), 2)} kW</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Load:</span>
                    <span className="font-semibold">{result.totalLoad} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adjusted Load:</span>
                    <span className="font-semibold">{formatNumber(result.adjustedLoad, 0)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Required:</span>
                    <span className="font-semibold">{formatNumber(result.requiredKVA, 2)} kVA</span>
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
                  onClick={() => setShowPresets(!showPresets)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📋 {showPresets ? 'Hide' : 'Show'} Presets
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
            
            {/* Appliances Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Appliances
                </h3>
                <button
                  onClick={handleAddAppliance}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  + Add Appliance
                </button>
              </div>
              
              <div className="space-y-3">
                {inputs.appliances.map((appliance, index) => (
                  <div key={appliance.id} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={appliance.name}
                        onChange={(e) => handleApplianceChange(appliance.id, 'name', e.target.value)}
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="Appliance name"
                      />
                      <input
                        type="number"
                        value={appliance.power || ''}
                        onChange={(e) => handleApplianceChange(appliance.id, 'power', parseFloat(e.target.value) || 0)}
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                        placeholder="Power (W)"
                        min="0"
                        step="10"
                      />
                      <input
                        type="number"
                        value={appliance.quantity || ''}
                        onChange={(e) => handleApplianceChange(appliance.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                        placeholder="Qty"
                        min="0"
                        step="1"
                      />
                    </div>
                    {appliance.totalPower > 0 && (
                      <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 min-w-[80px] text-center">
                        {appliance.totalPower}W
                      </div>
                    )}
                    {inputs.appliances.length > 1 && (
                      <button
                        onClick={() => handleRemoveAppliance(appliance.id)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Add Appliances */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Quick add common appliances:</p>
                <div className="flex flex-wrap gap-2">
                  {['LED Bulb', 'Ceiling Fan', 'Refrigerator', 'TV', 'AC (1.5 Ton)', 'Water Pump'].map(name => (
                    <button
                      key={name}
                      onClick={() => handleApplyPreset(name)}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      + {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                System Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Margin: {(inputs.safetyMargin * 100).toFixed(0)}%
                </label>
                <select
                  value={inputs.safetyMargin}
                  onChange={(e) => handleInputChange('safetyMargin', parseFloat(e.target.value) as SafetyMargin)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  {safetyMarginOptions.map(margin => (
                    <option key={margin} value={margin}>
                      {(margin * 100).toFixed(0)}% {margin === 0.30 ? '(Recommended)' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Accounts for surge loads and future expansion
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power Factor: {inputs.powerFactor.toFixed(2)}
                </label>
                <input
                  type="range"
                  value={inputs.powerFactor}
                  onChange={(e) => handleInputChange('powerFactor', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0.6"
                  max="1.0"
                  step="0.05"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.6</span>
                  <span>0.8</span>
                  <span>1.0</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Typical: 0.8 for mixed loads, 1.0 for resistive loads
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase Type
                </label>
                <select
                  value={inputs.phaseType}
                  onChange={(e) => handleInputChange('phaseType', e.target.value as PhaseType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="single">Single Phase</option>
                  <option value="three">Three Phase</option>
                </select>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> kVA = (Total Load × (1 + Safety Margin)) / (1000 × Power Factor)
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

            {/* System Presets */}
            {showPresets && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  System Presets
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SYSTEM_PRESETS.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplySystemPreset(preset.name)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                      <div className="text-xs text-primary font-semibold mt-1">
                        {preset.appliances.length} appliances
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Generator Specifications */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Generator Specifications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Total Load</div>
                    <div className="text-2xl font-bold text-blue-900">{result.totalLoad} W</div>
                    <div className="text-xs text-blue-700 mt-1">{formatNumber(result.totalLoad / 1000, 2)} kW</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Adjusted Load</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.adjustedLoad, 0)} W</div>
                    <div className="text-xs text-green-700 mt-1">With {(inputs.safetyMargin * 100).toFixed(0)}% margin</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Required Capacity</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.requiredKVA, 2)} kVA</div>
                    <div className="text-xs text-purple-700 mt-1">{formatNumber(kvaToKw(result.requiredKVA, inputs.powerFactor), 2)} kW</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1 font-semibold">Recommended Size</div>
                    <div className="text-2xl font-bold text-orange-900">{result.recommendedSize} kVA</div>
                    <div className="text-xs text-orange-700 mt-1">{result.recommendedRange}</div>
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
                            {entry.result.recommendedSize} kVA
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.totalLoad}W load • {entry.inputs.appliances.filter(a => a.power > 0).length} appliances
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

      <GeneratorSizeCalculatorSEO />
      <RelatedTools
        currentTool="generator-size-calculator"
        tools={['solar-inverter-calculator', 'energy-consumption-calculator', 'wire-size-calculator']}
      />
    </>
  );
}
