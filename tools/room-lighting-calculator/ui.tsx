"use client";

import { useState, useEffect, useCallback } from "react";
import { LightingInputs, LightingResult, Unit, RoomType } from "./types";
import {
  calculateLighting,
  validateInputs,
  ROOM_TYPES,
  getCommonBulbTypes,
  getPresetRooms,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import RoomLightingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RoomLightingCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<LightingInputs>({
    width: savedSettings.width || 12,
    length: savedSettings.length || 10,
    unit: (savedSettings.unit as Unit) || 'feet',
    roomType: (savedSettings.roomType as RoomType) || 'bedroom',
    lumensPerLight: savedSettings.lumensPerLight || 800,
    customLux: savedSettings.customLux,
    ceilingHeight: savedSettings.ceilingHeight
  });
  
  const [result, setResult] = useState<LightingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBulbTypes, setShowBulbTypes] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const bulbTypes = getCommonBulbTypes();
  const presetRooms = getPresetRooms();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = calculateLighting(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof LightingInputs, value: number | Unit | RoomType) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      width: 12,
      length: 10,
      unit: 'feet',
      roomType: 'bedroom',
      lumensPerLight: 800,
      customLux: undefined,
      ceilingHeight: undefined
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presetRooms[0]) => {
    setInputs({
      width: preset.width,
      length: preset.length,
      unit: preset.unit,
      roomType: preset.roomType,
      lumensPerLight: preset.lumensPerLight,
      customLux: undefined,
      ceilingHeight: undefined
    });
  };

  const handleApplyBulbType = (lumens: number) => {
    setInputs(prev => ({ ...prev, lumensPerLight: lumens }));
    setShowBulbTypes(false);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Room: ${inputs.width}×${inputs.length}${inputs.unit} | Lights Needed: ${result.lightsNeeded} | Lux: ${formatNumber(result.luxAchieved)}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(inputs, result);
      downloadFile(text, 'room_lighting_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600';
      case 'under': return 'text-yellow-600';
      case 'over': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-50 border-green-200';
      case 'under': return 'bg-yellow-50 border-yellow-200';
      case 'over': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Room Lighting Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the optimal number of lights needed for any room based on size, purpose, and lighting standards. Get instant recommendations using lux levels.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Result Display */}
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Lights Needed
                  </p>
                  <div className="text-6xl font-bold mb-1">
                    {result.lightsNeeded}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.lightsNeeded === 1 ? 'Light' : 'Lights'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Room Area:</span>
                    <span className="font-semibold">{formatNumber(result.area)} {inputs.unit}²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Required Lux:</span>
                    <span className="font-semibold">{result.luxLevel} lux</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Achieved Lux:</span>
                    <span className="font-semibold">{formatNumber(result.luxAchieved)} lux</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Lumens:</span>
                    <span className="font-semibold">{result.actualLumens} lm</span>
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

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setShowBulbTypes(!showBulbTypes)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  💡 {showBulbTypes ? 'Hide' : 'Show'} Bulb Types
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                {result && (
                  <button
                    onClick={handleExportText}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export Report
                  </button>
                )}
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
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width
                  </label>
                  <input
                    type="number"
                    value={inputs.width}
                    onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <input
                    type="number"
                    value={inputs.length}
                    onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={inputs.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value as Unit)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="feet">Feet</option>
                    <option value="meters">Meters</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type
                </label>
                <select
                  value={inputs.roomType}
                  onChange={(e) => handleInputChange('roomType', e.target.value as RoomType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  {Object.entries(ROOM_TYPES).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.name} ({config.lux} lux)
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {ROOM_TYPES[inputs.roomType].description}
                </p>
              </div>

              {inputs.roomType === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Lux Level
                  </label>
                  <input
                    type="number"
                    value={inputs.customLux || ''}
                    onChange={(e) => handleInputChange('customLux', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="Enter lux value"
                    min="0"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lumens per Light
                </label>
                <input
                  type="number"
                  value={inputs.lumensPerLight}
                  onChange={(e) => handleInputChange('lumensPerLight', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="800"
                  min="0"
                  step="50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Check bulb packaging for lumen rating
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Lights = (Area × Lux) / Lumens per Light
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

            {/* Status Display */}
            {result && !error && (
              <div className={`border rounded-xl p-4 ${getStatusBgColor(result.status)}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {result.status === 'optimal' ? '✓' : '⚠️'}
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${getStatusColor(result.status)}`}>
                      {result.statusMessage}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {result.status === 'optimal' && 'Your lighting setup provides the recommended illumination level for this room type.'}
                      {result.status === 'under' && 'The calculated lights may not provide sufficient illumination. Consider adding more lights or using higher lumen bulbs.'}
                      {result.status === 'over' && 'The lighting may be excessive for this room type. You could use fewer lights or lower lumen bulbs to save energy.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bulb Types Panel */}
            {showBulbTypes && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Common Bulb Types
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bulbTypes.map((bulb, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplyBulbType(bulb.lumens)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{bulb.name}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {bulb.lumens} lumens • {bulb.wattage}W
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preset Rooms */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {presetRooms.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                  {result.steps.map((step, index) => (
                    <div key={index} className={step === '' ? 'h-2' : 'text-gray-700'}>
                      {step}
                    </div>
                  ))}
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
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {entry.result.lightsNeeded} {entry.result.lightsNeeded === 1 ? 'Light' : 'Lights'} • {ROOM_TYPES[entry.inputs.roomType].name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.width}×{entry.inputs.length} {entry.inputs.unit} • {entry.inputs.lumensPerLight}lm bulbs
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

      <RoomLightingCalculatorSEO />
      <RelatedTools
        currentTool="room-lighting-calculator"
        tools={['house-wiring-load-calculator', 'energy-consumption-calculator', 'voltage-drop-calculator']}
      />
    </>
  );
}
