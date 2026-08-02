"use client";

import { StageBreakdown, STAGE_TYPE_META, formatDuration } from "./logic";

interface Props {
  breakdown: StageBreakdown[];
}

export default function LatencyDistributionChart({ breakdown }: Props) {
  if (breakdown.length === 0) return null;
  const max = Math.max(...breakdown.map((b) => b.ms), 1);

  return (
    <div className="space-y-2.5">
      {breakdown.map((b) => (
        <div key={b.stage.id}>
          <div className="flex items-center justify-between mb-1 gap-2">
            <span className="text-xs font-medium text-gray-600 truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: STAGE_TYPE_META[b.stage.type].color }} />
              {b.stage.name}
              {b.isBottleneck && <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200 flex-shrink-0">Bottleneck</span>}
              {b.isOutlier && !b.isBottleneck && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200 flex-shrink-0">Outlier</span>}
            </span>
            <span className="text-xs font-mono text-gray-500 flex-shrink-0">{formatDuration(b.ms)} · {b.percentOfTotal.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-700 ${b.isBottleneck ? "ring-2 ring-red-300" : ""}`}
              style={{ width: `${Math.max(2, (b.ms / max) * 100)}%`, backgroundColor: STAGE_TYPE_META[b.stage.type].color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
