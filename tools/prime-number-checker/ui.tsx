"use client";

import { useState, useEffect, useRef } from "react";
import { 
  checkPrime, 
  sieveOfEratosthenes, 
  formatPrimeList, 
  exportPrimesAsCSV, 
  exportPrimesAsJSON,
  getPrimeDensity,
  PrimeCheckResult,
  SieveResult
} from "./logic";
import PrimeNumberCheckerSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'check' | 'generate';

export default function PrimeNumberCheckerUI() {
  const [mode, setMode] = useState<Mode>('check');
  const [inputNumber, setInputNumber] = useState<string>("17");
  const [generateLimit, setGenerateLimit] = useState<string>("100");
  const [primeResult, setPrimeResult] = useState<PrimeCheckResult | null>(null);
  const [sieveResult, setSieveResult] = useState<SieveResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState("");
  const [showVisualization, setShowVisualization] = useState(false);
  const [visualizationStep, setVisualizationStep] = useState(0);
  const [sieveGrid, setSieveGrid] = useState<{ number: number; isPrime: boolean; isMarked: boolean }[]>([]);
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Check prime on input change
  useEffect(() => {
    if (mode === 'check' && inputNumber) {
      const num = parseInt(inputNumber);
      if (!isNaN(num) && num >= 0) {
        const result = checkPrime(num);
        setPrimeResult(result);
      } else {
        setPrimeResult(null);
      }
    }
  }, [inputNumber, mode]);

  const handleGeneratePrimes = () => {
    const limit = parseInt(generateLimit);
    if (isNaN(limit) || limit < 2) return;

    setIsCalculating(true);
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const result = sieveOfEratosthenes(limit);
      setSieveResult(result);
      setIsCalculating(false);
      
      if (showVisualization && limit <= 100) {
        startVisualization(limit);
      }
    }, 100);
  };

  const startVisualization = (limit: number) => {
    // Initialize grid
    const grid: { number: number; isPrime: boolean; isMarked: boolean }[] = [];
    for (let i = 2; i <= limit; i++) {
      grid.push({ number: i, isPrime: true, isMarked: false });
    }
    setSieveGrid(grid);
    setVisualizationStep(0);

    // Animate sieve process
    let currentPrime = 2;
    let step = 0;

    const animate = () => {
      if (currentPrime * currentPrime > limit) {
        // Animation complete
        if (animationRef.current) clearTimeout(animationRef.current);
        return;
      }

      // Mark multiples of current prime
      setSieveGrid(prevGrid => {
        const newGrid = [...prevGrid];
        for (let i = currentPrime * currentPrime; i <= limit; i += currentPrime) {
          const index = newGrid.findIndex(item => item.number === i);
          if (index !== -1) {
            newGrid[index] = { ...newGrid[index], isPrime: false, isMarked: true };
          }
        }
        return newGrid;
      });

      // Find next prime
      do {
        currentPrime++;
      } while (currentPrime <= limit && currentPrime * currentPrime <= limit);

      setVisualizationStep(step++);
      animationRef.current = setTimeout(animate, 800);
    };

    animationRef.current = setTimeout(animate, 1000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    if (!sieveResult) return;
    const csv = exportPrimesAsCSV(sieveResult.primes);
    downloadFile(csv, `primes_up_to_${sieveResult.maxNumber}.csv`, "text/csv");
  };

  const handleExportJSON = () => {
    if (!sieveResult) return;
    const json = exportPrimesAsJSON(sieveResult.primes);
    downloadFile(json, `primes_up_to_${sieveResult.maxNumber}.json`, "application/json");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Mode Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-xl w-fit mx-auto lg:mx-0">
        <button 
          onClick={() => setMode('check')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'check' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Prime Check
        </button>
        <button 
          onClick={() => setMode('generate')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'generate' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Generate Primes
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            
            {mode === 'check' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enter a Number</label>
                  <input 
                    type="number" 
                    value={inputNumber} 
                    onChange={(e) => setInputNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter number to check..."
                    min="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {[2, 17, 25, 97, 100, 997].map((num) => (
                      <button 
                        key={num}
                        onClick={() => setInputNumber(num.toString())}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {mode === 'generate' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Find all primes up to N</label>
                  <input 
                    type="number" 
                    value={generateLimit} 
                    onChange={(e) => setGenerateLimit(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter upper limit..."
                    min="2"
                    max="1000000"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <label className="text-sm font-semibold text-gray-700">Show Visualization</label>
                       <p className="text-[10px] text-gray-400">Animate sieve process (works best for N ≤ 100)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showVisualization} 
                        onChange={(e) => setShowVisualization(e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={handleGeneratePrimes}
                  disabled={isCalculating}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {isCalculating ? "GENERATING..." : "GENERATE PRIMES"}
                </button>
              </>
            )}

          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8">
          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
            
            {/* Prime Check Results */}
            {mode === 'check' && (
              <div className="p-8 text-center">
                {primeResult ? (
                  <div className="space-y-6">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl ${primeResult.isPrime ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {primeResult.isPrime ? '✓' : '✗'}
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                        {primeResult.number}
                      </h2>
                      <p className={`text-xl font-bold ${primeResult.isPrime ? 'text-green-600' : 'text-red-600'}`}>
                        {primeResult.isPrime ? 'IS PRIME' : 'IS NOT PRIME'}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 max-w-md mx-auto">
                      <p className="text-sm text-gray-700">{primeResult.explanation}</p>
                      {primeResult.factors && primeResult.factors.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs font-semibold text-gray-500 mb-2">Factors:</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {primeResult.factors.map((factor, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                                {factor}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => copyToClipboard(`${primeResult.number} ${primeResult.isPrime ? 'is prime' : 'is not prime'}`, 'result')}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg transition-colors"
                    >
                      {copied === 'result' ? '✓ Copied' : '📋 Copy Result'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 opacity-30">
                    <span className="text-8xl">🔢</span>
                    <p className="text-sm font-bold uppercase tracking-widest">Enter a number to check</p>
                  </div>
                )}
              </div>
            )}

            {/* Prime Generation Results */}
            {mode === 'generate' && (
              <div className="flex flex-col h-full">
                {sieveResult ? (
                  <>
                    <div className="p-6 bg-gray-50 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Prime Numbers up to {sieveResult.maxNumber}</h3>
                          <p className="text-sm text-gray-600">
                            Found {sieveResult.totalCount} primes • Density: {getPrimeDensity(sieveResult.primes, sieveResult.maxNumber).toFixed(1)}%
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => copyToClipboard(formatPrimeList(sieveResult.primes), 'primes')}
                            className="bg-white border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all text-sm"
                          >
                            {copied === 'primes' ? '✓ Copied' : '📋 Copy List'}
                          </button>
                          <button 
                            onClick={handleExportCSV}
                            className="bg-primary text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm"
                          >
                            💾 CSV
                          </button>
                          <button 
                            onClick={handleExportJSON}
                            className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm"
                          >
                            📄 JSON
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Visualization Grid */}
                    {showVisualization && sieveGrid.length > 0 && parseInt(generateLimit) <= 100 && (
                      <div className="p-6 bg-blue-50 border-b border-gray-100">
                        <h4 className="text-sm font-bold text-blue-900 mb-3">Sieve of Eratosthenes Visualization</h4>
                        <div className="grid grid-cols-10 gap-1 max-w-md">
                          {sieveGrid.map((item) => (
                            <div 
                              key={item.number}
                              className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded transition-all ${
                                item.isMarked && !item.isPrime 
                                  ? 'bg-red-200 text-red-700 line-through' 
                                  : item.isPrime 
                                    ? 'bg-green-200 text-green-700' 
                                    : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {item.number}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prime Numbers Grid */}
                    <div className="flex-1 p-6 overflow-y-auto">
                      <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                        {sieveResult.primes.map((prime, index) => (
                          <div 
                            key={index}
                            className="aspect-square bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center text-sm font-bold text-primary hover:bg-primary/10 transition-colors cursor-default"
                            title={`Prime #${index + 1}: ${prime}`}
                          >
                            {prime}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    {isCalculating ? (
                      <div className="space-y-4 text-center animate-pulse">
                        <div className="text-6xl">⚡</div>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest">Calculating primes...</p>
                      </div>
                    ) : (
                      <div className="space-y-3 opacity-30 text-center">
                        <span className="text-8xl">🧮</span>
                        <p className="text-sm font-bold uppercase tracking-widest">Generate primes to see results</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      <PrimeNumberCheckerSEO />
      
      <RelatedTools 
        currentTool="prime-number-checker"
        tools={['scientific-calculator', 'random-number-generator', 'percentage-calculator']}
      />
    </div>
  );
}