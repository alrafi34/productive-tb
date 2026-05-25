"use client";

import { useState, useEffect, useCallback } from "react";
import { PowerSupplyInputs, PowerSupplyResult, HistoryEntry, StorageDevice, PeripheralDevice } from "./types";
import {
  calculatePowerSupply,
  validateInputs,
  getPresets,
  getCPUList,
  getGPUList,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
} from "./logic";
import PowerSupplyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PowerSupplyCalculatorUI() {
  const [inputs, setInputs] = useState<PowerSupplyInputs>({
    cpu: "AMD Ryzen 5 7600X",
    gpu: "RTX 4070",
    ram: 16,
    storage: [{ type: 'ssd', count: 1 }],
    cooling: 'air',
    peripherals: [{ type: 'keyboard-mouse', count: 1 }],
    overclocking: false,
    safetyMargin: 20
  });
  
  const [result, setResult] = useState<PowerSupplyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const presets = getPresets();
  const cpuList = getCPUList();
  const gpuList = getGPUList();

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
        const calculatedResult = calculatePowerSupply(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleInputChange = (field: keyof PowerSupplyInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleStorageChange = (index: number, field: keyof StorageDevice, value: any) => {
    const newStorage = [...inputs.storage];
    newStorage[index] = { ...newStorage[index], [field]: value };
    setInputs(prev => ({ ...prev, storage: newStorage }));
  };

  const addStorage = () => {
    setInputs(prev => ({
      ...prev,
      storage: [...prev.storage, { type: 'ssd', count: 1 }]
    }));
  };

  const removeStorage = (index: number) => {
    setInputs(prev => ({
      ...prev,
      storage: prev.storage.filter((_, i) => i !== index)
    }));
  };

  const handlePeripheralChange = (index: number, field: keyof PeripheralDevice, value: any) => {
    const newPeripherals = [...inputs.peripherals];
    newPeripherals[index] = { ...newPeripherals[index], [field]: value };
    setInputs(prev => ({ ...prev, peripherals: newPeripherals }));
  };

  const addPeripheral = () => {
    setInputs(prev => ({
      ...prev,
      peripherals: [...prev.peripherals, { type: 'keyboard-mouse', count: 1 }]
    }));
  };

  const removePeripheral = (index: number) => {
    setInputs(prev => ({
      ...prev,
      peripherals: prev.peripherals.filter((_, i) => i !== index)
    }));
  };

  const handleReset = () => {
    setInputs({
      cpu: "AMD Ryzen 5 7600X",
      gpu: "RTX 4070",
      ram: 16,
      storage: [{ type: 'ssd', count: 1 }],
      cooling: 'air',
      peripherals: [{ type: 'keyboard-mouse', count: 1 }],
      overclocking: false,
      safetyMargin: 20
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputs({
      cpu: preset.cpu,
      gpu: preset.gpu,
      ram: preset.ram,
      storage: preset.storage,
      cooling: preset.cooling,
      peripherals: preset.peripherals,
      overclocking: false,
      safetyMargin: 20
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `PSU Recommendation: ${result.recommendedPSU}W (Load: ${formatNumber(result.totalLoad)}W, ${formatNumber(result.loadPercentage, 1)}% efficiency)`;
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
      downloadFile(text, 'psu_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'psu_calculation.csv');
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

  const getEfficiencyColor = (percentage: number) => {
    if (percentage < 20 || percentage > 90) return 'text-red-600';
    if (percentage < 50 || percentage > 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔌</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Power Supply Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate recommended PSU wattage for PC builds based on components. Get accurate power consumption estimates for gaming and workstation systems.
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
                    Recommended PSU
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.recommendedPSU}W
                  </div>
                  <div className="text-xl text-primary-100">
                    Power Supply
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">System Load:</span>
                    <span className="font-semibold">{formatNumber(result.totalLoad)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Load %:</span>
                    <span className="font-semibold">{formatNumber(result.loadPercentage, 1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Efficiency:</span>
                    <span className="font-semibold text-xs">{result.efficiency.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Load Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-primary-100 mb-1">
                    <span>Load</span>
                    <span>{formatNumber(result.loadPercentage, 1)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        result.loadPercentage < 20 || result.loadPercentage > 90 ? 'bg-red-400' :
                        result.loadPercentage < 50 || result.loadPercentage > 80 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${Math.min(result.loadPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-primary-100 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
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
            
            {/* Core Components */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Core Components
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPU
                  </label>
                  <select
                    value={inputs.cpu}
                    onChange={(e) => handleInputChange('cpu', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {cpuList.map(cpu => (
                      <option key={cpu} value={cpu}>{cpu}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPU
                  </label>
                  <select
                    value={inputs.gpu}
                    onChange={(e) => handleInputChange('gpu', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {gpuList.map(gpu => (
                      <option key={gpu} value={gpu}>{gpu}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RAM (GB)
                  </label>
                  <select
                    value={inputs.ram}
                    onChange={(e) => handleInputChange('ram', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value={8}>8 GB</option>
                    <option value={16}>16 GB</option>
                    <option value={32}>32 GB</option>
                    <option value={64}>64 GB</option>
                    <option value={128}>128 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cooling System
                  </label>
                  <select
                    value={inputs.cooling}
                    onChange={(e) => handleInputChange('cooling', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="stock">Stock Cooler</option>
                    <option value="air">Air Cooler</option>
                    <option value="liquid-aio">Liquid AIO</option>
                    <option value="custom-loop">Custom Loop</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Storage */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Storage Devices
                </h3>
                <button
                  onClick={addStorage}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
                >
                  + Add
                </button>
              </div>
              
              <div className="space-y-3">
                {inputs.storage.map((storage, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <select
                      value={storage.type}
                      onChange={(e) => handleStorageChange(index, 'type', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="ssd">SSD</option>
                      <option value="hdd">HDD</option>
                      <option value="nvme">NVMe SSD</option>
                    </select>
                    <input
                      type="number"
                      value={storage.count}
                      onChange={(e) => handleStorageChange(index, 'count', parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                      min="1"
                      max="10"
                    />
                    <button
                      onClick={() => removeStorage(index)}
                      className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={inputs.storage.length === 1}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Peripherals */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Peripherals
                </h3>
                <button
                  onClick={addPeripheral}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
                >
                  + Add
                </button>
              </div>
              
              <div className="space-y-3">
                {inputs.peripherals.map((peripheral, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <select
                      value={peripheral.type}
                      onChange={(e) => handlePeripheralChange(index, 'type', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="keyboard-mouse">Keyboard + Mouse</option>
                      <option value="rgb-basic">RGB Basic</option>
                      <option value="rgb-advanced">RGB Advanced</option>
                      <option value="speakers">Speakers</option>
                    </select>
                    <input
                      type="number"
                      value={peripheral.count}
                      onChange={(e) => handlePeripheralChange(index, 'count', parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                      min="1"
                      max="10"
                    />
                    <button
                      onClick={() => removePeripheral(index)}
                      className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={inputs.peripherals.length === 1}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Advanced Options
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="overclocking"
                    checked={inputs.overclocking}
                    onChange={(e) => handleInputChange('overclocking', e.target.checked)}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <label htmlFor="overclocking" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Overclocking (+15-20% power)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety Margin (%)
                  </label>
                  <select
                    value={inputs.safetyMargin}
                    onChange={(e) => handleInputChange('safetyMargin', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value={15}>15% (Minimum)</option>
                    <option value={20}>20% (Recommended)</option>
                    <option value={25}>25% (Conservative)</option>
                    <option value={30}>30% (Future-proof)</option>
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

            {/* Warnings */}
            {result && result.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Recommendations</span>
                </h4>
                <ul className="space-y-1">
                  {result.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-800">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Power Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Breakdown
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(result.breakdown.cpu)}W</div>
                    <div className="text-xs text-gray-600">CPU</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(result.breakdown.gpu)}W</div>
                    <div className="text-xs text-gray-600">GPU</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(result.breakdown.ram)}W</div>
                    <div className="text-xs text-gray-600">RAM</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(result.breakdown.storage + result.breakdown.cooling + result.breakdown.peripherals + result.breakdown.motherboard)}W</div>
                    <div className="text-xs text-gray-600">Other</div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Build Presets
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
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
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
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            PSU: {entry.result.recommendedPSU}W
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.cpu} + {entry.inputs.gpu} | Load: {formatNumber(entry.result.totalLoad)}W ({formatNumber(entry.result.loadPercentage, 1)}%)
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

      <PowerSupplyCalculatorSEO />
      <RelatedTools
        currentTool="power-supply-calculator"
        tools={['power-consumption-calculator', 'energy-consumption-calculator', 'electric-motor-power-calculator', 'power-loss-calculator']}
      />
    </>
  );
}