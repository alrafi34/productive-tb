"use client";

import { useEffect, useRef } from "react";

interface Props {
  score: number;
  color: string;
  size?: number;
}

const START_ANGLE = Math.PI * 0.75;
const SWEEP = Math.PI * 1.5;

export default function DifficultyGauge({ score, color, size = 160 }: Props) {
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

    // Track
    ctx.beginPath();
    ctx.arc(cx, cy, radius, START_ANGLE, START_ANGLE + SWEEP);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    // Value arc
    const valueSweep = (Math.min(100, Math.max(0, score)) / 100) * SWEEP;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, START_ANGLE, START_ANGLE + valueSweep);
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    // Score text
    ctx.fillStyle = "#111827";
    ctx.font = "700 34px -apple-system, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(Math.round(score)), cx, cy + 4);
    ctx.font = "400 11px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("/ 100", cx, cy + 22);
  }, [score, color, size]);

  return <canvas ref={canvasRef} role="img" aria-label={`Difficulty score ${Math.round(score)} out of 100`} />;
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
