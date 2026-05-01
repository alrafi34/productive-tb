"use client";

import { useState, useEffect } from "react";
import { BeamType, LoadType, Unit, BeamCalculation } from "./types";
import {
  calculateBeam,
  getBeamTypeDisplayName,
  getLoadTypeDisplayName,
  getBeamPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber
} from "./logic";
import BeamLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BeamLoadCalculatorUI() {
  const [beamType, setBeamType] = useState<BeamType>("simply-supported");
  const [loadType, setLoadType] = useState<LoadType>("point");
  const [unit, setUnit] = useState<Unit>("m");
  const [length, setLength] = useState("");
  const [load, setLoad] = useState("");
  const [position, setPosition] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<BeamCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [showFormula, setShowFormula] = useState(false);

  // Calculate in real-time
  useEffect(() => {
    const L = parseFloat(length);
    const P = parseFloat(load);
    const pos = loadType === 'point' && beamType === 'simply-supported' ? parseFloat(position) : undefined;
    
    if (!isNaN(L) && !isNaN(P) && L > 0 && P > 0) {
      if (loadType === 'point' && beamType === 'simply-supported') {
        if (!isNaN(pos!) && pos! >= 0 && pos! <= L) {
          const result = calculateBeam(beamType, loadType, L, P, pos, unit);
          setCalculation(result);
        } else {
          setCalculation(null);
        }
      } else {
        const result = calculateBeam(beamType, loadType, L, P, undefined, unit);
        setCalculation(result);
      }
    } else {
      setCalculation(null);
    }
  }, [beamType, loadType, length, load, position, unit]);

  const handleReset = () => {
    setLength("");
    setLoad("");
    setPosition("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    if (beamType === 'simply-supported' && loadType === 'point') {
      setLength("6");
      setLoad("10");
      setPosition("3");
    } else if (beamType === 'simply-supported' && loadType === 'udl') {
      setLength("4");
      setLoad("2");
    } else if (beamType === 'cantilever' && loadType === 'point') {
      setLength("3");
      setLoad("5");
    } else {
      setLength("2");
      setLoad("3");
    }
  };

  const handleLoadPreset = (preset: any) => {
    setBeamType(preset.beamType);
    setLoadType(preset.loadType);
    setLength(preset.length.toString());
    setLoad(preset.load.toString());
    if (preset.position) {
      setPosition(preset.position.toString());
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `${getBeamTypeDisplayName(calculation.beamType)}\nMax Bending Moment: ${formatNumber(calculation.maxBendingMoment)} kNm\nReaction 1: ${formatNumber(calculation.reaction1)} kN`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      saveToHistory(calculation);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'beam_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'beam_load_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: BeamCalculation) => {
    setBeamType(calc.beamType);
    setLoadType(calc.loadType);
    setLength(calc.length.toString());
    setLoad(calc.load.toString());
    if (calc.position) {
      setPosition(calc.position.toString());
    }
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const beamPresets = getBeamPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Beam Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate beam reactions, shear force, and bending moment for simply supported and cantilever beams with instant visual diagrams.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Beam Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beam Type</label>
                <select
                  value={beamType}
                  onChange={(e) => setBeamType(e.target.value as BeamType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="simply-supported">Simply Supported</option>
                  <option value="cantilever">Cantilever</option>
                </select>
              </div>

              {/* Load Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Load Type</label>
                <select
                  value={loadType}
                  onChange={(e) => setLoadType(e.target.value as LoadType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="point">Point Load</option>
                  <option value="udl">Uniformly Distributed Load (UDL)</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("m")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "m"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Meters (m)
                  </button>
                  <button
                    onClick={() => setUnit("ft")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "ft"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Feet (ft)
                  </button>
                </div>
              </div>

              {/* Formula Toggle */}
              <button
                onClick={() => setShowFormula(!showFormula)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                {showFormula ? '▼' : '▶'} Show Formulas
              </button>

              {showFormula && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Formulas:</p>
                  {beamType === 'simply-supported' && loadType === 'point' && (
                    <div className="text-xs text-blue-800 space-y-1">
                      <p>R1 = P × (L - a) / L</p>
                      <p>R2 = P × a / L</p>
                      <p>M_max = P × a × (L - a) / L</p>
                    </div>
                  )}
                  {beamType === 'simply-supported' && loadType === 'udl' && (
                    <div className="text-xs text-blue-800 space-y-1">
                      <p>R1 = R2 = w × L / 2</p>
                      <p>M_max = w × L² / 8</p>
                    </div>
                  )}
                  {beamType === 'cantilever' && loadType === 'point' && (
                    <div className="text-xs text-blue-800 space-y-1">
                      <p>R = P</p>
                      <p>M_max = P × L</p>
                    </div>
                  )}
                  {beamType === 'cantilever' && loadType === 'udl' && (
                    <div className="text-xs text-blue-800 space-y-1">
                      <p>R = w × L</p>
                      <p>M_max = w × L² / 2</p>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={handleUseDefaults}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ Use Default Values
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
            </div>

            {/* Result Display */}
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Max Bending Moment
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.maxBendingMoment)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kNm
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Reaction 1:</span>
                    <span className="font-semibold">{formatNumber(calculation.reaction1)} kN</span>
                  </div>
                  {calculation.reaction2 !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Reaction 2:</span>
                      <span className="font-semibold">{formatNumber(calculation.reaction2)} kN</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Max Shear Force:</span>
                    <span className="font-semibold">{formatNumber(calculation.maxShearForce)} kN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Load:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalLoad)} kN</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Beam Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beam Length ({unit})
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="6"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Load ({loadType === 'point' ? 'kN' : 'kN/m'})
                  </label>
                  <input
                    type="number"
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                </div>

                {loadType === 'point' && beamType === 'simply-supported' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Load Position ({unit})
                    </label>
                    <input
                      type="number"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="3"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Distance from left support
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Beam Diagram */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Beam Diagram
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <svg viewBox="0 0 600 150" className="w-full h-auto">
                    {/* Beam */}
                    <line x1="50" y1="100" x2="550" y2="100" stroke="#374151" strokeWidth="4" />
                    
                    {/* Supports */}
                    {beamType === 'simply-supported' ? (
                      <>
                        {/* Left support */}
                        <polygon points="50,100 40,120 60,120" fill="#374151" />
                        {/* Right support */}
                        <circle cx="550" cy="110" r="10" fill="none" stroke="#374151" strokeWidth="2" />
                        <line x1="550" y1="120" x2="550" y2="130" stroke="#374151" strokeWidth="2" />
                      </>
                    ) : (
                      <>
                        {/* Fixed support */}
                        <rect x="30" y="80" width="20" height="40" fill="#374151" />
                        <line x1="30" y1="80" x2="30" y2="120" stroke="#374151" strokeWidth="3" />
                      </>
                    )}
                    
                    {/* Load representation */}
                    {loadType === 'point' ? (
                      <>
                        {beamType === 'simply-supported' && calculation.position !== undefined ? (
                          <>
                            <line 
                              x1={50 + (calculation.position / calculation.length) * 500} 
                              y1="40" 
                              x2={50 + (calculation.position / calculation.length) * 500} 
                              y2="100" 
                              stroke="#EF4444" 
                              strokeWidth="3" 
                              markerEnd="url(#arrowhead)" 
                            />
                            <text 
                              x={50 + (calculation.position / calculation.length) * 500} 
                              y="30" 
                              textAnchor="middle" 
                              fill="#EF4444" 
                              fontSize="14" 
                              fontWeight="bold"
                            >
                              P = {formatNumber(calculation.load)} kN
                            </text>
                          </>
                        ) : (
                          <>
                            <line x1="550" y1="40" x2="550" y2="100" stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
                            <text x="550" y="30" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">
                              P = {formatNumber(calculation.load)} kN
                            </text>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {/* UDL arrows */}
                        {[...Array(10)].map((_, i) => (
                          <line 
                            key={i}
                            x1={70 + i * 48} 
                            y1="40" 
                            x2={70 + i * 48} 
                            y2="100" 
                            stroke="#EF4444" 
                            strokeWidth="2" 
                            markerEnd="url(#arrowhead)" 
                          />
                        ))}
                        <text x="300" y="30" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">
                          w = {formatNumber(calculation.load)} kN/m
                        </text>
                      </>
                    )}
                    
                    {/* Arrow marker definition */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                        <polygon points="0 0, 10 5, 0 10" fill="#EF4444" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            )}

            {/* Presets Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Example Scenarios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {beamPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleLoadPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Max Moment</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.maxBendingMoment)} kNm</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reaction 1</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.reaction1)} kN</div>
                  </div>
                  {calculation.reaction2 !== undefined && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reaction 2</div>
                      <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.reaction2)} kN</div>
                    </div>
                  )}
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Max Shear</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.maxShearForce)} kN</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Load</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.totalLoad)} kN</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Beam Length</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.length)} {calculation.unit}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export Text
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No calculations saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {getBeamTypeDisplayName(entry.calculation.beamType)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getLoadTypeDisplayName(entry.calculation.loadType)} • 
                          L: {formatNumber(entry.calculation.length)} {entry.calculation.unit} • 
                          M_max: {formatNumber(entry.calculation.maxBendingMoment)} kNm
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <BeamLoadCalculatorSEO />
      <RelatedTools
        currentTool="beam-load-calculator"
        tools={['foundation-depth-calculator', 'concrete-volume-calculator', 'steel-quantity-calculator']}
      />
    </>
  );
}
