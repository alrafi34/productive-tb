export type FrameFormat = "png" | "jpeg" | "webp";

export interface VideoInfo {
  url: string;
  fileName: string;
  fileSize: number;
  duration: number;
  width: number;
  height: number;
}

export interface ExtractedFrame {
  id: string;
  time: number;
  blob: Blob;
  url: string;
  width: number;
  height: number;
  format: FrameFormat;
  name: string;
  frameNo: number;
  /* The video it came from (its object URL) */
  source: string;
}

export interface OutputSettings {
  format: FrameFormat;
  /* 0.1–1, used for JPEG and WebP */
  quality: number;
  /* 0 = original */
  maxWidth: number;
  maxHeight: number;
}

export type BatchMode = "interval" | "count" | "frames";

export interface BatchSettings {
  mode: BatchMode;
  /* Seconds between frames ("interval") */
  interval: number;
  /* Total frames, evenly spaced ("count") */
  count: number;
  /* Every Nth video frame ("frames") */
  everyNth: number;
  start: number;
  /* 0 = end of video */
  end: number;
}

/* Frames held in memory at once; PNG frames of a 1080p video are 2–3 MB each */
export const MAX_BATCH = 300;

export const FPS_CHOICES = [23.976, 24, 25, 29.97, 30, 50, 59.94, 60];

/* Containers browsers cannot play, whatever the codec inside */
const UNPLAYABLE: Record<string, string> = {
  avi: "AVI", wmv: "WMV", flv: "FLV", f4v: "FLV", mpg: "MPEG", mpeg: "MPEG", vob: "VOB", m2ts: "M2TS", mts: "MTS", "3g2": "3G2",
};

const VIDEO_EXT = /\.(mp4|m4v|webm|ogv|ogg|mov|mkv|3gp)$/i;

export const fileExt = (name: string) => (name.match(/\.([a-z0-9]+)$/i)?.[1] ?? "").toLowerCase();

export function checkVideoFile(file: File): string | null {
  const ext = fileExt(file.name);
  if (UNPLAYABLE[ext]) {
    return `Browsers cannot play ${UNPLAYABLE[ext]} files. Convert “${file.name}” to MP4 (H.264) or WebM first, then add it again.`;
  }
  if (!file.type.startsWith("video/") && !VIDEO_EXT.test(file.name)) {
    return `“${file.name}” is not a video file. Add an MP4, WebM, MOV, MKV, OGG or 3GP video.`;
  }
  return null;
}

const once = (el: HTMLMediaElement, ok: string, ms: number, what: string) =>
  new Promise<void>((resolve, reject) => {
    const done = (fn: () => void) => () => {
      clearTimeout(timer);
      el.removeEventListener(ok, onOk);
      el.removeEventListener("error", onErr);
      fn();
    };
    const onOk = done(resolve);
    const onErr = done(() => reject(new Error(what)));
    const timer = setTimeout(done(() => reject(new Error(what))), ms);
    el.addEventListener(ok, onOk);
    el.addEventListener("error", onErr);
  });

/* A muted, off-screen video used for reading frames, so the visible player
   never jumps around. It stays in the page because some browsers stop
   decoding detached videos. */
export function makeHelperVideo(url: string): HTMLVideoElement {
  const v = document.createElement("video");
  v.muted = true;
  v.playsInline = true;
  v.preload = "auto";
  v.style.cssText = "position:fixed;left:-9999px;top:0;width:2px;height:2px;opacity:0;pointer-events:none";
  v.src = url;
  document.body.appendChild(v);
  return v;
}

export function disposeVideo(v: HTMLVideoElement | null) {
  if (!v) return;
  v.pause();
  v.removeAttribute("src");
  v.load();
  v.remove();
}

const CANT_PLAY = "This browser cannot play this video. It may use a codec such as HEVC (H.265) that the browser lacks. Convert it to MP4 (H.264) or WebM, or try another browser.";

