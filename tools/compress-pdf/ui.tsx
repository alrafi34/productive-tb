"use client";

import { useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { downloadBlob, formatBytes } from "@/lib/image-files";
import { isPdfFile } from "@/lib/pdf-pages";
import { compressPdf, LEVELS, type Level } from "./logic";
import CompressPdfSEO from "./seo-content";

type Item = {
  id: string;
  file: File;
  status: "waiting" | "working" | "done" | "error";
  progress?: string;
  result?: { blob: Blob; images: number; compressed: number; unchanged: boolean };
  error?: string;
};
let nextId = 0;

export default function CompressPdfUI() {
  const [items, setItems] = useState<Item[]>([]);
  const [level, setLevel] = useState<Level>("recommended");
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const update = (id: string, patch: Partial<Item>) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const addFiles = (files: File[]) => {
    const pdfs = files.filter(isPdfFile);
    const skipped = files.filter((f) => !isPdfFile(f)).map((f) => f.name);
    setError(skipped.length ? `Not a PDF: ${skipped.join(", ")}` : "");
    setItems((prev) => [...prev, ...pdfs.map((file) => ({ id: String(nextId++), file, status: "waiting" as const }))]);
  };

  const run = async () => {
    setBusy(true);
    for (const item of items) {
      if (item.status === "done") continue;
      update(item.id, { status: "working", progress: "Reading…", error: undefined });
      try {
        const bytes = new Uint8Array(await item.file.arrayBuffer());
        const r = await compressPdf(bytes, level, {
          removeMetadata,
          onProgress: (done, total) => update(item.id, { progress: total ? `Images ${done} of ${total}` : "Saving…" }),
        });
        update(item.id, {
          status: "done",
          result: {
            blob: new Blob([r.bytes as BlobPart], { type: "application/pdf" }),
            images: r.imagesFound,
            compressed: r.imagesCompressed,
            unchanged: r.unchanged,
          },
        });
      } catch (e) {
        update(item.id, { status: "error", error: e instanceof Error ? e.message : "Could not compress this file." });
      }
    }
    setBusy(false);
  };

  const changeLevel = (l: Level) => {
    setLevel(l);
    // A new level means the files have to be compressed again.
    setItems((prev) => prev.map((x) => ({ ...x, status: "waiting", result: undefined, error: undefined })));
  };

  const pending = items.some((i) => i.status !== "done");
  const totalBefore = items.reduce((s, i) => s + (i.result ? i.file.size : 0), 0);
  const totalAfter = items.reduce((s, i) => s + (i.result ? i.result.blob.size : 0), 0);

  return (
    <div className="max-w-4xl mx-auto">
      <FileDropZone
        accept="application/pdf,.pdf"
        multiple
        onFiles={addFiles}
        icon="🗜️"
        title={items.length ? "Add more PDFs" : "Drop PDF files here or click to browse"}
        hint="One or more PDFs · nothing is uploaded"
        compact={items.length > 0}
      />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-medium text-gray-700 mb-3">Compression</p>
        <div className="grid sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Compression level">
          {(Object.keys(LEVELS) as Level[]).map((l) => (
            <button
              key={l}
              role="radio"
              aria-checked={level === l}
              onClick={() => changeLevel(l)}
              disabled={busy}
              className={`text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                level === l ? "border-[#058554] bg-[#058554]/5" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="block font-semibold text-gray-900">{LEVELS[l].label}</span>
              <span className="block text-xs text-gray-500 mt-0.5">{LEVELS[l].hint}</span>
            </button>
          ))}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={removeMetadata} onChange={(e) => setRemoveMetadata(e.target.checked)} disabled={busy} className="w-4 h-4" />
          Remove document properties (title, author, software)
        </label>
      </div>

      {items.length > 0 && (
        <>
          <ul className="mt-5 space-y-3">
            {items.map((item) => {
              const r = item.result;
              const saved = r ? 1 - r.blob.size / item.file.size : 0;
              return (
                <li key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatBytes(item.file.size)}
                      {r && !r.unchanged && (
                        <>
                          {" → "}
                          <strong className="text-gray-900">{formatBytes(r.blob.size)}</strong>
                          <span className="ml-2 text-[#058554] font-semibold">{Math.round(saved * 100)}% smaller</span>
                        </>
                      )}
                      {r?.unchanged && <span className="ml-2">· already optimized, no saving possible</span>}
                      {item.status === "working" && <span className="ml-2">· {item.progress}</span>}
                    </p>
                    {r && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {r.images
                          ? `${r.compressed} of ${r.images} image${r.images === 1 ? "" : "s"} compressed`
                          : "No images inside – only the file structure was packed"}
                      </p>
                    )}
                    {item.error && <p className="text-sm text-red-600 mt-1">{item.error}</p>}
                  </div>
                  {r && (
                    <button
                      onClick={() => downloadBlob(r.blob, item.file.name.replace(/\.pdf$/i, "") + (r.unchanged ? ".pdf" : "-compressed.pdf"))}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                    >
                      Download
                    </button>
                  )}
                  <button
                    onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))}
                    disabled={busy}
                    aria-label={`Remove ${item.file.name}`}
                    className="px-2 py-1 border border-gray-200 rounded text-red-600 disabled:opacity-30"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={busy || !pending}
              className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium"
            >
              {busy ? "Compressing…" : `Compress ${items.length} PDF${items.length === 1 ? "" : "s"}`}
            </button>
            <button
              onClick={() => { setItems([]); setError(""); }}
              disabled={busy}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
            {totalBefore > 0 && items.filter((i) => i.result).length > 1 && (
              <span className="text-sm text-gray-600">
                Total: {formatBytes(totalBefore)} → <strong>{formatBytes(totalAfter)}</strong>
              </span>
            )}
          </div>
        </>
      )}

      <RelatedStrip />
      <CompressPdfSEO />
      <RelatedTools />
    </div>
  );
}
