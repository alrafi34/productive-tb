"use client";

import { useEffect, useRef } from "react";
import type { FitPoint, ForecastPoint } from "./logic";

interface ForecastChartProps {
  points: FitPoint[];
  forecast: ForecastPoint[];
  rmse: number;
  showActual: boolean;
  showFitted: boolean;
  showForecast: boolean;
  showConfidence: boolean;
  height?: number;
}

export function ForecastChart({ points, forecast, rmse, showActual, showFitted, showForecast, showConfidence, height = 320 }: ForecastChartProps) {
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

      const padding = { top: 16, right: 16, bottom: 30, left: 54 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const totalN = points.length + forecast.length;
      const band = showConfidence ? rmse * 1.28 : 0;
      const allVals = [
        ...points.map((p) => p.actual),
        ...points.map((p) => p.fitted).filter((v): v is number => v !== null),
        ...forecast.map((f) => f.value + band),
        ...forecast.map((f) => f.value - band),
      ];
      const yMin = Math.min(...allVals);
      const yMax = Math.max(...allVals);
      const yPad = (yMax - yMin || 1) * 0.1;
      const dyMin = yMin - yPad;
      const dyMax = yMax + yPad;

      const toX = (i: number) => padding.left + (totalN <= 1 ? 0 : (i / (totalN - 1)) * plotW);
      const toY = (v: number) => padding.top + plotH - ((v - dyMin) / (dyMax - dyMin || 1)) * plotH;

      ctx.strokeStyle = "#f1f5f9";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const gy = padding.top + (i / 4) * plotH;
        ctx.beginPath(); ctx.moveTo(padding.left, gy); ctx.lineTo(padding.left + plotW, gy); ctx.stroke();
      }

      if (showConfidence && forecast.length > 0 && band > 0) {
        const lastFitted = [...points].reverse().find((p) => p.fitted !== null);
        const startIdx = points.length - 1;
        const startVal = lastFitted ? (lastFitted.fitted as number) : forecast[0].value;
        ctx.beginPath();
        ctx.moveTo(toX(startIdx), toY(startVal));
        forecast.forEach((f, i) => ctx.lineTo(toX(points.length + i), toY(f.value + band)));
        for (let i = forecast.length - 1; i >= 0; i--) ctx.lineTo(toX(points.length + i), toY(forecast[i].value - band));
        ctx.lineTo(toX(startIdx), toY(startVal));
        ctx.closePath();
        ctx.fillStyle = "rgba(37, 99, 235, 0.08)";
        ctx.fill();
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

      if (showFitted) {
        const fittedPts = points.filter((p) => p.fitted !== null);
        ctx.strokeStyle = "#058554";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        fittedPts.forEach((p, i) => {
          const px = toX(p.index), py = toY(p.fitted as number);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }

      if (showForecast && forecast.length > 0) {
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        const lastFitted = [...points].reverse().find((p) => p.fitted !== null);
        if (lastFitted) ctx.moveTo(toX(lastFitted.index), toY(lastFitted.fitted as number));
        forecast.forEach((f, i) => {
          const px = toX(points.length + i), py = toY(f.value);
          if (i === 0 && !lastFitted) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#2563eb";
        forecast.forEach((f, i) => {
          ctx.beginPath();
          ctx.arc(toX(points.length + i), toY(f.value), 3, 0, Math.PI * 2);
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
        [showFitted, "#058554", "Fitted"],
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
  }, [points, forecast, rmse, showActual, showFitted, showForecast, showConfidence, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Line chart of actual data, fitted values, and forecast" />
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
