"use client";

import { useState, useEffect } from "react";
import { InputMode, Unit, RoofPitchCalculation } from "./types";
import {
  calculateRoofPitch,
  getInputModeDisplayName,
  getPitchPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  generatePitchDiagram
} from "./logic";
import RoofPitchCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RoofPitchCalculatorUI() {
  const [inputMode, setInputMode] = useState<InputMode>("rise-run");
  const [unit, setUnit] = useState<Unit>("inches");
  
  // Rise & Run inputs
  const [rise, setRise] = useState("");
  const [run, setRun] = useState("12");
  
  // Pitch ratio inputs
  const [pitchRise, setPitchRise] = useState("");
  const [pitchRun, setPitchRun] = useState("12");
  
  // Angle input
  const [angle, setAngle] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<RoofPitchCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    let result: RoofPitchCalculation | null = null;
    
    if (inputMode === 'rise-run') {
      const riseNum = parseFloat(rise);
      const runNum = parseFloat(run);
      
      if (!isNaN(riseNum) && !isNaN(runNum) && riseNum >= 0 && runNum > 0) {
        result = calculateRoofPitch(inputMode, unit, riseNum, runNum);
      }
    } else if (inputMode === 'pitch-ratio') {
      const priseNum = parseFloat(pitchRise);
      const prunNum = parseFloat(pitchRun);
      
      if (!isNaN(priseNum) && !isNaN(prunNum) && priseNum >= 0 && prunNum > 0) {
        result = calculateRoofPitch(inputMode, unit, undefined, undefined, priseNum, prunNum);
      }
    } else if (inputMode === 'angle') {
      const angleNum = parseFloat(angle);
      
      if (!isNaN(angleNum) && angleNum >= 0 && angleNum < 90) {
        result = calculateRoofPitch(inputMode, unit, undefined, undefined, undefined, undefined, angleNum);
      }
    }
    
    setCalculation(result);
  }, [inputMode, rise, run, pitchRise, pitchRun, angle, unit]);

  const handleReset = () => {
    setRise("");
    setRun("12");
    setPitchRise("");
    setPitchRun("12");
    setAngle("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    if (inputMode === 'rise-run') {
      setRise("6");
      setRun("12");
    } else if (inputMode === 'pitch-ratio') {
      setPitchRise("6");
      setPitchRun("12");
    } else if (inputMode === 'angle') {
      setAngle("26.57");
    }
  };

  const handleInputModeChange = (mode: InputMode) => {
    setInputMode(mode);
    setCalculation(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputMode('rise-run');
    setRise(preset.rise.toString());
    setRun(preset.run.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Pitch: ${calculation.calculatedPitch}\nAngle: ${formatNumber(calculation.calculatedAngle)}°\nSlope: ${formatNumber(calculation.slopePercentage)}%`;
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
      downloadFile(text, 'roof_pitch_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'roof_pitch_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: RoofPitchCalculation) => {
    setInputMode(calc.inputMode);
    setUnit(calc.unit);
    
    if (calc.inputMode === 'rise-run') {
      setRise(calc.rise!.toString());
      setRun(calc.run!.toString());
    } else if (calc.inputMode === 'pitch-ratio') {
      setPitchRise(calc.pitchRise!.toString());
      setPitchRun(calc.pitchRun!.toString());
    } else if (calc.inputMode === 'angle') {
      setAngle(calc.angle!.toString());
    }
    
    setShowHistory(false);
  };

  const pitchPresets = getPitchPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Roof Pitch Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate roof slope, angle, and pitch ratio using rise and run measurements with instant results and visual diagrams.
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
                  <option value="inches">Inches</option>
                  <option value="feet">Feet</option>
                  <option value="meters">Meters</option>
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
                    Roof Pitch
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.calculatedPitch}
                  </div>
                  <div className="text-xl text-primary-100">
                    pitch ratio
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Angle:</span>
                    <span className="font-semibold">{formatNumber(calculation.calculatedAngle)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slope:</span>
                    <span className="font-semibold">{formatNumber(calculation.slopePercentage)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Normalized:</span>
                    <span className="font-semibold">{formatNumber(calculation.normalizedPitch)}:12</span>
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
                Input Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Mode
                </label>
                <select
                  value={inputMode}
                  onChange={(e) => handleInputModeChange(e.target.value as InputMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="rise-run">Rise & Run</option>
                  <option value="pitch-ratio">Pitch Ratio</option>
                  <option value="angle">Angle (Degrees)</option>
                </select>
              </div>

              {inputMode === 'rise-run' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rise ({unit})
                    </label>
                    <input
                      type="number"
                      value={rise}
                      onChange={(e) => setRise(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="6"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Vertical height
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Run ({unit})
                    </label>
                    <input
                      type="number"
                      value={run}
                      onChange={(e) => setRun(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="12"
                      min="0.1"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Horizontal distance
                    </p>
                  </div>
                </div>
              )}

              {inputMode === 'pitch-ratio' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pitch Rise
                    </label>
                    <input
                      type="number"
                      value={pitchRise}
                      onChange={(e) => setPitchRise(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="6"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pitch Run
                    </label>
                    <input
                      type="number"
                      value={pitchRun}
                      onChange={(e) => setPitchRun(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="12"
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                </div>
              )}

              {inputMode === 'angle' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roof Angle (degrees)
                  </label>
                  <input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="26.57"
                    min="0"
                    max="89"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Angle from horizontal (0-89 degrees)
                  </p>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formulas:</strong>
                    <div className="mt-1 font-mono text-xs">
                      Angle = arctan(rise / run) × (180 / π)
                    </div>
                    <div className="font-mono text-xs">
                      Pitch = (rise / run) × 12
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Diagram */}
            {calculation && calculation.rise !== undefined && calculation.run !== undefined && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Pitch Visualization
                </h3>
                
                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div 
                    className="w-full max-w-md"
                    dangerouslySetInnerHTML={{ __html: generatePitchDiagram(calculation.rise, calculation.run) }}
                  />
                </div>
              </div>
            )}

            {/* Pitch Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Roof Pitches
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {pitchPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{formatNumber(preset.angle, 1)}°</div>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pitch</div>
                    <div className="text-lg font-bold text-primary">{calculation.calculatedPitch}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Angle</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.calculatedAngle)}°</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Slope</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.slopePercentage)}%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Normalized</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.normalizedPitch)}:12</div>
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
                            {entry.calculation.calculatedPitch}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Angle: {formatNumber(entry.calculation.calculatedAngle)}° • 
                          Slope: {formatNumber(entry.calculation.slopePercentage)}%
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

      <RoofPitchCalculatorSEO />
      <RelatedTools
        currentTool="roof-pitch-calculator"
        tools={['roof-area-calculator', 'floor-area-calculator', 'wall-area-calculator']}
      />
    </>
  );
}
