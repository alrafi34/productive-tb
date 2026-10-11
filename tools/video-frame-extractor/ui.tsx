"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MAX_BATCH,
  FPS_CHOICES,
  batchTimes,
  captureFrame,
  checkVideoFile,
  copyToClipboard,
  detectFps,
  disposeVideo,
  downloadBlob,
  formatBitrate,
  formatFileSize,
  formatTimecode,
  frameNumber,
  frameTime,
  makeHelperVideo,
  parseTimecode,
  readVideoInfo,
  resolutionLabel,
  seekTo,
  type BatchSettings,
  type ExtractedFrame,
  type OutputSettings,
  type VideoInfo,
} from "./logic";
import VideoFrameExtractorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

type Thumb = { time: number; url: string };
type Notice = { kind: "error" | "info"; text: string } | null;

const btn = "px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
const btnGrey = `${btn} bg-gray-100 hover:bg-gray-200 text-gray-700`;
const field = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary";

const baseNameOf = (name: string) =>
  name.replace(/\.[^.]+$/, "").replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "frame";

export default function VideoFrameExtractorUI() {
  const [info, setInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [detectedFps, setDetectedFps] = useState(0);
  const [fpsChoice, setFpsChoice] = useState(0); // 0 = detected
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [thumbs, setThumbs] = useState<Thumb[]>([]);
  const [frames, setFrames] = useState<ExtractedFrame[]>([]);
  const [notice, setNotice] = useState<Notice>(null);
  const [dragging, setDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [goTo, setGoTo] = useState("");
  const [output, setOutput] = useState<OutputSettings>({ format: "png", quality: 0.9, maxWidth: 0, maxHeight: 0 });
  const [batch, setBatch] = useState<BatchSettings>({ mode: "interval", interval: 1, count: 10, everyNth: 1, start: 0, end: 0 });
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [zipping, setZipping] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef(false);
  const loadToken = useRef(0);
  // Latest values for cleanup on unmount
  const live = useRef({ info, frames, thumbs });
  useEffect(() => { live.current = { info, frames, thumbs }; }, [info, frames, thumbs]);

  const fps = fpsChoice || detectedFps || 30;
  const baseName = info ? baseNameOf(info.fileName) : "frame";
  const busy = progress !== null;

  useEffect(() => () => {
    const { info: i, frames: f, thumbs: t } = live.current;
    if (i) URL.revokeObjectURL(i.url);
    f.forEach((x) => URL.revokeObjectURL(x.url));
    t.forEach((x) => URL.revokeObjectURL(x.url));
    cancelRef.current = true;
  }, []);

  const resetVideo = useCallback(() => {
    loadToken.current++;
    cancelRef.current = true;
    const { info: i, thumbs: t } = live.current;
    if (i) URL.revokeObjectURL(i.url);
    t.forEach((x) => URL.revokeObjectURL(x.url));
    setInfo(null);
    setThumbs([]);
    setDetectedFps(0);
    setFpsChoice(0);
    setCurrentTime(0);
    setPlaying(false);
    setGoTo("");
    setBatch((b) => ({ ...b, start: 0, end: 0 }));
  }, []);

  const makeThumbs = useCallback(async (v: VideoInfo, token: number) => {
    const helper = makeHelperVideo(v.url);
    const out: Thumb[] = [];
    try {
      const n = 12;
      for (let i = 0; i < n && token === loadToken.current; i++) {
        await seekTo(helper, ((i + 0.5) / n) * v.duration);
        const f = await captureFrame(helper, { format: "jpeg", quality: 0.6, maxWidth: 192, maxHeight: 108 }, "t", 30);
        if (token !== loadToken.current) { URL.revokeObjectURL(f.url); break; }
        out.push({ time: f.time, url: f.url });
        setThumbs([...out]);
      }
    } catch {
      // The strip is only a navigation aid; the tool works without it
    } finally {
      disposeVideo(helper);
    }
  }, []);

  const loadFile = useCallback(async (file: File) => {
    const problem = checkVideoFile(file);
    if (problem) { setNotice({ kind: "error", text: problem }); return; }
    resetVideo();
    const token = loadToken.current;
    setNotice(null);
    setLoading(true);
    try {
      const v = await readVideoInfo(file);
      if (token !== loadToken.current) { URL.revokeObjectURL(v.url); return; }
      setInfo(v);
      setLoading(false);
      const found = await detectFps(v.url);
      if (token !== loadToken.current) return;
      setDetectedFps(found);
      await makeThumbs(v, token);
    } catch (e) {
      if (token === loadToken.current) setNotice({ kind: "error", text: e instanceof Error ? e.message : "The video could not be opened." });
    } finally {
      if (token === loadToken.current) setLoading(false);
    }
  }, [resetVideo, makeThumbs]);

  const onFiles = (list: FileList | null) => {
    const file = list?.[0];
    if (file) loadFile(file);
  };

  // ---- Player ----
  const seekVisible = useCallback(async (t: number) => {
    const v = videoRef.current;
    if (!v || !info) return;
    v.pause();
    const target = Math.max(0, Math.min(t, info.duration));
    setCurrentTime(target);
    try { await seekTo(v, target); } catch { /* a later seek replaces this one */ }
  }, [info]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => setNotice({ kind: "error", text: "The video could not be played." }));
    else v.pause();
  }, []);

  const stepFrames = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    seekVisible(frameTime(frameNumber(v.currentTime, fps) + delta, fps));
  }, [fps, seekVisible]);

  const stepSeconds = useCallback((delta: number) => {
    const v = videoRef.current;
    if (v) seekVisible(v.currentTime + delta);
  }, [seekVisible]);

  const submitGoTo = (e: React.FormEvent) => {
    e.preventDefault();
    const t = parseTimecode(goTo);
    if (!Number.isFinite(t) || !info) { setNotice({ kind: "error", text: "Enter a time like 83.5, 1:23.5 or 0:01:23.500." }); return; }
    if (t > info.duration) { setNotice({ kind: "error", text: `The video is ${formatTimecode(info.duration)} long.` }); return; }
    setNotice(null);
    seekVisible(t);
  };

  // ---- Frames ----
  const addFrames = (list: ExtractedFrame[]) =>
    setFrames((prev) => [...prev, ...list].sort((a, b) => a.time - b.time));

  const extractCurrent = useCallback(async () => {
    const v = videoRef.current;
    if (!v || !info) return;
    try {
      if (v.seeking) await new Promise((r) => v.addEventListener("seeked", r, { once: true }));
      addFrames([await captureFrame(v, output, baseName, fps)]);
      setNotice(null);
    } catch (e) {
      setNotice({ kind: "error", text: e instanceof Error ? e.message : "The frame could not be saved." });
    }
  }, [info, output, baseName, fps]);

  const plannedTimes = useMemo(() => (info ? batchTimes(batch, info.duration, fps) : []), [info, batch, fps]);
  const tooMany = plannedTimes.length > MAX_BATCH;

  const runBatch = async () => {
    if (!info || !plannedTimes.length || tooMany) return;
    cancelRef.current = false;
    setNotice(null);
    setProgress({ done: 0, total: plannedTimes.length });
    const helper = makeHelperVideo(info.url);
    const got: ExtractedFrame[] = [];
    let failed = 0;
    try {
      for (let i = 0; i < plannedTimes.length && !cancelRef.current; i++) {
        try {
          await seekTo(helper, plannedTimes[i]);
          got.push(await captureFrame(helper, output, baseName, fps));
        } catch (e) {
          failed++;
          if (got.length === 0 && failed >= 3) throw e;
        }
        setProgress({ done: i + 1, total: plannedTimes.length });
      }
      if (failed) setNotice({ kind: "info", text: `${failed} of ${plannedTimes.length} frames could not be read and were skipped.` });
      else if (cancelRef.current && live.current.info?.url === info.url) setNotice({ kind: "info", text: `Stopped after ${got.length} frames.` });
    } catch (e) {
      setNotice({ kind: "error", text: e instanceof Error ? e.message : "The frames could not be extracted." });
    } finally {
      disposeVideo(helper);
      if (live.current.info?.url === info.url) addFrames(got);
      else got.forEach((f) => URL.revokeObjectURL(f.url));
      setProgress(null);
    }
  };

  const removeFrame = (id: string) =>
    setFrames((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f) URL.revokeObjectURL(f.url);
      return prev.filter((x) => x.id !== id);
    });

  const clearFrames = () => {
    frames.forEach((f) => URL.revokeObjectURL(f.url));
    setFrames([]);
  };

  const copyFrame = async (f: ExtractedFrame) => {
    try {
      await copyToClipboard(f);
      setCopiedId(f.id);
      setTimeout(() => setCopiedId((id) => (id === f.id ? null : id)), 2000);
    } catch (e) {
      setNotice({ kind: "error", text: e instanceof Error && e.message !== "copy" ? e.message : "The image could not be copied. Use Download instead." });
    }
  };

  const downloadAll = async () => {
    if (frames.length === 1) return downloadBlob(frames[0].blob, frames[0].name);
    setZipping(true);
    try {
      const { zipSync } = await import("fflate");
      const entries: Record<string, Uint8Array> = {};
      for (const f of frames) {
        let name = f.name;
        for (let n = 2; entries[name]; n++) name = f.name.replace(/(\.\w+)$/, `-${n}$1`);
        entries[name] = new Uint8Array(await f.blob.arrayBuffer());
      }
      // Images are already compressed, so the ZIP only stores them
      const zip = zipSync(entries, { level: 0 });
      downloadBlob(new Blob([zip as BlobPart], { type: "application/zip" }), `${baseName}-frames.zip`);
    } catch {
      setNotice({ kind: "error", text: "The ZIP file could not be created. Try downloading fewer frames at once." });
    } finally {
      setZipping(false);
    }
  };

  // ---- Keyboard: only when not typing and no dialog is open ----
  useEffect(() => {
    if (!info) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, button, a, [contenteditable=true], [role=dialog]")) return;
      const map: Record<string, () => void> = {
        " ": togglePlay, k: togglePlay,
        ArrowLeft: () => stepFrames(-1), ",": () => stepFrames(-1),
        ArrowRight: () => stepFrames(1), ".": () => stepFrames(1),
        j: () => stepSeconds(-1), l: () => stepSeconds(1),
        s: extractCurrent, Enter: extractCurrent,
      };
      const fn = map[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (!fn) return;
      e.preventDefault();
      fn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [info, togglePlay, stepFrames, stepSeconds, extractCurrent]);

  const updateBatch = (patch: Partial<BatchSettings>) => setBatch((b) => ({ ...b, ...patch }));
  const num = (s: string) => { const n = parseFloat(s); return Number.isFinite(n) && n >= 0 ? n : 0; };

  return (
    <div className="max-w-6xl mx-auto">
      {!info && (
        <div
          role="button"
          tabIndex={0}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragging ? "border-primary bg-green-50" : "border-gray-300 hover:border-primary bg-white"
          }`}
          onDrop={(e) => { e.preventDefault(); setDragging(false); onFiles(e.dataTransfer.files); }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
        >
          <div className="text-5xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{loading ? "Opening video…" : "Choose a video"}</h3>
          <p className="text-gray-600 mb-2">Drop a video here or click to choose one</p>
          <p className="text-sm text-gray-500">MP4, WebM, MOV, MKV, OGG and 3GP • any length</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,.mkv,.mov,.m4v,.webm,.3gp"
        onChange={(e) => { onFiles(e.target.files); e.target.value = ""; }}
        className="hidden"
      />

      {notice && (
        <div
          role={notice.kind === "error" ? "alert" : "status"}
          className={`mt-4 rounded-xl p-4 text-sm flex items-start justify-between gap-3 ${
            notice.kind === "error" ? "bg-red-50 border border-red-200 text-red-800" : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          <span>{notice.text}</span>
          <button onClick={() => setNotice(null)} aria-label="Dismiss" className="shrink-0 font-bold">✕</button>
        </div>
      )}

      {info && (
        <div className="space-y-6">
          {/* Player */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-800 truncate">{info.fileName}</h3>
                <p className="text-xs text-gray-500">
                  {resolutionLabel(info.width, info.height)} • {detectedFps ? `${detectedFps} fps` : "frame rate unknown"} • {formatTimecode(info.duration)} • {formatFileSize(info.fileSize)}
                  {info.duration > 0 && ` • ${formatBitrate((info.fileSize * 8) / info.duration)}`}
                </p>
              </div>
              <button onClick={() => fileInputRef.current?.click()} className={btnGrey}>Change video</button>
            </div>

            <div className="bg-black rounded-lg overflow-hidden flex justify-center">
              <video
                ref={videoRef}
                src={info.url}
                preload="auto"
                playsInline
                className="w-full max-h-[60vh] object-contain"
                onClick={togglePlay}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onSeeked={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onError={() => setNotice({ kind: "error", text: "This browser cannot play this video. Convert it to MP4 (H.264) or WebM, or try another browser." })}
              />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className={`${btnGrey} w-12`}>
                {playing ? "❚❚" : "▶"}
              </button>
              <input
                type="range"
                min={0}
                max={info.duration}
                step="any"
                value={Math.min(currentTime, info.duration)}
                onChange={(e) => seekVisible(parseFloat(e.target.value))}
                aria-label="Position in video"
                className="flex-1 accent-primary h-2 cursor-pointer"
              />
            </div>
            <p className="mt-2 text-sm text-gray-700 font-mono">
              {formatTimecode(currentTime)} / {formatTimecode(info.duration)} · frame {frameNumber(currentTime, fps)}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button onClick={() => stepSeconds(-1)} className={btnGrey} title="J">−1 s</button>
              <button onClick={() => stepFrames(-1)} className={btnGrey} title="← or ,">◀ Frame</button>
              <button onClick={() => stepFrames(1)} className={btnGrey} title="→ or .">Frame ▶</button>
              <button onClick={() => stepSeconds(1)} className={btnGrey} title="L">+1 s</button>
              <form onSubmit={submitGoTo} className="flex items-center gap-1">
                <input
                  value={goTo}
                  onChange={(e) => setGoTo(e.target.value)}
                  placeholder="1:23.500"
                  aria-label="Go to time"
                  className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className={btnGrey}>Go</button>
              </form>
              <button onClick={extractCurrent} disabled={busy} className={`${btn} ml-auto bg-primary hover:bg-primary-hover text-white px-5`}>
                📸 Save this frame
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Shortcuts: Space play/pause • ← → one frame • J / L one second • S or Enter save frame
            </p>

            {thumbs.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {thumbs.map((t) => (
                  <button key={t.url} onClick={() => seekVisible(t.time)} className="shrink-0 text-center group" title={`Go to ${formatTimecode(t.time)}`}>
                    <img src={t.url} alt="" className="w-24 h-14 object-cover rounded border border-gray-200 group-hover:border-primary" />
                    <span className="block text-[11px] text-gray-500 mt-0.5">{formatTimecode(t.time).replace(/\.\d+$/, "")}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Output settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Image settings</h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium text-gray-700">
                  Format
                  <select value={output.format} onChange={(e) => setOutput((o) => ({ ...o, format: e.target.value as OutputSettings["format"] }))} className={`${field} mt-1`}>
                    <option value="png">PNG (lossless)</option>
                    <option value="jpeg">JPG (smaller)</option>
                    <option value="webp">WebP (smallest)</option>
                  </select>
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Frame rate
                  <select value={fpsChoice} onChange={(e) => setFpsChoice(parseFloat(e.target.value))} className={`${field} mt-1`}>
                    <option value={0}>{detectedFps ? `Detected (${detectedFps})` : "Unknown (30)"}</option>
                    {FPS_CHOICES.map((f) => <option key={f} value={f}>{f} fps</option>)}
                  </select>
                </label>
              </div>
              {output.format !== "png" && (
                <label className="block text-sm font-medium text-gray-700">
                  Quality: {Math.round(output.quality * 100)}%
                  <input type="range" min={0.4} max={1} step={0.05} value={output.quality} onChange={(e) => setOutput((o) => ({ ...o, quality: parseFloat(e.target.value) }))} className="w-full accent-primary mt-1" />
                </label>
              )}
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium text-gray-700">
                  Max width (px)
                  <input type="number" min={0} inputMode="numeric" placeholder={`${info.width} (original)`} value={output.maxWidth || ""} onChange={(e) => setOutput((o) => ({ ...o, maxWidth: Math.floor(num(e.target.value)) }))} className={`${field} mt-1`} />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Max height (px)
                  <input type="number" min={0} inputMode="numeric" placeholder={`${info.height} (original)`} value={output.maxHeight || ""} onChange={(e) => setOutput((o) => ({ ...o, maxHeight: Math.floor(num(e.target.value)) }))} className={`${field} mt-1`} />
                </label>
              </div>
              <p className="text-xs text-gray-500">Frames keep the video&apos;s shape. Leave the size empty for full resolution.</p>
            </div>

            {/* Batch */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Extract many frames</h3>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="How to pick frames">
                {([["interval", "Every N seconds"], ["count", "Number of frames"], ["frames", "Every Nth frame"]] as const).map(([m, label]) => (
                  <button
                    key={m}
                    role="radio"
                    aria-checked={batch.mode === m}
                    onClick={() => updateBatch({ mode: m })}
                    className={`${btn} border ${batch.mode === m ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {batch.mode === "interval" && (
                <label className="block text-sm font-medium text-gray-700">
                  One frame every (seconds)
                  <input type="number" min={0.01} step="any" value={batch.interval || ""} onChange={(e) => updateBatch({ interval: num(e.target.value) })} className={`${field} mt-1`} />
                </label>
              )}
              {batch.mode === "count" && (
                <label className="block text-sm font-medium text-gray-700">
                  Number of evenly spaced frames
                  <input type="number" min={1} max={MAX_BATCH} value={batch.count || ""} onChange={(e) => updateBatch({ count: Math.floor(num(e.target.value)) })} className={`${field} mt-1`} />
                </label>
              )}
              {batch.mode === "frames" && (
                <label className="block text-sm font-medium text-gray-700">
                  Keep every Nth frame (1 = every frame)
                  <input type="number" min={1} value={batch.everyNth || ""} onChange={(e) => updateBatch({ everyNth: Math.floor(num(e.target.value)) })} className={`${field} mt-1`} />
                </label>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-sm font-medium text-gray-700">
                  <label htmlFor="vfe-start">From</label>
                  <input id="vfe-start" type="number" min={0} step="any" value={batch.start || ""} placeholder="0 (start)" onChange={(e) => updateBatch({ start: num(e.target.value) })} className={`${field} mt-1`} />
                  <button onClick={() => updateBatch({ start: +currentTime.toFixed(3) })} className="mt-1 text-xs text-primary font-semibold hover:underline">Use current time</button>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  <label htmlFor="vfe-end">To (seconds)</label>
                  <input id="vfe-end" type="number" min={0} step="any" value={batch.end || ""} placeholder={`${info.duration.toFixed(1)} (end)`} onChange={(e) => updateBatch({ end: num(e.target.value) })} className={`${field} mt-1`} />
                  <button onClick={() => updateBatch({ end: +currentTime.toFixed(3) })} className="mt-1 text-xs text-primary font-semibold hover:underline">Use current time</button>
                </div>
              </div>

              {progress ? (
                <div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(progress.done / progress.total) * 100}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <span>{progress.done} of {progress.total} frames</span>
                    <button onClick={() => { cancelRef.current = true; }} className={`${btn} bg-red-100 hover:bg-red-200 text-red-700`}>Stop</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={`text-sm ${tooMany ? "text-red-700" : "text-gray-600"}`}>
                    {tooMany
                      ? `That is more than ${MAX_BATCH} frames. Use a longer interval or a shorter range.`
                      : plannedTimes.length
                        ? `${plannedTimes.length} frame${plannedTimes.length === 1 ? "" : "s"} will be saved.`
                        : "Check the settings: no frames fall in this range."}
                  </p>
                  <button onClick={runBatch} disabled={!plannedTimes.length || tooMany} className={`${btn} w-full py-3 bg-primary hover:bg-primary-hover text-white`}>
                    Extract {tooMany ? "" : plannedTimes.length || ""} frames
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          {frames.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Saved frames ({frames.length}) <span className="text-sm font-normal text-gray-500">• {formatFileSize(frames.reduce((s, f) => s + f.blob.size, 0))}</span>
                </h3>
                <div className="flex gap-2">
                  <button onClick={downloadAll} disabled={zipping || busy} className={`${btn} bg-primary hover:bg-primary-hover text-white`}>
                    {zipping ? "Creating ZIP…" : frames.length === 1 ? "Download" : "Download all (ZIP)"}
                  </button>
                  <button onClick={clearFrames} disabled={busy} className={`${btn} bg-red-100 hover:bg-red-200 text-red-700`}>Clear all</button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {frames.map((f) => (
                  <div key={f.id} className="relative border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => f.source === info.url && seekVisible(f.time)} className="block w-full bg-gray-900" title={f.source === info.url ? "Show in player" : f.name}>
                      <img src={f.url} alt={`Frame at ${formatTimecode(f.time)}`} className="w-full aspect-video object-contain" />
                    </button>
                    <button onClick={() => removeFrame(f.id)} aria-label="Remove frame" className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 hover:bg-red-600 text-white text-xs font-bold">✕</button>
                    <div className="p-2">
                      <p className="text-xs text-gray-600 font-mono">{formatTimecode(f.time)} · f{f.frameNo}</p>
                      <p className="text-xs text-gray-500">{f.width} × {f.height} • {f.format === "jpeg" ? "JPG" : f.format.toUpperCase()} • {formatFileSize(f.blob.size)}</p>
                      <div className="mt-2 flex gap-1">
                        <button onClick={() => downloadBlob(f.blob, f.name)} className={`${btn} flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700`}>Download</button>
                        <button onClick={() => copyFrame(f)} className={`${btn} flex-1 px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700`}>
                          {copiedId === f.id ? "Copied ✓" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <RelatedStrip />
      <VideoFrameExtractorSEOContent />

      <RelatedTools />
    </div>
  );
}
