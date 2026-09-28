"use client";

import { useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { downloadBlob, formatBytes } from "@/lib/image-files";
import { isPdfFile, loadPdf, parsePageList } from "@/lib/pdf-pages";
import { mergePdfs } from "./logic";
import MergePdfSEO from "./seo-content";

type Item = { id: string; name: string; size: number; bytes: Uint8Array; pageCount: number; pages: string };
let nextId = 0;

export default function MergePdfUI() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; pages: number } | null>(null);
  const [name, setName] = useState("merged");

  const addFiles = async (files: File[]) => {
    setLoading(true);
    const problems: string[] = [];
    const added: Item[] = [];
    for (const file of files) {
      if (!isPdfFile(file)) {
        problems.push(`${file.name}: not a PDF`);
        continue;
      }
      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const doc = await loadPdf(bytes);
        added.push({ id: String(nextId++), name: file.name, size: file.size, bytes, pageCount: doc.getPageCount(), pages: "" });
      } catch (e) {
        problems.push(`${file.name}: ${e instanceof Error ? e.message : "could not be read"}`);
      }
    }
    setItems((prev) => [...prev, ...added]);
    setError(problems.join(" "));
    setResult(null);
    setLoading(false);
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

  const merge = async () => {
    setBusy(true);
    setError("");
    try {
      const r = await mergePdfs(items.map((i) => ({ name: i.name, bytes: i.bytes, pages: i.pages })));
      setResult({ blob: new Blob([r.bytes as BlobPart], { type: "application/pdf" }), pages: r.pageCount });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not merge the files.");
    } finally {
      setBusy(false);
    }
  };

  const invalid = items.some((i) => parsePageList(i.pages, i.pageCount).error !== undefined);
  const totalPages = items.reduce((s, i) => s + (parsePageList(i.pages, i.pageCount).pages?.length ?? 0), 0);

  return (
    <div className="max-w-4xl mx-auto">
      <FileDropZone
        accept="application/pdf,.pdf"
        multiple
        onFiles={addFiles}
        icon="📑"
        title={items.length ? "Add more PDFs" : "Drop PDF files here or click to browse"}
        hint="Add two or more PDFs · nothing is uploaded"
        compact={items.length > 0}
      />
      {loading && <p className="mt-3 text-sm text-gray-500">Reading files…</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {items.length > 0 && (
        <>
          <ol className="mt-6 space-y-3">
            {items.map((item, i) => {
              const parsed = parsePageList(item.pages, item.pageCount);
              return (
                <li key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#058554] text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.pageCount} page{item.pageCount === 1 ? "" : "s"} · {formatBytes(item.size)}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => move(i, -1)} disabled={busy || i === 0} aria-label="Move up" className="px-2 py-1 border border-gray-200 rounded disabled:opacity-30">↑</button>
                      <button onClick={() => move(i, 1)} disabled={busy || i === items.length - 1} aria-label="Move down" className="px-2 py-1 border border-gray-200 rounded disabled:opacity-30">↓</button>
                      <button
                        onClick={() => { setItems((prev) => prev.filter((x) => x.id !== item.id)); setResult(null); }}
                        disabled={busy}
                        aria-label={`Remove ${item.name}`}
                        className="px-2 py-1 border border-gray-200 rounded text-red-600 disabled:opacity-30"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <label className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-gray-600">Pages</span>
                    <input
                      value={item.pages}
                      placeholder={`all (1-${item.pageCount})`}
                      onChange={(e) => {
                        const pages = e.target.value;
                        setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, pages } : x)));
                        setResult(null);
                      }}
                      className={`flex-1 min-w-[10rem] px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-[#058554] ${parsed.error ? "border-red-400" : "border-gray-300"}`}
                    />
                    {parsed.pages ? (
                      <span className="text-gray-500">{parsed.pages.length} selected</span>
                    ) : (
                      <span className="text-red-600 w-full">{parsed.error}</span>
                    )}
                  </label>
                </li>
              );
            })}
          </ol>

          <div className="mt-5 bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1 text-sm">
              <span className="text-gray-600 mr-1">File name</span>
              <input value={name} onChange={(e) => { setName(e.target.value); setResult(null); }} className="px-3 py-2 border border-gray-300 rounded-lg" />
              <span className="text-gray-500">.pdf</span>
            </label>
            <button
              onClick={merge}
              disabled={busy || invalid || items.length < 1}
              className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium"
            >
              {busy ? "Merging…" : `Merge ${items.length} file${items.length === 1 ? "" : "s"} (${totalPages} pages)`}
            </button>
            {result && (
              <button
                onClick={() => downloadBlob(result.blob, `${(name || "merged").replace(/[\\/:*?"<>|]/g, "_")}.pdf`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Download PDF · {result.pages} pages · {formatBytes(result.blob.size)}
              </button>
            )}
            <button onClick={() => { setItems([]); setResult(null); setError(""); }} disabled={busy} className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Clear
            </button>
          </div>
          {items.length === 1 && <p className="mt-2 text-sm text-gray-500">Add another PDF to combine, or pick pages above to save a shorter copy of this one.</p>}
        </>
      )}

      <RelatedStrip />
      <MergePdfSEO />
      <RelatedTools />
    </div>
  );
}
