"use client";

import { useEffect, useRef } from "react";
import type { HistogramBin } from "./logic";

interface Props {
  bins: HistogramBin[];
  maxCount: number;
  height?: number;
}

export function HistogramBarChart({ bins, maxCount, height = 260 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || bins.length === 0) return;

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

      const padding = { top: 16, right: 16, bottom: 40, left: 36 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      ctx.strokeStyle = "#f1f5f9";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const gy = padding.top + (i / 4) * plotH;
        ctx.beginPath(); ctx.moveTo(padding.left, gy); ctx.lineTo(padding.left + plotW, gy); ctx.stroke();
      }

      const gap = 2;
      const barW = plotW / bins.length - gap;
      bins.forEach((b, i) => {
        const barH = (b.count / maxCount) * plotH;
        const x = padding.left + i * (plotW / bins.length);
        const y = padding.top + plotH - barH;
        ctx.fillStyle = "#058554";
        ctx.fillRect(x, y, barW, barH);

        if (b.count > 0) {
          ctx.fillStyle = "#374151";
          ctx.font = "10px -apple-system, Arial, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(String(b.count), x + barW / 2, y - 4);
        }

        if (bins.length <= 20) {
          ctx.fillStyle = "#9ca3af";
          ctx.font = "9px -apple-system, Arial, sans-serif";
          ctx.textAlign = "center";
          ctx.save();
          ctx.translate(x + barW / 2, padding.top + plotH + 12);
          ctx.rotate(bins.length > 10 ? -Math.PI / 4 : 0);
          ctx.textAlign = bins.length > 10 ? "right" : "center";
          ctx.fillText(b.min.toFixed(1), 0, 0);
          ctx.restore();
        }
      });

      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(String(maxCount), padding.left - 6, padding.top + 8);
      ctx.fillText("0", padding.left - 6, padding.top + plotH);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [bins, maxCount, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Histogram bar chart showing frequency distribution" />
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
