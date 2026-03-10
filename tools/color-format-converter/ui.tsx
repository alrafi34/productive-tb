"use client";

import { useState, useEffect } from "react";
import { hexToRgb, rgbToHex, rgbToHsl, rgbToCmyk, parseColorInput } from "./logic";
import ColorFormatConverterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ColorFormatConverterUI() {
  const [input, setInput] = useState("#FF5733");
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 });
  const [alpha, setAlpha] = useState(1);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const parsed = parseColorInput(input);
    if (parsed) setRgb(parsed);
  }, []);

  const handleInputChange = (value: string) => {
    setInput(value);
    const parsed = parseColorInput(value);
    if (parsed) {
      setRgb(parsed);
      const hex = rgbToHex(parsed.r, parsed.g, parsed.b);
      if (!history.includes(hex)) {
        setHistory([hex, ...history.slice(0, 9)]);
      }
    }
  };

  const handleRgbChange = (color: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [color]: value };
    setRgb(newRgb);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setInput(hex);
    if (!history.includes(hex)) {
      setHistory([hex, ...history.slice(0, 9)]);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: 'HEX', value: hex, type: 'hex' },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, type: 'rgb' },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`, type: 'rgba' },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, type: 'hsl' },
    { label: 'HSLA', value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`, type: 'hsla' },
    { label: 'CMYK', value: `cmyk(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})`, type: 'cmyk' }
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Input Color</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter HEX / RGB / HSL / CMYK</label>
              <div className="flex gap-2">
                <input type="text" value={input} onChange={(e) => handleInputChange(e.target.value)} className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="#FF5733" />
                <input type="color" value={hex} onChange={(e) => handleInputChange(e.target.value)} className="w-12 h-10 rounded-xl cursor-pointer border border-gray-200" />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Red: {rgb.r}</label>
                <input type="range" min="0" max="255" value={rgb.r} onChange={(e) => handleRgbChange('r', parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #000 0%, #ff0000 100%)` }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Green: {rgb.g}</label>
                <input type="range" min="0" max="255" value={rgb.g} onChange={(e) => handleRgbChange('g', parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #000 0%, #00ff00 100%)` }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blue: {rgb.b}</label>
                <input type="range" min="0" max="255" value={rgb.b} onChange={(e) => handleRgbChange('b', parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #000 0%, #0000ff 100%)` }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opacity: {alpha.toFixed(2)}</label>
                <input type="range" min="0" max="1" step="0.01" value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Preview</h2>
            <div className="h-64 rounded-xl border-2 border-gray-200 shadow-inner" style={{ backgroundColor: hex, opacity: alpha }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Color Formats</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {formats.map(({ label, value, type }) => (
              <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                  <div className="font-mono text-sm text-gray-800">{value}</div>
                </div>
                <button onClick={() => copyToClipboard(value, type)} className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors">{copied === type ? '✓' : 'Copy'}</button>
              </div>
            ))}
          </div>
          <button onClick={() => copyToClipboard(formats.map(f => `${f.label}: ${f.value}`).join('\n'), 'all')} className="mt-4 w-full px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors">{copied === 'all' ? '✓ Copied All!' : '📋 Copy All Formats'}</button>
        </div>

        {history.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Recent Colors</h2>
            <div className="flex gap-2 flex-wrap">
              {history.map((color, i) => (
                <button key={i} onClick={() => handleInputChange(color)} className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-primary hover:scale-110 transition-all" style={{ backgroundColor: color }} title={color} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Quick Gradient</h2>
          <div className="h-24 rounded-lg shadow-sm mb-3" style={{ background: `linear-gradient(to right, ${hex}, ${rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b)})` }} />
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <code className="text-xs text-gray-800 flex-1 mr-2">linear-gradient(to right, {hex}, {rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b)})</code>
            <button onClick={() => copyToClipboard(`linear-gradient(to right, ${hex}, ${rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b)})`, 'gradient')} className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors flex-shrink-0">{copied === 'gradient' ? '✓' : 'Copy'}</button>
          </div>
        </div>
      </div>
      
      <ColorFormatConverterSEOContent />
      <RelatedTools currentTool="color-format-converter" tools={["hex-to-rgb-converter", "color-palette-generator", "css-gradient-generator"]} />
    </>
  );
}
