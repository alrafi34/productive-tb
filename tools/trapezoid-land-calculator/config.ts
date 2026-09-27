import { siteConfig } from "@/config/site";

export const trapezoidLandCalculatorConfig = {
  name: "Trapezoid Land Calculator",
  slug: "trapezoid-land-calculator",
  description: "Calculate trapezoid-shaped land area instantly. Enter top base, bottom base, and height for accurate area results with unit conversions.",
  category: "land",
  icon: "📐",
  free: true,
  seo: {
    title: "Trapezoid Land Area Calculator – Sq Ft, m² & Acres",
    description: "Calculate the area of a trapezoid-shaped plot from its two parallel sides and the distance between them, in square feet, square meters, acres or hectares.",
    keywords: [
      "trapezoid land calculator",
      "land area calculator",
      "trapezoid area formula",
      "survey land calculator",
      "plot area calculator",
      "trapezoid measurement tool",
      "trapezoidal plot area",
      "land measurement calculator",
      "trapezoid area calculator",
    ],
    og: {
      title: "Free Trapezoid Land Calculator – Calculate Trapezoid Area Online",
      description: "Calculate trapezoid land area instantly using accurate formulas. Enter top base, bottom base, and height to measure land area online with automatic unit conversion.",
      url: `${siteConfig.url}/tools/land/trapezoid-land-calculator`,
    },
    howToSteps: [
      { name: "Choose the input unit", text: "Select feet, meters, yards or inches." },
      { name: "Enter the parallel sides", text: "Type the lengths of the two parallel boundaries, the top base a and bottom base b." },
      { name: "Enter the height", text: "Type the perpendicular distance between the two parallel sides, not the slanted side." },
      { name: "Read the area", text: "See the area in your chosen unit, with conversions to sq ft, m², acres and hectares." },
    ],
    faq: [
      { q: "What is the formula for the area of a trapezoid?", a: "Area = ½ × (a + b) × h, where a and b are the parallel sides and h is the perpendicular distance between them. A lot with frontages of 80 ft and 120 ft, 150 ft deep, is ½ × 200 × 150 = 15,000 sq ft (0.34 acre)." },
      { q: "What is the perpendicular height?", a: "The straight-line distance between the two parallel sides measured at 90° to them. It is shorter than the slanted sides unless the plot has right angles." },
      { q: "Is a trapezoid the same as a trapezium?", a: "Yes. In US English a trapezoid has one pair of parallel sides; in British English the same shape is called a trapezium." },
      { q: "What if my plot has no parallel sides?", a: "Split it into triangles along a diagonal and add their areas, or enter the corner coordinates in the polygon area calculator." },
      { q: "How do I convert square feet to acres?", a: "Divide by 43,560. 15,000 sq ft is 0.344 acres, or 1,393.5 m²." },
    ],
  },
};
