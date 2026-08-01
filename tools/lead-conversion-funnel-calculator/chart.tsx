"use client";

import { useRef } from "react";
import type { StageResult } from "./logic";

interface FunnelProps {
  stages: StageResult[];
  bestTransitionIndex: number;
  worstTransitionIndex: number;
}

const SEGMENT_HEIGHT = 76;
const SEGMENT_GAP = 6;
const SVG_WIDTH = 420;
const MARGIN_X = 90;

function segmentColor(rate: number): string {
  if (rate >= 60) return "#058554";
  if (rate >= 30) return "#2563eb";
  if (rate >= 10) return "#d97706";
  return "#dc2626";
}

export default function FunnelSVG({ stages, bestTransitionIndex, worstTransitionIndex }: FunnelProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const n = stages.length;
  const segments = Math.max(1, n - 1);
  const totalHeight = segments * SEGMENT_HEIGHT + (segments - 1) * SEGMENT_GAP + 10;
  const maxBarWidth = SVG_WIDTH - MARGIN_X * 2;

  const widthFor = (share: number) => {
    const clamped = Math.max(6, Math.min(100, share));
    return (clamped / 100) * maxBarWidth;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${totalHeight}`}
        width="100%"
        style={{ maxWidth: 480, minWidth: 320 }}
        className="mx-auto block"
        role="img"
        aria-label="Funnel diagram showing conversion between each stage"
      >
        {stages.slice(0, -1).map((s, i) => {
          const next = stages[i + 1];
          const topW = widthFor(s.shareOfFirst);
          const botW = widthFor(next.shareOfFirst);
          const y = i * (SEGMENT_HEIGHT + SEGMENT_GAP);
          const topLeft = (SVG_WIDTH - topW) / 2;
          const topRight = topLeft + topW;
          const botLeft = (SVG_WIDTH - botW) / 2;
          const botRight = botLeft + botW;
          const rate = next.conversionFromPrev ?? 0;
          const color = segmentColor(rate);
          const isWorst = i + 1 === worstTransitionIndex;
          const isBest = i + 1 === bestTransitionIndex;

          return (
            <g key={s.id} className="transition-all duration-500 ease-out">
              <title>{`${s.name} → ${next.name}: ${rate}% conversion, ${next.dropOffFromPrev ?? 0}% drop-off`}</title>
              <polygon
                points={`${topLeft},${y} ${topRight},${y} ${botRight},${y + SEGMENT_HEIGHT} ${botLeft},${y + SEGMENT_HEIGHT}`}
                fill={color}
                fillOpacity={0.88}
                stroke={isWorst ? "#dc2626" : isBest ? "#058554" : "#ffffff"}
                strokeWidth={isWorst || isBest ? 2.5 : 1}
                className="transition-all duration-500 ease-out"
              />
              {/* stage name + value at top edge of this segment */}
              <text x={SVG_WIDTH / 2} y={y + 16} textAnchor="middle" fontSize="11" fontWeight={600} fill="#ffffff">
                {s.name}
              </text>
              <text x={SVG_WIDTH / 2} y={y + 30} textAnchor="middle" fontSize="10" fill="#ffffff" opacity={0.9}>
                {s.value.toLocaleString("en-US")}
              </text>
              {/* conversion rate label to the right */}
              <text x={Math.max(topRight, botRight) + 10} y={y + SEGMENT_HEIGHT / 2 + 4} fontSize="11" fontWeight={700} fill={color}>
                {rate}%
              </text>
              {isWorst && (
                <text x={Math.max(topRight, botRight) + 10} y={y + SEGMENT_HEIGHT / 2 + 18} fontSize="9" fill="#dc2626">
                  biggest drop-off
                </text>
              )}
            </g>
          );
        })}
        {/* final stage label */}
        {(() => {
          const last = stages[stages.length - 1];
          const y = segments * (SEGMENT_HEIGHT + SEGMENT_GAP) - SEGMENT_GAP;
          return (
            <g>
              <text x={SVG_WIDTH / 2} y={y - 8} textAnchor="middle" fontSize="11" fontWeight={700} fill="#111827">
                {last.name}: {last.value.toLocaleString("en-US")}
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

export function exportFunnelSvg(container: HTMLDivElement | null, filename: string) {
  if (!container) return;
  const svg = container.querySelector("svg");
  if (!svg) return;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("style", "background:#fff");
  const source = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([`<?xml version="1.0" standalone="no"?>\r\n${source}`], { type: "image/svg+xml;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function exportFunnelPng(container: HTMLDivElement | null, filename: string) {
  if (!container) return;
  const svg = container.querySelector("svg");
  if (!svg) return;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const bbox = svg.viewBox.baseVal;
  const width = bbox?.width || svg.clientWidth || 420;
  const height = bbox?.height || svg.clientHeight || 300;
  const scale = 2;
  const source = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) { URL.revokeObjectURL(url); return; }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  };
  img.src = url;
}
