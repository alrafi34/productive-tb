"use client";

interface BulkChartProps {
  durations: number[];
  averageSeconds: number;
}

const MAX_BARS = 60;

export default function SessionBarChart({ durations, averageSeconds }: BulkChartProps) {
  if (durations.length === 0) return null;

  const shown = durations.slice(0, MAX_BARS);
  const max = Math.max(...durations, 1);

  return (
    <div>
      <div className="flex items-end gap-0.5 h-28 overflow-hidden">
        {shown.map((d, i) => {
          const heightPct = Math.max(4, (d / max) * 100);
          const aboveAvg = d >= averageSeconds;
          return (
            <div
              key={i}
              title={`Session ${i + 1}: ${d}s`}
              className={`flex-1 rounded-sm transition-all duration-300 ${aboveAvg ? "bg-primary" : "bg-primary/30"}`}
              style={{ height: `${heightPct}%`, minWidth: 2 }}
            />
          );
        })}
      </div>
      {durations.length > MAX_BARS && (
        <p className="text-xs text-gray-400 mt-2">Showing first {MAX_BARS} of {durations.length} sessions.</p>
      )}
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" /> Above average</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary/30 inline-block" /> Below average</span>
      </div>
    </div>
  );
}
