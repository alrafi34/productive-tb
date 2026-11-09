"use client";

import { useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { downloadBlob, formatBytes } from "@/lib/image-files";
import PdfPasswordPrompt from "@/components/PdfPasswordPrompt";
import { isPdfFile, loadPdf, PdfPasswordError } from "@/lib/pdf-pages";
import { createZip } from "@/lib/zip";
import { compressPdf, compressToTarget, formatTarget, KB, LEVELS, MB, splitToTarget, TARGET_PRESETS, type Level } from "./logic";
import CompressPdfSEO from "./seo-content";

type Mode = "level" | "target";
type Part = { name: string; pages: [number, number]; bytes: Uint8Array };
type Item = {
  id: string;
  file: File;
  status: "waiting" | "working" | "done" | "error" | "locked";
  password?: string;
  wrongPassword?: boolean;
  unlocking?: boolean;
  progress?: string;
  result?: {
    blob: Blob;
    images: number;
    compressed: number;
    unchanged: boolean;
    target?: number;
    hit?: boolean;
    alreadyUnder?: boolean;
  };
  parts?: Part[];
  splitError?: string;
  splitting?: boolean;
  error?: string;
};
let nextId = 0;

const baseName = (name: string) => name.replace(/\.pdf$/i, "");

export default function CompressPdfUI() {
  const [items, setItems] = useState<Item[]>([]);
  const [mode, setMode] = useState<Mode>("level");
  const [level, setLevel] = useState<Level>("recommended");
  const [targetValue, setTargetValue] = useState("200");
  const [targetUnit, setTargetUnit] = useState<"KB" | "MB">("KB");
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const targetBytes = Math.round(parseFloat(targetValue) * (targetUnit === "MB" ? MB : KB));
  const targetValid = Number.isFinite(targetBytes) && targetBytes >= 10 * KB;

  const update = (id: string, patch: Partial<Item>) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  // Any change of settings means the files have to be compressed again.
  const reset = () => setItems((prev) => prev.map((x) => ({ id: x.id, file: x.file, password: x.password, status: x.status === "locked" ? "locked" : "waiting" })));

  const addFiles = (files: File[]) => {
    const pdfs = files.filter(isPdfFile);
    const skipped = files.filter((f) => !isPdfFile(f)).map((f) => f.name);
    setError(skipped.length ? `Not a PDF: ${skipped.join(", ")}` : "");
    setItems((prev) => [...prev, ...pdfs.map((file) => ({ id: String(nextId++), file, status: "waiting" as const }))]);
  };

  const run = async () => {
    setBusy(true);
    for (const item of items) {
      if (item.status === "done" || item.status === "locked") continue;
      update(item.id, { status: "working", progress: "Reading…", error: undefined, parts: undefined, splitError: undefined });
      try {
        const bytes = new Uint8Array(await item.file.arrayBuffer());
        if (mode === "target") {
          const r = await compressToTarget(bytes, targetBytes, {
            removeMetadata,
            password: item.password,
            onProgress: (text) => update(item.id, { progress: text }),
          });
          update(item.id, {
            status: "done",
            result: {
              blob: new Blob([r.bytes as BlobPart], { type: "application/pdf" }),
              images: r.imagesFound,
              compressed: r.imagesCompressed,
              unchanged: r.unchanged,
              target: r.target,
              hit: r.hit,
              alreadyUnder: r.alreadyUnder,
            },
          });
        } else {
          const r = await compressPdf(bytes, level, {
            removeMetadata,
            password: item.password,
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
        }
      } catch (e) {
        if (e instanceof PdfPasswordError) update(item.id, { status: "locked", wrongPassword: e.wrong });
        else update(item.id, { status: "error", error: e instanceof Error ? e.message : "Could not compress this file." });
      }
    }
    setBusy(false);
  };

  const split = async (item: Item) => {
    if (!item.result?.target) return;
    update(item.id, { splitting: true, splitError: undefined });
    try {
      const bytes = new Uint8Array(await item.result.blob.arrayBuffer());
      const r = await splitToTarget(bytes, item.result.target, item.password);
      if ("error" in r) update(item.id, { splitting: false, splitError: r.error });
      else
        update(item.id, {
          splitting: false,
          parts: r.parts.map((p, i) => ({
            name: `${baseName(item.file.name)}-part${i + 1}-pages-${p.pages[0]}-${p.pages[1]}.pdf`,
            pages: p.pages,
            bytes: p.bytes,
          })),
        });
    } catch (e) {
      update(item.id, { splitting: false, splitError: e instanceof Error ? e.message : "Could not split this file." });
    }
  };

  const unlock = async (item: Item, password: string) => {
    update(item.id, { unlocking: true });
    try {
      await loadPdf(new Uint8Array(await item.file.arrayBuffer()), password);
      update(item.id, { unlocking: false, password, wrongPassword: false, status: "waiting" });
    } catch (e) {
      if (e instanceof PdfPasswordError) update(item.id, { unlocking: false, wrongPassword: true });
      else update(item.id, { unlocking: false, status: "error", error: e instanceof Error ? e.message : "Could not read this file." });
    }
  };

  const pending = items.some((i) => i.status === "waiting" || i.status === "error");
  const done = items.filter((i) => i.result);
  const totalBefore = done.reduce((s, i) => s + i.file.size, 0);
  const totalAfter = done.reduce((s, i) => s + (i.result?.blob.size ?? 0), 0);

  const tab = (m: Mode, label: string) => (
    <button
      role="tab"
      aria-selected={mode === m}
      onClick={() => { setMode(m); reset(); }}
      disabled={busy}
      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === m ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
    >
      {label}
    </button>
  );

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
        <div className="flex bg-gray-100 p-1 rounded-lg mb-4" role="tablist" aria-label="How to compress">
          {tab("level", "By quality")}
          {tab("target", "To a file size")}
        </div>

        {mode === "level" ? (
          <div className="grid sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Compression level">
            {(Object.keys(LEVELS) as Level[]).map((l) => (
              <button
                key={l}
                role="radio"
                aria-checked={level === l}
                onClick={() => { setLevel(l); reset(); }}
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
        ) : (
          <div>
            <label htmlFor="pdf-target" className="block text-sm font-medium text-gray-700 mb-2">Make each PDF no bigger than</label>
            <div className="flex gap-2 max-w-xs">
              <input
                id="pdf-target"
                type="number"
                min="10"
                step="any"
                value={targetValue}
                onChange={(e) => { setTargetValue(e.target.value); reset(); }}
                disabled={busy}
                className={`min-w-0 flex-1 px-4 py-2.5 border-2 rounded-lg text-lg font-mono focus:ring-2 focus:ring-[#058554] ${targetValid ? "border-gray-200" : "border-red-400"}`}
              />
              <select
                value={targetUnit}
                onChange={(e) => { setTargetUnit(e.target.value as "KB" | "MB"); reset(); }}
                disabled={busy}
                aria-label="Unit"
                className="shrink-0 px-3 py-2.5 border-2 border-gray-200 rounded-lg font-medium"
              >
                <option>KB</option>
                <option>MB</option>
              </select>
            </div>
            {!targetValid && <p className="mt-1 text-sm text-red-600">Enter a size of at least 10 KB.</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {TARGET_PRESETS.map((p) => {
                const value = String(p.value);
                const active = targetValue === value && targetUnit === p.unit;
                return (
                  <button
                    key={p.label}
                    onClick={() => { setTargetValue(value); setTargetUnit(p.unit); reset(); }}
                    disabled={busy}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${active ? "bg-[#058554] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              The best image quality that fits is chosen for you. If even the smallest version is too big, you can split the file into parts that each fit.
            </p>
          </div>
        )}

        <label className="mt-4 flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={removeMetadata} onChange={(e) => { setRemoveMetadata(e.target.checked); reset(); }} disabled={busy} className="w-4 h-4" />
          Remove document properties (title, author, software)
        </label>
      </div>

      {items.length > 0 && (
        <>
          <ul className="mt-5 space-y-3">
            {items.map((item) => {
              const r = item.result;
              const saved = r ? 1 - r.blob.size / item.file.size : 0;
              const missed = r?.target !== undefined && !r.hit;
              return (
                <li key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatBytes(item.file.size)}
                        {r && !r.unchanged && (
                          <>
                            {" → "}
                            <strong className="text-gray-900">{formatBytes(r.blob.size)}</strong>
                            <span className="ml-2 text-[#058554] font-semibold">{Math.floor(saved * 100)}% smaller</span>
                          </>
                        )}
                        {r?.alreadyUnder && <span className="ml-2">· already under {formatTarget(r.target!)}, nothing to do</span>}
                        {r?.unchanged && !r.alreadyUnder && !missed && <span className="ml-2">· already optimized, no saving possible</span>}
                        {item.status === "working" && <span className="ml-2">· {item.progress}</span>}
                      </p>
                      {r?.target !== undefined && !r.alreadyUnder && (
                        <p className={`text-sm mt-0.5 font-medium ${r.hit ? "text-[#058554]" : "text-amber-700"}`}>
                          {r.hit
                            ? `✓ Under ${formatTarget(r.target)}`
                            : `This is the smallest it can get, still over ${formatTarget(r.target)}.`}
                        </p>
                      )}
                      {r && !r.alreadyUnder && (
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
                        onClick={() => downloadBlob(r.blob, baseName(item.file.name) + (r.unchanged ? ".pdf" : "-compressed.pdf"))}
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
                  </div>

                  {item.status === "locked" && (
                    <div className="mt-3">
                      <PdfPasswordPrompt
                        fileName={item.file.name}
                        wrong={!!item.wrongPassword}
                        busy={!!item.unlocking}
                        onUnlock={(pw) => unlock(item, pw)}
                      />
                    </div>
                  )}
                  {item.password && item.status === "waiting" && (
                    <p className="mt-2 text-sm text-[#058554]">🔓 Unlocked. Click Compress to continue.</p>
                  )}

                  {missed && !item.parts && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex flex-wrap items-center gap-3">
                      <p className="text-sm text-amber-900 flex-1 min-w-[12rem]">
                        Split it into parts that are each under {formatTarget(r!.target!)} and send them separately.
                      </p>
                      <button
                        onClick={() => split(item)}
                        disabled={item.splitting || busy}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium text-sm disabled:opacity-50"
                      >
                        {item.splitting ? "Splitting…" : "Split into parts"}
                      </button>
                      {item.splitError && <p className="w-full text-sm text-red-600">{item.splitError}</p>}
                    </div>
                  )}

                  {item.parts && (
                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-800 mb-2">
                        {item.parts.length} parts, each under {formatTarget(r!.target!)}
                      </p>
                      <ul className="space-y-1.5">
                        {item.parts.map((p) => (
                          <li key={p.name} className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="flex-1 min-w-0 text-gray-700">
                              Pages {p.pages[0]}–{p.pages[1]} · {formatBytes(p.bytes.length)}
                            </span>
                            <button
                              onClick={() => downloadBlob(new Blob([p.bytes as BlobPart], { type: "application/pdf" }), p.name)}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
                            >
                              Download
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => downloadBlob(new Blob([createZip(item.parts!.map((p) => ({ name: p.name, data: p.bytes }))) as BlobPart], { type: "application/zip" }), `${baseName(item.file.name)}-parts.zip`)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                      >
                        Download all parts (ZIP)
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={busy || !pending || (mode === "target" && !targetValid)}
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
            {done.length > 1 && (
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
