import { siteConfig } from "@/config/site";

export const landAreaCalculatorSquareMeterConfig = {
  name: "Land Area Calculator (Square Meter)",
  slug: "land-area-calculator-square-meter",
  description: "Calculate and convert land area into square meters instantly. Convert square feet, acres, hectares, katha, bigha, decimal, and more with real-time results.",
  category: "land",
  icon: "📐",
  free: true,
  seo: {
    title: "Land Area Calculator – Square Meters from Any Unit",
    description: "Calculate land area in square meters from length and width, or convert acres, hectares, sq ft, sq yd and other units to m², with instant conversions.",
    keywords: [
      "land area calculator",
      "square meter calculator", 
      "convert land to square meter",
      "acre to square meter",
      "sq ft to sq meter",
      "land measurement calculator",
      "property area calculator",
      "hectare to square meter",
      "katha to square meter",
      "bigha to square meter",
    ],
    og: {
      title: "Land Area Calculator (Square Meter) – Convert Land Units Online",
      description: "Calculate and convert land area into square meters instantly. Convert square feet, acres, hectares, and more with real-time results.",
      url: `${siteConfig.url}/tools/land/land-area-calculator-square-meter`,
    },
    howToSteps: [
      { name: "Choose the mode", text: "Calculate by dimensions (length × width), or convert an area you already know." },
      { name: "Enter the values", text: "Type the length and width in meters, feet or yards, or the area and its unit." },
      { name: "Pick the precision", text: "Choose 0, 2 or 4 decimal places." },
      { name: "Read the area", text: "See the area in square meters, with conversions to square feet, acres, hectares and more, and a size comparison." },
    ],
    faq: [
      { q: "How do I calculate land area in square meters?", a: "Multiply length by width in meters. A plot 30 m × 20 m is 600 m². If you measured in feet, multiply by 0.0929: 100 × 60 ft = 6,000 sq ft = 557.4 m²." },
      { q: "How many square meters are in an acre or a hectare?", a: "1 acre = 4,046.86 m² and 1 hectare = 10,000 m², so a hectare is about 2.47 acres." },
      { q: "How do I convert square feet to square meters?", a: "Divide by 10.764 (or multiply by 0.0929). 2,500 sq ft is 232.3 m²." },
      { q: "How do I measure an irregular plot?", a: "Split it into rectangles and triangles, work out each area and add them, or use the polygon area calculator with the corner coordinates." },
      { q: "Are regional units such as Katha supported?", a: "Yes, Decimal, Katha and Bigha are included with their Bangladesh / West Bengal values; they differ by region, so check the local value for legal documents." },
    ],
  },
};