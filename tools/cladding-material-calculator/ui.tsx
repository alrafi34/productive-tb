"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, WallInput, PanelSize, CladdingCalculation } from "./types";
import {
  calculateCladdingMaterials,
  createWallInput,
  validateWallInput,
  validatePanelSize,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  getLinearUnitLabel,
  getPresetTemplates,
  debounce
} from "./logic";
import CladdingMaterialCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CladdingMaterialCalculatorUI() {
  const [walls, setWalls] = useState<WallInput[]>([createWallInput(20, 10)]);
  const [panelSize, setPanelSize] = useState<PanelSize>({ width: 2, height: 2 });
  const [unit, setUnit] = useState<Unit>("feet");
  const [wastagePercentage, setWastagePercentage] = useState(10);
  const [costPerPanel, setCostPerPanel] = useState(0);
  
  const [calculation, setCalculation] = useState<CladdingCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presetTemplates = getPresetTemplates();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      try {
        const result = calculateCladdingMaterials(
          walls,
          panelSize,
          unit,
          wastagePercentage,
          costPerPanel
        );
        setCalculation(result);
      } catch (err) {
        console.error("Calculation error:", err);
      }
    }, 150),
    [walls, panelSize, unit, wastagePercentage, costPerPanel]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [walls, panelSize, unit, wastagePercentage, costPerPanel, debouncedCalculate]);

  const handleAddWall = () => {
    setWalls([...walls, createWallInput()]);
  };

  const handleRemoveWall = (id: string) => {
    if (walls.length > 1) {
      setWalls(walls.filter(w => w.id !== id));
    }
  };

  const handleUpdateWall = (id: string, field: keyof WallInput, value: number) => {
    setWalls(walls.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  const handleReset = () => {
    setWalls([createWallInput(20, 10)]);
    setPanelSize({ width: 2, height: 2 });
    setUnit("feet");
    setWastagePercentage(10);
    setCostPerPanel(0);
    setCalculation(null);
  };

  const handleApplyPreset = (preset: any) => {
    setPanelSize({ width: preset.panelWidth, height: preset.panelHeight });
    setWastagePercentage(preset.wastage);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Panels Required: ${calculation.totalPanelsRequired} panels (${formatNumber(calculation.totalWallArea, 2)} ${getUnitLabel(calculation.unit)})`;
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
      downloadFile(csv, 'cladding-material-calculation.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'cladding-material-calculation.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: CladdingCalculation) => {
    setWalls(calc.walls);
    setPanelSize(calc.panelSize);
    setUnit(calc.unit);
    setWastagePercentage(calc.wastagePercentage);
    setCostPerPanel(calc.costPerPanel);
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
              <h3 className="font-semibold text-blue-900 mb-1">Cladding Material Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate cladding materials instantly. Estimate panels, surface area, wastage, and cost for facade projects.
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

              {/* Wastage Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wastage: {wastagePercentage}%
                </label>
                <input
                  type="range"
                  value={wastagePercentage}
                  onChange={(e) => setWastagePercentage(parseInt(e.target.value))}
                  className="w-full"
                  min="0"
                  max="25"
                  step="1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>25%</span>
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
            {calculation && calculation.panelArea > 0 && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Panels Required
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.totalPanelsRequired}
                  </div>
                  <div className="text-xl text-primary-100">
                    panels
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalWallArea, 2)} {getUnitLabel(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Panels:</span>
                    <span className="font-semibold">{formatNumber(calculation.basePanelsRequired, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Wastage:</span>
                    <span className="font-semibold">{formatNumber(calculation.wastageQuantity, 2)}</span>
                  </div>
                  {calculation.costPerPanel > 0 && (
                    <div className="flex justify-between pt-2 border-t border-white/20">
                      <span className="text-primary-100">Total Cost:</span>
                      <span className="font-semibold">${formatNumber(calculation.totalCost, 2)}</span>
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
            
            {/* Wall Sections */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Wall Dimensions
                </h3>
                <button
                  onClick={handleAddWall}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  + Add Wall
                </button>
              </div>
              
              <div className="space-y-3">
                {walls.map((wall, index) => {
                  const error = validateWallInput(wall);
                  const area = wall.width * wall.height;
                  
                  return (
                    <div key={wall.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900 text-sm">Wall {index + 1}</span>
                        {walls.length > 1 && (
                          <button
                            onClick={() => handleRemoveWall(wall.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Width ({getLinearUnitLabel(unit)})
                          </label>
                          <input
                            type="number"
                            value={wall.width || ''}
                            onChange={(e) => handleUpdateWall(wall.id, 'width', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="0"
                            min="0"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Height ({getLinearUnitLabel(unit)})
                          </label>
                          <input
                            type="number"
                            value={wall.height || ''}
                            onChange={(e) => handleUpdateWall(wall.id, 'height', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="0"
                            min="0"
                            step="0.1"
                          />
                        </div>
                      </div>
                      
                      {error ? (
                        <div className="mt-2 text-xs text-red-600">{error}</div>
                      ) : (
                        <div className="mt-2 text-xs text-gray-600">
                          Area: <span className="font-semibold text-primary">{formatNumber(area, 2)} {getUnitLabel(unit)}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel Size */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Panel / Cladding Size
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Panel Width ({getLinearUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={panelSize.width || ''}
                    onChange={(e) => setPanelSize({ ...panelSize, width: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Panel Height ({getLinearUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={panelSize.height || ''}
                    onChange={(e) => setPanelSize({ ...panelSize, height: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && calculation.panelArea > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Panel Area:</strong> {formatNumber(calculation.panelArea, 2)} {getUnitLabel(unit)}
                  </div>
                </div>
              )}
            </div>

            {/* Cost Estimation */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Cost Estimation (Optional)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost per Panel ($)
                </label>
                <input
                  type="number"
                  value={costPerPanel || ''}
                  onChange={(e) => setCostPerPanel(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Panel Presets
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
                      {preset.category} • {preset.wastage}% wastage
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Summary */}
            {calculation && calculation.panelArea > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Area</div>
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(calculation.totalWallArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Panel Area</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.panelArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base Panels</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.basePanelsRequired, 2)}</div>
                    <div className="text-xs text-gray-600">panels</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Total Panels</div>
                    <div className="text-2xl font-bold text-primary">{calculation.totalPanelsRequired}</div>
                    <div className="text-xs text-primary font-medium">with wastage</div>
                  </div>
                </div>

                {calculation && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> Panels = (Total Area ÷ Panel Area) × (1 + Wastage%)
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Export Buttons */}
            {calculation && calculation.panelArea > 0 && (
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
                            {entry.calculation.totalPanelsRequired} panels
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.totalWallArea, 2)} {getUnitLabel(entry.calculation.unit)} • 
                          {entry.calculation.walls.length} walls
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

      <CladdingMaterialCalculatorSEO />
      <RelatedTools
        currentTool="cladding-material-calculator"
        tools={['facade-area-calculator', 'wall-area-calculator', 'paint-required-calculator']}
      />
    </>
  );
}
