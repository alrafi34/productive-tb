export const toolConfig = {
  id: "image-to-grayscale",
  slug: "image-to-grayscale",
  name: "Image to Grayscale",
  description: "Convert images to grayscale (black and white) instantly in your browser. Adjust intensity, brightness, contrast, and preview before downloading.",
  category: "image",
  icon: "⚫",
  keywords: ["grayscale converter", "black and white", "image filter", "grayscale image", "desaturate image", "monochrome converter", "bw converter"],
  seo: {
    faq: [
      { q: "What's the difference between grayscale and black & white?", a: "Grayscale images contain shades of gray between pure black and pure white, typically 256 different levels. True black and white (binary) images contain only two colors: black or white with no gray tones. Grayscale provides much more detail and is what most people mean when they say \"black and white photo.\"" },
      { q: "How does the intensity slider work?", a: "The intensity slider controls how much grayscale is applied. At 0%, you see the original color image. At 100%, you get full grayscale. Values in between blend the original colors with the grayscale version, creating a partially desaturated effect that can be useful for subtle artistic effects." },
      { q: "What does the invert option do?", a: "The invert option creates a negative image by reversing all gray values. Dark areas become light and light areas become dark. This can create interesting artistic effects or simulate photographic negatives. It's particularly useful for creating high-contrast designs or preparing images for certain printing processes." },
      { q: "Will converting to grayscale reduce file size?", a: "Not significantly with PNG format, as the file still stores RGB values (they just happen to be equal). However, grayscale images often compress better and can be saved in true grayscale formats that use less data. The main benefit is visual simplicity rather than file size reduction." },
    ],
    title: "Image to Grayscale – Make a Photo Black and White",
    description: "Convert any PNG, JPG or GIF image to grayscale (black and white) in your browser, preview it next to the original and download the result.",
    keywords: "image to grayscale, black and white converter, grayscale filter, desaturate image, monochrome image, bw converter, image grayscale online",
    openGraph: {
      title: "Free Image to Grayscale Converter – Black & White Filter",
      description: "Convert any image to grayscale with adjustable intensity, brightness, and contrast. Instant preview and download.",
    },
  },
};
