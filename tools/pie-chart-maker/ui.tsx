"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  ChartData,
  ChartConfig,
  SavedChart,
  generateRandomData,
  calculatePercentages,
  calculateAngles,
  generateSVGChart,
  exportChartAsImage,
  exportChartAsSVG,
  exportAsCSV,
  parseCSV,
} from "./logic";
import PieChartSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#A8E6CF',
  '#FFD3B6', '#FFAAA5', '#FF8B94', '#A8D8EA', '#AA96DA',
  '#FCBAD3', '#A1D82F', '#FF6B9D', '#C44569', '#F8B500',
];

export default function PieChartMakerUI() {
  const [data, setData] = useState<ChartData[]>([
    { label: 'Category A', value: 40, color: DEFAULT_COLORS[0] },
    { label: 'Category B', value: 25, color: DEFAULT_COLORS[1] },
    { label: 'Category C', value: 20, color: DEFAULT_COLORS[2] },
    { label: 'Category D', value: 15, color: DEFAULT_COLORS[3] },
  ]);

  const [config, setConfig] = useState<ChartConfig>({
    title: 'My Pie Chart',
    showPercentages: true,
    showLabels: true,
    showLegend: true,
    animateSlices: true,
    darkMode: false,
  });

  const [history, setHistory] = useState<SavedChart[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [csvInput, setCSVInput] = useState('');
  const [showCSVImport, setShowCSVImport] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Load state from localStorage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('pieChartState');
    const savedHistory = localStorage.getItem('pieChartHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(parsed.data || data);
      setConfig(parsed.config || config);
    }
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('pieChartState', JSON.stringify({ data, config }));
  }, [data, config, isMounted]);

  const svgChart = useMemo(() => {
    return generateSVGChart(data, config, 500, 500);
  }, [data, config]);

  const percentages = useMemo(() => calculatePercentages(data), [data]);
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const handleUpdateData = (index: number, field: keyof ChartData, value: any) => {
    const newData = [...data];
    if (field === 'value') {
      newData[index][field] = Math.max(0, parseFloat(value) || 0);
    } else {
      newData[index][field] = value;
    }
    setData(newData);
  };

  const handleAddRow = () => {
    setData([
      ...data,
      {
        label: `Category ${String.fromCharCode(65 + data.length)}`,
        value: 10,
        color: DEFAULT_COLORS[data.length % DEFAULT_COLORS.length],
      },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleRandomData = () => {
    setData(generateRandomData(5));
  };

  const handleClearData = () => {
    setData([]);
  };

  const handleExportPNG = async () => {
    try {
      await exportChartAsImage(svgChart, `${config.title || 'chart'}.png`);
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  const handleExportSVG = () => {
    exportChartAsSVG(svgChart, `${config.title || 'chart'}.svg`);
  };

  const handleExportCSV = () => {
    exportAsCSV(data, `${config.title || 'chart'}-data.csv`);
  };

  const handleImportCSV = () => {
    const imported = parseCSV(csvInput);
    if (imported.length > 0) {
      setData(imported);
      setCSVInput('');
      setShowCSVImport(false);
    }
  };

  const handleSaveChart = () => {
    const chart: SavedChart = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString(),
      title: config.title,
      data: [...data],
      config: { ...config },
    };
    const updated = [chart, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('pieChartHistory', JSON.stringify(updated));
  };

  const handleLoadChart = (chart: SavedChart) => {
    setData(chart.data);
    setConfig(chart.config);
  };

  return (
    <div className={`min-h-screen transition-colors ${config.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-4xl font-black ${config.darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "var(--font-heading)" }}>
              📊 Pie Chart Maker
            </h1>
            <p className={`text-sm mt-2 ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Create dynamic pie charts from your data instantly
            </p>
          </div>
          <button
            onClick={() => setConfig({ ...config, darkMode: !config.darkMode })}
            className={`p-3 rounded-xl transition-all ${config.darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {config.darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Panel - Data Input */}
          <div className={`lg:col-span-5 rounded-3xl border shadow-lg p-8 space-y-6 ${config.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            
            {/* Chart Title */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Chart Title
              </label>
              <input
                type="text"
                value={config.title}
                onChange={e => setConfig({ ...config, title: e.target.value })}
                placeholder="Enter chart title..."
                className={`w-full px-4 py-3 rounded-lg border font-bold ${config.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
              />
            </div>

            {/* Data Table */}
            <div className="space-y-3">
              <label className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Data
              </label>
              <div className={`rounded-lg border overflow-hidden ${config.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`grid grid-cols-12 gap-2 p-3 font-bold text-xs uppercase tracking-widest ${config.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                  <div className="col-span-4">Label</div>
                  <div className="col-span-3">Value</div>
                  <div className="col-span-3">Color</div>
                  <div className="col-span-2">Action</div>
                </div>

                <div className={`divide-y ${config.darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {data.map((item, index) => (
                    <div key={index} className={`grid grid-cols-12 gap-2 p-3 items-center ${config.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <input
                        type="text"
                        value={item.label}
                        onChange={e => handleUpdateData(index, 'label', e.target.value)}
                        className={`col-span-4 px-2 py-1 rounded text-xs border ${config.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                      <input
                        type="number"
                        value={item.value}
                        onChange={e => handleUpdateData(index, 'value', e.target.value)}
                        min="0"
                        className={`col-span-3 px-2 py-1 rounded text-xs border ${config.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                      <input
                        type="color"
                        value={item.color}
                        onChange={e => handleUpdateData(index, 'color', e.target.value)}
                        className="col-span-3 h-8 rounded cursor-pointer"
                      />
                      <button
                        onClick={() => handleDeleteRow(index)}
                        className={`col-span-2 px-2 py-1 rounded text-xs font-bold transition-all ${config.darkMode ? 'bg-red-900 text-red-200 hover:bg-red-800' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddRow}
                className="w-full px-4 py-2 rounded-lg font-bold text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all active:scale-95"
              >
                + Add Row
              </button>
            </div>

            {/* Data Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleRandomData}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${config.darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🎲 Random
              </button>
              <button
                onClick={handleClearData}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${config.darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🗑️ Clear
              </button>
            </div>

            {/* CSV Import */}
            <button
              onClick={() => setShowCSVImport(!showCSVImport)}
              className={`w-full px-4 py-2 rounded-lg font-bold text-sm transition-all ${config.darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {showCSVImport ? '▼' : '▶'} Import CSV
            </button>

            {showCSVImport && (
              <div className="space-y-2">
                <textarea
                  value={csvInput}
                  onChange={e => setCSVInput(e.target.value)}
                  placeholder="Label,Value&#10;Category A,40&#10;Category B,25"
                  className={`w-full h-24 px-3 py-2 rounded-lg border text-xs font-mono ${config.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                />
                <button
                  onClick={handleImportCSV}
                  className="w-full px-4 py-2 rounded-lg font-bold text-sm bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all active:scale-95"
                >
                  Import
                </button>
              </div>
            )}

            {/* Chart Options */}
            <div className="space-y-3 pt-4 border-t" style={{ borderColor: config.darkMode ? '#374151' : '#e5e7eb' }}>
              <label className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Display Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showPercentages}
                    onChange={e => setConfig({ ...config, showPercentages: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm font-bold ${config.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Show Percentages</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showLabels}
                    onChange={e => setConfig({ ...config, showLabels: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm font-bold ${config.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Show Labels</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showLegend}
                    onChange={e => setConfig({ ...config, showLegend: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm font-bold ${config.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Show Legend</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Panel - Chart Display */}
          <div className={`lg:col-span-7 rounded-3xl border shadow-lg p-8 space-y-6 ${config.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            
            {/* Chart Preview */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Chart Preview
              </label>
              <div className={`rounded-lg border p-4 flex justify-center ${config.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div dangerouslySetInnerHTML={{ __html: svgChart }} />
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3">
              <div className={`p-4 rounded-lg text-center ${config.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Total
                </div>
                <div className={`text-2xl font-black ${config.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {total}
                </div>
              </div>
              <div className={`p-4 rounded-lg text-center ${config.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Slices
                </div>
                <div className={`text-2xl font-black ${config.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {data.length}
                </div>
              </div>
              <div className={`p-4 rounded-lg text-center ${config.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Average
                </div>
                <div className={`text-2xl font-black ${config.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {data.length > 0 ? (total / data.length).toFixed(1) : 0}
                </div>
              </div>
            </div>

            {/* Data Summary */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${config.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Data Summary
              </label>
              <div className={`rounded-lg border p-4 space-y-2 max-h-48 overflow-y-auto ${config.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                {data.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className={config.darkMode ? 'text-gray-300' : 'text-gray-700'}>{item.label}</span>
                    </div>
                    <div className={`font-bold ${config.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.value} ({percentages[index]?.toFixed(1)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={handleExportPNG}
                className="px-4 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all active:scale-95"
              >
                📥 PNG
              </button>
              <button
                onClick={handleExportSVG}
                className="px-4 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all active:scale-95"
              >
                📥 SVG
              </button>
              <button
                onClick={handleExportCSV}
                className="px-4 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all active:scale-95"
              >
                📥 CSV
              </button>
              <button
                onClick={handleSaveChart}
                className="px-4 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all active:scale-95"
              >
                💾 Save
              </button>
            </div>

            {/* History */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`w-full px-4 py-2 rounded-lg font-bold text-sm transition-all ${config.darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {showHistory ? '▼' : '▶'} History ({history.length})
            </button>

            {showHistory && (
              <div className={`rounded-lg border p-4 space-y-2 max-h-48 overflow-y-auto ${config.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                {history.length === 0 ? (
                  <p className={`text-xs text-center ${config.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No saved charts</p>
                ) : (
                  history.map(chart => (
                    <div
                      key={chart.id}
                      onClick={() => handleLoadChart(chart)}
                      className={`p-3 rounded cursor-pointer transition-all text-xs ${config.darkMode ? 'bg-gray-800 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}
                    >
                      <div className={`font-bold ${config.darkMode ? 'text-white' : 'text-gray-900'}`}>{chart.title}</div>
                      <div className={`text-xs ${config.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{chart.timestamp}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <PieChartSEO />
        <RelatedTools
          currentTool="pie-chart-maker"
          tools={['bar-graph-generator', 'heatmap-grid', 'word-cloud-generator']}
        />
      </div>
    </div>
  );
}
