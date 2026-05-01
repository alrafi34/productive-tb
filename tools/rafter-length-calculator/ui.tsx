"use client";

import { useState, useEffect } from "react";
import { InputMode, Unit, RafterCalculation } from "./types";
import {
  calculateRafterLength,
  getInputModeDisplayName,
  getPitchPresets,
  parsePitch,
  formatPitch,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  generateRafterDiagram
} from "./logic";
import RafterLengthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RafterLengthCalculatorUI() {
  const [inputMode, setInputMode] = useState<InputMode>("run-rise");
  const [unit, setUnit] = useState<Unit>("feet");
  
  // Run & Rise inputs
  const [run, setRun] = useState("");
  const [rise, setRise] = useState("");
  
  // Pitch inputs
  const [pitchInput, setPitchInput] = useState("");
  const [pitchRise, setPitchRise] = useState<number | undefined>(undefined);
  const [pitchRun, setPitchRun] = useState<number | undefined>(undefined);
  
  // Results
  const [calculation, setCalculation] = useState<RafterCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Parse pitch input
  useEffect(() => {
    if (inputMode === 'run-pitch' && pitchInput) {
      const parsed = parsePitch(pitchInput);
      if (parsed) {
        setPitchRise(parsed.rise);
        setPitchRun(parsed.run);
      } else {
        setPitchRise(undefined);
        setPitchRun(undefined);
      }
    }
  }, [pitchInput, inputMode]);

  // Calculate in real-time
  useEffect(() => {
    const runNum = parseFloat(run);
    
    if (!isNaN(runNum) && runNum > 0) {
      if (inputMode === 'run-rise') {
        const riseNum = parseFloat(rise);
        
        if (!isNaN(riseNum) && riseNum >= 0) {
          const result = calculateRafterLength(inputMode, runNum, unit, riseNum);
          setCalculation(result);
        } else {
          setCalculation(null);
        }
      } else if (inputMode === 'run-pitch') {
        if (pitchRise !== undefined && pitchRun !== undefined) {
          const result = calculateRafterLength(inputMode, runNum, unit, undefined, pitchRise, pitchRun);
          setCalculation(result);
        } else {
          setCalculation(null);
        }
      }
    } else {
      setCalculation(null);
    }
  }, [inputMode, run, rise, pitchRise, pitchRun, unit]);

  const handleReset = () => {
    setRun("");
    setRise("");
    setPitchInput("");
    setPitchRise(undefined);
    setPitchRun(undefined);
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setRun("10");
    if (inputMode === 'run-rise') {
      setRise("5");
    } else {
      setPitchInput("6/12");
    }
  };

  const handleInputModeChange = (mode: InputMode) => {
    setInputMode(mode);
    setCalculation(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputMode('run-pitch');
    setPitchInput(`${preset.rise}/${preset.run}`);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Rafter Length: ${formatNumber(calculation.rafterLength)} ${calculation.unit}`;
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
      downloadFile(text, 'rafter_length_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'rafter_length_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: RafterCalculation) => {
    setInputMode(calc.inputMode);
    setUnit(calc.unit);
    setRun(calc.run.toString());
    
    if (calc.inputMode === 'run-rise') {
      setRise(calc.rise!.toString());
    } else if (calc.inputMode === 'run-pitch') {
      setPitchInput(formatPitch(calc.pitchRise!, calc.pitchRun!));
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
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Rafter Length Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate roof rafter length using run, rise, or pitch measurements with instant results and visual diagrams for construction planning.
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
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("feet")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "feet"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Feet
                  </button>
                  <button
                    onClick={() => setUnit("meters")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "meters"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Meters
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
                    Rafter Length
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.rafterLength)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {calculation.unit}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Run:</span>
                    <span className="font-semibold">{formatNumber(calculation.run)} {calculation.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Rise:</span>
                    <span className="font-semibold">{formatNumber(calculation.calculatedRise || calculation.rise!)} {calculation.unit}</span>
                  </div>
                  {calculation.inputMode === 'run-pitch' && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Pitch:</span>
                      <span className="font-semibold">{formatPitch(calculation.pitchRise!, calculation.pitchRun!)}</span>
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
                  <option value="run-rise">Run & Rise</option>
                  <option value="run-pitch">Run & Pitch</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Run ({unit})
                  </label>
                  <input
                    type="number"
                    value={run}
                    onChange={(e) => setRun(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Horizontal distance
                  </p>
                </div>

                {inputMode === 'run-rise' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rise ({unit})
                    </label>
                    <input
                      type="number"
                      value={rise}
                      onChange={(e) => setRise(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Vertical height
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pitch (e.g., 6/12 or 6:12)
                    </label>
                    <input
                      type="text"
                      value={pitchInput}
                      onChange={(e) => setPitchInput(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="6/12"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Roof slope ratio
                    </p>
                  </div>
                )}
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong>
                    <div className="mt-1 font-mono text-xs">
                      Rafter Length = √(Run² + Rise²)
                    </div>
                    {inputMode === 'run-pitch' && (
                      <div className="font-mono text-xs">
                        Rise = ({calculation.pitchRise} / {calculation.pitchRun}) × Run
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Visual Diagram */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Rafter Visualization
                </h3>
                
                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div 
                    className="w-full max-w-md"
                    dangerouslySetInnerHTML={{ __html: generateRafterDiagram(calculation.run, calculation.calculatedRise || calculation.rise!) }}
                  />
                </div>
              </div>
            )}

            {/* Pitch Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Roof Pitches
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pitchPresets.map((preset, index) => (
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rafter Length</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.rafterLength)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Run</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.run)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rise</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.calculatedRise || calculation.rise!)} {calculation.unit}</div>
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
                            Rafter: {formatNumber(entry.calculation.rafterLength)} {entry.calculation.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Run: {formatNumber(entry.calculation.run)} • 
                          Rise: {formatNumber(entry.calculation.calculatedRise || entry.calculation.rise!)} {entry.calculation.unit}
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

      <RafterLengthCalculatorSEO />
      <RelatedTools
        currentTool="rafter-length-calculator"
        tools={['roof-pitch-calculator', 'roof-area-calculator', 'floor-area-calculator']}
      />
    </>
  );
}
