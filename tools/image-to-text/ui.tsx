"use client";

import { useEffect, useRef, useState } from "react";
import type { Worker as OcrWorker } from "tesseract.js";
import FileDropZone from "@/components/FileDropZone";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { IMAGE_ACCEPT, decodeImage, downloadBlob, isImageFile, withExtension } from "@/lib/image-files";
import { OCR_LANGUAGES, cleanOcrText, guessOcrLanguage, languageSpec, wordCount } from "./logic";
import ImageToTextSEO from "./seo-content";

const STATUS_LABELS: Record<string, string> = {
  "loading tesseract core": "Loading the OCR engine",
  "initializing tesseract": "Starting the OCR engine",
  "loading language traineddata": "Downloading language data",
  "loading language traineddata (from cache)": "Loading language data",
  "initializing api": "Preparing",
  "recognizing text": "Reading text",
};

export default function ImageToTextUI() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lang, setLang] = useState("eng");
  const [withEnglish, setWithEnglish] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const worker = useRef<{ spec: string; worker: OcrWorker } | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setLang(guessOcrLanguage()));
    return () => {
      window.cancelAnimationFrame(frame);
      worker.current?.worker.terminate();
    };
  }, []);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const open = async (files: File[]) => {
    const f = files.find(isImageFile);
    if (!f) {
      setError("Please choose an image: JPG, PNG, WebP, HEIC, GIF, BMP or AVIF. For a PDF, convert its pages to images first.");
      return;
    }
    setError("");
    setText("");
    setConfidence(null);
    setFile(f);
    try {
      // A browser-readable preview, also for HEIC
      const img = await decodeImage(f);
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      c.getContext("2d")!.drawImage(img.source, 0, 0);
      img.close();
      c.toBlob((b) => b && setPreview(URL.createObjectURL(b)), "image/png");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open this image.");
      setFile(null);
    }
  };

  const getWorker = async (spec: string) => {
    if (worker.current?.spec === spec) return worker.current.worker;
    await worker.current?.worker.terminate();
    worker.current = null;
    const { createWorker } = await import("tesseract.js");
    const w = await createWorker(spec, 1, {
      logger: (m) => {
        setStatus(STATUS_LABELS[m.status] ?? m.status);
        setProgress(Math.round((m.progress ?? 0) * 100));
      },
    });
    worker.current = { spec, worker: w };
    return w;
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    setStatus("Loading the OCR engine");
    setProgress(0);
    try {
      const img = await decodeImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff"; // transparent PNG text reads better on white
      ctx.fillRect(0, 0, img.width, img.height);
      ctx.drawImage(img.source, 0, 0);
      img.close();
      const w = await getWorker(languageSpec(lang, withEnglish));
      const { data } = await w.recognize(canvas);
      const out = cleanOcrText(data.text);
      setText(out);
      setConfidence(Math.round(data.confidence));
      if (!out) setError("No text was found. Try a sharper, well-lit photo, or check the language.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(/fetch|network|load/i.test(msg)
        ? "The OCR engine or language data could not be downloaded. Check your internet connection and try again."
        : `Text recognition failed: ${msg}`);
      await worker.current?.worker.terminate();
      worker.current = null;
    } finally {
      setBusy(false);
      setStatus("");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Copy failed; select the text and press Ctrl+C (Cmd+C on a Mac).");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <FileDropZone
        accept={IMAGE_ACCEPT}
        acceptPaste
        onFiles={open}
        icon="🔤"
        title={file ? "Open another image" : "Drop an image here, click to browse or paste a screenshot"}
        hint="JPG, PNG, WebP, HEIC, GIF, BMP, AVIF · we do not collect or store your files"
        compact={!!file}
      />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {file && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center justify-center min-h-[12rem]">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Image to read" className="max-w-full max-h-[50vh] object-contain" />
              ) : (
                <span className="text-sm text-gray-400">Loading preview…</span>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">Language of the text</span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  disabled={busy}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554]"
                >
                  {OCR_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </label>
              {lang !== "eng" && (
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={withEnglish} onChange={(e) => setWithEnglish(e.target.checked)} disabled={busy} className="accent-[#058554]" />
                  The text also contains English
                </label>
              )}
              <button onClick={run} disabled={busy || !preview} className="w-full px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium">
                {busy ? "Working…" : "Extract text"}
              </button>
              {busy && (
                <div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#058554] transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{status}{progress ? ` · ${progress}%` : ""}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <p className="text-sm font-medium text-gray-700">Extracted text</p>
              {confidence !== null && (
                <p className="text-xs text-gray-500">
                  {wordCount(text)} words · confidence {confidence}%{confidence < 70 ? " (check carefully)" : ""}
                </p>
              )}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              dir="auto"
              placeholder="The text from your image appears here. You can edit it before copying."
              className="flex-1 min-h-[18rem] w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#058554]"
            />
            <div className="mt-3 flex gap-2">
              <button onClick={copy} disabled={!text} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
                {copied ? "Copied ✓" : "Copy text"}
              </button>
              <button
                onClick={() => downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), withExtension(file.name, "txt"))}
                disabled={!text}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium"
              >
                Download .txt
              </button>
            </div>
          </div>
        </div>
      )}

      <RelatedStrip />
      <ImageToTextSEO />
      <RelatedTools />
    </div>
  );
}
