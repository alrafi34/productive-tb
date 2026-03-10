"use client";

import { useState, useEffect } from "react";
import { hexToRgb, rgbToHex, rgbToHsl, generatePalette } from "./logic";
import HexToRgbSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HexToRgbConverterUI() {
  const [hex, setHex] = useState("#FF5733");
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 });
  const [alpha, setAlpha] = useState(1);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const result = hexToRgb(hex);
    if (result) setRgb(result);
  }, []);

  const handleHexChange = (value: string) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) setRgb(result);
  };

  const handleRgbChange = (color: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [color]: value };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette = generatePalette(hex);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Input</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">HEX Color</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="#FF5733"
                />
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="w-14 h-11 rounded-xl cursor-pointer border border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Red: {rgb.r}</label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #000 0%, #ff0000 100%)` }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Green: {rgb.g}</label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #000 0%, #00ff00 100%)` }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blue: {rgb.b}</label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #000 0%, #0000ff 100%)` }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opacity: {alpha.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={alpha}
                  onChange={(e) => setAlpha(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Preview</h2>
            <div
              className="w-full h-48 rounded-xl mb-4 border-2 border-gray-200 shadow-inner"
              style={{ backgroundColor: hex, opacity: alpha }}
            />
            
            <div className="space-y-2">
              {[
                { label: 'HEX', value: hex, type: 'hex' },
                { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, type: 'rgb' },
                { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`, type: 'rgba' },
                { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, type: 'hsl' },
                { label: 'HSLA', value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`, type: 'hsla' },
              ].map(({ label, value, type }) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500 font-medium">{label}</div>
                    <div className="font-mono text-sm text-gray-800">{value}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, type)}
                    className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === type ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {palette && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Color Palette Generator</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {Object.entries(palette).map(([name, color]) => (
                <div key={name} className="text-center">
                  <div
                    className="h-20 rounded-lg mb-2 cursor-pointer hover:scale-105 transition-transform shadow-sm border border-gray-200"
                    style={{ backgroundColor: color }}
                    onClick={() => handleHexChange(color)}
                  />
                  <div className="text-xs font-medium capitalize text-gray-700">{name}</div>
                  <div className="text-xs text-gray-500 font-mono">{color}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Gradient Generator</h2>
          <div className="space-y-4">
            <div
              className="h-24 rounded-lg shadow-sm"
              style={{ background: `linear-gradient(to right, ${hex}, ${palette?.complementary || '#000000'})` }}
            />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <code className="text-sm text-gray-800 flex-1 mr-2">linear-gradient(to right, {hex}, {palette?.complementary})</code>
              <button
                onClick={() => copyToClipboard(`linear-gradient(to right, ${hex}, ${palette?.complementary})`, 'gradient')}
                className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied === 'gradient' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <HexToRgbSEOContent />
      
      <RelatedTools currentTool="hex-to-rgb-converter" tools={["image-compressor", "favicon-generator", "duotone-filter"]} />
    </>
  );
}
