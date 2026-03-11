"use client";

import { useState, useEffect } from "react";
import {
  generatePassword,
  generatePassphrase,
  generateFromPattern,
  calculateStrength,
  generateMultiplePasswords,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsText,
  exportAsJSON
} from "./logic";
import { PasswordOptions, PassphraseOptions, GeneratorMode, GeneratedPassword } from "./types";
import PasswordGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PasswordGeneratorUI() {
  const [mode, setMode] = useState<GeneratorMode>('random');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Random password options
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false
  });
  
  // Passphrase options
  const [passphraseOptions, setPassphraseOptions] = useState<PassphraseOptions>({
    wordCount: 4,
    separator: '-',
    capitalize: true,
    includeNumber: false
  });
  
  // Pattern
  const [pattern, setPattern] = useState('UULLNNSS');
  
  // Multiple passwords
  const [multiCount, setMultiCount] = useState(10);
  const [multiPasswords, setMultiPasswords] = useState<GeneratedPassword[]>([]);
  
  // History
  const [history, setHistory] = useState<GeneratedPassword[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Generate initial password
  useEffect(() => {
    handleGenerate();
    setHistory(getHistory());
  }, []);
  
  // Auto-generate when options change
  useEffect(() => {
    if (password) {
      handleGenerate();
    }
  }, [options, passphraseOptions, pattern, mode]);
  
  const handleGenerate = () => {
    let newPassword = '';
    
    switch (mode) {
      case 'random':
        newPassword = generatePassword(options);
        break;
      case 'passphrase':
        newPassword = generatePassphrase(passphraseOptions);
        break;
      case 'pattern':
        newPassword = generateFromPattern(pattern);
        break;
    }
    
    setPassword(newPassword);
    
    // Save to history
    const strength = calculateStrength(newPassword);
    const generated: GeneratedPassword = {
      id: crypto.randomUUID(),
      password: newPassword,
      timestamp: Date.now(),
      strength
    };
    saveToHistory(generated);
    setHistory(getHistory());
  };
  
  const handleGenerateMultiple = () => {
    const passwords = generateMultiplePasswords(multiCount, options);
    setMultiPasswords(passwords);
  };
  
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const strength = password ? calculateStrength(password) : null;
  
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">100% Secure & Private</h3>
              <p className="text-sm text-green-800">
                All passwords are generated locally in your browser using crypto.getRandomValues(). 
                Nothing is sent to any server.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Generator Mode
          </h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'random', label: '🎲 Random Password', desc: 'Secure random characters' },
              { id: 'passphrase', label: '📝 Passphrase', desc: 'Memorable word-based' },
              { id: 'pattern', label: '🎯 Pattern', desc: 'Custom pattern-based' }
            ].map(({ id, label, desc }) => (
              <button
                key={id}
                onClick={() => setMode(id as GeneratorMode)}
                className={`flex-1 min-w-[150px] p-4 rounded-lg border-2 transition-all ${
                  mode === id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-800">{label}</div>
                <div className="text-xs text-gray-500 mt-1">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Password Output */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Generated Password
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
                {showPassword ? '👁️' : '👁️‍🗨️'}
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
        </div>

        {/* Options Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            {mode === 'random' && 'Password Options'}
            {mode === 'passphrase' && 'Passphrase Options'}
            {mode === 'pattern' && 'Pattern Options'}
          </h2>
          
          {/* Random Password Options */}
          {mode === 'random' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password Length: {options.length}
                  </label>
                </div>
                <input
                  type="range"
                  min="6"
                  max="128"
                  value={options.length}
                  onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6</span>
                  <span>128</span>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: 'uppercase', label: 'Uppercase (A-Z)', icon: '🔠' },
                  { key: 'lowercase', label: 'Lowercase (a-z)', icon: '🔡' },
                  { key: 'numbers', label: 'Numbers (0-9)', icon: '🔢' },
                  { key: 'symbols', label: 'Symbols (!@#$...)', icon: '🔣' },
                  { key: 'excludeAmbiguous', label: 'Exclude Ambiguous (O0l1I)', icon: '👁️' }
                ].map(({ key, label, icon }) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={options[key as keyof PasswordOptions] as boolean}
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
          
          {/* Passphrase Options */}
          {mode === 'passphrase' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Words: {passphraseOptions.wordCount}
                </label>
                <input
                  type="range"
                  min="3"
                  max="8"
                  value={passphraseOptions.wordCount}
                  onChange={(e) => setPassphraseOptions({ ...passphraseOptions, wordCount: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Separator</label>
                <div className="flex gap-2">
                  {[
                    { value: '-', label: 'Dash (-)' },
                    { value: '_', label: 'Underscore (_)' },
                    { value: ' ', label: 'Space ( )' }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setPassphraseOptions({ ...passphraseOptions, separator: value as any })}
                      className={`flex-1 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                        passphraseOptions.separator === value
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={passphraseOptions.capitalize}
                    onChange={(e) => setPassphraseOptions({ ...passphraseOptions, capitalize: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Capitalize Words</span>
                </label>
                
                <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={passphraseOptions.includeNumber}
                    onChange={(e) => setPassphraseOptions({ ...passphraseOptions, includeNumber: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Add Number</span>
                </label>
              </div>
            </div>
          )}
          
          {/* Pattern Options */}
          {mode === 'pattern' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pattern (U=Upper, l=lower, N=Number, S=Symbol)
                </label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 font-mono focus:outline-none focus:border-primary"
                  placeholder="UULLNNSS"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Example: "UULLNNSS" → Ab42@kRt | "UUU-NNN" → ABC-123
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Multiple Passwords Generator */}
        {mode === 'random' && (
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
                <option value={20}>20 passwords</option>
                <option value={50}>50 passwords</option>
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
                      className="px-2 py-1 rounded text-xs font-semibold"
                      style={{ backgroundColor: item.strength.color + '20', color: item.strength.color }}
                    >
                      {item.strength.label}
                    </div>
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
        )}

        {/* Password History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Password History (Last 10)
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showHistory ? 'Hide' : 'Show'}
              </button>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {showHistory && (
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No password history yet</p>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <code className="flex-1 font-mono text-sm text-gray-800 truncate">
                      {item.password}
                    </code>
                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </div>
                    <button
                      onClick={() => copy(item.password)}
                      className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors flex-shrink-0"
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

      <PasswordGeneratorSEOContent />
      <RelatedTools
        currentTool="password-generator"
        tools={["username-generator", "hash-generator", "text-encrypt-decrypt"]}
      />
    </>
  );
}
