"use client";

import { useState, useEffect } from "react";
import {
  GOOGLE_FONTS,
  FONT_WEIGHTS,
  POPULAR_PAIRS,
  loadFont,
  getRandomPair,
  generateGoogleFontsLink,
  generateCSSSnippet,
  saveFavoritePair,
  getFavoritePairs,
  removeFavoritePair,
  isFavoritePair,
} from "./logic";
import FontPairerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FontPairerUI() {
  const [headingFont, setHeadingFont] = useState("Playfair Display");
  const [bodyFont, setBodyFont] = useState("Inter");
  const [sampleText, setSampleText] = useState("The quick brown fox jumps over the lazy dog.");
  const [headingSize, setHeadingSize] = useState(48);
  const [bodySize, setBodySize] = useState(18);
  const [headingWeight, setHeadingWeight] = useState(400);
  const [bodyWeight, setBodyWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Array<{ heading: string; body: string }>>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchHeading, setSearchHeading] = useState("");
  const [searchBody, setSearchBody] = useState("");

  useEffect(() => {
    loadFont(headingFont);
    loadFont(bodyFont);
    setIsFavorite(isFavoritePair(headingFont, bodyFont));
  }, [headingFont, bodyFont]);

  useEffect(() => {
    setFavorites(getFavoritePairs());
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSwapFonts = () => {
    const temp = headingFont;
    setHeadingFont(bodyFont);
    setBodyFont(temp);
  };

  const handleRandomPair = () => {
    const pair = getRandomPair();
    setHeadingFont(pair.heading);
    setBodyFont(pair.body);
  };

  const handleReset = () => {
    setHeadingFont("Playfair Display");
    setBodyFont("Inter");
    setSampleText("The quick brown fox jumps over the lazy dog.");
    setHeadingSize(48);
    setBodySize(18);
    setHeadingWeight(400);
    setBodyWeight(400);
    setLineHeight(1.5);
    setLetterSpacing(0);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoritePair(headingFont, bodyFont);
    } else {
      saveFavoritePair(headingFont, bodyFont);
    }
    setIsFavorite(!isFavorite);
    setFavorites(getFavoritePairs());
  };

  const handleApplyPair = (heading: string, body: string) => {
    setHeadingFont(heading);
    setBodyFont(body);
  };

  const handleApplyPopularPair = (heading: string, body: string) => {
    setHeadingFont(heading);
    setBodyFont(body);
  };

  const filteredHeadingFonts = GOOGLE_FONTS.filter(f =>
    f.toLowerCase().includes(searchHeading.toLowerCase())
  );

  const filteredBodyFonts = GOOGLE_FONTS.filter(f =>
    f.toLowerCase().includes(searchBody.toLowerCase())
  );

  const cssSnippet = generateCSSSnippet(headingFont, bodyFont, headingWeight, bodyWeight);
  const googleFontsLink = generateGoogleFontsLink([headingFont, bodyFont]);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Font Selectors */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Heading Font */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Heading Font</label>
              <input
                type="text"
                placeholder="Search fonts..."
                value={searchHeading}
                onChange={(e) => setSearchHeading(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredHeadingFonts.map((font) => (
                  <button
                    key={font}
                    onClick={() => {
                      setHeadingFont(font);
                      setSearchHeading("");
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      headingFont === font
                        ? "bg-primary text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    style={headingFont === font ? {} : { fontFamily: `'${font}', serif` }}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Font */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Body Font</label>
              <input
                type="text"
                placeholder="Search fonts..."
                value={searchBody}
                onChange={(e) => setSearchBody(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredBodyFonts.map((font) => (
                  <button
                    key={font}
                    onClick={() => {
                      setBodyFont(font);
                      setSearchBody("");
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      bodyFont === font
                        ? "bg-primary text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    style={bodyFont === font ? {} : { fontFamily: `'${font}', sans-serif` }}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSwapFonts}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            ⇄ Swap
          </button>
          <button
            onClick={handleRandomPair}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🎲 Random
          </button>
          <button
            onClick={handleToggleFavorite}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isFavorite
                ? "bg-primary hover:bg-primary-hover text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {isFavorite ? "★ Saved" : "☆ Save"}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            ↻ Reset
          </button>
        </div>

        {/* Popular Pairs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Pairs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
            {POPULAR_PAIRS.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPopularPair(pair.heading, pair.body)}
                className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="text-xs font-semibold text-gray-700">{pair.heading}</div>
                <div className="text-xs text-gray-500">{pair.body}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sample Text */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Sample Text</label>
          <textarea
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        {/* Typography Controls */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Size: {headingSize}px
                </label>
                <input
                  type="range"
                  min="24"
                  max="96"
                  value={headingSize}
                  onChange={(e) => setHeadingSize(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Weight: {headingWeight}
                </label>
                <select
                  value={headingWeight}
                  onChange={(e) => setHeadingWeight(parseInt(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {FONT_WEIGHTS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Size: {bodySize}px
                </label>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={bodySize}
                  onChange={(e) => setBodySize(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Weight: {bodyWeight}
                </label>
                <select
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(parseInt(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {FONT_WEIGHTS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Line Height: {lineHeight.toFixed(1)}
              </label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Letter Spacing: {letterSpacing}px
              </label>
              <input
                type="range"
                min="-1"
                max="5"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Heading Preview
              </p>
              <div
                style={{
                  fontFamily: `'${headingFont}', serif`,
                  fontSize: `${headingSize}px`,
                  fontWeight: headingWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}px`,
                  color: "#1f2937",
                }}
              >
                {sampleText}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Body Preview
              </p>
              <div
                style={{
                  fontFamily: `'${bodyFont}', sans-serif`,
                  fontSize: `${bodySize}px`,
                  fontWeight: bodyWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}px`,
                  color: "#1f2937",
                }}
              >
                {sampleText}
              </div>
            </div>
          </div>
        </div>

        {/* Export */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Export</h3>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">CSS Snippet</span>
                <button
                  onClick={() => handleCopy(cssSnippet, "css")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    copied === "css"
                      ? "bg-green-600 text-white"
                      : "bg-primary hover:bg-primary-hover text-white"
                  }`}
                >
                  {copied === "css" ? "✓" : "Copy"}
                </button>
              </div>
              <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-800 overflow-x-auto">
                {cssSnippet}
              </pre>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Google Fonts Link</span>
                <button
                  onClick={() => handleCopy(googleFontsLink, "link")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    copied === "link"
                      ? "bg-green-600 text-white"
                      : "bg-primary hover:bg-primary-hover text-white"
                  }`}
                >
                  {copied === "link" ? "✓" : "Copy"}
                </button>
              </div>
              <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-800 overflow-x-auto">
                {googleFontsLink}
              </pre>
            </div>
          </div>
        </div>

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Saved Pairs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {favorites.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-700 truncate">
                        {pair.heading}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{pair.body}</div>
                    </div>
                    <button
                      onClick={() => {
                        removeFavoritePair(pair.heading, pair.body);
                        setFavorites(getFavoritePairs());
                      }}
                      className="text-gray-400 hover:text-red-500 text-sm flex-shrink-0"
                    >
                      ×
                    </button>
                  </div>
                  <button
                    onClick={() => handleApplyPair(pair.heading, pair.body)}
                    className="w-full px-2 py-1.5 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FontPairerSEOContent />
      <RelatedTools
        currentTool="font-pairer"
        tools={["color-palette-generator", "css-gradient-generator", "placeholder-image-generator"]}
      />
    </>
  );
}
