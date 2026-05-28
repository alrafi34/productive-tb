"use client";

import { ShapeType, ShapeDimensions } from "./types";

interface Props {
  shape: ShapeType;
  dims: ShapeDimensions;
  unit: string;
}

function p(v: string | undefined): number {
  return parseFloat(v ?? "0") || 0;
}

export default function ShapeDiagram({ shape, dims, unit }: Props) {
  const W = 280, H = 200;
  const cx = W / 2, cy = H / 2;

  const labelStyle = { fontSize: 10, fill: "#6B7280", fontFamily: "monospace" };
  const dimStyle   = { fontSize: 10, fill: "#058554", fontFamily: "monospace", fontWeight: 600 };
  const axisStyle  = { stroke: "#D1D5DB", strokeWidth: 1, strokeDasharray: "4 3" };

  // Axes
  const axes = (
    <>
      <line x1={cx} y1={10} x2={cx} y2={H - 10} {...axisStyle} />
      <line x1={10} y1={cy} x2={W - 10} y2={cy} {...axisStyle} />
      <text x={cx + 4} y={16} style={labelStyle}>y</text>
      <text x={W - 16} y={cy - 4} style={labelStyle}>x</text>
    </>
  );

  let shape_svg: React.ReactNode = null;

  if (shape === "rectangle") {
    const bv = p(dims.width), hv = p(dims.height);
    const scale = Math.min(100 / Math.max(bv, 1), 80 / Math.max(hv, 1), 2);
    const sw = bv * scale, sh = hv * scale;
    const rx = cx - sw / 2, ry = cy - sh / 2;
    shape_svg = (
      <>
        <rect x={rx} y={ry} width={sw} height={sh} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="1" />
        {/* width dim */}
        <line x1={rx} y1={ry + sh + 14} x2={rx + sw} y2={ry + sh + 14} stroke="#058554" strokeWidth="1" markerStart="url(#arr-s)" markerEnd="url(#arr-e)" />
        <text x={cx} y={ry + sh + 24} textAnchor="middle" style={dimStyle}>b = {bv} {unit}</text>
        {/* height dim */}
        <line x1={rx - 14} y1={ry} x2={rx - 14} y2={ry + sh} stroke="#058554" strokeWidth="1" markerStart="url(#arr-s)" markerEnd="url(#arr-e)" />
        <text x={rx - 18} y={cy} textAnchor="end" style={dimStyle}>h={hv}</text>
      </>
    );
  } else if (shape === "hollow-rectangle") {
    const bv = p(dims.width), hv = p(dims.height), bi = p(dims.innerWidth), hi = p(dims.innerHeight);
    const scale = Math.min(100 / Math.max(bv, 1), 80 / Math.max(hv, 1), 2);
    const sw = bv * scale, sh = hv * scale, siw = bi * scale, sih = hi * scale;
    const rx = cx - sw / 2, ry = cy - sh / 2;
    shape_svg = (
      <>
        <rect x={rx} y={ry} width={sw} height={sh} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="1" />
        <rect x={cx - siw / 2} y={cy - sih / 2} width={siw} height={sih} fill="white" stroke="#93C5FD" strokeWidth="1.5" rx="1" />
        <text x={cx} y={ry + sh + 24} textAnchor="middle" style={dimStyle}>b={bv} / b_i={bi} {unit}</text>
        <text x={rx - 4} y={cy} textAnchor="end" style={dimStyle}>h={hv}</text>
      </>
    );
  } else if (shape === "circle") {
    const dv = p(dims.diameter);
    const r = Math.min(dv / 2 * 1.5, 70);
    shape_svg = (
      <>
        <circle cx={cx} cy={cy} r={r} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#058554" strokeWidth="1.5" />
        <text x={cx + r / 2} y={cy - 6} textAnchor="middle" style={dimStyle}>d/2</text>
        <text x={cx} y={cy + r + 18} textAnchor="middle" style={dimStyle}>d = {dv} {unit}</text>
      </>
    );
  } else if (shape === "hollow-circle" || shape === "pipe") {
    const Dv = p(dims.outerDiameter), dv = p(dims.innerDiameter);
    const rO = Math.min(Dv / 2 * 1.4, 72);
    const rI = Dv > 0 ? (dv / Dv) * rO : rO * 0.6;
    shape_svg = (
      <>
        <circle cx={cx} cy={cy} r={rO} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={rI} fill="white" stroke="#93C5FD" strokeWidth="1.5" />
        <line x1={cx} y1={cy} x2={cx + rO} y2={cy} stroke="#058554" strokeWidth="1.5" />
        <text x={cx + rO / 2} y={cy - 6} textAnchor="middle" style={dimStyle}>D/2</text>
        <text x={cx} y={cy + rO + 18} textAnchor="middle" style={dimStyle}>D={Dv} / d={dv} {unit}</text>
      </>
    );
  } else if (shape === "triangle") {
    const bv = p(dims.base), hv = p(dims.height);
    const scale = Math.min(120 / Math.max(bv, 1), 90 / Math.max(hv, 1), 2);
    const sw = bv * scale, sh = hv * scale;
    const x1 = cx - sw / 2, x2 = cx + sw / 2, x3 = cx;
    const y1 = cy + sh / 2, y2 = cy + sh / 2, y3 = cy - sh / 2;
    shape_svg = (
      <>
        <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
        <line x1={x1} y1={y1 + 14} x2={x2} y2={y1 + 14} stroke="#058554" strokeWidth="1" markerStart="url(#arr-s)" markerEnd="url(#arr-e)" />
        <text x={cx} y={y1 + 24} textAnchor="middle" style={dimStyle}>b = {bv} {unit}</text>
        <text x={x1 - 4} y={cy} textAnchor="end" style={dimStyle}>h={hv}</text>
      </>
    );
  } else if (shape === "i-beam") {
    const bf = p(dims.flangeWidth), tf = p(dims.flangeThickness);
    const hw = p(dims.webHeight), tw = p(dims.webThickness);
    const H = hw + 2 * tf;
    const scale = Math.min(110 / Math.max(bf, 1), 100 / Math.max(H, 1), 2);
    const sbf = bf * scale, stf = tf * scale, shw = hw * scale, stw = tw * scale;
    const sH = shw + 2 * stf;
    const rx = cx - sbf / 2, ry = cy - sH / 2;
    shape_svg = (
      <>
        {/* top flange */}
        <rect x={rx} y={ry} width={sbf} height={stf} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        {/* web */}
        <rect x={cx - stw / 2} y={ry + stf} width={stw} height={shw} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        {/* bottom flange */}
        <rect x={rx} y={ry + stf + shw} width={sbf} height={stf} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        <text x={cx} y={ry + sH + 20} textAnchor="middle" style={dimStyle}>bf={bf} / tw={tw} {unit}</text>
      </>
    );
  } else if (shape === "t-beam") {
    const bf = p(dims.tFlangeWidth), tf = p(dims.tFlangeThickness);
    const hw = p(dims.tWebHeight), tw = p(dims.tWebThickness);
    const H = hw + tf;
    const scale = Math.min(110 / Math.max(bf, 1), 100 / Math.max(H, 1), 2);
    const sbf = bf * scale, stf = tf * scale, shw = hw * scale, stw = tw * scale;
    const rx = cx - sbf / 2, ry = cy - (shw + stf) / 2;
    shape_svg = (
      <>
        <rect x={rx} y={ry} width={sbf} height={stf} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x={cx - stw / 2} y={ry + stf} width={stw} height={shw} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        <text x={cx} y={ry + stf + shw + 20} textAnchor="middle" style={dimStyle}>bf={bf} / tw={tw} {unit}</text>
      </>
    );
  } else if (shape === "channel") {
    const bf = p(dims.chFlangeWidth), tf = p(dims.chFlangeThickness);
    const hw = p(dims.chWebHeight), tw = p(dims.chWebThickness);
    const H = hw + 2 * tf;
    const scale = Math.min(110 / Math.max(bf, 1), 100 / Math.max(H, 1), 2);
    const sbf = bf * scale, stf = tf * scale, shw = hw * scale, stw = tw * scale;
    const sH = shw + 2 * stf;
    const rx = cx - sbf / 2, ry = cy - sH / 2;
    shape_svg = (
      <>
        {/* top flange */}
        <rect x={rx} y={ry} width={sbf} height={stf} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        {/* web (left side) */}
        <rect x={rx} y={ry + stf} width={stw} height={shw} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        {/* bottom flange */}
        <rect x={rx} y={ry + stf + shw} width={sbf} height={stf} fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        <text x={cx} y={ry + sH + 20} textAnchor="middle" style={dimStyle}>bf={bf} / tw={tw} {unit}</text>
      </>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label={`${shape} cross-section diagram`}>
      <defs>
        <marker id="arr-s" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
          <polygon points="0 1.5, 5 3, 0 4.5" fill="#058554" />
        </marker>
        <marker id="arr-e" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <polygon points="0 1.5, 5 3, 0 4.5" fill="#058554" />
        </marker>
      </defs>
      {axes}
      {shape_svg}
    </svg>
  );
}
