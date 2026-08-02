"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ROCPoint } from "./logic";

interface ROCChartProps {
  points: ROCPoint[]; // downsampled for rendering
  currentThreshold: ROCPoint | null;
  height?: number;
}

interface Tooltip {
  x: number;
  y: number;
  point: ROCPoint;
}

export function ROCChart({ points, currentThreshold, height = 320 }: ROCChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const plotRef = useRef<{ padding: { top: number; right: number; bottom: number; left: number }; plotW: number; plotH: number; width: number }>({
    padding: { top: 16, right: 16, bottom: 32, left: 40 }, plotW: 0, plotH: 0, width: 0,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || points.length === 0) return;

    const width = container.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 16, right: 16, bottom: 32, left: 40 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;
    plotRef.current = { padding, plotW, plotH, width };

    const toX = (fpr: number) => padding.left + fpr * plotW;
    const toY = (tpr: number) => padding.top + plotH - tpr * plotH;

    // Gridlines
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (plotH / 4) * i;
      const x = padding.left + (plotW / 4) * i;
      ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(padding.left + plotW, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, padding.top); ctx.lineTo(x, padding.top + plotH); ctx.stroke();
    }

    // Diagonal random-classifier reference line
    ctx.strokeStyle = "#d1d5db";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    ctx.lineTo(toX(1), toY(1));
    ctx.stroke();
    ctx.setLineDash([]);

    // Fill under ROC curve
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    points.forEach((p) => ctx.lineTo(toX(p.fpr), toY(p.tpr)));
    ctx.lineTo(toX(1), toY(0));
    ctx.closePath();
    ctx.fillStyle = "rgba(5, 133, 84, 0.08)";
    ctx.fill();

    // ROC curve
    ctx.strokeStyle = "#058554";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    points.forEach((p, i) => { const x = toX(p.fpr), y = toY(p.tpr); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.stroke();

    // Current threshold marker
    if (currentThreshold) {
      ctx.fillStyle = "#d97706";
      ctx.beginPath();
      ctx.arc(toX(currentThreshold.fpr), toY(currentThreshold.tpr), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Axis labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px -apple-system, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("False Positive Rate", padding.left + plotW / 2, height - 6);
    ctx.save();
    ctx.translate(12, padding.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("True Positive Rate", 0, 0);
    ctx.restore();

    ctx.fillStyle = "#9ca3af";
    ctx.font = "10px -apple-system, Arial, sans-serif";
    ctx.textAlign = "right";
    ["0", "0.25", "0.5", "0.75", "1"].forEach((label, i) => {
      ctx.fillText(label, padding.left - 6, padding.top + plotH - (plotH / 4) * i + 3);
    });
    ctx.textAlign = "center";
    ["0", "0.25", "0.5", "0.75", "1"].forEach((label, i) => {
      ctx.fillText(label, padding.left + (plotW / 4) * i, height - 18);
    });
  }, [points, currentThreshold, height]);

  useEffect(() => {
    draw();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (points.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const { padding, plotW } = plotRef.current;
    const fpr = Math.min(1, Math.max(0, (mx - padding.left) / plotW));

    let nearest = points[0];
    let minDist = Infinity;
    for (const p of points) {
      const d = Math.abs(p.fpr - fpr);
      if (d < minDist) { minDist = d; nearest = p; }
    }
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, point: nearest });
  };

  return (
    <div ref={containerRef} className="w-full relative">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="ROC curve plotting true positive rate against false positive rate"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
        className="cursor-crosshair"
      />
      {tooltip && (
        <div
          className="absolute pointer-events-none bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 shadow-lg z-10"
          style={{ left: Math.min(tooltip.x + 12, plotRef.current.width - 140), top: Math.max(0, tooltip.y - 40) }}
        >
          <div>Threshold: {Number.isFinite(tooltip.point.threshold) ? tooltip.point.threshold.toFixed(3) : "—"}</div>
          <div>TPR: {tooltip.point.tpr.toFixed(3)} · FPR: {tooltip.point.fpr.toFixed(3)}</div>
        </div>
      )}
    </div>
  );
}
