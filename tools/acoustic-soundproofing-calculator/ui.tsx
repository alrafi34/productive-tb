"use client";

import { useState, useEffect } from "react";
import { WallType, InsulationMaterial, AcousticCalculation } from "./types";
import {
  performAcousticCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getRoomPresets,
  getNoiseSourcePresets,
  getDesiredLevelPresets,
  getDifficultyLevel,
  validateInputs
} from "./logic";
import AcousticSoundproofingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AcousticSoundproofingCalculatorUI() {
  const [length, setLength] = useState("4");
  const [width, setWidth] = useState("4");
  const [height, setHeight] = useState("3");
  const [noiseSourceLevel, setNoiseSourceLevel] = useState("70");
  const [desiredNoiseLevel, setDesiredNoiseLevel] = useState("40");
  const [wallType, setWallType] = useState<WallType>("drywall");
  const [insulationMaterial, setInsulationMaterial] = useState<InsulationMaterial>("none");
  
  // Results
  const [calculation, setCalculation] = useState<AcousticCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const roomPresets = getRoomPresets();
  const noiseSourcePresets = getNoiseSourcePresets();
  const desiredLevelPresets = getDesiredLevelPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const nLevel = parseFloat(noiseSourceLevel);
    const dLevel = parseFloat(desiredNoiseLevel);
    
    const validationError = validateInputs(l, w, h, nLevel, dLevel);
    if (validationError) {
      setCalculation(null);
      return;
    }
    
    const result = performAcousticCalculation(
      l, w, h, nLevel, dLevel, wallType, insulationMaterial
    );
    setCalculation(result);
  }, [length, width, height, noiseSourceLevel, desiredNoiseLevel, wallType, insulationMaterial]);

  const handleReset = () => {
    setLength("4");
    setWidth("4");
    setHeight("3");
    setNoiseSourceLevel("70");
    setDesiredNoiseLevel("40");
    setWallType("drywall");
    setInsulationMaterial("none");
    setCalculation(null);
    setError(null);
  };

  const handleApplyRoomPreset = (preset: any) => {
    setLength(preset.length.toString());
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    setNoiseSourceLevel(preset.noiseSourceLevel.toString());
    setDesiredNoiseLevel(preset.desiredNoiseLevel.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Required Reduction: ${calculation.requiredReduction} dB | Additional Needed: ${calculation.additionalReductionNeeded} dB | ${calculation.difficultyLevel}`;
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
      downloadFile(text, 'acoustic_soundproofing_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: AcousticCalculation) => {
    setLength(calc.length.toString());
    setWidth(calc.width.toString());
    setHeight(calc.height.toString());
    setNoiseSourceLevel(calc.noiseSourceLevel.toString());
    setDesiredNoiseLevel(calc.desiredNoiseLevel.toString());
    setWallType(calc.wallType);
    setInsulationMaterial(calc.insulationMaterial);
    setShowHistory(false);
  };

  const difficulty = calculation ? getDifficultyLevel(calculation.additionalReductionNeeded) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔇</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Acoustic Soundproofing Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate soundproofing requirements for any room. Estimate noise reduction, insulation materials, and acoustic performance instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Wall Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wall Type</label>
                <select
                  value={wallType}
                  onChange={(e) => setWallType(e.target.value as WallType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="basic">Basic Wall (~20 dB)</option>
                  <option value="drywall">Drywall (~30 dB)</option>
                  <option value="concrete">Concrete (~50 dB)</option>
                  <option value="glass">Glass Partition (~15 dB)</option>
                </select>
              </div>

              {/* Insulation Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insulation Material</label>
                <select
                  value={insulationMaterial}
                  onChange={(e) => setInsulationMaterial(e.target.value as InsulationMaterial)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="none">None (0 dB)</option>
                  <option value="foam">Foam Panels (+5 dB)</option>
                  <option value="fiberglass">Fiberglass (+8 dB)</option>
                  <option value="mineralwool">Mineral Wool (+10 dB)</option>
                  <option value="mlv">Mass-Loaded Vinyl (+12 dB)</option>
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
            {calculation && (
              <div className={`rounded-xl border shadow-lg p-6 text-white space-y-4 ${
                difficulty?.color === 'green' ? 'bg-green-600 border-green-700' :
                difficulty?.color === 'blue' ? 'bg-blue-600 border-blue-700' :
                difficulty?.color === 'yellow' ? 'bg-yellow-600 border-yellow-700' :
                difficulty?.color === 'orange' ? 'bg-orange-600 border-orange-700' :
                'bg-red-600 border-red-700'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Required Reduction
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.requiredReduction}
                  </div>
                  <div className="text-xl text-white/90">
                    dB
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Wall Provides:</span>
                    <span className="font-semibold">{calculation.baseWallTransmissionLoss} dB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Insulation Bonus:</span>
                    <span className="font-semibold">{calculation.materialBonus} dB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Total Reduction:</span>
                    <span className="font-semibold">{calculation.totalReduction} dB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Additional Needed:</span>
                    <span className="font-semibold">{calculation.additionalReductionNeeded} dB</span>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <div className="text-xs text-white/80 mb-1">Difficulty:</div>
                    <div className="font-semibold text-sm">{difficulty?.level} - {difficulty?.description}</div>
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
                    Length (m)
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="4"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (m)
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
                    Height (m)
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
                    <div className="text-sm font-semibold text-blue-900">{formatNumber(calculation.roomVolume)} m³</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-xs text-blue-600 mb-1">Surface Area</div>
                    <div className="text-sm font-semibold text-blue-900">{formatNumber(calculation.roomSurfaceArea)} m²</div>
                  </div>
                </div>
              )}
            </div>

            {/* Noise Levels */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Noise Levels
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Noise Source Level (dB)
                  </label>
                  <input
                    type="number"
                    value={noiseSourceLevel}
                    onChange={(e) => setNoiseSourceLevel(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="70"
                    min="0"
                    max="140"
                    step="1"
                  />
                  <div className="mt-2">
                    <select
                      onChange={(e) => setNoiseSourceLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="">Quick Select...</option>
                      {noiseSourcePresets.map((preset, idx) => (
                        <option key={idx} value={preset.level}>
                          {preset.name} ({preset.level} dB)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Noise Level (dB)
                  </label>
                  <input
                    type="number"
                    value={desiredNoiseLevel}
                    onChange={(e) => setDesiredNoiseLevel(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="40"
                    min="0"
                    max="140"
                    step="1"
                  />
                  <div className="mt-2">
                    <select
                      onChange={(e) => setDesiredNoiseLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="">Quick Select...</option>
                      {desiredLevelPresets.map((preset, idx) => (
                        <option key={idx} value={preset.level}>
                          {preset.name} ({preset.level} dB)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Visual dB Meter */}
              {calculation && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Source: {calculation.noiseSourceLevel} dB</span>
                    <span>Achieved: {calculation.achievedNoiseLevel} dB</span>
                    <span>Target: {calculation.desiredNoiseLevel} dB</span>
                  </div>
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-red-500 transition-all duration-300"
                      style={{ width: `${(calculation.noiseSourceLevel / 140) * 100}%` }}
                    />
                    <div 
                      className="absolute h-full bg-yellow-500 transition-all duration-300"
                      style={{ width: `${(calculation.achievedNoiseLevel / 140) * 100}%` }}
                    />
                    <div 
                      className="absolute h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${(calculation.desiredNoiseLevel / 140) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Recommendations
                </h3>
                
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {calculation.recommendation}
                  </p>
                </div>

                {calculation.additionalReductionNeeded > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-800">
                      <strong>Note:</strong> You need an additional {calculation.additionalReductionNeeded} dB reduction to reach your target noise level.
                    </p>
                  </div>
                )}

                {calculation.additionalReductionNeeded === 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-800">
                      <strong>Success:</strong> Your current setup meets the soundproofing requirements!
                    </p>
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
                    onClick={() => handleApplyRoomPreset(preset)}
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
                            {entry.calculation.requiredReduction} dB Required
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.roomVolume)} m³ | {entry.calculation.difficultyLevel}
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

      <AcousticSoundproofingCalculatorSEO />
      <RelatedTools
        currentTool="acoustic-soundproofing-calculator"
        tools={['heat-loss-calculator-building', 'insulation-thickness-calculator', 'ventilation-calculator']}
      />
    </>
  );
}
