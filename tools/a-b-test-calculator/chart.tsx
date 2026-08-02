"use client";

import { useEffect, useRef } from "react";

interface ConversionBarChartProps {
  crA: number | null; // 0–1
  crB: number | null;
  ciLower: number | null; // of the difference
  ciUpper: number | null;
  height?: number;
}

export function ConversionBarChart({ crA, crB, height = 200 }: ConversionBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || crA === null || crB === null) return;

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
      const maxRate = Math.max(crA, crB, 0.0001) * 1.25;

      const barGap = plotW * 0.15;
      const barW = (plotW - barGap * 3) / 2;
      const x1 = padding.left + barGap;
      const x2 = padding.left + barGap * 2 + barW;

      const toY = (v: number) => padding.top + plotH - (v / maxRate) * plotH;

      [["A", crA, x1, "#60a5fa"], ["B", crB, x2, "#058554"]].forEach(([label, rate, x, color]) => {
        const rateNum = rate as number;
        const xNum = x as number;
        const y = toY(rateNum);
        const h = padding.top + plotH - y;
        ctx.fillStyle = color as string;
        ctx.fillRect(xNum, y, barW, h);

        ctx.fillStyle = "#111827";
        ctx.font = "600 12px -apple-system, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${(rateNum * 100).toFixed(2)}%`, xNum + barW / 2, y - 8);

        ctx.fillStyle = "#6b7280";
        ctx.font = "11px -apple-system, Arial, sans-serif";
        ctx.fillText(`Variant ${label}`, xNum + barW / 2, height - 10);
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [crA, crB, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Bar chart comparing conversion rates of Variant A and Variant B" />
    </div>
  );
}
