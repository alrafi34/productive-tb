'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Download, Palette, Sun, Moon, Sparkles, Code, FileCode, Sliders } from 'lucide-react';
import { ScrollbarStyles, PreviewMode } from './types';
import {
  DEFAULT_STYLES,
  SCROLLBAR_PRESETS,
  generateWebKitCSS,
  generateFirefoxCSS,
  generateBothCSS,
  generateCSSVariables,
  generateMinimalCSS,
  generateDarkModeStyles,
  downloadCSS,
  applyStylesToPreview,
  saveToHistory
} from './logic';
import CustomScrollbarStylerSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function CustomScrollbarStylerUI() {
  const [styles, setStyles] = useState<ScrollbarStyles>(DEFAULT_STYLES);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('light');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'webkit' | 'firefox' | 'both' | 'variables'>('both');
  
  const previewRef = useRef<HTMLDivElement>(null);

  // Apply styles to preview
  useEffect(() => {
    if (previewRef.current) {
      const currentStyles = previewMode === 'dark' ? generateDarkModeStyles(styles) : styles;
      applyStylesToPreview(previewRef.current, currentStyles);
    }
  }, [styles, previewMode]);

  // Update style value
  const updateStyle = <K extends keyof ScrollbarStyles>(key: K, value: ScrollbarStyles[K]) => {
    setStyles(prev => ({ ...prev, [key]: value }));
  };

  // Apply preset
  const applyPreset = (presetStyles: ScrollbarStyles) => {
    setStyles(presetStyles);
    saveToHistory(presetStyles);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Get current CSS based on active tab
  const getCurrentCSS = (): string => {
    const currentStyles = previewMode === 'dark' ? generateDarkModeStyles(styles) : styles;
    
    switch (activeTab) {
      case 'webkit':
        return generateWebKitCSS(currentStyles);
      case 'firefox':
        return generateFirefoxCSS(currentStyles);
      case 'variables':
        return generateCSSVariables(currentStyles);
      default:
        return generateBothCSS(currentStyles);
    }
  };

  const currentCSS = getCurrentCSS();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Custom Scrollbar Styler
          </h1>
          <p className="text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Design custom CSS scrollbars visually with live preview
          </p>
        </div>

        {/* Preview Mode Toggle */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPreviewMode('light')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              previewMode === 'light'
                ? 'bg-[#058554] text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sun className="w-4 h-4" />
            Light Mode
          </button>
          <button
            onClick={() => setPreviewMode('dark')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              previewMode === 'dark'
                ? 'bg-[#058554] text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark Mode
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Presets */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#058554]" />
                Preset Styles
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {SCROLLBAR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.styles)}
                    className="p-3 rounded-lg border-2 border-slate-200 hover:border-[#058554] hover:bg-green-50 transition-all text-left"
                  >
                    <div className="text-2xl mb-1">{preset.icon}</div>
                    <div className="text-sm font-semibold text-slate-800">{preset.name}</div>
                    <div className="text-xs text-slate-600">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollbar Size */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#058554]" />
                Scrollbar Size
              </h3>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Width</label>
                  <span className="text-sm font-mono text-slate-600">{styles.width}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={styles.width}
                  onChange={(e) => updateStyle('width', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                  style={{
                    background: `linear-gradient(to right, #058554 0%, #058554 ${((styles.width - 4) / 26) * 100}%, #e2e8f0 ${((styles.width - 4) / 26) * 100}%, #e2e8f0 100%)`
                  }}
                />
              </div>
            </div>

            {/* Track Styling */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Track Styling</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.trackBackground.startsWith('rgba') ? '#f1f1f1' : styles.trackBackground}
                    onChange={(e) => updateStyle('trackBackground', e.target.value)}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.trackBackground}
                    onChange={(e) => updateStyle('trackBackground', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                    placeholder="#f1f1f1"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Border Radius</label>
                  <span className="text-sm font-mono text-slate-600">{styles.trackBorderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={styles.trackBorderRadius}
                  onChange={(e) => updateStyle('trackBorderRadius', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                />
              </div>
            </div>

            {/* Thumb Styling */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Thumb Styling</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Thumb Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.thumbBackground}
                    onChange={(e) => updateStyle('thumbBackground', e.target.value)}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.thumbBackground}
                    onChange={(e) => updateStyle('thumbBackground', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                    placeholder="#888888"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hover Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.thumbHoverBackground}
                    onChange={(e) => updateStyle('thumbHoverBackground', e.target.value)}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.thumbHoverBackground}
                    onChange={(e) => updateStyle('thumbHoverBackground', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                    placeholder="#555555"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Border Radius</label>
                  <span className="text-sm font-mono text-slate-600">{styles.thumbBorderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={styles.thumbBorderRadius}
                  onChange={(e) => updateStyle('thumbBorderRadius', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Border Width</label>
                  <span className="text-sm font-mono text-slate-600">{styles.thumbBorder}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={styles.thumbBorder}
                  onChange={(e) => updateStyle('thumbBorder', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                />
              </div>
            </div>

            {/* Thumb Effects */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Thumb Effects</h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={styles.thumbShadow}
                    onChange={(e) => updateStyle('thumbShadow', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#058554] focus:ring-[#058554]"
                  />
                  <span className="text-sm font-medium text-slate-700">Add Shadow</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={styles.thumbGradient}
                    onChange={(e) => updateStyle('thumbGradient', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#058554] focus:ring-[#058554]"
                  />
                  <span className="text-sm font-medium text-slate-700">Gradient Background</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={styles.thumbInsetBorder}
                    onChange={(e) => updateStyle('thumbInsetBorder', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#058554] focus:ring-[#058554]"
                  />
                  <span className="text-sm font-medium text-slate-700">Glassmorphism Effect</span>
                </label>
              </div>
              
              {styles.thumbGradient && (
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gradient Start</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={styles.gradientStart}
                        onChange={(e) => updateStyle('gradientStart', e.target.value)}
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={styles.gradientStart}
                        onChange={(e) => updateStyle('gradientStart', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gradient End</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={styles.gradientEnd}
                        onChange={(e) => updateStyle('gradientEnd', e.target.value)}
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={styles.gradientEnd}
                        onChange={(e) => updateStyle('gradientEnd', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Preview & Export */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Live Preview</h3>
              
              <div
                ref={previewRef}
                id="scrollbar-preview"
                className={`h-96 overflow-y-scroll rounded-lg p-6 ${
                  previewMode === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'
                }`}
              >
                <h2 className="text-2xl font-bold mb-4">Custom Scrollbar Preview</h2>
                
                <p className="mb-4">
                  Scroll down to see your custom scrollbar in action. This preview updates in real-time as you adjust the settings.
                </p>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${previewMode === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className="font-semibold mb-2">Card Component</h3>
                    <p className="text-sm opacity-80">
                      This is a sample card to demonstrate how your scrollbar looks with different content types.
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${previewMode === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className="font-semibold mb-2">Code Block</h3>
                    <pre className="text-xs opacity-80">
{`function example() {
  console.log('Hello World');
  return true;
}`}
                    </pre>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${previewMode === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className="font-semibold mb-2">List Items</h3>
                    <ul className="text-sm opacity-80 space-y-1">
                      <li>• First item in the list</li>
                      <li>• Second item in the list</li>
                      <li>• Third item in the list</li>
                      <li>• Fourth item in the list</li>
                    </ul>
                  </div>
                  
                  <p className="opacity-80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  
                  <p className="opacity-80">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <p className="opacity-80">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  
                  <div className={`p-4 rounded-lg ${previewMode === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className="font-semibold mb-2">Another Card</h3>
                    <p className="text-sm opacity-80">
                      Keep scrolling to see more content and test the scrollbar behavior.
                    </p>
                  </div>
                  
                  <p className="opacity-80">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 text-center">
                Hover over the scrollbar to see the hover effect
              </p>
            </div>

            {/* Generated CSS */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Generated CSS</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(currentCSS, 'css')}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                  >
                    {copied === 'css' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'css' ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={() => downloadCSS(currentCSS)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              
              {/* CSS Format Tabs */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab('both')}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    activeTab === 'both'
                      ? 'bg-[#058554] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Both
                </button>
                <button
                  onClick={() => setActiveTab('webkit')}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    activeTab === 'webkit'
                      ? 'bg-[#058554] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  WebKit
                </button>
                <button
                  onClick={() => setActiveTab('firefox')}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    activeTab === 'firefox'
                      ? 'bg-[#058554] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Firefox
                </button>
                <button
                  onClick={() => setActiveTab('variables')}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    activeTab === 'variables'
                      ? 'bg-[#058554] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  CSS Variables
                </button>
              </div>
              
              <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">
                {currentCSS}
              </pre>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-3">
              <h3 className="font-semibold text-slate-800">Quick Export</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => copyToClipboard(generateMinimalCSS(styles), 'minimal')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                >
                  {copied === 'minimal' ? <Check className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                  Minimal CSS
                </button>
                
                <button
                  onClick={() => downloadCSS(generateBothCSS(styles))}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
                >
                  <FileCode className="w-4 h-4" />
                  Download CSS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomScrollbarStylerSEOContent />
      <RelatedTools
        currentTool="custom-scrollbar-styler"
        tools={["css-gradient-generator", "css-box-shadow-generator", "neumorphism-generator"]}
      />
    </div>
  );
}