export async function readVideoInfo(file: File): Promise<VideoInfo> {
  const url = URL.createObjectURL(file);
  const v = makeHelperVideo(url);
  try {
    if (v.readyState < 1) await once(v, "loadedmetadata", 20000, CANT_PLAY);
    let duration = v.duration;
    // Recordings made in the browser often carry no duration until the end is seeked
    if (!Number.isFinite(duration)) {
      v.currentTime = 1e9;
      await once(v, "durationchange", 10000, CANT_PLAY).catch(() => {});
      duration = Number.isFinite(v.duration) ? v.duration : v.currentTime;
    }
    if (!v.videoWidth || !v.videoHeight) throw new Error("This file has no picture track, or its video codec is not supported by this browser.");
    if (v.readyState < 2) await once(v, "loadeddata", 20000, CANT_PLAY);
    return { url, fileName: file.name, fileSize: file.size, duration, width: v.videoWidth, height: v.videoHeight };
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e instanceof Error && e.message ? e : new Error(CANT_PLAY);
  } finally {
    disposeVideo(v);
  }
}

type FrameMeta = { mediaTime: number; presentedFrames: number };
type RvfcVideo = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: (now: number, meta: FrameMeta) => void) => number;
};

/* Frame rate from the gaps between decoded frames during a short muted
   playback. Returns 0 when the browser cannot tell. */
export async function detectFps(url: string): Promise<number> {
  const v = makeHelperVideo(url) as RvfcVideo;
  try {
    if (!v.requestVideoFrameCallback) return 0;
    if (v.readyState < 2) await once(v, "loadeddata", 10000, "load");
    const times: number[] = [];
    await new Promise<void>((resolve) => {
      const stop = setTimeout(resolve, 2500);
      const onFrame = (_: number, meta: FrameMeta) => {
        times.push(meta.mediaTime);
        if (times.length >= 200) { clearTimeout(stop); resolve(); return; }
        v.requestVideoFrameCallback!(onFrame);
      };
      v.requestVideoFrameCallback!(onFrame);
      v.play().catch(() => { clearTimeout(stop); resolve(); });
    });
    const gaps = times.slice(1).map((t, i) => t - times[i]).filter((d) => d > 0.004).sort((a, b) => a - b);
    if (gaps.length < 4) return 0;
    // Gaps close to the smallest one are single frames (skipped frames give
    // longer gaps). Counting frames over the whole span is then exact enough
    // to tell 29.97 from 30.
    const single = gaps.filter((d) => d < gaps[0] * 1.5);
    const gap = single.reduce((a, b) => a + b, 0) / single.length;
    const span = times[times.length - 1] - times[0];
    const frames = gaps.reduce((n, d) => n + Math.round(d / gap), 0);
    const fps = frames / span;
    const near = FPS_CHOICES.reduce((best, f) => (Math.abs(f - fps) < Math.abs(best - fps) ? f : best));
    return Math.abs(near - fps) / near < 0.02 ? near : Math.round(fps * 100) / 100;
  } catch {
    return 0;
  } finally {
    disposeVideo(v);
  }
}

export async function seekTo(v: HTMLVideoElement, t: number): Promise<void> {
  // Seeking a video that has not loaded yet only sets where it will start
  if (v.readyState < 1) await once(v, "loadedmetadata", 20000, "The video could not be read.");
  const target = Math.max(0, Math.min(t, v.duration || t));
  if (Math.abs(v.currentTime - target) < 1e-6 && !v.seeking) {
    if (v.readyState < 2) await once(v, "loadeddata", 20000, "The frame could not be decoded.");
    return;
  }
  const seeked = once(v, "seeked", 15000, "The video could not jump to " + formatTimecode(target) + ".");
  v.currentTime = target;
  await seeked;
  if (v.readyState < 2) await once(v, "canplay", 5000, "The frame could not be decoded.").catch(() => {});
}

/* Keeps the picture's shape; 0 means no limit */
export function outputSize(w: number, h: number, maxW: number, maxH: number) {
  const r = Math.min(maxW > 0 ? maxW / w : 1, maxH > 0 ? maxH / h : 1, 1);
  return { width: Math.max(1, Math.round(w * r)), height: Math.max(1, Math.round(h * r)) };
}

let canvas: HTMLCanvasElement | null = null;

