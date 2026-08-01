"use client";

import { SCORE_COLOR } from "./logic";

interface GaugeProps {
  score: number; // 0-100
  size?: number;
  label?: string;
  sublabel?: string;
}

export function ScoreGauge({ score, size = 176, label, sublabel }: GaugeProps) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamp01(score) / 100) * circumference;
  const color = SCORE_COLOR(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" role="img" aria-label={`SEO score gauge: ${score} out of 100`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s ease, stroke 0.7s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold font-mono tabular-nums transition-all duration-300" style={{ color }}>{Math.round(score)}</span>
        {label && <span className="text-xs text-gray-500 font-medium mt-0.5">{label}</span>}
        {sublabel && <span className="text-[10px] text-gray-400">{sublabel}</span>}
      </div>
    </div>
  );
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(100, n));
}

interface MiniGaugeProps {
  score: number;
  size?: number;
}

export function MiniGauge({ score, size = 44 }: MiniGaugeProps) {
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamp01(score) / 100) * circumference;
  const color = SCORE_COLOR(score);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 flex-shrink-0" role="img" aria-label={`Score: ${score}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.7s ease, stroke 0.7s ease" }}
      />
    </svg>
  );
}
