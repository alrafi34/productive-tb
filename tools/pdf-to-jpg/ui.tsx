"use client";

import { useEffect, useRef, useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import PdfPasswordPrompt from "@/components/PdfPasswordPrompt";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { downloadBlob, formatBytes } from "@/lib/image-files";
import { isPdfFile, parsePageList, PdfPasswordError } from "@/lib/pdf-pages";
import { createZip } from "@/lib/zip";
import { imageName, openPdf, renderPage, RESOLUTIONS, type ImageFormat, type OpenPdf } from "./logic";
import PdfToJpgSEO from "./seo-content";

type Source = { name: string; size: number; bytes: Uint8Array; pageCount: number };
type Locked = { name: string; size: number; bytes: Uint8Array; wrong: boolean };
type Output = { name: string; page: number; blob: Blob; url: string; width: number; height: number };

export default function PdfToJpgUI() {
  const [src, setSrc] = useState<Source | null>(null);
  const [locked, setLocked] = useState<Locked | null>(null);
  const [format, setFormat] = useState<ImageFormat>("jpeg");
  const [dpi, setDpi] = useState(150);
  const [quality, setQuality] = useState(90);
  const [pages, setPages] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const doc = useRef<OpenPdf | null>(null);
  const urls = useRef<string[]>([]);

  const clearOutputs = () => {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setOutputs([]);
  };

  useEffect(() => () => {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    void doc.current?.loadingTask.destroy();
  }, []);

  const open = async (file: { name: string; size: number; bytes: Uint8Array }, password?: string) => {
    setBusy(true);
    setError("");
    clearOutputs();
    try {
      await doc.current?.loadingTask.destroy();
      doc.current = null;
      const d = await openPdf(file.bytes, password);
      doc.current = d;
      setSrc({ name: file.name, size: file.size, bytes: file.bytes, pageCount: d.numPages });
      setLocked(null);
      setPages("");
    } catch (e) {
      setSrc(null);
      if (e instanceof PdfPasswordError) setLocked({ ...file, wrong: e.wrong });
      else {
        setLocked(null);
        setError(e instanceof Error ? e.message : "Could not read this PDF.");
      }
    } finally {
      setBusy(false);
    }
  };

  const load = async (files: File[]) => {
    const file = files[0];
    if (!file || !isPdfFile(file)) {
      setError("Please choose a PDF file.");
      return;
    }
    await open({ name: file.name, size: file.size, bytes: new Uint8Array(await file.arrayBuffer()) });
  };

  const parsed = src ? parsePageList(pages, src.pageCount) : null;

  const convert = async () => {
    if (!src || !doc.current || !parsed?.pages) return;
    setBusy(true);
    setError("");
    clearOutputs();
    const made: Output[] = [];
    try {
      for (let i = 0; i < parsed.pages.length; i++) {
        const p = parsed.pages[i];
        setProgress(`Page ${i + 1} of ${parsed.pages.length}`);
        const r = await renderPage(doc.current, p, { dpi, format, quality: quality / 100 });
        const url = URL.createObjectURL(r.thumb);
        urls.current.push(url);
        made.push({ name: imageName(src.name, p + 1, src.pageCount, format), page: p + 1, url, blob: r.blob, width: r.width, height: r.height });
        setOutputs([...made]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not convert this PDF.");
    } finally {
      setProgress("");
      setBusy(false);
    }
  };

  const downloadZip = async () => {
    if (!src) return;
    const files = await Promise.all(outputs.map(async (o) => ({ name: o.name, data: new Uint8Array(await o.blob.arrayBuffer()) })));
    downloadBlob(new Blob([createZip(files) as BlobPart], { type: "application/zip" }), `${src.name.replace(/\.pdf$/i, "")}-images.zip`);
  };

  const field = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554]";
  const total = outputs.reduce((s, o) => s + o.blob.size, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <FileDropZone
        accept="application/pdf,.pdf"
        onFiles={load}
        icon="🖼️"
        title={src ? "Open another PDF" : "Drop a PDF here or click to browse"}
        hint="Each page becomes a JPG or PNG · nothing is uploaded"
        compact={!!src}
      />
      {busy && !src && !locked && <p className="mt-3 text-sm text-gray-500">Reading PDF…</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {locked && (
        <div className="mt-3">
          <PdfPasswordPrompt key={locked.name} fileName={locked.name} wrong={locked.wrong} busy={busy} onUnlock={(pw) => open(locked, pw)} />
        </div>
      )}

      {src && (
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <p className="text-gray-800">
            <strong className="break-all">{src.name}</strong>
            <span className="text-gray-500"> · {src.pageCount} page{src.pageCount === 1 ? "" : "s"} · {formatBytes(src.size)}</span>
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm">
              <span className="block text-gray-700 mb-1 font-medium">Format</span>
              <select value={format} onChange={(e) => { setFormat(e.target.value as ImageFormat); clearOutputs(); }} className={field}>
                <option value="jpeg">JPG – smaller files</option>
                <option value="png">PNG – lossless, sharper text</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="block text-gray-700 mb-1 font-medium">Resolution</span>
              <select value={dpi} onChange={(e) => { setDpi(Number(e.target.value)); clearOutputs(); }} className={field}>
                {RESOLUTIONS.map((r) => <option key={r.dpi} value={r.dpi}>{r.label}</option>)}
              </select>
            </label>
            {format === "jpeg" && (
              <label className="block text-sm">
                <span className="block text-gray-700 mb-1 font-medium">JPG quality: {quality}%</span>
                <input type="range" min={50} max={100} step={5} value={quality} onChange={(e) => { setQuality(Number(e.target.value)); clearOutputs(); }} className="w-full accent-[#058554]" />
              </label>
            )}
            <label className="block text-sm">
              <span className="block text-gray-700 mb-1 font-medium">Pages</span>
              <input
                value={pages}
                onChange={(e) => { setPages(e.target.value); clearOutputs(); }}
                placeholder={`all (1-${src.pageCount}), or e.g. 1, 3-5`}
                className={`${field} ${parsed?.error ? "border-red-400" : ""}`}
              />
              {parsed?.error && <span className="block mt-1 text-red-600">{parsed.error}</span>}
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={convert}
              disabled={busy || !parsed?.pages}
              className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium"
            >
              {busy ? `Converting… ${progress}` : `Convert ${parsed?.pages?.length ?? 0} page${parsed?.pages?.length === 1 ? "" : "s"} to ${format === "png" ? "PNG" : "JPG"}`}
            </button>
            {outputs.length > 1 && !busy && (
              <button onClick={downloadZip} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Download all (ZIP) · {formatBytes(total)}
              </button>
            )}
          </div>

          {outputs.length > 0 && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {outputs.map((o) => (
                <li key={o.url} className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
                  <img src={o.url} alt={`Page ${o.page}`} loading="lazy" className="w-full h-32 object-contain bg-white rounded" />
                  <p className="mt-1 text-xs text-gray-600">Page {o.page} · {o.width}×{o.height} · {formatBytes(o.blob.size)}</p>
                  <button onClick={() => downloadBlob(o.blob, o.name)} className="mt-1 w-full px-2 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700">
                    Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <RelatedStrip />
      <PdfToJpgSEO />
      <RelatedTools />
    </div>
  );
}
