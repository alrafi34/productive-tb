import { siteConfig } from "@/config/site";

export const pdfToJpgConfig = {
  name: "PDF to JPG",
  description: "Turn every page of a PDF, or just the pages you pick, into JPG or PNG images at screen or print resolution.",
  icon: "🖼️",
  category: "pdf",
  slug: "pdf-to-jpg",
  seo: {
    title: "PDF to JPG – Convert PDF Pages to Images, Free",
    description: "Convert PDF pages to JPG or PNG images at 72, 150 or 300 DPI. Pick pages, preview them and download one by one or as a ZIP. Free, no sign-up.",
    keywords: [
      "pdf to jpg",
      "pdf to jpeg",
      "pdf to image",
      "pdf to png",
      "convert pdf to jpg",
      "pdf to jpg converter",
      "pdf page to image",
      "save pdf as jpg",
      "pdf to jpg high quality",
      "pdf to jpg 300 dpi",
      "extract pages as images",
      "pdf to picture",
    ],
    og: {
      title: "PDF to JPG – Convert PDF Pages to Images, Free",
      description: "Turn PDF pages into JPG or PNG images at 72, 150 or 300 DPI, preview them, and download one by one or as a ZIP.",
      url: `${siteConfig.url}/tools/pdf/pdf-to-jpg`,
    },
    howToSteps: [
      { name: "Open your PDF", text: "Drop a PDF on the upload area or click to browse. If it is locked with a password, type the password in the box that appears." },
      { name: "Choose the format", text: "JPG makes smaller files for photos and sharing; PNG keeps text and lines perfectly sharp." },
      { name: "Choose the resolution", text: "150 DPI suits screens, email and most uploads. Use 300 DPI for printing, or 72 DPI for the smallest files." },
      { name: "Pick pages (optional)", text: "Leave Pages empty to convert every page, or type pages and ranges such as 1, 3-5." },
      { name: "Convert and download", text: "Click Convert, check the previews, then download each image or all of them as one ZIP file." },
    ],
    faq: [
      { q: "How do I convert a PDF to JPG?", a: "Open the PDF here, keep JPG and 150 DPI, and click Convert. Each page becomes its own JPG image, which you can download one at a time or all together as a ZIP file." },
      { q: "Can I convert just one page of a PDF to an image?", a: "Yes. Type the page number in the Pages box, for example 4, before converting. For several pages, type them as a list or ranges, such as 1, 3-5." },
      { q: "Which resolution should I choose?", a: "150 DPI gives a sharp image for screens, email and upload forms; a US Letter page comes out at 1,275 × 1,650 pixels and an A4 page at about 1,240 × 1,754. 300 DPI doubles that for printing. 72 DPI makes the smallest files." },
      { q: "JPG or PNG?", a: "JPG files are smaller and fine for pages with photos. PNG is lossless, so text, lines and diagrams stay perfectly crisp, but the files are larger." },
      { q: "Can I convert a password-protected PDF?", a: "Yes. A PDF that opens without a password but restricts printing or copying converts like any other. If it needs a password to open, type it in the box that appears." },
      { q: "Are my files uploaded?", a: "No. We do not collect or store your files." },
      { q: "Is there a page or size limit?", a: "There is no fixed limit. Very large pages are scaled down slightly so that phones and browsers can create the image, and long PDFs at 300 DPI take longer." },
    ],
  },
};
