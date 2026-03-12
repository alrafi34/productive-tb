'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, Copy, Check, Download, Palette, Sparkles, Image as ImageIcon, Droplet, Sun, Moon, Zap, Eye, FileCode, FileJson, Trash2 } from 'lucide-react';
import { ExtractedColor, PaletteType, ExportFormat, GradientStyle, ContrastCheck } from './types';
import {
  extractDominantColors,
  resizeImage,
  generateLightPalette,
  generateDarkPalette,
  generateSaturatedPalette,
  generateMutedPalette,
  generateGradients,
  checkAccessibility,
  exportAsCSS,
  exportAsSCSS,
  exportAsJSON,
  exportAsTailwind,
  downloadFile,
  downloadPaletteImage,
  saveToHistory,
  getHistory,
  clearHistory
} from './logic';
import ColorPaletteExtractorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function ColorPaletteExtractorUI() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<PaletteType>('original');
  const [gradients, setGradients] = useState<GradientStyle[]>([]);
  const [contrastChecks, setContrastChecks] = useState<ContrastCheck[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Process image and extract colors
  const processImage = useCallback((file: File | string) => {
    setLoading(true);
    
    const img = new Image();
    img.onload = () => {
      try {
        // Resize for performance
        const canvas = resizeImage(img, 400);
        const ctx = canvas.getContext('2d')!;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Extract colors
        const extractedColors = extractDominantColors(imageData, 5);
        setColors(extractedColors);
        
        // Generate gradients
        const generatedGradients = generateGradients(extractedColors);
        setGradients(generatedGradients);
        
        // Check accessibility
        const checks = checkAccessibility(extractedColors);
        setContrastChecks(checks);
        
        // Save to history
        saveToHistory({
          colors: extractedColors,
          timestamp: Date.now()
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error processing image:', error);
        setLoading(false);
      }
    };
    
    if (typeof file === 'string') {
      img.src = file;
      setImage(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        img.src = result;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle paste from clipboard
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          processImage(file);
        }
        break;
      }
    }
  }, [processImage]);

  // Add paste listener
  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Get current palette colors
  const getCurrentPalette = (): string[] => {
    switch (selectedPalette) {
      case 'light':
        return generateLightPalette(colors);
      case 'dark':
        return generateDarkPalette(colors);
      case 'saturated':
        return generateSaturatedPalette(colors);
      case 'muted':
        return generateMutedPalette(colors);
      default:
        return colors.map(c => c.hex);
    }
  };

  // Export handlers
  const handleExport = (format: ExportFormat) => {
    let content = '';
    let filename = '';
    let type = 'text/plain';
    
    switch (format) {
      case 'css':
        content = exportAsCSS(colors);
        filename = 'palette.css';
        type = 'text/css';
        break;
      case 'scss':
        content = exportAsSCSS(colors);
        filename = 'palette.scss';
        type = 'text/plain';
        break;
      case 'json':
        content = exportAsJSON(colors);
        filename = 'palette.json';
        type = 'application/json';
        break;
      case 'tailwind':
        content = exportAsTailwind(colors);
        filename = 'tailwind.config.js';
        type = 'text/javascript';
        break;
    }
    
    downloadFile(content, filename, type);
  };

  const currentPalette = getCurrentPalette();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Color Palette Extractor
          </h1>
          <p className="text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Upload an image and extract dominant colors instantly
          </p>
        </div>

        {/* Upload Area */}
        {!image && (
          <div
            ref={dropZoneRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="bg-white rounded-xl shadow-sm p-8 lg:p-12 border-2 border-dashed border-slate-300 hover:border-[#058554] transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-[#058554]" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Upload Image</h3>
                <p className="text-slate-600 mb-4">
                  Click to browse or drag & drop your image here
                </p>
                <p className="text-sm text-slate-500">
                  Supports PNG, JPEG, WEBP, GIF • You can also paste from clipboard (Ctrl+V)
                </p>
              </div>
              
              <button className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium">
                Choose Image
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Image Preview & Results */}
        {image && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image & Controls */}
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">Uploaded Image</h3>
                  <button
                    onClick={() => {
                      setImage(null);
                      setColors([]);
                      setGradients([]);
                      setContrastChecks([]);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-slate-100">
                  <img src={image} alt="Uploaded" className="w-full h-auto" />
                </div>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Upload Different Image
                </button>
              </div>

              {/* Palette Variations */}
              {colors.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Palette Variations</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPalette('original')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedPalette === 'original'
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Palette className="w-5 h-5" />
                      Original
                    </button>
                    
                    <button
                      onClick={() => setSelectedPalette('light')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedPalette === 'light'
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Sun className="w-5 h-5" />
                      Light
                    </button>
                    
                    <button
                      onClick={() => setSelectedPalette('dark')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedPalette === 'dark'
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Moon className="w-5 h-5" />
                      Dark
                    </button>
                    
                    <button
                      onClick={() => setSelectedPalette('saturated')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedPalette === 'saturated'
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Zap className="w-5 h-5" />
                      Saturated
                    </button>
                    
                    <button
                      onClick={() => setSelectedPalette('muted')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedPalette === 'muted'
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Droplet className="w-5 h-5" />
                      Muted
                    </button>
                  </div>
                </div>
              )}

              {/* UI Preview */}
              {colors.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Live UI Preview</h3>
                  
                  <div className="space-y-3">
                    {/* Button Preview */}
                    <div>
                      <p className="text-xs text-slate-600 mb-2">Buttons</p>
                      <div className="flex gap-2 flex-wrap">
                        {currentPalette.slice(0, 3).map((color, idx) => (
                          <button
                            key={idx}
                            className="px-4 py-2 rounded-lg font-medium transition-all"
                            style={{ backgroundColor: color, color: '#fff' }}
                          >
                            Button
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Card Preview */}
                    <div>
                      <p className="text-xs text-slate-600 mb-2">Cards</p>
                      <div className="grid grid-cols-2 gap-2">
                        {currentPalette.slice(0, 2).map((color, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: color }}
                          >
                            <div className="w-full h-2 bg-white/30 rounded mb-2"></div>
                            <div className="w-3/4 h-2 bg-white/30 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Header Preview */}
                    <div>
                      <p className="text-xs text-slate-600 mb-2">Header</p>
                      <div
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: currentPalette[0] }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-20 h-3 bg-white/40 rounded"></div>
                          <div className="flex gap-2">
                            <div className="w-12 h-3 bg-white/40 rounded"></div>
                            <div className="w-12 h-3 bg-white/40 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Color Palette & Export */}
            <div className="space-y-6">
              {/* Extracted Colors */}
              {colors.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Extracted Colors</h3>
                    <button
                      onClick={() => downloadPaletteImage(colors)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download PNG
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {colors.map((color, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-16 h-16 rounded-lg shadow-sm flex-shrink-0"
                            style={{ backgroundColor: selectedPalette === 'original' ? color.hex : currentPalette[index] }}
                          />
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-semibold text-slate-800">
                                {selectedPalette === 'original' ? color.hex : currentPalette[index]}
                              </span>
                              <button
                                onClick={() => copyToClipboard(selectedPalette === 'original' ? color.hex : currentPalette[index], `hex-${index}`)}
                                className="p-1 hover:bg-slate-100 rounded transition-colors"
                              >
                                {copied === `hex-${index}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-slate-600" />
                                )}
                              </button>
                            </div>
                            
                            {selectedPalette === 'original' && (
                              <>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-600">
                                    rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, `rgb-${index}`)}
                                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                                  >
                                    {copied === `rgb-${index}` ? (
                                      <Check className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3 text-slate-600" />
                                    )}
                                  </button>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-600">
                                    hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, `hsl-${index}`)}
                                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                                  >
                                    {copied === `hsl-${index}` ? (
                                      <Check className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3 text-slate-600" />
                                    )}
                                  </button>
                                </div>
                                
                                <div className="text-xs text-slate-500">
                                  {color.percentage.toFixed(1)}% of image
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gradients */}
              {gradients.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Generated Gradients</h3>
                  
                  <div className="space-y-3">
                    {gradients.map((gradient, index) => (
                      <div key={index} className="space-y-2">
                        <div
                          className="w-full h-20 rounded-lg"
                          style={{ background: gradient.css }}
                        />
                        <div className="flex items-center justify-between">
                          <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                            {gradient.css}
                          </code>
                          <button
                            onClick={() => copyToClipboard(`background: ${gradient.css};`, `gradient-${index}`)}
                            className="p-1 hover:bg-slate-100 rounded transition-colors"
                          >
                            {copied === `gradient-${index}` ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility Check */}
              {contrastChecks.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Accessibility Check</h3>
                  
                  <div className="space-y-2">
                    {contrastChecks.slice(0, 5).map((check, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-6 h-6 rounded" style={{ backgroundColor: check.color1 }} />
                            <div className="w-6 h-6 rounded" style={{ backgroundColor: check.color2 }} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            {check.ratio}:1
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${check.wcagAA ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            AA {check.wcagAA ? '✓' : '✗'}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${check.wcagAAA ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            AAA {check.wcagAAA ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    WCAG AA requires 4.5:1 contrast ratio • AAA requires 7:1
                  </p>
                </div>
              )}

              {/* Export Options */}
              {colors.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Export Palette</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleExport('css')}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                    >
                      <FileCode className="w-5 h-5" />
                      CSS
                    </button>
                    
                    <button
                      onClick={() => handleExport('scss')}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all font-medium"
                    >
                      <FileCode className="w-5 h-5" />
                      SCSS
                    </button>
                    
                    <button
                      onClick={() => handleExport('json')}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
                    >
                      <FileJson className="w-5 h-5" />
                      JSON
                    </button>
                    
                    <button
                      onClick={() => handleExport('tailwind')}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all font-medium"
                    >
                      <FileCode className="w-5 h-5" />
                      Tailwind
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 border-4 border-[#058554] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-600">Extracting colors from your image...</p>
          </div>
        )}
      </div>

      <ColorPaletteExtractorSEOContent />
      <RelatedTools
        currentTool="color-palette-extractor"
        tools={["color-palette-generator", "hex-to-rgb-converter", "contrast-checker"]}
      />
    </div>
  );
}
