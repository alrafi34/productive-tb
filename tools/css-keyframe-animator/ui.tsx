'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Copy, Check, Download, Plus, Trash2, Sparkles, Settings, Code } from 'lucide-react';
import { Animation, Keyframe, KeyframeProperties, PreviewElement, ViewportSize, EasingPreset } from './types';
import {
  DEFAULT_ANIMATION,
  ANIMATION_PRESETS,
  generateId,
  generateCompleteCSS,
  generateKeyframesCSS,
  generateAnimationShorthand,
  generateSCSSMixin,
  exportAsJSON,
  downloadFile,
  generateTransform,
  snapToGrid,
  saveToHistory
} from './logic';
import CSSKeyframeAnimatorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function CSSKeyframeAnimatorUI() {
  const [animation, setAnimation] = useState<Animation>(DEFAULT_ANIMATION);
  const [selectedKeyframe, setSelectedKeyframe] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewElement, setPreviewElement] = useState<PreviewElement>('box');
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'complete' | 'keyframes' | 'shorthand' | 'scss'>('complete');
  
  const previewRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Update animation property
  const updateAnimation = <K extends keyof Animation>(key: K, value: Animation[K]) => {
    setAnimation(prev => ({ ...prev, [key]: value }));
  };

  // Add keyframe
  const addKeyframe = (percent: number = 50) => {
    const newKeyframe: Keyframe = {
      id: generateId(),
      percent: snapToGrid(percent, 5),
      properties: { translateX: 0, translateY: 0, scale: 1, rotate: 0, opacity: 1 }
    };
    
    setAnimation(prev => ({
      ...prev,
      keyframes: [...prev.keyframes, newKeyframe].sort((a, b) => a.percent - b.percent)
    }));
    
    setSelectedKeyframe(newKeyframe.id);
  };

  // Delete keyframe
  const deleteKeyframe = (id: string) => {
    if (animation.keyframes.length <= 2) return; // Keep at least 2 keyframes
    
    setAnimation(prev => ({
      ...prev,
      keyframes: prev.keyframes.filter(kf => kf.id !== id)
    }));
    
    if (selectedKeyframe === id) {
      setSelectedKeyframe(null);
    }
  };

  // Update keyframe percent
  const updateKeyframePercent = (id: string, percent: number) => {
    setAnimation(prev => ({
      ...prev,
      keyframes: prev.keyframes.map(kf =>
        kf.id === id ? { ...kf, percent: Math.max(0, Math.min(100, percent)) } : kf
      ).sort((a, b) => a.percent - b.percent)
    }));
  };

  // Update keyframe property
  const updateKeyframeProperty = <K extends keyof KeyframeProperties>(
    id: string,
    key: K,
    value: KeyframeProperties[K]
  ) => {
    setAnimation(prev => ({
      ...prev,
      keyframes: prev.keyframes.map(kf =>
        kf.id === id
          ? { ...kf, properties: { ...kf.properties, [key]: value } }
          : kf
      )
    }));
  };

  // Apply preset
  const applyPreset = (preset: typeof ANIMATION_PRESETS[0]) => {
    setAnimation(prev => ({
      ...prev,
      keyframes: preset.keyframes.map(kf => ({ ...kf, id: generateId() }))
    }));
    saveToHistory(animation);
  };

  // Play/pause animation
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Apply animation to preview element
  useEffect(() => {
    if (!previewRef.current) return;
    
    const element = previewRef.current;
    
    if (isPlaying) {
      // Generate and inject keyframes
      const styleId = 'keyframe-animation-style';
      let styleEl = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      
      const keyframesCSS = generateKeyframesCSS(animation);
      styleEl.textContent = keyframesCSS;
      
      // Apply animation
      const iteration = animation.iterationCount === 'infinite' ? 'infinite' : animation.iterationCount;
      element.style.animation = `${animation.name} ${animation.duration}s ${animation.timingFunction} ${animation.delay}s ${iteration} ${animation.direction} ${animation.fillMode}`;
    } else {
      element.style.animation = 'none';
      
      // Show first keyframe state
      if (animation.keyframes.length > 0) {
        const firstKf = animation.keyframes.find(kf => kf.percent === 0) || animation.keyframes[0];
        const transform = generateTransform(firstKf.properties);
        element.style.transform = transform;
        
        if (firstKf.properties.opacity !== undefined) {
          element.style.opacity = firstKf.properties.opacity.toString();
        }
        if (firstKf.properties.backgroundColor) {
          element.style.backgroundColor = firstKf.properties.backgroundColor;
        }
        if (firstKf.properties.borderRadius !== undefined) {
          element.style.borderRadius = `${firstKf.properties.borderRadius}px`;
        }
      }
    }
    
    return () => {
      if (previewRef.current) {
        previewRef.current.style.animation = 'none';
      }
    };
  }, [isPlaying, animation]);

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Get current CSS based on active tab
  const getCurrentCSS = (): string => {
    switch (activeTab) {
      case 'keyframes':
        return generateKeyframesCSS(animation);
      case 'shorthand':
        return generateAnimationShorthand(animation);
      case 'scss':
        return generateSCSSMixin(animation);
      default:
        return generateCompleteCSS(animation);
    }
  };

  const currentCSS = getCurrentCSS();
  const selectedKf = animation.keyframes.find(kf => kf.id === selectedKeyframe);

  // Get viewport width
  const getViewportWidth = () => {
    switch (viewportSize) {
      case 'mobile': return 375;
      case 'tablet': return 768;
      default: return 1024;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">


        {/* Animation Presets */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#058554]" />
            Animation Presets
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ANIMATION_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="p-3 rounded-lg border-2 border-slate-200 hover:border-[#058554] hover:bg-green-50 transition-all text-left"
              >
                <div className="text-2xl mb-1">{preset.icon}</div>
                <div className="text-sm font-semibold text-slate-800">{preset.name}</div>
                <div className="text-xs text-slate-600">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Preview & Timeline */}
          <div className="space-y-6">
            {/* Animation Preview */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Animation Preview</h3>
                <div className="flex gap-2">
                  <button
                    onClick={togglePlay}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isPlaying
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-[#058554] text-white hover:bg-[#047045]'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
              
              {/* Preview Element Type */}
              <div className="flex gap-2">
                {(['box', 'circle', 'text'] as PreviewElement[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPreviewElement(type)}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                      previewElement === type
                        ? 'bg-[#058554] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Viewport Size */}
              <div className="flex gap-2">
                {(['mobile', 'tablet', 'desktop'] as ViewportSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setViewportSize(size)}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                      viewportSize === size
                        ? 'bg-[#058554] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Preview Container */}
              <div
                className="relative bg-slate-50 rounded-lg overflow-hidden"
                style={{ width: '100%', maxWidth: `${getViewportWidth()}px`, height: '300px', margin: '0 auto' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    ref={previewRef}
                    className={`${
                      previewElement === 'circle' ? 'rounded-full' : 'rounded-lg'
                    } bg-[#058554] flex items-center justify-center text-white font-semibold`}
                    style={{
                      width: previewElement === 'text' ? 'auto' : '80px',
                      height: previewElement === 'text' ? 'auto' : '80px',
                      padding: previewElement === 'text' ? '20px 40px' : '0'
                    }}
                  >
                    {previewElement === 'text' && 'Animate'}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Editor */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Timeline Editor</h3>
                <button
                  onClick={() => addKeyframe(50)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Keyframe
                </button>
              </div>
              
              {/* Timeline */}
              <div className="relative">
                {/* Timeline bar */}
                <div className="h-2 bg-slate-200 rounded-full relative">
                  {/* Keyframe markers */}
                  {animation.keyframes.map((kf) => (
                    <button
                      key={kf.id}
                      onClick={() => setSelectedKeyframe(kf.id)}
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all ${
                        selectedKeyframe === kf.id
                          ? 'bg-[#058554] border-[#058554] scale-125'
                          : 'bg-white border-slate-400 hover:border-[#058554]'
                      }`}
                      style={{ left: `${kf.percent}%`, transform: 'translate(-50%, -50%)' }}
                      title={`${kf.percent}%`}
                    />
                  ))}
                </div>
                
                {/* Percentage labels */}
                <div className="flex justify-between mt-2 text-xs text-slate-600">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* Keyframe List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {animation.keyframes.sort((a, b) => a.percent - b.percent).map((kf) => (
                  <div
                    key={kf.id}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedKeyframe === kf.id
                        ? 'border-[#058554] bg-green-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedKeyframe(kf.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={kf.percent}
                          onChange={(e) => updateKeyframePercent(kf.id, parseInt(e.target.value) || 0)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-16 px-2 py-1 text-sm border border-slate-300 rounded"
                          min="0"
                          max="100"
                        />
                        <span className="text-sm font-medium text-slate-700">%</span>
                      </div>
                      
                      {animation.keyframes.length > 2 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteKeyframe(kf.id);
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Properties & Settings */}
          <div className="space-y-6">
            {/* Keyframe Properties */}
            {selectedKf && (
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#058554]" />
                  Keyframe Properties ({selectedKf.percent}%)
                </h3>
                
                <div className="space-y-4">
                  {/* Transform X */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Translate X</label>
                      <span className="text-sm font-mono text-slate-600">
                        {selectedKf.properties.translateX || 0}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={selectedKf.properties.translateX || 0}
                      onChange={(e) => updateKeyframeProperty(selectedKf.id, 'translateX', parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                    />
                  </div>
                  
                  {/* Transform Y */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Translate Y</label>
                      <span className="text-sm font-mono text-slate-600">
                        {selectedKf.properties.translateY || 0}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={selectedKf.properties.translateY || 0}
                      onChange={(e) => updateKeyframeProperty(selectedKf.id, 'translateY', parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                    />
                  </div>
                  
                  {/* Scale */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Scale</label>
                      <span className="text-sm font-mono text-slate-600">
                        {selectedKf.properties.scale || 1}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={selectedKf.properties.scale || 1}
                      onChange={(e) => updateKeyframeProperty(selectedKf.id, 'scale', parseFloat(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                    />
                  </div>
                  
                  {/* Rotate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Rotate</label>
                      <span className="text-sm font-mono text-slate-600">
                        {selectedKf.properties.rotate || 0}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-360"
                      max="360"
                      value={selectedKf.properties.rotate || 0}
                      onChange={(e) => updateKeyframeProperty(selectedKf.id, 'rotate', parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                    />
                  </div>
                  
                  {/* Opacity */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Opacity</label>
                      <span className="text-sm font-mono text-slate-600">
                        {selectedKf.properties.opacity !== undefined ? selectedKf.properties.opacity : 1}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={selectedKf.properties.opacity !== undefined ? selectedKf.properties.opacity : 1}
                      onChange={(e) => updateKeyframeProperty(selectedKf.id, 'opacity', parseFloat(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Animation Settings */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Animation Settings</h3>
              
              <div className="space-y-4">
                {/* Animation Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Animation Name</label>
                  <input
                    type="text"
                    value={animation.name}
                    onChange={(e) => updateAnimation('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="myAnimation"
                  />
                </div>
                
                {/* Duration */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Duration</label>
                    <span className="text-sm font-mono text-slate-600">{animation.duration}s</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={animation.duration}
                    onChange={(e) => updateAnimation('duration', parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                  />
                </div>
                
                {/* Delay */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Delay</label>
                    <span className="text-sm font-mono text-slate-600">{animation.delay}s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={animation.delay}
                    onChange={(e) => updateAnimation('delay', parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                  />
                </div>
                
                {/* Timing Function */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Easing</label>
                  <select
                    value={animation.timingFunction}
                    onChange={(e) => updateAnimation('timingFunction', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="linear">Linear</option>
                    <option value="ease">Ease</option>
                    <option value="ease-in">Ease In</option>
                    <option value="ease-out">Ease Out</option>
                    <option value="ease-in-out">Ease In Out</option>
                  </select>
                </div>
                
                {/* Iteration Count */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Iteration Count</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={animation.iterationCount === 'infinite' ? 1 : animation.iterationCount}
                      onChange={(e) => updateAnimation('iterationCount', parseInt(e.target.value) || 1)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      min="1"
                      disabled={animation.iterationCount === 'infinite'}
                    />
                    <button
                      onClick={() => updateAnimation('iterationCount', animation.iterationCount === 'infinite' ? 1 : 'infinite')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        animation.iterationCount === 'infinite'
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Infinite
                    </button>
                  </div>
                </div>
                
                {/* Direction */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Direction</label>
                  <select
                    value={animation.direction}
                    onChange={(e) => updateAnimation('direction', e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="normal">Normal</option>
                    <option value="reverse">Reverse</option>
                    <option value="alternate">Alternate</option>
                    <option value="alternate-reverse">Alternate Reverse</option>
                  </select>
                </div>
                
                {/* Fill Mode */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fill Mode</label>
                  <select
                    value={animation.fillMode}
                    onChange={(e) => updateAnimation('fillMode', e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="none">None</option>
                    <option value="forwards">Forwards</option>
                    <option value="backwards">Backwards</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Generated CSS */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#058554]" />
                  Generated CSS
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(currentCSS, 'css')}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                  >
                    {copied === 'css' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'css' ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={() => downloadFile(currentCSS, `${animation.name}.css`)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              
              {/* CSS Format Tabs */}
              <div className="flex gap-2 flex-wrap">
                {(['complete', 'keyframes', 'shorthand', 'scss'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-[#058554] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">
                {currentCSS}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <CSSKeyframeAnimatorSEOContent />
      <RelatedTools
        currentTool="css-keyframe-animator"
        tools={["css-animation-previewer", "css-gradient-generator", "css-box-shadow-generator"]}
      />
    </div>
  );
}
