"use client";

import { useState } from "react";
import { 
  generateTriangleCSS, 
  generateTriangleStyle, 
  generateHTMLSnippet, 
  formatCSSForCopy,
  TRIANGLE_PRESETS,
  DIRECTION_LABELS,
  TriangleDirection,
  TriangleConfig 
} from "./logic";
import CSSTriangleGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CSSTriangleGeneratorUI() {
  const [direction, setDirection] = useState<TriangleDirection>('top');
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(20);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [className, setClassName] = useState('triangle');
  const [copied, setCopied] = useState('');

  const config: TriangleConfig = { direction, width, height, color };
  const triangleStyle = generateTriangleStyle(config);
  const cssCode = formatCSSForCopy(config, className);
  const htmlSnippet = generateHTMLSnippet(className);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const applyPreset = (preset: { width: number; height: number }) => {
    setWidth(preset.width);
    setHeight(preset.height);
  };

  const resetGenerator = () => {
    setDirection('top');
    setWidth(30);
    setHeight(20);
    setColor('#000000');
    setBgColor('#ffffff');
    setClassName('triangle');
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Triangle Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(DIRECTION_LABELS).map(([dir, label]) => (
                    <button
                      key={dir}
                      onClick={() => setDirection(dir as TriangleDirection)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        direction === dir 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width: {width}px</label>
                <input 
                  type="range" 
                  min="10" 
                  max="200" 
                  value={width} 
                  onChange={(e) => setWidth(parseInt(e.target.value))} 
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height: {height}px</label>
                <input 
                  type="range" 
                  min="10" 
                  max="200" 
                  value={height} 
                  onChange={(e) => setHeight(parseInt(e.target.value))} 
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Triangle Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)} 
                    className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200" 
                  />
                  <input 
                    type="text" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)} 
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CSS Class Name</label>
                <input 
                  type="text" 
                  value={className} 
                  onChange={(e) => setClassName(e.target.value)} 
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="triangle"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Preview</h2>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)} 
                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200" 
                  title="Background Color" 
                />
              </div>
            </div>
            <div 
              className="h-64 flex items-center justify-center rounded-lg border border-gray-200" 
              style={{ backgroundColor: bgColor }}
            >
              <div style={triangleStyle} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Size Presets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {Object.entries(TRIANGLE_PRESETS).map(([name, preset]) => (
              <button 
                key={name} 
                onClick={() => applyPreset(preset)} 
                className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors text-center"
              >
                <div className="flex items-center justify-center h-12 mb-2">
                  <div style={generateTriangleStyle({ direction, ...preset, color })} />
                </div>
                <span className="text-xs font-semibold text-gray-700 capitalize">{name}</span>
                <div className="text-xs text-gray-500">{preset.width}×{preset.height}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>CSS Code</h2>
            <button 
              onClick={() => copyToClipboard(cssCode, 'css')} 
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {copied === 'css' ? '✓ Copied!' : '📋 Copy CSS'}
            </button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800 overflow-x-auto">{cssCode}</pre>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>HTML Snippet</h2>
            <button 
              onClick={() => copyToClipboard(htmlSnippet, 'html')} 
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {copied === 'html' ? '✓ Copied!' : '📋 Copy HTML'}
            </button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800">{htmlSnippet}</pre>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h2>
            <button 
              onClick={resetGenerator} 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
            >
              🔄 Reset Generator
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              onClick={() => copyToClipboard(cssCode, 'css-action')} 
              className="px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {copied === 'css-action' ? '✓ CSS Copied!' : '📋 Copy CSS'}
            </button>
            <button 
              onClick={() => copyToClipboard(htmlSnippet, 'html-action')} 
              className="px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {copied === 'html-action' ? '✓ HTML Copied!' : '📄 Copy HTML'}
            </button>
            <button 
              onClick={() => copyToClipboard(`${cssCode}\n\n${htmlSnippet}`, 'both')} 
              className="px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {copied === 'both' ? '✓ Both Copied!' : '📦 Copy Both'}
            </button>
          </div>
        </div>
      </div>
      
      <CSSTriangleGeneratorSEOContent />
      <RelatedTools currentTool="css-triangle-generator" tools={["css-box-shadow-generator", "css-gradient-generator", "color-format-converter"]} />
    </>
  );
}