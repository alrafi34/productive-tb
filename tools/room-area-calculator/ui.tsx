"use client";

import { useState, useEffect } from "react";
import { Unit, RoomDimensions, CalculationResult } from "./types";
import {
  calculateRoomArea,
  getAllConversions,
  formatArea,
  exportToText,
  downloadFile,
  saveToHistory,
  getHistory,
  clearHistory,
  getUnitName,
  calculateTilesNeeded,
  calculatePaintNeeded
} from "./logic";
import RoomAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RoomAreaCalculatorUI() {
  const [dimensions, setDimensions] = useState<RoomDimensions>({
    length: '',
    width: '',
    unit: 'ft'
  });
  
  const [area, setArea] = useState<number>(0);
  const [conversions, setConversions] = useState({ sqft: 0, sqm: 0, sqyd: 0 });
  const [precision, setPrecision] = useState<number>(2);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [history, setHistory] = useState(getHistory());
  
  // Tile calculator state
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [wastage, setWastage] = useState('10');
  const [tilesNeeded, setTilesNeeded] = useState(0);
  
  // Paint calculator state
  const [coverage, setCoverage] = useState('350');
  const [gallonsNeeded, setGallonsNeeded] = useState(0);

  // Calculate area whenever dimensions change
  useEffect(() => {
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    
    if (!isNaN(length) && !isNaN(width) && length > 0 && width > 0) {
      const calculatedArea = calculateRoomArea(length, width);
      setArea(calculatedArea);
      
      const allConversions = getAllConversions(calculatedArea, dimensions.unit);
      setConversions(allConversions);
      
      // Calculate tiles if dimensions are set
      if (tileLength && tileWidth) {
        const tl = parseFloat(tileLength);
        const tw = parseFloat(tileWidth);
        const w = parseFloat(wastage) || 10;
        const tiles = calculateTilesNeeded(allConversions.sqft, tl, tw, w);
        setTilesNeeded(tiles);
      }
      
      // Calculate paint
      const cov = parseFloat(coverage) || 350;
      const gallons = calculatePaintNeeded(allConversions.sqft, cov);
      setGallonsNeeded(gallons);
    } else {
      setArea(0);
      setConversions({ sqft: 0, sqm: 0, sqyd: 0 });
      setTilesNeeded(0);
      setGallonsNeeded(0);
    }
  }, [dimensions, tileLength, tileWidth, wastage, coverage]);

  const updateDimension = (field: keyof RoomDimensions, value: string | Unit) => {
    // Handle unit conversion
    if (field === 'unit' && value !== dimensions.unit) {
      const oldUnit = dimensions.unit;
      const newUnit = value as Unit;
      
      // Convert length
      let newLength = dimensions.length;
      if (newLength) {
        const lengthNum = parseFloat(newLength);
        if (!isNaN(lengthNum)) {
          newLength = convertDimension(lengthNum, oldUnit, newUnit).toString();
        }
      }
      
      // Convert width
      let newWidth = dimensions.width;
      if (newWidth) {
        const widthNum = parseFloat(newWidth);
        if (!isNaN(widthNum)) {
          newWidth = convertDimension(widthNum, oldUnit, newUnit).toString();
        }
      }
      
      setDimensions(prev => ({ 
        ...prev, 
        unit: newUnit,
        length: newLength,
        width: newWidth
      }));
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
    else if (fromUnit === 'in') meters = value * 0.0254;
    
    // Convert from meters to target unit
    if (toUnit === 'ft') return meters / 0.3048;
    if (toUnit === 'yd') return meters / 0.9144;
    if (toUnit === 'in') return meters / 0.0254;
    return meters;
  };

  const handleReset = () => {
    setDimensions({ length: '', width: '', unit: dimensions.unit });
    setArea(0);
    setConversions({ sqft: 0, sqm: 0, sqyd: 0 });
    setTileLength('');
    setTileWidth('');
    setTilesNeeded(0);
    setGallonsNeeded(0);
  };

  const handleCopy = () => {
    const text = `Room: ${dimensions.length} × ${dimensions.width} ${dimensions.unit}\nArea: ${formatArea(area, dimensions.unit)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCalculation = () => {
    if (area > 0) {
      const result: CalculationResult = {
        area,
        unit: dimensions.unit,
        dimensions,
        conversions
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
        dimensions,
        conversions
      };
      const text = exportToText(result);
      downloadFile(text, 'room_area_calculation.txt');
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

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏠</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Room Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate room area instantly by entering length and width. Perfect for flooring, tiles, paint estimation, and renovation planning.
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
                  value={dimensions.unit}
                  onChange={(e) => updateDimension('unit', e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="ft">Feet (ft)</option>
                  <option value="m">Meters (m)</option>
                  <option value="yd">Yards (yd)</option>
                  <option value="in">Inches (in)</option>
                </select>
              </div>

              {/* Precision Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={precision}
                  onChange={(e) => setPrecision(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="0">0 decimals</option>
                  <option value="1">1 decimal</option>
                  <option value="2">2 decimals</option>
                  <option value="3">3 decimals</option>
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
                  onClick={() => setShowExtras(!showExtras)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔧 {showExtras ? 'Hide' : 'Show'} Extras
                </button>
              </div>
            </div>

            {/* Result Display */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                ROOM AREA
              </p>
              <div className="text-4xl font-bold mb-1">
                {area.toFixed(precision)}
              </div>
              <div className="text-xl text-primary-100 mb-4">
                {dimensions.unit}²
              </div>
              <div className="text-sm text-primary-100 mb-4">
                ({getUnitName(dimensions.unit)})
              </div>

              {area > 0 && (
                <div className="mb-4 pt-4 border-t border-white/20 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Square Feet:</span>
                    <span className="font-semibold">{conversions.sqft.toFixed(precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Square Meters:</span>
                    <span className="font-semibold">{conversions.sqm.toFixed(precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Square Yards:</span>
                    <span className="font-semibold">{conversions.sqyd.toFixed(precision)}</span>
                  </div>
                </div>
              )}

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
                Room Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({dimensions.unit})
                  </label>
                  <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => updateDimension('length', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Example: 12</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({dimensions.unit})
                  </label>
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => updateDimension('width', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Example: 10</p>
                </div>
              </div>

              {area > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Area = Length × Width = {dimensions.length} × {dimensions.width} = {area.toFixed(precision)} {dimensions.unit}²
                  </div>
                </div>
              )}
            </div>

            {/* Visual Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Room Preview
              </h3>
              <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-6xl mb-3">▭</div>
                  <div className="text-lg font-semibold text-gray-700">
                    {dimensions.length && dimensions.width 
                      ? `${dimensions.length} × ${dimensions.width} ${dimensions.unit}`
                      : 'Enter dimensions'}
                  </div>
                  {area > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      Area: {formatArea(area, dimensions.unit, precision)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Extras Panel */}
            {showExtras && area > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Additional Calculations
                </h3>

                {/* Tile Calculator */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                  <h4 className="font-semibold text-blue-900 text-sm">Tile Estimation</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-blue-800 mb-1">Tile Length (in)</label>
                      <input
                        type="number"
                        value={tileLength}
                        onChange={(e) => setTileLength(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded text-sm"
                        placeholder="12"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-blue-800 mb-1">Tile Width (in)</label>
                      <input
                        type="number"
                        value={tileWidth}
                        onChange={(e) => setTileWidth(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded text-sm"
                        placeholder="12"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-blue-800 mb-1">Wastage (%)</label>
                      <input
                        type="number"
                        value={wastage}
                        onChange={(e) => setWastage(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded text-sm"
                        placeholder="10"
                        min="0"
                      />
                    </div>
                  </div>
                  {tilesNeeded > 0 && (
                    <div className="text-sm font-semibold text-blue-900">
                      Tiles Needed: {tilesNeeded}
                    </div>
                  )}
                </div>

                {/* Paint Calculator */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                  <h4 className="font-semibold text-green-900 text-sm">Paint Estimation</h4>
                  <div>
                    <label className="block text-xs text-green-800 mb-1">Coverage per Gallon (sq ft)</label>
                    <input
                      type="number"
                      value={coverage}
                      onChange={(e) => setCoverage(e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded text-sm"
                      placeholder="350"
                      min="0"
                    />
                  </div>
                  {gallonsNeeded > 0 && (
                    <div className="text-sm font-semibold text-green-900">
                      Gallons Needed: {gallonsNeeded}
                    </div>
                  )}
                </div>
              </div>
            )}

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
                            {entry.result.dimensions.length} × {entry.result.dimensions.width} {entry.result.unit}
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

      <RoomAreaCalculatorSEO />
      <RelatedTools
        currentTool="room-area-calculator"
        tools={['floor-area-calculator', 'plot-area-calculator', 'square-meter-to-square-foot-converter']}
      />
    </>
  );
}
