export const toolConfig = {
  slug: "image-compressor",
  name: "Image Compressor",
  description: "Compress JPG, PNG, and WebP images instantly in your browser.",
  category: "image",
  icon: "🖼️",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "How does the image compressor work?", a: "JPG and WebP images are re-saved at the quality you choose. PNG images keep fewer colours, the method made popular by TinyPNG, which usually cuts screenshots, logos and graphics by 50–80% while text and edges stay sharp. If a result would be larger than your original, the original is kept, so a file never gets bigger." },
      { q: "What image formats can I compress?", a: "You can add JPG, PNG, WebP, HEIC/HEIF (iPhone photos), GIF, BMP and AVIF. Results are saved as JPG, PNG or WebP: keep the input format or choose another one. HEIC photos are saved as JPG by default, and animated GIFs keep their first frame." },
      { q: "Can I compress an image to a specific size, like 100 KB?", a: "Yes. Type a target size or pick one from 20 KB to 1 MB. The tool finds the highest quality that fits. If even the lowest quality is too large, it reduces the pixel dimensions and tells you the new size." },
      { q: "Is my image data secure when using this tool?", a: "Yes. We do not collect or store your files. Re-saved images also lose EXIF metadata such as camera details and GPS location; a file that is kept as it was stays unchanged." },
      { q: "Can I compress multiple images at once?", a: "Yes. Choose, drop or paste as many images as you need. Each one is compressed as soon as it is added, and Download all saves them together in one ZIP file." },
      { q: "What quality setting should I use for image compression?", a: "For websites, 70–85% looks the same as the original for most photos. Use 60% (Smallest file) for thumbnails and social posts, 75% (Balanced) as an everyday default and 90% (High quality) for portfolios and print previews. For PNG, quality sets how many colours are kept, and 100% is lossless." },
      { q: "How much smaller will my images be?", a: "Typical savings are 50–80% for JPG photos, 50–80% for PNG screenshots and graphics, and 60–80% when a photo is converted to WebP. Images that are already well compressed may not shrink further; those are kept as they are." },
      { q: "Can I see the difference before downloading?", a: "Yes. Click Compare to open a before-and-after view with a slider, and zoom to 100% or 200% to check fine detail." },
      { q: "Why did my PNG barely get smaller?", a: "Photos saved as PNG cannot lose colours without visible banding, so they are kept lossless. Choose JPG or WebP as the output format for photos; they are made for them and are usually several times smaller." },
    ],
    title: "Free Image Compressor - Reduce JPG, PNG, WebP Size Online",
    description: "Free online image compressor to reduce JPG, PNG, and WebP file sizes instantly. Compress images in your browser with no upload. Perfect for web optimization.",
    keywords: [
      "image compressor",
      "compress image",
      "free image compressor",
      "online image compressor",
      "reduce image size",
      "compress jpg",
      "compress png",
      "compress webp",
      "image optimizer",
      "photo compressor",
      "reduce photo size",
      "image size reducer",
      "compress images online",
      "batch image compressor",
      "web image optimizer",
      "compress images for web",
      "image compression tool",
      "reduce file size"
    ],
    openGraph: {
      title: "Free Image Compressor - Reduce Image Size Online",
      description: "Instantly compress JPG, PNG, and WebP images in your browser. No upload required, 100% private.",
      type: "website",
      url: "/image-compressor"
    }
  },
  features: [
    "Compress JPG, PNG, WebP, HEIC, GIF and BMP images",
    "Real PNG compression that keeps transparency",
    "Compress to a target size such as 100 KB",
    "Convert to JPG, PNG or WebP",
    "Before-and-after comparison",
    "Batch compression with ZIP download",
    "Private: your files are not collected or stored"
  ]
};
