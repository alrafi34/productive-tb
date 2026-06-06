"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  FatigueInputs,
  FatigueResult,
  MinerLoad,
  CalculationMethod,
  MaterialPreset,
  StressUnit,
  TemperatureCondition,
} from "./types";
import {
  calculateFatigueLife,
  validateInputs,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatCycles,
  formatNumber,
  debounce,
  MATERIAL_DATABASE,
  toMPa,
  fromMPa,
} from "./logic";
import FatigueLifeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ─── S-N Chart (canvas) ───────────────────────────────────────────────────────
function SNChart({
  points,
  userPoint,
  enduranceLimit,
}: {
  points: { logN: number; stressMPa: number }[];
  userPoint: { logN: number; stressMPa: number } | null;
  enduranceLimit: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 24, right: 20, bottom: 48, left: 62 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    // Axis ranges
    const minLogN = 3;
    const maxLogN = 8;
    const stressValues = points.map((p) => p.stressMPa);
    const maxStress = Math.max(...stressValues) * 1.1;
    const minStress = enduranceLimit * 0.7;

    const toX = (logN: number) =>
      pad.left + ((logN - minLogN) / (maxLogN - minLogN)) * chartW;
    const toY = (stress: number) =>
      pad.top + chartH - ((stress - minStress) / (maxStress - minStress)) * chartH;

    // Background
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let logN = minLogN; logN <= maxLogN; logN++) {
      const x = toX(logN);
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + chartH);
      ctx.stroke();
    }
    const stressStep = Math.round((maxStress - minStress) / 4);
    for (let s = Math.ceil(minStress / stressStep) * stressStep; s <= maxStress; s += stressStep) {
      const y = toY(s);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }

    // Endurance limit line
    const elY = toY(enduranceLimit);
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, elY);
    ctx.lineTo(pad.left + chartW, elY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#d97706";
    ctx.font = "10px Inter, system-ui";
    ctx.fillText(`Endurance limit (${enduranceLimit.toFixed(0)} MPa)`, pad.left + 4, elY - 4);

    // S-N Curve
    ctx.strokeStyle = "#058554";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = toX(p.logN);
      const y = toY(p.stressMPa);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // User point
    if (userPoint && userPoint.logN >= minLogN && userPoint.logN <= maxLogN) {
      const ux = toX(userPoint.logN);
      const uy = toY(Math.min(userPoint.stressMPa, maxStress));
      ctx.fillStyle = "#ef4444";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ux, uy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Label
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 11px Inter, system-ui";
      const label = `${userPoint.stressMPa.toFixed(0)} MPa`;
      ctx.fillText(label, ux + 9, uy - 4);
    }

    // Axes
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + chartH);
    ctx.lineTo(pad.left + chartW, pad.top + chartH);
    ctx.stroke();

    // X axis labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px Inter, system-ui";
    ctx.textAlign = "center";
    for (let logN = minLogN; logN <= maxLogN; logN++) {
      const x = toX(logN);
      ctx.fillText(`10^${logN}`, x, pad.top + chartH + 16);
    }

    // Y axis labels
    ctx.textAlign = "right";
    for (let s = Math.ceil(minStress / stressStep) * stressStep; s <= maxStress; s += stressStep) {
      const y = toY(s);
      ctx.fillText(`${s.toFixed(0)}`, pad.left - 6, y + 4);
    }

    // Axis titles
    ctx.fillStyle = "#374151";
    ctx.font = "bold 11px Inter, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Cycles to Failure (N)", pad.left + chartW / 2, H - 6);
    ctx.save();
    ctx.translate(14, pad.top + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Stress Amplitude (MPa)", 0, 0);
    ctx.restore();

    // Legend
    ctx.fillStyle = "#058554";
    ctx.fillRect(pad.left + chartW - 120, pad.top + 6, 12, 3);
    ctx.fillStyle = "#374151";
    ctx.textAlign = "left";
    ctx.font = "10px Inter, system-ui";
    ctx.fillText("S-N Curve", pad.left + chartW - 104, pad.top + 11);
    if (userPoint) {
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(pad.left + chartW - 114, pad.top + 22, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#374151";
      ctx.fillText("Your Point", pad.left + chartW - 104, pad.top + 26);
    }
  }, [points, userPoint, enduranceLimit]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: "280px" }}
      aria-label="S-N Curve Chart"
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const DEFAULT_INPUTS: FatigueInputs = {
  method: "basquin",
  material: "steel",
  stressAmplitude: 220,
  stressUnit: "MPa",
  fatigueStrengthCoefficient: 900,
  fatigueStrengthExponent: -0.12,
  safetyFactor: 1.5,
  temperature: "room",
  minerLoads: [
    { id: "1", stressAmplitude: 220, cycles: 50000 },
    { id: "2", stressAmplitude: 180, cycles: 200000 },
  ],
};

