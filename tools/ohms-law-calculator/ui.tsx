"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  VoltageUnit, 
  CurrentUnit, 
  ResistanceUnit, 
  OhmsValues, 
  OhmsHistoryEntry,
  calculateOhmsLaw,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const VOLTAGE_UNITS: { label: string; value: VoltageUnit }[] = [
  { label: 'Volts (V)', value: 'V' },
  { label: 'Millivolts (mV)', value: 'mV' },
  { label: 'Kilovolts (kV)', value: 'kV' },
];

const CURRENT_UNITS: { label: string; value: CurrentUnit }[] = [
  { label: 'Amperes (A)', value: 'A' },
  { label: 'Milliamperes (mA)', value: 'mA' },
  { label: 'Microamperes (uA)', value: 'uA' },
];

const RESISTANCE_UNITS: { label: string; value: ResistanceUnit }[] = [
  { label: 'Ohms (Ω)', value: 'Ω' },
  { label: 'Kiloohms (kΩ)', value: 'kΩ' },
  { label: 'Megaohms (MΩ)', value: 'MΩ' },
];

export default function OhmsLawCalculatorUI() {
  const [values, setValues] = useState<OhmsValues>({
    voltage: "",
    voltageUnit: "V",
    current: "",
    currentUnit: "A",
    resistance: "",
    resistanceUnit: "Ω"
  });
  
  const [history, setHistory] = useState<OhmsHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const handleChange = (field: keyof OhmsValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setValues(prev => ({
      ...prev,
      voltage: "",
      current: "",
      resistance: ""
    }));
  };

  const { result, error } = calculateOhmsLaw(values);

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.type} = ${result.formattedValue} ${result.unit}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!result) return;
    
    const entry: OhmsHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      inputs: {
        voltage: values.voltage.trim() ? { value: values.voltage, unit: values.voltageUnit } : null,
        current: values.current.trim() ? { value: values.current, unit: values.currentUnit } : null,
        resistance: values.resistance.trim() ? { value: values.resistance, unit: values.resistanceUnit } : null,
      },
      result: result
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [values, result]);
  
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDeleteHistoryEntry = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  // Keyboard shortcut for quick clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Ohm's Law Calculator</h2>
          <p className="text-gray-500 text-sm mt-1">Enter any two values securely to calculate the third automatically.</p>
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
          
          {/* Voltage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Voltage (V)</label>
            <div className="flex bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden">
              <input
                type="number"
                value={values.voltage}
                onChange={(e) => handleChange("voltage", e.target.value)}
                className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800 text-lg font-medium"
                placeholder={result?.type === 'Voltage' ? '?' : 'e.g. 12'}
                disabled={result?.type === 'Voltage'}
              />
              <select
                value={values.voltageUnit}
                onChange={(e) => handleChange("voltageUnit", e.target.value)}
                className="bg-transparent border-l border-gray-200 px-3 py-3 focus:outline-none text-gray-600 font-medium"
              >
                {VOLTAGE_UNITS.map(u => (
                  <option key={u.value} value={u.value}>{u.value}</option>
                ))}
              </select>
            </div>
            {result?.type === 'Voltage' && (
              <p className="text-xs font-semibold text-primary uppercase pt-1">Target to Calculate</p>
            )}
          </div>

          {/* Current */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Current (I)</label>
            <div className="flex bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden">
              <input
                type="number"
                value={values.current}
                onChange={(e) => handleChange("current", e.target.value)}
                className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800 text-lg font-medium"
                placeholder={result?.type === 'Current' ? '?' : 'e.g. 2'}
                disabled={result?.type === 'Current'}
              />
              <select
                value={values.currentUnit}
                onChange={(e) => handleChange("currentUnit", e.target.value)}
                className="bg-transparent border-l border-gray-200 px-3 py-3 focus:outline-none text-gray-600 font-medium"
              >
                {CURRENT_UNITS.map(u => (
                  <option key={u.value} value={u.value}>{u.value}</option>
                ))}
              </select>
            </div>
            {result?.type === 'Current' && (
              <p className="text-xs font-semibold text-primary uppercase pt-1">Target to Calculate</p>
            )}
          </div>

          {/* Resistance */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Resistance (R)</label>
            <div className="flex bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden">
              <input
                type="number"
                value={values.resistance}
                onChange={(e) => handleChange("resistance", e.target.value)}
                className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800 text-lg font-medium"
                placeholder={result?.type === 'Resistance' ? '?' : 'e.g. 10'}
                disabled={result?.type === 'Resistance'}
              />
              <select
                value={values.resistanceUnit}
                onChange={(e) => handleChange("resistanceUnit", e.target.value)}
                className="bg-transparent border-l border-gray-200 px-3 py-3 focus:outline-none text-gray-600 font-medium"
              >
                {RESISTANCE_UNITS.map(u => (
                  <option key={u.value} value={u.value}>{u.value}</option>
                ))}
              </select>
            </div>
            {result?.type === 'Resistance' && (
              <p className="text-xs font-semibold text-primary uppercase pt-1">Target to Calculate</p>
            )}
          </div>
          
        </div>

        {/* Results / Error Section */}
        {error ? (
          <div className="mb-8 p-6 text-center bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center justify-center gap-2 font-medium">
             ⚠️ {error}
          </div>
        ) : result ? (
          <div className="mb-8 p-8 flex flex-col items-center justify-center bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
            <div className="uppercase tracking-widest text-emerald-600 text-xs font-bold mb-2 z-10">Calculated {result.type}</div>
            <div className="text-5xl font-black z-10" style={{ fontFamily: "var(--font-heading)" }}>
              {result.formattedValue} <span className="text-emerald-700">{result.unit}</span>
            </div>
            {/* Background design */}
            <div className="absolute -right-8 -bottom-8 text-9xl text-emerald-500 opacity-5 select-none font-bold">
               {result.type === 'Voltage' ? 'V' : result.type === 'Current' ? 'A' : 'Ω'}
            </div>
          </div>
        ) : (
          <div className="mb-8 p-8 text-center bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <p className="text-gray-500">Fill exactly two fields to calculate the third automatically.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSaveToHistory}
            disabled={!result}
            className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <span>💾</span> Save to History
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!result}
            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <span>{copied ? "✅" : "📋"}</span>
            {copied ? "Copied" : "Copy Result"}
          </button>

          <button
            onClick={handleClear}
            disabled={!values.voltage && !values.current && !values.resistance}
            className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 text-gray-600 font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <span>🗑️</span> Clear All
          </button>
        </div>
      </div>

      {/* History Section */}
      {isClient && history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🕒</span> Recent Calculations
            </h3>
            <button
              onClick={handleClearHistory}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-transparent hover:border-gray-200 transition-colors gap-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center flex-1">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 text-lg whitespace-nowrap bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                    {entry.result.formattedValue} {entry.result.unit}
                    <span className="text-emerald-800 text-xs ml-1 uppercase">{entry.result.type}</span>
                  </div>
                  <span className="text-gray-300">from</span>
                  
                  <div className="flex flex-wrap gap-3 text-sm max-w-2xl text-gray-600">
                    {entry.inputs.voltage && (
                      <span className="font-medium bg-white px-2 py-1 rounded-md border border-gray-200">{entry.inputs.voltage.value} {entry.inputs.voltage.unit} (<span className="text-gray-400">V</span>)</span>
                    )}
                    {entry.inputs.current && (
                      <span className="font-medium bg-white px-2 py-1 rounded-md border border-gray-200">{entry.inputs.current.value} {entry.inputs.current.unit} (<span className="text-gray-400">I</span>)</span>
                    )}
                    {entry.inputs.resistance && (
                      <span className="font-medium bg-white px-2 py-1 rounded-md border border-gray-200">{entry.inputs.resistance.value} {entry.inputs.resistance.unit} (<span className="text-gray-400">R</span>)</span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleDeleteHistoryEntry(entry.id)}
                  className="sm:opacity-0 sm:group-hover:opacity-100 self-end sm:self-center p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all border border-gray-200"
                  aria-label="Delete history entry"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools currentTool="ohms-law-calculator" tools={["temperature-conversion-scientific", "unit-ratio-calculator", "scientific-calculator-tool"]} />
    </div>
  );
}
