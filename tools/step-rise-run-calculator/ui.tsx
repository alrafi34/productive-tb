"use client";

import { useState, useEffect } from "react";
import { Unit, CalculationMode, StepCalculation } from "./types";
import {
  calculateSteps,
  getStepPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  generateStepDiagram,
  getModeDisplayName
} from "./logic";
import StepRiseRunCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function StepRiseRunCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("cm");
  const [mode, setMode] = useState<CalculationMode>("auto");
  const [totalHeight, setTotalHeight] = useState("");
  const [totalRun, setTotalRun] = useState("");
  const [desiredRise, setDesiredRise] = useState("");
  const [desiredRun, setDesiredRun] = useState("");
  const [maxRise, setMaxRise] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<StepCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const height = parseFloat(totalHeight);
    
    if (!isNaN(height) && height > 0) {
      const run = totalRun ? parseFloat(totalRun) : undefined;
      const rise = desiredRise ? parseFloat(desiredRise) : undefined;
      const runPerStep = desiredRun ? parseFloat(desiredRun) : undefined;
      const maxR = maxRise ? parseFloat(maxRise) : undefined;
      
      const result = calculateSteps(height, unit, mode, run, rise, runPerStep, maxR);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [totalHeight, totalRun, desiredRise, desiredRun, maxRise, unit, mode]);

  const handleReset = () => {
    setTotalHeight("");
    setTotalRun("");
    setDesiredRise("");
    setDesiredRun("");
    setMaxRise("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setTotalHeight("300");
    setDesiredRise("17");
    setMode("auto");
  };

  const handleApplyPreset = (preset: any) => {
    setUnit(preset.unit);
    setTotalHeight(preset.totalHeight.toString());
    setDesiredRise(preset.desiredRise.toString());
    setMode("auto");
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Steps: ${calculation.numberOfSteps}\nRise: ${formatNumber(calculation.actualRise)} ${calculation.unit}\nRun: ${formatNumber(calculation.actualRun)} ${calculation.unit}`;
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
      downloadFile(text, 'step_rise_run_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'step_rise_run_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: StepCalculation) => {
    setUnit(calc.unit);
    setMode(calc.mode);
    setTotalHeight(calc.totalHeight.toString());
    if (calc.totalRun) setTotalRun(calc.totalRun.toString());
    if (calc.desiredRise) setDesiredRise(calc.desiredRise.toString());
    if (calc.desiredRun) setDesiredRun(calc.desiredRun.toString());
    if (calc.maxRise) setMaxRise(calc.maxRise.toString());
    setShowHistory(false);
  };

  const presets = getStepPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Step Rise and Run Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate stair rise, run, and number of steps instantly for safe and comfortable staircase design with real-time results and visual diagrams.
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
                  <option value="auto">Auto Calculate Steps</option>
                  <option value="fix-rise">Fix Rise → Calculate Run</option>
                  <option value="fix-run">Fix Run → Calculate Rise</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("cm")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "cm"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Centimeters
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
                    {calculation.numberOfSteps}
                  </div>
                  <div className="text-xl text-primary-100">
                    steps
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Rise per Step:</span>
                    <span className="font-semibold">{formatNumber(calculation.actualRise)} {calculation.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Run per Step:</span>
                    <span className="font-semibold">{formatNumber(calculation.actualRun)} {calculation.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Run:</span>
                    <span className="font-semibold">{formatNumber(calculation.calculatedTotalRun)} {calculation.unit}</span>
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
                    2R + T = {formatNumber(calculation.comfortFormula)} {calculation.unit}
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    {calculation.isComfortable ? `Ideal: ${unit === 'cm' ? '63' : '25'} ${unit}` : `Target: ${unit === 'cm' ? '63' : '25'} ${unit}`}
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
                    Total Height ({unit}) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={totalHeight}
                    onChange={(e) => setTotalHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === "cm" ? "300" : "118"}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Floor to floor height
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Run ({unit}) <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    value={totalRun}
                    onChange={(e) => setTotalRun(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === "cm" ? "400" : "157"}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Total horizontal length
                  </p>
                </div>

                {mode !== "fix-run" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Rise ({unit}) <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      value={desiredRise}
                      onChange={(e) => setDesiredRise(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === "cm" ? "17" : "7"}
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ideal: {unit === "cm" ? "15-18 cm" : "6-7 in"}
                    </p>
                  </div>
                )}

                {mode !== "fix-rise" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Run ({unit}) <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      value={desiredRun}
                      onChange={(e) => setDesiredRun(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === "cm" ? "28" : "11"}
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ideal: {unit === "cm" ? "25-30 cm" : "10-12 in"}
                    </p>
                  </div>
                )}

                {mode === "auto" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Rise ({unit}) <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      value={maxRise}
                      onChange={(e) => setMaxRise(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={unit === "cm" ? "18" : "7"}
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum allowed rise
                    </p>
                  </div>
                )}
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Comfort Formula:</strong>
                    <div className="mt-1 font-mono text-xs">
                      2 × Rise + Run ≈ {unit === 'cm' ? '63' : '25'} {unit}
                    </div>
                    <div className="mt-1 text-xs">
                      Current: 2 × {formatNumber(calculation.actualRise)} + {formatNumber(calculation.actualRun)} = {formatNumber(calculation.comfortFormula)} {unit}
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
                    dangerouslySetInnerHTML={{ __html: generateStepDiagram(calculation.numberOfSteps, calculation.actualRise, calculation.actualRun) }}
                  />
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Showing {Math.min(calculation.numberOfSteps, 10)} of {calculation.numberOfSteps} steps
                </p>
              </div>
            )}

            {/* Presets Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Staircase Presets
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Steps</div>
                    <div className="text-lg font-bold text-primary">{calculation.numberOfSteps}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rise</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.actualRise)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Run</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.actualRun)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Run</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.calculatedTotalRun)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Angle</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.stairAngle)}°</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mode</div>
                    <div className="text-xs font-bold text-gray-900">{getModeDisplayName(calculation.mode)}</div>
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
                            {entry.calculation.numberOfSteps} steps
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Rise: {formatNumber(entry.calculation.actualRise)} {entry.calculation.unit} • 
                          Run: {formatNumber(entry.calculation.actualRun)} {entry.calculation.unit} • 
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

      <StepRiseRunCalculatorSEO />
      <RelatedTools
        currentTool="step-rise-run-calculator"
        tools={['staircase-calculator', 'floor-area-calculator', 'room-volume-calculator']}
      />
    </>
  );
}
