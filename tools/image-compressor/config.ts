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
      { q: "How does online image compression work?", a: "Our image compressor uses the HTML5 Canvas API to reduce image file sizes directly in your browser. It works by adjusting the image quality level and optionally resizing dimensions. The tool supports JPG, PNG, and WebP formats and can compress images by 50-90% while maintaining good visual quality. All processing happens locally on your device, so your images are never uploaded to any server." },
      { q: "What image formats can I compress?", a: "This free image compressor supports the most common web image formats: JPG/JPEG, PNG, and WebP. You can upload images in any of these formats and choose your preferred output format. WebP typically provides the best compression ratios for web use, while JPEG is ideal for photographs and PNG works best for images with transparency or text." },
      { q: "Is my image data secure when using this tool?", a: "Yes, absolutely! This image compressor is 100% private and secure. All image compression happens entirely in your browser using JavaScript and Canvas API. Your photos are never uploaded to our servers, stored in databases, or transmitted over the internet. This ensures complete privacy for your personal photos, business images, and confidential documents." },
      { q: "Can I compress multiple images at once?", a: "Yes! Our batch image compressor allows you to upload and compress multiple images simultaneously. Simply drag and drop multiple files or select them from your file browser. Each image will be compressed with your chosen settings, and you can download them individually or all together as a ZIP file for convenient bulk export." },
      { q: "What quality setting should I use for image compression?", a: "The optimal quality setting depends on your use case. For web images, 75-85% quality provides a good balance between file size and visual quality. For maximum compression (social media, thumbnails), use 60-70%. For high-quality prints or professional photography, use 90-95%. Our tool offers preset modes: High Quality (90%), Balanced (75%), and Maximum Compression (60%) to help you choose." },
      { q: "How much can I reduce image file size?", a: "Image compression results vary based on the original image and settings used. Typically, you can reduce JPG images by 50-70%, PNG images by 40-60%, and achieve even better results by converting to WebP format (60-80% reduction). The tool shows real-time compression statistics including original size, compressed size, and percentage saved for each image." },
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
    "Compress JPG, PNG, WebP images",
    "Batch compression support",
    "Adjustable quality settings",
    "100% browser-based processing",
    "No file upload to servers",
    "Download as ZIP"
  ]
};
