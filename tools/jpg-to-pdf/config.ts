import { siteConfig } from "@/config/site";

export const jpgToPdfConfig = {
  name: "JPG to PDF Converter",
  description: "Combine JPG, PNG, WebP and HEIC images into one PDF on A4, US Letter or image-sized pages.",
  icon: "📄",
  category: "pdf",
  slug: "jpg-to-pdf",
  seo: {
    title: "JPG to PDF Converter – Combine Images into a PDF",
    description: "Turn JPG, PNG, WebP and HEIC images into one PDF. Reorder pages, pick A4 or US Letter, orientation and margins. Free, private, no upload.",
    keywords: [
      "jpg to pdf",
      "image to pdf",
      "convert jpg to pdf",
      "png to pdf",
      "heic to pdf",
      "combine images into pdf",
      "photos to pdf",
      "multiple jpg to one pdf",
      "scan to pdf from photos",
      "free jpg to pdf converter",
    ],
    og: {
      title: "JPG to PDF Converter – Combine Images into a PDF",
      description: "Turn JPG, PNG, WebP and HEIC images into one PDF. Reorder pages, pick A4 or US Letter, orientation and margins. Free, private, no upload.",
      url: `${siteConfig.url}/tools/pdf/jpg-to-pdf`,
    },
    howToSteps: [
      { name: "Add your images", text: "Drop JPG, PNG, WebP, HEIC, GIF, BMP or AVIF files on the upload area or click to browse. Each image becomes one page." },
      { name: "Put the pages in order", text: "Use the arrows under each image to move it, or Sort by file name for numbered scans such as page-1, page-2 … page-10." },
      { name: "Choose the page size", text: "Pick A4, US Letter, US Legal, A5 or A3, or Same as each image for pages that match the pictures exactly. The default follows your region." },
      { name: "Set orientation and margin", text: "Auto turns each page to match its image; choose portrait or landscape to force one. Add a small or large white margin, or none." },
      { name: "Create and download", text: "Click Create PDF, then Download PDF." },
    ],
    faq: [
      { q: "Are my images uploaded to a server?", a: "No. The PDF is built in your browser with the open-source pdf-lib library, so your photos and documents never leave your device." },
      { q: "Does converting JPG to PDF reduce the quality?", a: "Upright JPGs are placed in the PDF unchanged, byte for byte, so there is no quality loss, and PNGs keep their transparency. HEIC, WebP, GIF, BMP, AVIF and rotated JPGs are redrawn as high-quality JPG (92%) first." },
      { q: "Should I choose A4 or US Letter?", a: "US Letter (8.5 × 11 in) is standard in the United States, Canada and Mexico, and A4 (210 × 297 mm) in Europe and most other countries. The tool picks one from your region; change it if you are sending the PDF somewhere that uses the other size." },
      { q: "How do I put several photos into one PDF?", a: "Add all the images at once or in batches, put them in order and click Create PDF. Every image becomes its own page in a single PDF file." },
      { q: "Can I convert iPhone HEIC photos to PDF?", a: "Yes. HEIC photos are decoded in the browser and added to the PDF like any other image." },
      { q: "How large will the PDF be?", a: "About the total size of the images you add, since JPGs are embedded as they are. To make it smaller, compress or resize the photos first, for example to around 2000 px on the long side for documents." },
      { q: "Why are my pages sideways?", a: "Orientation is set to Auto, so a wide image gets a landscape page. Choose Portrait to keep every page upright; the image then shrinks to fit the width. If the photo itself is sideways, rotate it with an image cropper first." },
    ],
  },
};
