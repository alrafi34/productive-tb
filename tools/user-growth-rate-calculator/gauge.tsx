"use client";

import { useEffect, useRef } from "react";

interface Props {
  ratePct: number;
  color: string;
  size?: number;
}

const START_ANGLE = Math.PI * 0.75;
const SWEEP = Math.PI * 1.5;
const MIN_SCALE = -50;
const MAX_SCALE = 100;

export default function GrowthGauge({ ratePct, color, size = 160 }: Props) {
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
    const range = MAX_SCALE - MIN_SCALE;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, START_ANGLE, START_ANGLE + SWEEP);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    // Zero marker
    const zeroFrac = (0 - MIN_SCALE) / range;
    const zeroAngle = START_ANGLE + zeroFrac * SWEEP;
    const zx1 = cx + Math.cos(zeroAngle) * (radius - 9);
    const zy1 = cy + Math.sin(zeroAngle) * (radius - 9);
    const zx2 = cx + Math.cos(zeroAngle) * (radius + 9);
    const zy2 = cy + Math.sin(zeroAngle) * (radius + 9);
    ctx.beginPath();
    ctx.moveTo(zx1, zy1);
    ctx.lineTo(zx2, zy2);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.stroke();

    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, ratePct));
    const valueFrac = (clamped - MIN_SCALE) / range;
    const startFrac = clamped >= 0 ? zeroFrac : valueFrac;
    const endFrac = clamped >= 0 ? valueFrac : zeroFrac;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, START_ANGLE + startFrac * SWEEP, START_ANGLE + endFrac * SWEEP);
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.fillStyle = "#111827";
    ctx.font = "700 28px -apple-system, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${ratePct >= 0 ? "+" : ""}${ratePct.toFixed(1)}%`, cx, cy + 2);
    ctx.font = "400 11px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("growth rate", cx, cy + 20);
  }, [ratePct, color, size]);

  return <canvas ref={canvasRef} role="img" aria-label={`Growth rate ${ratePct.toFixed(1)} percent`} />;
}
