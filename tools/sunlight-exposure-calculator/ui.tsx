"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SurfaceType, SunlightCalculation } from "./types";
import {
  calculateSunlightExposure,
  getLocationPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  formatNumber,
  formatTime,
  validateInputs,
  debounce
} from "./logic";
import SunlightExposureCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SunlightExposureCalculatorUI() {
  const [latitude, setLatitude] = useState("23.8103");
  const [longitude, setLongitude] = useState("90.4125");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(12);
  const [buildingHeight, setBuildingHeight] = useState("10");
  const [buildingOrientation, setBuildingOrientation] = useState(180); // South-facing
  const [surfaceType, setSurfaceType] = useState<SurfaceType>("wall");
  
  const [calculation, setCalculation] = useState<SunlightCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const locationPresets = getLocationPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const height = parseFloat(buildingHeight);
      
      const validationError = validateInputs(lat, lon, height);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateSunlightExposure({
          latitude: lat,
          longitude: lon,
          date: new Date(date),
          time,
          buildingHeight: height,
          buildingOrientation,
          surfaceType
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [latitude, longitude, date, time, buildingHeight, buildingOrientation, surfaceType]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [latitude, longitude, date, time, buildingHeight, buildingOrientation, surfaceType, debouncedCalculate]);

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
    
    // Draw ground
    ctx.fillStyle = '#86efac';
    ctx.fillRect(0, height * 0.7, width, height * 0.3);
    
    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    const centerX = width / 2;
    const groundY = height * 0.7;
    
    // Building dimensions
    const buildingWidth = 60;
    const buildingHeightPx = calculation.inputs.buildingHeight * 5;
    const buildingX = centerX - buildingWidth / 2;
    const buildingY = groundY - buildingHeightPx;
    
    // Draw shadow if sun is visible
    if (calculation.shadowData.visible && calculation.sunPosition.elevation > 0) {
      const shadowLength = calculation.shadowData.length * 5;
      const shadowAngle = (calculation.shadowData.direction - 90) * (Math.PI / 180);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(buildingX, groundY);
      ctx.lineTo(buildingX + buildingWidth, groundY);
      ctx.lineTo(
        buildingX + buildingWidth + Math.cos(shadowAngle) * shadowLength,
        groundY + Math.sin(shadowAngle) * shadowLength
      );
      ctx.lineTo(
        buildingX + Math.cos(shadowAngle) * shadowLength,
        groundY + Math.sin(shadowAngle) * shadowLength
      );
      ctx.closePath();
      ctx.fill();
    }
    
    // Draw building
    const gradient = ctx.createLinearGradient(buildingX, buildingY, buildingX + buildingWidth, buildingY);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = gradient;
    ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeightPx);
    
    // Building outline
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.strokeRect(buildingX, buildingY, buildingWidth, buildingHeightPx);
    
    // Draw sun if visible
    if (calculation.sunPosition.elevation > 0) {
      const sunSize = 30;
      const maxDistance = Math.min(width, height) * 0.35;
      const elevationFactor = calculation.sunPosition.elevation / 90;
      const distance = maxDistance * (1 - elevationFactor * 0.7);
      
      const azimuthRad = (calculation.sunPosition.azimuth - 90) * (Math.PI / 180);
      const sunX = centerX + Math.cos(azimuthRad) * distance;
      const sunY = groundY - buildingHeightPx / 2 - Math.sin(azimuthRad) * distance * 0.5 - elevationFactor * maxDistance * 0.5;
      
      // Sun glow
      const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize);
      sunGradient.addColorStop(0, '#fbbf24');
      sunGradient.addColorStop(0.5, '#f59e0b');
      sunGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Sun core
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize * 0.6, 0, Math.PI * 2);
      ctx.fill();
      
      // Sun rays
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45) * (Math.PI / 180);
        const x1 = sunX + Math.cos(angle) * sunSize * 0.8;
        const y1 = sunY + Math.sin(angle) * sunSize * 0.8;
        const x2 = sunX + Math.cos(angle) * sunSize * 1.3;
        const y2 = sunY + Math.sin(angle) * sunSize * 1.3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
    
    // Draw compass
    const compassX = width - 50;
    const compassY = 50;
    const compassRadius = 30;
    
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(compassX, compassY, compassRadius, 0, Math.PI * 2);
    ctx.stroke();
    
    // North arrow
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - compassRadius + 5);
    ctx.lineTo(compassX - 5, compassY - compassRadius + 15);
    ctx.lineTo(compassX + 5, compassY - compassRadius + 15);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('N', compassX, compassY - compassRadius - 5);
    
  }, [calculation]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    
    const animate = () => {
      setTime(prev => {
        const next = prev + 0.1;
        return next >= 18 ? 6 : next;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const handleReset = () => {
    setLatitude("23.8103");
    setLongitude("90.4125");
    setDate(new Date().toISOString().split('T')[0]);
    setTime(12);
    setBuildingHeight("10");
    setBuildingOrientation(180);
    setSurfaceType("wall");
    setIsPlaying(false);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setLatitude(preset.latitude.toString());
    setLongitude(preset.longitude.toString());
  };

  const handleExportImage = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'sunlight-analysis.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      saveToHistory(calculation);
      setHistory(getHistory());
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SunlightCalculation) => {
    setLatitude(calc.inputs.latitude.toString());
    setLongitude(calc.inputs.longitude.toString());
    setDate(calc.inputs.date.toISOString().split('T')[0]);
    setTime(calc.inputs.time);
    setBuildingHeight(calc.inputs.buildingHeight.toString());
    setBuildingOrientation(calc.inputs.buildingOrientation);
    setSurfaceType(calc.inputs.surfaceType);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">☀️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Sunlight Exposure Calculator</h3>
              <p className="text-sm text-blue-800">
                Simulate sunlight exposure and shadow behavior on buildings. Visualize sun position, analyze shadows, and optimize architecture or solar panel placement.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Location</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitude (°)</label>
                <input
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                  placeholder="23.8103"
                  step="0.0001"
                  min="-90"
                  max="90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitude (°)</label>
                <input
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                  placeholder="90.4125"
                  step="0.0001"
                  min="-180"
                  max="180"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Building</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (m)</label>
                <input
                  type="number"
                  value={buildingHeight}
                  onChange={(e) => setBuildingHeight(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                  placeholder="10"
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orientation: {buildingOrientation}° ({getOrientationLabel(buildingOrientation)})
                </label>
                <input
                  type="range"
                  value={buildingOrientation}
                  onChange={(e) => setBuildingOrientation(parseInt(e.target.value))}
                  className="w-full"
                  min="0"
                  max="360"
                  step="15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surface Type</label>
                <select
                  value={surfaceType}
                  onChange={(e) => setSurfaceType(e.target.value as SurfaceType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="wall">Wall</option>
                  <option value="roof">Roof</option>
                  <option value="ground">Ground</option>
                </select>
              </div>
            </div>

            {/* Result Display */}
            {calculation && !error && calculation.sunPosition.elevation > 0 && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Sun Elevation
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.sunPosition.elevation, 1)}°
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Azimuth:</span>
                    <span className="font-semibold">{formatNumber(calculation.sunPosition.azimuth, 1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Shadow:</span>
                    <span className="font-semibold">{formatNumber(calculation.shadowData.length, 1)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Exposure:</span>
                    <span className="font-semibold">{formatNumber(calculation.exposurePercentage, 0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Intensity:</span>
                    <span className="font-semibold">{formatNumber(calculation.sunlightIntensity, 0)}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

            {calculation && calculation.sunPosition.elevation <= 0 && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 text-white">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌙</div>
                  <p className="font-semibold">Sun Below Horizon</p>
                  <p className="text-sm text-gray-400 mt-2">No sunlight at this time</p>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Visualization Canvas */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full"
                style={{ height: '400px' }}
              />
            </div>

            {/* Time Control */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Time Control
                </h3>
                <div className="text-2xl font-bold text-primary font-mono">
                  {formatTime(time)}
                </div>
              </div>
              
              <input
                type="range"
                value={time}
                onChange={(e) => setTime(parseFloat(e.target.value))}
                className="w-full"
                min="6"
                max="18"
                step="0.25"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={handleExportImage}
                  className="px-4 py-2.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📷 Export
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜
                </button>
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

            {/* Location Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Location Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {locationPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left text-sm"
                  >
                    {preset.name.split(',')[0]}
                  </button>
                ))}
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
                            {formatNumber(entry.calculation.sunPosition.elevation, 1)}° elevation
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTime(entry.calculation.inputs.time)} • 
                          {formatNumber(entry.calculation.exposurePercentage, 0)}% exposure
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

      <SunlightExposureCalculatorSEO />
      <RelatedTools
        currentTool="sunlight-exposure-calculator"
        tools={['building-height-calculator', 'room-area-calculator', 'plot-area-calculator']}
      />
    </>
  );
}

function getOrientationLabel(degrees: number): string {
  if (degrees >= 337.5 || degrees < 22.5) return "N";
  if (degrees >= 22.5 && degrees < 67.5) return "NE";
  if (degrees >= 67.5 && degrees < 112.5) return "E";
  if (degrees >= 112.5 && degrees < 157.5) return "SE";
  if (degrees >= 157.5 && degrees < 202.5) return "S";
  if (degrees >= 202.5 && degrees < 247.5) return "SW";
  if (degrees >= 247.5 && degrees < 292.5) return "W";
  return "NW";
}
