/* Crop rectangle maths, in image pixels. Kept free of the DOM so it can be
   tested on its own. */

export type Rect = { x: number; y: number; w: number; h: number };
export type Handle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export const ASPECTS: { label: string; ratio: number | null }[] = [
  { label: "Free", ratio: null },
  { label: "1:1 Square", ratio: 1 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "3:2", ratio: 3 / 2 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "4:5 Portrait", ratio: 4 / 5 },
  { label: "2:3 Portrait", ratio: 2 / 3 },
  { label: "9:16 Story", ratio: 9 / 16 },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/* The starting crop: the largest rectangle of the ratio that fits, centered.
   With no ratio, 80% of the image so the handles are easy to see. */
export function initialCrop(W: number, H: number, ratio: number | null): Rect {
  if (!ratio) {
    const w = W * 0.8;
    const h = H * 0.8;
    return { x: (W - w) / 2, y: (H - h) / 2, w, h };
  }
  let w = W;
  let h = W / ratio;
  if (h > H) {
    h = H;
    w = H * ratio;
  }
  return { x: (W - w) / 2, y: (H - h) / 2, w, h };
}

/* Re-shapes a crop to a new ratio around its own center, as large as its
   current area allows and inside the image. */
export function applyAspect(r: Rect, ratio: number | null, W: number, H: number): Rect {
  if (!ratio) return r;
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  let w = Math.sqrt(r.w * r.h * ratio);
  let h = w / ratio;
  const maxW = 2 * Math.min(cx, W - cx);
  const maxH = 2 * Math.min(cy, H - cy);
  const s = Math.min(1, maxW / w, maxH / h);
  w *= s;
  h *= s;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

export function moveRect(r: Rect, dx: number, dy: number, W: number, H: number): Rect {
  return { ...r, x: clamp(r.x + dx, 0, W - r.w), y: clamp(r.y + dy, 0, H - r.h) };
}

/* Drags one edge or corner by (dx, dy). The opposite edge or corner stays
   put; with a fixed ratio, an edge handle keeps the crop centered on the
   other axis, and the crop never leaves the image. */
export function resizeRect(r: Rect, handle: Handle, dx: number, dy: number, W: number, H: number, ratio: number | null, min = 8): Rect {
  let left = r.x;
  let top = r.y;
  let right = r.x + r.w;
  let bottom = r.y + r.h;
  const hw = handle.includes("w");
  const he = handle.includes("e");
  const hn = handle.includes("n");
  const hs = handle.includes("s");
  if (hw) left = clamp(left + dx, 0, right - min);
  if (he) right = clamp(right + dx, left + min, W);
  if (hn) top = clamp(top + dy, 0, bottom - min);
  if (hs) bottom = clamp(bottom + dy, top + min, H);
  if (!ratio) return { x: left, y: top, w: right - left, h: bottom - top };

  let w = right - left;
  let h = bottom - top;
  const horizontal = hw || he;
  const vertical = hn || hs;
  if (horizontal && vertical) {
    // Corner: follow whichever side moved further
    if (w / ratio > h) h = w / ratio;
    else w = h * ratio;
  } else if (horizontal) {
    h = w / ratio;
  } else {
    w = h * ratio;
  }

  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  const maxW = hw ? right : he ? W - left : 2 * Math.min(cx, W - cx);
  const maxH = hn ? bottom : hs ? H - top : 2 * Math.min(cy, H - cy);
  const s = Math.min(1, maxW / w, maxH / h);
  w *= s;
  h *= s;
  return {
    x: hw ? right - w : he ? left : cx - w / 2,
    y: hn ? bottom - h : hs ? top : cy - h / 2,
    w,
    h,
  };
}

/* Whole pixels, still inside the image and at least 1 × 1. */
export function roundRect(r: Rect, W: number, H: number): Rect {
  const x = clamp(Math.round(r.x), 0, W - 1);
  const y = clamp(Math.round(r.y), 0, H - 1);
  const w = clamp(Math.round(r.w), 1, W - x);
  const h = clamp(Math.round(r.h), 1, H - y);
  return { x, y, w, h };
}

/* Typed-in values: keep what was typed where possible and fit the rest. */
export function setRectField(r: Rect, field: keyof Rect, value: number, W: number, H: number, ratio: number | null): Rect {
  if (!Number.isFinite(value)) return r;
  const next = { ...r };
  if (field === "x") next.x = clamp(value, 0, W - r.w);
  if (field === "y") next.y = clamp(value, 0, H - r.h);
  if (field === "w") {
    next.w = clamp(value, 1, W - r.x);
    if (ratio) {
      next.h = next.w / ratio;
      if (r.y + next.h > H) {
        next.h = H - r.y;
        next.w = next.h * ratio;
      }
    }
  }
  if (field === "h") {
    next.h = clamp(value, 1, H - r.y);
    if (ratio) {
      next.w = next.h * ratio;
      if (r.x + next.w > W) {
        next.w = W - r.x;
        next.h = next.w / ratio;
      }
    }
  }
  return next;
}
