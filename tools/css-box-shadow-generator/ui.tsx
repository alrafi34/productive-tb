"use client";

import { useState } from "react";
import { generateShadowCSS, generateMultipleShadows, PRESETS, Shadow } from "./logic";
import CSSBoxShadowGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CSSBoxShadowGeneratorUI() {
  const [shadows, setShadows] = useState<Shadow[]>([
    { x: 10, y: 10, blur: 20, spread: 0, color: '#000000', opacity: 0.3, inset: false }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgColor, setBgColor] = useState('#F3F4F6');
  const [borderRadius, setBorderRadius] = useState(8);
  const [copied, setCopied] = useState(false);

  const activeShadow = shadows[activeIndex];
  const shadowCSS = generateMultipleShadows(shadows);
  const cssCode = `box-shadow: ${shadowCSS};`;

  const updateShadow = (field: keyof Shadow, value: any) => {
    setShadows(shadows.map((s, i) => i === activeIndex ? { ...s, [field]: value } : s));
  };

  const addShadow = () => {
    setShadows([...shadows, { x: 0, y: 4, blur: 10, spread: 0, color: '#000000', opacity: 0.2, inset: false }]);
    setActiveIndex(shadows.length);
  };

  const removeShadow = (index: number) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((_, i) => i !== index));
      setActiveIndex(Math.max(0, activeIndex - 1));
    }
  };

  const applyPreset = (preset: Shadow) => {
    updateShadow('x', preset.x);
    updateShadow('y', preset.y);
    updateShadow('blur', preset.blur);
    updateShadow('spread', preset.spread);
    updateShadow('color', preset.color);
    updateShadow('opacity', preset.opacity);
    updateShadow('inset', preset.inset);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Shadow Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horizontal Offset: {activeShadow.x}px</label>
                <input type="range" min="-100" max="100" value={activeShadow.x} onChange={(e) => updateShadow('x', parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vertical Offset: {activeShadow.y}px</label>
                <input type="range" min="-100" max="100" value={activeShadow.y} onChange={(e) => updateShadow('y', parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blur Radius: {activeShadow.blur}px</label>
                <input type="range" min="0" max="200" value={activeShadow.blur} onChange={(e) => updateShadow('blur', parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spread Radius: {activeShadow.spread}px</label>
                <input type="range" min="-50" max="100" value={activeShadow.spread} onChange={(e) => updateShadow('spread', parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shadow Color</label>
                <div className="flex gap-2">
                  <input type="color" value={activeShadow.color} onChange={(e) => updateShadow('color', e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200" />
                  <input type="text" value={activeShadow.color} onChange={(e) => updateShadow('color', e.target.value)} className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opacity: {activeShadow.opacity.toFixed(2)}</label>
                <input type="range" min="0" max="1" step="0.01" value={activeShadow.opacity} onChange={(e) => updateShadow('opacity', parseFloat(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="inset" checked={activeShadow.inset} onChange={(e) => updateShadow('inset', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="inset" className="text-sm font-medium text-gray-700">Inset Shadow</label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Preview</h2>
              <div className="flex gap-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200" title="Background Color" />
              </div>
            </div>
            <div className="h-64 flex items-center justify-center p-8" style={{ backgroundColor: bgColor }}>
              <div className="w-48 h-48 bg-white" style={{ boxShadow: shadowCSS, borderRadius: `${borderRadius}px` }} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius: {borderRadius}px</label>
              <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Shadow Layers</h2>
            <button onClick={addShadow} className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors">+ Add Layer</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {shadows.map((shadow, i) => (
              <div key={i} className={`relative group px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${i === activeIndex ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setActiveIndex(i)}>
                <span className="text-sm font-semibold text-gray-700">Layer {i + 1}</span>
                {shadows.length > 1 && (
                  <button onClick={(e) => { e.stopPropagation(); removeShadow(i); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Shadow Presets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(PRESETS).map(([name, preset]) => (
              <button key={name} onClick={() => applyPreset(preset)} className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors">
                <div className="w-full h-16 bg-white rounded-lg mb-2" style={{ boxShadow: generateShadowCSS(preset) }} />
                <span className="text-xs font-semibold text-gray-700 capitalize">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>CSS Code</h2>
            <button onClick={copyToClipboard} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors">{copied ? '✓ Copied!' : '📋 Copy CSS'}</button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800 overflow-x-auto">{cssCode}</pre>
        </div>
      </div>
      
      <CSSBoxShadowGeneratorSEOContent />
      <RelatedTools currentTool="css-box-shadow-generator" tools={["css-gradient-generator", "color-palette-generator", "hex-to-rgb-converter"]} />
    </>
  );
}
