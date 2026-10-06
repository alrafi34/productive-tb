import { siteConfig } from "@/config/site";

export const splitPdfConfig = {
  name: "Split PDF",
  description: "Split a PDF into several files, extract pages into a new PDF or delete pages you do not need.",
  icon: "✂️",
  category: "pdf",
  slug: "split-pdf",
  seo: {
    title: "Split PDF – Extract, Separate or Delete PDF Pages",
    description: "Split a PDF by page ranges or every N pages, extract pages into a new PDF, or delete pages. Free and private: files are processed in your browser.",
    keywords: [
      "split pdf",
      "extract pages from pdf",
      "separate pdf pages",
      "delete pages from pdf",
      "remove pages from pdf",
      "pdf splitter",
      "split pdf into single pages",
      "save one page of a pdf",
      "cut pdf",
      "split pdf online free",
    ],
    og: {
      title: "Split PDF – Extract, Separate or Delete PDF Pages",
      description: "Split a PDF by page ranges or every N pages, extract pages into a new PDF, or delete pages. Free and private: files are processed in your browser.",
      url: `${siteConfig.url}/tools/pdf/split-pdf`,
    },
    howToSteps: [
      { name: "Open your PDF", text: "Drop a PDF on the upload area or click to browse. The tool shows how many pages it has." },
      { name: "Choose what to do", text: "Split by ranges makes one file per range; Split every N pages cuts it into equal parts (1 gives one file per page); Extract pages saves chosen pages as one PDF; Delete pages saves a copy without them." },
      { name: "Type the pages", text: "Use page numbers and ranges such as 1-3, 4-6, 7- (7 to the end). The line below shows the files you will get." },
      { name: "Split", text: "Click the button to create the new PDFs." },
      { name: "Download", text: "Download each file, or all of them as one ZIP file." },
    ],
    faq: [
      { q: "Is my data private?", a: "Yes. We do not collect or store your files." },
      { q: "How do I split a PDF into single pages?", a: "Choose Split every N pages and set N to 1. You get one PDF per page, which you can download separately or together as a ZIP file." },
      { q: "How do I save just one page of a PDF?", a: "Choose Extract pages, type the page number, for example 4, and click Extract pages. For several pages in one file, type them all, such as 2, 5-7." },
      { q: "How do I delete pages from a PDF?", a: "Choose Delete pages and type the pages to remove, for example 1, 10-. The tool saves a copy with every other page, in the original order." },
      { q: "Does splitting reduce quality?", a: "No. Pages are copied as they are, with the same text, fonts and images, so text stays sharp and searchable." },
      { q: "Why are the split files almost as large as the original?", a: "Fonts and images shared by many pages are copied into every file that uses them. A 10-page file that embeds a large font can therefore produce single-page files that each still contain that font." },
      { q: "Can I split a password-protected PDF?", a: "Not while it is encrypted. Open it in a PDF reader with its password, save a copy without protection, and split that copy." },
    ],
  },
};
