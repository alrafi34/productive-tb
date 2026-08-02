"use client";

import { useEffect, useRef } from "react";
import type { MAPoint } from "./logic";

interface TrendChartProps {
  values: number[];
  points: MAPoint[];
  showOriginal: boolean;
  showMA: boolean;
  height?: number;
}

export function TrendChart({ values, points, showOriginal, showMA, height = 300 }: TrendChartProps) {
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

      const padding = { top: 16, right: 16, bottom: 30, left: 46 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const allVals = [...values, ...points.map((p) => p.ma)];
      const yMin = Math.min(...allVals);
      const yMax = Math.max(...allVals);
      const yPad = (yMax - yMin || 1) * 0.1;
      const dyMin = yMin - yPad, dyMax = yMax + yPad;

      const n = values.length;
      const toX = (i: number) => padding.left + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
      const toY = (v: number) => padding.top + plotH - ((v - dyMin) / (dyMax - dyMin || 1)) * plotH;

      // grid
      ctx.strokeStyle = "#f1f5f9";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const gy = padding.top + (i / 4) * plotH;
        ctx.beginPath(); ctx.moveTo(padding.left, gy); ctx.lineTo(padding.left + plotW, gy); ctx.stroke();
      }

      // original line
      if (showOriginal) {
        ctx.strokeStyle = "#9ca3af";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        values.forEach((v, i) => {
          const px = toX(i), py = toY(v);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }

      // moving average line
      if (showMA && points.length > 0) {
        ctx.strokeStyle = "#058554";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        points.forEach((p, i) => {
          const px = toX(p.index), py = toY(p.ma);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();

        ctx.fillStyle = "#058554";
        points.forEach((p) => {
          ctx.beginPath();
          ctx.arc(toX(p.index), toY(p.ma), 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // y-axis labels
      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(dyMax.toFixed(1), padding.left - 6, padding.top + 8);
      ctx.fillText(dyMin.toFixed(1), padding.left - 6, padding.top + plotH);

      // legend
      ctx.textAlign = "left";
      let legendX = padding.left;
      if (showOriginal) {
        ctx.strokeStyle = "#9ca3af";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(legendX, height - 8); ctx.lineTo(legendX + 16, height - 8); ctx.stroke();
        ctx.fillStyle = "#6b7280";
        ctx.fillText("Original", legendX + 20, height - 5);
        legendX += 80;
      }
      if (showMA) {
        ctx.strokeStyle = "#058554";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(legendX, height - 8); ctx.lineTo(legendX + 16, height - 8); ctx.stroke();
        ctx.fillStyle = "#058554";
        ctx.fillText("Moving Average", legendX + 20, height - 5);
      }
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [values, points, showOriginal, showMA, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Line chart of original data and moving average trend" />
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

export function buildChartSVG(values: number[], points: MAPoint[], showOriginal: boolean, showMA: boolean, width = 640, height = 320): string {
  const padding = { top: 16, right: 16, bottom: 30, left: 46 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const allVals = [...values, ...points.map((p) => p.ma)];
  const yMin = Math.min(...allVals);
  const yMax = Math.max(...allVals);
  const yPad = (yMax - yMin || 1) * 0.1;
  const dyMin = yMin - yPad, dyMax = yMax + yPad;
  const n = values.length;
  const toX = (i: number) => padding.left + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const toY = (v: number) => padding.top + plotH - ((v - dyMin) / (dyMax - dyMin || 1)) * plotH;

  const originalPath = values.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(2)},${toY(v).toFixed(2)}`).join(" ");
  const maPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.index).toFixed(2)},${toY(p.ma).toFixed(2)}`).join(" ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${showOriginal ? `<path d="${originalPath}" fill="none" stroke="#9ca3af" stroke-width="1.5" />` : ""}
  ${showMA ? `<path d="${maPath}" fill="none" stroke="#058554" stroke-width="2.5" />` : ""}
</svg>`;
}
