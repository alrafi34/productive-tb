export const toolConfig = {
  id: "base64-image-encoder",
  slug: "base64-image-encoder",
  name: "Base64 Image Encoder",
  description: "Convert images to Base64 strings instantly in your browser. Supports PNG, JPG, GIF, WebP with resizing, quality control, and preview.",
  category: "image",
  icon: "🖼️",
  keywords: ["base64 encoder", "image to base64", "base64 converter", "data uri", "image encoder", "base64 image", "inline image"],
  seo: {
    title: "Base64 Image Encoder – Convert Images to Base64",
    description: "Convert PNG, JPG, GIF and WebP images to Base64 strings and data URIs in your browser, with resizing, quality control and a preview.",
    keywords: "base64 image encoder, image to base64, base64 converter, data uri generator, inline image, base64 string, image encoder online",
    openGraph: {
      title: "Base64 Image Encoder – Convert Images to Base64",
      description: "Convert PNG, JPG, GIF and WebP images to Base64 strings and data URIs in your browser, with resizing, quality control and a preview.",
    },
    faq: [
      { q: "Why is the Base64 string larger than the original image?", a: "Base64 encoding converts binary data to text, which increases the size by approximately 33%. This is because Base64 uses 4 ASCII characters to represent 3 bytes of binary data. However, the convenience of inline embedding often outweighs the size increase for small images." },
      { q: "Should I use Base64 for all images on my website?", a: "No. Base64 is best for small images (under 10KB) like icons, logos, and UI elements. Large images should be served as separate files to take advantage of browser caching, lazy loading, and CDN optimization. Base64 images can't be cached separately and increase HTML/CSS file sizes." },
      { q: "How do I use a Base64 image in HTML or CSS?", a: "In HTML, use it in an img tag: <img src=\"data:image/png;base64,...\">. In CSS, use it as a background: background-image: url(data:image/png;base64,...);. The entire Base64 string replaces the normal file path." },
      { q: "What's the difference between PNG, JPEG, and WebP output formats?", a: "PNG is lossless and best for graphics with transparency. JPEG is lossy and better for photographs, offering smaller file sizes. WebP provides superior compression for both photos and graphics but has slightly less browser support. Choose based on your image type and browser compatibility requirements." },
    ],
  },
};
