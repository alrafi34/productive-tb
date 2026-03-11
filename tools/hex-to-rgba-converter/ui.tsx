"use client";

import { useState, useEffect } from "react";
import {
  hexToRgba,
  rgbaToHex,
  rgbaToHsla,
  formatRgba,
  formatRgb,
  formatHsla,
  isValidHex,
  generateShades,
  generateOpacitySteps,
  generateTransparentGradient,
  generateCssUtilities,
  isLowOpacity,
  getContrastWarning,
  saveLastColor,
  loadLastColor
} from "./logic";
import HexToRgbaConverterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HexToRgbaConverterUI() {
  const [hexInput, setHexInput] = useState("#3498db");
  const [alpha, setAlpha] = useState(1);
  const [copied, setCopied] = useState("");
  const [activeTab, setActiveTab] = useState<"shades" | "opacity" | "gradient" | "css">("shades");

  useEffect(() => {
    const saved = loadLastColor();
    if (saved && isValidHex(saved)) {
      setHexInput(saved);
    }
  }, []);

  const rgba = hexToRgba(hexInput, alpha);
  const isValid = rgba !== null;
  const hsla = rgba ? rgbaToHsla(rgba) : null;
  const shades = rgba ? generateShades(rgba) : [];
  const opacitySteps = rgba ? generateOpacitySteps(rgba) : [];
  const gradient = rgba ? generateTransparentGradient(rgba) : "";
  const cssUtilities = rgba ? generateCssUtilities(rgba) : "";
  const warning = rgba ? getContrastWarning(rgba) : null;

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (isValidHex(value)) {
      saveLastColor(value);
    }
  };

  const handleColorPicker = (value: string) => {
    setHexInput(value);
    saveLastColor(value);
  };

  const copy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            HEX Color Input
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter HEX Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className={`flex-1 rounded-xl border ${isValid ? 'border-gray-200' : 'border-red-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono`}
                  placeholder="#3498db"
                />
                <input
                  type="color"
                  value={isValid ? rgbaToHex(rgba!) : "#000000"}
                  onChange={(e) => handleColorPicker(e.target.value)}
                  className="w-14 h-11 rounded-xl cursor-pointer border border-gray-200"
                />
              </div>
              {!isValid && hexInput && (
                <p className="text-xs text-red-500 mt-1">Invalid HEX format. Use #RGB, #RRGGBB, or #RRGGBBAA</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Supports: #RGB, #RRGGBB, #RRGGBBAA</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alpha Transparency: {alpha.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                className="w-full h-2.5 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-transparent to-primary"
                style={{ background: `linear-gradient(to right, transparent, ${isValid ? rgbaToHex(rgba!) : '#000'})` }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Transparent</span>
                <span>Opaque</span>
              </div>
              {isLowOpacity(alpha) && (
                <p className="text-xs text-amber-600 mt-1">⚠️ Very low opacity - color may be barely visible</p>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {isValid && (
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Solid Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Solid Background Preview
              </h3>
              <div
                className="h-48 rounded-xl border-2 border-gray-200 shadow-inner"
                style={{ backgroundColor: formatRgba(rgba!) }}
              />
            </div>

            {/* Transparent Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Transparency Preview
              </h3>
              <div
                className="h-48 rounded-xl border-2 border-gray-200 shadow-inner"
                style={{
                  backgroundColor: formatRgba(rgba!),
                  backgroundImage: `
                    linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
                    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
                    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
              />
            </div>
          </div>
        )}

        {/* Output Formats */}
        {isValid && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Output Formats
            </h2>
            
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { label: 'RGBA', value: formatRgba(rgba!), type: 'rgba' },
                { label: 'RGB', value: formatRgb(rgba!), type: 'rgb' },
                { label: 'HEX', value: rgbaToHex(rgba!), type: 'hex' },
                { label: 'HEX with Alpha', value: rgbaToHex(rgba!, true), type: 'hex-alpha' },
                { label: 'HSLA', value: formatHsla(hsla!), type: 'hsla' },
                { label: 'HSL', value: `hsl(${hsla!.h}, ${hsla!.s}%, ${hsla!.l}%)`, type: 'hsl' }
              ].map(({ label, value, type }) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 font-medium mb-0.5">{label}</div>
                    <div className="font-mono text-sm text-gray-800 truncate">{value}</div>
                  </div>
                  <button
                    onClick={() => copy(value, type)}
                    className="ml-3 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
                  >
                    {copied === type ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>

            {warning && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">💡 {warning}</p>
              </div>
            )}
          </div>
        )}

        {/* Advanced Features Tabs */}
        {isValid && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: 'shades', label: '🎨 Color Shades' },
                { id: 'opacity', label: '📊 Opacity Scale' },
                { id: 'gradient', label: '🌈 Gradient' },
                { id: 'css', label: '💻 CSS Utilities' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    activeTab === id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Shades Tab */}
            {activeTab === 'shades' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Lighter & Darker Shades
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {shades.map((shade, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div
                        className="h-24"
                        style={{ backgroundColor: formatRgba(shade.rgba) }}
                      />
                      <div className="p-3 bg-gray-50">
                        <div className="text-xs font-medium text-gray-700 mb-1">{shade.label}</div>
                        <div className="font-mono text-xs text-gray-600 mb-2">{formatRgba(shade.rgba)}</div>
                        <button
                          onClick={() => copy(formatRgba(shade.rgba), `shade-${i}`)}
                          className="w-full px-2 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors"
                        >
                          {copied === `shade-${i}` ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opacity Scale Tab */}
            {activeTab === 'opacity' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Full Opacity Scale (100% → 0%)
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {opacitySteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div
                        className="w-16 h-10 rounded border border-gray-200 flex-shrink-0"
                        style={{
                          backgroundColor: step.rgba,
                          backgroundImage: `
                            linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
                            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
                            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
                          `,
                          backgroundSize: '10px 10px',
                          backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 font-medium">{Math.round(step.alpha * 100)}%</div>
                        <div className="font-mono text-xs text-gray-800 truncate">{step.rgba}</div>
                      </div>
                      <button
                        onClick={() => copy(step.rgba, `opacity-${i}`)}
                        className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors flex-shrink-0"
                      >
                        {copied === `opacity-${i}` ? '✓' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gradient Tab */}
            {activeTab === 'gradient' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Transparent Gradient Generator
                </h3>
                <div
                  className="h-32 rounded-xl border-2 border-gray-200 shadow-inner mb-4"
                  style={{
                    background: gradient,
                    backgroundImage: `
                      ${gradient},
                      linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
                      linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
                      linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
                    `,
                    backgroundSize: 'auto, 20px 20px, 20px 20px, 20px 20px, 20px 20px',
                    backgroundPosition: '0 0, 0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                />
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <code className="flex-1 text-xs text-gray-800 break-all">{gradient}</code>
                  <button
                    onClick={() => copy(gradient, 'gradient')}
                    className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
                  >
                    {copied === 'gradient' ? '✓' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">Perfect for UI overlays, hero sections, and fade effects</p>
              </div>
            )}

            {/* CSS Utilities Tab */}
            {activeTab === 'css' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Ready-to-Use CSS Utility Classes
                </h3>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">
                    <code>{cssUtilities}</code>
                  </pre>
                  <button
                    onClick={() => copy(cssUtilities, 'css')}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    {copied === 'css' ? '✓ Copied' : 'Copy All'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Includes background, text, and border utilities with opacity variants
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <HexToRgbaConverterSEOContent />
      <RelatedTools
        currentTool="hex-to-rgba-converter"
        tools={["color-format-converter", "hex-to-rgb-converter", "css-gradient-generator"]}
      />
    </>
  );
}
