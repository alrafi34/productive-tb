import { siteConfig } from "@/config/site";

export const landPriceCalculatorConfig = {
  name: "Land Price Calculator",
  slug: "land-price-calculator",
  description: "Calculate total land cost instantly using area size and rate per unit. Supports Decimal, Acre, Katha, Bigha, Square Feet, Square Meter, and Hectare with multi-currency output.",
  category: "land",
  icon: "💰",
  free: true,
  backend: false,
  seo: {
    title: "Land Price Calculator — Free Land Value Calculator Online | Productive Toolbox",
    description: "Calculate total land price from area and rate per unit. Free land value calculator for Decimal, Acre, Katha, Bigha, and Sq Feet. Multi-currency, no signup.",
    keywords: [
      "land price calculator",
      "land value calculator",
      "land rate calculator",
      "calculate land price",
      "property price calculator",
      "land price per square feet",
      "land price per decimal",
      "land cost calculator",
      "land price calculator online",
      "land valuation calculator",
      "agricultural land value calculator",
      "land appraisal calculator",
      "calculate value of land",
      "land price per square meter",
      "katha price calculator",
      "bigha price calculator",
      "decimal land price calculator",
      "land price calculator bangladesh",
      "property cost calculator",
      "land price per acre",
      "land rate per square foot",
      "real estate land calculator",
      "free land price calculator",
      "land price comparison calculator",
      "land price calculator no signup",
    ],
    openGraph: {
      title: "Land Price Calculator — Free Land Value Calculator Online",
      description: "Calculate total land price from area and rate per unit. Supports Decimal, Acre, Katha, Bigha, Sq Feet, and more. Multi-currency, browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/land/land-price-calculator`,
    },
    og: {
      title: "Land Price Calculator — Free Land Value Calculator Online",
      description: "Calculate total land price from area and rate per unit. Supports Decimal, Acre, Katha, Bigha, Sq Feet, and more. Multi-currency, browser-based.",
      url: `${siteConfig.url}/tools/land/land-price-calculator`,
    },
    howToSteps: [
      {
        name: "Enter the Land Area",
        text: "Type the numeric area of the plot into the area field. Enter the value in whatever unit you know — Decimal, Acre, Katha, Bigha, Square Feet, Square Meter, or Hectare. The area and rate units can differ; the tool converts between them automatically.",
      },
      {
        name: "Select the Area Unit and Rate Unit",
        text: "Choose the unit that matches your entered area, then select the unit your price rate refers to. If the area is in Acres but the rate is per Decimal, select both separately — the conversion is applied automatically before calculating the total.",
      },
      {
        name: "Enter the Price Rate Per Unit",
        text: "Type the price for one unit of land area — for example, 500000 if the rate is BDT 500,000 per Decimal, or 120 if the rate is $120 per square foot. Then choose your currency: USD, EUR, GBP, BDT, or INR.",
      },
      {
        name: "Read the Total Price",
        text: "The total land price appears instantly. If the area and rate units differ, the converted area is shown alongside the total so you can verify the calculation. The breakdown table shows the price at 25%, 50%, 75%, and 100% of the entered area.",
      },
      {
        name: "Use Comparison Mode for Multiple Deals",
        text: "Switch to comparison mode to enter two separate land deals side by side. Both totals are calculated simultaneously and the cheaper option is highlighted with the price difference shown — useful for evaluating competing listings.",
      },
    ],
    faq: [
      {
        q: "What is a land price calculator?",
        a: "A land price calculator is a free online tool that computes the total cost of a land parcel by multiplying the area size by the price rate per unit. It supports all major South Asian and international land units — Decimal, Acre, Katha, Bigha, Square Feet, Square Meter, and Hectare — and handles unit conversion automatically when the area and rate units differ.",
      },
      {
        q: "How is total land price calculated?",
        a: "Total land price equals Area multiplied by Rate Per Unit. When the area unit and rate unit are the same, the calculation is direct. When they differ — for example, area in Acres but rate in Decimal — the tool first converts the area to match the rate unit, then multiplies. For a 2-Acre plot at BDT 800,000 per Decimal, the tool converts 2 Acres to 200 Decimal, then calculates 200 times 800,000 equals BDT 160,000,000.",
      },
      {
        q: "What is land price per square foot and how do I calculate it?",
        a: "Land price per square foot is the rate divided by 1 square foot of area. To calculate total price, multiply the total area in square feet by the rate. For example, 3,000 square feet at $120 per square foot equals $360,000. Select Square Feet as both the area and rate unit and the calculator multiplies directly.",
      },
      {
        q: "How do I calculate land value per acre?",
        a: "Enter the total area in Acres and the price per Acre as the rate. The calculator multiplies them directly — for example, 3.5 Acres at $45,000 per Acre equals $157,500. Alternatively, if you only know the price per square foot, set the rate unit to Square Feet and the area unit to Acres — the tool converts automatically.",
      },
      {
        q: "What currencies does this calculator support?",
        a: "The calculator supports USD ($), EUR (euro), GBP (pound sterling), BDT (Bangladeshi Taka), and INR (Indian Rupee). The selected currency symbol appears in the result display. Currency conversion between units is not performed — the tool applies the currency symbol to the entered rate and calculates the total in that currency.",
      },
      {
        q: "Can I compare two land deals with this calculator?",
        a: "Yes. The comparison mode lets you enter two separate land deals — each with its own area, unit, and rate — and see both totals side by side with a clear indication of which is cheaper and by how much. This is useful when evaluating multiple listings or negotiating between two sellers.",
      },
      {
        q: "What is the land rate calculator and how is it different from a land price calculator?",
        a: "A land rate calculator works in reverse: you enter the total price and the area, and it calculates the rate per unit. A land price calculator takes the area and rate and calculates the total. This tool does both — if you know a plot sold for BDT 3,500,000 and it was 7 Decimal, the rate was BDT 500,000 per Decimal.",
      },
      {
        q: "How do I calculate land price per square meter?",
        a: "Select Square Meter as both the area unit and the rate unit. Enter the area in square meters and the price per square meter. For example, 250 square meters at $1,200 per square meter equals $300,000. If your area is in Decimal but your rate is per square meter, select both separately and the conversion is applied automatically.",
      },
      {
        q: "What is agricultural land value and how is it estimated?",
        a: "Agricultural land value depends on soil quality, water access, crop yield potential, and local comparable sales. This calculator does not determine market value — it computes the total cost once you know the price per unit from market research or a professional appraisal. For agricultural land in South Asia, Decimal and Bigha are the most common rate units.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your land values, rates, and inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is saved only in your browser's localStorage and remains on your device.",
      },
    ],
  },
  features: [
    "Total land price from area and rate per unit",
    "Automatic unit conversion when area and rate units differ",
    "Supports Decimal, Acre, Katha, Bigha, Square Feet, Square Meter, Hectare",
    "Multi-currency: USD, EUR, GBP, BDT, INR",
    "Price breakdown at 25%, 50%, 75%, 100% area",
    "Comparison mode for two deals side by side",
    "Real-time results as you type",
    "Save and export calculation history",
    "100% browser-based — no data sent to any server",
    "No registration required",
  ],
  relatedTools: [
    "decimal-land-calculator",
    "land-valuation-calculator",
    "land-area-calculator-square-meter",
    "katha-land-calculator",
    "price-per-square-feet-calculator",
    "land-development-cost-calculator",
  ],
};
