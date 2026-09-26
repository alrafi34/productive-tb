export const toolConfig = {
  slug: "image-resizer",
  name: "Image Resizer",
  description: "Resize images to custom dimensions with aspect ratio control.",
  category: "image",
  icon: "📐",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "How does the image resizer work?", a: "Our image resizer uses the HTML5 Canvas API to resize images directly in your browser. When you upload an image, it's loaded into a canvas element and redrawn at your specified dimensions. The browser's built-in image smoothing algorithms ensure high-quality results. You can set custom width and height, maintain aspect ratio, choose output format, and control compression quality. The entire process happens client-side, meaning no data leaves your device." },
      { q: "What image formats are supported?", a: "The image resizer supports the most common web image formats: JPEG/JPG, PNG, and WebP. You can upload images in any of these formats and convert between them during the resize process. JPEG is ideal for photographs with many colors, PNG is perfect for images requiring transparency or sharp edges, and WebP offers superior compression with excellent quality. Choose the format that best suits your needs." },
      { q: "Is my data safe when using this tool?", a: "Absolutely! Your images never leave your device. All resizing operations are performed entirely in your browser using JavaScript and the Canvas API. There are no server uploads, no cloud processing, and no data storage. Your photos remain 100% private and secure on your local machine. This makes our tool perfect for resizing sensitive images, personal photos, or confidential documents." },
      { q: "Can I resize multiple images at once?", a: "Yes! Our batch image resizer supports processing multiple images simultaneously. Upload as many images as you need, and they'll all be resized using the same settings. Each image maintains its individual aspect ratio if that option is enabled. After processing, you can download all resized images at once or individually. This feature is perfect for photographers, web developers, and anyone who needs to resize large batches of images efficiently." },
      { q: "What does \"Maintain Aspect Ratio\" mean?", a: "Maintaining aspect ratio means keeping the original proportions of your image when resizing. When enabled, changing the width automatically adjusts the height (or vice versa) to prevent distortion. For example, if your original image is 2000×1000 pixels (2:1 ratio) and you set the width to 1000px with aspect ratio locked, the height automatically becomes 500px to maintain the 2:1 proportion. This prevents your images from appearing stretched or squashed." },
      { q: "How do I choose the right dimensions for my images?", a: "The right dimensions depend on your use case. For social media, use our presets: Instagram posts work best at 1080×1080px, Facebook posts at 1200×630px. For websites, consider 1920×1080px for hero images or 800×600px for content images. Email attachments should be smaller (600×400px) to reduce file size. Profile pictures typically need 256×256px or 512×512px. Our preset buttons provide quick access to common sizes, or enter custom dimensions for specific requirements. Common Use Cases Web Optimization: Resize large images to appropriate dimensions for faster website loading times and better performance.Social Media: Prepare images for Instagram, Facebook, Twitter, LinkedIn with platform-specific dimensions.Email Attachments: Reduce image dimensions to create smaller files that are easier to send via email.E-commerce: Create consistent product image sizes for online stores and marketplaces.Profile Pictures: Resize photos to meet size requirements for various platforms and applications.Print Projects: Adjust image dimensions to match specific print sizes and aspect ratios.Thumbnails: Generate small preview images for galleries, portfolios, and content management systems.Mobile Apps: Prepare images at various sizes for different screen resolutions and device types. Benefits of Using Our Image Resizer 100% Free: No subscriptions, no hidden fees, no watermarks. Resize unlimited images completely free.No Installation Required: Works directly in your browser without downloading software or plugins.Complete Privacy: All processing happens locally on your device. Your images never touch our servers.Batch Processing: Resize multiple images simultaneously with the same settings for maximum efficiency.High Quality: Advanced smoothing algorithms ensure your resized images maintain excellent quality.Format Conversion: Convert between JPEG, PNG, and WebP formats while resizing.Instant Results: No waiting for uploads or processing queues. Get resized images immediately.Mobile Friendly: Works perfectly on smartphones and tablets, not just desktop computers." },
    ],
    title: "Image Resizer – Resize JPG, PNG and WebP Online",
    description: "Resize images to an exact width and height or by percentage, keep the aspect ratio, resize several at once and download them. Nothing is uploaded.",
    keywords: [
      "image resizer",
      "resize image online",
      "free image resizer",
      "resize jpg",
      "resize png",
      "resize webp",
      "image dimension changer",
      "photo resizer",
      "batch image resize",
      "resize image by pixels",
      "custom image size",
      "maintain aspect ratio",
      "image resizer tool",
      "online photo resizer",
      "resize image width height",
      "image size reducer",
      "picture resizer",
      "resize multiple images"
    ],
    openGraph: {
      title: "Free Image Resizer - Resize Images to Custom Dimensions",
      description: "Resize images online for free. Set custom width and height with aspect ratio control. Supports JPG, PNG, and WebP.",
      type: "website",
      url: "/image-resizer"
    }
  },
  features: [
    "Custom width and height",
    "Maintain aspect ratio",
    "Batch image resizing",
    "Multiple format support",
    "Quality control",
    "Instant preview"
  ]
};
