'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Check, Download, Trash2, Plus, X, Shield, BarChart3, Clock, History as HistoryIcon } from 'lucide-react';
import { PasswordAnalysis, ComparisonPassword } from './types';
import {
  analyzePassword,
  saveToHistory,
  getHistory,
  clearHistory,
  deleteFromHistory,
  exportAsText,
  exportAsJSON,
  comparePasswords
} from './logic';
import PasswordStrengthMeterSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

type Mode = 'single' | 'compare';

export default function PasswordStrengthMeterUI() {
  const [mode, setMode] = useState<Mode>('single');
  
  // Single password mode
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Comparison mode
  const [comparisonPasswords, setComparisonPasswords] = useState<ComparisonPassword[]>([
    { id: '1', label: 'Password 1', analysis: analyzePassword('') },
    { id: '2', label: 'Password 2', analysis: analyzePassword('') }
  ]);
  
  // History
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Analyze password on change
  useEffect(() => {
    if (password) {
      const result = analyzePassword(password);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [password]);

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save analysis
  const handleSave = () => {
    if (analysis) {
      saveToHistory(analysis);
      setHistory(getHistory());
    }
  };

  // Update comparison password
  const updateComparisonPassword = (id: string, newPassword: string) => {
    setComparisonPasswords(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, analysis: analyzePassword(newPassword) }
          : item
      )
    );
  };

  // Add comparison password
  const addComparisonPassword = () => {
    if (comparisonPasswords.length < 5) {
      setComparisonPasswords(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          label: `Password ${prev.length + 1}`,
          analysis: analyzePassword('')
        }
      ]);
    }
  };

  // Remove comparison password
  const removeComparisonPassword = (id: string) => {
    if (comparisonPasswords.length > 2) {
      setComparisonPasswords(prev => prev.filter(item => item.id !== id));
    }
  };

  // Export comparison
  const handleExportComparison = (format: 'txt' | 'json') => {
    const analyses = comparisonPasswords.map(p => p.analysis);
    if (format === 'txt') {
      exportAsText(analyses);
    } else {
      exportAsJSON(analyses);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Password Strength Meter
          </h1>
          <p className="text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Evaluate password security with entropy analysis and crack time estimation
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setMode('single')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              mode === 'single'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-5 h-5" />
            Single Password
          </button>
          <button
            onClick={() => setMode('compare')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              mode === 'compare'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Compare Passwords
          </button>
        </div>

        {/* Single Password Mode */}
        {mode === 'single' && (
          <div className="space-y-6">
            {/* Input */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#058554]" />
                  Enter Password
                </h3>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password here..."
                  className="w-full px-4 py-4 pr-12 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-lg font-mono"
                />
                {password && (
                  <button
                    onClick={() => copyToClipboard(password)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#058554] transition-colors"
                    title="Copy password"
                  >
                    {copied ? <Check className="w-5 h-5 text-[#058554]" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>

              {password && (
                <div className="text-sm text-slate-600">
                  Length: <span className="font-semibold text-slate-800">{password.length}</span> characters
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysis && (
              <>
                {/* Strength Bar */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Password Strength</h3>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ backgroundColor: analysis.color + '20', color: analysis.color }}
                    >
                      {analysis.strength}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 ease-out rounded-full"
                        style={{
                          width: `${((analysis.score + 1) / 5) * 100}%`,
                          backgroundColor: analysis.color
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Very Weak</span>
                      <span>Very Strong</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Entropy</div>
                        <div className="text-2xl font-bold text-slate-800">{analysis.entropy}</div>
                        <div className="text-xs text-slate-500">bits</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Crack Time</div>
                        <div className="text-xl font-bold text-slate-800">{analysis.crackTime}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Score</div>
                        <div className="text-2xl font-bold text-slate-800">{analysis.score + 1}/5</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Character Types */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-3">
                  <h3 className="font-semibold text-slate-800">Character Types</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Uppercase', value: analysis.hasUppercase, icon: '🔠' },
                      { label: 'Lowercase', value: analysis.hasLowercase, icon: '🔡' },
                      { label: 'Numbers', value: analysis.hasNumbers, icon: '🔢' },
                      { label: 'Symbols', value: analysis.hasSymbols, icon: '🔣' }
                    ].map(({ label, value, icon }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 ${
                          value
                            ? 'border-green-200 bg-green-50'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <span className="text-xl">{icon}</span>
                        <div>
                          <div className="text-sm font-medium text-slate-800">{label}</div>
                          <div className={`text-xs ${value ? 'text-green-600' : 'text-slate-500'}`}>
                            {value ? 'Included' : 'Missing'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-3">
                  <h3 className="font-semibold text-slate-800">Suggestions</h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 p-3 rounded-lg ${
                          suggestion.includes('Excellent')
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-amber-50 border border-amber-200'
                        }`}
                      >
                        <span className="text-lg mt-0.5">
                          {suggestion.includes('Excellent') ? '✅' : '💡'}
                        </span>
                        <span className={`text-sm ${
                          suggestion.includes('Excellent') ? 'text-green-800' : 'text-amber-800'
                        }`}>
                          {suggestion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Save Analysis
                  </button>
                  <button
                    onClick={() => exportAsText([analysis])}
                    className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                    title="Export as TXT"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => exportAsJSON([analysis])}
                    className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                    title="Export as JSON"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Comparison Mode */}
        {mode === 'compare' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Compare Multiple Passwords</h3>
                <div className="flex gap-2">
                  <button
                    onClick={addComparisonPassword}
                    disabled={comparisonPasswords.length >= 5}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                  <button
                    onClick={() => handleExportComparison('txt')}
                    className="px-3 py-1.5 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    TXT
                  </button>
                  <button
                    onClick={() => handleExportComparison('json')}
                    className="px-3 py-1.5 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    JSON
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {comparisonPasswords.map((item, index) => (
                  <div key={item.id} className="p-4 border-2 border-slate-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          setComparisonPasswords(prev =>
                            prev.map(p => p.id === item.id ? { ...p, label: e.target.value } : p)
                          );
                        }}
                        className="text-sm font-medium text-slate-800 bg-transparent border-none focus:outline-none"
                      />
                      {comparisonPasswords.length > 2 && (
                        <button
                          onClick={() => removeComparisonPassword(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Enter password..."
                      value={item.analysis.password}
                      onChange={(e) => updateComparisonPassword(item.id, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent font-mono text-sm"
                    />

                    {item.analysis.password && (
                      <>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${((item.analysis.score + 1) / 5) * 100}%`,
                              backgroundColor: item.analysis.color
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-slate-500">Strength: </span>
                            <span className="font-semibold" style={{ color: item.analysis.color }}>
                              {item.analysis.strength}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Entropy: </span>
                            <span className="font-semibold text-slate-800">{item.analysis.entropy} bits</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Crack: </span>
                            <span className="font-semibold text-slate-800">{item.analysis.crackTime}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Summary */}
            {comparisonPasswords.some(p => p.analysis.password) && (
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                <h3 className="font-semibold text-slate-800">Comparison Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-3 text-slate-600 font-medium">Password</th>
                        <th className="text-left py-2 px-3 text-slate-600 font-medium">Strength</th>
                        <th className="text-left py-2 px-3 text-slate-600 font-medium">Entropy</th>
                        <th className="text-left py-2 px-3 text-slate-600 font-medium">Crack Time</th>
                        <th className="text-left py-2 px-3 text-slate-600 font-medium">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonPasswords
                        .filter(p => p.analysis.password)
                        .map((item) => (
                          <tr key={item.id} className="border-b border-slate-100">
                            <td className="py-3 px-3 font-medium text-slate-800">{item.label}</td>
                            <td className="py-3 px-3">
                              <span
                                className="px-2 py-1 rounded text-xs font-semibold"
                                style={{ backgroundColor: item.analysis.color + '20', color: item.analysis.color }}
                              >
                                {item.analysis.strength}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-700">{item.analysis.entropy} bits</td>
                            <td className="py-3 px-3 text-slate-700">{item.analysis.crackTime}</td>
                            <td className="py-3 px-3 text-slate-700">{item.analysis.score + 1}/5</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-slate-700 hover:text-[#058554] transition-colors"
            >
              <HistoryIcon className="w-5 h-5" />
              <span className="font-medium">Analysis History ({history.length})</span>
            </button>
            {history.length > 0 && (
              <button
                onClick={() => {
                  clearHistory();
                  setHistory([]);
                }}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {showHistory && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No analysis history yet</p>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm text-slate-800 truncate">{item.password}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                        <span className="font-semibold">{item.strength}</span>
                        <span>•</span>
                        <span>{item.entropy} bits</span>
                        <span>•</span>
                        <span>{item.crackTime}</span>
                        <span>•</span>
                        <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        deleteFromHistory(item.id);
                        setHistory(getHistory());
                      }}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <PasswordStrengthMeterSEOContent />
      <RelatedTools
        currentTool="password-strength-meter"
        tools={["password-generator", "hash-generator", "text-encrypt-decrypt"]}
      />
    </div>
  );
}
