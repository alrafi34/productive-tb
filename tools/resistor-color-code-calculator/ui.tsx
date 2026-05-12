"use client";

import { useState, useEffect, useCallback } from "react";
import { BandCount, ColorBand, ResistorBands, ResistorResult, HistoryEntry } from "./types";
import {
  calculateResistance,
  saveToHistory,
  getHistory,
  clearHistory,
  deleteHistoryEntry,
  exportToText,
  downloadFile,
  COLOR_MAP,
  DIGIT_COLORS,
  MULTIPLIER_COLORS,
  TOLERANCE_COLORS,
  TEMP_COEFF_COLORS,
  EXAMPLE_PRESETS,
  debounce
} from "./logic";
import ResistorColorCodeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ResistorColorCodeCalculatorUI() {
  const [bands, setBands] = useState<ResistorBands>({
    bandCount: 4,
    band1: 'brown',
    band2: 'black',
    band3: 'black',
    multiplier: 'red',
    tolerance: 'gold'
  });
  
  const [result, setResult] = useState<ResistorResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      try {
        const calcResult = calculateResistance(bands);
        setResult(calcResult);
      } catch (err) {
        console.error('Calculation error:', err);
      }
    }, 100),
    [bands]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [bands, debouncedCalculate]);

  const handleBandCountChange = (count: BandCount) => {
    setBands(prev => ({
      ...prev,
      bandCount: count,
      tempCoeff: count === 6 ? 'brown' : undefined
    }));
  };

  const handleBandChange = (field: keyof ResistorBands, value: ColorBand) => {
    setBands(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setBands({
      bandCount: 4,
      band1: 'brown',
      band2: 'black',
      band3: 'black',
      multiplier: 'red',
      tolerance: 'gold'
    });
  };

  const handleLoadPreset = (preset: typeof EXAMPLE_PRESETS[0]) => {
    setBands(preset.bands);
  };

  const handleCopy = () => {
    if (result) {
      const text = `${result.resistanceFormatted} ${result.tolerance}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory({ bands, result });
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(bands, result);
      downloadFile(text, 'resistor_color_code.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleDeleteHistoryEntry = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setBands(entry.bands);
    setShowHistory(false);
  };

  const ColorSelector = ({ 
    label, 
    value, 
    colors, 
    onChange 
  }: { 
    label: string; 
    value: ColorBand; 
    colors: ColorBand[]; 
    onChange: (color: ColorBand) => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ColorBand)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
        style={{
          background: `linear-gradient(to right, ${COLOR_MAP[value].hex} 20px, white 20px)`
        }}
      >
        {colors.map(color => (
          <option key={color} value={color}>
            {COLOR_MAP[color].name}
            {COLOR_MAP[color].digit !== undefined && ` (${COLOR_MAP[color].digit})`}
            {COLOR_MAP[color].multiplier !== undefined && label.includes('Multiplier') && ` (×${COLOR_MAP[color].multiplier})`}
            {COLOR_MAP[color].tolerance !== undefined && label.includes('Tolerance') && ` (±${COLOR_MAP[color].tolerance}%)`}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Resistor Color Code Calculator</h3>
              <p className="text-sm text-blue-800">
                Decode resistor color bands into resistance values and tolerance. Supports 4, 5, and 6 band resistors.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Result Display */}
            {result && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Resistance Value
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {result.resistanceFormatted}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.tolerance}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Min Value:</span>
                    <span className="font-semibold">{result.minValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Max Value:</span>
                    <span className="font-semibold">{result.maxValue}</span>
                  </div>
                  {result.tempCoeff && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Temp Coeff:</span>
                      <span className="font-semibold">{result.tempCoeff}</span>
                    </div>
                  )}
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
                  🔄 Reset
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
            
            {/* Band Count Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Resistor Type
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {([4, 5, 6] as BandCount[]).map(count => (
                  <button
                    key={count}
                    onClick={() => handleBandCountChange(count)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      bands.bandCount === count
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {count} Band
                  </button>
                ))}
              </div>
            </div>

            {/* Band Selectors */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Color Bands
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorSelector
                  label="Band 1 (First Digit)"
                  value={bands.band1}
                  colors={DIGIT_COLORS}
                  onChange={(color) => handleBandChange('band1', color)}
                />
                
                <ColorSelector
                  label="Band 2 (Second Digit)"
                  value={bands.band2}
                  colors={DIGIT_COLORS}
                  onChange={(color) => handleBandChange('band2', color)}
                />
                
                {bands.bandCount >= 5 && (
                  <ColorSelector
                    label="Band 3 (Third Digit)"
                    value={bands.band3}
                    colors={DIGIT_COLORS}
                    onChange={(color) => handleBandChange('band3', color)}
                  />
                )}
                
                <ColorSelector
                  label="Multiplier Band"
                  value={bands.multiplier}
                  colors={MULTIPLIER_COLORS}
                  onChange={(color) => handleBandChange('multiplier', color)}
                />
                
                <ColorSelector
                  label="Tolerance Band"
                  value={bands.tolerance}
                  colors={TOLERANCE_COLORS}
                  onChange={(color) => handleBandChange('tolerance', color)}
                />
                
                {bands.bandCount === 6 && (
                  <ColorSelector
                    label="Temperature Coefficient"
                    value={bands.tempCoeff || 'brown'}
                    colors={TEMP_COEFF_COLORS}
                    onChange={(color) => handleBandChange('tempCoeff', color)}
                  />
                )}
              </div>
            </div>

            {/* Visual Resistor */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Visual Preview
              </h3>
              
              <div className="flex items-center justify-center py-8">
                <div className="relative w-full max-w-md h-20 bg-gradient-to-r from-gray-300 via-amber-100 to-gray-300 rounded-full flex items-center justify-center shadow-md">
                  {/* Resistor body */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 px-12">
                    <div className="w-6 h-16 rounded-sm shadow-sm" style={{ backgroundColor: COLOR_MAP[bands.band1].hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    <div className="w-6 h-16 rounded-sm shadow-sm" style={{ backgroundColor: COLOR_MAP[bands.band2].hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    {bands.bandCount >= 5 && (
                      <div className="w-6 h-16 rounded-sm shadow-sm" style={{ backgroundColor: COLOR_MAP[bands.band3].hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    )}
                    <div className="w-6 h-16 rounded-sm shadow-sm" style={{ backgroundColor: COLOR_MAP[bands.multiplier].hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    <div className="flex-1" />
                    <div className="w-6 h-16 rounded-sm shadow-sm" style={{ backgroundColor: COLOR_MAP[bands.tolerance].hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    {bands.bandCount === 6 && bands.tempCoeff && (
                      <div className="w-6 h-16 rounded-sm shadow-sm" style={{ backgroundColor: COLOR_MAP[bands.tempCoeff].hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    )}
                  </div>
                  {/* Leads */}
                  <div className="absolute left-0 w-12 h-1 bg-gray-400 -translate-x-full top-1/2 -translate-y-1/2" />
                  <div className="absolute right-0 w-12 h-1 bg-gray-400 translate-x-full top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Values
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAMPLE_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleLoadPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <p className="text-center text-sm font-mono font-semibold text-blue-900">
                    {result.formula}
                  </p>
                </div>

                <div className="space-y-2">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="font-semibold text-primary min-w-[20px]">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && isClient && (
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
                        className="p-4 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <button
                            onClick={() => loadFromHistory(entry)}
                            className="font-semibold text-gray-900 hover:text-primary text-left flex-1"
                          >
                            {entry.result.resistanceFormatted} {entry.result.tolerance}
                          </button>
                          <button
                            onClick={() => handleDeleteHistoryEntry(entry.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all border border-gray-200"
                            aria-label="Delete history entry"
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.bands.bandCount}-band • {new Date(entry.timestamp).toLocaleString()}
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

      <ResistorColorCodeCalculatorSEO />
      <RelatedTools
        currentTool="resistor-color-code-calculator"
        tools={['ohms-law-calculator', 'parallel-resistor-calculator', 'voltage-divider-calculator']}
      />
    </>
  );
}
