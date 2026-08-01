"use client";

import { useEffect, useRef } from "react";

interface Props {
  curve: number[]; // 100 values, index 0 = position 1
  range: number; // how many positions to render (e.g. 20 or 100)
  currentPosition: number;
  targetPosition: number | null;
  height?: number;
}

export default function CTRCurveChart({ curve, range, currentPosition, targetPosition, height = 240 }: Props) {
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

      const padding = { top: 16, right: 16, bottom: 26, left: 48 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const data = curve.slice(0, range);
      const maxV = Math.max(...data, 1);
      const minV = 0;
      const rangeV = maxV - minV || 1;

      const xFor = (i: number) => padding.left + (i / Math.max(1, data.length - 1)) * plotW;
      const yFor = (v: number) => padding.top + plotH - ((v - minV) / rangeV) * plotH;

      // Gridlines + Y labels
      ctx.strokeStyle = "#e5e7eb";
      ctx.fillStyle = "#9ca3af";
      ctx.font = "11px -apple-system, Arial, sans-serif";
      ctx.textAlign = "right";
      const gridLines = 4;
      for (let g = 0; g <= gridLines; g++) {
        const v = minV + (rangeV * g) / gridLines;
        const y = yFor(v);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillText(`${v.toFixed(1)}%`, padding.left - 8, y + 3);
      }

      // X labels
      ctx.textAlign = "center";
      const xTickCount = Math.min(data.length, range >= 100 ? 10 : range);
      const step = Math.max(1, Math.round(data.length / xTickCount));
      for (let i = 0; i < data.length; i += step) {
        ctx.fillText(`#${i + 1}`, xFor(i), height - 6);
      }
      ctx.fillText(`#${data.length}`, xFor(data.length - 1), height - 6);

      // Area fill under curve
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = xFor(i);
        const y = yFor(v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(xFor(data.length - 1), yFor(0));
      ctx.lineTo(xFor(0), yFor(0));
      ctx.closePath();
      ctx.fillStyle = "rgba(5, 133, 84, 0.08)";
      ctx.fill();

      // Curve line
      ctx.strokeStyle = "#058554";
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = xFor(i);
        const y = yFor(v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Marker line helper
      const drawMarker = (pos: number, color: string, label: string) => {
        if (pos < 1 || pos > data.length) return;
        const x = xFor(pos - 1);
        const y = yFor(data[pos - 1]);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + plotH);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = "bold 10px -apple-system, Arial, sans-serif";
        ctx.textAlign = x > width - 60 ? "right" : "left";
        ctx.fillText(label, x + (x > width - 60 ? -6 : 6), Math.max(padding.top + 10, y - 8));
        ctx.restore();
      };

      if (targetPosition) drawMarker(targetPosition, "#f59e0b", `Target #${targetPosition}`);
      drawMarker(currentPosition, "#2563eb", `Current #${currentPosition}`);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [curve, range, currentPosition, targetPosition, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="CTR curve by SERP position, with current and target position markers" />
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
