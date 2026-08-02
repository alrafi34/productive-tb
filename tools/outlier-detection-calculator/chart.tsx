"use client";

import { useEffect, useRef } from "react";
import type { ScoredPoint } from "./logic";

interface Props {
  points: ScoredPoint[];
  lowerBound: number | null;
  upperBound: number | null;
  height?: number;
}

export function OutlierChart({ points, lowerBound, upperBound, height = 160 }: Props) {
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

      const padding = { left: 24, right: 24 };
      const plotW = width - padding.left - padding.right;

      const allVals = points.map((p) => p.value);
      const boundVals = [lowerBound, upperBound].filter((v): v is number => v !== null);
      let min = Math.min(...allVals, ...boundVals);
      let max = Math.max(...allVals, ...boundVals);
      const pad = (max - min || 1) * 0.08;
      min -= pad; max += pad;
      const range = max - min || 1;
      const toX = (v: number) => padding.left + ((v - min) / range) * plotW;
      const midY = height / 2;

      // Normal / bound zone shading
      if (lowerBound !== null && upperBound !== null) {
        ctx.fillStyle = "rgba(5, 133, 84, 0.08)";
        ctx.fillRect(toX(lowerBound), midY - 20, Math.max(1, toX(upperBound) - toX(lowerBound)), 40);
        ctx.strokeStyle = "#058554";
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        [lowerBound, upperBound].forEach((b) => {
          ctx.beginPath();
          ctx.moveTo(toX(b), midY - 30);
          ctx.lineTo(toX(b), midY + 30);
          ctx.stroke();
        });
        ctx.setLineDash([]);
      }

      // Axis line
      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padding.left, midY);
      ctx.lineTo(padding.left + plotW, midY);
      ctx.stroke();

      // Points
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(toX(p.value), midY, p.isOutlier ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = p.isOutlier ? "#dc2626" : "#9ca3af";
        ctx.fill();
      });

      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#9ca3af";
      ctx.textAlign = "left";
      ctx.fillText(min.toFixed(1), padding.left, height - 8);
      ctx.textAlign = "right";
      ctx.fillText(max.toFixed(1), padding.left + plotW, height - 8);

      ctx.textAlign = "left";
      ctx.fillStyle = "#dc2626";
      ctx.fillText("● Outlier", padding.left, 16);
      ctx.fillStyle = "#9ca3af";
      ctx.fillText("● Normal", padding.left + 70, 16);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [points, lowerBound, upperBound, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Dot plot showing dataset values with outliers highlighted in red" />
    </div>
  );
}

// ── Box Plot ──

interface BoxPlotProps {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers: ScoredPoint[];
  height?: number;
}

export function OutlierBoxPlot({ min, q1, median, q3, max, outliers, height = 140 }: BoxPlotProps) {
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
      const outlierVals = outliers.map((o) => o.value);
      const domainMin = Math.min(min, ...outlierVals);
      const domainMax = Math.max(max, ...outlierVals);
      const range = domainMax - domainMin || 1;
      const toX = (v: number) => padding.left + ((v - domainMin) / range) * plotW;
      const midY = height / 2;
      const boxH = 44;

      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(toX(min), midY);
      ctx.lineTo(toX(q1), midY);
      ctx.moveTo(toX(q3), midY);
      ctx.lineTo(toX(max), midY);
      ctx.stroke();

      [min, max].forEach((v) => {
        ctx.beginPath();
        ctx.moveTo(toX(v), midY - 10);
        ctx.lineTo(toX(v), midY + 10);
        ctx.stroke();
      });

      ctx.fillStyle = "rgba(5, 133, 84, 0.12)";
      ctx.strokeStyle = "#058554";
      ctx.lineWidth = 2;
      const boxX = toX(q1);
      const boxW = Math.max(1, toX(q3) - toX(q1));
      ctx.fillRect(boxX, midY - boxH / 2, boxW, boxH);
      ctx.strokeRect(boxX, midY - boxH / 2, boxW, boxH);

      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(toX(median), midY - boxH / 2);
      ctx.lineTo(toX(median), midY + boxH / 2);
      ctx.stroke();

      outliers.forEach((o) => {
        ctx.beginPath();
        ctx.arc(toX(o.value), midY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#dc2626";
        ctx.fill();
      });

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
  }, [min, q1, median, q3, max, outliers, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Box plot showing quartiles and outliers" />
    </div>
  );
}

// ── Histogram ──

export function OutlierHistogram({ points, height = 200 }: { points: ScoredPoint[]; height?: number }) {
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

      const values = points.map((p) => p.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;
      const binCount = Math.max(1, Math.ceil(Math.sqrt(values.length)));

      const bins = Array.from({ length: binCount }, () => ({ count: 0, hasOutlier: false }));
      points.forEach((p) => {
        let idx = Math.floor(((p.value - min) / range) * binCount);
        if (idx >= binCount) idx = binCount - 1;
        if (idx < 0) idx = 0;
        bins[idx].count++;
        if (p.isOutlier) bins[idx].hasOutlier = true;
      });

      const padding = { top: 16, right: 16, bottom: 24, left: 30 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const maxCount = Math.max(...bins.map((b) => b.count), 1);
      const gap = 2;
      const barW = plotW / binCount - gap;

      bins.forEach((b, i) => {
        const barH = (b.count / maxCount) * plotH;
        const x = padding.left + i * (plotW / binCount);
        const y = padding.top + plotH - barH;
        ctx.fillStyle = b.hasOutlier ? "#dc2626" : "#058554";
        ctx.fillRect(x, y, barW, barH);
      });

      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding.left, padding.top + plotH);
      ctx.lineTo(padding.left + plotW, padding.top + plotH);
      ctx.stroke();

      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#9ca3af";
      ctx.textAlign = "left";
      ctx.fillText(min.toFixed(1), padding.left, height - 8);
      ctx.textAlign = "right";
      ctx.fillText(max.toFixed(1), padding.left + plotW, height - 8);
      ctx.textAlign = "left";
      ctx.fillText(String(maxCount), 0, padding.top + 8);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [points, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Histogram of dataset with bins containing outliers highlighted in red" />
    </div>
  );
}
