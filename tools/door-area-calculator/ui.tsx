"use client";

import { useState, useEffect } from "react";
import { Unit, DoorCalculation } from "./types";
import {
  calculateDoorArea,
  getDoorPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  getUnitDisplayName,
  convertArea
} from "./logic";
import DoorAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DoorAreaCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("ft");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [includeFrame, setIncludeFrame] = useState(false);
  const [frameThickness, setFrameThickness] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<DoorCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const h = parseFloat(height);
    const w = parseFloat(width);
    const frame = includeFrame ? parseFloat(frameThickness) || 0 : 0;
    
    if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
      const result = calculateDoorArea(h, w, unit, includeFrame, frame);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [height, width, unit, includeFrame, frameThickness]);

  const handleReset = () => {
    setHeight("");
    setWidth("");
    setIncludeFrame(false);
    setFrameThickness("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setHeight("7");
    setWidth("3");
    setIncludeFrame(false);
  };

  const handleApplyPreset = (preset: any) => {
    setUnit(preset.unit);
    setHeight(preset.height.toString());
    setWidth(preset.width.toString());
    setIncludeFrame(false);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Door Area: ${formatNumber(calculation.area)} ${getUnitLabel(calculation.unit)}`;
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
      downloadFile(text, 'door_area_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: DoorCalculation) => {
    setUnit(calc.unit);
    setHeight(calc.height.toString());
    setWidth(calc.width.toString());
    setIncludeFrame(calc.includeFrame);
    if (calc.frameThickness) {
      setFrameThickness(calc.frameThickness.toString());
    }
    setShowHistory(false);
  };

  const presets = getDoorPresets();

  // Calculate conversions for display
  const conversions = calculation ? [
    { unit: "ft" as Unit, value: convertArea(calculation.area, calculation.unit, "ft") },
    { unit: "m" as Unit, value: convertArea(calculation.area, calculation.unit, "m") },
    { unit: "cm" as Unit, value: convertArea(calculation.area, calculation.unit, "cm") },
    { unit: "inches" as Unit, value: convertArea(calculation.area, calculation.unit, "inches") }
  ].filter(c => c.unit !== calculation.unit) : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚪</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Door Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate door opening area instantly using height and width. Perfect for material estimation, cost calculation, and construction planning.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="ft">Feet (ft)</option>
                  <option value="m">Meters (m)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="inches">Inches (in)</option>
                </select>
              </div>

              {/* Frame Option */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFrame}
                    onChange={(e) => setIncludeFrame(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Include Frame Margin</span>
                </label>
                
                {includeFrame && (
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Frame Thickness ({unit})
                    </label>
                    <input
                      type="number"
                      value={frameThickness}
                      onChange={(e) => setFrameThickness(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                      placeholder="0.1"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}
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
                    Door Area
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.area)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(calculation.unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Height:</span>
                    <span className="font-semibold">{formatNumber(calculation.height)} {calculation.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Width:</span>
                    <span className="font-semibold">{formatNumber(calculation.width)} {calculation.unit}</span>
                  </div>
                  {calculation.includeFrame && calculation.frameThickness && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Frame:</span>
                      <span className="font-semibold">{formatNumber(calculation.frameThickness)} {calculation.unit}</span>
                    </div>
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
                Door Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height ({unit})
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === "ft" ? "7" : unit === "m" ? "2.1" : unit === "cm" ? "210" : "84"}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vertical measurement
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({unit})
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === "ft" ? "3" : unit === "m" ? "0.9" : unit === "cm" ? "90" : "36"}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Horizontal measurement
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong>
                    <div className="mt-1 font-mono text-xs">
                      Area = Height × Width
                    </div>
                    <div className="mt-1 text-xs">
                      {formatNumber(calculation.height)} × {formatNumber(calculation.width)} = {formatNumber(calculation.area)} {getUnitLabel(calculation.unit)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Representation */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Door Visualization
                </h3>
                
                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <div className="relative">
                    {/* Door rectangle */}
                    <div 
                      className="border-4 border-gray-700 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg relative"
                      style={{
                        width: '200px',
                        height: `${Math.min(300, (calculation.height / calculation.width) * 200)}px`
                      }}
                    >
                      {/* Door handle */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-8 bg-gray-600 rounded-full"></div>
                      
                      {/* Door panels */}
                      <div className="absolute inset-4 grid grid-rows-2 gap-2">
                        <div className="border-2 border-amber-300 rounded"></div>
                        <div className="border-2 border-amber-300 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Dimensions */}
                    <div className="absolute -top-8 left-0 right-0 text-center text-sm font-semibold text-gray-700">
                      {formatNumber(calculation.width)} {calculation.unit}
                    </div>
                    <div className="absolute -right-16 top-0 bottom-0 flex items-center text-sm font-semibold text-gray-700">
                      {formatNumber(calculation.height)} {calculation.unit}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Unit Conversions */}
            {calculation && conversions.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Unit Conversions
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {conversions.map((conv) => (
                    <div key={conv.unit} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {getUnitDisplayName(conv.unit)}
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(conv.value)} {getUnitLabel(conv.unit)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Presets Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Standard Door Sizes
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
                    <div className="text-xs text-gray-500 mt-1">
                      {formatNumber(preset.height)} × {formatNumber(preset.width)} {preset.unit}
                    </div>
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Height</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.height)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Width</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.width)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.area)} {getUnitLabel(calculation.unit)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            {calculation && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Result
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
                            {formatNumber(entry.calculation.area)} {getUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.height)} × {formatNumber(entry.calculation.width)} {entry.calculation.unit}
                          {entry.calculation.includeFrame && ' (with frame)'}
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

      <DoorAreaCalculatorSEO />
      <RelatedTools
        currentTool="door-area-calculator"
        tools={['window-area-calculator', 'floor-area-calculator', 'wall-area-calculator']}
      />
    </>
  );
}
