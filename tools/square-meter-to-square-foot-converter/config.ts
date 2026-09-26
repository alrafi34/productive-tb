export const toolConfig = {
  slug: "square-meter-to-square-foot-converter",
  name: "Square Meter to Square Foot Converter",
  description: "Convert area measurements from square meters (m²) to square feet (ft²) instantly and accurately.",
  category: "calculator",
  icon: "📐",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "How many square feet is 1 square meter?", a: "1 square meter equals 10.7639104 square feet." },
      { q: "How many square feet are in 100 square meters?", a: "100 square meters equals 1,076.391 square feet." },
      { q: "Can I convert square feet back to square meters?", a: "Yes. The tool supports reverse conversion with one click via the direction toggle." },
      { q: "What precision should I use for property listings?", a: "For public listings, 1 to 2 decimal places is usually enough. For technical planning, you can use 3 to 6 decimals." },
      { q: "Does this converter work for large land areas?", a: "Yes for raw area conversion. For acre, hectare, or plot-focused workflows, you may want a dedicated land area converter as a follow-up step." },
      { q: "Can I process multiple values at once?", a: "Yes. Use batch mode to paste many values and export results as a CSV file." },
      { q: "Is my data uploaded to a server?", a: "No. This tool performs conversion directly in your browser." },
      { q: "Is conversion history private?", a: "Yes. Saved history is stored locally in your browser and not sent anywhere." },
      { q: "Do I need to install anything?", a: "No installation is needed. Open the page and start converting instantly." },
    ],
    title: "Square Meter to Square Foot Converter (m2 to ft2) Online",
    description: "Free square meter to square foot converter with reverse conversion (ft2 to m2), precision control, batch mode, and CSV export.",
    keywords: [
      "square meter to square foot converter",
      "m2 to ft2 converter",
      "ft2 to m2 converter",
      "area unit converter",
      "square meter calculator",
      "square feet calculator",
      "sq m to sq ft",
      "sq ft to sq m",
      "real estate area converter"
    ],
    openGraph: {
      title: "Square Meter to Square Foot Converter - Instant Area Conversion",
      description: "Convert m2 and ft2 instantly with precision settings, batch conversion, and local history.",
      type: "website",
      url: "/tools/square-meter-to-square-foot-converter"
    }
  },
  features: [
    "Bidirectional conversion (m2 to ft2 and ft2 to m2)",
    "Real-time conversion while typing",
    "Adjustable decimal precision (0-6 places)",
    "Quick area presets for common values",
    "Visual area comparison tool",
    "Batch conversion mode with CSV export",
    "Conversion history stored locally",
    "Export results to CSV"
  ]
};
