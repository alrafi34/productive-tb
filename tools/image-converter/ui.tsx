"use client";

import { useEffect, useRef, useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { IMAGE_ACCEPT, canEncode, downloadBlob, formatBytes, isImageFile } from "@/lib/image-files";
import { createZip } from "@/lib/zip";
import { OUTPUT_FORMATS, convertImage, inputFormatLabel, type OutputFormat } from "./logic";
import ImageConverterSEO from "./seo-content";

type Item = {
  id: string;
  file: File;
  status: "pending" | "working" | "done" | "error";
  result?: { blob: Blob; name: string; url: string; width: number; height: number };
  error?: string;
};

let nextId = 0;

export default function ImageConverterUI() {
  const [items, setItems] = useState<Item[]>([]);
  const [format, setFormat] = useState<OutputFormat>("jpeg");
  const [quality, setQuality] = useState(90);
  const [background, setBackground] = useState("#ffffff");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [webpOk] = useState(() => canEncode("image/webp"));
  const urls = useRef<string[]>([]);

  useEffect(() => {
    const list = urls.current;
    return () => list.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const addFiles = (files: File[]) => {
    const images = files.filter(isImageFile);
    setNotice(images.length < files.length ? `${files.length - images.length} file(s) skipped: not an image.` : "");
    if (!images.length) return;
    // A batch of JPGs most likely needs PNG; anything else most likely needs JPG
    if (!items.length) setFormat(images.every((f) => inputFormatLabel(f) === "JPG") ? "png" : "jpeg");
    setItems((prev) => [...prev, ...images.map((file) => ({ id: String(nextId++), file, status: "pending" as const }))]);
  };

  const convertAll = async () => {
    setBusy(true);
    const opts = { format, quality: quality / 100, background };
    for (const item of items) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: "working", error: undefined } : i)));
      try {
        const r = await convertImage(item.file, opts);
        const url = URL.createObjectURL(r.blob);
        urls.current.push(url);
        setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: "done", result: { ...r, url } } : i)));
      } catch (e) {
        const error = e instanceof Error ? e.message : "Conversion failed.";
        setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: "error", error } : i)));
      }
    }
    setBusy(false);
  };

  // Changing a setting makes earlier results stale
  const change = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setItems((prev) => prev.map((i) => (i.status === "done" || i.status === "error" ? { ...i, status: "pending", result: undefined, error: undefined } : i)));
  };

  const done = items.filter((i) => i.status === "done" && i.result);

  const downloadZip = async () => {
    const files = await Promise.all(
      done.map(async (i) => ({ name: i.result!.name, data: new Uint8Array(await i.result!.blob.arrayBuffer()) })),
    );
    downloadBlob(new Blob([createZip(files) as BlobPart], { type: "application/zip" }), "converted-images.zip");
  };

  const fmt = OUTPUT_FORMATS[format];

  return (
    <div className="max-w-5xl mx-auto">
      <FileDropZone
        accept={IMAGE_ACCEPT}
        multiple
        acceptPaste
        onFiles={addFiles}
        icon="🖼️"
        title={items.length ? "Add more images" : "Drop images here or click to browse"}
        hint="JPG, PNG, WebP, HEIC, GIF, BMP, AVIF · or paste with Ctrl+V · nothing is uploaded"
        compact={items.length > 0}
      />
      {notice && <p className="mt-3 text-sm text-amber-700">{notice}</p>}

      {items.length > 0 && (
        <>
          <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6 grid gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="ic-format" className="block text-sm font-medium text-gray-700 mb-2">Convert to</label>
              <select
                id="ic-format"
                value={format}
                onChange={(e) => change(setFormat)(e.target.value as OutputFormat)}
                disabled={busy}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554]"
              >
                {(Object.keys(OUTPUT_FORMATS) as OutputFormat[]).map((k) => (
                  <option key={k} value={k} disabled={k === "webp" && !webpOk}>
                    {OUTPUT_FORMATS[k].label}{k === "webp" && !webpOk ? " (not supported by this browser)" : ""}
                  </option>
                ))}
              </select>
            </div>
            {fmt.lossy && (
              <div>
                <label htmlFor="ic-quality" className="block text-sm font-medium text-gray-700 mb-2">Quality: {quality}%</label>
                <input id="ic-quality" type="range" min={10} max={100} value={quality} onChange={(e) => change(setQuality)(Number(e.target.value))} disabled={busy} className="w-full accent-[#058554]" />
                <p className="text-xs text-gray-500 mt-1">80–90% suits most photos</p>
              </div>
            )}
            {!fmt.alpha && (
              <div>
                <label htmlFor="ic-bg" className="block text-sm font-medium text-gray-700 mb-2">Fill transparent areas with</label>
                <div className="flex items-center gap-2">
                  <input id="ic-bg" type="color" value={background} onChange={(e) => change(setBackground)(e.target.value)} disabled={busy} className="h-10 w-14 rounded border border-gray-300" />
                  <span className="font-mono text-sm text-gray-600">{background}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={convertAll}
              disabled={busy || !items.some((i) => i.status === "pending")}
              className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium"
            >
              {busy ? "Converting…" : `Convert ${items.length} image${items.length > 1 ? "s" : ""} to ${fmt.label}`}
            </button>
            {done.length > 1 && (
              <button onClick={downloadZip} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Download all (ZIP)
              </button>
            )}
            <button
              onClick={() => setItems([])}
              disabled={busy}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium"
            >
              Clear
            </button>
          </div>

          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.file.name}</p>
                  <p className="text-sm text-gray-500">
                    {inputFormatLabel(item.file)} · {formatBytes(item.file.size)}
                    {item.result && (
                      <>
                        {" → "}
                        <span className="text-gray-800">{fmt.label} · {formatBytes(item.result.blob.size)}</span>
                        {" · "}
                        {item.result.width} × {item.result.height} px
                      </>
                    )}
                  </p>
                  {item.error && <p className="text-sm text-red-600 mt-1">{item.error}</p>}
                </div>
                {item.status === "working" && <span className="text-sm text-gray-500">Converting…</span>}
                {item.result && (
                  <button
                    onClick={() => downloadBlob(item.result!.blob, item.result!.name)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Download
                  </button>
                )}
                <button
                  onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                  disabled={busy}
                  aria-label={`Remove ${item.file.name}`}
                  className="text-gray-400 hover:text-red-600 disabled:opacity-50"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <RelatedStrip />
      <ImageConverterSEO />
      <RelatedTools />
    </div>
  );
}
