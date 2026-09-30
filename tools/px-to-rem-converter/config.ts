export const toolConfig = {
  slug: "px-to-rem-converter",
  name: "PX to REM Converter",
  description: "Convert pixel values to rem/em units with configurable base font size.",
  category: "design",
  icon: "📏",
  free: true,
  backend: false,
  seo: {
    title: "PX to REM Converter – Convert Pixels to REM or EM Instantly",
    description: "Convert pixel values to rem or em units instantly with a configurable base font size. Fast, accurate PX to REM converter for developers and designers.",
    keywords: [
      "px to rem converter",
      "pixel to rem",
      "px to em converter",
      "css rem calculator",
      "responsive css units converter",
      "rem converter",
      "em converter",
      "pixel to em",
      "css unit converter",
      "responsive design",
      "font size converter",
      "css responsive units"
    ],
    openGraph: {
      title: "PX to REM Converter – Convert Pixels to REM or EM Instantly",
      description: "Instantly convert pixel values to rem or em units with configurable base font size. Perfect for responsive web design.",
      type: "website",
      url: "/tools/design/px-to-rem-converter"
    },
    faq: [
      { q: "What is the difference between rem and em?", a: "rem is relative to the root (html) font size, so 1rem is the same everywhere on the page, usually 16px. em is relative to the parent element's font size, so it compounds when elements are nested: 1.2em inside 1.2em is 1.44 times the root size." },
      { q: "How do I convert px to rem?", a: "Divide the pixel value by the root font size: rem = px ÷ 16 with the browser default. 24px is 1.5rem, 14px is 0.875rem and 32px is 2rem." },
      { q: "What's the default base font size?", a: "The default is 16px, which is the standard browser default. You can change it to match your project." },
      { q: "Can I convert multiple values at once?", a: "Yes! Enter values separated by commas, spaces, or on new lines, and the tool will convert them all instantly." },
      { q: "Why use rem instead of px?", a: "Sizes in rem scale when a visitor raises the browser's default font size, which helps people who need larger text. Pixel sizes stay fixed and ignore that setting." },
    ],
  },
  features: [
    "Real-time px to rem/em conversion",
    "Batch conversion support",
    "Configurable base font size (8-40px)",
    "Smart px detection and removal",
    "Copy results to clipboard",
    "Copy CSS-ready output",
    "Reverse conversion (rem → px)",
    "Quick base presets (16px, 18px, 20px)",
    "Automatic precision trimming",
    "Multi-format input support",
    "Keyboard shortcuts",
    "Dark mode UI",
    "History of recent conversions",
    "Paste-cleaning (auto-remove non-numeric text)",
    "CSS snippet generator",
    "Mobile responsive design"
  ]
};
