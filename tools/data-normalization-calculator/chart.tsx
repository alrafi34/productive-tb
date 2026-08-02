"use client";

import { useEffect, useRef } from "react";

interface BeforeAfterProps {
  original: number[];
  normalized: number[];
  height?: number;
}

export function BeforeAfterChart({ original, normalized, height = 180 }: BeforeAfterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || original.length === 0) return;

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

      const padding = { left: 20, right: 20 };
      const plotW = width - padding.left - padding.right;
      const topY = height * 0.3;
      const bottomY = height * 0.72;

      const origMin = Math.min(...original), origMax = Math.max(...original);
      const origRange = origMax - origMin || 1;
      const normMin = Math.min(...normalized), normMax = Math.max(...normalized);
      const normRange = normMax - normMin || 1;

      const toXOrig = (v: number) => padding.left + ((v - origMin) / origRange) * plotW;
      const toXNorm = (v: number) => padding.left + ((v - normMin) / normRange) * plotW;

      // baselines
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(padding.left, topY); ctx.lineTo(width - padding.right, topY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padding.left, bottomY); ctx.lineTo(width - padding.right, bottomY); ctx.stroke();

      // connecting lines (only if dataset is small enough to stay readable)
      if (original.length <= 80) {
        ctx.strokeStyle = "rgba(5, 133, 84, 0.15)";
        ctx.lineWidth = 1;
        original.forEach((v, i) => {
          ctx.beginPath();
          ctx.moveTo(toXOrig(v), topY);
          ctx.lineTo(toXNorm(normalized[i]), bottomY);
          ctx.stroke();
        });
      }

      // dots
      original.forEach((v) => {
        ctx.fillStyle = "#6b7280";
        ctx.beginPath(); ctx.arc(toXOrig(v), topY, 3.5, 0, Math.PI * 2); ctx.fill();
      });
      normalized.forEach((v) => {
        ctx.fillStyle = "#058554";
        ctx.beginPath(); ctx.arc(toXNorm(v), bottomY, 3.5, 0, Math.PI * 2); ctx.fill();
      });

      // labels
      ctx.font = "11px -apple-system, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillStyle = "#6b7280";
      ctx.fillText("Original", padding.left, topY - 12);
      ctx.fillStyle = "#058554";
      ctx.fillText("Normalized", padding.left, bottomY + 22);

      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#9ca3af";
      ctx.textAlign = "left";
      ctx.fillText(origMin.toFixed(2), padding.left, topY + 16);
      ctx.textAlign = "right";
      ctx.fillText(origMax.toFixed(2), width - padding.right, topY + 16);
      ctx.textAlign = "left";
      ctx.fillText(normMin.toFixed(2), padding.left, bottomY - 10);
      ctx.textAlign = "right";
      ctx.fillText(normMax.toFixed(2), width - padding.right, bottomY - 10);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [original, normalized, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Before and after comparison of original and normalized values" />
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
