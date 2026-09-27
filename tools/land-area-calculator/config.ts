import { siteConfig } from "@/config/site";

export const landAreaCalculatorConfig = {
  name: "Land Area Calculator (Square Feet)",
  slug: "land-area-calculator-square-feet",
  description: "Calculate land area in square feet instantly from length and width. Supports feet, meters, and yards with real-time conversion.",
  category: "land",
  icon: "📐",
  free: true,
  seo: {
    title: "Land Area Calculator – Square Feet, m² and Acres",
    description: "Find the area of a rectangular lot from its length and width in feet, meters or yards, in square feet, square meters, square yards and acres.",
    keywords: [
      "land area calculator",
      "square feet calculator",
      "property size calculator",
      "land measurement calculator",
      "calculate land area online",
      "square feet area calculator",
      "land area in square feet",
      "property area calculator",
      "real estate area calculator",
      "land size calculator",
    ],
    og: {
      title: "Land Area Calculator (Square Feet) – Calculate Property Size Online",
      description: "Calculate land area in square feet instantly from length and width. Free online land area calculator with feet, meter, and yard conversion.",
      url: `${siteConfig.url}/tools/land/land-area-calculator-square-feet`,
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet, meters or yards for the lot's dimensions." },
      { name: "Enter the length", text: "Type the length of the lot." },
      { name: "Enter the width", text: "Type the width of the lot." },
      { name: "Read the area", text: "See the area in square feet, square meters, square yards and acres, updated as you type." },
      { name: "Save or share", text: "Copy the result, save it to your history or share a link to the calculation." },
    ],
    faq: [
      { q: "How do I calculate land area in square feet?", a: "Multiply the length by the width of a rectangular lot. A 50 ft × 100 ft lot is 5,000 sq ft, or about 464.5 m² and 0.115 acre. Dimensions in meters or yards are converted to feet first." },
      { q: "Can I enter dimensions in meters?", a: "Yes. Select meters and enter the dimensions; the calculator converts with 1 m = 3.28084 ft. A 20 m × 30 m plot is 600 m², or about 6,458 sq ft." },
      { q: "How many square feet are in an acre?", a: "One acre is 43,560 sq ft, about 4,047 m². A hectare is 10,000 m², about 107,639 sq ft or 2.471 acres." },
      { q: "Does this work for irregular land?", a: "It is designed for rectangles. For triangles, trapezoids or many-sided lots, use the triangle, trapezoid or polygon area calculators, or split the lot into rectangles and triangles and add the areas." },
      { q: "Is my data stored anywhere?", a: "No. Calculations run in your browser, and the history is kept only in your browser's local storage." },
    ],
  },
};
