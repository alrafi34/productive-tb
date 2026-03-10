"use client";

import { useState } from "react";
import { generateAnalogous, generateComplementary, generateTriadic, generateMonochromatic, generateTetradic, generateRandom, hexToRgb, rgbToHsl, getContrastRatio } from "./logic";
import ColorPaletteGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type PaletteType = 'analogous' | 'complementary' | 'triadic' | 'monochromatic' | 'tetradic' | 'random';

export default function ColorPaletteGeneratorUI() {
  const [baseColor, setBaseColor] = useState("#FF5733");
  const [paletteType, setPaletteType] = useState<PaletteType>('analogous');
  const [palette, setPalette] = useState<string[]>(generateAnalogous("#FF5733"));
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false]);
  const [copied, setCopied] = useState("");

  const generatePalette = (type: PaletteType, base: string) => {
    let newPalette: string[];
    switch (type) {
      case 'analogous': newPalette = generateAnalogous(base); break;
      case 'complementary': newPalette = generateComplementary(base); break;
      case 'triadic': newPalette = generateTriadic(base); break;
      case 'monochromatic': newPalette = generateMonochromatic(base); break;
      case 'tetradic': newPalette = generateTetradic(base); break;
      case 'random': newPalette = generateRandom(); break;
      default: newPalette = generateAnalogous(base);
    }
    setPalette(newPalette.map((color, i) => locked[i] ? palette[i] : color));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const exportCSS = () => `:root {\n${palette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
  const exportSCSS = () => palette.map((c, i) => `$color-${i + 1}: ${c};`).join('\n');
  const exportJSON = () => JSON.stringify(palette.reduce((acc, c, i) => ({ ...acc, [`color${i + 1}`]: c }), {}), null, 2);
  const exportTailwind = () => `colors: {\n${palette.map((c, i) => `  'palette-${i + 1}': '${c}',`).join('\n')}\n}`;

  const contrast = palette.length >= 2 ? getContrastRatio(palette[0], palette[1]) : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Color</label>
              <div className="flex gap-2">
                <input type="text" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-12 h-10 rounded-xl cursor-pointer border border-gray-200" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Palette Type</label>
              <select value={paletteType} onChange={(e) => setPaletteType(e.target.value as PaletteType)} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="analogous">Analogous</option>
                <option value="complementary">Complementary</option>
                <option value="triadic">Triadic</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="tetradic">Tetradic</option>
                <option value="random">Random</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={() => generatePalette(paletteType, baseColor)} className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors" style={{ fontFamily: "var(--font-heading)" }}>🎨 Generate Palette</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
          {palette.map((color, i) => {
            const rgb = hexToRgb(color);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-32 cursor-pointer relative group" style={{ backgroundColor: color }} onClick={() => copyToClipboard(color, `color-${i}`)}>
                  <button onClick={(e) => { e.stopPropagation(); setLocked(locked.map((l, idx) => idx === i ? !l : l)); }} className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all opacity-0 group-hover:opacity-100">
                    {locked[i] ? '🔒' : '🔓'}
                  </button>
                </div>
                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-gray-800">{color}</span>
                    <button onClick={() => copyToClipboard(color, `color-${i}`)} className="text-xs text-primary hover:text-primary-hover font-semibold">{copied === `color-${i}` ? '✓' : 'Copy'}</button>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
                  <div className="text-xs text-gray-500 font-mono">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Accessibility Check</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: palette[0] }} />
              <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: palette[1] }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Contrast Ratio: {contrast.toFixed(2)}:1</div>
              <div className="text-xs text-gray-600">{contrast >= 7 ? '✅ WCAG AAA' : contrast >= 4.5 ? '✅ WCAG AA' : '❌ Fails WCAG'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Gradient Preview</h2>
          <div className="h-24 rounded-lg shadow-sm mb-3" style={{ background: `linear-gradient(to right, ${palette.join(', ')})` }} />
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <code className="text-xs text-gray-800 flex-1 mr-2">linear-gradient(to right, {palette.join(', ')})</code>
            <button onClick={() => copyToClipboard(`linear-gradient(to right, ${palette.join(', ')})`, 'gradient')} className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors flex-shrink-0">{copied === 'gradient' ? '✓' : 'Copy'}</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Export Palette</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'CSS Variables', value: exportCSS(), type: 'css' },
              { label: 'SCSS Variables', value: exportSCSS(), type: 'scss' },
              { label: 'JSON', value: exportJSON(), type: 'json' },
              { label: 'Tailwind Config', value: exportTailwind(), type: 'tailwind' }
            ].map(({ label, value, type }) => (
              <div key={type}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <button onClick={() => copyToClipboard(value, type)} className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors">{copied === type ? '✓' : 'Copy'}</button>
                </div>
                <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-800 overflow-x-auto">{value}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <ColorPaletteGeneratorSEOContent />
      <RelatedTools currentTool="color-palette-generator" tools={["hex-to-rgb-converter", "duotone-filter", "favicon-generator"]} />
    </>
  );
}
