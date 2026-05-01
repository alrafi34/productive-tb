"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, MaterialType, FloorFinishCalculation } from "./types";
import {
  calculateFloorFinish,
  validateInputs,
  getMaterialTypeLabel,
  getUnitLabel,
  getLinearUnitLabel,
  getPresetTemplates,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import FloorFinishCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FloorFinishCalculatorUI() {
  const [roomLength, setRoomLength] = useState(10);
  const [roomWidth, setRoomWidth] = useState(12);
  const [materialLength, setMaterialLength] = useState(2);
  const [materialWidth, setMaterialWidth] = useState(2);
  const [wastagePercentage, setWastagePercentage] = useState(10);
  const [unit, setUnit] = useState<Unit>("feet");
  const [materialType, setMaterialType] = useState<MaterialType>("tile");
  
  const [calculation, setCalculation] = useState<FloorFinishCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresetTemplates();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(
        roomLength,
        roomWidth,
        materialLength,
        materialWidth,
        wastagePercentage
      );
      
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateFloorFinish(
          roomLength,
          roomWidth,
          materialLength,
          materialWidth,
          wastagePercentage,
          unit,
          materialType
        );
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [roomLength, roomWidth, materialLength, materialWidth, wastagePercentage, unit, materialType]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [roomLength, roomWidth, materialLength, materialWidth, wastagePercentage, unit, materialType, debouncedCalculate]);

  const handleReset = () => {
    setRoomLength(10);
    setRoomWidth(12);
    setMaterialLength(2);
    setMaterialWidth(2);
    setWastagePercentage(10);
    setUnit("feet");
    setMaterialType("tile");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setMaterialLength(preset.materialLength);
    setMaterialWidth(preset.materialWidth);
    setMaterialType(preset.materialType);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Floor Finish: ${calculation.finalUnits} units required (${formatNumber(calculation.totalArea, 2)} ${getUnitLabel(calculation.unit)})`;
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
      downloadFile(csv, 'floor-finish-calculation.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'floor-finish-calculation.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: FloorFinishCalculation) => {
    setRoomLength(calc.roomLength);
    setRoomWidth(calc.roomWidth);
    setMaterialLength(calc.materialLength);
    setMaterialWidth(calc.materialWidth);
    setWastagePercentage(calc.wastagePercentage);
    setUnit(calc.unit);
    setMaterialType(calc.materialType);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Floor Finish Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate floor finishing materials instantly. Estimate tiles, wood, laminate, and more with accurate wastage calculation for perfect material planning.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="feet">Feet (ft)</option>
                  <option value="meters">Meters (m)</option>
                </select>
              </div>

              {/* Material Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value as MaterialType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="tile">Tile</option>
                  <option value="wood">Wood Plank</option>
                  <option value="laminate">Laminate</option>
                  <option value="marble">Marble</option>
                  <option value="custom">Custom Material</option>
                </select>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
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
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Units Required
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.finalUnits}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getMaterialTypeLabel(calculation.materialType)} units
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalArea, 2)} {getUnitLabel(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Units:</span>
                    <span className="font-semibold">{formatNumber(calculation.unitsRequired, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Wastage:</span>
                    <span className="font-semibold">{formatNumber(calculation.wastageAmount, 2)} units</span>
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
            
            {/* Room Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Room Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({getLinearUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={roomLength || ''}
                    onChange={(e) => setRoomLength(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({getLinearUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={roomWidth || ''}
                    onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Total Area:</strong> {formatNumber(calculation.totalArea, 2)} {getUnitLabel(calculation.unit)}
                  </div>
                </div>
              )}
            </div>

            {/* Material Size */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Material Size
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({getLinearUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={materialLength || ''}
                    onChange={(e) => setMaterialLength(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({getLinearUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={materialWidth || ''}
                    onChange={(e) => setMaterialWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Unit Area:</strong> {formatNumber(calculation.materialArea, 2)} {getUnitLabel(calculation.unit)}
                  </div>
                </div>
              )}
            </div>

            {/* Wastage Percentage */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Wastage Percentage
                </h3>
                <span className="text-2xl font-bold text-primary">{wastagePercentage}%</span>
              </div>
              
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={wastagePercentage}
                onChange={(e) => setWastagePercentage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>25%</span>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-sm text-amber-800">
                  <strong>Tip:</strong> Typical wastage is 5-10% for tiles, 10-15% for wood/laminate
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

            {/* Calculation Summary */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Area</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.totalArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(calculation.unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base Units</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.unitsRequired, 2)}</div>
                    <div className="text-xs text-gray-600">units</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wastage</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.wastageAmount, 2)}</div>
                    <div className="text-xs text-gray-600">units</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Final Units</div>
                    <div className="text-2xl font-bold text-primary">{calculation.finalUnits}</div>
                    <div className="text-xs text-primary font-medium">units</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Final Units = ⌈(Total Area ÷ Unit Area) × (1 + Wastage%)⌉
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Material Presets
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
                      {preset.materialLength}×{preset.materialWidth} {getLinearUnitLabel(unit)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {calculation && !error && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export Text
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
                            {entry.calculation.finalUnits} units
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.totalArea, 2)} {getUnitLabel(entry.calculation.unit)} • 
                          {getMaterialTypeLabel(entry.calculation.materialType)}
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

      <FloorFinishCalculatorSEO />
      <RelatedTools
        currentTool="floor-finish-calculator"
        tools={['tile-quantity-calculator', 'room-area-calculator', 'paint-required-calculator']}
      />
    </>
  );
}
