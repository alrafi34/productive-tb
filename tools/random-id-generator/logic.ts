export type IDType = "uuid-v1" | "uuid-v4" | "cuid" | "nanoid";
export type OutputFormat = "plain" | "comma" | "json" | "sql";

export interface GenerationOptions {
  type: IDType;
  quantity: number;
  format: OutputFormat;
  nanoIdLength?: number;
}

// UUID v4 Generator
export function generateUUIDv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// UUID v1 Generator (simplified timestamp-based)
export function generateUUIDv1(): string {
  const now = Date.now();
  const timestamp = ((now + 12219292800000) * 10000).toString(16).padStart(12, "0");
  const clockSeq = Math.floor(Math.random() * 0x4000 | 0x8000).toString(16).padStart(4, "0");
  const node = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${timestamp.slice(-8)}-${timestamp.slice(-12, -8)}-1${timestamp.slice(-3)}-${clockSeq}-${node}`;
}

// CUID Generator
export function generateCUID(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const counter = Math.floor(Math.random() * 1000000).toString(36);
  return `c${timestamp}${randomPart}${counter}`.substring(0, 25);
}

// NanoID Generator
export function generateNanoID(length: number = 21): string {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let id = "";
  for (let i = 0; i < length; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
}

// Generate single ID
export function generateID(type: IDType, nanoIdLength?: number): string {
  switch (type) {
    case "uuid-v1":
      return generateUUIDv1();
    case "uuid-v4":
      return generateUUIDv4();
    case "cuid":
      return generateCUID();
    case "nanoid":
      return generateNanoID(nanoIdLength || 21);
    default:
      return generateUUIDv4();
  }
}

// Generate multiple IDs
export function generateIDs(
  type: IDType,
  quantity: number,
  nanoIdLength?: number
): string[] {
  const ids: string[] = [];
  for (let i = 0; i < quantity; i++) {
    ids.push(generateID(type, nanoIdLength));
  }
  return ids;
}

// Format output
export function formatOutput(ids: string[], format: OutputFormat): string {
  switch (format) {
    case "plain":
      return ids.join("\n");
    case "comma":
      return ids.join(", ");
    case "json":
      return JSON.stringify(ids, null, 2);
    case "sql":
      return `INSERT INTO table_name (id) VALUES\n${ids.map((id) => `('${id}')`).join(",\n")};`;
    default:
      return ids.join("\n");
  }
}

// Download file
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
