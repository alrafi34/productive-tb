"use client";

import { useEffect, useRef } from "react";
import type { MarginSensitivityRow } from "./logic";

interface Props {
  rows: MarginSensitivityRow[];
  currentMargin: number;
  height?: number;
}

export function SampleSizeSensitivityChart({ rows, currentMargin, height = 220 }: Props) {
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

      const padding = { top: 16, right: 16, bottom: 30, left: 60 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const maxVal = Math.max(...rows.map((r) => r.sampleSize), 1);
      const toX = (i: number) => padding.left + (rows.length <= 1 ? plotW / 2 : (i / (rows.length - 1)) * plotW);
      const toY = (v: number) => padding.top + plotH - (v / maxVal) * plotH;

      ctx.strokeStyle = "#f1f5f9";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const gy = padding.top + (i / 4) * plotH;
        ctx.beginPath(); ctx.moveTo(padding.left, gy); ctx.lineTo(padding.left + plotW, gy); ctx.stroke();
      }

      ctx.strokeStyle = "#058554";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      rows.forEach((r, i) => {
        const px = toX(i), py = toY(r.sampleSize);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();

      rows.forEach((r, i) => {
        const px = toX(i), py = toY(r.sampleSize);
        const isCurrent = r.marginOfError === currentMargin;
        ctx.beginPath();
        ctx.arc(px, py, isCurrent ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? "#2563eb" : "#058554";
        ctx.fill();

        ctx.fillStyle = "#6b7280";
        ctx.font = "10px -apple-system, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${r.marginOfError}%`, px, padding.top + plotH + 16);
      });

      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(maxVal.toLocaleString("en-US"), padding.left - 6, padding.top + 8);
      ctx.fillText("0", padding.left - 6, padding.top + plotH);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [rows, currentMargin, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Sample size sensitivity to margin of error" />
      <p className="text-center text-[11px] text-gray-400 mt-1">Margin of Error (%)</p>
    </div>
  );
}
