"use client";

import { useState, useEffect } from "react";
import { CalculationMode, Unit, SpacingCalculation } from "./types";
import {
  calculateSpacing,
  calculateNumberOfBars,
  checkSpacingValidity,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  convertFromMm
} from "./logic";
import RebarSpacingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RebarSpacingCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("spacing");
  const [unit, setUnit] = useState<Unit>("mm");
  
  // Spacing mode inputs
  const [width, setWidth] = useState("");
  const [numberOfBars, setNumberOfBars] = useState("");
  const [barDiameter, setBarDiameter] = useState("");
  const [clearCover, setClearCover] = useState("");
  
  // Bars mode inputs
  const [desiredSpacing, setDesiredSpacing] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<SpacingCalculation | null>(null);
  const [validityCheck, setValidityCheck] = useState<{ isValid: boolean; warning?: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const w = parseFloat(width);
    const dia = parseFloat(barDiameter);
    const cover = parseFloat(clearCover);
    
    if (mode === 'spacing') {
      const bars = parseInt(numberOfBars);
      
      if (!isNaN(w) && !isNaN(bars) && !isNaN(dia) && !isNaN(cover) &&
          w > 0 && bars >= 2 && dia > 0 && cover >= 0) {
        const result = calculateSpacing(w, bars, dia, cover, unit);
        setCalculation(result);
        
        if (result && result.clearSpacing !== undefined) {
          setValidityCheck(checkSpacingValidity(result.clearSpacing, result.barDiameter));
        }
      } else {
        setCalculation(null);
        setValidityCheck(null);
      }
    } else {
      const spacing = parseFloat(desiredSpacing);
      
      if (!isNaN(w) && !isNaN(spacing) && !isNaN(dia) && !isNaN(cover) &&
          w > 0 && spacing > 0 && dia > 0 && cover >= 0) {
        const result = calculateNumberOfBars(w, spacing, dia, cover, unit);
        setCalculation(result);
        
        if (result && result.clearSpacing !== undefined) {
          setValidityCheck(checkSpacingValidity(result.clearSpacing, result.barDiameter));
        }
      } else {
        setCalculation(null);
        setValidityCheck(null);
      }
    }
  }, [mode, width, numberOfBars, desiredSpacing, barDiameter, clearCover, unit]);

  const handleReset = () => {
    setWidth("");
    setNumberOfBars("");
    setDesiredSpacing("");
    setBarDiameter("");
    setClearCover("");
    setCalculation(null);
    setValidityCheck(null);
  };

  const handleUseDefaults = () => {
    setWidth("1000");
    setNumberOfBars("5");
    setDesiredSpacing("150");
    setBarDiameter("16");
    setClearCover("40");
  };

  const handleSwapMode = () => {
    setMode(mode === 'spacing' ? 'bars' : 'spacing');
    setCalculation(null);
    setValidityCheck(null);
  };

  const handleCopy = () => {
    if (calculation) {
      let text = `Width: ${formatNumber(convertFromMm(calculation.width, unit))} ${unit}\n`;
      text += `Bar Diameter: ${formatNumber(convertFromMm(calculation.barDiameter, unit))} ${unit}\n`;
      text += `Clear Cover: ${formatNumber(convertFromMm(calculation.clearCover, unit))} ${unit}\n`;
      
      if (calculation.mode === 'spacing') {
        text += `Number of Bars: ${calculation.numberOfBars}\n`;
        text += `Spacing: ${formatNumber(convertFromMm(calculation.spacing!, unit))} ${unit}\n`;
      } else {
        text += `Bars Required: ${calculation.calculatedBars}\n`;
        text += `Actual Spacing: ${formatNumber(convertFromMm(calculation.spacing!, unit))} ${unit}\n`;
      }
      
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
      downloadFile(text, 'rebar_spacing_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SpacingCalculation) => {
    setMode(calc.mode);
    setWidth(convertFromMm(calc.width, unit).toString());
    setBarDiameter(convertFromMm(calc.barDiameter, unit).toString());
    setClearCover(convertFromMm(calc.clearCover, unit).toString());
    
    if (calc.mode === 'spacing' && calc.numberOfBars) {
      setNumberOfBars(calc.numberOfBars.toString());
    } else if (calc.mode === 'bars' && calc.desiredSpacing) {
      setDesiredSpacing(convertFromMm(calc.desiredSpacing, unit).toString());
    }
    
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Rebar Spacing Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate spacing between reinforcement bars or determine number of bars needed. Get instant results with accurate engineering formulas.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as CalculationMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="spacing">Calculate Spacing</option>
                  <option value="bars">Calculate Number of Bars</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
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
                    onClick={() => setUnit("inch")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "inch"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Inches
                  </button>
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
                  onClick={handleUseDefaults}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ Use Default Values
                </button>
                <button
                  onClick={handleSwapMode}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Swap Mode
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
                    {mode === 'spacing' ? 'Center-to-Center Spacing' : 'Bars Required'}
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {mode === 'spacing' 
                      ? formatNumber(convertFromMm(calculation.spacing!, unit))
                      : calculation.calculatedBars
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === 'spacing' ? unit : 'bars'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Effective Width:</span>
                    <span className="font-semibold">{formatNumber(convertFromMm(calculation.effectiveWidth, unit))} {unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Clear Spacing:</span>
                    <span className="font-semibold">{formatNumber(convertFromMm(calculation.clearSpacing!, unit))} {unit}</span>
                  </div>
                  {mode === 'bars' && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Actual Spacing:</span>
                      <span className="font-semibold">{formatNumber(convertFromMm(calculation.spacing!, unit))} {unit}</span>
                    </div>
                  )}
                </div>

                {validityCheck && validityCheck.warning && (
                  <div className={`p-2 rounded text-xs ${
                    validityCheck.isValid 
                      ? 'bg-yellow-500/20 text-yellow-100' 
                      : 'bg-red-500/20 text-red-100'
                  }`}>
                    ⚠️ {validityCheck.warning}
                  </div>
                )}

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
                {mode === 'spacing' ? 'Calculate Spacing' : 'Calculate Number of Bars'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Width ({unit})
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'mm' ? '1000' : '39.37'}
                    min="0"
                    step="0.1"
                  />
                </div>

                {mode === 'spacing' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Bars
                    </label>
                    <input
                      type="number"
                      value={numberOfBars}
                      onChange={(e) => setNumberOfBars(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="2"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum: 2 bars
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Spacing ({unit})
                    </label>
                    <input
                      type="number"
                      value={desiredSpacing}
                      onChange={(e) => setDesiredSpacing(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === 'mm' ? '150' : '5.91'}
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bar Diameter ({unit})
                  </label>
                  <input
                    type="number"
                    value={barDiameter}
                    onChange={(e) => setBarDiameter(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'mm' ? '16' : '0.63'}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clear Cover ({unit})
                  </label>
                  <input
                    type="number"
                    value={clearCover}
                    onChange={(e) => setClearCover(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'mm' ? '40' : '1.57'}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Effective Width = {formatNumber(convertFromMm(calculation.width, unit))} - (2 × {formatNumber(convertFromMm(calculation.clearCover, unit))}) = {formatNumber(convertFromMm(calculation.effectiveWidth, unit))} {unit}
                  </div>
                </div>
              )}
            </div>

            {/* Visual Diagram */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Visual Layout
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <svg width="100%" height="120" viewBox="0 0 800 120" className="min-w-[600px]">
                    {/* Total width background */}
                    <rect x="50" y="40" width="700" height="40" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                    
                    {/* Cover areas */}
                    <rect x="50" y="40" width="70" height="40" fill="#fca5a5" opacity="0.5"/>
                    <rect x="680" y="40" width="70" height="40" fill="#fca5a5" opacity="0.5"/>
                    
                    {/* Effective width area */}
                    <rect x="120" y="40" width="560" height="40" fill="#86efac" opacity="0.3"/>
                    
                    {/* Rebar positions */}
                    {(() => {
                      const bars = mode === 'spacing' ? calculation.numberOfBars! : calculation.calculatedBars!;
                      const effectiveWidth = 560; // SVG units
                      const spacing = effectiveWidth / (bars - 1);
                      
                      return Array.from({ length: bars }).map((_, i) => {
                        const x = 120 + (i * spacing);
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy="60"
                            r="8"
                            fill="#058554"
                            stroke="#047857"
                            strokeWidth="2"
                          />
                        );
                      });
                    })()}
                    
                    {/* Labels */}
                    <text x="85" y="25" fontSize="10" fill="#6b7280" textAnchor="middle">Cover</text>
                    <text x="715" y="25" fontSize="10" fill="#6b7280" textAnchor="middle">Cover</text>
                    <text x="400" y="25" fontSize="12" fill="#047857" textAnchor="middle" fontWeight="bold">Effective Width</text>
                    
                    {/* Dimension lines */}
                    <line x1="50" y1="95" x2="750" y2="95" stroke="#6b7280" strokeWidth="1"/>
                    <line x1="50" y1="90" x2="50" y2="100" stroke="#6b7280" strokeWidth="1"/>
                    <line x1="750" y1="90" x2="750" y2="100" stroke="#6b7280" strokeWidth="1"/>
                    <text x="400" y="110" fontSize="11" fill="#374151" textAnchor="middle">
                      Total Width: {formatNumber(convertFromMm(calculation.width, unit))} {unit}
                    </text>
                  </svg>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-300 rounded"></div>
                    <span className="text-gray-600">Clear Cover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-300 rounded"></div>
                    <span className="text-gray-600">Effective Width</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="text-gray-600">Rebar Position</span>
                  </div>
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Width</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(convertFromMm(calculation.width, unit))} {unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Effective Width</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(convertFromMm(calculation.effectiveWidth, unit))} {unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bar Diameter</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(convertFromMm(calculation.barDiameter, unit))} {unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Clear Cover</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(convertFromMm(calculation.clearCover, unit))} {unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {mode === 'spacing' ? 'Number of Bars' : 'Bars Required'}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {mode === 'spacing' ? calculation.numberOfBars : calculation.calculatedBars}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Clear Spacing</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(convertFromMm(calculation.clearSpacing!, unit))} {unit}</div>
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
                📄 Export Calculation
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
                            {entry.calculation.mode === 'spacing' 
                              ? `${entry.calculation.numberOfBars} bars`
                              : `${entry.calculation.calculatedBars} bars needed`
                            }
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Width: {formatNumber(entry.calculation.width)} mm • 
                          Spacing: {formatNumber(entry.calculation.spacing!)} mm
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

      <RebarSpacingCalculatorSEO />
      <RelatedTools
        currentTool="rebar-spacing-calculator"
        tools={['rebar-weight-calculator', 'concrete-volume-calculator', 'steel-quantity-calculator']}
      />
    </>
  );
}