const METHOD_LABELS: Record<CalculationMethod, string> = {
  basquin: "Basquin Equation",
  "sn-curve": "S-N Curve",
  "miners-rule": "Miner's Rule",
};

const RISK_COLORS: Record<string, string> = {
  Safe: "bg-green-100 text-green-800 border border-green-200",
  "Low Risk": "bg-blue-100 text-blue-800 border border-blue-200",
  Moderate: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  "High Risk": "bg-orange-100 text-orange-800 border border-orange-200",
  Critical: "bg-red-100 text-red-800 border border-red-200",
};

const PRESETS = [
  {
    name: "Steel Shaft (High Cycle)",
    desc: "Typical rotating shaft at moderate stress",
    inputs: {
      method: "basquin" as CalculationMethod,
      material: "steel" as MaterialPreset,
      stressAmplitude: 220,
      stressUnit: "MPa" as StressUnit,
      fatigueStrengthCoefficient: 900,
      fatigueStrengthExponent: -0.12,
      safetyFactor: 1.5,
      temperature: "room" as TemperatureCondition,
    },
  },
  {
    name: "Aluminum Component",
    desc: "Aluminum alloy part under cyclic bending",
    inputs: {
      method: "basquin" as CalculationMethod,
      material: "aluminum" as MaterialPreset,
      stressAmplitude: 180,
      stressUnit: "MPa" as StressUnit,
      fatigueStrengthCoefficient: 400,
      fatigueStrengthExponent: -0.11,
      safetyFactor: 2.0,
      temperature: "room" as TemperatureCondition,
    },
  },
  {
    name: "Titanium Aerospace Part",
    desc: "High-performance alloy at elevated stress",
    inputs: {
      method: "basquin" as CalculationMethod,
      material: "titanium" as MaterialPreset,
      stressAmplitude: 400,
      stressUnit: "MPa" as StressUnit,
      fatigueStrengthCoefficient: 800,
      fatigueStrengthExponent: -0.10,
      safetyFactor: 1.8,
      temperature: "room" as TemperatureCondition,
    },
  },
  {
    name: "Bridge Component (Variable)",
    desc: "Variable loading via Miner's Rule",
    inputs: {
      method: "miners-rule" as CalculationMethod,
      material: "steel" as MaterialPreset,
      stressAmplitude: 200,
      stressUnit: "MPa" as StressUnit,
      fatigueStrengthCoefficient: 900,
      fatigueStrengthExponent: -0.12,
      safetyFactor: 2.0,
      temperature: "room" as TemperatureCondition,
    },
    minerLoads: [
      { id: "1", stressAmplitude: 280, cycles: 10000 },
      { id: "2", stressAmplitude: 200, cycles: 100000 },
      { id: "3", stressAmplitude: 140, cycles: 500000 },
    ],
  },
];

