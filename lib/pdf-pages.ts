/* Page-range parsing and PDF loading shared by the merge and split tools.
   Page numbers typed by people are 1-based; the arrays returned are 0-based
   page indices. */

export type Parsed = { pages: number[]; error?: undefined } | { pages?: undefined; error: string };

/* One range: "5", "2-7", "7-2" (reverse), "8-" (to the end), "-3" (from the start). */
function parseRange(part: string, count: number): number[] | string {
  const m = /^(\d*)\s*[-–]\s*(\d*)$/.exec(part);
  const single = /^\d+$/.test(part);
  if (!m && !single) return `"${part}" is not a page number or range`;
  const from = single ? Number(part) : m![1] ? Number(m![1]) : 1;
  const to = single ? Number(part) : m![2] ? Number(m![2]) : count;
  if (!single && !m![1] && !m![2]) return `"${part}" is not a page number or range`;
  for (const n of [from, to]) {
    if (n < 1 || n > count) return `page ${n} does not exist (the PDF has ${count} page${count === 1 ? "" : "s"})`;
  }
  const out: number[] = [];
  const step = from <= to ? 1 : -1;
  for (let n = from; n !== to + step; n += step) out.push(n - 1);
  return out;
}

/* "1-3, 5, 8-" → [0,1,2,4,7,…]. Empty or "all" means every page. */
export function parsePageList(input: string, count: number): Parsed {
  const text = input.trim().toLowerCase();
  if (!text || text === "all") return { pages: Array.from({ length: count }, (_, i) => i) };
  const pages: number[] = [];
  for (const raw of text.split(/[,;]/)) {
    const part = raw.trim();
    if (!part) continue;
    const r = parseRange(part, count);
    if (typeof r === "string") return { error: r };
    pages.push(...r);
  }
  if (!pages.length) return { error: "no pages selected" };
  return { pages };
}

/* "1-3, 4-6, 7" → [[0,1,2],[3,4,5],[6]]: one group per comma-separated range. */
export function parseRangeGroups(input: string, count: number): { groups: number[][]; error?: undefined } | { groups?: undefined; error: string } {
  const groups: number[][] = [];
  for (const raw of input.split(/[,;]/)) {
    const part = raw.trim();
    if (!part) continue;
    const r = parseRange(part.toLowerCase(), count);
    if (typeof r === "string") return { error: r };
    groups.push(r);
  }
  if (!groups.length) return { error: "type at least one range, such as 1-3, 4-6" };
  return { groups };
}

/* [0,1,2,4,6,7] → "1-3, 5, 7-8" */
export function describePages(pages: number[]): string {
  const parts: string[] = [];
  let i = 0;
  while (i < pages.length) {
    let j = i;
    while (j + 1 < pages.length && pages[j + 1] === pages[j] + 1) j++;
    parts.push(j > i ? `${pages[i] + 1}-${pages[j] + 1}` : `${pages[i] + 1}`);
    i = j + 1;
  }
  return parts.join(", ");
}

/* Thrown when a PDF needs an open password: `wrong` is true when one was given
   and did not match. The tools catch it to show a password box. */
export class PdfPasswordError extends Error {
  constructor(public wrong: boolean) {
    super(wrong ? "That password is not correct. Try again." : "This PDF is locked with a password. Enter it to continue.");
    this.name = "PdfPasswordError";
  }
}

/* Loads a PDF, turning its errors into sentences people understand.
   Encrypted PDFs that open without a password (only printing, copying or
   editing is restricted, as with many bank statements and forms) are opened
   with the empty password; the copies the tools save are not encrypted. A PDF
   that does need a password throws PdfPasswordError until it is given. */
export async function loadPdf(bytes: Uint8Array, password?: string) {
  const { PDFDocument } = await import("@cantoo/pdf-lib");
  const unreadable = () => new Error("This file could not be read as a PDF. It may be damaged or not a PDF.");
  // Matched by message: the library's error subclasses do not survive
  // instanceof in every bundle.
  const isEncrypted = (e: unknown) => e instanceof Error && /is encrypted/i.test(e.message);
  const open = (pw?: string) => PDFDocument.load(bytes, pw === undefined ? { updateMetadata: false } : { updateMetadata: false, password: pw });
  if (password !== undefined) {
    try {
      return await open(password);
    } catch (e) {
      if (e instanceof Error && /password incorrect|needs password/i.test(e.message)) throw new PdfPasswordError(true);
      throw unreadable();
    }
  }
  try {
    return await open();
  } catch (e) {
    if (!isEncrypted(e)) throw unreadable();
  }
  try {
    return await open("");
  } catch (e) {
    if (e instanceof Error && /password incorrect|needs password/i.test(e.message)) throw new PdfPasswordError(false);
    throw unreadable();
  }
}

export function isPdfFile(file: File): boolean {
  return file.type === "application/pdf" || /\.pdf$/i.test(file.name);
}
