import { siteConfig } from "@/config/site";

export const acreToSquareFeetConverterConfig = {
  name: "Acre to Square Feet Converter",
  slug: "acre-to-square-feet-converter",
  description: "Convert acres to square feet instantly. Free online land area converter with full reference table, precision control, and conversion history. Browser-based, no signup.",
  category: "land",
  icon: "🔄",
  free: true,
  seo: {
    title: "Acre to Square Feet Converter — Free Acres to Sq Ft | Productive Toolbox",
    description: "Convert acres to square feet instantly. 1 acre = 43,560 sq ft. Full reference table, common values, precision control. Free, browser-based, no signup.",
    keywords: [
      "acre to square feet",
      "acres to square feet",
      "acre to sq ft",
      "convert acres to square feet",
      "acres to sq ft converter",
      "square feet to acres",
      "0.25 acres to sq ft",
      "0.5 acres to square feet",
      "1 acre in square feet",
      "how many square feet in an acre",
      "how many square feet is an acre",
      "acreage to square feet",
      "land area converter",
      "property size converter",
      "10890 sq ft to acres",
      "43560 square feet",
      "acre sq ft calculator",
      "acre conversion",
      "square footage of an acre",
      "acres to square feet formula",
      "free acre to square feet converter",
      "land measurement converter",
      "real estate area converter",
      "acres in square feet",
      "sq ft per acre",
    ],
    openGraph: {
      title: "Acre to Square Feet Converter — Free Acres to Sq Ft",
      description: "Convert acres to square feet instantly. 1 acre = 43,560 sq ft. Full reference table, common values, precision control. Free, browser-based, no signup.",
      type: "website",
      url: `${siteConfig.url}/tools/land/acre-to-square-feet-converter`,
    },
    og: {
      title: "Acre to Square Feet Converter — Free Acres to Sq Ft",
      description: "Convert acres to square feet instantly. 1 acre = 43,560 sq ft. Full reference table, common values, precision control. Free, browser-based, no signup.",
      url: `${siteConfig.url}/tools/land/acre-to-square-feet-converter`,
    },
    howToSteps: [
      {
        name: "Enter Your Acre Value",
        text: "Type any number of acres into the input field. Decimals are fully supported — 0.25, 0.5, 1.75, or 100 all work. The square feet result appears instantly as you type.",
      },
      {
        name: "Read the Square Feet Result",
        text: "The square feet equivalent displays immediately. For 1 acre the result is 43,560 sq ft. For 0.25 acres it is 10,890 sq ft. Large numbers are formatted with commas for readability.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Use the precision selector to choose 0, 2, 4, or 6 decimal places. Zero decimals is standard for property sizes; 4 or 6 decimal places suits legal documents and survey applications.",
      },
      {
        name: "Use Presets for Common Values",
        text: "Click any preset button — 0.25, 0.5, 1, 5, or 10 acres — to instantly load that value. Presets cover the most common residential and agricultural lot sizes.",
      },
      {
        name: "Copy or Export Your Result",
        text: "Click the copy button to send the result to clipboard for pasting into a listing, spreadsheet, or permit form. Use the download button to save a text report of your conversion history.",
      },
      {
        name: "Check Conversion History",
        text: "The tool saves your last 10 conversions locally in your browser. Click any history entry to reload that input value instantly — useful when comparing multiple property sizes.",
      },
    ],
    faq: [
      {
        q: "How many square feet are in 1 acre?",
        a: "1 acre equals exactly 43,560 square feet. This is the legally defined value derived from the historical surveying chain system: 1 acre = 10 square chains = 10 × 66 ft × 66 ft = 43,560 sq ft. It is a fixed, exact value used in all real estate, agricultural, and land surveying contexts.",
      },
      {
        q: "How many square feet is 0.25 acres?",
        a: "0.25 acres equals 10,890 square feet. Calculation: 0.25 × 43,560 = 10,890. A quarter-acre lot is the most common residential lot size in US suburban developments — roughly a 104 ft × 104 ft square, or a 75 ft × 145 ft rectangular lot.",
      },
      {
        q: "How many square feet is 0.5 acres?",
        a: "0.5 acres equals 21,780 square feet. Calculation: 0.5 × 43,560 = 21,780. A half-acre lot laid out as a square would be approximately 147.6 ft × 147.6 ft. Half-acre lots are common in semi-rural residential developments.",
      },
      {
        q: "How many acres is 10,890 square feet?",
        a: "10,890 square feet equals exactly 0.25 acres. Calculation: 10,890 ÷ 43,560 = 0.25. This is the standard US quarter-acre residential parcel. To convert square feet to acres, divide by 43,560.",
      },
      {
        q: "How many acres is 43,560 square feet?",
        a: "43,560 square feet equals exactly 1 acre. This is the definition of an acre. A property listing that says 43,560 sq ft is precisely 1.0 acres — the size of a standard American football field from end zone to end zone.",
      },
      {
        q: "What is the formula to convert acres to square feet?",
        a: "Square Feet = Acres × 43,560. For the reverse: Acres = Square Feet ÷ 43,560. Both use the exact factor of 43,560 with no approximation. A rough mental shortcut is to multiply by 44,000, which overestimates by about 1 percent — fine for casual checks but not for legal documents.",
      },
      {
        q: "How big is an acre visually?",
        a: "One acre is approximately the size of an American football field without the end zones, or a square with sides of about 208.7 feet (63.6 meters). A standard city block is roughly 2 to 3 acres, and a typical suburban quarter-acre lot is 10,890 sq ft.",
      },
      {
        q: "Can I convert square feet back to acres with this tool?",
        a: "This tool converts acres to square feet. To convert square feet back to acres, use the square-feet-to-acre-converter, which is the companion tool for the reverse direction. For quick reference: divide your square feet by 43,560 to get acres.",
      },
      {
        q: "Is the acre the same in the US and UK?",
        a: "Yes. The international acre used in the US, UK, and most countries is defined as exactly 43,560 square feet or 4,046.856 square meters. An older US survey acre equals 43,560.174 square feet — a difference of 0.0004 percent that is negligible for all practical purposes and only appears in some older western US government land descriptions.",
      },
      {
        q: "Is my data private when using this converter?",
        a: "Yes. All conversions run entirely in your browser using JavaScript. Your inputs are never sent to any server, stored in any database, or accessible to anyone other than you. The tool works fully offline once the page has loaded.",
      },
    ],
  },
  relatedTools: [
    "square-feet-to-acre-converter",
    "hectare-to-acre-converter",
    "acre-to-hectare-converter",
    "land-price-calculator",
    "land-area-calculator-square-meter",
    "price-per-square-feet-calculator",
  ],
};
