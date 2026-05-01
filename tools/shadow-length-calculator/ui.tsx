"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Unit, ShadowCalculation } from "./types";
import {
  calculateShadowLength,
  saveToHistory,
  getHistory,
  clearHistory,
  validateInputs,
  formatNumber,
  getUnitLabel,
  getOppositeUnitLabel,
  exportToText,
  debounce
} from "./logic";
import ShadowLengthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ShadowLengthCalculatorUI() {
  const [objectHeight, setObjectHeight] = useState("10");
  const [sunAngle, setSunAngle] = useState(45);
  const [unit, setUnit] = useState<Unit>("meters");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  
  const [calculation, setCalculation] = useState<ShadowCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const height = parseFloat(objectHeight);
      const angle = sunAngle;
      
      const validationError = validateInputs(height, angle);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateShadowLength({
          objectHeight: height,
          sunAngle: angle,
          unit
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [objectHeight, sunAngle, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [objectHeight, sunAngle, unit, debouncedCalculate]);

  // Draw visualization
  useEffect(() => {
    if (!calculation || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = rect.width;
    const height = rect.height;
    
    // Clear canvas
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(0, 0, width, height);
    
    // Calculate dimensions
    const padding = 40;
    const groundY = height - padding;
    const maxObjectHeight = height - padding * 2;
    const maxShadowLength = width - padding * 2;
    
    // Scale factors
    const objectScale = Math.min(maxObjectHeight / calculation.objectHeight, 50);
    const shadowScale = Math.min(maxShadowLength / calculation.shadowLength, 50);
    const scale = Math.min(objectScale, shadowScale);
    
    const objectHeightPx = calculation.objectHeight * scale;
    const shadowLengthPx = calculation.shadowLength * scale;
    
    const objectX = padding + 20;
    const objectY = groundY - objectHeightPx;
    
    // Draw ground
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, groundY);
    ctx.lineTo(width - padding, groundY);
    ctx.stroke();
    
    // Draw shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(objectX, groundY - 2, shadowLengthPx, 4);
    
    // Draw object
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(objectX - 10, objectY, 20, objectHeightPx);
    
    // Object outline
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.strokeRect(objectX - 10, objectY, 20, objectHeightPx);
    
    // Draw sun rays
    const sunX = objectX + shadowLengthPx + 60;
    const sunY = objectY - 40;
    
    // Sun
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Sun rays
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45) * (Math.PI / 180);
      const x1 = sunX + Math.cos(angle) * 25;
      const y1 = sunY + Math.sin(angle) * 25;
      const x2 = sunX + Math.cos(angle) * 35;
      const y2 = sunY + Math.sin(angle) * 35;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    // Draw light ray from sun to object top
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(sunX, sunY);
    ctx.lineTo(objectX, objectY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw angle arc
    const arcRadius = 40;
    const angleRad = calculation.sunAngle * (Math.PI / 180);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(objectX, groundY, arcRadius, -Math.PI / 2, -Math.PI / 2 + angleRad, false);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    
    // Height label
    ctx.fillText(
      `${formatNumber(calculation.objectHeight, 1)} ${getUnitLabel(calculation.unit)}`,
      objectX - 30,
      objectY + objectHeightPx / 2
    );
    
    // Shadow label
    ctx.fillText(
      `${formatNumber(calculation.shadowLength, 1)} ${getUnitLabel(calculation.unit)}`,
      objectX + shadowLengthPx / 2,
      groundY + 25
    );
    
    // Angle label
    ctx.fillStyle = '#ef4444';
    ctx.fillText(
      `${formatNumber(calculation.sunAngle, 0)}°`,
      objectX + arcRadius + 15,
      groundY - 10
    );
    
  }, [calculation, decimalPlaces]);

  const handleReset = () => {
    setObjectHeight("10");
    setSunAngle(45);
    setUnit("meters");
    setDecimalPlaces(2);
    setCalculation(null);
    setError(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Height: ${formatNumber(calculation.objectHeight, decimalPlaces)} ${getUnitLabel(calculation.unit)}, Angle: ${formatNumber(calculation.sunAngle, 1)}°, Shadow: ${formatNumber(calculation.shadowLength, decimalPlaces)} ${getUnitLabel(calculation.unit)}`;
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

  const handleExportImage = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'shadow-calculation.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'shadow-calculation.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ShadowCalculation) => {
    setObjectHeight(calc.objectHeight.toString());
    setSunAngle(calc.sunAngle);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌓</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Shadow Length Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate shadow length instantly using object height and sun elevation angle. Perfect for architecture, planning, and design.
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
                  <option value="meters">Meters (m)</option>
                  <option value="feet">Feet (ft)</option>
                </select>
              </div>

              {/* Decimal Places */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Places</label>
                <select
                  value={decimalPlaces}
                  onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
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
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Shadow Length
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.shadowLength, decimalPlaces)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getUnitLabel(calculation.unit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Height:</span>
                    <span className="font-semibold">{formatNumber(calculation.objectHeight, decimalPlaces)} {getUnitLabel(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Angle:</span>
                    <span className="font-semibold">{formatNumber(calculation.sunAngle, 1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Also:</span>
                    <span className="font-semibold">{formatNumber(calculation.shadowLengthConverted || 0, decimalPlaces)} {getOppositeUnitLabel(calculation.unit)}</span>
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
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Object Height ({getUnitLabel(unit)})
                </label>
                <input
                  type="number"
                  value={objectHeight}
                  onChange={(e) => setObjectHeight(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="10"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sun Elevation Angle: {sunAngle}°
                </label>
                <input
                  type="range"
                  value={sunAngle}
                  onChange={(e) => setSunAngle(parseInt(e.target.value))}
                  className="w-full"
                  min="1"
                  max="89"
                  step="1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1° (Low)</span>
                  <span>45° (Medium)</span>
                  <span>89° (High)</span>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Shadow Length = Height ÷ tan(angle)
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

            {/* Visualization Canvas */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Visual Diagram
                  </h3>
                </div>
                <canvas
                  ref={canvasRef}
                  className="w-full"
                  style={{ height: '300px' }}
                />
              </div>
            )}

            {/* Export Buttons */}
            {calculation && !error && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportImage}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📷 Export Image
                </button>
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export Text
                </button>
              </div>
            )}

            {/* Quick Examples */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Examples
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setObjectHeight("10");
                    setSunAngle(45);
                    setUnit("meters");
                  }}
                  className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900 text-sm">Example 1</div>
                  <div className="text-xs text-gray-600 mt-1">10m @ 45°</div>
                  <div className="text-xs text-primary font-semibold mt-1">= 10m shadow</div>
                </button>
                <button
                  onClick={() => {
                    setObjectHeight("5");
                    setSunAngle(30);
                    setUnit("meters");
                  }}
                  className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900 text-sm">Example 2</div>
                  <div className="text-xs text-gray-600 mt-1">5m @ 30°</div>
                  <div className="text-xs text-primary font-semibold mt-1">= 8.66m shadow</div>
                </button>
                <button
                  onClick={() => {
                    setObjectHeight("2");
                    setSunAngle(60);
                    setUnit("meters");
                  }}
                  className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900 text-sm">Example 3</div>
                  <div className="text-xs text-gray-600 mt-1">2m @ 60°</div>
                  <div className="text-xs text-primary font-semibold mt-1">= 1.15m shadow</div>
                </button>
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
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {formatNumber(entry.calculation.shadowLength, 2)} {getUnitLabel(entry.calculation.unit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Height: {formatNumber(entry.calculation.objectHeight, 2)} {getUnitLabel(entry.calculation.unit)} • 
                          Angle: {formatNumber(entry.calculation.sunAngle, 1)}°
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

      <ShadowLengthCalculatorSEO />
      <RelatedTools
        currentTool="shadow-length-calculator"
        tools={['sunlight-exposure-calculator', 'building-height-calculator', 'room-area-calculator']}
      />
    </>
  );
}
