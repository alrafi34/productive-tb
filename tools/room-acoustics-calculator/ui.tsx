"use client";

import { useState, useEffect } from "react";
import { DimensionUnit, MaterialType, RoomAcousticsCalculation } from "./types";
import {
  performRoomAcousticsCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToJSON,
  downloadFile,
  formatNumber,
  getDimensionUnitLabel,
  getVolumeUnitLabel,
  getAreaUnitLabel,
  getRoomPresets,
  getMaterialPresets,
  getAcousticQuality,
  getRecommendations,
  validateInputs
} from "./logic";
import RoomAcousticsCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RoomAcousticsCalculatorUI() {
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("m");
  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("4");
  const [height, setHeight] = useState("3");
  const [wallMaterial, setWallMaterial] = useState<MaterialType>("plaster");
  const [floorMaterial, setFloorMaterial] = useState<MaterialType>("carpet");
  const [ceilingMaterial, setCeilingMaterial] = useState<MaterialType>("plaster");
  const [temperature, setTemperature] = useState("20");
  const [humidity, setHumidity] = useState("50");
  
  // Results
  const [calculation, setCalculation] = useState<RoomAcousticsCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showModes, setShowModes] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const roomPresets = getRoomPresets();
  const materialPresets = getMaterialPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const temp = parseFloat(temperature);
    const hum = parseFloat(humidity);
    
    const validationError = validateInputs(l, w, h, temp, hum);
    if (validationError) {
      setCalculation(null);
      return;
    }
    
    const result = performRoomAcousticsCalculation(
      l, w, h, dimensionUnit, wallMaterial, floorMaterial, ceilingMaterial, temp, hum
    );
    setCalculation(result);
  }, [length, width, height, dimensionUnit, wallMaterial, floorMaterial, ceilingMaterial, temperature, humidity]);

  const handleReset = () => {
    setLength("5");
    setWidth("4");
    setHeight("3");
    setWallMaterial("plaster");
    setFloorMaterial("carpet");
    setCeilingMaterial("plaster");
    setTemperature("20");
    setHumidity("50");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setDimensionUnit("m");
    setLength(preset.length.toString());
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    setWallMaterial(preset.wallMaterial);
    setFloorMaterial(preset.floorMaterial);
    setCeilingMaterial(preset.ceilingMaterial);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `RT60: ${formatNumber(calculation.rt60)}s | ${calculation.acousticRating} | ${calculation.acousticQuality}`;
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
      downloadFile(text, 'room_acoustics_calculation.txt');
    }
  };

  const handleExportJSON = () => {
    if (calculation) {
      const json = exportToJSON(calculation);
      downloadFile(json, 'room_acoustics_calculation.json', 'application/json');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: RoomAcousticsCalculation) => {
    setDimensionUnit(calc.dimensionUnit);
    setLength(calc.length.toString());
    setWidth(calc.width.toString());
    setHeight(calc.height.toString());
    setWallMaterial(calc.wallMaterial);
    setFloorMaterial(calc.floorMaterial);
    setCeilingMaterial(calc.ceilingMaterial);
    setTemperature(calc.temperature.toString());
    setHumidity(calc.humidity.toString());
    setShowHistory(false);
  };

  const assessment = calculation ? getAcousticQuality(calculation.rt60) : null;
  const recommendations = calculation ? getRecommendations(calculation.rt60, calculation.totalAbsorption) : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Room Acoustics Calculator</h3>
              <p className="text-sm text-blue-800">
                Analyze room acoustics instantly. Calculate RT60, sound reflections, and room modes for studios, offices, and home setups.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Dimension Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimension Unit</label>
                <select
                  value={dimensionUnit}
                  onChange={(e) => setDimensionUnit(e.target.value as DimensionUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="m">Meters (m)</option>
                  <option value="ft">Feet (ft)</option>
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
            {calculation && assessment && (
              <div className={`rounded-xl border shadow-lg p-6 text-white space-y-4 ${
                assessment.color === 'green' ? 'bg-green-600 border-green-700' :
                assessment.color === 'blue' ? 'bg-blue-600 border-blue-700' :
                assessment.color === 'yellow' ? 'bg-yellow-600 border-yellow-700' :
                assessment.color === 'orange' ? 'bg-orange-600 border-orange-700' :
                'bg-red-600 border-red-700'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    RT60 (Reverberation Time)
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.rt60)}
                  </div>
                  <div className="text-xl text-white/90">
                    seconds
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Rating:</span>
                    <span className="font-semibold">{assessment.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Quality:</span>
                    <span className="font-semibold">{assessment.quality}</span>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <div className="text-xs text-white/80 mb-1">Assessment:</div>
                    <div className="font-semibold text-sm">{assessment.description}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-white/20 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/30 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Room Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Room Dimensions
              </h3>
              
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
                    placeholder="5"
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
                    placeholder="4"
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
                    placeholder="3"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-xs text-blue-600 mb-1">Volume</div>
                    <div className="text-sm font-semibold text-blue-900">{formatNumber(calculation.volume)} m³</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-xs text-blue-600 mb-1">Surface Area</div>
                    <div className="text-sm font-semibold text-blue-900">{formatNumber(calculation.surfaceArea)} m²</div>
                  </div>
                </div>
              )}
            </div>

            {/* Materials */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Surface Materials
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Walls</label>
                  <select
                    value={wallMaterial}
                    onChange={(e) => setWallMaterial(e.target.value as MaterialType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {materialPresets.map(mat => (
                      <option key={mat.value} value={mat.value}>
                        {mat.name} (α={mat.absorption})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                  <select
                    value={floorMaterial}
                    onChange={(e) => setFloorMaterial(e.target.value as MaterialType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {materialPresets.map(mat => (
                      <option key={mat.value} value={mat.value}>
                        {mat.name} (α={mat.absorption})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ceiling</label>
                  <select
                    value={ceilingMaterial}
                    onChange={(e) => setCeilingMaterial(e.target.value as MaterialType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {materialPresets.map(mat => (
                      <option key={mat.value} value={mat.value}>
                        {mat.name} (α={mat.absorption})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-sm text-purple-800">
                    <strong>Total Absorption:</strong> {formatNumber(calculation.totalAbsorption)} sabins
                  </div>
                </div>
              )}
            </div>

            {/* Environmental Conditions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Environmental Conditions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="20"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="50"
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-600">
                  <strong>Note:</strong> Temperature and humidity affect the speed of sound, which influences room mode frequencies.
                </div>
              </div>
            </div>

            {/* Room Modes */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Room Modes
                  </h3>
                  <button
                    onClick={() => setShowModes(!showModes)}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    {showModes ? 'Hide' : 'Show'} Frequencies
                  </button>
                </div>
                
                {showModes && (
                  <div className="space-y-2">
                    {calculation.roomModes.map((mode, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-semibold text-gray-900">{mode.type}</span>
                          <span className="text-xs text-gray-600 ml-2">Mode: {mode.mode}</span>
                        </div>
                        <span className="font-mono font-semibold text-gray-900">{mode.frequency} Hz</span>
                      </div>
                    ))}
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-3">
                      <p className="text-xs text-yellow-800">
                        <strong>Note:</strong> Room modes are resonant frequencies where sound can build up. Low-frequency modes may require bass traps.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recommendations */}
            {calculation && recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Recommendations
                  </h3>
                  <button
                    onClick={() => setShowRecommendations(!showRecommendations)}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    {showRecommendations ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                
                {showRecommendations && (
                  <div className="space-y-2">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>{index + 1}.</strong> {rec}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Room Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Room Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roomPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {preset.length}×{preset.width}×{preset.height} m
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {calculation && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export TXT
                </button>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export JSON
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
                            RT60: {formatNumber(entry.calculation.rt60)}s
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.volume)} m³ | {entry.calculation.acousticRating}
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

      <RoomAcousticsCalculatorSEO />
      <RelatedTools
        currentTool="room-acoustics-calculator"
        tools={['acoustic-soundproofing-calculator', 'ventilation-calculator', 'room-volume-calculator']}
      />
    </>
  );
}
