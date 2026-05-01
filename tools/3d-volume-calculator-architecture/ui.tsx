"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, ShapeType, ShapeInputs, VolumeCalculation, RectangularInputs, CylinderInputs, SphereInputs, ConeInputs } from "./types";
import {
  calculateVolume,
  validateInputs,
  getShapeLabel,
  getUnitLabel,
  getLinearUnitLabel,
  getPresetTemplates,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import VolumeCalculatorArchitectureSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function VolumeCalculatorArchitectureUI() {
  const [shape, setShape] = useState<ShapeType>("rectangular");
  const [unit, setUnit] = useState<Unit>("meters");
  
  // Rectangular inputs
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(3);
  
  // Cylinder/Cone inputs
  const [radius, setRadius] = useState(2);
  const [cylHeight, setCylHeight] = useState(5);
  
  // Sphere inputs
  const [sphereRadius, setSphereRadius] = useState(3);
  
  const [calculation, setCalculation] = useState<VolumeCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresetTemplates();

  // Get current inputs based on shape
  const getCurrentInputs = (): ShapeInputs => {
    switch (shape) {
      case "rectangular":
        return { length, width, height } as RectangularInputs;
      case "cylinder":
        return { radius, height: cylHeight } as CylinderInputs;
      case "sphere":
        return { radius: sphereRadius } as SphereInputs;
      case "cone":
        return { radius, height: cylHeight } as ConeInputs;
    }
  };

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const inputs = getCurrentInputs();
      const validationError = validateInputs(shape, inputs);
      
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateVolume(shape, inputs, unit);
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [shape, length, width, height, radius, cylHeight, sphereRadius, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [shape, length, width, height, radius, cylHeight, sphereRadius, unit, debouncedCalculate]);

  const handleReset = () => {
    setShape("rectangular");
    setUnit("meters");
    setLength(10);
    setWidth(8);
    setHeight(3);
    setRadius(2);
    setCylHeight(5);
    setSphereRadius(3);
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setShape(preset.shape);
    const inputs = preset.inputs;
    
    switch (preset.shape) {
      case "rectangular": {
        const rect = inputs as RectangularInputs;
        setLength(rect.length);
        setWidth(rect.width);
        setHeight(rect.height);
        break;
      }
      case "cylinder": {
        const cyl = inputs as CylinderInputs;
        setRadius(cyl.radius);
        setCylHeight(cyl.height);
        break;
      }
      case "sphere": {
        const sph = inputs as SphereInputs;
        setSphereRadius(sph.radius);
        break;
      }
      case "cone": {
        const cone = inputs as ConeInputs;
        setRadius(cone.radius);
        setCylHeight(cone.height);
        break;
      }
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Volume: ${formatNumber(calculation.volume, 3)} ${getUnitLabel(calculation.unit)}`;
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
      downloadFile(text, '3d-volume-calculation.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: VolumeCalculation) => {
    setShape(calc.shape);
    setUnit(calc.unit);
    
    switch (calc.shape) {
      case "rectangular": {
        const rect = calc.inputs as RectangularInputs;
        setLength(rect.length);
        setWidth(rect.width);
        setHeight(rect.height);
        break;
      }
      case "cylinder": {
        const cyl = calc.inputs as CylinderInputs;
        setRadius(cyl.radius);
        setCylHeight(cyl.height);
        break;
      }
      case "sphere": {
        const sph = calc.inputs as SphereInputs;
        setSphereRadius(sph.radius);
        break;
      }
      case "cone": {
        const cone = calc.inputs as ConeInputs;
        setRadius(cone.radius);
        setCylHeight(cone.height);
        break;
      }
    }
    
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">3D Volume Calculator (Architecture)</h3>
              <p className="text-sm text-blue-800">
                Calculate 3D volume for rooms, buildings, cylinders, spheres, and cones. Fast, accurate architectural volume calculator with real-time results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Shape Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shape Type</label>
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value as ShapeType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="rectangular">Rectangular Prism</option>
                  <option value="cylinder">Cylinder</option>
                  <option value="sphere">Sphere</option>
                  <option value="cone">Cone</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="meters">Meters (m³)</option>
                  <option value="feet">Feet (ft³)</option>
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
              </div>
            </div>

            {/* Result Display */}
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Volume
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.volume, 3)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(calculation.unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Shape:</span>
                    <span className="font-semibold text-xs">{getShapeLabel(calculation.shape)}</span>
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
                Dimensions
              </h3>
              
              {/* Rectangular Prism Inputs */}
              {shape === "rectangular" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({getLinearUnitLabel(unit)})
                    </label>
                    <input
                      type="number"
                      value={length || ''}
                      onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({getLinearUnitLabel(unit)})
                    </label>
                    <input
                      type="number"
                      value={width || ''}
                      onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="8"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({getLinearUnitLabel(unit)})
                    </label>
                    <input
                      type="number"
                      value={height || ''}
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="3"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              )}

              {/* Cylinder Inputs */}
              {shape === "cylinder" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius ({getLinearUnitLabel(unit)})
                    </label>
                    <input
                      type="number"
                      value={radius || ''}
                      onChange={(e) => setRadius(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({getLinearUnitLabel(unit)})
                    </label>
                    <input
                      type="number"
                      value={cylHeight || ''}
                      onChange={(e) => setCylHeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              )}

              {/* Sphere Inputs */}
              {shape === "sphere" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Radius ({getLinearUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={sphereRadius || ''}
                    onChange={(e) => setSphereRadius(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="3"
                    min="0"
                    step="0.1"
                  />
                </div>
              )}

              {/* Cone Inputs */}
              {shape === "cone" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius ({getLinearUnitLabel(unit)})
                    </label>
                    <input
                      type="number"
                      value={radius || ''}
                      onChange={(e) => setRadius(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({getLinearUnitLabel(unit)})
                    </label>
                    <input
                      type="number"
                      value={cylHeight || ''}
                      onChange={(e) => setCylHeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {calculation.formula}
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

            {/* Calculation Summary */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Total Volume</div>
                    <div className="text-3xl font-bold text-primary">{formatNumber(calculation.volume, 3)}</div>
                    <div className="text-sm text-primary font-medium mt-1">{getUnitLabel(calculation.unit)}</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Shape Details</div>
                    <div className="text-sm text-gray-700">
                      <strong>Type:</strong> {getShapeLabel(calculation.shape)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
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
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Button */}
            {calculation && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Report
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
                            {formatNumber(entry.calculation.volume, 3)} {getUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getShapeLabel(entry.calculation.shape)}
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

      <VolumeCalculatorArchitectureSEO />
      <RelatedTools
        currentTool="3d-volume-calculator-architecture"
        tools={['room-volume-calculator', 'concrete-volume-calculator', 'room-area-calculator']}
      />
    </>
  );
}
