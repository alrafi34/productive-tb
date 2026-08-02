"use client";

import { useEffect, useRef } from "react";
import type { FrequencyRow } from "./logic";

const BAR_COLOR = "#058554";
const MODE_COLOR = "#069D63";

interface Props {
  rows: FrequencyRow[];
  modeValues: (string | number)[];
  height?: number;
}

export default function FrequencyBarChart({ rows, modeValues, height = 240 }: Props) {
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

      const displayRows = rows.slice(0, 20);
      if (displayRows.length === 0) return;

      const padding = { top: 16, right: 16, bottom: 36, left: 32 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const maxFreq = Math.max(...displayRows.map((r) => r.frequency), 1);
      const barGap = 8;
      const barW = Math.max(4, plotW / displayRows.length - barGap);

      ctx.font = "11px -apple-system, Arial, sans-serif";
      displayRows.forEach((row, i) => {
        const x = padding.left + i * (barW + barGap);
        const barH = (row.frequency / maxFreq) * plotH;
        const y = padding.top + plotH - barH;
        const isMode = modeValues.includes(row.value);

        ctx.fillStyle = isMode ? MODE_COLOR : BAR_COLOR;
        ctx.globalAlpha = isMode ? 1 : 0.55;
        ctx.fillRect(x, y, barW, barH);
        ctx.globalAlpha = 1;

        ctx.fillStyle = "#111827";
        ctx.textAlign = "center";
        ctx.fillText(String(row.frequency), x + barW / 2, y - 4);

        ctx.fillStyle = "#6b7280";
        ctx.save();
        ctx.translate(x + barW / 2, height - padding.bottom + 14);
        const label = String(row.value).length > 8 ? String(row.value).slice(0, 7) + "…" : String(row.value);
        ctx.fillText(label, 0, 0);
        ctx.restore();
      });
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [rows, modeValues, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Frequency bar chart of dataset values" />
    </div>
  );
}
