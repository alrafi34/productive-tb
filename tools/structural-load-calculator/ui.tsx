"use client";

import { useState, useEffect } from "react";
import { CalculationType, Unit, StructuralCalculation } from "./types";
import {
  calculateStructuralLoad,
  getCalculationTypeDisplayName,
  getLoadPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber
} from "./logic";
import StructuralLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function StructuralLoadCalculatorUI() {
  const [calculationType, setCalculationType] = useState<CalculationType>("area");
  const [unit, setUnit] = useState<Unit>("metric");
  
  // Area load inputs
  const [area, setArea] = useState("");
  const [deadLoad, setDeadLoad] = useState("");
  const [liveLoad, setLiveLoad] = useState("");
  const [additionalLoad, setAdditionalLoad] = useState("0");
  
  // Beam load inputs
  const [length, setLength] = useState("");
  const [uniformLoad, setUniformLoad] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<StructuralCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    if (calculationType === 'area') {
      const a = parseFloat(area);
      const d = parseFloat(deadLoad);
      const l = parseFloat(liveLoad);
      const ad = parseFloat(additionalLoad) || 0;
      
      if (!isNaN(a) && !isNaN(d) && !isNaN(l) && a > 0 && d >= 0 && l >= 0) {
        const result = calculateStructuralLoad(
          calculationType, unit, a, d, l, ad
        );
        setCalculation(result);
      } else {
        setCalculation(null);
      }
    } else {
      const len = parseFloat(length);
      const load = parseFloat(uniformLoad);
      
      if (!isNaN(len) && !isNaN(load) && len > 0 && load > 0) {
        const result = calculateStructuralLoad(
          calculationType, unit, undefined, undefined, undefined, undefined, len, load
        );
        setCalculation(result);
      } else {
        setCalculation(null);
      }
    }
  }, [calculationType, area, deadLoad, liveLoad, additionalLoad, length, uniformLoad, unit]);

  const handleReset = () => {
    setArea("");
    setDeadLoad("");
    setLiveLoad("");
    setAdditionalLoad("0");
    setLength("");
    setUniformLoad("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    if (calculationType === 'area') {
      setArea("100");
      setDeadLoad(unit === 'metric' ? "3" : "50");
      setLiveLoad(unit === 'metric' ? "2" : "40");
      setAdditionalLoad("0");
    } else {
      setLength("5");
      setUniformLoad(unit === 'metric' ? "2" : "100");
    }
  };

  const handleCalculationTypeChange = (type: CalculationType) => {
    setCalculationType(type);
    setCalculation(null);
  };

  const handleApplyPreset = (preset: any) => {
    setDeadLoad(preset.deadLoad.toString());
    setLiveLoad(preset.liveLoad.toString());
    setAdditionalLoad(preset.additionalLoad.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Load: ${formatNumber(calculation.totalLoad)} ${calculation.unit === 'metric' ? 'kN' : 'lbs'}`;
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

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'structural_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'structural_load_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: StructuralCalculation) => {
    setCalculationType(calc.calculationType);
    setUnit(calc.unit);
    
    if (calc.calculationType === 'area') {
      setArea(calc.area!.toString());
      setDeadLoad(calc.deadLoad!.toString());
      setLiveLoad(calc.liveLoad!.toString());
      setAdditionalLoad(calc.additionalLoad!.toString());
    } else {
      setLength(calc.length!.toString());
      setUniformLoad(calc.uniformLoad!.toString());
    }
    
    setShowHistory(false);
  };

  const loadPresets = getLoadPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Structural Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate structural loads for beams and slabs. Estimate dead load, live load, and total load with instant results and load breakdown.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
                <select
                  value={calculationType}
                  onChange={(e) => handleCalculationTypeChange(e.target.value as CalculationType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="area">Area Load (Floor/Slab)</option>
                  <option value="beam">Beam Load (Linear)</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "metric"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "imperial"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Imperial
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={handleUseDefaults}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ Use Default Values
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
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Load
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalLoad)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {calculation.unit === 'metric' ? 'kilonewtons (kN)' : 'pounds (lbs)'}
                  </div>
                </div>

                {calculation.calculationType === 'area' && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Dead Load:</span>
                      <span className="font-semibold">{formatNumber(calculation.deadLoadContribution!)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Live Load:</span>
                      <span className="font-semibold">{formatNumber(calculation.liveLoadContribution!)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Additional:</span>
                      <span className="font-semibold">{formatNumber(calculation.additionalLoadContribution!)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}</span>
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
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {calculationType === 'area' ? 'Area Load Parameters' : 'Beam Load Parameters'}
              </h3>
              
              {calculationType === 'area' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area ({unit === 'metric' ? 'm²' : 'sq ft'})
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dead Load ({unit === 'metric' ? 'kN/m²' : 'psf'})
                    </label>
                    <input
                      type="number"
                      value={deadLoad}
                      onChange={(e) => setDeadLoad(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'metric' ? '3' : '50'}
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Self-weight of structure
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Load ({unit === 'metric' ? 'kN/m²' : 'psf'})
                    </label>
                    <input
                      type="number"
                      value={liveLoad}
                      onChange={(e) => setLiveLoad(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'metric' ? '2' : '40'}
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Occupants, furniture, movable items
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Load ({unit === 'metric' ? 'kN/m²' : 'psf'})
                    </label>
                    <input
                      type="number"
                      value={additionalLoad}
                      onChange={(e) => setAdditionalLoad(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional (partitions, finishes)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit === 'metric' ? 'm' : 'ft'})
                    </label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uniform Load ({unit === 'metric' ? 'kN/m' : 'lb/ft'})
                    </label>
                    <input
                      type="number"
                      value={uniformLoad}
                      onChange={(e) => setUniformLoad(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'metric' ? '2' : '100'}
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Load per unit length
                    </p>
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {
                      calculationType === 'area' 
                        ? 'Total Load = Area × (Dead Load + Live Load + Additional Load)' 
                        : 'Total Load = Length × Uniform Load'
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Load Presets (only for area load) */}
            {calculationType === 'area' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Load Presets
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {loadPresets.map((preset, index) => (
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
            )}

            {/* Load Breakdown (only for area load) */}
            {calculation && calculation.calculationType === 'area' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Load Breakdown
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Dead Load Contribution</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(calculation.deadLoadContribution!)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(calculation.deadLoadContribution! / calculation.totalLoad) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Live Load Contribution</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(calculation.liveLoadContribution!)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(calculation.liveLoadContribution! / calculation.totalLoad) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Additional Load Contribution</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(calculation.additionalLoadContribution!)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(calculation.additionalLoadContribution! / calculation.totalLoad) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Load</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.totalLoad)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}</div>
                  </div>
                  {calculation.calculationType === 'area' && (
                    <>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</div>
                        <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.area!)} {calculation.unit === 'metric' ? 'm²' : 'sq ft'}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dead Load</div>
                        <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.deadLoad!)} {calculation.unit === 'metric' ? 'kN/m²' : 'psf'}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Live Load</div>
                        <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.liveLoad!)} {calculation.unit === 'metric' ? 'kN/m²' : 'psf'}</div>
                      </div>
                    </>
                  )}
                  {calculation.calculationType === 'beam' && (
                    <>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Length</div>
                        <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.length!)} {calculation.unit === 'metric' ? 'm' : 'ft'}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Uniform Load</div>
                        <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.uniformLoad!)} {calculation.unit === 'metric' ? 'kN/m' : 'lb/ft'}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export Text
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
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
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {entry.calculation.calculationType === 'area' ? 'Area Load' : 'Beam Load'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Total: {formatNumber(entry.calculation.totalLoad)} {entry.calculation.unit === 'metric' ? 'kN' : 'lbs'}
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

      <StructuralLoadCalculatorSEO />
      <RelatedTools
        currentTool="structural-load-calculator"
        tools={['beam-load-calculator', 'slab-load-calculator', 'column-load-calculator']}
      />
    </>
  );
}
