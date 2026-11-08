import { loadPdf } from "@/lib/pdf-pages";

/* Compression levels: the longest side an image may keep, in pixels, and the
   JPEG quality it is re-encoded at. Text, fonts and vector drawings are never
   touched, so they stay sharp and selectable at every level. */
export type Level = "light" | "recommended" | "strong";

export const LEVELS: Record<Level, { label: string; hint: string; maxSide: number; quality: number }> = {
  light: { label: "Light", hint: "Best quality, smaller saving", maxSide: 2200, quality: 0.82 },
  recommended: { label: "Recommended", hint: "Good quality for screen and print", maxSide: 1600, quality: 0.68 },
  strong: { label: "Strong", hint: "Smallest file, images softer", maxSide: 1100, quality: 0.5 },
};

export type CompressResult = {
  bytes: Uint8Array;
  originalSize: number;
  imagesFound: number;
  imagesCompressed: number;
  /* True when nothing got smaller and the original file is returned as is. */
  unchanged: boolean;
};

type PdfLib = typeof import("pdf-lib");

/* zlib-wrapped deflate, which is what PDF /FlateDecode uses. */
async function inflate(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream("deflate"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/* Undo PNG row filters (/Predictor 10–15): each row starts with a filter-type byte. */
function unPredict(data: Uint8Array, width: number, bpp: number): Uint8Array | null {
  const rowLen = width * bpp;
  const rows = Math.floor(data.length / (rowLen + 1));
  const out = new Uint8Array(rows * rowLen);
  for (let y = 0; y < rows; y++) {
    const type = data[y * (rowLen + 1)];
    const src = y * (rowLen + 1) + 1;
    const dst = y * rowLen;
    for (let x = 0; x < rowLen; x++) {
      const raw = data[src + x];
      const a = x >= bpp ? out[dst + x - bpp] : 0;
      const b = y > 0 ? out[dst - rowLen + x] : 0;
      const c = x >= bpp && y > 0 ? out[dst - rowLen + x - bpp] : 0;
      let v: number;
      if (type === 0) v = raw;
      else if (type === 1) v = raw + a;
      else if (type === 2) v = raw + b;
      else if (type === 3) v = raw + ((a + b) >> 1);
      else if (type === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v = raw + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
      } else return null;
      out[dst + x] = v & 0xff;
    }
  }
  return out;
}

/* Number of colour components, or 0 for colour spaces we leave alone
   (CMYK, indexed, Lab, separations…). */
function components(lib: PdfLib, doc: import("pdf-lib").PDFDocument, cs: unknown): number {
  const { PDFName, PDFArray, PDFNumber, PDFRef, PDFDict, PDFRawStream } = lib;
  if (cs instanceof PDFRef) cs = doc.context.lookup(cs);
  if (cs instanceof PDFName) {
    if (cs === PDFName.of("DeviceRGB")) return 3;
    if (cs === PDFName.of("DeviceGray")) return 1;
    return 0;
  }
  if (cs instanceof PDFArray && cs.get(0) === PDFName.of("ICCBased")) {
    let profile: unknown = cs.get(1);
    if (profile instanceof PDFRef) profile = doc.context.lookup(profile);
    const dict = profile instanceof PDFRawStream ? profile.dict : profile instanceof PDFDict ? profile : null;
    const n = dict?.get(PDFName.of("N"));
    if (n instanceof PDFNumber && (n.asNumber() === 3 || n.asNumber() === 1)) return n.asNumber();
  }
  return 0;
}

/* Decoded image ready to draw on a canvas, or null if this image is skipped. */
async function decodeImage(
  lib: PdfLib,
  doc: import("pdf-lib").PDFDocument,
  stream: import("pdf-lib").PDFRawStream,
): Promise<CanvasImageSource | null> {
  const { PDFName, PDFNumber, PDFArray, PDFDict, PDFBool } = lib;
  const dict = stream.dict;
  const num = (key: string) => {
    const v = dict.get(PDFName.of(key));
    return v instanceof PDFNumber ? v.asNumber() : undefined;
  };
  const width = num("Width"), height = num("Height");
  if (!width || !height || num("BitsPerComponent") !== 8) return null;
  // Stencil masks, colour-key masks and inverted decode ranges change how the
  // pixels are read; leave those images exactly as they are.
  if (dict.get(PDFName.of("ImageMask")) === PDFBool.True || dict.has(PDFName.of("Mask")) || dict.has(PDFName.of("Decode"))) return null;

  let filter = dict.get(PDFName.of("Filter"));
  if (filter instanceof PDFArray) filter = filter.size() === 1 ? filter.get(0) : undefined;
  const n = components(lib, doc, dict.get(PDFName.of("ColorSpace")));
  if (!n) return null;

  if (filter === PDFName.of("DCTDecode")) {
    return createImageBitmap(new Blob([stream.contents as BlobPart], { type: "image/jpeg" }));
  }
  if (filter !== PDFName.of("FlateDecode")) return null;

  let pixels = await inflate(stream.contents);
  let parms = dict.get(PDFName.of("DecodeParms"));
  if (parms instanceof PDFArray) parms = parms.get(0);
  if (parms instanceof PDFDict) {
    const p = parms.get(PDFName.of("Predictor"));
    const predictor = p instanceof PDFNumber ? p.asNumber() : 1;
    if (predictor >= 10) {
      const un = unPredict(pixels, width, n);
      if (!un) return null;
      pixels = un;
    } else if (predictor !== 1) return null;
  }
  if (pixels.length < width * height * n) return null;
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let i = 0, j = 0; i < width * height; i++, j += n) {
    rgba[i * 4] = pixels[j];
    rgba[i * 4 + 1] = n === 3 ? pixels[j + 1] : pixels[j];
    rgba[i * 4 + 2] = n === 3 ? pixels[j + 2] : pixels[j];
    rgba[i * 4 + 3] = 255;
  }
  return createImageBitmap(new ImageData(rgba, width, height));
}

async function encodeJpeg(img: CanvasImageSource & { width: number; height: number }, maxSide: number, quality: number) {
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
  canvas.width = canvas.height = 0;
  if (!blob) return null;
  return { bytes: new Uint8Array(await blob.arrayBuffer()), w, h };
}

/* Re-encodes the photos and scans inside a PDF as smaller JPEGs, packs the
   document structure into object streams and, optionally, drops metadata.
   Each image is replaced only if the new version is smaller. */
export async function compressPdf(
  input: Uint8Array,
  level: Level,
  opts: { removeMetadata: boolean; onProgress?: (done: number, total: number) => void },
): Promise<CompressResult> {
  const lib = await import("pdf-lib");
  const { PDFName, PDFNumber, PDFRawStream, PDFRef } = lib;
  const doc = await loadPdf(input);
  const { maxSide, quality } = LEVELS[level];

  const images = doc.context
    .enumerateIndirectObjects()
    .filter(([, obj]) => obj instanceof PDFRawStream && obj.dict.get(PDFName.of("Subtype")) === PDFName.of("Image")) as [
    import("pdf-lib").PDFRef,
    import("pdf-lib").PDFRawStream,
  ][];

  // Soft masks (the transparency of an image) are images too, but they must
  // stay greyscale and keep their exact values, so they are never re-encoded.
  const masks = new Set(
    images.map(([, s]) => s.dict.get(PDFName.of("SMask"))).filter((m) => m instanceof PDFRef).map((m) => (m as import("pdf-lib").PDFRef).toString()),
  );

  let compressed = 0;
  for (let i = 0; i < images.length; i++) {
    const [ref, stream] = images[i];
    opts.onProgress?.(i, images.length);
    if (masks.has(ref.toString())) continue;
    try {
      const img = (await decodeImage(lib, doc, stream)) as (CanvasImageSource & { width: number; height: number; close?: () => void }) | null;
      if (!img) continue;
      const jpeg = await encodeJpeg(img, maxSide, quality);
      img.close?.();
      if (!jpeg || jpeg.bytes.length >= stream.contents.length * 0.95) continue;
      const dict = stream.dict.clone(doc.context);
      dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      dict.set(PDFName.of("Width"), PDFNumber.of(jpeg.w));
      dict.set(PDFName.of("Height"), PDFNumber.of(jpeg.h));
      dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
      dict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
      dict.set(PDFName.of("Length"), PDFNumber.of(jpeg.bytes.length));
      dict.delete(PDFName.of("DecodeParms"));
      doc.context.assign(ref, PDFRawStream.of(dict, jpeg.bytes));
      compressed++;
    } catch {
      // An image the browser cannot decode is kept as it was.
    }
    // Let the page repaint between images on long documents.
    await new Promise((r) => setTimeout(r, 0));
  }
  opts.onProgress?.(images.length, images.length);

  if (opts.removeMetadata) {
    doc.catalog.delete(PDFName.of("Metadata"));
    doc.setTitle("");
    doc.setAuthor("");
    doc.setSubject("");
    doc.setKeywords([]);
    doc.setCreator("");
  }
  doc.setProducer("Productive Toolbox – Compress PDF");

  const out = await doc.save({ useObjectStreams: true });
  const unchanged = out.length >= input.length;
  return {
    bytes: unchanged ? input : out,
    originalSize: input.length,
    imagesFound: images.length,
    imagesCompressed: compressed,
    unchanged,
  };
}
