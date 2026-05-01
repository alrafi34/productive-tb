"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Unit, FurnitureItem, RoomDimensions, LayoutConstraints, SpaceOptimizationResult } from "./types";
import {
  calculateSpaceOptimization,
  getFurniturePresets,
  getRoomTemplates,
  validateInputs,
  formatNumber,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  debounce,
  convertToFeet
} from "./logic";
import InteriorSpaceOptimizationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function InteriorSpaceOptimizationCalculatorUI() {
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
    width: 12,
    length: 14,
    unit: "feet"
  });
  
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
  const [constraints, setConstraints] = useState<LayoutConstraints>({
    minWalkingSpace: 2,
    wallAlignment: true,
    allowRotation: true
  });
  
  const [result, setResult] = useState<SpaceOptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [showPresets, setShowPresets] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const presets = getFurniturePresets();
  const roomTemplates = getRoomTemplates();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(
        roomDimensions.width,
        roomDimensions.length,
        constraints.minWalkingSpace
      );
      
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculationResult = calculateSpaceOptimization(
          roomDimensions,
          furniture,
          constraints
        );
        setResult(calculationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [roomDimensions, furniture, constraints]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [roomDimensions, furniture, constraints, debouncedCalculate]);

  // Draw layout on canvas
  useEffect(() => {
    if (!canvasRef.current || !result) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const roomWidth = convertToFeet(roomDimensions.width, roomDimensions.unit);
    const roomLength = convertToFeet(roomDimensions.length, roomDimensions.unit);
    
    // Set canvas size
    const scale = Math.min(canvas.width / roomWidth, canvas.height / roomLength) * 0.9;
    const offsetX = (canvas.width - roomWidth * scale) / 2;
    const offsetY = (canvas.height - roomLength * scale) / 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw room
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(offsetX, offsetY, roomWidth * scale, roomLength * scale);
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, offsetY, roomWidth * scale, roomLength * scale);
    
    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    for (let i = 1; i < roomWidth; i++) {
      ctx.beginPath();
      ctx.moveTo(offsetX + i * scale, offsetY);
      ctx.lineTo(offsetX + i * scale, offsetY + roomLength * scale);
      ctx.stroke();
    }
    for (let i = 1; i < roomLength; i++) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + i * scale);
      ctx.lineTo(offsetX + roomWidth * scale, offsetY + i * scale);
      ctx.stroke();
    }
    
    // Draw placed furniture
    result.placedFurniture.forEach((item, index) => {
      const w = item.rotated ? item.length : item.width;
      const l = item.rotated ? item.width : item.length;
      const x = offsetX + item.x * scale;
      const y = offsetY + item.y * scale;
      
      // Draw furniture rectangle
      ctx.fillStyle = "#058554";
      ctx.fillRect(x, y, w * scale, l * scale);
      ctx.strokeStyle = "#047045";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w * scale, l * scale);
      
      // Draw label
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const text = item.name.length > 10 ? item.name.substring(0, 8) + "..." : item.name;
      ctx.fillText(text, x + (w * scale) / 2, y + (l * scale) / 2);
    });
    
    // Draw dimensions
    ctx.fillStyle = "#6b7280";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${roomDimensions.width} ${roomDimensions.unit}`, canvas.width / 2, offsetY - 10);
    ctx.save();
    ctx.translate(offsetX - 10, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${roomDimensions.length} ${roomDimensions.unit}`, 0, 0);
    ctx.restore();
    
  }, [result, roomDimensions]);

  const handleAddFurniture = () => {
    const newItem: FurnitureItem = {
      id: `furniture-${Date.now()}`,
      name: "New Item",
      width: 3,
      length: 2,
      x: 0,
      y: 0,
      rotated: false
    };
    setFurniture([...furniture, newItem]);
  };

  const handleRemoveFurniture = (id: string) => {
    setFurniture(furniture.filter(item => item.id !== id));
  };

  const handleUpdateFurniture = (id: string, updates: Partial<FurnitureItem>) => {
    setFurniture(furniture.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleApplyPreset = (preset: any) => {
    const newItem: FurnitureItem = {
      id: `furniture-${Date.now()}`,
      name: preset.name,
      width: preset.width,
      length: preset.length,
      x: 0,
      y: 0,
      rotated: false
    };
    setFurniture([...furniture, newItem]);
    setShowPresets(false);
  };

  const handleApplyRoomTemplate = (template: any) => {
    setRoomDimensions({
      width: template.width,
      length: template.length,
      unit: template.unit
    });
  };

  const handleReset = () => {
    setFurniture([]);
    setRoomDimensions({ width: 12, length: 14, unit: "feet" });
    setConstraints({
      minWalkingSpace: 2,
      wallAlignment: true,
      allowRotation: true
    });
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Room: ${roomDimensions.width}×${roomDimensions.length} ${roomDimensions.unit}\nEfficiency: ${formatNumber(result.efficiencyScore)}%\nFurniture: ${result.placedFurniture.length} items`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(result, roomDimensions);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(result, roomDimensions);
      downloadFile(text, 'interior_space_optimization.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setRoomDimensions(entry.roomDimensions);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Interior Space Optimization Calculator</h3>
              <p className="text-sm text-blue-800">
                Plan and optimize your room layout efficiently. Add furniture, visualize placement, and get instant space efficiency analysis.
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
                  value={roomDimensions.unit}
                  onChange={(e) => setRoomDimensions({ ...roomDimensions, unit: e.target.value as Unit })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="feet">Feet (ft)</option>
                  <option value="meters">Meters (m)</option>
                </select>
              </div>

              {/* Walking Space */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Walking Space: {constraints.minWalkingSpace} ft
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={constraints.minWalkingSpace}
                  onChange={(e) => setConstraints({ ...constraints, minWalkingSpace: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 ft</span>
                  <span>5 ft</span>
                </div>
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={constraints.allowRotation}
                    onChange={(e) => setConstraints({ ...constraints, allowRotation: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Allow Rotation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={constraints.wallAlignment}
                    onChange={(e) => setConstraints({ ...constraints, wallAlignment: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Wall Alignment</span>
                </label>
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
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Efficiency Score
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.efficiencyScore, 1)}%
                  </div>
                  <div className="text-xl text-primary-100">
                    Space Utilization
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Room Area:</span>
                    <span className="font-semibold">{formatNumber(result.roomArea, 0)} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Occupied:</span>
                    <span className="font-semibold">{formatNumber(result.occupiedArea, 0)} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Free Space:</span>
                    <span className="font-semibold">{formatNumber(result.freeSpace, 0)} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Placed Items:</span>
                    <span className="font-semibold">{result.placedFurniture.length}</span>
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
            
            {/* Room Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Room Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({roomDimensions.unit})
                  </label>
                  <input
                    type="number"
                    value={roomDimensions.width || ''}
                    onChange={(e) => setRoomDimensions({ ...roomDimensions, width: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({roomDimensions.unit})
                  </label>
                  <input
                    type="number"
                    value={roomDimensions.length || ''}
                    onChange={(e) => setRoomDimensions({ ...roomDimensions, length: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="14"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>

              {/* Room Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {roomTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplyRoomTemplate(template)}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-xs font-medium text-gray-700"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
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

            {/* Visual Layout */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Layout Preview
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-auto border border-gray-200 rounded"
                />
              </div>
            </div>

            {/* Furniture List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Furniture Items ({furniture.length})
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPresets(!showPresets)}
                    className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📦 Presets
                  </button>
                  <button
                    onClick={handleAddFurniture}
                    className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    + Add Item
                  </button>
                </div>
              </div>

              {/* Presets Panel */}
              {showPresets && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-900 mb-3">Furniture Presets</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => handleApplyPreset(preset)}
                        className="p-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors text-left"
                      >
                        <div className="font-semibold text-gray-900 text-xs">{preset.name}</div>
                        <div className="text-xs text-gray-600">{preset.width}×{preset.length} ft</div>
                        <div className="text-xs text-blue-600">{preset.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {furniture.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-4xl mb-2">🪑</div>
                  <p>No furniture added yet</p>
                  <p className="text-sm">Click "Add Item" or use presets to start</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {furniture.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateFurniture(item.id, { name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Width (ft)</label>
                          <input
                            type="number"
                            value={item.width}
                            onChange={(e) => handleUpdateFurniture(item.id, { width: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            min="0"
                            step="0.5"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Length (ft)</label>
                          <input
                            type="number"
                            value={item.length}
                            onChange={(e) => handleUpdateFurniture(item.id, { length: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            min="0"
                            step="0.5"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => handleRemoveFurniture(item.id)}
                            className="w-full px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Warnings & Suggestions */}
            {result && (result.warnings.length > 0 || result.suggestions.length > 0) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                {result.warnings.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2 text-sm">⚠️ Warnings</h4>
                    <ul className="space-y-1">
                      {result.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                          <span className="mt-0.5">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2 text-sm">💡 Suggestions</h4>
                    <ul className="space-y-1">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                          <span className="mt-0.5">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Overflow Items */}
            {result && result.overflowItems.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-semibold text-red-800 mb-2">Items That Don't Fit</h4>
                <ul className="space-y-1">
                  {result.overflowItems.map((item, index) => (
                    <li key={index} className="text-sm text-red-700">
                      • {item.name} ({item.width}×{item.length} ft)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Export Button */}
            {result && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Report
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
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {formatNumber(entry.result.efficiencyScore, 1)}% Efficiency
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.roomDimensions.width}×{entry.roomDimensions.length} {entry.roomDimensions.unit} • 
                          {entry.result.placedFurniture.length} items
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

      <InteriorSpaceOptimizationCalculatorSEO />
      <RelatedTools
        currentTool="interior-space-optimization-calculator"
        tools={['room-area-calculator', 'floor-area-calculator', 'parking-space-calculator']}
      />
    </>
  );
}
