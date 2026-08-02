"use client";

import { useEffect, useRef } from "react";

interface Props {
  churnPct: number;
  color: string;
  size?: number;
}

const START_ANGLE = Math.PI * 0.75;
const SWEEP = Math.PI * 1.5;
const MAX_SCALE = 25;

export default function ChurnGauge({ churnPct, color, size = 160 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 12;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, START_ANGLE, START_ANGLE + SWEEP);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    const clamped = Math.min(MAX_SCALE, Math.max(0, churnPct));
    const valueSweep = (clamped / MAX_SCALE) * SWEEP;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, START_ANGLE, START_ANGLE + valueSweep);
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.fillStyle = "#111827";
    ctx.font = "700 30px -apple-system, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${churnPct.toFixed(1)}%`, cx, cy + 2);
    ctx.font = "400 11px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("churn rate", cx, cy + 20);
  }, [churnPct, color, size]);

  return <canvas ref={canvasRef} role="img" aria-label={`Churn rate ${churnPct.toFixed(1)} percent`} />;
}

export function exportGaugeAsPng(container: HTMLDivElement | null, filename: string) {
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
