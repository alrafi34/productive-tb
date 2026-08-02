"use client";

import { useEffect, useRef } from "react";

interface Props {
  data: number[];
  color: string;
  height?: number;
}

export default function GrowthProjectionChart({ data, color, height = 220 }: Props) {
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

      const padding = { top: 16, right: 16, bottom: 24, left: 56 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const minV = Math.min(0, ...data);
      const maxV = Math.max(...data, 1);
      const range = maxV - minV || 1;

      const xFor = (i: number) => padding.left + (i / Math.max(1, data.length - 1)) * plotW;
      const yFor = (v: number) => padding.top + plotH - ((v - minV) / range) * plotH;

      ctx.strokeStyle = "#e5e7eb";
      ctx.fillStyle = "#9ca3af";
      ctx.font = "11px -apple-system, Arial, sans-serif";
      ctx.textAlign = "right";
      const gridLines = 4;
      for (let g = 0; g <= gridLines; g++) {
        const v = minV + (range * g) / gridLines;
        const y = yFor(v);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillText(formatShort(v), padding.left - 8, y + 3);
      }

      ctx.textAlign = "center";
      [0, Math.floor((data.length - 1) / 2), data.length - 1].forEach((idx) => {
        if (idx < 0 || idx >= data.length) return;
        ctx.fillText(`P${idx}`, xFor(idx), height - 6);
      });

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = xFor(i);
        const y = yFor(v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.fillStyle = color;
      data.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(xFor(i), yFor(v), 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [data, color, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="User growth projection chart" />
    </div>
  );
}

function formatShort(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(Math.round(n));
}
