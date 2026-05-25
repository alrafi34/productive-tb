"use client";

import { useState, useEffect, useCallback } from "react";
import { Device, UPSInputs, UPSResult } from "./types";
import {
  calculateUPSLoad,
  validateInputs,
  getDevicePresets,
  getSystemPresets,
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
import UPSLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function UPSLoadCalculatorUI() {
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", name: "Desktop PC", watts: 300, quantity: 1 },
  ]);
  
  const [inputs, setInputs] = useState<UPSInputs>({
    devices: devices,
    safetyMargin: 20,
    powerFactor: 0.8,
    batteryEfficiency: 85,
  });
  
  const [result, setResult] = useState<UPSResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const devicePresets = getDevicePresets();
  const systemPresets = getSystemPresets();

  // Update inputs when devices change
  useEffect(() => {
    setInputs(prev => ({ ...prev, devices }));
  }, [devices]);

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
        const calculatedResult = calculateUPSLoad(inputs);
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

  const handleAddDevice = () => {
    const newDevice: Device = {
      id: Date.now().toString(),
      name: "",
      watts: 0,
      quantity: 1,
    };
    setDevices([...devices, newDevice]);
  };

  const handleRemoveDevice = (id: string) => {
    if (devices.length > 1) {
      setDevices(devices.filter(d => d.id !== id));
    }
  };

  const handleDeviceChange = (id: string, field: keyof Device, value: string | number) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const handleApplyPreset = (preset: typeof devicePresets[0]) => {
    const newDevice: Device = {
      id: Date.now().toString(),
      name: preset.name,
      watts: preset.watts,
      quantity: 1,
    };
    setDevices([...devices, newDevice]);
  };

  const handleApplySystemPreset = (preset: typeof systemPresets[0]) => {
    const newDevices: Device[] = preset.devices.map((d, index) => ({
      id: `${Date.now()}-${index}`,
      name: d.name,
      watts: d.watts,
      quantity: d.quantity,
    }));
    setDevices(newDevices);
  };

  const handleInputChange = (field: keyof UPSInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setDevices([{ id: "1", name: "Desktop PC", watts: 300, quantity: 1 }]);
    setInputs({
      devices: [{ id: "1", name: "Desktop PC", watts: 300, quantity: 1 }],
      safetyMargin: 20,
      powerFactor: 0.8,
      batteryEfficiency: 85,
    });
    setResult(null);
    setError(null);
    setShowAdvanced(false);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Total Load: ${formatNumber(result.totalLoad, 2)} W | Required UPS: ${result.recommendedUPS} VA`;
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
      downloadFile(text, 'ups_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'ups_load_calculation.csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setDevices(entry.inputs.devices);
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getLoadColor = () => {
    if (!result) return 'text-gray-600';
    if (result.totalLoad < 300) return 'text-green-600';
    if (result.totalLoad < 1000) return 'text-yellow-600';
    if (result.totalLoad < 2000) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔋</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">UPS Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate required UPS capacity based on connected devices. Add your equipment, set safety margins, and get instant UPS sizing recommendations.
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
                    Recommended UPS
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.recommendedUPS}
                  </div>
                  <div className="text-xl text-primary-100">
                    VA
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Load:</span>
                    <span className="font-semibold">{formatNumber(result.totalLoad, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adjusted Load:</span>
                    <span className="font-semibold">{formatNumber(result.adjustedLoad, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Required VA:</span>
                    <span className="font-semibold">{formatNumber(result.requiredVA, 2)} VA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Devices:</span>
                    <span className="font-semibold">{result.deviceCount}</span>
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
                  onClick={handleAddDevice}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium text-sm"
                >
                  ➕ Add Device
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Reset All
                </button>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ {showAdvanced ? 'Hide' : 'Show'} Advanced
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
            
            {/* Device List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Connected Devices
              </h3>
              
              <div className="space-y-3">
                {devices.map((device, index) => (
                  <div key={device.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="Device name"
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={device.watts || ''}
                          onChange={(e) => handleDeviceChange(device.id, 'watts', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          placeholder="Watts"
                          min="0"
                        />
                        <span className="text-xs text-gray-600 font-semibold">W</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={device.quantity || ''}
                        onChange={(e) => handleDeviceChange(device.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                        placeholder="Qty"
                        min="1"
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        disabled={devices.length === 1}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                UPS Settings
              </h3>
              
              {/* Safety Margin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Margin: {inputs.safetyMargin}%
                </label>
                <input
                  type="range"
                  value={inputs.safetyMargin}
                  onChange={(e) => handleInputChange('safetyMargin', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0"
                  max="50"
                  step="5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Recommended: 20-30% for future expansion
                </p>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Power Factor: {inputs.powerFactor}
                    </label>
                    <input
                      type="range"
                      value={inputs.powerFactor}
                      onChange={(e) => handleInputChange('powerFactor', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      min="0.6"
                      max="1"
                      step="0.05"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.6</span>
                      <span>0.8</span>
                      <span>1.0</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Standard UPS power factor: 0.8
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Efficiency: {inputs.batteryEfficiency}%
                    </label>
                    <input
                      type="range"
                      value={inputs.batteryEfficiency}
                      onChange={(e) => handleInputChange('batteryEfficiency', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      min="70"
                      max="95"
                      step="5"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>70%</span>
                      <span>85%</span>
                      <span>95%</span>
                    </div>
                  </div>
                </div>
              )}
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

            {/* Device Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Add Devices
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {devicePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-xs">{preset.name}</div>
                    <div className="text-xs text-primary font-semibold">{preset.watts}W</div>
                  </button>
                ))}
              </div>
            </div>

            {/* System Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                System Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {systemPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplySystemPreset(preset)}
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
                            {entry.result.recommendedUPS} VA UPS
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.deviceCount} devices | {formatNumber(entry.result.totalLoad, 2)} W total load
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

      <UPSLoadCalculatorSEO />
      <RelatedTools
        currentTool="ups-load-calculator"
        tools={['battery-backup-time-calculator', 'power-consumption-calculator', 'generator-size-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}
