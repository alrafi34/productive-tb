"use client";

import { useEffect, useRef } from "react";
import type { ChartType } from "./logic";

const ORGANIC_COLOR = "#058554";
const PAID_COLOR = "#60a5fa";

interface Props {
  type: ChartType;
  organicPct: number;
  paidPct: number;
  height?: number;
}

export default function RatioChart({ type, organicPct, paidPct, height = 240 }: Props) {
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

      if (type === "pie" || type === "doughnut") {
        drawCircular(ctx, width, height, organicPct, type === "doughnut");
      } else if (type === "hbar") {
        drawHorizontalBar(ctx, width, height, organicPct, paidPct);
      } else {
        drawVerticalBar(ctx, width, height, organicPct, paidPct);
      }
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [type, organicPct, paidPct, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label={`Organic ${organicPct.toFixed(1)}% vs Paid ${paidPct.toFixed(1)}% traffic chart`} />
    </div>
  );
}

function drawCircular(ctx: CanvasRenderingContext2D, width: number, height: number, organicPct: number, doughnut: boolean) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 12;
  const organicAngle = (organicPct / 100) * Math.PI * 2;
  const start = -Math.PI / 2;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, start, start + organicAngle);
  ctx.closePath();
  ctx.fillStyle = ORGANIC_COLOR;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, start + organicAngle, start + Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = PAID_COLOR;
  ctx.fill();

  if (doughnut) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.fillStyle = "#111827";
    ctx.font = "700 22px -apple-system, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${organicPct.toFixed(0)}%`, cx, cy - 2);
    ctx.font = "400 11px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText("Organic", cx, cy + 16);
  }
}

function drawHorizontalBar(ctx: CanvasRenderingContext2D, width: number, height: number, organicPct: number, paidPct: number) {
  const padding = { left: 70, right: 60, top: 24, bottom: 24 };
  const barW = width - padding.left - padding.right;
  const barH = 28;
  const gap = 24;
  const rows: [string, number, string][] = [["Organic", organicPct, ORGANIC_COLOR], ["Paid", paidPct, PAID_COLOR]];

  ctx.font = "12px -apple-system, Arial, sans-serif";
  rows.forEach(([label, pct, color], i) => {
    const y = padding.top + i * (barH + gap);
    ctx.fillStyle = "#374151";
    ctx.textAlign = "left";
    ctx.fillText(label, 0, y + barH / 2 + 4);

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(padding.left, y, barW, barH);

    ctx.fillStyle = color;
    ctx.fillRect(padding.left, y, (pct / 100) * barW, barH);

    ctx.fillStyle = "#111827";
    ctx.textAlign = "left";
    ctx.fillText(`${pct.toFixed(1)}%`, padding.left + barW + 8, y + barH / 2 + 4);
  });
}

function drawVerticalBar(ctx: CanvasRenderingContext2D, width: number, height: number, organicPct: number, paidPct: number) {
  const padding = { left: 32, right: 32, top: 16, bottom: 28 };
  const plotH = height - padding.top - padding.bottom;
  const barW = 64;
  const gap = 48;
  const totalW = barW * 2 + gap;
  const startX = (width - totalW) / 2;
  const cols: [string, number, string][] = [["Organic", organicPct, ORGANIC_COLOR], ["Paid", paidPct, PAID_COLOR]];

  ctx.font = "12px -apple-system, Arial, sans-serif";
  ctx.textAlign = "center";
  cols.forEach(([label, pct, color], i) => {
    const x = startX + i * (barW + gap);
    const barHeight = (pct / 100) * plotH;
    const y = padding.top + (plotH - barHeight);

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(x, padding.top, barW, plotH);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, barW, barHeight);

    ctx.fillStyle = "#111827";
    ctx.fillText(`${pct.toFixed(1)}%`, x + barW / 2, y - 8);
    ctx.fillStyle = "#6b7280";
    ctx.fillText(label, x + barW / 2, height - 8);
  });
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
