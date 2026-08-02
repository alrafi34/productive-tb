"use client";

interface CostBar {
  label: string;
  value: number;
}

interface CostBarChartProps {
  bars: CostBar[];
  symbol: string;
}

export default function CostBarChart({ bars, symbol }: CostBarChartProps) {
  const visible = bars.filter((b) => b.value !== null && !isNaN(b.value));
  if (visible.length === 0) return null;
  const max = Math.max(...visible.map((b) => b.value), 0.01);

  return (
    <div className="space-y-3">
      {visible.map((bar) => (
        <div key={bar.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600">{bar.label}</span>
            <span className="text-xs font-mono font-semibold text-gray-800">{symbol}{bar.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div className="h-2.5 rounded-full bg-primary transition-all duration-700" style={{ width: `${Math.max(2, (bar.value / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
