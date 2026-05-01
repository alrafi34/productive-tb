"use client";

import { useState, useEffect, useCallback } from "react";
import { ExcavationShape, Unit, ExcavationCalculation } from "./types";
import {
  calculateExcavationVolume,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getShapeLabel,
  getUnitLabel,
  getCubicUnitLabel,
  getFormula,
  getExcavationPresets,
  validateInputs,
  estimateTruckLoads,
  debounce
} from "./logic";
import ExcavationVolumeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ExcavationVolumeCalculatorUI() {
  const [shape, setShape] = useState<ExcavationShape>("rectangular");
  const [unit, setUnit] = useState<Unit>("meters");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("5");
  const [depth, setDepth] = useState("2");
  const [radius, setRadius] = useState("3");
  
  // Results
  const [calculation, setCalculation] = useState<ExcavationCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const excavationPresets = getExcavationPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const l = parseFloat(length);
      const w = parseFloat(width);
      const d = parseFloat(depth);
      const r = parseFloat(radius);
      
      const validationError = validateInputs(shape, l, w, d, r);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      const result = calculateExcavationVolume(shape, unit, l, w, d, r);
      setCalculation(result);
    }, 150),
    [shape, unit, length, width, depth, radius]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [shape, unit, length, width, depth, radius, debouncedCalculate]);

  const handleShapeChange = (newShape: ExcavationShape) => {
    setShape(newShape);
    // Reset to default values when changing shape
    if (newShape === "circular") {
      setRadius("3");
      setDepth("2");
    } else {
      setLength("10");
      setWidth("5");
      setDepth("2");
    }
  };

  const handleReset = () => {
    setShape("rectangular");
    setUnit("meters");
    setLength("10");
    setWidth("5");
    setDepth("2");
    setRadius("3");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setShape(preset.shape);
    setUnit(preset.unit);
    if (preset.length) setLength(preset.length.toString());
    if (preset.width) setWidth(preset.width.toString());
    if (preset.depth) setDepth(preset.depth.toString());
    if (preset.radius) setRadius(preset.radius.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const cubicUnit = getCubicUnitLabel(calculation.unit);
      const text = `Excavation Volume: ${formatNumber(calculation.volume, 2)} ${cubicUnit} | Shape: ${getShapeLabel(calculation.shape)}`;
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
      downloadFile(text, 'excavation_volume.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ExcavationCalculation) => {
    setShape(calc.shape);
    setUnit(calc.unit);
    if (calc.length) setLength(calc.length.toString());
    if (calc.width) setWidth(calc.width.toString());
    setDepth(calc.depth.toString());
    if (calc.radius) setRadius(calc.radius.toString());
    setShowHistory(false);
  };

  const unitLabel = getUnitLabel(unit);
  const cubicUnitLabel = getCubicUnitLabel(unit);
  const truckLoads = calculation ? estimateTruckLoads(calculation.volumeInCubicMeters) : 0;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⛏️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Excavation Volume Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate excavation volume for foundations, trenches, and circular pits with instant results and unit conversion.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Excavation Settings</h3>
              
              {/* Shape Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excavation Shape</label>
                <select
                  value={shape}
                  onChange={(e) => handleShapeChange(e.target.value as ExcavationShape)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="rectangular">Rectangular</option>
                  <option value="trench">Trench</option>
                  <option value="circular">Circular Pit</option>
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
                  <option value="feet">Feet (ft)</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dimensions</h3>
              
              {/* Rectangular/Trench Inputs */}
              {(shape === "rectangular" || shape === "trench") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length ({unitLabel})</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width ({unitLabel})</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </>
              )}

              {/* Circular Inputs */}
              {shape === "circular" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Radius ({unitLabel})</label>
                  <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="3"
                    min="0"
                    step="0.1"
                  />
                </div>
              )}

              {/* Depth (common for all shapes) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Depth ({unitLabel})</label>
                <input
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="2"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Formula Display */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Formula:</p>
                <code className="text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded block">
                  {getFormula(shape)}
                </code>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                🔄 Reset All
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📜 {showHistory ? 'Hide' : 'Show'} History
              </button>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Result Display */}
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Excavation Volume
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.volume, 2)} {cubicUnitLabel}
                  </div>
                  <div className="text-sm text-primary-100">
                    {getShapeLabel(calculation.shape)} excavation
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Meters:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeInCubicMeters, 2)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Feet:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeInCubicFeet, 2)} ft³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Yards:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeInCubicYards, 2)} yd³</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/20">
                    <span className="text-primary-100">Est. Truck Loads:</span>
                    <span className="font-semibold">{truckLoads} (10m³ trucks)</span>
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

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Visual Diagram */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Excavation Visualization
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  {shape === "rectangular" || shape === "trench" ? (
                    <svg width="200" height="150" viewBox="0 0 200 150" className="max-w-full">
                      {/* 3D Box representation */}
                      <polygon points="50,40 150,40 180,20 80,20" fill="#8B4513" opacity="0.7" />
                      <polygon points="50,40 50,120 80,100 80,20" fill="#A0522D" opacity="0.8" />
                      <polygon points="150,40 150,120 180,100 180,20" fill="#654321" opacity="0.9" />
                      <polygon points="50,120 150,120 180,100 80,100" fill="#8B4513" opacity="0.6" />
                      
                      {/* Labels */}
                      <text x="115" y="15" fontSize="10" fill="#333" textAnchor="middle">Length</text>
                      <text x="25" y="80" fontSize="10" fill="#333" textAnchor="middle">Depth</text>
                      <text x="190" y="60" fontSize="10" fill="#333" textAnchor="middle">Width</text>
                    </svg>
                  ) : (
                    <svg width="200" height="150" viewBox="0 0 200 150" className="max-w-full">
                      {/* Circular pit representation */}
                      <ellipse cx="100" cy="50" rx="60" ry="20" fill="#8B4513" opacity="0.7" />
                      <rect x="40" y="50" width="120" height="60" fill="#A0522D" opacity="0.8" />
                      <ellipse cx="100" cy="110" rx="60" ry="20" fill="#654321" opacity="0.9" />
                      
                      {/* Labels */}
                      <text x="100" y="40" fontSize="10" fill="#333" textAnchor="middle">Radius</text>
                      <text x="25" y="80" fontSize="10" fill="#333" textAnchor="middle">Depth</text>
                    </svg>
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-600 text-center">
                  {shape === "rectangular" && "Rectangular excavation (3D view)"}
                  {shape === "trench" && "Trench excavation (3D view)"}
                  {shape === "circular" && "Circular pit excavation (3D view)"}
                </div>
              </div>
            )}

            {/* Excavation Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Common Excavations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {excavationPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">{preset.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{preset.description}</div>
                    <div className="text-xs text-gray-500">
                      {getShapeLabel(preset.shape)} • {preset.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Project Estimates
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-700 mb-1">Soil Weight (approx)</div>
                    <div className="text-lg font-bold text-blue-900">
                      {formatNumber(calculation.volumeInCubicMeters * 1.6, 1)} tons
                    </div>
                    <div className="text-xs text-blue-600 mt-1">@ 1.6 tons/m³</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-xs text-green-700 mb-1">Truck Loads</div>
                    <div className="text-lg font-bold text-green-900">
                      {truckLoads} trucks
                    </div>
                    <div className="text-xs text-green-600 mt-1">10m³ capacity</div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-700 mb-1">Est. Cost (low)</div>
                    <div className="text-lg font-bold text-orange-900">
                      ${formatNumber(calculation.volumeInCubicMeters * 10, 0)}
                    </div>
                    <div className="text-xs text-orange-600 mt-1">@ $10/m³</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-700 mb-1">Est. Cost (high)</div>
                    <div className="text-lg font-bold text-purple-900">
                      ${formatNumber(calculation.volumeInCubicMeters * 25, 0)}
                    </div>
                    <div className="text-xs text-purple-600 mt-1">@ $25/m³</div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Estimates are approximate. Actual costs vary by location, soil type, access, and disposal requirements.
                  </p>
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
                            {formatNumber(entry.calculation.volume, 2)} {getCubicUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getShapeLabel(entry.calculation.shape)} • {formatNumber(entry.calculation.volumeInCubicMeters, 2)} m³
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

      <ExcavationVolumeCalculatorSEO />
      <RelatedTools
        currentTool="excavation-volume-calculator"
        tools={['concrete-volume-calculator', 'construction-cost-estimator', 'material-cost-calculator']}
      />
    </>
  );
}