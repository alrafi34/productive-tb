"use client";

import { useState, useEffect, useCallback } from "react";
import { TankShape, Unit, WaterTankCalculation } from "./types";
import {
  calculateWaterTankCapacity,
  getWaterTankPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  validateInputs,
  debounce,
  getUnitLabel,
  getShapeLabel
} from "./logic";
import WaterTankCapacityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WaterTankCapacityCalculatorUI() {
  const [shape, setShape] = useState<TankShape>("rectangular");
  const [unit, setUnit] = useState<Unit>("meters");
  
  // Rectangular dimensions
  const [length, setLength] = useState("2");
  const [width, setWidth] = useState("1.5");
  const [height, setHeight] = useState("1.5");
  
  // Cylindrical dimensions
  const [radius, setRadius] = useState("1");
  const [cylinderHeight, setCylinderHeight] = useState("2");
  
  // Results
  const [calculation, setCalculation] = useState<WaterTankCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const waterTankPresets = getWaterTankPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);
      const r = parseFloat(radius);
      const ch = parseFloat(cylinderHeight);
      
      const validationError = validateInputs(shape, l, w, h, r, ch);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      const result = calculateWaterTankCapacity({
        shape,
        unit,
        length: l,
        width: w,
        height: h,
        radius: r,
        cylinderHeight: ch
      });
      setCalculation(result);
    }, 150),
    [shape, unit, length, width, height, radius, cylinderHeight]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [shape, unit, length, width, height, radius, cylinderHeight, debouncedCalculate]);

  const handleShapeChange = (newShape: TankShape) => {
    setShape(newShape);
  };

  const handleReset = () => {
    setShape("rectangular");
    setUnit("meters");
    setLength("2");
    setWidth("1.5");
    setHeight("1.5");
    setRadius("1");
    setCylinderHeight("2");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setShape(preset.shape);
    setUnit(preset.unit);
    if (preset.length) setLength(preset.length.toString());
    if (preset.width) setWidth(preset.width.toString());
    if (preset.height) setHeight(preset.height.toString());
    if (preset.radius) setRadius(preset.radius.toString());
    if (preset.cylinderHeight) setCylinderHeight(preset.cylinderHeight.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Water Tank Capacity: ${formatNumber(calculation.capacityInLiters, 0)} liters (${formatNumber(calculation.volumeInCubicMeters, 2)} m³)`;
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
      downloadFile(text, 'water_tank_capacity.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: WaterTankCalculation) => {
    setShape(calc.shape);
    setUnit(calc.unit);
    if (calc.length) setLength(calc.length.toString());
    if (calc.width) setWidth(calc.width.toString());
    if (calc.height) setHeight(calc.height.toString());
    if (calc.radius) setRadius(calc.radius.toString());
    if (calc.cylinderHeight) setCylinderHeight(calc.cylinderHeight.toString());
    setShowHistory(false);
  };

  const unitLabel = getUnitLabel(unit);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Water Tank Capacity Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate water tank volume and storage capacity for cylindrical and rectangular tanks. Get instant results in liters and gallons.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Tank Shape */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tank Shape</label>
                <select
                  value={shape}
                  onChange={(e) => handleShapeChange(e.target.value as TankShape)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="rectangular">Rectangular</option>
                  <option value="cylindrical-vertical">Cylindrical (Vertical)</option>
                  <option value="cylindrical-horizontal">Cylindrical (Horizontal)</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="meters">Meters (m)</option>
                  <option value="centimeters">Centimeters (cm)</option>
                  <option value="feet">Feet (ft)</option>
                  <option value="inches">Inches (in)</option>
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
                    Tank Capacity
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.capacityInLiters, 0)}
                  </div>
                  <div className="text-xl text-primary-100">
                    liters
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Volume (m³):</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeInCubicMeters, 3)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Volume (ft³):</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeInCubicFeet, 2)} ft³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Gallons:</span>
                    <span className="font-semibold">{formatNumber(calculation.capacityInGallons, 0)} gal</span>
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
                Tank Dimensions
              </h3>
              
              {shape === "rectangular" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unitLabel})
                    </label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unitLabel})
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1.5"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({unitLabel})
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1.5"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius ({unitLabel})
                    </label>
                    <input
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({unitLabel})
                    </label>
                    <input
                      type="number"
                      value={cylinderHeight}
                      onChange={(e) => setCylinderHeight(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {shape === "rectangular" ? "Volume = L × W × H" : "Volume = π × r² × h"}
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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Tank Sizes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {waterTankPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Representation */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Tank Visualization
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  {shape === "rectangular" ? (
                    <svg width="200" height="150" viewBox="0 0 200 150" className="max-w-full">
                      {/* 3D Box representation */}
                      <polygon points="50,40 150,40 180,20 80,20" fill="#3B82F6" opacity="0.7" />
                      <polygon points="50,40 50,120 80,100 80,20" fill="#2563EB" opacity="0.8" />
                      <polygon points="150,40 150,120 180,100 180,20" fill="#1D4ED8" opacity="0.9" />
                      <polygon points="50,120 150,120 180,100 80,100" fill="#3B82F6" opacity="0.6" />
                      
                      {/* Labels */}
                      <text x="115" y="15" fontSize="10" fill="#333" textAnchor="middle">Length</text>
                      <text x="25" y="80" fontSize="10" fill="#333" textAnchor="middle">Height</text>
                      <text x="190" y="60" fontSize="10" fill="#333" textAnchor="middle">Width</text>
                    </svg>
                  ) : (
                    <svg width="200" height="150" viewBox="0 0 200 150" className="max-w-full">
                      {/* Cylindrical tank representation */}
                      <ellipse cx="100" cy="50" rx="60" ry="20" fill="#3B82F6" opacity="0.7" />
                      <rect x="40" y="50" width="120" height="60" fill="#2563EB" opacity="0.8" />
                      <ellipse cx="100" cy="110" rx="60" ry="20" fill="#1D4ED8" opacity="0.9" />
                      
                      {/* Labels */}
                      <text x="100" y="40" fontSize="10" fill="#333" textAnchor="middle">Radius</text>
                      <text x="25" y="80" fontSize="10" fill="#333" textAnchor="middle">Height</text>
                    </svg>
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-600 text-center">
                  {getShapeLabel(shape)} tank visualization
                </div>
              </div>
            )}

            {/* Notes */}
            {calculation && calculation.notes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Notes & Recommendations
                </h3>
                <ul className="space-y-2">
                  {calculation.notes.map((note, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Summary Panel */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Capacity Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Liters</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.capacityInLiters, 0)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Gallons</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.capacityInGallons, 0)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cubic Meters</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.volumeInCubicMeters, 3)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cubic Feet</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.volumeInCubicFeet, 2)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            {calculation && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Report
              </button>
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
                            {formatNumber(entry.calculation.capacityInLiters, 0)} L
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getShapeLabel(entry.calculation.shape)} • 
                          {formatNumber(entry.calculation.volumeInCubicMeters, 2)} m³
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

      <WaterTankCapacityCalculatorSEO />
      <RelatedTools
        currentTool="water-tank-capacity-calculator"
        tools={['rainwater-harvesting-calculator', 'concrete-volume-calculator', 'excavation-volume-calculator']}
      />
    </>
  );
}
