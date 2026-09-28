"use client";

import { useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { downloadBlob, formatBytes } from "@/lib/image-files";
import { describePages, isPdfFile, loadPdf } from "@/lib/pdf-pages";
import { createZip } from "@/lib/zip";
import { MODES, outputName, planSplit, splitPdf, type SplitMode } from "./logic";
import SplitPdfSEO from "./seo-content";

type Source = { name: string; size: number; bytes: Uint8Array; pageCount: number };
type Output = { name: string; pages: number[]; bytes: Uint8Array };

export default function SplitPdfUI() {
  const [src, setSrc] = useState<Source | null>(null);
  const [mode, setMode] = useState<SplitMode>("ranges");
  const [spec, setSpec] = useState("");
  const [every, setEvery] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);

  const load = async (files: File[]) => {
    const file = files[0];
    setOutputs([]);
    if (!file || !isPdfFile(file)) {
      setError("Please choose a PDF file.");
      return;
    }
    setBusy(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await loadPdf(bytes);
      const pageCount = doc.getPageCount();
      setSrc({ name: file.name, size: file.size, bytes, pageCount });
      setSpec(pageCount > 1 ? `1-${Math.ceil(pageCount / 2)}, ${Math.ceil(pageCount / 2) + 1}-${pageCount}` : "1");
      setError("");
    } catch (e) {
      setSrc(null);
      setError(e instanceof Error ? e.message : "Could not read this PDF.");
    } finally {
      setBusy(false);
    }
  };

  const plan = src ? planSplit(mode, src.pageCount, spec, every) : null;

  const run = async () => {
    if (!src || !plan?.groups) return;
    setBusy(true);
    setError("");
    try {
      const files = await splitPdf(src.bytes, plan.groups);
      setOutputs(files.map((bytes, i) => ({ bytes, pages: plan.groups![i], name: outputName(src.name, plan.groups![i]) })));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not split the PDF.");
    } finally {
      setBusy(false);
    }
  };

  const pdfBlob = (o: Output) => new Blob([o.bytes as BlobPart], { type: "application/pdf" });
  const reset = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setOutputs([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FileDropZone
        accept="application/pdf,.pdf"
        onFiles={load}
        icon="✂️"
        title={src ? "Open another PDF" : "Drop a PDF here or click to browse"}
        hint="Nothing is uploaded"
        compact={!!src}
      />
      {busy && !src && <p className="mt-3 text-sm text-gray-500">Reading PDF…</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {src && (
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <p className="text-gray-800">
            <strong className="break-all">{src.name}</strong>
            <span className="text-gray-500"> · {src.pageCount} page{src.pageCount === 1 ? "" : "s"} · {formatBytes(src.size)}</span>
          </p>

          <div className="grid gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Split mode">
            {(Object.keys(MODES) as SplitMode[]).map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={mode === m}
                onClick={() => reset(setMode)(m)}
                className={`px-3 py-2 rounded-lg text-sm border ${mode === m ? "bg-[#058554] text-white border-[#058554]" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
              >
                {MODES[m].label}
              </button>
            ))}
          </div>

          {mode === "every" ? (
            <label className="flex items-center gap-2 text-sm">
              <span className="text-gray-700">Pages per file</span>
              <input
                type="number"
                min={1}
                max={src.pageCount}
                value={every}
                onChange={(e) => reset(setEvery)(Math.floor(Number(e.target.value)))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </label>
          ) : (
            <label className="block text-sm">
              <span className="block text-gray-700 mb-1">{mode === "ranges" ? "Ranges" : "Pages"}</span>
              <input
                value={spec}
                onChange={(e) => reset(setSpec)(e.target.value)}
                placeholder={mode === "ranges" ? "1-3, 4-6, 7-" : "2, 5-7"}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#058554] ${plan?.error ? "border-red-400" : "border-gray-300"}`}
              />
            </label>
          )}
          <p className="text-sm text-gray-500">{MODES[mode].help}</p>

          {plan && !plan.groups ? (
            <p className="text-sm text-red-600">{plan.error}</p>
          ) : (
            plan?.groups && (
              <p className="text-sm text-gray-700">
                Result: {plan.groups.length} PDF{plan.groups.length === 1 ? "" : "s"}
                {plan.groups.length <= 6 && ` (${plan.groups.map((g) => `pages ${describePages(g)}`).join(" · ")})`}
              </p>
            )
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={run} disabled={busy || !plan?.groups} className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium">
              {busy ? "Working…" : mode === "remove" ? "Delete pages" : mode === "extract" ? "Extract pages" : "Split PDF"}
            </button>
            {outputs.length > 1 && (
              <button
                onClick={() => downloadBlob(new Blob([createZip(outputs.map((o) => ({ name: o.name, data: o.bytes }))) as BlobPart], { type: "application/zip" }), `${src.name.replace(/\.pdf$/i, "")}_split.zip`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Download all (ZIP)
              </button>
            )}
          </div>

          {outputs.length > 0 && (
            <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
              {outputs.map((o) => (
                <li key={o.name} className="flex items-center gap-3 px-4 py-2">
                  <span className="flex-1 min-w-0 truncate text-sm text-gray-800">{o.name}</span>
                  <span className="text-xs text-gray-500">{o.pages.length} p · {formatBytes(o.bytes.length)}</span>
                  <button onClick={() => downloadBlob(pdfBlob(o), o.name)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <RelatedStrip />
      <SplitPdfSEO />
      <RelatedTools />
    </div>
  );
}
