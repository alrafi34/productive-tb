"use client";

import { useEffect, useRef } from "react";
import type { ForecastPoint, StorageUnit } from "./logic";

interface BreakdownChartProps {
  effectiveData: number;
  replicationOverhead: number; // replicatedStorage - effectiveData
  reserved: number;
  overhead: number;
  unit: StorageUnit;
  height?: number;
}

export function StorageBreakdownChart({ effectiveData, replicationOverhead, reserved, overhead, unit, height = 90 }: BreakdownChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const segments = [
    { label: "Effective Data", value: effectiveData, color: "#058554" },
    { label: "Replication", value: replicationOverhead, color: "#2563EB" },
    { label: "Reserved", value: reserved, color: "#D97706" },
    { label: "Overhead", value: overhead, color: "#DC2626" },
  ].filter((s) => s.value > 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

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

      const total = segments.reduce((s, seg) => s + seg.value, 0);
      if (total <= 0) return;

      const barY = 12, barH = 24;
      let x = 0;
      segments.forEach((seg) => {
        const w = (seg.value / total) * width;
        ctx.fillStyle = seg.color;
        ctx.fillRect(x, barY, Math.max(0, w), barH);
        x += w;
      });

      // Legend
      let lx = 0, ly = barY + barH + 16;
      ctx.font = "11px -apple-system, Arial, sans-serif";
      segments.forEach((seg) => {
        const pct = ((seg.value / total) * 100).toFixed(1);
        const text = `${seg.label} ${pct}%`;
        const textW = ctx.measureText(text).width;
        if (lx + textW + 20 > width) { lx = 0; ly += 18; }
        ctx.fillStyle = seg.color;
        ctx.fillRect(lx, ly - 9, 9, 9);
        ctx.fillStyle = "#374151";
        ctx.fillText(text, lx + 14, ly - 1);
        lx += textW + 24;
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [effectiveData, replicationOverhead, reserved, overhead, height, segments]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label={`Storage breakdown chart in ${unit}`} />
    </div>
  );
}

interface ForecastChartProps {
  forecast: ForecastPoint[];
  unit: StorageUnit;
  height?: number;
}

export function ForecastBarChart({ forecast, unit, height = 200 }: ForecastChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || forecast.length === 0) return;

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

      const padding = { top: 20, right: 16, bottom: 30, left: 8 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const max = Math.max(...forecast.map((f) => f.futureStorage)) * 1.15;

      const n = forecast.length;
      const barGap = plotW * 0.08;
      const barW = (plotW - barGap * (n + 1)) / n;

      forecast.forEach((f, i) => {
        const x = padding.left + barGap + i * (barW + barGap);
        const h = (f.futureStorage / max) * plotH;
        const y = padding.top + plotH - h;
        ctx.fillStyle = "#058554";
        ctx.fillRect(x, y, barW, h);

        ctx.fillStyle = "#111827";
        ctx.font = "600 10px -apple-system, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(f.futureStorage.toFixed(1), x + barW / 2, y - 6);

        ctx.fillStyle = "#6b7280";
        ctx.font = "10px -apple-system, Arial, sans-serif";
        ctx.fillText(`Yr ${f.year}`, x + barW / 2, height - 10);
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [forecast, height]);

  if (forecast.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label={`Storage growth forecast chart in ${unit} across future years`} />
    </div>
  );
}
