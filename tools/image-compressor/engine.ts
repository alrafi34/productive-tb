/* The compression engine. Runs in the worker (OffscreenCanvas) and, where a
   browser has no OffscreenCanvas in workers, on the page with a normal
   canvas. Takes a decodable image blob and the settings, returns the
   smallest result that meets them. */
import UPNG from "upng-js";

export type OutFormat = "jpeg" | "png" | "webp";

export type EngineSettings = {
  /* 10–100. For PNG it sets how many colours are kept (100 = lossless). */
  quality: number;
  format: "original" | OutFormat;
  resizeMode: "none" | "percent" | "fit";
  percent: number;
  maxWidth: number;
  maxHeight: number;
  /* 0 = off */
  targetBytes: number;
};

export type EngineJob = {
  /* Decodable image (HEIC is converted to PNG before it gets here) */
  source: Blob;
  /* The file the user added: its size and format decide "kept original" */
  originalSize: number;
  originalType: OutFormat | "other";
  /* Output format used for "original" when the source format cannot be
     written (HEIC, GIF, BMP, AVIF …) */
  fallbackFormat: OutFormat;
  settings: EngineSettings;
};

export type EngineResult = {
  blob: Blob;
  format: OutFormat;
  width: number;
  height: number;
  origWidth: number;
  origHeight: number;
  /* True when the original file is returned because nothing smaller was found */
  keptOriginal: boolean;
  notes: string[];
};

type AnyCanvas = OffscreenCanvas | HTMLCanvasElement;
type Ctx = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

function makeCanvas(w: number, h: number): AnyCanvas {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(w, h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function toBlob(canvas: AnyCanvas, type: string, quality?: number): Promise<Blob> {
  if ("convertToBlob" in canvas) return canvas.convertToBlob({ type, quality });
  return new Promise((resolve, reject) =>
    (canvas as HTMLCanvasElement).toBlob(
      (b) => (b ? resolve(b) : reject(new Error("The browser could not encode the image."))),
      type,
      quality
    )
  );
}

async function decode(blob: Blob): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(blob, { imageOrientation: "from-image" });
  } catch {
    // Older browsers reject the option; they still apply EXIF orientation
    return await createImageBitmap(blob);
  }
}

const MIME: Record<OutFormat, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

/* Colours kept for a PNG at a quality setting: 100 keeps every colour
   (lossless); lower settings keep fewer, which is what makes PNGs small. */
export function pngColours(quality: number): number {
  if (quality >= 100) return 0;
  return Math.max(16, Math.min(256, Math.round(16 + ((quality - 10) / 80) * 240)));
}

/* Minimum picture fidelity (PSNR, dB) a reduced-colour PNG must keep */
function minPsnr(quality: number): number {
  if (quality >= 90) return 40;
  if (quality >= 75) return 35;
  if (quality >= 60) return 32;
  return 29;
}

function psnr(original: Uint8ClampedArray, png: ArrayBuffer): number {
  const img = UPNG.decode(png);
  const out = new Uint8Array(UPNG.toRGBA8(img)[0]);
  let sum = 0;
  for (let i = 0; i < original.length; i += 4) {
    // Fully transparent pixels can hold any colour
    if (original[i + 3] === 0 && out[i + 3] === 0) continue;
    for (let c = 0; c < 4; c++) {
      const d = original[i + c] - out[i + c];
      sum += d * d;
    }
  }
  const mse = sum / original.length;
  return mse === 0 ? 99 : 10 * Math.log10((255 * 255) / mse);
}

function fitSize(w: number, h: number, s: EngineSettings): { w: number; h: number } {
  let tw = w;
  let th = h;
  if (s.resizeMode === "percent" && s.percent > 0 && s.percent < 100) {
    tw = w * (s.percent / 100);
    th = h * (s.percent / 100);
  } else if (s.resizeMode === "fit") {
    const rw = s.maxWidth > 0 ? s.maxWidth / w : Infinity;
    const rh = s.maxHeight > 0 ? s.maxHeight / h : Infinity;
    const r = Math.min(rw, rh, 1);
    tw = w * r;
    th = h * r;
  }
  return { w: Math.max(1, Math.round(tw)), h: Math.max(1, Math.round(th)) };
}

