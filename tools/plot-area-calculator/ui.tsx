"use client";

import { useState, useEffect } from "react";
import { ShapeType, Unit, PlotDimensions, CalculationResult } from "./types";
import {
  calculatePlotArea,
  getFormulaText,
  formatArea,
  exportToText,
  downloadFile,
  saveToHistory,
  getHistory,
  clearHistory,
  getShapeDisplayName,
  getUnitName
} from "./logic";
import PlotAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PlotAreaCalculatorUI() {
  const [dimensions, setDimensions] = useState<PlotDimensions>({
    shape: 'rectangle',
    unit: 'm',
    length: '',
    width: ''
  });
  
  const [area, setArea] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate area whenever dimensions change
  useEffect(() => {
    const calculatedArea = calculatePlotArea(dimensions);
    setArea(calculatedArea);
  }, [dimensions]);

  const updateDimension = (field: keyof PlotDimensions, value: string | ShapeType | Unit) => {
    // Handle unit conversion
    if (field === 'unit' && value !== dimensions.unit) {
      const oldUnit = dimensions.unit;
      const newUnit = value as Unit;
      
      const convertedDims: any = { unit: newUnit };
      
      // Convert all dimension fields
      const fieldsToConvert = ['length', 'width', 'side', 'base', 'height', 'topLength', 'bottomLength', 'trapezoidHeight'];
      
      fieldsToConvert.forEach(fieldName => {
        const currentValue = dimensions[fieldName as keyof PlotDimensions];
        if (currentValue && typeof currentValue === 'string') {
          const numValue = parseFloat(currentValue);
          if (!isNaN(numValue)) {
            convertedDims[fieldName] = convertDimension(numValue, oldUnit, newUnit).toString();
          } else {
            convertedDims[fieldName] = currentValue;
          }
        }
      });
      
      setDimensions(prev => ({ ...prev, ...convertedDims }));
    } else {
      setDimensions(prev => ({ ...prev, [field]: value }));
    }
  };

  // Helper function to convert dimensions between units
  const convertDimension = (value: number, fromUnit: Unit, toUnit: Unit): number => {
    if (fromUnit === toUnit) return value;
    
    // Convert to meters first
    let meters = value;
    if (fromUnit === 'ft') meters = value * 0.3048;
    else if (fromUnit === 'yd') meters = value * 0.9144;
    
    // Convert from meters to target unit
    if (toUnit === 'ft') return meters / 0.3048;
    if (toUnit === 'yd') return meters / 0.9144;
    return meters;
  };

  const handleShapeChange = (newShape: ShapeType) => {
    setDimensions({
      shape: newShape,
      unit: dimensions.unit,
      length: '',
      width: '',
      side: '',
      base: '',
      height: '',
      topLength: '',
      bottomLength: '',
      trapezoidHeight: ''
    });
    setArea(0);
  };

  const handleReset = () => {
    setDimensions({
      shape: dimensions.shape,
      unit: dimensions.unit,
      length: '',
      width: '',
      side: '',
      base: '',
      height: '',
      topLength: '',
      bottomLength: '',
      trapezoidHeight: ''
    });
    setArea(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatArea(area, dimensions.unit));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCalculation = () => {
    if (area > 0) {
      const result: CalculationResult = {
        area,
        unit: dimensions.unit,
        shape: dimensions.shape,
        dimensions,
        formula: getFormulaText(dimensions.shape)
      };
      saveToHistory(result);
      setHistory(getHistory());
    }
  };

  const handleExport = () => {
    if (area > 0) {
      const result: CalculationResult = {
        area,
        unit: dimensions.unit,
        shape: dimensions.shape,
        dimensions,
        formula: getFormulaText(dimensions.shape)
      };
      const text = exportToText(result);
      downloadFile(text, 'plot_area_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (result: CalculationResult) => {
    setDimensions(result.dimensions);
    setShowHistory(false);
  };

  const renderInputs = () => {
    const { shape, unit } = dimensions;

    switch (shape) {
      case 'rectangle':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length ({unit})</label>
              <input
                type="number"
                value={dimensions.length || ''}
                onChange={(e) => updateDimension('length', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="50"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width ({unit})</label>
              <input
                type="number"
                value={dimensions.width || ''}
                onChange={(e) => updateDimension('width', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="40"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'square':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Side Length ({unit})</label>
            <input
              type="number"
              value={dimensions.side || ''}
              onChange={(e) => updateDimension('side', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
              placeholder="20"
              min="0"
              step="0.1"
            />
          </div>
        );

      case 'triangle':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base ({unit})</label>
              <input
                type="number"
                value={dimensions.base || ''}
                onChange={(e) => updateDimension('base', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="10"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit})</label>
              <input
                type="number"
                value={dimensions.height || ''}
                onChange={(e) => updateDimension('height', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="12"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'trapezoid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Top Length ({unit})</label>
              <input
                type="number"
                value={dimensions.topLength || ''}
                onChange={(e) => updateDimension('topLength', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="10"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bottom Length ({unit})</label>
              <input
                type="number"
                value={dimensions.bottomLength || ''}
                onChange={(e) => updateDimension('bottomLength', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="20"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit})</label>
              <input
                type="number"
                value={dimensions.trapezoidHeight || ''}
                onChange={(e) => updateDimension('trapezoidHeight', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="8"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Plot Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate land or plot area using different shapes. Supports rectangle, square, triangle, and trapezoid with instant results.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Plot Shape</label>
                <select
                  value={dimensions.shape}
                  onChange={(e) => handleShapeChange(e.target.value as ShapeType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="rectangle">Rectangle</option>
                  <option value="square">Square</option>
                  <option value="triangle">Triangle</option>
                  <option value="trapezoid">Trapezoid</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <select
                  value={dimensions.unit}
                  onChange={(e) => updateDimension('unit', e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="m">Meters (m)</option>
                  <option value="ft">Feet (ft)</option>
                  <option value="yd">Yards (yd)</option>
                </select>
              </div>

              {/* Formula Display */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Formula</div>
                <div className="text-sm font-mono text-gray-900">{getFormulaText(dimensions.shape)}</div>
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
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                CALCULATED AREA
              </p>
              <div className="text-4xl font-bold mb-1">
                {area.toFixed(2)}
              </div>
              <div className="text-xl text-primary-100 mb-4">
                {dimensions.unit}²
              </div>
              <div className="text-sm text-primary-100 mb-4">
                ({getUnitName(dimensions.unit)})
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  disabled={area === 0}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button
                  onClick={handleSaveCalculation}
                  disabled={area === 0}
                  className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Save to History
                </button>
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Dimensions
              </h3>
              {renderInputs()}
            </div>

            {/* Visual Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Shape Preview
              </h3>
              <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-6xl mb-3">
                    {dimensions.shape === 'rectangle' && '▭'}
                    {dimensions.shape === 'square' && '◻'}
                    {dimensions.shape === 'triangle' && '△'}
                    {dimensions.shape === 'trapezoid' && '⏢'}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {getShapeDisplayName(dimensions.shape)}
                  </div>
                  {area > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      Area: {formatArea(area, dimensions.unit)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Export Button */}
            {area > 0 && (
              <button
                onClick={handleExport}
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
                        onClick={() => loadFromHistory(entry.result)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {getShapeDisplayName(entry.result.shape)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Area: {formatArea(entry.result.area, entry.result.unit)}
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

      <PlotAreaCalculatorSEO />
      <RelatedTools
        currentTool="plot-area-calculator"
        tools={['floor-area-calculator', 'aspect-ratio-calculator', 'square-meter-to-square-foot-converter']}
      />
    </>
  );
}
