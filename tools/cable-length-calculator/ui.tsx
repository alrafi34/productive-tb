"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CableLengthInputs,
  CableLengthResult,
  DistanceUnit,
  CableType,
  InstallationType,
} from "./types";
import {
  calculateCableLength,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
  getCableTypeLabel,
  getInstallationTypeLabel,
  getRecommendedSlack,
} from "./logic";
import CableLengthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CableLengthCalculatorUI() {
  const [inputs, setInputs] = useState<CableLengthInputs>({
    distance: 20,
    distanceUnit: 'm',
    slackPercent: 10,
    bends: 2,
    cableType: 'electrical',
    installationType: 'straight',
    bendAllowance: 0.5,
  });

  const [result, setResult] = useState<CableLengthResult | null>(null);
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
      const calculatedResult = calculateCableLength(inputs);
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleInputChange = (field: keyof CableLengthInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      distance: 20,
      distanceUnit: 'm',
      slackPercent: 10,
      bends: 2,
      cableType: 'electrical',
      installationType: 'straight',
      bendAllowance: 0.5,
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      distance: preset.distance,
      distanceUnit: preset.distanceUnit,
      slackPercent: preset.slackPercent,
      bends: preset.bends,
      cableType: preset.cableType,
      installationType: preset.installationType,
      bendAllowance: 0.5,
    });
  };

  const handleUseRecommendedSlack = () => {
    const recommended = getRecommendedSlack(inputs.cableType);
    handleInputChange('slackPercent', recommended);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Total Cable Length: ${formatNumber(result.totalLength, 2)} m (${formatNumber(result.totalLengthFeet, 2)} ft)`;
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
      downloadFile(text, 'cable_length_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'cable_length_calculation.csv', 'text/csv');
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
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Cable Length Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate accurate cable length for electrical, Ethernet, and fiber installations. 
                Includes slack, bend allowances, and installation factors.
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
                    Total Cable Length
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.totalLength, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    meters
                  </div>
                  <div className="text-sm text-primary-100 mt-2">
                    {formatNumber(result.totalLengthFeet, 2)} feet
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Distance:</span>
                    <span className="font-semibold">{formatNumber(result.baseDistance, 2)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slack Added:</span>
                    <span className="font-semibold">{formatNumber(result.slackLength, 2)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Bend Allowance:</span>
                    <span className="font-semibold">{formatNumber(result.bendAllowance, 2)} m</span>
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
                      📄 Export Text
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
                Cable Parameters
              </h3>
              
              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cable Distance
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={inputs.distance}
                    onChange={(e) => handleInputChange('distance', parseFloat(e.target.value) || 0)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="20"
                    step="0.1"
                    min="0"
                  />
                  <select
                    value={inputs.distanceUnit}
                    onChange={(e) => handleInputChange('distanceUnit', e.target.value as DistanceUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="m">Meters (m)</option>
                    <option value="ft">Feet (ft)</option>
                  </select>
                </div>
              </div>

              {/* Cable Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cable Type
                </label>
                <select
                  value={inputs.cableType}
                  onChange={(e) => handleInputChange('cableType', e.target.value as CableType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="electrical">Electrical Power</option>
                  <option value="ethernet">Ethernet (Cat5e/6)</option>
                  <option value="fiber">Fiber Optic</option>
                  <option value="coaxial">Coaxial</option>
                </select>
              </div>

              {/* Installation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Installation Type
                </label>
                <select
                  value={inputs.installationType}
                  onChange={(e) => handleInputChange('installationType', e.target.value as InstallationType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="straight">Straight Run</option>
                  <option value="conduit">In Conduit</option>
                  <option value="wall">Wall Routing</option>
                  <option value="underground">Underground</option>
                  <option value="overhead">Overhead</option>
                </select>
              </div>

              {/* Slack Percentage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Slack / Extra Length
                  </label>
                  <button
                    onClick={handleUseRecommendedSlack}
                    className="text-xs text-primary hover:text-primary-dark font-medium"
                  >
                    Use Recommended ({getRecommendedSlack(inputs.cableType)}%)
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="range"
                    value={inputs.slackPercent}
                    onChange={(e) => handleInputChange('slackPercent', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    min="0"
                    max="50"
                    step="1"
                  />
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={inputs.slackPercent}
                      onChange={(e) => handleInputChange('slackPercent', parseFloat(e.target.value) || 0)}
                      className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center font-mono"
                      min="0"
                      max="50"
                      step="1"
                    />
                    <span className="text-sm text-gray-600">% extra length</span>
                  </div>
                </div>
              </div>

              {/* Number of Bends */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bends / Turns
                </label>
                <input
                  type="number"
                  value={inputs.bends}
                  onChange={(e) => handleInputChange('bends', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="2"
                  min="0"
                  step="1"
                />
              </div>

              {/* Bend Allowance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bend Allowance (meters per bend)
                </label>
                <input
                  type="number"
                  value={inputs.bendAllowance}
                  onChange={(e) => handleInputChange('bendAllowance', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0.5"
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Typical: 0.3-0.5m per 90° bend
                </p>
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

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>Recommendations</span>
                </h4>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-yellow-800">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Scenarios
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
                      {preset.distance}{preset.distanceUnit} • {preset.slackPercent}% slack • {preset.bends} bends
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Breakdown
                </h3>
                
                <div className="space-y-3">
                  {result.breakdown.map((line, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-700">{line.split(':')[0]}:</span>
                      <span className="text-sm font-semibold text-gray-900">{line.split(':')[1]}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Final Total:</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {formatNumber(result.totalLength, 2)} m
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatNumber(result.totalLengthFeet, 2)} ft
                      </div>
                    </div>
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
                            Total: {formatNumber(entry.result.totalLength, 2)} m
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.distance}{entry.inputs.distanceUnit} • 
                          {getCableTypeLabel(entry.inputs.cableType)} • 
                          {entry.inputs.slackPercent}% slack • 
                          {entry.inputs.bends} bends
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

      <CableLengthCalculatorSEO />
      <RelatedTools
        currentTool="cable-length-calculator"
        tools={['wire-size-calculator', 'voltage-drop-calculator', 'circuit-breaker-calculator']}
      />
    </>
  );
}
