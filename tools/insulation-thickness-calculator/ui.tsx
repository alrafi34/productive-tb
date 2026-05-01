"use client";

import { useState, useEffect } from "react";
import { CalculationMode, ThicknessUnit, InsulationCalculation } from "./types";
import {
  performInsulationCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getMaterialPresets,
  getApplicationPresets,
  getThicknessCategory,
  validateInputs
} from "./logic";
import InsulationThicknessCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function InsulationThicknessCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("surface");
  const [thicknessUnit, setThicknessUnit] = useState<ThicknessUnit>("mm");
  const [ambientTemp, setAmbientTemp] = useState("30");
  const [thermalConductivity, setThermalConductivity] = useState("0.040");
  
  // Surface temperature mode
  const [fluidTemp, setFluidTemp] = useState("");
  const [targetSurfaceTemp, setTargetSurfaceTemp] = useState("");
  const [pipeDiameter, setPipeDiameter] = useState("");
  
  // Heat loss mode
  const [maxHeatLoss, setMaxHeatLoss] = useState("");
  
  // U-value mode
  const [targetUValue, setTargetUValue] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<InsulationCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMaterialPresets, setShowMaterialPresets] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const materialPresets = getMaterialPresets();
  const applicationPresets = getApplicationPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const aTemp = parseFloat(ambientTemp);
    const k = parseFloat(thermalConductivity);
    
    let fTemp: number | undefined;
    let tSurfaceTemp: number | undefined;
    let pDiameter: number | undefined;
    let mHeatLoss: number | undefined;
    let tUValue: number | undefined;
    
    if (mode === "surface") {
      fTemp = parseFloat(fluidTemp);
      tSurfaceTemp = parseFloat(targetSurfaceTemp);
      pDiameter = pipeDiameter ? parseFloat(pipeDiameter) : undefined;
    } else if (mode === "heatloss") {
      fTemp = parseFloat(fluidTemp);
      mHeatLoss = parseFloat(maxHeatLoss);
      pDiameter = parseFloat(pipeDiameter);
    } else if (mode === "uvalue") {
      tUValue = parseFloat(targetUValue);
    }
    
    const validationError = validateInputs(
      mode, aTemp, k, fTemp, tSurfaceTemp, pDiameter, mHeatLoss, tUValue
    );
    
    if (validationError) {
      setCalculation(null);
      return;
    }
    
    const result = performInsulationCalculation(
      mode, thicknessUnit, aTemp, k, fTemp, tSurfaceTemp, pDiameter, mHeatLoss, tUValue
    );
    setCalculation(result);
  }, [mode, thicknessUnit, ambientTemp, thermalConductivity, fluidTemp, targetSurfaceTemp, 
      pipeDiameter, maxHeatLoss, targetUValue]);

  const handleReset = () => {
    setAmbientTemp("30");
    setThermalConductivity("0.040");
    setFluidTemp("");
    setTargetSurfaceTemp("");
    setPipeDiameter("");
    setMaxHeatLoss("");
    setTargetUValue("");
    setCalculation(null);
    setError(null);
  };

  const handleApplyMaterialPreset = (preset: any) => {
    setThermalConductivity(preset.conductivity.toString());
  };

  const handleApplyApplicationPreset = (preset: any) => {
    setMode(preset.mode);
    setAmbientTemp(preset.ambientTemp.toString());
    setThermalConductivity(preset.thermalConductivity.toString());
    if (preset.fluidTemp !== undefined) setFluidTemp(preset.fluidTemp.toString());
    if (preset.targetSurfaceTemp !== undefined) setTargetSurfaceTemp(preset.targetSurfaceTemp.toString());
    if (preset.pipeDiameter !== undefined) setPipeDiameter(preset.pipeDiameter.toString());
    if (preset.maxHeatLoss !== undefined) setMaxHeatLoss(preset.maxHeatLoss.toString());
    if (preset.targetUValue !== undefined) setTargetUValue(preset.targetUValue.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Required Insulation Thickness: ${formatNumber(calculation.requiredThickness)} mm (${formatNumber(calculation.requiredThicknessInches, 2)} inches)`;
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
      downloadFile(text, 'insulation_thickness_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: InsulationCalculation) => {
    setMode(calc.mode);
    setThicknessUnit(calc.thicknessUnit);
    setAmbientTemp(calc.ambientTemp.toString());
    setThermalConductivity(calc.thermalConductivity.toString());
    
    if (calc.mode === "surface") {
      setFluidTemp(calc.fluidTemp?.toString() || "");
      setTargetSurfaceTemp(calc.targetSurfaceTemp?.toString() || "");
      setPipeDiameter(calc.pipeDiameter?.toString() || "");
    } else if (calc.mode === "heatloss") {
      setFluidTemp(calc.fluidTemp?.toString() || "");
      setMaxHeatLoss(calc.maxHeatLoss?.toString() || "");
      setPipeDiameter(calc.pipeDiameter?.toString() || "");
    } else if (calc.mode === "uvalue") {
      setTargetUValue(calc.targetUValue?.toString() || "");
    }
    setShowHistory(false);
  };

  const category = calculation ? getThicknessCategory(calculation.requiredThickness) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Insulation Thickness Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate required insulation thickness for pipes, walls, and surfaces using thermal conductivity, U-values, or heat loss limits.
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
                  <option value="surface">Surface Temperature</option>
                  <option value="heatloss">Heat Loss Limit</option>
                  <option value="uvalue">U-Value (Flat Surface)</option>
                </select>
              </div>

              {/* Thickness Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thickness Unit</label>
                <select
                  value={thicknessUnit}
                  onChange={(e) => setThicknessUnit(e.target.value as ThicknessUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="mm">Millimeters (mm)</option>
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
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                <button
                  onClick={() => setShowMaterialPresets(!showMaterialPresets)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📚 {showMaterialPresets ? 'Hide' : 'Show'} Materials
                </button>
              </div>
            </div>

            {/* Result Display */}
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Required Thickness
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(thicknessUnit === "mm" ? calculation.requiredThickness : calculation.requiredThicknessInches, thicknessUnit === "mm" ? 1 : 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {thicknessUnit === "mm" ? "mm" : "inches"}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">In {thicknessUnit === "mm" ? "inches" : "mm"}:</span>
                    <span className="font-semibold">{formatNumber(thicknessUnit === "mm" ? calculation.requiredThicknessInches : calculation.requiredThickness, thicknessUnit === "mm" ? 2 : 1)} {thicknessUnit === "mm" ? "in" : "mm"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Category:</span>
                    <span className="font-semibold">{category?.level}</span>
                  </div>
                  {calculation.estimatedHeatLoss && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Heat Loss:</span>
                      <span className="font-semibold">{formatNumber(calculation.estimatedHeatLoss)} W/m</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-white/20">
                    <div className="text-xs text-primary-100 mb-1">Assessment:</div>
                    <div className="font-semibold text-sm">{category?.description}</div>
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
            
            {/* Common Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Material Properties
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ambient Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="30"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thermal Conductivity (W/m·K)
                  </label>
                  <input
                    type="number"
                    value={thermalConductivity}
                    onChange={(e) => setThermalConductivity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.040"
                    min="0"
                    step="0.001"
                  />
                </div>
              </div>
            </div>

            {/* Mode-Specific Inputs */}
            {mode === "surface" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Surface Temperature Mode
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fluid Temperature (°C)
                    </label>
                    <input
                      type="number"
                      value={fluidTemp}
                      onChange={(e) => setFluidTemp(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="150"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Surface Temp (°C)
                    </label>
                    <input
                      type="number"
                      value={targetSurfaceTemp}
                      onChange={(e) => setTargetSurfaceTemp(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="45"
                      step="0.1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pipe Diameter (mm) - Optional
                    </label>
                    <input
                      type="number"
                      value={pipeDiameter}
                      onChange={(e) => setPipeDiameter(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">
                    <strong>Formula:</strong> thickness ≈ k × (T_hot - T_surface) / (T_surface - T_ambient)
                  </div>
                </div>
              </div>
            )}

            {mode === "heatloss" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Heat Loss Mode
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fluid Temperature (°C)
                    </label>
                    <input
                      type="number"
                      value={fluidTemp}
                      onChange={(e) => setFluidTemp(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="150"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Heat Loss (W/m)
                    </label>
                    <input
                      type="number"
                      value={maxHeatLoss}
                      onChange={(e) => setMaxHeatLoss(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="50"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pipe Diameter (mm)
                    </label>
                    <input
                      type="number"
                      value={pipeDiameter}
                      onChange={(e) => setPipeDiameter(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">
                    <strong>Formula:</strong> q = (2πk(T_hot - T_ambient)) / ln(r2 / r1)
                  </div>
                </div>
              </div>
            )}

            {mode === "uvalue" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  U-Value Mode
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target U-Value (W/m²·K)
                  </label>
                  <input
                    type="number"
                    value={targetUValue}
                    onChange={(e) => setTargetUValue(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.25"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">
                    <strong>Formula:</strong> thickness = k / U
                  </div>
                </div>
              </div>
            )}

            {/* Application Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Application Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {applicationPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyApplicationPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Button */}
            {calculation && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Result
              </button>
            )}

            {/* Material Presets Panel */}
            {showMaterialPresets && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Material Thermal Conductivity (W/m·K)
                  </h3>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {["Foam", "Mineral", "Natural", "Advanced", "Structural"].map(category => {
                    const categoryMaterials = materialPresets.filter(p => p.category === category);
                    if (categoryMaterials.length === 0) return null;
                    
                    return (
                      <div key={category} className="p-4">
                        <h4 className="font-semibold text-gray-700 text-sm mb-2">{category}</h4>
                        <div className="space-y-2">
                          {categoryMaterials.map((preset, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleApplyMaterialPreset(preset)}
                              className="w-full flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded transition-colors"
                            >
                              <span className="text-gray-600 text-left">{preset.name}</span>
                              <span className="font-mono font-semibold text-gray-900">{preset.conductivity}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                            {formatNumber(entry.calculation.requiredThickness)} mm
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.mode.charAt(0).toUpperCase() + entry.calculation.mode.slice(1)} Mode | k: {formatNumber(entry.calculation.thermalConductivity, 3)} W/m·K
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

      <InsulationThicknessCalculatorSEO />
      <RelatedTools
        currentTool="insulation-thickness-calculator"
        tools={['heat-loss-calculator-building', 'hvac-load-calculator', 'cooling-load-calculator-architecture']}
      />
    </>
  );
}
