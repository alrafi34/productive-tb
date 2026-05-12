"use client";

import { useState, useEffect, useCallback } from "react";
import { Resistor, ResistanceUnit, HistoryEntry } from "./types";
import {
  generateId,
  calculateParallelResistance,
  parseShorthand,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  debounce,
  RESISTANCE_MULTIPLIERS
} from "./logic";
import ParallelResistorCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const RESISTANCE_UNITS: { label: string; value: ResistanceUnit }[] = [
  { label: 'Ohms (Ω)', value: 'Ω' },
  { label: 'Kiloohms (kΩ)', value: 'kΩ' },
  { label: 'Megaohms (MΩ)', value: 'MΩ' },
];

export default function ParallelResistorCalculatorUI() {
  const [resistors, setResistors] = useState<Resistor[]>([
    { id: generateId(), value: "", unit: "Ω" },
    { id: generateId(), value: "", unit: "Ω" }
  ]);
  const [outputUnit, setOutputUnit] = useState<ResistanceUnit>("Ω");
  const [result, setResult] = useState<ReturnType<typeof calculateParallelResistance>>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      const calc = calculateParallelResistance(resistors, outputUnit);
      setResult(calc);
    }, 150),
    [resistors, outputUnit]
  );

  useEffect(() => {
    debouncedCalculate();
  }, [resistors, outputUnit, debouncedCalculate]);

  const handleAddResistor = () => {
    setResistors(prev => [...prev, { id: generateId(), value: "", unit: "Ω" }]);
  };

  const handleRemoveResistor = (id: string) => {
    if (resistors.length <= 1) return;
    setResistors(prev => prev.filter(r => r.id !== id));
  };

  const handleResistorChange = (id: string, field: keyof Resistor, value: string) => {
    setResistors(prev => prev.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const handleResistorBlur = (id: string) => {
    const resistor = resistors.find(r => r.id === id);
    if (!resistor || !resistor.value.trim()) return;

    const parsed = parseShorthand(resistor.value);
    if (parsed) {
      setResistors(prev => prev.map(r =>
        r.id === id ? { ...r, value: parsed.value.toString(), unit: parsed.unit } : r
      ));
    }
  };

  const handleClearAll = () => {
    setResistors([
      { id: generateId(), value: "", unit: "Ω" },
      { id: generateId(), value: "", unit: "Ω" }
    ]);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Equivalent Resistance: ${result.formattedValue} ${result.unit}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!result) return;
    
    const entry: HistoryEntry = {
      id: generateId(),
      timestamp: Date.now(),
      result: result
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [result]);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDeleteHistoryEntry = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  const handleLoadFromHistory = (entry: HistoryEntry) => {
    setResistors(entry.result.resistors.map(r => ({ ...r, id: generateId() })));
    setOutputUnit(entry.result.unit);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClearAll();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleAddResistor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const validCount = resistors.filter(r => {
    const val = parseFloat(r.value);
    return !isNaN(val) && val > 0 && r.value.trim() !== "";
  }).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Parallel Resistor Calculator</h2>
          <p className="text-gray-500 text-sm mt-1">Calculate equivalent resistance for resistors connected in parallel.</p>
        </div>

        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Formula:</strong> 1/R<sub>total</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + ... + 1/R<sub>n</sub>
          </p>
          <p className="text-xs text-blue-600 mt-1">
            💡 Tip: Enter values like 10, 4.7k, or 1M for quick input
          </p>
        </div>

        {/* Resistor Inputs */}
        <div className="space-y-3 mb-6">
          {resistors.map((resistor, index) => (
            <div key={resistor.id} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-20">R{index + 1}</span>
              <div className="flex-1 flex bg-gray-50 border-2 border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary overflow-hidden">
                <input
                  type="text"
                  value={resistor.value}
                  onChange={(e) => handleResistorChange(resistor.id, "value", e.target.value)}
                  onBlur={() => handleResistorBlur(resistor.id)}
                  className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800 text-lg font-medium"
                  placeholder={`e.g. ${index === 0 ? '10' : index === 1 ? '4.7k' : '100'}`}
                />
                <select
                  value={resistor.unit}
                  onChange={(e) => handleResistorChange(resistor.id, "unit", e.target.value)}
                  className="bg-transparent border-l-2 border-gray-200 px-3 py-3 focus:outline-none text-gray-600 font-medium"
                >
                  {RESISTANCE_UNITS.map(u => (
                    <option key={u.value} value={u.value}>{u.value}</option>
                  ))}
                </select>
              </div>
              {resistors.length > 1 && (
                <button
                  onClick={() => handleRemoveResistor(resistor.id)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors border-2 border-transparent hover:border-red-200"
                  aria-label="Remove resistor"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Resistor Button */}
        <button
          onClick={handleAddResistor}
          disabled={resistors.length >= 20}
          className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-2"
        >
          <span>➕</span> Add Resistor {resistors.length >= 20 && "(Max 20)"}
        </button>

        {/* Output Unit Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
          <select
            value={outputUnit}
            onChange={(e) => setOutputUnit(e.target.value as ResistanceUnit)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
          >
            {RESISTANCE_UNITS.map(u => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>

        {/* Result Display */}
        {result ? (
          <div className="mb-6 p-8 flex flex-col items-center justify-center bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
            <div className="uppercase tracking-widest text-emerald-600 text-xs font-bold mb-2 z-10">
              Equivalent Resistance ({validCount} resistor{validCount !== 1 ? 's' : ''})
            </div>
            <div className="text-5xl font-black z-10" style={{ fontFamily: "var(--font-heading)" }}>
              {result.formattedValue} <span className="text-emerald-700">{result.unit}</span>
            </div>
            <div className="absolute -right-8 -bottom-8 text-9xl text-emerald-500 opacity-5 select-none font-bold">
              Ω
            </div>
          </div>
        ) : (
          <div className="mb-6 p-8 text-center bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <p className="text-gray-500">Enter at least one resistor value to calculate.</p>
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
            onClick={handleClearAll}
            className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 text-gray-600 font-medium rounded-xl transition-colors flex items-center gap-2 text-sm"
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
                  </div>
                  <span className="text-gray-300">from</span>
                  
                  <div className="flex flex-wrap gap-2 text-sm max-w-2xl text-gray-600">
                    {entry.result.resistors.map((r, idx) => (
                      <span key={idx} className="font-medium bg-white px-2 py-1 rounded-md border border-gray-200">
                        {r.value} {r.unit}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoadFromHistory(entry)}
                    className="sm:opacity-0 sm:group-hover:opacity-100 self-end sm:self-center p-2 text-gray-600 hover:text-primary hover:bg-white rounded-lg transition-all border border-gray-200"
                    aria-label="Load calculation"
                  >
                    ↻
                  </button>
                  <button
                    onClick={() => handleDeleteHistoryEntry(entry.id)}
                    className="sm:opacity-0 sm:group-hover:opacity-100 self-end sm:self-center p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all border border-gray-200"
                    aria-label="Delete history entry"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ParallelResistorCalculatorSEO />
      <RelatedTools 
        currentTool="parallel-resistor-calculator" 
        tools={["series-resistor-calculator", "ohms-law-calculator", "voltage-divider-calculator"]} 
      />
    </div>
  );
}
