"use client";

import { useEffect, useRef } from "react";

interface Props {
  originalMs: number;
  optimizedMs: number;
  height?: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function BeforeAfterBarChart({ originalMs, optimizedMs, height = 140 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let raf = 0;
    const start = performance.now();
    const DURATION = 600;

    const draw = (progress: number) => {
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

      const maxVal = Math.max(originalMs, optimizedMs, 1);
      const barHeight = 28;
      const gap = 48;
      const labelWidth = 90;
      const plotWidth = width - labelWidth - 70;

      const bars: [string, number, string][] = [
        ["Before", originalMs, "#9ca3af"],
        ["After", optimizedMs, "#058554"],
      ];

      bars.forEach(([label, value, color], i) => {
        const y = 16 + i * gap;
        const targetWidth = (value / maxVal) * plotWidth;
        const w = targetWidth * progress;

        ctx.fillStyle = "#374151";
        ctx.font = "600 12px -apple-system, Arial, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(label, 0, y + barHeight / 2);

        ctx.fillStyle = "#f3f4f6";
        ctx.beginPath();
        ctx.roundRect(labelWidth, y, plotWidth, barHeight, 6);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(labelWidth, y, Math.max(2, w), barHeight, 6);
        ctx.fill();

        ctx.fillStyle = "#111827";
        ctx.font = "700 12px -apple-system, Arial, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`${(value * progress).toLocaleString("en-US", { maximumFractionDigits: 0 })} ms`, labelWidth + plotWidth + 8, y + barHeight / 2);
      });
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / DURATION);
      draw(easeOutCubic(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(() => draw(1));
    ro.observe(container);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [originalMs, optimizedMs, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label={`Before ${originalMs} milliseconds, after ${optimizedMs} milliseconds`} />
    </div>
  );
}
