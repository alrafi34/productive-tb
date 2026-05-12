"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalculationMode,
  CalculationInput,
  CalculationResult,
  InductanceUnit,
  FrequencyUnit,
  LengthUnit,
  AreaUnit,
  PermeabilityType,
} from "./types";
import {
  performCalculation,
  validateInput,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getModeLabel,
  debounce,
  EXAMPLE_PRESETS,
} from "./logic";
import InductorCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function InductorCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("inductance-solenoid");
  
  // Solenoid inputs
  const [turns, setTurns] = useState<string>("100");
  const [length, setLength] = useState<string>("10");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("cm");
  const [area, setArea] = useState<string>("1");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("cm²");
  const [permeabilityType, setPermeabilityType] = useState<PermeabilityType>("air");
  const [customPermeability, setCustomPermeability] = useState<string>("");
  
  // Air-core inputs
  const [radius, setRadius] = useState<string>("2");
  const [radiusUnit, setRadiusUnit] = useState<LengthUnit>("cm");
  
  // Reactance inputs
  const [inductance, setInductance] = useState<string>("10");
  const [inductanceUnit, setInductanceUnit] = useState<InductanceUnit>("µH");
  const [frequency, setFrequency] = useState<string>("1");
  const [frequencyUnit, setFrequencyUnit] = useState<FrequencyUnit>("MHz");
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [mode, turns, length, lengthUnit, area, areaUnit, permeabilityType, customPermeability, 
     radius, radiusUnit, inductance, inductanceUnit, frequency, frequencyUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, turns, length, lengthUnit, area, areaUnit, permeabilityType, customPermeability,
      radius, radiusUnit, inductance, inductanceUnit, frequency, frequencyUnit, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const input: CalculationInput = {
      mode,
      turns: parseFloat(turns) || 0,
      length: parseFloat(length) || 0,
      lengthUnit,
      area: parseFloat(area) || 0,
      areaUnit,
      permeabilityType,
      customPermeability: parseFloat(customPermeability) || undefined,
      radius: parseFloat(radius) || 0,
      radiusUnit,
      inductance: parseFloat(inductance) || 0,
      inductanceUnit,
      frequency: parseFloat(frequency) || 0,
      frequencyUnit,
    };

    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = performCalculation(input);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    setError(null);
    setResult(null);
  };

  const handleReset = () => {
    setTurns("100");
    setLength("10");
    setArea("1");
    setRadius("2");
    setInductance("10");
    setFrequency("1");
    setCustomPermeability("");
    setPermeabilityType("air");
    setResult(null);
    setError(null);
  };

  const handleLoadExample = () => {
    const preset = EXAMPLE_PRESETS[mode];
    if (preset) {
      if ('turns' in preset) setTurns(preset.turns.toString());
      if ('length' in preset) {
        setLength(preset.length.toString());
        setLengthUnit(preset.lengthUnit);
      }
      if ('area' in preset) {
        setArea(preset.area.toString());
        setAreaUnit(preset.areaUnit);
      }
      if ('permeabilityType' in preset) setPermeabilityType(preset.permeabilityType);
      if ('radius' in preset) {
        setRadius(preset.radius.toString());
        setRadiusUnit(preset.radiusUnit);
      }
      if ('inductance' in preset) {
        setInductance(preset.inductance.toString());
        setInductanceUnit(preset.inductanceUnit);
      }
      if ('frequency' in preset) {
        setFrequency(preset.frequency.toString());
        setFrequencyUnit(preset.frequencyUnit);
      }
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `${formatNumber(result.value)} ${result.unit}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const input: CalculationInput = {
        mode,
        turns: parseFloat(turns),
        length: parseFloat(length),
        lengthUnit,
        area: parseFloat(area),
        areaUnit,
        permeabilityType,
        customPermeability: parseFloat(customPermeability) || undefined,
        radius: parseFloat(radius),
        radiusUnit,
        inductance: parseFloat(inductance),
        inductanceUnit,
        frequency: parseFloat(frequency),
        frequencyUnit,
      };
      saveToHistory(mode, input, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const input: CalculationInput = {
        mode,
        turns: parseFloat(turns),
        length: parseFloat(length),
        lengthUnit,
        area: parseFloat(area),
        areaUnit,
        permeabilityType,
        customPermeability: parseFloat(customPermeability) || undefined,
        radius: parseFloat(radius),
        radiusUnit,
        inductance: parseFloat(inductance),
        inductanceUnit,
        frequency: parseFloat(frequency),
        frequencyUnit,
      };
      const text = exportToText(mode, input, result);
      downloadFile(text, 'inductor_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setMode(entry.mode);
    if (entry.input.turns) setTurns(entry.input.turns.toString());
    if (entry.input.length) {
      setLength(entry.input.length.toString());
      setLengthUnit(entry.input.lengthUnit);
    }
    if (entry.input.area) {
      setArea(entry.input.area.toString());
      setAreaUnit(entry.input.areaUnit);
    }
    if (entry.input.permeabilityType) setPermeabilityType(entry.input.permeabilityType);
    if (entry.input.customPermeability) setCustomPermeability(entry.input.customPermeability.toString());
    if (entry.input.radius) {
      setRadius(entry.input.radius.toString());
      setRadiusUnit(entry.input.radiusUnit);
    }
    if (entry.input.inductance) {
      setInductance(entry.input.inductance.toString());
      setInductanceUnit(entry.input.inductanceUnit);
    }
    if (entry.input.frequency) {
      setFrequency(entry.input.frequency.toString());
      setFrequencyUnit(entry.input.frequencyUnit);
    }
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧲</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Inductor Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate inductance for solenoids, air-core coils, and inductive reactance with instant results and step-by-step explanations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</h3>
              
              <select
                value={mode}
                onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
              >
                <option value="inductance-solenoid">Inductance (Solenoid)</option>
                <option value="inductance-air-core">Inductance (Air-Core Coil)</option>
                <option value="reactance">Inductive Reactance</option>
              </select>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleLoadExample}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  📝 Load Example
                </button>
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
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Result
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.value, 4)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.unit}
                  </div>
                </div>

                {result.conversions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="text-primary-100 mb-2">Conversions:</div>
                    <div className="space-y-1">
                      {result.conversions.map((conv, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-primary-100">{conv.unit}:</span>
                          <span className="font-semibold">{conv.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                Input Values
              </h3>
              
              <div className="space-y-4">
                {mode === "inductance-solenoid" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Turns (N)
                      </label>
                      <input
                        type="number"
                        value={turns}
                        onChange={(e) => setTurns(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="100"
                        step="1"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coil Length (l)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="10"
                          step="any"
                        />
                        <select
                          value={lengthUnit}
                          onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        >
                          <option value="m">m (Meter)</option>
                          <option value="cm">cm (Centimeter)</option>
                          <option value="mm">mm (Millimeter)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cross-sectional Area (A)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="1"
                          step="any"
                        />
                        <select
                          value={areaUnit}
                          onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        >
                          <option value="m²">m² (Square meter)</option>
                          <option value="cm²">cm² (Square centimeter)</option>
                          <option value="mm²">mm² (Square millimeter)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Core Permeability (μ)
                      </label>
                      <select
                        value={permeabilityType}
                        onChange={(e) => setPermeabilityType(e.target.value as PermeabilityType)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        <option value="air">Air (μ₀ = 4π × 10⁻⁷ H/m)</option>
                        <option value="iron">Iron Core (μ ≈ 200μ₀)</option>
                        <option value="custom">Custom Value</option>
                      </select>
                      {permeabilityType === "custom" && (
                        <input
                          type="number"
                          value={customPermeability}
                          onChange={(e) => setCustomPermeability(e.target.value)}
                          className="w-full mt-3 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="Enter permeability (H/m)"
                          step="any"
                        />
                      )}
                    </div>
                  </>
                )}

                {mode === "inductance-air-core" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Turns (N)
                      </label>
                      <input
                        type="number"
                        value={turns}
                        onChange={(e) => setTurns(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="100"
                        step="1"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coil Radius (r)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={radius}
                          onChange={(e) => setRadius(e.target.value)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="2"
                          step="any"
                        />
                        <select
                          value={radiusUnit}
                          onChange={(e) => setRadiusUnit(e.target.value as LengthUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        >
                          <option value="m">m (Meter)</option>
                          <option value="cm">cm (Centimeter)</option>
                          <option value="mm">mm (Millimeter)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coil Length (l)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="10"
                          step="any"
                        />
                        <select
                          value={lengthUnit}
                          onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        >
                          <option value="m">m (Meter)</option>
                          <option value="cm">cm (Centimeter)</option>
                          <option value="mm">mm (Millimeter)</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {mode === "reactance" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inductance (L)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={inductance}
                          onChange={(e) => setInductance(e.target.value)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="10"
                          step="any"
                        />
                        <select
                          value={inductanceUnit}
                          onChange={(e) => setInductanceUnit(e.target.value as InductanceUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        >
                          <option value="H">H (Henry)</option>
                          <option value="mH">mH (Millihenry)</option>
                          <option value="µH">µH (Microhenry)</option>
                          <option value="nH">nH (Nanohenry)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frequency (f)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="1"
                          step="any"
                        />
                        <select
                          value={frequencyUnit}
                          onChange={(e) => setFrequencyUnit(e.target.value as FrequencyUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        >
                          <option value="Hz">Hz (Hertz)</option>
                          <option value="kHz">kHz (Kilohertz)</option>
                          <option value="MHz">MHz (Megahertz)</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
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

            {/* Formula Display */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Formula & Steps
                </h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-center text-lg font-mono font-semibold text-blue-900">
                    {result.formula}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Calculation Steps:</p>
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="font-semibold text-primary">{idx + 1}.</span>
                      <span className="font-mono">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export Button */}
            {result && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Calculation
              </button>
            )}

            {/* Info Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This calculator uses standard inductor formulas for ideal conditions. 
                Actual inductance may vary due to core material properties, winding techniques, 
                temperature effects, and other real-world factors.
              </p>
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
                            {getModeLabel(entry.mode)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Result: {formatNumber(entry.result.value, 4)} {entry.result.unit}
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

      <InductorCalculatorSEO />
      <RelatedTools
        currentTool="inductor-calculator"
        tools={['capacitor-calculator', 'capacitive-reactance-calculator', 'ohms-law-calculator']}
      />
    </>
  );
}
