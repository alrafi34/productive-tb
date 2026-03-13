"use client";

import { useState, useRef, useEffect } from "react";
import {
  BarData,
  ChartConfig,
  DEFAULT_COLORS,
  calculateBarHeight,
  getMaxValue,
  generateRandomData,
  parseCSVData,
  exportToCSV,
  generateSVG,
  renderCanvasChart,
} from "./logic";
import BarGraphGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BarGraphGeneratorUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<BarData[]>([
    { label: "Item A", value: 40, color: DEFAULT_COLORS[0] },
    { label: "Item B", value: 25, color: DEFAULT_COLORS[1] },
    { label: "Item C", value: 20, color: DEFAULT_COLORS[2] },
  ]);
  const [config, setConfig] = useState<ChartConfig>({
    title: "Bar Chart",
    showValues: true,
    showLabels: true,
    showGrid: true,
    animate: true,
    mode: "svg",
  });
  const [copied, setCopied] = useState(false);

  const handleAddRow = () => {
    setData([
      ...data,
      {
        label: `Item ${String.fromCharCode(65 + data.length)}`,
        value: 0,
        color: DEFAULT_COLORS[data.length % DEFAULT_COLORS.length],
      },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleUpdateRow = (index: number, field: keyof BarData, value: any) => {
    const newData = [...data];
    if (field === "value") {
      newData[index][field] = Math.max(0, parseFloat(value) || 0);
    } else {
      newData[index][field] = value;
    }
    setData(newData);
  };

  const handleRandomData = () => {
    setData(generateRandomData(5));
  };

  const handleClearData = () => {
    setData([]);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const csv = e.target.value;
    if (csv.trim()) {
      const imported = parseCSVData(csv);
      if (imported.length > 0) {
        setData(imported);
      }
    }
  };

  const handleExportPNG = () => {
    if (config.mode === "canvas" && canvasRef.current) {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL("image/png");
      link.download = "bar-chart.png";
      link.click();
    } else if (config.mode === "svg" && svgContainerRef.current) {
      const svg = svgContainerRef.current.querySelector("svg");
      if (svg) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "bar-chart.png";
          link.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svg.outerHTML);
      }
    }
  };

  const handleExportSVG = () => {
    const svg = generateSVG(data, config);
    const link = document.createElement("a");
    link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    link.download = "bar-chart.svg";
    link.click();
  };

  const handleCopyImage = () => {
    if (config.mode === "canvas" && canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    }
  };

  const handleCopyCSV = () => {
    const csv = exportToCSV(data);
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (config.mode === "canvas" && canvasRef.current) {
      renderCanvasChart(canvasRef.current, data, config);
    }
  }, [data, config]);

  const svgChart = generateSVG(data, config);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Data Input Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <h3 className="font-semibold text-gray-800">Chart Title</h3>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                placeholder="Enter chart title..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <h3 className="font-semibold text-gray-800 mt-4">Chart Options</h3>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={config.showValues}
                  onChange={(e) => setConfig({ ...config, showValues: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Show Values
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={config.showLabels}
                  onChange={(e) => setConfig({ ...config, showLabels: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Show Labels
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={config.showGrid}
                  onChange={(e) => setConfig({ ...config, showGrid: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Show Grid
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Render Mode</label>
                <select
                  value={config.mode}
                  onChange={(e) => setConfig({ ...config, mode: e.target.value as "svg" | "canvas" })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="svg">SVG</option>
                  <option value="canvas">Canvas</option>
                </select>
              </div>
            </div>

            {/* Data Actions */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <button
                onClick={handleAddRow}
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                ➕ Add Row
              </button>
              <button
                onClick={handleRandomData}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                🎲 Random Data
              </button>
              <button
                onClick={handleClearData}
                disabled={data.length === 0}
                className="w-full border-2 border-red-300 hover:border-red-500 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                🗑️ Clear
              </button>
            </div>

            {/* Export Panel */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm">Export</h3>
              <button
                onClick={handleExportPNG}
                disabled={data.length === 0}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📥 PNG
              </button>
              <button
                onClick={handleExportSVG}
                disabled={data.length === 0}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📥 SVG
              </button>
              <button
                onClick={handleCopyImage}
                disabled={data.length === 0 || config.mode !== "canvas"}
                className="w-full border-2 border-primary hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-primary text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
              <button
                onClick={handleCopyCSV}
                disabled={data.length === 0}
                className="w-full border-2 border-green-500 hover:border-green-600 hover:text-green-600 text-green-500 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📋 Copy CSV
              </button>
            </div>
          </div>

          {/* Chart Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Chart Display */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {config.mode === "svg" ? (
                <div ref={svgContainerRef} className="p-4 flex justify-center">
                  <div dangerouslySetInnerHTML={{ __html: svgChart }} />
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="w-full border border-gray-100"
                />
              )}
            </div>

            {/* Stats */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{data.length}</div>
                  <div className="text-xs text-gray-500">Bars</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{getMaxValue(data)}</div>
                  <div className="text-xs text-gray-500">Max Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {data.reduce((sum, d) => sum + d.value, 0)}
                  </div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Label</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Value</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Color</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={row.label}
                        onChange={(e) => handleUpdateRow(index, "label", e.target.value)}
                        className="w-full rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={row.value}
                        onChange={(e) => handleUpdateRow(index, "value", e.target.value)}
                        min="0"
                        className="w-full rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {DEFAULT_COLORS.map(color => (
                          <button
                            key={color}
                            onClick={() => handleUpdateRow(index, "color", color)}
                            className={`w-6 h-6 rounded border-2 transition-all ${
                              row.color === color ? "border-gray-800" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteRow(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CSV Import */}
        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-3">Import CSV Data</h3>
          <textarea
            placeholder="Paste CSV data (Label,Value)&#10;Example:&#10;Product A,40&#10;Product B,25"
            onChange={handleImportCSV}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />
        </div>
      </div>

      <BarGraphGeneratorSEOContent />

      <RelatedTools
        currentTool="bar-graph-generator"
        tools={["word-cloud-generator", "mind-map-builder", "pie-chart-maker"]}
      />
    </>
  );
}
