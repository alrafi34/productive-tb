"use client";

import { useState, useRef, useEffect } from "react";
import { HeatmapState, createGrid, getCellColor, getGridStats, getGradientColors, exportAsJSON, importFromJSON, randomizeGrid } from "./logic";
import HeatmapGridSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HeatmapGridUI() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<HeatmapState>({
    grid: createGrid(10, 10),
    rows: 10,
    cols: 10,
    colorGradient: "blue-red",
    startColor: "#3b82f6",
    endColor: "#ef4444",
    history: [],
    historyIndex: -1
  });

  const [dragging, setDragging] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [copied, setCopied] = useState("");

  const saveHistory = (newGrid: number[][]) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newGrid)));
    setState(prev => ({
      ...prev,
      grid: newGrid,
      history: newHistory,
      historyIndex: newHistory.length - 1
    }));
  };

  const undo = () => {
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      setState(prev => ({
        ...prev,
        grid: JSON.parse(JSON.stringify(prev.history[newIndex])),
        historyIndex: newIndex
      }));
    }
  };

  const redo = () => {
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      setState(prev => ({
        ...prev,
        grid: JSON.parse(JSON.stringify(prev.history[newIndex])),
        historyIndex: newIndex
      }));
    }
  };

  const updateCell = (row: number, col: number, delta: number) => {
    const newGrid = state.grid.map(r => [...r]);
    newGrid[row][col] = Math.max(0, newGrid[row][col] + delta);
    saveHistory(newGrid);
  };

  const handleCellClick = (row: number, col: number, e: React.MouseEvent) => {
    if (e.button === 2) {
      updateCell(row, col, -1);
    } else {
      updateCell(row, col, 1);
    }
  };

  const handleCellMouseDown = (row: number, col: number) => {
    setDragging(true);
    updateCell(row, col, 1);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    setHoveredCell({ row, col });
    if (dragging) {
      updateCell(row, col, 1);
    }
  };

  const handleCellMouseLeave = () => {
    setHoveredCell(null);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleGridSizeChange = (type: "rows" | "cols", value: number) => {
    const newRows = type === "rows" ? value : state.rows;
    const newCols = type === "cols" ? value : state.cols;
    
    if (newRows > 0 && newCols > 0 && newRows <= 100 && newCols <= 100) {
      const newGrid = createGrid(newRows, newCols);
      setState(prev => ({
        ...prev,
        grid: newGrid,
        rows: newRows,
        cols: newCols,
        history: [newGrid],
        historyIndex: 0
      }));
    }
  };

  const handleGradientChange = (gradient: string) => {
    const colors = getGradientColors(gradient);
    setState(prev => ({
      ...prev,
      colorGradient: gradient as any,
      startColor: colors.start,
      endColor: colors.end
    }));
  };

  const clearGrid = () => {
    if (confirm("Clear all data?")) {
      const newGrid = createGrid(state.rows, state.cols);
      saveHistory(newGrid);
    }
  };

  const randomizeGridData = () => {
    const newGrid = randomizeGrid(state.grid);
    saveHistory(newGrid);
  };

  const exportPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "heatmap-grid.png";
    link.click();
  };

  const exportSVG = () => {
    const cellSize = Math.max(10, Math.min(50, 500 / Math.max(state.rows, state.cols)));
    const width = state.cols * cellSize;
    const height = state.rows * cellSize;
    const stats = getGridStats(state.grid);
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${width}" height="${height}" fill="white"/>`;
    
    state.grid.forEach((row, r) => {
      row.forEach((value, c) => {
        const color = getCellColor(value, stats.max, state.startColor, state.endColor);
        const x = c * cellSize;
        const y = r * cellSize;
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" stroke="#ccc" stroke-width="1"/>`;
        if (value > 0) {
          svg += `<text x="${x + cellSize/2}" y="${y + cellSize/2}" text-anchor="middle" dy="0.3em" font-size="10" fill="white">${value}</text>`;
        }
      });
    });
    
    svg += `</svg>`;
    const link = document.createElement("a");
    link.href = `data:image/svg+xml;base64,${btoa(svg)}`;
    link.download = "heatmap-grid.svg";
    link.click();
  };

  const saveToStorage = () => {
    localStorage.setItem("heatmap-grid", exportAsJSON(state));
    setCopied("saved");
    setTimeout(() => setCopied(""), 2000);
  };

  const loadFromStorage = () => {
    const data = localStorage.getItem("heatmap-grid");
    if (data) {
      const imported = importFromJSON(data);
      if (imported) {
        setState(prev => ({
          ...prev,
          grid: imported.grid || prev.grid,
          rows: imported.rows || prev.rows,
          cols: imported.cols || prev.cols,
          colorGradient: imported.colorGradient || prev.colorGradient,
          startColor: imported.startColor || prev.startColor,
          endColor: imported.endColor || prev.endColor
        }));
      }
    }
  };

  const stats = getGridStats(state.grid);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = Math.max(5, Math.min(50, 500 / Math.max(state.rows, state.cols)));
    canvas.width = state.cols * cellSize;
    canvas.height = state.rows * cellSize;

    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    state.grid.forEach((row, r) => {
      row.forEach((value, c) => {
        const color = getCellColor(value, stats.max, state.startColor, state.endColor);
        ctx.fillStyle = color;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      });
    });
  }, [state.grid, state.rows, state.cols, state.startColor, state.endColor]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Rows</label>
              <input
                type="number"
                min="1"
                max="100"
                value={state.rows}
                onChange={(e) => handleGridSizeChange("rows", parseInt(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Columns</label>
              <input
                type="number"
                min="1"
                max="100"
                value={state.cols}
                onChange={(e) => handleGridSizeChange("cols", parseInt(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Color Gradient</label>
              <select
                value={state.colorGradient}
                onChange={(e) => handleGradientChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="blue-red">Blue → Red</option>
                <option value="green-yellow">Green → Yellow</option>
                <option value="purple-orange">Purple → Orange</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearGrid}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={undo} disabled={state.historyIndex <= 0} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50">
              ↶ Undo
            </button>
            <button onClick={redo} disabled={state.historyIndex >= state.history.length - 1} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50">
              ↷ Redo
            </button>
            <button onClick={randomizeGridData} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200">
              🎲 Randomize
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">Total Clicks</h3>
            <p className="text-3xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">Max Density</h3>
            <p className="text-3xl font-bold text-primary">{stats.max}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">Average</h3>
            <p className="text-3xl font-bold text-primary">{stats.average.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Interactive Grid</h3>
            <p className="text-xs text-gray-600 mb-3">Click cells to increase density. Right-click to decrease. Drag to paint multiple cells.</p>
            <div
              ref={gridContainerRef}
              className="grid gap-0 border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
              style={{
                gridTemplateColumns: `repeat(${state.cols}, minmax(0, 1fr))`,
                maxWidth: "100%"
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              {state.grid.map((row, r) =>
                row.map((value, c) => {
                  const stats = getGridStats(state.grid);
                  const color = getCellColor(value, stats.max, state.startColor, state.endColor);
                  const isHovered = hoveredCell?.row === r && hoveredCell?.col === c;
                  
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`aspect-square cursor-pointer border border-gray-200 flex items-center justify-center text-xs font-semibold transition-all ${
                        isHovered ? "ring-2 ring-offset-0 ring-gray-400 z-10" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={(e) => handleCellClick(r, c, e)}
                      onMouseDown={() => handleCellMouseDown(r, c)}
                      onMouseEnter={() => handleCellMouseEnter(r, c)}
                      onMouseLeave={handleCellMouseLeave}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        updateCell(r, c, -1);
                      }}
                      title={`Cell (${r}, ${c}): ${value}`}
                    >
                      {value > 0 && (
                        <span className="text-white drop-shadow-md">{value}</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Canvas Preview</h3>
            <canvas
              ref={canvasRef}
              className="w-full border border-gray-200 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Export & Save</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportPNG} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors">
              📥 Export PNG
            </button>
            <button onClick={exportSVG} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors">
              📥 Export SVG
            </button>
            <button onClick={saveToStorage} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
              {copied === "saved" ? "✓ Saved" : "💾 Save"}
            </button>
            <button onClick={loadFromStorage} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              📂 Load
            </button>
          </div>
        </div>
      </div>

      <HeatmapGridSEOContent />
      <RelatedTools currentTool="heatmap-grid" tools={["venn-diagram-maker", "flowchart-logic-mapper", "timeline-creator"]} />
    </>
  );
}
