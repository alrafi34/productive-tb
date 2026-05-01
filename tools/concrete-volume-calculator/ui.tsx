"use client";

import { useState, useEffect } from "react";
import { Unit, ShapeType, ConcreteCalculation, SlabDimensions, ColumnDimensions, BeamDimensions, FootingDimensions, MixRatio } from "./types";
import {
  calculateConcreteVolume,
  getShapeDisplayName,
  getMixRatioPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportBatchToCSV,
  exportToText,
  downloadFile,
  formatNumber
} from "./logic";
import ConcreteVolumeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ConcreteVolumeCalculatorUI() {
  const [shape, setShape] = useState<ShapeType>("slab");
  const [unit, setUnit] = useState<Unit>("m");
  const [quantity, setQuantity] = useState("1");
  const [showMaterials, setShowMaterials] = useState(true);
  const [mixRatio, setMixRatio] = useState<MixRatio>({ cement: 1, sand: 2, aggregate: 4 });
  
  // Dimensions for different shapes
  const [slabDimensions, setSlabDimensions] = useState<SlabDimensions>({
    length: "",
    width: "",
    thickness: ""
  });
  
  const [columnDimensions, setColumnDimensions] = useState<ColumnDimensions>({
    radius: "",
    height: ""
  });
  
  const [beamDimensions, setBeamDimensions] = useState<BeamDimensions>({
    length: "",
    width: "",
    height: ""
  });
  
  const [footingDimensions, setFootingDimensions] = useState<FootingDimensions>({
    length: "",
    width: "",
    depth: ""
  });
  
  // Results and batch
  const [calculation, setCalculation] = useState<ConcreteCalculation | null>(null);
  const [batch, setBatch] = useState<ConcreteCalculation[]>([]);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate volume in real-time
  useEffect(() => {
    let dimensions: any = {};
    
    if (shape === 'slab') {
      dimensions = slabDimensions;
    } else if (shape === 'column' || shape === 'cylinder') {
      dimensions = columnDimensions;
    } else if (shape === 'beam') {
      dimensions = beamDimensions;
    } else if (shape === 'footing') {
      dimensions = footingDimensions;
    }
    
    const qty = parseInt(quantity) || 1;
    const result = calculateConcreteVolume(
      shape, 
      dimensions, 
      qty, 
      unit,
      showMaterials ? mixRatio : undefined
    );
    setCalculation(result);
  }, [shape, slabDimensions, columnDimensions, beamDimensions, footingDimensions, quantity, unit, showMaterials, mixRatio]);

  const handleShapeChange = (newShape: ShapeType) => {
    setShape(newShape);
    setCalculation(null);
  };

  const handleReset = () => {
    setSlabDimensions({ length: "", width: "", thickness: "" });
    setColumnDimensions({ radius: "", height: "" });
    setBeamDimensions({ length: "", width: "", height: "" });
    setFootingDimensions({ length: "", width: "", depth: "" });
    setQuantity("1");
    setCalculation(null);
  };

  const handleAddToBatch = () => {
    if (calculation) {
      setBatch([...batch, calculation]);
      handleReset();
    }
  };

  const handleRemoveFromBatch = (id: string) => {
    setBatch(batch.filter(item => item.id !== id));
  };

  const handleClearBatch = () => {
    if (confirm('Clear all batch entries?')) {
      setBatch([]);
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `${getShapeDisplayName(calculation.shape)}: ${formatNumber(calculation.totalVolume)} m³`;
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

  const handleExportBatchCSV = () => {
    if (batch.length > 0) {
      const csv = exportBatchToCSV(batch, showMaterials);
      downloadFile(csv, 'concrete_volume_batch.csv', 'text/csv');
    }
  };

  const handleExportBatchText = () => {
    if (batch.length > 0) {
      const text = exportToText(batch);
      downloadFile(text, 'concrete_volume_batch.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ConcreteCalculation) => {
    setShape(calc.shape);
    setUnit(calc.unit);
    setQuantity(calc.quantity.toString());
    setShowHistory(false);
  };

  const totalBatchVolume = batch.reduce((sum, item) => sum + item.totalVolume, 0);
  const totalBatchCement = batch.reduce((sum, item) => sum + (item.materials?.cementBags || 0), 0);
  const totalBatchSand = batch.reduce((sum, item) => sum + (item.materials?.sandVolume || 0), 0);
  const totalBatchAggregate = batch.reduce((sum, item) => sum + (item.materials?.aggregateVolume || 0), 0);

  const mixRatioPresets = getMixRatioPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Concrete Volume Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate exact volume of concrete for slabs, columns, beams, and footings. Supports batch calculations and unit conversion.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Shape Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shape Type</label>
                <select
                  value={shape}
                  onChange={(e) => handleShapeChange(e.target.value as ShapeType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="slab">Slab (Rectangular)</option>
                  <option value="column">Column (Cylindrical)</option>
                  <option value="beam">Beam (Rectangular)</option>
                  <option value="footing">Footing (Rectangular)</option>
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

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1"
                  min="1"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Number of identical structures
                </p>
              </div>

              {/* Material Calculation Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMaterials}
                    onChange={(e) => setShowMaterials(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Calculate cement & sand
                  </span>
                </label>
              </div>

              {/* Mix Ratio Selection */}
              {showMaterials && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mix Ratio</label>
                  <select
                    value={`${mixRatio.cement}:${mixRatio.sand}:${mixRatio.aggregate}`}
                    onChange={(e) => {
                      const preset = mixRatioPresets.find(p => 
                        `${p.ratio.cement}:${p.ratio.sand}:${p.ratio.aggregate}` === e.target.value
                      );
                      if (preset) setMixRatio(preset.ratio);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                  >
                    {mixRatioPresets.map((preset, idx) => (
                      <option key={idx} value={`${preset.ratio.cement}:${preset.ratio.sand}:${preset.ratio.aggregate}`}>
                        {preset.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                {calculation && (
                  <button
                    onClick={handleAddToBatch}
                    className="w-full px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    ➕ Add to Batch
                  </button>
                )}
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
                    {getShapeDisplayName(calculation.shape)} Volume
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalVolume)}
                  </div>
                  <div className="text-xl text-primary-100">
                    cubic meters (m³)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Unit Volume:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeM3)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Quantity:</span>
                    <span className="font-semibold">{calculation.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">In Cubic Feet:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalVolume * 35.3147)} ft³</span>
                  </div>
                  
                  {calculation.materials && (
                    <>
                      <div className="pt-2 border-t border-white/20"></div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Cement:</span>
                        <span className="font-semibold">{calculation.materials.cementBags} bags</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Sand:</span>
                        <span className="font-semibold">{formatNumber(calculation.materials.sandVolume)} m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Aggregate:</span>
                        <span className="font-semibold">{formatNumber(calculation.materials.aggregateVolume)} m³</span>
                      </div>
                    </>
                  )}
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
            
            {/* Dimensions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {getShapeDisplayName(shape)} Dimensions
              </h3>
              
              {(shape === 'slab') && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={slabDimensions.length}
                      onChange={(e) => setSlabDimensions({ ...slabDimensions, length: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit})
                    </label>
                    <input
                      type="number"
                      value={slabDimensions.width}
                      onChange={(e) => setSlabDimensions({ ...slabDimensions, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness ({unit})
                    </label>
                    <input
                      type="number"
                      value={slabDimensions.thickness}
                      onChange={(e) => setSlabDimensions({ ...slabDimensions, thickness: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.15"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {(shape === 'column' || shape === 'cylinder') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius ({unit})
                    </label>
                    <input
                      type="number"
                      value={columnDimensions.radius}
                      onChange={(e) => setColumnDimensions({ ...columnDimensions, radius: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.25"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({unit})
                    </label>
                    <input
                      type="number"
                      value={columnDimensions.height}
                      onChange={(e) => setColumnDimensions({ ...columnDimensions, height: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="3"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {shape === 'beam' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={beamDimensions.length}
                      onChange={(e) => setBeamDimensions({ ...beamDimensions, length: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit})
                    </label>
                    <input
                      type="number"
                      value={beamDimensions.width}
                      onChange={(e) => setBeamDimensions({ ...beamDimensions, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.3"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({unit})
                    </label>
                    <input
                      type="number"
                      value={beamDimensions.height}
                      onChange={(e) => setBeamDimensions({ ...beamDimensions, height: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.5"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {shape === 'footing' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={footingDimensions.length}
                      onChange={(e) => setFootingDimensions({ ...footingDimensions, length: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit})
                    </label>
                    <input
                      type="number"
                      value={footingDimensions.width}
                      onChange={(e) => setFootingDimensions({ ...footingDimensions, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Depth ({unit})
                    </label>
                    <input
                      type="number"
                      value={footingDimensions.depth}
                      onChange={(e) => setFootingDimensions({ ...footingDimensions, depth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.5"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {
                      (shape === 'column' || shape === 'cylinder') 
                        ? 'Volume = π × r² × h' 
                        : 'Volume = Length × Width × Height'
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Batch Panel */}
            {batch.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                      Batch Calculations
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Total: {formatNumber(totalBatchVolume)} m³
                      {totalBatchCement > 0 && ` • ${totalBatchCement} bags cement`}
                    </p>
                  </div>
                  <button
                    onClick={handleClearBatch}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {batch.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">
                          {getShapeDisplayName(item.shape)}
                        </span>
                        <button
                          onClick={() => handleRemoveFromBatch(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.dimensions} • Qty: {item.quantity}
                      </div>
                      <div className="text-sm font-semibold text-primary mt-1">
                        {formatNumber(item.totalVolume)} m³
                        {item.materials && ` • ${item.materials.cementBags} bags`}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleExportBatchText}
                      className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export Text
                    </button>
                    <button
                      onClick={handleExportBatchCSV}
                      className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export CSV
                    </button>
                  </div>
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
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {getShapeDisplayName(entry.calculation.shape)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.totalVolume)} m³
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

      <ConcreteVolumeCalculatorSEO />
      <RelatedTools
        currentTool="concrete-volume-calculator"
        tools={['concrete-mix-ratio-calculator', 'cement-calculator', 'sand-calculator']}
      />
    </>
  );
}
