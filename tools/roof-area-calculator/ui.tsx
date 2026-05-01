"use client";

import { useState, useEffect } from "react";
import { RoofType, Unit, RoofCalculation } from "./types";
import {
  calculateRoofArea,
  getRoofTypeDisplayName,
  getRoofTypeDescription,
  getRoofTypeFormula,
  getRoofTypeInfo,
  requiresPitch,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  generateRoofDiagram
} from "./logic";
import RoofAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RoofAreaCalculatorUI() {
  const [roofType, setRoofType] = useState<RoofType>("gable");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [pitch, setPitch] = useState("");
  const [unit, setUnit] = useState<Unit>("metric");
  
  // Results
  const [calculation, setCalculation] = useState<RoofCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const pitchNum = parseFloat(pitch);
    
    if (!isNaN(lengthNum) && !isNaN(widthNum) && lengthNum > 0 && widthNum > 0) {
      if (requiresPitch(roofType)) {
        if (!isNaN(pitchNum) && pitchNum >= 0 && pitchNum < 90) {
          const result = calculateRoofArea(roofType, lengthNum, widthNum, unit, pitchNum);
          setCalculation(result);
        } else {
          setCalculation(null);
        }
      } else {
        const result = calculateRoofArea(roofType, lengthNum, widthNum, unit);
        setCalculation(result);
      }
    } else {
      setCalculation(null);
    }
  }, [roofType, length, width, pitch, unit]);

  const handleReset = () => {
    setLength("");
    setWidth("");
    setPitch("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setLength("10");
    setWidth("8");
    if (requiresPitch(roofType)) {
      setPitch("30");
    }
  };

  const handleRoofTypeChange = (type: RoofType) => {
    setRoofType(type);
    if (!requiresPitch(type)) {
      setPitch("");
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Roof Area: ${formatNumber(calculation.area)} ${calculation.unit === 'metric' ? 'm²' : 'sq ft'}`;
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
      downloadFile(text, 'roof_area_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'roof_area_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: RoofCalculation) => {
    setRoofType(calc.roofType);
    setLength(calc.length.toString());
    setWidth(calc.width.toString());
    if (calc.pitch !== undefined) {
      setPitch(calc.pitch.toString());
    } else {
      setPitch("");
    }
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const roofTypeInfo = getRoofTypeInfo();
  const needsPitch = requiresPitch(roofType);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏠</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Roof Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate roof surface area for flat, gable, hip, and shed roofs with instant results for construction planning and material estimation.
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
                    Roof Area
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.area)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {calculation.unit === 'metric' ? 'square meters (m²)' : 'square feet (sq ft)'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Length:</span>
                    <span className="font-semibold">{formatNumber(calculation.length)} {calculation.unit === 'metric' ? 'm' : 'ft'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Width:</span>
                    <span className="font-semibold">{formatNumber(calculation.width)} {calculation.unit === 'metric' ? 'm' : 'ft'}</span>
                  </div>
                  {calculation.pitch !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Pitch:</span>
                      <span className="font-semibold">{formatNumber(calculation.pitch)}°</span>
                    </div>
                  )}
                  {calculation.unit === 'metric' && calculation.areaImperial && (
                    <>
                      <div className="pt-2 border-t border-white/10">
                        <div className="text-xs text-primary-100 mb-1">Imperial Equivalent:</div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Area:</span>
                        <span className="font-semibold">{formatNumber(calculation.areaImperial)} sq ft</span>
                      </div>
                    </>
                  )}
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
                Roof Configuration
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roof Type
                  </label>
                  <select
                    value={roofType}
                    onChange={(e) => handleRoofTypeChange(e.target.value as RoofType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {roofTypeInfo.map((info) => (
                      <option key={info.type} value={info.type}>
                        {info.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {getRoofTypeDescription(roofType)}
                  </p>
                </div>

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
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit === 'metric' ? 'm' : 'ft'})
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="8"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                {needsPitch && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roof Pitch (degrees)
                    </label>
                    <input
                      type="number"
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="30"
                      min="0"
                      max="89"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Angle of roof slope (0-89 degrees)
                    </p>
                  </div>
                )}
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {getRoofTypeFormula(roofType)}
                  </div>
                </div>
              )}
            </div>

            {/* Roof Diagram */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Roof Type Visualization
              </h3>
              
              <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div 
                  className="w-full max-w-xs"
                  dangerouslySetInnerHTML={{ __html: generateRoofDiagram(roofType) }}
                />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-gray-900">{getRoofTypeDisplayName(roofType)}</p>
                <p className="text-xs text-gray-600 mt-1">{getRoofTypeDescription(roofType)}</p>
              </div>
            </div>

            {/* Roof Type Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Roof Type Reference
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roofTypeInfo.map((info) => (
                  <button
                    key={info.type}
                    onClick={() => handleRoofTypeChange(info.type)}
                    className={`p-3 border-2 rounded-lg transition-colors text-left ${
                      info.type === roofType
                        ? 'bg-primary/5 border-primary'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">{info.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{info.description}</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">{info.formula}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Roof Area</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.area)} {calculation.unit === 'metric' ? 'm²' : 'sq ft'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Length</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.length)} {calculation.unit === 'metric' ? 'm' : 'ft'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Width</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.width)} {calculation.unit === 'metric' ? 'm' : 'ft'}</div>
                  </div>
                  {calculation.pitch !== undefined && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pitch</div>
                      <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.pitch)}°</div>
                    </div>
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
                            {getRoofTypeDisplayName(entry.calculation.roofType)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.length)} × {formatNumber(entry.calculation.width)} {entry.calculation.unit === 'metric' ? 'm' : 'ft'} • 
                          Area: {formatNumber(entry.calculation.area)} {entry.calculation.unit === 'metric' ? 'm²' : 'sq ft'}
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

      <RoofAreaCalculatorSEO />
      <RelatedTools
        currentTool="roof-area-calculator"
        tools={['floor-area-calculator', 'wall-area-calculator', 'paint-required-calculator']}
      />
    </>
  );
}
