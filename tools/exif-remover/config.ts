export const toolConfig = {
  id: "exif-remover",
  slug: "exif-remover",
  name: "EXIF Data Remover",
  description: "Remove EXIF metadata from images to protect your privacy. Strip location, camera info, and device data instantly in your browser.",
  category: "image",
  icon: "🔒",
  keywords: ["exif remover", "remove metadata", "strip exif", "image privacy", "metadata remover", "exif cleaner", "photo privacy"],
  seo: {
    faq: [
      { q: "Is my data safe when using this tool?", a: "Absolutely! All processing happens entirely in your browser using JavaScript and the Canvas API. Your images never leave your device or get uploaded to any server. This ensures complete privacy and security for your photos." },
      { q: "What types of metadata does this tool remove?", a: "The tool removes all EXIF data including GPS coordinates, camera make/model, lens information, exposure settings, timestamps, software used, copyright information, and any other metadata embedded in the image file. The output is a clean image with only pixel data." },
      { q: "Will removing EXIF data affect image quality?", a: "No, removing EXIF data doesn't affect the visual quality of your image. The pixel data remains unchanged. However, if you enable compression or resizing options, those settings may affect quality. At default settings, the image quality is preserved while only metadata is removed." },
      { q: "Can I process multiple images at once?", a: "Yes! The tool supports batch processing. Simply select or drag multiple images at once, and they'll all be processed simultaneously. You can then download them individually or use the \"Download All\" button for convenience." },
    ],
    title: "EXIF Remover – Strip Photo Metadata and GPS Location",
    description: "Remove EXIF metadata, including GPS location, camera details and dates, from photos before you share them. Processed in your browser, never uploaded.",
    keywords: "exif remover, remove exif data, strip metadata, image privacy, photo metadata remover, exif cleaner, remove location data, privacy tool",
    openGraph: {
      title: "Free EXIF Data Remover – Protect Your Privacy",
      description: "Strip all metadata from images before sharing. Remove location, camera, and device information instantly in your browser.",
    },
  },
};