export async function captureFrame(v: HTMLVideoElement, s: OutputSettings, baseName: string, fps: number): Promise<ExtractedFrame> {
  if (v.readyState < 2 || !v.videoWidth) throw new Error("The video is still loading. Try again in a moment.");
  const time = v.currentTime;
  const { width, height } = outputSize(v.videoWidth, v.videoHeight, s.maxWidth, s.maxHeight);
  canvas ??= document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("The browser could not prepare the image.");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(v, 0, 0, width, height);
  const mime = `image/${s.format}`;
  const blob = await new Promise<Blob | null>((r) => canvas!.toBlob(r, mime, s.format === "png" ? undefined : s.quality));
  if (!blob) throw new Error("The browser could not save the frame.");
  if (blob.type !== mime) throw new Error(`This browser cannot save ${s.format.toUpperCase()} images. Choose PNG or JPG.`);
  return {
    id: Math.random().toString(36).slice(2, 11),
    time,
    blob,
    url: URL.createObjectURL(blob),
    width,
    height,
    format: s.format,
    name: frameName(baseName, time, fps, s.format),
    frameNo: frameNumber(time, fps),
    source: v.currentSrc || v.src,
  };
}

export function batchTimes(b: BatchSettings, duration: number, fps: number): number[] {
  const lastFrame = Math.max(0, duration - 0.5 / fps);
  const start = Math.min(Math.max(0, b.start), lastFrame);
  const end = b.end > 0 ? Math.min(b.end, lastFrame) : lastFrame;
  if (end < start) return [];
  const times: number[] = [];
  if (b.mode === "interval") {
    if (!(b.interval > 0)) return [];
    for (let t = start, i = 0; t <= end + 1e-9; t = start + ++i * b.interval) {
      times.push(t);
      if (times.length > MAX_BATCH) break;
    }
  } else if (b.mode === "count") {
    const n = Math.floor(b.count);
    if (!(n > 0)) return [];
    const span = end - start;
    for (let i = 0; i < Math.min(n, MAX_BATCH + 1); i++) times.push(n === 1 ? start + span / 2 : start + (span * i) / (n - 1));
  } else {
    const step = Math.floor(b.everyNth);
    if (!(step > 0)) return [];
    // Middle of each frame, so rounding never lands on its neighbour
    for (let f = Math.ceil(start * fps - 1e-6); (f + 0.5) / fps <= end + 0.5 / fps; f += step) {
      times.push((f + 0.5) / fps);
      if (times.length > MAX_BATCH) break;
    }
  }
  return times.map((t) => Math.min(t, lastFrame));
}

export const frameNumber = (t: number, fps: number) => Math.floor(t * fps + 1e-6);

/* Seconds for the middle of frame n */
export const frameTime = (n: number, fps: number) => (Math.max(0, n) + 0.5) / fps;

export function frameName(base: string, t: number, fps: number, format: FrameFormat) {
  const m = Math.floor(t / 60);
  const s = (t - m * 60).toFixed(3).padStart(6, "0");
  const ext = format === "jpeg" ? "jpg" : format;
  return `${base}-${String(m).padStart(2, "0")}m${s}s-f${String(frameNumber(t, fps)).padStart(5, "0")}.${ext}`;
}

export function formatTimecode(seconds: number): string {
  const t = Math.max(0, seconds);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = (t % 60).toFixed(3).padStart(6, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

/* "83.5", "1:23.5" or "0:01:23.5" → seconds; NaN when unreadable */
export function parseTimecode(text: string): number {
  const parts = text.trim().split(":");
  if (!text.trim() || parts.length > 3 || parts.some((p) => !/^\d+(\.\d+)?$/.test(p))) return NaN;
  return parts.reduce((acc, p) => acc * 60 + parseFloat(p), 0);
}

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
};

export const formatBitrate = (bps: number): string =>
  bps >= 1e6 ? `${(bps / 1e6).toFixed(1)} Mbps` : `${Math.round(bps / 1000)} Kbps`;

export const resolutionLabel = (w: number, h: number): string => {
  const short = Math.min(w, h);
  const tag = short >= 2160 ? "4K" : short >= 1440 ? "1440p" : short >= 1080 ? "1080p" : short >= 720 ? "720p" : short >= 480 ? "480p" : "";
  return tag ? `${w} × ${h} (${tag})` : `${w} × ${h}`;
};

/* The clipboard takes PNG only, so other formats are converted first */
export async function copyToClipboard(frame: ExtractedFrame): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error("This browser cannot copy images. Use Download instead.");
  }
  let blob = frame.blob;
  if (blob.type !== "image/png") {
    const bmp = await createImageBitmap(blob);
    const c = document.createElement("canvas");
    c.width = bmp.width;
    c.height = bmp.height;
    c.getContext("2d")!.drawImage(bmp, 0, 0);
    bmp.close();
    blob = await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("copy"))), "image/png"));
  }
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
