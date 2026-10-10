import type { OutFormat } from "./engine";

export const MAX_FILE_BYTES = 30 * 1024 * 1024;

export const PRESETS = {
  small: { label: "Smallest file", quality: 60 },
  balanced: { label: "Balanced", quality: 75 },
  high: { label: "High quality", quality: 90 },
} as const;

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatFileSize(bytes: number): string {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/* Percentage saved; negative when the result is larger */
export function calculateSavings(original: number, compressed: number): number {
  if (!original) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

/* Formats the engine can write back as "original" */
export function originalTypeOf(file: File): OutFormat | "other" {
  if (file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name)) return "jpeg";
  if (file.type === "image/png" || /\.png$/i.test(file.name)) return "png";
  if (file.type === "image/webp" || /\.webp$/i.test(file.name)) return "webp";
  return "other";
}

/* Output for "keep original format" when the source format cannot be written:
   graphics-type formats go to PNG, photo-type formats to JPG */
export function fallbackFormatOf(file: File): OutFormat {
  return /gif|bmp|svg|ico/i.test(file.type) || /\.(gif|bmp|ico)$/i.test(file.name) ? "png" : "jpeg";
}

export const EXT: Record<OutFormat, string> = { jpeg: "jpg", png: "png", webp: "webp" };

export function outputName(file: File, format: OutFormat): string {
  const base = file.name.replace(/\.[^/.]+$/, "") || "image";
  return `${base}-compressed.${EXT[format]}`;
}
