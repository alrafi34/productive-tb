"use client";

import { useState, useEffect, useRef, useCallback, type DragEvent } from "react";
import {
  type ClickPoint, type HeatmapSettings, type HeatmapStats, type PaletteKey,
  DEFAULT_SETTINGS, PALETTES, ZOOM_LEVELS, RANDOM_COUNT_OPTIONS, CANVAS_WIDTH, CANVAS_HEIGHT,
  makePointId, generateRandomPoints, parseCSV, parseJSONPoints, buildCSVFromPoints, buildJSONFromPoints,
  computeStats, saveSession, loadSession, clearSession, debounce, buildStatsText,
} from "./logic";
import { renderHeatmap, buildHeatSVG } from "./render";
import ClickHeatmapDensityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const MAX_IMAGE_MB = 20;
const UNDO_LIMIT = 30;

export default function ClickHeatmapDensityCalculatorUI() {
  const [points, setPoints] = useState<ClickPoint[]>([]);
  const [settings, setSettings] = useState<HeatmapSettings>(DEFAULT_SETTINGS);
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [backgroundName, setBackgroundName] = useState<string | null>(null);
  const [stats, setStats] = useState<HeatmapStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statsCopied, setStatsCopied] = useState(false);
  const [randomCount, setRandomCount] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const pastRef = useRef<ClickPoint[][]>([]);
  const futureRef = useRef<ClickPoint[][]>([]);
  const [, setHistoryTick] = useState(0);

  const commitPoints = useCallback((next: ClickPoint[], currentPoints: ClickPoint[]) => {
    pastRef.current = [...pastRef.current, currentPoints].slice(-UNDO_LIMIT);
    futureRef.current = [];
    setPoints(next);
    setHistoryTick((t) => t + 1);
  }, []);

  // ── Initial session restore ──
  useEffect(() => {
    const saved = loadSession();
    if (saved) {
      setPoints(saved.points);
      setSettings((p) => ({ ...p, ...saved.settings }));
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  const persistRef = useRef(debounce((p: ClickPoint[], s: HeatmapSettings) => saveSession({ points: p, settings: s }), 500));
  useEffect(() => { persistRef.current(points, settings); }, [points, settings]);

  // ── Render heatmap + compute stats ──
  const renderRef = useRef(debounce((pts: ClickPoint[], s: HeatmapSettings, bg: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { densityAlpha } = renderHeatmap(canvas, CANVAS_WIDTH, CANVAS_HEIGHT, pts, s, bg);
    setStats(computeStats(densityAlpha, CANVAS_WIDTH, CANVAS_HEIGHT, pts));
  }, 120));

  useEffect(() => { renderRef.current(points, settings, backgroundImage); }, [points, settings, backgroundImage]);

  // ── Canvas click to add a point ──
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const point: ClickPoint = { id: makePointId(), x, y };
    commitPoints([...points, point], points);
  };

  // ── Undo / redo ──
  const handleUndo = useCallback(() => {
    if (pastRef.current.length === 0) return;
    const prev = pastRef.current[pastRef.current.length - 1];
    pastRef.current = pastRef.current.slice(0, -1);
    futureRef.current = [...futureRef.current, points];
    setPoints(prev);
    setHistoryTick((t) => t + 1);
  }, [points]);

  const handleRedo = useCallback(() => {
    if (futureRef.current.length === 0) return;
    const next = futureRef.current[futureRef.current.length - 1];
    futureRef.current = futureRef.current.slice(0, -1);
    pastRef.current = [...pastRef.current, points];
    setPoints(next);
    setHistoryTick((t) => t + 1);
  }, [points]);

  const handleClear = () => {
    if (points.length === 0) return;
    if (!confirm("Clear all click points? This cannot be undone with the canvas image.")) return;
    commitPoints([], points);
  };

  const handleReset = () => {
    commitPoints([], points);
    setSettings(DEFAULT_SETTINGS);
    setBackgroundImage(null);
    setBackgroundName(null);
    setError(null);
    clearSession();
  };

  const handleDeleteLast = useCallback(() => {
    if (points.length === 0) return;
    commitPoints(points.slice(0, -1), points);
  }, [points, commitPoints]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "z" && e.shiftKey) { e.preventDefault(); handleRedo(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "z") { e.preventDefault(); handleUndo(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "o") { e.preventDefault(); imageInputRef.current?.click(); return; }
      if (e.ctrlKey && e.key.toLowerCase() === "s") { e.preventDefault(); handleDownloadPng(); return; }
      if (e.key === "Delete" || e.key === "Backspace") {
        if (document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.tagName === "INPUT") return;
        handleDeleteLast();
        return;
      }
      if (e.key === "+" || e.key === "=") { e.preventDefault(); stepZoom(1); return; }
      if (e.key === "-") { e.preventDefault(); stepZoom(-1); return; }
      if (e.key === "0") { setSettings((p) => ({ ...p, zoom: 100 })); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUndo, handleRedo, handleDeleteLast]);

  const stepZoom = (dir: 1 | -1) => {
    setSettings((p) => {
      const idx = ZOOM_LEVELS.indexOf(p.zoom);
      const nextIdx = Math.max(0, Math.min(ZOOM_LEVELS.length - 1, idx + dir));
      return { ...p, zoom: ZOOM_LEVELS[nextIdx] };
    });
  };

  // ── Background image upload ──
  const loadImageFile = (file: File) => {
    setError(null);
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) { setError("Unsupported image format. Please upload PNG, JPG, JPEG, or WEBP."); return; }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) { setError(`Image is too large. Maximum size is ${MAX_IMAGE_MB}MB.`); return; }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setBackgroundImage(img); setBackgroundName(file.name); URL.revokeObjectURL(url); };
    img.onerror = () => { setError("This image could not be loaded. It may be corrupted."); URL.revokeObjectURL(url); };
    img.src = url;
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImageFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadImageFile(file);
  };

  // ── CSV / JSON import ──
  const handleCsvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = parseCSV(String(reader.result));
      if (result.error) { setError(result.error); return; }
      setError(result.ignoredRows > 0 ? `Imported ${result.points.length} points (${result.ignoredRows} invalid rows ignored).` : null);
      commitPoints(result.points, points);
    };
    reader.readAsText(file);
  };

  const handleJsonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = parseJSONPoints(String(reader.result));
      if (result.error) { setError(result.error); return; }
      setError(result.ignoredRows > 0 ? `Imported ${result.points.length} points (${result.ignoredRows} invalid entries ignored).` : null);
      commitPoints(result.points, points);
    };
    reader.readAsText(file);
  };

  // ── Random test data ──
  const handleGenerateRandom = () => {
    commitPoints(generateRandomPoints(randomCount, CANVAS_WIDTH, CANVAS_HEIGHT), points);
  };

  // ── Export ──
  const handleDownloadPng = (hiRes = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let source: HTMLCanvasElement = canvas;
    if (hiRes) {
      const scale = 2;
      const big = document.createElement("canvas");
      const scaled = points.map((p) => ({ ...p, x: p.x * scale, y: p.y * scale }));
      renderHeatmap(big, CANVAS_WIDTH * scale, CANVAS_HEIGHT * scale, scaled, { ...settings, radius: settings.radius * scale }, backgroundImage);
      source = big;
    }
    const a = document.createElement("a");
    a.href = source.toDataURL("image/png");
    a.download = `click-heatmap-${Date.now()}${hiRes ? "-2x" : ""}.png`;
    a.click();
  };

  const handleDownloadSvg = () => {
    const svg = buildHeatSVG(points, settings, CANVAS_WIDTH, CANVAS_HEIGHT);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `click-heatmap-${Date.now()}.svg`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([buildCSVFromPoints(points)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `click-points-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([buildJSONFromPoints(points)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `click-points-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleCopyStats = () => {
    if (!stats) return;
    navigator.clipboard.writeText(buildStatsText(stats));
    setStatsCopied(true); setTimeout(() => setStatsCopied(false), 2000);
  };

  const set = <K extends keyof HeatmapSettings>(field: K, val: HeatmapSettings[K]) =>
    setSettings((p) => ({ ...p, [field]: val }));

  const activePalette = PALETTES.find((p) => p.key === settings.palette) ?? PALETTES[0];

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top action bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-2">
          <button onClick={handleGenerateRandom} className="px-3 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">Generate Random Data</button>
          <select value={randomCount} onChange={(e) => setRandomCount(parseInt(e.target.value, 10))}
            className="px-2 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white">
            {RANDOM_COUNT_OPTIONS.map((c) => <option key={c} value={c}>{c.toLocaleString("en-US")} clicks</option>)}
          </select>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button onClick={handleUndo} disabled={pastRef.current.length === 0} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">↶ Undo</button>
          <button onClick={handleRedo} disabled={futureRef.current.length === 0} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">↷ Redo</button>
          <button onClick={handleDeleteLast} disabled={points.length === 0} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Delete Last</button>
          <button onClick={handleClear} disabled={points.length === 0} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-red-600 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Clear</button>
          <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Reset</button>
          <div className="ml-auto text-xs text-gray-400 hidden sm:block">Click the canvas to add points · <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Ctrl+Z</kbd> undo</div>
        </div>

        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3" role="alert">{error}</div>
        )}

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left sidebar: upload + controls ── */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Background</h3>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => imageInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
              >
                <p className="text-xs text-gray-500">Drag &amp; drop an image, or <span className="text-primary font-medium">click to upload</span></p>
                <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, WEBP — up to {MAX_IMAGE_MB}MB</p>
                {backgroundName && <p className="text-xs text-primary font-medium mt-2 truncate">{backgroundName}</p>}
              </div>
              <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageInput} className="hidden" />
              {backgroundImage && (
                <button onClick={() => { setBackgroundImage(null); setBackgroundName(null); }} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Remove Background Image</button>
              )}

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Import Click Data</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => csvInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Import CSV</button>
                  <button onClick={() => jsonInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Import JSON</button>
                </div>
                <input ref={csvInputRef} type="file" accept=".csv,text/csv" onChange={handleCsvInput} className="hidden" />
                <input ref={jsonInputRef} type="file" accept=".json,application/json" onChange={handleJsonInput} className="hidden" />
                <p className="text-[11px] text-gray-400">CSV: one &quot;x,y&quot; pair per line. JSON: array of {"{ x, y }"} objects.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Heatmap Settings</h3>

              <div>
                <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1" htmlFor="chc-radius">Heat Radius <span className="font-mono text-gray-400">{settings.radius}px</span></label>
                <input id="chc-radius" type="range" min={5} max={100} value={settings.radius} onChange={(e) => set("radius", parseInt(e.target.value, 10))} className="w-full accent-primary" />
              </div>
              <div>
                <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1" htmlFor="chc-intensity">Intensity <span className="font-mono text-gray-400">{settings.intensity}%</span></label>
                <input id="chc-intensity" type="range" min={0} max={100} value={settings.intensity} onChange={(e) => set("intensity", parseInt(e.target.value, 10))} className="w-full accent-primary" />
              </div>
              <div>
                <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1" htmlFor="chc-opacity">Opacity <span className="font-mono text-gray-400">{settings.opacity}%</span></label>
                <input id="chc-opacity" type="range" min={10} max={100} value={settings.opacity} onChange={(e) => set("opacity", parseInt(e.target.value, 10))} className="w-full accent-primary" />
              </div>
              <div>
                <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1" htmlFor="chc-blur">Blur <span className="font-mono text-gray-400">{settings.blur}</span></label>
                <input id="chc-blur" type="range" min={0} max={100} value={settings.blur} onChange={(e) => set("blur", parseInt(e.target.value, 10))} className="w-full accent-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="chc-palette">Color Palette</label>
                <select id="chc-palette" value={settings.palette} onChange={(e) => set("palette", e.target.value as PaletteKey)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                  {PALETTES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <div className="h-2.5 rounded-full mt-2" style={{ background: `linear-gradient(to right, ${activePalette.stops.map(([s, c]) => `${c} ${s * 100}%`).join(", ")})` }} />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={settings.showGrid} onChange={(e) => set("showGrid", e.target.checked)} className="accent-primary" />
                  Grid Overlay
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={settings.showLabels} onChange={(e) => set("showLabels", e.target.checked)} className="accent-primary" />
                  Coordinate Labels
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="chc-zoom">Zoom</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => stepZoom(-1)} className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">−</button>
                  <select id="chc-zoom" value={settings.zoom} onChange={(e) => set("zoom", parseInt(e.target.value, 10))}
                    className="flex-1 px-3 py-1.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-center">
                    {ZOOM_LEVELS.map((z) => <option key={z} value={z}>{z}%</option>)}
                  </select>
                  <button onClick={() => stepZoom(1)} className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: canvas + stats ── */}
          <div className="lg:col-span-8 space-y-5">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400">{points.length.toLocaleString("en-US")} click{points.length === 1 ? "" : "s"} plotted</p>
                <div className="flex gap-2">
                  <button onClick={() => handleDownloadPng(false)} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors">PNG</button>
                  <button onClick={() => handleDownloadPng(true)} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors">PNG 2x</button>
                  <button onClick={handleDownloadSvg} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors">SVG</button>
                </div>
              </div>
              <div className="border border-gray-100 rounded-lg overflow-auto bg-gray-50" style={{ maxHeight: 560 }}>
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  onClick={handleCanvasClick}
                  role="img"
                  aria-label={`Click heatmap canvas with ${points.length} plotted points`}
                  style={{ width: (CANVAS_WIDTH * settings.zoom) / 100, height: (CANVAS_HEIGHT * settings.zoom) / 100, cursor: "crosshair", display: "block" }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Density Statistics</p>
                <button onClick={handleCopyStats} disabled={!stats} className="text-xs border border-white/30 rounded-md px-2.5 py-1 hover:bg-white/10 transition-colors disabled:opacity-40">
                  {statsCopied ? "✓ Copied!" : "Copy Statistics"}
                </button>
              </div>
              {stats ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    ["Total Clicks", stats.totalClicks.toLocaleString("en-US")],
                    ["Unique Clicks", stats.uniqueClicks.toLocaleString("en-US")],
                    ["Coverage", `${stats.coveragePercent}%`],
                    ["Hotspots", stats.hotspotCount],
                    ["Cold Zones", stats.coldZoneCount],
                    ["Click Clusters", stats.clickClusters],
                    ["Avg. Density", stats.averageDensity],
                    ["Max Density", stats.maxDensity],
                    ["Median Density", stats.medianDensity],
                    ["Avg. Distance", `${stats.averageDistance}px${stats.distanceIsApproximate ? "*" : ""}`],
                    ["Most Active", stats.mostActiveRegion],
                    ["Least Active", stats.leastActiveRegion],
                    ["Density Score", `${stats.densityScore}/100`],
                    ["Interaction Score", `${stats.interactionScore}/100`],
                    ["Distribution Score", `${stats.heatDistributionScore}/100`],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-[10px] text-primary-100 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-bold font-mono tabular-nums">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-primary-100 text-sm">Add or import click points to see density statistics.</p>
              )}
              {stats?.distanceIsApproximate && <p className="text-[11px] text-primary-100 mt-3">* Estimated from a 500-point sample for performance on large datasets.</p>}
            </div>

            {/* Export & coordinate list */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Coordinate List</h3>
                <div className="flex gap-2">
                  <button onClick={handleDownloadCsv} disabled={points.length === 0} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors disabled:opacity-40">Export CSV</button>
                  <button onClick={handleDownloadJson} disabled={points.length === 0} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors disabled:opacity-40">Export JSON</button>
                </div>
              </div>
              <div className="max-h-56 overflow-y-auto divide-y divide-gray-50">
                {points.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 text-sm">No points yet — click the canvas, generate random data, or import a file.</div>
                ) : points.slice().reverse().slice(0, 100).map((p) => (
                  <div key={p.id} className="px-4 py-2 flex items-center justify-between text-xs">
                    <span className="font-mono text-gray-600">x: {Math.round(p.x)}, y: {Math.round(p.y)}</span>
                    <button onClick={() => commitPoints(points.filter((pt) => pt.id !== p.id), points)} className="text-red-500 hover:text-red-600 font-medium">Remove</button>
                  </div>
                ))}
                {points.length > 100 && <div className="p-3 text-center text-gray-400 text-xs">Showing latest 100 of {points.length.toLocaleString("en-US")} points.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClickHeatmapDensityCalculatorSEO />

      <RelatedTools
        currentTool="click-heatmap-density-calculator"
        tools={[
          "scroll-depth-calculator",
          "session-duration-calculator",
          "page-speed-score-calculator",
          "bounce-rate-calculator",
          "conversion-rate-calculator",
          "engagement-rate-calculator",
        ]}
      />
    </>
  );
}
