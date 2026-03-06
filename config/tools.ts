export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  free: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences instantly.",
    category: "writing",
    icon: "📝",
    free: true,
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Reduce image file size without losing quality.",
    category: "image",
    icon: "🖼️",
    free: true,
  },
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for any URL or text.",
    category: "creator",
    icon: "📱",
    free: true,
  },
  {
    slug: "text-case-converter",
    name: "Case Converter",
    description: "Convert text to upper, lower, title case and more.",
    category: "writing",
    icon: "🔡",
    free: true,
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to any dimension in seconds.",
    category: "image",
    icon: "📐",
    free: true,
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time",
    description: "Estimate how long it takes to read any text.",
    category: "writing",
    icon: "⏱️",
    free: true,
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calc",
    description: "Calculate percentages, discounts, and ratios.",
    category: "math",
    icon: "🔢",
    free: true,
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick, convert, and export colors in any format.",
    category: "creator",
    icon: "🎨",
    free: true,
  },
];

export const categories: Category[] = [
  {
    slug: "writing",
    name: "Writing Tools",
    description: "Word counters, case converters, readability tools.",
    icon: "✍️",
  },
  {
    slug: "image",
    name: "Image Tools",
    description: "Compress, resize, and convert images easily.",
    icon: "🖼️",
  },
  {
    slug: "math",
    name: "Math Tools",
    description: "Calculators, converters, and number utilities.",
    icon: "🔢",
  },
  {
    slug: "creator",
    name: "Creator Tools",
    description: "QR codes, color pickers, and design helpers.",
    icon: "🎨",
  },
];
