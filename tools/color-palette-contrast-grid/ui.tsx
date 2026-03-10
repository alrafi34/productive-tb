'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Copy, Plus, Minus, Eye, Download, Shuffle } from 'lucide-react';
import { PaletteColor, ContrastResult } from './types';
import { 
  defaultPalette,
  palettePresets,
  generateContrastGrid,
  sortContrastResults,
  filterContrastResults,
  generateColorPairCSS,
  generateCSSVariables,
  generateSCSSVariables,
  generateRandomPalette,
  generateId,
  getContrastRatio
} from './logic';
import ColorPaletteContrastGridSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function ColorPaletteContrastGrid() {
  const [palette, setPalette] = useState<PaletteColor[]>(defaultPalette);
  const [previewText, setPreviewText] = useState('Sample Text');
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [sortBy, setSortBy] = useState<'highest' | 'lowest' | 'accessible' | 'fail'>('highest');
  const [filterBy, setFilterBy] = useState<'all' | 'aaa' | 'aa' | 'accessible' | 'fail'>('all');
  const [selectedPair, setSelectedPair] = useState<ContrastResult | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const contrastResults = useMemo(() => {
    const results = generateContrastGrid(palette, textSize === 'large');
    const filtered = filterContrastResults(results, filterBy);
    return sortContrastResults(filtered, sortBy);
  }, [palette, textSize, sortBy, filterBy]);

  const addColor = () => {
    const newColor: PaletteColor = {
      id: generateId(),
      hex: '#ff0000',
      name: `Color ${palette.length + 1}`
    };
    setPalette([...palette, newColor]);
  };

  const removeColor = (id: string) => {
    if (palette.length > 2) {
      setPalette(palette.filter(color => color.id !== id));
    }
  };

  const updateColor = (id: string, hex: string) => {
    setPalette(palette.map(color => 
      color.id === id ? { ...color, hex } : color
    ));
  };

  const applyPreset = (preset: typeof palettePresets[0]) => {
    setPalette(preset.colors);
  };

  const generateRandom = () => {
    setPalette(generateRandomPalette(Math.floor(Math.random() * 4) + 4));
  };

  const copyCSS = async (css: string) => {
    try {
      await navigator.clipboard.writeText(css);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const getWCAGColor = (level: string) => {
    switch (level) {
      case 'AAA': return 'bg-green-600 text-white';
      case 'AA': return 'bg-green-500 text-white';
      case 'AA Large': return 'bg-yellow-500 text-black';
      default: return 'bg-red-500 text-white';
    }
  };

  const ContrastCell = ({ result }: { result: ContrastResult }) => (
    <div
      className="border border-gray-200 p-3 cursor-pointer hover:border-primary transition-colors min-h-24 flex flex-col justify-between"
      style={{ 
        color: result.textColor, 
        backgroundColor: result.backgroundColor 
      }}
      onClick={() => setSelectedPair(result)}
    >
      <div className="text-sm font-medium">{previewText}</div>
      <div className="mt-2">
        <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${getWCAGColor(result.wcagLevel)}`}>
          {result.wcagLevel}
        </div>
        <div className="text-xs mt-1 opacity-75">
          {result.ratio.toFixed(1)}:1
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Color Palette Contrast Grid</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test WCAG contrast ratios for all text and background color combinations in your palette.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Palette Editor */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Color Palette</h3>
                <div className="flex gap-2">
                  <button
                    onClick={generateRandom}
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                    title="Generate Random"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={addColor}
                    className="p-2 text-primary hover:text-primary/80 transition-colors"
                    title="Add Color"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {palette.map((color) => (
                  <div key={color.id} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => updateColor(color.id, e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => updateColor(color.id, e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded font-mono"
                    />
                    {palette.length > 2 && (
                      <button
                        onClick={() => removeColor(color.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Presets</h3>
              <div className="space-y-2">
                {palettePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Preview Text</label>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Text Size</label>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => setTextSize('normal')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                      textSize === 'normal' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setTextSize('large')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                      textSize === 'large' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    Large
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="highest">Highest Contrast</option>
                  <option value="lowest">Lowest Contrast</option>
                  <option value="accessible">Accessible Only</option>
                  <option value="fail">Failing Only</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Filter</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Combinations</option>
                  <option value="aaa">AAA Only</option>
                  <option value="aa">AA and Above</option>
                  <option value="accessible">Accessible</option>
                  <option value="fail">Failing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contrast Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Contrast Grid ({contrastResults.length} combinations)
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span>AAA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>AA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Large</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Fail</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {contrastResults.map((result, index) => (
                  <ContrastCell key={index} result={result} />
                ))}
              </div>
            </div>

            {/* Inspector Panel */}
            {selectedPair && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Color Pair Inspector</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300"
                          style={{ backgroundColor: selectedPair.textColor }}
                        />
                        <div>
                          <div className="text-sm font-medium">Text Color</div>
                          <div className="text-xs text-gray-600 font-mono">{selectedPair.textColor}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300"
                          style={{ backgroundColor: selectedPair.backgroundColor }}
                        />
                        <div>
                          <div className="text-sm font-medium">Background Color</div>
                          <div className="text-xs text-gray-600 font-mono">{selectedPair.backgroundColor}</div>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="text-sm font-medium">Contrast Ratio</div>
                        <div className="text-2xl font-bold text-primary">{selectedPair.ratio.toFixed(2)}:1</div>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${getWCAGColor(selectedPair.wcagLevel)}`}>
                          {selectedPair.wcagLevel}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">CSS Code</div>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                      {generateColorPairCSS(selectedPair.textColor, selectedPair.backgroundColor)}
                    </div>
                    <button
                      onClick={() => copyCSS(generateColorPairCSS(selectedPair.textColor, selectedPair.backgroundColor))}
                      className="flex items-center gap-2 mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {copiedCode ? 'Copied!' : 'Copy CSS'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Export Options */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Export Palette</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => copyCSS(generateCSSVariables(palette))}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy CSS Variables
                </button>
                <button
                  onClick={() => copyCSS(generateSCSSVariables(palette))}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy SCSS Variables
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorPaletteContrastGridSEOContent />
      
      <RelatedTools
        currentTool="color-palette-contrast-grid"
        tools={['contrast-checker', 'color-palette-generator', 'hsl-color-slider']}
      />
    </>
  );
}