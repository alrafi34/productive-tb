"use client";

import { useEffect, useRef } from "react";

interface Props {
  sorted: number[];
  targetValue: number;
  targetPercentile: number;
  q1: number;
  q3: number;
  height?: number;
}

export function PercentileChart({ sorted, targetValue, targetPercentile, q1, q3, height = 140 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || sorted.length === 0) return;

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
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const range = max - min || 1;
      const toX = (v: number) => padding.left + ((v - min) / range) * plotW;
      const midY = height / 2;

      // IQR band
      ctx.fillStyle = "rgba(5, 133, 84, 0.1)";
      ctx.fillRect(toX(q1), midY - 14, Math.max(1, toX(q3) - toX(q1)), 28);

      // Axis line
      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padding.left, midY);
      ctx.lineTo(padding.left + plotW, midY);
      ctx.stroke();

      // Data points
      ctx.fillStyle = "#9ca3af";
      sorted.forEach((v) => {
        ctx.beginPath();
        ctx.arc(toX(v), midY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Target marker
      const tx = toX(targetValue);
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tx, midY - 24);
      ctx.lineTo(tx, midY + 24);
      ctx.stroke();
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(tx, midY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "600 11px -apple-system, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`P${targetPercentile} = ${targetValue.toFixed(1)}`, tx, midY - 30);

      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#9ca3af";
      ctx.textAlign = "left";
      ctx.fillText(min.toFixed(1), padding.left, height - 8);
      ctx.textAlign = "right";
      ctx.fillText(max.toFixed(1), padding.left + plotW, height - 8);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [sorted, targetValue, targetPercentile, q1, q3, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label={`Dataset distribution with P${targetPercentile} marked at ${targetValue}`} />
    </div>
  );
}
