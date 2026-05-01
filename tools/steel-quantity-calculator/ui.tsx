"use client";

import { useState, useEffect } from "react";
import { CalculationType, Unit, SteelCalculation } from "./types";
import {
  calculateSlabSteel,
  calculateBeamSteel,
  calculateColumnSteel,
  calculateFootingSteel,
  getSteelFactorPresets,
  getTypeDisplayName,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber
} from "./logic";
import SteelQuantityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SteelQuantityCalculatorUI() {
  const [calculationType, setCalculationType] = useState<CalculationType>("slab");
  const [unit, setUnit] = useState<Unit>("imperial");
  
  // Slab inputs
  const [slabArea, setSlabArea] = useState("");
  const [slabSteelFactor, setSlabSteelFactor] = useState("");
  
  // Beam inputs
  const [beamLength, setBeamLength] = useState("");
  const [beamSteelPerLength, setBeamSteelPerLength] = useState("");
  
  // Column inputs
  const [numberOfColumns, setNumberOfColumns] = useState("");
  const [steelPerColumn, setSteelPerColumn] = useState("");
  
  // Footing inputs
  const [numberOfFootings, setNumberOfFootings] = useState("");
  const [steelPerFooting, setSteelPerFooting] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<SteelCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    let result: SteelCalculation | null = null;
    
    if (calculationType === 'slab') {
      const area = parseFloat(slabArea);
      const factor = parseFloat(slabSteelFactor);
      if (!isNaN(area) && !isNaN(factor) && area > 0 && factor > 0) {
        result = calculateSlabSteel(area, factor, unit);
      }
    } else if (calculationType === 'beam') {
      const length = parseFloat(beamLength);
      const steel = parseFloat(beamSteelPerLength);
      if (!isNaN(length) && !isNaN(steel) && length > 0 && steel > 0) {
        result = calculateBeamSteel(length, steel, unit);
      }
    } else if (calculationType === 'column') {
      const count = parseInt(numberOfColumns);
      const steel = parseFloat(steelPerColumn);
      if (!isNaN(count) && !isNaN(steel) && count > 0 && steel > 0) {
        result = calculateColumnSteel(count, steel, unit);
      }
    } else if (calculationType === 'footing') {
      const count = parseInt(numberOfFootings);
      const steel = parseFloat(steelPerFooting);
      if (!isNaN(count) && !isNaN(steel) && count > 0 && steel > 0) {
        result = calculateFootingSteel(count, steel, unit);
      }
    }
    
    setCalculation(result);
  }, [calculationType, slabArea, slabSteelFactor, beamLength, beamSteelPerLength, 
      numberOfColumns, steelPerColumn, numberOfFootings, steelPerFooting, unit]);

  const handleCalculationTypeChange = (type: CalculationType) => {
    setCalculationType(type);
    setCalculation(null);
  };

  const handleReset = () => {
    setSlabArea("");
    setSlabSteelFactor("");
    setBeamLength("");
    setBeamSteelPerLength("");
    setNumberOfColumns("");
    setSteelPerColumn("");
    setNumberOfFootings("");
    setSteelPerFooting("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    if (calculationType === 'slab') {
      setSlabArea("1000");
      setSlabSteelFactor("4");
    } else if (calculationType === 'beam') {
      setBeamLength("200");
      setBeamSteelPerLength("2.5");
    } else if (calculationType === 'column') {
      setNumberOfColumns("10");
      setSteelPerColumn("150");
    } else if (calculationType === 'footing') {
      setNumberOfFootings("10");
      setSteelPerFooting("80");
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `${getTypeDisplayName(calculation.type)} Steel: ${formatNumber(calculation.totalSteel)} kg (${formatNumber(calculation.totalSteelTons, 3)} tons)`;
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
      downloadFile(text, 'steel_quantity_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'steel_quantity_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SteelCalculation) => {
    setCalculationType(calc.type);
    setUnit(calc.unit);
    
    if (calc.type === 'slab') {
      setSlabArea(calc.inputs.area.toString());
      setSlabSteelFactor(calc.inputs.steelFactor.toString());
    } else if (calc.type === 'beam') {
      setBeamLength(calc.inputs.length.toString());
      setBeamSteelPerLength(calc.inputs.steelPerLength.toString());
    } else if (calc.type === 'column') {
      setNumberOfColumns(calc.inputs.numberOfColumns.toString());
      setSteelPerColumn(calc.inputs.steelPerColumn.toString());
    } else if (calc.type === 'footing') {
      setNumberOfFootings(calc.inputs.numberOfFootings.toString());
      setSteelPerFooting(calc.inputs.steelPerFooting.toString());
    }
    
    setShowHistory(false);
  };

  const applyPreset = (value: number) => {
    if (calculationType === 'slab') {
      setSlabSteelFactor(value.toString());
    } else if (calculationType === 'beam') {
      setBeamSteelPerLength(value.toString());
    }
  };

  const steelFactorPresets = getSteelFactorPresets().filter(p => p.type === calculationType);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Steel Quantity Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate steel quantity for slabs, beams, columns, and footings. Get instant estimates with accurate formulas.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Element Type</label>
                <select
                  value={calculationType}
                  onChange={(e) => handleCalculationTypeChange(e.target.value as CalculationType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="slab">Slab</option>
                  <option value="beam">Beam</option>
                  <option value="column">Column</option>
                  <option value="footing">Footing</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "metric"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "imperial"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Imperial
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
                    Total Steel Required
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalSteel)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kilograms (kg)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">In Tons:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalSteelTons, 3)} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Element Type:</span>
                    <span className="font-semibold">{getTypeDisplayName(calculation.type)}</span>
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
                {getTypeDisplayName(calculationType)} Parameters
              </h3>
              
              {calculationType === 'slab' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area ({unit === 'metric' ? 'sq m' : 'sq ft'})
                    </label>
                    <input
                      type="number"
                      value={slabArea}
                      onChange={(e) => setSlabArea(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1000"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Steel Factor (kg per unit area)
                    </label>
                    <input
                      type="number"
                      value={slabSteelFactor}
                      onChange={(e) => setSlabSteelFactor(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="4"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 3-5 kg/{unit === 'metric' ? 'sq m' : 'sq ft'}
                    </p>
                  </div>
                </div>
              )}

              {calculationType === 'beam' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit === 'metric' ? 'm' : 'ft'})
                    </label>
                    <input
                      type="number"
                      value={beamLength}
                      onChange={(e) => setBeamLength(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="200"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Steel per Length (kg/{unit === 'metric' ? 'm' : 'ft'})
                    </label>
                    <input
                      type="number"
                      value={beamSteelPerLength}
                      onChange={(e) => setBeamSteelPerLength(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2.5"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 2-4 kg/{unit === 'metric' ? 'm' : 'ft'}
                    </p>
                  </div>
                </div>
              )}

              {calculationType === 'column' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Columns
                    </label>
                    <input
                      type="number"
                      value={numberOfColumns}
                      onChange={(e) => setNumberOfColumns(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="1"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Steel per Column (kg)
                    </label>
                    <input
                      type="number"
                      value={steelPerColumn}
                      onChange={(e) => setSteelPerColumn(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="150"
                      min="0"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 100-200 kg per column
                    </p>
                  </div>
                </div>
              )}

              {calculationType === 'footing' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Footings
                    </label>
                    <input
                      type="number"
                      value={numberOfFootings}
                      onChange={(e) => setNumberOfFootings(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="1"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Steel per Footing (kg)
                    </label>
                    <input
                      type="number"
                      value={steelPerFooting}
                      onChange={(e) => setSteelPerFooting(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="80"
                      min="0"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 50-150 kg per footing
                    </p>
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {
                      calculationType === 'slab' ? `Total Steel = Area × Steel Factor = ${slabArea} × ${slabSteelFactor}` :
                      calculationType === 'beam' ? `Total Steel = Length × Steel per Length = ${beamLength} × ${beamSteelPerLength}` :
                      calculationType === 'column' ? `Total Steel = Number of Columns × Steel per Column = ${numberOfColumns} × ${steelPerColumn}` :
                      `Total Steel = Number of Footings × Steel per Footing = ${numberOfFootings} × ${steelPerFooting}`
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Presets Panel */}
            {steelFactorPresets.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Typical Steel Factors
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {steelFactorPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset.value)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    </button>
                  ))}
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Steel</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.totalSteel)} kg</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">In Tons</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.totalSteelTons, 3)} tons</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Element Type</div>
                    <div className="text-sm font-bold text-gray-900">{getTypeDisplayName(calculation.type)}</div>
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
                            {formatNumber(entry.calculation.totalSteel)} kg
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getTypeDisplayName(entry.calculation.type)} • 
                          {formatNumber(entry.calculation.totalSteelTons, 3)} tons
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

      <SteelQuantityCalculatorSEO />
      <RelatedTools
        currentTool="steel-quantity-calculator"
        tools={['rebar-weight-calculator', 'rebar-spacing-calculator', 'concrete-volume-calculator']}
      />
    </>
  );
}
