import { siteConfig } from "@/config/site";

export const imageConverterConfig = {
  name: "Image Converter",
  description: "Convert JPG, PNG, WebP, HEIC, GIF, BMP and AVIF images to JPG, PNG or WebP in your browser.",
  icon: "🔁",
  category: "image",
  slug: "image-converter",
  seo: {
    title: "Image Converter – JPG, PNG, WebP & HEIC Online",
    description: "Convert images between JPG, PNG and WebP, and HEIC iPhone photos to JPG. Batch convert with quality control, free and private in your browser.",
    keywords: [
      "image converter",
      "heic to jpg",
      "webp to jpg",
      "png to jpg",
      "jpg to png",
      "jpg to webp",
      "png to webp",
      "convert iphone photo to jpg",
      "online image format converter",
      "batch image converter",
    ],
    og: {
      title: "Image Converter – JPG, PNG, WebP & HEIC Online",
      description: "Convert images between JPG, PNG and WebP, and HEIC iPhone photos to JPG. Batch convert with quality control, free and private in your browser.",
      url: `${siteConfig.url}/tools/image/image-converter`,
    },
    howToSteps: [
      { name: "Add your images", text: "Drop JPG, PNG, WebP, HEIC, GIF, BMP or AVIF files on the upload area, click it to browse, or paste an image with Ctrl+V (Cmd+V on a Mac)." },
      { name: "Choose the output format", text: "Pick JPG for photos and the smallest files everywhere, PNG for screenshots, logos and transparency, or WebP for websites." },
      { name: "Set the quality", text: "For JPG and WebP, 80–90% keeps photos looking the same at a much smaller size. For JPG, choose the color that fills transparent areas." },
      { name: "Convert", text: "Click Convert. Each file shows its new size next to the original." },
      { name: "Download", text: "Download files one by one, or all of them together as a ZIP file." },
    ],
    faq: [
      { q: "Is my data private?", a: "Yes. We do not collect or store your files." },
      { q: "How do I convert HEIC photos from an iPhone to JPG?", a: "Add the .heic files and choose JPG as the output. The tool converts HEIC and saves a standard JPG that opens on Windows, Android and any website. On the iPhone itself, Settings › Camera › Formats › Most Compatible makes the camera save JPG from the start." },
      { q: "Which format should I choose: JPG, PNG or WebP?", a: "JPG is best for photos and works everywhere. PNG is lossless and keeps transparency, so it suits screenshots, logos and graphics with text, but photos become large. WebP makes files about 25–35% smaller than JPG at similar quality and supports transparency; all current browsers show it, though some older desktop software does not." },
      { q: "What happens to transparent areas when I convert to JPG?", a: "JPG has no transparency, so transparent pixels are filled with the background color you choose, white by default. Convert to PNG or WebP to keep the transparency." },
      { q: "Does converting reduce image quality?", a: "Converting to PNG is lossless. JPG and WebP are lossy: at 90% the difference is very hard to see, while below about 70% you may notice blur and blocky edges. Converting a JPG to PNG does not bring back detail the JPG already lost." },
      { q: "Is the photo's EXIF data kept?", a: "No. The new file is drawn from the pixels, so camera details and GPS location are removed, while the photo is kept the right way up. That makes converted photos safer to share online." },
      { q: "Can I convert animated GIFs?", a: "Only the first frame is converted, as a still image. Converting an animation needs a video or GIF editor." },
    ],
  },
};
