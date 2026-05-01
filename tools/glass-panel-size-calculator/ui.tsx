"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, FrameType, Clearances, GlassCalculation } from "./types";
import {
  calculateGlassPanelSize,
  validateInputs,
  getWarningMessage,
  getFramePresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  getAreaUnitLabel,
  debounce
} from "./logic";
import GlassPanelSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function GlassPanelSizeCalculatorUI() {
  const [openingWidth, setOpeningWidth] = useState(1000);
  const [openingHeight, setOpeningHeight] = useState(2000);
  const [clearances, setClearances] = useState<Clearances>({
    left: 5,
    right: 5,
    top: 5,
    bottom: 5
  });
  const [panelCount, setPanelCount] = useState(1);
  const [gapBetweenPanels, setGapBetweenPanels] = useState(5);
  const [unit, setUnit] = useState<Unit>("mm");
  const [frameType, setFrameType] = useState<FrameType>("aluminum");
  
  const [calculation, setCalculation] = useState<GlassCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const framePresets = getFramePresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      setWarning(null);
      
      const validationError = validateInputs(
        openingWidth,
        openingHeight,
        clearances,
        panelCount,
        gapBetweenPanels
      );
      
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateGlassPanelSize(
          openingWidth,
          openingHeight,
          clearances,
          panelCount,
          gapBetweenPanels,
          unit,
          frameType
        );
        setCalculation(result);
        
        // Check for warnings
        const warningMsg = getWarningMessage(result.panelWidth, unit);
        if (warningMsg) {
          setWarning(warningMsg);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [openingWidth, openingHeight, clearances, panelCount, gapBetweenPanels, unit, frameType]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [openingWidth, openingHeight, clearances, panelCount, gapBetweenPanels, unit, frameType, debouncedCalculate]);

  const handleReset = () => {
    setOpeningWidth(1000);
    setOpeningHeight(2000);
    setClearances({ left: 5, right: 5, top: 5, bottom: 5 });
    setPanelCount(1);
    setGapBetweenPanels(5);
    setUnit("mm");
    setFrameType("aluminum");
    setCalculation(null);
    setError(null);
    setWarning(null);
  };

  const handleApplyFramePreset = (preset: any) => {
    setFrameType(preset.type);
    setClearances(preset.clearances);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Panel Width: ${formatNumber(calculation.panelWidth, 2)} ${getUnitLabel(calculation.unit)}\nGlass Height: ${formatNumber(calculation.glassHeight, 2)} ${getUnitLabel(calculation.unit)}\nPanels: ${calculation.panelCount}`;
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
      downloadFile(text, 'glass-panel-calculation.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: GlassCalculation) => {
    setOpeningWidth(calc.openingWidth);
    setOpeningHeight(calc.openingHeight);
    setClearances(calc.clearances);
    setPanelCount(calc.panelCount);
    setGapBetweenPanels(calc.gapBetweenPanels);
    setUnit(calc.unit);
    setFrameType(calc.frameType);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🪟</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Glass Panel Size Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate glass panel dimensions instantly for windows, doors, and partitions. Get precise width and height with clearance and multi-panel support.
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
                  <option value="mm">Millimeters (mm)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="inch">Inches (in)</option>
                </select>
              </div>

              {/* Frame Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frame Type</label>
                <select
                  value={frameType}
                  onChange={(e) => setFrameType(e.target.value as FrameType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="frameless">Frameless</option>
                  <option value="aluminum">Aluminum Frame</option>
                  <option value="sliding">Sliding System</option>
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
                    Panel Width
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.panelWidth, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(calculation.unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Glass Height:</span>
                    <span className="font-semibold">{formatNumber(calculation.glassHeight, 2)} {getUnitLabel(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Panels:</span>
                    <span className="font-semibold">{calculation.panelCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalGlassArea, 2)} {getAreaUnitLabel(calculation.unit)}</span>
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
            
            {/* Opening Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Opening Dimensions
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opening Width ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={openingWidth || ''}
                    onChange={(e) => setOpeningWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1000"
                    min="0"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opening Height ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={openingHeight || ''}
                    onChange={(e) => setOpeningHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2000"
                    min="0"
                    step="1"
                  />
                </div>
              </div>
            </div>

            {/* Clearances */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Clearances / Gaps
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Left ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={clearances.left || ''}
                    onChange={(e) => setClearances({ ...clearances, left: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Right ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={clearances.right || ''}
                    onChange={(e) => setClearances({ ...clearances, right: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Top ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={clearances.top || ''}
                    onChange={(e) => setClearances({ ...clearances, top: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bottom ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={clearances.bottom || ''}
                    onChange={(e) => setClearances({ ...clearances, bottom: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Panel Configuration */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Panel Configuration
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Panels
                  </label>
                  <input
                    type="number"
                    value={panelCount || ''}
                    onChange={(e) => setPanelCount(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1"
                    min="1"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gap Between Panels ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={gapBetweenPanels || ''}
                    onChange={(e) => setGapBetweenPanels(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                    disabled={panelCount <= 1}
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Panel Width = (Opening Width − Clearances − Gaps) ÷ Panel Count
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

            {/* Warning Display */}
            {warning && !error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <span className="font-medium">{warning}</span>
                </div>
              </div>
            )}

            {/* Frame Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Frame Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {framePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyFramePreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.clearances.left}mm clearance
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
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Panel Width</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(calculation.panelWidth, 2)}</div>
                    <div className="text-xs text-primary font-medium">{getUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Glass Height</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.glassHeight, 2)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Panels</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.panelCount}</div>
                    <div className="text-xs text-gray-600">panels</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Area</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.totalGlassArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getAreaUnitLabel(unit)}</div>
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
                            {formatNumber(entry.calculation.panelWidth, 2)} {getUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.panelCount} panels • 
                          Height: {formatNumber(entry.calculation.glassHeight, 2)} {getUnitLabel(entry.calculation.unit)}
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

      <GlassPanelSizeCalculatorSEO />
      <RelatedTools
        currentTool="glass-panel-size-calculator"
        tools={['window-area-calculator', 'door-area-calculator', 'facade-area-calculator']}
      />
    </>
  );
}
