"use client";

import { useEffect, useRef } from "react";

// ── ROI Gauge (SVG, centered at 50 = break-even) ──────────────────────────────

interface GaugeProps {
  performanceScore: number; // 0-100
  roi: number;
  color: string;
  size?: number;
}

export function ROIGauge({ performanceScore, roi, color, size = 176 }: GaugeProps) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, performanceScore));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" role="img" aria-label={`ROI gauge: ${roi}% return on investment`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s ease, stroke 0.7s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-mono tabular-nums transition-all duration-300" style={{ color }}>
          {roi >= 0 ? "+" : ""}{roi}%
        </span>
        <span className="text-xs text-gray-500 font-medium mt-0.5">ROI</span>
      </div>
    </div>
  );
}

// ── Canvas bar chart: Cost vs Revenue vs Profit ───────────────────────────────

interface BarChartProps {
  cost: number;
  revenue: number;
  profit: number;
  symbol: string;
  height?: number;
}

export function ROIBarChart({ cost, revenue, profit, symbol, height = 220 }: BarChartProps) {
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

      const padding = { top: 20, right: 20, bottom: 30, left: 20 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const bars = [
        { label: "Cost", value: cost, color: "#9ca3af" },
        { label: "Revenue", value: revenue, color: "#2563eb" },
        { label: "Profit", value: profit, color: profit >= 0 ? "#058554" : "#dc2626" },
      ];
      const maxV = Math.max(cost, revenue, Math.abs(profit), 1);
      const minV = Math.min(0, profit);
      const range = maxV - minV || 1;
      const zeroY = padding.top + plotH - ((0 - minV) / range) * plotH;

      const barWidth = plotW / bars.length * 0.5;
      const gap = plotW / bars.length;

      ctx.font = "11px -apple-system, Arial, sans-serif";
      ctx.textAlign = "center";

      // zero line
      ctx.strokeStyle = "#e5e7eb";
      ctx.beginPath();
      ctx.moveTo(padding.left, zeroY);
      ctx.lineTo(width - padding.right, zeroY);
      ctx.stroke();

      bars.forEach((b, i) => {
        const cx = padding.left + gap * i + gap / 2;
        const barH = (Math.abs(b.value) / range) * plotH;
        const y = b.value >= 0 ? zeroY - barH : zeroY;

        ctx.fillStyle = b.color;
        const x = cx - barWidth / 2;
        const r = 6;
        ctx.beginPath();
        if (b.value >= 0) {
          ctx.moveTo(x, y + r);
          ctx.arcTo(x, y, x + r, y, r);
          ctx.arcTo(x + barWidth, y, x + barWidth, y + r, r);
          ctx.lineTo(x + barWidth, y + barH);
          ctx.lineTo(x, y + barH);
          ctx.closePath();
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(x + barWidth, y);
          ctx.lineTo(x + barWidth, y + barH - r);
          ctx.arcTo(x + barWidth, y + barH, x + barWidth - r, y + barH, r);
          ctx.arcTo(x, y + barH, x, y + barH - r, r);
          ctx.closePath();
        }
        ctx.fill();

        // value label
        ctx.fillStyle = "#374151";
        ctx.font = "bold 12px -apple-system, Arial, sans-serif";
        const labelY = b.value >= 0 ? y - 8 : y + barH + 16;
        ctx.fillText(`${symbol}${formatShort(b.value)}`, cx, labelY);

        // x label
        ctx.fillStyle = "#9ca3af";
        ctx.font = "11px -apple-system, Arial, sans-serif";
        ctx.fillText(b.label, cx, height - 8);
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [cost, revenue, profit, symbol, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Bar chart comparing marketing cost, revenue, and net profit" />
    </div>
  );
}

function formatShort(n: number): string {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}K`;
  return `${sign}${abs.toFixed(0)}`;
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
