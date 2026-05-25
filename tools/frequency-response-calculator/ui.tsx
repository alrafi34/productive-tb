"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FrequencyResponseInputs, FrequencyResponseResult, DisplayMode, SamplingPoints } from "./types";
import {
  calculateFrequencyResponse,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
  HistoryEntry
} from "./logic";
import FrequencyResponseCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FrequencyResponseCalculatorUI() {
  const [inputs, setInputs] = useState<FrequencyResponseInputs>({
    transferFunction: "1/(1+jω)",
    startFrequency: 0.1,
    endFrequency: 100,
    samplingPoints: 500,
    displayMode: 'both'
  });
  
  const [result, setResult] = useState<FrequencyResponseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const presets = getPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = calculateFrequencyResponse(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 200),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  // Draw graphs
  useEffect(() => {
    if (result && canvasRef.current) {
      drawGraphs();
    }
  }, [result, inputs.displayMode]);

  const drawGraphs = () => {
    const canvas = canvasRef.current;
    if (!canvas || !result) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Graph settings
    const margin = { top: 20, right: 40, bottom: 40, left: 60 };
    const graphHeight = inputs.displayMode === 'both' ? (height - margin.top - margin.bottom) / 2 - 10 : height - margin.top - margin.bottom;
    
    if (inputs.displayMode === 'magnitude' || inputs.displayMode === 'both') {
      drawMagnitudeGraph(ctx, width, graphHeight, margin, 0);
    }
    
    if (inputs.displayMode === 'phase' || inputs.displayMode === 'both') {
      const yOffset = inputs.displayMode === 'both' ? graphHeight + 20 : 0;
      drawPhaseGraph(ctx, width, graphHeight, margin, yOffset);
    }
  };

  const drawMagnitudeGraph = (ctx: CanvasRenderingContext2D, width: number, height: number, margin: any, yOffset: number) => {
    if (!result) return;

    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height;

    // Find magnitude range
    const magnitudes = result.points.map(p => p.magnitudeDb);
    const minMag = Math.min(...magnitudes);
    const maxMag = Math.max(...magnitudes);
    const magRange = maxMag - minMag;
    const magPadding = magRange * 0.1;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical grid lines (frequency)
    for (let i = 0; i <= 10; i++) {
      const x = margin.left + (i / 10) * graphWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin.top + yOffset);
      ctx.lineTo(x, margin.top + yOffset + graphHeight);
      ctx.stroke();
    }
    
    // Horizontal grid lines (magnitude)
    for (let i = 0; i <= 10; i++) {
      const y = margin.top + yOffset + (i / 10) * graphHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + graphWidth, y);
      ctx.stroke();
    }

    // Draw magnitude curve
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    result.points.forEach((point, index) => {
      const x = margin.left + (Math.log10(point.frequency) - Math.log10(inputs.startFrequency)) / 
                (Math.log10(inputs.endFrequency) - Math.log10(inputs.startFrequency)) * graphWidth;
      const y = margin.top + yOffset + graphHeight - ((point.magnitudeDb - (minMag - magPadding)) / 
                (maxMag + magPadding - (minMag - magPadding))) * graphHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw axes labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Frequency (Hz)', width / 2, margin.top + yOffset + graphHeight + 35);
    
    ctx.save();
    ctx.translate(15, margin.top + yOffset + graphHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Magnitude (dB)', 0, 0);
    ctx.restore();

    // Draw title
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Magnitude Response', width / 2, margin.top + yOffset - 5);
  };

  const drawPhaseGraph = (ctx: CanvasRenderingContext2D, width: number, height: number, margin: any, yOffset: number) => {
    if (!result) return;

    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height;

    // Find phase range
    const phases = result.points.map(p => p.phase);
    const minPhase = Math.min(...phases);
    const maxPhase = Math.max(...phases);
    const phaseRange = maxPhase - minPhase;
    const phasePadding = phaseRange * 0.1;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical grid lines (frequency)
    for (let i = 0; i <= 10; i++) {
      const x = margin.left + (i / 10) * graphWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin.top + yOffset);
      ctx.lineTo(x, margin.top + yOffset + graphHeight);
      ctx.stroke();
    }
    
    // Horizontal grid lines (phase)
    for (let i = 0; i <= 10; i++) {
      const y = margin.top + yOffset + (i / 10) * graphHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + graphWidth, y);
      ctx.stroke();
    }

    // Draw phase curve
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();

    result.points.forEach((point, index) => {
      const x = margin.left + (Math.log10(point.frequency) - Math.log10(inputs.startFrequency)) / 
                (Math.log10(inputs.endFrequency) - Math.log10(inputs.startFrequency)) * graphWidth;
      const y = margin.top + yOffset + graphHeight - ((point.phase - (minPhase - phasePadding)) / 
                (maxPhase + phasePadding - (minPhase - phasePadding))) * graphHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw axes labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Frequency (Hz)', width / 2, margin.top + yOffset + graphHeight + 35);
    
    ctx.save();
    ctx.translate(15, margin.top + yOffset + graphHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Phase (degrees)', 0, 0);
    ctx.restore();

    // Draw title
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Phase Response', width / 2, margin.top + yOffset - 5);
  };

  const handleInputChange = (field: keyof FrequencyResponseInputs, value: string | number | DisplayMode | SamplingPoints) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      transferFunction: "1/(1+jω)",
      startFrequency: 0.1,
      endFrequency: 100,
      samplingPoints: 500,
      displayMode: 'both'
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputs(prev => ({
      ...prev,
      transferFunction: preset.transferFunction,
      startFrequency: preset.startFrequency,
      endFrequency: preset.endFrequency,
      samplingPoints: preset.samplingPoints
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Transfer Function: ${result.transferFunction}\nSystem Type: ${result.systemType}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(inputs, result);
      downloadFile(text, 'frequency_response_analysis.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'frequency_response_data.csv');
    }
  };

  const handleExportGraph = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'frequency_response_graph.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Frequency Response Calculator</h3>
              <p className="text-sm text-blue-800">
                Analyze frequency response of systems with real-time Bode plots. Enter transfer functions and visualize magnitude and phase response instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Result Display */}
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    System Analysis
                  </p>
                  <div className="text-2xl font-bold mb-1">
                    {result.systemType}
                  </div>
                  <div className="text-sm text-primary-100">
                    {result.points.length} frequency points
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">DC Gain:</span>
                    <span className="font-semibold">{formatNumber(result.characteristics.dcGain, 2)} dB</span>
                  </div>
                  {result.characteristics.cutoffFrequency && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Cutoff Freq:</span>
                      <span className="font-semibold">{formatNumber(result.characteristics.cutoffFrequency, 2)} Hz</span>
                    </div>
                  )}
                  {result.characteristics.peakGain !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Peak Gain:</span>
                      <span className="font-semibold">{formatNumber(result.characteristics.peakGain, 2)} dB</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Range:</span>
                    <span className="font-semibold text-xs">{inputs.startFrequency}-{inputs.endFrequency} Hz</span>
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

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                {result && (
                  <>
                    <button
                      onClick={handleExportGraph}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      🖼️ Export Graph
                    </button>
                    <button
                      onClick={handleExportText}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export TXT
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export CSV
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Transfer Function & Parameters
              </h3>
              
              {/* Transfer Function */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transfer Function H(jω)
                </label>
                <textarea
                  value={inputs.transferFunction}
                  onChange={(e) => handleInputChange('transferFunction', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono resize-none"
                  placeholder="1/(1+jω)"
                  rows={2}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use 'jω' for frequency variable. Examples: 1/(1+jω), jω/(1+jω), 1/jω
                </p>
              </div>

              {/* Frequency Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Frequency (Hz)
                  </label>
                  <input
                    type="number"
                    value={inputs.startFrequency}
                    onChange={(e) => handleInputChange('startFrequency', parseFloat(e.target.value) || 0.1)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.1"
                    step="any"
                    min="0.001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Frequency (Hz)
                  </label>
                  <input
                    type="number"
                    value={inputs.endFrequency}
                    onChange={(e) => handleInputChange('endFrequency', parseFloat(e.target.value) || 100)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    step="any"
                    min="0.001"
                  />
                </div>
              </div>

              {/* Sampling Points and Display Mode */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sampling Points
                  </label>
                  <select
                    value={inputs.samplingPoints}
                    onChange={(e) => handleInputChange('samplingPoints', parseInt(e.target.value) as SamplingPoints)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="100">100 points</option>
                    <option value="500">500 points</option>
                    <option value="1000">1000 points</option>
                    <option value="2000">2000 points</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Mode
                  </label>
                  <select
                    value={inputs.displayMode}
                    onChange={(e) => handleInputChange('displayMode', e.target.value as DisplayMode)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="magnitude">Magnitude Only</option>
                    <option value="phase">Phase Only</option>
                    <option value="both">Both (Bode Plot)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Graph Display */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Frequency Response Plot
                </h3>
                
                <canvas
                  ref={canvasRef}
                  className="w-full border border-gray-200 rounded-lg"
                  style={{ height: inputs.displayMode === 'both' ? '500px' : '300px' }}
                />
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Transfer Functions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-mono mt-1">{preset.transferFunction}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Analysis Steps
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {result.steps.map((step, index) => (
                    <div key={index} className={step === '' ? 'h-2' : 'text-gray-700'}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Analysis History
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
                      No analyses saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {entry.result.systemType}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 font-mono">
                          H(jω) = {entry.result.transferFunction}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {entry.inputs.startFrequency}-{entry.inputs.endFrequency} Hz | {entry.inputs.samplingPoints} points
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

      <FrequencyResponseCalculatorSEO />
      <RelatedTools
        currentTool="frequency-response-calculator"
        tools={['ohms-law-calculator', 'capacitor-calculator', 'inductor-calculator', 'impedance-calculator']}
      />
    </>
  );
}