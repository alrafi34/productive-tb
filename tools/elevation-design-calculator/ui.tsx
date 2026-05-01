"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, DesignMode, ElevationCalculation } from "./types";
import {
  calculateElevation,
  validateInputs,
  getRecommendation,
  getPresetTemplates,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  debounce
} from "./logic";
import ElevationDesignCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ElevationDesignCalculatorUI() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(45);
  const [floors, setFloors] = useState(3);
  const [unit, setUnit] = useState<Unit>("feet");
  const [designMode, setDesignMode] = useState<DesignMode>("standard");
  const [customRatio, setCustomRatio] = useState(1.5);
  
  const [calculation, setCalculation] = useState<ElevationCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresetTemplates();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(width, height, floors, customRatio, designMode);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateElevation(width, height, floors, unit, designMode, customRatio);
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [width, height, floors, unit, designMode, customRatio]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [width, height, floors, unit, designMode, customRatio, debouncedCalculate]);

  const handleReset = () => {
    setWidth(30);
    setHeight(45);
    setFloors(3);
    setUnit("feet");
    setDesignMode("standard");
    setCustomRatio(1.5);
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setFloors(preset.floors);
    setDesignMode(preset.designMode);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Floor Height: ${formatNumber(calculation.floorHeight, 2)} ${getUnitLabel(calculation.unit)}\nRatio: ${formatNumber(calculation.widthToHeightRatio, 3)}`;
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
      downloadFile(text, 'elevation-design.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ElevationCalculation) => {
    setWidth(calc.width);
    setHeight(calc.height);
    setFloors(calc.floors);
    setUnit(calc.unit);
    setDesignMode(calc.designMode);
    setCustomRatio(calc.customRatio);
    setShowHistory(false);
  };

  // SVG Elevation Visualization
  const renderElevation = () => {
    if (!calculation) return null;

    const svgWidth = 400;
    const svgHeight = 500;
    const padding = 40;
    const maxBuildingWidth = svgWidth - (padding * 2);
    const maxBuildingHeight = svgHeight - (padding * 2);

    // Scale building to fit SVG
    const scale = Math.min(
      maxBuildingWidth / calculation.width,
      maxBuildingHeight / calculation.height
    );

    const buildingWidth = calculation.width * scale;
    const buildingHeight = calculation.height * scale;
    const floorHeight = buildingHeight / calculation.floors;

    const startX = (svgWidth - buildingWidth) / 2;
    const startY = (svgHeight - buildingHeight) / 2;

    return (
      <svg
        width="100%"
        height="500"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="border border-gray-200 rounded-lg bg-gray-50"
      >
        {/* Building outline */}
        <rect
          x={startX}
          y={startY}
          width={buildingWidth}
          height={buildingHeight}
          fill="#e0f2fe"
          stroke="#0284c7"
          strokeWidth="3"
        />

        {/* Floor divisions */}
        {Array.from({ length: calculation.floors - 1 }).map((_, i) => (
          <line
            key={i}
            x1={startX}
            y1={startY + floorHeight * (i + 1)}
            x2={startX + buildingWidth}
            y2={startY + floorHeight * (i + 1)}
            stroke="#0284c7"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}

        {/* Floor labels */}
        {Array.from({ length: calculation.floors }).map((_, i) => (
          <text
            key={i}
            x={startX - 10}
            y={startY + floorHeight * i + floorHeight / 2}
            textAnchor="end"
            fontSize="12"
            fill="#374151"
            fontWeight="600"
          >
            Floor {calculation.floors - i}
          </text>
        ))}

        {/* Dimension lines */}
        {/* Width dimension */}
        <line
          x1={startX}
          y1={startY + buildingHeight + 20}
          x2={startX + buildingWidth}
          y2={startY + buildingHeight + 20}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <line
          x1={startX}
          y1={startY + buildingHeight + 15}
          x2={startX}
          y2={startY + buildingHeight + 25}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <line
          x1={startX + buildingWidth}
          y1={startY + buildingHeight + 15}
          x2={startX + buildingWidth}
          y2={startY + buildingHeight + 25}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <text
          x={startX + buildingWidth / 2}
          y={startY + buildingHeight + 35}
          textAnchor="middle"
          fontSize="12"
          fill="#374151"
          fontWeight="600"
        >
          {formatNumber(calculation.width, 1)} {getUnitLabel(calculation.unit)}
        </text>

        {/* Height dimension */}
        <line
          x1={startX + buildingWidth + 20}
          y1={startY}
          x2={startX + buildingWidth + 20}
          y2={startY + buildingHeight}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <line
          x1={startX + buildingWidth + 15}
          y1={startY}
          x2={startX + buildingWidth + 25}
          y2={startY}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <line
          x1={startX + buildingWidth + 15}
          y1={startY + buildingHeight}
          x2={startX + buildingWidth + 25}
          y2={startY + buildingHeight}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <text
          x={startX + buildingWidth + 35}
          y={startY + buildingHeight / 2}
          textAnchor="start"
          fontSize="12"
          fill="#374151"
          fontWeight="600"
          transform={`rotate(90, ${startX + buildingWidth + 35}, ${startY + buildingHeight / 2})`}
        >
          {formatNumber(calculation.height, 1)} {getUnitLabel(calculation.unit)}
        </text>

        {/* Golden ratio guide lines (if applicable) */}
        {calculation.isBalanced && (
          <text
            x={svgWidth / 2}
            y={20}
            textAnchor="middle"
            fontSize="14"
            fill="#059669"
            fontWeight="700"
          >
            ✓ Balanced Proportions
          </text>
        )}
      </svg>
    );
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Elevation Design Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate building elevation proportions instantly. Design balanced facades using width, height, floor ratios, and golden ratio with live visual preview.
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

              {/* Design Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Design Mode</label>
                <select
                  value={designMode}
                  onChange={(e) => setDesignMode(e.target.value as DesignMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="standard">Standard Proportion</option>
                  <option value="golden-ratio">Golden Ratio (1:1.618)</option>
                  <option value="custom">Custom Ratio</option>
                </select>
              </div>

              {/* Custom Ratio */}
              {designMode === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Ratio (Height = Width × Ratio)
                  </label>
                  <input
                    type="number"
                    value={customRatio || ''}
                    onChange={(e) => setCustomRatio(parseFloat(e.target.value) || 1.5)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                    placeholder="1.5"
                    min="0.1"
                    step="0.1"
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
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Floor Height
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.floorHeight, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(calculation.unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">W:H Ratio:</span>
                    <span className="font-semibold">{formatNumber(calculation.widthToHeightRatio, 3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Floors:</span>
                    <span className="font-semibold">{calculation.floors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Status:</span>
                    <span className="font-semibold">{calculation.isBalanced ? '✓ Balanced' : '⚠ Adjust'}</span>
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
            
            {/* Building Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Building Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={width || ''}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="30"
                    min="0"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={height || ''}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="45"
                    min="0"
                    step="1"
                    disabled={designMode !== "standard"}
                  />
                  {designMode !== "standard" && (
                    <p className="text-xs text-gray-500 mt-1">Auto-calculated from ratio</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Floors
                  </label>
                  <input
                    type="number"
                    value={floors || ''}
                    onChange={(e) => setFloors(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="3"
                    min="1"
                    step="1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Floor Height = Total Height ÷ Number of Floors
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

            {/* Visual Elevation */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Elevation Preview
                </h3>
                <div className="flex justify-center">
                  {renderElevation()}
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
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Floor Height</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(calculation.floorHeight, 2)}</div>
                    <div className="text-xs text-primary font-medium">{getUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">W:H Ratio</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.widthToHeightRatio, 3)}</div>
                    <div className="text-xs text-gray-600">proportion</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Height</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.height, 1)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Floors</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.floors}</div>
                    <div className="text-xs text-gray-600">levels</div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className={`mt-4 p-3 rounded-lg border ${calculation.isBalanced ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className={`text-sm ${calculation.isBalanced ? 'text-green-800' : 'text-yellow-800'}`}>
                    <strong>Recommendation:</strong> {getRecommendation(calculation.widthToHeightRatio)}
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Design Presets
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
                      {preset.category} • {preset.floors} floors
                    </div>
                  </button>
                ))}
              </div>
            </div>

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
                            {formatNumber(entry.calculation.floorHeight, 2)} {getUnitLabel(entry.calculation.unit)} per floor
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.floors} floors • 
                          Ratio: {formatNumber(entry.calculation.widthToHeightRatio, 2)}
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

      <ElevationDesignCalculatorSEO />
      <RelatedTools
        currentTool="elevation-design-calculator"
        tools={['facade-area-calculator', 'building-height-calculator', 'floor-area-calculator']}
      />
    </>
  );
}
