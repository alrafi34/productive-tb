"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ProjectileInputs, ProjectileResult, HistoryEntry } from "./types";
import {
  calculate,
  validateVelocity,
  validateHeight,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  VELOCITY_LABELS,
  VELOCITY_SHORT,
  ALL_VELOCITY_UNITS,
  GRAVITY_PRESETS,
} from "./logic";
import ProjectileMotionSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ────────────────────────────────────────────────────────────────
const PRESETS = [
  { label: "Max Range",    velocity: "50",  angle: 45, gravity: 9.81 },
  { label: "High Arc",     velocity: "50",  angle: 75, gravity: 9.81 },
  { label: "Low Angle",    velocity: "50",  angle: 30, gravity: 9.81 },
  { label: "Moon Shot",    velocity: "50",  angle: 45, gravity: 1.62 },
  { label: "Fast Ball",    velocity: "44",  angle: 10, gravity: 9.81 },
  { label: "Cannon",       velocity: "100", angle: 45, gravity: 9.81 },
];

const DEFAULT_INPUTS: ProjectileInputs = {
  velocity:     "50",
  velocityUnit: "m/s",
  angle:        45,
  gravity:      9.81,
  launchHeight: "0",
  precision:    2,
};

// ── Canvas renderer ────────────────────────────────────────────────────────
function TrajectoryCanvas({
  result,
  animating,
  animProgress,
}: {
  result: ProjectileResult | null;
  animating: boolean;
  animProgress: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const PAD = { top: 30, right: 30, bottom: 50, left: 60 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, W, H);

    if (!result || result.trajectoryPoints.length < 2) {
      ctx.fillStyle = "#9ca3af";
      ctx.font = "14px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Enter values to see trajectory", W / 2, H / 2);
      return;
    }

    const pts = result.trajectoryPoints;
    const maxX = result.range;
    const maxY = result.maxHeight * 1.15 || 1;

    const toCanvasX = (x: number) => PAD.left + (x / maxX) * plotW;
    const toCanvasY = (y: number) => PAD.top + plotH - (y / maxY) * plotH;

    // Grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    const xTicks = 5;
    const yTicks = 4;
    for (let i = 0; i <= xTicks; i++) {
      const x = PAD.left + (i / xTicks) * plotW;
      ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, PAD.top + plotH); ctx.stroke();
    }
    for (let i = 0; i <= yTicks; i++) {
      const y = PAD.top + (i / yTicks) * plotH;
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + plotW, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(PAD.left, PAD.top);
    ctx.lineTo(PAD.left, PAD.top + plotH);
    ctx.lineTo(PAD.left + plotW, PAD.top + plotH);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i <= xTicks; i++) {
      const val = (maxX * i) / xTicks;
      const x = PAD.left + (i / xTicks) * plotW;
      ctx.fillText(val.toFixed(0) + "m", x, PAD.top + plotH + 18);
    }
    ctx.textAlign = "right";
    for (let i = 0; i <= yTicks; i++) {
      const val = (maxY * (yTicks - i)) / yTicks;
      const y = PAD.top + (i / yTicks) * plotH;
      ctx.fillText(val.toFixed(0) + "m", PAD.left - 8, y + 4);
    }

    // Axis titles
    ctx.fillStyle = "#374151";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Horizontal Distance (m)", PAD.left + plotW / 2, H - 6);
    ctx.save();
    ctx.translate(14, PAD.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Height (m)", 0, 0);
    ctx.restore();

    // Determine how many points to draw based on animation progress
    const drawCount = animating
      ? Math.floor(pts.length * animProgress)
      : pts.length;
    const drawPts = pts.slice(0, Math.max(2, drawCount));

    // Trajectory fill
    ctx.beginPath();
    ctx.moveTo(toCanvasX(drawPts[0].x), toCanvasY(0));
    drawPts.forEach((p) => ctx.lineTo(toCanvasX(p.x), toCanvasY(p.y)));
    ctx.lineTo(toCanvasX(drawPts[drawPts.length - 1].x), toCanvasY(0));
    ctx.closePath();
    ctx.fillStyle = "rgba(5, 133, 84, 0.08)";
    ctx.fill();

    // Trajectory line
    ctx.beginPath();
    ctx.moveTo(toCanvasX(drawPts[0].x), toCanvasY(drawPts[0].y));
    drawPts.forEach((p) => ctx.lineTo(toCanvasX(p.x), toCanvasY(p.y)));
    ctx.strokeStyle = "#058554";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.stroke();

    // Peak marker
    if (!animating || animProgress > 0.5) {
      const peakX = toCanvasX(result.vx * result.peakTime);
      const peakY = toCanvasY(result.maxHeight);
      ctx.beginPath();
      ctx.arc(peakX, peakY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#92400e";
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${result.maxHeight.toFixed(1)}m`, peakX, peakY - 10);
    }

    // Projectile ball (animated)
    if (animating && drawPts.length > 0) {
      const last = drawPts[drawPts.length - 1];
      ctx.beginPath();
      ctx.arc(toCanvasX(last.x), toCanvasY(last.y), 7, 0, Math.PI * 2);
      ctx.fillStyle = "#058554";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Launch point
    ctx.beginPath();
    ctx.arc(toCanvasX(pts[0].x), toCanvasY(pts[0].y), 5, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

  }, [result, animating, animProgress]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={300}
      className="w-full h-auto rounded-lg"
      aria-label="Projectile trajectory graph"
    />
  );
}

// ── Main UI ────────────────────────────────────────────────────────────────
export default function ProjectileMotionCalculatorUI() {
  const [inputs, setInputs] = useState<ProjectileInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<ProjectileResult | null>(null);
  const [velErr, setVelErr] = useState<string | null>(null);
  const [heightErr, setHeightErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [animating, setAnimating] = useState(false);
  const [animProgress, setAnimProgress] = useState(1);
  const animRef = useRef<number | null>(null);
  const velRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    velRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const ve = validateVelocity(inputs.velocity);
      const he = validateHeight(inputs.launchHeight);
      setVelErr(ve);
      setHeightErr(he);
      if (ve || he) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Animation ────────────────────────────────────────────────────────────
  const startAnimation = () => {
    if (!result) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setAnimating(true);
    setAnimProgress(0);
    const duration = Math.min(3000, Math.max(1500, result.flightTime * 400));
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setAnimProgress(progress);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setAnimating(false);
        setAnimProgress(1);
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const stopAnimation = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setAnimating(false);
    setAnimProgress(1);
  };

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      velocity: p.velocity,
      angle: p.angle,
      gravity: p.gravity,
    }));
  };

  const handleGravityPreset = (g: number) => {
    setInputs((prev) => ({ ...prev, gravity: g }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setVelErr(null);
    setHeightErr(null);
    stopAnimation();
    velRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Projectile Motion: v=${inputs.velocity}${VELOCITY_SHORT[inputs.velocityUnit]}, θ=${inputs.angle}°, g=${inputs.gravity}m/s² → Range=${formatNum(result.range, inputs.precision)}m, Height=${formatNum(result.maxHeight, inputs.precision)}m, Time=${formatNum(result.flightTime, inputs.precision)}s`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "projectile-motion.txt");
  };

  const handleExportPNG = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "projectile-trajectory.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  // ── Angle hint ────────────────────────────────────────────────────────────
  const angleHint =
    inputs.angle === 45
      ? "45° gives maximum horizontal range in ideal projectile motion."
      : inputs.angle > 60
      ? "High angles increase height but reduce horizontal range."
      : inputs.angle < 30
      ? "Low angles maximize range at the cost of height."
      : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Projectile Motion Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter initial velocity and launch angle to instantly calculate range, maximum height, flight time, and velocity components. Visualize the trajectory in real time.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                Horizontal Range
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.range, inputs.precision)} m` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Max Height</span>
                    <span className="font-semibold">{formatNum(result.maxHeight, inputs.precision)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Flight Time</span>
                    <span className="font-semibold">{formatNum(result.flightTime, inputs.precision)} s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Peak Time</span>
                    <span className="font-semibold">{formatNum(result.peakTime, inputs.precision)} s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">vx</span>
                    <span className="font-semibold">{formatNum(result.vx, inputs.precision)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">vy</span>
                    <span className="font-semibold">{formatNum(result.vy, inputs.precision)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Landing Speed</span>
                    <span className="font-semibold">{formatNum(result.landingSpeed, inputs.precision)} m/s</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!result}
                  className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Save to History
                </button>
              </div>
            </div>

            {/* Settings & Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings & Actions</h3>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) as 2 | 4 | 6 }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowFormula(!showFormula)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📖 {showFormula ? "Hide" : "Show"} Formula
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              {result && (
                <>
                  <button
                    onClick={handleExport}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export TXT
                  </button>
                  <button
                    onClick={handleExportPNG}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    🖼️ Download Chart
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              {/* Velocity row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Velocity
                    <span className="ml-1 text-xs text-gray-400" title="Speed at which the projectile is launched">ⓘ</span>
                  </label>
                  <input
                    ref={velRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.velocity}
                    onChange={(e) => setInputs((p) => ({ ...p, velocity: e.target.value.replace(/[^0-9.]/g, "") }))}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${velErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="50"
                    min="0"
                    step="any"
                    aria-label="Initial velocity"
                  />
                  {velErr && <p className="text-xs text-red-600 mt-1">{velErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Velocity Unit</label>
                  <select
                    value={inputs.velocityUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, velocityUnit: e.target.value as typeof inputs.velocityUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_VELOCITY_UNITS.map((u) => (
                      <option key={u} value={u}>{VELOCITY_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Launch Angle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Launch Angle
                    <span className="ml-1 text-xs text-gray-400" title="Angle above horizontal at which the projectile is launched">ⓘ</span>
                  </label>
                  <span className="text-sm font-mono font-semibold text-primary">{inputs.angle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={90}
                  step={1}
                  value={inputs.angle}
                  onChange={(e) => setInputs((p) => ({ ...p, angle: parseInt(e.target.value) }))}
                  className="w-full accent-primary"
                  aria-label="Launch angle in degrees"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0°</span>
                  <span>45°</span>
                  <span>90°</span>
                </div>
                <input
                  type="number"
                  inputMode="numeric"
                  value={inputs.angle}
                  onChange={(e) => {
                    const v = Math.min(90, Math.max(0, parseInt(e.target.value) || 0));
                    setInputs((p) => ({ ...p, angle: v }));
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                  min={0}
                  max={90}
                  aria-label="Launch angle numeric input"
                />
                {angleHint && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    💡 {angleHint}
                  </p>
                )}
              </div>

              {/* Gravity row */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gravity (m/s²)
                  <span className="ml-1 text-xs text-gray-400" title="Gravitational acceleration">ⓘ</span>
                </label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {GRAVITY_PRESETS.map((gp) => (
                    <button
                      key={gp.label}
                      onClick={() => handleGravityPreset(gp.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                        inputs.gravity === gp.value
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {gp.label} ({gp.value})
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputs.gravity}
                  onChange={(e) => setInputs((p) => ({ ...p, gravity: parseFloat(e.target.value) || 9.81 }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="9.81"
                  min="0.01"
                  step="any"
                  aria-label="Gravity value"
                />
              </div>

              {/* Launch Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Launch Height (m)
                  <span className="ml-1 text-xs text-gray-400" title="Height above ground at launch point">ⓘ</span>
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputs.launchHeight}
                  onChange={(e) => setInputs((p) => ({ ...p, launchHeight: e.target.value.replace(/[^0-9.]/g, "") }))}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${heightErr ? "border-red-300" : "border-gray-200"}`}
                  placeholder="0"
                  min="0"
                  step="any"
                  aria-label="Launch height"
                />
                {heightErr && <p className="text-xs text-red-600 mt-1">{heightErr}</p>}
              </div>

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Range:</strong> R = v²·sin(2θ)/g = {inputs.velocity} {VELOCITY_SHORT[inputs.velocityUnit]} → <strong>{formatNum(result.range, inputs.precision)} m</strong>
                </div>
              )}
            </div>

            {/* Trajectory Graph */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Trajectory Visualization</h3>
                <div className="flex gap-2">
                  <button
                    onClick={animating ? stopAnimation : startAnimation}
                    disabled={!result}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {animating ? "⏸ Pause" : "▶ Animate"}
                  </button>
                </div>
              </div>
              <TrajectoryCanvas result={result} animating={animating} animProgress={animProgress} />
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span> Launch
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-full bg-amber-400"></span> Peak
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-full bg-primary"></span> Trajectory
                </span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active =
                    inputs.velocity === p.velocity &&
                    inputs.angle === p.angle &&
                    inputs.gravity === p.gravity;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePreset(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Full Results Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">Range (R)</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.range, inputs.precision)} m</td>
                        <td className="py-2 px-3 text-gray-500">Total horizontal distance</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Max Height (H)</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.maxHeight, inputs.precision)} m</td>
                        <td className="py-2 px-3 text-gray-500">Peak vertical height</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Flight Time (T)</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.flightTime, inputs.precision)} s</td>
                        <td className="py-2 px-3 text-gray-500">Total time in air</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Peak Time</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.peakTime, inputs.precision)} s</td>
                        <td className="py-2 px-3 text-gray-500">Time to reach max height</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Horizontal vx</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.vx, inputs.precision)} m/s</td>
                        <td className="py-2 px-3 text-gray-500">Constant horizontal velocity</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Vertical vy</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.vy, inputs.precision)} m/s</td>
                        <td className="py-2 px-3 text-gray-500">Initial vertical velocity</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Landing Speed</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.landingSpeed, inputs.precision)} m/s</td>
                        <td className="py-2 px-3 text-gray-500">Speed at impact</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center">vx = v · cos(θ)</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center">vy = v · sin(θ)</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center">T = 2·vy / g</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center">H = vy² / (2g)</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center">R = v²·sin(2θ) / g</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center">y(t) = vy·t − ½g·t²</div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">v (Velocity)</div>
                      <div className="text-blue-700 text-xs">Initial launch speed in m/s</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">θ (Angle)</div>
                      <div className="text-orange-700 text-xs">Launch angle above horizontal</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">g (Gravity)</div>
                      <div className="text-green-700 text-xs">Gravitational acceleration (9.81 m/s² on Earth)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Key insight:</strong> Maximum range occurs at 45°. Complementary angles (e.g., 30° and 60°) produce the same range but different heights and flight times.
                  </div>
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Calculation History</h3>
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
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            v={entry.inputs.velocity} {VELOCITY_SHORT[entry.inputs.velocityUnit]}, θ={entry.inputs.angle}°, g={entry.inputs.gravity}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Range = {formatNum(entry.result.range, 2)} m | Height = {formatNum(entry.result.maxHeight, 2)} m
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

      <ProjectileMotionSEO />
      <RelatedTools
        currentTool="projectile-motion-calculator"
        tools={[
          "kinetic-energy-calculator",
          "force-calculator",
          "velocity-calculator",
          "centripetal-force-calculator",
          "angular-velocity-calculator",
          "momentum-calculator",
        ]}
      />
    </>
  );
}
