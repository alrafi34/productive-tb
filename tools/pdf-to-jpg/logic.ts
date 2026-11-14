import { PdfPasswordError } from "@/lib/pdf-pages";

export type ImageFormat = "jpeg" | "png";

/* Resolution choices in dots per inch: a PDF point is 1/72 inch, so the
   render scale is dpi / 72. */
export const RESOLUTIONS: { dpi: number; label: string }[] = [
  { dpi: 72, label: "72 DPI – small, for screens" },
  { dpi: 150, label: "150 DPI – sharp, recommended" },
  { dpi: 300, label: "300 DPI – print quality" },
];

/* Browsers refuse or blank very large canvases; iOS Safari's limit is about
   16.7 million pixels. Pages are scaled down to stay under these. */
const MAX_PIXELS = 16_000_000;
const MAX_SIDE = 10_000;
const THUMB_WIDTH = 240;

type PdfJs = typeof import("pdfjs-dist");
let pdfjsPromise: Promise<PdfJs> | null = null;

function pdfjs(): Promise<PdfJs> {
  pdfjsPromise ??= import("pdfjs-dist").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    return lib;
  });
  return pdfjsPromise;
}

export type OpenPdf = Awaited<ReturnType<typeof openPdf>>;

/* Opens a PDF for rendering. Restricted PDFs open without a password; a PDF
   that needs one throws PdfPasswordError (wrong = a password was given). */
export async function openPdf(bytes: Uint8Array, password?: string) {
  const lib = await pdfjs();
  // pdf.js takes ownership of the buffer it is given, so hand it a copy.
  const task = lib.getDocument({ data: bytes.slice(), password });
  try {
    return await task.promise;
  } catch (e) {
    const err = e as { name?: string; code?: number };
    if (err?.name === "PasswordException") throw new PdfPasswordError(err.code === lib.PasswordResponses.INCORRECT_PASSWORD);
    throw new Error("This file could not be read as a PDF. It may be damaged or not a PDF.");
  }
}

export function renderScale(widthPt: number, heightPt: number, dpi: number): number {
  let scale = dpi / 72;
  const w = widthPt * scale, h = heightPt * scale;
  if (w * h > MAX_PIXELS) scale *= Math.sqrt(MAX_PIXELS / (w * h));
  if (Math.max(widthPt, heightPt) * scale > MAX_SIDE) scale = MAX_SIDE / Math.max(widthPt, heightPt);
  return scale;
}

/* Renders one page (0-based) to an image. JPEG gets a white background;
   PNG keeps the page's own white page too, as PDF viewers show it. */
export async function renderPage(
  doc: OpenPdf,
  index: number,
  opts: { dpi: number; format: ImageFormat; quality: number },
): Promise<{ blob: Blob; thumb: Blob; width: number; height: number }> {
  const page = await doc.getPage(index + 1);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: renderScale(base.width, base.height, opts.dpi) });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  page.cleanup();
  const type = opts.format === "png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, type, opts.format === "jpeg" ? opts.quality : undefined));
  const { width, height } = canvas;
  // A small preview, so a long PDF does not keep hundreds of full-size
  // images decoded on the page at once.
  const t = document.createElement("canvas");
  const ts = Math.min(1, THUMB_WIDTH / width);
  t.width = Math.max(1, Math.round(width * ts));
  t.height = Math.max(1, Math.round(height * ts));
  const tctx = t.getContext("2d")!;
  tctx.imageSmoothingQuality = "high";
  tctx.drawImage(canvas, 0, 0, t.width, t.height);
  const thumb = await new Promise<Blob | null>((r) => t.toBlob(r, "image/jpeg", 0.8));
  canvas.width = canvas.height = 0; // free the memory right away
  t.width = t.height = 0;
  if (!blob || !thumb) throw new Error("The browser could not create the image. Try a lower resolution.");
  return { blob, thumb, width, height };
}

/* "report.pdf", page 3, jpeg → "report-page-3.jpg" (zero-padded for long PDFs
   so the files sort in page order). */
export function imageName(pdfName: string, page: number, pageCount: number, format: ImageFormat): string {
  const base = pdfName.replace(/\.pdf$/i, "") || "document";
  const n = String(page).padStart(String(pageCount).length, "0");
  return `${base}-page-${n}.${format === "png" ? "png" : "jpg"}`;
}
