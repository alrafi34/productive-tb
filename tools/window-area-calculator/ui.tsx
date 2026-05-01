"use client";

import { useState, useEffect } from "react";
import { Unit, WindowEntry, WindowCalculation } from "./types";
import {
  calculateWindowArea,
  calculateTotalArea,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getUnitLabel,
  getUnitDisplayName,
  generateId
} from "./logic";
import WindowAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WindowAreaCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("ft");
  const [windows, setWindows] = useState<WindowEntry[]>([
    { id: generateId(), width: 0, height: 0, area: 0 }
  ]);
  const [totalArea, setTotalArea] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate areas whenever windows change
  useEffect(() => {
    const updatedWindows = windows.map(window => ({
      ...window,
      area: calculateWindowArea(window.width, window.height)
    }));
    
    const total = calculateTotalArea(updatedWindows);
    setTotalArea(total);
  }, [windows]);

  const handleAddWindow = () => {
    setWindows([...windows, { id: generateId(), width: 0, height: 0, area: 0 }]);
  };

  const handleRemoveWindow = (id: string) => {
    if (windows.length > 1) {
      setWindows(windows.filter(w => w.id !== id));
    }
  };

  const handleUpdateWindow = (id: string, field: 'width' | 'height', value: string) => {
    const numValue = parseFloat(value) || 0;
    setWindows(windows.map(w => 
      w.id === id ? { ...w, [field]: numValue } : w
    ));
  };

  const handleReset = () => {
    setWindows([{ id: generateId(), width: 0, height: 0, area: 0 }]);
  };

  const handleCopy = () => {
    const text = `Total Window Area: ${formatNumber(totalArea)} ${getUnitLabel(unit)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCalculation = () => {
    const calculation: WindowCalculation = {
      windows: windows.filter(w => w.width > 0 && w.height > 0),
      unit,
      totalArea,
      timestamp: Date.now()
    };
    
    if (calculation.windows.length > 0) {
      saveToHistory(calculation);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    const calculation: WindowCalculation = {
      windows: windows.filter(w => w.width > 0 && w.height > 0),
      unit,
      totalArea
    };
    
    if (calculation.windows.length > 0) {
      const text = exportToText(calculation);
      downloadFile(text, 'window_area_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    const calculation: WindowCalculation = {
      windows: windows.filter(w => w.width > 0 && w.height > 0),
      unit,
      totalArea
    };
    
    if (calculation.windows.length > 0) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'window_area_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: WindowCalculation) => {
    setUnit(calc.unit);
    setWindows(calc.windows.map(w => ({ ...w, id: generateId() })));
    setShowHistory(false);
  };

  const validWindows = windows.filter(w => w.width > 0 && w.height > 0);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🪟</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Window Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate total window area for multiple windows with instant results. Perfect for material estimation, cost calculation, and construction planning.
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
                  <option value="mm">Millimeters (mm)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="m">Meters (m)</option>
                  <option value="inches">Inches (in)</option>
                  <option value="ft">Feet (ft)</option>
                </select>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleAddWindow}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  ➕ Add Window
                </button>
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

            {/* Result Display */}
            {validWindows.length > 0 && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Window Area
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(totalArea)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Windows:</span>
                    <span className="font-semibold">{validWindows.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Average Area:</span>
                    <span className="font-semibold">{formatNumber(totalArea / validWindows.length)} {getUnitLabel(unit)}</span>
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
            
            {/* Windows Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Window Dimensions
                </h3>
                <span className="text-sm text-gray-500">
                  {windows.length} window{windows.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="space-y-3">
                {windows.map((window, index) => (
                  <div key={window.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">
                        Window {index + 1}
                      </span>
                      {windows.length > 1 && (
                        <button
                          onClick={() => handleRemoveWindow(window.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          ✕ Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Width ({unit})
                        </label>
                        <input
                          type="number"
                          value={window.width || ''}
                          onChange={(e) => handleUpdateWindow(window.id, 'width', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          placeholder="0"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Height ({unit})
                        </label>
                        <input
                          type="number"
                          value={window.height || ''}
                          onChange={(e) => handleUpdateWindow(window.id, 'height', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          placeholder="0"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Area
                        </label>
                        <div className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-mono text-gray-900 font-semibold">
                          {formatNumber(window.area)}
                        </div>
                      </div>
                    </div>
                    
                    {window.width > 0 && window.height > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        {formatNumber(window.width)} × {formatNumber(window.height)} = {formatNumber(window.area)} {getUnitLabel(unit)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddWindow}
                className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm border-2 border-dashed border-gray-300"
              >
                ➕ Add Another Window
              </button>
            </div>

            {/* Summary Panel */}
            {validWindows.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="space-y-3">
                  {validWindows.map((window, index) => (
                    <div key={window.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-700">
                        Window {index + 1}: {formatNumber(window.width)} × {formatNumber(window.height)} {unit}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {formatNumber(window.area)} {getUnitLabel(unit)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
                    <span className="text-base font-semibold text-gray-900">
                      Total Area
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {formatNumber(totalArea)} {getUnitLabel(unit)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {validWindows.length > 0 && (
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
                            {entry.calculation.windows.length} window{entry.calculation.windows.length !== 1 ? 's' : ''}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Total: {formatNumber(entry.calculation.totalArea)} {getUnitLabel(entry.calculation.unit)}
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

      <WindowAreaCalculatorSEO />
      <RelatedTools
        currentTool="window-area-calculator"
        tools={['floor-area-calculator', 'wall-area-calculator', 'room-area-calculator']}
      />
    </>
  );
}
