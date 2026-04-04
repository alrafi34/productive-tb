'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  parseOptions,
  generateWheelOptions,
  drawWheel,
  spinWheel,
  triggerConfetti,
  saveWheelConfig,
  loadWheelConfigs,
  downloadWheelImage,
  copyResult,
  shuffleArray,
  removeDuplicates,
  DEFAULT_OPTIONS,
  EXAMPLE_OPTIONS,
  WheelOption,
  SpinResult
} from './logic';
import DecisionWheelSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function DecisionWheelUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [optionsText, setOptionsText] = useState(DEFAULT_OPTIONS.join('\n'));
  const [wheelOptions, setWheelOptions] = useState<WheelOption[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [spinDuration, setSpinDuration] = useState(4000);
  const [history, setHistory] = useState<SpinResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update wheel options when text changes
  useEffect(() => {
    const options = parseOptions(optionsText);
    const wheelOpts = generateWheelOptions(options);
    setWheelOptions(wheelOpts);
    
    if (canvasRef.current && wheelOpts.length > 0) {
      drawWheel(canvasRef.current, wheelOpts);
    }
  }, [optionsText]);

  // Initialize canvas on mount
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth - 40, 400);
        canvas.width = size;
        canvas.height = size;
        
        if (wheelOptions.length > 0) {
          drawWheel(canvas, wheelOptions);
        }
      }
    }
  }, [wheelOptions]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && wheelOptions.length > 0) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          const size = Math.min(container.clientWidth - 40, 400);
          canvas.width = size;
          canvas.height = size;
          drawWheel(canvas, wheelOptions);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [wheelOptions]);

  const handleSpin = useCallback(() => {
    if (wheelOptions.length < 2 || isSpinning || !canvasRef.current) return;

    setIsSpinning(true);
    setWinner(null);

    spinWheel(canvasRef.current, wheelOptions, spinDuration, (winnerText, finalAngle) => {
      setWinner(winnerText);
      setIsSpinning(false);
      
      const result: SpinResult = {
        winner: winnerText,
        angle: finalAngle,
        timestamp: new Date()
      };
      
      setHistory(prev => [result, ...prev.slice(0, 9)]);
      saveWheelConfig(parseOptions(optionsText));
      triggerConfetti();
    });
  }, [wheelOptions, isSpinning, spinDuration, optionsText]);

  const handleClear = () => {
    setOptionsText('');
    setWinner(null);
  };

  const handleShuffle = () => {
    const options = parseOptions(optionsText);
    const shuffled = shuffleArray(options);
    setOptionsText(shuffled.join('\n'));
  };

  const handleRemoveDuplicates = () => {
    const options = parseOptions(optionsText);
    const unique = removeDuplicates(options);
    setOptionsText(unique.join('\n'));
  };

  const handleExampleSelect = (key: keyof typeof EXAMPLE_OPTIONS) => {
    setOptionsText(EXAMPLE_OPTIONS[key].join('\n'));
    setWinner(null);
  };

  const handleCopyResult = async () => {
    if (winner) {
      const success = await copyResult(winner);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    if (canvasRef.current && winner) {
      downloadWheelImage(canvasRef.current, winner);
    }
  };

  // Keyboard shortcut for spinning
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpinning && wheelOptions.length >= 2) {
        e.preventDefault();
        handleSpin();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSpin, isSpinning, wheelOptions.length]);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Quick Examples */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Examples</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(EXAMPLE_OPTIONS).map(([key, options]) => (
              <button
                key={key}
                onClick={() => handleExampleSelect(key as keyof typeof EXAMPLE_OPTIONS)}
                className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
              >
                <div className="font-medium text-sm text-gray-800 capitalize">{key}</div>
                <div className="text-xs text-gray-500 mt-1">{options.length} options</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Enter Options</h2>
                <span className="text-sm text-gray-500">
                  {parseOptions(optionsText).length} options
                </span>
              </div>
              
              <textarea
                value={optionsText}
                onChange={(e) => setOptionsText(e.target.value)}
                placeholder="Enter options (one per line)&#10;Pizza&#10;Burger&#10;Sushi&#10;Pasta"
                className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={handleShuffle}
                  disabled={parseOptions(optionsText).length < 2}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  🔀 Shuffle
                </button>
                <button
                  onClick={handleRemoveDuplicates}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Remove Duplicates
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spin Duration: {spinDuration / 1000}s
                  </label>
                  <input
                    type="range"
                    min="2000"
                    max="10000"
                    step="500"
                    value={spinDuration}
                    onChange={(e) => setSpinDuration(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2s</span>
                    <span>10s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wheel Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Decision Wheel</h2>
                {winner && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyResult}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      {copied ? '✓ Copied' : '📋 Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      📥 Download
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border border-gray-200 rounded-lg"
                    style={{ width: '100%', maxWidth: '400px', aspectRatio: '1' }}
                  />
                  {wheelOptions.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Enter options to see the wheel</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSpin}
                  disabled={wheelOptions.length < 2 || isSpinning}
                  className="px-8 py-4 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors text-lg disabled:cursor-not-allowed"
                >
                  {isSpinning ? '🎡 Spinning...' : '🎲 Spin the Wheel'}
                </button>
                
                {wheelOptions.length < 2 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Add at least 2 options to spin the wheel
                  </p>
                )}
                
                {wheelOptions.length >= 2 && !isSpinning && (
                  <p className="text-sm text-gray-500 mt-2">
                    Press Space to spin
                  </p>
                )}
              </div>
            </div>

            {/* Winner Display */}
            {winner && !isSpinning && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-500 p-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Winner!</h3>
                  <div className="text-2xl font-bold text-primary mb-4">{winner}</div>
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Results</h3>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    {showHistory ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showHistory && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {history.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">{result.winner}</span>
                        <span className="text-xs text-gray-500">
                          {result.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <DecisionWheelSEOContent />
      <RelatedTools
        currentTool="decision-wheel"
        tools={["random-name-picker", "random-number-generator", "habit-tracker"]}
      />

      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    </>
  );
}