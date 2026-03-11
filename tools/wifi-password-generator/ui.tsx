"use client";

import { useState, useEffect } from "react";
import {
  generateWiFiPassword,
  generateFromPattern,
  calculateStrength,
  validateRouterCompatibility,
  generateMultiplePasswords,
  saveToHistory,
  getHistory,
  clearHistory,
  toggleFavorite,
  getFavorites,
  isFavorite,
  exportAsText,
  exportAsJSON,
  PRESETS
} from "./logic";
import { WiFiPasswordOptions, GeneratedPassword } from "./types";
import WiFiPasswordGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WiFiPasswordGeneratorUI() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  const [usePattern, setUsePattern] = useState(false);
  const [pattern, setPattern] = useState('LLNN-SSLL');
  
  // Options
  const [options, setOptions] = useState<WiFiPasswordOptions>({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeAmbiguous: true,
    memorable: false
  });
  
  // Multiple passwords
  const [multiCount, setMultiCount] = useState(10);
  const [multiPasswords, setMultiPasswords] = useState<GeneratedPassword[]>([]);
  
  // History and favorites
  const [history, setHistory] = useState<GeneratedPassword[]>([]);
  const [favorites, setFavorites] = useState<GeneratedPassword[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Generate initial password
  useEffect(() => {
    handleGenerate();
    setHistory(getHistory());
    setFavorites(getFavorites());
  }, []);
  
  // Auto-generate when options change
  useEffect(() => {
    if (password && !usePattern) {
      handleGenerate();
    }
  }, [options, usePattern]);
  
  const handleGenerate = () => {
    let newPassword = '';
    
    if (usePattern) {
      newPassword = generateFromPattern(pattern);
    } else {
      newPassword = generateWiFiPassword(options);
    }
    
    setPassword(newPassword);
    
    // Save to history
    const strength = calculateStrength(newPassword);
    const generated: GeneratedPassword = {
      id: crypto.randomUUID(),
      password: newPassword,
      timestamp: Date.now(),
      strength,
      favorite: false
    };
    saveToHistory(generated);
    setHistory(getHistory());
  };
  
  const handlePreset = (presetKey: string) => {
    const preset = PRESETS[presetKey];
    if (preset && preset.options) {
      setOptions({ ...options, ...preset.options });
      setUsePattern(false);
    }
  };
  
  const handleGenerateMultiple = () => {
    const passwords = generateMultiplePasswords(multiCount, options);
    setMultiPasswords(passwords);
  };
  
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    setFavorites(getFavorites());
    setHistory(getHistory());
  };
  
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const strength = password ? calculateStrength(password) : null;
  const compatibility = password ? validateRouterCompatibility(password) : null;
  
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📶</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">WiFi Password Generator</h3>
              <p className="text-sm text-blue-800">
                Generate secure, router-compatible WiFi passwords. All generation happens locally 
                using crypto.getRandomValues(). Perfect for home and guest networks.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Quick Presets
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => handlePreset(key)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                <div className="text-2xl mb-2">{preset.icon}</div>
                <div className="font-semibold text-gray-800 mb-1">{preset.name}</div>
                <div className="text-xs text-gray-500">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Password Output */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Generated WiFi Password
            </h2>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🔄 Generate New
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              className="w-full px-4 py-4 pr-24 rounded-xl border-2 border-gray-200 font-mono text-lg bg-gray-50 focus:outline-none focus:border-primary"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title={showPassword ? 'Hide' : 'Show'}
              >
                {showPassword ? '👁️' : '👁️🗨️'}
              </button>
              <button
                onClick={() => copy(password)}
                className="px-3 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {copied ? '✓' : '📋'}
              </button>
            </div>
          </div>
          
          {/* Strength Meter */}
          {strength && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Password Strength</span>
                <span className="text-sm font-semibold" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((strength.score + 1) / 5) * 100}%`,
                    backgroundColor: strength.color
                  }}
                />
              </div>
              
              {/* Entropy Info */}
              <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Entropy</div>
                  <div className="text-lg font-bold text-gray-800">{strength.entropy} bits</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Estimated Crack Time</div>
                  <div className="text-lg font-bold text-gray-800">{strength.crackTime}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Router Compatibility */}
          {compatibility && (
            <div className="mt-4">
              {compatibility.compatible ? (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-green-800 font-medium">Router Compatible</span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-amber-600">⚠️</span>
                    <span className="text-sm text-amber-900 font-medium">Compatibility Warnings:</span>
                  </div>
                  <ul className="text-xs text-amber-800 space-y-1 ml-6">
                    {compatibility.warnings.map((warning, i) => (
                      <li key={i}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Generator Mode Toggle */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setUsePattern(false)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                !usePattern
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎲 Random Mode
            </button>
            <button
              onClick={() => setUsePattern(true)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                usePattern
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎯 Pattern Mode
            </button>
          </div>
          
          {/* Random Mode Options */}
          {!usePattern && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password Length: {options.length}
                  </label>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={options.length}
                  onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>8</span>
                  <span>32</span>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: 'uppercase', label: 'Uppercase (A-Z)', icon: '🔠' },
                  { key: 'lowercase', label: 'Lowercase (a-z)', icon: '🔡' },
                  { key: 'numbers', label: 'Numbers (0-9)', icon: '🔢' },
                  { key: 'symbols', label: 'Symbols (!@#$...)', icon: '🔣' },
                  { key: 'excludeAmbiguous', label: 'Exclude Ambiguous (O0l1I)', icon: '👁️' },
                  { key: 'memorable', label: 'Memorable (Easy to type)', icon: '💭' }
                ].map(({ key, label, icon }) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={options[key as keyof WiFiPasswordOptions] as boolean}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Pattern Mode Options */}
          {usePattern && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pattern (L=Letter, U=Upper, N=Number, S=Symbol)
                </label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 font-mono focus:outline-none focus:border-primary"
                  placeholder="LLNN-SSLL"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Example: "LLNN-SSLL" → Ab42-@kRt | "UUUUNNNN" → ABCD1234
                </p>
              </div>
              <button
                onClick={handleGenerate}
                className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
              >
                Generate from Pattern
              </button>
            </div>
          )}
        </div>

        {/* Multiple Passwords Generator */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Generate Multiple Passwords
          </h2>
          
          <div className="flex gap-3 mb-4">
            <select
              value={multiCount}
              onChange={(e) => setMultiCount(parseInt(e.target.value))}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
            >
              <option value={5}>5 passwords</option>
              <option value={10}>10 passwords</option>
              <option value={15}>15 passwords</option>
              <option value={20}>20 passwords</option>
            </select>
            
            <button
              onClick={handleGenerateMultiple}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
            >
              Generate
            </button>
            
            {multiPasswords.length > 0 && (
              <>
                <button
                  onClick={() => exportAsText(multiPasswords.map(p => p.password))}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  📄 Export TXT
                </button>
                <button
                  onClick={() => exportAsJSON(multiPasswords)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  📋 Export JSON
                </button>
              </>
            )}
          </div>
          
          {multiPasswords.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {multiPasswords.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <code className="flex-1 font-mono text-sm text-gray-800 truncate">
                    {item.password}
                  </code>
                  <div
                    className="px-2 py-1 rounded text-xs font-semibold whitespace-nowrap"
                    style={{ backgroundColor: item.strength.color + '20', color: item.strength.color }}
                  >
                    {item.strength.label}
                  </div>
                  <button
                    onClick={() => handleToggleFavorite(item.id)}
                    className={`p-2 rounded transition-colors ${
                      isFavorite(item.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    title="Toggle favorite"
                  >
                    {isFavorite(item.id) ? '⭐' : '☆'}
                  </button>
                  <button
                    onClick={() => copy(item.password)}
                    className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* History and Favorites */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* History */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Recent (Last 10)
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  {showHistory ? 'Hide' : 'Show'}
                </button>
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      clearHistory();
                      setHistory([]);
                    }}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            {showHistory && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-center text-gray-500 py-4 text-sm">No history yet</p>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <code className="flex-1 font-mono text-xs text-gray-800 truncate">
                        {item.password}
                      </code>
                      <button
                        onClick={() => copy(item.password)}
                        className="px-2 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          {/* Favorites */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Favorites ⭐
              </h2>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showFavorites ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showFavorites && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {favorites.length === 0 ? (
                  <p className="text-center text-gray-500 py-4 text-sm">No favorites yet</p>
                ) : (
                  favorites.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <code className="flex-1 font-mono text-xs text-gray-800 truncate">
                        {item.password}
                      </code>
                      <button
                        onClick={() => copy(item.password)}
                        className="px-2 py-1 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <WiFiPasswordGeneratorSEOContent />
      <RelatedTools
        currentTool="wifi-password-generator"
        tools={["password-generator", "username-generator", "hash-generator"]}
      />
    </>
  );
}
