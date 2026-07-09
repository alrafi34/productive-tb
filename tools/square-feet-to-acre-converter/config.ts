import { siteConfig } from "@/config/site";

export const squareFeetToAcreConverterConfig = {
  name: "Square Feet to Acre Converter",
  slug: "square-feet-to-acre-converter",
  description: "Convert square feet to acres instantly. Free online land area converter with full reference table, reverse conversion, precision control, and conversion history. Browser-based, no signup.",
  category: "land",
  icon: "🔄",
  free: true,
  seo: {
    title: "Square Feet to Acres Converter — Free sq ft to Acres | Productive Toolbox",
    description: "Convert square feet to acres instantly. 43,560 sq ft = 1 acre. Full reference table, reverse conversion, precision control. Free, browser-based, no signup.",
    keywords: [
      "square feet to acres",
      "square feet to acre converter",
      "sq ft to acres",
      "convert square feet to acres",
      "square feet to acres converter",
      "10890 square feet to acres",
      "43560 square feet to acres",
      "how many acres is 1000 square feet",
      "how many acres is 10890 square feet",
      "how many acres is 5000 square feet",
      "square feet to acre calculator",
      "sq ft to acre calculator",
      "land area converter",
      "acres to square feet",
      "convert sq ft to acres",
      "square footage to acres",
      "property area calculator",
      "real estate area converter",
      "square feet in an acre",
      "sq ft per acre",
      "how many sq ft in an acre",
      "square foot to acre conversion",
      "land measurement converter",
      "lot size converter",
      "free square feet to acres converter",
    ],
    openGraph: {
      title: "Square Feet to Acres Converter — Free sq ft to Acres",
      description: "Convert square feet to acres instantly. 43,560 sq ft = 1 acre. Full reference table, reverse conversion, precision control. Free, browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/land/square-feet-to-acre-converter`,
    },
    og: {
      title: "Square Feet to Acres Converter — Free sq ft to Acres",
      description: "Convert square feet to acres instantly. 43,560 sq ft = 1 acre. Full reference table, reverse conversion, precision control. Free, browser-based.",
      url: `${siteConfig.url}/tools/land/square-feet-to-acre-converter`,
    },
    howToSteps: [
      {
        name: "Enter Your Square Feet Value",
        text: "Type any number of square feet into the input field. Decimals are fully supported. The acre result appears instantly as you type with no submit button needed.",
      },
      {
        name: "Read the Acre Result",
        text: "The acre equivalent displays immediately. For 43,560 sq ft the result is exactly 1 acre. For 10,890 sq ft it is 0.25 acres. Large numbers are formatted with commas for readability.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Use the precision selector to choose 0, 2, 4, or 6 decimal places. Two decimals suits most property comparisons; 4 to 6 decimal places is appropriate for legal documents and survey records.",
      },
      {
        name: "Use Presets for Common Values",
        text: "Click any preset button for common lot sizes — 10,890 (quarter acre), 21,780 (half acre), 43,560 (one acre), or 87,120 (two acres) sq ft — to instantly load that value.",
      },
      {
        name: "Swap to Acres to Square Feet",
        text: "Click the swap button to reverse the conversion direction — enter acres and receive square feet. The same tool covers both directions without navigating away.",
      },
      {
        name: "Copy or Export Your Result",
        text: "Click copy to send the result to clipboard for pasting into a listing, permit form, or spreadsheet. Download a text report of your conversion history for documentation.",
      },
    ],
    faq: [
      {
        q: "How many acres is 1,000 square feet?",
        a: "1,000 square feet equals 0.02296 acres. Calculation: 1,000 divided by 43,560 = 0.02296. Small urban lots, studio apartments, and individual commercial units described in square feet can be expressed in acres using this exact conversion.",
      },
      {
        q: "How many acres is 10,890 square feet?",
        a: "10,890 square feet equals exactly 0.25 acres — a quarter acre. This is one of the most commonly searched conversions because 0.25 acres is the standard residential lot size in most US suburban developments.",
      },
      {
        q: "How many acres is 43,560 square feet?",
        a: "43,560 square feet equals exactly 1 acre. This is the definition of an acre. If a deed or survey describes a parcel as 43,560 square feet, it is precisely 1.0 acres.",
      },
      {
        q: "What is the formula to convert square feet to acres?",
        a: "Acres = Square Feet divided by 43,560. For the reverse: Square Feet = Acres times 43,560. The divisor 43,560 is exact, derived from the historical chain-and-furlong surveying system. There is no rounding in this conversion.",
      },
      {
        q: "How many acres is 5,000 square feet?",
        a: "5,000 square feet equals 0.1148 acres. Calculation: 5,000 divided by 43,560 = 0.1148. This is a typical small urban lot or large commercial unit footprint.",
      },
      {
        q: "How many acres is 2,000 square feet?",
        a: "2,000 square feet equals 0.0459 acres. Calculation: 2,000 divided by 43,560 = 0.04592. Most residential homes have a floor area of 1,500 to 3,000 sq ft, which shows how small a building footprint is relative to even a quarter-acre lot.",
      },
      {
        q: "Can I convert acres back to square feet with this tool?",
        a: "Yes. Use the swap button to reverse the direction and enter acres to receive square feet. The same tool covers both sq ft to acres and acres to sq ft. For dedicated reverse conversion, the acre-to-square-feet-converter is the companion tool linked from this page.",
      },
      {
        q: "Is the square foot the same everywhere?",
        a: "Yes. The international foot is defined as exactly 0.3048 meters, making 1 square foot exactly 0.092903 square meters. The US survey foot differs by about 2 parts per million, negligible for all property and land measurement purposes. This converter uses the international definition.",
      },
      {
        q: "How precise is this converter?",
        a: "The converter uses the exact factor of 43,560 sq ft per acre with no approximation. You can select 0, 2, 4, or 6 decimal places. For legal documents and survey applications, use 4 to 6 decimal places. For casual property comparisons, 2 decimal places is sufficient.",
      },
      {
        q: "Is my data private when using this converter?",
        a: "Yes. All conversions run entirely in your browser using JavaScript. Your inputs are never sent to any server, stored in any database, or accessible to anyone other than you. The tool works fully offline once the page has loaded.",
      },
    ],
  },
  relatedTools: [
    "acre-to-square-feet-converter",
    "hectare-to-acre-converter",
    "acre-to-hectare-converter",
    "land-price-calculator",
    "price-per-square-feet-calculator",
    "land-area-calculator-square-meter",
  ],
};
