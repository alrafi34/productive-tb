"use client";

import { useEffect, useRef } from "react";
import type { SmoothingPoint, ForecastPoint } from "./logic";

interface SmoothingChartProps {
  points: SmoothingPoint[];
  forecast: ForecastPoint[];
  showActual: boolean;
  showSmoothed: boolean;
  showForecast: boolean;
  height?: number;
}

export function SmoothingChart({ points, forecast, showActual, showSmoothed, showForecast, height = 320 }: SmoothingChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || points.length === 0) return;

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

      const padding = { top: 16, right: 16, bottom: 30, left: 50 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const totalN = points.length + forecast.length;
      const allVals = [
        ...points.map((p) => p.actual),
        ...points.map((p) => p.smoothed).filter((v): v is number => v !== null),
        ...forecast.map((f) => f.forecast),
      ];
      const yMin = Math.min(...allVals);
      const yMax = Math.max(...allVals);
      const yPad = (yMax - yMin || 1) * 0.1;
      const dyMin = yMin - yPad, dyMax = yMax + yPad;

      const toX = (i: number) => padding.left + (totalN <= 1 ? 0 : (i / (totalN - 1)) * plotW);
      const toY = (v: number) => padding.top + plotH - ((v - dyMin) / (dyMax - dyMin || 1)) * plotH;

      ctx.strokeStyle = "#f1f5f9";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const gy = padding.top + (i / 4) * plotH;
        ctx.beginPath(); ctx.moveTo(padding.left, gy); ctx.lineTo(padding.left + plotW, gy); ctx.stroke();
      }

      if (showActual) {
        ctx.strokeStyle = "#9ca3af";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        points.forEach((p, i) => {
          const px = toX(p.index), py = toY(p.actual);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }

      if (showSmoothed) {
        const smoothedPts = points.filter((p) => p.smoothed !== null);
        ctx.strokeStyle = "#058554";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        smoothedPts.forEach((p, i) => {
          const px = toX(p.index), py = toY(p.smoothed as number);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }

      if (showForecast && forecast.length > 0) {
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        const lastSmoothed = [...points].reverse().find((p) => p.smoothed !== null);
        if (lastSmoothed) ctx.moveTo(toX(lastSmoothed.index), toY(lastSmoothed.smoothed as number));
        forecast.forEach((f, i) => {
          const px = toX(points.length + i), py = toY(f.forecast);
          if (i === 0 && !lastSmoothed) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#2563eb";
        forecast.forEach((f, i) => {
          ctx.beginPath();
          ctx.arc(toX(points.length + i), toY(f.forecast), 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(dyMax.toFixed(1), padding.left - 6, padding.top + 8);
      ctx.fillText(dyMin.toFixed(1), padding.left - 6, padding.top + plotH);

      ctx.textAlign = "left";
      let legendX = padding.left;
      const legendItems: [boolean, string, string][] = [
        [showActual, "#9ca3af", "Actual"],
        [showSmoothed, "#058554", "Smoothed"],
        [showForecast, "#2563eb", "Forecast"],
      ];
      legendItems.forEach(([visible, color, label]) => {
        if (!visible) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(legendX, height - 8); ctx.lineTo(legendX + 16, height - 8); ctx.stroke();
        ctx.fillStyle = color;
        ctx.fillText(label, legendX + 20, height - 5);
        legendX += label.length * 6 + 36;
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [points, forecast, showActual, showSmoothed, showForecast, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Line chart of actual data, smoothed values, and forecast" />
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

export async function copyCanvasToClipboard(container: HTMLDivElement | null): Promise<boolean> {
  if (!container) return false;
  const canvas = container.querySelector("canvas");
  if (!canvas) return false;
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) { resolve(false); return; }
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        resolve(true);
      } catch {
        resolve(false);
      }
    });
  });
}

export function buildChartSVG(points: SmoothingPoint[], forecast: ForecastPoint[], showActual: boolean, showSmoothed: boolean, showForecast: boolean, width = 640, height = 320): string {
  const padding = { top: 16, right: 16, bottom: 30, left: 50 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const totalN = points.length + forecast.length;
  const allVals = [
    ...points.map((p) => p.actual),
    ...points.map((p) => p.smoothed).filter((v): v is number => v !== null),
    ...forecast.map((f) => f.forecast),
  ];
  const yMin = Math.min(...allVals);
  const yMax = Math.max(...allVals);
  const yPad = (yMax - yMin || 1) * 0.1;
  const dyMin = yMin - yPad, dyMax = yMax + yPad;
  const toX = (i: number) => padding.left + (totalN <= 1 ? 0 : (i / (totalN - 1)) * plotW);
  const toY = (v: number) => padding.top + plotH - ((v - dyMin) / (dyMax - dyMin || 1)) * plotH;

  const actualPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.index).toFixed(2)},${toY(p.actual).toFixed(2)}`).join(" ");
  const smoothedPts = points.filter((p) => p.smoothed !== null);
  const smoothedPath = smoothedPts.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.index).toFixed(2)},${toY(p.smoothed as number).toFixed(2)}`).join(" ");
  const forecastPath = forecast.map((f, i) => `${i === 0 ? "M" : "L"}${toX(points.length + i).toFixed(2)},${toY(f.forecast).toFixed(2)}`).join(" ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${showActual ? `<path d="${actualPath}" fill="none" stroke="#9ca3af" stroke-width="1.5" />` : ""}
  ${showSmoothed ? `<path d="${smoothedPath}" fill="none" stroke="#058554" stroke-width="2.5" />` : ""}
  ${showForecast ? `<path d="${forecastPath}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="5,4" />` : ""}
</svg>`;
}
