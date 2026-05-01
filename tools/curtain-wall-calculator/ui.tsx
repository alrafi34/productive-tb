"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, CurtainWallCalculation } from "./types";
import {
  calculateCurtainWall,
  validateInputs,
  getPresetTemplates,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  getAreaUnitLabel,
  debounce
} from "./logic";
import CurtainWallCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CurtainWallCalculatorUI() {
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(10);
  const [panelWidth, setPanelWidth] = useState(1.5);
  const [panelHeight, setPanelHeight] = useState(1.5);
  const [glassRatio, setGlassRatio] = useState(80);
  const [frameThickness, setFrameThickness] = useState(50);
  const [unit, setUnit] = useState<Unit>("meters");
  
  const [calculation, setCalculation] = useState<CurtainWallCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presetTemplates = getPresetTemplates();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(width, height, panelWidth, panelHeight, glassRatio);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateCurtainWall(
          width,
          height,
          panelWidth,
          panelHeight,
          glassRatio,
          frameThickness,
          unit
        );
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 120),
    [width, height, panelWidth, panelHeight, glassRatio, frameThickness, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [width, height, panelWidth, panelHeight, glassRatio, frameThickness, unit, debouncedCalculate]);

  const handleReset = () => {
    setWidth(20);
    setHeight(10);
    setPanelWidth(1.5);
    setPanelHeight(1.5);
    setGlassRatio(80);
    setFrameThickness(50);
    setUnit("meters");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setPanelWidth(preset.panelWidth);
    setPanelHeight(preset.panelHeight);
    setGlassRatio(preset.glassRatio);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Curtain Wall: ${formatNumber(calculation.totalArea, 2)} ${getAreaUnitLabel(calculation.unit)}\nPanels: ${calculation.panelCount}\nGlass: ${formatNumber(calculation.glassArea, 2)} ${getAreaUnitLabel(calculation.unit)}`;
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
      downloadFile(csv, 'curtain-wall-calculation.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'curtain-wall-calculation.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: CurtainWallCalculation) => {
    setWidth(calc.width);
    setHeight(calc.height);
    setPanelWidth(calc.panelWidth);
    setPanelHeight(calc.panelHeight);
    setGlassRatio(calc.glassRatio);
    setFrameThickness(calc.frameThickness);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏢</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Curtain Wall Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate curtain wall area, panel count, glass ratio, and material breakdown instantly for building facades.
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
                  <option value="meters">Meters (m)</option>
                  <option value="feet">Feet (ft)</option>
                </select>
              </div>

              {/* Glass Ratio Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Glass Ratio: {glassRatio}%
                </label>
                <input
                  type="range"
                  value={glassRatio}
                  onChange={(e) => setGlassRatio(parseInt(e.target.value))}
                  className="w-full"
                  min="0"
                  max="100"
                  step="5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
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
                    Total Area
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalArea, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getAreaUnitLabel(calculation.unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Panels:</span>
                    <span className="font-semibold">{calculation.panelCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Glass Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.glassArea, 2)} {getAreaUnitLabel(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Frame Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.frameArea, 2)} {getAreaUnitLabel(calculation.unit)}</span>
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
            
            {/* Curtain Wall Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Curtain Wall Dimensions
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={width || ''}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="20"
                    min="0"
                    step="0.1"
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
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Total Area = Width × Height
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

            {/* Panel Configuration */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Panel Configuration
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Panel Width ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={panelWidth || ''}
                    onChange={(e) => setPanelWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1.5"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Panel Height ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={panelHeight || ''}
                    onChange={(e) => setPanelHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1.5"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frame Thickness (mm) - Optional
                </label>
                <input
                  type="number"
                  value={frameThickness || ''}
                  onChange={(e) => setFrameThickness(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="50"
                  min="0"
                  step="1"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Building Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presetTemplates.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.category} • {preset.glassRatio}% glass
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Summary */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Total Area</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(calculation.totalArea, 2)}</div>
                    <div className="text-xs text-primary font-medium">{getAreaUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Panels</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.panelCount}</div>
                    <div className="text-xs text-gray-600">{calculation.panelsWide} × {calculation.panelsHigh}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Glass Area</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.glassArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getAreaUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Frame Area</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.frameArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getAreaUnitLabel(unit)}</div>
                  </div>
                </div>

                {/* Material Distribution Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">Material Distribution</span>
                    <span className="text-gray-600">{calculation.glassRatio}% glass</span>
                  </div>
                  <div className="h-8 bg-gray-200 rounded-lg overflow-hidden flex">
                    <div 
                      className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                      style={{ width: `${calculation.glassRatio}%` }}
                    >
                      {calculation.glassRatio > 20 && 'Glass'}
                    </div>
                    <div 
                      className="bg-gray-400 flex items-center justify-center text-white text-xs font-semibold"
                      style={{ width: `${100 - calculation.glassRatio}%` }}
                    >
                      {(100 - calculation.glassRatio) > 20 && 'Frame'}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                            {formatNumber(entry.calculation.totalArea, 2)} {getAreaUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.panelCount} panels • 
                          {entry.calculation.glassRatio}% glass
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

      <CurtainWallCalculatorSEO />
      <RelatedTools
        currentTool="curtain-wall-calculator"
        tools={['facade-area-calculator', 'glass-panel-size-calculator', 'cladding-material-calculator']}
      />
    </>
  );
}
