"use client";

import { useState, useEffect } from "react";
import { Unit, FootingType, FootingCalculation } from "./types";
import {
  calculateFootingSize,
  getFootingPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getUnitLabels,
  validateFooting
} from "./logic";
import FootingSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FootingSizeCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [load, setLoad] = useState("");
  const [bearingCapacity, setBearingCapacity] = useState("");
  const [factorOfSafety, setFactorOfSafety] = useState("1.5");
  const [footingType, setFootingType] = useState<FootingType>("square");
  const [lengthWidthRatio, setLengthWidthRatio] = useState("1.5");
  
  // Results
  const [calculation, setCalculation] = useState<FootingCalculation | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate footing in real-time
  useEffect(() => {
    const loadNum = parseFloat(load);
    const capacityNum = parseFloat(bearingCapacity);
    const fosNum = parseFloat(factorOfSafety);
    const ratioNum = parseFloat(lengthWidthRatio);
    
    if (!isNaN(loadNum) && !isNaN(capacityNum) && !isNaN(fosNum) && 
        loadNum > 0 && capacityNum > 0 && fosNum > 0) {
      const result = calculateFootingSize(
        loadNum,
        capacityNum,
        fosNum,
        footingType,
        ratioNum,
        unit
      );
      setCalculation(result);
      
      if (result) {
        const validationWarnings = validateFooting(result);
        setWarnings(validationWarnings);
      }
    } else {
      setCalculation(null);
      setWarnings([]);
    }
  }, [load, bearingCapacity, factorOfSafety, footingType, lengthWidthRatio, unit]);

  const handleReset = () => {
    setLoad("");
    setBearingCapacity("");
    setFactorOfSafety("1.5");
    setFootingType("square");
    setLengthWidthRatio("1.5");
    setCalculation(null);
    setWarnings([]);
  };

  const handleUseDefaults = () => {
    setLoad(unit === 'metric' ? "100" : "22481");
    setBearingCapacity(unit === 'metric' ? "100" : "2088");
    setFactorOfSafety("1.5");
    setFootingType("square");
  };

  const handleApplyPreset = (preset: { load: number; bearingCapacity: number }) => {
    setLoad(preset.load.toString());
    setBearingCapacity(preset.bearingCapacity.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const units = getUnitLabels(calculation.unit);
      const text = `Footing Size: ${formatNumber(calculation.length)} ${units.length} × ${formatNumber(calculation.width)} ${units.length}\nArea: ${formatNumber(calculation.requiredArea)} ${units.area}`;
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
      downloadFile(text, 'footing_size_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'footing_size_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: FootingCalculation) => {
    setLoad(calc.load.toString());
    setBearingCapacity(calc.bearingCapacity.toString());
    setFactorOfSafety(calc.factorOfSafety.toString());
    setFootingType(calc.footingType);
    if (calc.footingType === 'rectangular') {
      setLengthWidthRatio(calc.lengthWidthRatio.toString());
    }
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const footingPresets = getFootingPresets();
  const units = getUnitLabels(unit);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Footing Size Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate required footing dimensions based on structural load and soil bearing capacity. Get instant results with accurate engineering formulas.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
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

              {/* Footing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Footing Type</label>
                <select
                  value={footingType}
                  onChange={(e) => setFootingType(e.target.value as FootingType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="square">Square Footing</option>
                  <option value="rectangular">Rectangular Footing</option>
                </select>
              </div>

              {/* Factor of Safety */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Factor of Safety
                </label>
                <input
                  type="number"
                  value={factorOfSafety}
                  onChange={(e) => setFactorOfSafety(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1.5"
                  min="1"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical: 1.5 - 2.5
                </p>
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
                    Required Footing Size
                  </p>
                  <div className="text-3xl font-bold mb-1">
                    {formatNumber(calculation.length)} × {formatNumber(calculation.width)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {units.length}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Required Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.requiredArea)} {units.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Length:</span>
                    <span className="font-semibold">{formatNumber(calculation.length)} {units.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Width:</span>
                    <span className="font-semibold">{formatNumber(calculation.width)} {units.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Type:</span>
                    <span className="font-semibold capitalize">{calculation.footingType}</span>
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

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Load & Soil Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Load ({units.load})
                  </label>
                  <input
                    type="number"
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '100' : '22481'}
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Total structural load on footing
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safe Bearing Capacity ({units.bearingCapacity})
                  </label>
                  <input
                    type="number"
                    value={bearingCapacity}
                    onChange={(e) => setBearingCapacity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '100' : '2088'}
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Soil bearing capacity
                  </p>
                </div>

                {footingType === 'rectangular' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length / Width Ratio
                    </label>
                    <input
                      type="number"
                      value={lengthWidthRatio}
                      onChange={(e) => setLengthWidthRatio(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1.5"
                      min="1"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ratio of length to width (e.g., 1.5 means length is 1.5× width)
                    </p>
                  </div>
                )}
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Area = (Load × FOS) / Bearing Capacity = ({formatNumber(calculation.load)} × {formatNumber(calculation.factorOfSafety)}) / {formatNumber(calculation.bearingCapacity)} = {formatNumber(calculation.requiredArea)} {units.area}
                  </div>
                </div>
              )}
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-yellow-900 mb-2">Design Warnings</h4>
                    <ul className="space-y-1">
                      {warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                          <span className="text-yellow-600 mt-0.5">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Load Scenarios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {footingPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      Load: {preset.load} kN • SBC: {preset.bearingCapacity} kN/m²
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Representation */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Footing Diagram
                </h3>
                
                <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div 
                      className="border-4 border-primary bg-primary/10"
                      style={{
                        width: `${Math.min(calculation.length / Math.max(calculation.length, calculation.width) * 200, 200)}px`,
                        height: `${Math.min(calculation.width / Math.max(calculation.length, calculation.width) * 200, 200)}px`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-primary">
                            {formatNumber(calculation.length)} {units.length}
                          </div>
                          <div className="text-xs text-gray-600">×</div>
                          <div className="text-sm font-semibold text-primary">
                            {formatNumber(calculation.width)} {units.length}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-6 left-0 right-0 text-center text-xs text-gray-600">
                      Length: {formatNumber(calculation.length)} {units.length}
                    </div>
                    <div className="absolute -left-16 top-0 bottom-0 flex items-center text-xs text-gray-600">
                      <div className="transform -rotate-90 whitespace-nowrap">
                        Width: {formatNumber(calculation.width)} {units.length}
                      </div>
                    </div>
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Required Area</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.requiredArea)} {units.area}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Length</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.length)} {units.length}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Width</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.width)} {units.length}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Load</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.load)} {units.load}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bearing Capacity</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.bearingCapacity)} {units.bearingCapacity}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Safety Factor</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.factorOfSafety)}</div>
                  </div>
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
                    history.map((entry) => {
                      const entryUnits = getUnitLabels(entry.calculation.unit);
                      return (
                        <div
                          key={entry.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => loadFromHistory(entry.calculation)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">
                              {formatNumber(entry.calculation.length)} × {formatNumber(entry.calculation.width)} {entryUnits.length}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {entry.calculation.footingType.charAt(0).toUpperCase() + entry.calculation.footingType.slice(1)} • 
                            Load: {formatNumber(entry.calculation.load)} {entryUnits.load} • 
                            Area: {formatNumber(entry.calculation.requiredArea)} {entryUnits.area}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <FootingSizeCalculatorSEO />
      <RelatedTools
        currentTool="footing-size-calculator"
        tools={['foundation-depth-calculator', 'concrete-volume-calculator', 'slab-concrete-calculator']}
      />
    </>
  );
}
