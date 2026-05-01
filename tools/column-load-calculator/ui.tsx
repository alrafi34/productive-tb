"use client";

import { useState, useEffect } from "react";
import { ColumnType, EndCondition, Unit, ColumnCalculation } from "./types";
import {
  calculateColumnLoad,
  getColumnTypeDisplayName,
  getEndConditionDisplayName,
  getEndConditionFactors,
  getMaterialPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getStatusColor,
  getStatusBgColor
} from "./logic";
import ColumnLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ColumnLoadCalculatorUI() {
  const [columnType, setColumnType] = useState<ColumnType>("concrete");
  const [unit, setUnit] = useState<Unit>("mm");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [height, setHeight] = useState("");
  
  // Concrete properties
  const [fck, setFck] = useState("");
  const [steelPercentage, setSteelPercentage] = useState("");
  
  // Steel properties
  const [fy, setFy] = useState("");
  const [area, setArea] = useState("");
  
  // Settings
  const [safetyFactor, setSafetyFactor] = useState("1.5");
  const [endCondition, setEndCondition] = useState<EndCondition>("pinned-pinned");
  
  // Results
  const [calculation, setCalculation] = useState<ColumnCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const w = parseFloat(width);
    const d = parseFloat(depth);
    const h = parseFloat(height);
    const sf = parseFloat(safetyFactor);
    
    if (!isNaN(w) && !isNaN(d) && !isNaN(h) && !isNaN(sf) && 
        w > 0 && d > 0 && h > 0 && sf > 0) {
      
      if (columnType === 'concrete') {
        const fckNum = parseFloat(fck);
        const steelPct = parseFloat(steelPercentage);
        
        if (!isNaN(fckNum) && !isNaN(steelPct) && fckNum > 0 && steelPct > 0) {
          const result = calculateColumnLoad(
            columnType, w, d, h, unit, sf, endCondition,
            fckNum, steelPct
          );
          setCalculation(result);
        } else {
          setCalculation(null);
        }
      } else {
        const fyNum = parseFloat(fy);
        const areaNum = parseFloat(area);
        
        if (!isNaN(fyNum) && !isNaN(areaNum) && fyNum > 0 && areaNum > 0) {
          const result = calculateColumnLoad(
            columnType, w, d, h, unit, sf, endCondition,
            undefined, undefined, fyNum, areaNum
          );
          setCalculation(result);
        } else {
          setCalculation(null);
        }
      }
    } else {
      setCalculation(null);
    }
  }, [columnType, width, depth, height, fck, steelPercentage, fy, area, 
      safetyFactor, endCondition, unit]);

  const handleReset = () => {
    setWidth("");
    setDepth("");
    setHeight("");
    setFck("");
    setSteelPercentage("");
    setFy("");
    setArea("");
    setSafetyFactor("1.5");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setWidth("300");
    setDepth("300");
    setHeight("3");
    if (columnType === 'concrete') {
      setFck("25");
      setSteelPercentage("2");
    } else {
      setFy("250");
      setArea("5000");
    }
    setSafetyFactor("1.5");
  };

  const handleColumnTypeChange = (type: ColumnType) => {
    setColumnType(type);
    setCalculation(null);
  };

  const handleApplyPreset = (preset: any) => {
    if (preset.fck) {
      setFck(preset.fck.toString());
      setColumnType('concrete');
    }
    if (preset.fy) {
      setFy(preset.fy.toString());
      setColumnType('steel');
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Load Capacity: ${formatNumber(calculation.loadCapacity)} kN\nSafe Load: ${formatNumber(calculation.safeLoad)} kN\nSlenderness: ${formatNumber(calculation.slendernessRatio)} (${calculation.slendernessStatus})`;
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
      downloadFile(text, 'column_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'column_load_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ColumnCalculation) => {
    setColumnType(calc.columnType);
    setWidth(calc.width.toString());
    setDepth(calc.depth.toString());
    setHeight(calc.height.toString());
    setUnit(calc.unit);
    setSafetyFactor(calc.safetyFactor.toString());
    setEndCondition(calc.endCondition);
    
    if (calc.columnType === 'concrete') {
      setFck(calc.fck!.toString());
      setSteelPercentage(calc.steelPercentage!.toString());
    } else {
      setFy(calc.fy!.toString());
      setArea(calc.area!.toString());
    }
    
    setShowHistory(false);
  };

  const materialPresets = getMaterialPresets();
  const endConditionFactors = getEndConditionFactors();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Column Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate load-bearing capacity of concrete and steel columns with instant results, safety factor analysis, and slenderness ratio evaluation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Column Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Column Type</label>
                <select
                  value={columnType}
                  onChange={(e) => handleColumnTypeChange(e.target.value as ColumnType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="concrete">Reinforced Concrete</option>
                  <option value="steel">Steel Column</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("mm")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "mm"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Millimeters
                  </button>
                  <button
                    onClick={() => setUnit("inches")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "inches"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Inches
                  </button>
                </div>
              </div>

              {/* Safety Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Safety Factor</label>
                <input
                  type="number"
                  value={safetyFactor}
                  onChange={(e) => setSafetyFactor(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1.5"
                  min="1"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical: 1.5 - 2.0
                </p>
              </div>

              {/* End Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Condition</label>
                <select
                  value={endCondition}
                  onChange={(e) => setEndCondition(e.target.value as EndCondition)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  {endConditionFactors.map((ec) => (
                    <option key={ec.type} value={ec.type}>
                      {ec.name}
                    </option>
                  ))}
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
                    Load Capacity
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.loadCapacity)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kilonewtons (kN)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Safe Load:</span>
                    <span className="font-semibold">{formatNumber(calculation.safeLoad)} kN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">In Tons:</span>
                    <span className="font-semibold">{formatNumber(calculation.loadCapacityTons)} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Safe (tons):</span>
                    <span className="font-semibold">{formatNumber(calculation.safeLoadTons)} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slenderness:</span>
                    <span className="font-semibold">{formatNumber(calculation.slendernessRatio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Status:</span>
                    <span className="font-semibold uppercase">{calculation.slendernessStatus}</span>
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
            
            {/* Dimensions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Column Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({unit})
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="300"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Depth ({unit})
                  </label>
                  <input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="300"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (m)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="3"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Material Properties Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Material Properties
              </h3>
              
              {columnType === 'concrete' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Concrete Strength (fck) MPa
                    </label>
                    <input
                      type="number"
                      value={fck}
                      onChange={(e) => setFck(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="25"
                      min="0"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 20-35 MPa
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Steel Reinforcement (%)
                    </label>
                    <input
                      type="number"
                      value={steelPercentage}
                      onChange={(e) => setSteelPercentage(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 1-4%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yield Strength (fy) MPa
                    </label>
                    <input
                      type="number"
                      value={fy}
                      onChange={(e) => setFy(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="250"
                      min="0"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 250-415 MPa
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cross-sectional Area (mm²)
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5000"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {
                      columnType === 'concrete' 
                        ? 'Pu = 0.4 × fck × Ac + 0.67 × fy × Asc' 
                        : 'P = fy × A'
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Material Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Material Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {materialPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slenderness Status */}
            {calculation && (
              <div className={`rounded-xl border p-6 ${getStatusBgColor(calculation.slendernessStatus)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">
                    {calculation.slendernessStatus === 'safe' ? '✅' : 
                     calculation.slendernessStatus === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <h3 className={`font-semibold text-lg ${getStatusColor(calculation.slendernessStatus)}`}>
                    Slenderness: {calculation.slendernessStatus.charAt(0).toUpperCase() + calculation.slendernessStatus.slice(1)}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <strong>Slenderness Ratio:</strong> {formatNumber(calculation.slendernessRatio)}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Effective Length:</strong> {formatNumber(calculation.effectiveLength)} m
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>End Condition:</strong> {getEndConditionDisplayName(calculation.endCondition)}
                  </p>
                  {calculation.slendernessRatio >= 12 && (
                    <p className="text-sm text-gray-700 mt-2">
                      ⚠️ Load capacity has been reduced due to slenderness effects.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Load Capacity</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.loadCapacity)} kN</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Safe Load</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.safeLoad)} kN</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">In Tons</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.loadCapacityTons)} tons</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dimensions</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.width)} × {formatNumber(calculation.depth)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Height</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.height)} m</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Safety Factor</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.safetyFactor)}</div>
                  </div>
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
                            {getColumnTypeDisplayName(entry.calculation.columnType)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.width)} × {formatNumber(entry.calculation.depth)} {entry.calculation.unit} • 
                          Load: {formatNumber(entry.calculation.loadCapacity)} kN • 
                          Status: {entry.calculation.slendernessStatus}
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

      <ColumnLoadCalculatorSEO />
      <RelatedTools
        currentTool="column-load-calculator"
        tools={['beam-load-calculator', 'foundation-depth-calculator', 'concrete-volume-calculator']}
      />
    </>
  );
}
