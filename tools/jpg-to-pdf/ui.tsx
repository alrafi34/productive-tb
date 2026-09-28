"use client";

import { useEffect, useRef, useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { IMAGE_ACCEPT, downloadBlob, formatBytes, isHeic, isImageFile } from "@/lib/image-files";
import { PAPER_SIZES, guessPaperSize, type PaperSize } from "@/lib/paper";
import { MARGINS, imagesToPdf, type Margin, type Orientation, type PageSize } from "./logic";
import JpgToPdfSEO from "./seo-content";

type Item = { id: string; file: File; thumb: string | null };
let nextId = 0;

export default function JpgToPdfUI() {
  const [items, setItems] = useState<Item[]>([]);
  const [size, setSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("auto");
  const [margin, setMargin] = useState<Margin>("small");
  const [name, setName] = useState("images");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; pages: number } | null>(null);
  const thumbs = useRef<string[]>([]);

  // A4 or US Letter from the visitor's region, after hydration
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setSize(guessPaperSize()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const list = thumbs.current;
    return () => list.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const addFiles = (files: File[]) => {
    const images = files.filter(isImageFile);
    setError(images.length < files.length ? `${files.length - images.length} file(s) skipped: not an image.` : "");
    if (!images.length) return;
    if (!items.length) setName(images.length === 1 ? images[0].name.replace(/\.[^.]+$/, "") : "images");
    const added = images.map((file) => {
      // HEIC previews need decoding; browsers show the rest directly
      const thumb = isHeic(file) ? null : URL.createObjectURL(file);
      if (thumb) thumbs.current.push(thumb);
      return { id: String(nextId++), file, thumb };
    });
    setItems((prev) => [...prev, ...added]);
    setResult(null);
  };

  const move = (i: number, d: number) => {
    setItems((prev) => {
      const j = i + d;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setResult(null);
  };

  const sortByName = () => {
    setItems((prev) => [...prev].sort((a, b) => a.file.name.localeCompare(b.file.name, undefined, { numeric: true })));
    setResult(null);
  };

  const build = async () => {
    setBusy(true);
    setError("");
    try {
      const bytes = await imagesToPdf(items.map((i) => i.file), { size, orientation, margin }, name || "images");
      setResult({ blob: new Blob([bytes as BlobPart], { type: "application/pdf" }), pages: items.length });
    } catch (e) {
      setError(e instanceof Error ? `Could not create the PDF: ${e.message}` : "Could not create the PDF.");
    } finally {
      setBusy(false);
    }
  };

  const set = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setResult(null);
  };

  const select = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554]";

  return (
    <div className="max-w-5xl mx-auto">
      <FileDropZone
        accept={IMAGE_ACCEPT}
        multiple
        acceptPaste
        onFiles={addFiles}
        icon="📄"
        title={items.length ? "Add more images" : "Drop images here or click to browse"}
        hint="JPG, PNG, WebP, HEIC, GIF, BMP, AVIF · one image per page · nothing is uploaded"
        compact={items.length > 0}
      />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {items.length > 0 && (
        <>
          <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">Page size</span>
              <select value={size} onChange={(e) => set(setSize)(e.target.value as PageSize)} className={select}>
                {(Object.keys(PAPER_SIZES) as PaperSize[]).map((k) => (
                  <option key={k} value={k}>{PAPER_SIZES[k].label}</option>
                ))}
                <option value="image">Same as each image</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">Orientation</span>
              <select value={orientation} onChange={(e) => set(setOrientation)(e.target.value as Orientation)} disabled={size === "image"} className={`${select} disabled:bg-gray-100`}>
                <option value="auto">Auto (match each image)</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">Margin</span>
              <select value={margin} onChange={(e) => set(setMargin)(e.target.value as Margin)} className={select}>
                {(Object.keys(MARGINS) as Margin[]).map((k) => (
                  <option key={k} value={k}>{MARGINS[k].label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">File name</span>
              <div className="flex items-center gap-1">
                <input value={name} onChange={(e) => set(setName)(e.target.value)} className={select} />
                <span className="text-sm text-gray-500">.pdf</span>
              </div>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={build} disabled={busy} className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium">
              {busy ? "Creating PDF…" : `Create PDF (${items.length} page${items.length > 1 ? "s" : ""})`}
            </button>
            {result && (
              <button
                onClick={() => downloadBlob(result.blob, `${(name || "images").replace(/[\\/:*?"<>|]/g, "_")}.pdf`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Download PDF · {formatBytes(result.blob.size)}
              </button>
            )}
            {items.length > 1 && (
              <button onClick={sortByName} disabled={busy} className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Sort by file name
              </button>
            )}
            <button onClick={() => { setItems([]); setResult(null); }} disabled={busy} className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Clear
            </button>
          </div>

          <ol className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, i) => (
              <li key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                <div className="aspect-[3/4] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                  {item.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumb} alt={`Page ${i + 1}`} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-xs text-gray-400">HEIC · preview after conversion</span>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-800 truncate">{i + 1}. {item.file.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(item.file.size)}</p>
                <div className="mt-2 flex gap-1">
                  <button onClick={() => move(i, -1)} disabled={busy || i === 0} aria-label="Move earlier" className="flex-1 py-1 border border-gray-200 rounded text-sm disabled:opacity-30">←</button>
                  <button onClick={() => move(i, 1)} disabled={busy || i === items.length - 1} aria-label="Move later" className="flex-1 py-1 border border-gray-200 rounded text-sm disabled:opacity-30">→</button>
                  <button
                    onClick={() => { setItems((prev) => prev.filter((x) => x.id !== item.id)); setResult(null); }}
                    disabled={busy}
                    aria-label={`Remove ${item.file.name}`}
                    className="flex-1 py-1 border border-gray-200 rounded text-sm text-red-600 disabled:opacity-30"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      <RelatedStrip />
      <JpgToPdfSEO />
      <RelatedTools />
    </div>
  );
}
