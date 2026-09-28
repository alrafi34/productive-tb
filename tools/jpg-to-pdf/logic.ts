import { PAPER_SIZES, type PaperSize } from "@/lib/paper";
import { canvasToBlob, decodeImage, isHeic } from "@/lib/image-files";

export type PageSize = PaperSize | "image";
export type Orientation = "auto" | "portrait" | "landscape";
export type Margin = "none" | "small" | "large";

/* In points: 0, ¼ in (6.35 mm), ½ in (12.7 mm) */
export const MARGINS: Record<Margin, { label: string; pt: number }> = {
  none: { label: "No margin", pt: 0 },
  small: { label: "Small (¼ in / 6 mm)", pt: 18 },
  large: { label: "Large (½ in / 13 mm)", pt: 36 },
};

/* CSS pixels to points: images are placed at 96 px per inch */
export const PX_TO_PT = 72 / 96;

export type Layout = { pageWidth: number; pageHeight: number; x: number; y: number; width: number; height: number };

/* Where an image of imgW × imgH pixels goes on its page. On a paper size it
   is scaled to fit inside the margins, keeping its proportions, and centered.
   "image" makes the page the image's own size (plus the margin). */
export function layoutImage(imgW: number, imgH: number, size: PageSize, orientation: Orientation, margin: number): Layout {
  if (size === "image") {
    const width = imgW * PX_TO_PT;
    const height = imgH * PX_TO_PT;
    return { pageWidth: width + 2 * margin, pageHeight: height + 2 * margin, x: margin, y: margin, width, height };
  }
  const paper = PAPER_SIZES[size];
  const landscape = orientation === "landscape" || (orientation === "auto" && imgW > imgH);
  const pageWidth = landscape ? paper.height : paper.width;
  const pageHeight = landscape ? paper.width : paper.height;
  const boxW = pageWidth - 2 * margin;
  const boxH = pageHeight - 2 * margin;
  const scale = Math.min(boxW / imgW, boxH / imgH);
  const width = imgW * scale;
  const height = imgH * scale;
  return { pageWidth, pageHeight, x: (pageWidth - width) / 2, y: (pageHeight - height) / 2, width, height };
}

/* EXIF orientation of a JPEG (1 = upright), read from the APP1 segment. */
export function jpegOrientation(bytes: Uint8Array): number {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (v.byteLength < 4 || v.getUint16(0) !== 0xffd8) return 1;
  let p = 2;
  while (p + 4 <= v.byteLength) {
    const marker = v.getUint16(p);
    const len = v.getUint16(p + 2);
    if (marker === 0xffe1 && p + 10 <= v.byteLength && v.getUint32(p + 4) === 0x45786966) {
      const t = p + 10; // TIFF header
      if (t + 8 > v.byteLength) return 1;
      const little = v.getUint16(t) === 0x4949;
      const ifd = t + v.getUint32(t + 4, little);
      if (ifd + 2 > v.byteLength) return 1;
      const count = v.getUint16(ifd, little);
      for (let i = 0; i < count; i++) {
        const e = ifd + 2 + i * 12;
        if (e + 12 > v.byteLength) return 1;
        if (v.getUint16(e, little) === 0x0112) return v.getUint16(e + 8, little);
      }
      return 1;
    }
    if ((marker & 0xff00) !== 0xff00 || marker === 0xffda) break;
    p += 2 + len;
  }
  return 1;
}

export type PdfOptions = { size: PageSize; orientation: Orientation; margin: Margin };

/* JPGs that are already upright go in unchanged (no quality loss) and PNGs
   keep transparency; everything else, and rotated JPGs, is redrawn as a
   high-quality JPG first. */
export async function imagesToPdf(files: File[], opts: PdfOptions, title: string): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  doc.setTitle(title);
  doc.setCreator("Productive Toolbox – JPG to PDF");
  doc.setProducer("pdf-lib");
  const marginPt = MARGINS[opts.margin].pt;

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let embedded;
    const isJpeg = !isHeic(file) && (file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name));
    const isPng = file.type === "image/png" || /\.png$/i.test(file.name);
    try {
      if (isJpeg && jpegOrientation(bytes) === 1) embedded = await doc.embedJpg(bytes);
      else if (isPng) embedded = await doc.embedPng(bytes);
    } catch {
      embedded = undefined; // e.g. CMYK or progressive quirks: redraw below
    }
    if (!embedded) {
      const img = await decodeImage(file);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, img.width, img.height);
        ctx.drawImage(img.source, 0, 0);
        const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
        embedded = await doc.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      } finally {
        img.close();
      }
    }
    const l = layoutImage(embedded.width, embedded.height, opts.size, opts.orientation, marginPt);
    const page = doc.addPage([l.pageWidth, l.pageHeight]);
    // PDF y runs up from the bottom; the layout is centered so it is symmetric
    page.drawImage(embedded, { x: l.x, y: l.pageHeight - l.y - l.height, width: l.width, height: l.height });
  }
  return doc.save();
}
