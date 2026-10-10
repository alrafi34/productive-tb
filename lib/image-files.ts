/* Reading, re-encoding and saving images in the browser, shared by the image
   converter, cropper, JPG to PDF and OCR tools. Nothing is uploaded. */

export const IMAGE_ACCEPT = "image/*,.heic,.heif";

export function isHeic(file: File): boolean {
  return /image\/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name);
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/") || isHeic(file);
}

/* A decoded image ready to draw on a canvas, upright (EXIF orientation applied). */
export type DecodedImage = {
  source: CanvasImageSource;
  width: number;
  height: number;
  close: () => void;
};

export async function heicToBlob(file: File): Promise<Blob> {
  const heic2any = (await import("heic2any")).default;
  const out = await heic2any({ blob: file, toType: "image/png" });
  return Array.isArray(out) ? out[0] : out;
}

function loadWithImgElement(blob: Blob): Promise<DecodedImage> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () =>
      resolve({ source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => URL.revokeObjectURL(url) });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("This browser cannot read this image."));
    };
    img.src = url;
  });
}

/* Decodes JPG, PNG, WebP, GIF (first frame), BMP, AVIF where the browser
   supports it, and HEIC/HEIF through heic2any (loaded only when needed). */
export async function decodeImage(file: Blob & { name?: string }): Promise<DecodedImage> {
  let blob: Blob = file;
  if (file instanceof File && isHeic(file)) {
    try {
      blob = await heicToBlob(file);
    } catch {
      throw new Error("Could not read this HEIC file. It may be damaged or use an unsupported HEIC variant.");
    }
  }
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(blob, { imageOrientation: "from-image" });
      return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close() };
    } catch {
      // Some formats (and older Safari) only decode through <img>
    }
  }
  return loadWithImgElement(blob);
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("The browser could not encode the image."))), type, quality);
  });
}

/* Browsers fall back to PNG for types they cannot encode (older Safari and WebP). */
export function canEncode(type: string): boolean {
  if (typeof document === "undefined") return true;
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  return c.toDataURL(type).startsWith(`data:${type}`);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/* "holiday.photo.HEIC" + "jpg" → "holiday.photo.jpg" */
export function withExtension(name: string, ext: string): string {
  const base = name.replace(/\.[^./\\]+$/, "") || "image";
  return `${base}.${ext}`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
