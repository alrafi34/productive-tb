"use client";

import { useState, useEffect } from "react";
import {
  generateUsername,
  generateFromPattern,
  generateMultipleUsernames,
  toggleFavorite,
  getFavorites,
  isFavorite,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsText,
  exportAsJSON,
  getAvailabilityColor,
  getAvailabilityLabel,
  PRESETS
} from "./logic";
import { UsernameOptions, PresetType, GeneratedUsername } from "./types";
import UsernameGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function UsernameGeneratorUI() {
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);
  const [usePattern, setUsePattern] = useState(false);
  const [pattern, setPattern] = useState('LLNNSS');
  const [currentPreset, setCurrentPreset] = useState<PresetType | null>(null);
  
  // Options
  const [options, setOptions] = useState<UsernameOptions>({
    length: 10,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeAmbiguous: true,
    memorable: false,
    separator: '_'
  });
  
  // Multiple usernames
  const [bulkCount, setBulkCount] = useState(10);
  const [bulkUsernames, setBulkUsernames] = useState<GeneratedUsername[]>([]);
  
  // Favorites and history
  const [favorites, setFavorites] = useState<GeneratedUsername[]>([]);
  const [history, setHistory] = useState<GeneratedUsername[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // Generate initial username
  useEffect(() => {
    handleGenerate();
    setFavorites(getFavorites());
    setHistory(getHistory());
  }, []);
  
  // Auto-generate when options change
  useEffect(() => {
    if (username && !usePattern) {
      handleGenerate();
    }
  }, [options, usePattern]);
  
  const handleGenerate = () => {
    let newUsername = '';
    
    if (usePattern) {
      newUsername = generateFromPattern(pattern);
    } else {
      newUsername = generateUsername(options, currentPreset || undefined);
    }
    
    setUsername(newUsername);
    
    // Save to history
    const generated: GeneratedUsername = {
      id: crypto.randomUUID(),
      username: newUsername,
      timestamp: Date.now(),
      favorite: false
    };
    saveToHistory(generated);
    setHistory(getHistory());
  };
  
  const handlePreset = (presetKey: PresetType) => {
    const preset = PRESETS[presetKey];
    if (preset && preset.options) {
      setOptions({ ...options, ...preset.options });
      setCurrentPreset(presetKey);
      setUsePattern(false);
    }
  };
  
  const handleGenerateBulk = () => {
    const usernames = generateMultipleUsernames(bulkCount, options, currentPreset || undefined);
    setBulkUsernames(usernames);
  };
  
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id, bulkUsernames);
    setFavorites(getFavorites());
  };
  
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👤</span>
            <div>
              <h3 className="font-semibold text-indigo-900 mb-1">Username Generator</h3>
              <p className="text-sm text-indigo-800">
                Create unique, memorable usernames for social media, gaming, and online accounts. 
                All generation happens locally in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Quick Presets
          </h2>
          <div className="grid sm:grid-cols-4 gap-3">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => handlePreset(key as PresetType)}
                className={`p-4 border-2 rounded-lg transition-all text-left ${
                  currentPreset === key
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{preset.icon}</div>
                <div className="font-semibold text-gray-800 mb-1">{preset.name}</div>
                <div className="text-xs text-gray-500">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Username Output */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Generated Username
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
              type="text"
              value={username}
              readOnly
              className="w-full px-4 py-4 pr-20 rounded-xl border-2 border-gray-200 font-mono text-xl bg-gray-50 focus:outline-none focus:border-primary text-center"
            />
            <button
              onClick={() => copy(username)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600">
            <span>{username.length} characters</span>
          </div>
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
                    Username Length: {options.length}
                  </label>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={options.length}
                  onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>20</span>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: 'uppercase', label: 'Uppercase (A-Z)', icon: '🔠' },
                  { key: 'lowercase', label: 'Lowercase (a-z)', icon: '🔡' },
                  { key: 'numbers', label: 'Numbers (0-9)', icon: '🔢' },
                  { key: 'symbols', label: 'Symbols (_ - .)', icon: '🔣' },
                  { key: 'excludeAmbiguous', label: 'Exclude Ambiguous (O0l1I)', icon: '👁️' },
                  { key: 'memorable', label: 'Memorable (Word-based)', icon: '💭' }
                ].map(({ key, label, icon }) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={options[key as keyof UsernameOptions] as boolean}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
              
              {options.memorable && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Separator</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: '-', label: 'Dash (-)' },
                      { value: '_', label: 'Underscore (_)' },
                      { value: 'camel', label: 'CamelCase' },
                      { value: 'none', label: 'None' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setOptions({ ...options, separator: value as any })}
                        className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          options.separator === value
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                  placeholder="LLNNSS"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Example: "LLNNSS" → Ab42_- | "UUUUNNNN" → ABCD1234
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

        {/* Bulk Generator */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Bulk Username Generator
          </h2>
          
          <div className="flex gap-3 mb-4">
            <select
              value={bulkCount}
              onChange={(e) => setBulkCount(parseInt(e.target.value))}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
            >
              <option value={5}>5 usernames</option>
              <option value={10}>10 usernames</option>
              <option value={20}>20 usernames</option>
              <option value={30}>30 usernames</option>
              <option value={50}>50 usernames</option>
            </select>
            
            <button
              onClick={handleGenerateBulk}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
            >
              Generate
            </button>
            
            {bulkUsernames.length > 0 && (
              <>
                <button
                  onClick={() => exportAsText(bulkUsernames.map(u => u.username))}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  📄 Export TXT
                </button>
                <button
                  onClick={() => exportAsJSON(bulkUsernames)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  📋 Export JSON
                </button>
              </>
            )}
          </div>
          
          {bulkUsernames.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {bulkUsernames.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <code className="flex-1 font-mono text-sm text-gray-800">
                    {item.username}
                  </code>
                  {item.availability && (
                    <div
                      className="px-2 py-1 rounded text-xs font-semibold whitespace-nowrap"
                      style={{ 
                        backgroundColor: getAvailabilityColor(item.availability) + '20', 
                        color: getAvailabilityColor(item.availability) 
                      }}
                    >
                      {getAvailabilityLabel(item.availability)}
                    </div>
                  )}
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
                    onClick={() => copy(item.username)}
                    className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorites and History */}
        <div className="grid md:grid-cols-2 gap-6">
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
                        {item.username}
                      </code>
                      <button
                        onClick={() => copy(item.username)}
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
          
          {/* History */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Recent (Last 20)
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
                        {item.username}
                      </code>
                      <button
                        onClick={() => copy(item.username)}
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
        </div>
      </div>

      <UsernameGeneratorSEOContent />
      <RelatedTools
        currentTool="username-generator"
        tools={["password-generator", "random-name-picker", "text-to-slug-converter"]}
      />
    </>
  );
}
