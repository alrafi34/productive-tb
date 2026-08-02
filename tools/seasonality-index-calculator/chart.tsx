"use client";

import { useEffect, useRef, useState } from "react";
import type { SeasonResult } from "./logic";

function classColor(c: SeasonResult["classification"]): string {
  if (c === "above") return "#058554";
  if (c === "below") return "#DC2626";
  return "#9CA3AF";
}

interface SeasonalityBarChartProps {
  seasons: SeasonResult[];
  precision: number;
  height?: number;
}

export function SeasonalityBarChart({ seasons, precision, height = 260 }: SeasonalityBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ x: number; y: number; season: SeasonResult } | null>(null);
  const barsRef = useRef<{ x: number; w: number; season: SeasonResult }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || seasons.length === 0) return;

    const draw = () => {
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

      const padding = { top: 20, right: 16, bottom: 46, left: 40 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const maxIndex = Math.max(...seasons.map((s) => s.index), 110) * 1.1;
      const minIndex = Math.min(0, Math.min(...seasons.map((s) => s.index)));

      const toY = (v: number) => padding.top + plotH - ((v - minIndex) / (maxIndex - minIndex)) * plotH;
      const baseline = toY(100);

      // Gridline at 100 (overall average)
      ctx.strokeStyle = "#d1d5db";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding.left, baseline);
      ctx.lineTo(padding.left + plotW, baseline);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("100 (avg)", padding.left + plotW - 52, baseline - 4);

      const n = seasons.length;
      const barGap = plotW * 0.02;
      const barW = Math.max(6, (plotW - barGap * (n + 1)) / n);
      const bars: { x: number; w: number; season: SeasonResult }[] = [];

      seasons.forEach((s, i) => {
        const x = padding.left + barGap + i * (barW + barGap);
        const y = Math.min(toY(s.index), baseline);
        const h = Math.abs(toY(s.index) - baseline);
        ctx.fillStyle = classColor(s.classification);
        ctx.fillRect(x, y, barW, Math.max(1, h));
        bars.push({ x, w: barW, season: s });

        ctx.fillStyle = "#374151";
        ctx.font = "9px -apple-system, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.save();
        ctx.translate(x + barW / 2, height - padding.bottom + 8);
        ctx.rotate(n > 6 ? -Math.PI / 4 : 0);
        ctx.textAlign = n > 6 ? "right" : "center";
        ctx.fillText(s.label.length > 10 ? s.label.slice(0, 9) + "…" : s.label, 0, 0);
        ctx.restore();
      });

      barsRef.current = bars;
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [seasons, height]);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const bar = barsRef.current.find((b) => x >= b.x && x <= b.x + b.w);
    if (bar) setHover({ x: bar.x + bar.w / 2, y: e.clientY - rect.top, season: bar.season });
    else setHover(null);
  };

  if (seasons.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full relative">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Bar chart of seasonality index by period, color-coded above, average, and below the overall average"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      />
      {hover && (
        <div
          className="absolute pointer-events-none bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 shadow-lg z-10 whitespace-nowrap"
          style={{ left: hover.x, top: Math.max(0, hover.y - 48), transform: "translateX(-50%)" }}
        >
          <div className="font-semibold">{hover.season.label}</div>
          <div>Index: {hover.season.index.toFixed(precision)}</div>
          <div>Average: {hover.season.average.toLocaleString("en-US", { maximumFractionDigits: precision })}</div>
        </div>
      )}
    </div>
  );
}

interface SeasonalityLineChartProps {
  periods: string[];
  values: number[];
  overallAverage: number;
  height?: number;
}

export function SeasonalityLineChart({ periods, values, overallAverage, height = 220 }: SeasonalityLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || values.length === 0) return;

    const draw = () => {
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

      const padding = { top: 20, right: 16, bottom: 24, left: 44 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const max = Math.max(...values, overallAverage) * 1.08;
      const min = Math.min(Math.min(...values, overallAverage) * 0.92, 0);

      const toX = (i: number) => padding.left + (values.length <= 1 ? 0 : (i / (values.length - 1)) * plotW);
      const toY = (v: number) => padding.top + plotH - ((v - min) / (max - min)) * plotH;

      // Overall average reference line
      ctx.strokeStyle = "#d1d5db";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding.left, toY(overallAverage));
      ctx.lineTo(padding.left + plotW, toY(overallAverage));
      ctx.stroke();
      ctx.setLineDash([]);

      // Data line
      ctx.strokeStyle = "#058554";
      ctx.lineWidth = 2;
      ctx.beginPath();
      values.forEach((v, i) => {
        const x = toX(i), y = toY(v);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.fillStyle = "#058554";
      values.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(toX(i), toY(v), 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [values, overallAverage, height]);

  if (values.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Line chart of values across all entered periods in chronological order" />
    </div>
  );
}
