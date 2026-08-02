"use client";

interface GaugeProps {
  score: number;
  color: string;
  size?: number;
}

export function ScoreGauge({ score, color, size = 176 }: GaugeProps) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" role="img" aria-label={`Performance score gauge: ${score}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s ease, stroke 0.7s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-mono tabular-nums transition-all duration-300" style={{ color }}>{score}</span>
        <span className="text-xs text-gray-500 font-medium mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

interface MetricBarProps {
  label: string;
  score: number;
}

export function MetricBar({ label, score }: MetricBarProps) {
  const color = score >= 90 ? "#058554" : score >= 50 ? "#d97706" : "#dc2626";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs font-mono font-semibold" style={{ color }}>{Math.round(score)}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${Math.max(2, Math.min(100, score))}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
