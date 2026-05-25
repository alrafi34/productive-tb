"use client";

import { useState, useEffect, useCallback } from "react";
import { HeatsinkInputs, HeatsinkResult, CalculationMode } from "./types";
import {
  calculateHeatsink,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  HistoryEntry
} from "./logic";
import HeatsinkCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HeatsinkCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('thermal-resistance');
  const [inputs, setInputs] = useState<HeatsinkInputs>({
    mode: 'thermal-resistance',
    powerDissipation: 10,
    ambientTemp: 25,
    maxJunctionTemp: 85,
    precision: 2
  });
  
  const [result, setResult] = useState<HeatsinkResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const presets = getPresets(mode);

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
        const calculatedResult = calculateHeatsink(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    
    if (newMode === 'thermal-resistance') {
      setInputs({ 
        mode: newMode, 
        powerDissipation: 10, 
        ambientTemp: 25, 
        maxJunctionTemp: 85, 
        precision: 2 
      });
    } else {
      setInputs({ 
        mode: newMode, 
        powerDissipation: 10, 
        ambientTemp: 25, 
        maxJunctionTemp: 85, 
        thermalResistance: 5,
        precision: 2 
      });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof HeatsinkInputs, value: number | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'thermal-resistance') {
      setInputs({ 
        mode, 
        powerDissipation: 10, 
        ambientTemp: 25, 
        maxJunctionTemp: 85, 
        precision: 2 
      });
    } else {
      setInputs({ 
        mode, 
        powerDissipation: 10, 
        ambientTemp: 25, 
        maxJunctionTemp: 85, 
        thermalResistance: 5,
        precision: 2 
      });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    const newInputs: HeatsinkInputs = { 
      mode,
      precision: inputs.precision,
      powerDissipation: preset.powerDissipation,
      ambientTemp: preset.ambientTemp,
      maxJunctionTemp: preset.maxJunctionTemp,
    };

    if ('thermalResistance' in preset) {
      newInputs.thermalResistance = preset.thermalResistance;
    }

    setInputs(newInputs);
  };

  const handleCopy = () => {
    if (result) {
      let text = "";
      if (result.requiredThermalResistance !== undefined) {
        text = `Required Thermal Resistance: ${formatNumber(result.requiredThermalResistance, inputs.precision)} °C/W`;
      } else if (result.actualJunctionTemp !== undefined) {
        text = `Junction Temperature: ${formatNumber(result.actualJunctionTemp, inputs.precision)} °C (${result.safetyStatus.toUpperCase()})`;
      }
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
      downloadFile(text, 'heatsink_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setMode(entry.inputs.mode);
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getModeLabel = (m: CalculationMode) => {
    switch (m) {
      case 'thermal-resistance': return 'Calculate Required Thermal Resistance';
      case 'temperature-check': return 'Verify Junction Temperature';
    }
  };

  const getSafetyColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSafetyBgColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getCoolingIcon = (type: string) => {
    switch (type) {
      case 'passive': return '🌡️';
      case 'active': return '🌀';
      case 'liquid': return '💧';
      default: return '🌡️';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌡️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Heatsink Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate heatsink thermal resistance and cooling requirements for electronic components. Estimate required heatsink size and verify thermal design for optimal performance.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-6">
            
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    {mode === 'thermal-resistance' ? 'Required Thermal Resistance' : 'Junction Temperature'}
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {mode === 'thermal-resistance' 
                      ? formatNumber(result.requiredThermalResistance!, inputs.precision)
                      : formatNumber(result.actualJunctionTemp!, inputs.precision)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === 'thermal-resistance' ? '°C/W' : '°C'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Safety Status:</span>
                    <span className="font-semibold uppercase">{result.safetyStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cooling Type:</span>
                    <span className="font-semibold flex items-center gap-1">
                      {getCoolingIcon(result.coolingType)} {result.coolingType.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power:</span>
                    <span className="font-semibold">{result.powerDissipation} W</span>
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

          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleModeChange('thermal-resistance')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'thermal-resistance'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Calculate Thermal Resistance</div>
                  <div className="text-xs opacity-80">Find required heatsink specs</div>
                </button>
                <button
                  onClick={() => handleModeChange('temperature-check')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'temperature-check'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Verify Temperature</div>
                  <div className="text-xs opacity-80">Check existing heatsink</div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Thermal Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power Dissipation (W)
                </label>
                <input
                  type="number"
                  value={inputs.powerDissipation || ''}
                  onChange={(e) => handleInputChange('powerDissipation', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="10"
                  step="0.1"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Heat generated by the component</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ambient Temperature (°C)
                </label>
                <input
                  type="number"
                  value={inputs.ambientTemp || ''}
                  onChange={(e) => handleInputChange('ambientTemp', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="25"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Environmental temperature around the heatsink</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Junction Temperature (°C)
                </label>
                <input
                  type="number"
                  value={inputs.maxJunctionTemp || ''}
                  onChange={(e) => handleInputChange('maxJunctionTemp', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="85"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Maximum safe operating temperature of the component</p>
              </div>

              {mode === 'temperature-check' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heatsink Thermal Resistance (°C/W)
                  </label>
                  <input
                    type="number"
                    value={inputs.thermalResistance || ''}
                    onChange={(e) => handleInputChange('thermalResistance', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Thermal resistance of your heatsink (from datasheet)</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimal Precision
                </label>
                <select
                  value={inputs.precision}
                  onChange={(e) => handleInputChange('precision', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="1">1 decimal place</option>
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                </select>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {mode === 'thermal-resistance' ? 'θ = ΔT / P' : 'Tj = Ta + (P × θ)'}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {result && result.warning && !error && (
              <div className={`rounded-xl border p-4 ${getSafetyBgColor(result.safetyStatus)}`}>
                <div className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">
                    {result.safetyStatus === 'safe' ? 'ℹ️' : result.safetyStatus === 'warning' ? '⚠️' : '🚨'}
                  </span>
                  <span className={`font-medium ${getSafetyColor(result.safetyStatus)}`}>{result.warning}</span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Examples
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.powerDissipation}W • {preset.maxJunctionTemp}°C max
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Thermal Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Temperature Difference</div>
                    <div className="text-2xl font-bold text-blue-900">{result.temperatureDifference}°C</div>
                    <div className="text-xs text-blue-700">Available thermal headroom</div>
                  </div>
                  <div className={`p-4 rounded-lg border ${getSafetyBgColor(result.safetyStatus)}`}>
                    <div className={`text-xs uppercase tracking-wider mb-1 font-semibold ${getSafetyColor(result.safetyStatus)}`}>Safety Status</div>
                    <div className={`text-2xl font-bold ${getSafetyColor(result.safetyStatus)}`}>{result.safetyStatus.toUpperCase()}</div>
                    <div className={`text-xs ${getSafetyColor(result.safetyStatus)}`}>Thermal design status</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">Heatsink Recommendation:</div>
                  <div className="text-sm text-gray-700">{result.heatsinkRecommendation}</div>
                </div>
              </div>
            )}

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
                            {getModeLabel(entry.result.mode)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.powerDissipation}W • {entry.result.safetyStatus.toUpperCase()} • {entry.result.coolingType}
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

      <HeatsinkCalculatorSEO />
      <RelatedTools
        currentTool="heatsink-calculator"
        tools={['heat-dissipation-calculator', 'power-loss-calculator', 'electrical-efficiency-calculator', 'power-density-calculator']}
      />
    </>
  );
}