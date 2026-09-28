import { loadPdf, parsePageList } from "@/lib/pdf-pages";

export type MergeInput = { name: string; bytes: Uint8Array; pages: string };

/* Copies the chosen pages of each file, in order, into one new PDF. Links,
   form fields and bookmarks that span documents are not carried over. */
export async function mergePdfs(inputs: MergeInput[]): Promise<{ bytes: Uint8Array; pageCount: number }> {
  const { PDFDocument } = await import("pdf-lib");
  const out = await PDFDocument.create();
  out.setCreator("Productive Toolbox – Merge PDF");
  out.setProducer("pdf-lib");
  for (const input of inputs) {
    const src = await loadPdf(input.bytes);
    const parsed = parsePageList(input.pages, src.getPageCount());
    if (parsed.error !== undefined) throw new Error(`${input.name}: ${parsed.error}`);
    const copied = await out.copyPages(src, parsed.pages);
    copied.forEach((p) => out.addPage(p));
  }
  return { bytes: await out.save(), pageCount: out.getPageCount() };
}
