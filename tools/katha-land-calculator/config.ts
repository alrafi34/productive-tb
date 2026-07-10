import { siteConfig } from "@/config/site";

export const kathaLandCalculatorConfig = {
  name: "Katha Land Calculator",
  slug: "katha-land-calculator",
  description: "Calculate and convert land area in Katha units. Supports Bangladesh, West Bengal, Bihar, and Nepal regional standards with instant multi-unit conversion.",
  category: "land",
  icon: "📏",
  free: true,
  relatedTools: [
    "decimal-land-calculator",
    "land-price-calculator",
    "acre-to-square-feet-converter",
    "square-feet-to-acre-converter",
    "hectare-to-acre-converter",
    "price-per-square-feet-calculator",
  ],
  seo: {
    title: "Katha Land Calculator — Free Katha to Decimal & Sq Ft Converter | Productive Toolbox",
    description: "Convert Katha to Decimal, Bigha, Acre, Square Feet, and more. Free land calculator for Bangladesh, West Bengal, Bihar, and Nepal. Browser-based, no signup.",
    keywords: [
      "katha land calculator",
      "kata land calculator",
      "katha to decimal",
      "katha to square feet",
      "katha to bigha",
      "katha to acre",
      "1 katha in square feet",
      "1 katha in decimal",
      "katha calculator bangladesh",
      "katha calculator nepal",
      "katha calculator bihar",
      "katha calculator west bengal",
      "decimal to katha",
      "bigha to katha",
      "katha land measurement",
      "katha land converter",
      "land measurement calculator",
      "land area converter south asia",
      "katha to square meter",
      "how many decimal in 1 katha",
      "how many katha in 1 bigha",
      "how many katha in 1 acre",
      "kata to decimal",
      "regional katha converter",
    ],
    og: {
      title: "Katha Land Calculator — Free Katha to Decimal & Sq Ft Converter",
      description: "Convert Katha to Decimal, Bigha, Acre, Square Feet, and more. Regional presets for Bangladesh, West Bengal, Bihar, and Nepal.",
      url: `${siteConfig.url}/tools/land/katha-land-calculator`,
    },
    openGraph: {
      title: "Katha Land Calculator — Free Katha to Decimal & Sq Ft Converter",
      description: "Convert Katha to Decimal, Bigha, Acre, Square Feet, and more. Regional presets for Bangladesh, West Bengal, Bihar, and Nepal.",
      type: "website",
      url: `${siteConfig.url}/tools/land/katha-land-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Land Area Value",
        text: "Type the numeric land area into the input field. Whole numbers and decimals are both accepted — for example, 5, 8.5, or 2.75. The calculator begins converting immediately as you type.",
      },
      {
        name: "Select Your Input Unit",
        text: "Choose the unit your measurement is already in — Katha, Decimal, Bigha, Acre, Square Feet, Square Meter, or Hectare. This is the base unit that all output conversions are calculated from.",
      },
      {
        name: "Choose Your Regional Standard",
        text: "Select Bangladesh, West Bengal, Bihar, or Nepal from the region dropdown. This setting controls the Katha and Bigha sizes used in every conversion. Decimal and Acre are constant across all regions.",
      },
      {
        name: "Read All Conversions at Once",
        text: "The results panel displays your value converted into every supported unit simultaneously — Katha, Decimal, Bigha, Acre, Square Feet, Square Meter, and Hectare. All outputs update in real time with no extra steps.",
      },
      {
        name: "Copy or Export Results",
        text: "Click any individual result to copy it to your clipboard. Use the export button to download the full conversion as a text file for use in property documents, legal deeds, or client reports.",
      },
    ],
    faq: [
      {
        q: "What is Katha in land measurement?",
        a: "Katha (also spelled Kata) is a traditional land measurement unit used across South Asia, particularly in Bangladesh, West Bengal, Bihar, and Nepal. It is subdivided from Bigha — there are always 20 Katha in 1 Bigha — but the absolute size of 1 Katha in square feet varies significantly by region. It is used in property deeds, residential plot sales, and agricultural land records.",
      },
      {
        q: "How many square feet is 1 Katha?",
        a: "It depends on the region. In Bangladesh and West Bengal, 1 Katha equals 720 square feet. In Bihar, 1 Katha equals 1,361.25 square feet. In Nepal, 1 Katha equals 3,645 square feet. Always confirm which regional standard applies before performing any conversion — the wrong standard can introduce errors of hundreds of square feet.",
      },
      {
        q: "How many Decimal is 1 Katha in Bangladesh?",
        a: "In Bangladesh, 1 Katha equals 720 sq ft and 1 Decimal equals 435.6 sq ft, giving 1 Katha approximately 1.653 Decimal. A 5 Katha plot is approximately 8.264 Decimal, and a 10 Katha plot is approximately 16.529 Decimal. Decimal is fixed at 435.6 sq ft in all regions.",
      },
      {
        q: "How many Katha in 1 Bigha?",
        a: "1 Bigha equals 20 Katha in all regions — Bangladesh, West Bengal, Bihar, and Nepal. The ratio is constant, but the total square footage of 1 Bigha differs because the Katha size itself varies. A Bangladesh Bigha is 14,400 sq ft while a Nepal Bigha is 72,900 sq ft.",
      },
      {
        q: "How many Katha in 1 Acre (Bangladesh)?",
        a: "1 Acre equals 43,560 sq ft. In Bangladesh where 1 Katha equals 720 sq ft, there are 60.5 Katha per Acre. In Bihar at 1,361.25 sq ft per Katha, there are approximately 32 Katha per Acre. In Nepal at 3,645 sq ft per Katha, there are approximately 11.95 Katha per Acre.",
      },
      {
        q: "What is the difference between Katha and Decimal?",
        a: "Katha and Decimal are both South Asian land area units, but Decimal is fixed at 435.6 sq ft everywhere while Katha varies by region. In Bangladesh, 1 Katha equals 1.653 Decimal, making Katha the larger unit. Decimal is commonly used for smaller residential plots; Katha is used for medium to large plots.",
      },
      {
        q: "Is kata land the same as katha land?",
        a: "Yes. Kata and Katha refer to the same unit of land measurement. The spelling varies by language and romanization preference — Bengali, Hindi, and Nepali scripts each have their own transliteration — but the measurement is identical. This calculator handles both spellings and all regional standards.",
      },
      {
        q: "Can I convert from Decimal to Katha using this tool?",
        a: "Yes. Select Decimal as your input unit and the calculator outputs the equivalent Katha value alongside every other supported unit simultaneously. Set your regional standard first — the Katha output for the same Decimal input differs between Bangladesh and Bihar.",
      },
      {
        q: "How do I find out which Katha standard my land deed uses?",
        a: "Check the district or upazila listed in your deed. Bangladesh and West Bengal deeds use 720 sq ft per Katha. Bihar deeds use 1,361.25 sq ft. Nepal deeds use 3,645 sq ft. If the region is unclear in an older deed, cross-reference the listed square footage with the Katha count — the ratio will identify the standard.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your land area values, region selections, and conversion results are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
