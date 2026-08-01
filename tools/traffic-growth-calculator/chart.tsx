"use client";

import { useEffect, useRef } from "react";

export interface ChartSeries {
  label: string;
  color: string;
  data: number[];
}

interface Props {
  series: ChartSeries[];
  months: number[];
  height?: number;
}

export default function GrowthChart({ series, months, height = 220 }: Props) {
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

      const allValues = series.flatMap((s) => s.data);
      const minV = Math.min(0, ...allValues);
      const maxV = Math.max(...allValues, 1);
      const range = maxV - minV || 1;

      const xFor = (i: number) => padding.left + (i / Math.max(1, months.length - 1)) * plotW;
      const yFor = (v: number) => padding.top + plotH - ((v - minV) / range) * plotH;

      // Gridlines + Y labels
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

      // X labels (first, middle, last)
      ctx.textAlign = "center";
      [0, Math.floor((months.length - 1) / 2), months.length - 1].forEach((idx) => {
        if (idx < 0 || idx >= months.length) return;
        ctx.fillText(`M${months[idx]}`, xFor(idx), height - 6);
      });

      // Lines
      series.forEach((s) => {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        s.data.forEach((v, i) => {
          const x = xFor(i);
          const y = yFor(v);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Dots (only if not too dense)
        if (s.data.length <= 24) {
          ctx.fillStyle = s.color;
          s.data.forEach((v, i) => {
            ctx.beginPath();
            ctx.arc(xFor(i), yFor(v), 2.5, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [series, months, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Traffic growth projection chart" />
    </div>
  );
}

function formatShort(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(Math.round(n));
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
