"use client";

import { useState, useEffect } from "react";
import { Wall, Opening, CalculatedWall, CalculatedOpening, Unit, OpeningType, CalculationSummary } from "./types";
import {
  generateId,
  calculateAllWalls,
  calculateAllOpenings,
  calculateTotalWallArea,
  calculateTotalOpeningArea,
  calculateNetArea,
  formatArea,
  exportToCSV,
  exportToText,
  downloadFile,
  findLargestWall,
  getUnitName
} from "./logic";
import WallAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WallAreaCalculatorUI() {
  const [walls, setWalls] = useState<Wall[]>([
    { id: generateId(), name: "Wall 1", width: "", height: "", unit: "ft" as Unit }
  ]);
  
  const [openings, setOpenings] = useState<Opening[]>([]);
  
  const [globalUnit, setGlobalUnit] = useState<Unit>("ft");
  const [calculatedWalls, setCalculatedWalls] = useState<CalculatedWall[]>([]);
  const [calculatedOpenings, setCalculatedOpenings] = useState<CalculatedOpening[]>([]);
  const [summary, setSummary] = useState<CalculationSummary>({
    totalWallArea: 0,
    totalOpeningArea: 0,
    netArea: 0,
    unit: "ft"
  });
  const [copied, setCopied] = useState("");

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wall-area-calculator-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.walls && Array.isArray(parsed.walls) && parsed.walls.length > 0) {
          setWalls(parsed.walls);
        }
        if (parsed.openings && Array.isArray(parsed.openings)) {
          setOpenings(parsed.openings);
        }
        if (parsed.globalUnit) {
          setGlobalUnit(parsed.globalUnit);
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wall-area-calculator-data', JSON.stringify({
      walls,
      openings,
      globalUnit
    }));
  }, [walls, openings, globalUnit]);

  // Calculate areas in real-time
  useEffect(() => {
    const calcWalls = calculateAllWalls(walls);
    const calcOpenings = calculateAllOpenings(openings);
    const totalWall = calculateTotalWallArea(calcWalls);
    const totalOpening = calculateTotalOpeningArea(calcOpenings);
    const net = calculateNetArea(totalWall, totalOpening);
    
    setCalculatedWalls(calcWalls);
    setCalculatedOpenings(calcOpenings);
    setSummary({
      totalWallArea: totalWall,
      totalOpeningArea: totalOpening,
      netArea: net,
      unit: globalUnit
    });
  }, [walls, openings, globalUnit]);

  const addWall = () => {
    setWalls([...walls, {
      id: generateId(),
      name: `Wall ${walls.length + 1}`,
      width: "",
      height: "",
      unit: globalUnit
    }]);
  };

  const removeWall = (id: string) => {
    setWalls(walls.filter(w => w.id !== id));
  };

  const updateWall = (id: string, field: keyof Wall, value: string) => {
    setWalls(walls.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const addOpening = () => {
    setOpenings([...openings, {
      id: generateId(),
      type: "door" as OpeningType,
      width: "",
      height: "",
      unit: globalUnit
    }]);
  };

  const removeOpening = (id: string) => {
    setOpenings(openings.filter(o => o.id !== id));
  };

  const updateOpening = (id: string, field: keyof Opening, value: string | OpeningType) => {
    setOpenings(openings.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const clearAll = () => {
    if (confirm('Clear all walls and openings?')) {
      setWalls([{ id: generateId(), name: "Wall 1", width: "", height: "", unit: globalUnit }]);
      setOpenings([]);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(calculatedWalls, calculatedOpenings, summary);
    downloadFile(csv, 'wall_area_calculation.csv');
  };

  const handleExportText = () => {
    const text = exportToText(calculatedWalls, calculatedOpenings, summary);
    downloadFile(text, 'wall_area_summary.txt', 'text/plain');
  };

  const largestWall = findLargestWall(calculatedWalls);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Wall Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate wall surface area for painting, construction, or renovation. Add multiple walls, subtract doors and windows for accurate net area.
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
                    onClick={() => setGlobalUnit("ft")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      globalUnit === "ft"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Feet (ft)
                  </button>
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
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={addWall}
                  className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                >
                  ➕ Add Wall
                </button>
                <button
                  onClick={addOpening}
                  className="w-full px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🚪 Add Door/Window
                </button>
                <button
                  onClick={clearAll}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>

            {/* Summary Display */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
              <div>
                <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                  Total Wall Area
                </p>
                <div className="text-3xl font-bold">
                  {summary.totalWallArea.toFixed(2)}
                </div>
                <div className="text-lg text-primary-100">
                  {globalUnit}²
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                  Openings Area
                </p>
                <div className="text-2xl font-bold">
                  {summary.totalOpeningArea.toFixed(2)}
                </div>
                <div className="text-sm text-primary-100">
                  {globalUnit}²
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                  Net Paintable Area
                </p>
                <div className="text-4xl font-bold">
                  {summary.netArea.toFixed(2)}
                </div>
                <div className="text-xl text-primary-100">
                  {globalUnit}²
                </div>
              </div>
              
              {summary.netArea > 0 && (
                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Walls:</span>
                    <span className="font-semibold">{walls.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Openings:</span>
                    <span className="font-semibold">{openings.length}</span>
                  </div>
                  {largestWall && largestWall.area > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Largest Wall:</span>
                      <span className="font-semibold">{largestWall.name}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleCopy(formatArea(summary.netArea, globalUnit), "net")}
                  disabled={summary.netArea === 0}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied === "net" ? "✓ Copied!" : "📋 Copy Net Area"}
                </button>
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Walls Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Walls
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Wall Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Width</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Height</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {walls.map((wall) => {
                      const calculated = calculatedWalls.find(w => w.id === wall.id);
                      const isLargest = largestWall?.id === wall.id && calculated && calculated.area > 0;
                      
                      return (
                        <tr key={wall.id} className={`hover:bg-gray-50/50 transition-colors ${isLargest ? 'bg-green-50/30' : ''}`}>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={wall.name}
                              onChange={(e) => updateWall(wall.id, "name", e.target.value)}
                              className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Wall name"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={wall.width}
                              onChange={(e) => updateWall(wall.id, "width", e.target.value)}
                              className="w-20 px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="10"
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={wall.height}
                              onChange={(e) => updateWall(wall.id, "height", e.target.value)}
                              className="w-20 px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="8"
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={wall.unit}
                              onChange={(e) => updateWall(wall.id, "unit", e.target.value)}
                              className="px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="ft">ft</option>
                              <option value="m">m</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`font-mono font-semibold ${calculated && calculated.area > 0 ? 'text-primary' : 'text-gray-400'}`}>
                              {calculated ? calculated.area.toFixed(2) : '0.00'} {wall.unit}²
                            </span>
                            {isLargest && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Largest</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => removeWall(wall.id)}
                              disabled={walls.length === 1}
                              className="text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                              title="Remove wall"
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
            </div>

            {/* Openings Table */}
            {openings.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Openings (Doors & Windows)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Width</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Height</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {openings.map((opening) => {
                        const calculated = calculatedOpenings.find(o => o.id === opening.id);
                        
                        return (
                          <tr key={opening.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <select
                                value={opening.type}
                                onChange={(e) => updateOpening(opening.id, "type", e.target.value as OpeningType)}
                                className="px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              >
                                <option value="door">Door</option>
                                <option value="window">Window</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={opening.width}
                                onChange={(e) => updateOpening(opening.id, "width", e.target.value)}
                                className="w-20 px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="3"
                                min="0"
                                step="0.1"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={opening.height}
                                onChange={(e) => updateOpening(opening.id, "height", e.target.value)}
                                className="w-20 px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="7"
                                min="0"
                                step="0.1"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={opening.unit}
                                onChange={(e) => updateOpening(opening.id, "unit", e.target.value)}
                                className="px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              >
                                <option value="ft">ft</option>
                                <option value="m">m</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`font-mono font-semibold ${calculated && calculated.area > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                                {calculated ? calculated.area.toFixed(2) : '0.00'} {opening.unit}²
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => removeOpening(opening.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Remove opening"
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
              </div>
            )}

            {/* Export Buttons */}
            {summary.netArea > 0 && (
              <div className="grid grid-cols-2 gap-3">
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

      <WallAreaCalculatorSEO />
      <RelatedTools
        currentTool="wall-area-calculator"
        tools={['floor-area-calculator', 'room-area-calculator', 'plot-area-calculator']}
      />
    </>
  );
}
