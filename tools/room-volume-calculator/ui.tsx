"use client";

import { useState, useEffect } from "react";
import { Unit, RoomShape, RoomDimensions, CalculationResult } from "./types";
import {
  calculateRoomVolume,
  getAllConversions,
  formatVolume,
  exportToText,
  downloadFile,
  saveToHistory,
  getHistory,
  clearHistory,
  getShapeDisplayName,
  ROOM_PRESETS,
  calculateACH,
  recommendAirPurifierCADR
} from "./logic";
import RoomVolumeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RoomVolumeCalculatorUI() {
  const [dimensions, setDimensions] = useState<RoomDimensions>({
    shape: 'rectangular',
    unit: 'm',
    length: '',
    width: '',
    height: ''
  });
  
  const [volume, setVolume] = useState<number>(0);
  const [conversions, setConversions] = useState({ cubicMeters: 0, cubicFeet: 0, liters: 0 });
  const [precision, setPrecision] = useState<number>(2);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showHVAC, setShowHVAC] = useState(false);
  const [history, setHistory] = useState(getHistory());
  
  // HVAC calculator state
  const [airflowCFM, setAirflowCFM] = useState('');
  const [ach, setACH] = useState(0);
  const [cadr, setCADR] = useState(0);

  // Calculate volume whenever dimensions change
  useEffect(() => {
    const calculatedVolume = calculateRoomVolume(dimensions);
    setVolume(calculatedVolume);
    
    if (calculatedVolume > 0) {
      const allConversions = getAllConversions(calculatedVolume, dimensions.unit);
      setConversions(allConversions);
      
      // Calculate HVAC values
      if (airflowCFM) {
        const achValue = calculateACH(allConversions.cubicMeters, parseFloat(airflowCFM));
        setACH(achValue);
      }
      setCADR(recommendAirPurifierCADR(allConversions.cubicFeet));
    } else {
      setConversions({ cubicMeters: 0, cubicFeet: 0, liters: 0 });
      setACH(0);
      setCADR(0);
    }
  }, [dimensions, airflowCFM]);

  const updateDimension = (field: keyof RoomDimensions, value: string | RoomShape | Unit) => {
    // Handle unit conversion
    if (field === 'unit' && value !== dimensions.unit) {
      const oldUnit = dimensions.unit;
      const newUnit = value as Unit;
      
      const convertedDims: any = { unit: newUnit };
      
      // Convert all dimension fields
      const fieldsToConvert = [
        'length', 'width', 'height', 
        'radius', 'cylinderHeight',
        'triangleLength', 'triangleWidth', 'wallHeight', 'peakHeight'
      ];
      
      fieldsToConvert.forEach(fieldName => {
        const currentValue = dimensions[fieldName as keyof RoomDimensions];
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
    
    // Convert from meters to target unit
    if (toUnit === 'ft') return meters / 0.3048;
    return meters;
  };

  const handleShapeChange = (newShape: RoomShape) => {
    setDimensions({
      shape: newShape,
      unit: dimensions.unit,
      length: '',
      width: '',
      height: '',
      radius: '',
      cylinderHeight: '',
      triangleLength: '',
      triangleWidth: '',
      wallHeight: '',
      peakHeight: ''
    });
    setVolume(0);
  };

  const handlePresetSelect = (presetName: string) => {
    const preset = ROOM_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setDimensions({
        ...dimensions,
        shape: 'rectangular',
        length: preset.length.toString(),
        width: preset.width.toString(),
        height: preset.height.toString()
      });
    }
  };

  const handleReset = () => {
    setDimensions({
      shape: dimensions.shape,
      unit: dimensions.unit,
      length: '',
      width: '',
      height: '',
      radius: '',
      cylinderHeight: '',
      triangleLength: '',
      triangleWidth: '',
      wallHeight: '',
      peakHeight: ''
    });
    setVolume(0);
    setAirflowCFM('');
    setACH(0);
    setCADR(0);
  };

  const handleCopy = () => {
    const text = `Room Volume: ${formatVolume(volume, dimensions.unit, precision)}\n${conversions.cubicMeters.toFixed(precision)} m³ | ${conversions.cubicFeet.toFixed(precision)} ft³ | ${conversions.liters.toFixed(0)} liters`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCalculation = () => {
    if (volume > 0) {
      const result: CalculationResult = {
        volume,
        unit: dimensions.unit,
        shape: dimensions.shape,
        dimensions,
        conversions
      };
      saveToHistory(result);
      setHistory(getHistory());
    }
  };

  const handleExport = () => {
    if (volume > 0) {
      const result: CalculationResult = {
        volume,
        unit: dimensions.unit,
        shape: dimensions.shape,
        dimensions,
        conversions
      };
      const text = exportToText(result);
      downloadFile(text, 'room_volume_calculation.txt');
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
      case 'rectangular':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length ({unit})</label>
              <input
                type="number"
                value={dimensions.length || ''}
                onChange={(e) => updateDimension('length', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="5"
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
                placeholder="4"
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
                placeholder="3"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'cylindrical':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius ({unit})</label>
              <input
                type="number"
                value={dimensions.radius || ''}
                onChange={(e) => updateDimension('radius', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="3"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit})</label>
              <input
                type="number"
                value={dimensions.cylinderHeight || ''}
                onChange={(e) => updateDimension('cylinderHeight', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="4"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'triangular':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length ({unit})</label>
              <input
                type="number"
                value={dimensions.triangleLength || ''}
                onChange={(e) => updateDimension('triangleLength', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="6"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width ({unit})</label>
              <input
                type="number"
                value={dimensions.triangleWidth || ''}
                onChange={(e) => updateDimension('triangleWidth', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="5"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wall Height ({unit})</label>
              <input
                type="number"
                value={dimensions.wallHeight || ''}
                onChange={(e) => updateDimension('wallHeight', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="2.5"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Peak Height ({unit})</label>
              <input
                type="number"
                value={dimensions.peakHeight || ''}
                onChange={(e) => updateDimension('peakHeight', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                placeholder="4"
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
            <span className="text-2xl">📦</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Room Volume Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate interior space volume for HVAC design, air purifier sizing, and room capacity planning. Supports multiple room shapes.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Shape</label>
                <select
                  value={dimensions.shape}
                  onChange={(e) => handleShapeChange(e.target.value as RoomShape)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="rectangular">Rectangular Room</option>
                  <option value="cylindrical">Cylindrical Room</option>
                  <option value="triangular">Triangular/Attic Room</option>
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

              {/* Room Presets */}
              {dimensions.shape === 'rectangular' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Presets</label>
                  <select
                    onChange={(e) => handlePresetSelect(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    defaultValue=""
                  >
                    <option value="">Select a preset...</option>
                    {ROOM_PRESETS.map(preset => (
                      <option key={preset.name} value={preset.name}>{preset.name}</option>
                    ))}
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
                <button
                  onClick={() => setShowHVAC(!showHVAC)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🌬️ {showHVAC ? 'Hide' : 'Show'} HVAC Tools
                </button>
              </div>
            </div>

            {/* Result Display */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                ROOM VOLUME
              </p>
              <div className="text-4xl font-bold mb-1">
                {volume.toFixed(precision)}
              </div>
              <div className="text-xl text-primary-100 mb-4">
                {dimensions.unit}³
              </div>

              {volume > 0 && (
                <div className="mb-4 pt-4 border-t border-white/20 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Meters:</span>
                    <span className="font-semibold">{conversions.cubicMeters.toFixed(precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Feet:</span>
                    <span className="font-semibold">{conversions.cubicFeet.toFixed(precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Liters:</span>
                    <span className="font-semibold">{conversions.liters.toFixed(0)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  disabled={volume === 0}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button
                  onClick={handleSaveCalculation}
                  disabled={volume === 0}
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
                {getShapeDisplayName(dimensions.shape)} Dimensions
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
                    {dimensions.shape === 'rectangular' && '▭'}
                    {dimensions.shape === 'cylindrical' && '⬤'}
                    {dimensions.shape === 'triangular' && '△'}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {getShapeDisplayName(dimensions.shape)}
                  </div>
                  {volume > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      Volume: {formatVolume(volume, dimensions.unit, precision)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* HVAC Tools */}
            {showHVAC && volume > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  HVAC & Air Quality Tools
                </h3>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                  <h4 className="font-semibold text-blue-900 text-sm">Air Changes Per Hour (ACH)</h4>
                  <div>
                    <label className="block text-xs text-blue-800 mb-1">Airflow (CFM)</label>
                    <input
                      type="number"
                      value={airflowCFM}
                      onChange={(e) => setAirflowCFM(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-200 rounded text-sm"
                      placeholder="200"
                      min="0"
                    />
                  </div>
                  {ach > 0 && (
                    <div className="text-sm font-semibold text-blue-900">
                      ACH: {ach.toFixed(2)} air changes per hour
                    </div>
                  )}
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 text-sm mb-2">Air Purifier Recommendation</h4>
                  <div className="text-sm text-green-800">
                    Recommended CADR: <strong>{cadr} CFM</strong>
                  </div>
                  <p className="text-xs text-green-700 mt-2">
                    For effective air purification, choose an air purifier with CADR at least {cadr} CFM.
                  </p>
                </div>
              </div>
            )}

            {/* Export Button */}
            {volume > 0 && (
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
                          Volume: {formatVolume(entry.result.volume, entry.result.unit, precision)}
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

      <RoomVolumeCalculatorSEO />
      <RelatedTools
        currentTool="room-volume-calculator"
        tools={['room-area-calculator', 'floor-area-calculator', 'plot-area-calculator']}
      />
    </>
  );
}
