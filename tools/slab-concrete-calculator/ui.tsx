"use client";

import { useState, useEffect } from "react";
import { Unit, SlabShape, SlabCalculation, RectangularDimensions, CircularDimensions, TriangularDimensions, LShapedDimensions } from "./types";
import {
  calculateSlabVolume,
  getShapeDisplayName,
  getThicknessPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  convertInchesToMeters
} from "./logic";
import SlabConcreteCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SlabConcreteCalculatorUI() {
  const [shape, setShape] = useState<SlabShape>("rectangular");
  const [unit, setUnit] = useState<Unit>("m");
  
  // Dimensions for different shapes
  const [rectangularDimensions, setRectangularDimensions] = useState<RectangularDimensions>({
    length: "",
    width: "",
    thickness: ""
  });
  
  const [circularDimensions, setCircularDimensions] = useState<CircularDimensions>({
    radius: "",
    thickness: ""
  });
  
  const [triangularDimensions, setTriangularDimensions] = useState<TriangularDimensions>({
    base: "",
    height: "",
    thickness: ""
  });
  
  const [lshapedDimensions, setLShapedDimensions] = useState<LShapedDimensions>({
    length1: "",
    width1: "",
    length2: "",
    width2: "",
    thickness: ""
  });
  
  const [costPerUnit, setCostPerUnit] = useState("");
  const [showCost, setShowCost] = useState(false);
  
  // Results
  const [calculation, setCalculation] = useState<SlabCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate volume in real-time
  useEffect(() => {
    let dimensions: any = {};
    
    if (shape === 'rectangular') {
      dimensions = rectangularDimensions;
    } else if (shape === 'circular') {
      dimensions = circularDimensions;
    } else if (shape === 'triangular') {
      dimensions = triangularDimensions;
    } else if (shape === 'lshaped') {
      dimensions = lshapedDimensions;
    }
    
    const cost = showCost ? parseFloat(costPerUnit) : undefined;
    const result = calculateSlabVolume(shape, dimensions, unit, cost);
    setCalculation(result);
  }, [shape, rectangularDimensions, circularDimensions, triangularDimensions, lshapedDimensions, unit, costPerUnit, showCost]);

  const handleShapeChange = (newShape: SlabShape) => {
    setShape(newShape);
    setCalculation(null);
  };

  const handleReset = () => {
    setRectangularDimensions({ length: "", width: "", thickness: "" });
    setCircularDimensions({ radius: "", thickness: "" });
    setTriangularDimensions({ base: "", height: "", thickness: "" });
    setLShapedDimensions({ length1: "", width1: "", length2: "", width2: "", thickness: "" });
    setCostPerUnit("");
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Concrete Required: ${formatNumber(calculation.volumeM3)} m³ (${formatNumber(calculation.volumeYd3)} yd³)`;
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
      downloadFile(csv, 'slab_concrete_calculation.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'slab_concrete_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SlabCalculation) => {
    setShape(calc.shape);
    setUnit(calc.unit);
    if (calc.costPerUnit) {
      setCostPerUnit(calc.costPerUnit.toString());
      setShowCost(true);
    }
    setShowHistory(false);
  };

  const applyThicknessPreset = (value: number, presetUnit: string) => {
    let thicknessValue: string;
    
    if (presetUnit === 'in') {
      // Convert inches to current unit
      if (unit === 'm') {
        thicknessValue = convertInchesToMeters(value).toFixed(3);
      } else {
        thicknessValue = (value / 12).toFixed(3);
      }
    } else {
      // Preset is in meters
      if (unit === 'm') {
        thicknessValue = value.toString();
      } else {
        thicknessValue = (value / 0.3048).toFixed(3);
      }
    }
    
    // Apply to current shape
    if (shape === 'rectangular') {
      setRectangularDimensions({ ...rectangularDimensions, thickness: thicknessValue });
    } else if (shape === 'circular') {
      setCircularDimensions({ ...circularDimensions, thickness: thicknessValue });
    } else if (shape === 'triangular') {
      setTriangularDimensions({ ...triangularDimensions, thickness: thicknessValue });
    } else if (shape === 'lshaped') {
      setLShapedDimensions({ ...lshapedDimensions, thickness: thicknessValue });
    }
  };

  const thicknessPresets = getThicknessPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Slab Concrete Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate exact volume of concrete required for slab construction. Supports unit conversion, cost estimation, and instant results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Shape Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slab Shape</label>
                <select
                  value={shape}
                  onChange={(e) => handleShapeChange(e.target.value as SlabShape)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="rectangular">Rectangular</option>
                  <option value="circular">Circular</option>
                  <option value="triangular">Triangular</option>
                  <option value="lshaped">L-Shaped</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("m")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "m"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Meters (m)
                  </button>
                  <button
                    onClick={() => setUnit("ft")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "ft"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Feet (ft)
                  </button>
                </div>
              </div>

              {/* Cost Estimation Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCost}
                    onChange={(e) => setShowCost(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Enable cost estimation
                  </span>
                </label>
              </div>

              {/* Cost Input */}
              {showCost && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per m³
                  </label>
                  <input
                    type="number"
                    value={costPerUnit}
                    onChange={(e) => setCostPerUnit(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

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
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Concrete Required
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.volumeM3)}
                  </div>
                  <div className="text-xl text-primary-100">
                    cubic meters (m³)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Feet:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeFt3)} ft³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Yards:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeYd3)} yd³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slab Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.area)} m²</span>
                  </div>
                  
                  {calculation.totalCost && (
                    <>
                      <div className="pt-2 border-t border-white/20"></div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Cost:</span>
                        <span className="font-semibold">${formatNumber(calculation.totalCost, 2)}</span>
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
            
            {/* Dimensions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {getShapeDisplayName(shape)} Slab Dimensions
              </h3>
              
              {shape === 'rectangular' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={rectangularDimensions.length}
                      onChange={(e) => setRectangularDimensions({ ...rectangularDimensions, length: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit})
                    </label>
                    <input
                      type="number"
                      value={rectangularDimensions.width}
                      onChange={(e) => setRectangularDimensions({ ...rectangularDimensions, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness ({unit})
                    </label>
                    <input
                      type="number"
                      value={rectangularDimensions.thickness}
                      onChange={(e) => setRectangularDimensions({ ...rectangularDimensions, thickness: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'm' ? '0.1' : '0.33'}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {shape === 'circular' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius ({unit})
                    </label>
                    <input
                      type="number"
                      value={circularDimensions.radius}
                      onChange={(e) => setCircularDimensions({ ...circularDimensions, radius: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness ({unit})
                    </label>
                    <input
                      type="number"
                      value={circularDimensions.thickness}
                      onChange={(e) => setCircularDimensions({ ...circularDimensions, thickness: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'm' ? '0.1' : '0.33'}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {shape === 'triangular' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base ({unit})
                    </label>
                    <input
                      type="number"
                      value={triangularDimensions.base}
                      onChange={(e) => setTriangularDimensions({ ...triangularDimensions, base: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({unit})
                    </label>
                    <input
                      type="number"
                      value={triangularDimensions.height}
                      onChange={(e) => setTriangularDimensions({ ...triangularDimensions, height: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness ({unit})
                    </label>
                    <input
                      type="number"
                      value={triangularDimensions.thickness}
                      onChange={(e) => setTriangularDimensions({ ...triangularDimensions, thickness: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'm' ? '0.1' : '0.33'}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {shape === 'lshaped' && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      L-Shape consists of two rectangles. Enter dimensions for each section.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 1 - Length ({unit})
                      </label>
                      <input
                        type="number"
                        value={lshapedDimensions.length1}
                        onChange={(e) => setLShapedDimensions({ ...lshapedDimensions, length1: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="10"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 1 - Width ({unit})
                      </label>
                      <input
                        type="number"
                        value={lshapedDimensions.width1}
                        onChange={(e) => setLShapedDimensions({ ...lshapedDimensions, width1: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="5"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 2 - Length ({unit})
                      </label>
                      <input
                        type="number"
                        value={lshapedDimensions.length2}
                        onChange={(e) => setLShapedDimensions({ ...lshapedDimensions, length2: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 2 - Width ({unit})
                      </label>
                      <input
                        type="number"
                        value={lshapedDimensions.width2}
                        onChange={(e) => setLShapedDimensions({ ...lshapedDimensions, width2: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="3"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness ({unit})
                    </label>
                    <input
                      type="number"
                      value={lshapedDimensions.thickness}
                      onChange={(e) => setLShapedDimensions({ ...lshapedDimensions, thickness: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'm' ? '0.1' : '0.33'}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {
                      shape === 'rectangular' ? 'Volume = Length × Width × Thickness' :
                      shape === 'circular' ? 'Volume = π × r² × Thickness' :
                      shape === 'triangular' ? 'Volume = (Base × Height ÷ 2) × Thickness' :
                      'Volume = (Area1 + Area2) × Thickness'
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Thickness Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Thickness Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {thicknessPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyThicknessPreset(preset.value, preset.unit)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Volume (m³)</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.volumeM3)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Volume (ft³)</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.volumeFt3)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Volume (yd³)</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.volumeYd3)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Slab Area</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.area)} m²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Shape</div>
                    <div className="text-sm font-bold text-gray-900">{getShapeDisplayName(calculation.shape)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dimensions</div>
                    <div className="text-xs font-bold text-gray-900">{calculation.dimensions}</div>
                  </div>
                  {calculation.totalCost && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Cost</div>
                      <div className="text-lg font-bold text-primary">${formatNumber(calculation.totalCost, 2)}</div>
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
                            {formatNumber(entry.calculation.volumeM3)} m³
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getShapeDisplayName(entry.calculation.shape)} • {entry.calculation.dimensions}
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

      <SlabConcreteCalculatorSEO />
      <RelatedTools
        currentTool="slab-concrete-calculator"
        tools={['concrete-volume-calculator', 'concrete-mix-ratio-calculator', 'cement-calculator']}
      />
    </>
  );
}
