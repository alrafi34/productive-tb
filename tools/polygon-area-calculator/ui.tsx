"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculationResult, HistoryEntry, OutputUnit, Point } from "./types";
import {
  calculate,
  parseCoordinates,
  shoelaceArea,
  smartFormat,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  autosave,
  loadAutosave,
  exportToText,
  exportToJSON,
  exportToCSV,
  downloadFile,
  OUTPUT_UNIT_LABELS,
  OUTPUT_UNIT_SHORT,
  ALL_OUTPUT_UNITS,
} from "./logic";
import PolygonAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Constants ─────────────────────────────────────────────────────────────────

const CANVAS_W = 480;
const CANVAS_H = 360;
const POINT_RADIUS = 6;
const HIT_RADIUS = 12;
const GRID_SIZE = 40;
const PRIMARY = "#058554";

const PRESETS: { label: string; points: Point[] }[] = [
  {
    label: "Square",
    points: [{ x: 120, y: 80 }, { x: 360, y: 80 }, { x: 360, y: 280 }, { x: 120, y: 280 }],
  },
  {
    label: "Triangle",
    points: [{ x: 240, y: 60 }, { x: 400, y: 300 }, { x: 80, y: 300 }],
  },
  {
    label: "L-Shape",
    points: [
      { x: 80, y: 80 }, { x: 240, y: 80 }, { x: 240, y: 180 },
      { x: 360, y: 180 }, { x: 360, y: 300 }, { x: 80, y: 300 },
    ],
  },
  {
    label: "Irregular",
    points: [
      { x: 100, y: 100 }, { x: 280, y: 60 }, { x: 400, y: 160 },
      { x: 360, y: 300 }, { x: 180, y: 320 }, { x: 60, y: 220 },
    ],
  },
];

// ── Canvas drawing ────────────────────────────────────────────────────────────

