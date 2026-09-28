import { describePages, loadPdf, parsePageList, parseRangeGroups } from "@/lib/pdf-pages";

export type SplitMode = "ranges" | "every" | "extract" | "remove";

export const MODES: Record<SplitMode, { label: string; help: string }> = {
  ranges: { label: "Split by ranges", help: "Each range becomes its own PDF, e.g. 1-3, 4-6, 7-" },
  every: { label: "Split every N pages", help: "Cut the PDF into files of N pages each; N = 1 gives one file per page" },
  extract: { label: "Extract pages", help: "Save the chosen pages as one new PDF, e.g. 2, 5-7" },
  remove: { label: "Delete pages", help: "Save a copy without the chosen pages, e.g. 1, 10-" },
};

export type Plan = { groups: number[][]; error?: undefined } | { groups?: undefined; error: string };

/* Which pages (0-based) go into each output file. */
export function planSplit(mode: SplitMode, pageCount: number, spec: string, every: number): Plan {
  if (pageCount < 1) return { error: "the PDF has no pages" };
  if (mode === "ranges") return parseRangeGroups(spec, pageCount);
  if (mode === "every") {
    if (!Number.isInteger(every) || every < 1) return { error: "N must be a whole number of 1 or more" };
    const groups: number[][] = [];
    for (let s = 0; s < pageCount; s += every) {
      groups.push(Array.from({ length: Math.min(every, pageCount - s) }, (_, i) => s + i));
    }
    return { groups };
  }
  if (!spec.trim()) return { error: "type the pages, e.g. 2, 5-7" };
  const parsed = parsePageList(spec, pageCount);
  if (parsed.error !== undefined) return { error: parsed.error };
  if (mode === "extract") return { groups: [parsed.pages] };
  const drop = new Set(parsed.pages);
  const keep = Array.from({ length: pageCount }, (_, i) => i).filter((i) => !drop.has(i));
  if (!keep.length) return { error: "that would delete every page" };
  return { groups: [keep] };
}

/* "report.pdf", pages 0-2 → "report_pages_1-3.pdf" */
export function outputName(source: string, pages: number[]): string {
  const base = source.replace(/\.pdf$/i, "") || "document";
  const label = describePages(pages).replace(/, /g, "_");
  return pages.length === 1 ? `${base}_page_${label}.pdf` : `${base}_pages_${label}.pdf`;
}

export async function splitPdf(bytes: Uint8Array, groups: number[][]): Promise<Uint8Array[]> {
  const { PDFDocument } = await import("pdf-lib");
  const src = await loadPdf(bytes);
  const outputs: Uint8Array[] = [];
  for (const pages of groups) {
    const doc = await PDFDocument.create();
    doc.setCreator("Productive Toolbox – Split PDF");
    doc.setProducer("pdf-lib");
    const title = src.getTitle();
    if (title) doc.setTitle(title);
    const copied = await doc.copyPages(src, pages);
    copied.forEach((p) => doc.addPage(p));
    outputs.push(await doc.save());
  }
  return outputs;
}
