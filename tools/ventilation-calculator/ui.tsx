"use client";

import { useState, useEffect } from "react";
import { CalculationMode, DimensionUnit, AirflowUnit, VentilationCalculation } from "./types";
import {
  calculateVentilation,
  getRoomPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getAirflowUnitLabel,
  getDimensionUnitLabel
} from "./logic";
import VentilationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function VentilationCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("room-volume");
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("ft");
  const [outputUnit, setOutputUnit] = useState<AirflowUnit>("CFM");
  
  // Room volume inputs
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [ach, setAch] = useState("6");
  
  // Occupancy inputs
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [airflowPerPerson, setAirflowPerPerson] = useState("10");
  
  // Results
  const [calculation, setCalculation] = useState<VentilationCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    if (mode === "room-volume") {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);
      const a = parseFloat(ach);
      
      if (!isNaN(l) && !isNaN(w) && !isNaN(h) && !isNaN(a) && l > 0 && w > 0 && h > 0 && a > 0) {
        const result = calculateVentilation(mode, l, w, h, dimensionUnit, a, undefined, undefined, outputUnit);
        setCalculation(result);
      } else {
        setCalculation(null);
      }
    } else {
      const people = parseFloat(numberOfPeople);
      const airflow = parseFloat(airflowPerPerson);
      
      if (!isNaN(people) && !isNaN(airflow) && people > 0 && airflow > 0) {
        const result = calculateVentilation(mode, undefined, undefined, undefined, undefined, undefined, people, airflow, outputUnit);
        setCalculation(result);
      } else {
        setCalculation(null);
      }
    }
  }, [mode, length, width, height, dimensionUnit, ach, numberOfPeople, airflowPerPerson, outputUnit]);

  const handleReset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setAch("6");
    setNumberOfPeople("");
    setAirflowPerPerson("10");
    setCalculation(null);
  };

  const handleApplyPreset = (preset: any) => {
    setMode("room-volume");
    setDimensionUnit("ft");
    setLength(preset.length.toString());
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    setAch(preset.ach.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const value = outputUnit === "CFM" ? calculation.airflowCFM : 
                    outputUnit === "m3h" ? calculation.airflowM3H : 
                    calculation.airflowLs;
      const text = `Required Airflow: ${formatNumber(value)} ${getAirflowUnitLabel(outputUnit)}`;
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
      downloadFile(text, 'ventilation_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: VentilationCalculation) => {
    setMode(calc.mode);
    setOutputUnit(calc.outputUnit);
    
    if (calc.mode === "room-volume") {
      setDimensionUnit(calc.dimensionUnit!);
      setLength(calc.length!.toString());
      setWidth(calc.width!.toString());
      setHeight(calc.height!.toString());
      setAch(calc.ach!.toString());
    } else {
      setNumberOfPeople(calc.numberOfPeople!.toString());
      setAirflowPerPerson(calc.airflowPerPerson!.toString());
    }
    setShowHistory(false);
  };

  const presets = getRoomPresets();

  const getDisplayValue = () => {
    if (!calculation) return null;
    switch (outputUnit) {
      case "CFM": return calculation.airflowCFM;
      case "m3h": return calculation.airflowM3H;
      case "Ls": return calculation.airflowLs;
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💨</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Ventilation Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate required airflow for proper ventilation using room dimensions with ACH or occupancy-based calculations. Essential for HVAC design and air quality planning.
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
                  <option value="room-volume">Room Volume (ACH)</option>
                  <option value="occupancy">Occupancy-based</option>
                </select>
              </div>

              {/* Output Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
                <select
                  value={outputUnit}
                  onChange={(e) => setOutputUnit(e.target.value as AirflowUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="CFM">CFM (Cubic Feet/Min)</option>
                  <option value="m3h">m³/h (Cubic Meters/Hour)</option>
                  <option value="Ls">L/s (Liters/Second)</option>
                </select>
              </div>

              {mode === "room-volume" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dimension Unit</label>
                  <select
                    value={dimensionUnit}
                    onChange={(e) => setDimensionUnit(e.target.value as DimensionUnit)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="ft">Feet (ft)</option>
                    <option value="m">Meters (m)</option>
                  </select>
                </div>
              )}

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
                    Required Airflow
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(getDisplayValue()!)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getAirflowUnitLabel(outputUnit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">CFM:</span>
                    <span className="font-semibold">{formatNumber(calculation.airflowCFM)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">m³/h:</span>
                    <span className="font-semibold">{formatNumber(calculation.airflowM3H)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">L/s:</span>
                    <span className="font-semibold">{formatNumber(calculation.airflowLs)}</span>
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
                {mode === "room-volume" ? "Room Dimensions & ACH" : "Occupancy Details"}
              </h3>
              
              {mode === "room-volume" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Length ({dimensionUnit})
                      </label>
                      <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder={dimensionUnit === "ft" ? "10" : "3"}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Width ({dimensionUnit})
                      </label>
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder={dimensionUnit === "ft" ? "12" : "3.6"}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height ({dimensionUnit})
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder={dimensionUnit === "ft" ? "8" : "2.4"}
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Air Changes per Hour (ACH)
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="range"
                        value={ach}
                        onChange={(e) => setAch(e.target.value)}
                        className="flex-1"
                        min="1"
                        max="20"
                        step="0.5"
                      />
                      <input
                        type="number"
                        value={ach}
                        onChange={(e) => setAch(e.target.value)}
                        className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-center"
                        min="0"
                        step="0.5"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 2 (storage), 4 (residential), 6 (office), 8 (kitchen), 10+ (industrial)
                    </p>
                  </div>

                  {calculation && calculation.roomVolume && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-800">
                        <strong>Room Volume:</strong> {formatNumber(calculation.roomVolume)} ft³
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of People
                      </label>
                      <input
                        type="number"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="5"
                        min="1"
                        step="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Airflow per Person (L/s)
                      </label>
                      <input
                        type="number"
                        value={airflowPerPerson}
                        onChange={(e) => setAirflowPerPerson(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="10"
                        min="0"
                        step="0.5"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Typical: 8-10 L/s per person
                      </p>
                    </div>
                  </div>
                </>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong>
                    <div className="mt-1 font-mono text-xs">
                      {mode === "room-volume" 
                        ? `CFM = (Volume × ACH) / 60`
                        : `Airflow = People × Airflow per Person`
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Presets Panel */}
            {mode === "room-volume" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Room Type Presets
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
                      <div className="text-xs text-gray-500 mt-1">
                        ACH: {preset.ach} | {preset.length}×{preset.width}×{preset.height} ft
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Indicator */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Airflow Indicator
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ width: `${Math.min(100, (calculation.airflowCFM / 1000) * 100)}%` }}
                      >
                        <span className="text-xs font-bold text-white">
                          {formatNumber(calculation.airflowCFM)} CFM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 CFM</span>
                    <span>1000 CFM</span>
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
                📄 Export Result
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
                            {formatNumber(entry.calculation.airflowCFM)} CFM
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.mode === "room-volume" 
                            ? `ACH: ${entry.calculation.ach} | ${entry.calculation.length}×${entry.calculation.width}×${entry.calculation.height} ${entry.calculation.dimensionUnit}`
                            : `${entry.calculation.numberOfPeople} people × ${entry.calculation.airflowPerPerson} L/s`
                          }
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

      <VentilationCalculatorSEO />
      <RelatedTools
        currentTool="ventilation-calculator"
        tools={['hvac-load-calculator', 'room-volume-calculator', 'air-quality-calculator']}
      />
    </>
  );
}
