"use client";

import { useState, useEffect } from "react";
import { ButtonState, defaultState, generateCSS, generateTailwindClasses, generateDarkerColor, buttonPresets } from "./logic";
import CSSButtonGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CSSButtonGeneratorUI() {
  const [state, setState] = useState<ButtonState>(defaultState);
  const [showHover, setShowHover] = useState(false);
  const [hoverMode, setHoverMode] = useState<'manual' | 'realtime'>('realtime');
  const [copied, setCopied] = useState<string>("");

  // Auto-generate hover color when background changes
  useEffect(() => {
    if (state.bgColor !== "transparent") {
      setState(prev => ({ ...prev, hoverBg: generateDarkerColor(state.bgColor) }));
    }
  }, [state.bgColor]);

  const updateState = (field: keyof ButtonState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const applyPreset = (presetName: keyof typeof buttonPresets) => {
    const preset = buttonPresets[presetName];
    setState(prev => ({
      ...prev,
      ...preset,
      text: prev.text,
      fontSize: prev.fontSize,
      paddingY: prev.paddingY,
      paddingX: prev.paddingX,
      borderWidth: prev.borderWidth,
      borderStyle: prev.borderStyle,
      borderColor: prev.borderColor,
      transition: prev.transition
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const cssCode = generateCSS(state);
  const tailwindClasses = generateTailwindClasses(state);
  const htmlSnippet = `<button class="${tailwindClasses}">\n  ${state.text}\n</button>`;

  const shadowValues = {
    none: 'none',
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  };

  const buttonStyle = {
    background: showHover ? state.hoverBg : state.bgColor,
    color: state.textColor,
    fontSize: `${state.fontSize}px`,
    padding: `${state.paddingY}px ${state.paddingX}px`,
    borderRadius: `${state.borderRadius}px`,
    border: state.borderWidth > 0 ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}` : 'none',
    boxShadow: shadowValues[state.shadow],
    transition: `all ${state.transition}ms ease`,
    cursor: 'pointer'
  };

  // CSS for real hover effect
  const buttonHoverCSS = `
    .preview-button {
      background: ${state.bgColor};
      color: ${state.textColor};
      font-size: ${state.fontSize}px;
      padding: ${state.paddingY}px ${state.paddingX}px;
      border-radius: ${state.borderRadius}px;
      border: ${state.borderWidth > 0 ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}` : 'none'};
      box-shadow: ${shadowValues[state.shadow]};
      transition: all ${state.transition}ms ease;
      cursor: pointer;
    }
    .preview-button:hover {
      background: ${state.hoverBg} !important;
    }
  `;

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Button Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input 
                  type="text" 
                  value={state.text} 
                  onChange={(e) => updateState('text', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={state.bgColor === "transparent" ? "#3b82f6" : state.bgColor} 
                      onChange={(e) => updateState('bgColor', e.target.value)}
                      className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
                    />
                    <input 
                      type="text" 
                      value={state.bgColor} 
                      onChange={(e) => updateState('bgColor', e.target.value)}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={state.textColor} 
                      onChange={(e) => updateState('textColor', e.target.value)}
                      className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
                    />
                    <input 
                      type="text" 
                      value={state.textColor} 
                      onChange={(e) => updateState('textColor', e.target.value)}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size: {state.fontSize}px</label>
                <input 
                  type="range" 
                  min="12" 
                  max="28" 
                  value={state.fontSize} 
                  onChange={(e) => updateState('fontSize', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vertical Padding: {state.paddingY}px</label>
                  <input 
                    type="range" 
                    min="4" 
                    max="24" 
                    value={state.paddingY} 
                    onChange={(e) => updateState('paddingY', parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horizontal Padding: {state.paddingX}px</label>
                  <input 
                    type="range" 
                    min="8" 
                    max="48" 
                    value={state.paddingX} 
                    onChange={(e) => updateState('paddingX', parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius: {state.borderRadius}px</label>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={state.borderRadius} 
                  onChange={(e) => updateState('borderRadius', parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Preview</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setHoverMode(hoverMode === 'manual' ? 'realtime' : 'manual');
                    if (hoverMode === 'realtime') setShowHover(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    hoverMode === 'realtime' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {hoverMode === 'realtime' ? '🎯 Real Hover' : '👆 Enable Real'}
                </button>
                {hoverMode === 'manual' && (
                  <button 
                    onClick={() => setShowHover(!showHover)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showHover ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {showHover ? '🎯 Hover ON' : '👆 Show Hover'}
                  </button>
                )}
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              {hoverMode === 'realtime' ? (
                <>
                  <style dangerouslySetInnerHTML={{ __html: buttonHoverCSS }} />
                  <button className="preview-button">
                    {state.text}
                  </button>
                </>
              ) : (
                <button style={buttonStyle}>
                  {state.text}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Advanced Settings</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Width: {state.borderWidth}px</label>
              <input 
                type="range" 
                min="0" 
                max="5" 
                value={state.borderWidth} 
                onChange={(e) => updateState('borderWidth', parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Style</label>
              <select 
                value={state.borderStyle} 
                onChange={(e) => updateState('borderStyle', e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={state.borderColor} 
                  onChange={(e) => updateState('borderColor', e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
                />
                <input 
                  type="text" 
                  value={state.borderColor} 
                  onChange={(e) => updateState('borderColor', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Box Shadow</label>
              <select 
                value={state.shadow} 
                onChange={(e) => updateState('shadow', e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hover Background</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={state.hoverBg === "transparent" ? "#2563eb" : state.hoverBg} 
                  onChange={(e) => updateState('hoverBg', e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
                />
                <input 
                  type="text" 
                  value={state.hoverBg} 
                  onChange={(e) => updateState('hoverBg', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transition: {state.transition}ms</label>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="50"
                value={state.transition} 
                onChange={(e) => updateState('transition', parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Button Presets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(buttonPresets).map(([name, preset]) => (
              <button 
                key={name}
                onClick={() => applyPreset(name as keyof typeof buttonPresets)}
                className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div 
                  className="w-full h-12 rounded-lg mb-2 flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: preset.bgColor,
                    color: preset.textColor,
                    boxShadow: preset.shadow === 'small' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 
                              preset.shadow === 'medium' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                    borderRadius: `${preset.borderRadius}px`
                  }}
                >
                  Button
                </div>
                <span className="text-xs font-semibold text-gray-700 capitalize">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>CSS Code</h2>
              <button 
                onClick={() => copyToClipboard(cssCode, 'css')}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === 'css' ? '✓ Copied!' : '📋 Copy CSS'}
              </button>
            </div>
            <pre className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-800 overflow-x-auto h-48">{cssCode}</pre>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Tailwind Classes</h2>
              <button 
                onClick={() => copyToClipboard(tailwindClasses, 'tailwind')}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === 'tailwind' ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <pre className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-800 overflow-x-auto h-48 break-all">{tailwindClasses}</pre>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>HTML Snippet</h2>
              <button 
                onClick={() => copyToClipboard(htmlSnippet, 'html')}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === 'html' ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <pre className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-800 overflow-x-auto h-48">{htmlSnippet}</pre>
          </div>
        </div>
      </div>
      
      <CSSButtonGeneratorSEOContent />
      <RelatedTools currentTool="css-button-generator" tools={["css-box-shadow-generator", "css-gradient-generator", "color-palette-generator"]} />
    </>
  );
}