function drawCanvas(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  dragIdx: number | null,
  showGrid: boolean,
  snapGrid: boolean
) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // Background
  ctx.fillStyle = "#f9fafb";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Grid
  if (showGrid) {
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let x = 0; x <= CANVAS_W; x += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_H; y += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
    }
  }

  if (points.length === 0) {
    ctx.fillStyle = "#9ca3af";
    ctx.font = "14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Click to add polygon points", CANVAS_W / 2, CANVAS_H / 2);
    ctx.textAlign = "left";
    return;
  }

  // Filled polygon
  if (points.length >= 3) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.closePath();
    ctx.fillStyle = `${PRIMARY}18`;
    ctx.fill();
  }

  // Edges
  ctx.strokeStyle = PRIMARY;
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  if (points.length >= 3) ctx.closePath();
  ctx.stroke();

  // Closing dashed line when < 3 points
  if (points.length === 2) {
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#9ca3af";
    ctx.beginPath();
    ctx.moveTo(points[1].x, points[1].y);
    ctx.lineTo(points[0].x, points[0].y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Vertices
  points.forEach((p, i) => {
    const isDragging = dragIdx === i;
    ctx.beginPath();
    ctx.arc(p.x, p.y, isDragging ? POINT_RADIUS + 2 : POINT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = isDragging ? "#069D63" : PRIMARY;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    ctx.fillStyle = "#374151";
    ctx.font = "bold 11px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`P${i + 1}`, p.x, p.y - POINT_RADIUS - 4);
    ctx.textAlign = "left";
  });
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PolygonAreaCalculatorUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [outputUnit, setOutputUnit] = useState<OutputUnit>("sqft");
  const [scale, setScale] = useState("1");
  const [scaleUnit, setScaleUnit] = useState("ft");
  const [showGrid, setShowGrid] = useState(true);
  const [snapGrid, setSnapGrid] = useState(false);
  const [coordText, setCoordText] = useState("");
  const [coordError, setCoordError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"canvas" | "text">("canvas");
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [undoStack, setUndoStack] = useState<Point[][]>([]);
  const [redoStack, setRedoStack] = useState<Point[][]>([]);
  const dragIdxRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  // Load autosave on mount
  useEffect(() => {
    const saved = loadAutosave();
    if (saved && saved.length >= 3) setPoints(saved);
    setHistory(getHistory());
  }, []);

  // Recalculate when points/scale/unit change
  const recalc = useCallback(
    debounce(() => {
      const s = parseFloat(scale) || 1;
      setResult(calculate(points, s, outputUnit));
      autosave(points);
    }, 120),
    [points, scale, outputUnit]
  );

  useEffect(() => { recalc(); }, [points, scale, outputUnit, recalc]);

  // Redraw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCanvas(ctx, points, dragIdxRef.current, showGrid, snapGrid);
  }, [points, showGrid, snapGrid]);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const snapPoint = (p: Point): Point => {
    if (!snapGrid) return p;
    return { x: Math.round(p.x / GRID_SIZE) * GRID_SIZE, y: Math.round(p.y / GRID_SIZE) * GRID_SIZE };
  };

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return snapPoint({
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    });
  };

  const hitTest = (p: Point): number => {
    for (let i = points.length - 1; i >= 0; i--) {
      const dx = points[i].x - p.x;
      const dy = points[i].y - p.y;
      if (Math.sqrt(dx * dx + dy * dy) <= HIT_RADIUS) return i;
    }
    return -1;
  };

  const pushUndo = (prev: Point[]) => {
    setUndoStack((s) => [...s.slice(-19), prev]);
    setRedoStack([]);
  };

  // ── Canvas events ─────────────────────────────────────────────────────────────

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const p = getCanvasPoint(e);
    const hit = hitTest(p);
    if (hit !== -1) {
      dragIdxRef.current = hit;
      isDraggingRef.current = false;
    } else {
      pushUndo(points);
      setPoints((prev) => [...prev, p]);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragIdxRef.current === null) return;
    isDraggingRef.current = true;
    const p = getCanvasPoint(e);
    setPoints((prev) => {
      const next = [...prev];
      next[dragIdxRef.current!] = p;
      return next;
    });
  };

  const handleCanvasMouseUp = () => {
    if (isDraggingRef.current && dragIdxRef.current !== null) {
      // commit drag to undo stack
      setUndoStack((s) => [...s.slice(-19), points]);
    }
    dragIdxRef.current = null;
    isDraggingRef.current = false;
  };

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const p = getCanvasPoint(e);
    const hit = hitTest(p);
    if (hit !== -1) {
      dragIdxRef.current = hit;
      isDraggingRef.current = false;
    } else {
      pushUndo(points);
      setPoints((prev) => [...prev, p]);
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (dragIdxRef.current === null) return;
    isDraggingRef.current = true;
    const p = getCanvasPoint(e);
    setPoints((prev) => {
      const next = [...prev];
      next[dragIdxRef.current!] = p;
      return next;
    });
  };

  const handleCanvasTouchEnd = () => {
    dragIdxRef.current = null;
    isDraggingRef.current = false;
  };

  // ── Actions ───────────────────────────────────────────────────────────────────

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack((s) => [...s, points]);
    setUndoStack((s) => s.slice(0, -1));
    setPoints(prev);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((s) => [...s, points]);
    setRedoStack((s) => s.slice(0, -1));
    setPoints(next);
  };

  const handleUndoPoint = () => {
    if (points.length === 0) return;
    pushUndo(points);
    setPoints((p) => p.slice(0, -1));
  };

  const handleClear = () => {
    pushUndo(points);
    setPoints([]);
    setResult(null);
    setCoordText("");
    setCoordError(null);
  };

  const handlePreset = (preset: (typeof PRESETS)[0]) => {
    pushUndo(points);
    setPoints(preset.points);
    setInputMode("canvas");
  };

  const handleApplyCoords = () => {
    const parsed = parseCoordinates(coordText);
    if (!parsed) {
      setCoordError("Invalid format. Use one 'x, y' pair per line. Minimum 3 points required.");
      return;
    }
    setCoordError(null);
    pushUndo(points);
    // Fit coordinates to canvas
    const xs = parsed.map((p) => p.x);
    const ys = parsed.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const padding = 60;
    const fitted = parsed.map((p) => ({
      x: padding + ((p.x - minX) / rangeX) * (CANVAS_W - padding * 2),
      y: padding + ((p.y - minY) / rangeY) * (CANVAS_H - padding * 2),
    }));
    setPoints(fitted);
    setInputMode("canvas");
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Polygon Area: ${smartFormat(result.areaInUnit)} ${OUTPUT_UNIT_SHORT[outputUnit]}\n${smartFormat(result.sqft)} ft² | ${smartFormat(result.sqm)} m² | ${smartFormat(result.acres)} acres\nVertices: ${result.vertexCount}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    const s = parseFloat(scale) || 1;
    saveToHistory(points, s, scaleUnit, outputUnit, result);
    setHistory(getHistory());
  };

  const handleExportTXT = () => {
    if (!result) return;
    const s = parseFloat(scale) || 1;
    downloadFile(exportToText(points, s, scaleUnit, result), "polygon_area.txt");
  };

  const handleExportJSON = () => {
    if (!result) return;
    downloadFile(exportToJSON(points, result), "polygon_area.json", "application/json");
  };

  const handleExportCSV = () => {
    downloadFile(exportToCSV(points), "polygon_points.csv", "text/csv");
  };

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = "polygon_area.png";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";

  const conversionRows: { label: string; unit: OutputUnit }[] = [
    { label: "Square Feet",   unit: "sqft" },
    { label: "Square Meters", unit: "sqm" },
    { label: "Acres",         unit: "acres" },
    { label: "Hectares",      unit: "hectares" },
    { label: "Square Yards",  unit: "sqyd" },
    { label: "Square Km",     unit: "sqkm" },
    { label: "Square Miles",  unit: "sqmi" },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Polygon Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Click on the canvas to add polygon vertices, or enter coordinates manually. Drag points to adjust the shape. Area updates instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
                <select value={outputUnit} onChange={(e) => setOutputUnit(e.target.value as OutputUnit)} className={selectCls}>
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scale (1 unit =)</label>
                  <input
                    type="number" inputMode="decimal"
                    value={scale}
                    onChange={(e) => setScale(e.target.value.replace(/[^0-9.]/g, ""))}
                    className={inputCls}
                    placeholder="1"
                    min="0" step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select value={scaleUnit} onChange={(e) => setScaleUnit(e.target.value)} className={selectCls}>
                    {["ft", "m", "yd", "km", "mi"].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid toggles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Show Grid</span>
                  <button
                    onClick={() => setShowGrid((v) => !v)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showGrid ? "bg-primary" : "bg-gray-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showGrid ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Snap to Grid</span>
                  <button
                    onClick={() => setSnapGrid((v) => !v)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${snapGrid ? "bg-primary" : "bg-gray-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${snapGrid ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Area = ½|Σ(xᵢyᵢ₊₁ − yᵢxᵢ₊₁)|</div>
                <div className="text-gray-500 mt-1">Shoelace (Surveyor&apos;s) formula</div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleUndo} disabled={undoStack.length === 0} className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                    ↩ Undo
                  </button>
                  <button onClick={handleRedo} disabled={redoStack.length === 0} className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                    ↪ Redo
                  </button>
                </div>
                <button onClick={handleUndoPoint} disabled={points.length === 0} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                  ✂ Remove Last Point
                </button>
                <button onClick={handleClear} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🗑 Clear All
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Total Area
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? smartFormat(result.areaInUnit) : "—"}
              </div>
              {result && (
                <div className="text-primary-100 text-sm mb-3">{OUTPUT_UNIT_SHORT[outputUnit]}</div>
              )}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Vertices:</span>
                    <span className="font-semibold">{result.vertexCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">sq ft:</span>
                    <span className="font-semibold">{smartFormat(result.sqft)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">sq m:</span>
                    <span className="font-semibold">{smartFormat(result.sqm)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">acres:</span>
                    <span className="font-semibold">{smartFormat(result.acres)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button onClick={handleCopy} disabled={!result} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button onClick={handleSave} disabled={!result} className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  💾 Save to History
                </button>
              </div>
            </div>

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Input Mode Tabs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  {inputMode === "canvas" ? "Interactive Canvas" : "Coordinate Input"}
                </h3>
                <div className="flex gap-2">
                  {(["canvas", "text"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setInputMode(m)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${inputMode === m ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      {m === "canvas" ? "🖱 Canvas" : "⌨ Text"}
                    </button>
                  ))}
                </div>
              </div>

              {inputMode === "canvas" ? (
                <div>
                  <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    className="w-full rounded-lg border-2 border-gray-200 cursor-crosshair touch-none"
                    style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    onTouchStart={handleCanvasTouchStart}
                    onTouchMove={handleCanvasTouchMove}
                    onTouchEnd={handleCanvasTouchEnd}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Click to add points · Drag to move · {points.length} point{points.length !== 1 ? "s" : ""} placed
                    {points.length < 3 && points.length > 0 && ` · Need ${3 - points.length} more`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coordinates (one pair per line: x, y)
                    </label>
                    <textarea
                      value={coordText}
                      onChange={(e) => setCoordText(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-none"
                      rows={7}
                      placeholder={"0, 0\n10, 0\n10, 10\n0, 10"}
                      spellCheck={false}
                    />
                  </div>
                  {coordError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      {coordError}
                    </div>
                  )}
                  <button
                    onClick={handleApplyCoords}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    Apply Coordinates →
                  </button>
                  <p className="text-xs text-gray-500">
                    Coordinates will be fitted to the canvas automatically.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertex List */}
            {points.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Vertices ({points.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {points.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                      <span className="font-semibold text-primary text-xs">P{i + 1}</span>
                      <span className="font-mono text-gray-700 text-xs">({p.x.toFixed(1)}, {p.y.toFixed(1)})</span>
                      <button
                        onClick={() => {
                          pushUndo(points);
                          setPoints((prev) => prev.filter((_, idx) => idx !== i));
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-1 text-xs"
                        aria-label={`Remove point ${i + 1}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conversion Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Area Conversions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {conversionRows.map(({ label, unit }) => {
                    const val = result[unit as keyof CalculationResult] as number;
                    const isSelected = outputUnit === unit;
                    return (
                      <div
                        key={unit}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                        onClick={() => setOutputUnit(unit)}
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                        <div className={`font-bold text-base break-all ${isSelected ? "text-primary" : "text-gray-900"}`}>
                          {smartFormat(val)}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{OUTPUT_UNIT_SHORT[unit]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Export */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Export
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: "📄 TXT",  action: handleExportTXT },
                    { label: "{ } JSON", action: handleExportJSON },
                    { label: "📊 CSV",  action: handleExportCSV },
                    { label: "🖼 PNG",  action: handleDownloadPNG },
                  ].map(({ label, action }) => (
                    <button key={label} onClick={action} className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setPoints(entry.points); setOutputUnit(entry.outputUnit); setShowHistory(false); }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">{entry.points.length} vertices</span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {smartFormat(entry.result.sqft)} ft² · {smartFormat(entry.result.acres)} acres
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

      <PolygonAreaCalculatorSEO />
      <RelatedTools
        currentTool="polygon-area-calculator"
        tools={[
          "survey-area-calculator",
          "land-price-calculator",
          "boundary-length-calculator",
          "triangle-land-area-calculator",
        ]}
      />
    </>
  );
}
