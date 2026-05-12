"use client";

import { useState, useEffect, useCallback } from "react";
import { VoltageDropInputs, VoltageDropResult, SystemType, WireMaterial, WireSize } from "./types";
import {
  calculateVoltageDrop,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  getWireSizes,
  saveSettings,
  loadSettings
} from "./logic";
import VoltageDropCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function VoltageDropCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<VoltageDropInputs>({
    systemType: (savedSettings.systemType as SystemType) || 'single',
    voltage: savedSettings.voltage || 230,
    current: savedSettings.current || 10,
    length: savedSettings.length || 20,
    wireSize: (savedSettings.wireSize as WireSize) || 2.5,
    material: (savedSettings.material as WireMaterial) || 'copper',
    temperature: savedSettings.temperature || 20
  });
  
  const [result, setResult] = useState<VoltageDropResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();
  const wireSizes = getWireSizes();

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
        const calculatedResult = calculateVoltageDrop(inputs);
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

  const handleInputChange = (field: keyof VoltageDropInputs, value: number | SystemType | WireMaterial | WireSize) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      systemType: 'single',
      voltage: 230,
      current: 10,
      length: 20,
      wireSize: 2.5,
      material: 'copper',
      temperature: 20
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      systemType: preset.systemType,
      voltage: preset.voltage,
      current: preset.current,
      length: preset.length,
      wireSize: preset.wireSize,
      material: preset.material,
      temperature: inputs.temperature
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Voltage Drop: ${formatNumber(result.voltageDrop, 2)}V (${formatNumber(result.voltageDropPercentage, 2)}%)`;
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
      downloadFile(text, 'voltage_drop_calculation.txt');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'acceptable': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-50 border-green-200';
      case 'acceptable': return 'bg-yellow-50 border-yellow-200';
      case 'poor': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Voltage Drop Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate voltage loss across electrical wires based on current, length, wire size, and material. Ensure safe and efficient electrical installations.
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
                    Voltage Drop
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.voltageDrop, 2)}V
                  </div>
                  <div className="text-xl text-primary-100">
                    {formatNumber(result.voltageDropPercentage, 2)}%
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Final Voltage:</span>
                    <span className="font-semibold">{formatNumber(result.finalVoltage, 2)} V</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power Loss:</span>
                    <span className="font-semibold">{formatNumber(result.powerLoss, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Resistance:</span>
                    <span className="font-semibold">{formatNumber(result.resistance * 1000, 2)} mΩ</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-primary-100 mb-1">
                    <span>Drop %</span>
                    <span>{formatNumber(result.voltageDropPercentage, 1)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        result.status === 'good' ? 'bg-green-400' :
                        result.status === 'acceptable' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(result.voltageDropPercentage * 10, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-primary-100 mt-1">
                    <span>0%</span>
                    <span>5%</span>
                    <span>10%</span>
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

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* System Type Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                System Type
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleInputChange('systemType', 'single')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    inputs.systemType === 'single'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Single Phase
                </button>
                <button
                  onClick={() => handleInputChange('systemType', 'three')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    inputs.systemType === 'three'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Three Phase
                </button>
                <button
                  onClick={() => handleInputChange('systemType', 'dc')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    inputs.systemType === 'dc'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  DC
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Circuit Parameters
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voltage (V)
                  </label>
                  <input
                    type="number"
                    value={inputs.voltage}
                    onChange={(e) => handleInputChange('voltage', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="230"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current (A)
                  </label>
                  <input
                    type="number"
                    value={inputs.current}
                    onChange={(e) => handleInputChange('current', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cable Length (m)
                  </label>
                  <input
                    type="number"
                    value={inputs.length}
                    onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="20"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wire Size (mm²)
                  </label>
                  <select
                    value={inputs.wireSize}
                    onChange={(e) => handleInputChange('wireSize', parseFloat(e.target.value) as WireSize)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    {wireSizes.map(size => (
                      <option key={size} value={size}>{size} mm²</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material
                  </label>
                  <select
                    value={inputs.material}
                    onChange={(e) => handleInputChange('material', e.target.value as WireMaterial)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="copper">Copper</option>
                    <option value="aluminum">Aluminum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={inputs.temperature}
                    onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value) || 20)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="20"
                    step="1"
                  />
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {result.formula}
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

            {/* Status Display */}
            {result && !error && (
              <div className={`border rounded-xl p-4 ${getStatusBgColor(result.status)}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {result.status === 'good' ? '✓' : result.status === 'acceptable' ? '⚠️' : '⚠️'}
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${getStatusColor(result.status)}`}>
                      {result.statusMessage}
                    </h3>
                    {result.suggestion && (
                      <p className="text-sm text-gray-700">{result.suggestion}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Configurations
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
                            Drop: {formatNumber(entry.result.voltageDrop, 2)}V ({formatNumber(entry.result.voltageDropPercentage, 2)}%)
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.voltage}V • {entry.inputs.current}A • {entry.inputs.length}m • {entry.inputs.wireSize}mm²
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

      <VoltageDropCalculatorSEO />
      <RelatedTools
        currentTool="voltage-drop-calculator"
        tools={['voltage-divider-calculator', 'energy-consumption-calculator', 'fuse-rating-calculator']}
      />
    </>
  );
}
