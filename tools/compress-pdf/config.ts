import { siteConfig } from "@/config/site";

export const compressPdfConfig = {
  name: "Compress PDF",
  description: "Make a PDF smaller by shrinking the photos and scans inside it, while text stays sharp and selectable.",
  icon: "🗜️",
  category: "pdf",
  slug: "compress-pdf",
  seo: {
    title: "Compress PDF – Reduce PDF File Size Online, Free",
    description: "Reduce PDF file size for email and upload forms. Choose light, recommended or strong compression; text stays sharp. Free, no sign-up, no watermark.",
    keywords: [
      "compress pdf",
      "reduce pdf size",
      "pdf compressor",
      "shrink pdf",
      "make pdf smaller",
      "compress pdf online free",
      "reduce pdf file size",
      "compress pdf for email",
      "pdf size reducer",
      "compress pdf without losing quality",
      "compress scanned pdf",
      "pdf to smaller size",
    ],
    og: {
      title: "Compress PDF – Reduce PDF File Size Online, Free",
      description: "Make PDFs smaller for email and upload forms. Light, recommended or strong compression; text stays sharp. Free, no sign-up, no watermark.",
      url: `${siteConfig.url}/tools/pdf/compress-pdf`,
    },
    howToSteps: [
      { name: "Add your PDF", text: "Drop one or more PDF files on the upload area or click to browse." },
      { name: "Choose the compression", text: "Recommended suits most files. Pick Light to keep photos as sharp as possible, or Strong for the smallest file." },
      { name: "Compress", text: "Click Compress. Each file shows its new size and how much smaller it got." },
      { name: "Download", text: "Click Download next to each file to save the smaller PDF." },
    ],
    faq: [
      { q: "How do I reduce the size of a PDF?", a: "Add the PDF, keep Recommended compression and click Compress, then download the smaller file. Most of a PDF's size is usually its photos and scanned pages, so those are shrunk and re-saved as JPEG while the text is left as it is." },
      { q: "Will the text get blurry?", a: "No. Text, fonts and vector drawings are not changed at any level, so they stay sharp and you can still select and search the text. Only photos and scanned page images are compressed." },
      { q: "Which level should I choose?", a: "Recommended keeps images at up to 1,600 pixels on the long side, which looks good on screen and in normal printing. Light keeps up to 2,200 pixels for detailed photos. Strong keeps up to 1,100 pixels and gives the smallest file, for email or upload limits." },
      { q: "How much smaller will my PDF get?", a: "It depends on what is inside. Scanned documents and photo-heavy PDFs often shrink by 50–90%. A PDF that is mostly text is already small and may only shrink a little; if nothing can be saved, you get your original file back." },
      { q: "How do I compress a PDF to under 1 MB or 2 MB?", a: "Try Recommended first. If the file is still too big, use Strong. If it is still over the limit, split it into parts with the Split PDF tool and send them separately." },
      { q: "Are my files uploaded?", a: "No. We do not collect or store your files." },
      { q: "Can I compress a password-protected PDF?", a: "Not while it is encrypted. Open it in a PDF reader with the password, save a copy without protection, and compress that copy." },
      { q: "Is there a file size limit or a watermark?", a: "There is no watermark and no fixed size limit. Very large files with hundreds of scanned pages take longer to process." },
    ],
  },
};
