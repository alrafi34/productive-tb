"use client";

import { useState } from "react";
import { generateLinearGradient, generateRadialGradient, reverseStops, generateRandomGradient, PRESETS, ColorStop } from "./logic";
import CSSGradientGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CSSGradientGeneratorUI() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [shape, setShape] = useState('circle');
  const [stops, setStops] = useState<ColorStop[]>([
    { color: '#FF7E5F', position: 0 },
    { color: '#FEB47B', position: 100 }
  ]);
  const [copied, setCopied] = useState(false);

  const gradient = type === 'linear' 
    ? generateLinearGradient(angle, stops)
    : generateRadialGradient(shape, stops);

  const cssCode = `background: ${gradient};`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addStop = () => {
    const newPos = stops.length > 0 ? stops[stops.length - 1].position + 10 : 50;
    setStops([...stops, { color: '#000000', position: Math.min(newPos, 100) }]);
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) setStops(stops.filter((_, i) => i !== index));
  };

  const updateStop = (index: number, field: 'color' | 'position', value: string | number) => {
    setStops(stops.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Type</label>
              <div className="flex gap-3">
                <button onClick={() => setType('linear')} className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${type === 'linear' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Linear</button>
                <button onClick={() => setType('radial')} className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${type === 'radial' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Radial</button>
              </div>
            </div>

            {type === 'linear' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Angle: {angle}°</label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
                <select value={shape} onChange={(e) => setShape(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="circle">Circle</option>
                  <option value="ellipse">Ellipse</option>
                  <option value="circle closest-side">Circle Closest Side</option>
                  <option value="circle farthest-corner">Circle Farthest Corner</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Preview</h2>
            <div className="flex gap-2">
              <button onClick={() => setStops(reverseStops(stops))} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors">🔄 Reverse</button>
              <button onClick={() => setStops(generateRandomGradient())} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors">🎲 Random</button>
            </div>
          </div>
          <div className="h-64 rounded-xl shadow-inner" style={{ background: gradient }} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Color Stops</h2>
            <button onClick={addStop} className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors">+ Add Stop</button>
          </div>
          <div className="space-y-3">
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="color" value={stop.color} onChange={(e) => updateStop(i, 'color', e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200" />
                <input type="text" value={stop.color} onChange={(e) => updateStop(i, 'color', e.target.value)} className="w-24 rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="range" min="0" max="100" value={stop.position} onChange={(e) => updateStop(i, 'position', parseInt(e.target.value))} className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
                <span className="text-xs font-semibold text-gray-600 w-12">{stop.position}%</span>
                {stops.length > 2 && (
                  <button onClick={() => removeStop(i)} className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-sm font-semibold transition-colors">×</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Gradient Presets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(PRESETS).map(([name, preset]) => (
              <button key={name} onClick={() => setStops(preset)} className="h-20 rounded-lg shadow-sm hover:scale-105 transition-transform border border-gray-200" style={{ background: generateLinearGradient(90, preset) }}>
                <span className="block bg-black/50 text-white text-xs font-semibold py-1 px-2 rounded-b-lg">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>CSS Code</h2>
            <button onClick={() => copyToClipboard(cssCode)} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors">{copied ? '✓ Copied!' : '📋 Copy CSS'}</button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800 overflow-x-auto">{cssCode}</pre>
        </div>
      </div>
      
      <CSSGradientGeneratorSEOContent />
      <RelatedTools currentTool="css-gradient-generator" tools={["color-palette-generator", "hex-to-rgb-converter", "duotone-filter"]} />
    </>
  );
}
