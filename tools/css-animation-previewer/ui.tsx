'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Copy, Play, RotateCcw, Pause } from 'lucide-react';
import { AnimationSettings, CubicBezierPoints } from './types';
import { 
  defaultSettings, 
  defaultCubicBezier, 
  timingFunctions,
  animationTypes,
  animationPresets,
  generateAnimationCSS,
  parseCubicBezier,
  generateCurvePoints
} from './logic';
import CSSAnimationPreviewerSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function CSSAnimationPreviewer() {
  const [settings, setSettings] = useState<AnimationSettings>(defaultSettings);
  const [cubicBezier, setCubicBezier] = useState<CubicBezierPoints>(defaultCubicBezier);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const animationElementRef = useRef<HTMLDivElement>(null);
  const animationKeyRef = useRef(0);

  const updateSetting = useCallback((key: keyof AnimationSettings, value: string | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateCubicBezier = useCallback((key: keyof CubicBezierPoints, value: number) => {
    setCubicBezier(prev => ({ ...prev, [key]: Math.max(0, Math.min(1, value)) }));
  }, []);

  const applyPreset = (preset: typeof animationPresets[0]) => {
    const parsed = parseCubicBezier(preset.timingFunction);
    if (parsed) {
      setCubicBezier(parsed);
      setSettings(prev => ({ ...prev, timingFunction: 'cubic-bezier' }));
    } else {
      setSettings(prev => ({ ...prev, timingFunction: preset.timingFunction }));
    }
  };

  const resetAnimation = () => {
    setSettings(defaultSettings);
    setCubicBezier(defaultCubicBezier);
  };

  const replayAnimation = () => {
    animationKeyRef.current += 1;
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  };

  const copyCSS = async () => {
    const css = generateAnimationCSS(settings, cubicBezier);
    try {
      await navigator.clipboard.writeText(css);
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const getAnimationStyle = (): React.CSSProperties => {
    if (!isPlaying) return {};
    
    const timingFunction = settings.timingFunction === 'cubic-bezier' 
      ? `cubic-bezier(${cubicBezier.x1}, ${cubicBezier.y1}, ${cubicBezier.x2}, ${cubicBezier.y2})`
      : settings.timingFunction;

    return {
      animationName: `animate${settings.animationType}`,
      animationDuration: `${settings.duration}s`,
      animationTimingFunction: timingFunction,
      animationDelay: `${settings.delay}s`,
      animationIterationCount: settings.iterationCount,
      animationDirection: settings.direction as any,
      animationFillMode: 'both'
    };
  };

  const CurveGraph = () => {
    const points = generateCurvePoints(cubicBezier);
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x * 200} ${200 - point.y * 200}`
    ).join(' ');

    return (
      <div className="bg-white p-3 sm:p-4 rounded-lg border">
        <h4 className="font-medium mb-2 text-sm sm:text-base">Curve Visualization</h4>
        <svg viewBox="0 0 200 200" className="w-full max-w-[200px] aspect-square border border-gray-200 mx-auto sm:mx-0">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#grid)" />
          <path d={pathData} fill="none" stroke="#059669" strokeWidth="2" />
          <circle cx={cubicBezier.x1 * 200} cy={200 - cubicBezier.y1 * 200} r="4" fill="#dc2626" />
          <circle cx={cubicBezier.x2 * 200} cy={200 - cubicBezier.y2 * 200} r="4" fill="#dc2626" />
        </svg>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 space-y-6 sm:space-y-8">

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Animation Preview */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
          {/* Preview Area */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Animation Preview</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={replayAnimation}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Replay
                </button>
              </div>
            </div>

            <div className="relative h-28 sm:h-32 bg-gray-50 rounded-lg overflow-hidden">
              <div
                key={animationKeyRef.current}
                ref={animationElementRef}
                className="absolute top-1/2 left-4 w-8 h-8 bg-primary rounded-lg transform -translate-y-1/2"
                style={getAnimationStyle()}
              />
            </div>
          </div>

          {/* CSS Output */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Generated CSS</h3>
            <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre">
              {generateAnimationCSS(settings, cubicBezier)}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={copyCSS}
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Copy className="w-4 h-4" />
                {copiedCSS ? 'Copied!' : 'Copy CSS'}
              </button>
              <button
                onClick={resetAnimation}
                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          {/* Timing Function */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Timing Function</h3>
            <div className="space-y-3">
              {timingFunctions.map((func) => (
                <button
                  key={func}
                  onClick={() => updateSetting('timingFunction', func)}
                  className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                    settings.timingFunction === func 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {func}
                </button>
              ))}
            </div>
          </div>

          {/* Cubic Bezier Editor */}
          {settings.timingFunction === 'cubic-bezier' && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Cubic Bezier Editor</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">X1</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={cubicBezier.x1}
                    onChange={(e) => updateCubicBezier('x1', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Y1</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cubicBezier.y1}
                    onChange={(e) => updateCubicBezier('y1', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">X2</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={cubicBezier.x2}
                    onChange={(e) => updateCubicBezier('x2', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Y2</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cubicBezier.y2}
                    onChange={(e) => updateCubicBezier('y2', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <CurveGraph />
            </div>
          )}

          {/* Animation Controls */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Animation Controls</h3>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Duration (seconds)</label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={settings.duration}
                onChange={(e) => updateSetting('duration', parseFloat(e.target.value))}
                className="w-full mt-1"
              />
              <span className="text-sm text-gray-600">{settings.duration}s</span>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Delay (seconds)</label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={settings.delay}
                onChange={(e) => updateSetting('delay', parseFloat(e.target.value))}
                className="w-full mt-1"
              />
              <span className="text-sm text-gray-600">{settings.delay}s</span>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Animation Type</label>
              <select
                value={settings.animationType}
                onChange={(e) => updateSetting('animationType', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              >
                {animationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Iteration Count</label>
              <select
                value={settings.iterationCount}
                onChange={(e) => updateSetting('iterationCount', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="infinite">Infinite</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Direction</label>
              <select
                value={settings.direction}
                onChange={(e) => updateSetting('direction', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="normal">Normal</option>
                <option value="reverse">Reverse</option>
                <option value="alternate">Alternate</option>
                <option value="alternate-reverse">Alternate Reverse</option>
              </select>
            </div>
          </div>

          {/* Presets */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Animation Presets</h3>
            <div className="space-y-2">
              {animationPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="w-full text-left px-3 py-2 text-xs sm:text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-xs text-gray-600">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes animatetranslate {
          from { transform: translateX(0); }
          to { transform: translateX(300px); }
        }
        @keyframes animatescale {
          from { transform: scale(1); }
          to { transform: scale(1.5); }
        }
        @keyframes animaterotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes animatefade {
          from { opacity: 1; }
          to { opacity: 0.3; }
        }
        @keyframes animatebounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
          100% { transform: translateY(0); }
        }
        @keyframes animateslide {
          from { transform: translateX(-100px); }
          to { transform: translateX(100px); }
        }
      `}</style>
      </div>

      <CSSAnimationPreviewerSEOContent />
      
      <RelatedTools
        currentTool="css-animation-previewer"
        tools={['css-filter-tester', 'css-gradient-generator', 'css-box-shadow-generator']}
      />
    </>
  );
}
