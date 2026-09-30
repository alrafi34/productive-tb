"use client";

import { useState } from "react";
import { hexToRgb, rgbToHex, rgbToHsl, generatePalette, hexHasAlpha, parseRgb, hexSteps, rgbToUnit } from "./logic";
import HexToRgbSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function HexToRgbConverterUI() {
  const [hex, setHex] = useState("#FF5733");
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 });
  const [rgbText, setRgbText] = useState("255, 87, 51");
  const [copied, setCopied] = useState("");

  const hexValid = hexToRgb(hex) !== null;
  const rgbValid = parseRgb(rgbText) !== null;
  const solidHex = rgbToHex(rgb.r, rgb.g, rgb.b);

  const setFromRgb = (next: { r: number; g: number; b: number }) => {
    setRgb(next);
    setHex(rgbToHex(next.r, next.g, next.b));
    setRgbText(`${next.r}, ${next.g}, ${next.b}`);
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) {
      setRgb(result);
      setRgbText(`${result.r}, ${result.g}, ${result.b}`);
    }
  };

  const handleRgbTextChange = (value: string) => {
    setRgbText(value);
    const result = parseRgb(value);
    if (result) {
      setRgb(result);
      setHex(rgbToHex(result.r, result.g, result.b));
    }
  };

  const handleRgbChange = (color: 'r' | 'g' | 'b', value: number) => {
    setFromRgb({ ...rgb, [color]: value });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette = generatePalette(solidHex);
  const steps = hexSteps(rgb.r, rgb.g, rgb.b);

  const inputClass = "flex-1 min-w-0 rounded-xl border bg-white px-4 py-2.5 text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>HEX ⇄ RGB</h2>
            
            <div className="mb-4">
              <label htmlFor="hex-in" className="block text-sm font-medium text-gray-700 mb-2">HEX color</label>
              <div className="flex gap-2">
                <input
                  id="hex-in"
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className={`${inputClass} ${hexValid ? "border-gray-200" : "border-red-300"}`}
                  placeholder="#FF5733"
                  spellCheck={false}
                />
                <input
                  type="color"
                  value={solidHex.toLowerCase()}
                  onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
                  aria-label="Pick a color"
                  className="w-14 h-11 rounded-xl cursor-pointer border border-gray-200"
                />
              </div>
              {!hexValid && hex.trim() !== "" && (
                <p className="text-xs text-red-500 mt-1">Use 3 or 6 hex digits (0–9, A–F), e.g. #F53 or #FF5733.</p>
              )}
              {hexValid && hexHasAlpha(hex) && (
                <p className="text-xs text-amber-700 mt-1" data-testid="hex-alpha-note">
                  The last digits are transparency, which RGB cannot hold. Use the <a href="/tools/design/hex-to-rgba-converter" className="underline">HEX to RGBA converter</a> to keep it.
                </p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="rgb-in" className="block text-sm font-medium text-gray-700 mb-2">RGB color</label>
              <input
                id="rgb-in"
                type="text"
                value={rgbText}
                onChange={(e) => handleRgbTextChange(e.target.value)}
                className={`${inputClass} w-full ${rgbValid ? "border-gray-200" : "border-red-300"}`}
                placeholder="255, 87, 51"
                spellCheck={false}
              />
              {!rgbValid && rgbText.trim() !== "" && (
                <p className="text-xs text-red-500 mt-1">Enter three whole numbers from 0 to 255, e.g. 255, 87, 51 or rgb(255 87 51).</p>
              )}
            </div>

            <div className="space-y-3">
              {([
                ['r', 'Red', '#ff0000'],
                ['g', 'Green', '#00ff00'],
                ['b', 'Blue', '#0000ff'],
              ] as const).map(([key, label, end]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}: {rgb[key]}</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb[key]}
                    onChange={(e) => handleRgbChange(key, parseInt(e.target.value))}
                    aria-label={label}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #000 0%, ${end} 100%)` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Result</h2>
            <div
              className="w-full h-32 rounded-xl mb-4 border-2 border-gray-200 shadow-inner"
              style={{ backgroundColor: solidHex }}
            />
            
            <div className="space-y-2">
              {[
                { label: 'HEX', value: solidHex, type: 'hex' },
                { label: 'RGB (CSS)', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, type: 'rgb' },
                { label: 'RGB (modern CSS, space-separated)', value: `rgb(${rgb.r} ${rgb.g} ${rgb.b})`, type: 'rgb4' },
                { label: 'RGB 0–1 (Unity, SwiftUI, OpenGL)', value: rgbToUnit(rgb.r, rgb.g, rgb.b), type: 'unit' },
                { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, type: 'hsl' },
              ].map(({ label, value, type }) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 font-medium">{label}</div>
                    <div className="font-mono text-sm text-gray-800 truncate" data-testid={`out-${type}`}>{value}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, type)}
                    className="ml-3 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === type ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Need HSV, CMYK or CSS color names? Try the <a href="/tools/design/color-format-converter" className="underline">color format converter</a>.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Step by Step: {solidHex} → rgb({rgb.r}, {rgb.g}, {rgb.b})</h2>
          <div className="grid sm:grid-cols-3 gap-3" data-testid="hex-steps">
            {steps.map((st) => (
              <div key={st.channel} className="p-4 bg-gray-50 rounded-lg border border-gray-100 font-mono text-sm text-gray-800">
                <div className="text-xs font-sans font-semibold text-gray-500 mb-1">{st.channel}</div>
                <div>{st.pair} = {st.high} × 16 + {st.low}</div>
                <div className="font-bold">= {st.value}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">Hex digits A–F stand for 10–15. Going the other way, divide each RGB value by 16: the quotient is the first digit and the remainder the second.</p>
        </div>

        {palette && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Lighter and Darker Versions</h2>
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

      </div>
      
      <RelatedStrip />
      <HexToRgbSEOContent />
      
      <RelatedTools />
    </>
  );
}
