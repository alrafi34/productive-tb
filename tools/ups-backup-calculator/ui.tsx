"use client";

import { useState, useEffect, useCallback } from "react";
import { UPSBackupInputs, UPSBackupResult, CapacityMode } from "./types";
import {
  calculateBackupTime,
  validateInputs,
  getBatteryPresets,
  getLoadPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  saveScenario,
  getScenarios,
  deleteScenario,
  exportToText,
  downloadFile,
  formatNumber,
  formatTimeHHMM,
  debounce,
  HistoryEntry,
  Scenario
} from "./logic";
import UPSBackupCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function UPSBackupCalculatorUI() {
  const [inputs, setInputs] = useState<UPSBackupInputs>({
    loadPower: 300,
    capacityMode: 'battery',
    voltage: 12,
    ampereHour: 40,
    efficiency: 85,
    powerFactor: 0.8,
    safetyBuffer: 20,
  });
  
  const [result, setResult] = useState<UPSBackupResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());
  const [scenarios, setScenarios] = useState<Scenario[]>(getScenarios());
  const [scenarioName, setScenarioName] = useState("");

  const batteryPresets = getBatteryPresets();
  const loadPresets = getLoadPresets();

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
        const calculatedResult = calculateBackupTime(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleInputChange = (field: keyof UPSBackupInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleModeChange = (mode: CapacityMode) => {
    const newInputs: UPSBackupInputs = {
      ...inputs,
      capacityMode: mode,
    };

    if (mode === 'va') {
      newInputs.vaRating = 1000;
    } else if (mode === 'wh') {
      newInputs.wattHour = 480;
    } else if (mode === 'battery') {
      newInputs.voltage = 12;
      newInputs.ampereHour = 40;
    }

    setInputs(newInputs);
  };

  const handleReset = () => {
    setInputs({
      loadPower: 300,
      capacityMode: 'battery',
      voltage: 12,
      ampereHour: 40,
      efficiency: 85,
      powerFactor: 0.8,
      safetyBuffer: 20,
    });
    setResult(null);
    setError(null);
    setShowAdvanced(false);
  };

  const handleApplyBatteryPreset = (preset: typeof batteryPresets[0]) => {
    setInputs(prev => ({
      ...prev,
      capacityMode: 'battery',
      voltage: preset.voltage,
      ampereHour: preset.ampereHour,
    }));
  };

  const handleApplyLoadPreset = (preset: typeof loadPresets[0]) => {
    setInputs(prev => ({ ...prev, loadPower: preset.power }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `UPS Backup Time: ${formatNumber(result.backupTimeHours, 2)} hours (${result.backupTimeFormatted})`;
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

  const handleSaveScenario = () => {
    if (scenarioName.trim()) {
      saveScenario(scenarioName, inputs);
      setScenarios(getScenarios());
      setScenarioName("");
    }
  };

  const handleDeleteScenario = (id: string) => {
    deleteScenario(id);
    setScenarios(getScenarios());
  };

  const handleLoadScenario = (scenario: Scenario) => {
    setInputs(scenario.inputs);
    setShowScenarios(false);
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(inputs, result);
      downloadFile(text, 'ups_backup_calculation.txt');
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
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏱️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">UPS Backup Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate how long your UPS will run based on battery capacity and connected load power.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-6">
            
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Backup Time
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.backupTimeHours, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    hours
                  </div>
                  <div className="text-lg text-primary-100 mt-2">
                    ≈ {result.backupTimeFormatted}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Energy:</span>
                    <span className="font-semibold">{formatNumber(result.totalEnergyWh, 2)} Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Usable Energy:</span>
                    <span className="font-semibold">{formatNumber(result.usableEnergyWh, 2)} Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Load Power:</span>
                    <span className="font-semibold">{inputs.loadPower} W</span>
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
                <button
                  onClick={() => setShowScenarios(!showScenarios)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📁 {showScenarios ? 'Hide' : 'Show'} Scenarios
                </button>
                {result && (
                  <button
                    onClick={handleExportText}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export Report
                  </button>
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Capacity Mode
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleModeChange('battery')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    inputs.capacityMode === 'battery'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Battery (V+Ah)
                </button>
                <button
                  onClick={() => handleModeChange('va')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    inputs.capacityMode === 'va'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  VA Rating
                </button>
                <button
                  onClick={() => handleModeChange('wh')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    inputs.capacityMode === 'wh'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Watt-hour
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load Power (Watts)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.loadPower || ''}
                    onChange={(e) => handleInputChange('loadPower', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="300"
                    min="0"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    W
                  </div>
                </div>
              </div>

              {inputs.capacityMode === 'battery' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Voltage
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.voltage || ''}
                        onChange={(e) => handleInputChange('voltage', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="12"
                        min="0"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        V
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Capacity
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.ampereHour || ''}
                        onChange={(e) => handleInputChange('ampereHour', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="40"
                        min="0"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        Ah
                      </div>
                    </div>
                  </div>
                </>
              )}

              {inputs.capacityMode === 'va' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VA Rating
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.vaRating || ''}
                      onChange={(e) => handleInputChange('vaRating', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1000"
                      min="0"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      VA
                    </div>
                  </div>
                </div>
              )}

              {inputs.capacityMode === 'wh' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Watt-hour
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.wattHour || ''}
                      onChange={(e) => handleInputChange('wattHour', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="480"
                      min="0"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      Wh
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Efficiency: {inputs.efficiency}%
                </label>
                <input
                  type="range"
                  value={inputs.efficiency}
                  onChange={(e) => handleInputChange('efficiency', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="50"
                  max="100"
                  step="5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Safety Buffer: {inputs.safetyBuffer}%
                    </label>
                    <input
                      type="range"
                      value={inputs.safetyBuffer}
                      onChange={(e) => handleInputChange('safetyBuffer', parseFloat(e.target.value))}
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
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {result && result.warning && !error && (
              <div className={`rounded-xl border p-4 ${
                result.isOverload ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{result.isOverload ? '⚠️' : 'ℹ️'}</span>
                  <span className={`font-medium ${
                    result.isOverload ? 'text-red-800' : 'text-yellow-800'
                  }`}>{result.warning}</span>
                </div>
              </div>
            )}

            {inputs.capacityMode === 'battery' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Battery Presets
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {batteryPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplyBatteryPreset(preset)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Load Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {loadPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyLoadPreset(preset)}
                    className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-xs">{preset.name}</div>
                    <div className="text-xs text-primary font-semibold">{preset.power}W</div>
                  </button>
                ))}
              </div>
            </div>

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

            {showScenarios && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Saved Scenarios
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      placeholder="Scenario name..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={handleSaveScenario}
                      disabled={!scenarioName.trim()}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {scenarios.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No scenarios saved yet
                    </div>
                  ) : (
                    scenarios.map((scenario) => (
                      <div
                        key={scenario.id}
                        className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <button
                          onClick={() => handleLoadScenario(scenario)}
                          className="flex-1 text-left"
                        >
                          <div className="font-semibold text-gray-900">{scenario.name}</div>
                          <div className="text-sm text-gray-600">
                            {scenario.inputs.loadPower}W load
                          </div>
                        </button>
                        <button
                          onClick={() => handleDeleteScenario(scenario.id)}
                          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

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
                            {formatNumber(entry.result.backupTimeHours, 2)} hours
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.loadPower}W load | {entry.result.backupTimeFormatted}
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

      <UPSBackupCalculatorSEO />
      <RelatedTools
        currentTool="ups-backup-calculator"
        tools={['ups-load-calculator', 'battery-backup-time-calculator', 'battery-capacity-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}
