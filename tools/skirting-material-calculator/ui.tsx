"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, Room, SkirtingCalculation } from "./types";
import {
  createRoom,
  calculateRoomSkirting,
  calculateSkirtingWithCost,
  validateRoom,
  getUnitLabel,
  formatNumber,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  debounce
} from "./logic";
import SkirtingMaterialCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SkirtingMaterialCalculatorUI() {
  const [rooms, setRooms] = useState<Room[]>([createRoom()]);
  const [unit, setUnit] = useState<Unit>("feet");
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [showCost, setShowCost] = useState(false);
  
  const [calculation, setCalculation] = useState<SkirtingCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      try {
        const result = calculateSkirtingWithCost(rooms, unit, showCost ? costPerUnit : 0);
        setCalculation(result);
      } catch (err) {
        console.error("Calculation error:", err);
      }
    }, 150),
    [rooms, unit, costPerUnit, showCost]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [rooms, unit, costPerUnit, showCost, debouncedCalculate]);

  const handleAddRoom = () => {
    setRooms([...rooms, createRoom()]);
  };

  const handleRemoveRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  const handleUpdateRoom = (id: string, field: keyof Room, value: number) => {
    setRooms(rooms.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const handleReset = () => {
    setRooms([createRoom()]);
    setUnit("feet");
    setCostPerUnit(0);
    setShowCost(false);
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Skirting: ${formatNumber(calculation.totalSkirtingLength, 2)} ${getUnitLabel(calculation.unit)}${showCost ? ` | Cost: $${formatNumber(calculation.totalCost, 2)}` : ''}`;
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

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'skirting-calculation.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'skirting-calculation.txt', 'text/plain');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SkirtingCalculation) => {
    setRooms(calc.rooms);
    setUnit(calc.unit);
    setCostPerUnit(calc.costPerUnit);
    setShowCost(calc.costPerUnit > 0);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Skirting Material Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate skirting board requirements instantly. Enter room dimensions and doors to get accurate skirting length and cost estimates for single or multiple rooms.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="feet">Feet (ft)</option>
                  <option value="meters">Meters (m)</option>
                </select>
              </div>

              {/* Cost Toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCost}
                    onChange={(e) => setShowCost(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Cost Estimation</span>
                </label>
              </div>

              {/* Cost Per Unit */}
              {showCost && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per {getUnitLabel(unit)} ($)
                  </label>
                  <input
                    type="number"
                    value={costPerUnit || ''}
                    onChange={(e) => setCostPerUnit(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                    placeholder="2.50"
                    min="0"
                    step="0.1"
                  />
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
              </div>
            </div>

            {/* Result Display */}
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Skirting
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalSkirtingLength, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(calculation.unit)}
                  </div>
                </div>

                {showCost && calculation.costPerUnit > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-primary-100 font-medium mb-1 text-xs uppercase tracking-wider">
                      Total Cost
                    </p>
                    <div className="text-2xl font-bold">
                      ${formatNumber(calculation.totalCost, 2)}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Rooms:</span>
                    <span className="font-semibold">{calculation.rooms.length}</span>
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

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Rooms */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Rooms
                </h3>
                <button
                  onClick={handleAddRoom}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  + Add Room
                </button>
              </div>
              
              <div className="space-y-3">
                {rooms.map((room, index) => {
                  const error = validateRoom(room);
                  const skirting = calculateRoomSkirting(room);
                  
                  return (
                    <div key={room.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900 text-sm">Room {index + 1}</span>
                        {rooms.length > 1 && (
                          <button
                            onClick={() => handleRemoveRoom(room.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Length ({getUnitLabel(unit)})
                          </label>
                          <input
                            type="number"
                            value={room.length || ''}
                            onChange={(e) => handleUpdateRoom(room.id, 'length', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="10"
                            min="0"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Width ({getUnitLabel(unit)})
                          </label>
                          <input
                            type="number"
                            value={room.width || ''}
                            onChange={(e) => handleUpdateRoom(room.id, 'width', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="12"
                            min="0"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Doors
                          </label>
                          <input
                            type="number"
                            value={room.doors || ''}
                            onChange={(e) => handleUpdateRoom(room.id, 'doors', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="1"
                            min="0"
                            step="1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Door Width ({getUnitLabel(unit)})
                          </label>
                          <input
                            type="number"
                            value={room.doorWidth || ''}
                            onChange={(e) => handleUpdateRoom(room.id, 'doorWidth', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="3"
                            min="0"
                            step="0.1"
                          />
                        </div>
                      </div>
                      
                      {error ? (
                        <div className="mt-2 text-xs text-red-600">{error}</div>
                      ) : (
                        <div className="mt-2 text-xs text-gray-600">
                          Skirting: <span className="font-semibold text-primary">{formatNumber(skirting, 2)} {getUnitLabel(unit)}</span>
                          {showCost && costPerUnit > 0 && (
                            <span className="ml-2">
                              • Cost: <span className="font-semibold text-primary">${formatNumber(skirting * costPerUnit, 2)}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calculation Summary */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Rooms</div>
                    <div className="text-2xl font-bold text-gray-900">{calculation.rooms.length}</div>
                    <div className="text-xs text-gray-600">rooms</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Total Skirting</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(calculation.totalSkirtingLength, 2)}</div>
                    <div className="text-xs text-primary font-medium">{getUnitLabel(calculation.unit)}</div>
                  </div>
                  {showCost && calculation.costPerUnit > 0 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xs text-green-700 uppercase tracking-wider mb-1 font-semibold">Total Cost</div>
                      <div className="text-2xl font-bold text-green-700">${formatNumber(calculation.totalCost, 2)}</div>
                      <div className="text-xs text-green-600">estimated</div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Skirting = Perimeter − Door Openings = 2(L + W) − (Doors × Door Width)
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export Text
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
                            {formatNumber(entry.calculation.totalSkirtingLength, 2)} {getUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.rooms.length} rooms
                          {entry.calculation.costPerUnit > 0 && (
                            <span className="ml-2">• ${formatNumber(entry.calculation.totalCost, 2)}</span>
                          )}
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

      <SkirtingMaterialCalculatorSEO />
      <RelatedTools
        currentTool="skirting-material-calculator"
        tools={['room-area-calculator', 'floor-finish-calculator', 'paint-required-calculator']}
      />
    </>
  );
}