export async function compress(job: EngineJob): Promise<EngineResult> {
  const { settings: s } = job;
  const bitmap = await decode(job.source);
  const origWidth = bitmap.width;
  const origHeight = bitmap.height;
  const notes: string[] = [];

  const format: OutFormat =
    s.format !== "original" ? s.format : job.originalType === "other" ? job.fallbackFormat : job.originalType;

  // One canvas per size; JPEG has no transparency, so it gets a white backing
  const pixelsAt = (w: number, h: number): { canvas: AnyCanvas; ctx: Ctx } => {
    const canvas = makeCanvas(w, h);
    const ctx = canvas.getContext("2d") as Ctx | null;
    if (!ctx) throw new Error("The browser could not prepare the image.");
    if (format === "jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, w, h);
    return { canvas, ctx };
  };

  const encodeLossy = async (canvas: AnyCanvas, q: number): Promise<Blob> => {
    const b = await toBlob(canvas, MIME[format], q);
    if (b.type !== MIME[format]) throw new Error(`This browser cannot save ${format.toUpperCase()} files. Choose another output format.`);
    return b;
  };

  const encodePng = async (canvas: AnyCanvas, ctx: Ctx, colours: number): Promise<Blob> => {
    const { width: w, height: h } = canvas;
    const data = ctx.getImageData(0, 0, w, h).data;
    const rgba = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
    const candidates: Blob[] = [new Blob([UPNG.encode([rgba], w, h, colours)], { type: "image/png" })];
    if (colours === 0) candidates.push(await toBlob(canvas, "image/png"));
    return candidates.reduce((a, b) => (b.size < a.size ? b : a));
  };

  /* Fewer colours only while the picture still looks right: photos saved as
     PNG band badly when reduced, so they step up in colours or stay lossless */
  const encodePngChecked = async (canvas: AnyCanvas, ctx: Ctx, quality: number): Promise<Blob> => {
    const start = pngColours(quality);
    if (start === 0) return encodePng(canvas, ctx, 0);
    const original = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const needed = minPsnr(quality);
    for (const colours of [...new Set([start, Math.min(256, Math.round(start * 1.5)), 256])]) {
      const blob = await encodePng(canvas, ctx, colours);
      if (psnr(original, await blob.arrayBuffer()) >= needed) return blob;
    }
    notes.push("This PNG looks like a photo, so it was kept lossless. Choose JPG or WebP for a much smaller file.");
    return encodePng(canvas, ctx, 0);
  };

  let { w, h } = fitSize(origWidth, origHeight, s);
  const resizedByUser = w !== origWidth || h !== origHeight;
  let resizedForTarget = false;
  let result: Blob;

  try {
    if (s.targetBytes > 0) {
      // Largest picture that fits: best quality first, then smaller pixels
      let fitted: Blob | null = null;
      let smallest: Blob | null = null;
      for (let attempt = 0; attempt < 10 && !fitted; attempt++) {
        const { canvas, ctx } = pixelsAt(w, h);
        if (format === "png") {
          for (const c of [256, 192, 128, 96, 64, 48, 32, 24, 16, 8]) {
            const b = await encodePng(canvas, ctx, c);
            if (!smallest || b.size < smallest.size) smallest = b;
            if (b.size <= s.targetBytes) { fitted = b; break; }
          }
        } else {
          let lo = 0.05, hi = 0.95;
          const top = await encodeLossy(canvas, hi);
          if (top.size <= s.targetBytes) fitted = top;
          else {
            const bottom = await encodeLossy(canvas, lo);
            if (!smallest || bottom.size < smallest.size) smallest = bottom;
            if (bottom.size <= s.targetBytes) {
              fitted = bottom;
              for (let i = 0; i < 9; i++) {
                const mid = (lo + hi) / 2;
                const b = await encodeLossy(canvas, mid);
                if (b.size <= s.targetBytes) { fitted = b; lo = mid; } else hi = mid;
              }
            }
          }
        }
        if (!fitted) {
          const shrink = Math.min(0.85, Math.sqrt(s.targetBytes / (smallest?.size ?? s.targetBytes * 2)) * 0.95);
          const nw = Math.round(w * shrink), nh = Math.round(h * shrink);
          if (nw < 16 || nh < 16) break;
          w = nw; h = nh; resizedForTarget = true;
        }
      }
      if (!fitted) {
        const min = smallest ? Math.ceil(smallest.size / 1024) : 0;
        throw new Error(`Could not reach ${Math.round(s.targetBytes / 1024)} KB${min ? ` (smallest possible here is about ${min} KB)` : ""}. Try a larger target or another format.`);
      }
      result = fitted;
      if (resizedForTarget) notes.push(`Resized to ${w} × ${h} px to reach the target size.`);
    } else {
      const { canvas, ctx } = pixelsAt(w, h);
      result = format === "png" ? await encodePngChecked(canvas, ctx, s.quality) : await encodeLossy(canvas, s.quality / 100);
    }
  } finally {
    bitmap.close();
  }

  // Never hand back a bigger file in the same format and size
  const sameFormat = job.originalType === format;
  const sameSize = !resizedByUser && !resizedForTarget;
  if (sameFormat && sameSize && result.size >= job.originalSize && (s.targetBytes === 0 || job.originalSize <= s.targetBytes)) {
    return {
      blob: job.source, format, width: origWidth, height: origHeight, origWidth, origHeight,
      keptOriginal: true,
      notes: [...notes, "Already well optimized, so the original file was kept."],
    };
  }
  if (!sameFormat && result.size > job.originalSize) {
    notes.push(`Larger than the original in ${format.toUpperCase()}. Try another output format for a smaller file.`);
  }
  return { blob: result, format, width: w, height: h, origWidth, origHeight, keptOriginal: false, notes };
}
