"use client";

import { useEffect, useRef } from "react";
import { SensitivityPoint } from "./logic";

interface SensitivityChartProps {
  data: SensitivityPoint[];
  currentPopulation: number | null;
  height?: number;
}

export function SensitivityChart({ data, currentPopulation, height = 220 }: SensitivityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || data.length === 0) return;

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

      const padding = { top: 16, right: 16, bottom: 28, left: 44 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      const logMin = Math.log10(data[0].population);
      const logMax = Math.log10(data[data.length - 1].population);
      const maxSample = Math.max(...data.map((d) => d.sampleSize), 1);

      const toX = (pop: number) => padding.left + ((Math.log10(pop) - logMin) / (logMax - logMin)) * plotW;
      const toY = (n: number) => padding.top + plotH - (n / maxSample) * plotH;

      // Gridlines
      ctx.strokeStyle = "#f3f4f6";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + plotW, y);
        ctx.stroke();
      }

      // Line
      ctx.strokeStyle = "#058554";
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = toX(d.population);
        const y = toY(d.sampleSize);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Fill under line
      ctx.lineTo(toX(data[data.length - 1].population), padding.top + plotH);
      ctx.lineTo(toX(data[0].population), padding.top + plotH);
      ctx.closePath();
      ctx.fillStyle = "rgba(5, 133, 84, 0.06)";
      ctx.fill();

      // Current population marker
      if (currentPopulation && currentPopulation >= data[0].population && currentPopulation <= data[data.length - 1].population) {
        // interpolate sample size at current population (log-linear)
        let lower = data[0], upper = data[data.length - 1];
        for (let i = 0; i < data.length - 1; i++) {
          if (currentPopulation >= data[i].population && currentPopulation <= data[i + 1].population) {
            lower = data[i]; upper = data[i + 1]; break;
          }
        }
        const range = Math.log10(upper.population) - Math.log10(lower.population) || 1;
        const t = (Math.log10(currentPopulation) - Math.log10(lower.population)) / range;
        const interpSample = lower.sampleSize + t * (upper.sampleSize - lower.sampleSize);
        const mx = toX(currentPopulation);
        const my = toY(interpSample);

        ctx.strokeStyle = "#d97706";
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mx, padding.top);
        ctx.lineTo(mx, padding.top + plotH);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#d97706";
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Axis labels (population, log scale)
      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px -apple-system, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(data[0].population.toLocaleString("en-US"), padding.left, height - 8);
      ctx.textAlign = "right";
      ctx.fillText(data[data.length - 1].population.toLocaleString("en-US"), width - padding.right, height - 8);

      // Y axis labels
      ctx.textAlign = "right";
      ctx.fillText(String(Math.round(maxSample)), padding.left - 6, padding.top + 8);
      ctx.fillText("0", padding.left - 6, padding.top + plotH);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [data, currentPopulation, height]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} role="img" aria-label="Chart showing how required sample size decreases as population size increases" />
    </div>
  );
}
