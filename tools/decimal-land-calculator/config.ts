import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "decimal-land-calculator",
  name: "Decimal Land Calculator",
  description: "Convert Decimal and Shotok land units to Acre, Katha, Bigha, Square Feet, Square Meter, Hectare, and Cent. Supports Bangladesh, West Bengal, Bihar, Nepal, and global standards.",
  category: "land",
  icon: "🔢",
  free: true,
  backend: false,
  seo: {
    title: "Decimal Land Calculator — Free Shotok to Decimal Converter | Productive Toolbox",
    description: "Convert Decimal (Shotok) to Acre, Katha, Bigha, and Sq Feet instantly. Free land calculator for Bangladesh, India, and Nepal. Browser-based, no signup.",
    keywords: [
      "decimal land calculator",
      "shotok to decimal",
      "decimal to acre",
      "1 acre to decimal",
      "decimal to square feet",
      "shotok to square feet",
      "decimal land measurement",
      "land decimal calculator",
      "katha to decimal",
      "decimal to katha",
      "bigha to decimal",
      "decimal to bigha",
      "land measurement converter",
      "decimal land converter bangladesh",
      "shotok to acre",
      "1 decimal to square feet",
      "100 decimal to acre",
      "decimal to hectare",
      "land area calculator bangladesh",
      "1 shotok to decimal",
      "shotok land calculator",
      "decimal to cent",
      "acre to decimal converter",
      "land conversion calculator",
      "south asia land calculator",
    ],
    openGraph: {
      title: "Decimal Land Calculator — Free Shotok to Decimal Converter",
      description: "Convert Decimal and Shotok land units to Acre, Katha, Bigha, Square Feet, and more. Free, regional presets for Bangladesh, India, Nepal.",
      type: "website",
      url: `${siteConfig.url}/tools/land/decimal-land-calculator`,
    },
    og: {
      title: "Decimal Land Calculator — Free Shotok to Decimal Converter",
      description: "Convert Decimal and Shotok land units to Acre, Katha, Bigha, Square Feet, and more. Free, regional presets for Bangladesh, India, Nepal.",
      url: `${siteConfig.url}/tools/land/decimal-land-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Land Area Value",
        text: "Type the numeric land area into the input field. You can enter whole numbers or decimals — for example, 8, 2.5, or 33.06. The calculator begins converting immediately as you type.",
      },
      {
        name: "Select Your Input Unit",
        text: "Choose the unit you are converting from — Decimal/Shotok, Acre, Katha, Bigha, Square Feet, Square Meter, Hectare, or Cent. The input unit determines the base value for all output conversions.",
      },
      {
        name: "Choose Your Regional Standard",
        text: "Select the region that matches your land records: Bangladesh, West Bengal, Bihar, Nepal, or Global Standard. This affects Katha and Bigha sizes, which differ significantly by region.",
      },
      {
        name: "Read All Conversions Simultaneously",
        text: "The results panel displays your value converted into all supported units at once — Decimal, Acre, Katha, Bigha, Square Feet, Square Meter, Hectare, and Cent — with no need to run separate calculations.",
      },
      {
        name: "Copy or Export Your Result",
        text: "Click any result to copy it to clipboard, or use the export button to download the full conversion as a text file for use in legal documents, property records, or client reports.",
      },
    ],
    faq: [
      {
        q: "What is a decimal land calculator?",
        a: "A decimal land calculator is a free online tool that converts land area measurements between Decimal and other units — Acre, Katha, Bigha, Shotok, Square Feet, Square Meter, Hectare, and Cent. It is used across South Asia, particularly in Bangladesh, West Bengal, Bihar, and Nepal, where Decimal (also called Shotok in Bengali) is the standard base unit for residential and agricultural land records.",
      },
      {
        q: "What is Decimal in land measurement?",
        a: "Decimal is a unit of land area equal to 435.6 square feet or 40.47 square meters. It is 1/100th of an Acre — meaning 100 Decimal equals exactly 1 Acre. It is widely used in Bangladesh and eastern India for recording plot sizes in property deeds, government land records, and real estate transactions. It is also called Shotok in Bengali.",
      },
      {
        q: "What is Shotok and how does it relate to Decimal?",
        a: "Shotok is the Bengali word for Decimal. They represent the same unit of land measurement — 1 Shotok equals 1 Decimal equals 435.6 square feet. In Bangladesh, land records and sales agreements often use Shotok while official government documents may use Decimal. This calculator accepts input in either term and converts correctly to all other units.",
      },
      {
        q: "How many Decimal in 1 Acre?",
        a: "1 Acre equals exactly 100 Decimal (or 100 Shotok). Since 1 Acre equals 43,560 square feet and 1 Decimal equals 435.6 square feet, dividing gives precisely 100. A 50 Decimal plot is half an acre; a 25 Decimal plot is a quarter acre.",
      },
      {
        q: "How many square feet in 1 Decimal?",
        a: "1 Decimal equals 435.6 square feet. This value is fixed and consistent across Bangladesh, West Bengal, Bihar, Nepal, and global standards. What varies by region is how many Decimals make up 1 Katha and 1 Bigha — those relationships differ between Bangladesh, Bihar, and Nepal.",
      },
      {
        q: "How many Decimal in 1 Katha (Bangladesh)?",
        a: "In Bangladesh, 1 Katha equals 720 square feet. Since 1 Decimal equals 435.6 square feet, 1 Katha equals approximately 1.653 Decimal. In Bihar, 1 Katha equals 1,361.25 square feet, making 1 Katha equal to approximately 3.125 Decimal — a significantly different value. Always select the correct regional preset.",
      },
      {
        q: "How many Decimal in 1 Bigha (Bangladesh)?",
        a: "In Bangladesh, 1 Bigha equals 14,400 square feet, which equals approximately 33.06 Decimal. In Bihar, 1 Bigha equals 27,225 square feet (approximately 62.5 Decimal), and in Nepal, 1 Bigha equals 72,900 square feet (approximately 167.3 Decimal). Always confirm which regional standard applies to your land records.",
      },
      {
        q: "How do I convert Shotok to Decimal?",
        a: "No conversion is needed — 1 Shotok equals 1 Decimal exactly. They are the same unit. If a land document lists a plot as 8 Shotok, that plot is 8 Decimal, which equals 3,484.8 square feet or 0.08 Acre. Enter the value in this calculator and select Decimal as the input unit to see all conversions instantly.",
      },
      {
        q: "How do I convert 1 Acre to Decimal?",
        a: "1 Acre equals 100 Decimal. To convert any acreage to Decimal, multiply by 100. For example: 0.5 Acres equals 50 Decimal, 2.5 Acres equals 250 Decimal, 0.25 Acres equals 25 Decimal. Enter any value in this calculator and it performs all conversions instantly.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your land values and inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you. You can safely enter real property measurements or data from legal documents without any information leaving your device.",
      },
    ],
  },
  features: [
    "Instant conversion across 9 land units simultaneously",
    "Regional presets: Bangladesh, West Bengal, Bihar, Nepal, Global",
    "Decimal / Shotok input and output support",
    "Acre, Katha, Bigha, Cent conversions",
    "Square Feet, Square Meter, Hectare",
    "Real-time results as you type",
    "Copy individual results to clipboard",
    "Export full conversion as text file",
    "100% browser-based — no data sent to any server",
    "No registration required",
  ],
  relatedTools: [
    "acre-to-hectare-converter",
    "hectare-to-acre-converter",
    "katha-land-calculator",
    "bigha-land-calculator",
    "land-area-calculator-square-meter",
    "acre-to-square-feet-converter",
  ],
};

// Alias export to satisfy existing import in app/tools/[tool]/[subtool]/page.tsx
export const decimalLandCalculatorConfig = toolConfig;
