"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, WallSection, Opening, FacadeCalculation } from "./types";
import {
  calculateFacadeArea,
  createWallSection,
  createOpening,
  validateWallSection,
  validateOpening,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  getLinearUnitLabel,
  debounce
} from "./logic";
import FacadeAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FacadeAreaCalculatorUI() {
  const [wallSections, setWallSections] = useState<WallSection[]>([createWallSection(10, 5)]);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [unit, setUnit] = useState<Unit>("meters");
  
  const [calculation, setCalculation] = useState<FacadeCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      try {
        const result = calculateFacadeArea(wallSections, openings, unit);
        setCalculation(result);
      } catch (err) {
        console.error("Calculation error:", err);
      }
    }, 150),
    [wallSections, openings, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [wallSections, openings, unit, debouncedCalculate]);

  const handleAddWall = () => {
    setWallSections([...wallSections, createWallSection()]);
  };

  const handleRemoveWall = (id: string) => {
    if (wallSections.length > 1) {
      setWallSections(wallSections.filter(w => w.id !== id));
    }
  };

  const handleUpdateWall = (id: string, field: keyof WallSection, value: number) => {
    setWallSections(wallSections.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  const handleAddOpening = () => {
    setOpenings([...openings, createOpening()]);
  };

  const handleRemoveOpening = (id: string) => {
    setOpenings(openings.filter(o => o.id !== id));
  };

  const handleUpdateOpening = (id: string, field: keyof Opening, value: number) => {
    setOpenings(openings.map(o => 
      o.id === id ? { ...o, [field]: value } : o
    ));
  };

  const handleReset = () => {
    setWallSections([createWallSection(10, 5)]);
    setOpenings([]);
    setUnit("meters");
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Net Facade Area: ${formatNumber(calculation.netArea, 2)} ${getUnitLabel(calculation.unit)}`;
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
      downloadFile(csv, 'facade-area-calculation.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'facade-area-calculation.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: FacadeCalculation) => {
    setWallSections(calc.wallSections);
    setOpenings(calc.openings);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Facade Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate building facade area instantly. Add walls, subtract windows and doors, and get accurate exterior surface area for construction, painting, and materials.
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
                  <option value="meters">Meters (m²)</option>
                  <option value="feet">Feet (ft²)</option>
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
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Net Facade Area
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.netArea, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(calculation.unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Walls:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalWallArea, 2)} {getUnitLabel(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Openings:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalOpeningsArea, 2)} {getUnitLabel(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Sections:</span>
                    <span className="font-semibold">{calculation.wallSections.length} walls</span>
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
            
            {/* Wall Sections */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Wall Sections
                </h3>
                <button
                  onClick={handleAddWall}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  + Add Wall
                </button>
              </div>
              
              <div className="space-y-3">
                {wallSections.map((wall, index) => {
                  const error = validateWallSection(wall);
                  const area = wall.width * wall.height;
                  
                  return (
                    <div key={wall.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900 text-sm">Wall {index + 1}</span>
                        {wallSections.length > 1 && (
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

            {/* Openings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Openings (Windows, Doors)
                </h3>
                <button
                  onClick={handleAddOpening}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  + Add Opening
                </button>
              </div>
              
              {openings.length === 0 ? (
                <div className="p-8 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  No openings added yet
                </div>
              ) : (
                <div className="space-y-3">
                  {openings.map((opening, index) => {
                    const error = validateOpening(opening);
                    const area = opening.width * opening.height * opening.quantity;
                    
                    return (
                      <div key={opening.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-900 text-sm">Opening {index + 1}</span>
                          <button
                            onClick={() => handleRemoveOpening(opening.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Width ({getLinearUnitLabel(unit)})
                            </label>
                            <input
                              type="number"
                              value={opening.width || ''}
                              onChange={(e) => handleUpdateOpening(opening.id, 'width', parseFloat(e.target.value) || 0)}
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
                              value={opening.height || ''}
                              onChange={(e) => handleUpdateOpening(opening.id, 'height', parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                              placeholder="0"
                              min="0"
                              step="0.1"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              value={opening.quantity || ''}
                              onChange={(e) => handleUpdateOpening(opening.id, 'quantity', parseInt(e.target.value) || 1)}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                              placeholder="1"
                              min="1"
                              step="1"
                            />
                          </div>
                        </div>
                        
                        {error ? (
                          <div className="mt-2 text-xs text-red-600">{error}</div>
                        ) : (
                          <div className="mt-2 text-xs text-gray-600">
                            Total Area: <span className="font-semibold text-red-600">{formatNumber(area, 2)} {getUnitLabel(unit)}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Calculation Summary */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Walls</div>
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(calculation.totalWallArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(calculation.unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Openings</div>
                    <div className="text-2xl font-bold text-red-600">{formatNumber(calculation.totalOpeningsArea, 2)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(calculation.unit)}</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Net Area</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(calculation.netArea, 2)}</div>
                    <div className="text-xs text-primary font-medium">{getUnitLabel(calculation.unit)}</div>
                  </div>
                </div>

                {calculation && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> Net Area = Total Wall Area − Total Openings Area
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Export Buttons */}
            {calculation && (
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
                            {formatNumber(entry.calculation.netArea, 2)} {getUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.wallSections.length} walls • 
                          {entry.calculation.openings.length} openings
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

      <FacadeAreaCalculatorSEO />
      <RelatedTools
        currentTool="facade-area-calculator"
        tools={['wall-area-calculator', 'paint-required-calculator', 'room-area-calculator']}
      />
    </>
  );
}
