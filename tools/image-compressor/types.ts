import type { EngineSettings, OutFormat } from "./engine";

export type ImageFile = {
  id: string;
  file: File;
  /* What the engine decodes: the file itself, or a PNG made from a HEIC file */
  source: Blob | null;
  originalSize: number;
  originalUrl: string;
  originalType: OutFormat | "other";
  status: "preparing" | "pending" | "compressing" | "completed" | "error";
  version: number;
  error?: string;
  compressedBlob?: Blob;
  compressedUrl?: string;
  compressedSize?: number;
  format?: OutFormat;
  width?: number;
  height?: number;
  origWidth?: number;
  origHeight?: number;
  keptOriginal?: boolean;
  notes?: string[];
};

export type CompressionSettings = Omit<EngineSettings, "targetBytes"> & { targetKB: number };

export type CompressionPreset = "small" | "balanced" | "high";
