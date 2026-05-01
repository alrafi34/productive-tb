"use client";

import { useState, useEffect } from "react";
import { Unit, StaircaseCalculation } from "./types";
import {
  calculateStaircase,
  getStaircasePresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  generateStaircaseDiagram
} from "./logic";
import StaircaseCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function StaircaseCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("mm");
  const [totalHeight, setTotalHeight] = useState("");
  const [maxRiserHeight, setMaxRiserHeight] = useState("180");
  const [desiredTreadDepth, setDesiredTreadDepth] = useState("250");
  const [stairWidth, setStairWidth] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<StaircaseCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const height = parseFloat(totalHeight);
    const maxRiser = parseFloat(maxRiserHeight);
    const tread = parseFloat(desiredTreadDepth);
    const width = stairWidth ? parseFloat(stairWidth) : undefined;
    
    if (!isNaN(height) && !isNaN(maxRiser) && !isNaN(tread) && height > 0 && maxRiser > 0 && tread > 0) {
      const result = calculateStaircase(height, maxRiser, tread, unit, width);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [totalHeight, maxRiserHeight, desiredTreadDepth, stairWidth, unit]);

  const handleReset = () => {
    setTotalHeight("");
    setMaxRiserHeight("180");
    setDesiredTreadDepth("250");
    setStairWidth("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setTotalHeight("3000");
    setMaxRiserHeight("180");
    setDesiredTreadDepth("250");
  };

  const handleApplyPreset = (preset: any) => {
    setUnit(preset.unit);
    setTotalHeight(preset.totalHeight.toString());
    setMaxRiserHeight(preset.maxRiserHeight.toString());
    setDesiredTreadDepth(preset.desiredTreadDepth.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Steps: ${calculation.numberOfRisers}\nRiser: ${formatNumber(calculation.actualRiserHeight)} ${calculation.unit}\nTread: ${formatNumber(calculation.desiredTreadDepth)} ${calculation.unit}\nTotal Run: ${formatNumber(calculation.totalRun)} ${calculation.unit}`;
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
      downloadFile(text, 'staircase_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'staircase_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: StaircaseCalculation) => {
    setUnit(calc.unit);
    setTotalHeight(calc.totalHeight.toString());
    setMaxRiserHeight(calc.maxRiserHeight.toString());
    setDesiredTreadDepth(calc.desiredTreadDepth.toString());
    if (calc.stairWidth) {
      setStairWidth(calc.stairWidth.toString());
    }
    setShowHistory(false);
  };

  const presets = getStaircasePresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🪜</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Staircase Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate optimal step dimensions for safe, comfortable, and regulation-compliant staircases with instant results and visual diagrams.
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
                    Number of Steps
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.numberOfRisers}
                  </div>
                  <div className="text-xl text-primary-100">
                    risers
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Riser Height:</span>
                    <span className="font-semibold">{formatNumber(calculation.actualRiserHeight)} {calculation.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Tread Depth:</span>
                    <span className="font-semibold">{formatNumber(calculation.desiredTreadDepth)} {calculation.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Run:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalRun)} {calculation.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Stair Angle:</span>
                    <span className="font-semibold">{formatNumber(calculation.stairAngle)}°</span>
                  </div>
                </div>

                {/* Comfort Status */}
                <div className={`p-3 rounded-lg ${calculation.isComfortable ? 'bg-green-500/20 border border-green-400/30' : 'bg-yellow-500/20 border border-yellow-400/30'}`}>
                  <div className="text-xs font-semibold mb-1">
                    {calculation.isComfortable ? '✓ Comfortable Design' : '⚠ Not Optimal'}
                  </div>
                  <div className="text-xs">
                    2R + T = {formatNumber(calculation.comfortFormula)} mm
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    {calculation.isComfortable ? 'Within 600-650mm range' : 'Outside 600-650mm range'}
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
                Staircase Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Height ({unit})
                  </label>
                  <input
                    type="number"
                    value={totalHeight}
                    onChange={(e) => setTotalHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="3000"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Floor to floor height
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Riser Height ({unit})
                  </label>
                  <input
                    type="number"
                    value={maxRiserHeight}
                    onChange={(e) => setMaxRiserHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="180"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ideal: 150-180 {unit === 'mm' ? 'mm' : unit === 'cm' ? 'cm' : 'in'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Tread Depth ({unit})
                  </label>
                  <input
                    type="number"
                    value={desiredTreadDepth}
                    onChange={(e) => setDesiredTreadDepth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="250"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ideal: 240-300 {unit === 'mm' ? 'mm' : unit === 'cm' ? 'cm' : 'in'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stair Width ({unit}) <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    value={stairWidth}
                    onChange={(e) => setStairWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1000"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 900-1200 {unit === 'mm' ? 'mm' : unit === 'cm' ? 'cm' : 'in'}
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formulas:</strong>
                    <div className="mt-1 font-mono text-xs space-y-1">
                      <div>Number of Risers = ceil(Height / Max Riser)</div>
                      <div>Actual Riser = Height / Number of Risers</div>
                      <div>Number of Treads = Risers - 1</div>
                      <div>Total Run = Treads × Tread Depth</div>
                      <div>Angle = arctan(Riser / Tread) × (180 / π)</div>
                      <div>Comfort: 2R + T ≈ 600-650 mm</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Diagram */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Staircase Visualization
                </h3>
                
                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div 
                    className="w-full max-w-md"
                    dangerouslySetInnerHTML={{ __html: generateStaircaseDiagram(calculation.numberOfRisers, calculation.actualRiserHeight, calculation.desiredTreadDepth) }}
                  />
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Showing {Math.min(calculation.numberOfRisers, 8)} of {calculation.numberOfRisers} steps
                </p>
              </div>
            )}

            {/* Presets Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Staircase Types
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Risers</div>
                    <div className="text-lg font-bold text-primary">{calculation.numberOfRisers}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Treads</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.numberOfTreads}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Riser Height</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.actualRiserHeight)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tread Depth</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.desiredTreadDepth)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Run</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.totalRun)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Angle</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.stairAngle)}°</div>
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
                            {entry.calculation.numberOfRisers} steps
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Height: {formatNumber(entry.calculation.totalHeight)} {entry.calculation.unit} • 
                          Riser: {formatNumber(entry.calculation.actualRiserHeight)} {entry.calculation.unit} • 
                          {entry.calculation.isComfortable ? '✓ Comfortable' : '⚠ Not Optimal'}
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

      <StaircaseCalculatorSEO />
      <RelatedTools
        currentTool="staircase-calculator"
        tools={['floor-area-calculator', 'room-volume-calculator', 'wall-area-calculator']}
      />
    </>
  );
}