export default function FatigueLifeCalculatorUI() {
  const [inputs, setInputs] = useState<FatigueInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<FatigueResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ReturnType<typeof getHistory>>([]);

  // Load history client-side only
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Sync material presets when material changes
  const handleMaterialChange = (material: MaterialPreset) => {
    const mat = MATERIAL_DATABASE[material];
    setInputs((prev) => ({
      ...prev,
      material,
      fatigueStrengthCoefficient: material !== "custom" ? mat.sigmaF : prev.fatigueStrengthCoefficient,
      fatigueStrengthExponent: material !== "custom" ? mat.b : prev.fatigueStrengthExponent,
    }));
  };

  // Debounced calculation
  const debouncedCalc = useCallback(
    debounce(() => {
      setError(null);
      const err = validateInputs(inputs);
      if (err) {
        setError(err);
        setResult(null);
        return;
      }
      try {
        setResult(calculateFatigueLife(inputs));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  useEffect(() => {
    debouncedCalc();
  }, [inputs, debouncedCalc]);

  const set = <K extends keyof FatigueInputs>(key: K, value: FatigueInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const text =
      inputs.method === "miners-rule"
        ? `Fatigue Damage Ratio: ${result.damageRatio?.toFixed(4)} — ${result.failurePredicted ? "Failure predicted" : "No failure"} — Risk: ${result.riskLevel}`
        : `Estimated Fatigue Life: ${formatCycles(result.adjustedLifeCycles)} — Risk: ${result.riskLevel}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExportTXT = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "fatigue_life_report.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    downloadFile(exportToCSV(inputs, result), "fatigue_life_report.csv", "text/csv");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: (typeof history)[0]) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setInputs((prev) => ({
      ...prev,
      ...preset.inputs,
      minerLoads: preset.minerLoads ?? prev.minerLoads,
    }));
  };

  // Miner's Rule load management
  const addMinerLoad = () => {
    setInputs((prev) => ({
      ...prev,
      minerLoads: [
        ...prev.minerLoads,
        { id: Date.now().toString(), stressAmplitude: 200, cycles: 100000 },
      ],
    }));
  };

  const removeMinerLoad = (id: string) => {
    setInputs((prev) => ({
      ...prev,
      minerLoads: prev.minerLoads.filter((l) => l.id !== id),
    }));
  };

  const updateMinerLoad = (id: string, field: keyof MinerLoad, value: number) => {
    setInputs((prev) => ({
      ...prev,
      minerLoads: prev.minerLoads.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    }));
  };

  const stressMPa = toMPa(inputs.stressAmplitude, inputs.stressUnit);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Fatigue Life Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate cycles to failure using the Basquin equation, S-N curve method, and Miner&apos;s Rule for cumulative damage.
                Supports steel, aluminum, titanium, copper, and custom materials with live S-N curve visualization.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Column ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result card */}
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p
                    className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {inputs.method === "miners-rule" ? "Damage Ratio" : "Estimated Life"}
                  </p>
                  {inputs.method === "miners-rule" ? (
                    <>
                      <div className="text-5xl font-bold mb-1">
                        {result.damageRatio !== undefined ? formatNumber(result.damageRatio, 4) : "—"}
                      </div>
                      <div className="text-xl text-primary-100">
                        D {result.failurePredicted ? "≥ 1 (Failure)" : "< 1 (Safe)"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold mb-1 leading-tight">
                        {isFinite(result.adjustedLifeCycles)
                          ? result.adjustedLifeCycles >= 1e6
                            ? (result.adjustedLifeCycles / 1e6).toFixed(3) + "M"
                            : result.adjustedLifeCycles >= 1e3
                            ? (result.adjustedLifeCycles / 1e3).toFixed(1) + "K"
                            : Math.round(result.adjustedLifeCycles).toLocaleString()
                          : "∞"}
                      </div>
                      <div className="text-lg text-primary-100">
                        {isFinite(result.adjustedLifeCycles) ? "cycles to failure" : "(infinite life)"}
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 border-t border-white/20 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Risk Level:</span>
                    <span className="font-semibold">{result.riskLevel}</span>
                  </div>
                  {inputs.method !== "miners-rule" && isFinite(result.estimatedLifeCycles) && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Raw Life:</span>
                      <span className="font-semibold">{formatCycles(result.estimatedLifeCycles)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Safety Factor:</span>
                    <span className="font-semibold">{inputs.safetyFactor}×</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Endurance Limit:</span>
                    <span className="font-semibold">{result.enduranceLimit.toFixed(1)} MPa</span>
                  </div>
                  {result.exceedsEnduranceLimit && (
                    <div className="text-xs bg-red-500/20 text-red-100 rounded px-2 py-1">
                      ⚠ Stress exceeds endurance limit
                    </div>
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
                    onClick={handleSave}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Actions
              </h3>
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
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <>
                    <button
                      onClick={handleExportTXT}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export Report
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

            {/* Risk indicator */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3
                  className="text-sm font-semibold text-gray-800 mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Safety Assessment
                </h3>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm ${RISK_COLORS[result.riskLevel]}`}
                >
                  <span>
                    {result.riskLevel === "Safe"
                      ? "✓"
                      : result.riskLevel === "Critical"
                      ? "✕"
                      : "⚠"}
                  </span>
                  {result.riskLevel}
                </div>
                {inputs.method !== "miners-rule" && isFinite(result.adjustedLifeCycles) && (
                  <div className="mt-3 text-xs text-gray-500">
                    Applied life: {formatCycles(result.adjustedLifeCycles)}
                  </div>
                )}
                {inputs.method === "miners-rule" && result.damageRatio !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Damage D = {formatNumber(result.damageRatio, 4)}</span>
                      <span>Limit = 1.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          result.failurePredicted ? "bg-red-500" : result.damageRatio > 0.7 ? "bg-orange-400" : "bg-primary"
                        }`}
                        style={{ width: `${Math.min(result.damageRatio * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Method Selection */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Method
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {(["basquin", "sn-curve", "miners-rule"] as CalculationMethod[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => set("method", m)}
                    className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-colors text-center ${
                      inputs.method === m
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {METHOD_LABELS[m]}
                  </button>
                ))}
              </div>
              {inputs.method === "basquin" && (
                <p className="text-xs text-gray-500">
                  Uses σa = σ&apos;f × (2N)^b. Enter the fatigue strength coefficient and exponent directly.
                </p>
              )}
              {inputs.method === "sn-curve" && (
                <p className="text-xs text-gray-500">
                  Uses material S-N curve data. Select a material and enter the stress amplitude.
                </p>
              )}
              {inputs.method === "miners-rule" && (
                <p className="text-xs text-gray-500">
                  Cumulative damage for variable amplitude loading. D = Σ(n/N). Failure when D ≥ 1.
                </p>
              )}
            </div>

            {/* Parameters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Material & Stress
              </h3>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(["steel", "aluminum", "titanium", "copper", "custom"] as MaterialPreset[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => handleMaterialChange(m)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                        inputs.material === m
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                {inputs.material !== "custom" && (
                  <p className="text-xs text-gray-500 mt-2">
                    σ&apos;f = {MATERIAL_DATABASE[inputs.material].sigmaF} MPa, b = {MATERIAL_DATABASE[inputs.material].b},
                    endurance = {MATERIAL_DATABASE[inputs.material].enduranceLimit} MPa
                  </p>
                )}
              </div>

              {/* Stress Amplitude — only for non-miner methods */}
              {inputs.method !== "miners-rule" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stress Amplitude</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={inputs.stressAmplitude}
                      onChange={(e) => set("stressAmplitude", parseFloat(e.target.value) || 0)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="220"
                      min="0"
                      step="any"
                      aria-label="Stress amplitude"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {(["MPa", "psi"] as StressUnit[]).map((u) => (
                        <button
                          key={u}
                          onClick={() => {
                            const converted =
                              u === "psi"
                                ? fromMPa(inputs.stressAmplitude, "MPa") / 0.00689476
                                : toMPa(inputs.stressAmplitude, "psi");
                            setInputs((prev) => ({ ...prev, stressUnit: u, stressAmplitude: parseFloat(converted.toFixed(2)) }));
                          }}
                          className={`px-3 py-3 rounded-lg font-semibold text-sm transition-colors ${
                            inputs.stressUnit === u
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  {inputs.stressUnit === "psi" && (
                    <p className="text-xs text-gray-500 mt-1">
                      = {stressMPa.toFixed(2)} MPa
                    </p>
                  )}
                </div>
              )}

              {/* Basquin / Custom material parameters */}
              {(inputs.method === "basquin" || inputs.method === "miners-rule" || inputs.material === "custom") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fatigue Strength Coefficient σ&apos;f (MPa)
                    </label>
                    <input
                      type="number"
                      value={inputs.fatigueStrengthCoefficient}
                      onChange={(e) => set("fatigueStrengthCoefficient", parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="900"
                      min="0"
                      step="any"
                      aria-label="Fatigue strength coefficient"
                    />
                    <p className="text-xs text-gray-500 mt-1">Typical: 600–1200 MPa for steel</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fatigue Strength Exponent b
                    </label>
                    <input
                      type="number"
                      value={inputs.fatigueStrengthExponent}
                      onChange={(e) => set("fatigueStrengthExponent", parseFloat(e.target.value) || -0.12)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="-0.12"
                      step="0.01"
                      aria-label="Fatigue strength exponent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be negative (e.g. −0.05 to −0.15)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Miner's Rule Load Blocks */}
            {inputs.method === "miners-rule" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Load Blocks
                  </h3>
                  <button
                    onClick={addMinerLoad}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    + Add Block
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Stress Amplitude (MPa)</div>
                    <div className="col-span-5">Applied Cycles (n)</div>
                    <div className="col-span-1" />
                  </div>
                  {inputs.minerLoads.map((load, i) => (
                    <div key={load.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-1 text-sm text-gray-500 font-mono text-center">{i + 1}</div>
                      <div className="col-span-5">
                        <input
                          type="number"
                          value={load.stressAmplitude}
                          onChange={(e) => updateMinerLoad(load.id, "stressAmplitude", parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                          min="0"
                          step="any"
                          placeholder="200"
                        />
                      </div>
                      <div className="col-span-5">
                        <input
                          type="number"
                          value={load.cycles}
                          onChange={(e) => updateMinerLoad(load.id, "cycles", parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                          min="0"
                          step="1000"
                          placeholder="100000"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {inputs.minerLoads.length > 1 && (
                          <button
                            onClick={() => removeMinerLoad(load.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                            aria-label="Remove block"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Parameters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Additional Parameters
              </h3>

              {/* Safety Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Factor: {inputs.safetyFactor.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={inputs.safetyFactor}
                  onChange={(e) => set("safetyFactor", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Safety factor"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1.0 (Aggressive)</span>
                  <span>2.5</span>
                  <span>5.0 (Conservative)</span>
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: "room", label: "Room Temp", factor: "1.0×" },
                    { key: "high", label: "High Temp", factor: "0.85×" },
                    { key: "extreme", label: "Extreme", factor: "0.65×" },
                  ] as { key: TemperatureCondition; label: string; factor: string }[]).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => set("temperature", t.key)}
                      className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-colors text-center ${
                        inputs.temperature === t.key
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div>{t.label}</div>
                      <div className={`text-xs mt-0.5 ${inputs.temperature === t.key ? "text-primary-100" : "text-gray-500"}`}>
                        {t.factor}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Warnings */}
            {result && result.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2 text-sm">
                  <span>⚠️</span> Engineering Warnings
                </h4>
                <ul className="space-y-1">
                  {result.warnings.map((w, i) => (
                    <li key={i} className="text-sm text-yellow-800">• {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* S-N Curve Chart */}
            {result && !error && (inputs.method === "basquin" || inputs.method === "sn-curve") && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  S-N Curve
                </h3>
                <SNChart
                  points={result.snCurvePoints}
                  userPoint={result.userPoint}
                  enduranceLimit={result.enduranceLimit}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Green line = S-N curve for {MATERIAL_DATABASE[inputs.material].name}. Red dot = your operating point.
                </p>
              </div>
            )}

            {/* Formula display */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Applied Formula
                </h3>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-mono">{result.formula}</p>
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {result && !error && result.steps.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {result.steps.map((step, i) => (
                    <div key={i} className={step === "" ? "h-2" : "text-gray-700"}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Result breakdown (non-miner) */}
            {result && !error && inputs.method !== "miners-rule" && isFinite(result.estimatedLifeCycles) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Life Analysis
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Estimated Life",
                      value: formatCycles(result.estimatedLifeCycles),
                      color: "blue",
                    },
                    {
                      label: "Adjusted Life",
                      value: formatCycles(result.adjustedLifeCycles),
                      color: "green",
                    },
                    {
                      label: "Endurance Limit",
                      value: `${result.enduranceLimit.toFixed(1)} MPa`,
                      color: "yellow",
                    },
                    {
                      label: "Temp. Factor",
                      value: `${result.temperatureFactor.toFixed(2)}×`,
                      color: "purple",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`p-3 bg-${item.color}-50 border border-${item.color}-200 rounded-lg`}
                    >
                      <div className={`text-xs text-${item.color}-600 uppercase tracking-wider mb-1`}>
                        {item.label}
                      </div>
                      <div className={`text-sm font-bold text-${item.color}-900`}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Example Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => applyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.desc}</div>
                    <div className="text-xs text-primary font-semibold mt-1 capitalize">
                      {preset.inputs.material} · {METHOD_LABELS[preset.inputs.method]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
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
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry: ReturnType<typeof getHistory>[0]) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm capitalize">
                            {entry.inputs.material} · {METHOD_LABELS[entry.inputs.method as CalculationMethod]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.method !== "miners-rule"
                            ? `Stress: ${entry.inputs.stressAmplitude} ${entry.inputs.stressUnit} → ${formatCycles(entry.result.adjustedLifeCycles)}`
                            : `Miner D = ${entry.result.damageRatio?.toFixed(4)} — ${entry.result.failurePredicted ? "Failure" : "Safe"}`}
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

      <FatigueLifeCalculatorSEO />
      <RelatedTools
        currentTool="fatigue-life-calculator"
        tools={[
          "stress-calculator",
          "factor-of-safety-calculator",
          "beam-deflection-calculator",
          "spring-force-calculator",
          "moment-of-inertia-calculator",
          "natural-frequency-calculator",
        ]}
      />
    </>
  );
}
