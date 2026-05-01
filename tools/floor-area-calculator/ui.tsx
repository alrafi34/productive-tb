"use client";

import { useState, useEffect } from "react";
import { Room, CalculatedRoom, Unit } from "./types";
import {
  generateId,
  calculateAllRooms,
  calculateTotalArea,
  calculateFloorSummaries,
  formatArea,
  exportToCSV,
  exportToText,
  downloadFile,
  findLargestRoom
} from "./logic";
import FloorAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FloorAreaCalculatorUI() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: generateId(), name: "Living Room", length: "10", width: "8", unit: "m" as Unit },
    { id: generateId(), name: "Bedroom", length: "6", width: "5", unit: "m" as Unit }
  ]);
  
  const [globalUnit, setGlobalUnit] = useState<Unit>("m");
  const [enableFloors, setEnableFloors] = useState(false);
  const [calculatedRooms, setCalculatedRooms] = useState<CalculatedRoom[]>([]);
  const [totalArea, setTotalArea] = useState(0);
  const [copied, setCopied] = useState("");

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('floor-area-calculator-rooms');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRooms(parsed);
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      localStorage.setItem('floor-area-calculator-rooms', JSON.stringify(rooms));
    }
  }, [rooms]);

  // Calculate areas in real-time
  useEffect(() => {
    const calculated = calculateAllRooms(rooms);
    setCalculatedRooms(calculated);
    setTotalArea(calculateTotalArea(calculated));
  }, [rooms]);

  const addRoom = () => {
    setRooms([...rooms, {
      id: generateId(),
      name: `Room ${rooms.length + 1}`,
      length: "",
      width: "",
      unit: globalUnit,
      floor: enableFloors ? 1 : undefined
    }]);
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  const updateRoom = (id: string, field: keyof Room, value: string | number) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const clearAll = () => {
    if (confirm('Clear all rooms?')) {
      setRooms([{ id: generateId(), name: "Room 1", length: "", width: "", unit: globalUnit }]);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(calculatedRooms, totalArea);
    downloadFile(csv, 'floor_area_calculation.csv');
  };

  const handleExportText = () => {
    const text = exportToText(calculatedRooms, totalArea, globalUnit);
    downloadFile(text, 'floor_area_summary.txt', 'text/plain');
  };

  const largestRoom = findLargestRoom(calculatedRooms);
  const floorSummaries = enableFloors ? calculateFloorSummaries(calculatedRooms) : [];

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Floor Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate total built-up floor area by adding multiple rooms. Supports meters and feet with real-time calculations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGlobalUnit("m")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      globalUnit === "m"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Meters (m)
                  </button>
                  <button
                    onClick={() => setGlobalUnit("ft")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      globalUnit === "ft"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Feet (ft)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="text-sm font-medium text-gray-700">Enable Floor Grouping</label>
                <button
                  onClick={() => setEnableFloors(!enableFloors)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enableFloors ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enableFloors ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={addRoom}
                  className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                >
                  ➕ Add Room
                </button>
                <button
                  onClick={clearAll}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>

            {/* Total Area Display */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                TOTAL FLOOR AREA
              </p>
              <div className="text-4xl font-bold mb-1">
                {totalArea.toFixed(2)}
              </div>
              <div className="text-xl text-primary-100">
                {globalUnit}²
              </div>
              
              {totalArea > 0 && (
                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Rooms:</span>
                    <span className="font-semibold">{rooms.length}</span>
                  </div>
                  {largestRoom && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Largest Room:</span>
                      <span className="font-semibold">{largestRoom.name}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleCopy(formatArea(totalArea, globalUnit), "total")}
                  disabled={totalArea === 0}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied === "total" ? "✓ Copied!" : "📋 Copy Total"}
                </button>
              </div>
            </div>

            {/* Floor Summaries */}
            {enableFloors && floorSummaries.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Floor Summaries
                </h3>
                <div className="space-y-2">
                  {floorSummaries.map(floor => (
                    <div key={floor.floorNumber} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">Floor {floor.floorNumber}</div>
                        <div className="text-xs text-gray-500">{floor.roomCount} room{floor.roomCount !== 1 ? 's' : ''}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{floor.totalArea.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{globalUnit}²</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Rooms Table */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Room Dimensions
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Length</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Width</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit</th>
                      {enableFloors && (
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Floor</th>
                      )}
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rooms.map((room, index) => {
                      const calculated = calculatedRooms.find(r => r.id === room.id);
                      const isLargest = largestRoom?.id === room.id && calculated && calculated.area > 0;
                      
                      return (
                        <tr key={room.id} className={`hover:bg-gray-50/50 transition-colors ${isLargest ? 'bg-green-50/30' : ''}`}>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={room.name}
                              onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                              className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Room name"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={room.length}
                              onChange={(e) => updateRoom(room.id, "length", e.target.value)}
                              className="w-20 px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="0"
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={room.width}
                              onChange={(e) => updateRoom(room.id, "width", e.target.value)}
                              className="w-20 px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="0"
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={room.unit}
                              onChange={(e) => updateRoom(room.id, "unit", e.target.value)}
                              className="px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="m">m</option>
                              <option value="ft">ft</option>
                            </select>
                          </td>
                          {enableFloors && (
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={room.floor || 1}
                                onChange={(e) => updateRoom(room.id, "floor", parseInt(e.target.value) || 1)}
                                className="w-16 px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                                min="1"
                              />
                            </td>
                          )}
                          <td className="px-4 py-3">
                            <span className={`font-mono font-semibold ${calculated && calculated.area > 0 ? 'text-primary' : 'text-gray-400'}`}>
                              {calculated ? calculated.area.toFixed(2) : '0.00'} {room.unit}²
                            </span>
                            {isLargest && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Largest</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => removeRoom(room.id)}
                              disabled={rooms.length === 1}
                              className="text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                              title="Remove room"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {rooms.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No rooms added yet. Click "Add Room" to start.
                </div>
              )}
            </div>

            {/* Export Buttons */}
            {totalArea > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  💾 Export CSV
                </button>
                <button
                  onClick={handleExportText}
                  className="px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export Summary
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <FloorAreaCalculatorSEO />
      <RelatedTools
        currentTool="floor-area-calculator"
        tools={['aspect-ratio-calculator', 'square-meter-to-square-foot-converter', 'room-area-calculator']}
      />
    </>
  );
}
