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
import { PLACES, localToUtc, sunPosition, compassPoint, browserTimeZone } from "./sun";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function ShadowLengthCalculatorUI() {
  const [objectHeight, setObjectHeight] = useState("10");
  const [sunAngle, setSunAngle] = useState(45);
  const [unit, setUnit] = useState<Unit>("meters");
  const [decimalPlaces, setDecimalPlaces] = useState(2);

  // Sun angle typed in, or worked out from a date, time and place
  const [mode, setMode] = useState<"angle" | "place">("angle");
  const [placeIndex, setPlaceIndex] = useState(0); // -1 = custom coordinates
  const [customLat, setCustomLat] = useState("");
  const [customLon, setCustomLon] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [locating, setLocating] = useState(false);
  
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

  // After hydration: today's date and the city in the visitor's own time zone
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setDate(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
      const zone = browserTimeZone();
      const match = PLACES.findIndex((p) => p.timeZone === zone);
      if (match >= 0) setPlaceIndex(match);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const place = placeIndex >= 0
    ? PLACES[placeIndex]
    : { name: "Custom", lat: parseFloat(customLat), lon: parseFloat(customLon), timeZone: browserTimeZone() };
  const placeValid = Number.isFinite(place.lat) && Math.abs(place.lat) <= 90 && Number.isFinite(place.lon) && Math.abs(place.lon) <= 180;
  const sun = mode === "place" && placeValid && date && /^\d{1,2}:\d{2}$/.test(time)
    ? sunPosition(localToUtc(date, time, place.timeZone), place.lat, place.lon)
    : null;
  const sunDown = sun !== null && sun.elevation <= 0;

  // Feed the computed elevation into the same shadow calculation as the slider
  useEffect(() => {
    if (!sun) return;
    const frame = window.requestAnimationFrame(() => setSunAngle(Math.round(sun.elevation * 10) / 10));
    return () => window.cancelAnimationFrame(frame);
  }, [sun?.elevation]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shadow through the day at this place, on the hour while the sun is up
  const dayTable = mode === "place" && placeValid && date
    ? Array.from({ length: 19 }, (_, i) => i + 4).map((hour) => {
        const at = `${String(hour).padStart(2, "0")}:00`;
        const p = sunPosition(localToUtc(date, at, place.timeZone), place.lat, place.lon);
        return { at, ...p };
      }).filter((r) => r.elevation > 0.5)
    : [];

  const locateMe = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPlaceIndex(-1);
        setCustomLat(pos.coords.latitude.toFixed(4));
        setCustomLon(pos.coords.longitude.toFixed(4));
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 10000 },
    );
  };

  const pickAngle = (angle: number) => {
    setMode("angle");
    setSunAngle(angle);
  };

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
    setMode("angle");
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
    setMode("angle");
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

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="How to set the sun angle">
                {([["angle", "Enter sun angle"], ["place", "Use date, time & place"]] as const).map(([m, label]) => (
                  <button
                    key={m}
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      mode === m ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {mode === "place" && (
                <div className="space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="text-sm text-gray-700">
                      Place
                      <select
                        value={placeIndex}
                        onChange={(e) => setPlaceIndex(parseInt(e.target.value))}
                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg bg-white"
                      >
                        {PLACES.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
                        <option value={-1}>Custom coordinates</option>
                      </select>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="text-sm text-gray-700">
                        Date
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full px-2 py-2 border border-gray-200 rounded-lg bg-white" />
                      </label>
                      <label className="text-sm text-gray-700">
                        Local time
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full px-2 py-2 border border-gray-200 rounded-lg bg-white" />
                      </label>
                    </div>
                  </div>
                  {placeIndex === -1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-end">
                      <label className="text-sm text-gray-700">
                        Latitude
                        <input inputMode="decimal" value={customLat} onChange={(e) => setCustomLat(e.target.value)} placeholder="51.5074" className="mt-1 w-full px-2 py-2 border border-gray-200 rounded-lg bg-white" />
                      </label>
                      <label className="text-sm text-gray-700">
                        Longitude
                        <input inputMode="decimal" value={customLon} onChange={(e) => setCustomLon(e.target.value)} placeholder="-0.1278" className="mt-1 w-full px-2 py-2 border border-gray-200 rounded-lg bg-white" />
                      </label>
                      <button
                        onClick={locateMe}
                        className="col-span-2 sm:col-span-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:border-gray-300"
                      >
                        {locating ? "Locating…" : "Use my location"}
                      </button>
                      <p className="col-span-2 sm:col-span-3 text-xs text-gray-500">
                        North and east are positive. The time is read in your device&apos;s time zone ({place.timeZone}).
                      </p>
                    </div>
                  )}
                  {sun && (
                    <p className="text-sm text-gray-700">
                      {sunDown ? (
                        <>The sun is below the horizon at this time, so there is no shadow.</>
                      ) : (
                        <>
                          Sun <strong>{sun.elevation.toFixed(1)}°</strong> above the horizon, bearing{" "}
                          <strong>{Math.round(sun.azimuth)}° ({compassPoint(sun.azimuth)})</strong>. The shadow points{" "}
                          <strong>{compassPoint(sun.azimuth + 180)}</strong> ({Math.round((sun.azimuth + 180) % 360)}°).
                        </>
                      )}
                  {dayTable.length > 0 && parseFloat(objectHeight) > 0 && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-primary font-medium">Shadow through the day</summary>
                      <div className="overflow-x-auto mt-2">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-left text-gray-500">
                              <th className="py-1 pr-3 font-medium">Time</th>
                              <th className="py-1 pr-3 font-medium text-right">Sun</th>
                              <th className="py-1 pr-3 font-medium text-right">Shadow</th>
                              <th className="py-1 font-medium">Points</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {dayTable.map((r) => (
                              <tr key={r.at}>
                                <td className="py-1 pr-3 font-mono">{r.at}</td>
                                <td className="py-1 pr-3 font-mono text-right">{r.elevation.toFixed(1)}°</td>
                                <td className="py-1 pr-3 font-mono text-right">
                                  {formatNumber(parseFloat(objectHeight) / Math.tan((r.elevation * Math.PI) / 180), 1)} {getUnitLabel(unit)}
                                </td>
                                <td className="py-1">{compassPoint(r.azimuth + 180)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>
                  )}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sun Elevation Angle: {sunAngle}°
                </label>
                <input
                  type="range"
                  value={sunAngle}
                  onChange={(e) => pickAngle(parseInt(e.target.value))}
                  disabled={mode === "place"}
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
                  <span className="font-medium">{sunDown ? "The sun is below the horizon at this time and place." : error}</span>
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
                    pickAngle(45);
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
                    pickAngle(30);
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
                    pickAngle(60);
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

      <RelatedStrip />
      <ShadowLengthCalculatorSEO />
      <RelatedTools />
    </>
  );
}
