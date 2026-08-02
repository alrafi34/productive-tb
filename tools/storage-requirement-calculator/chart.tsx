"use client";

import { BreakdownSegment, formatBytes } from "./logic";

interface DonutProps {
  segments: BreakdownSegment[];
  size?: number;
}

export function BreakdownDonut({ segments, size = 160 }: DonutProps) {
  const total = segments.reduce((s, seg) => s + seg.bytes, 0);
  if (total <= 0) return null;

  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const arcs = segments.reduce<{ seg: BreakdownSegment; dash: number; offset: number }[]>((acc, seg) => {
    const frac = seg.bytes / total;
    const dash = frac * circumference;
    const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    return [...acc, { seg, dash, offset }];
  }, []);

  return (
    <div className="flex items-center gap-5 flex-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 flex-shrink-0" role="img" aria-label="Storage breakdown donut chart">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        {arcs.map(({ seg, dash, offset }) => (
          <circle
            key={seg.label}
            cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset}
            style={{ transition: "stroke-dasharray 0.5s ease" }}
          />
        ))}
      </svg>
      <div className="space-y-1.5 text-xs">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-gray-600">{seg.label}</span>
            <span className="text-gray-400 font-mono">{formatBytes(seg.bytes)} ({((seg.bytes / total) * 100).toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface GrowthChartProps {
  forecast: { year: number; bytes: number }[];
}

export function GrowthChart({ forecast }: GrowthChartProps) {
  if (forecast.length === 0) return null;
  const max = Math.max(...forecast.map((f) => f.bytes), 1);
  const width = 100;
  const height = 40;
  const points = forecast.map((f, i) => {
    const x = (i / (forecast.length - 1)) * width;
    const y = height - (f.bytes / max) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24" preserveAspectRatio="none" role="img" aria-label="5-year storage growth forecast">
        <polyline points={points} fill="none" stroke="#058554" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        {forecast.map((f, i) => {
          const x = (i / (forecast.length - 1)) * width;
          const y = height - (f.bytes / max) * (height - 4) - 2;
          return <circle key={f.year} cx={x} cy={y} r={1.4} fill="#058554" />;
        })}
      </svg>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        {forecast.map((f) => (
          <span key={f.year} className="text-center">Y{f.year}<br /><span className="font-mono text-gray-500">{formatBytes(f.bytes)}</span></span>
        ))}
      </div>
    </div>
  );
}
