"use client";

import { useEffect, useRef } from "react";

// ── 2D scatter plot with connecting distance line (only meaningful for 2D vectors) ──

interface Scatter2DProps {
  a: number[];
  b: number[];
  height?: number;
}

export function Scatter2DChart({ a, b, height = 220 }: Scatter2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || a.length !== 2 || b.length !== 2) return;

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

      const padding = 30;
      const plotW = width - padding * 2;
      const plotH = height - padding * 2;
      const allX = [a[0], b[0]], allY = [a[1], b[1]];
      const minX = Math.min(...allX), maxX = Math.max(...allX);
      const minY = Math.min(...allY), maxY = Math.max(...allY);
      const rangeX = maxX - minX || 1, rangeY = maxY - minY || 1;
      const pad = 0.25;
      const toX = (v: number) => padding + ((v - minX + rangeX * pad) / (rangeX * (1 + 2 * pad))) * plotW;
      const toY = (v: number) => height - padding - ((v - minY + rangeY * pad) / (rangeY * (1 + 2 * pad))) * plotH;

      // Gridlines
      ctx.strokeStyle = "#f3f4f6";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padding + (plotH / 4) * i;
        ctx.beginPath(); ctx.moveTo(padding, y); ctx.lineTo(padding + plotW, y); ctx.stroke();
      }

      // Connecting line
      ctx.strokeStyle = "#d1d5db";
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(toX(a[0]), toY(a[1]));
      ctx.lineTo(toX(b[0]), toY(b[1]));
      ctx.stroke();
      ctx.setLineDash([]);

      // Point A
      ctx.fillStyle = "#2563eb";
      ctx.beginPath(); ctx.arc(toX(a[0]), toY(a[1]), 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#374151";
      ctx.font = "11px -apple-system, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`A (${a[0]}, ${a[1]})`, toX(a[0]), toY(a[1]) - 12);

      // Point B
      ctx.fillStyle = "#058554";
      ctx.beginPath(); ctx.arc(toX(b[0]), toY(b[1]), 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#374151";
      ctx.fillText(`B (${b[0]}, ${b[1]})`, toX(b[0]), toY(b[1]) - 12);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [a, b, height]);

  if (a.length !== 2 || b.length !== 2) return null;

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Scatter plot showing Point A and Point B in 2D space" />
    </div>
  );
}

// ── Per-dimension absolute difference bar chart (works for any dimensionality) ──

interface DiffBarProps {
  a: number[];
  b: number[];
  height?: number;
}

export function DiffBarChart({ a, b, height = 180 }: DiffBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || a.length === 0 || a.length !== b.length) return;

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

      const diffs = a.slice(0, 30).map((v, i) => Math.abs(v - b[i]));
      const padding = { top: 12, right: 12, bottom: 22, left: 12 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const maxDiff = Math.max(...diffs, 0.0001);
      const gap = 4;
      const barW = plotW / diffs.length - gap;

      diffs.forEach((d, i) => {
        const barH = (d / maxDiff) * plotH;
        const x = padding.left + i * (plotW / diffs.length);
        const y = padding.top + plotH - barH;
        ctx.fillStyle = "#058554";
        ctx.fillRect(x, y, Math.max(1, barW), barH);
      });

      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "center";
      diffs.forEach((_, i) => {
        const x = padding.left + i * (plotW / diffs.length) + barW / 2;
        ctx.fillText(`d${i + 1}`, x, height - 8);
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [a, b, height]);

  if (a.length === 0 || a.length !== b.length) return null;

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Bar chart of the absolute difference between each vector dimension" />
    </div>
  );
}
