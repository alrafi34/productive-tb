import { siteConfig } from "@/config/site";

export const bighaLandCalculatorConfig = {
  name: "Bigha Land Calculator",
  slug: "bigha-land-calculator",
  description: "Calculate and convert land area using the Bigha system. Supports Bangladesh, West Bengal, Assam, and Nepal regional standards with instant multi-unit conversion.",
  category: "land",
  icon: "📏",
  free: true,
  seo: {
    title: "Bigha Calculator – Bigha to Acre, Sq Ft and Katha",
    description: "Convert Bigha, Katha and Decimal to acres, square feet, square meters and hectares, with regional Bigha sizes or a custom value.",
    keywords: [
      "bigha calculator",
      "land calculator",
      "bigha to decimal calculator",
      "katha to bigha converter",
      "land measurement calculator",
      "acre to bigha converter",
      "bigha conversion tool",
      "bigha to square feet",
      "bigha calculator bangladesh",
      "bigha to acre converter",
    ],
    og: {
      title: "Bigha Calculator – Bigha to Acre, Sq Ft and Katha",
      description: "Convert Bigha, Katha and Decimal to acres, square feet, square meters and hectares, with regional Bigha sizes or a custom value.",
      url: `${siteConfig.url}/tools/land/bigha-land-calculator`,
    },
    howToSteps: [
      { name: "Enter the amount", text: "Type the land area to convert." },
      { name: "Choose the unit", text: "Select the unit you are converting from, such as Bigha, Katha, Decimal, acre, square feet or hectare." },
      { name: "Choose the regional standard", text: "Pick the region whose Bigha you mean, or Custom and type how many square feet one Bigha is." },
      { name: "Read the conversions", text: "See the area in every unit at once, and copy, save or export the result." },
    ],
    faq: [
      { q: "How many square feet is 1 Bigha?", a: "It depends on the region. In Bangladesh, West Bengal and Assam, 1 Bigha is 14,400 sq ft (about 1,337.8 m²). In Nepal's Terai, 1 Bigha is 72,900 sq ft (about 6,772.6 m²)." },
      { q: "How many acres is 1 Bigha?", a: "With a 14,400 sq ft Bigha, 1 Bigha is about 0.331 acre, so 1 acre is about 3.025 Bigha. A Nepali Bigha is about 1.674 acres." },
      { q: "How many Katha are in 1 Bigha?", a: "20 Katha in each of the regional standards here. A Katha is 720 sq ft where the Bigha is 14,400 sq ft, and 3,645 sq ft in Nepal." },
      { q: "How many Decimal are in 1 Bigha?", a: "A Decimal is one hundredth of an acre, 435.6 sq ft, so a 14,400 sq ft Bigha is about 33.06 Decimal." },
      { q: "Why does the Bigha differ by region?", a: "It is a traditional unit that developed separately in different areas before metric and imperial units were adopted, and some districts still use local values. Use Custom when your deed or surveyor gives a different size." },
    ],
  },
};
