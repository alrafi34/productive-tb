"use client";

import { useEffect, useRef } from "react";
import type { Prediction, OutlierInfo } from "./logic";

interface ScatterPlotProps {
  predictions: Prediction[];
  slope: number;
  intercept: number;
  outliers: OutlierInfo[];
  height?: number;
}

export function RegressionScatterPlot({ predictions, slope, intercept, outliers, height = 320 }: ScatterPlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || predictions.length === 0) return;

    const outlierSet = new Set(outliers.map((o) => o.index));
    const x = predictions.map((p) => p.x);
    const y = predictions.map((p) => p.actual);

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

      const padding = { top: 16, right: 20, bottom: 34, left: 46 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const xMin = Math.min(...x), xMax = Math.max(...x);
      const yMin = Math.min(...y), yMax = Math.max(...y);
      const xPad = (xMax - xMin || 1) * 0.08;
      const yPad = (yMax - yMin || 1) * 0.08;
      const dxMin = xMin - xPad, dxMax = xMax + xPad;
      const dyMin = yMin - yPad, dyMax = yMax + yPad;

      const toX = (v: number) => padding.left + ((v - dxMin) / (dxMax - dxMin || 1)) * plotW;
      const toY = (v: number) => padding.top + plotH - ((v - dyMin) / (dyMax - dyMin || 1)) * plotH;

      ctx.strokeStyle = "#f1f5f9";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const gy = padding.top + (i / 4) * plotH;
        ctx.beginPath(); ctx.moveTo(padding.left, gy); ctx.lineTo(padding.left + plotW, gy); ctx.stroke();
        const gx = padding.left + (i / 4) * plotW;
        ctx.beginPath(); ctx.moveTo(gx, padding.top); ctx.lineTo(gx, padding.top + plotH); ctx.stroke();
      }

      if (isFinite(slope) && isFinite(intercept)) {
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(toX(dxMin), toY(intercept + slope * dxMin));
        ctx.lineTo(toX(dxMax), toY(intercept + slope * dxMax));
        ctx.stroke();
      }

      x.forEach((xi, i) => {
        const yi = y[i];
        const isOutlier = outlierSet.has(i);
        ctx.beginPath();
        ctx.arc(toX(xi), toY(yi), isOutlier ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isOutlier ? "#dc2626" : "#058554";
        ctx.globalAlpha = isOutlier ? 0.9 : 0.75;
        ctx.fill();
        if (isOutlier) {
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "#dc2626";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(dxMin.toFixed(1), padding.left, height - 10);
      ctx.textAlign = "right";
      ctx.fillText(dxMax.toFixed(1), width - padding.right, height - 10);
      ctx.save();
      ctx.translate(12, padding.top + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText("Y", 0, 0);
      ctx.restore();
      ctx.textAlign = "center";
      ctx.fillText("X", padding.left + plotW / 2, height - 2);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [predictions, slope, intercept, outliers, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Scatter plot of X and Y with regression trend line; outliers highlighted in red" />
    </div>
  );
}

interface ResidualPlotProps {
  predictions: Prediction[];
  outliers: OutlierInfo[];
  height?: number;
}

export function ResidualPlot({ predictions, outliers, height = 260 }: ResidualPlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || predictions.length === 0) return;

    const outlierSet = new Set(outliers.map((o) => o.index));

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

      const padding = { top: 16, right: 20, bottom: 34, left: 46 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const x = predictions.map((p) => p.x);
      const residuals = predictions.map((p) => p.residual);
      const xMin = Math.min(...x), xMax = Math.max(...x);
      const absMax = Math.max(...residuals.map((r) => Math.abs(r)), 1) * 1.15;

      const toX = (v: number) => padding.left + ((v - xMin) / (xMax - xMin || 1)) * plotW;
      const toY = (v: number) => padding.top + plotH / 2 - (v / absMax) * (plotH / 2);

      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padding.left, toY(0));
      ctx.lineTo(padding.left + plotW, toY(0));
      ctx.stroke();

      x.forEach((xi, i) => {
        const isOutlier = outlierSet.has(i);
        const ry = residuals[i];
        ctx.beginPath();
        ctx.moveTo(toX(xi), toY(0));
        ctx.lineTo(toX(xi), toY(ry));
        ctx.strokeStyle = isOutlier ? "#dc2626" : "#d1d5db";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(toX(xi), toY(ry), isOutlier ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isOutlier ? "#dc2626" : "#2563eb";
        ctx.globalAlpha = isOutlier ? 0.9 : 0.75;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(xMin.toFixed(1), padding.left, height - 10);
      ctx.textAlign = "right";
      ctx.fillText(xMax.toFixed(1), width - padding.right, height - 10);
      ctx.textAlign = "center";
      ctx.fillText("Residual = 0", padding.left + plotW / 2, toY(0) - 6);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [predictions, outliers, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Residual plot showing the difference between actual and predicted Y values for each X" />
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

export function buildScatterSVG(predictions: Prediction[], slope: number, intercept: number, outliers: OutlierInfo[], width = 640, height = 360): string {
  const outlierSet = new Set(outliers.map((o) => o.index));
  const padding = { top: 16, right: 20, bottom: 34, left: 46 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const x = predictions.map((p) => p.x);
  const y = predictions.map((p) => p.actual);
  const xMin = Math.min(...x), xMax = Math.max(...x);
  const yMin = Math.min(...y), yMax = Math.max(...y);
  const xPad = (xMax - xMin || 1) * 0.08;
  const yPad = (yMax - yMin || 1) * 0.08;
  const dxMin = xMin - xPad, dxMax = xMax + xPad;
  const dyMin = yMin - yPad, dyMax = yMax + yPad;
  const toX = (v: number) => padding.left + ((v - dxMin) / (dxMax - dxMin || 1)) * plotW;
  const toY = (v: number) => padding.top + plotH - ((v - dyMin) / (dyMax - dyMin || 1)) * plotH;

  const points = x.map((xi, i) => {
    const isOutlier = outlierSet.has(i);
    return `<circle cx="${toX(xi).toFixed(2)}" cy="${toY(y[i]).toFixed(2)}" r="${isOutlier ? 5 : 3.5}" fill="${isOutlier ? "#dc2626" : "#058554"}" fill-opacity="${isOutlier ? 0.9 : 0.75}" ${isOutlier ? 'stroke="#dc2626" stroke-width="1.5"' : ""} />`;
  }).join("");

  const lineX1 = toX(dxMin), lineY1 = toY(intercept + slope * dxMin);
  const lineX2 = toX(dxMax), lineY2 = toY(intercept + slope * dxMax);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  <line x1="${lineX1.toFixed(2)}" y1="${lineY1.toFixed(2)}" x2="${lineX2.toFixed(2)}" y2="${lineY2.toFixed(2)}" stroke="#2563eb" stroke-width="2" />
  ${points}
</svg>`;
}
