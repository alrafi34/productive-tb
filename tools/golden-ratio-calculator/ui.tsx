'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Copy, Check, Download, Grid, Type, Maximize2, Code, Sparkles } from 'lucide-react';
import { GoldenRatioResult, CalculationMode, TypographyScale, SpacingScale, LayoutSplit, CSSOutput } from './types';
import {
  PHI,
  calculateGoldenRatio,
  calculateFromSmallPart,
  calculateFromLargePart,
  parseInputValue,
  generateTypographyScale,
  generateSpacingScale,
  calculateLayoutSplit,
  generateCSS,
  generateSpiralPoints,
  exportAsJSON,
  exportAsText,
  COMMON_VALUES
} from './logic';
import GoldenRatioCalculatorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

type Tab = 'calculator' | 'typography' | 'spacing' | 'layout';

export default function GoldenRatioCalculatorUI() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  
  // Calculator state
  const [input, setInput] = useState<string>('1000');
  const [mode, setMode] = useState<CalculationMode>('forward');
  const [result, setResult] = useState<GoldenRatioResult | null>(null);
  
  // Typography state
  const [typographyBase, setTypographyBase] = useState<string>('16');
  const [typographyScale, setTypographyScale] = useState<TypographyScale | null>(null);
  
  // Spacing state
  const [spacingBase, setSpacingBase] = useState<string>('8');
  const [spacingScale, setSpacingScale] = useState<SpacingScale | null>(null);
  
  // Layout state
  const [layoutWidth, setLayoutWidth] = useState<string>('1440');
  const [layoutSplit, setLayoutSplit] = useState<LayoutSplit | null>(null);
  
  // CSS output
  const [cssOutput, setCssOutput] = useState<CSSOutput | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  
  // Canvas ref for spiral
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate on input change
  useEffect(() => {
    if (!input || input.trim() === '') {
      setResult(null);
      return;
    }

    const parsed = parseInputValue(input);
    if (isNaN(parsed.value) || parsed.value <= 0) {
      setResult(null);
      return;
    }

    let calculatedResult: GoldenRatioResult;
    
    switch (mode) {
      case 'forward':
        calculatedResult = calculateGoldenRatio(parsed.value);
        break;
      case 'reverse-small':
        calculatedResult = calculateFromSmallPart(parsed.value);
        break;
      case 'reverse-large':
        calculatedResult = calculateFromLargePart(parsed.value);
        break;
    }

    setResult(calculatedResult);
    
    // Generate CSS
    const css = generateCSS(calculatedResult.largePart, calculatedResult.smallPart, parsed.unit);
    setCssOutput(css);
  }, [input, mode]);

  // Generate typography scale
  useEffect(() => {
    const base = parseFloat(typographyBase);
    if (!isNaN(base) && base > 0) {
      const scale = generateTypographyScale(base);
      setTypographyScale(scale);
    }
  }, [typographyBase]);

  // Generate spacing scale
  useEffect(() => {
    const base = parseFloat(spacingBase);
    if (!isNaN(base) && base > 0) {
      const scale = generateSpacingScale(base);
      setSpacingScale(scale);
    }
  }, [spacingBase]);

  // Calculate layout split
  useEffect(() => {
    const width = parseFloat(layoutWidth);
    if (!isNaN(width) && width > 0) {
      const split = calculateLayoutSplit(width);
      setLayoutSplit(split);
    }
  }, [layoutWidth]);

  // Draw golden spiral
  useEffect(() => {
    if (!canvasRef.current || !result) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw golden rectangle
    ctx.fillStyle = '#f0fdf4';
    ctx.fillRect(0, 0, width, height);

    // Draw large section
    const largeWidth = width / PHI;
    ctx.fillStyle = '#dcfce7';
    ctx.fillRect(0, 0, largeWidth, height);

    // Draw border
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
    ctx.strokeRect(0, 0, largeWidth, height);

    // Draw spiral
    const points = generateSpiralPoints(width, height, 2);
    ctx.beginPath();
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 3;
    
    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    
    ctx.stroke();

    // Add labels
    ctx.fillStyle = '#15803d';
    ctx.font = 'bold 14px Inter';
    ctx.fillText('61.8%', largeWidth / 2 - 20, height / 2);
    ctx.fillText('38.2%', largeWidth + (width - largeWidth) / 2 - 20, height / 2);
  }, [result]);

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Golden Ratio Calculator
          </h1>
          <p className="text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Calculate perfect proportions using φ (1.618) for design and layout
          </p>
        </div>

        {/* Phi Info */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <div>
              <div className="font-semibold text-amber-900">Golden Ratio (φ)</div>
              <div className="text-sm text-amber-800">φ ≈ {PHI.toFixed(15)}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'calculator'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-5 h-5" />
            Calculator
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'typography'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Type className="w-5 h-5" />
            Typography
          </button>
          <button
            onClick={() => setActiveTab('spacing')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'spacing'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Grid className="w-5 h-5" />
            Spacing
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'layout'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Maximize2 className="w-5 h-5" />
            Layout
          </button>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Mode Selection */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Calculation Mode</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setMode('forward')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    mode === 'forward'
                      ? 'border-[#058554] bg-green-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-800">Forward</div>
                  <div className="text-sm text-slate-600">Total → Large + Small</div>
                </button>
                
                <button
                  onClick={() => setMode('reverse-small')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    mode === 'reverse-small'
                      ? 'border-[#058554] bg-green-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-800">From Small</div>
                  <div className="text-sm text-slate-600">Small → Total</div>
                </button>
                
                <button
                  onClick={() => setMode('reverse-large')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    mode === 'reverse-large'
                      ? 'border-[#058554] bg-green-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-800">From Large</div>
                  <div className="text-sm text-slate-600">Large → Total</div>
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#058554]" />
                {mode === 'forward' && 'Enter Total Value'}
                {mode === 'reverse-small' && 'Enter Small Part'}
                {mode === 'reverse-large' && 'Enter Large Part'}
              </h3>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="1000, 100px, 75%"
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-2xl font-mono text-center"
              />

              <div className="text-sm text-slate-600 text-center">
                Supports numbers, pixels (px), and percentages (%)
              </div>
            </div>

            {/* Results */}
            {result && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                    <div className="text-sm text-slate-600 mb-1">Total</div>
                    <div className="text-3xl font-bold text-slate-800">{result.total}</div>
                    <div className="text-sm text-slate-500 mt-1">100%</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm p-4 lg:p-6">
                    <div className="text-sm text-green-700 mb-1">Large Part</div>
                    <div className="text-3xl font-bold text-green-800">{result.largePart}</div>
                    <div className="text-sm text-green-600 mt-1">{result.largePercentage}%</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl shadow-sm p-4 lg:p-6">
                    <div className="text-sm text-blue-700 mb-1">Small Part</div>
                    <div className="text-3xl font-bold text-blue-800">{result.smallPart}</div>
                    <div className="text-sm text-blue-600 mt-1">{result.smallPercentage}%</div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Golden Ratio Visualization</h3>
                  
                  <div className="flex justify-center">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={371}
                      className="max-w-full h-auto border-2 border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="text-sm text-slate-600 text-center">
                    Golden rectangle with spiral visualization
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => copyToClipboard(`${result.largePart} / ${result.smallPart}`, 'result')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium"
                  >
                    {copied === 'result' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied === 'result' ? 'Copied!' : 'Copy Results'}
                  </button>
                  <button
                    onClick={() => exportAsJSON(result)}
                    className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                    title="Export as JSON"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => exportAsText(result)}
                    className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                    title="Export as TXT"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}

            {/* Common Values */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Common Values</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {COMMON_VALUES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(item.value.toString())}
                    className="p-3 text-left border-2 border-slate-200 rounded-lg hover:border-[#058554] hover:bg-green-50 transition-all"
                  >
                    <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                    <div className="text-xs text-slate-600">{item.value}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CSS Output */}
            {cssOutput && (
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#058554]" />
                  CSS Layout Code
                </h3>

                <div className="space-y-3">
                  {[
                    { label: 'CSS Grid', code: cssOutput.grid, id: 'grid' },
                    { label: 'Flexbox', code: cssOutput.flexbox, id: 'flexbox' },
                    { label: 'Percentage', code: cssOutput.percentage, id: 'percentage' },
                    { label: 'Pixels', code: cssOutput.pixels, id: 'pixels' }
                  ].map((item) => (
                    <div key={item.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                        <button
                          onClick={() => copyToClipboard(item.code, item.id)}
                          className="flex items-center gap-1 px-2 py-1 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                        >
                          {copied === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied === item.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                        {item.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Type className="w-5 h-5 text-[#058554]" />
                Golden Typography Scale
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Base Font Size (px)</label>
                <input
                  type="number"
                  value={typographyBase}
                  onChange={(e) => setTypographyBase(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-lg"
                  placeholder="16"
                />
              </div>

              {typographyScale && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  {typographyScale.sizes.map((size, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div
                        className="font-semibold text-slate-800"
                        style={{ fontSize: `${Math.min(size, 48)}px` }}
                      >
                        Sample Text
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-mono text-slate-700">{size}px</span>
                        <button
                          onClick={() => copyToClipboard(`${size}px`, `typo-${idx}`)}
                          className="p-2 text-[#058554] hover:bg-green-50 rounded transition-colors"
                        >
                          {copied === `typo-${idx}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Spacing Tab */}
        {activeTab === 'spacing' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Grid className="w-5 h-5 text-[#058554]" />
                Golden Spacing Scale
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Base Spacing (px)</label>
                <input
                  type="number"
                  value={spacingBase}
                  onChange={(e) => setSpacingBase(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-lg"
                  placeholder="8"
                />
              </div>

              {spacingScale && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  {spacingScale.values.map((value, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="bg-[#058554] rounded"
                          style={{ width: `${value}px`, height: '24px' }}
                        />
                        <span className="text-sm text-slate-600">Visual representation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-mono text-slate-700">{value}px</span>
                        <button
                          onClick={() => copyToClipboard(`${value}px`, `spacing-${idx}`)}
                          className="p-2 text-[#058554] hover:bg-green-50 rounded transition-colors"
                        >
                          {copied === `spacing-${idx}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-[#058554]" />
                Golden Layout Split
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Total Width (px)</label>
                <input
                  type="number"
                  value={layoutWidth}
                  onChange={(e) => setLayoutWidth(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-lg"
                  placeholder="1440"
                />
              </div>

              {layoutSplit && (
                <>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm text-green-700 mb-1">Main Content</div>
                      <div className="text-2xl font-bold text-green-800">{layoutSplit.mainWidth}px</div>
                      <div className="text-sm text-green-600 mt-1">{layoutSplit.mainPercentage}%</div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-700 mb-1">Sidebar</div>
                      <div className="text-2xl font-bold text-blue-800">{layoutSplit.sidebarWidth}px</div>
                      <div className="text-sm text-blue-600 mt-1">{layoutSplit.sidebarPercentage}%</div>
                    </div>
                  </div>

                  {/* Visual Layout Preview */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex gap-2" style={{ height: '200px' }}>
                      <div
                        className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-green-800 font-semibold"
                        style={{ flex: 1.618 }}
                      >
                        Main Content<br/>61.8%
                      </div>
                      <div
                        className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-blue-800 font-semibold"
                        style={{ flex: 1 }}
                      >
                        Sidebar<br/>38.2%
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <GoldenRatioCalculatorSEOContent />
      <RelatedTools
        currentTool="golden-ratio-calculator"
        tools={["aspect-ratio-calculator", "css-gradient-generator", "color-palette-generator"]}
      />
    </div>
  );
}
