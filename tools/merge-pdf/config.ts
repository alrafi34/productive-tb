import { siteConfig } from "@/config/site";

export const mergePdfConfig = {
  name: "Merge PDF",
  description: "Combine several PDF files into one, in any order, with the option to pick pages from each.",
  icon: "📑",
  category: "pdf",
  slug: "merge-pdf",
  seo: {
    title: "Merge PDF – Combine PDF Files into One, Free",
    description: "Combine PDF files into one document in the order you want, and choose which pages to keep from each. Free, no sign-up, files never leave your device.",
    keywords: [
      "merge pdf",
      "combine pdf",
      "join pdf files",
      "merge pdf files into one",
      "combine pdf online free",
      "pdf merger",
      "add pages to pdf",
      "merge pdf without uploading",
      "combine multiple pdfs",
      "pdf joiner",
    ],
    og: {
      title: "Merge PDF – Combine PDF Files into One, Free",
      description: "Combine PDF files into one document in the order you want, and choose which pages to keep from each. Free, no sign-up, files never leave your device.",
      url: `${siteConfig.url}/tools/pdf/merge-pdf`,
    },
    howToSteps: [
      { name: "Add your PDFs", text: "Drop two or more PDF files on the upload area or click to browse. Each file shows its page count." },
      { name: "Put them in order", text: "Use the up and down arrows to arrange the files; they are joined from top to bottom." },
      { name: "Choose pages (optional)", text: "Leave Pages empty to include the whole file, or type pages and ranges such as 1-3, 5, 8- (8 to the end). Reverse a range with 5-1." },
      { name: "Merge", text: "Type a file name and click Merge." },
      { name: "Download", text: "Click Download PDF to save the combined document." },
    ],
    faq: [
      { q: "Are my PDF files uploaded?", a: "No. The files are combined in your browser with the open-source pdf-lib library. Nothing is sent to a server, so it is safe for contracts, bank statements and other private documents." },
      { q: "Is there a limit on the number or size of files?", a: "There is no fixed limit. Because the work happens on your device, very large files (hundreds of megabytes) depend on your computer's or phone's memory." },
      { q: "Can I merge only some pages of each PDF?", a: "Yes. Type the pages in the Pages box under each file, for example 1-3, 5, 8- for pages 1 to 3, page 5 and page 8 to the end. Leave it empty for all pages." },
      { q: "Does merging change the quality?", a: "No. Pages are copied as they are, with their text, fonts, vector graphics and images unchanged, so text stays sharp and searchable." },
      { q: "Can I merge password-protected PDFs?", a: "Not while they are encrypted. Open the file in a PDF reader with its password, save or print a copy without protection, and add that copy." },
      { q: "What is not carried over?", a: "Page content is copied in full. Bookmarks (the outline), links between documents and fillable form fields may not be kept in the merged file." },
    ],
  },
};
