"use client";

import { useEffect, useRef } from "react";
import type { DistributionRow } from "./logic";

interface DistributionChartProps {
  rows: DistributionRow[];
  height?: number;
}

export function DistributionBarChart({ rows, height = 200 }: DistributionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || rows.length === 0) return;

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

      const padding = { top: 16, right: 12, bottom: 24, left: 12 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const max = Math.max(...rows.map((r) => r.records)) * 1.1;

      const n = rows.length;
      const barGap = Math.max(1, plotW * 0.15 / n);
      const barW = Math.max(1, (plotW - barGap * (n + 1)) / n);

      rows.forEach((r, i) => {
        const x = padding.left + barGap + i * (barW + barGap);
        const h = max > 0 ? (r.records / max) * plotH : 0;
        const y = padding.top + plotH - h;
        ctx.fillStyle = "#058554";
        ctx.fillRect(x, y, barW, Math.max(1, h));
      });

      ctx.fillStyle = "#6b7280";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Partitions 1–${n}`, width / 2, height - 8);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [rows, height]);

  if (rows.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Bar chart showing records distributed across partitions" />
    </div>
  );
}

interface SizeGaugeProps {
  partitionBytes: number;
  height?: number;
}

const MIN_RECOMMENDED = 10 * 1024 ** 2; // 10 MB
const MAX_RECOMMENDED = 1024 ** 3; // 1 GB
const SCALE_MAX = 4 * 1024 ** 3; // 4 GB visual cap

export function PartitionSizeGauge({ partitionBytes, height = 56 }: SizeGaugeProps) {
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

      const barY = 14, barH = 14;
      const toX = (bytes: number) => Math.min(width, (Math.log(bytes + 1) / Math.log(SCALE_MAX)) * width);

      ctx.fillStyle = "#fee2e2";
      ctx.fillRect(0, barY, width, barH);
      const recX = toX(MIN_RECOMMENDED);
      const recW = toX(MAX_RECOMMENDED) - recX;
      ctx.fillStyle = "#d1fae5";
      ctx.fillRect(recX, barY, recW, barH);

      const markerX = Math.max(2, Math.min(width - 2, toX(partitionBytes)));
      ctx.fillStyle = "#058554";
      ctx.beginPath();
      ctx.moveTo(markerX, barY - 6);
      ctx.lineTo(markerX - 5, barY - 1);
      ctx.lineTo(markerX + 5, barY - 1);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#058554";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(markerX, barY);
      ctx.lineTo(markerX, barY + barH);
      ctx.stroke();

      ctx.fillStyle = "#9ca3af";
      ctx.font = "9px -apple-system, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Small", 0, barY + barH + 12);
      ctx.textAlign = "right";
      ctx.fillText("Large", width, barY + barH + 12);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [partitionBytes, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Partition size gauge relative to the recommended 10 MB to 1 GB range" />
    </div>
  );
}
