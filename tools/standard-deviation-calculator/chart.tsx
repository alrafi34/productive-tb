"use client";

import { useEffect, useRef } from "react";
import { HistogramBin } from "./logic";

// ── Histogram with mean / median / ±1 SD bands ────────────────────────────────

interface HistogramProps {
  bins: HistogramBin[];
  mean: number;
  median: number;
  stdDev: number;
  height?: number;
}

export function HistogramChart({ bins, mean, median, stdDev, height = 240 }: HistogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || bins.length === 0) return;

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

      const padding = { top: 16, right: 16, bottom: 34, left: 16 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const domainMin = bins[0].min;
      const domainMax = bins[bins.length - 1].max;
      const domainRange = domainMax - domainMin || 1;
      const maxCount = Math.max(...bins.map((b) => b.count), 1);
      const toX = (v: number) => padding.left + ((v - domainMin) / domainRange) * plotW;

      // ±1 SD band
      ctx.fillStyle = "rgba(5, 133, 84, 0.06)";
      const sdX1 = toX(mean - stdDev);
      const sdX2 = toX(mean + stdDev);
      ctx.fillRect(Math.max(padding.left, sdX1), padding.top, Math.min(plotW, sdX2 - sdX1), plotH);

      // Bars
      const gap = 1;
      const barW = plotW / bins.length - gap;
      bins.forEach((b, i) => {
        const barH = (b.count / maxCount) * plotH;
        const x = padding.left + i * (plotW / bins.length);
        const y = padding.top + plotH - barH;
        ctx.fillStyle = "#058554";
        ctx.fillRect(x, y, barW, barH);
      });

      // Mean line
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(toX(mean), padding.top);
      ctx.lineTo(toX(mean), padding.top + plotH);
      ctx.stroke();

      // Median line
      ctx.strokeStyle = "#d97706";
      ctx.beginPath();
      ctx.moveTo(toX(median), padding.top);
      ctx.lineTo(toX(median), padding.top + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Axis labels
      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(domainMin.toFixed(1), padding.left, height - 10);
      ctx.textAlign = "right";
      ctx.fillText(domainMax.toFixed(1), width - padding.right, height - 10);
      ctx.textAlign = "center";
      ctx.fillStyle = "#2563eb";
      ctx.fillText("Mean", toX(mean), height - 22);
      ctx.fillStyle = "#d97706";
      ctx.fillText("Median", toX(median), height - 10);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [bins, mean, median, stdDev, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Histogram of dataset distribution with mean, median, and standard deviation band" />
    </div>
  );
}

// ── Box plot ──────────────────────────────────────────────────────────────────

interface BoxPlotProps {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  mean: number;
  height?: number;
}

export function BoxPlotChart({ min, q1, median, q3, max, mean, height = 140 }: BoxPlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      const padding = { left: 40, right: 40 };
      const plotW = width - padding.left - padding.right;
      const domainMin = min;
      const domainMax = max || 1;
      const range = domainMax - domainMin || 1;
      const toX = (v: number) => padding.left + ((v - domainMin) / range) * plotW;
      const midY = height / 2;
      const boxH = 44;

      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1.5;

      // whiskers
      ctx.beginPath();
      ctx.moveTo(toX(min), midY);
      ctx.lineTo(toX(q1), midY);
      ctx.moveTo(toX(q3), midY);
      ctx.lineTo(toX(max), midY);
      ctx.stroke();

      // whisker caps
      [min, max].forEach((v) => {
        ctx.beginPath();
        ctx.moveTo(toX(v), midY - 10);
        ctx.lineTo(toX(v), midY + 10);
        ctx.stroke();
      });

      // box (Q1 to Q3)
      ctx.fillStyle = "rgba(5, 133, 84, 0.12)";
      ctx.strokeStyle = "#058554";
      ctx.lineWidth = 2;
      const boxX = toX(q1);
      const boxW = Math.max(1, toX(q3) - toX(q1));
      ctx.fillRect(boxX, midY - boxH / 2, boxW, boxH);
      ctx.strokeRect(boxX, midY - boxH / 2, boxW, boxH);

      // median line
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(toX(median), midY - boxH / 2);
      ctx.lineTo(toX(median), midY + boxH / 2);
      ctx.stroke();

      // mean marker
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(toX(mean), midY, 4, 0, Math.PI * 2);
      ctx.fill();

      // labels
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#6b7280";
      ctx.textAlign = "center";
      [["Min", min], ["Q1", q1], ["Median", median], ["Q3", q3], ["Max", max]].forEach(([label, v]) => {
        ctx.fillText(`${label}`, toX(v as number), midY - boxH / 2 - 12);
        ctx.fillText(`${(v as number).toFixed(1)}`, toX(v as number), midY + boxH / 2 + 16);
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [min, q1, median, q3, max, mean, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Box plot showing minimum, quartiles, median, and maximum" />
    </div>
  );
}

export function exportCanvasAsPng(container: HTMLDivElement | null, filename: string) {
  if (!container) return;
  const canvas = container.querySelector("canvas");
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  });
}
