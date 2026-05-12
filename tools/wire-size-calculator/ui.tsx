"use client";

import { useState, useEffect, useCallback } from "react";
import {
  WireSizeInputs,
  WireSizeResult,
  VoltageType,
  MaterialType,
  PhaseType,
  VoltageDropLimit,
  WireUnit,
} from "./types";
import {
  calculateWireSize,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  getWireSize,
  WIRE_TABLE,
} from "./logic";
import WireSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WireSizeCalculatorUI() {
  const [inputs, setInputs] = useState<WireSizeInputs>({
    current: 20,
    voltage: 230,
    distance: 20,
    material: 'copper',
    phaseType: 'single',
    voltageDropLimit: 3,
    wireUnit: 'mm²',
  });

  const [result, setResult] = useState<WireSizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const calculate = () => {
    setError(null);

    const validationError = validateInputs(inputs);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calculatedResult = calculateWireSize(inputs);
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleInputChange = (field: keyof WireSizeInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      current: 20,
      voltage: 230,
      distance: 20,
      material: 'copper',
      phaseType: 'single',
      voltageDropLimit: 3,
      wireUnit: 'mm²',
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      ...inputs,
      current: preset.current,
      voltage: preset.voltage,
      distance: preset.distance,
      material: preset.material,
      phaseType: preset.phaseType,
      voltageDropLimit: preset.voltageDropLimit,
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Recommended Wire: ${getWireSize(result.recommendedWire, inputs.wireUnit)} (VD: ${formatNumber(result.voltageDropPercentage, 2)}%)`;
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
      downloadFile(text, 'wire_size_calculation.txt');
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
            <span className="text-2xl">🔌</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Wire Size Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the correct electrical wire gauge based on current, voltage, distance, and material. 
                Includes voltage drop analysis and safety recommendations.
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
                    Recommended Wire Size
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {getWireSize(result.recommendedWire, inputs.wireUnit)}
                  </div>
                  <div className="text-sm text-primary-100">
                    {inputs.material === 'copper' ? 'Copper' : 'Aluminum'} • {inputs.phaseType === 'single' ? 'Single Phase' : 'Three Phase'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Voltage Drop:</span>
                    <span className="font-semibold">{formatNumber(result.voltageDropPercentage, 2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Voltage at Load:</span>
                    <span className="font-semibold">{formatNumber(result.voltageAtLoad, 2)} V</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power Loss:</span>
                    <span className="font-semibold">{formatNumber(result.powerLoss, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Status:</span>
                    <span className={`font-semibold ${result.isSafe ? 'text-white' : 'text-yellow-300'}`}>
                      {result.isSafe ? '✓ Safe' : '⚠ Check'}
                    </span>
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

            {/* Alternative Wires */}
            {result && result.alternativeWires.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Alternative Wire Sizes
                </h3>
                <div className="space-y-2">
                  {result.alternativeWires.map((wire, index) => (
                    <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-900 text-sm">
                        {getWireSize(wire, inputs.wireUnit)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Ampacity: {inputs.material === 'copper' ? wire.ampacityCopper : wire.ampacityAluminum}A
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Circuit Parameters
              </h3>
              
              {/* Current */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load Current (Amperes)
                </label>
                <input
                  type="number"
                  value={inputs.current}
                  onChange={(e) => handleInputChange('current', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="20"
                  step="0.1"
                  min="0"
                />
              </div>

              {/* Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Voltage
                </label>
                <select
                  value={inputs.voltage}
                  onChange={(e) => handleInputChange('voltage', parseInt(e.target.value) as VoltageType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={110}>110V (US)</option>
                  <option value={120}>120V (US)</option>
                  <option value={220}>220V (EU/Asia)</option>
                  <option value={230}>230V (EU/Asia)</option>
                  <option value={240}>240V (US Split)</option>
                  <option value={380}>380V (Three Phase)</option>
                  <option value={400}>400V (Three Phase)</option>
                  <option value={415}>415V (Three Phase)</option>
                </select>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cable Length (meters)
                </label>
                <input
                  type="number"
                  value={inputs.distance}
                  onChange={(e) => handleInputChange('distance', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="20"
                  step="0.1"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-2">
                  One-way distance from source to load
                </p>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conductor Material
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('material', 'copper')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.material === 'copper'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Copper
                  </button>
                  <button
                    onClick={() => handleInputChange('material', 'aluminum')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.material === 'aluminum'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Aluminum
                  </button>
                </div>
              </div>

              {/* Phase Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('phaseType', 'single')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.phaseType === 'single'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Single Phase
                  </button>
                  <button
                    onClick={() => handleInputChange('phaseType', 'three')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.phaseType === 'three'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Three Phase
                  </button>
                </div>
              </div>

              {/* Voltage Drop Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Voltage Drop
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((limit) => (
                    <button
                      key={limit}
                      onClick={() => handleInputChange('voltageDropLimit', limit as VoltageDropLimit)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                        inputs.voltageDropLimit === limit
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {limit}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Wire Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Unit
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('wireUnit', 'mm²')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.wireUnit === 'mm²'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    mm² (Metric)
                  </button>
                  <button
                    onClick={() => handleInputChange('wireUnit', 'AWG')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.wireUnit === 'AWG'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    AWG (American)
                  </button>
                </div>
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

            {/* Warnings */}
            {result && result.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Important Warnings</span>
                </h4>
                <ul className="space-y-1">
                  {result.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-800">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Applications
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
                      {preset.current}A • {preset.voltage}V • {preset.distance}m
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

            {/* Wire Table Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Wire Size Reference Table
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">mm²</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">AWG</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Copper (A)</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Aluminum (A)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {WIRE_TABLE.slice(0, 10).map((wire, index) => (
                      <tr 
                        key={index}
                        className={result && wire.sizeMetric === result.recommendedWire.sizeMetric ? 'bg-primary/10' : ''}
                      >
                        <td className="px-3 py-2 text-gray-700">{wire.sizeMetric}</td>
                        <td className="px-3 py-2 text-gray-700">{wire.sizeAWG}</td>
                        <td className="px-3 py-2 text-gray-700">{wire.ampacityCopper}</td>
                        <td className="px-3 py-2 text-gray-700">{wire.ampacityAluminum || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            Wire: {getWireSize(entry.result.recommendedWire, entry.inputs.wireUnit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.current}A • {entry.inputs.voltage}V • {entry.inputs.distance}m • 
                          {entry.inputs.material === 'copper' ? ' Copper' : ' Aluminum'} • 
                          VD: {formatNumber(entry.result.voltageDropPercentage, 2)}%
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

      <WireSizeCalculatorSEO />
      <RelatedTools
        currentTool="wire-size-calculator"
        tools={['voltage-drop-calculator', 'circuit-breaker-calculator', 'power-consumption-calculator']}
      />
    </>
  );
}
