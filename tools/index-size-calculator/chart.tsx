"use client";

import { useEffect, useRef } from "react";
import { formatBytes } from "./logic";

interface Segment { label: string; value: number; color: string }

interface BreakdownPieProps {
  compressedSize: number;
  fillFactorImpact: number;
  overheadImpact: number;
  size?: number;
}

export function BreakdownPieChart({ compressedSize, fillFactorImpact, overheadImpact, size = 160 }: BreakdownPieProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const segments: Segment[] = [
    { label: "Compressed Data", value: Math.max(0, compressedSize), color: "#058554" },
    { label: "Fill Factor Impact", value: Math.max(0, fillFactorImpact), color: "#2563EB" },
    { label: "Overhead", value: Math.max(0, overheadImpact), color: "#D97706" },
  ].filter((s) => s.value > 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const total = segments.reduce((s, seg) => s + seg.value, 0);
    if (total <= 0) return;

    const cx = size / 2, cy = size / 2, r = size / 2 - 4;
    let angle = -Math.PI / 2;
    segments.forEach((seg) => {
      const slice = (seg.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      angle += slice;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }, [segments, size]);

  if (segments.length === 0) return null;

  return (
    <div className="flex items-center gap-4">
      <canvas ref={canvasRef} role="img" aria-label="Pie chart of index storage breakdown" />
      <div className="space-y-1.5 text-xs">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-gray-600">{s.label}: <span className="font-mono text-gray-800">{formatBytes(s.value)}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ComparisonBarProps {
  labelA: string;
  sizeA: number;
  labelB: string;
  sizeB: number;
  height?: number;
}

export function ComparisonBarChart({ labelA, sizeA, labelB, sizeB, height = 140 }: ComparisonBarProps) {
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

      const padding = { top: 24, right: 24, bottom: 32, left: 24 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const max = Math.max(sizeA, sizeB, 1) * 1.2;

      const barGap = plotW * 0.15;
      const barW = (plotW - barGap * 3) / 2;
      const x1 = padding.left + barGap;
      const x2 = padding.left + barGap * 2 + barW;

      const toY = (v: number) => padding.top + plotH - (v / max) * plotH;

      [[labelA, sizeA, x1, "#2563EB"], [labelB, sizeB, x2, "#058554"]].forEach(([label, val, x, color]) => {
        const v = val as number, xn = x as number;
        const y = toY(v);
        const h = padding.top + plotH - y;
        ctx.fillStyle = color as string;
        ctx.fillRect(xn, y, barW, h);

        ctx.fillStyle = "#111827";
        ctx.font = "600 11px -apple-system, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(formatBytes(v), xn + barW / 2, y - 8);

        ctx.fillStyle = "#6b7280";
        ctx.font = "10px -apple-system, Arial, sans-serif";
        ctx.fillText(String(label), xn + barW / 2, height - 10);
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [labelA, sizeA, labelB, sizeB, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label={`Bar chart comparing ${labelA} and ${labelB} estimated index sizes`} />
    </div>
  );
}
