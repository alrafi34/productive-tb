"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  PowerDensityInputs, 
  PowerDensityResult, 
  PowerUnit, 
  AreaUnit, 
  HistoryEntry 
} from "./types";
import {
  calculatePowerDensity,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import PowerDensityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const POWER_UNITS: { label: string; value: PowerUnit }[] = [
  { label: 'W (Watts)', value: 'W' },
  { label: 'kW (Kilowatts)', value: 'kW' },
  { label: 'MW (Megawatts)', value: 'MW' },
];

const AREA_UNITS: { label: string; value: AreaUnit }[] = [
  { label: 'm² (Square meters)', value: 'm²' },
  { label: 'cm² (Square centimeters)', value: 'cm²' },
  { label: 'mm² (Square millimeters)', value: 'mm²' },
];

export default function PowerDensityCalculatorUI() {
  const [inputs, setInputs] = useState<PowerDensityInputs>({
    power: 100,
    area: 2,
    powerUnit: 'W',
    areaUnit: 'm²',
    precision: 2
  });
  
  const [result, setResult] = useState<PowerDensityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const presets = getPresets();

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

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
        const calculatedResult = calculatePowerDensity(inputs);
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

  const handleInputChange = (field: keyof PowerDensityInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      power: 100,
      area: 2,
      powerUnit: 'W',
      areaUnit: 'm²',
      precision: 2
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs(prev => ({
      ...prev,
      power: preset.power,
      area: preset.area,
      powerUnit: preset.powerUnit,
      areaUnit: preset.areaUnit
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Power Density: ${result.formattedResult}`;
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
      downloadFile(text, 'power_density_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getDensityLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-blue-600';
      case 'high': return 'text-orange-600';
      case 'very-high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDensityLevelBg = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'moderate': return 'bg-blue-50 border-blue-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'very-high': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Power Density Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate power density (W/m²) from power and area inputs. Get instant results with density analysis and safety recommendations.
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
                    Power Density
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {result.formattedResult.split(' ')[0]}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.formattedResult.split(' ')[1]}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Density Level:</span>
                    <span className="font-semibold capitalize">{result.densityLevel.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power:</span>
                    <span className="font-semibold">{formatNumber(result.power, inputs.precision)} {result.powerUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area:</span>
                    <span className="font-semibold">{formatNumber(result.area, inputs.precision)} {result.areaUnit}</span>
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
                Input Parameters
              </h3>
              
              {/* Power Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.power}
                    onChange={(e) => handleInputChange('power', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="0.1"
                  />
                  <select
                    value={inputs.powerUnit}
                    onChange={(e) => handleInputChange('powerUnit', e.target.value as PowerUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    {POWER_UNITS.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total electrical power</p>
              </div>

              {/* Area Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.area}
                    onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.01"
                  />
                  <select
                    value={inputs.areaUnit}
                    onChange={(e) => handleInputChange('areaUnit', e.target.value as AreaUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    {AREA_UNITS.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">Surface area over which power is distributed</p>
              </div>

              {/* Precision */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimal Precision
                </label>
                <select
                  value={inputs.precision}
                  onChange={(e) => handleInputChange('precision', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="1">1 decimal place</option>
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                </select>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Power Density = Power / Area
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

            {/* Warning Display */}
            {result && result.warning && !error && (
              <div className={`rounded-xl border p-4 ${getDensityLevelBg(result.densityLevel)}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span className={`font-medium ${getDensityLevelColor(result.densityLevel)}`}>{result.warning}</span>
                </div>
              </div>
            )}

            {/* Density Level Indicator */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Density Analysis
                </h3>
                
                <div className="space-y-4">
                  {/* Density Level Bar */}
                  <div className="relative">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Low</span>
                      <span>Moderate</span>
                      <span>High</span>
                      <span>Very High</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${
                          result.densityLevel === 'low' ? 'bg-green-500' :
                          result.densityLevel === 'moderate' ? 'bg-blue-500' :
                          result.densityLevel === 'high' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${
                            result.densityLevel === 'low' ? '25%' :
                            result.densityLevel === 'moderate' ? '50%' :
                            result.densityLevel === 'high' ? '75%' : '100%'
                          }` 
                        }}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <span className={`font-semibold ${getDensityLevelColor(result.densityLevel)}`}>
                        {result.densityLevel.replace('-', ' ').toUpperCase()} DENSITY
                      </span>
                    </div>
                  </div>

                  {/* Density Levels Guide */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                      <div className="font-semibold text-green-600">Low</div>
                      <div className="text-green-700">&lt;10 W/m²</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="font-semibold text-blue-600">Moderate</div>
                      <div className="text-blue-700">10-100 W/m²</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded border border-orange-200">
                      <div className="font-semibold text-orange-600">High</div>
                      <div className="text-orange-700">100-1000 W/m²</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                      <div className="font-semibold text-red-600">Very High</div>
                      <div className="text-red-700">&gt;1000 W/m²</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Applications
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
                      {preset.power}{preset.powerUnit} / {preset.area}{preset.areaUnit}
                    </div>
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

            {/* Applications Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">💡 Applications & Safety</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>• <strong>Electronics:</strong> Component thermal design and heat sink sizing</p>
                <p>• <strong>Solar Panels:</strong> Efficiency analysis and installation planning</p>
                <p>• <strong>Heating Systems:</strong> Surface temperature and safety calculations</p>
                <p>• <strong>LED Lighting:</strong> Heat dissipation and fixture design</p>
                <p>• <strong>High densities (&gt;1000 W/m²):</strong> Require active cooling and safety measures</p>
              </div>
            </div>

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
                            {entry.result.formattedResult}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.power}{entry.inputs.powerUnit} / {entry.inputs.area}{entry.inputs.areaUnit} • {entry.result.densityLevel}
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

      <PowerDensityCalculatorSEO />
      <RelatedTools
        currentTool="power-density-calculator"
        tools={['power-calculator-electrical', 'electrical-efficiency-calculator', 'power-loss-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}