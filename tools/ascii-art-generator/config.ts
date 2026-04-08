export const asciiArtGeneratorConfig = {
  slug: "ascii-art-generator",
  name: "ASCII Art Generator",
  description: "Convert text or images into ASCII character art. Choose font styles and density.",
  category: "creator",
  icon: "🎨",
  free: true,
  backend: false,
  seo: {
    title: "ASCII Art Generator - Convert Text & Images to ASCII Art Online",
    description: "Create ASCII art from text or images instantly. Customize character sets, density, and width. Download as TXT or PNG for free.",
    keywords: [
      "ASCII art generator",
      "text to ASCII",
      "image to ASCII",
      "ASCII converter",
      "ASCII text art",
      "ASCII art maker",
      "create ASCII art",
      "ASCII art online",
      "ASCII character art",
      "ASCII art tool",
      "ASCII art creator",
      "ASCII art download",
      "ASCII art PNG",
      "ASCII art TXT",
      "ASCII art styles"
    ],
    openGraph: {
      title: "ASCII Art Generator - Create ASCII Art from Text or Images",
      description: "Convert text or images into ASCII character art with customizable styles and density. Download as TXT or PNG.",
      type: "website",
      url: "/tools/creator/ascii-art-generator"
    }
  },
  features: [
    "Text to ASCII conversion",
    "Image to ASCII conversion",
    "Adjustable output width (40-200 characters)",
    "Customizable character density",
    "Multiple character sets (standard, detailed, minimal, custom)",
    "Different ASCII styles (block, outline, shadow, simple, terminal)",
    "Real-time preview",
    "Copy to clipboard",
    "Download as TXT file",
    "Download as PNG image",
    "Drag-and-drop image upload",
    "History tracking with localStorage",
    "100% browser-based processing",
    "No server required",
    "Mobile-optimized interface"
  ]
};

export const config = asciiArtGeneratorConfig;
