"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  formatFileSize,
  calculateSavings,
  generateId,
  originalTypeOf,
  fallbackFormatOf,
  outputName,
  EXT,
  MAX_FILE_BYTES,
  PRESETS,
} from "./logic";
import type { ImageFile, CompressionSettings, CompressionPreset } from "./types";
import type { EngineJob, OutFormat } from "./engine";
import type { WorkerRequest, WorkerResponse } from "./compression.worker";
import { IMAGE_ACCEPT, isHeic, isImageFile, heicToBlob } from "@/lib/image-files";
import ImageCompressorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const DEFAULT_SETTINGS: CompressionSettings = {
  quality: 75,
  format: "original",
  resizeMode: "none",
  percent: 50,
  maxWidth: 0,
  maxHeight: 0,
  targetKB: 0,
};

const FORMATS: { value: CompressionSettings["format"]; label: string }[] = [
  { value: "original", label: "Same as input" },
  { value: "jpeg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

const TARGETS = [20, 50, 100, 200, 500, 1024];

/* Workers can compress only where OffscreenCanvas exists; elsewhere the same
   engine runs on the page. */
const workerSupported = () =>
  typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined" && "convertToBlob" in OffscreenCanvas.prototype;

type Notice = { id: string; text: string };

export default function ImageCompressorUI() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>(DEFAULT_SETTINGS);
  const [isDragging, setIsDragging] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [zipping, setZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const versionRef = useRef(0);
  const settingsRef = useRef(settings);
  const imagesRef = useRef(images);
  const inlineQueue = useRef<Promise<void>>(Promise.resolve());
  settingsRef.current = settings;
  imagesRef.current = images;

  const applyResult = useCallback((res: WorkerResponse) => {
    setImages((prev) =>
      prev.map((img) => {
        if (img.id !== res.id || img.version !== res.version) return img;
        if ("error" in res) return { ...img, status: "error", error: res.error };
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
        const r = res.result;
        return {
          ...img,
          status: "completed",
          error: undefined,
          compressedBlob: r.blob,
          compressedUrl: URL.createObjectURL(r.blob),
          compressedSize: r.blob.size,
          format: r.format,
          width: r.width,
          height: r.height,
          origWidth: r.origWidth,
          origHeight: r.origHeight,
          keptOriginal: r.keptOriginal,
          notes: r.notes,
        };
      })
    );
  }, []);

  const startWorker = useCallback(() => {
    workerRef.current?.terminate();
    if (!workerSupported()) {
      workerRef.current = null;
      return;
    }
    const w = new Worker(new URL("./compression.worker.ts", import.meta.url));
    w.onmessage = (e: MessageEvent<WorkerResponse>) => applyResult(e.data);
    workerRef.current = w;
  }, [applyResult]);

  useEffect(() => {
    startWorker();
    return () => workerRef.current?.terminate();
  }, [startWorker]);

  /* Sends images to the engine with the current settings */
  const runJobs = useCallback(
    (list: ImageFile[], version: number) => {
      const s = settingsRef.current;
      for (const img of list) {
        if (!img.source) continue;
        const job: EngineJob = {
          source: img.source,
          originalSize: img.originalSize,
          originalType: img.originalType,
          fallbackFormat: fallbackFormatOf(img.file),
          settings: {
            quality: s.quality,
            format: s.format,
            resizeMode: s.resizeMode,
            percent: s.percent,
            maxWidth: s.maxWidth,
            maxHeight: s.maxHeight,
            targetBytes: s.targetKB > 0 ? s.targetKB * 1024 : 0,
          },
        };
        if (workerRef.current) {
          workerRef.current.postMessage({ id: img.id, version, job } satisfies WorkerRequest);
        } else {
          inlineQueue.current = inlineQueue.current.then(async () => {
            if (version !== versionRef.current) return;
            const { compress } = await import("./engine");
            try {
              applyResult({ id: img.id, version, result: await compress(job) });
            } catch (err) {
              applyResult({ id: img.id, version, error: err instanceof Error ? err.message : "Compression failed" });
            }
          });
        }
      }
    },
    [applyResult]
  );

  /* Re-runs every image with new settings, cancelling work in progress */
  const recompressAll = useCallback(() => {
    const version = ++versionRef.current;
    startWorker();
    const ready = imagesRef.current.filter((i) => i.source);
    if (!ready.length) return;
    setImages((prev) => prev.map((i) => (i.source ? { ...i, status: "compressing", version, error: undefined } : i)));
    runJobs(ready.map((i) => ({ ...i, version })), version);
  }, [runJobs, startWorker]);

  // New settings apply to every image after a short pause
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!imagesRef.current.length) return;
    const t = setTimeout(recompressAll, 450);
    return () => clearTimeout(t);
  }, [settings, recompressAll]);

  const addNotice = (text: string) => setNotices((n) => [...n, { id: generateId(), text }]);

  const addFiles = useCallback(
    async (files: File[]) => {
      const accepted: ImageFile[] = [];
      for (const file of files) {
        if (!isImageFile(file)) {
          addNotice(`“${file.name}” is not an image, so it was skipped.`);
          continue;
        }
        if (/svg/i.test(file.type)) {
          addNotice(`“${file.name}” is an SVG (vector) file. Only photos and bitmap images can be compressed here.`);
          continue;
        }
        if (file.size > MAX_FILE_BYTES) {
          addNotice(`“${file.name}” is ${formatFileSize(file.size)}. The limit is ${MAX_FILE_BYTES / 1024 / 1024} MB per image.`);
          continue;
        }
        const heic = isHeic(file);
        accepted.push({
          id: generateId(),
          file,
          source: heic ? null : file,
          originalSize: file.size,
          originalUrl: heic ? "" : URL.createObjectURL(file),
          originalType: originalTypeOf(file),
          status: heic ? "preparing" : "compressing",
          version: versionRef.current,
        });
      }
      if (!accepted.length) return;
      setImages((prev) => [...prev, ...accepted]);
      runJobs(accepted.filter((i) => i.source), versionRef.current);

      for (const img of accepted.filter((i) => !i.source)) {
        try {
          const png = await heicToBlob(img.file);
          const version = versionRef.current;
          const ready = { ...img, source: png, originalUrl: URL.createObjectURL(png), status: "compressing" as const, version };
          setImages((prev) => prev.map((i) => (i.id === img.id ? ready : i)));
          runJobs([ready], version);
        } catch {
          setImages((prev) =>
            prev.map((i) =>
              i.id === img.id
                ? { ...i, status: "error", error: "Could not read this HEIC file. It may be damaged or use an unsupported variant." }
                : i
            )
          );
        }
      }
    },
    [runJobs]
  );

  // Paste images with Ctrl+V / ⌘V anywhere on the page
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;
      const files = Array.from(e.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"));
      if (!files.length) return;
      e.preventDefault();
      addFiles(files.map((f, i) => (f.name && f.name !== "image.png" ? f : new File([f], `pasted-image-${Date.now()}-${i + 1}.png`, { type: f.type }))));
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addFiles]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const update = (patch: Partial<CompressionSettings>) => setSettings((s) => ({ ...s, ...patch }));
  const applyPreset = (p: CompressionPreset) => update({ quality: PRESETS[p].quality, targetKB: 0 });

  const downloadImage = (img: ImageFile) => {
    if (!img.compressedUrl || !img.format) return;
    const a = document.createElement("a");
    a.href = img.compressedUrl;
    a.download = outputName(img.file, img.format);
    a.click();
  };

  const downloadAll = async () => {
    const done = images.filter((i) => i.status === "completed" && i.compressedBlob && i.format);
    if (done.length === 1) return downloadImage(done[0]);
    if (!done.length) return;
    setZipping(true);
    try {
      const { zipSync } = await import("fflate");
      const used = new Set<string>();
      const entries: Record<string, Uint8Array> = {};
      for (const img of done) {
        let name = outputName(img.file, img.format!);
        for (let n = 2; used.has(name); n++) name = name.replace(/(-\d+)?(\.\w+)$/, `-${n}$2`);
        used.add(name);
        entries[name] = new Uint8Array(await img.compressedBlob!.arrayBuffer());
      }
      // Images are already compressed, so the ZIP only stores them
      const zip = zipSync(entries, { level: 0 });
      const url = URL.createObjectURL(new Blob([zip as BlobPart], { type: "application/zip" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "compressed-images.zip";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } finally {
      setZipping(false);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
    if (compareId === id) setCompareId(null);
  };

  const clearAll = () => {
    images.forEach((img) => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    versionRef.current++;
    startWorker();
    setImages([]);
    setCompareId(null);
  };

  const done = images.filter((i) => i.status === "completed");
  const busy = images.some((i) => i.status === "compressing" || i.status === "preparing");
  const totalOriginal = done.reduce((s, i) => s + i.originalSize, 0);
  const totalCompressed = done.reduce((s, i) => s + (i.compressedSize ?? 0), 0);
  const compareImg = images.find((i) => i.id === compareId && i.status === "completed") ?? null;
  const targetActive = settings.targetKB > 0;
  const pngOut = settings.format === "png";

  const chip = (active: boolean) =>
    `px-3 py-1.5 text-sm font-semibold rounded-lg border transition-colors ${
      active ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"
    }`;

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
        {/* Upload */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Add images to compress"
          className={`relative border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
            images.length ? "p-6" : "p-10 sm:p-12"
          } ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary hover:bg-gray-50"}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={IMAGE_ACCEPT}
            multiple
            onChange={(e) => {
              addFiles(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
            className="hidden"
          />
          <div className={images.length ? "text-3xl mb-2" : "text-5xl mb-4"}>🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            {images.length ? "Add more images" : "Drop images here, click to choose, or paste"}
          </h3>
          <p className="text-sm text-gray-500">
            JPG, PNG, WebP, HEIC (iPhone), GIF, BMP and AVIF • up to {MAX_FILE_BYTES / 1024 / 1024} MB each • compressed as soon as you add them
          </p>
        </div>

        {notices.length > 0 && (
          <div className="mt-4 space-y-2" role="status">
            {notices.map((n) => (
              <div key={n.id} className="flex items-start justify-between gap-3 bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-lg px-3 py-2">
                <span>{n.text}</span>
                <button
                  type="button"
                  onClick={() => setNotices((all) => all.filter((x) => x.id !== n.id))}
                  className="shrink-0 text-amber-700 hover:text-amber-900 font-semibold"
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <fieldset>
              <legend className="block text-sm font-semibold text-gray-700 mb-2">Output format</legend>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map((f) => (
                  <button key={f.value} type="button" aria-pressed={settings.format === f.value} onClick={() => update({ format: f.value })} className={chip(settings.format === f.value)}>
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                WebP is usually the smallest. JPG works everywhere. PNG keeps transparency; transparent areas become white in JPG.
              </p>
            </fieldset>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="ic-quality" className="text-sm font-semibold text-gray-700">
                  Quality: {settings.quality}%
                </label>
                <div className="flex gap-1.5">
                  {(Object.keys(PRESETS) as CompressionPreset[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => applyPreset(p)}
                      aria-pressed={!targetActive && settings.quality === PRESETS[p].quality}
                      className={`px-2 py-1 text-xs font-semibold rounded-md border ${
                        !targetActive && settings.quality === PRESETS[p].quality
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary"
                      }`}
                    >
                      {PRESETS[p].label}
                    </button>
                  ))}
                </div>
              </div>
              <input
                id="ic-quality"
                type="range"
                min={10}
                max={100}
                value={settings.quality}
                onChange={(e) => update({ quality: parseInt(e.target.value, 10) })}
                disabled={targetActive}
                className="w-full accent-primary disabled:opacity-40"
              />
              <p className="text-xs text-gray-500 mt-1">
                {targetActive
                  ? "Quality is chosen automatically to meet the target size."
                  : pngOut || settings.format === "original"
                    ? "For PNG, lower quality keeps fewer colours (100% = lossless). For JPG and WebP it sets the compression level."
                    : "Lower quality gives smaller files. 70–85% looks the same as the original for most photos."}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="ic-target" className="block text-sm font-semibold text-gray-700 mb-2">
                Target file size <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="ic-target"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder="e.g. 100"
                  value={settings.targetKB || ""}
                  onChange={(e) => update({ targetKB: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                  className="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                />
                <span className="text-sm text-gray-600">KB or less</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2" role="group" aria-label="Common target sizes">
                {TARGETS.map((kb) => (
                  <button
                    key={kb}
                    type="button"
                    onClick={() => update({ targetKB: settings.targetKB === kb ? 0 : kb })}
                    aria-pressed={settings.targetKB === kb}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
                      settings.targetKB === kb ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"
                    }`}
                  >
                    {kb >= 1024 ? "1 MB" : `${kb} KB`}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                For forms and uploads with a size limit. The best quality that fits is used; if that is not enough, the image is made smaller and you are told by how much.
              </p>
            </div>

            <fieldset>
              <legend className="block text-sm font-semibold text-gray-700 mb-2">Resize</legend>
              <div className="flex flex-wrap gap-2">
                {([
                  ["none", "Keep size"],
                  ["percent", "By percentage"],
                  ["fit", "Max width / height"],
                ] as const).map(([v, label]) => (
                  <button key={v} type="button" aria-pressed={settings.resizeMode === v} onClick={() => update({ resizeMode: v })} className={chip(settings.resizeMode === v)}>
                    {label}
                  </button>
                ))}
              </div>
              {settings.resizeMode === "percent" && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {[75, 50, 25].map((p) => (
                    <button key={p} type="button" onClick={() => update({ percent: p })} aria-pressed={settings.percent === p} className={chip(settings.percent === p)}>
                      {p}%
                    </button>
                  ))}
                  <label className="flex items-center gap-1.5 text-sm text-gray-600">
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={settings.percent || ""}
                      onChange={(e) => update({ percent: Math.min(99, Math.max(0, parseInt(e.target.value, 10) || 0)) })}
                      aria-label="Resize percentage"
                      className="w-20 px-2 py-1.5 border border-gray-200 rounded-lg"
                    />
                    % of original
                  </label>
                </div>
              )}
              {settings.resizeMode === "fit" && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <label className="text-sm text-gray-600">
                    Max width (px)
                    <input
                      type="number"
                      min={1}
                      placeholder="Any"
                      value={settings.maxWidth || ""}
                      onChange={(e) => update({ maxWidth: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </label>
                  <label className="text-sm text-gray-600">
                    Max height (px)
                    <input
                      type="number"
                      min={1}
                      placeholder="Any"
                      value={settings.maxHeight || ""}
                      onChange={(e) => update({ maxHeight: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </label>
                  <p className="col-span-2 text-xs text-gray-500">The aspect ratio is kept, and images are never enlarged.</p>
                </div>
              )}
            </fieldset>
          </div>
        </div>

        {/* Summary */}
        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500">Original</div>
              <div className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{formatFileSize(totalOriginal)}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500">Compressed</div>
              <div className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{formatFileSize(totalCompressed)}</div>
            </div>
            <div className="bg-primary/5 rounded-xl p-3">
              <div className="text-xs text-gray-500">Saved</div>
              <div className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                {done.length ? `${Math.max(0, calculateSavings(totalOriginal, totalCompressed))}%` : "–"}
              </div>
            </div>
          </div>
        )}

        {/* Images */}
        {images.length > 0 && (
          <ul className="mt-4 space-y-3">
            {images.map((img) => {
              const saved = img.status === "completed" ? calculateSavings(img.originalSize, img.compressedSize ?? 0) : 0;
              return (
                <li key={img.id} className="flex flex-col sm:flex-row sm:items-center gap-3 border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-16 h-16 shrink-0 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                      {img.compressedUrl || img.originalUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img.compressedUrl || img.originalUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">🖼️</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate" title={img.file.name}>{img.file.name}</p>
                      <p className="text-sm text-gray-600 flex flex-wrap items-center gap-x-1.5">
                        <span>{formatFileSize(img.originalSize)}</span>
                        {img.status === "completed" && (
                          <>
                            <span aria-hidden="true">→</span>
                            <span className="font-semibold text-gray-900">{formatFileSize(img.compressedSize ?? 0)}</span>
                            {img.keptOriginal ? (
                              <span className="text-xs font-semibold text-gray-600 bg-gray-100 rounded px-1.5 py-0.5">already optimized</span>
                            ) : (
                              <span className={`text-xs font-semibold rounded px-1.5 py-0.5 ${saved > 0 ? "text-primary bg-primary/10" : "text-amber-800 bg-amber-100"}`}>
                                {saved > 0 ? `−${saved}%` : `+${Math.abs(saved)}%`}
                              </span>
                            )}
                          </>
                        )}
                        {(img.status === "compressing" || img.status === "preparing") && (
                          <span className="text-primary">{img.status === "preparing" ? "Reading HEIC…" : "Compressing…"}</span>
                        )}
                      </p>
                      {img.status === "completed" && img.format && (
                        <p className="text-xs text-gray-500">
                          {img.origWidth}×{img.origHeight}
                          {(img.width !== img.origWidth || img.height !== img.origHeight) && ` → ${img.width}×${img.height}`} px · {EXT[img.format as OutFormat].toUpperCase()}
                        </p>
                      )}
                      {img.notes?.map((n) => (
                        <p key={n} className="text-xs text-amber-700">{n}</p>
                      ))}
                      {img.status === "error" && <p className="text-xs text-red-600">{img.error}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2 sm:shrink-0">
                    {img.status === "completed" && (
                      <>
                        <button type="button" onClick={() => setCompareId(img.id)} className="px-3 py-2 text-sm font-semibold rounded-lg border border-gray-200 hover:border-primary text-gray-700">
                          Compare
                        </button>
                        <button type="button" onClick={() => downloadImage(img)} className="px-3 py-2 text-sm font-semibold rounded-lg bg-primary hover:bg-primary-hover text-white">
                          Download
                        </button>
                      </>
                    )}
                    <button type="button" onClick={() => removeImage(img.id)} className="px-3 py-2 text-sm font-semibold rounded-lg text-gray-500 hover:text-red-600" aria-label={`Remove ${img.file.name}`}>
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {images.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadAll}
              disabled={!done.length || zipping}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              📥 {zipping ? "Preparing ZIP…" : done.length > 1 ? `Download all (${done.length}) as ZIP` : "Download"}
            </button>
            <button
              type="button"
              onClick={recompressAll}
              disabled={busy}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-primary text-gray-700 disabled:opacity-40"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              🔄 Compress again
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              🗑️ Clear all
            </button>
          </div>
        )}
      </div>

      {compareImg && <CompareModal img={compareImg} onClose={() => setCompareId(null)} />}

      <RelatedStrip />
      <ImageCompressorSEOContent />

      <RelatedTools />
    </>
  );
}

/* Before/after view with a draggable divider and zoom */
function CompareModal({ img, onClose }: { img: ImageFile; onClose: () => void }) {
  const [pos, setPos] = useState(50);
  const [zoom, setZoom] = useState<"fit" | 1 | 2>("fit");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
      if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const w = img.origWidth ?? 0;
  const innerStyle = zoom === "fit" ? { width: "100%" } : { width: `${w * zoom}px` };
  const saved = calculateSavings(img.originalSize, img.compressedSize ?? 0);

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col" role="dialog" aria-modal="true" aria-label={`Compare ${img.file.name}`} onClick={onClose}>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-white text-sm" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate">{img.file.name}</p>
          <p className="text-gray-600">
            Original {formatFileSize(img.originalSize)} · Compressed {formatFileSize(img.compressedSize ?? 0)}
            {!img.keptOriginal && saved > 0 && ` (−${saved}%)`}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {(["fit", 1, 2] as const).map((z) => (
            <button
              key={String(z)}
              type="button"
              onClick={() => setZoom(z)}
              aria-pressed={zoom === z}
              className={`px-2.5 py-1.5 rounded-md font-semibold border ${zoom === z ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-700"}`}
            >
              {z === "fit" ? "Fit" : `${z * 100}%`}
            </button>
          ))}
          <button ref={closeRef} type="button" onClick={onClose} className="ml-2 px-3 py-1.5 rounded-md font-semibold bg-gray-900 text-white">
            Close
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
        <div
          className="relative mx-auto select-none cursor-ew-resize touch-pan-y"
          style={{ ...innerStyle, maxWidth: zoom === "fit" ? 1200 : "none" }}
          onPointerDown={(e) => {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            const r = e.currentTarget.getBoundingClientRect();
            setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
          }}
          onPointerMove={(e) => {
            if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
            const r = e.currentTarget.getBoundingClientRect();
            setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.compressedUrl} alt="Compressed" className="block w-full h-auto" draggable={false} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.originalUrl}
            alt="Original"
            className="absolute inset-0 block w-full h-full"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            draggable={false}
          />
          <div className="absolute inset-y-0 w-0.5 bg-white shadow pointer-events-none" style={{ left: `${pos}%` }} />
          <span className="absolute top-2 left-2 text-xs font-semibold bg-black/60 text-white rounded px-2 py-1">Original</span>
          <span className="absolute top-2 right-2 text-xs font-semibold bg-black/60 text-white rounded px-2 py-1">Compressed</span>
        </div>
      </div>
      <div className="px-4 py-3 bg-white" onClick={(e) => e.stopPropagation()}>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(parseInt(e.target.value, 10))}
          aria-label="Move the divider between original and compressed"
          className="w-full accent-primary"
        />
      </div>
    </div>
  );
}
