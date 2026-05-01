"use client";

import { useState, useEffect, useCallback } from "react";
import { OccupancyType, Material, FireLoadCalculation } from "./types";
import {
  calculateFireLoad,
  getMaterialPresets,
  createEmptyMaterial,
  getSampleData,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getOccupancyLabel,
  getRiskLevelLabel,
  getRiskLevelColor,
  validateInputs,
  debounce
} from "./logic";
import FireSafetyLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FireSafetyLoadCalculatorUI() {
  const [floorArea, setFloorArea] = useState("100");
  const [occupancyType, setOccupancyType] = useState<OccupancyType>("office");
  const [materials, setMaterials] = useState<Material[]>([createEmptyMaterial()]);
  
  const [calculation, setCalculation] = useState<FireLoadCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const materialPresets = getMaterialPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const area = parseFloat(floorArea);
      const validationError = validateInputs(area, materials);
      
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateFireLoad({
          floorArea: area,
          materials,
          occupancyType
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [floorArea, materials, occupancyType]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [floorArea, materials, occupancyType, debouncedCalculate]);

  const handleAddMaterial = () => {
    setMaterials([...materials, createEmptyMaterial()]);
  };

  const handleRemoveMaterial = (id: string) => {
    if (materials.length > 1) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const handleMaterialChange = (id: string, field: keyof Material, value: string | number) => {
    setMaterials(materials.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleMaterialPresetSelect = (id: string, presetName: string) => {
    const preset = materialPresets.find(p => p.name === presetName);
    if (preset) {
      setMaterials(materials.map(m => 
        m.id === id ? { ...m, name: preset.name, calorificValue: preset.calorificValue } : m
      ));
    }
  };

  const handleLoadSampleData = () => {
    setMaterials(getSampleData());
    setFloorArea("100");
    setOccupancyType("office");
  };

  const handleReset = () => {
    setFloorArea("100");
    setOccupancyType("office");
    setMaterials([createEmptyMaterial()]);
    setCalculation(null);
    setError(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Fire Load: ${formatNumber(calculation.fireLoadDensity, 2)} MJ/m² (${getRiskLevelLabel(calculation.riskLevel)})`;
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
      downloadFile(text, 'fire_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'fire_load_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: FireLoadCalculation) => {
    setFloorArea(calc.floorArea.toString());
    setOccupancyType(calc.occupancyType);
    setMaterials(calc.materials);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Fire Safety Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate fire load density (MJ/m²) for buildings based on combustible materials. Essential for fire safety engineering and risk assessment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Floor Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor Area (m²)</label>
                <input
                  type="number"
                  value={floorArea}
                  onChange={(e) => setFloorArea(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="100"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Occupancy Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupancy Type</label>
                <select
                  value={occupancyType}
                  onChange={(e) => setOccupancyType(e.target.value as OccupancyType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="residential">Residential</option>
                  <option value="office">Office</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="warehouse">Warehouse</option>
                </select>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleLoadSampleData}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  📋 Load Sample Data
                </button>
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
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Fire Load Density
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.fireLoadDensity, 1)}
                  </div>
                  <div className="text-xl text-primary-100">
                    MJ/m²
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Energy:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalHeatEnergy, 0)} MJ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Materials:</span>
                    <span className="font-semibold">{calculation.materials.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-100">Risk Level:</span>
                    <span className="font-semibold px-2 py-1 bg-white/20 rounded text-xs">
                      {getRiskLevelLabel(calculation.riskLevel)}
                    </span>
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
            
            {/* Materials Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Combustible Materials
                </h3>
                <button
                  onClick={handleAddMaterial}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  + Add Material
                </button>
              </div>
              
              <div className="space-y-3">
                {materials.map((material, index) => (
                  <div key={material.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">Material {index + 1}</span>
                      {materials.length > 1 && (
                        <button
                          onClick={() => handleRemoveMaterial(material.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Material Name</label>
                        <select
                          value={material.name}
                          onChange={(e) => {
                            handleMaterialChange(material.id, 'name', e.target.value);
                            handleMaterialPresetSelect(material.id, e.target.value);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        >
                          <option value="">Select material...</option>
                          {materialPresets.map((preset, idx) => (
                            <option key={idx} value={preset.name}>
                              {preset.name} ({preset.calorificValue} MJ/kg)
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Mass (kg)</label>
                        <input
                          type="number"
                          value={material.mass || ''}
                          onChange={(e) => handleMaterialChange(material.id, 'mass', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          placeholder="0"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Calorific Value (MJ/kg)</label>
                        <input
                          type="number"
                          value={material.calorificValue || ''}
                          onChange={(e) => handleMaterialChange(material.id, 'calorificValue', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          placeholder="0"
                          min="0"
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Fire Load (MJ/m²) = Σ(Mass × Calorific Value) / Floor Area
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Material Breakdown */}
            {calculation && !error && calculation.materialBreakdown.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Material Breakdown
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Material</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Mass (kg)</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Calorific (MJ/kg)</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Energy (MJ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {calculation.materialBreakdown.map((material, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-900">{material.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 text-right font-mono">{formatNumber(material.mass, 2)}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 text-right font-mono">{formatNumber(material.calorificValue, 1)}</td>
                          <td className="px-4 py-2 text-sm font-semibold text-primary text-right font-mono">{formatNumber(material.energy, 2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                      <tr>
                        <td className="px-4 py-2 text-sm font-bold text-gray-900">Total</td>
                        <td className="px-4 py-2 text-sm font-bold text-gray-900 text-right font-mono">
                          {formatNumber(calculation.materialBreakdown.reduce((sum, m) => sum + m.mass, 0), 2)}
                        </td>
                        <td className="px-4 py-2"></td>
                        <td className="px-4 py-2 text-sm font-bold text-primary text-right font-mono">
                          {formatNumber(calculation.totalHeatEnergy, 2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Risk Level Display */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Fire Risk Assessment
                </h3>
                
                <div className={`p-4 rounded-lg border ${getRiskLevelColor(calculation.riskLevel)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{getRiskLevelLabel(calculation.riskLevel)}</span>
                    <span className="font-mono text-2xl font-bold">{formatNumber(calculation.fireLoadDensity, 1)} MJ/m²</span>
                  </div>
                  <div className="text-sm opacity-90">
                    {calculation.riskLevel === 'low' && 'Fire load within safe limits for typical building use'}
                    {calculation.riskLevel === 'medium' && 'Moderate fire load - standard fire protection measures required'}
                    {calculation.riskLevel === 'high' && 'Elevated fire load - enhanced fire protection recommended'}
                    {calculation.riskLevel === 'very-high' && 'Very high fire load - special fire safety measures required'}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Reference Ranges:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="text-green-700">Low: &lt;400</div>
                    <div className="text-yellow-700">Medium: 400-800</div>
                    <div className="text-orange-700">High: 800-1200</div>
                    <div className="text-red-700">Very High: &gt;1200</div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {calculation && calculation.notes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Notes & Recommendations
                </h3>
                <ul className="space-y-2">
                  {calculation.notes.map((note, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && !error && (
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
                            {formatNumber(entry.calculation.fireLoadDensity, 1)} MJ/m²
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getOccupancyLabel(entry.calculation.occupancyType)} • 
                          {entry.calculation.materials.length} materials • 
                          {getRiskLevelLabel(entry.calculation.riskLevel)}
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

      <FireSafetyLoadCalculatorSEO />
      <RelatedTools
        currentTool="fire-safety-load-calculator"
        tools={['concrete-volume-calculator', 'construction-cost-estimator', 'room-area-calculator']}
      />
    </>
  );
}
