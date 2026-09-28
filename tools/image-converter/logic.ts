import { canvasToBlob, decodeImage, withExtension } from "@/lib/image-files";

export const OUTPUT_FORMATS = {
  jpeg: { label: "JPG", mime: "image/jpeg", ext: "jpg", lossy: true, alpha: false },
  png: { label: "PNG", mime: "image/png", ext: "png", lossy: false, alpha: true },
  webp: { label: "WebP", mime: "image/webp", ext: "webp", lossy: true, alpha: true },
} as const;

export type OutputFormat = keyof typeof OUTPUT_FORMATS;

export type ConvertOptions = {
  format: OutputFormat;
  /* 0.1–1, JPG and WebP only */
  quality: number;
  /* Fills transparent areas when the output has no alpha channel (JPG) */
  background: string;
};

/* A readable name for the input format, from the MIME type or extension. */
export function inputFormatLabel(file: { type: string; name: string }): string {
  const ext = /\.([a-z0-9]+)$/i.exec(file.name)?.[1]?.toLowerCase() ?? "";
  const sub = file.type.split("/")[1]?.toLowerCase() ?? "";
  const key = sub || ext;
  const map: Record<string, string> = {
    jpeg: "JPG", jpg: "JPG", pjpeg: "JPG", png: "PNG", webp: "WebP", gif: "GIF", bmp: "BMP",
    "x-ms-bmp": "BMP", avif: "AVIF", heic: "HEIC", heif: "HEIF", tiff: "TIFF", "svg+xml": "SVG", "x-icon": "ICO",
    "vnd.microsoft.icon": "ICO",
  };
  return map[key] ?? map[ext] ?? (ext ? ext.toUpperCase() : "Image");
}

export async function convertImage(file: File, opts: ConvertOptions): Promise<{ blob: Blob; name: string; width: number; height: number }> {
  const img = await decodeImage(file);
  try {
    const fmt = OUTPUT_FORMATS[opts.format];
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    if (!fmt.alpha) {
      ctx.fillStyle = opts.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img.source, 0, 0);
    const blob = await canvasToBlob(canvas, fmt.mime, fmt.lossy ? opts.quality : undefined);
    if (blob.type && blob.type !== fmt.mime) {
      throw new Error(`This browser cannot save ${fmt.label} files. Try PNG or JPG, or another browser.`);
    }
    return { blob, name: withExtension(file.name, fmt.ext), width: img.width, height: img.height };
  } finally {
    img.close();
  }
}
