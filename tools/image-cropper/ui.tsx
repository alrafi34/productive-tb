"use client";

import { useEffect, useRef, useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { IMAGE_ACCEPT, canEncode, canvasToBlob, decodeImage, downloadBlob, formatBytes, isHeic, isImageFile, withExtension } from "@/lib/image-files";
import { ASPECTS, applyAspect, initialCrop, moveRect, resizeRect, roundRect, setRectField, type Handle, type Rect } from "./logic";
import ImageCropperSEO from "./seo-content";

type Working = { blob: Blob; url: string; width: number; height: number; name: string; type: string };
type Format = "jpeg" | "png" | "webp";
const FORMATS: Record<Format, { label: string; mime: string; ext: string }> = {
  jpeg: { label: "JPG", mime: "image/jpeg", ext: "jpg" },
  png: { label: "PNG", mime: "image/png", ext: "png" },
  webp: { label: "WebP", mime: "image/webp", ext: "webp" },
};
const HANDLES: Handle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
const HANDLE_POS: Record<Handle, string> = {
  nw: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize",
  n: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize",
  ne: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize",
  e: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize",
  se: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize",
  s: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-ns-resize",
  sw: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize",
  w: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize",
};

/* Draws `blob` rotated by 90° steps into a new lossless image. */
async function rotateBlob(blob: Blob, quarterTurns: number): Promise<{ blob: Blob; width: number; height: number }> {
  const img = await decodeImage(blob);
  try {
    const swap = quarterTurns % 2 !== 0;
    const canvas = document.createElement("canvas");
    canvas.width = swap ? img.height : img.width;
    canvas.height = swap ? img.width : img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((quarterTurns * Math.PI) / 2);
    ctx.drawImage(img.source, -img.width / 2, -img.height / 2);
    return { blob: await canvasToBlob(canvas, "image/png"), width: canvas.width, height: canvas.height };
  } finally {
    img.close();
  }
}

export default function ImageCropperUI() {
  const [work, setWork] = useState<Working | null>(null);
  const [crop, setCrop] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const [aspect, setAspect] = useState(0);
  const [circle, setCircle] = useState(false);
  const [format, setFormat] = useState<Format>("jpeg");
  const [quality, setQuality] = useState(92);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ kind: "move" | Handle; startX: number; startY: number; start: Rect; scale: number } | null>(null);

  const ratio = ASPECTS[aspect].ratio;
  const W = work?.width ?? 0;
  const H = work?.height ?? 0;

  useEffect(() => () => {
    if (work) URL.revokeObjectURL(work.url);
  }, [work]);

  const load = async (files: File[]) => {
    const file = files.find(isImageFile);
    if (!file) {
      setError("Please choose an image file (JPG, PNG, WebP, HEIC, GIF, BMP or AVIF).");
      return;
    }
    setError("");
    setResult(null);
    setBusy(true);
    try {
      let blob: Blob = file;
      const img = await decodeImage(file);
      const { width, height } = img;
      if (isHeic(file)) {
        // Keep a lossless, browser-readable copy to show and crop
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        c.getContext("2d")!.drawImage(img.source, 0, 0);
        blob = await canvasToBlob(c, "image/png");
      }
      img.close();
      setWork({ blob, url: URL.createObjectURL(blob), width, height, name: file.name, type: file.type });
      setFormat(file.type === "image/png" ? "png" : file.type === "image/webp" && canEncode("image/webp") ? "webp" : "jpeg");
      setCrop(initialCrop(width, height, ratio));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open this image.");
    } finally {
      setBusy(false);
    }
  };

  const rotate = async (turns: number) => {
    if (!work) return;
    setBusy(true);
    setResult(null);
    try {
      const r = await rotateBlob(work.blob, turns);
      setWork({ ...work, blob: r.blob, url: URL.createObjectURL(r.blob), width: r.width, height: r.height });
      setCrop(initialCrop(r.width, r.height, ratio));
    } finally {
      setBusy(false);
    }
  };

  const update = (r: Rect) => {
    setCrop(r);
    setResult(null);
  };

  const begin = (kind: "move" | Handle) => (e: React.PointerEvent) => {
    if (!imgRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { kind, startX: e.clientX, startY: e.clientY, start: crop, scale: W / imgRef.current.getBoundingClientRect().width };
  };

  // Dragging on the image outside the crop starts a new selection
  const beginNew = (e: React.PointerEvent) => {
    if (!imgRef.current) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const box = imgRef.current.getBoundingClientRect();
    const scale = W / box.width;
    const x = Math.min(Math.max((e.clientX - box.left) * scale, 0), W - 1);
    const y = Math.min(Math.max((e.clientY - box.top) * scale, 0), H - 1);
    const start = { x, y, w: 1, h: ratio ? 1 / ratio : 1 };
    drag.current = { kind: "se", startX: e.clientX, startY: e.clientY, start, scale };
    update(start);
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.startX) * d.scale;
    const dy = (e.clientY - d.startY) * d.scale;
    update(d.kind === "move" ? moveRect(d.start, dx, dy, W, H) : resizeRect(d.start, d.kind, dx, dy, W, H, ratio, 1));
  };

  const end = () => {
    if (drag.current) update(roundRect(crop, W, H));
    drag.current = null;
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    update(moveRect(crop, m[0], m[1], W, H));
  };

  const chooseAspect = (i: number) => {
    setAspect(i);
    const r = ASPECTS[i].ratio;
    update(roundRect(applyAspect(crop, r, W, H), W, H));
  };

  const outFormat: Format = circle && format === "jpeg" ? "png" : format;
  const px = roundRect(crop, W || 1, H || 1);

  const exportCrop = async () => {
    if (!work) return;
    setBusy(true);
    try {
      const img = await decodeImage(work.blob);
      const canvas = document.createElement("canvas");
      canvas.width = px.w;
      canvas.height = px.h;
      const ctx = canvas.getContext("2d")!;
      if (outFormat === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, px.w, px.h);
      }
      if (circle) {
        ctx.beginPath();
        ctx.ellipse(px.w / 2, px.h / 2, px.w / 2, px.h / 2, 0, 0, Math.PI * 2);
        ctx.clip();
      }
      ctx.drawImage(img.source, px.x, px.y, px.w, px.h, 0, 0, px.w, px.h);
      img.close();
      const f = FORMATS[outFormat];
      const blob = await canvasToBlob(canvas, f.mime, outFormat === "png" ? undefined : quality / 100);
      const base = work.name.replace(/\.[^.]+$/, "");
      setResult({ blob, name: withExtension(`${base}-cropped`, blob.type === f.mime ? f.ext : "png") });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not crop this image.");
    } finally {
      setBusy(false);
    }
  };

  const numberField = (field: keyof Rect, label: string) => (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <input
        type="number"
        min={field === "w" || field === "h" ? 1 : 0}
        value={px[field]}
        onChange={(e) => update(roundRect(setRectField(px, field, Number(e.target.value), W, H, ratio), W, H))}
        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#058554]"
      />
    </label>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <FileDropZone
        accept={IMAGE_ACCEPT}
        acceptPaste
        onFiles={load}
        icon="✂️"
        title={work ? "Open another image" : "Drop an image here or click to browse"}
        hint="JPG, PNG, WebP, HEIC, GIF, BMP, AVIF · or paste with Ctrl+V · nothing is uploaded"
        compact={!!work}
      />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {busy && !work && <p className="mt-3 text-sm text-gray-500">Opening image…</p>}

      {work && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="bg-gray-900 rounded-xl p-3 flex items-center justify-center select-none touch-none">
            <div className="relative inline-block" onPointerDown={beginNew} onPointerMove={onMove} onPointerUp={end} onPointerCancel={end}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imgRef} src={work.url} alt="Image to crop" draggable={false} className="block max-w-full max-h-[70vh] w-auto h-auto" />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className={`absolute pointer-events-auto cursor-move outline-none border border-white ${circle ? "rounded-[50%]" : ""}`}
                  style={{
                    left: `${(crop.x / W) * 100}%`,
                    top: `${(crop.y / H) * 100}%`,
                    width: `${(crop.w / W) * 100}%`,
                    height: `${(crop.h / H) * 100}%`,
                    boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                  }}
                  tabIndex={0}
                  role="group"
                  aria-roledescription="crop area"
                  aria-label={`Crop area, ${px.w} by ${px.h} pixels: drag to move, arrow keys to nudge`}
                  onPointerDown={begin("move")}
                  onKeyDown={onKey}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/3 top-0 bottom-0 border-l border-white/40" />
                    <div className="absolute left-2/3 top-0 bottom-0 border-l border-white/40" />
                    <div className="absolute top-1/3 left-0 right-0 border-t border-white/40" />
                    <div className="absolute top-2/3 left-0 right-0 border-t border-white/40" />
                  </div>
                </div>
              </div>
              {/* Handles sit outside the clipping layer so they stay grabbable at the edges */}
              <div
                className="absolute pointer-events-none"
                style={{ left: `${(crop.x / W) * 100}%`, top: `${(crop.y / H) * 100}%`, width: `${(crop.w / W) * 100}%`, height: `${(crop.h / H) * 100}%` }}
              >
                {HANDLES.map((h) => (
                  <span
                    key={h}
                    onPointerDown={begin(h)}
                    className={`absolute w-4 h-4 bg-white border-2 border-[#058554] rounded-sm pointer-events-auto ${HANDLE_POS[h]}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Aspect ratio</p>
              <div className="grid grid-cols-2 gap-2">
                {ASPECTS.map((a, i) => (
                  <button
                    key={a.label}
                    onClick={() => chooseAspect(i)}
                    className={`px-2 py-1.5 rounded-lg text-sm border ${i === aspect ? "bg-[#058554] text-white border-[#058554]" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {numberField("x", "X (px)")}
              {numberField("y", "Y (px)")}
              {numberField("w", "Width (px)")}
              {numberField("h", "Height (px)")}
            </div>
            <p className="text-xs text-gray-500">Image: {W} × {H} px</p>

            <div className="flex gap-2">
              <button onClick={() => rotate(3)} disabled={busy} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">⟲ Rotate left</button>
              <button onClick={() => rotate(1)} disabled={busy} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">⟳ Rotate right</button>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={circle} onChange={(e) => { setCircle(e.target.checked); setResult(null); }} className="accent-[#058554]" />
              Circle / oval crop (transparent corners)
            </label>

            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="block text-xs font-medium text-gray-600 mb-1">Save as</span>
                <select
                  value={outFormat}
                  onChange={(e) => { setFormat(e.target.value as Format); setResult(null); }}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm"
                >
                  {(Object.keys(FORMATS) as Format[]).map((k) => (
                    <option key={k} value={k} disabled={circle && k === "jpeg"}>{FORMATS[k].label}</option>
                  ))}
                </select>
              </label>
              {outFormat !== "png" && (
                <label className="block">
                  <span className="block text-xs font-medium text-gray-600 mb-1">Quality {quality}%</span>
                  <input type="range" min={10} max={100} value={quality} onChange={(e) => { setQuality(Number(e.target.value)); setResult(null); }} className="w-full accent-[#058554] mt-2" />
                </label>
              )}
            </div>

            <button
              onClick={exportCrop}
              disabled={busy}
              className="w-full px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium"
            >
              Crop image ({px.w} × {px.h})
            </button>
            {result && (
              <button
                onClick={() => downloadBlob(result.blob, result.name)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Download {result.name.split(".").pop()?.toUpperCase()} · {formatBytes(result.blob.size)}
              </button>
            )}
          </div>
        </div>
      )}

      <RelatedStrip />
      <ImageCropperSEO />
      <RelatedTools />
    </div>
  );
}
