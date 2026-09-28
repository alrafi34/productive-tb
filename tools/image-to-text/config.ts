import { siteConfig } from "@/config/site";

export const imageToTextConfig = {
  name: "Image to Text (OCR)",
  description: "Extract text from photos, screenshots and scans with OCR in 23 languages, right in your browser.",
  icon: "🔤",
  category: "image",
  slug: "image-to-text",
  seo: {
    title: "Image to Text – Free OCR to Extract Text from Images",
    description: "Copy text from photos, screenshots and scanned documents with OCR. 23 languages, editable result, copy or download as .txt. Images stay on your device.",
    keywords: [
      "image to text",
      "ocr online",
      "extract text from image",
      "picture to text",
      "screenshot to text",
      "jpg to text",
      "photo to text converter",
      "copy text from image",
      "free ocr",
      "scan to text",
    ],
    og: {
      title: "Image to Text – Free OCR to Extract Text from Images",
      description: "Copy text from photos, screenshots and scanned documents with OCR. 23 languages, editable result, copy or download as .txt. Images stay on your device.",
      url: `${siteConfig.url}/tools/image/image-to-text`,
    },
    howToSteps: [
      { name: "Add an image", text: "Drop a photo, scan or screenshot (JPG, PNG, WebP, HEIC, GIF, BMP or AVIF) on the upload area, click to browse, or paste a screenshot with Ctrl+V (Cmd+V on a Mac)." },
      { name: "Choose the language", text: "Pick the language of the text; it is preset from your browser language. Tick The text also contains English for mixed documents." },
      { name: "Extract the text", text: "Click Extract text. The first time you use a language, its data is downloaded once and then cached by your browser." },
      { name: "Check and edit", text: "Read through the result next to the image and correct any mistakes; a low confidence score means the image was hard to read." },
      { name: "Copy or download", text: "Click Copy text, or Download .txt to save it as a plain text file." },
    ],
    faq: [
      { q: "Is my image uploaded to a server?", a: "No. Text recognition runs in your browser with Tesseract, the open-source OCR engine, compiled to WebAssembly. The engine and the language data are downloaded from a public CDN the first time; your image itself never leaves your device." },
      { q: "How accurate is the OCR?", a: "On clear printed text, such as a screenshot or a flat, well-lit scan, accuracy is usually above 95%. Blurry, skewed, low-resolution or low-contrast photos, decorative fonts and complex layouts give more errors, so always check the result." },
      { q: "Can it read handwriting?", a: "Only neat, printed-style handwriting, and not reliably. Tesseract is trained on printed text; cursive handwriting usually needs a specialised handwriting recognition service." },
      { q: "How do I get the best results?", a: "Photograph the page straight on in good light, fill the frame with the text, and avoid shadows and glare. Text should be at least about 20 pixels tall; crop away everything that is not text, and choose the right language." },
      { q: "Which languages are supported?", a: "English, Spanish, French, German, Italian, Portuguese, Dutch, Polish, Swedish, Danish, Norwegian, Finnish, Czech, Romanian, Hungarian, Greek, Turkish, Russian, Ukrainian, Arabic, Chinese (Simplified), Japanese and Korean. Accents and special letters are recognised when the matching language is selected." },
      { q: "Can I extract text from a PDF?", a: "If the PDF was made from a text document, open it in a PDF reader and copy the text directly. For a scanned PDF, save or screenshot the page as an image first, then add it here." },
      { q: "Does it keep the layout, tables and formatting?", a: "No. The result is plain text with line and paragraph breaks. Columns are read one after another, and tables become lines of text, so tidy them up after copying." },
    ],
  },
};
