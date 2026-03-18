'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Lock, Unlock, Shuffle, Download, Palette } from 'lucide-react';
import { ColorData, GeneratorState, GradientData } from './types';
import { 
  generateColorData,
  getColorFormats,
  isLightColor,
  generateRandomGradient,
  exportAsCSS,
  exportAsSCSS,
  exportAsJSON,
  exportAsTailwind,
  saveToHistory,
  getHistory,
  generateId
} from './logic';
import RandomHexColorGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function RandomHexColorGenerator() {
  const [state, setState] = useState<GeneratorState>({
    colors: [generateColorData('1')],
    paletteSize: 1,
    gradientMode: false,
    history: [],
    copiedColor: null
  });
  
  const [gradient, setGradient] = useState<GradientData | null>(null);

  // Load history on mount
  useEffect(() => {
    setState(prev => ({ ...prev, history: getHistory() }));
  }, []);

  // Spacebar event listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generateNewColors();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [state.colors, state.gradientMode]);

  const generateNewColors = useCallback(() => {
    if (state.gradientMode) {
      setGradient(generateRandomGradient());
      return;
    }

    setState(prev => {
      const newColors = prev.colors.map(color => 
        color.locked ? color : generateColorData(color.id)
      );
      
      // Save to history if any colors changed
      const hasChanges = newColors.some((color, index) => color.hex !== prev.colors[index].hex);
      if (hasChanges) {
        saveToHistory(newColors);
      }
      
      return {
        ...prev,
        colors: newColors,
        history: hasChanges ? getHistory() : prev.history
      };
    });
  }, [state.colors, state.gradientMode]);

  const setPaletteSize = (size: 1 | 3 | 5) => {
    setState(prev => {
      const newColors = Array.from({ length: size }, (_, i) => 
        prev.colors[i] || generateColorData(`${i + 1}`)
      );
      
      return {
        ...prev,
        paletteSize: size,
        colors: newColors
      };
    });
  };

  const toggleLock = (id: string) => {
    setState(prev => ({
      ...prev,
      colors: prev.colors.map(color => 
        color.id === id ? { ...color, locked: !color.locked } : color
      )
    }));
  };

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setState(prev => ({ ...prev, copiedColor: format }));
      setTimeout(() => setState(prev => ({ ...prev, copiedColor: null })), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadExport = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFromHistory = (hex: string) => {
    if (state.colors.length === 1) {
      setState(prev => ({
        ...prev,
        colors: [generateColorData('1', hex)]
      }));
    }
  };

  const toggleGradientMode = () => {
    setState(prev => ({ ...prev, gradientMode: !prev.gradientMode }));
    if (!state.gradientMode) {
      setGradient(generateRandomGradient());
    }
  };

  const mainColor = state.colors[0];
  const backgroundStyle = state.gradientMode && gradient 
    ? { background: gradient.css }
    : { backgroundColor: mainColor.hex };
  
  const textColor = state.gradientMode 
    ? 'white' 
    : isLightColor(mainColor.hex) ? 'black' : 'white';

  const ColorBlock = ({ color }: { color: ColorData }) => {
    const formats = getColorFormats(color);
    const isLight = isLightColor(color.hex);
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div 
          className="h-32 flex items-center justify-center text-2xl font-bold transition-colors duration-300"
          style={{ 
            backgroundColor: color.hex,
            color: isLight ? 'black' : 'white'
          }}
        >
          {color.hex}
        </div>
        
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => copyToClipboard(formats.hex, `hex-${color.id}`)}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              <Copy className="w-3 h-3" />
              {state.copiedColor === `hex-${color.id}` ? 'Copied!' : 'HEX'}
            </button>
            <button
              onClick={() => copyToClipboard(formats.rgb, `rgb-${color.id}`)}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              <Copy className="w-3 h-3" />
              {state.copiedColor === `rgb-${color.id}` ? 'Copied!' : 'RGB'}
            </button>
            <button
              onClick={() => copyToClipboard(formats.hsl, `hsl-${color.id}`)}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              <Copy className="w-3 h-3" />
              {state.copiedColor === `hsl-${color.id}` ? 'Copied!' : 'HSL'}
            </button>
          </div>
          
          <div className="text-xs text-gray-600 space-y-1">
            <div>RGB: {formats.rgb}</div>
            <div>HSL: {formats.hsl}</div>
          </div>
          
          <button
            onClick={() => toggleLock(color.id)}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              color.locked 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {color.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            {color.locked ? 'Locked' : 'Unlocked'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={backgroundStyle}
      >
        <div className="max-w-7xl mx-auto p-6 space-y-8">

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex bg-white bg-opacity-90 rounded-lg p-1">
              {([1, 3, 5] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setPaletteSize(size)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    state.paletteSize === size 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {size} Color{size > 1 ? 's' : ''}
                </button>
              ))}
            </div>
            
            <button
              onClick={toggleGradientMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                state.gradientMode 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100'
              }`}
            >
              <Palette className="w-4 h-4" />
              {state.gradientMode ? 'Gradient Mode' : 'Color Mode'}
            </button>
            
            <button
              onClick={generateNewColors}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-90 text-gray-700 rounded-lg hover:bg-opacity-100 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              Generate
            </button>
          </div>

          {/* Color Display */}
          {state.gradientMode && gradient ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Generated Gradient</h3>
                <div 
                  className="h-32 rounded-lg mb-4"
                  style={{ background: gradient.css }}
                />
                <div className="space-y-2">
                  <div className="font-mono text-sm bg-gray-100 p-3 rounded">
                    {gradient.css}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(gradient.css, 'gradient')}
                      className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {state.copiedColor === 'gradient' ? 'Copied!' : 'Copy CSS'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              state.paletteSize === 1 ? 'max-w-md mx-auto' :
              state.paletteSize === 3 ? 'grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto' :
              'grid-cols-1 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto'
            }`}>
              {state.colors.map((color) => (
                <ColorBlock key={color.id} color={color} />
              ))}
            </div>
          )}

          {/* Export Options */}
          {!state.gradientMode && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white bg-opacity-90 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Export Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    onClick={() => downloadExport(exportAsCSS(state.colors), 'colors.css')}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    CSS
                  </button>
                  <button
                    onClick={() => downloadExport(exportAsSCSS(state.colors), 'colors.scss')}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    SCSS
                  </button>
                  <button
                    onClick={() => downloadExport(exportAsJSON(state.colors), 'colors.json')}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    JSON
                  </button>
                  <button
                    onClick={() => downloadExport(exportAsTailwind(state.colors), 'tailwind.config.js')}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Tailwind
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {state.history.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-90 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Colors</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {state.history.slice(0, 20).map((hex, index) => (
                    <button
                      key={index}
                      onClick={() => loadFromHistory(hex)}
                      className="aspect-square rounded-lg border-2 border-white hover:border-gray-300 transition-colors"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <RandomHexColorGeneratorSEOContent />
      
      <RelatedTools
        currentTool="random-hex-color-generator"
        tools={['color-palette-generator', 'hsl-color-slider', 'gradient-text-generator']}
      />
    </>
  );
}