'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Copy, Shuffle, Download, Palette, Eye } from 'lucide-react';
import { HSLColor, ColorFormats, ColorPalette, PaletteType } from './types';
import { 
  getColorFormats, 
  generateRandomColor, 
  generatePalette, 
  exportColorData,
  formatHSL 
} from './logic';

export default function HSLColorSlider() {
  const [color, setColor] = useState<HSLColor>({ h: 210, s: 60, l: 50 });
  const [history, setHistory] = useState<HSLColor[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string>('');

  const formats = getColorFormats(color);

  const updateColor = useCallback((newColor: HSLColor) => {
    setColor(newColor);
    setHistory(prev => {
      const filtered = prev.filter(c => 
        !(c.h === newColor.h && c.s === newColor.s && c.l === newColor.l)
      );
      return [newColor, ...filtered].slice(0, 8);
    });
  }, []);

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateRandomHSL = () => {
    updateColor(generateRandomColor());
  };

  const generateColorPalette = (type: PaletteType) => {
    const palette = generatePalette(color, type);
    setSelectedPalette(palette);
  };

  const exportData = () => {
    const data = exportColorData(color, selectedPalette || undefined);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hsl-color-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const ColorPreview = ({ hslColor, size = 'large' }: { hslColor: HSLColor; size?: 'small' | 'large' }) => (
    <div 
      className={`rounded-xl border-2 border-gray-200 ${size === 'large' ? 'h-32' : 'h-16 w-16'}`}
      style={{ backgroundColor: formatHSL(hslColor) }}
    />
  );

  const SliderInput = ({ 
    label, 
    value, 
    max, 
    onChange, 
    gradient 
  }: { 
    label: string; 
    value: number; 
    max: number; 
    onChange: (value: number) => void;
    gradient?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
          type="number"
          value={Math.round(value)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
          min="0"
          max={max}
        />
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-6 rounded-lg appearance-none cursor-pointer slider"
          style={{ background: gradient }}
        />
      </div>
    </div>
  );

  const hueGradient = 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';
  const saturationGradient = `linear-gradient(to right, hsl(${color.h}, 0%, ${color.l}%), hsl(${color.h}, 100%, ${color.l}%))`;
  const lightnessGradient = `linear-gradient(to right, hsl(${color.h}, ${color.s}%, 0%), hsl(${color.h}, ${color.s}%, 50%), hsl(${color.h}, ${color.s}%, 100%))`;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">HSL Color Slider</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore colors using interactive HSL sliders. Adjust hue, saturation, and lightness to generate perfect colors for your designs.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Color Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Color Preview</h3>
            <ColorPreview hslColor={color} />
            <div className="mt-4 text-center">
              <span className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
                {formatHSL(color)}
              </span>
            </div>
          </div>

          {/* HSL Sliders */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold">HSL Controls</h3>
            
            <SliderInput
              label="Hue"
              value={color.h}
              max={360}
              onChange={(h) => updateColor({ ...color, h })}
              gradient={hueGradient}
            />
            
            <SliderInput
              label="Saturation (%)"
              value={color.s}
              max={100}
              onChange={(s) => updateColor({ ...color, s })}
              gradient={saturationGradient}
            />
            
            <SliderInput
              label="Lightness (%)"
              value={color.l}
              max={100}
              onChange={(l) => updateColor({ ...color, l })}
              gradient={lightnessGradient}
            />

            <button
              onClick={generateRandomHSL}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              Generate Random Color
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          {/* Color Formats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Color Formats</h3>
            <div className="space-y-3">
              {Object.entries(formats).map(([format, value]) => (
                <div key={format} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-600 uppercase">{format}</span>
                    <div className="font-mono text-sm">{value}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, format)}
                    className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedFormat === format ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* UI Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">UI Preview</h3>
            <div className="space-y-4">
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: formatHSL(color) }}
              >
                Button Example
              </button>
              <div 
                className="p-4 rounded-lg border-l-4"
                style={{ 
                  borderLeftColor: formatHSL(color),
                  backgroundColor: formatHSL({ ...color, l: 95 })
                }}
              >
                <p className="text-gray-700">Card with accent color</p>
              </div>
              <p className="text-gray-700">
                Text with <span style={{ color: formatHSL(color) }} className="font-medium">colored highlight</span>
              </p>
            </div>
          </div>

          {/* Color History */}
          {history.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Colors</h3>
              <div className="grid grid-cols-4 gap-2">
                {history.map((historyColor, index) => (
                  <button
                    key={index}
                    onClick={() => setColor(historyColor)}
                    className="aspect-square rounded-lg border-2 border-gray-200 hover:border-primary transition-colors"
                    style={{ backgroundColor: formatHSL(historyColor) }}
                    title={formatHSL(historyColor)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Color Palettes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Color Palettes</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(['analogous', 'triadic', 'tetradic', 'monochromatic', 'complementary'] as PaletteType[]).map((type) => (
            <button
              key={type}
              onClick={() => generateColorPalette(type)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors capitalize"
            >
              {type}
            </button>
          ))}
        </div>
        
        {selectedPalette && (
          <div className="space-y-3">
            <h4 className="font-medium">{selectedPalette.name} Palette</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedPalette.colors.map((paletteColor, index) => (
                <div key={index} className="text-center space-y-2">
                  <ColorPreview hslColor={paletteColor} size="small" />
                  <div className="text-xs font-mono text-gray-600">
                    {formatHSL(paletteColor)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Export */}
      <div className="text-center">
        <button
          onClick={exportData}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Color Data
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #ccc;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #ccc;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}